import React, {Component} from 'react';
import ViewCoat from "../../../PublicModule/ViewCoat/ViewCoat";
import {Button, Tabs} from "antd";
import {LeftOutlined} from "@ant-design/icons";
import CostFeeList from "./CostFeeList";
import {getPageQuery} from "../../../../../utils";
import moment from "moment";
import SWTable from "SWViews/table";
import CostAssistantModel from "../../CostAssistantModel";

const {TabPane} = Tabs;

class CostFeeIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            service: '',
            active: '1',
            data: [],
            sn: '',
        };
        this.columns = [
            {
                title: "费用单号",
                key: "feeBillBusinessSn",
                dataIndex: "feeBillBusinessSn"
            },
            {
                title: "费用日期",
                key: "feeGenerateTime",
                dataIndex: "feeGenerateTime",
                render: text => {
                    return <span>{text ? moment(text).format('YYYY-MM-DD') : ''}</span>
                }
            },
            {
                title: "来源单据",
                key: "projectName",
                dataIndex: "projectName"
            },
            {
                title: "费用金额",
                key: "feeTotalAmount",
                dataIndex: "feeTotalAmount",
                render: text => {
                    return <span>￥{text}</span>
                }
            },
        ];
    }

    componentDidMount() {
        const {sn, service} = getPageQuery();

        this.setState({
            sn,
            service
        }, () => {
            this.getList();
        });
    }

    render() {
        return (
            <>
                <ViewCoat
                    breadCrumb={[
                        {title: "结算中心"},
                        {title: "结算单"},
                        {title: "结算单详情"},
                        {title: "费用明细"},
                    ]}
                >
                    <Button style={{marginBottom: 20}} onClick={() => {
                        window.history.go(-1);
                    }}><LeftOutlined/>返回</Button>
                    {
                        this.state.service == 1
                            ? <Tabs defaultActiveKey="1" onChange={key => {
                                this.setState({
                                    active: key
                                });
                            }}>
                                <TabPane tab="租金" key="1">
                                    {
                                        this.state.active == 1
                                            ? <CostFeeList history={this.props.history} sn={this.state.sn} listType={1}/>
                                            : null
                                    }
                                </TabPane>
                                <TabPane tab="其他" key="2">
                                    {
                                        this.state.active == 2
                                            ? <CostFeeList history={this.props.history} sn={this.state.sn} listType={2}/>
                                            : null
                                    }
                                </TabPane>
                            </Tabs>
                            : <SWTable
                                columns={this.columns}
                                dataSource={this.state.data}
                                pagination={null}
                            />
                    }
                </ViewCoat>
            </>
        );
    }

    getList = () => {
        const {sn} = this.state;

        CostAssistantModel.FeeList({sn, listType: 1}, res => {
            this.setState({
                data: res.data || []
            });
        });
    }

}

export default CostFeeIndex;