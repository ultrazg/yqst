import React, {Component} from 'react';
import {Modal, Select, Button, Card, message, notification} from "antd";
import Model from "../../Model";
import {withRouter, Link} from 'react-router-dom';
import {numToString} from "../common";

const {Option} = Select;

let goInitValue = true;

class SettlementEditorModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            payPlanOption: [],
            payPlanSn: '',
            channelBillCycleType: 1, // 1每周， 2每月
            channelBillDay: 1, // 代表星期几
            channelBillDate: 1, // 几号

            channelDeductCycleType: 1, // 通道账单扣费周期 1每周；2每月
            channelDeductDay: 1,
            channelDeductDate: 1,
        };
    }

    getPayPlanOption = ()=>{
        Model.GetPayPlanList({}, res=>{
            this.setState({
                payPlanOption: res.data,
                payPlanSn: res.data[0] ? res.data[0].sn : ''
            })
        })
    };

    componentDidMount() {
        this.getPayPlanOption();
    }

    init = (channelBillCycleType, channelDeductCycleType)=>{
        this.channelBillOption = [];
        this.channelDeductCycleOption = [];

        if(channelBillCycleType === 1){
            for(let i=1; i<8; i++){
                this.channelBillOption.push(i)
            }
        }else {
            for(let i=1; i<29; i++){
                this.channelBillOption.push(i)
            }
        }

        if(channelDeductCycleType === 1){
            for(let i=1; i<8; i++){
                this.channelDeductCycleOption.push(i)
            }
        }else {
            for(let i=1; i<29; i++){
                this.channelDeductCycleOption.push(i)
            }
        }
    };

    render() {
        const {isShow, getModalData} = this.props;
        const {
            isLoading,
            payPlanOption,
            payPlanSn,
            channelBillCycleType,
            channelBillDay,
            channelBillDate,
            channelDeductCycleType,
            channelDeductDay,
            channelDeductDate
        } = this.state;

        this.init(channelBillCycleType, channelDeductCycleType);


        return (
            <Modal
                title="支付结算"
                visible={isShow}
                width={800}
                confirmLoading={isLoading}
                onOk={()=>{

                    if(!payPlanSn){
                        message.error(
                            <span>请先添加支付方案！
                                <a onClick={()=>{
                                    this.props.history.replace('/Pages/PASchemeAdd')
                                    message.destroy()
                                }}>去添加</a>
                            </span>
                        )
                    }else {
                        getModalData(false, this.state)
                    }

                }}
                onCancel={()=>{
                    getModalData(false)
                }}
            >
                <div>
                    <h3>关联方案</h3>
                    <div style={{
                        display: 'flex',
                        height: 60,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <span>支付方案：</span>
                        <Select value={payPlanSn} style={{width: 300}} onChange={(value)=>{
                            this.setState({
                                payPlanSn: value
                            })
                        }}>
                            {
                                payPlanOption && payPlanOption.map(item=>{
                                    return <Option key={item.sn} value={item.sn}>{item.planName}</Option>
                                })
                            }


                        </Select>
                    </div>
                </div>

                <div>
                    <h3>商户结算</h3>
                    <div>
                        <div style={{
                            display: 'flex',
                            height: 60,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <span>通道费用账单：</span>
                            <Select value={channelBillCycleType} style={{width: 150, margin: '0 30px'}} onChange={(channelBillCycleType)=>{
                                this.setState({
                                    channelBillCycleType
                                })
                            }}>
                                <Option value={1}>每周</Option>
                                <Option value={2}>每月</Option>
                            </Select>

                            <Select value={ channelBillCycleType === 1 ? channelBillDay : channelBillDate } style={{width: 150}} onChange={(value)=>{
                                    if(channelBillCycleType === 1){
                                        this.setState({
                                            channelBillDay: value
                                        })
                                    }else {
                                        this.setState({
                                            channelBillDate: value
                                        })
                                    }
                                }}
                            >
                                {
                                    this.channelBillOption && this.channelBillOption.map((item, index)=>{
                                        return <Option key={index} value={item}>{channelBillCycleType===1 ? `星期${numToString(item)}` : `${item}号`}</Option>
                                    })
                                }
                            </Select>
                        </div>
                    </div>
                    <div>
                        <div style={{display: 'flex', height: 60, justifyContent: 'center', alignItems: 'center'}}>
                            <span>通道账单扣费：</span>
                            <Select value={channelDeductCycleType} style={{width: 150, margin: '0 30px'}} onChange={(value)=>{
                                this.setState({
                                    channelDeductCycleType: value
                                })
                            }}>
                                <Option value={1}>每周</Option>
                                <Option value={2}>每月</Option>
                            </Select>

                            <Select value={channelDeductCycleType === 1 ? channelDeductDay : channelDeductDate} style={{width: 150}}
                                onChange={(value)=>{
                                    if(channelDeductCycleType === 1){
                                        this.setState({
                                            channelDeductDay: value
                                        })
                                    }else {
                                        this.setState({
                                            channelDeductDate: value
                                        })
                                    }
                                }}>
                                {
                                    this.channelDeductCycleOption && this.channelDeductCycleOption.map((item, index)=>{
                                        return <Option key={index} value={item}>{channelDeductCycleType===1 ? `星期${numToString(item)}` : `${item}号`}</Option>
                                    })
                                }
                            </Select>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.payInfo && this.props.payInfo.payPlanSn && goInitValue){
            goInitValue = false;
            // 设置为商户对应的结算信息
            let {
                payPlanSn, channelBillCycleType, channelBillDay, channelBillDate,
                channelDeductCycleType, channelDeductDay, channelDeductDate
            } = this.props.payInfo;

            this.setState({
                payPlanSn,
                channelBillCycleType,
                channelBillDay,
                channelBillDate,
                channelDeductCycleType,
                channelDeductDay,
                channelDeductDate
            })
        }
    }
}

export default withRouter(SettlementEditorModal)