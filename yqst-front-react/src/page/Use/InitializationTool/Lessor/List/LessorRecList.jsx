import React, {Component} from 'react';
import {Button, Input, Select, DatePicker} from "antd";
import SWTable from "SWViews/table";
import Model from "../../Model";
import moment from "moment";
import {PlusOutlined} from "@ant-design/icons";

const {Option} = Select;
const {RangePicker} = DatePicker;

/*
出租方我收到的
 */
class ReceiveTab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            total: 0,
            requestPar: {
                keyWord: '',
                startTime: '',
                endTime: '',
                pageSize: 10,
                current: 1,
                status: 0,
                listType: 2
            }
        }
        this.columns = [
            {
                title: "初始化编号",
                key: "initBusinessSn",
                dataIndex: "initBusinessSn"
            },
            {
                title: "对账客户",
                key: "lesseeName",
                dataIndex: "lesseeName"
            },
            {
                title: "企业号",
                key: "lesseeAccountSn",
                width: '10%',
                dataIndex: "lesseeAccountSn"
            },
            {
                title: "对账项目",
                key: "projectName",
                width: '15%',
                dataIndex: "projectName"
            },
            {
                title: '项目名称备注',
                width: '15%',
                key: "projectNameRemark",
                dataIndex: "projectNameRemark"
            },
            {
                title: "状态",
                key: "status",
                width: '10%',
                dataIndex: "status",
                render: (res, record) => {
                    // 状态 1.待提交 2.待确认 3.已确认 4.已驳回
                    return record.status === 1
                        ? '待提交'
                        : record.status === 2
                            ? '待确认'
                            : record.status === 3
                                ? '已确认'
                                : record.status === 4
                                    ? '已驳回'
                                    : null
                }
            },
            {
                title: "操作",
                key: "Op",
                dataIndex: "Op",
                render: (res, record) => {
                    return <Button
                        type="link"
                        onClick={() => {
                            this.props.history.push('/pages/appCenter/InitializationTool/MaterialRecListModule/LessorRecDetail?sn=' + record.sn);
                        }}
                    >详情</Button>
                }
            },
        ];
    }

    componentDidMount() {
        this.getList();
    }

    getList = () => {
        Model.LessorInitPage(this.state.requestPar, res => {
            this.setState({
                data: res.data.records || [],
                total: res.data.total || 0
            })
        });
    }

    render() {
        return (
            <>
                <div style={{marginBottom: "24px"}}>
                    <p>
                        <label>关键词：</label>
                        <Input
                            placeholder="请输入关键词"
                            style={{
                                width: 280,
                                marginRight: 20
                            }}
                            onChange={e => this.setState({
                                requestPar: {
                                    ...this.state.requestPar,
                                    keyWord: e.target.value
                                }
                            })}
                            value={this.state.requestPar.keyWord}
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
                            <Option value={0}>全部</Option>
                            {/*<Option value={1}>待提交</Option>*/}
                            <Option value={2}>待确认</Option>
                            <Option value={3}>已确认</Option>
                            <Option value={4}>已驳回</Option>
                        </Select>
                        <label>时间：</label>
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
                        <Button type="primary" style={{marginLeft: 20, marginRight: 20}} onClick={() => {
                            this.setState({
                                requestPar: {
                                    ...this.state.requestPar,
                                    current: 1
                                }
                            }, () => {
                                this.getList();
                            });
                        }}>搜索</Button>
                        <Button onClick={() => {
                            this.setState({
                                requestPar: {
                                    startTime: '',
                                    endTime: '',
                                    pageSize: 10,
                                    current: 1,
                                    status: 0,
                                    keyWord: '',
                                    listType: 2
                                }
                            }, () => {
                                this.getList();
                            });
                        }}>重置</Button>
                    </p>
                </div>
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
            </>
        );
    }
}

export default ReceiveTab;
