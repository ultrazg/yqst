import React, {Component} from 'react';
import TabsViewContent from "../../../baseview/tabsViewContent/TabsViewContent";
import ApiConst from '../../../base/urls/ApiConst';
import ApiInterface from '../../../base/urls/ApiInterface';
import cloneDeep from 'lodash/cloneDeep';
import isNumber from 'lodash/isNumber';
import {CloseCircleOutlined, MinusCircleOutlined, LoadingOutlined, PlusOutlined} from '@ant-design/icons';
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
    Divider,
    Popconfirm,
    Checkbox,
    Popover
} from 'antd';
// import Editor from '../../PublicModule/Etidor'
import '../ProductCentreLess.less'
import ProductCentreModel from '../ProductCentreModel'
import {generateSku, getPageQuery, mergeLoading} from '../../../utils'
import CheckInput from "../../../utils/checkInput/CheckInput";
import {RViewer, RViewerTrigger} from '../../../baseview/react-viewerjs/lib';

const listPath = '/pages/appCenter/companyProductLib/companyProductLibHome/companyProduct/CompanyProductList'
const detailPath = '/pages/appCenter/companyProductLib/companyProductLibHome/companyProduct/CompanyProductDetail'

class ProductCompanyGoodsModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false, // 判断富文本是否加载完
            submitData: {goodsParentInfo: {}}, // 提交的数据
            goodsTypeArray: [], // 产品类别
            info: {}, // 详情数据
            skuList: [],
            specList: [],
            fileList: [], // 图片列表
            detailLoading: false, // 判断详情数据是否加载完
            goodsTypeLoading: false, // 判断产品类目数据是否加载完
            shopData: [], // 店铺列表数据
            billData: {}, // 批量填充数据
            bitchFillState: false,

            pics: [],
            picIdx: 0,
            previewImage: '',
            pviIdx: 0
        };
    }

    // 获取详情数据
    getDetail = () => {
        const {id} = this.props;
        if (id) {
            this.setState({detailLoading: true})
            ProductCentreModel.CorrelationErpGoodsGet({
                goodsParentSn: id
            }, res => {
                if (res.data.skuList && res.data.skuList[0] && res.data.skuList[0].specList) {
                    res.data.skuList.forEach((item, index) => {
                        let skuName = ''
                        item.specList.forEach(n => {
                            skuName += `${n.specName}:${n.specValue};`
                            item[n.specName] = n.specValue
                        })
                        item.skuName = skuName
                    })
                }
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
                        // imgList: res.data.imgList,
                        goodsName: res.data.goodsName,
                        catSn: res.data.catSn,
                        goodsCode: res.data.goodsCode,
                        taxCode: res.data.taxCode,
                        // goodsBrief: res.data.goodsBrief,
                        // goodsDescribe: res.data.goodsDescribe,
                        catSnPath: res.data.catSnPath,
                        catNamePath: res.data.catNamePath,
                        // inventory: res.data.inventory,
                        goodsPrice: res.data.showPrice,
                        unit: res.data.unit,
                        convertUnit: res.data.convertUnit,
                        // convertRatio: res.data.convertRatio,
                        // canUpdateSku: res.data.canUpdateSku,
                        goodsParentInfo: res.data.goodsParentInfo,
                        applySn: res.data.applySn,
                        applyType: res.data.applyType,
                        applyStatus: res.data.applyStatus,
                        createTime: res.data.createTime,
                        rejectReason: res.data.rejectReason,
                    },
                    skuList: res.data.skuList,
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
        this.getDetail()
    }


    render() {
        return (
            <Modal
                style={{top: 15}}
                width={800}
                title="企业产品详情"
                maskClosable={false}
                footer={null}
                visible={true}
                // onOk={() => {}}
                onCancel={() => {
                    this.props.close && this.props.close()
                }}
            >
                <Spin spinning={mergeLoading([this.state.detailLoading, this.state.goodsTypeLoading])}
                      tip={'拼命加载中....'}>
                    {this.renderModifiedTitle('基本信息')}
                    {this.renderBaseInfo()}
                    {/*{this.renderModifiedTitle('产品图片')}*/}
                    {/*{this.renderProductImages()}*/}
                    {/*{this.renderModifiedTitle('产品描述')}*/}
                    {/*{this.renderProductDescribe('goodsBrief')}*/}
                    {this.renderModifiedTitle('规格与SKU组合')}
                    {this.renderSKU()}
                    {/*{this.renderModifiedTitle('图文详情')}*/}
                    {/*{this.renderGraphicDetails()}*/}
                </Spin>
                {/*图片预览*/}
                <RViewer options={{
                    toolbar: {
                        prev: true,
                        next: true
                    }
                }} imageUrls={this.state.previewImage}>
                    <RViewerTrigger index={this.state.pviIdx}>
                        <div ref={(c)=>{this.showPicPreview=c}}></div>
                    </RViewerTrigger>
                </RViewer>
            </Modal>
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
    renderText = (fieldName) => {
        return <label className={'sw-form-label text-elli3'}
                      style={{textAlign: 'left', color: 'rgba(43,52,65,0.9)'}}>{fieldName}</label>
    }

    renderInput = (fieldName, placeholder = '请填写', maxlength) => {
        return (
            <Input
                maxLength={maxlength}
                placeholder={placeholder}
                style={{fontSize: 14, color: 'rgba(43,52,65,0.65)'}}
                value={this.state.submitData[fieldName]}
                onChange={(e) => {
                    this.setState({submitData: {...this.state.submitData, [fieldName]: e.target.value}})
                }}
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
    // renderImageUpload = () => {
    //     const uploadButton = (
    //         <div>
    //             {this.state.loading ? <LoadingOutlined/> : <PlusOutlined/>}
    //             <div className="ant-upload-text">图片上传</div>
    //         </div>
    //     );
    //
    //     function beforeUpload(file) {
    //         const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/bmp' || file.type === 'image/gif';
    //         if (!isJpgOrPng) {
    //             message.error('请上传jpg/bmp/png/gif格式图片文件!');
    //         }
    //         const isLt2M = file.size / 1024 / 1024 < 30;
    //         if (!isLt2M) {
    //             message.error('图片必须小于 30MB!');
    //         }
    //         return isJpgOrPng && isLt2M;
    //     }
    //
    //     function getBase64(img, callback) {
    //         const reader = new FileReader();
    //         reader.addEventListener('load', () => callback(reader.result));
    //         reader.readAsDataURL(img);
    //     }
    //
    //     const handleChange = (info) => {
    //         if (info.file.status === undefined) {
    //             return
    //         }
    //         if (info.file.status === 'uploading') {
    //             this.setState({loading: true});
    //         }
    //         if (info.file.status === "removed") {
    //             const urlArray = []
    //             info.fileList.forEach(n => {
    //                 if (n.response) {
    //                     urlArray.push(n.response.data.url)
    //                 } else {
    //                     urlArray.push(n.url)
    //                 }
    //             })
    //             this.setState({
    //                 submitData: {...this.state.submitData, imgList: urlArray},
    //             })
    //         }
    //
    //         if (info.file.status === 'done') {
    //             const urlArray = []
    //             info.fileList.forEach(n => {
    //                 if (n.response) {
    //                     urlArray.push(n.response.data.url)
    //                 } else {
    //                     urlArray.push(n.url)
    //                 }
    //             })
    //             this.setState({
    //                 submitData: {...this.state.submitData, imgList: urlArray},
    //             })
    //             getBase64(info.file.originFileObj, imageUrl =>
    //                 this.setState({
    //                     loading: false,
    //                 }),
    //             );
    //         }
    //
    //         this.setState({fileList: [...info.fileList]});
    //     };
    //
    //     return (
    //         <div className="clearfix">
    //             <Upload
    //                 accept={'.png,.jpg,.bmp,.gif'}
    //                 listType="picture-card"
    //                 className={'sw-heh-upload'}
    //                 fileList={this.state.fileList}
    //                 onPreview={file => {
    //                     let idx = 0;
    //                     let fileList = this.state.submitData.imgList || [];
    //                     let url = file.response && file.response.data ? file.response.data.url : file.url;
    //                     for (let i = 0; i < fileList.length; i++) {
    //                         if (fileList[i] == url) {
    //                             idx = i;
    //                             break;
    //                         }
    //                     }
    //                     this.setState({
    //                         pics: fileList,
    //                         picIdx: idx
    //                     }, () => {
    //                         this.showPicPreview && this.showPicPreview.click();
    //                     });
    //                 }}
    //                 onDownload={(file) => {
    //                     if (file.response && file.response.data) {
    //                         window.download(file.response.data.url)
    //                         // Model.DownloadFile({url: file.response.data.url, name: file.name})
    //                     } else {
    //                         window.download(file.url)
    //                         // Model.DownloadFile({url: file.url, name: file.name})
    //                     }
    //                 }}
    //                 action={ApiConst.Versions().sunaw + ApiInterface.uploadFile}
    //                 beforeUpload={beforeUpload}
    //                 onChange={handleChange}
    //             >
    //                 {this.state.fileList.length < 10 && uploadButton}
    //             </Upload>
    //         </div>
    //     )
    // }

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
                                    {this.renderText(this.state.submitData.goodsName)}
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
                                    {this.renderText(this.state.submitData.catNamePath)}
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
                                    {this.renderText(this.state.submitData.goodsCode)}
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
                        {/*<Col span={24} style={{marginBottom: 24}}>*/}
                        {/*    <Row>*/}
                        {/*        <Col span={4}>*/}
                        {/*            <label className={'sw-form-label'}>*/}
                        {/*                /!*{this.renderAsterisk()}*!/*/}
                        {/*                税务分类编码：*/}
                        {/*            </label>*/}
                        {/*        </Col>*/}
                        {/*        <Col span={8}>*/}
                        {/*            {this.renderText(this.state.submitData.taxCode)}*/}
                        {/*        </Col>*/}
                        {/*    </Row>*/}
                        {/*</Col>*/}
                        <Col span={24} style={{marginBottom: 24}}>
                            <Row>
                                <Col span={4}>
                                    <label className={'sw-form-label'}>产品价格：</label>
                                </Col>
                                <Col span={8}>
                                    {this.renderText("¥" + this.state.submitData.goodsPrice)}
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24} style={{marginBottom: 24}}>
                            <Row>
                                <Col span={4}>
                                    <label className={'sw-form-label'}>基本单位：</label>
                                </Col>
                                <Col span={8}>
                                    {this.renderText(this.state.submitData.unit)}
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24} style={{marginBottom: 24}}>
                            <Row>
                                <Col span={4}>
                                    <label className={'sw-form-label'}>换算单位：</label>
                                </Col>
                                <Col span={8}>
                                    {this.renderText(this.state.submitData.convertUnit)}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }

    // renderProductImages = () => {
    //     return (
    //         <div style={{padding: 30}}>
    //             <Row gutter={12}>
    //                 <Col span={20} offset={3}>
    //                     {this.renderImageUpload()}
    //                 </Col>
    //             </Row>
    //             <RViewer options={{
    //                 toolbar: {//Since there is only one picture, let's hide "prev" and "next"
    //                     prev: true,
    //                     next: true
    //                 }
    //             }} imageUrls={this.state.pics || []}>
    //                 <RViewerTrigger index={this.state.picIdx}>
    //                     <div ref={(c) => {
    //                         this.showPicPreview = c
    //                     }}></div>
    //                 </RViewerTrigger>
    //             </RViewer>
    //         </div>
    //     )
    // }

    renderSKU = () => {
        return (
            <div
                className={'sw-form'}
                style={{padding: 30}}
            >
                <Row gutter={12}>
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
            </div>
        )
    }
    //skuview
    SkuView = () => {
        let skuList = this.state.skuList;
        return <div>
            <div style={{width: '100%', overflowX: 'auto'}}>
                <Table
                    style={{
                        width: (160 + 160 + 83 + 55 + 160)
                            + 1 * (6 + this.state.specList.length)
                    }}
                    scroll={{
                        x: (160 + 160 + 83 + 55 + 160 + 160 + 160 + 160 + 160)
                            + (160 * this.state.specList.length)
                            + 1 * (6 + this.state.specList.length)
                    }}
                    columns={[
                        // {
                        //     title: <PlusCircleOutlined
                        //         style={{color: '#4481EB', fontSize: 22}}
                        //         onClick={() => {
                        //             skuList.push({
                        //                 goodsCode: '',//	string	是	产品自定义编码
                        //                 goodsName: '',//	string	是	产品名称
                        //                 specList: this.state.specList.map((item) => {
                        //                     return {
                        //                         specName: item,
                        //                         specValue: ""
                        //                     }
                        //                 }),//	arr-obj	是	规格列表
                        //                 goodsStatus: 1,//	int	是	产品状态 1:启用 2:停用
                        //                 imgUrl: '',//	string	是	产品图片url
                        //             });
                        //             this.setState({skuList: cloneDeep(skuList)})
                        //         }}/>,
                        //     key: 'option',
                        //     dataIndex: 'option',
                        //     width: 45,
                        //     render: (text, record, index) => {
                        //         return <Popconfirm
                        //             title="确认删除该条数据?"
                        //             onConfirm={() => {
                        //                 skuList.splice(index, 1)
                        //                 this.setState({skuList: cloneDeep(skuList)})
                        //             }}
                        //             okText="确定"
                        //             cancelText="取消">
                        //             <MinusCircleOutlined style={{color: '#F12C20', fontSize: 22}}/>
                        //         </Popconfirm>
                        //     }
                        // },
                        {
                            title: '产品编码',
                            key: 'goodsCode',
                            dataIndex: 'goodsCode',
                            width: 160,
                            render: (text, record, index) => {
                                return <span>{text}</span>
                            }
                        },
                        {
                            title: '产品名称',
                            key: 'goodsName',
                            dataIndex: 'goodsName',
                            width: 160,
                            render: (text, record, index) => {
                                return <span>{text}</span>
                            }
                        },
                        {
                            title: `成本价(不含税)`,
                            key: 'costPrice',
                            dataIndex: 'costPrice',
                            width: 160,
                            render: (text, record, index) => {
                                return <span>{text}</span>
                            }
                        },
                        {
                            title: '重量(kg)',
                            key: 'weight',
                            dataIndex: 'weight',
                            width: 160,
                            render: (text, record, index) => {
                                return <span>{text}</span>
                            }
                        },
                        {
                            title: '基本单位',
                            key: 'unit',
                            dataIndex: 'unit',
                            width: 160,
                            render: (text, record, index) => {
                                return <span>{this.state.submitData.unit}</span>
                            }
                        },
                        {
                            title: '换算单位',
                            key: 'convertUnit',
                            dataIndex: 'convertUnit',
                            width: 160,
                            render: (text, record, index) => {
                                return <span>{this.state.submitData.convertUnit}</span>
                            }
                        },
                        {
                            title: '换算比例',
                            key: 'convertRatio',
                            dataIndex: 'convertRatio',
                            width: 160,
                            render: (text, record, index) => {
                                return <span>{text}</span>
                            }
                        },
                        ...this.state.specList.map((item, index) => {
                            return {
                                title: item,
                                key: item,
                                dataIndex: item,
                                width: 160,
                                render: (text, record, idx) => {
                                    return <span>{skuList[idx].specList && skuList[idx].specList[index] ?
                                        skuList[idx].specList[index].specValue : ''}</span>
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
                                    style={{
                                        marginLeft: 21
                                    }}
                                    checked={parseInt(text) == 1}
                                    onChange={(e) => {
                                        // skuList[idx].goodsStatus = e.target.checked ? 1 : 2;
                                        // this.setState({skuList});
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
                />
            </div>
        </div>;
    }

    renderSkuImg(text, record, index) {
        const popContent = () => {
            return <div>
                <Button size={'small'} onClick={() => {
                    this.setState(
                        {previewImage: text, pviIdx: 0},
                        () => {
                            this.showPicPreview && this.showPicPreview.click();
                        }
                    )
                }}>预览</Button>
            </div>
        };
        return text ? <Popover content={popContent()} title=""><img
            width={32}
            height={32}
            src={text}
            alt=""
        /></Popover> : null
    }

    // 商品描述
    // renderProductDescribe = (fieldName) => {
    //     return (
    //         <div style={{padding: 30}}>
    //             <Row gutter={12}>
    //                 <Col span={20} offset={3}>
    //                     <Input.TextArea
    //                         maxLength={500}
    //                         value={this.state.submitData[fieldName]}
    //                         style={{fontSize: 14, color: 'rgba(43,52,65,0.65)'}}
    //                         rows={4}
    //                         onChange={(e) => {
    //                             this.setState({
    //                                 submitData: {...this.state.submitData, [fieldName]: e.target.value}
    //                             })
    //                         }}
    //                     />
    //                 </Col>
    //             </Row>
    //         </div>
    //     )
    // }

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

export default ProductCompanyGoodsModal;
