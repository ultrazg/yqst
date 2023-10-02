import React, {Component} from 'react';
import ViewCoat from '../../PublicModule/ViewCoat/ViewCoat';
import {PlusOutlined} from '@ant-design/icons';
import {
    Button,
    Input,
    Popconfirm,
    message, Checkbox, Modal,
} from 'antd';
import CompanyProductModel from '../CompanyProductModel';
import SWTable from 'SWViews/table';
import CorrelationSelectProductListModal from './CorrelationSelectProductListModal';
import moment from "moment";

class CorrelationList extends Component {
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

    search = () => {
        this.getPage()
    }

    getPage = (current = this.state.current, pageSize = this.state.pageSize, keyWord = this.state.keyWord) => {
        CompanyProductModel.CorrelationList({
            current: current,
            pageSize: pageSize,
            keyWord
        }, res => {
            this.setState({
                tableData: res.data.records,
                current: res.data.current,
                total: res.data.total
            })
        })
    }
    cancel = (goodsSn) => {
        CompanyProductModel.CorrelationCancel({
            goodsSn
        }, res => {
            message.success("取消关联成功")
            this.getPage();
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
                    {title: '关联平台产品'},
                ]}
            >
                <h4 style={{marginBottom: 12}}>搜索</h4>
                {/*	搜索区域 */}
                {this.renderSearch()}
                {/*	操作按钮区域 */}
                {/*{this.renderOperationButton()}*/}
                {/* 表格区域 */}
                {this.renderTable()}
                {this.state.selectModalVisi ?
                    <CorrelationSelectProductListModal
                        ok={(data) => {
                            CompanyProductModel.CorrelationAdd({
                                platformGoodsSn: data.platformGoodsSn,
                                goodsSn: this.goodsSn,
                            }, () => {
                                message.success("关联成功");
                                this.setState({selectModalVisi: false}, () => {
                                    this.getPage();
                                })
                            }, () => {
                            });
                        }}
                        cancel={() => {
                            this.setState({selectModalVisi: false})
                        }}
                    /> : null}
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
                    style={{width: 272, height: 40, fontSize: '14px'}}
                    value={this.state.keyWord}
                    placeholder={'请输入关键字'}
                    onChange={e => {
                        this.setState({keyWord: e.target.value})
                    }}
                    onKeyDown={e => {
                        if (e.keyCode === 13) this.search()
                    }}
                    maxLength={30}
                />
                <Button
                    type="primary"
                    onClick={this.search}
                    style={{
                        marginLeft: 16,
                        width: 96,
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
                    // className={'operation-btn-style'}
                    type='primary'
                    onClick={() => {
                        this.setState({visible: true})
                    }}
                    icon={<PlusOutlined/>}
                    style={{height: 40, fontSize: '16px', borderRadius: '6px'}}
                >
                    发起申请
                </Button>
            </div>
        );
    }

    renderTable = () => {
        const {tableData} = this.state;
        const columns = [
            {
                title: '企业产品编号', width: '15%', dataIndex: 'goodsCode', key: 'goodsCode',
                render: (text) => {
                    return <span title={text} className={'text-elli2'}>{text}</span>
                }
            },
            {
                title: '企业产品名称', width: '15%', dataIndex: 'goodsName', key: 'goodsName',
                render: (text) => {
                    return <span title={text} className={'text-elli2'}>{text}</span>
                }
            },
            {
                title: '平台产品编号', width: '15%', dataIndex: 'platformGoodsCode', key: 'platformGoodsCode',
                render: (text) => {
                    return <span title={text} className={'text-elli2'}>{text}</span>
                }
            },
            {
                title: '平台产品名称', width: '15%', dataIndex: 'platformGoodsName', key: 'platformGoodsName',
                render: (text) => {
                    return <span title={text} className={'text-elli2'}>{text}</span>
                }
            },
            {
                title: '状态', width: 120, dataIndex: 'relationStatus', key: 'relationStatus', render: (text, record) => {
                    switch (parseInt(text)) {
                        //0:未关联 1:已关联
                        case 0:
                            return "未关联"
                        case 1:
                            return "已关联"
                        default:
                            return ""
                    }
                }
            },
            {
                title: '关联时间',
                dataIndex: 'relationTime',
                key: 'relationTime',
                width: 110,
                render: (res) => {
                    let times = res ? moment(res).format('YYYY-MM-DD HH:mm:ss') : '';
                    return times ? <div>
                        <div>{times.split(' ')[0]}</div>
                        <div>{times.split(' ')[1]}</div>
                    </div> : times;
                }
            },
            {title: '操作', width: 90, dataIndex: 'operation', render: (text, record) => operationBtn(record)},
        ]
        const operationBtn = (record) => (
            <>
                {record.relationStatus == 1 ? <Popconfirm
                    title="确认取消关联该条数据?"
                    onConfirm={() => this.cancel(record.goodsSn)}
                    okText="确认"
                    cancelText="取消"
                >
                    <a
                        style={{color: '#F12C20'}}
                    >
                        取消关联
                    </a>
                </Popconfirm> : <a onClick={() => {
                    this.goodsSn = record.goodsSn;
                    this.setState({selectModalVisi: true})
                }}>设置关联</a>}
            </>
        )
        return (
            <div className={'sw-table'} style={{marginTop: 26}}>
                <SWTable
                    columns={columns}
                    dataSource={tableData}
                    // rowKey={'sn'}
                    pagination={{
                        current: this.state.current,
                        total: this.state.total,
                        onChange: (page, pageSize) => {
                            this.setState({current: page}, () => {
                                this.getPage(page)
                            })
                        }
                    }}
                />
            </div>
        )
    }

}

export default CorrelationList;
