import React, {Component} from 'react';
import {Button, Descriptions, message, Modal} from "antd";
import {DeleteOutlined, LeftOutlined} from "@ant-design/icons";
import ViewCoat from "../../../PublicModule/ViewCoat/ViewCoat";
import CostAssistantModel from "../../CostAssistantModel";
import {getPageQuery} from "../../../../../utils";

class AddFeesCompensationDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sn: '',
            status: '',
            isDelModalVisible: false,
            data: {},
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
                        {title: "附加赔偿费用详情"},
                    ]}
                >
                    <Button style={{marginBottom: 20}} onClick={() => {
                        window.history.go(-1);
                    }}><LeftOutlined/>返回</Button>
                    {
                        this.state.data.showUpdateButton == 1
                            ? <>
                                <Button style={{marginLeft: 20, marginRight: 20}} onClick={() => {
                                    this.props.history.push('/pages/appCenter/costAssistant/costAssistantHome/AddFees/AddFeesCompensationCreate?sn=' + this.state.sn);
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
                    {this.state.data.payerName ? this.state.data.payerName : ''}
                </Descriptions.Item>
                <Descriptions.Item label="收款方">
                    {this.state.data.payeeName ? this.state.data.payeeName : ''}
                </Descriptions.Item>
                <Descriptions.Item label="项目">
                    {this.state.data.projectName ? this.state.data.projectName : ''}
                </Descriptions.Item>
                <Descriptions.Item label="赔偿日期">
                    {this.state.data.businessTime ? this.state.data.businessTime : ''}
                </Descriptions.Item>
                <Descriptions.Item label="费用金额(不含税)">
                    {this.state.data.feeAmountExcludingTax ? this.state.data.feeAmountExcludingTax : ''}
                </Descriptions.Item>
                <Descriptions.Item label="税率(%)">
                    {this.state.data.taxRate ? this.state.data.taxRate : ''}
                </Descriptions.Item>
                <Descriptions.Item label="费用金额(含税)">
                    {this.state.data.feeAmount ? this.state.data.feeAmount : ''}
                </Descriptions.Item>
                <Descriptions.Item label="备注">
                    {this.state.data.remark ? this.state.data.remark : ''}
                </Descriptions.Item>
            </Descriptions>
        </>
    );
}

export default AddFeesCompensationDetail;