import React, {Component} from 'react';
import CostAssistantModel from "../../../CostAssistantModel";
import ViewCoat from "../../../../PublicModule/ViewCoat/ViewCoat";
import {Input, message, DatePicker, Descriptions, Button, Modal, InputNumber} from "antd";
import SelectLesseeModal from "../../Components/SelectLesseeModal";
import SelectProjectModal from "../../Components/SelectProjectModal";
import moment from "moment";

/**
 * 制租赁物流单
 */
class ExpressFeeCreate extends Component {
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
            mileage: '', // 公里数
            licensePlateNumber: '', // 车牌号
            goodsName: '', // 运输物资
            goodsQuantity: '', // 物资数量
            unitPriceExcludingTax: '', // 运输单价 不含税
            unitPrice: '', // 运输单价 含税
            taxRate: '', // 税率
            feeAmountExcludingTax: '', // 费用金额 不含税
            feeAmount: '', // 费用金额 含税
            remark: '', // 备注
        };
    }

    render() {
        return (
            <ViewCoat
                breadCrumb={[
                    {title: "结算中心"},
                    {title: "制费用单"},
                    {title: "制租赁物流单"},
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
                    <p>请再次核对费用单，将录为当期结算项。</p>
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

    limitDecimalsF = (value) => {
        let reg = /^(-)*(\d+)\.(\d\d\d\d).*$/;
        return value.replace(/\B(?=(\d{3})+(?!\d))/g, '').replace(reg, '$1$2.$3');
    };

    limitDecimalsP = (value) => {
        let reg = /^(-)*(\d+)\.(\d\d\d\d).*$/;
        return value.replace(/\s?|(,*)/g, '').replace(reg, '$1$2.$3');
    };

    onConfirm = () => {
        const {
            lesseeSn,// 必填
            projectSn,// 必填
            businessTime,// 必填
            mileage,
            licensePlateNumber,// 必填
            goodsName,
            goodsQuantity,
            unitPriceExcludingTax,
            unitPrice,
            taxRate,// 必填
            feeAmountExcludingTax,// 必填
            feeAmount,// 必填
            remark
        } = this.state;
        CostAssistantModel.FeeExpressPayeeSave({
            payerSn: lesseeSn,
            projectSn,
            businessTime,
            licensePlateNumber,
            mileage,
            goodsName,
            goodsQuantity,
            unitPriceExcludingTax,
            unitPrice,
            taxRate,
            feeAmountExcludingTax,
            feeAmount,
            remark
        }, res => {
            message.success('提交成功');

            this.props.history.push('/pages/appCenter/costAssistant/costAssistantHome/ExpressFeeList');
        });
    }

    renderBtnView = () => {
        return (
            <div style={{marginTop: 20}}>
                <Button type='primary' style={{marginRight: 20}} onClick={() => {
                    const {
                        lesseeSn,// 必填
                        projectSn,// 必填
                        businessTime,// 必填
                        licensePlateNumber,// 必填
                        taxRate,// 必填
                        feeAmountExcludingTax,// 必填
                        feeAmount,// 必填
                    } = this.state;
                    if (!lesseeSn || !projectSn || !businessTime || !licensePlateNumber || !taxRate || !feeAmountExcludingTax || !feeAmount) {
                        return message.error('带 * 号为必填项目！');
                    }
                    this.setState({
                        confirmModal: true
                    });
                }}>确认</Button>
                <Button onClick={() => {
                    this.props.history.push('/pages/appCenter/costAssistant/costAssistantHome/ExpressFeeList');
                }}>取消</Button>
            </div>
        )
    }

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
                    <Descriptions.Item label={<><span style={{color: 'red'}}>*</span><span>运输日期</span></>}>
                        <DatePicker
                            value={this.state.businessTime ? moment(this.state.businessTime) : ''}
                            onChange={(date, dateString) => {
                                this.setState({
                                    businessTime: dateString
                                });
                            }}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="公里数">
                        <InputNumber
                            min={0}
                            controls={false}
                            value={this.state.mileage}
                            formatter={this.limitDecimalsF}
                            parser={this.limitDecimalsP}
                            onChange={value => {
                                this.setState({
                                    mileage: value
                                });
                            }}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label={<><span style={{color: 'red'}}>*</span><span>车牌号</span></>}>
                        <Input
                            maxLength={10}
                            value={this.state.licensePlateNumber}
                            onChange={e => {
                                this.setState({
                                    licensePlateNumber: e.target.value
                                });
                            }}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="运输物资">
                        <Input
                            maxLength={20}
                            value={this.state.goodsName}
                            onChange={e => {
                                this.setState({
                                    goodsName: e.target.value
                                });
                            }}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="物资数量">
                        <InputNumber
                            min={0}
                            controls={false}
                            value={this.state.goodsQuantity}
                            formatter={this.limitDecimalsF}
                            parser={this.limitDecimalsP}
                            onChange={value => {
                                this.setState({
                                    goodsQuantity: value
                                });
                            }}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="运输单价(不含税)">
                        <InputNumber
                            min={0}
                            controls={false}
                            value={this.state.unitPriceExcludingTax}
                            formatter={this.limitDecimalsF}
                            parser={this.limitDecimalsP}
                            onChange={value => {
                                this.setState({
                                    unitPriceExcludingTax: value
                                });
                            }}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="运输单价(含税)">
                        <InputNumber
                            min={0}
                            controls={false}
                            value={this.state.unitPrice}
                            formatter={this.limitDecimalsF}
                            parser={this.limitDecimalsP}
                            onChange={value => {
                                this.setState({
                                    unitPrice: value
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
                    <Descriptions.Item label="备注">
                        <Input
                            value={this.state.remark}
                            style={{width: 450}}
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
}

export default ExpressFeeCreate;