import React from 'react';
import {Button, DatePicker, Input, Table} from "antd";
import moment from "moment";
import CostAssistantModel from "../../CostAssistantModel";

const {RangePicker} = DatePicker;

class AddFeesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            total: 0,
            requestPar: {
                current: 1,
                pageSize: 10,
                keyWord: '',
                startTime: '',
                endTime: '',
                listType: 2,
                feeType: this.props.feeType || 0
            }
        };
    }

    componentDidMount() {
        this.getList();
    }

    render() {
        return (
            <div>
                {this.renderSearchView()}
                {this.renderTableView()}
            </div>
        );
    }

    getList = () => {
        const {requestPar} = this.state;
        CostAssistantModel.FeePayeePage(requestPar, res => {
            this.setState({
                data: res.data.records || [],
                total: res.data.total || 0
            });
        });
    }

    renderSearchView = () => {
        return (
            <>
                <label>关键词：</label>
                <Input
                    style={{width: 300, marginRight: 20}}
                    maxLength={20}
                    value={this.state.requestPar.keyWord}
                    placeholder='请输入搜索关键词'
                    onChange={e => {
                        this.setState({
                            requestPar: {
                                ...this.state.requestPar,
                                keyWord: e.target.value
                            }
                        });
                    }}
                />
                <label>日期：</label>
                <RangePicker
                    style={{marginRight: 20}}
                    value={[this.state.requestPar.startTime ? moment(this.state.requestPar.startTime) : '', this.state.requestPar.endTime ? moment(this.state.requestPar.endTime) : '']}
                    onChange={(date, dateString) => {
                        this.setState({
                            requestPar: {
                                ...this.state.requestPar,
                                startTime: dateString[0],
                                endTime: dateString[1]
                            }
                        });
                    }}
                />
                <Button
                    type='primary'
                    style={{marginRight: 20, marginTop: 20}}
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
                >搜索</Button>
                <Button onClick={() => {
                    this.setState({
                        requestPar: {
                            ...this.state.requestPar,
                            current: 1,
                            pageSize: 10,
                            keyWord: '',
                            startTime: '',
                            endTime: '',
                            // 付款方
                        }
                    }, () => {
                        this.getList();
                    });
                }}>重置</Button>
            </>
        );
    }

    renderTableView = () => {
        const columns = [
            {
                title: "费用单号",
                key: "feeBusinessSn",
                dataIndex: "feeBusinessSn"
            },
            {
                title: '项目名称',
                key: 'projectName',
                dataIndex: 'projectName'
            },
            {
                title: "付款方",
                key: "payerName",
                dataIndex: "payerName"
            },
            {
                title: "收款方",
                key: "payeeName",
                dataIndex: "payeeName"
            },
            {
                title: "费用金额(含税)",
                key: "feeAmount",
                dataIndex: "feeAmount"
            },
            {
                title: "费用日期",
                key: "businessTime",
                dataIndex: "businessTime"
            },
            {
                title: "费用类型",
                key: "feeType",
                dataIndex: "feeType",
                render: (text, record) => {
                    const type = record.feeType;

                    switch (type) {
                        case 5:
                            return <span>附加物流</span>
                        case 7:
                            return <span>附加维保</span>
                        case 8:
                            return <span>附加赔偿</span>
                        default:
                            return
                    }
                }
            },
            {
                title: '业务单号',
                key: 'businessSn',
                dataIndex: 'businessSn'
            },
            {
                title: '业务类型',
                render: record => {
                    const type = record.businessType;

                    switch (type) {
                        case 1:
                            return <span>进场单</span>
                        case 2:
                            return <span>退场单</span>
                        default:
                            return
                    }
                }
            },
            {
                title: "操作",
                render: record => {
                    return <Button type='link' onClick={() => {
                        const {sn, feeType} = record;
                        // feeType==5 物流附加费用
                        // feeType==7 维保附加费用
                        // feeType==8 赔偿附加费用
                        if (feeType === 5) {
                            this.props.history.push('/pages/appCenter/costAssistant/costAssistantHome/AddFees/AddFeesExpressDetail?sn=' + sn);
                        } else if (feeType === 7) {
                            this.props.history.push('/pages/appCenter/costAssistant/costAssistantHome/AddFees/AddFeesMaintenanceDetail?sn=' + sn);
                        } else {
                            this.props.history.push('/pages/appCenter/costAssistant/costAssistantHome/AddFees/AddFeesCompensationDetail?sn=' + sn);
                        }
                    }}>详情</Button>
                }
            },
        ]

        return (
            <Table
                columns={columns}
                dataSource={this.state.data}
                style={{marginTop: 20}}
                pagination={
                    {
                        total: this.state.total,
                        current: this.state.requestPar.current,
                        pageSize: this.state.requestPar.pageSize,
                        onChange: (current, b) => {
                            let obj = this.state.requestPar;
                            obj.current = current;

                            this.setState({
                                requestPar: obj
                            }, () => {
                                this.getList();
                            });
                        },
                        showTotal: (total, range) => `共有${total}条数据`
                    }
                }
            />
        )
    }

}

export default AddFeesList;