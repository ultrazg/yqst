import React, {Component} from 'react';
import {Button, Descriptions, message, Modal, Table, Tooltip} from "antd";
import {DeleteOutlined, LeftOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import ViewCoat from "../../../PublicModule/ViewCoat/ViewCoat";
import {getPageQuery} from "../../../../../utils";
import CostAssistantModel from "../../CostAssistantModel";
import ExitDetailModal from "../Components/ExitDetailModal";

class AddFeesMaintenanceDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sn: '',
            data: {},
            status: '',
            serviceItemList: [],
            ExitDetailModalVisi: false,
            isDelModalVisible: false,
        }
    }

    componentDidMount() {
        const {sn} = getPageQuery();

        this.setState({
            sn
        }, () => {
            this.getList();
        });
    }

    getList = () => {
        const {sn} = this.state;
        CostAssistantModel.LeaseFeeGet({sn}, res => {
            this.setState({
                data: res.data || {},
                serviceItemList: res.data.serviceItemList || [],
                status: res.data.status || ''
            });
        });
    }

    render() {
        return (
            <>
                <ViewCoat
                    breadCrumb={[
                        {title: "结算中心"},
                        {title: "附加费用"},
                        {title: "附加维保费用详情"},
                    ]}
                >
                    <Button style={{marginBottom: 20}} onClick={() => {
                        window.history.go(-1);
                    }}><LeftOutlined/>返回</Button>
                    {
                        this.state.data.showUpdateButton == 1
                            ? <>
                                <Button style={{marginLeft: 20, marginRight: 20}} onClick={() => {
                                    this.props.history.push('/pages/appCenter/costAssistant/costAssistantHome/AddFees/AddFeesMaintenanceCreate?sn=' + this.state.sn);
                                }}>修改</Button>
                                <Button danger onClick={() => {
                                    this.setState({
                                        isDelModalVisible: true
                                    });
                                }}><DeleteOutlined/>删除</Button>
                            </>
                            : null
                    }
                    {this.renderFormView()}
                    {this.renderDelModal()}
                    {
                        // 退场单详情
                        this.state.ExitDetailModalVisi
                            ? <ExitDetailModal
                                leaseExitSn={this.state.data.businessSn}
                                isShowBtn={false}
                                onClose={() => {
                                    this.setState({
                                        ExitDetailModalVisi: false
                                    });
                                }}
                            />
                            : null
                    }
                </ViewCoat>
            </>
        );
    }

    renderDelModal = () => (
        <Modal
            title="提示"
            visible={this.state.isDelModalVisible}
            onOk={() => {
                this.onDelete();
            }}
            onCancel={() => {
                this.setState({
                    isDelModalVisible: false
                });
            }}
        >
            <p>你确定要删除吗？</p>
        </Modal>
    );

    onDelete = () => {
        const {sn} = this.state;

        CostAssistantModel.LeaseFeeDel({sn}, res => {
            message.success('处理成功');

            this.props.history.push('/pages/appCenter/costAssistant/costAssistantHome/AddFees/AddFeesIndex');
        });
    };

    renderFormView = () => (
        <>
            <Descriptions title={null} bordered>
                <Descriptions.Item label="付款方">
                    {this.state.data.payerName}
                </Descriptions.Item>
                <Descriptions.Item label="收款方">
                    {this.state.data.payeeName}
                </Descriptions.Item>
                <Descriptions.Item label="项目">
                    {this.state.data.projectName}
                </Descriptions.Item>
                <Descriptions.Item label="维保日期">
                    {this.state.data.businessTime}
                </Descriptions.Item>
                <Descriptions.Item label="费用金额(不含税)">
                    {this.state.data.feeAmountExcludingTax}
                </Descriptions.Item>
                <Descriptions.Item label="费用金额(含税)">
                    {this.state.data.feeAmount}
                </Descriptions.Item>
                <Descriptions.Item label='退场单'>
                    {this.state.data.businessSn}
                    <Button type='link' onClick={() => {
                        this.setState({
                            ExitDetailModalVisi: true
                        });
                    }}>详情</Button>
                </Descriptions.Item>
                <Descriptions.Item label="备注">
                    {this.state.data.remark}
                </Descriptions.Item>
            </Descriptions>
            {this.renderTableView()}
        </>
    );

    renderTableView = () => {
        const columns = [
            {
                title: "维保物资",
                key: "goodsName",
                dataIndex: "goodsName"
            },
            {
                title: () => {
                    return <span>服务项<Tooltip
                        title="服务费用项指：维保服务费用项目，如单面喷漆费、双面喷漆费等"><QuestionCircleOutlined
                        style={{marginLeft: 5}}/></Tooltip></span>
                },
                key: "serviceItemName",
                dataIndex: "serviceItemName"
            },
            {
                title: "数量",
                key: "itemQuantity",
                dataIndex: "itemQuantity"
            },
            {
                title: "单位",
                key: "unit",
                dataIndex: "unit"
            },
            {
                title: "税率(%)",
                key: "taxRate",
                dataIndex: "taxRate",
                // render: text => <span>{text}%</span>
            },
            {
                title: "不含税维保价格(元)",
                key: "unitPriceExcludingTax",
                dataIndex: "unitPriceExcludingTax"
            },
            {
                title: "含税维保价格(元)",
                key: "unitPrice",
                dataIndex: "unitPrice"
            },
            {
                title: "不含税维保金额(元)",
                key: "excludingTaxAmount",
                dataIndex: "excludingTaxAmount"
            },
            {
                title: "含税维保金额(元)",
                key: "includingTaxAmount",
                dataIndex: "includingTaxAmount"
            },
            {
                title: "维保税额(元)",
                key: "taxAmount",
                dataIndex: "taxAmount"
            },
        ];

        return (
            <Table
                columns={columns}
                dataSource={this.state.serviceItemList}
                style={{marginTop: 20}}
                pagination={false}
            />
        );
    }
}

export default AddFeesMaintenanceDetail;