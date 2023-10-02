import React, {Component} from 'react';
import {Modal, Tabs} from 'antd';
import SWTable from 'SWViews/table';
import moment from "moment";
import Api from "../Create/Api";
import request from "../../../../../utils/request/request";

const {TabPane} = Tabs;
const columns = [
    {
        title: '费用单号',
        render: record => {
            return <span>{record.feeBillBusinessSn}</span>
        }
    },
    {
        title: '费用日期',
        render: record => {
            return <span>{record.feeGenerateTime ? moment(record.feeGenerateTime).format('YYYY-MM-DD') : ''}</span>
        }
    },
    {
        title: '单据来源',
        render: record => {
            return <span>{record.projectName}</span>
        }
    },
    {
        title: '费用金额',
        render: record => {
            return <span>￥{record.feeTotalAmount}</span>
        }
    }
]

/**
 * 查看费用单modal
 */
class FeePayeeListModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            total: 0,
            active: '1',
            requestPar: {
                payeeSn: this.props.payeeSn || null,
                service: this.props.service || null,
                settlementStartTimeStr: this.props.settleBeginTime || null,
                settlementEndTimeStr: this.props.settleEndTime || null,
                projectSn: this.props.projectSn || null,
                current: 1,
                pageSize: 10,
                keyWord: '',
            }
        };
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
                width={'50%'}
                onCancel={() => {
                    this.props.onClose && this.props.onClose()
                }}
            >
                {
                    this.state.requestPar.service == 1
                        ? this.renderTabPaneView()
                        : <SWTable
                            columns={columns}
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
                }
            </Modal>
        );
    }

    getList = () => {
        request(Api.payeeFeeList,{...this.state.requestPar, listType: 1}, res => {
            this.setState({
                total: res.data.total || 0,
                data: res.data.records || []
            });
        })
    }

    renderTabPaneView = () => {
        return (
            <Tabs defaultActiveKey="1" onChange={key => {
                this.setState({
                    active: key
                });
            }}>
                <TabPane tab="租金" key="1">
                    {
                        this.state.active == 1
                            ? <List listType={1} requestPar={this.state.requestPar}/>
                            : null
                    }
                </TabPane>
                <TabPane tab="其他" key="2">
                    {
                        this.state.active == 2
                            ? <List listType={2} requestPar={this.state.requestPar}/>
                            : null
                    }
                </TabPane>
            </Tabs>
        )
    }

}

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listType: this.props.listType || null,
            requestPar: this.props.requestPar || {},
            data: [],
            total: 0,
        }
    }

    componentDidMount() {
        this.getList();
    }

    render() {
        return (
            <SWTable
                columns={columns}
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

    getList = () => {
        const {requestPar, listType} = this.state;

        request(Api.payeeFeeList,{...requestPar, listType}, res => {
            this.setState({
                total: res.data.total || 0,
                data: res.data.records || []
            });
        })
    }

}

export default FeePayeeListModal;
