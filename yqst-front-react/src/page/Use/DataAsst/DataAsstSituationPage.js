/*
 * @Description  : 概况
 * @version      : 0.1
 * @Author       : Chenglin Huang
 * @Date         : 2021-03-12 16:23:59
 * @LastEditTime : 2021-05-25 17:26:00
 */
import React, {Component} from "react";
import {Card, message} from "antd";
import dataAsstDashBoard from "../../../resource/dataAsstDashBoard.png";
import dataAsstReportTable from "../../../resource/dataAsstReportTable.png";

const featureData = [
    {
        icon: dataAsstDashBoard,
        label: "仪表盘",
        url: "/pages/appCenter/dataAsst/home/dataAsstDashBoardIndex",
    },
    {
        icon: dataAsstReportTable,
        label: "报表",
        url: "/pages/appCenter/dataAsst/home/dataAsstReportTableCreate",
    },
    {
        icon: dataAsstDashBoard,
        label: "经营数据",
        url: "/pages/appCenter/dataAsst/home/dataAsstBusinessDataIndex",
    },
    // {
    //     icon: dataAsstDashBoard,
    //     label: "集团数据",
    //     url: "/pages/appCenter/dataAsst/home/dataAsstGroupDataIndex",
    // },
];

class CarrierAsstSituationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statistic: {}
        };
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {

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
                        数据助手
                    </h1>
                </Card>

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
