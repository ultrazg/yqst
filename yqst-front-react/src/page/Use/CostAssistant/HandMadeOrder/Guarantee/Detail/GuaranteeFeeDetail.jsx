import React, {Component} from 'react';
import CostAssistantModel from "../../../CostAssistantModel";
import ViewCoat from "../../../../PublicModule/ViewCoat/ViewCoat";
import {getPageQuery} from "../../../../../../utils";
import {Input, message, DatePicker, Descriptions, Button, Modal, InputNumber} from "antd";
import {DeleteOutlined, LeftOutlined} from "@ant-design/icons";
import moment from "moment";
import SelectLesseeModal from "../../Components/SelectLesseeModal";
import SelectProjectModal from "../../Components/SelectProjectModal";

/**
 * 租赁保底费用详情
 */
class GuaranteeFeeDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lesseeName: '',
            newLesseeName: '',
            lesseeSn: '',
            newLesseeSn: '',
            projectName: '',
            newProjectName: '',
            projectSn: '',
            newProjectSn: '',
            feeType: '',
            feeBusinessSn: '',
            createTime: '',
            data: {},
            temData: {},
            status: '',
            sn: '',
            isEdit: false,
            delModalVisi: false,
            SelectLesseeModalVisi: false,
            SelectProjectModalVisi: false,
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

    render() {
        return (
            <ViewCoat
                breadCrumb={[
                    {title: "结算中心"},
                    {title: "制费用单"},
                    {title: "租赁保底费用详情"},
                ]}
            >
                <p>
                    <Button onClick={() => {
                        window.history.go(-1);
                    }}><LeftOutlined/>返回</Button>
                    {
                        this.state.status == 1
                            ? <>
                                <Button style={{marginLeft: 20, marginRight: 20}} onClick={() => {
                                    this.setState({
                                        isEdit: !this.state.isEdit
                                    });
                                }}>{this.state.isEdit ? '放弃修改' : '修改'}</Button>
                                <Button danger onClick={() => {
                                    this.setState({
                                        delModalVisi: true
                                    });
                                }}><DeleteOutlined/>删除</Button>
                            </>
                            : null
                    }
                </p>
                {
                    this.state.isEdit
                        ? this.renderEditFormView()
                        : this.renderFormView()
                }
                {
                    <Modal
                        title="提示"
                        visible={this.state.delModalVisi}
                        onOk={() => {
                            this.onDelete();
                        }}
                        onCancel={() => {
                            this.setState({
                                delModalVisi: false
                            });
                        }}
                    >
                        <p>请确定是否删除</p>
                    </Modal>
                }
                {
                    // 选择付款方modal
                    this.state.SelectLesseeModalVisi
                        ? <SelectLesseeModal
                            onSelect={data => {
                                const {lesseeName, lesseeSn} = data;

                                this.setState({
                                    newLesseeName: lesseeName,
                                    newLesseeSn: lesseeSn,
                                    newProjectSn: '',
                                    newProjectName: '',
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
                                    newProjectName: projectName,
                                    newProjectSn: projectSn,
                                    SelectProjectModalVisi: false
                                });
                            }}
                            lesseeSn={this.state.newLesseeSn}
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
        const {newLesseeSn, newProjectSn, sn, newBusinessTime} = this.state;
        const {taxRate, feeAmountExcludingTax, feeAmount, remark} = this.state.temData;

        CostAssistantModel.FeeGuaranteePayeeSave({
            sn,
            payerSn: newLesseeSn,
            projectSn: newProjectSn,
            taxRate,
            feeAmountExcludingTax,
            feeAmount,
            remark,
            businessTime: newBusinessTime
        }, res => {
            message.success('提交成功');

            this.props.history.push('/pages/appCenter/costAssistant/costAssistantHome/GuaranteeFeeList');
        });
    }

    onDelete = () => {
        const {sn} = this.state;

        CostAssistantModel.LeaseFeeDel({sn}, res => {
            message.success('处理成功');
        });

        this.props.history.push('/pages/appCenter/costAssistant/costAssistantHome/GuaranteeFeeList');
    }

    switchStatus = type => {
        switch (type) {
            case 5:
                return '租赁物流';
            case 6:
                return '租赁保底';
            default:
                return '';
        }
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
                <Descriptions title={null} bordered>
                    <Descriptions.Item label='费用单号'>
                        {this.state.feeBusinessSn}
                    </Descriptions.Item>
                    <Descriptions.Item label='费用类型'>
                        {this.switchStatus(this.state.feeType)}
                    </Descriptions.Item>
                    <Descriptions.Item label='制单时间'>
                        {this.state.createTime}
                    </Descriptions.Item>
                    <Descriptions.Item label='付款方'>
                        {this.state.lesseeName}
                    </Descriptions.Item>
                    <Descriptions.Item label='项目'>
                        {this.state.projectName}
                    </Descriptions.Item>
                    <Descriptions.Item label='税率'>
                        {this.state.data.taxRate}
                    </Descriptions.Item>
                    <Descriptions.Item label='费用金额(不含税)'>
                        {this.state.data.feeAmountExcludingTax}
                    </Descriptions.Item>
                    <Descriptions.Item label='费用金额(含税)'>
                        {this.state.data.feeAmount}
                    </Descriptions.Item>
                    <Descriptions.Item label='费用日期'>
                        {this.state.businessTime}
                    </Descriptions.Item>
                    <Descriptions.Item label="备注">
                        {this.state.data.remark}
                    </Descriptions.Item>
                </Descriptions>
            </>
        )
    }

    renderEditFormView = () => {
        return (
            <>
                <p style={{fontSize: 'smaller'}}>
                    <span style={{color: 'red'}}>*</span><span> 为必填项</span>
                </p>
                <Descriptions title={null} bordered>
                    <Descriptions.Item label='费用单号'>
                        {this.state.feeBusinessSn}
                    </Descriptions.Item>
                    <Descriptions.Item label='费用类型'>
                        {this.switchStatus(this.state.feeType)}
                    </Descriptions.Item>
                    <Descriptions.Item label='制单时间'>
                        {this.state.createTime}
                    </Descriptions.Item>
                    <Descriptions.Item label={<><span style={{color: 'red'}}>*</span><span>付款方</span></>}>
                        <Input
                            readOnly
                            placeholder='请选择付款方'
                            style={{cursor: 'pointer'}}
                            value={this.state.newLesseeName ? this.state.newLesseeName : ''}
                            title={this.state.newLesseeName}
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
                            placeholder={!this.state.newLesseeSn ? '请先选择付款方' : '请选择项目'}
                            disabled={!this.state.newLesseeSn}
                            style={!this.state.newLesseeSn ? {} : {cursor: 'pointer'}}
                            value={this.state.newProjectName ? this.state.newProjectName : ''}
                            title={this.state.newProjectName}
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
                            value={this.state.temData.taxRate}
                            formatter={this.limitDecimalsF}
                            parser={this.limitDecimalsP}
                            onChange={value => {
                                this.setState({
                                    temData: {
                                        ...this.state.temData,
                                        taxRate: value
                                    }
                                });
                            }}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label={<><span style={{color: 'red'}}>*</span><span>费用金额(不含税)</span></>}>
                        <InputNumber
                            min={0}
                            controls={false}
                            value={this.state.temData.feeAmountExcludingTax}
                            formatter={this.limitDecimalsF}
                            parser={this.limitDecimalsP}
                            onChange={value => {
                                this.setState({
                                    temData: {
                                        ...this.state.temData,
                                        feeAmountExcludingTax: value
                                    }
                                });
                            }}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label={<><span style={{color: 'red'}}>*</span><span>费用金额(含税)</span></>}>
                        <InputNumber
                            min={0}
                            controls={false}
                            value={this.state.temData.feeAmount}
                            formatter={this.limitDecimalsF}
                            parser={this.limitDecimalsP}
                            onChange={value => {
                                this.setState({
                                    temData: {
                                        ...this.state.temData,
                                        feeAmount: value
                                    }
                                });
                            }}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label={<><span style={{color: 'red'}}>*</span><span>费用日期</span></>}>
                        <DatePicker
                            value={this.state.newBusinessTime ? moment(this.state.newBusinessTime) : ''}
                            onChange={(date, dateString) => {
                                this.setState({
                                    newBusinessTime: dateString
                                });
                            }}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="备注">
                        <Input
                            value={this.state.temData.remark}
                            maxLength={50}
                            onChange={e => {
                                this.setState({
                                    temData: {
                                        ...this.state.temData,
                                        remark: e.target.value
                                    }
                                });
                            }}
                        />
                    </Descriptions.Item>
                </Descriptions>
                <Button style={{marginTop: 20}} type='primary' onClick={() => {
                    const {newLesseeSn, newProjectSn, newBusinessTime} = this.state;
                    const {taxRate, feeAmountExcludingTax, feeAmount} = this.state.temData;

                    if (!newLesseeSn || !newProjectSn || !taxRate || !feeAmountExcludingTax || !feeAmount || !newBusinessTime) {
                        return message.error('带 * 号为必填项目！');
                    }

                    this.onConfirm();
                }}>确认</Button>
            </>
        )
    }

    getList = () => {
        const {sn} = this.state;

        CostAssistantModel.LeaseFeeGet({sn}, res => {
            this.setState({
                data: res.data.guaranteeBusinessInfo || {},
                temData: res.data.guaranteeBusinessInfo || {},
                lesseeSn: res.data.payerSn || '',
                newLesseeSn: res.data.payerSn || '',
                lesseeName: res.data.payerName || '',
                newLesseeName: res.data.payerName || '',
                projectName: res.data.projectName || '',
                newProjectName: res.data.projectName || '',
                projectSn: res.data.projectSn || '',
                newProjectSn: res.data.projectSn || '',
                businessTime: res.data.businessTime || '',
                newBusinessTime: res.data.businessTime || '',
                feeBusinessSn: res.data.feeBusinessSn || '',
                feeType: res.data.feeType || '',
                createTime: res.data.createTime || '',
                status: res.data.status || ''
            });
        });
    }
}

export default GuaranteeFeeDetail;