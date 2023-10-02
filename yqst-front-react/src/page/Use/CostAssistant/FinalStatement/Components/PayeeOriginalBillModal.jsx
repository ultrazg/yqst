import React, {Component} from 'react';
import {Modal, Tabs} from 'antd';
import SWTable from 'SWViews/table';
import moment from "moment";
import request from "../../../../../utils/request/request";
import Api from "../Create/Api";

const {TabPane} = Tabs;

/**
 * 查看本期业务单据modal
 */
class PayeeOriginalBillModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            total: 0,
            requestPar: {
                payerSn: this.props.payerSn || null,
                service: this.props.service || null,
                settlementStartTimeStr: this.props.settleBeginTime || null,
                settlementEndTimeStr: this.props.settleEndTime || null,
                projectSn: this.props.projectSn || null,
                current: 1,
                pageSize: 10,
                keyWord: '',
                type: 1,
            }
        };
        this.EnterColumns = [
            {
                title: "进场单号",
                key: "businessSn",
                dataIndex: "businessSn"
            },
            {
                title: "项目名称",
                key: "projectName",
                dataIndex: "projectName",
            },
            {
                title: "承租方",
                key: "lesseeName",
                dataIndex: "lesseeName"
            },
            {
                title: "出租方",
                key: "lessorName",
                dataIndex: "lessorName",
            },
            {
                title: '进场日期',
                key: "entryTime",
                dataIndex: "entryTime",
                render: text => {
                    return <span>{text ? moment(text).format('YYYY-MM-DD') : ''}</span>
                }
            }
        ];
        this.ExitColumns = [
            {
                title: "退场单号",
                key: "businessSn",
                dataIndex: "businessSn"
            },
            {
                title: "项目名称",
                key: "projectName",
                dataIndex: "projectName",
            },
            {
                title: "承租方",
                key: "lesseeName",
                dataIndex: "lesseeName"
            },
            {
                title: "出租方",
                key: "lessorName",
                dataIndex: "lessorName",
            },
            {
                title: '退场日期',
                key: "exitTime",
                dataIndex: "exitTime",
                render: text => {
                    return <span>{text ? moment(text).format('YYYY-MM-DD') : ''}</span>
                }
            }
        ];
        this.StopColumns = [
            {
                title: "停租单号",
                key: "businessSn",
                dataIndex: "businessSn"
            },
            {
                title: "项目名称",
                key: "projectName",
                dataIndex: "projectName",
            },
            {
                title: "承租方",
                key: "lesseeName",
                dataIndex: "lesseeName"
            },
            {
                title: "出租方",
                key: "lessorName",
                dataIndex: "lessorName",
            },
            {
                title: '停租周期',
                render: record => {
                    return <span>{record.startTime ? moment(record.startTime).format('YYYY-MM-DD') : ''} — {record.endTime ? moment(record.endTime).format('YYYY-MM-DD') : ''}</span>
                }
            }
        ]
    }

    componentDidMount() {
        this.getList();
    }

    render() {
        return (
            <Modal
                title="查看费用单"
                visible={true}
                footer={null}
                width={'70%'}
                style={{'top': 10}}
                onCancel={() => {
                    this.props.onClose && this.props.onClose()
                }}
            >
                <Tabs
                    onTabClick={key => this.setState({
                        requestPar: {
                            ...this.state.requestPar,
                            type: key
                        }
                    }, () => {
                        this.getList();
                    })}
                >
                    <TabPane tab='进场单' key='1'>
                        {this.renderTableView()}
                    </TabPane>
                    <TabPane tab='退场单' key='2'>
                        {this.renderTableView()}
                    </TabPane>
                    <TabPane tab='停租单' key='3'>
                        {this.renderTableView()}
                    </TabPane>
                </Tabs>
            </Modal>
        );
    }

    getList = () => {
        request(Api.payeeOriginalBillListPreview, this.state.requestPar, res => {
            this.setState({
                total: res.data.total || 0,
                data: res.data || []
            });
        })
    }

    renderTableView = () => {
        return (
            <SWTable
                columns={
                    this.state.requestPar.type == 1
                        ? this.EnterColumns
                        : this.state.requestPar.type == 2
                            ? this.ExitColumns
                            : this.state.requestPar.type == 3
                                ? this.StopColumns
                                : null
                }
                dataSource={this.state.data}
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
}

export default PayeeOriginalBillModal;
