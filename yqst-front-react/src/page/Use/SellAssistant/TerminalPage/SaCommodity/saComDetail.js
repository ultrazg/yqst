import React, {Component} from 'react';
import ViewCoat from '../../../PublicModule/ViewCoat/ViewCoat';
import cloneDeep from 'lodash/cloneDeep';
import {CloseCircleOutlined, LoadingOutlined, PlusOutlined} from '@ant-design/icons';
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
    Select,
    BackTop,
} from 'antd';
import Editor from '../../../PublicModule/Etidor'
import '../../SellAssistant.less'
import ApiConst from '../../../../../base/urls/ApiConst'
import ApiInterface from '../../../../../base/urls/ApiInterface'
import Model from '../../../Model'
import {getPageQuery, mergeLoading} from '../../../../../utils'
import {RViewer, RViewerTrigger} from "react-viewerjs";

class SaComDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            sizeData: [],
            sizeValueData: [],
            submitData: {},
            results: [],
            columns: [],
            goodsTypeArray: [],
            goodsTagArray: [],
            info: {},
            fileList: [],
            detailLoading: false,
            goodsTypeLoading: false,
            shopData: [],
            totalGoodsNum: 0,

            pics: [],
            picIdx: 0,
        };
    }

    getGoodsType = (shopSn) => {
        this.setState({goodsTypeLoading: true})
        Model.goodsCatList({shopSn}, res => {
            function recursive(children, parentName) {
                children.forEach(item => {
                    item.labelName = parentName ? `${parentName} > ${item.catName}` : item.catName
                    if (item.children && item.children.length > 0) recursive(item.children, item.labelName)
                    item.title = item.catName
                    item.value = item.catSn
                    item.key = item.catSn
                })
            }

            recursive(res.data)
            this.setState({
                goodsTypeArray: res.data,
                goodsTypeLoading: false
            })
        })
    }

    /*
    * 获取店铺列表
    * */
    getShopPage = () => {
        Model.AutoLogin({current: 1, pageSize: 10000, shopType: 1}, res => {
            this.setState({shopData: res.data.records})
        })
    }

    componentDidMount() {
        this.getGoodsTag()
        this.getDetail()

    }

    getGoodsTag = () => {
        const SParams = JSON.parse(localStorage.getItem('SParams'))

        Model.shopTagList({
            shopSn: SParams.rawData.shopSn
        }, res => {
            this.setState({goodsTagArray: res.data})
        })
    }

    getDetail = () => {
        const {id, operation} = getPageQuery()
        if (id && operation === 'edit') {
            this.setState({detailLoading: true})
            Model.shopGoodsGet({
                shopGoodsParentSn: id
            }, res => {
                this.getGoodsType(res.data.shopSn)
                let {sizeData, sizeValueData} = this.state;
                let columns = []
                let inventory = 0
                res.data.specList && res.data.specList.forEach(n => {
                    sizeData.push(n.specName)
                    sizeValueData.push(n.specValueList)
                    columns.push({
                        title: n.specName,
                        dataIndex: n.specName,
                        disabled: true
                    })
                })
                if (res.data.skuList && res.data.skuList[0] && res.data.skuList[0].specList) {
                    res.data.skuList.forEach((item, index) => {
                        inventory += item.inventory
                        item.specList && item.specList.forEach(n => {
                            item[n.specName] = n.specValue
                        })
                    })
                }
                let newImgList = []
                res.data.imgList.forEach((n, index) => {
                    newImgList.push({
                        uid: index + '',
                        name: 'image.png',
                        status: 'done',
                        url: n,
                    },)
                })
                const tagList = []
                res.data.tagList && res.data.tagList.forEach(n => {
                    tagList.push(n.tagSn)
                })
                const treeExpandedKeys = res.data.catSnPath && res.data.catSnPath.splice(0, res.data.catSnPath.length - 1)
                this.setState({
                    submitData: {
                        tagSnList: tagList,
                        imgList: res.data.imgList,
                        goodsName: res.data.goodsName,
                        catSn: res.data.catSn,
                        goodsCode: res.data.goodsCode,
                        taxCode: res.data.taxCode,
                        goodsBrief: res.data.goodsBrief,
                        goodsDescribe: res.data.goodsDescribe,
                        catSnPath: res.data.catSnPath,
                        inventory: inventory,
                        goodsPrice: res.data.showPrice,
                        goodsUnit: res.data.goodsUnit,
                        taxRate: res.data.taxRate,
                    },
                    results: res.data.skuList,
                    columns: columns,
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

    componentWillUnmount() {
    }

    del = () => {
        this.setState({deleteVisible: true})
    }

    releaseGoods = () => {
        if (this.state.selectShop && this.state.selectShop !== '') {
            Model.shopGoodsAdd({
                ...this.state.info,
                shopSn: this.state.selectShop
            }, res => {
                console.log(res)
            })
        } else {
            message.error('请选择店铺')
        }
    }

    renderDeleteModal = () => {
        const deleteFn = () => {
            const {id} = getPageQuery();
            Model.shopGoodsDelete({shopGoodsParentSn: [id]}, res => {
                message.success('删除成功')
                this.props.history.push('/pages/appCenter/sellAssistant/saProductHome/saProModule/saProductList')
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
                <p style={{textAlign: 'center', fontSize: '14px', color: '#2B3441'}}>确认删除该商品?</p>
            </Modal>
        )
    }


    saveOrUpdate = (goback = true, callback) => {
        const {sizeData, sizeValueData, submitData} = this.state;
        const {id} = getPageQuery()
        const specList = []
        const specResponseList = this.editableTableRef.getValue()
        sizeData.forEach((n, index) => {
            specList.push({
                specName: n,
                specResList: []
            })
            sizeValueData.forEach((k, kindex) => {
                if (index === kindex) {
                    k.forEach((j, jindex) => {
                        specList[index].specResList.push({
                            specValue: k[jindex]
                        })
                    })
                }
            })
        })
        this.state.submitData['goodsDescribe'] = this.editorRef.getValue()
        this.state.submitData['skuList'] = specResponseList
        this.state.submitData['mainImgUrl'] = this.state.submitData.imgList[0]
        const verifyData = () => {
            if (submitData.goodsName === undefined || submitData.goodsName === '') {
                message.error('请填写商品名称')
                return false
            } else if (submitData.catSn === undefined || submitData.catSn === '') {
                message.error('请选择商品分类')
                return false
            } else if (submitData.goodsUnit === undefined || submitData.goodsUnit === '') {
                message.error('请填写单位')
                return false
            }
            return true
        }
        if (!verifyData()) return

        if (id && id !== '') {
            const SParams = JSON.parse(localStorage.getItem('SParams'))
            Model.shopGoodsUpdate({
                ...this.state.submitData,
                shopGoodsParentSn: id,
                goodsParentSn: this.state.info.goodsParentSn,
                shopSn: SParams.rawData.shopSn
            }, res => {
                message.success('修改商品成功')
                callback && callback(true)
                if (goback) {
                    this.props.history.push('/pages/appCenter/sellAssistant/terminalPage/saCommodity/saComList')
                }
            })
        }
    }

    render() {
        const {id} = getPageQuery()
        return (
            <ViewCoat
                breadCrumb={[
                    {title: '商品列表'},
                    {title: this.state.info && this.state.info.goodsStatus === 1 ? '编辑商品(商品已上架,能修改不能保存)' : '编辑商品'},
                ]}
                topView={(
                    <div>
                        {
                            this.state.info && this.state.info.goodsStatus !== 1 && (
                                <Button
                                    style={{
                                        height: 32,
                                        padding: '0 12px',
                                        fontSize: 16,
                                        fontWeight: 500,
                                        lineHeight: '22px',
                                        color: this.state.detailLoading ? '#ccc' : '#2B3441',
                                    }}
                                    onClick={this.saveOrUpdate}
                                    disabled={this.state.detailLoading}
                                >
                                    保存
                                </Button>
                            )
                        }

                        <span style={{padding: 8}}/>
                        {/*<Button*/}
                        {/*    type='primary'*/}
                        {/*    disabled={this.state.detailLoading}*/}
                        {/*    onClick={() => {*/}
                        {/*        Modal.confirm({*/}
                        {/*            title: '发布商品前将对商品进行一次保存,确认保存商品?',*/}
                        {/*            onOk: () => {*/}
                        {/*                this.saveOrUpdate(false, () => {*/}
                        {/*                    this.getDetail()*/}
                        {/*                    this.getShopPage()*/}
                        {/*                    this.setState({chooseTerminalVisible: true})*/}
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
                        {/*>*/}
                        {/*    发布商品*/}
                        {/*</Button>*/}
                    </div>
                )}
            >
                <BackTop target={() => document.getElementById('root')}/>
                <Spin spinning={mergeLoading([this.state.detailLoading, this.state.goodsTypeLoading])}
                      tip={'拼命加载中....'}>
                    {/* 模态框 */}
                    {this.renderDeleteModal()}
                    {this.renderChooseTerminalModal()}
                    <h2 style={{fontSize: 16, marginBottom: 16, fontWeight: 500}}>商品详情</h2>
                    {this.renderModifiedTitle('基本信息')}
                    {this.renderBaseInfo()}
                    {this.renderModifiedTitle('商品图片')}
                    {this.renderProductImages()}
                    {this.renderModifiedTitle('商品描述')}
                    {this.renderProductDescribe('goodsBrief')}
                    {this.renderModifiedTitle('价格规格与SKU组合')}
                    {this.state.isLoaded ? this.renderSKU() : null}
                    {this.renderModifiedTitle('图文详情')}
                    {this.renderGraphicDetails()}
                </Spin>
            </ViewCoat>
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

    renderInput = (fieldName, maxLength) => {
        return (
            <Input
                maxLength={maxLength}
                style={{fontSize: 14, color: 'rgba(43,52,65,0.65)'}}
                value={this.state.submitData[fieldName]}
                onChange={(e) => {
                    this.setState({submitData: {...this.state.submitData, [fieldName]: e.target.value}})
                }}
            />
        )
    }

    renTreeSelect = (fieldName) => {
        return (
            <div id={fieldName} style={{position: 'relative'}}>
                <TreeSelect
                    style={{width: '100%', fontSize: 14, color: 'rgba(43,52,65,0.65)'}}
                    getPopupContainer={() => document.getElementById(fieldName)}
                    value={this.state.submitData[fieldName]}
                    dropdownStyle={{
                        maxHeight: 300,
                        fontSize: 14
                    }}
                    dropdownClassName={'sw-treeSelect'}
                    treeExpandedKeys={this.state.treeExpandedKeys}
                    onTreeExpand={(expandedKeys) => {
                        this.setState({treeExpandedKeys: expandedKeys})
                    }}
                    treeNodeLabelProp='labelName'
                    treeData={this.state.goodsTypeArray}
                    onChange={(value) => {
                        this.setState({submitData: {...this.state.submitData, [fieldName]: value}})
                    }}
                />
            </div>
        )
    }

    renSelect = (fieldName) => {

        return (
            <Select
                style={{width: '100%', fontSize: 14, color: 'rgba(43,52,65,0.65)'}}
                value={this.state.submitData[fieldName]}
                mode="multiple"
                onChange={(value) => {
                    this.setState({submitData: {...this.state.submitData, [fieldName]: value}})
                }}
            >
                {
                    this.state.goodsTagArray && this.state.goodsTagArray.map(n => (
                        <Select.Option key={n.tagSn} value={n.tagSn}>{n.tagName}</Select.Option>
                    ))
                }
            </Select>
        )
    }

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
                message.error('请上传jpg/bmp/png/tif/gif/webp格式图片文件!');
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
            <Upload
                accept={'.png,.jpg,.jpeg,.bmp,.gif'}
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
                        Model.DownloadFile({url: file.response.data.url, name: file.name})
                    } else {
                        Model.DownloadFile({url: file.url, name: file.name})
                    }
                }}
                name="file"
                action={ApiConst.Versions().sunaw + ApiInterface.uploadFile}
                beforeUpload={beforeUpload}
                onChange={handleChange}
            >
                {this.state.fileList.length < 10 && uploadButton}
            </Upload>
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
        return (
            <div style={{padding: 30}}>
                <div className={'sw-form'}>
                    <Row gutter={12}>
                        <Col span={24} style={{marginBottom: 24}}>
                            <Row>
                                <Col span={3}>
                                    <label className={'sw-form-label'}>
                                        {this.renderAsterisk()}
                                        商品名称：
                                    </label>
                                </Col>
                                <Col span={8}>
                                    {this.renderInput('goodsName', 100)}
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24} style={{marginBottom: 24}}>
                            <Row>
                                <Col span={3}>
                                    <label className={'sw-form-label'}>
                                        {this.renderAsterisk()}
                                        商品分类：
                                    </label>
                                </Col>
                                <Col span={8}>
                                    {this.renTreeSelect('catSn')}
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24} style={{marginBottom: 24}}>
                            <Row>
                                <Col span={3}>
                                    <label className={'sw-form-label'}>商品标签：</label>
                                </Col>
                                <Col span={8}>
                                    {this.renSelect('tagSnList')}
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24} style={{marginBottom: 24}}>
                            <Row>
                                <Col span={3}>
                                    <label className={'sw-form-label'}>商品编码：</label>
                                </Col>
                                <Col span={8}>
                                    {this.renderInput('goodsCode', 30)}
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24} style={{marginBottom: 24}}>
                            <Row>
                                <Col span={3}>
                                    <label className={'sw-form-label'}>税务分类编码：</label>
                                </Col>
                                <Col span={8}>
                                    {this.renderInput('taxCode', 30)}
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
        let {sizeData, sizeValueData} = this.state;
        const renderSize = () => {
            return (
                <div style={{border: '1px solid rgba(43,52,65,0.25)', padding: '8px'}}>
                    {sizeData && sizeData.map((n, nIndex) => (
                        <div key={nIndex} style={{marginTop: nIndex !== 0 ? 16 : 0}}>
                            <div style={{background: 'rgba(43,52,65,0.05)', padding: '8px 0'}}>
                                <Row gutter={12}>
                                    <Col span={3} style={{textAlign: 'right'}}>
                                        <label style={{
                                            fontSize: 14,
                                            fontWeight: 500,
                                            color: 'rgba(43,52,65,1)',
                                            verticalAlign: 'sub'
                                        }}>规格名{nIndex + 1}: </label>
                                    </Col>
                                    <Col span={6}>
                                        <Input className={'sw-form-disable-color'} onChange={e => {
                                            sizeData[nIndex] = e.target.value
                                            this.setState({sizeData})
                                        }} value={n} disabled={true}/>
                                    </Col>
                                </Row>
                            </div>
                            {
                                sizeValueData[nIndex].map((k, kIndex) => (
                                    <div key={kIndex} style={{marginTop: 16}}>
                                        <Row gutter={12}>
                                            <Col span={3} style={{textAlign: 'right'}}>
                                                <label style={{
                                                    fontSize: 14,
                                                    fontWeight: 500,
                                                    color: 'rgba(43,52,65,1)',
                                                    verticalAlign: 'sub'
                                                }}>规格值{kIndex + 1}: </label>
                                            </Col>
                                            <Col span={12} style={{padding: 0}}>
                                                <Col span={16}>
                                                    <Input disabled={true} className={'sw-form-disable-color'}
                                                           onChange={event => {
                                                               sizeValueData[nIndex][kIndex] = event.target.value
                                                               this.setState({sizeValueData})
                                                           }} value={k}/>
                                                </Col>
                                                {/*<Col span={8}><a onClick={() => {*/}
                                                {/*	sizeValueData[nIndex].push('')*/}
                                                {/*	this.setState({sizeValueData})*/}
                                                {/*}} style={{verticalAlign: 'sub'}}>添加规格值</a></Col>*/}
                                            </Col>
                                        </Row>
                                    </div>
                                ))
                            }
                        </div>
                    ))}
                    {/*<div style={{background: 'rgba(43,52,65,0.05)', padding: 8, marginTop: 24}}>*/}
                    {/*	<Button*/}
                    {/*		style={{*/}
                    {/*			fontSize: 14,*/}
                    {/*			fontWeight: 500,*/}
                    {/*			color: '#2B3441',*/}
                    {/*			lineHeight: '20px',*/}
                    {/*			padding: '6px 16px',*/}
                    {/*			height: 32*/}
                    {/*		}}*/}
                    {/*		onClick={() => {*/}
                    {/*			sizeData.push('')*/}
                    {/*			sizeValueData.push([''])*/}
                    {/*			this.setState({sizeData})*/}
                    {/*		}}*/}
                    {/*	>*/}
                    {/*		添加规格*/}
                    {/*	</Button>*/}
                    {/*</div>*/}
                </div>
            )
        }

        const SKU = () => {
            let {columns} = this.state
            const setValue = (field, value) => {
                this.setState({
                    submitData: {...this.state.submitData, [field]: value}
                })
            }
            const batchFillModalOpen = () => {
                this.setState({billVisible: true})
            }
            return (
                <EditableTable
                    ref={(ref) => this.editableTableRef = ref}
                    columnsProps={columns}
                    data={this.state.results}
                    batchFill={batchFillModalOpen}
                    setValue={setValue}
                    dataChange={(data) => {
                        let num = 0;
                        for (let i = 0; i < data.length; i++) {
                            num += (data[i].goodsNum || 0)
                        }
                        this.setState({totalGoodsNum: num});
                    }}
                />
            )
        }
        const billModal = () => {
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
                    destroyOnClose={true}
                    title={'批量填充'}
                    className={'sw-modal'}
                    visible={this.state.billVisible}
                    onCancel={() => this.setState({billVisible: false})}
                    afterClose={() => {
                        this.setState({billData: {}})
                    }}
                    onOk={() => {
                        const {results, billData} = this.state

                        // let goodsPrice = 0
                        // if (billData.price) {
                        //     goodsPrice = billData.price * results.length
                        // }
                        results.forEach((n, index) => {
                            results[index] = {...n, ...billData}
                        })
                        this.setState({
                            results,
                            billVisible: false,
                            billData: {},
                            submitData: {...this.state.submitData}
                        })
                    }}
                >
                    <div style={{display: 'flex', alignItems: 'center', marginBottom: 16}}>
                        <label style={{width: '20%', textAlign: 'right'}}>价格(含税):</label>
                        <InputNumber
                            min={0}
                            precision={2}
                            max={9999999.99}
                            style={{width: '80%', marginLeft: 16}}
                            onChange={value => {
                                this.setState({
                                        billData: {...this.state.billData, price: value}
                                    }
                                )
                            }}
                        />
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', marginBottom: 16}}>
                        <label style={{width: '20%', textAlign: 'right'}}>税点:</label>
                        <InputNumber
                            style={{width: '80%', marginLeft: 16}}
                            onChange={value => {
                                this.setState({
                                        billData: {...this.state.billData, taxRate: value}
                                    }
                                )
                            }}
                        />
                    </div>
                    {/*<div style={{display: 'flex', alignItems: 'center', marginBottom: 16}}>*/}
                    {/*    <label style={{width: '20%', textAlign: 'right'}}>库存:</label>*/}
                    {/*    <InputNumber*/}
                    {/*        precision={0}*/}
                    {/*        max={9999999}*/}
                    {/*        style={{width: '80%', marginLeft: 16}}*/}
                    {/*        onChange={value => {*/}
                    {/*            this.setState({*/}
                    {/*                    billData: {...this.state.billData, inventory: value}*/}
                    {/*                }*/}
                    {/*            )*/}
                    {/*        }}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    <div style={{display: 'flex', alignItems: 'center', marginBottom: 16}}>
                        <label style={{width: '20%', textAlign: 'right'}}>SKU编码:</label>
                        <Input
                            style={{width: '80%', marginLeft: 16}}
                            onChange={e => {
                                this.setState({
                                        billData: {...this.state.billData, goodsCode: e.target.value}
                                    }
                                )
                            }}
                        />
                    </div>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <label style={{width: '20%', textAlign: 'right'}}>图片:</label>
                        <div style={{marginLeft: 16}}>
                            <Upload
                                accept={'.png,.jpg,.jpeg,.bmp,.gif'}
                                name="file"
                                className="avatar-uploader"
                                showUploadList={false}
                                action={ApiConst.Versions().sunaw + ApiInterface.uploadFile}
                                onChange={handleChange}
                                beforeUpload={beforeUpload}
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
                                                fontSize: 28,
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
        return (
            <div
                className={'sw-form'}
                style={{padding: 30}}
            >
                {billModal()}
                <Row gutter={12}>
                    <Col span={24} style={{marginBottom: 24}}>
                        <Row>
                            <Col span={3}>
                                <label className={'sw-form-label'}>商品规格：</label>
                            </Col>
                            <Col span={20}>
                                {renderSize()}
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24} style={{marginBottom: 24}}>
                        <Row>
                            <Col span={3}>
                                <label className={'sw-form-label'}>SKU 组合：</label>
                            </Col>
                            <Col span={20}>
                                {SKU()}
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24} style={{marginBottom: 24}}>
                        <Row>
                            <Col span={3}>
                                <label className={'sw-form-label'}>商品价格：</label>
                            </Col>
                            <Col span={20}>
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
                                    max={9999999.99}
                                    value={this.state.submitData.goodsPrice}
                                    onChange={(value => {
                                        this.setState({
                                            submitData: {...this.state.submitData, goodsPrice: value}
                                        })
                                    })}
                                    style={{borderRadius: 0}}
                                />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24} style={{marginBottom: 24}}>
                        <Row>
                            <Col span={3}>
                                <label className={'sw-form-label'}>税点：</label>
                            </Col>
                            <Col span={20}>
                                <InputNumber
                                    max={99}
                                    value={this.state.submitData.taxRate}
                                    onChange={(value) => {
                                        this.setState({
                                            submitData: {...this.state.submitData, taxRate: value}
                                        })
                                    }}
                                    style={{borderRadius: 0}}
                                />
                                <span
                                    style={{
                                        borderRight: '1px solid #d9d9d9',
                                        borderTop: '1px solid #d9d9d9',
                                        borderBottom: '1px solid #d9d9d9',
                                        fontSize: 14,
                                        fontWeight: 500,
                                        lineHeight: '20px',
                                        padding: '7px 12px 6.5px 12px'
                                    }}
                                >
								%
							</span>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24} style={{marginBottom: 24}}>
                        <Row>
                            <Col span={3}>
                                <label className={'sw-form-label'}>库存：</label>
                            </Col>
                            <Col span={6}>
                                <Input
                                    className={'sw-form-disable-color'}
                                    value={this.state.totalGoodsNum}
                                    disabled={true}
                                />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24} style={{marginBottom: 24}}>
                        <Row>
                            <Col span={3}>
                                <label className={'sw-form-label'}>单位：</label>
                            </Col>
                            <Col span={6}>
                                <Input
                                    value={this.state.submitData.goodsUnit}
                                    onChange={e => {
                                        this.setState({
                                            submitData: {...this.state.submitData, goodsUnit: e.target.value}
                                        })
                                    }}
                                    style={{borderRadius: 0}}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }


    renderProductDescribe = (fieldName) => {
        return (
            <div style={{padding: 30}}>
                <Row gutter={12}>
                    <Col span={20} offset={3}>
                        <Input.TextArea
                            maxLength={500}
                            style={{fontSize: 14, color: 'rgba(43,52,65,0.65)'}}
                            value={this.state.submitData[fieldName]}
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

    renderGraphicDetails = () => {
        if (!this.state.isLoaded) return null;
        return (
            <div style={{padding: 30}}>
                <Row gutter={12}>
                    <Col span={20} offset={3}>
                        <Editor value={this.state.submitData['goodsDescribe']} ref={(ref) => this.editorRef = ref}/>
                    </Col>
                </Row>
            </div>
        )
    }

    renderChooseTerminalModal = () => {
        return (
            <Modal
                visible={this.state.chooseTerminalVisible}
                onCancel={() => this.setState({chooseTerminalVisible: false})}
                title={'发布到销售终端'}
                className={'sw-modal'}
                okText='确定'
                onOk={this.releaseGoods}
            >
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <label
                        style={{
                            width: '80px',
                            fontSize: 14,
                            color: '#2B3441',
                            textAlign: 'right'
                        }}
                    >
                        选择终端:
                    </label>
                    <Select
                        style={{flex: 1, marginLeft: 8}}
                        onSelect={value => {
                            this.setState({selectShop: value})
                        }}
                    >
                        {this.state.shopData && this.state.shopData.map(n => (
                            <Select.Option key={n.shopSn} value={n.shopSn}>{n.shopName}</Select.Option>
                        ))}
                    </Select>
                </div>
            </Modal>
        )
    }

}

class EditableCell extends React.Component {
    getInput = () => {
        const {type} = this.props;

        function getBase64(img, callback) {
            const reader = new FileReader();
            reader.addEventListener('load', () => callback(reader.result));
            reader.readAsDataURL(img);
        }

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

        const handleChange = info => {
            if (info.file.status === 'uploading') {
                this.setState({loading: true});
                return;
            }
            if (info.file.status === 'done') {
                this.props.onChange({
                    index: this.props.index,
                    value: info.file.response.data.url,
                    dataIndex: this.props.dataIndex
                })
                getBase64(info.file.originFileObj, imageUrl =>
                    this.setState({
                        loading: false,
                    }),
                );
            }
        };
        return type && type === 'upload' ? (
            <div style={{position: 'relative', display: 'inline-block'}} className={'upload-btn'}>
                {
                    this.props.data[this.props.index][this.props.dataIndex] && (
                        <div
                            className={'mask'}
                        >
                            <CloseCircleOutlined
                                onClick={() => {
                                    this.props.onChange({
                                        index: this.props.index,
                                        value: '',
                                        dataIndex: this.props.dataIndex
                                    })
                                }}
                                style={{
                                    fontSize: '18px',
                                    cursor: 'pointer',
                                    color: '#fff',
                                    zIndex: 2
                                }}/>
                        </div>
                    )
                }
                <Upload
                    accept={'.png,.jpg,.jpeg,.bmp,.gif'}
                    name="file"
                    className="avatar-uploader"
                    beforeUpload={beforeUpload}
                    showUploadList={false}
                    action={ApiConst.Versions().sunaw + ApiInterface.uploadFile}
                    onChange={handleChange}
                >
                    {
                        this.props.data[this.props.index][this.props.dataIndex] ? (
                            <img
                                width={32}
                                height={32}
                                src={this.props.data[this.props.index][this.props.dataIndex]}
                                alt=""
                            />
                        ) : (
                            <Button
                                style={{height: 32, width: 32, padding: 0}}
                                type={'dashed'}
                            >
                                <PlusOutlined style={{color: '#4481EB'}}/>
                            </Button>
                        )
                    }
                </Upload>
            </div>
        ) : type === 'numberPrice' ? (
            <InputNumber
                style={{width: '100%'}}
                min={0}
                precision={2}
                max={9999999.99}
                disabled={this.props.disabled}
                value={this.props.data[this.props.index][this.props.dataIndex]}
                onChange={(value) => {
                    // if (this.props.dataIndex === 'price' || this.props.dataIndex === 'inventory') {
                    // 	let price = 0
                    // 	this.props.data.forEach((n, index) => {
                    // 		if (index === this.props.index) {
                    // 			price += value
                    // 		} else {
                    // 			if (n[this.props.dataIndex] !== undefined && n[this.props.dataIndex] !== '') {
                    // 				price += n[this.props.dataIndex]
                    // 			}
                    // 		}
                    // 	})
                    // 	if (this.props.dataIndex === 'price') {
                    // 		this.props.setValue('goodsPrice', price)
                    // 	} else {
                    // 		this.props.setValue(this.props.dataIndex, price)
                    // 	}
                    // }
                    this.props.onChange({
                        index: this.props.index,
                        value: value,
                        dataIndex: this.props.dataIndex
                    })
                }}
            />
        ) : type === 'number' ? (
            <InputNumber
                max={this.props.dataIndex === 'inventory' ? 9999999 : 100}
                min={0}
                precision={this.props.dataIndex === 'inventory' ? 0 : 2}
                style={{width: '100%'}}
                className={'sw-form-disable-color'}
                disabled={this.props.disabled}
                value={this.props.data[this.props.index][this.props.dataIndex]}
                onChange={(value) => {
                    // if (this.props.dataIndex === 'price' || this.props.dataIndex === 'inventory') {
                    // 	let price = 0
                    // 	this.props.data.forEach((n, index) => {
                    // 		if (index === this.props.index) {
                    // 			price += value
                    // 		} else {
                    // 			if (n[this.props.dataIndex] !== undefined && n[this.props.dataIndex] !== '') {
                    // 				price += n[this.props.dataIndex]
                    // 			}
                    // 		}
                    // 	})
                    // 	if (this.props.dataIndex === 'price') {
                    // 		this.props.setValue('goodsPrice', price)
                    // 	} else {
                    // 		this.props.setValue(this.props.dataIndex, price)
                    // 	}
                    // }
                    this.props.onChange({
                        index: this.props.index,
                        value: value,
                        dataIndex: this.props.dataIndex
                    })
                }}
            />
        ) : (
            <Input
                className={'sw-form-disable-color'}
                maxLength={30}
                disabled={this.props.disabled}
                value={this.props.data[this.props.index][this.props.dataIndex]}
                onChange={(e) => {
                    if (this.props.dataIndex === 'price' || this.props.dataIndex === 'inventory') {
                        let price = 0
                        this.props.data.forEach((n, index) => {
                            if (index === this.props.index) {
                                price += parseInt(e.target.value)
                            } else {
                                if (n[this.props.dataIndex] !== undefined && n[this.props.dataIndex] !== '') {
                                    price += parseInt(n[this.props.dataIndex])
                                }
                            }
                        })
                        if (this.props.dataIndex === 'price') {
                            this.props.setValue('goodsPrice', price)
                        } else {
                            this.props.setValue(this.props.dataIndex, price)
                        }
                    }
                    this.props.onChange({
                        index: this.props.index,
                        value: e.target.value,
                        dataIndex: this.props.dataIndex
                    })
                }}
            />
        );
    };

    renderCell = () => {
        const {
            dataIndex,
            title,
            inputType,
            record,
            index,
            children,
            ...restProps
        } = this.props;
        let obj = cloneDeep(restProps)
        delete obj['setValue']
        return (
            <
                td {...obj}
            >
                {
                    this.getInput()
                }
            </td>
        );
    };

    render() {
        return this.renderCell()
    }
}

class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{key: 0}],
        };
    }

    componentDidMount() {
        this.props.data.forEach((n, index) => n.key = index)
        this.setState({data: this.props.data});
        setTimeout(() => {
            this.props.dataChange && this.props.dataChange(this.getValue());
        }, 10);
    }

    getValue = () => {
        return this.state.data
    }

    static getDerivedStateFromProps(props, state) {
        props.data.forEach((n, index) => {
            n.specList = []
            const keyArr = ['goodsSn', 'specList', 'price', 'key', 'inventory', 'goodsCode', 'taxRate', 'imgUrl', "costPrice", "inventory"]
            for (let i in n) {
                if (!keyArr.includes(i)) {
                    n.specList.push({
                        "specName": i,
                        "specValue": n[i]
                    })
                }
            }
            n.key = index
        })
        return {
            ...state,
            data: props.data
        }
    }

    callbackData = () => {
        return this.state.data
    }

    render() {
        const components = {
            body: {
                cell: EditableCell,
            },
        };
        const columns = [
            ...this.props.columnsProps,
            {
                title: '价格(含税)',
                dataIndex: 'price',
                type: 'numberPrice'
            },
            {
                title: '税点',
                dataIndex: 'taxRate',
                type: 'number'
            },
            {
                title: '库存',
                // dataIndex: 'inventory',
                dataIndex: 'goodsNum',
                type: 'number',
            },
            {
                title: '商品编码',
                dataIndex: 'goodsCode',
            },
            {
                title: '图片',
                dataIndex: 'imgUrl',
                type: 'upload'
            },
        ].map(col => {
            return {
                ...col,
                onCell: record => ({
                    record,
                    type: col.type,
                    data: this.state.data,
                    setValue: this.props.setValue,
                    disabled: col.disabled,
                    inputType: 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    index: record.key,
                    onChange: (value) => {
                        if (value.dataIndex && value.index !== undefined) {
                            const {data} = this.state
                            data[value.index][value.dataIndex] = value.value
                            this.setState({data}, () => {
                                this.props.dataChange && this.props.dataChange(this.getValue());
                            })
                        }
                    },
                }),
            };
        });

        return (
            <div className={'editorTable'}>
                <Table
                    components={components}
                    bordered
                    dataSource={this.state.data}
                    columns={columns}
                    footer={() => (
                        this.props.data.length > 0 ?
                            <a onClick={this.props.batchFill}>批量填充</a> :
                            <a style={{color: '#ccc'}}>批量填充</a>
                    )}
                />
            </div>
        );
    }
}

export default SaComDetail;
