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
    PlusCircleOutlined
} from '@ant-design/icons';
import {
    Button,
    Col,
    Input,
    InputNumber,
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
    Popover, List,
    Collapse,
    Descriptions,
    Switch
} from 'antd';
import '../../MaterialCenterLess.less'
import MaterialCenterModel from '../../MaterialCenterModel'
import {generateSku, getPageQuery, mergeLoading} from '../../../../utils'
import CheckInput from "../../../../utils/checkInput/CheckInput";
import MaterialManageUnitModal from "./MaterialManageUnitModal";
import MaterialManageUnitManageModal from "./MaterialManageUnitManageModal";
import UnitSelectModal from "../../../ProductCentre/unitLib/UnitSelectModal";
import SelectProductModal from "./SelectProductModal";
import NumberFormat from "../../../../utils/numberformat/NumberFormat";
import SWTable from 'SWViews/table';

const listPath = '/Pages/MaterialManageList'
const detailPath = '/Pages/MaterialManageDetail'
const {Panel} = Collapse;

class MaterialManageDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false, // 判断富文本是否加载完
            submitData: {}, // 提交的数据

            tempSpecList: [],//编辑时的规格列表
            specList: [],//生成后的规格列表
            skuList: [], //sku列表

            goodsTypeArray: [], // 物资类别
            info: {}, // 详情数据
            fileList: [], // 图片列表
            detailLoading: false, // 判断详情数据是否加载完
            goodsTypeLoading: false, // 判断物资类目数据是否加载完
            billData: {}, // 批量填充数据
            bitchFillState: false,

            pics: [],
            picIdx: 0,

            previewImage: '',
            pviIdx: 0,

            isUnitModalShow: false,
            isUnitManageModalShow: false,

            selectProductVisible: false,

            unitSelectVisi: false

        };
    }

    // 获取商品类目
    getGoodsType = () => {
        this.setState({goodsTypeLoading: true})
        MaterialCenterModel.CategoryList({}, res => {
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
            MaterialCenterModel.ProductGet({
                sn: id
            }, res => {
                // if (res.data.skuList && res.data.skuList[0] && res.data.skuList[0].specList) {
                //     res.data.skuList.forEach((item, index) => {
                //         let skuName = ''
                //         item.specList.forEach(n => {
                //             skuName += `${n.specName}:${n.specValue};`
                //             item[n.specName] = n.specValue
                //         })
                //         item.skuName = skuName
                //     })
                // }
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
                        convertUnitList: res.data.convertUnitList,

                    },
                    //skuList
                    skuList: res.data.skuList,
                    // cloneSkuList: cloneDeep(res.data.skuList),
                    tempSpecList: res.data.skuList && res.data.skuList.length > 0 ?
                        res.data.skuList[0].specList.map((item) => {
                            return item.specName;
                        }) : [],
                    specList: res.data.skuList && res.data.skuList.length > 0 ?
                        res.data.skuList[0].specList.map((item) => {
                            return item.specName;
                        }) : [],
                    //类目
                    treeExpandedKeys: treeExpandedKeys,
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
            MaterialCenterModel.ProductBatchDel({snList: [id]}, res => {
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
                <p style={{textAlign: 'center', fontSize: '14px', color: '#2B3441'}}>确认删除该物资?</p>
            </Modal>
        )
    }

    // 选择平台产品模态框
    selectPlatformGoods = () => {
        return this.state.selectProductVisible ?
            <SelectProductModal
                unit={this.state.submitData.unit}
                onSelect={(data) => {
                    this.prodSelectFun && this.prodSelectFun(data)
                }}
                onClose={() => {
                    this.setState({selectProductVisible: false})
                }}/>
            : null
    }

    // 提交数据
    saveOrUpdate = (goback = true, callback) => {
        // this.state.specList
        const {submitData} = this.state;
        const {id} = getPageQuery();
        // this.state.submitData['goodsDescribe'] = this.editorRef.getValue();
        // this.state.submitData['goodsDescribe'] = '';
        // this.state.submitData['imgUrl'] = this.state.submitData.imgList && this.state.submitData.imgList[0];

        if (id && id !== '') {
            // if (!this.state.submitData.canUpdateSku) {
            //     return message.error('该物资不能修改', 2);
            // }
            if (!submitData.goodsName)
                return message.error('SPU物资名称不能为空！', 1);
            if (!submitData.categorySn)
                return message.error('SPU物资类目不能为空！', 1);
            // if (!submitData.goodsCode)
            //     return message.error('SPU物资编码不能为空！', 1);
            if (!submitData.unit)
                return message.error('物资单位不能为空！', 1);

            // if (this.state.specList.length === 0)
            //     return message.error('物资sku规格不能为空！', 1);
            let skuList = this.state.skuList;
            if (skuList.length === 0)
                return message.error('物资sku不能为空！', 1);
            for (let i = 0; i < skuList.length; i++) {
                //goodsCode,goodsName,specList.specValue,imgUrl
                for (let j = 0; j < skuList[i].specList.length; j++) {
                    if (!skuList[i].specList[j].specValue) {
                        return message.error('请完善Sku信息！', 1);
                    }
                }
                if (!skuList[i].goodsName) {
                    return message.error('请完善Sku信息！', 1);
                }
                // else if (!skuList[i].platformGoodsSn) {
                //     return message.error('请完善Sku关联产品信息！', 1);
                // }
            }

            MaterialCenterModel.ProductUpdate({
                ...this.state.submitData,
                skuList: skuList,
                sn: id
            }, res => {
                message.success('修改物资成功')
                callback && callback(true)
                if (goback === true) {
                    this.props.history.push(listPath)
                }
            })
        } else {
            if (!submitData.goodsName)
                return message.error('SPU物资名称不能为空！', 1);
            if (!submitData.categorySn)
                return message.error('SPU物资类目不能为空！', 1);
            // if (!submitData.goodsCode)
            //     return message.error('SPU物资编码不能为空！', 1);
            if (!submitData.unit)
                return message.error('物资单位不能为空！', 1);

            // if (this.state.specList.length === 0)
            //     return message.error('物资sku规格不能为空！', 1);
            let skuList = this.state.skuList;
            if (skuList.length === 0)
                return message.error('物资sku不能为空！', 1);
            for (let i = 0; i < skuList.length; i++) {
                //goodsCode,goodsName,specList.specValue,imgUrl
                for (let j = 0; j < skuList[i].specList.length; j++) {
                    if (!skuList[i].specList[j].specValue) {
                        return message.error('请完善Sku信息！', 1);
                    }
                }
                if (!skuList[i].goodsName) {
                    return message.error('请完善Sku信息！', 1);
                } else if (!skuList[i].platformGoodsSn) {
                    return message.error('请完善Sku关联产品信息！', 1);
                }
            }

            MaterialCenterModel.ProductAdd({
                ...this.state.submitData,
                skuList: skuList
            }, res => {
                this.setState({info: {...this.state.info, goodsSn: res.data}})
                message.success('添加物资成功')
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
        MaterialCenterModel.ProductEnable({sn: id}, () => {
            this.getDetail();
        }, () => {
        })
    }

    disable() {
        const {id, operation} = getPageQuery()
        MaterialCenterModel.ProductDisable({sn: id}, () => {
            this.getDetail();
        }, () => {
        })
    }

    render() {
        const {id} = getPageQuery()
        return (
            <TabsViewContent
                crumb={[{name: '平台物资'}, {name: "编辑物资"}]}
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
                        {/*            title: '发布物资前将对物资进行一次保存,确认保存物资?',*/}
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
                        {/*    发布物资*/}
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
                    {this.selectPlatformGoods()}
                    {this.renderModifiedTitle('基本信息')}
                    {this.renderBaseInfo()}
                    {this.renderModifiedTitle('规格与SKU组合')}
                    {this.renderSKU()}
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
                <MaterialManageUnitModal
                    visible={this.state.isUnitModalShow}
                    onOk={(values) => {
                        this.materialManageUnitModalOk(values);
                    }}
                    onCancel={() => {
                        this.setState({
                            isUnitModalShow: false
                        });
                    }}
                    unit={this.state.submitData.unit}
                    convertUnitList={this.state.submitData.convertUnitList}
                    unitRelationList={this.selectedUnitRelationList}
                />
                <MaterialManageUnitManageModal
                    sn={id || ''}
                    unit={this.state.submitData.unit}
                    convertUnitList={this.state.submitData.convertUnitList}
                    onOk={(values) => {
                        this.setState({
                            submitData: {
                                ...this.state.submitData,
                                convertUnitList: values.convertUnitList,
                            }
                        });
                    }}
                    onCancel={() => {
                        this.setState({
                            isUnitManageModalShow: false
                        });
                    }}
                    visible={this.state.isUnitManageModalShow}
                />
                {this.state.unitSelectVisi ? <UnitSelectModal
                    onSelect={(data) => {
                        this.unitSelectFun && this.unitSelectFun(data.unit)
                        this.setState({unitSelectVisi: false})
                    }}
                    onClose={() => {
                        this.setState({unitSelectVisi: false})
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
        const {id, operation} = getPageQuery();
        const columns = [
            {
                title: '序号',
                dataIndex: 'index',
                key: 'index',
                render: (text, record, index) => index + 1,
            },
            {
                title: '单位',
                dataIndex: 'index',
                key: 'index',
                render: (text, record) => {
                    return <p>{record.convertUnit}{record.isDefault ? '（默认）' : null}</p>
                }
            },
            {
                title: '操作',
                dataIndex: 'index',
                key: 'index',
                render: (text, record, index) => <Popconfirm
                    placement="topRight"
                    title="是否移除该副单位？"
                    onConfirm={() => {
                        if (record.isDefault) {
                            message.warning('该单位为默认副单位！');

                            return false;
                        }
                        let newConvertUnitList = this.state.submitData.convertUnitList.filter(i => i.convertUnit !== record.convertUnit);
                        this.setState({
                            submitData: {
                                ...this.state.submitData,
                                convertUnitList: newConvertUnitList
                            }
                        });
                    }}
                    okText="确认"
                    cancelText="取消"
                >
                    <a style={{color: '#ff4757'}}>删除</a>
                </Popconfirm>
            },
        ];

        return (
            <div style={{padding: 20}}>
                <div className={'sw-form'}>
                    <Row gutter={12}>
                        <Col span={24} style={{marginBottom: 24}}>
                            <Row>
                                <Col span={3}>
                                    <label className={'sw-form-label'}>
                                        {/*{this.renderAsterisk()}*/}
                                        SPU物资名称：
                                    </label>
                                </Col>
                                <Col span={8}>
                                    {this.renderInput('goodsName', '请填写物资名称', 100)}
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24} style={{marginBottom: 24}}>
                            <Row>
                                <Col span={3}>
                                    <label className={'sw-form-label'}>
                                        {/*{this.renderAsterisk()}*/}
                                        SPU物资类目：
                                    </label>
                                </Col>
                                <Col span={8}>
                                    {this.renTreeSelect('categorySn', '请选择物资类目', 30)}
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24} style={{marginBottom: 24}}>
                            <Row>
                                <Col span={3}>
                                    <label className={'sw-form-label'}>
                                        {/*{this.renderAsterisk()}*/}
                                        SPU物资编码：
                                    </label>
                                </Col>
                                <Col span={8}>
                                    {/*{this.renderInput('goodsCode', '请填写物资编码', 30, (id && operation === 'edit'))}*/}
                                    {this.renderInput('goodsCode', '', 30, true)}
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24} style={{marginBottom: 24}}>
                            <Row>
                                <Col span={3}>
                                    <label className={'sw-form-label'}>
                                        {/*{this.renderAsterisk()}*/}
                                        物资单位：
                                    </label>
                                </Col>
                                <Col span={8}>
                                    <Input
                                        disabled={id && id !== ''}
                                        title={this.state.submitData.unit}
                                        placeholder={'请选择物资单位'}
                                        style={{fontSize: 14, color: 'rgba(43,52,65,0.65)'}}
                                        value={this.state.submitData.unit}
                                        onClick={() => {
                                            this.unitSelectFun = (data) => {
                                                this.setState({
                                                    submitData: {
                                                        ...this.state.submitData,
                                                        unit: data
                                                    }
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
                                <Col span={3}>
                                    <label className={'sw-form-label'}>
                                        副单位(选填)：
                                    </label>
                                </Col>
                                <Col span={8}>
                                    <SWTable
                                        columns={columns}
                                        dataSource={this.state.submitData.convertUnitList}
                                        pagination={
                                            false
                                        }
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24} style={{marginBottom: 24}}>
                            <Row>
                                <Col span={8} offset={3}>
                                    <Button
                                        type="primary"
                                        onClick={
                                            () => {
                                                this.setState({
                                                    isUnitManageModalShow: true
                                                });
                                            }
                                        }
                                    >
                                        副单位管理
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                        {/*<Col span={24} style={{marginBottom: 24}}>*/}
                        {/*    <Row>*/}
                        {/*        <Col span={4}>*/}
                        {/*            <label className={'sw-form-label'}>税务分类编码：</label>*/}
                        {/*        </Col>*/}
                        {/*        <Col span={8}>*/}
                        {/*            {this.renderInput('taxCode', '请填写税务分类编码', 30)}*/}
                        {/*        </Col>*/}
                        {/*    </Row>*/}
                        {/*</Col>*/}
                    </Row>
                </div>
            </div>
        )
    }

    renderSKU = () => {
        return <div className={'sw-form'}
                    style={{padding: '30px 10px 10px 30px'}}>
            <Row gutter={12}>
                {/*<Col span={24} style={{marginBottom: 24}}>*/}
                {/*    <Row>*/}
                {/*        <Col span={3}>*/}
                {/*            <label className={'sw-form-label'}>规格编辑器：</label>*/}
                {/*        </Col>*/}
                {/*        <Col span={20}>*/}
                {/*            {this.SpecView()}*/}
                {/*        </Col>*/}
                {/*    </Row>*/}
                {/*</Col>*/}
                <Col span={24} style={{marginBottom: 24}}>
                    {/*<Row>*/}
                    {/*    <Col span={3}>*/}
                    {/*        <label className={'sw-form-label'}>SKU 组合：</label>*/}
                    {/*    </Col>*/}
                    {/*    <Col span={20}>*/}
                    {/*        {this.SkuView()}*/}
                    {/*    </Col>*/}
                    {/*</Row>*/}
                    {this.skuListView()}
                </Col>
            </Row>
            {this.BillModal()}
        </div>
    }
    //规格view
    // SpecView = () => {
    //     let {tempSpecList} = this.state;
    //     return <div style={{border: '1px solid rgba(43,52,65,0.25)', padding: '8px'}}>
    //         {tempSpecList && tempSpecList.map((n, nIndex) => (
    //             <div key={nIndex} style={{marginTop: nIndex !== 0 ? 16 : 0, margin: 0}}>
    //                 <div style={{background: 'rgba(43,52,65,0.05)', padding: '8px 0'}}>
    //                     <Row gutter={12}>
    //                         <Col span={3} style={{textAlign: 'right'}}>
    //                             <label style={{
    //                                 fontSize: 14,
    //                                 fontWeight: 500,
    //                                 color: 'rgba(43,52,65,1)',
    //                                 lineHeight: '32px'
    //                             }}>规格名{nIndex + 1}: </label>
    //                         </Col>
    //                         <Col span={7}>
    //                             <Input
    //                                 maxLength={50}
    //                                 onChange={e => {
    //                                     tempSpecList[nIndex] = e.target.value
    //                                     this.setState({tempSpecList})
    //                                 }}
    //                                 value={n}
    //                             />
    //                         </Col>
    //                         {tempSpecList.length > 0 ? <MinusCircleOutlined
    //                             onClick={() => {
    //                                 tempSpecList.splice(nIndex, 1)
    //                                 this.setState({tempSpecList})
    //                             }}
    //                             style={{fontSize: 16, cursor: 'pointer', lineHeight: '32px'}}/> : null}
    //                     </Row>
    //                 </div>
    //             </div>
    //         ))}
    //         {tempSpecList && tempSpecList.length === 0 && (
    //             <Empty/>
    //         )}
    //         <div style={{background: 'rgba(43,52,65,0.05)', padding: 8, marginTop: 24}}>
    //             <Button
    //                 style={{
    //                     fontSize: 14,
    //                     fontWeight: 500,
    //                     color: '#2B3441',
    //                     lineHeight: '20px',
    //                     padding: '6px 16px',
    //                     height: 32
    //                 }}
    //                 onClick={() => {
    //                     tempSpecList.push('');
    //                     this.setState({tempSpecList})
    //                 }}
    //             >
    //                 添加规格
    //             </Button>
    //             <Button
    //                 style={{
    //                     marginLeft: 12,
    //                     fontSize: 14,
    //                     fontWeight: 500,
    //                     color: '#2B3441',
    //                     lineHeight: '20px',
    //                     padding: '6px 16px',
    //                     height: 32
    //                 }}
    //                 onClick={() => {
    //                     if (this.state.tempSpecList.length == 0) {
    //                         return;
    //                     }
    //                     Modal.confirm({
    //                         title: '是否清空规格编辑器',
    //                         okText: '确定',
    //                         cancelText: '取消',
    //                         onOk: () => {
    //                             this.setState({tempSpecList: []})
    //                         },
    //                         onCancel: () => {
    //                         },
    //                     });
    //                 }}
    //             >清空规格</Button>
    //             <Button
    //                 disabled={this.state.tempSpecList.length == 0}
    //                 type={'primary'}
    //                 style={{
    //                     marginLeft: 12,
    //                     fontSize: 14,
    //                     fontWeight: 500,
    //                     lineHeight: '20px',
    //                     padding: '6px 16px',
    //                     height: 32
    //                 }}
    //                 onClick={() => {
    //                     Modal.confirm({
    //                         title: '生成新的规格',
    //                         content: '生成新的规格，下方规格部分的数据将被重置',
    //                         okText: '确定',
    //                         cancelText: '取消',
    //                         onOk: () => {
    //                             for (let i = 0; i < tempSpecList.length; i++) {
    //                                 if (CheckInput.isNull(tempSpecList[i])) {
    //                                     message.info("规格名不能为空");
    //                                     return;
    //                                 }
    //                             }
    //                             if (uniq(tempSpecList).length != tempSpecList.length) {
    //                                 return message.info("规格名不能重复");
    //                             }
    //                             let skuList = this.state.skuList.map((item) => {
    //                                 return {
    //                                     ...item,
    //                                     specList: tempSpecList.map((it) => {
    //                                         for (let i = 0; i < item.specList.length; i++) {
    //                                             if (item.specList[i].specName == it) {
    //                                                 return {
    //                                                     specName: it,
    //                                                     specValue: item.specList[i].specValue || ''
    //                                                 }
    //                                             }
    //                                         }
    //                                         return {
    //                                             specName: it,
    //                                             specValue: ''
    //                                         }
    //                                     }),
    //                                 }
    //                             });
    //                             this.setState({
    //                                 specList: cloneDeep(tempSpecList),
    //                                 skuList: cloneDeep(skuList)
    //                             });
    //                         },
    //                         onCancel: () => {
    //                         },
    //                     });
    //                 }}
    //             >生成规格</Button>
    //         </div>
    //     </div>;
    // }
    //skuview
    // SkuView = () => {
    //     const {id, operation} = getPageQuery();
    //     let skuList = this.state.skuList;
    //     return <div>
    //         <div style={{width: '100%', overflowX: 'auto'}}>
    //             <Table
    //                 style={{
    //                     // width: (45 + 160 + 160 + 160 + 75 + 50)
    //                     //     + (this.state.specList.length > 1 ? 95 : 160 * this.state.specList.length)
    //                     //     + 1 * (6 + this.state.specList.length)
    //                 }}
    //                 scroll={this.state.specList.length > 1 || true ? {
    //                     x: (45 + 160 + 160 + 160 + 160 + 75 + 50 + 100 + 160)
    //                         //spec数量
    //                         + (160 * this.state.specList.length)
    //                         //竖线的数量
    //                         + 1 * (9 + this.state.specList.length)
    //                 } : {}}
    //                 columns={[
    //                     {
    //                         title: <PlusCircleOutlined
    //                             style={{color: '#4481EB', fontSize: 22}}
    //                             onClick={() => {
    //                                 skuList.push({
    //                                     goodsCode: '',//	string	是	物资自定义编码
    //                                     goodsName: '',//	string	是	物资名称
    //                                     specList: this.state.specList.map((item) => {
    //                                         return {
    //                                             specName: item,
    //                                             specValue: ""
    //                                         }
    //                                     }),//	arr-obj	是	规格列表
    //                                     goodsStatus: 1,//	int	是	物资状态 1:启用 2:停用
    //                                     imgUrl: '',//	string	是	物资图片url
    //                                 });
    //                                 this.setState({skuList: cloneDeep(skuList)})
    //                             }}/>,
    //                         key: 'option',
    //                         dataIndex: 'option',
    //                         width: 45,
    //                         render: (text, record, index) => {
    //                             return <Popconfirm
    //                                 title="确认删除该条数据?"
    //                                 onConfirm={() => {
    //                                     skuList.splice(index, 1)
    //                                     this.setState({skuList: cloneDeep(skuList)})
    //                                 }}
    //                                 okText="确定"
    //                                 cancelText="取消">
    //                                 <MinusCircleOutlined style={{color: '#F12C20', fontSize: 22}}/>
    //                             </Popconfirm>
    //                         }
    //                     },
    //                     {
    //                         title: '物资编码',
    //                         key: 'goodsCode',
    //                         dataIndex: 'goodsCode',
    //                         width: 160,
    //                         render: (text, record, index) => {
    //                             return <Input
    //                                 title={text}
    //                                 disabled={(id && operation === 'edit' && record.goodsSn)}
    //                                 maxLength={50}
    //                                 value={text}
    //                                 onChange={(e) => {
    //                                     skuList[index].goodsCode = e.target.value;
    //                                     this.setState({skuList})
    //                                 }}
    //                             />
    //                         }
    //                     },
    //                     {
    //                         title: '物资名称',
    //                         key: 'goodsName',
    //                         dataIndex: 'goodsName',
    //                         width: 160,
    //                         render: (text, record, index) => {
    //                             return <Input
    //                                 maxLength={50}
    //                                 value={text}
    //                                 onChange={(e) => {
    //                                     skuList[index].goodsName = e.target.value;
    //                                     this.setState({skuList})
    //                                 }}
    //                             />
    //                         }
    //                     },
    //                     ...this.state.specList.map((item, index) => {
    //                         return {
    //                             title: item,
    //                             key: item,
    //                             dataIndex: item,
    //                             width: 160,
    //                             render: (text, record, idx) => {
    //                                 return <Input
    //                                     maxLength={50}
    //                                     value={skuList[idx].specList && skuList[idx].specList[index] ?
    //                                         skuList[idx].specList[index].specValue : ''}
    //                                     onChange={(e) => {
    //                                         //e.target.value
    //                                         if (!skuList[idx].specList) {
    //                                             skuList[idx].specList = this.state.specList.map((item) => {
    //                                                 return {specName: item, specValue: ""}
    //                                             });
    //                                         }
    //                                         skuList[idx].specList[index].specValue = e.target.value;
    //                                         this.setState({skuList: skuList})
    //                                     }}
    //                                 />
    //                             }
    //                         }
    //                     }),
    //                     {
    //                         title: '单位理论重量(KG)',
    //                         key: 'weight',
    //                         dataIndex: 'weight',
    //                         width: 160,
    //                         render: (text, record, index) => {
    //                             return <InputNumber
    //                                 style={{width: 150}}
    //                                 title={text}
    //                                 min={0}
    //                                 precision={4}
    //                                 max={99999999.99}
    //                                 maxLength={50}
    //                                 value={text}
    //                                 onChange={(e) => {
    //                                     skuList[index].weight = e;
    //                                     this.setState({skuList})
    //                                 }}
    //                             />
    //                         }
    //                     },
    //                     {
    //                         title: '物资单位',
    //                         key: 'unit',
    //                         dataIndex: 'unit',
    //                         width: 160,
    //                         render: (text, record, index) => {
    //                             return <Input
    //                                 title={this.state.submitData.unit}
    //                                 disabled={true}
    //                                 maxLength={50}
    //                                 value={this.state.submitData.unit}
    //                                 onChange={(e) => {
    //                                 }}
    //                             />
    //                         }
    //                     },
    //                     {
    //                         title: '是否启用',
    //                         key: 'goodsStatus',
    //                         dataIndex: 'goodsStatus',
    //                         width: 75,
    //                         render: (text, record, idx) => {
    //                             return <Checkbox
    //                                 style={{
    //                                     marginLeft: 17
    //                                 }}
    //                                 checked={parseInt(text) == 1}
    //                                 onChange={(e) => {
    //                                     skuList[idx].goodsStatus = e.target.checked ? 1 : 2;
    //                                     this.setState({skuList});
    //                                 }}/>
    //                         }
    //                     },
    //                     {
    //                         title: '图片',
    //                         key: 'imgUrl',
    //                         dataIndex: 'imgUrl',
    //                         width: 50,
    //                         render: (text, record, index) => {
    //                             return this.renderSkuImg(text, record, index);
    //                         }
    //                     },
    //                     {
    //                         title: "设置单位公式转换",
    //                         key: "",
    //                         width: 100,
    //                         render: (text, record, index) => {
    //                             return (
    //                                 <Button
    //                                     type="primary"
    //                                     onClick={
    //                                         () => {
    //                                             this.selectedUnitRelationList = record.unitRelationList;
    //                                             this.materialManageUnitModalOk = (values) => {
    //                                                 skuList[index].unitRelationList = values.unitRelationList;
    //                                                 this.setState({
    //                                                     skuList
    //                                                 });
    //                                             };
    //                                             this.setState({
    //                                                 isUnitModalShow: true,
    //                                             });
    //                                         }
    //                                     }
    //                                 >设置</Button>
    //                             );
    //                         }
    //                     },
    //                     {
    //                         title: '关联产品',
    //                         key: 'platformGoodsSn',
    //                         dataIndex: 'platformGoodsSn',
    //                         width: 160,
    //                         render: (text, record, index) => {
    //                             return <div>
    //                                 {text ? <div>
    //                                     编号:{record.platformGoodsCode}<br/>
    //                                     名称:{record.platformGoodsName}<br/>
    //                                 </div> : <div>未关联产品</div>}
    //                                 <Button type={text ? '' : 'primary'} onClick={() => {
    //                                     if (!this.state.submitData.unit)
    //                                         return message.error('请先选择物资单位！', 1);
    //                                     this.prodSelectFun = (data) => {
    //                                         let skuList = this.state.skuList;
    //                                         skuList[index].platformGoodsSn = data.sn;
    //                                         skuList[index].platformGoodsCode = data.goodsCode;
    //                                         skuList[index].platformGoodsName = data.goodsName;
    //                                         this.setState({
    //                                             skuList,
    //                                             selectProductVisible: false,
    //                                         })
    //                                     }
    //                                     this.setState({selectProductVisible: true});
    //                                 }}>{text ? "更换产品" : "关联产品"}</Button>
    //                             </div>
    //                         }
    //                     },
    //                 ]}
    //                 dataSource={this.state.skuList}
    //                 pagination={false}
    //                 bordered
    //                 footer={() => (
    //                     this.state.skuList.length > 0 ?
    //                         <a onClick={() => {
    //                             this.setState({
    //                                 billVisible: true
    //                             })
    //                         }}>批量填充</a> :
    //                         <a style={{color: '#ccc'}}>批量填充</a>
    //                 )}
    //             />
    //         </div>
    //     </div>;
    // }
    skuListView = () => {
        const columns = [
            {
                title: '序号',
                dataIndex: 'index',
                key: 'index',
                render: (text, record, index) => index + 1,
            },
            {
                title: '规格名称',
                dataIndex: 'specName',
                key: 'specName',
            },
            {
                title: '规格值',
                dataIndex: 'specValue',
                key: 'specValue',
            },
        ];
        const {id, operation} = getPageQuery()
        let skuList = this.state.skuList;
        return <div>
            <div style={{display: 'flex'}}>
                <Button type='primary' onClick={() => {
                    skuList.push({
                        goodsCode: '',//	string	是	物资自定义编码
                        goodsName: '',//	string	是	物资名称
                        specList: this.state.specList.map((item) => {
                            return {
                                specName: item,
                                specValue: ""
                            }
                        }),//	arr-obj	是	规格列表
                        goodsStatus: 1,//	int	是	物资状态 1:启用 2:停用
                        imgUrl: '',//	string	是	物资图片url
                    });
                    this.setState({skuList: cloneDeep(skuList)})
                }} style={{
                    marginRight: 20
                }}>添加</Button>
                {this.state.skuList.length > 0 ?
                    <Button onClick={() => {
                        this.setState({
                            billVisible: true
                        })
                    }}>批量填充</Button> :
                    <Button disabled>批量填充</Button>}
            </div>
            <Collapse defaultActiveKey={0} style={{marginTop: 18}}>
                {
                    this.state.skuList.map((item, index) => (
                        <Panel
                            forceRender={true}
                            header={
                                <span style={{marginRight: 50}}>SKU {index + 1} 信息</span>
                            }
                            key={index}
                            // collapsible="header"
                            extra={
                                <>
                                    <span>是否启用：</span>
                                    <Switch
                                        style={{
                                            margin: 0,
                                            padding: 0
                                        }}
                                        checked={parseInt(item.goodsStatus) === 1}
                                        onChange={(checked, e) => {
                                            e.stopPropagation();
                                            skuList[index].goodsStatus = checked ? 1 : 2;
                                            this.setState({skuList});
                                        }}/>
                                    <Popconfirm
                                        title="确认删除该条数据?"
                                        onConfirm={e => {
                                            e.stopPropagation();
                                            skuList.splice(index, 1);
                                            this.setState({
                                                skuList: cloneDeep(skuList)
                                            }, () => {
                                                message.success('删除成功！', 1);
                                            });
                                        }}
                                        onCancel={e => {
                                            e.stopPropagation();
                                        }}
                                        okText="确定"
                                        cancelText="取消">
                                        <a onClick={e => {
                                            e.stopPropagation();
                                        }} style={{marginLeft: 20, color: '#ff4757'}}>删除</a>
                                    </Popconfirm>
                                </>
                            }
                        >
                            <Descriptions title="SKU 基本信息" column={2}>
                                <Descriptions.Item label="物资编号">{item.goodsCode}</Descriptions.Item>
                                <Descriptions.Item label="物资名称">
                                    <Input
                                        style={{width: 260}}
                                        maxLength={50}
                                        value={item.goodsName}
                                        onChange={(e) => {
                                            skuList[index].goodsName = e.target.value;
                                            this.setState({skuList});
                                        }}
                                    />
                                </Descriptions.Item>
                                <Descriptions.Item label="规格信息">
                                    {item.specList ? item.specList.map((it) => {
                                        return it.specName + "：" + it.specValue
                                    }).join("；") : ""}
                                </Descriptions.Item>
                                <Descriptions.Item label="图片">
                                    {this.renderSkuImg(item.imgUrl, item, index)}
                                </Descriptions.Item>
                                <Descriptions.Item label="设置单位公式换算">
                                    <a
                                        onClick={
                                            () => {
                                                this.selectedUnitRelationList = item.unitRelationList;
                                                this.materialManageUnitModalOk = (values) => {
                                                    skuList[index].unitRelationList = values.unitRelationList;
                                                    this.setState({
                                                        skuList
                                                    });
                                                };
                                                this.setState({
                                                    isUnitModalShow: true,
                                                });
                                            }
                                        }>设置</a>
                                </Descriptions.Item>
                            </Descriptions>
                            <div className="ant-descriptions-header">
                                <div className="ant-descriptions-title">SKU 绑定信息</div>
                            </div>
                            {id && id !== '' && item.goodsCode ? null : <div style={{marginBottom: 6}}>
                                <Button type={item.platformGoodsSn ? '' : 'primary'} onClick={() => {
                                    if (!this.state.submitData.unit)
                                        return message.error('请先选择物资单位！', 1);
                                    this.prodSelectFun = (data) => {
                                        let skuList = this.state.skuList;
                                        skuList[index].platformGoodsSn = data.sn;
                                        skuList[index].platformGoodsCode = data.goodsCode;
                                        skuList[index].platformGoodsName = data.goodsName;
                                        skuList[index].specList = data.specList;
                                        this.setState({
                                            skuList,
                                            selectProductVisible: false,
                                        })
                                    }
                                    this.setState({selectProductVisible: true});
                                }}>{item.platformGoodsSn ? "更换产品" : "关联产品"}</Button>
                            </div>}
                            {item.platformGoodsSn ? <>
                                <div style={{
                                    display: 'flex',
                                    marginBottom: 6,
                                    fontSize: 'smaller',
                                    color: '#2B3441',
                                    alignItems: 'center'
                                }}>
                                    关联产品的编号：{item.platformGoodsCode}
                                </div>
                                <div style={{
                                    display: 'flex',
                                    marginBottom: 6,
                                    fontSize: 'smaller',
                                    color: '#2B3441',
                                    alignItems: 'center'
                                }}>
                                    关联产品的名称：{item.platformGoodsName}
                                </div>
                                <div style={{
                                    display: 'flex',
                                    marginBottom: 6,
                                    fontSize: 'smaller',
                                    color: '#2B3441',
                                    alignItems: 'center'
                                }}>
                                    关联产品的规格：
                                </div>
                                <SWTable
                                    columns={columns}
                                    dataSource={item.specList}
                                    pagination={
                                        false
                                    }
                                />
                            </> : <div style={{
                                display: 'flex',
                                marginBottom: 6,
                                fontSize: 14,
                                color: '#2B3441',
                                alignItems: 'center'
                            }}>未关联产品</div>}
                        </Panel>
                    ))
                }
            </Collapse>
            {/*<List*/}
            {/*    dataSource={skuList}*/}
            {/*    renderItem={(item, index) => (*/}
            {/*        <List.Item>*/}
            {/*            <div>*/}
            {/*                <div style={{*/}
            {/*                    display: 'flex',*/}
            {/*                    fontSize: 16,*/}
            {/*                    color: '#2B3441',*/}
            {/*                    alignItems: 'center',*/}
            {/*                    marginBottom: 6,*/}
            {/*                    fontWeight: 'bold',*/}
            {/*                }}>*/}
            {/*                    <Popconfirm*/}
            {/*                        title="确认删除该条数据?"*/}
            {/*                        onConfirm={() => {*/}
            {/*                            skuList.splice(index, 1)*/}
            {/*                            this.setState({skuList: cloneDeep(skuList)})*/}
            {/*                        }}*/}
            {/*                        okText="确定"*/}
            {/*                        cancelText="取消">*/}
            {/*                        <MinusCircleOutlined style={{color: '#F12C20', fontSize: 22}}/>*/}
            {/*                    </Popconfirm>*/}
            {/*                    <div style={{marginLeft: 6}}>Sku{index + 1}信息：</div>*/}
            {/*                </div>*/}
            {/*                <label style={{*/}
            {/*                    fontSize: 14,*/}
            {/*                    color: '#2B3441',*/}
            {/*                    fontWeight: 'bold'*/}
            {/*                }}>Sku基本信息</label>*/}
            {/*                <div style={{*/}
            {/*                    display: 'flex',*/}
            {/*                    marginBottom: 6,*/}
            {/*                    fontSize: 14,*/}
            {/*                    color: '#2B3441',*/}
            {/*                    alignItems: 'center'*/}
            {/*                }}>*/}
            {/*                    物资编号：{item.goodsCode}*/}
            {/*                </div>*/}
            {/*                <div style={{*/}
            {/*                    display: 'flex',*/}
            {/*                    marginBottom: 6,*/}
            {/*                    fontSize: 14,*/}
            {/*                    color: '#2B3441',*/}
            {/*                    alignItems: 'center'*/}
            {/*                }}>*/}
            {/*                    物资名称：<Input*/}
            {/*                    style={{width: 260}}*/}
            {/*                    maxLength={50}*/}
            {/*                    value={item.goodsName}*/}
            {/*                    onChange={(e) => {*/}
            {/*                        skuList[index].goodsName = e.target.value;*/}
            {/*                        this.setState({skuList})*/}
            {/*                    }}*/}
            {/*                />*/}
            {/*                </div>*/}
            {/*                <div style={{*/}
            {/*                    display: 'flex',*/}
            {/*                    marginBottom: 6,*/}
            {/*                    fontSize: 14,*/}
            {/*                    color: '#2B3441',*/}
            {/*                    alignItems: 'center'*/}
            {/*                }}>*/}
            {/*                    规格信息：{item.specList ? item.specList.map((it) => {*/}
            {/*                    return it.specName + "：" + it.specValue*/}
            {/*                }).join("；") : ""}*/}
            {/*                </div>*/}
            {/*                /!*<div style={{*!/*/}
            {/*                /!*    display: 'flex',*!/*/}
            {/*                /!*    marginBottom: 6,*!/*/}
            {/*                /!*    fontSize: 14,*!/*/}
            {/*                /!*    color: '#2B3441',*!/*/}
            {/*                /!*    alignItems: 'center'*!/*/}
            {/*                /!*}}>*!/*/}
            {/*                /!*    单位理论重量(KG)：<InputNumber*!/*/}
            {/*                /!*    style={{width: 150}}*!/*/}
            {/*                /!*    title={item.weight}*!/*/}
            {/*                /!*    min={0}*!/*/}
            {/*                /!*    precision={4}*!/*/}
            {/*                /!*    max={99999999.99}*!/*/}
            {/*                /!*    maxLength={50}*!/*/}
            {/*                /!*    value={item.weight}*!/*/}
            {/*                /!*    onChange={(e) => {*!/*/}
            {/*                /!*        skuList[index].weight = e;*!/*/}
            {/*                /!*        this.setState({skuList})*!/*/}
            {/*                /!*    }}*!/*/}
            {/*                /!*//*/}
            {/*                /!*</div>*!/*/}
            {/*                <div style={{*/}
            {/*                    display: 'flex',*/}
            {/*                    marginBottom: 12,*/}
            {/*                    fontSize: 14,*/}
            {/*                    color: '#2B3441',*/}
            {/*                    alignItems: 'center'*/}
            {/*                }}>*/}
            {/*                    图片：{this.renderSkuImg(item.imgUrl, item, index)}*/}
            {/*                </div>*/}
            {/*                <div style={{*/}
            {/*                    display: 'flex',*/}
            {/*                    marginBottom: 6,*/}
            {/*                    fontSize: 14,*/}
            {/*                    color: '#2B3441',*/}
            {/*                    alignItems: 'center'*/}
            {/*                }}>*/}
            {/*                    是否启用：<Checkbox*/}
            {/*                    style={{*/}
            {/*                        margin: 0,*/}
            {/*                        padding: 0*/}
            {/*                    }}*/}
            {/*                    checked={parseInt(item.goodsStatus) == 1}*/}
            {/*                    onChange={(e) => {*/}
            {/*                        skuList[index].goodsStatus = e.target.checked ? 1 : 2;*/}
            {/*                        this.setState({skuList});*/}
            {/*                    }}/>*/}
            {/*                </div>*/}
            {/*                <div style={{*/}
            {/*                    display: 'flex',*/}
            {/*                    marginBottom: 6,*/}
            {/*                    fontSize: 14,*/}
            {/*                    color: '#2B3441',*/}
            {/*                    alignItems: 'center'*/}
            {/*                }}>*/}
            {/*                    设置单位公式换算：<Button*/}
            {/*                    type="primary"*/}
            {/*                    onClick={*/}
            {/*                        () => {*/}
            {/*                            this.selectedUnitRelationList = item.unitRelationList;*/}
            {/*                            this.materialManageUnitModalOk = (values) => {*/}
            {/*                                skuList[index].unitRelationList = values.unitRelationList;*/}
            {/*                                this.setState({*/}
            {/*                                    skuList*/}
            {/*                                });*/}
            {/*                            };*/}
            {/*                            this.setState({*/}
            {/*                                isUnitModalShow: true,*/}
            {/*                            });*/}
            {/*                        }*/}
            {/*                    }>设置</Button>*/}
            {/*                </div>*/}
            {/*                <div style={{*/}
            {/*                    fontSize: 14,*/}
            {/*                    color: '#2B3441',*/}
            {/*                    fontWeight: 'bold',*/}
            {/*                    marginBottom: 12*/}
            {/*                }}>Sku绑定信息*/}
            {/*                </div>*/}
            {/*                {id && id !== '' && item.goodsCode ? null : <div style={{marginBottom: 6}}>*/}
            {/*                    <Button type={item.platformGoodsSn ? '' : 'primary'} onClick={() => {*/}
            {/*                        if (!this.state.submitData.unit)*/}
            {/*                            return message.error('请先选择物资单位！', 1);*/}
            {/*                        this.prodSelectFun = (data) => {*/}
            {/*                            let skuList = this.state.skuList;*/}
            {/*                            skuList[index].platformGoodsSn = data.sn;*/}
            {/*                            skuList[index].platformGoodsCode = data.goodsCode;*/}
            {/*                            skuList[index].platformGoodsName = data.goodsName;*/}
            {/*                            skuList[index].specList = data.specList;*/}
            {/*                            this.setState({*/}
            {/*                                skuList,*/}
            {/*                                selectProductVisible: false,*/}
            {/*                            })*/}
            {/*                        }*/}
            {/*                        this.setState({selectProductVisible: true});*/}
            {/*                    }}>{item.platformGoodsSn ? "更换产品" : "关联产品"}</Button>*/}
            {/*                </div>*/}
            {/*                }*/}
            {/*                {item.platformGoodsSn ? <>*/}
            {/*                    <div style={{*/}
            {/*                        display: 'flex',*/}
            {/*                        marginBottom: 6,*/}
            {/*                        fontSize: 14,*/}
            {/*                        color: '#2B3441',*/}
            {/*                        alignItems: 'center'*/}
            {/*                    }}>*/}
            {/*                        关联产品编号：{item.platformGoodsCode}*/}
            {/*                    </div>*/}
            {/*                    <div style={{*/}
            {/*                        display: 'flex',*/}
            {/*                        marginBottom: 6,*/}
            {/*                        fontSize: 14,*/}
            {/*                        color: '#2B3441',*/}
            {/*                        alignItems: 'center'*/}
            {/*                    }}>*/}
            {/*                        关联产品名称：{item.platformGoodsName}*/}
            {/*                    </div>*/}
            {/*                </> : <div style={{*/}
            {/*                    display: 'flex',*/}
            {/*                    marginBottom: 6,*/}
            {/*                    fontSize: 14,*/}
            {/*                    color: '#2B3441',*/}
            {/*                    alignItems: 'center'*/}
            {/*                }}>未关联产品</div>}*/}
            {/*            </div>*/}
            {/*        </List.Item>*/}
            {/*    )}*/}
            {/*/>*/}
        </div>;
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
                        if (billData.weight && !(billData.weight == "")) {
                            skuList[i].weight = billData.weight;
                        }
                        if (billData.imgUrl && !(billData.imgUrl == "")) {
                            skuList[i].imgUrl = billData.imgUrl;
                        }
                        skuList[i].unitRelationList = this.BillModalUnitRelationList; // 赋值转换单位
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
                {/*<div style={{display: 'flex', alignItems: 'center', marginBottom: 16}}>*/}
                {/*    <label style={{width: '15%', textAlign: 'right'}}>物资编码:</label>*/}
                {/*    <Input*/}
                {/*        maxLength={50}*/}
                {/*        style={{width: '80%', marginLeft: 16}}*/}
                {/*        onChange={e => {*/}
                {/*            this.setState({*/}
                {/*                    billData: {...this.state.billData, goodsCode: e.target.value}*/}
                {/*                }*/}
                {/*            )*/}
                {/*        }}*/}
                {/*    />*/}
                {/*</div>*/}
                {/*<div style={{display: 'flex', alignItems: 'center', marginBottom: 16}}>*/}
                {/*    <label style={{width: '15%', textAlign: 'right'}}>物资名称:</label>*/}
                {/*    <Input*/}
                {/*        maxLength={50}*/}
                {/*        style={{width: '80%', marginLeft: 16}}*/}
                {/*        onChange={e => {*/}
                {/*            this.setState({*/}
                {/*                    billData: {...this.state.billData, goodsName: e.target.value}*/}
                {/*                }*/}
                {/*            )*/}
                {/*        }}*/}
                {/*    />*/}
                {/*</div>*/}
                {/*<div style={{display: 'flex', alignItems: 'center', marginBottom: 16}}>*/}
                {/*    <label style={{width: '25%', textAlign: 'right'}}>单位理论重量(KG):</label>*/}
                {/*    <InputNumber*/}
                {/*        style={{width: 320}}*/}
                {/*        title={this.state.billData.weight}*/}
                {/*        min={0}*/}
                {/*        precision={4}*/}
                {/*        max={99999999.99}*/}
                {/*        maxLength={50}*/}
                {/*        value={this.state.billData.weight}*/}
                {/*        onChange={(e) => {*/}
                {/*            this.setState({*/}
                {/*                    billData: {...this.state.billData, weight: e}*/}
                {/*                }*/}
                {/*            )*/}
                {/*        }}*/}
                {/*    />*/}
                {/*</div>*/}
                {/*<div style={{display: 'flex', alignItems: 'center', marginBottom: 16}}>*/}
                {/*    <label style={{textAlign: 'right'}}>设置副单位及公式转换:</label>*/}
                {/*    <Button*/}
                {/*        type="primary"*/}
                {/*        onClick={*/}
                {/*            () => {*/}
                {/*                this.selectedUnitRelationList = this.BillModalUnitRelationList;*/}
                {/*                this.materialManageUnitModalOk = (values) => {*/}
                {/*                    this.BillModalUnitRelationList = values.unitRelationList;*/}
                {/*                };*/}
                {/*                this.setState({*/}
                {/*                    isUnitModalShow: true,*/}
                {/*                });*/}
                {/*            }*/}
                {/*        }*/}
                {/*    >设置</Button>*/}
                {/*</div>*/}
                {/*{this.state.specList.map((item, index) => {*/}
                {/*    return <div style={{display: 'flex', alignItems: 'center', marginBottom: 16}}>*/}
                {/*        <label style={{width: '15%', textAlign: 'right'}}>{item}:</label>*/}
                {/*        <Input*/}
                {/*            maxLength={50}*/}
                {/*            style={{width: '80%', marginLeft: 16}}*/}
                {/*            onChange={e => {*/}
                {/*                //e.target.value*/}
                {/*                let specValueObject = this.state.billData.specValueObject ?*/}
                {/*                    {...this.state.billData.specValueObject} : {};*/}
                {/*                specValueObject[item] = e.target.value;*/}
                {/*                this.setState({*/}
                {/*                    billData: {...this.state.billData, specValueObject: specValueObject}*/}
                {/*                })*/}
                {/*            }}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*})}*/}
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

export default MaterialManageDetail;
