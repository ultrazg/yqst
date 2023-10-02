import React, {Component} from 'react';
import CostAssistantModel from "../../../CostAssistantModel";
import ViewCoat from "../../../../PublicModule/ViewCoat/ViewCoat";
import {Input, message, DatePicker, Descriptions, Button, Modal, InputNumber} from "antd";
import SelectLesseeModal from "../../Components/SelectLesseeModal";
import SelectProjectModal from "../../Components/SelectProjectModal";
import moment from "moment";

/**
 * 制租赁保底单
 */
class GuaranteeFeeCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmModal: false,
            SelectLesseeModalVisi: false,
            SelectProjectModalVisi: false,

            lesseeName: '',
            lesseeSn: '',
            projectName: '',
            projectSn: '',
            businessTime: '',
            taxRate: '',
            feeAmountExcludingTax: '',
            feeAmount: '',
            remark: ''
        };
    }

    render() {
        return (
            <ViewCoat
                breadCrumb={[
                    {title: "结算中心"},
                    {title: "制费用单"},
                    {title: "制租赁保底单"},
                ]}
            >
                {this.renderFormView()}
                {this.renderBtnView()}
                <Modal
                    title="提示"
                    visible={this.state.confirmModal}
                    onOk={() => {
                        this.onConfirm();
                    }}
                    onCancel={() => {
                        this.setState({
                            confirmModal: false
                        });
                    }}
                >
                    <p>确定租赁保底单？</p>
                </Modal>
                {
                    // 选择付款方modal
                    this.state.SelectLesseeModalVisi
                        ? <SelectLesseeModal
                            onSelect={data => {
                                const {lesseeName, lesseeSn} = data;

                                this.setState({
                                    lesseeName,
                                    lesseeSn,
                                    projectSn: '',
                                    projectName: '',
                                    SelectLesseeModalVisi: false
                                });
                            }}
                            onClose={() => {
                                this.setState({SelectLesseeModalVisi: false});
                            }}
                        />
                        : null
                }
                {
                    // 选择项目modal
                    this.state.SelectProjectModalVisi
                        ? <SelectProjectModal
                            onSelect={data => {
                                const {projectName, projectSn} = data;

                                this.setState({
                                    projectName,
                                    projectSn,
                                    SelectProjectModalVisi: false
                                });
                            }}
                            lesseeSn={this.state.lesseeSn}
                            onClose={() => {
                                this.setState({SelectProjectModalVisi: false});
                            }}
                        />
                        : null
                }
            </ViewCoat>
        );
    }

    onConfirm = () => {
        const {lesseeSn, projectSn, taxRate, feeAmountExcludingTax, feeAmount, remark, businessTime} = this.state;

        CostAssistantModel.FeeGuaranteePayeeSave({
            payerSn: lesseeSn,
            projectSn,
            taxRate,
            feeAmountExcludingTax,
            feeAmount,
            remark,
            businessTime
        }, res => {
            message.success('提交成功');

            this.props.history.push('/pages/appCenter/costAssistant/costAssistantHome/GuaranteeFeeList');
        });
    }

    limitDecimalsF = (value) => {
        let reg = /^(-)*(\d+)\.(\d\d\d\d).*$/;
        return value.replace(/\B(?=(\d{3})+(?!\d))/g, '').replace(reg, '$1$2.$3');
    };

    limitDecimalsP = (value) => {
        let reg = /^(-)*(\d+)\.(\d\d\d\d).*$/;
        return value.replace(/\s?|(,*)/g, '').replace(reg, '$1$2.$3');
    };

    renderFormView = () => {
        return (
            <>
                <p style={{fontSize: 'smaller'}}>
                    <span style={{color: 'red'}}>*</span><span> 为必填项</span>
                </p>
                <Descriptions title={null} bordered>
                    <Descriptions.Item label={<><span style={{color: 'red'}}>*</span><span>付款方</span></>}>
                        <Input
                            readOnly
                            placeholder='请选择付款方'
                            style={{cursor: 'pointer'}}
                            value={this.state.lesseeName ? this.state.lesseeName : ''}
                            title={this.state.lesseeName}
                            onClick={() => {
                                this.setState({
                                    SelectLesseeModalVisi: true
                                });
                            }}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label={<><span style={{color: 'red'}}>*</span><span>项目</span></>}>
                        <Input
                            readOnly
                            placeholder={!this.state.lesseeSn ? '请先选择付款方' : '请选择项目'}
                            disabled={!this.state.lesseeSn}
                            style={!this.state.lesseeSn ? {} : {cursor: 'pointer'}}
                            value={this.state.projectName ? this.state.projectName : ''}
                            title={this.state.projectName}
                            onClick={() => {
                                this.setState({
                                    SelectProjectModalVisi: true
                                });
                            }}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label={<><span style={{color: 'red'}}>*</span><span>税率</span></>}>
                        <InputNumber
                            min={0}
                            max={100}
                            controls={false}
                            value={this.state.taxRate}
                            formatter={this.limitDecimalsF}
                            parser={this.limitDecimalsP}
                            onChange={value => {
                                this.setState({
                                    taxRate: value
                                });
                            }}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label={<><span style={{color: 'red'}}>*</span><span>费用金额(不含税)</span></>}>
                        <InputNumber
                            min={0}
                            controls={false}
                            value={this.state.feeAmountExcludingTax}
                            formatter={this.limitDecimalsF}
                            parser={this.limitDecimalsP}
                            onChange={value => {
                                this.setState({
                                    feeAmountExcludingTax: value
                                });
                            }}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label={<><span style={{color: 'red'}}>*</span><span>费用金额(含税)</span></>}>
                        <InputNumber
                            min={0}
                            controls={false}
                            value={this.state.feeAmount}
                            formatter={this.limitDecimalsF}
                            parser={this.limitDecimalsP}
                            onChange={value => {
                                this.setState({
                                    feeAmount: value
                                });
                            }}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label={<><span style={{color: 'red'}}>*</span><span>费用日期</span></>}>
                        <DatePicker
                            value={this.state.businessTime ? moment(this.state.businessTime) : ''}
                            onChange={(date, dateString) => {
                                this.setState({
                                    businessTime: dateString
                                });
                            }}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="备注">
                        <Input
                            value={this.state.remark}
                            style={{width: 300}}
                            maxLength={50}
                            onChange={e => {
                                this.setState({
                                    remark: e.target.value
                                });
                            }}
                        />
                    </Descriptions.Item>
                </Descriptions>
            </>
        )
    }

    renderBtnView = () => {
        return (
            <div style={{marginTop: 20}}>
                <Button type='primary' style={{marginRight: 20}} onClick={() => {
                    const {lesseeSn, projectSn, taxRate, feeAmountExcludingTax, feeAmount, businessTime} = this.state;

                    if (!lesseeSn || !projectSn || !taxRate || !feeAmountExcludingTax || !feeAmount || !businessTime) {
                        return message.error('带 * 号为必填项目！');
                    }

                    this.setState({
                        confirmModal: true
                    });
                }}>确认</Button>
                <Button onClick={() => {
                    this.props.history.push('/pages/appCenter/costAssistant/costAssistantHome/GuaranteeFeeList');
                }}>取消</Button>
            </div>
        )
    }
}

export default GuaranteeFeeCreate;