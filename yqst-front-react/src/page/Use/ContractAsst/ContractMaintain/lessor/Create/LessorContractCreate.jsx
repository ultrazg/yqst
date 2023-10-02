import React, {Component} from 'react';
import ViewCoat from "../../../../PublicModule/ViewCoat/ViewCoat";
import {LeftOutlined} from "@ant-design/icons";
import {Button, Steps, message} from "antd";

import Step1Lessor from "../../Components/Step1Lessor";
import Step2Lessor from '../../Components/Step2Lessor';
import Step3 from '../../Components/Step3';
import Step4 from '../../Components/Step4';
import request from "../../../../../../utils/request/request";
import Api from "../../Api/Api";

const {Step} = Steps;

/**
 * 出租方创建合同
 */
class LessorContractCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStep: 0,
            data: {
                //step1
                lesseeName: '',
                lesseeSn: '',
                lessorName: '',
                lessorSn: '',
                projectType: 0,//项目类型
                projectName: '',
                projectSn: '',
                feeType: 1, //计费方式(1.按月计费2. 按日计费）
                settlementStartTime: '',
                leaseRate: 0,
                leaseGoodsList: [],
                settlementDate: 1, // 租赁业务周期（结算日期1-28）
                entryFeePayer: 1, // 进场物流费用承担方（1.我方 2.客户）
                returnFeePayer: 1, // 退场物流费用承担方（1.我方 2.客户）
                //step2
                cuttingList: [],
                //step3 lossGoodsList
                lossRate: 0,
                lossGoodsList: [],
                //step4
                maintenanceItemList: [],
            }
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <ViewCoat
                breadCrumb={[{title: "合同助手"}, {title: "出租方创建租赁合同"},]}
            >
                <Button style={{marginBottom: 20}} onClick={() => {
                    window.history.go(-1);
                }}><LeftOutlined/>返回</Button>

                <Steps current={this.state.currentStep}>
                    <Step title="租赁价格及结算信息"/>
                    <Step title="切割赔偿"/>
                    <Step title="丢损赔偿"/>
                    <Step title="维保价格"/>
                    <Step title="提交成功"/>
                </Steps>

                {
                    (() => {
                        switch (this.state.currentStep) {
                            case 0:
                                return <Step1Lessor
                                    data={this.state.data}
                                    setData={(data, callback) => {
                                        this.setState({
                                            data: {
                                                ...this.state.data,
                                                ...data
                                            }
                                        }, () => {
                                            callback && callback()
                                        })
                                    }}
                                    onNext={() => {
                                        if (!this.state.data.lesseeSn) {
                                            message.info("请选择承租方");
                                            return;
                                        }
                                        if (!this.state.data.projectSn && this.state.data.projectType === 1) {
                                            message.info("请输入项目");
                                            return;
                                        }
                                        let skuList = [];
                                        let leaseGoodsList = this.state.data.leaseGoodsList;
                                        for (let i = 0; i < leaseGoodsList.length; i++) {
                                            if (leaseGoodsList[i].skuList && leaseGoodsList[i].skuList.length) {
                                                for (let j = 0; j < leaseGoodsList[i].skuList.length; j++) {
                                                    skuList.push({
                                                        leaseGoodsSn: leaseGoodsList[i].skuList[j].leaseGoodsSn,
                                                        unitPriceExcludingTax: leaseGoodsList[i].skuList[j].num,
                                                        taxRate: this.state.data.leaseRate,
                                                        unitPrice: leaseGoodsList[i].skuList[j].num2,
                                                    });
                                                }
                                            }
                                        }
                                        if (skuList.length == 0) {
                                            message.info("请选择物资");
                                            return;
                                        }
                                        if (this.state.data.settlementDate === 0) {
                                            return message.info("请选择结算周期");
                                        }
                                        this.setState({currentStep: 1});
                                    }}
                                />
                            case 1:
                                return <Step2Lessor
                                    data={this.state.data}
                                    setData={(data, callback) => {
                                        this.setState({
                                            data: {
                                                ...this.state.data,
                                                ...data
                                            }
                                        }, () => {
                                            callback && callback()
                                        })
                                    }}
                                    onPrev={() => {
                                        this.setState({currentStep: 0});
                                    }}
                                    onNext={() => {
                                        let cuttingList = this.state.data.cuttingList;
                                        for (let i = 0; i < cuttingList.length; i++) {
                                            if (cuttingList[i].replacedSkuList.length <= 0) {
                                                return message.info("物资组"
                                                    + (i + 1) + "请选择切割物资");
                                            }
                                        }
                                        this.setState({currentStep: 2});
                                    }}/>
                            case 2:
                                return <Step3
                                    data={this.state.data}
                                    setData={(data, callback) => {
                                        this.setState({
                                            data: {
                                                ...this.state.data,
                                                ...data
                                            }
                                        }, () => {
                                            callback && callback()
                                        })
                                    }}
                                    onPrev={() => {
                                        this.setState({currentStep: 1});
                                    }}
                                    onNext={() => {
                                        this.setState({currentStep: 3});
                                    }}/>
                            case 3:
                                return <Step4
                                    data={this.state.data}
                                    setData={(data, callback) => {
                                        this.setState({
                                            data: {
                                                ...this.state.data,
                                                ...data
                                            }
                                        }, () => {
                                            callback && callback()
                                        })
                                    }}
                                    onPrev={() => {
                                        this.setState({currentStep: 2});
                                    }}
                                    onSubmit={() => {
                                        if (!this.state.data.lesseeSn) {
                                            message.info("请选择承租方");
                                            return;
                                        }
                                        if (!this.state.data.projectSn && this.state.data.projectType === 1) {
                                            message.info("请输入项目");
                                            return;
                                        }
                                        let skuList = [];
                                        let leaseGoodsList = this.state.data.leaseGoodsList;
                                        for (let i = 0; i < leaseGoodsList.length; i++) {
                                            if (leaseGoodsList[i].skuList && leaseGoodsList[i].skuList.length) {
                                                for (let j = 0; j < leaseGoodsList[i].skuList.length; j++) {
                                                    skuList.push({
                                                        leaseGoodsSn: leaseGoodsList[i].skuList[j].leaseGoodsSn,
                                                        unitPriceExcludingTax: leaseGoodsList[i].skuList[j].num,
                                                        taxRate: this.state.data.leaseRate,
                                                        unitPrice: leaseGoodsList[i].skuList[j].num2,
                                                    });
                                                }
                                            }
                                        }
                                        if (skuList.length == 0) {
                                            message.info("请选择物资");
                                            return;
                                        }
                                        if (this.state.data.settlementDate === 0) {
                                            return message.info("请选择结算周期");
                                        }
                                        //切割物资（选填）
                                        let replacementGoodsList = [];
                                        let cuttingList = this.state.data.cuttingList;
                                        for (let i = 0; i < cuttingList.length; i++) {
                                            replacementGoodsList.push({
                                                leaseGoodsSn: cuttingList[i].skuList[0].leaseGoodsSn,
                                                replacedSkuList: cuttingList[i].replacedSkuList.map((item) => {
                                                    return {
                                                        leaseGoodsSn: item.leaseGoodsSn,
                                                        unitPriceExcludingTax: item.num,
                                                        unitPrice: item.num2,
                                                        taxRate: item.taxRate
                                                    }
                                                })
                                            });
                                        }

                                        //丢损物资（选填）
                                        let lossList = [];
                                        let lossGoodsList = this.state.data.lossGoodsList;
                                        for (let i = 0; i < lossGoodsList.length; i++) {
                                            if (lossGoodsList[i].skuList && lossGoodsList[i].skuList.length) {
                                                for (let j = 0; j < lossGoodsList[i].skuList.length; j++) {
                                                    lossList.push({
                                                        leaseGoodsSn: lossGoodsList[i].skuList[j].leaseGoodsSn,
                                                        lossTaxRate: this.state.data.lossRate,
                                                        damageTaxRate: this.state.data.lossRate,
                                                        lossUnitPriceExcludingTax: lossGoodsList[i].skuList[j].num,
                                                        lossUnitPrice: lossGoodsList[i].skuList[j].num2,
                                                        damageUnitPriceExcludingTax: lossGoodsList[i].skuList[j].num3,
                                                        damageUnitPrice: lossGoodsList[i].skuList[j].num4,
                                                    });
                                                }
                                            }
                                        }
                                        //维保物资（选填）maintenanceItemList

                                        request(Api.ContractLessorAdd, {
                                            lesseeSn: this.state.data.lesseeSn,//	string	是	承租方用户编号
                                            projectSn: this.state.data.projectSn,
                                            skuList: skuList,//	arr-object	是	sku列表
                                            feeType: this.state.data.feeType, // 计费方式(1.按月计费2. 按天计费）
                                            settlementDate: this.state.data.settlementDate, // 租赁业务周期（结算日期1-28号）
                                            entryFeePayer: this.state.data.entryFeePayer, // 进场物流费用承担方（1.我方 2.客户）
                                            returnFeePayer: this.state.data.returnFeePayer, // 退场物流费用承担方（1.我方 2.客户）
                                            projectType: this.state.data.projectType, // 项目类型 0.非特供 1.特供
                                            // leaseGoodsSn	string	是	租赁物资唯一编号
                                            // unitPrice	double	是	含税单价
                                            // unitPriceExcludingTax	double	是	不含税单价
                                            // taxRate	double	是	税率
                                            replacementGoodsList: replacementGoodsList,
                                            lossGoodsList: lossList,
                                            maintenanceItemList: this.state.data.maintenanceItemList
                                        }, () => {
                                            message.info("提交成功");
                                            this.props.history.push("/pages/appCenter/contractAsst/contractAsstHome/contractInfoMaintain/list");
                                        }, () => {
                                        });
                                    }}/>
                            default:
                                return null
                        }
                    })()
                }
            </ViewCoat>
        );
    }
}

export default LessorContractCreate;
