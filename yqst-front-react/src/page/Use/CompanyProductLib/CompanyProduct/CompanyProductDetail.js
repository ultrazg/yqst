import React, {Component} from 'react';
import ViewCoat from '../../PublicModule/ViewCoat/ViewCoat';
import ApiConst from '../../../../base/urls/ApiConst';
import ApiInterface from '../../../../base/urls/ApiInterface';
import cloneDeep from 'lodash/cloneDeep';
import isNumber from 'lodash/isNumber';
import {
    CloseCircleOutlined,
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
    Table,
    Upload,
    TreeSelect,
    Spin,
    Empty,
    BackTop,
    Checkbox,
    Popconfirm,
    Popover
} from 'antd';
// import Editor from '../../PublicModule/Etidor'
import '../CompanyProductLibLess.less'
import CompanyProductModel from '../CompanyProductModel'
import {generateSku, getPageQuery, mergeLoading} from '../../../../utils'
import {RViewer, RViewerTrigger} from "react-viewerjs";
import CompanyProductSelectProductListModal from './CompanyProductSelectProductListModal';
import uniq from "lodash/uniq";
import CheckInput from '../../../../utils/checkInput/CheckInput';

const listPath = '/pages/appCenter/companyProductLib/companyProductLibHome/companyProduct/CompanyProductList'
const detailPath = '/pages/appCenter/companyProductLib/companyProductLibHome/companyProduct/CompanyProductDetail'

class CompanyProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false, // 判断富文本是否加载完
            submitData: {}, // 提交的数据

            tempSpecList: [],//编辑时的规格列表
            specList: [],//生成后的规格列表
            skuList: [], //sku列表

            goodsTypeArray: [], // 产品类别
            info: {}, // 详情数据
            fileList: [], // 图片列表
            detailLoading: false, // 判断详情数据是否加载完
            goodsTypeLoading: false, // 判断产品类目数据是否加载完
            shopData: [], // 店铺列表数据
            billData: {}, // 批量填充数据
            bitchFillState: false,

            pics: [],
            picIdx: 0,

            selectModalVisi: false,
            platformGoodInfo: {}
        };
    }

    // 获取商品类目
    getGoodsType = () => {
        this.setState({goodsTypeLoading: true})
        CompanyProductModel.CategoryList({}, res => {
            function recursive(children, parentName) {
                children.forEach(item => {
                    item.labelName = parentName ? `${parentName} > ${item.catName}` : item.catName
                    if (item.children && item.children.length > 0) recursive(item.children, item.labelName)
                    item.title = item.catName
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

    // 获取店铺列表
    // getShopPage = () => {
    //     Model.AutoLogin({current: 1, pageSize: 10000, shopType: 1}, res => {
    //         this.setState({shopData: res.data.records})
    //     })
    // }

    // 获取详情数据
    getDetail = () => {
        const {id, operation} = getPageQuery()
        if (id && operation === 'edit') {
            this.setState({detailLoading: true})
            CompanyProductModel.ProductGet({
                goodsSn: id
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
                let newImgList = []
                res.data.imgList && res.data.imgList.forEach((n, index) => {
                    newImgList.push({
                        uid: index + '',
                        name: 'image.png',
                        status: 'done',
                        url: n,
                    },)
                })
                const treeExpandedKeys = res.data.catSnPath && res.data.catSnPath.splice(0, res.data.catSnPath.length - 1)
                this.setState({
                    submitData: {
                        imgList: res.data.imgList,
                        goodsName: res.data.goodsName,
                        catSn: res.data.catSn,
                        goodsCode: res.data.goodsCode,
                        taxCode: res.data.taxCode,
                        goodsBrief: res.data.goodsBrief,
                        goodsDescribe: res.data.goodsDescribe,
                        catSnPath: res.data.catSnPath,
                        inventory: res.data.inventory,
                        goodsPrice: res.data.showPrice,
                        unit: res.data.unit,
                        convertUnit: res.data.convertUnit,
                        convertRatio: res.data.convertRatio,
                        status: res.data.status,
                        canUpdateSku: res.data.canUpdateSku,
                    },
                    skuList: res.data.skuList && res.data.skuList.map((item, idx) => {
                        return {
                            ...item,
                            key: idx
                        }
                    }),
                    tempSpecList: res.data.skuList && res.data.skuList.length > 0 ?
                        res.data.skuList[0].specList.map((item) => {
                            return item.specName;
                        }) : [],
                    specList: res.data.skuList && res.data.skuList.length > 0 ?
                        res.data.skuList[0].specList.map((item) => {
                            return item.specName;
                        }) : [],
                    fileList: newImgList,
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

    // 发布商品
    // releaseGoods = () => {
    //     if (this.state.selectShop && this.state.selectShop !== '') {
    //         Model.shopGoodsPublish({
    //             goodsParentSn: this.state.info.goodsSn,
    //             shopSn: this.state.selectShop
    //         }, res => {
    //             message.success('发布产品成功')
    //             this.props.history.push('/pages/appCenter/productLib/saProductHome/saProModule/saProductList')
    //         })
    //     } else {
    //         message.error('请选择店铺')
    //     }
    // }

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
            CompanyProductModel.ProductBatchDel({goodsSnList: [id]}, res => {
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
        const {submitData} = this.state;
        const {id, operation} = getPageQuery();
        // const specResponseList = this.editableTableRef.getValue();
        // this.state.submitData['goodsDescribe'] = this.editorRef.getValue();
        // this.state.submitData['skuList'] = specResponseList;
        this.state.submitData['imgUrl'] = this.state.submitData.imgList && this.state.submitData.imgList[0];

        if (id && id !== '') {
            if (!this.state.submitData.canUpdateSku) {
                return message.error('该产品不能修改', 2);
            }
            if (!submitData.goodsName)
                return message.error('SPU产品名称不能为空！', 1);
            if (!submitData.catSn)
                return message.error('SPU产品类目不能为空！', 1);
            if (!submitData.goodsCode)
                return message.error('SPU产品编码不能为空！', 1);
            // if (!submitData.taxCode)
            //     return message.error('税务分类编码不能为空！', 1);
            if (!submitData.imgList || submitData.imgList.length <= 0)
                return message.error('产品图片不能为空！', 1);
            if (!submitData.goodsBrief)
                return message.error('产品描述不能为空！', 1);

            if (this.state.specList.length === 0)
                return message.error('产品sku规格不能为空！', 1);
            let skuList = this.state.skuList;
            if (skuList.length === 0)
                return message.error('产品sku不能为空！', 1);
            for (let i = 0; i < skuList.length; i++) {
                //goodsCode,goodsName,specList.specValue,imgUrl
                for (let j = 0; j < skuList[i].specList.length; j++) {
                    if (!skuList[i].specList[j].specValue) {
                        return message.error('请完善Sku信息！', 1);
                    }
                }
                if (!skuList[i].goodsCode || !skuList[i].goodsName || !skuList[i].costPrice) {
                    return message.error('请完善Sku信息！', 1);
                }
                // 换算单位有值时，换算比例不能为空
                if(submitData.convertUnit && !skuList[i].convertRatio){
                    return message.error('SKU的换算比例不能为空！', 1);
                }
            }

            if (!submitData.goodsPrice)
                return message.error('产品价格不能为空！', 1);
            if (!submitData.unit)
                return message.error('基本单位不能为空！', 1);
            // if (!submitData.convertUnit)
            //     return message.error('换算单位不能为空！', 1);

            CompanyProductModel.ProductUpdate({
                ...this.state.submitData,
                skuList: skuList,
                goodsSn: id
            }, res => {
                message.success('修改产品成功')
                callback && callback(true)
                if (goback === true) {
                    this.props.history.push(listPath)
                }
            })
        } else {
            if (!this.state.platformGoodInfo.platformGoodsParentSn)
                return message.error('关联平台产品不能为空！', 1);
            if (!submitData.goodsName)
                return message.error('SPU产品名称不能为空！', 1);
            if (!submitData.catSn)
                return message.error('SPU产品类目不能为空！', 1);
            if (!submitData.goodsCode)
                return message.error('SPU产品编码不能为空！', 1);
            // if (!submitData.taxCode)
            //     return message.error('税务分类编码不能为空！', 1);
            if (!submitData.imgList || submitData.imgList.length <= 0)
                return message.error('产品图片不能为空！', 1);
            if (!submitData.goodsBrief)
                return message.error('产品描述不能为空！', 1);

            if (this.state.specList.length === 0)
                return message.error('产品sku规格不能为空！', 1);
            let skuList = this.state.skuList;
            if (skuList.length === 0)
                return message.error('产品sku不能为空！', 1);
            for (let i = 0; i < skuList.length; i++) {
                //goodsCode,goodsName,specList.specValue,imgUrl,costPrice,weight
                for (let j = 0; j < skuList[i].specList.length; j++) {
                    if (!skuList[i].specList[j].specValue) {
                        return message.error('请完善Sku信息！', 1);
                    }
                }
                if (!skuList[i].goodsCode || !skuList[i].goodsName || !skuList[i].costPrice) {
                    return message.error('请完善Sku信息！', 1);
                }
                // 换算单位有值时，换算比例不能为空
                if(submitData.convertUnit && !skuList[i].convertRatio){
                    return message.error('SKU的换算比例不能为空！', 1);
                }
            }

            if (!submitData.goodsPrice)
                return message.error('产品价格不能为空！', 1);
            if (!submitData.unit)
                return message.error('基本单位不能为空！', 1);
            // if (!submitData.convertUnit)
            //     return message.error('换算单位不能为空！', 1);

            CompanyProductModel.ProductAdd({
                ...this.state.submitData,
                skuList: skuList,
                platformGoodsParentSn: this.state.platformGoodInfo.platformGoodsParentSn || ''
            }, res => {
                this.setState({info: {...this.state.info, goodsSn: res.data}})
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
        CompanyProductModel.ProductEnable({goodsSn: id}, () => {
            this.getDetail();
        }, () => {
        })
    }

    disable() {
        const {id, operation} = getPageQuery()
        CompanyProductModel.ProductDisable({goodsSn: id}, () => {
            this.getDetail();
        }, () => {
        })
    }

    render() {
        const {id, operation} = getPageQuery()
        return (
            <ViewCoat
                breadCrumb={[
                    {title: '产品列表'},
                    {title: '编辑产品'},
                ]}
                topView={(
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
                        {id && id !== '' && !this.state.detailLoading ? (<Button
                            style={{
                                height: 32,
                                padding: '0 12px',
                                fontSize: 16,
                                fontWeight: 500,
                                lineHeight: '22px',
                                color: this.state.detailLoading ? '#ccc' : '#2B3441',
                            }}
                            onClick={() => this.state.submitData.status == 2 ? this.disable() : this.enable()}
                            disabled={this.state.detailLoading}
                        >
                            {this.state.submitData.status == 2 ? "停用" : "启用"}
                        </Button>) : null}
                    </div>
                )}
            >
                <BackTop target={() => document.getElementById('root')}/>
                <Spin spinning={mergeLoading([this.state.detailLoading, this.state.goodsTypeLoading])}
                      tip={'拼命加载中....'}>
                    {/* 模态框 */}
                    {this.renderDeleteModal()}
                    {/*{this.renderChooseTerminalModal()}*/}
                    {
                        !id && operation == 'new' ? <>
                            <h2 style={{fontSize: 16, marginBottom: 16, fontWeight: 500}}>关联平台产品</h2>
                            {this.renderCorrelationView()}
                        </> : <>
                            <h2 style={{fontSize: 16, marginBottom: 16, fontWeight: 500}}>关联平台产品</h2>
                            {this.renderCorrelationTextView()}
                        </>
                    }
                    <h2 style={{fontSize: 16, marginBottom: 16, fontWeight: 500}}>产品详情</h2>
                    {this.renderModifiedTitle('基本信息')}
                    {this.renderBaseInfo()}
                    {this.renderModifiedTitle('产品图片')}
                    {this.renderProductImages()}
                    {this.renderModifiedTitle('产品描述')}
                    {this.renderProductDescribe('goodsBrief')}
                    {this.renderModifiedTitle('价格规格与SKU组合')}
                    {this.renderSKU()}
                    {/*{this.renderModifiedTitle('图文详情')}*/}
                    {/*{this.renderGraphicDetails()}*/}
                </Spin>
            </ViewCoat>
        );
    }

    renderCorrelationTextView(){
        return <div style={{padding: 20}}>
            <div className={'sw-form'}>
                <Row gutter={12}>
                    <Col span={24} style={{marginBottom: 24}}>
                        <Row>
                            <Col span={4}>
                                <label className={'sw-form-label'}>平台产品：</label>
                            </Col>
                            <Col span={8} style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}>
                                {`${this.state.info.platformGoodsParentName || ''}（${this.state.info.platformGoodsParentCode || ''}）`}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </div>
    }

    renderCorrelationView = () => {
        return <div style={{padding: 20}}>
            <div className={'sw-form'}>
                <Row gutter={12}>
                    <Col span={24} style={{marginBottom: 24}}>
                        <Row>
                            <Col span={4}>
                                <label className={'sw-form-label'}>平台产品：</label>
                            </Col>
                            <Col span={8}>
                                {this.TextInputSelectView(
                                    this.state.platformGoodInfo.goodsCode || '',
                                    () => {
                                        this.setState({selectModalVisi: true})
                                    }
                                )}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
            {this.state.selectModalVisi ?
                <CompanyProductSelectProductListModal
                    ok={(data, res) => {
                        this.setState({
                            platformGoodInfo: data,
                            selectModalVisi: false
                        });
                        //引入平台产品信息到企业产品信息
                        // let newImgList = []
                        // res.data.imgList && res.data.imgList.forEach((n, index) => {
                        //     newImgList.push({
                        //         uid: index + '',
                        //         name: 'image.png',
                        //         status: 'done',
                        //         url: n,
                        //     },)
                        // })
                        // const treeExpandedKeys = res.data.catSnPath && res.data.catSnPath.splice(0, res.data.catSnPath.length - 1)
                        this.setState({
                            submitData: {
                                // imgList: res.data.imgList,
                                goodsName: res.data.goodsName,
                                // catSn: res.data.catSn,
                                goodsCode: res.data.goodsCode,
                                // taxCode: res.data.taxCode,
                                // goodsBrief: res.data.goodsBrief,
                                // goodsDescribe: res.data.goodsDescribe,
                                // catSnPath: res.data.catSnPath,
                                // inventory: res.data.inventory,
                                // goodsPrice: res.data.showPrice,
                                unit: res.data.unit,
                                // convertUnit: res.data.convertUnit,
                                // convertRatio: res.data.convertRatio,
                                // status: res.data.status,
                                // canUpdateSku: res.data.canUpdateSku,
                            },
                            skuList: res.data.skuList.map((item) => {
                                return {
                                    ...item,
                                    platformGoodsSn: item.goodsSn,
                                    specList: item.specList.map((it) => {
                                        return {
                                            specName: it.specName,
                                            specValue: it.specValue,
                                        }
                                    })
                                }
                            }),
                            specList: res.data.skuList && res.data.skuList.length > 0 ?
                                res.data.skuList[0].specList.map((item) => {
                                    return item.specName;
                                }) : [],
                            // fileList: newImgList,
                            // treeExpandedKeys: treeExpandedKeys,
                            detailLoading: false,
                            info: res.data,
                            isLoaded: true
                        });
                    }}
                    cancel={() => {
                        this.setState({selectModalVisi: false})
                    }}
                /> : null}
        </div>
    }

    TextInputSelectView(val, callback, placeholder = '请选择') {
        return <>
            <Input
                placeholder={placeholder}
                value={val + ''}
                style={{width: 356, height: 32}}
                onClick={() => {
                    callback && callback();
                }}
            />
        </>
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

    // 产品图片批量上传
    renderImageUpload = () => {
        const uploadButton = (
            <div>
                {this.state.loading ? <LoadingOutlined/> : <PlusOutlined/>}
                <div className="ant-upload-text">图片上传</div>
            </div>
        );

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

        function getBase64(img, callback) {
            const reader = new FileReader();
            reader.addEventListener('load', () => callback(reader.result));
            reader.readAsDataURL(img);
        }

        const handleChange = (info) => {
            if (info.file.status === undefined) {
                return
            }
            if (info.file.status === 'uploading') {
                this.setState({loading: true});
            }
            if (info.file.status === "removed") {
                const urlArray = []
                info.fileList.forEach(n => {
                    if (n.response) {
                        urlArray.push(n.response.data.url)
                    } else {
                        urlArray.push(n.url)
                    }
                })
                this.setState({
                    submitData: {...this.state.submitData, imgList: urlArray},
                })
            }

            if (info.file.status === 'done') {
                const urlArray = []
                info.fileList.forEach(n => {
                    if (n.response) {
                        urlArray.push(n.response.data.url)
                    } else {
                        urlArray.push(n.url)
                    }
                })
                this.setState({
                    submitData: {...this.state.submitData, imgList: urlArray},
                })
                getBase64(info.file.originFileObj, imageUrl =>
                    this.setState({
                        loading: false,
                    }),
                );
            }

            this.setState({fileList: [...info.fileList]});
        };

        return (
            <div className="clearfix">
                <Upload
                    accept={'.png,.jpg,.bmp,.gif'}
                    listType="picture-card"
                    className={'sw-heh-upload'}
                    fileList={this.state.fileList}
                    onPreview={file => {
                        let idx = 0;
                        let fileList = this.state.submitData.imgList || [];
                        let url = file.response && file.response.data ? file.response.data.url : file.url;
                        for (let i = 0; i < fileList.length; i++) {
                            if (fileList[i] == url) {
                                idx = i;
                                break;
                            }
                        }
                        this.setState({
                            pics: fileList,
                            picIdx: idx
                        }, () => {
                            this.showPicPreview && this.showPicPreview.click();
                        });
                    }}
                    onDownload={(file) => {
                        if (file.response && file.response.data) {
                            window.download(file.response.data.url)
                            // Model.DownloadFile({url: file.response.data.url, name: file.name})
                        } else {
                            window.download(file.url)
                            // Model.DownloadFile({url: file.url, name: file.name})
                        }
                    }}
                    action={ApiConst.Versions().sunaw + ApiInterface.uploadFile}
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                >
                    {this.state.fileList.length < 10 && uploadButton}
                </Upload>
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
                                        SPU产品名称：
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
                                        SPU产品类目：
                                    </label>
                                </Col>
                                <Col span={8}>
                                    {this.renTreeSelect('catSn', '请选择产品类目', 30)}
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24} style={{marginBottom: 24}}>
                            <Row>
                                <Col span={4}>
                                    <label className={'sw-form-label'}>
                                        {/*{this.renderAsterisk()}*/}
                                        SPU产品编码：
                                    </label>
                                </Col>
                                <Col span={8}>
                                    {this.renderInput('goodsCode', '请填写产品编码', 30, (id && operation === 'edit'))}
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24} style={{marginBottom: 24}}>
                            <Row>
                                <Col span={4}>
                                    <label className={'sw-form-label'}>税务分类编码：</label>
                                </Col>
                                <Col span={8}>
                                    {this.renderInput('taxCode', '请填写税务分类编码', 30)}
                                </Col>
                            </Row>
                        </Col>

                        <Col span={24} style={{marginBottom: 24}}>
                            <Row>
                                <Col span={4}>
                                    <label className={'sw-form-label'}>产品价格：</label>
                                </Col>
                                <Col span={8} style={{display: 'flex'}}>
							<span
                                style={{
                                    borderLeft: '1px solid #d9d9d9',
                                    borderTop: '1px solid #d9d9d9',
                                    borderBottom: '1px solid #d9d9d9',
                                    fontSize: 14,
                                    fontWeight: 500,
                                    lineHeight: '20px',
                                    padding: '7px 12px 6.5px 12px'
                                }}
                            >
								¥
							</span>
                                    <InputNumber
                                        min={0}
                                        precision={2}
                                        max={99999999.99}
                                        value={this.state.submitData.goodsPrice}
                                        onChange={(value) => {
                                            this.setState({
                                                submitData: {...this.state.submitData, goodsPrice: value}
                                            })
                                        }}
                                        style={{borderRadius: 0, flex: 1}}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24} style={{marginBottom: 24}}>
                            <Row>
                                <Col span={4}>
                                    <label className={'sw-form-label'}>基本单位：</label>
                                </Col>
                                <Col span={8}>
                                    <Input
                                        maxLength={10}
                                        value={this.state.submitData.unit}
                                        onChange={(e) => {
                                            this.setState({
                                                submitData: {...this.state.submitData, unit: e.target.value}
                                            })
                                        }}
                                        style={{borderRadius: 0}}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24} style={{marginBottom: 24}}>
                            <Row>
                                <Col span={4}>
                                    <label className={'sw-form-label'}>换算单位：</label>
                                </Col>
                                <Col span={8}>
                                    <Input
                                        maxLength={10}
                                        value={this.state.submitData.convertUnit}
                                        onChange={(e) => {
                                            this.setState({
                                                submitData: {...this.state.submitData, convertUnit: e.target.value}
                                            })
                                        }}
                                        style={{borderRadius: 0}}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }

    renderProductImages = () => {
        return (
            <div style={{padding: 30}}>
                <Row gutter={12}>
                    <Col span={20} offset={3}>
                        {this.renderImageUpload()}
                    </Col>
                </Row>
                <RViewer options={{
                    toolbar: {//Since there is only one picture, let's hide "prev" and "next"
                        prev: true,
                        next: true
                    }
                }} imageUrls={this.state.pics || []}>
                    <RViewerTrigger index={this.state.picIdx}>
                        <div ref={(c) => {
                            this.showPicPreview = c
                        }}></div>
                    </RViewerTrigger>
                </RViewer>
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
                            {this.SpecView()}
                        </Col>
                    </Row>
                </Col>
                <Col span={24} style={{marginBottom: 24}}>
                    <Row>
                        <Col span={3}>
                            <label className={'sw-form-label'}>SKU 组合：</label>
                        </Col>
                        <Col span={20}>
                            {this.SkuView()}
                        </Col>
                    </Row>
                </Col>
            </Row>
            {this.BillModal()}
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
        const {id, operation} = getPageQuery()
        let skuList = this.state.skuList;
        return <div>
            <div style={{width: '100%', overflowX: 'auto'}}>
                <Table
                    style={{
                        // width: (45 + 160 + 160 + 83 + 55 + 160)
                        //     + 18
                        //     + 1 * (6 + this.state.specList.length)
                    }}
                    scroll={{
                        x: (45 + 160 + 160 + 83 + 55 + 160 + 160 + 160 + 160 + 160)
                            + (160 * this.state.specList.length)
                            + 1 * (6 + this.state.specList.length)
                    }}
                    columns={[
                        {
                            title: <PlusCircleOutlined
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
                                    disabled={(id && operation === 'edit' && record.goodsSn)}
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
                        {
                            title: `成本价(不含税)`,
                            key: 'costPrice',
                            dataIndex: 'costPrice',
                            width: 160,
                            render: (text, record, index) => {
                                return <InputNumber
                                    style={{width: '100%'}}
                                    min={0}
                                    precision={2}
                                    max={99999999.99}
                                    maxLength={50}
                                    value={text}
                                    onChange={(e) => {
                                        skuList[index].costPrice = e;
                                        this.setState({skuList})
                                    }}
                                />
                            }
                        },
                        {
                            title: '重量(kg)',
                            key: 'weight',
                            dataIndex: 'weight',
                            width: 160,
                            render: (text, record, index) => {
                                return <InputNumber
                                    style={{width: '100%'}}
                                    min={0}
                                    precision={4}
                                    max={99999999.99}
                                    maxLength={50}
                                    value={text}
                                    onChange={(e) => {
                                        skuList[index].weight = e;
                                        this.setState({skuList})
                                    }}
                                />
                            }
                        },
                        {
                            title: '基本单位',
                            key: 'unit',
                            dataIndex: 'unit',
                            width: 160,
                            render: (text, record, index) => {
                                return <Input
                                    disabled={true}
                                    style={{width: '100%'}}
                                    maxLength={50}
                                    value={this.state.submitData.unit}
                                    title={this.state.submitData.unit}
                                    onChange={(e) => {
                                    }}
                                />
                            }
                        },
                        {
                            title: '换算单位',
                            key: 'convertUnit',
                            dataIndex: 'convertUnit',
                            width: 160,
                            render: (text, record, index) => {
                                return <Input
                                    disabled={true}
                                    style={{width: '100%'}}
                                    maxLength={50}
                                    title={this.state.submitData.convertUnit}
                                    value={this.state.submitData.convertUnit}
                                    onChange={(e) => {
                                    }}
                                />
                            }
                        },
                        {
                            title: '换算比例',
                            key: 'convertRatio',
                            dataIndex: 'convertRatio',
                            width: 160,
                            render: (text, record, index) => {
                                return <InputNumber
                                    style={{width: '100%'}}
                                    min={0}
                                    precision={4}
                                    max={9999999.9999}
                                    maxLength={50}
                                    value={text}
                                    onChange={(e) => {
                                        skuList[index].convertRatio = e;
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
                            title: '是否启用',
                            key: 'goodsStatus',
                            dataIndex: 'goodsStatus',
                            width: 83,
                            render: (text, record, idx) => {
                                return <Checkbox
                                    disabled={'3' === '' + this.state.submitData.status}
                                    style={{
                                        marginLeft: 21
                                    }}
                                    checked={parseInt(text) == 1}
                                    onChange={(e) => {
                                        skuList[idx].goodsStatus = e.target.checked ? 1 : 2;
                                        this.setState({skuList});
                                    }}/>
                            }
                        },
                        {
                            title: '图片',
                            key: 'imgUrl',
                            dataIndex: 'imgUrl',
                            width: 55,
                            render: (text, record, index) => {
                                return this.renderSkuImg(text, record, index);
                            }
                        },
                    ]}
                    dataSource={this.state.skuList}
                    pagination={false}
                    bordered
                    footer={() => (
                        this.state.skuList.length > 0 ?
                            <a onClick={() => {
                                this.setState({
                                    billVisible: true
                                })
                            }}>批量填充</a> :
                            <a style={{color: '#ccc'}}>批量填充</a>
                    )}
                />
            </div>

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
                        {pics: text, picIdx: 0},
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
                text ? <Popover content={popContent()} title=""><img
                    width={32}
                    height={32}
                    src={text}
                    alt=""
                /></Popover> : <Upload
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

        return <Modal
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
                        skuList[i].goodsCode = billData.goodsCode;
                    }
                    if (billData.goodsName && !(billData.goodsName == "")) {
                        skuList[i].goodsName = billData.goodsName;
                    }
                    if (billData.costPrice && !(billData.costPrice == "")) {
                        skuList[i].costPrice = billData.costPrice;
                    }
                    if (billData.weight && !(billData.weight == "")) {
                        skuList[i].weight = billData.weight;
                    }
                    if (billData.convertRatio && !(billData.convertRatio == "")) {
                        skuList[i].convertRatio = billData.convertRatio;
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
            <div style={{display: 'flex', alignItems: 'center', marginBottom: 16}}>
                <label style={{width: '15%', textAlign: 'right'}}>成本价(不含税):</label>
                <InputNumber
                    min={0}
                    precision={2}
                    max={99999999.99}
                    maxLength={50}
                    style={{width: '80%', marginLeft: 16}}
                    onChange={e => {
                        this.setState({
                                billData: {...this.state.billData, costPrice: e}
                            }
                        )
                    }}
                />
            </div>
            <div style={{display: 'flex', alignItems: 'center', marginBottom: 16}}>
                <label style={{width: '15%', textAlign: 'right'}}>重量(kg):</label>
                <InputNumber
                    min={0}
                    precision={4}
                    max={99999999.99}
                    maxLength={50}
                    style={{width: '80%', marginLeft: 16}}
                    onChange={e => {
                        this.setState({
                                billData: {...this.state.billData, weight: e}
                            }
                        )
                    }}
                />
            </div>
            <div style={{display: 'flex', alignItems: 'center', marginBottom: 16}}>
                <label style={{width: '15%', textAlign: 'right'}}>换算比例:</label>
                <InputNumber
                    min={0}
                    precision={4}
                    max={9999999.9999}
                    maxLength={50}
                    style={{width: '80%', marginLeft: 16}}
                    onChange={e => {
                        this.setState({
                                billData: {...this.state.billData, convertRatio: e}
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
    }

    // 商品描述
    renderProductDescribe = (fieldName) => {
        return (
            <div style={{padding: 30}}>
                <Row gutter={12}>
                    <Col span={20} offset={3}>
                        <Input.TextArea
                            maxLength={500}
                            value={this.state.submitData[fieldName]}
                            style={{fontSize: 14, color: 'rgba(43,52,65,0.65)'}}
                            rows={4}
                            onChange={(e) => {
                                this.setState({
                                    submitData: {...this.state.submitData, [fieldName]: e.target.value}
                                })
                            }}
                        />
                    </Col>
                </Row>
            </div>
        )
    }

    // 图文详情 - 富文本
    // renderGraphicDetails = () => {
    //     if (!this.state.isLoaded) return null;
    //     return (
    //         <div style={{padding: 30}}>
    //             <Row gutter={12}>
    //                 <Col span={20} offset={3}>
    //                     <Editor value={this.state.submitData['goodsDescribe']} ref={(ref) => this.editorRef = ref}/>
    //                 </Col>
    //             </Row>
    //         </div>
    //     )
    // }

    // 发布模态框
    // renderChooseTerminalModal = () => {
    //     return (
    //         <Modal
    //             visible={this.state.chooseTerminalVisible}
    //             onCancel={() => this.setState({chooseTerminalVisible: false})}
    //             title={'发布到销售终端'}
    //             className={'sw-modal'}
    //             okText='确定'
    //             onOk={this.releaseGoods}
    //         >
    //             <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
    //                 <label
    //                     style={{
    //                         width: '80px',
    //                         fontSize: 14,
    //                         color: '#2B3441',
    //                         textAlign: 'right'
    //                     }}
    //                 >
    //                     选择终端:
    //                 </label>
    //                 <Select
    //                     style={{flex: 1, marginLeft: 8}}
    //                     onSelect={value => {
    //                         this.setState({selectShop: value})
    //                     }}
    //                 >
    //                     {this.state.shopData && this.state.shopData.map(n => (
    //                         <Select.Option key={n.shopSn} value={n.shopSn}>{n.shopName}</Select.Option>
    //                     ))}
    //                 </Select>
    //             </div>
    //         </Modal>
    //     )
    // }

}

export default CompanyProductDetail;
