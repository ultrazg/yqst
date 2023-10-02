import React, {Component} from 'react';
import SWTable from "SWViews/table";
import CostAssistantModel from "../../CostAssistantModel";
import moment from "moment";
import {getPageQuery} from "../../../../../utils";
import {Button} from 'antd';

/**
 * 费用明细
 */
class CostFeeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sn: this.props.sn || '',
            listType: this.props.listType || '',
            data: [],
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
        this.otherColumns = [
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
            {
                title: '操作',
                render: record => {
                    return <Button
                        type='link'
                        onClick={() => {
                            const {feeType, feeBillSn} = record;
                            // feeType==5 物流附加费用
                            // feeType==7 维保附加费用
                            // feeType==8 赔偿附加费用
                            if (feeType === 5) {
                                this.props.history.push('/pages/appCenter/costAssistant/costAssistantHome/AddFees/AddFeesExpressDetail?sn=' + feeBillSn);
                            } else if (feeType === 7) {
                                this.props.history.push('/pages/appCenter/costAssistant/costAssistantHome/AddFees/AddFeesMaintenanceDetail?sn=' + feeBillSn);
                            } else {
                                this.props.history.push('/pages/appCenter/costAssistant/costAssistantHome/AddFees/AddFeesCompensationDetail?sn=' + feeBillSn);
                            }
                        }}
                    >详情</Button>
                }
            }
        ]
    }

    componentDidMount() {
        const {sn} = getPageQuery();

        this.setState({
            sn
        }, () => {
            this.getList();
        });
    }

    render() {
        return (
            <SWTable
                columns={this.state.listType == 1 ? this.columns : this.otherColumns}
                dataSource={this.state.data}
                pagination={null}
            />
        );
    }

    getList = () => {
        const {sn, listType} = this.state;

        CostAssistantModel.FeeList({sn, listType}, res => {
            this.setState({
                data: res.data || []
            });
        });
    }
}

export default CostFeeList;