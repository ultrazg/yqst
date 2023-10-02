import React, {Component} from 'react';
import ViewCoat from "../../../PublicModule/ViewCoat/ViewCoat";
import {DeleteOutlined, LeftOutlined} from "@ant-design/icons";
import {Button, Descriptions, message, Modal} from "antd";
import {getPageQuery} from "../../../../../utils";
import CostAssistantModel from "../../CostAssistantModel";
import EnterDetailModal from "../Components/EntryDetailModal";
import ExitDetailModal from "../Components/ExitDetailModal";

class AddFeesExpressDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sn: '',
            data: {},
            status: '',
            expressBusinessInfo: {},
            EnterDetailModalVisi: false,
            ExitDetailModalVisi: false,
            isDelModalVisible: false,
        };
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
                expressBusinessInfo: res.data.expressBusinessInfo || {},
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
                        {title: "附加物流费用详情"},
                    ]}
                >
                    <Button style={{marginBottom: 20}} onClick={() => {
                        window.history.go(-1);
                    }}><LeftOutlined/>返回</Button>
                    {
                        this.state.data.showUpdateButton == 1
                            ? <>
                                <Button style={{marginLeft: 20, marginRight: 20}} onClick={() => {
                                    this.props.history.push('/pages/appCenter/costAssistant/costAssistantHome/AddFees/AddFeesExpressCreate?sn=' + this.state.sn);
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
                        // 进场单详情
                        this.state.EnterDetailModalVisi
                            ? <EnterDetailModal
                                leaseEntrySn={this.state.data.businessSn}
                                isShowBtn={false}
                                onClose={() => {
                                    this.setState({
                                        EnterDetailModalVisi: false
                                    });
                                }}
                            />
                            : null
                    }
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
                <Descriptions.Item label="运输日期">
                    {this.state.data.businessTime}
                </Descriptions.Item>
                <Descriptions.Item label="车牌号">
                    {this.state.expressBusinessInfo.licensePlateNumber}
                </Descriptions.Item>
                <Descriptions.Item label="公里数">
                    {this.state.expressBusinessInfo.mileage}
                </Descriptions.Item>
                <Descriptions.Item label="运输单位">
                    {this.state.expressBusinessInfo.carrierCompanyName}
                </Descriptions.Item>
                {/*<Descriptions.Item label="过磅总重量">*/}
                {/*    {this.state.data.projectName}*/}
                {/*</Descriptions.Item>*/}
                <Descriptions.Item label="运输单价(不含税)">
                    {this.state.expressBusinessInfo.unitPriceExcludingTax}
                </Descriptions.Item>
                <Descriptions.Item label="税率(%)">
                    {this.state.data.taxRate}
                </Descriptions.Item>
                <Descriptions.Item label="运输单价(含税)">
                    {this.state.expressBusinessInfo.unitPrice}
                </Descriptions.Item>
                <Descriptions.Item label="费用金额(不含税)">
                    {this.state.data.feeAmountExcludingTax}
                </Descriptions.Item>
                <Descriptions.Item label="费用金额(含税)">
                    {this.state.data.feeAmount}
                </Descriptions.Item>
                {/*<Descriptions.Item label="磅单">*/}
                {/*    {this.state.data.projectName}*/}
                {/*</Descriptions.Item>*/}
                <Descriptions.Item label="备注">
                    {this.state.data.remark}
                </Descriptions.Item>
                <Descriptions.Item label={this.state.data.businessType === 1 ? '进场单' : '退场单'}>
                    {this.state.data.businessSn}
                    <Button type='link' onClick={() => {
                        if (this.state.data.businessType === 1) {
                            this.setState({
                                EnterDetailModalVisi: true
                            });
                        } else {
                            this.setState({
                                ExitDetailModalVisi: true
                            });
                        }
                    }}>详情</Button>
                </Descriptions.Item>
            </Descriptions>
        </>
    );

}

export default AddFeesExpressDetail;