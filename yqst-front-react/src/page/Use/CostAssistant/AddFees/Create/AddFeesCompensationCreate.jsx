import React, {Component} from 'react';
import ViewCoat from "../../../PublicModule/ViewCoat/ViewCoat";
import {LeftOutlined} from "@ant-design/icons";
import {Button, DatePicker, Descriptions, Input, InputNumber, message} from "antd";
import SelectLesseeModal from "../Components/SelectLesseeModal";
import SelectProjectModal from "../Components/SelectProjectModal";
import CostAssistantModel from "../../CostAssistantModel";
import moment from "moment";
import {getPageQuery} from "../../../../../utils";

class AddFeesCompensationCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            electLesseeModalVisi: false,
            SelectProjectModalVisi: false,
            sn: '',
            requestPar: {
                lesseeSn: '',
                lesseeName: '',
                projectName: '',
                projectSn: '',	//项目编号
                taxRate: '',		//税率
                feeAmountExcludingTax: '',		//费用金额（不含税）
                feeAmount: '',		//费用金额（含税）
                remark: '',		//备注
                businessTime: ''
            }
        }
    }

    componentDidMount() {
        const {sn} = getPageQuery();

        this.setState({
            sn
        }, () => {
            this.state.sn && this.getDetailData();
        });
    }

    getDetailData = () => {
        const {sn} = this.state;

        CostAssistantModel.LeaseFeeGet({sn}, res => {
            this.setState({
                requestPar: {
                    lesseeSn: res.data.payerSn || '',
                    lesseeName: res.data.payerName || '',
                    projectName: res.data.projectName || '',
                    projectSn: res.data.projectSn || '',
                    taxRate: res.data.taxRate || '',
                    feeAmountExcludingTax: res.data.feeAmountExcludingTax || '',
                    feeAmount: res.data.feeAmount || '',
                    remark: res.data.remark || '',
                    businessTime: res.data.businessTime || '',
                }
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
                        {title: this.state.sn ? '修改附加赔偿费用' : "发起附加赔偿费用"},
                    ]}
                >
                    <Button style={{marginBottom: 20}} onClick={() => {
                        window.history.go(-1);
                    }}><LeftOutlined/>{this.state.sn ? '放弃修改' : '返回'}</Button>
                    {this.renderFormView()}
                    {
                        // 选择付款方modal
                        this.state.SelectLesseeModalVisi
                            ? <SelectLesseeModal
                                onSelect={data => {
                                    const {lesseeName, lesseeSn} = data;

                                    this.setState({
                                        requestPar: {
                                            ...this.state.requestPar,
                                            lesseeName,
                                            lesseeSn,
                                            projectSn: '',
                                            projectName: '',
                                        },
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
                                        requestPar: {
                                            ...this.state.requestPar,
                                            projectName,
                                            projectSn,
                                        },
                                        SelectProjectModalVisi: false
                                    });
                                }}
                                lesseeSn={this.state.requestPar.lesseeSn}
                                onClose={() => {
                                    this.setState({SelectProjectModalVisi: false});
                                }}
                            />
                            : null
                    }
                </ViewCoat>
            </>
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

    renderFormView = () => (
        <>
            <Descriptions title={null} bordered>
                <Descriptions.Item label={<><span style={{color: 'red'}}>*</span>选择付款方</>}>
                    <Input
                        readOnly
                        style={{cursor: 'pointer'}}
                        placeholder='请选择付款方'
                        value={this.state.requestPar.lesseeName ? this.state.requestPar.lesseeName : ''}
                        title={this.state.requestPar.lesseeName}
                        onClick={() => {
                            this.setState({
                                SelectLesseeModalVisi: true
                            });
                        }}
                    />
                </Descriptions.Item>
                <Descriptions.Item label={<><span style={{color: 'red'}}>*</span>选择项目</>}>
                    <Input
                        readOnly
                        style={!this.state.requestPar.lesseeSn ? {} : {cursor: 'pointer'}}
                        placeholder={!this.state.requestPar.lesseeSn ? '请先选择付款方' : '请选择项目'}
                        disabled={!this.state.requestPar.lesseeSn}
                        value={this.state.requestPar.projectName ? this.state.requestPar.projectName : ''}
                        title={this.state.requestPar.projectName}
                        onClick={() => {
                            this.setState({
                                SelectProjectModalVisi: true
                            });
                        }}
                    />
                </Descriptions.Item>
                <Descriptions.Item label={<><span style={{color: 'red'}}>*</span>赔偿日期</>}>
                    <DatePicker
                        value={this.state.requestPar.businessTime ? moment(this.state.requestPar.businessTime) : ''}
                        onChange={(date, dateString) => {
                            this.setState({
                                requestPar: {
                                    ...this.state.requestPar,
                                    businessTime: dateString
                                }
                            });
                        }}
                    />
                </Descriptions.Item>
                <Descriptions.Item label={<><span style={{color: 'red'}}>*</span>费用金额(不含税)</>}>
                    <InputNumber
                        min={0}
                        max={9999999}
                        controls={false}
                        value={this.state.requestPar.feeAmountExcludingTax}
                        formatter={this.limitDecimalsF}
                        parser={this.limitDecimalsP}
                        onChange={value => {
                            this.setState({
                                requestPar: {
                                    ...this.state.requestPar,
                                    feeAmountExcludingTax: value
                                }
                            });
                        }}
                    />
                </Descriptions.Item>
                <Descriptions.Item label={<><span style={{color: 'red'}}>*</span>税率(%)</>}>
                    <InputNumber
                        min={0}
                        max={100}
                        controls={false}
                        value={this.state.requestPar.taxRate}
                        formatter={this.limitDecimalsF}
                        parser={this.limitDecimalsP}
                        onChange={value => {
                            this.setState({
                                requestPar: {
                                    ...this.state.requestPar,
                                    taxRate: value
                                }
                            });
                        }}
                    />
                </Descriptions.Item>
                <Descriptions.Item label={<><span style={{color: 'red'}}>*</span>费用金额(含税)</>}>
                    <InputNumber
                        min={0}
                        max={9999999}
                        controls={false}
                        value={this.state.requestPar.feeAmount}
                        formatter={this.limitDecimalsF}
                        parser={this.limitDecimalsP}
                        onChange={value => {
                            this.setState({
                                requestPar: {
                                    ...this.state.requestPar,
                                    feeAmount: value
                                }
                            });
                        }}
                    />
                </Descriptions.Item>
                <Descriptions.Item label="备注">
                    <Input
                        maxLength={50}
                        style={{width: 300}}
                        value={this.state.requestPar.remark}
                        onChange={e => {
                            this.setState({
                                requestPar: {
                                    ...this.state.requestPar,
                                    remark: e.target.value
                                }
                            });
                        }}
                    />
                </Descriptions.Item>
            </Descriptions>
            <Button
                type='primary'
                style={{marginTop: 20, marginRight: 20}}
                onClick={() => {
                    this.onConfirm();
                }}
            >
                确认
            </Button>
            <Button onClick={() => {
                this.onReset();
            }}>重置</Button>
        </>
    );

    onConfirm = () => {
        const {requestPar, sn} = this.state;
        const verifyText = ['lesseeSn', 'projectSn', 'taxRate', 'feeAmountExcludingTax', 'feeAmount', 'businessTime'];

        for (const requestParKey in requestPar) {
            if (verifyText.indexOf(requestParKey) > -1 && requestPar[requestParKey] === '') {
                return message.error('带*号为必填项！');
            }
        }

        if (sn) {
            CostAssistantModel.FeeCompensationPayeeSave({
                sn,
                payerSn: requestPar.lesseeSn,
                projectSn: requestPar.projectSn,
                taxRate: requestPar.taxRate,
                feeAmountExcludingTax: requestPar.feeAmountExcludingTax,
                feeAmount: requestPar.feeAmount,
                remark: requestPar.remark,
                businessTime: requestPar.businessTime
            }, () => {
                message.success('处理成功!');

                this.props.history.push('/pages/appCenter/costAssistant/costAssistantHome/AddFees/AddFeesIndex');
            });
        } else {
            CostAssistantModel.FeeCompensationPayeeSave({
                payerSn: requestPar.lesseeSn,
                projectSn: requestPar.projectSn,
                taxRate: requestPar.taxRate,
                feeAmountExcludingTax: requestPar.feeAmountExcludingTax,
                feeAmount: requestPar.feeAmount,
                remark: requestPar.remark,
                businessTime: requestPar.businessTime
            }, () => {
                message.success('处理成功!');

                this.props.history.push('/pages/appCenter/costAssistant/costAssistantHome/AddFees/AddFeesIndex');
            });
        }
    }

    onReset = () => {
        this.setState({
            requestPar: {
                lesseeSn: '',
                lesseeName: '',
                projectName: '',
                projectSn: '',	//项目编号
                taxRate: '',		//税率
                feeAmountExcludingTax: '',		//费用金额（不含税）
                feeAmount: '',		//费用金额（含税）
                remark: '',		//备注
                businessTime: ''
            }
        });
    }

}

export default AddFeesCompensationCreate;