import React, {Component} from 'react';
import {Button, Input, DatePicker, message, Popconfirm} from 'antd';
import CostAssistantModel from "../../CostAssistantModel";
import {ArrowRightOutlined, LeftOutlined} from "@ant-design/icons";
import ViewCoat from "../../../PublicModule/ViewCoat/ViewCoat";
import GetSettlementServiceTypeModal from "../Components/GetSettlementServiceTypeModal";
import moment from "moment";
import request from "../../../../../utils/request/request";
import Api from "./Api";
import SelectPayeeCompanyModal from "../Components/SelectPayeeCompanyModal";
import SelectPayeeProjectUserModal from "../Components/SelectPayeeProjectUserModal";
import FeePayeeListModal from "../Components/FeePayeeListModal";
import PayeeInitiateDetailModal from "../Components/PayeeInitiateDetailModal";
import PayeeOriginalBillModal from "../Components/PayeeOriginalBillModal";
import CostAsstSignFilePayeePreviewModal from "../Components/CostAsstSignFilePayeePreviewModal";

/**
 * 发起结算-承租发起
 */
class FinalStatementLesseeCreate extends Component {
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
            payeeName: '',
            payeeSn: '',
            projectSn: '',
            projectName: '',
            settleBeginTime: '',
            settleEndTime: '',
            totalAmount: '',
            requestPar: {
                service: 0
            },
            settlementCoordination: null
        };
    }

    componentDidMount() {
        request('/api/v1/user/setup/coordination/get', {}, (res) => {
            this.setState({settlementCoordination: res.data.settlementCoordination})
        }, () => {
        })
    }

    render() {
        return (
            <>
                <ViewCoat
                    breadCrumb={[
                        {title: "结算中心"},
                        {title: "结算单"},
                        {title: "承租-发起结算"},
                    ]}
                >
                    {this.state.settlementCoordination == 0 ? <>
                        {this.renderFormView()}
                    </> : <div>协同模式下,承租方不能发起结算</div>}
                    {
                        // 业务类型modal
                        this.state.GetSettlementServiceTypeModalVisi
                            ? <GetSettlementServiceTypeModal
                                onSelect={data => {
                                    const {serviceName, service} = data;

                                    this.setState({
                                        serviceName,
                                        service,
                                        payeeName: '',
                                        payeeSn: '',
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
                            ? <SelectPayeeCompanyModal
                                onSelect={data => {
                                    const {payeeName, payeeSn} = data;

                                    this.setState({
                                        payeeName,
                                        payeeSn,
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
                            ? <SelectPayeeProjectUserModal
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
                                                payeeSn,
                                                projectSn,
                                                service,
                                                settleBeginTime,
                                                settleEndTime
                                            } = this.state;
                                            this.getTotalAmount({
                                                payeeSn,
                                                projectSn,
                                                service,
                                                settlementEndTimeStr: settleEndTime,
                                                settlementStartTimeStr: settleBeginTime
                                            });
                                        }
                                    });
                                }}
                                service={this.state.service}
                                payeeSn={this.state.payeeSn}
                                onClose={() => {
                                    this.setState({SelectProjectUserModalVisi: false});
                                }}
                            />
                            : null
                    }
                    {
                        // 查看费用单modal
                        this.state.FeeListModalVisi
                            ? <FeePayeeListModal
                                payeeSn={this.state.payeeSn}
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
                            ? <PayeeInitiateDetailModal
                                payeeSn={this.state.payeeSn}
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
                            ? <PayeeOriginalBillModal
                                payeeSn={this.state.payeeSn}
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
                        this.state.isCostAsstSignFilePreviewModalVisi ? <CostAsstSignFilePayeePreviewModal
                            data={{
                                payeeSn: this.state.payeeSn,
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
                    <label style={{width: 100}}>选择收款方：</label>
                    <span style={{marginLeft: 50}}>
                        <Input
                            readOnly
                            placeholder='请选择'
                            style={{cursor: 'pointer'}}
                            value={this.state.payeeName ? this.state.payeeName : ''}
                            title={this.state.payeeName}
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
                                const {payeeSn} = this.state;
                                if (!payeeSn) {
                                    return message.error('请先选择收款方');
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
                                    const {payeeSn, projectSn, service, settleBeginTime, settleEndTime} = this.state;

                                    this.getTotalAmount({
                                        payeeSn,
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
                        const {service, payeeSn, projectSn, settleEndTime} = this.state;
                        if (!service) {
                            return message.error('请选择业务类型');
                        }
                        if (!payeeSn) {
                            return message.error('请选择收款方');
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
                        const {service, payeeSn, projectSn, settleEndTime} = this.state;
                        if (!service) {
                            return message.error('请选择业务类型');
                        }
                        if (!payeeSn) {
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
                        const {service, payeeSn, projectSn, settleEndTime} = this.state;
                        if (!service) {
                            return message.error('请选择业务类型');
                        }
                        if (!payeeSn) {
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
        const {service, payeeSn, settleBeginTime, settleEndTime, projectSn} = this.state;
        if (!service) {
            message.error('请选择业务类型');
            return false;
        }
        if (!payeeSn) {
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
        const {service, payeeSn, settleBeginTime, settleEndTime, projectSn} = this.state;

        if (!this.checkParams()) {
            return;
        }

        request(Api.payerAddBill, {
            payeeSn,
            service,
            settlementStartTimeStr: settleBeginTime,
            settlementEndTimeStr: settleEndTime,
            projectSn,
            type
        }, res => {
            message.success(type == 1 ? '保存成功' : '提交成功');
            this.props.history.push('/pages/appCenter/costAssistant/costAssistantHome/FinalStatementPayer/List');
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

export default FinalStatementLesseeCreate;
