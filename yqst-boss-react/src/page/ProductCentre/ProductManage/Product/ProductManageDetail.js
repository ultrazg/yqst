import React, {Component} from 'react';
import {RViewer, RViewerTrigger} from '../../../../baseview/react-viewerjs/lib';
import TabsViewContent from '../../../../baseview/tabsViewContent/TabsViewContent';
import ApiConst from '../../../../base/urls/ApiConst';
import ApiInterface from '../../../../base/urls/ApiInterface';
import cloneDeep from 'lodash/cloneDeep';
import uniq from 'lodash/uniq';
import {
    MinusCircleOutlined,
    LoadingOutlined,
    PlusOutlined,
    PlusCircleOutlined,
    DeleteOutlined,
    CheckOutlined
} from '@ant-design/icons';
import {
    Button,
    Col,
    Input,
    message,
    Modal,
    Row,
    Upload,
    TreeSelect,
    Spin,
    Empty,
    BackTop,
    Table,
    Checkbox,
    Popconfirm,
    Popover, Tag, InputNumber, Divider
} from 'antd';
import '../../ProductCentreLess.less'
import ProductCentreModel from '../../ProductCentreModel'
import {generateSku, getPageQuery, mergeLoading} from '../../../../utils'
import CheckInput from "../../../../utils/checkInput/CheckInput";
import Api from "../Api/Api";
import request from "../../../../utils/request/request";
import UnitSelectModal from "../../unitLib/UnitSelectModal";
import ProductUnitChangeModal from "./ProductUnitChangeModal";
import SWTable from 'SWViews/table';

const listPath = '/Pages/ProductManageList'
const detailPath = '/Pages/ProductManageDetail'

class ProductManageDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false, // 判断富文本是否加载完
            submitData: {}, // 提交的数据

            tempSpecList: [],//编辑时的规格列表
            tempSpecValueList: [],
            specList: [],//生成后的规格列表
            skuList: [], //sku列表

            goodsTypeArray: [], // 产品类别
            info: {}, // 详情数据
            fileList: [], // 图片列表
            detailLoading: false, // 判断详情数据是否加载完
            goodsTypeLoading: false, // 判断产品类目数据是否加载完
            billData: {}, // 批量填充数据
            bitchFillState: false,

            pics: [],
            picIdx: 0,

            previewImage: '',
            pviIdx: 0,

            //流通单位列表
            unitList: [],
            //流通单位转换列表
            unitRelationList: [],

            unitSelectVisi: false,
            newSpecList: []
        };
    }

    // 获取商品类目
    getGoodsType = () => {
        this.setState({goodsTypeLoading: true})
        ProductCentreModel.CategoryList({}, res => {
            function recursive(children, parentName) {
                children.forEach(item => {
                    item.labelName = parentName ? `${parentName} > ${item.categoryName}` : item.categoryName
                    if (item.children && item.children.length > 0) recursive(item.children, item.labelName)
                    item.title = item.categoryName
                    item.value = item.sn
                    item.key = item.sn
                    item.disabled = item.categoryStatus != 1
                })
            }

            recursive(res.data)
            this.setState({
                goodsTypeArray: res.data,
                goodsTypeLoading: false
            })
        })
    }

    // 获取详情数据
    getDetail = () => {
        const {id, operation} = getPageQuery()
        if (id && operation === 'edit') {
            this.setState({detailLoading: true})
            request(Api.productDetail, {
                sn: id
            }, res => {
                const treeExpandedKeys = res.data.catSnPath && res.data.catSnPath.splice(0, res.data.catSnPath.length - 1)
                this.setState({
                    submitData: {
                        // imgList: res.data.imgList,
                        goodsName: res.data.goodsName,
                        categorySn: res.data.categorySn,
                        goodsCode: res.data.goodsCode,
                        // taxCode: res.data.taxCode,
                        // goodsBrief: res.data.goodsBrief,
                        // goodsDescribe: res.data.goodsDescribe,
                        catSnPath: res.data.catSnPath,
                        catNamePath: res.data.catNamePath,
                        // inventory: res.data.inventory,
                        // goodsPrice: res.data.showPrice,
                        unit: res.data.unit,
                        // convertUnit: res.data.convertUnit,
                        // convertRatio: res.data.convertRatio,
                        // status: res.data.status,
                        // canUpdateSku: res.data.canUpdateSku,
                        goodsStatus: res.data.goodsStatus,
                        unitValue: res.data.unitValue
                    },
                    //skuList
                    skuList: [res.data],
                    // cloneSkuList: cloneDeep(res.data.skuList),
                    tempSpecList: res.data.specList && res.data.specList.length > 0 ?
                        res.data.specList.map((item) => {
                            return item.specName;
                        }) : [],
                    tempSpecValueList: res.data.specList && res.data.specList.length > 0 ?
                        res.data.specList.map((item) => {
                            return item.specValue;
                        }) : [],
                    specList: res.data.specList && res.data.specList.length > 0 ?
                        res.data.specList.map((item) => {
                            return item.specName;
                        }) : [],
                    //类目
                    treeExpandedKeys: treeExpandedKeys,

                    //流通单位列表
                    unitList: res.data.unitList || [],
                    //流通单位转换列表
                    unitRelationList: res.data.unitRelationList || [],

                    detailLoading: false,
                    info: res.data,
                    isLoaded: true
                })
            })
        } else {
            this.setState({isLoaded: true})
        }
    }

    componentDidMount() {
        this.getGoodsType()
        this.getDetail()
    }


    componentWillUnmount() {
    }

    // 删除模态框
    renderDeleteModal = () => {
        const deleteFn = () => {
            const {id} = getPageQuery();
            request(Api.productBatchDel, {snList: [id]}, res => {
                message.success('删除成功')
                this.props.history.push(listPath)
            })
        }
        return (
            <Modal
                title={'提示'}
                visible={this.state.deleteVisible}
                onCancel={() => this.setState({deleteVisible: false})}
                className={'sw-modal-delete'}
                onOk={deleteFn}
                okText='删除'
            >
                <p style={{textAlign: 'center', fontSize: '14px', color: '#2B3441'}}>确认删除该产品?</p>
            </Modal>
        )
    }

    // 提交数据
    saveOrUpdate = (goback = true, callback) => {
        // categorySn	string	是	产品类目系统编码
        // goodsCode	string	是	产品SPU编码
        // goodsName	string	是	产品SPU名称
        // unit	string	是	单位
        // unitValue	string	是	单位值
        // specList	arr-obj	是	规格列表
        // specName	string	是	规格名称
        // specValue	string	是	规格值
        // unitList	arr-obj	是	单位列表
        //     unit	string	是	单位
        // unitRelationList	arr-obj	是	单位关系列表（单位换算）
        //     unit	string	是	单位
        //     unitValue	string	是	单位值
        //     convertUnit	string	是	转换单位
        //     convertUnitValue	string	是	转换单位值
        const {submitData, unitList, unitRelationList} = this.state;
        const {id} = getPageQuery();
        if (id && id !== '') {
            // if (!this.state.submitData.canUpdateSku) {
            //     return message.error('该产品不能修改', 2);
            // }
            // if (!submitData.goodsName)
            //     return message.error('SPU产品名称不能为空！', 1);
            if (!submitData.categorySn)
                return message.error('产品类目不能为空！', 1);
            // if (!submitData.goodsCode)
            //     return message.error('SPU产品编码不能为空！', 1);

            if (this.state.specList.length === 0)
                return message.error('产品规格不能为空！', 1);
            let skuList = this.state.skuList;
            if (skuList.length === 0)
                return message.error('产品规格不能为空！', 1);
            for (let i = 0; i < skuList.length; i++) {
                //goodsCode,goodsName,specList.specValue,imgUrl
                for (let j = 0; j < skuList[i].specList.length; j++) {
                    if (!skuList[i].specList[j].specValue) {
                        return message.error('请完善产品规格信息！', 1);
                    }
                }
                if (!skuList[i].goodsCode || !skuList[i].goodsName) {
                    return message.error('请完善产品规格信息！', 1);
                }
            }

            if (!submitData.unit)
                return message.error('管理单位不能为空！', 1);
            if (!(submitData.unitValue && submitData.unitValue > 0))
                return message.error('管理单位理论值需大于0！', 1);
            if (unitList.length == 0)
                return message.error('流通单位不能为空！', 1);
            if (unitRelationList.length > 0) {
                for (let i = 0; i < unitRelationList.length; i++) {
                    if (!(unitRelationList[i].unitValue && unitRelationList[i].unitValue > 0
                        && unitRelationList[i].convertUnitValue && unitRelationList[i].convertUnitValue > 0)) {
                        return message.error('请先完善流通单位换算', 1);
                    }
                }
            }
            request(Api.productEdit, {
                sn: id,//	string	是	系统编码
                categorySn: submitData.categorySn || '',//	string	是	产品类目系统编码
                // goodsName: skuList[0].goodsName || '',//	string	是	产品SPU名称
                goodsName: this.state.submitData.goodsName || '',//	string	是	产品SPU名称
                unit: submitData.unit || '',//	string	是	单位
                unitValue: submitData.unitValue || '',//	string	是	单位值
                specList: skuList[0].specList,
                unitList,
                unitRelationList
            }, res => {
                message.success('修改产品成功')
                callback && callback(true)
                if (goback === true) {
                    this.props.history.push(listPath)
                }
            })
        } else {
            // if (!submitData.goodsName)
            //     return message.error('SPU产品名称不能为空！', 1);
            if (!submitData.categorySn)
                return message.error('SPU产品类目不能为空！', 1);
            // if (!submitData.goodsCode)
            //     return message.error('SPU产品编码不能为空！', 1);

            // if (this.state.specList.length === 0)
            //     return message.error('产品规格不能为空！', 1);
            let skuList = this.state.skuList;
            let newSpecList = this.state.newSpecList;
            if (newSpecList.length === 0)
                return message.error('产品规格不能为空！', 1);
            for (let i = 0; i < skuList.length; i++) {
                //goodsCode,goodsName,specList.specValue,imgUrl
                for (let j = 0; j < skuList[i].specList.length; j++) {
                    if (!skuList[i].specList[j].specValue) {
                        return message.error('请完善产品规格信息！', 1);
                    }
                }
                if (!skuList[i].goodsName) {
                    return message.error('请完善产品规格信息！', 1);
                }
            }

            if (!submitData.unit)
                return message.error('管理单位不能为空！', 1);
            if (!(submitData.unitValue && submitData.unitValue > 0))
                return message.error('管理单位理论值需大于0！', 1);
            if (unitList.length == 0)
                return message.error('流通单位不能为空！', 1);
            if (unitRelationList.length > 0) {
                for (let i = 0; i < unitRelationList.length; i++) {
                    if (!(unitRelationList[i].unitValue && unitRelationList[i].unitValue > 0
                        && unitRelationList[i].convertUnitValue && unitRelationList[i].convertUnitValue > 0)) {
                        return message.error('请先完善流通单位换算', 1);
                    }
                }
            }
            request(Api.productAdd, {
                sn: '',//	string	是	系统编码
                categorySn: submitData.categorySn || '',//	string	是	产品类目系统编码
                // goodsName: skuList[0].goodsName || '',//	string	是	产品SPU名称
                goodsName: this.state.submitData.goodsName || '',//	string	是	产品SPU名称
                unit: submitData.unit || '',//	string	是	单位
                unitValue: submitData.unitValue || '',//	string	是	单位值
                specList: newSpecList,
                // specList: skuList[0].specList,
                unitList,
                unitRelationList
            }, res => {
                message.success('添加产品成功')
                callback && callback(true)
                if (goback === true) {
                    this.props.history.push(listPath)
                } else {
                    this.props.history.replace(`${detailPath}?id=${res.data}&operation=edit`)
                }
            })
        }
    }

    enable() {
        const {id, operation} = getPageQuery()
        request(Api.productEnable, {sn: id}, () => {
            this.getDetail();
        }, () => {
        })
    }

    disable() {
        const {id, operation} = getPageQuery()
        request(Api.productForbidden, {sn: id}, () => {
            this.getDetail();
        }, () => {
        })
    }

    render() {
        const {id} = getPageQuery()
        return (
            <TabsViewContent
                crumb={[{name: '平台产品'}, {name: "编辑产品"}]}
                topBtn={(
                    <div>
                        <Button
                            style={{
                                height: 32,
                                padding: '0 12px',
                                fontSize: 16,
                                fontWeight: 500,
                                lineHeight: '22px',
                                color: this.state.detailLoading ? '#ccc' : '#2B3441',
                            }}
                            onClick={() => this.saveOrUpdate()}
                            disabled={this.state.detailLoading}
                        >
                            保存
                        </Button>
                        {
                            id && id !== '' && (
                                <span>
									<span style={{padding: 8}}/>
									<Button
                                        onClick={() => this.setState({deleteVisible: true})}
                                        style={{
                                            height: 32,
                                            padding: '0 12px',
                                            fontSize: 16,
                                            fontWeight: 500,
                                            lineHeight: '22px',
                                            color: this.state.detailLoading ? '#ccc' : '#2B3441',
                                        }}
                                        disabled={this.state.detailLoading}
                                    >
										删除
									</Button>
								</span>
                            )
                        }
                        <span style={{padding: 8}}/>
                        {/*<Button*/}
                        {/*    type='primary'*/}
                        {/*    onClick={() => {*/}
                        {/*        if (!this.state.results.every(n => n.goodsCode !== '')) {*/}
                        {/*            message.error('请补充完整每条 sku 组合的SKU 编码')*/}
                        {/*            return*/}
                        {/*        }*/}

                        {/*        Modal.confirm({*/}
                        {/*            title: '发布产品前将对产品进行一次保存,确认保存产品?',*/}
                        {/*            onOk: () => {*/}
                        {/*                this.saveOrUpdate(false, () => {*/}
                        {/*                    this.getDetail()*/}
                        {/*                    this.getShopPage()*/}
                        {/*                    this.setState({*/}
                        {/*                        chooseTerminalVisible: true,*/}
                        {/*                        sizeData: [],*/}
                        {/*                        sizeValueData: []*/}
                        {/*                    })*/}
                        {/*                })*/}
                        {/*            },*/}
                        {/*        });*/}
                        {/*    }}*/}
                        {/*    style={{*/}
                        {/*        height: 32,*/}
                        {/*        padding: '0 12px',*/}
                        {/*        fontSize: 16,*/}
                        {/*        fontWeight: 500,*/}
                        {/*        lineHeight: '22px',*/}
                        {/*        color: this.state.detailLoading ? '#ccc' : '#fff',*/}
                        {/*    }}*/}
                        {/*    disabled={this.state.detailLoading}*/}
                        {/*>*/}
                        {/*    发布产品*/}
                        {/*</Button>*/}
                        {id && id !== '' && !this.state.detailLoading ? <Button
                            style={{
                                height: 32,
                                padding: '0 12px',
                                fontSize: 16,
                                fontWeight: 500,
                                lineHeight: '22px',
                                color: this.state.detailLoading ? '#ccc' : '#2B3441',
                            }}
                            onClick={() => (this.state.submitData.goodsStatus == 1 ? this.disable() : this.enable())}
                            disabled={this.state.detailLoading}
                        >
                            {this.state.submitData.goodsStatus == 1 ? "停用" : "启用"}
                        </Button> : null}
                    </div>
                )}
            >
                <BackTop target={() => document.getElementById('root')}/>
                <Spin spinning={mergeLoading([this.state.detailLoading, this.state.goodsTypeLoading])}
                      tip={'拼命加载中....'}>
                    {/* 模态框 */}
                    {this.renderDeleteModal()}
                    {this.renderModifiedTitle('基本信息')}
                    {this.renderBaseInfo()}
                    {this.renderModifiedTitle('规格信息')}
                    {this.renderSKU()}
                    {this.renderModifiedTitle('单位管理')}
                    {this.unitManageView()}
                </Spin>
                {/*图片预览*/}
                <RViewer options={{
                    toolbar: {
                        prev: true,
                        next: true
                    }
                }} imageUrls={this.state.previewImage}>
                    <RViewerTrigger index={this.state.pviIdx}>
                        <div ref={(c) => {
                            this.showPicPreview = c
                        }}></div>
                    </RViewerTrigger>
                </RViewer>
                {this.state.unitSelectVisi ? <UnitSelectModal
                    onSelect={(data) => {
                        this.unitSelectFun && this.unitSelectFun(data.unit)
                        this.setState({unitSelectVisi: false})
                    }}
                    onClose={() => {
                        this.setState({unitSelectVisi: false})
                    }}/> : null}
                {this.state.unitManageVisi ? <ProductUnitChangeModal
                    changeList={this.state.unitRelationList}
                    onOk={(data) => {
                        this.unitChangeFun && this.unitChangeFun(data)
                    }}
                    onClose={() => {
                        this.setState({unitManageVisi: false})
                    }}/> : null}
            </TabsViewContent>
        );
    }

    renderModifiedTitle = (title) => {
        return (
            <div style={{background: 'rgba(43,52,65,0.05)', padding: '10px 12px'}}>
                <h4
                    style={{margin: 0, fontSize: 14, color: '#2B3441'}}
                >
                    {title}
                </h4>
            </div>
        )
    }

    renderInput = (fieldName, placeholder = '请填写', maxlength, disabled = false) => {
        return (
            <Input
                title={this.state.submitData[fieldName]}
                maxLength={maxlength}
                placeholder={placeholder}
                style={{fontSize: 14, color: 'rgba(43,52,65,0.65)'}}
                value={this.state.submitData[fieldName]}
                onChange={(e) => {
                    this.setState({submitData: {...this.state.submitData, [fieldName]: e.target.value}})
                }}
                disabled={disabled}
            />
        )
    }

    renTreeSelect = (fieldName, placeholder = '请选择') => {
        const {SHOW_PARENT, SHOW_ALL} = TreeSelect;
        return (
            <div id={fieldName} style={{position: 'relative'}}>
                <TreeSelect
                    placeholder={placeholder}
                    getPopupContainer={() => document.getElementById(fieldName)}
                    style={{width: '100%', fontSize: 14, color: 'rgba(43,52,65,0.65)'}}
                    value={this.state.submitData[fieldName]}
                    treeExpandedKeys={this.state.treeExpandedKeys}
                    onTreeExpand={(expandedKeys) => {
                        this.setState({treeExpandedKeys: expandedKeys})
                    }}
                    dropdownClassName={'sw-treeSelect'}
                    treeNodeLabelProp='labelName'
                    showCheckedStrategy={SHOW_ALL}
                    treeData={this.state.goodsTypeArray}
                    onChange={(value) => {
                        this.setState({submitData: {...this.state.submitData, [fieldName]: value}})
                    }}
                />
            </div>
        )
    }

    renderAsterisk = () => {
        return (
            <span
                style={{color: 'red', verticalAlign: 'middle', fontSize: 16, marginRight: '4px'}}
            >
				*
			</span>
        )
    }

    renderBaseInfo = () => {
        const {id, operation} = getPageQuery()
        return (
            <div style={{padding: 20}}>
                <div className={'sw-form'}>
                    <Row gutter={12}>
                        <Col span={24} style={{marginBottom: 24}}>
                            <Row>
                                <Col span={4}>
                                    <label className={'sw-form-label'}>
                                        {/*{this.renderAsterisk()}*/}
                                        产品编码：
                                    </label>
                                </Col>
                                <Col span={8}>
                                    {this.renderInput('goodsCode', '请填写产品编码', 30, true)}
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24} style={{marginBottom: 24}}>
                            <Row>
                                <Col span={4}>
                                    <label className={'sw-form-label'}>
                                        {/*{this.renderAsterisk()}*/}
                                        产品名称：
                                    </label>
                                </Col>
                                <Col span={8}>
                                    {this.renderInput('goodsName', '请填写产品名称', 100)}
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24} style={{marginBottom: 24}}>
                            <Row>
                                <Col span={4}>
                                    <label className={'sw-form-label'}>
                                        {/*{this.renderAsterisk()}*/}
                                        产品类目：
                                    </label>
                                </Col>
                                <Col span={8}>
                                    {this.renTreeSelect('categorySn', '请选择产品类目', 30)}
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24} style={{marginBottom: 24}}>
                            <Row>
                                <Col span={4}>
                                    <label className={'sw-form-label'}>
                                        {/*{this.renderAsterisk()}*/}
                                        管理单位：
                                    </label>
                                </Col>
                                <Col span={8}>
                                    <Input
                                        title={this.state.submitData.unit}
                                        placeholder={'请选择管理单位'}
                                        style={{fontSize: 14, color: 'rgba(43,52,65,0.65)'}}
                                        value={this.state.submitData.unit}
                                        onClick={() => {
                                            this.unitSelectFun = (data) => {
                                                this.setState({
                                                    submitData: {
                                                        ...this.state.submitData,
                                                        unit: data
                                                    },
                                                    //更新换算关系列表
                                                    unitRelationList: this.state.unitRelationList.map((item) => ({
                                                        ...item,
                                                        unit: data
                                                    }))
                                                });
                                            }
                                            this.setState({unitSelectVisi: true})
                                        }}
                                        onChange={(e) => {
                                        }}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24} style={{marginBottom: 24}}>
                            <Row>
                                <Col span={4}>
                                    <label className={'sw-form-label'}>
                                        {/*{this.renderAsterisk()}*/}
                                        管理单位理论值(Kg)：
                                    </label>
                                </Col>
                                <Col span={8}>
                                    <InputNumber
                                        title={this.state.submitData.unitValue}
                                        placeholder={'输入大于0小于1000000'}
                                        style={{width: '100%', fontSize: 14, color: 'rgba(43,52,65,0.65)'}}
                                        value={this.state.submitData.unitValue}
                                        onChange={(e) => {
                                            this.setState({
                                                submitData: {
                                                    ...this.state.submitData,
                                                    unitValue: e
                                                },
                                            });
                                        }}
                                        min={0}
                                        max={999999.9999}
                                        precision={4}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }

    renderSKU = () => {
        return <div className={'sw-form'}
                    style={{padding: '30px 10px 10px 30px'}}>
            <Row gutter={12}>
                <Col span={24} style={{marginBottom: 24}}>
                    <Row>
                        <Col span={3}>
                            <label className={'sw-form-label'}>规格编辑器：</label>
                        </Col>
                        <Col span={20}>
                            {this.EditSpecView()}
                            {/*{this.SpecView()}*/}
                        </Col>
                    </Row>
                </Col>
                {/*<Col span={24} style={{marginBottom: 24}}>*/}
                {/*    <Row>*/}
                {/*        <Col span={3}>*/}
                {/*            <label className={'sw-form-label'}>SKU 组合：</label>*/}
                {/*        </Col>*/}
                {/*        <Col span={20}>*/}
                {/*            {this.SkuView()}*/}
                {/*        </Col>*/}
                {/*    </Row>*/}
                {/*</Col>*/}
            </Row>
            {this.BillModal()}
        </div>
    }
    // 规格编辑器
    EditSpecView = () => {
        let {tempSpecList, tempSpecValueList} = this.state;

        return <div style={{border: '1px solid rgba(43,52,65,0.25)', padding: '8px'}}>
            {
                tempSpecList.length === 0
                    ? <Empty/>
                    : <Row>
                        {
                            tempSpecList.map((item, index) => (
                                <>
                                    <Col style={{textAlign: 'center'}} span={2}>
                                        <label className={'sw-form-label'}>规格名{index + 1}：</label>
                                    </Col>
                                    <Col style={{textAlign: 'center', marginBottom: 10}} span={9}>
                                        <Input
                                            value={item}
                                            maxLength={50}
                                            onChange={e => {
                                                tempSpecList[index] = e.target.value;
                                                this.setState({
                                                    tempSpecList
                                                });
                                            }}
                                        />
                                    </Col>
                                    <Col style={{textAlign: 'center'}} span={2}>
                                        <label className={'sw-form-label'}>规格值：</label>
                                    </Col>
                                    <Col style={{textAlign: 'center'}} span={9}>
                                        <Input
                                            value={tempSpecValueList[index]}
                                            maxLength={50}
                                            onChange={e => {
                                                tempSpecValueList[index] = e.target.value;
                                                this.setState({
                                                    tempSpecValueList
                                                });
                                            }}
                                        />
                                    </Col>
                                    <Col style={{textAlign: 'center'}} span={2}>
                                        <Popconfirm
                                            placement="topRight"
                                            title="确认删除？"
                                            onConfirm={() => {
                                                tempSpecList.splice(index, 1);
                                                tempSpecValueList.splice(index, 1);

                                                this.setState({
                                                    tempSpecList,
                                                    tempSpecValueList
                                                });
                                            }}
                                            okText="确认"
                                            cancelText="取消"
                                        >
                                            <Button danger>删除</Button>
                                        </Popconfirm>
                                    </Col>
                                </>
                            ))
                        }
                    </Row>
            }
            <div style={{background: 'rgba(43,52,65,0.05)', padding: 8}}>
                <Button style={{marginRight: 20}} onClick={() => {
                    const {tempSpecList, tempSpecValueList} = this.state;
                    tempSpecList.push('');
                    tempSpecValueList.push('');

                    this.setState({
                        tempSpecList,
                        tempSpecValueList
                    })
                }}><PlusOutlined/>添加规格</Button>
                <Popconfirm
                    placement="topRight"
                    title="确认清空规格列表？"
                    onConfirm={() => {
                        this.setState({
                            tempSpecList: [],
                            tempSpecValueList: []
                        });
                    }}
                    okText="确认"
                    cancelText="取消"
                >
                    <Button style={{marginRight: 20}}><DeleteOutlined/>清空规格</Button>
                </Popconfirm>
                <Button type='primary' onClick={() => {
                    const {tempSpecList, tempSpecValueList} = this.state;
                    const newList = [];

                    if (tempSpecList.length === 0) {
                        return message.info('规格不能为空!');
                    }
                    for (let i = 0; i < tempSpecList.length; i++) {
                        if (CheckInput.isNull(tempSpecList[i])) {
                            return message.info("规格名不能为空");
                        }
                    }
                    for (let i = 0; i < tempSpecValueList.length; i++) {
                        if (CheckInput.isNull(tempSpecValueList[i])) {
                            return message.info("规格值不能为空");
                        }
                    }
                    if (uniq(tempSpecList).length !== tempSpecList.length) {
                        return message.info("规格名不能重复");
                    }
                    for (let i = 0; i < tempSpecList.length; i++) {
                        newList.push({'specName': tempSpecList[i], 'specValue': tempSpecValueList[i]});
                    }
                    const {id} = getPageQuery();
                    if (id && id !== '') {
                        const skuList = this.state.skuList;
                        skuList[0].specList = newList;
                        this.setState({
                            skuList
                        }, () => {
                            message.success("成功生成规格！", 1);
                        });
                    } else {
                        this.setState({
                            newSpecList: newList
                        }, () => {
                            message.success("成功生成规格！", 1);
                        });
                    }
                }}><CheckOutlined/>生成规格</Button>
            </div>
        </div>
    }
    //规格view
    SpecView = () => {
        let {tempSpecList} = this.state;
        return <div style={{border: '1px solid rgba(43,52,65,0.25)', padding: '8px'}}>
            {tempSpecList && tempSpecList.map((n, nIndex) => (
                <div key={nIndex} style={{marginTop: nIndex !== 0 ? 16 : 0, margin: 0}}>
                    <div style={{background: 'rgba(43,52,65,0.05)', padding: '8px 0'}}>
                        <Row gutter={12}>
                            <Col span={3} style={{textAlign: 'right'}}>
                                <label style={{
                                    fontSize: 14,
                                    fontWeight: 500,
                                    color: 'rgba(43,52,65,1)',
                                    lineHeight: '32px'
                                }}>规格名{nIndex + 1}: </label>
                            </Col>
                            <Col span={7}>
                                <Input
                                    maxLength={50}
                                    onChange={e => {
                                        tempSpecList[nIndex] = e.target.value
                                        this.setState({tempSpecList})
                                    }}
                                    value={n}
                                />
                            </Col>
                            {tempSpecList.length > 0 ? <MinusCircleOutlined
                                onClick={() => {
                                    tempSpecList.splice(nIndex, 1)
                                    this.setState({tempSpecList})
                                }}
                                style={{fontSize: 16, cursor: 'pointer', lineHeight: '32px'}}/> : null}
                        </Row>
                    </div>
                </div>
            ))}
            {tempSpecList && tempSpecList.length === 0 && (
                <Empty/>
            )}
            <div style={{background: 'rgba(43,52,65,0.05)', padding: 8, marginTop: 24}}>
                <Button
                    style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: '#2B3441',
                        lineHeight: '20px',
                        padding: '6px 16px',
                        height: 32
                    }}
                    onClick={() => {
                        tempSpecList.push('');
                        this.setState({tempSpecList})
                    }}
                >
                    添加规格
                </Button>
                <Button
                    style={{
                        marginLeft: 12,
                        fontSize: 14,
                        fontWeight: 500,
                        color: '#2B3441',
                        lineHeight: '20px',
                        padding: '6px 16px',
                        height: 32
                    }}
                    onClick={() => {
                        if (this.state.tempSpecList.length == 0) {
                            return;
                        }
                        Modal.confirm({
                            title: '是否清空规格编辑器',
                            okText: '确定',
                            cancelText: '取消',
                            onOk: () => {
                                this.setState({tempSpecList: []})
                            },
                            onCancel: () => {
                            },
                        });
                    }}
                >清空规格</Button>
                <Button
                    disabled={this.state.tempSpecList.length == 0}
                    type={'primary'}
                    style={{
                        marginLeft: 12,
                        fontSize: 14,
                        fontWeight: 500,
                        lineHeight: '20px',
                        padding: '6px 16px',
                        height: 32
                    }}
                    onClick={() => {
                        Modal.confirm({
                            title: '生成新的规格',
                            content: '生成新的规格，下方规格部分的数据将被重置',
                            okText: '确定',
                            cancelText: '取消',
                            onOk: () => {
                                for (let i = 0; i < tempSpecList.length; i++) {
                                    if (CheckInput.isNull(tempSpecList[i])) {
                                        message.info("规格名不能为空");
                                        return;
                                    }
                                }
                                if (uniq(tempSpecList).length != tempSpecList.length) {
                                    return message.info("规格名不能重复");
                                }
                                let skuList = this.state.skuList.map((item) => {
                                    return {
                                        ...item,
                                        specList: tempSpecList.map((it) => {
                                            for (let i = 0; i < item.specList.length; i++) {
                                                if (item.specList[i].specName == it) {
                                                    return {
                                                        specName: it,
                                                        specValue: item.specList[i].specValue || ''
                                                    }
                                                }
                                            }
                                            return {
                                                specName: it,
                                                specValue: ''
                                            }
                                        }),
                                    }
                                });
                                this.setState({
                                    specList: cloneDeep(tempSpecList),
                                    skuList: cloneDeep(skuList)
                                });
                            },
                            onCancel: () => {
                            },
                        });
                    }}
                >生成规格</Button>
            </div>
        </div>;
    }
    //skuview
    SkuView = () => {
        const {id, operation} = getPageQuery();
        let skuList = this.state.skuList;
        return <div>
            <div style={{width: '100%', overflowX: 'auto'}}>
                <Table
                    style={{
                        // width: (45 + 160 + 160 + 160 + 75 + 50)
                        //     + (this.state.specList.length > 1 ? 95 : 160 * this.state.specList.length)
                        //     + 1 * (6 + this.state.specList.length)
                    }}
                    // scroll={this.state.specList.length > 1 ? {
                    //     x: (45 + 160 + 160 + 160 + 75 + 50)
                    //         + (160 * this.state.specList.length)
                    //         + 1 * (6 + this.state.specList.length)
                    // } : {}}
                    scroll={this.state.specList.length > 1 ? {
                        x: (45 + 160 + 160 + 160)
                            + (160 * this.state.specList.length)
                            + 1 * (6 + this.state.specList.length)
                    } : {}}
                    columns={[
                        {
                            title: this.state.skuList.length > 0 ? null :
                                <PlusCircleOutlined
                                    style={{color: '#4481EB', fontSize: 22}}
                                    onClick={() => {
                                        skuList.push({
                                            goodsCode: '',//	string	是	产品自定义编码
                                            goodsName: '',//	string	是	产品名称
                                            specList: this.state.specList.map((item) => {
                                                return {
                                                    specName: item,
                                                    specValue: ""
                                                }
                                            }),//	arr-obj	是	规格列表
                                            goodsStatus: 1,//	int	是	产品状态 1:启用 2:停用
                                            imgUrl: '',//	string	是	产品图片url
                                        });
                                        this.setState({skuList: cloneDeep(skuList)})
                                    }}/>,
                            key: 'option',
                            dataIndex: 'option',
                            width: 45,
                            render: (text, record, index) => {
                                return <Popconfirm
                                    title="确认删除该条数据?"
                                    onConfirm={() => {
                                        skuList.splice(index, 1)
                                        this.setState({skuList: cloneDeep(skuList)})
                                    }}
                                    okText="确定"
                                    cancelText="取消">
                                    <MinusCircleOutlined style={{color: '#F12C20', fontSize: 22}}/>
                                </Popconfirm>
                            }
                        },
                        {
                            title: '产品编码',
                            key: 'goodsCode',
                            dataIndex: 'goodsCode',
                            width: 160,
                            render: (text, record, index) => {
                                return <Input
                                    title={text}
                                    disabled={(id && operation === 'edit' && record.sn)}
                                    disabled={true}
                                    maxLength={50}
                                    value={text}
                                    onChange={(e) => {
                                        skuList[index].goodsCode = e.target.value;
                                        this.setState({skuList})
                                    }}
                                />
                            }
                        },
                        {
                            title: '产品名称',
                            key: 'goodsName',
                            dataIndex: 'goodsName',
                            width: 160,
                            render: (text, record, index) => {
                                return <Input
                                    maxLength={50}
                                    value={text}
                                    onChange={(e) => {
                                        skuList[index].goodsName = e.target.value;
                                        this.setState({skuList})
                                    }}
                                />
                            }
                        },
                        ...this.state.specList.map((item, index) => {
                            return {
                                title: item,
                                key: item,
                                dataIndex: item,
                                width: 160,
                                render: (text, record, idx) => {
                                    return <Input
                                        maxLength={50}
                                        value={skuList[idx].specList && skuList[idx].specList[index] ?
                                            skuList[idx].specList[index].specValue : ''}
                                        onChange={(e) => {
                                            //e.target.value
                                            if (!skuList[idx].specList) {
                                                skuList[idx].specList = this.state.specList.map((item) => {
                                                    return {specName: item, specValue: ""}
                                                });
                                            }
                                            skuList[idx].specList[index].specValue = e.target.value;
                                            this.setState({skuList: skuList})
                                        }}
                                    />
                                }
                            }
                        }),
                        {
                            title: '管理单位',
                            key: 'unit',
                            dataIndex: 'unit',
                            width: 160,
                            render: (text, record, index) => {
                                return <Input
                                    title={this.state.submitData.unit}
                                    disabled={true}
                                    maxLength={50}
                                    value={this.state.submitData.unit}
                                    onChange={(e) => {
                                    }}
                                />
                            }
                        },
                        // {
                        //     title: '是否启用',
                        //     key: 'goodsStatus',
                        //     dataIndex: 'goodsStatus',
                        //     width: 75,
                        //     render: (text, record, idx) => {
                        //         return <Checkbox
                        //             style={{
                        //                 marginLeft: 17
                        //             }}
                        //             checked={parseInt(text) == 1}
                        //             onChange={(e) => {
                        //                 skuList[idx].goodsStatus = e.target.checked ? 1 : 2;
                        //                 this.setState({skuList});
                        //             }}/>
                        //     }
                        // },
                        // {
                        //     title: '图片',
                        //     key: 'imgUrl',
                        //     dataIndex: 'imgUrl',
                        //     width: 50,
                        //     render: (text, record, index) => {
                        //         return this.renderSkuImg(text, record, index);
                        //     }
                        // },
                    ]}
                    dataSource={this.state.skuList}
                    pagination={false}
                    bordered
                    footer={() => (
                        null
                        // this.state.skuList.length > 0 ?
                        //     <a onClick={() => {
                        //         this.setState({
                        //             billVisible: true
                        //         })
                        //     }}>批量填充</a> :
                        //     <a style={{color: '#ccc'}}>批量填充</a>
                    )}
                />
            </div>
        </div>;
    }

    unitManageView = () => {
        const columns = [
            {
                title: '序号',
                dataIndex: 'index',
                key: 'index',
                render: (text, record, index) => index + 1,
            },
            {
                title: '单位',
                dataIndex: 'unit',
                key: 'unit',
                // render: text => text,
            },
            {
                title: '操作',
                dataIndex: 'name',
                key: 'name',
                render: (text, record, index) => <Popconfirm
                    placement="topRight"
                    title="是否移除该流通单位？"
                    onConfirm={() => {
                        let delIndex = -1;
                        let unitRelationList = this.state.unitRelationList;
                        for (let i = 0; i < unitRelationList.length; i++) {
                            if (unitRelationList[i].convertUnit == record.unit) {
                                delIndex = index;
                                break;
                            }
                        }
                        if (delIndex >= 0)
                            unitRelationList.splice(delIndex, 1);
                        let unitList = this.state.unitList;
                        unitList.splice(index, 1);
                        this.setState({
                            unitList,
                            //更新换算关系列表
                            unitRelationList
                        });
                    }}
                    okText="确认"
                    cancelText="取消"
                >
                    <a style={{color: '#ff4757'}}>删除</a>
                </Popconfirm>
            },
        ]

        return <div style={{padding: 20}}>
            <div className={'sw-form'}>
                <Row gutter={12}>
                    <Col span={24} style={{marginBottom: 12}}>
                        <Row>
                            <Col span={3}>
                                <label className={'sw-form-label'}>
                                    {/*{this.renderAsterisk()}*/}
                                    流通单位：
                                </label>
                            </Col>
                            <Col span={8}>
                                <div style={{
                                    fontSize: '14px',
                                    color: '#2B3441',
                                    verticalAlign: 'sub',
                                    lineHeight: '32px'
                                }}>
                                    <SWTable
                                        columns={columns}
                                        dataSource={this.state.unitList}
                                        pagination={
                                            false
                                        }
                                    />
                                    {/*{this.state.unitList.map((item, index) => (*/}
                                    {/*    <Tag key={index} closable onClose={(e) => {*/}
                                    {/*        e.preventDefault();*/}
                                    {/*        Modal.confirm({*/}
                                    {/*            title: '是否移除该流通单位',*/}
                                    {/*            okText: '确定',*/}
                                    {/*            cancelText: '取消',*/}
                                    {/*            onOk: () => {*/}
                                    {/*                let delIndex = -1;*/}
                                    {/*                let unitRelationList = this.state.unitRelationList;*/}
                                    {/*                for (let i = 0; i < unitRelationList.length; i++) {*/}
                                    {/*                    if (unitRelationList[i].convertUnit == item.unit) {*/}
                                    {/*                        delIndex = index;*/}
                                    {/*                        break;*/}
                                    {/*                    }*/}
                                    {/*                }*/}
                                    {/*                if (delIndex >= 0)*/}
                                    {/*                    unitRelationList.splice(delIndex, 1);*/}
                                    {/*                let unitList = this.state.unitList;*/}
                                    {/*                unitList.splice(index, 1);*/}
                                    {/*                this.setState({*/}
                                    {/*                    unitList,*/}
                                    {/*                    //更新换算关系列表*/}
                                    {/*                    unitRelationList*/}
                                    {/*                });*/}
                                    {/*            },*/}
                                    {/*            onCancel: () => {*/}
                                    {/*            },*/}
                                    {/*        });*/}
                                    {/*    }}>{item.unit}</Tag>))}*/}
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24} style={{marginBottom: 24}}>
                        <Row>
                            <Col span={3}>
                            </Col>
                            <Button type={'primary'} onClick={() => {
                                if (!this.state.submitData.unit) {
                                    return message.info("请先选择管理单位")
                                }
                                this.unitSelectFun = (data) => {
                                    let unitList = this.state.unitList; // 已添加的单位
                                    let unitListArr = this.state.unitList.map((item) => (item.unit));
                                    let unitRelationList = this.state.unitRelationList;
                                    if (!unitListArr.includes(data)) {
                                        unitList.push({unit: data});
                                        unitRelationList.push({
                                            unit: this.state.submitData.unit,//	string	单位
                                            unitValue: '',//	string	单位值
                                            convertUnit: data,//	string	转换单位
                                            convertUnitValue: '',//	string	转换单位值
                                        });
                                        this.setState({
                                            unitList,
                                            //更新换算关系列表
                                            unitRelationList
                                        });
                                    }
                                }
                                this.setState({unitSelectVisi: true})
                            }}>增加流通单位</Button>
                            <Col span={1}>
                            </Col>
                            <Button onClick={() => {
                                this.unitChangeFun = (data) => {
                                    if (data && data.length > 0) {
                                        for (let i = 0; i < data.length; i++) {
                                            if (!(data[i].unitValue && data[i].unitValue > 0
                                                && data[i].convertUnitValue && data[i].convertUnitValue > 0)) {
                                                return message.info("请填写正确的换算比例");
                                            }
                                        }
                                        this.setState({unitManageVisi: false})
                                    }
                                }
                                this.setState({unitManageVisi: true})
                            }}>设置单位换算</Button>
                        </Row>
                    </Col>
                </Row>
            </div>
        </div>
    }

    renderSkuImg(text, record, index) {
        function getBase64(img, callback) {
            const reader = new FileReader();
            reader.addEventListener('load', () => callback(reader.result));
            reader.readAsDataURL(img);
        }

        const handleChange = info => {
            if (info.file.status === 'uploading') {
                this.setState({loading: true});
                return;
            }
            if (info.file.status === 'done') {
                // this.props.onChange({
                //     index: this.props.index,
                //     value: info.file.response.data.url,
                //     dataIndex: this.props.dataIndex
                // })
                let skuList = this.state.skuList;
                skuList[index].imgUrl = info.file.response.data.url;
                this.setState({skuList})
                getBase64(info.file.originFileObj, imageUrl =>
                    this.setState({
                        loading: false,
                    }),
                );
            }
        };

        function beforeUpload(file) {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/bmp' || file.type === 'image/gif';
            if (!isJpgOrPng) {
                message.error('请上传jpg/bmp/png/gif!');
            }
            const isLt2M = file.size / 1024 / 1024 < 30;
            if (!isLt2M) {
                message.error('图片必须小于 30MB!');
            }
            return isJpgOrPng && isLt2M;
        };

        const popContent = () => {
            return <div>
                <Button size={'small'} style={{marginRight: '8px'}} onClick={() => {
                    this.setState(
                        {previewImage: text, pviIdx: 0},
                        () => {
                            this.showPicPreview && this.showPicPreview.click();
                        }
                    )
                }}>预览</Button>
                <Button size={'small'} danger onClick={() => {
                    let skuList = this.state.skuList;
                    skuList[index].imgUrl = "";
                    this.setState({skuList});
                }}>删除</Button>
            </div>
        };

        return <div style={{position: 'relative', display: 'inline-block'}} className={'upload-btn'}>
            {/*{text ? <div className={'mask'}>
                <CloseCircleOutlined
                    onClick={() => {
                        // this.props.onChange({
                        //     index: this.props.index,
                        //     value: '',
                        //     dataIndex: this.props.dataIndex
                        // })
                        let skuList = this.state.skuList;
                        skuList[index].imgUrl = "";
                        this.setState({skuList});
                    }}
                    style={{
                        fontSize: '18px',
                        cursor: 'pointer',
                        color: '#fff',
                        zIndex: 2
                    }}/>
            </div> : null}*/}

            {
                text ? <Popover content={popContent()} title="">
                    <img
                        width={32}
                        height={32}
                        src={text}
                        alt=""
                    />
                </Popover> : <Upload
                    accept={'.png,.jpg,.bmp,.gif'}
                    name="file"
                    className="avatar-uploader"
                    showUploadList={false}
                    action={ApiConst.Versions().sunaw + ApiInterface.uploadFile}
                    onChange={handleChange}
                    beforeUpload={beforeUpload}
                >
                    <Button
                        style={{height: 32, width: 32}}
                        type={'dashed'}
                        icon={<PlusOutlined style={{color: '#4481EB'}}/>}
                    />
                </Upload>
            }
        </div>
    }

    // 批量填充
    BillModal = () => {
        const getBase64 = (img, callback) => {
            const reader = new FileReader();
            reader.addEventListener('load', () => callback(reader.result));
            reader.readAsDataURL(img);
        }

        const handleChange = info => {
            if (info.file.status === 'uploading') {
                this.setState({loading: true});
                return;
            }
            if (info.file.status === 'done') {
                this.setState({
                        billData: {...this.state.billData, imgUrl: info.file.response.data.url}
                    }
                )

                getBase64(info.file.originFileObj, imageUrl =>
                    this.setState({
                        loading: false,
                    }),
                );
            }
        };

        function beforeUpload(file) {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/bmp' || file.type === 'image/gif';
            if (!isJpgOrPng) {
                message.error('请上传jpg/bmp/png/gif格式图片文件!');
            }
            const isLt2M = file.size / 1024 / 1024 < 30;
            if (!isLt2M) {
                message.error('图片必须小于 30MB!');
            }
            return isJpgOrPng && isLt2M;
        }

        return (
            <Modal
                style={{top: 15}}
                destroyOnClose={true}
                title={'批量填充'}
                className={'sw-modal'}
                visible={this.state.billVisible}
                onCancel={() => this.setState({billVisible: false})}
                afterClose={() => {
                    this.setState({billData: {}})
                }}
                onOk={() => {
                    let {skuList, billData} = this.state
                    let {specValueObject} = this.state.billData;
                    let keys = null;
                    if (specValueObject) {
                        keys = Object.keys(specValueObject);
                    }
                    for (let i = 0; i < skuList.length; i++) {
                        if (billData.goodsCode && !(billData.goodsCode == "")) {
                            if (!skuList[i].goodsSn)
                                skuList[i].goodsCode = billData.goodsCode;
                        }
                        if (billData.goodsName && !(billData.goodsName == "")) {
                            skuList[i].goodsName = billData.goodsName;
                        }
                        if (billData.imgUrl && !(billData.imgUrl == "")) {
                            skuList[i].imgUrl = billData.imgUrl;
                        }
                        //动态规格赋值
                        if (keys && keys.length > 0) {
                            for (let j = 0; j < skuList[i].specList.length; j++) {
                                if (
                                    keys.includes(skuList[i].specList[j].specName)
                                    && !(specValueObject[skuList[i].specList[j].specName] == "")
                                ) {
                                    skuList[i].specList[j].specValue = specValueObject[skuList[i].specList[j].specName];
                                }
                            }
                        }
                    }
                    this.setState({
                        // results,
                        billVisible: false,
                        bitchFillState: true,
                        billData: {},
                        skuList: skuList
                    })
                }}
            >
                <div style={{display: 'flex', alignItems: 'center', marginBottom: 16}}>
                    <label style={{width: '15%', textAlign: 'right'}}>产品编码:</label>
                    <Input
                        maxLength={50}
                        style={{width: '80%', marginLeft: 16}}
                        onChange={e => {
                            this.setState({
                                    billData: {...this.state.billData, goodsCode: e.target.value}
                                }
                            )
                        }}
                    />
                </div>
                <div style={{display: 'flex', alignItems: 'center', marginBottom: 16}}>
                    <label style={{width: '15%', textAlign: 'right'}}>产品名称:</label>
                    <Input
                        maxLength={50}
                        style={{width: '80%', marginLeft: 16}}
                        onChange={e => {
                            this.setState({
                                    billData: {...this.state.billData, goodsName: e.target.value}
                                }
                            )
                        }}
                    />
                </div>
                {this.state.specList.map((item, index) => {
                    return <div key={index} style={{display: 'flex', alignItems: 'center', marginBottom: 16}}>
                        <label style={{width: '15%', textAlign: 'right'}}>{item}:</label>
                        <Input
                            maxLength={50}
                            style={{width: '80%', marginLeft: 16}}
                            onChange={e => {
                                //e.target.value
                                let specValueObject = this.state.billData.specValueObject ?
                                    {...this.state.billData.specValueObject} : {};
                                specValueObject[item] = e.target.value;
                                this.setState({
                                    billData: {...this.state.billData, specValueObject: specValueObject}
                                })
                            }}
                        />
                    </div>
                })}
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <label style={{width: '15%', textAlign: 'right'}}>图片:</label>
                    <div style={{marginLeft: 16}}>
                        <Upload
                            accept={'.png,.jpg,.bmp,.gif'}
                            beforeUpload={beforeUpload}
                            name="file"
                            className="avatar-uploader"
                            showUploadList={false}
                            action={ApiConst.Versions().sunaw + ApiInterface.uploadFile}
                            onChange={handleChange}
                        >

                            {
                                this.state.billData && this.state.billData.imgUrl ? (
                                    <div
                                        style={{
                                            width: 104,
                                            height: 104,
                                            backgroundColor: '#fafafa',
                                            border: '1px dashed #d9d9d9',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            textAlign: 'center'
                                        }}
                                    >
                                        <img
                                            style={{padding: 8}}
                                            width={'100%'}
                                            height={'100%'}
                                            src={this.state.billData.imgUrl}
                                            alt=""
                                        />
                                    </div>
                                ) : (
                                    <div
                                        style={{
                                            width: 104,
                                            height: 104,
                                            backgroundColor: '#fafafa',
                                            border: '1px dashed #d9d9d9',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            textAlign: 'center'
                                        }}
                                    >
                                        {this.state.loading ? <LoadingOutlined style={{
                                            fontSize: 28,
                                            color: '#999',
                                            flex: '1 0 100%',
                                            marginTop: 25
                                        }}/> : <PlusOutlined style={{
                                            fontSize: 24,
                                            color: '#999',
                                            flex: '1 0 100%',
                                            marginTop: 25
                                        }}/>}
                                        <div
                                            style={{
                                                fontSize: 12,
                                                marginTop: 8,
                                            }}
                                            className="ant-upload-text"
                                        >
                                            图片上传
                                        </div>
                                    </div>
                                )
                            }
                        </Upload>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default ProductManageDetail;
