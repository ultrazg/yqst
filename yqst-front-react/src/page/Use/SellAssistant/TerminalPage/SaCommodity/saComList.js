import React, {Component} from 'react';
import {
    Button,
    message,
    Input,
    Divider,
    Popconfirm,
    Table,
    Modal,
} from 'antd';
import ViewCoat from '../../../PublicModule/ViewCoat/ViewCoat';
import SWTable from 'SWViews/table';
import Model from '../../../Model'
import {formatDate} from '../../../../../utils'


const detailPath = '/pages/appCenter/sellAssistant/terminalPage/saCommodity/saComDetail'

class saComList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 1,
            pageSize: 10,
            total: 0,
            tableData: [],
            keyWord: ''
        };
    }

    search = () => {
        this.getPage()
    }

    getPage = (current = this.state.current, pageSize = this.state.pageSize, keyWord = this.state.keyWord) => {
        const SParams = JSON.parse(localStorage.getItem('SParams'))
        Model.shopGoodsPage({
            current,
            pageSize,
            keyWord,
            shopSn: SParams.rawData.shopSn
        }, res => {
            this.setState({
                tableData: res.data.records,
                current: res.data.current,
                total: res.data.total
            })
            console.log(res)
        })
    }

    componentDidMount() {
        this.getPage()
    }

    componentWillUnmount() {

    }

    del = (id) => {
        Model.shopGoodsBatchDelete({shopGoodsParentSnList: [id]}, res => {
            message.success('删除成功')
            this.getPage()
        })
    }

    batchDel = () => {
        Model.shopGoodsBatchDelete({shopGoodsParentSnList: this.state.selectedRowKeys}, res => {
            message.success('删除成功')
            this.setState({deleteVisible: false, selectedRowKeys: []})
            this.getPage()
        })
    }

    render() {
        return (
            <ViewCoat
                breadCrumb={[
                    {title: '商品列表'},
                ]}
            >
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
                    maxLength={30}
                    style={{width: 272, height: 40}}
                    value={this.state.keyWord}
                    placeholder={'请输入关键字'}
                    className={'sw-searchInput'}
                    onChange={e => {
                        this.setState({keyWord: e.target.value})
                    }}
                    onKeyDown={e => {
                        if (e.keyCode === 13) this.search()
                    }}
                />
                <Button
                    type="primary"
                    style={{
                        marginLeft: 16,
                        width: 96,
                        height: 40,
                        fontSize: 16,
                        verticalAlign: 'bottom',
                        borderRadius: 6
                    }}
                    onClick={this.search}
                >
                    搜索
                </Button>
                <Button
                    style={{
                        marginLeft: 16,
                        width: 96,
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
                    onClick={() => this.setState({deleteVisible: true})}
                    disabled={!(this.state.selectedRowKeys && this.state.selectedRowKeys.length > 0)}
                >
                    删除
                </Button>
            </div>
        )
    }

    shelves = (record) => {
        const statusList = [{
            shopGoodsParentSn: record.shopGoodsParentSn,
            goodsStatus: record.goodsStatus === 0 ? 1 : 0
        }]
        if (record.goodsStatus === 0) {
            Model.shopGoodsSkuIsChange({
                shopGoodsParentSn: record.shopGoodsParentSn,
            }, res => {
                if (res.data === 0) {
                    Model.shopGoodsStatusUpdate({
                        shopGoodsParentSn: record.shopGoodsParentSn,
                        goodsStatus: record.goodsStatus === 0 ? 1 : 0
                    }, res => {
                        let msg = record.goodsStatus === 0 ? '上架成功' : '下架成功'
                        message.success(msg)
                        this.getPage()
                    })
                } else {
                    Modal.confirm({
                        title: '产品规格及sku已有变化,是否同步 sku?',
                        onOk() {
                            Model.shopGoodsStatusUpdate({
                                shopGoodsParentSn: record.shopGoodsParentSn,
                                goodsStatus: record.goodsStatus === 0 ? 1 : 0
                            }, res => {
                                let msg = record.goodsStatus === 0 ? '上架成功' : '下架成功'
                                message.success(msg)
                                this.getPage()
                            })
                        },
                    });
                }
            })
        } else {
            Model.shopGoodsStatusBatchUpdate({
                statusList
            }, res => {
                let msg = record.goodsStatus === 0 ? '上架成功' : '下架成功'
                message.success(msg)
                this.getPage()
            })
        }
    }

    renderTable = () => {
        const {tableData} = this.state;
        const columns = [
            {
                title: '商品名称', width: '25%', dataIndex: 'goodsName', render: (text, record) => {
                    const urlArr = record.imgUrl.split(',')
                    return (
                        <div style={{display: 'flex', flex: 1, flexDirection: 'row'}}>
                            <div style={{width: 62}}>
                                <img width={62} height={62} src={urlArr[0] && urlArr[0]} alt=""/>
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
            {title: '商品分类', width: '20%', dataIndex: 'catNamePath'},
            {title: '价格(含税)', dataIndex: 'showPrice'},
            {title: '库存', dataIndex: 'goodsNum'},
            {title: '创建日期', dataIndex: 'createTime', render: text => formatDate(text)},
            {title: '操作', dataIndex: 'operation', render: (text, record) => operationBtn(record)},
        ]
        const operationBtn = (record) => (
            <>
                <a
                    onClick={() => {
                        this.props.history.push(detailPath + `?id=${record.shopGoodsParentSn}&operation=edit`)
                    }}
                >
                    编辑
                </a>
                <Divider type={'vertical'}/>
                <a
                    onClick={() => this.shelves(record)}
                >
                    {record.goodsStatus === 0 ? '上架' : record.goodsStatus === 1 ? '下架' : ''}
                </a>
                <Divider type={'vertical'}/>
                <Popconfirm
                    title="确认删除该条数据?"
                    onConfirm={() => this.del(record.shopGoodsParentSn)}
                    okText="确认"
                    cancelText="取消"
                >
                    <a
                        style={{color: '#F12C20'}}
                    >
                        删除
                    </a>
                </Popconfirm>
            </>
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
                    rowKey={'shopGoodsParentSn'}
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
                title={'温馨提示'}
                visible={this.state.deleteVisible}
                onCancel={() => this.setState({deleteVisible: false})}
                className={'sw-modal-delete'}
                onOk={this.batchDel}
                okText='删除'
            >
                <p style={{textAlign: 'center', fontSize: '18px', color: '#2B3441'}}>确认批量删除商品?</p>
            </Modal>
        )
    }
}

export default saComList;
