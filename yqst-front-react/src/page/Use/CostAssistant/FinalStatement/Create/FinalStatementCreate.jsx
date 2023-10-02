import React, {Component} from 'react';
import {Button, Input, DatePicker, message, Popconfirm} from 'antd';
import CostAssistantModel from "../../CostAssistantModel";
import {ArrowRightOutlined, LeftOutlined} from "@ant-design/icons";
import ViewCoat from "../../../PublicModule/ViewCoat/ViewCoat";
import GetSettlementServiceTypeModal from "../Components/GetSettlementServiceTypeModal";
import SelectCompanyModal from "../Components/SelectCompanyModal";
import SelectProjectUserModal from "../Components/SelectProjectUserModal";
import FeeListModal from "../Components/FeeListModal";
import InitiateDetailModal from "../Components/InitiateDetailModal";
import OriginalBillModal from "../Components/OriginalBillModal";
import moment from "moment";
import CostAsstSignFilePreviewModal from "../Components/CostAsstSignFilePreviewModal";

/**
 * 发起结算-出租
 */
class FinalStatementCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            GetSettlementServiceTypeModalVisi: false,
            SelectCompanyModalVisi: false,
            SelectProjectUserModalVisi: false,
            FeeListModalVisi: false,
            InitiateDetailModalVisi: false,
            OriginalBillModalVisi: false,
            service: '',
            serviceName: '',
            payerName: '',
            payerSn: '',
            projectSn: '',
            projectName: '',
            settleBeginTime: '',
            settleEndTime: '',
            totalAmount: '',
            requestPar: {
                service: 0
            }
        };
    }

    componentDidMount() {

    }

    render() {
        return (
            <>
                <ViewCoat
                    breadCrumb={[
                        {title: "结算中心"},
                        {title: "结算单"},
                        {title: "出租-发起结算"},
                    ]}
                >
                    {this.renderFormView()}
                    {
                        // 业务类型modal
                        this.state.GetSettlementServiceTypeModalVisi
                            ? <GetSettlementServiceTypeModal
                                onSelect={data => {
                                    const {serviceName, service} = data;

                                    this.setState({
                                        serviceName,
                                        service,
                                        payerName: '',
                                        payerSn: '',
                                        projectSn: '',
                                        projectName: '',
                                        settleBeginTime: '',
                                        settleEndTime: '',
                                        GetSettlementServiceTypeModalVisi: false
                                    });
                                }}
                                onClose={() => {
                                    this.setState({GetSettlementServiceTypeModalVisi: false});
                                }}
                            />
                            : null
                    }
                    {
                        // 选择客户modal
                        this.state.SelectCompanyModalVisi
                            ? <SelectCompanyModal
                                onSelect={data => {
                                    const {payerName, payerSn} = data;

                                    this.setState({
                                        payerName,
                                        payerSn,
                                        projectSn: '',
                                        projectName: '',
                                        settleBeginTime: '',
                                        settleEndTime: '',
                                        SelectCompanyModalVisi: false
                                    });
                                }}
                                service={this.state.service}
                                onClose={() => {
                                    this.setState({SelectCompanyModalVisi: false});
                                }}
                            />
                            : null
                    }
                    {
                        // 选择项目modal
                        this.state.SelectProjectUserModalVisi
                            ? <SelectProjectUserModal
                                onSelect={data => {
                                    const {service} = this.state;
                                    const {projectSn, projectName} = data;
                                    const settleBeginTime = data.settleBeginTime ? moment(data.settleBeginTime).format('YYYY-MM-DD') : '';
                                    const settleEndTime = data.settleEndTime ? moment(data.settleEndTime).format('YYYY-MM-DD') : '';

                                    this.setState({
                                        SelectProjectUserModalVisi: false,
                                        projectSn,
                                        projectName,
                                        settleBeginTime,
                                        settleEndTime
                                    }, () => {
                                        if (service == 1) {
                                            const {
                                                payerSn,
                                                projectSn,
                                                service,
                                                settleBeginTime,
                                                settleEndTime
                                            } = this.state;
                                            this.getTotalAmount({
                                                payerSn,
                                                projectSn,
                                                service,
                                                settlementEndTimeStr: settleEndTime,
                                                settlementStartTimeStr: settleBeginTime
                                            });
                                        }
                                    });
                                }}
                                service={this.state.service}
                                payerSn={this.state.payerSn}
                                onClose={() => {
                                    this.setState({SelectProjectUserModalVisi: false});
                                }}
                            />
                            : null
                    }
                    {
                        // 查看费用单modal
                        this.state.FeeListModalVisi
                            ? <FeeListModal
                                payerSn={this.state.payerSn}
                                service={this.state.service}
                                settleBeginTime={this.state.settleBeginTime}
                                settleEndTime={this.state.settleEndTime}
                                projectSn={this.state.projectSn}
                                onClose={() => {
                                    this.setState({FeeListModalVisi: false});
                                }}
                            />
                            : null
                    }
                    {
                        // 查看结算清单modal
                        this.state.InitiateDetailModalVisi
                            ? <InitiateDetailModal
                                payerSn={this.state.payerSn}
                                service={this.state.service}
                                settleBeginTime={this.state.settleBeginTime}
                                settleEndTime={this.state.settleEndTime}
                                projectSn={this.state.projectSn}
                                onClose={() => {
                                    this.setState({InitiateDetailModalVisi: false});
                                }}
                            />
                            : null
                    }
                    {
                        // 查看本期业务单据modal
                        this.state.OriginalBillModalVisi
                            ? <OriginalBillModal
                                payerSn={this.state.payerSn}
                                service={this.state.service}
                                settleBeginTime={this.state.settleBeginTime}
                                settleEndTime={this.state.settleEndTime}
                                projectSn={this.state.projectSn}
                                onClose={() => {
                                    this.setState({OriginalBillModalVisi: false});
                                }}
                            />
                            : null
                    }
                    {
                        this.state.isCostAsstSignFilePreviewModalVisi ? <CostAsstSignFilePreviewModal
                            data={{
                                payerSn: this.state.payerSn,
                                service: this.state.service,
                                settlementStartTime: this.state.settleBeginTime,
                                settlementEndTime: this.state.settleEndTime,
                                projectSn: this.state.projectSn,
                            }}
                            callback={() => {
                                this.onSubmit(2);
                            }}
                            onClose={() => {
                                this.setState({isCostAsstSignFilePreviewModalVisi: false});
                            }}/> : null
                    }
                </ViewCoat>
            </>
        );
    }

    renderFormView = () => {
        return (
            <>
                <Button style={{marginBottom: 20}} onClick={() => {
                    window.history.go(-1);
                }}><LeftOutlined/>返回</Button>
                <p style={{display: 'flex'}}>
                    <label style={{width: 100}}>业务类型：</label>
                    <span style={{marginLeft: 50}}>
                        <Input
                            readOnly
                            placeholder='请选择'
                            value={this.state.serviceName ? this.state.serviceName : ''}
                            title={this.state.serviceName}
                            style={{cursor: 'pointer'}}
                            onClick={() => {
                                this.setState({
                                    GetSettlementServiceTypeModalVisi: true
                                });
                            }}
                        />
                    </span>
                </p>
                <p style={{display: 'flex'}}>
                    <label style={{width: 100}}>选择付款方：</label>
                    <span style={{marginLeft: 50}}>
                        <Input
                            readOnly
                            placeholder='请选择'
                            style={{cursor: 'pointer'}}
                            value={this.state.payerName ? this.state.payerName : ''}
                            title={this.state.payerName}
                            onClick={() => {
                                const {service} = this.state;
                                if (!service) {
                                    return message.error('请先选择业务类型');
                                }
                                this.setState({
                                    SelectCompanyModalVisi: true
                                });
                            }}
                        />
                    </span>
                </p>
                <p style={{display: 'flex'}}>
                    <label style={{width: 100}}>项目：</label>
                    <span style={{marginLeft: 50}}>
                        <Input
                            readOnly
                            placeholder='请选择'
                            style={{cursor: 'pointer'}}
                            value={this.state.projectName ? this.state.projectName : ''}
                            title={this.state.projectName}
                            onClick={() => {
                                const {payerSn} = this.state;
                                if (!payerSn) {
                                    return message.error('请先选择付款方');
                                }
                                this.setState({
                                    SelectProjectUserModalVisi: true
                                });
                            }}
                        />
                    </span>
                </p>
                <p style={{display: 'flex'}}>
                    <label style={{width: 100}}>起始日期：</label>
                    <span style={{marginLeft: 50}}>
                        {
                            this.state.settleBeginTime
                                ? this.state.settleBeginTime
                                : '-'
                        }
                    </span>
                </p>
                {
                    this.state.service == 1
                        ? <p style={{display: 'flex'}}>
                            <label style={{width: 100}}>终止日期：</label>
                            <span style={{marginLeft: 50}}>
                                {this.state.settleEndTime ? moment(this.state.settleEndTime).format('YYYY-MM-DD') : ''}
                            </span>
                        </p>
                        : <p style={{display: 'flex'}}>
                            <label style={{width: 100}}>终止日期：</label>
                            <span style={{marginLeft: 50}}>
                        <DatePicker
                            style={{width: 169}}
                            disabled={!this.state.projectSn}
                            value={this.state.settleEndTime ? moment(this.state.settleEndTime) : ''}
                            onClick={() => {
                                const {projectSn} = this.state;
                                if (!projectSn) {
                                    return message.error('请先选择项目');
                                }
                            }}
                            onChange={(date, dateString) => {
                                this.setState({
                                    settleEndTime: dateString
                                }, () => {
                                    const {payerSn, projectSn, service, settleBeginTime, settleEndTime} = this.state;

                                    this.getTotalAmount({
                                        payerSn,
                                        projectSn,
                                        service,
                                        settlementEndTimeStr: settleEndTime,
                                        settlementStartTimeStr: settleBeginTime
                                    });
                                });
                            }}/>
                    </span>
                        </p>
                }
                <p style={{display: 'flex'}}>
                    <label style={{width: 100}}>费用单：</label>
                    <span style={{cursor: 'pointer', color: 'royalblue', marginLeft: 50}} onClick={() => {
                        const {service, payerSn, projectSn, settleEndTime} = this.state;
                        if (!service) {
                            return message.error('请选择业务类型');
                        }
                        if (!payerSn) {
                            return message.error('请选择付款方');
                        }
                        if (!projectSn) {
                            return message.error('请选择项目');
                        }
                        if (!(service == 1) && !settleEndTime) {
                            return message.error('请选择终止日期');
                        }
                        this.setState({
                            FeeListModalVisi: true
                        });
                    }}>
                        查看<ArrowRightOutlined rotate={-45}/>
                    </span>
                </p>
                <p style={{display: 'flex'}}>
                    <label style={{width: 100}}>结算清单：</label>
                    <span style={{cursor: 'pointer', color: 'royalblue', marginLeft: 50}} onClick={() => {
                        const {service, payerSn, projectSn, settleEndTime} = this.state;
                        if (!service) {
                            return message.error('请选择业务类型');
                        }
                        if (!payerSn) {
                            return message.error('请选择付款方');
                        }
                        if (!projectSn) {
                            return message.error('请选择项目');
                        }
                        if (!(service == 1) && !settleEndTime) {
                            return message.error('请选择终止日期');
                        }
                        this.setState({
                            InitiateDetailModalVisi: true
                        });
                    }}>
                        查看<ArrowRightOutlined rotate={-45}/>
                    </span>
                </p>
                <p style={{display: 'flex'}}>
                    <label style={{width: 100}}>本期业务单据：</label>
                    <span style={{cursor: 'pointer', color: 'royalblue', marginLeft: 50}} onClick={() => {
                        const {service, payerSn, projectSn, settleEndTime} = this.state;
                        if (!service) {
                            return message.error('请选择业务类型');
                        }
                        if (!payerSn) {
                            return message.error('请选择付款方');
                        }
                        if (!projectSn) {
                            return message.error('请选择项目');
                        }
                        if (!(service == 1) && !settleEndTime) {
                            return message.error('请选择终止日期');
                        }
                        this.setState({
                            OriginalBillModalVisi: true
                        });
                    }}>
                        查看<ArrowRightOutlined rotate={-45}/>
                    </span>
                </p>
                <p style={{display: 'flex'}}>
                    <label style={{width: 100}}>总额：</label>
                    <span style={{marginLeft: 50}}>
                        ￥{this.state.totalAmount ? this.state.totalAmount : '-'}
                    </span>
                </p>
                <div style={{marginTop: 50}}>
                    <Button type='primary' style={{marginRight: 20}} onClick={() => {
                        if (this.checkParams())
                            this.setState({isCostAsstSignFilePreviewModalVisi: true})
                    }}>预览并提交</Button>
                    {/*<Popconfirm*/}
                    {/*    title="是否保存该结算单?"*/}
                    {/*    onConfirm={() => {*/}
                    {/*        this.onSubmit(1);*/}
                    {/*    }}*/}
                    {/*    okText="确认"*/}
                    {/*    cancelText="取消"*/}
                    {/*>*/}
                    {/*    <Button>保存</Button>*/}
                    {/*</Popconfirm>*/}
                </div>
            </>
        )
    }
    checkParams = () => {
        const {service, payerSn, settleBeginTime, settleEndTime, projectSn} = this.state;
        if (!service) {
            message.error('请选择业务类型');
            return false;
        }
        if (!payerSn) {
            message.error('请选择付款方');
            return false;
        }
        if (!projectSn) {
            message.error('请选择项目');
            return false;
        }
        if (!(service == 1) && !settleEndTime) {
            message.error('请选择终止日期');
            return false;
        }
        return true;
    }

    onSubmit = type => {
        // 1.保存 2.提交
        const {service, payerSn, settleBeginTime, settleEndTime, projectSn} = this.state;

        if (!this.checkParams()) {
            return;
        }

        CostAssistantModel.CostAsstBeneficiaryAddBill({
            payerSn,
            service,
            settlementStartTimeStr: settleBeginTime,
            settlementEndTimeStr: settleEndTime,
            projectSn,
            type
        }, res => {
            message.success(type == 1 ? '保存成功' : '提交成功');
            this.props.history.push('/pages/appCenter/costAssistant/costAssistantHome/FinalStatementPayee/List');
        })
    }

    getTotalAmount = pa => {
        CostAssistantModel.CostAsstBeneficiaryBillInfo(pa, res => {
            this.setState({
                totalAmount: res.data.totalAmount || ''
            });
        });
    }

}

export default FinalStatementCreate;
