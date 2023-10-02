import React, {Component} from 'react';
import {DatePicker, Button, Input, Select} from "antd";
import {PlusOutlined} from '@ant-design/icons';
import CostAssistantModel from "../../../CostAssistantModel";
import ViewCoat from "../../../../PublicModule/ViewCoat/ViewCoat";
import SWTable from 'SWViews/table';
import moment from "moment";

const {RangePicker} = DatePicker;
const {Option} = Select;

/**
 * 租赁保底单列表
 */
class GuaranteeFeeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            total: 0,
            requestPar: {
                current: 1,
                pageSize: 10,
                keyWord: '',
                status: 1, // 费用单状态 1.待转结 2.已转结
                projectSn: '',
                startTime: '',
                endTime: '',
                isManual: 1 // 是否手工制单 0.否 1.是
            }
        };
        this.columns = [
            {
                title: '费用单号',
                width: '15%',
                render: record => {
                    return <span>{record.feeBusinessSn}</span>
                }
            },
            {
                title: '付款方',
                render: record => {
                    return <span>{record.payerName}</span>
                }
            },
            {
                title: '收款方',
                render: record => {
                    return <span>{record.payeeName}</span>
                }
            },
            {
                title: '费用金额(含税)',
                width: '10%',
                render: record => {
                    return <span>￥{record.feeAmount}</span>
                }
            },
            {
                title: '费用类型',
                width: '10%',
                render: record => {
                    return <span>
                        {
                            record.feeType === 5
                                ? '租赁物流'
                                : record.feeType === 6
                                    ? '租赁保底'
                                    : null
                        }
                    </span>
                }
            },
            {
                title: '操作',
                render: record => {
                    return <Button type='link' onClick={() => {
                        this.props.history.push('/pages/appCenter/costAssistant/costAssistantHome/GuaranteeFeeDetail?sn=' + record.sn);
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
            <ViewCoat
                breadCrumb={[
                    {title: "结算中心"},
                    {title: "制费用单"},
                    {title: "租赁保底单"},
                ]}
            >
                {this.renderHeaderView()}
                {this.renderTableView()}
            </ViewCoat>
        );
    }

    renderHeaderView = () => {
        return (
            <>
                <label>关键词：</label>
                <Input
                    placeholder='请输入关键词'
                    maxLength={10}
                    style={{width: 120, marginRight: 20}}
                    value={this.state.requestPar.keyWord}
                    onChange={e => {
                        this.setState({
                            requestPar: {
                                ...this.state.requestPar,
                                keyWord: e.target.value
                            }
                        });
                    }}
                />
                <label>费用日期：</label>
                <RangePicker
                    style={{width: 200, marginRight: 20}}
                    format={'YYYY-MM-DD'}
                    value={[this.state.requestPar.startTime ? moment(this.state.requestPar.startTime) : '', this.state.requestPar.endTime ? moment(this.state.requestPar.endTime) : '']}
                    onChange={(dates, dateSings) => {
                        const startTime = dateSings[0];
                        const endTime = dateSings[1];

                        this.setState({
                            requestPar: {
                                ...this.state.requestPar,
                                startTime,
                                endTime
                            }
                        });
                    }}
                />
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
                    <Option value={1}>待转结</Option>
                    <Option value={2}>已转结</Option>
                </Select>
                <Button type='primary' style={{marginRight: 20}} onClick={() => {
                    this.getList();
                }}>搜索</Button>
                <Button style={{marginRight: 20}} onClick={() => {
                    this.setState({
                        requestPar: {
                            current: 1,
                            pageSize: 10,
                            keyWord: '',
                            status: 1,
                            projectSn: '',
                            startTime: '',
                            endTime: ''
                        }
                    }, () => {
                        this.getList();
                    });
                }}>重置</Button>
                <Button type='primary' onClick={() => {
                    this.props.history.push('/pages/appCenter/costAssistant/costAssistantHome/GuaranteeFeeCreate');
                }}><PlusOutlined/>添加租赁保底费用</Button>
            </>
        )
    }

    renderTableView = () => {
        return (
            <SWTable
                columns={this.columns}
                dataSource={this.state.data}
                style={{marginTop: 20}}
                pagination={
                    {
                        total: this.state.total,
                        current: this.state.requestPar.current,
                        pageSize: this.state.requestPar.pageSize,
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
        )
    }

    getList = () => {
        CostAssistantModel.FeeGuaranteePayeePage(this.state.requestPar, res => {
            this.setState({
                total: res.data.total || 0,
                data: res.data.records || []
            });
        });
    }
}

export default GuaranteeFeeList;