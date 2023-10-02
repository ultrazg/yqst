import React, {Component} from 'react';
import ViewCoat from '../../PublicModule/ViewCoat/ViewCoat';
import {PlusOutlined} from '@ant-design/icons';
import {
    Button,
    Input,
    Modal,
    Table,
    Popconfirm,
    message,
    Select,
} from 'antd';
import Model from '../../Model'
import '../ProductLibLess.less'
import {formatDate} from '../../../../utils'


const detailPath = '/pages/appCenter/productLib/SaProductHome/SaProModule/SaProductDetail'


class SaProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 1,
            pageSize: 10,
            total: 0,
            tableData: [],
            keyWord: '',
            shopData: []
        };
    }

    /*
        * 获取店铺列表
        * */
    getShopPage = () => {
        Model.AutoLogin({current: 1, pageSize: 10000, shopType: 1}, res => {
            this.setState({shopData: res.data.records})
        })
    }
    search = () => {
        this.getPage()
    }

    getPage = (current = this.state.current, pageSize = this.state.pageSize, keyWord = this.state.keyWord) => {
        console.log(this.state.keyWord)
        Model.sellerGoodsPage({
            current,
            pageSize,
            keyWord
        }, res => {
            this.setState({
                tableData: res.data.records,
                current: res.data.current,
                total: res.data.total
            })
        })
    }

    del = (id) => {
        Model.sellerGoodsBatchDel({goodsSnList: [id]}, res => {
            message.success('删除成功')
            this.getPage()
        })
    }

    batchDel = () => {
        Model.sellerGoodsBatchDel({goodsSnList: this.state.selectedRowKeys}, res => {
            this.setState({deleteVisible: false, selectedRowKeys: []})
            message.success('删除成功')
            this.getPage()
        })
    }
    enable = (id) => {
        Model.sellerGoodsEnable({goodsSn: id}, res => {
            message.success('启用成功')
            this.getPage()
        })
    }

    componentDidMount() {
        this.getPage()
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <ViewCoat
                breadCrumb={[
                    {title: '产品列表'},
                ]}
            >
                {/*{this.renderChooseTerminalModal()}*/}
                <h4 style={{marginBottom: 12}}>搜索</h4>
                {/*	搜索区域 */}
                {this.renderSearch()}
                {/*	操作按钮区域 */}
                {this.renderOperationButton()}
                {/* 表格区域 */}
                {this.renderTable()}
                {/*删除弹出的确认框*/}
                {this.renderDeleteModal()}
            </ViewCoat>
        );
    }

    renderSearch = () => {
        return (
            <div>
                <label
                    style={{fontSize: 14, fontWeight: 500, lineHeight: '20px', marginRight: 8}}
                >
                    关键词 :
                </label>
                <Input
                    className='sw-searchInput'
                    style={{width: 272, height: 40}}
                    value={this.state.keyWord}
                    placeholder={'请输入关键字'}
                    maxLength={50}
                    onChange={e => {
                        this.setState({keyWord: e.target.value})
                    }}
                    onKeyDown={e => {
                        if (e.keyCode === 13) this.search()
                    }}
                />
                <Button
                    type="primary"
                    onClick={this.search}
                    style={{
                        marginLeft: 16,
                        width: 80,
                        height: 40,
                        fontSize: 16,
                        verticalAlign: 'bottom',
                        borderRadius: 6
                    }}
                >
                    搜索
                </Button>
                <Button
                    style={{
                        marginLeft: 16,
                        width: 80,
                        height: 40,
                        fontSize: 16,
                        verticalAlign: 'bottom',
                        borderRadius: 6
                    }}
                    onClick={() => this.setState({keyWord: ''})}
                >
                    重置
                </Button>
            </div>
        )
    }

    renderOperationButton = () => {
        return (
            <div style={{marginTop: 24}}>
                <Button
                    className={'operation-btn-style'}
                    type='primary'
                    onClick={() => {
                        this.props.history.push(detailPath + `?operation=new`)
                    }}
                    style={{width: 118}}
                >
                    <PlusOutlined/>
                    添加
                </Button>
                <Button
                    // className={'operation-btn-style'}
                    style={{marginLeft: 16, width: 80, height: 40, fontSize: '16px'}}
                    onClick={() => this.setState({deleteVisible: true})}
                    disabled={!(this.state.selectedRowKeys && this.state.selectedRowKeys.length > 0)}
                >
                    删除
                </Button>
            </div>
        );
    }

    renderTable = () => {
        const {tableData} = this.state;
        const columns = [
            {
                title: '产品名称', width: '25%', dataIndex: 'goodsName', render: (text, record) => {
                    const urlArr = record.imgUrl.split(',')
                    return (
                        <div style={{display: 'flex', flex: 1, flexDirection: 'row'}}>
                            <div style={{width: 62}}>
                                <img width={62} height={62} src={urlArr[0] && urlArr[0]} alt="" className={'imgCover'}/>
                            </div>
                            <div style={{flex: 1}}>
                                <h3
                                    className={'sw-table-title'}
                                    style={{margin: 0, fontSize: 14, fontWeight: 400, color: '#4481EB'}}
                                >
                                    {text}
                                </h3>
                                <p
                                    className={'sw-table-dec'}
                                    style={{margin: 0, fontSize: 12, fontWeight: 400}}
                                >
                                    {record.goodsCode}
                                </p>
                            </div>
                        </div>
                    )
                }
            },
            {title: '产品类目', width: '20%', dataIndex: 'catNamePath'},
            {title: '产品价格', dataIndex: 'showPrice'},
            // {title: '库存', dataIndex: 'inventory'},
            {title: '创建日期', dataIndex: 'createTime', render: text => formatDate(text)},
            {
                title: '状态', width: '9%', dataIndex: 'status', render: text => {
                    switch (text) {
                        case 1:
                            return "未启用"
                        case 2:
                            return "已启用"
                        default:
                            return ""
                    }
                }
            },
            {title: '操作', dataIndex: 'operation', render: (text, record) => operationBtn(record)},
        ]
        const operationBtn = (record) => (
            <div>
                <div>
                    <a onClick={() => {
                        this.props.history.push(detailPath + `?id=${record.goodsParentSn}&operation=edit`)
                    }}>编辑</a>
                    {/*<Divider type={'vertical'}/>*/}
                    {/*<a*/}
                    {/*    onClick={() => {*/}
                    {/*        this.getShopPage()*/}
                    {/*        this.setState({chooseTerminalVisible: true, goodsSn: record.goodsParentSn})*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    发布*/}
                    {/*</a>*/}

                </div>
                <div>
                    <Popconfirm
                        title="确认删除该条数据?"
                        onConfirm={() => this.del(record.goodsParentSn)}
                        okText="确认"
                        cancelText="取消"
                    >
                        <a style={{color: '#F12C20'}}>删除</a>
                    </Popconfirm>
                </div>
                <div>
                    {record.status == 1 ?
                        <Popconfirm
                            title="确认启用该产品?"
                            onConfirm={() => this.enable(record.goodsParentSn)}
                            okText="确认"
                            cancelText="取消"
                        >
                            <a>启用</a>
                        </Popconfirm> : null}
                </div>
            </div>
        )
        const onSelectChange = (selectedRowKeys) => {
            this.setState({selectedRowKeys});
        }
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: onSelectChange,
        };
        return (
            <div className={'sw-table'} style={{marginTop: 26}}>
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={tableData}
                    rowKey={'goodsParentSn'}
                    pagination={{
                        current: this.state.current,
                        total: this.state.total,
                        onChange: (page, pageSize) => {
                            this.setState({current: page})
                            this.getPage(page)
                        }
                    }}
                />
            </div>
        )
    }

    renderDeleteModal = () => {
        return (
            <Modal
                title={'提示'}
                visible={this.state.deleteVisible}
                onCancel={() => this.setState({deleteVisible: false})}
                className={'sw-modal-delete'}
                onOk={this.batchDel}
                okText='删除'
            >
                <p style={{textAlign: 'center', fontSize: '14px', color: '#2B3441'}}>确认删除产品?</p>
            </Modal>
        )
    }

    releaseGoods = () => {
        if (this.state.selectShop && this.state.selectShop !== '') {
            Model.shopGoodsPublish({
                goodsParentSn: this.state.goodsSn,
                shopSn: this.state.selectShop
            }, res => {
                message.success('发布产品成功')
                this.setState({chooseTerminalVisible: false})
            })
        } else {
            message.error('请选择店铺')
        }
    }

    renderChooseTerminalModal = () => {
        return (
            <Modal
                afterClose={() => {
                    this.setState({
                        goodsSn: undefined,
                        selectShop: undefined
                    })
                }}
                destroyOnClose={true}
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

export default SaProductList;
