import React, {Component} from 'react';
import ViewCoat from '../../PublicModule/ViewCoat/ViewCoat';
import {PlusOutlined, DeleteOutlined, CopyOutlined, VerticalAlignBottomOutlined} from '@ant-design/icons';
import {
    Button,
    Input,
    Modal,
    Table,
    Popconfirm,
    message,
    Tabs
} from 'antd';
import CompanyProductModel from '../CompanyProductModel'
import '../CompanyProductLibLess.less'
import SWTable from 'SWViews/table';
import moment from 'moment'

const { TabPane } = Tabs;
const detailPath = '/pages/appCenter/companyProductLib/companyProductLibHome/companyProduct/CompanyProductDetail'

class CompanyProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 1,
            pageSize: 10,
            total: 0,
            tableData: [],
            keyWord: '',
            shopData: [],
            listType: 0,
        };
    }

    // /*
    //     * 获取店铺列表
    //     * */
    // getShopPage = () => {
    //     CompanyProductModel.({current: 1, pageSize: 10000, shopType: 1}, res => {
    //         this.setState({shopData: res.data.records})
    //     })
    // }
    search = () => {
        this.setState({current: 1}, () => {
            this.getPage()
        });
    }

    getPage = (current = this.state.current, pageSize = this.state.pageSize, keyWord = this.state.keyWord, listType = this.state.listType) => {
        CompanyProductModel.ProductList({
            current,
            pageSize,
            keyWord,
            listType,
        }, res => {
            this.setState({
                tableData: res.data.records,
                current: res.data.current,
                total: res.data.total
            })
        })
    }

    del = (id) => {
        CompanyProductModel.ProductBatchDel({goodsSnList: [id]}, res => {
            message.success('删除成功')
            this.getPage()
        })
    }

    batchDel = () => {
        CompanyProductModel.ProductBatchDel({goodsSnList: this.state.selectedRowKeys}, res => {
            this.setState({deleteVisible: false, selectedRowKeys: []})
            message.success('删除成功')
            this.getPage()
        })
    }
    enable = (id) => {
        CompanyProductModel.ProductEnable({goodsSn: id}, res => {
            message.success('启用成功')
            this.getPage()
        })
    }
    disable = (id) => {
        CompanyProductModel.ProductDisable({goodsSn: id}, res => {
            message.success('停用成功')
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
                    {title: '企业产品库'},
                    {title: '产品列表'},
                ]}
            >
                <Tabs activeKey={this.state.listType + ''} onChange={(key) => {
                    this.setState({listType: key, current: 1}, () => {
                        this.getPage()
                    });
                }}>
                    <TabPane tab="全部" key="0"/>
                    <TabPane tab="待启用" key="1"/>
                    <TabPane tab="已启用" key="2"/>
                    <TabPane tab="已停用" key="3"/>
                </Tabs>
                {/*{this.renderChooseTerminalModal()}*/}
                {/*<h4 style={{marginBottom: 12}}>搜索</h4>*/}
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
                    // className={'operation-btn-style'}
                    type='primary'
                    onClick={() => {
                        this.props.history.push(detailPath + `?operation=new`)
                    }}
                    style={{height: 40, fontSize: '16px', borderRadius: '6px'}}
                    icon={<PlusOutlined/>}
                >
                    新增企业产品
                </Button>
                <Button
                    danger
                    // className={'operation-btn-style'}
                    style={{marginLeft: 16, borderRadius: '6px', height: 40, fontSize: '16px'}}
                    onClick={() => this.setState({deleteVisible: true})}
                    disabled={!(this.state.selectedRowKeys && this.state.selectedRowKeys.length > 0)}
                    icon={<DeleteOutlined/>}
                >
                    删除
                </Button>
                {/*<Button*/}
                {/*    // className={'operation-btn-style'}*/}
                {/*    style={{marginLeft: 16, borderRadius: '6px', height: 40, fontSize: '16px'}}*/}
                {/*    // onClick={() => this.setState({deleteVisible: true})}*/}
                {/*    // disabled={!(this.state.selectedRowKeys && this.state.selectedRowKeys.length > 0)}*/}
                {/*    icon={<CopyOutlined/>}*/}
                {/*>*/}
                {/*    批量导入*/}
                {/*</Button>*/}
                {/*<Button*/}
                {/*    // className={'operation-btn-style'}*/}
                {/*    style={{marginLeft: 16, borderRadius: '6px', height: 40, fontSize: '16px'}}*/}
                {/*    // onClick={() => this.setState({deleteVisible: true})}*/}
                {/*    // disabled={!(this.state.selectedRowKeys && this.state.selectedRowKeys.length > 0)}*/}
                {/*    icon={<VerticalAlignBottomOutlined/>}*/}
                {/*>*/}
                {/*    下载导入模板*/}
                {/*</Button>*/}
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
            {
                title: '创建日期',
                dataIndex: 'createTime',
                width: 110,
                render: (res) => {
                    let times = res ? moment(res).format('YYYY-MM-DD HH:mm:ss') : '';
                    return times ? <div>
                        <div>{times.split(' ')[0]}</div>
                        <div>{times.split(' ')[1]}</div>
                    </div> : times;
                }
            },
            {
                title: '状态', width: 120, dataIndex: 'status', render: text => {
                    switch (parseInt(text)) {
                        case 1:
                            return "未启用"
                        case 2:
                            return "已启用"
                        case 3:
                            return "已停用"
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
                    {record.status == 2 ?
                        <Popconfirm
                            placement="topRight"
                            title="确认停用该产品？停用之后该产品所有sku也会被停用！"
                            onConfirm={() => this.disable(record.goodsParentSn)}
                            okText="确认"
                            cancelText="取消"
                        >
                            <a style={{color: '#F12C20'}}>停用</a>
                        </Popconfirm> : <Popconfirm
                            title="确认启用该产品?"
                            onConfirm={() => this.enable(record.goodsParentSn)}
                            okText="确认"
                            cancelText="取消"
                        >
                            <a>启用</a>
                        </Popconfirm>}
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
                <SWTable
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

    // releaseGoods = () => {
    //     if (this.state.selectShop && this.state.selectShop !== '') {
    //         CompanyProductModel.shopGoodsPublish({
    //             goodsParentSn: this.state.goodsSn,
    //             shopSn: this.state.selectShop
    //         }, res => {
    //             message.success('发布产品成功')
    //             this.setState({chooseTerminalVisible: false})
    //         })
    //     } else {
    //         message.error('请选择店铺')
    //     }
    // }

    // renderChooseTerminalModal = () => {
    //     return (
    //         <Modal
    //             afterClose={() => {
    //                 this.setState({
    //                     goodsSn: undefined,
    //                     selectShop: undefined
    //                 })
    //             }}
    //             destroyOnClose={true}
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

export default CompanyProductList;
