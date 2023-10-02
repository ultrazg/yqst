import React, {Component} from 'react';
import ViewCoat from '../../../PublicModule/ViewCoat/ViewCoat';
import ApiConst from '../../../../../base/urls/ApiConst';
import ApiInterface from '../../../../../base/urls/ApiInterface';
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
    Select,
    Empty,
    BackTop,
} from 'antd';
import Editor from '../../../PublicModule/Etidor'
import Model from '../../../Model'
import {generateSku, getPageQuery, mergeLoading} from '../../../../../utils'


class SaProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false, // 判断富文本是否加载完
            sizeData: [], // 产品规格
            sizeValueData: [], // sku 组合
            submitData: {}, // 提交的数据
            results: [], //
            columns: [], // 动态 sku 组合 表头
            goodsTypeArray: [], // 产品类别
            info: {}, // 详情数据
            fileList: [], // 图片列表
            detailLoading: false, // 判断详情数据是否加载完
            goodsTypeLoading: false, // 判断产品类目数据是否加载完
            shopData: [], // 店铺列表数据
            billData: {}, // 批量填充数据
            bitchFillState: false
        };
    }

    // 获取商品类目
    getGoodsType = () => {
        this.setState({goodsTypeLoading: true})
        Model.sellerCategoryList({}, res => {
            function recursive(children, parentName) {
                children.forEach(item => {
                    item.labelName = parentName ? `${parentName} > ${item.catName}` : item.catName
                    if (item.children && item.children.length > 0) recursive(item.children, item.labelName)
                    item.title = item.catName
                    item.value = item.sn
                    item.key = item.sn
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
    getShopPage = () => {
        Model.AutoLogin({current: 1, pageSize: 10000, shopType: 1}, res => {
            this.setState({shopData: res.data.records})
        })
    }

    // 获取详情数据
    getDetail = () => {
        const {id, operation} = getPageQuery()
        if (id && operation === 'edit') {
            this.setState({detailLoading: true})
            Model.sellerGoodsGet({
                goodsSn: id
            }, res => {
                let {sizeData, sizeValueData} = this.state;
                let columns = []
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
                const originalSizeData = cloneDeep(this.state.sizeData)
                const originalSizeValueData = cloneDeep(this.state.sizeValueData)
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
                        goodsPrice: res.data.showPrice
                    },
                    results: res.data.skuList,
                    cloneResult: cloneDeep(res.data.skuList),
                    columns: columns,
                    fileList: newImgList,
                    treeExpandedKeys: treeExpandedKeys,
                    detailLoading: false,
                    info: res.data,
                    originalSizeData,
                    originalSizeValueData,
                    isLoaded: true
                })
            })
        } else {
            this.setState({isLoaded: true})
        }
    }

    // 发布商品
    releaseGoods = () => {
        if (this.state.selectShop && this.state.selectShop !== '') {
            Model.shopGoodsPublish({
                goodsParentSn: this.state.info.goodsSn,
                shopSn: this.state.selectShop
            }, res => {
                message.success('发布产品成功')
                this.props.history.push('/pages/appCenter/sellAssistant/saProductHome/saProModule/saProductList')
            })
        } else {
            message.error('请选择店铺')
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
            Model.sellerGoodsBatchDel({goodsSnList: [id]}, res => {
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
                <p style={{textAlign: 'center', fontSize: '14px', color: '#2B3441'}}>确认删除该产品?</p>
            </Modal>
        )
    }

    // 提交数据
    saveOrUpdate = (goback = true, callback) => {
        const {sizeData, sizeValueData, submitData} = this.state;
        const {id} = getPageQuery();
        const specList = [];
        const specResponseList = this.editableTableRef.getValue();
        sizeData.forEach((n, index) => {
            specList.push({
                specName: n,
                specResList: []
            });
            sizeValueData.forEach((k, kindex) => {
                if (index === kindex) {
                    k.forEach((j, jindex) => {
                        specList[index].specResList.push({
                            specValue: k[jindex]
                        })
                    })
                }
            })
        });
        this.state.submitData['goodsDescribe'] = this.editorRef.getValue();
        this.state.submitData['skuList'] = specResponseList;
        this.state.submitData['imgUrl'] = this.state.submitData.imgList && this.state.submitData.imgList[0];

        if (id && id !== '') {
            if (!submitData.goodsName)
                return message.error('产品名称不能为空！', 1);
            if (!submitData.catSn)
                return message.error('产品类目不能为空！', 1);
            if (!submitData.goodsCode)
                return message.error('产品编码不能为空！', 1);
            if (!submitData.taxCode)
                return message.error('税务分类编码不能为空！', 1);
            if (!submitData.imgList || submitData.imgList.length <= 0)
                return message.error('产品图片不能为空！', 1);
            if (!submitData.goodsBrief)
                return message.error('产品描述不能为空！', 1);
            if (submitData.skuList.length === 0)
                return message.error('产品sku规格不能为空！', 1);
            Model.sellerGoodsUpdate({
                ...this.state.submitData,
                goodsSn: id
            }, res => {
                message.success('修改产品成功')
                callback && callback(true)
                if (goback === true) {
                    this.props.history.push('/pages/appCenter/sellAssistant/saProductHome/saProModule/saProductList')
                }
            })
        } else {
            if (!submitData.goodsName)
                return message.error('产品名称不能为空！', 1);
            if (!submitData.catSn)
                return message.error('产品类目不能为空！', 1);
            Model.sellerGoodsAdd(this.state.submitData, res => {
                this.setState({info: {...this.state.info, goodsSn: res.data}})
                message.success('添加产品成功')
                callback && callback(true)
                if (goback === true) {
                    this.props.history.push('/pages/appCenter/sellAssistant/saProductHome/saProModule/saProductList')
                } else {
                    this.props.history.replace(`/pages/appCenter/sellAssistant/saProductHome/saProModule/saProductDetail?id=${res.data}&operation=edit`)
                }
            })
        }
    }

    render() {
        const {id} = getPageQuery()
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
                        <Button
                            type='primary'
                            onClick={() => {
                                if (!this.state.results.every(n => n.goodsCode !== '')) {
                                    message.error('请补充完整每条 sku 组合的SKU 编码')
                                    return
                                }

                                Modal.confirm({
                                    title: '发布产品前将对产品进行一次保存,确认保存产品?',
                                    onOk: () => {
                                        this.saveOrUpdate(false, () => {
                                            this.getDetail()
                                            this.getShopPage()
                                            this.setState({
                                                chooseTerminalVisible: true,
                                                sizeData: [],
                                                sizeValueData: []
                                            })
                                        })
                                    },
                                });
                            }}
                            style={{
                                height: 32,
                                padding: '0 12px',
                                fontSize: 16,
                                fontWeight: 500,
                                color: this.state.detailLoading ? '#ccc' : '#fff',
                            }}
                            disabled={this.state.detailLoading}
                        >
                            发布产品
                        </Button>
                    </div>
                )}
            >
                <BackTop target={() => document.getElementById('root')}/>
                <Spin spinning={mergeLoading([this.state.detailLoading, this.state.goodsTypeLoading])}
                      tip={'拼命加载中....'}>
                    {/* 模态框 */}
                    {this.renderDeleteModal()}
                    {this.renderChooseTerminalModal()}
                    <h2 style={{fontSize: 16, marginBottom: 16, fontWeight: 500}}>产品详情</h2>
                    {this.renderModifiedTitle('基本信息')}
                    {this.renderBaseInfo()}
                    {this.renderModifiedTitle('产品图片')}
                    {this.renderProductImages()}
                    {this.renderModifiedTitle('产品描述')}
                    {this.renderProductDescribe('goodsBrief')}
                    {this.renderModifiedTitle('价格规格与SKU组合')}
                    {this.renderSKU()}
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
                        if (file.response && file.response.data) {
                            window.open(file.response.data.url)
                        } else {
                            window.open(file.url)
                        }
                    }}
                    onDownload={(file) => {
                        if (file.response && file.response.data) {
                            Model.DownloadFile({url: file.response.data.url, name: file.name})
                        } else {
                            Model.DownloadFile({url: file.url, name: file.name})
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
        return (
            <div style={{padding: 30}}>
                <div className={'sw-form'}>
                    <Row gutter={12}>
                        <Col span={24} style={{marginBottom: 24}}>
                            <Col span={3}>
                                <label className={'sw-form-label'}>
                                    {/*{this.renderAsterisk()}*/}
                                    产品名称:
                                </label>
                            </Col>
                            <Col span={8}>
                                {this.renderInput('goodsName', '请填写产品名称', 100)}
                            </Col>
                        </Col>
                        <Col span={24} style={{marginBottom: 24}}>
                            <Col span={3}>
                                <label className={'sw-form-label'}>
                                    {/*{this.renderAsterisk()}*/}
                                    产品类目:
                                </label>
                            </Col>
                            <Col span={8}>
                                {this.renTreeSelect('catSn', '请选择产品类目', 30)}
                            </Col>
                        </Col>
                        <Col span={24} style={{marginBottom: 24}}>
                            <Col span={3}>
                                <label className={'sw-form-label'}>
                                    {/*{this.renderAsterisk()}*/}
                                    产品编码:
                                </label>
                            </Col>
                            <Col span={8}>
                                {this.renderInput('goodsCode', '请填写产品编码', 30)}
                            </Col>
                        </Col>
                        <Col span={24} style={{marginBottom: 24}}>
                            <Col span={3}>
                                <label className={'sw-form-label'}>税务分类编码:</label>
                            </Col>
                            <Col span={8}>
                                {this.renderInput('taxCode', '请填写税务分类编码', 30)}
                            </Col>
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
            </div>
        )
    }

    renderSKU = () => {
        let {sizeData, sizeValueData} = this.state;
        // 产品规格
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
                                        <Input
                                            maxLength={50}
                                            onChange={e => {
                                                sizeData[nIndex] = e.target.value
                                                this.setState({sizeData})
                                            }}
                                            value={n}
                                        />
                                    </Col>
                                    {
                                        sizeData.length !== 1 && (
                                            <MinusCircleOutlined
                                                onClick={() => {
                                                    sizeData.splice(nIndex, 1)
                                                    sizeValueData.splice(nIndex, 1)
                                                    this.setState({sizeData, sizeValueData})
                                                }}
                                                style={{fontSize: 16, cursor: 'pointer', lineHeight: '32px'}}/>
                                        )
                                    }
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
                                                    <Input maxLength={50} onChange={event => {
                                                        sizeValueData[nIndex][kIndex] = event.target.value
                                                        this.setState({sizeValueData})
                                                    }} value={k}/>
                                                </Col>
                                                <Col
                                                    span={8}
                                                    style={{lineHeight: '32px'}}
                                                >
                                                    {
                                                        sizeValueData[nIndex].length !== 1 && (
                                                            <MinusCircleOutlined
                                                                onClick={() => {
                                                                    sizeValueData[nIndex].splice(kIndex, 1)
                                                                    this.setState({sizeValueData})
                                                                }}
                                                                style={{fontSize: 16, cursor: 'pointer'}}/>
                                                        )
                                                    }

                                                    {
                                                        kIndex === 0 ? <a
                                                            onClick={() => {
                                                                sizeValueData[nIndex].push('')
                                                                this.setState({sizeValueData})
                                                            }}
                                                            style={{marginLeft: 8}}
                                                        >
                                                            添加规格值
                                                        </a> : null
                                                    }
                                                </Col>
                                            </Col>
                                        </Row>
                                    </div>
                                ))
                            }
                        </div>
                    ))}
                    {sizeData && sizeData.length === 0 && (
                        <Empty/>
                    )}
                    <div style={{background: 'rgba(43,52,65,0.05)', padding: 8, marginTop: 24}}>
                        <Button
                            style={{
                                fontSize: 14,
                                fontWeight: 500,
                                color: '#2B3441',
                                padding: '6px 16px',
                                height: 32
                            }}
                            onClick={() => {
                                sizeData.push('')
                                sizeValueData.push([''])
                                this.setState({sizeData})
                            }}
                        >
                            添加规格
                        </Button>
                    </div>
                </div>
            );
        }

        // sku 组合
        const SKU = () => {
            let {results, columns, bitchFillState} = this.state;
            let {operation} = getPageQuery()

            const setValue = (field, value) => {
                this.setState({
                    submitData: {...this.state.submitData, [field]: value}
                })
            }

            const batchFillModalOpen = () => {
                this.setState({billVisible: true})
            }

            let data = []
            data = generateSku(sizeData, sizeValueData)
            columns = []
            sizeData.forEach(n => {
                columns.push({
                    title: n,
                    dataIndex: n,
                    disabled: true
                })
            })
            data.forEach(n => {
                let skuName = ''
                let arr = []
                for (let i in n) {
                    arr.push({specName: i, specValue: n[i]})
                }
                n.specList = arr

                n.specList.forEach(k => {
                    skuName += `${k.specName}:${k.specValue};`
                })
                n.skuName = skuName
            })
            this.state.cloneResult && this.state.cloneResult.forEach(n => {
                data.forEach((k) => {
                    if (n.skuName === k.skuName) {
                        k.costPrice = n.costPrice
                        k.goodsCode = n.goodsCode
                        k.goodsSn = n.goodsSn
                        k.imgUrl = n.imgUrl
                        k.inventory = n.inventory
                        k.price = n.price
                    }
                })
            })

            if (bitchFillState === true) {
                this.state.results && this.state.results.forEach(n => {
                    data.forEach((k) => {
                        if (n.skuName === k.skuName) {
                            k.costPrice = n.costPrice
                            k.goodsCode = n.goodsCode
                            k.goodsSn = n.goodsSn
                            k.imgUrl = n.imgUrl
                            k.inventory = n.inventory
                            k.price = n.price
                        }
                    })
                })
            }
            if (bitchFillState !== true) {
                this.state.results && this.state.results.forEach(n => {
                    data.forEach((k) => {
                        if (n.skuName === k.skuName) {
                            k.costPrice = n.costPrice
                            k.goodsCode = n.goodsCode
                            k.goodsSn = n.goodsSn
                            k.imgUrl = n.imgUrl
                            k.inventory = n.inventory
                            k.price = n.price
                        }
                    })
                })
            }

            this.state.results = data
            if (data.length > 0) {
                let inventory = 0
                data.forEach(n => {
                    if (isNumber(n.inventory)) {
                        inventory += n.inventory
                    }
                })
                this.state.submitData.inventory = inventory
            }

            return (
                <EditableTable
                    ref={(ref) => this.editableTableRef = ref}
                    columnsProps={columns}
                    data={data}
                    batchFill={batchFillModalOpen}
                    setValue={setValue}
                />
            )
        }

        // 批量填充
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

                        results.forEach((n, index) => {
                            results[index] = {...n, ...billData}
                        })
                        let inventory = 0
                        if (billData.inventory) {
                            inventory = billData.inventory * results.length
                        } else {
                            inventory = this.state.submitData.inventory
                        }
                        this.setState({
                            results,
                            billVisible: false,
                            bitchFillState: true,
                            billData: {},
                            submitData: {...this.state.submitData, inventory}
                        })
                    }}
                >
                    <div style={{display: 'flex', alignItems: 'center', marginBottom: 16}}>
                        <label style={{width: '15%', textAlign: 'right'}}>建议售价:</label>
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
                        <label style={{width: '15%', textAlign: 'right'}}>成本价:</label>
                        <InputNumber
                            min={0}
                            precision={2}
                            max={9999999.99}
                            style={{width: '80%', marginLeft: 16}}
                            onChange={value => {
                                this.setState({
                                        billData: {...this.state.billData, costPrice: value}
                                    }
                                )
                            }}
                        />
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', marginBottom: 16}}>
                        <label style={{width: '15%', textAlign: 'right'}}>库存:</label>
                        <InputNumber
                            style={{width: '80%', marginLeft: 16}}
                            max={9999999}
                            precision={0}
                            onChange={value => {
                                this.setState({
                                        billData: {...this.state.billData, inventory: value}
                                    }
                                )
                            }}
                        />
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', marginBottom: 16}}>
                        <label style={{width: '15%', textAlign: 'right'}}>SKU编码:</label>
                        <Input
                            maxLength={30}
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
                        <Col span={3}>
                            <label className={'sw-form-label'}>产品规格:</label>
                        </Col>
                        <Col span={20}>
                            {renderSize()}
                        </Col>
                    </Col>
                    <Col span={24} style={{marginBottom: 24}}>
                        <Col span={3}>
                            <label className={'sw-form-label'}>SKU 组合:</label>
                        </Col>
                        <Col span={20}>
                            {SKU()}
                        </Col>
                    </Col>
                    <Col span={24} style={{marginBottom: 24}}>
                        <Col span={3}>
                            <label className={'sw-form-label'}>产品价格:</label>
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
                                onChange={(value) => {
                                    this.setState({
                                        submitData: {...this.state.submitData, goodsPrice: value}
                                    })
                                }}
                                style={{borderRadius: 0}}
                            />
                        </Col>
                    </Col>
                    <Col span={24} style={{marginBottom: 24}}>
                        <Col span={3}>
                            <label className={'sw-form-label'}>库存:</label>
                        </Col>
                        <Col span={6}>
                            <Input
                                value={this.state.submitData.inventory}
                                disabled={true}
                                className={'sw-form-disable-color'}
                            />
                        </Col>
                    </Col>
                </Row>
            </div>
        )
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

    // 发布模态框
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

// sku 组合的 Table
class EditableCell extends React.Component {
    getInput = () => {
        const {type} = this.props;

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
        }

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
                    accept={'.png,.jpg,.bmp,.gif'}
                    name="file"
                    className="avatar-uploader"
                    showUploadList={false}
                    action={ApiConst.Versions().sunaw + ApiInterface.uploadFile}
                    onChange={handleChange}
                    beforeUpload={beforeUpload}
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
                                style={{height: 32, width: 32}}
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
                className={'sw-form-disable-color'}
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
                max={9999999}
                precision={0}
                style={{width: '100%'}}
                disabled={this.props.disabled}
                className={'sw-form-disable-color'}
                value={this.props.data[this.props.index][this.props.dataIndex]}
                onChange={(value) => {
                    if (this.props.dataIndex === 'inventory') {
                        let price = 0
                        this.props.data.forEach((n, index) => {
                            if (index === this.props.index) {
                                price += value
                            } else {
                                if (n[this.props.dataIndex] !== undefined && n[this.props.dataIndex] !== '') {
                                    price += n[this.props.dataIndex]
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
                        value: value,
                        dataIndex: this.props.dataIndex
                    })
                }}
            />
        ) : (
            <Input
                disabled={this.props.disabled}
                className={'sw-form-disable-color'}
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
        this.setState({data: this.props.data})
    }

    getValue = () => {
        return this.state.data
    }

    static getDerivedStateFromProps(props, state) {
        props.data.forEach((n, index) => {
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
                title: '建议售价',
                dataIndex: 'price',
                type: 'numberPrice',
                min: 0,
            },
            {
                title: '成本价',
                dataIndex: 'costPrice',
                type: 'numberPrice',
            },
            {
                title: '库存',
                dataIndex: 'inventory',
                type: 'number',
                max: 9999999
            },
            {
                title: 'SKU编码',
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
                            this.setState({data})
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

export default SaProductList;
