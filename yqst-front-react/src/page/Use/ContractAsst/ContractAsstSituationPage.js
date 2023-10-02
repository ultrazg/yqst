/*
 * @Description  : 概况
 * @version      : 0.1
 * @Author       : Chenglin Huang
 * @Date         : 2021-03-12 16:23:59
 * @LastEditTime : 2021-05-12 11:19:31
 */
import React, {Component} from "react";
import {Card, Row, Col, message} from "antd";
import contract_asst_save from "../../../resource/contract_asst_save.png";
import contract_asst_manage from "../../../resource/contract_asst_manage.png";
import request from "../../../utils/request/request";
import apiInterfaces from "./apiInterfaces";

const featureData = [
    // {
    //     icon: contract_asst_manage,
    //     label: "合同管理",
    //     url: "/pages/appCenter/contractAsst/contractAsstHome/contractManageIndex",
    // },
    {
        icon: contract_asst_manage,
        label: '租赁合同信息维护',
        url: '/pages/appCenter/contractAsst/contractAsstHome/contractInfoMaintain/list',
    },
    {
        icon: contract_asst_manage,
        label: '租赁合同信息维护',
        url: '/pages/appCenter/contractAsst/contractAsstHome/maintainContractInfo/list',
    },
    {
        icon: contract_asst_save,
        label: "合同存档",
        url: "/pages/appCenter/contractAsst/contractAsstHome/contractArchiveIndex",
    },
];

class CarrierAsstSituationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statistic: {}
        };
        this.requestStatistics();
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    requestStatistics() {
        request(
            apiInterfaces.contractStatistics,
            {},
            (res) => {
                this.setState({
                    statistic: res.data
                });
            },
            (err) => {
                console.warn(err);
            }
        );
    }

    render() {

        const {statistic} = this.state;

        return (
            <div
                style={{display: "flex", flexDirection: "column", height: "100%"}}
            >
                <Card bodyStyle={{padding: 0}} style={{padding: "36px 24px", borderRadius: "6px"}}>
                    <h1
                        style={{
                            margin: 0,
                            fontSize: "24px",
                            fontWeight: 500,
                            lineHeight: "33px",
                            color: "#2B3441"
                        }}
                    >
                        合同助手
                    </h1>
                </Card>

                {/*<Card*/}
                {/*    style={{ marginTop: 24, borderRadius: 6 }}*/}
                {/*>*/}
                {/*    <Row>*/}
                {/*        <Col span={8}>*/}
                {/*            <div*/}
                {/*                style={{*/}
                {/*                    fontSize: "14px",*/}
                {/*                    fontWeight: 300,*/}
                {/*                    color: "rgba(43, 52, 65, 0.65)",*/}
                {/*                    margin: "0px"*/}
                {/*                }}*/}
                {/*            >待签署合同</div>*/}
                {/*            <div*/}
                {/*                style={{*/}
                {/*                    fontWeight: 300,*/}
                {/*                    color: "#2B3441",*/}
                {/*                    fontSize: "30px",*/}
                {/*                }}*/}
                {/*            >{ statistic.toBeSignStatisticsNum }</div>*/}
                {/*        </Col>*/}
                {/*        /!*<Col span={8}>*!/*/}
                {/*        /!*    <div*!/*/}
                {/*        /!*        style={{*!/*/}
                {/*        /!*            fontSize: "14px",*!/*/}
                {/*        /!*            fontWeight: 300,*!/*/}
                {/*        /!*            color: "rgba(43, 52, 65, 0.65)",*!/*/}
                {/*        /!*            margin: "0px"*!/*/}
                {/*        /!*        }}*!/*/}
                {/*        /!*    >本月待审核数量</div>*!/*/}
                {/*        /!*    <div*!/*/}
                {/*        /!*        style={{*!/*/}
                {/*        /!*            fontWeight: 300,*!/*/}
                {/*        /!*            color: "#2B3441",*!/*/}
                {/*        /!*            fontSize: "30px",*!/*/}
                {/*        /!*        }}*!/*/}
                {/*        /!*    >{ statistic.toBeSignMonthStatisticsNum }</div>*!/*/}
                {/*        /!*</Col>*!/*/}
                {/*        /!*<Col span={8}>*!/*/}
                {/*        /!*    <div*!/*/}
                {/*        /!*        style={{*!/*/}
                {/*        /!*            fontSize: "14px",*!/*/}
                {/*        /!*            fontWeight: 300,*!/*/}
                {/*        /!*            color: "rgba(43, 52, 65, 0.65)",*!/*/}
                {/*        /!*            margin: "0px"*!/*/}
                {/*        /!*        }}*!/*/}
                {/*        /!*    >本月已审核数量</div>*!/*/}
                {/*        /!*    <div*!/*/}
                {/*        /!*        style={{*!/*/}
                {/*        /!*            fontWeight: 300,*!/*/}
                {/*        /!*            color: "#2B3441",*!/*/}
                {/*        /!*            fontSize: "30px",*!/*/}
                {/*        /!*        }}*!/*/}
                {/*        /!*    >{ statistic.signMonthStatisticsNum }</div>*!/*/}
                {/*        /!*</Col>*!/*/}
                {/*    </Row>*/}
                {/*</Card>*/}

                <Card
                    style={{marginTop: 24, borderRadius: 6, flex: 1}}
                    title={
                        <h1
                            style={{fontSize: 16, margin: 0, color: "#2B3441"}}
                        >
                            业务处理
                        </h1>
                    }
                >
                    <div style={{display: "flex", flexWrap: "wrap"}}>
                        {
                            featureData && featureData.map((n, index) => {
                                return (
                                    <div
                                        style={{
                                            width: "20%",
                                            display: "flex",
                                            alignItems: "center",
                                            marginBottom: (index + 1 > (parseInt((featureData.length - 1) / 5) * 5)) ? 0 : 32,
                                        }}
                                        key={index}
                                        onClick={() => {
                                            if (!n.url)
                                                return message.warning("工程师正在紧张的研发中...");
                                            this.props.history.push(n.url);
                                        }}
                                    >
                                        <img style={{cursor: "pointer"}} width={32} height={32} src={n.icon} alt=""/>
                                        <h4
                                            style={{
                                                flex: 1,
                                                marginBottom: 0,
                                                marginLeft: 8,
                                                cursor: "pointer"
                                            }}
                                        >
                                            {n.label}
                                        </h4>
                                    </div>
                                );
                            })
                        }
                    </div>
                </Card>
            </div>
        );
    }
}

export default CarrierAsstSituationPage;
