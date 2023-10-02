import React, {Component} from 'react';
import {Input, Button, Select, DatePicker} from 'antd';
import CostAssistantModel from "../../../CostAssistantModel";
import moment from "moment";
import SWTable from "SWViews/table";

const {Option} = Select;
const {RangePicker} = DatePicker;

class FinalStatementPayerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            total: 0,
            requestPar: {
                current: 1,
                pageSize: 10,
                startTime: '',
                endTime: '',
                keyWord: '',
                status: 0, //["待确认", "已结算", "已拒绝"] 3 4 5
                service: this.props.service || ''
            }
        };
        this.columns = [
            {
                title: "结算单号",
                key: "settlementBillSn",
                width: '15%',
                dataIndex: "settlementBillSn"
            },
            {
                title: "项目名称",
                key: "projectName",
                dataIndex: "projectName"
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
                title: "结算周期",
                width: '15%',
                render: record => {
                    return <span>{record.settlementStartTime ? moment(record.settlementStartTime).format('YYYY-MM-DD') : ''}—{record.settlementEndTime ? moment(record.settlementEndTime).format('YYYY-MM-DD') : ''}</span>
                }
            },
            {
                title: '状态',
                key: 'status',
                dataIndex: 'status',
                width: '10%',
                render: text => {
                    return this.switchStatus(text);
                }
            },
            {
                title: '操作',
                render: record => {
                    return <Button type='link' onClick={() => {
                        this.props.history.push('/pages/appCenter/costAssistant/costAssistantHome/FinalStatementPayer/FinalStatementPayerDetail?sn=' + record.sn);
                    }}>详情</Button>
                }
            }
        ]
    }

    componentDidMount() {
        this.getList();
    }

    render() {
        return (
            <>
                {this.renderSearchHeaderView()}
                {this.renderTableView()}
            </>
        );
    }

    getList = () => {
        CostAssistantModel.FinalStatementPayerList(this.state.requestPar, res => {
            this.setState({
                data: res.data.records || [],
                total: res.data.total || 0
            })
        });
    }

    switchStatus = status => {
        //["待提交", "已删除", "待确认", "已结算", "已拒绝"]
        switch (status) {
            case 1:
                return '待收款方提交';
            case 2:
                return '收款方已删除';
            case 3:
                return '待付款方确认';
            case 4:
                return '已结算';
            case 5:
                return '付款方已拒绝';
            default:
                return '';
        }
    }

    renderSearchHeaderView = () => {
        return (
            <>
                <p>
                    <label>关键词：</label>
                    <Input
                        style={{width: 180, marginRight: 20}}
                        placeholder='请输入关键词'
                        maxLength={10}
                        value={this.state.requestPar.keyWord}
                        onChange={e => this.setState({requestPar: {...this.state.requestPar, keyWord: e.target.value}})}
                    />
                    {/*<label>业务类型：</label>*/}
                    {/*<Select*/}
                    {/*    defaultValue={this.state.requestPar.service}*/}
                    {/*    value={this.state.requestPar.service}*/}
                    {/*    style={{width: 100, marginRight: 20}}*/}
                    {/*    onChange={value => this.setState({*/}
                    {/*        requestPar: {*/}
                    {/*            ...this.state.requestPar,*/}
                    {/*            service: value*/}
                    {/*        }*/}
                    {/*    })}>*/}
                    {/*    >*/}
                    {/*    <Option value={1}>租赁服务</Option>*/}
                    {/*    <Option value={2}>赔偿服务</Option>*/}
                    {/*    <Option value={3}>运输服务</Option>*/}
                    {/*    <Option value={4}>维保服务</Option>*/}
                    {/*</Select>*/}
                    <label>状态：</label>
                    <Select
                        defaultValue={this.state.requestPar.status}
                        value={this.state.requestPar.status}
                        style={{width: 100, marginRight: 20}}
                        onChange={value => this.setState({
                            requestPar: {
                                ...this.state.requestPar,
                                status: value
                            }
                        })}>
                        >
                        <Option value={0}>全部</Option>
                        <Option value={3}>待确认</Option>
                        <Option value={4}>已结算</Option>
                        <Option value={5}>已拒绝</Option>
                    </Select>
                    {/*</p>*/}
                    {/*<p>*/}
                    <label>结算时间：</label>
                    <RangePicker
                        allowClear={false}
                        format={'YYYY-MM-DD'}
                        value={[this.state.requestPar.startTime ? moment(this.state.requestPar.startTime) : '', this.state.requestPar.endTime ? moment(this.state.requestPar.endTime) : '']}
                        onChange={date => {
                            const startTime = moment(date[0]).format('YYYY-MM-DD');
                            const endTime = moment(date[1]).format('YYYY-MM-DD');
                            this.setState({
                                requestPar: {
                                    ...this.state.requestPar,
                                    startTime,
                                    endTime
                                }
                            });
                        }}
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
                                startTime: '',
                                endTime: '',
                                keyWord: '',
                                status: 0,
                            }
                        }, () => {
                            this.getList();
                        });
                    }}>重置</Button>
                </p>
            </>
        )
    }

    renderTableView = () => {
        return (
            <SWTable
                columns={this.columns}
                dataSource={this.state.data}
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

export default FinalStatementPayerList;
