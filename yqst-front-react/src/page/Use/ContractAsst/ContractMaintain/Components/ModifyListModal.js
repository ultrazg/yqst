import React, {PureComponent} from 'react';
import {Modal, Input, Button} from "antd";
import SWTable from 'SWViews/table';
import request from "../../../../../utils/request/request";
import moment from 'moment';

class ModifyListModal extends PureComponent {
    requestParams = {};

    constructor(props) {
        super(props);
        this.listType = this.props.listType;
        this.state = {
            list: [],
            total: 0,
            requestPar: {
                current: 1,
                pageSize: 10,
                keyWord: '',
                sn: this.props.sn
            },
        }
    }

    componentDidMount() {
        this.getList();
    }

    title = () => {
        switch (this.listType) {
            case 1:
                return "合同价格补充记录";
            case 2:
                return "结算信息修改记录";
            case 3:
                return "切割赔偿修改记录";
            case 4:
                return "丢损赔偿修改记录";
            case 5:
                return "维保修改记录";
            default:
                return "";
        }
    }
    getList = () => {
        switch (this.listType) {
            case 1:
                this.getPriceRecList()
                break;
            case 2:
                this.getSettleRecList()
                break;
            case 3:
                this.getCuttingRecList()
                break;
            case 4:
                this.getLossRecList()
                break;
            case 5:
                this.getMaintainRecList()
                break;
            default:
                break;
        }
    }
    getPriceRecList = () => {
        request('/api/v1/contract/lease/contract/supplement/page', this.state.requestPar, res => {
            this.state.total = res.data.total || 0;
            this.setState({
                list: res.data.records || [],
                total: this.state.total || 0,
            });
        });
    }
    getSettleRecList = () => {
        request('/api/v1/contract/lease/contract/settlement/info/update/log/page', this.state.requestPar, res => {
            this.state.total = res.data.total || 0;
            this.setState({
                list: res.data.records || [],
                total: this.state.total || 0,
            });
        });
    }
    getCuttingRecList = () => {
        request('/api/v1/contract/lease/contract/replacement/goods/update/log/page', this.state.requestPar, res => {
            this.state.total = res.data.total || 0;
            this.setState({
                list: res.data.records || [],
                total: this.state.total || 0,
            });
        });
    }
    getLossRecList = () => {
        request('/api/v1/contract/lease/contract/loss/good/update/log/page', this.state.requestPar, res => {
            this.state.total = res.data.total || 0;
            this.setState({
                list: res.data.records || [],
                total: this.state.total || 0,
            });
        });
    }
    getMaintainRecList = () => {
        request('/api/v1/contract/lease/contract/maintenance/item/update/log/page', this.state.requestPar, res => {
            this.state.total = res.data.total || 0;
            this.setState({
                list: res.data.records || [],
                total: this.state.total || 0,
            });
        });
    }
    getPreviewData = () => {
        switch (this.listType) {
            case 1:
                this.getPriceDetail()
                break;
            case 2:
                this.getSettleDetail()
                break;
            case 3:
                this.getCuttingDetail()
                break;
            case 4:
                this.getLossDetail()
                break;
            case 5:
                this.getMaintainDetail()
                break;
            default:
                break;
        }
    }
    getPriceDetail = () => {
        request('/api/v1/contract/lease/contract/supplement/get', {...this.requestParams}, (res) => {
            this.props.previewFun({...res.data})
        }, () => {
        });
    }
    getSettleDetail = () => {
        request('/api/v1/contract/lease/contract/settlement/info/update/log', {...this.requestParams}, (res) => {
            this.props.previewFun({...res.data})
        }, () => {
        });
    }
    getCuttingDetail = () => {
        request('/api/v1/contract/lease/contract/replacement/goods/update/log', {...this.requestParams}, (res) => {
            this.props.previewFun({...res.data})
        }, () => {
        });
    }
    getLossDetail = () => {
        request('/api/v1/contract/lease/contract/loss/good/update/log', {...this.requestParams}, (res) => {
            this.props.previewFun({...res.data})
        }, () => {
        });
    }
    getMaintainDetail = () => {
        request('/api/v1/contract/lease/contract/maintenance/item/update/log', {...this.requestParams}, (res) => {
            this.props.previewFun({...res.data})
        }, () => {
        });
    }

    render() {
        return (
            <>
                <Modal
                    title={this.title()}
                    visible={true}
                    width={'70%'}
                    style={{top: 10}}
                    footer={null}
                    onCancel={() => {
                        this.props.onClose && this.props.onClose()
                    }}>
                    <p>
                        关键词：
                        <Input
                            placeholder='请输入关键词'
                            style={{width: 300}}
                            value={this.state.requestPar.keyWord}
                            onChange={e => this.setState({
                                requestPar: {
                                    ...this.state.requestPar,
                                    keyWord: e.target.value
                                }
                            })}
                        />
                        <Button
                            type='primary'
                            style={{marginLeft: 20, marginRight: 20}}
                            onClick={() => {
                                this.setState({
                                    requestPar: {
                                        ...this.state.requestPar,
                                        current: 1
                                    }
                                }, () => {
                                    this.getList();
                                });
                            }}
                        >
                            搜索
                        </Button>
                        <Button onClick={() => {
                            this.setState({
                                requestPar: {
                                    ...this.state.requestPar,
                                    current: 1,
                                    pageSize: 10,
                                    keyWord: ''
                                }
                            }, () => {
                                this.getList();
                            });
                        }}>重置</Button>
                    </p>
                    {this.makeTable()}
                </Modal>
            </>
        );
    }

    makeTable() {
        let {list, requestPar} = this.state;
        const columns = this.listType == 1 ? [
            {
                title: '编号',
                key: 'contractPriceSn',
                dataIndex: 'contractPriceSn',
                width: '35%',
                render: (text) => {
                    return <span className={'text-elli2'}>{text}</span>
                }
            },
            {
                title: '提交时间',
                key: 'submitTime',
                dataIndex: 'submitTime',
                width: '30%',
                render: (text) => {
                    let arr = text ?
                        moment(text).format("YYYY-MM-DD HH:mm:ss").split(" ")
                        : null;
                    return arr ? <span>{arr[0]}<br/>{arr[1]}</span> : "";
                }
            },
            {
                title: '操作',
                key: 'opera',
                dataIndex: 'opera',
                width: 70,
                render: (text, rec) => {
                    return <a onClick={() => {
                        this.requestParams = {
                            sn: rec.sn
                        }
                        this.getPreviewData();
                    }}>查看</a>
                }
            }] : [
            {
                title: 'ID',
                key: 'id',
                dataIndex: 'id',
                width: '15%',
                render: (text) => {
                    return <span className={'text-elli2'}>{text}</span>
                }
            },
            this.listType == 2 ? {} : {
                title: '业务Sn',
                key: 'leaseContractBusinessSn',
                dataIndex: 'leaseContractBusinessSn',
                width: '35%',
                render: (text) => {
                    return <span className={'text-elli2'}>{text}</span>
                }
            },
            {
                title: '提交人名称',
                key: 'submitterName',
                dataIndex: 'submitterName',
                width: '30%',
                render: (text) => {
                    return <span className={'text-elli2'}>{text}</span>
                }
            },
            {
                title: '提交时间',
                key: 'submitTime',
                dataIndex: 'submitTime',
                width: '30%',
                render: (text) => {
                    let arr = text ?
                        moment(text).format("YYYY-MM-DD HH:mm:ss").split(" ")
                        : null;
                    return arr ? <span>{arr[0]}<br/>{arr[1]}</span> : "";
                }
            },
            {
                title: '操作',
                key: 'opera',
                dataIndex: 'opera',
                width: 70,
                render: (text, rec) => {
                    return <a onClick={() => {
                        this.requestParams = this.listType == 2 ? {
                            id: rec.id
                        } : {
                            sn: rec.sn
                        }
                        this.getPreviewData();
                    }}>查看</a>
                }
            },
        ];
        return <div>
            <SWTable
                columns={columns}
                dataSource={list}
                pagination={
                    {
                        total: this.state.total,
                        current: requestPar.current,
                        pageSize: requestPar.pageSize,
                        onChange: (a, b) => {
                            let obj = this.state.requestPar;
                            obj.current = a;
                            this.setState({requestPar: obj}, () => {
                                this.getList();
                            })
                        },
                        showTotal: (total, range) => `共有${total}条数据`
                    }
                }
            />
        </div>
    }
}

export default ModifyListModal;
