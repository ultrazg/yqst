import React, {Component} from 'react';
import {Button, Popconfirm} from 'antd';
import {getPageQuery} from "../../../../../../utils";
import CostAssistantModel from "../../../CostAssistantModel";
import moment from "moment";
import {ArrowRightOutlined, LeftOutlined} from '@ant-design/icons';
import CostAsstSignFileModal from "../../Components/CostAsstSignFileModal";
import ViewCoat from "../../../../PublicModule/ViewCoat/ViewCoat";
import CostAsstSignFilePreviewModal from "../../Components/CostAsstSignFilePreviewModal";

class FinalStatementPayeeDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sn: '',
            isCostAsstSignFileModalVisi: false,
            isCostAsstSignFilePreviewModalVisi: false,
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

    render() {
        return (
            <>
                <ViewCoat
                    breadCrumb={[
                        {title: "结算中心"},
                        {title: "结算单"},
                        {title: "收款方"},
                        {title: "结算单详情"},
                    ]}
                >
                    <Button style={{marginBottom: 20}} onClick={() => {
                        window.history.go(-1);
                    }}><LeftOutlined/>返回</Button>
                    {this.renderText('结算状态', this.switchStatus(this.state.data.status))}
                    {this.renderText('业务类型', this.switchServiceStatus(this.state.data.service))}
                    {this.renderText('结算单号', this.state.data.settlementBillSn || '')}
                    {this.renderText('付款方', this.state.data.payerName || '')}
                    {this.renderText('收款方', this.state.data.payeeName || '')}
                    {this.renderText('项目', this.state.data.projectName || '')}
                    {this.renderText('结算期初日', this.state.data.settlementStartTime ? moment(this.state.data.settlementStartTime).format('YYYY-MM-DD') : '')}
                    {this.renderText('结算期末日', this.state.data.settlementEndTime ? moment(this.state.data.settlementEndTime).format('YYYY-MM-DD') : '')}
                    {this.renderText('费用单', <span style={{cursor: 'pointer', color: 'royalblue'}} onClick={() => {
                        this.props.history.push('/pages/appCenter/costAssistant/costAssistantHome/FinalStatement/CostFeeIndex?sn=' + this.state.sn + '&service=' + this.state.data.service);
                    }}>查看<ArrowRightOutlined
                        rotate={-45}/></span>)}
                    {this.renderText('结算金额(含税)', this.state.data.settlementTotalAmount ? '￥' + this.state.data.settlementTotalAmount : '')}
                    {
                        this.state.data.service == 1
                            ? this.renderText('结算清单', <span style={{cursor: 'pointer', color: 'royalblue'}}
                                                            onClick={() => {
                                                                this.props.history.push('/pages/appCenter/costAssistant/costAssistantHome/FinalStatement/CostAsstInitiateIndex?sn=' + this.state.sn + '&service=' + this.state.data.service);
                                                            }}>查看<ArrowRightOutlined
                                rotate={-45}/></span>)
                            : null
                    }
                    {
                        this.state.data.service == 1
                            ? this.renderText('本期业务单据', <span
                                style={{cursor: 'pointer', color: 'royalblue'}} onClick={() => {
                                this.props.history.push('/pages/appCenter/costAssistant/costAssistantHome/FinalStatement/CostAsstInitiateOriginalIndex?sn=' + this.state.sn);
                            }}>查看<ArrowRightOutlined
                                rotate={-45}/></span>)
                            : null
                    }
                    {this.renderText('签署文件', <span style={{cursor: 'pointer', color: 'royalblue'}} onClick={() => {
                        this.setState({isCostAsstSignFileModalVisi: true});
                    }}>查看<ArrowRightOutlined
                        rotate={-45}/></span>)}
                    {
                        this.state.data.status === 5
                            ? this.renderText('拒绝原因', this.state.data.payerRefuseReason || '')
                            : null
                    }
                    {
                        // 待收款方提交
                        this.state.data.status === 1
                            ?
                            <Button type='primary' onClick={() => {
                                this.setState({
                                    isCostAsstSignFilePreviewModalVisi: true
                                })
                            }}>预览并提交</Button>
                            : null
                    }
                </ViewCoat>
                {
                    this.state.isCostAsstSignFileModalVisi
                        ? <CostAsstSignFileModal
                            sn={this.state.sn}
                            onClose={() => {
                                this.setState({isCostAsstSignFileModalVisi: false});
                            }}
                        />
                        : null
                }
                {
                    this.state.isCostAsstSignFilePreviewModalVisi ? <CostAsstSignFilePreviewModal
                        data={this.state.data}
                        callback={() => {
                            const {sn} = this.state;
                            CostAssistantModel.CostAsstBeneficiarySubmit({sn}, res => {
                                this.setState({isCostAsstSignFilePreviewModalVisi: false});
                                this.getList();
                            });
                        }}
                        onClose={() => {
                            this.setState({isCostAsstSignFilePreviewModalVisi: false});
                        }}/> : null
                }
            </>
        );
    }

    getList = () => {
        const {sn} = this.state;
        CostAssistantModel.FinalStatementBillInfo({sn}, res => {
            this.setState({
                data: res.data
            });
        });
    }

    renderText = (title, content) => {
        return (
            <p style={{display: 'flex'}}>
                <label style={{width: 100}}>{title}</label>
                <span style={{marginLeft: 50}}>{content}</span>
            </p>
        )
    }

    switchStatus = status => {
        //["待提交", "已删除", "待确认", "已结算", "已拒绝"]
        switch (status) {
            case 1:
                return '待收款方提交';
            case 2:
                return '收款方已删除';
            case 3:
                return '待付款方确认';
            case 4:
                return '已结算';
            case 5:
                return '付款方已拒绝';
            default:
                return '';
        }
    }

    switchServiceStatus = status => {
        //["待提交", "已删除", "待确认", "已结算", "已拒绝"]
        switch (status) {
            case 1:
                return '租赁服务';
            case 2:
                return '赔偿服务';
            case 3:
                return '运输服务';
            case 4:
                return '维保服务';
            default:
                return '';
        }
    }
}

export default FinalStatementPayeeDetail;
