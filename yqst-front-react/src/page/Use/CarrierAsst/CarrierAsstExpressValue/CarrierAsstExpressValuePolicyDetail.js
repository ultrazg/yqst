/*
 * @Description  :
 * @version      : 0.1
 * @Author       : Chenglin Huang
 * @Date         : 2021-03-23 17:56:24
 * @LastEditTime : 2021-06-02 14:38:11
 */

import React, { Component } from "react";
import { Switch, message, Descriptions, Table, Button } from "antd";
import { Link } from "react-router-dom";
import ViewCoat from "../../PublicModule/ViewCoat/ViewCoat";
import { rent_complete_icon, rent_undone_icon, rent_disable_icon, events_failure_icon } from "../../../../resource/index";
import model from "./CarrierAsstExpressValueModel";
import StepLine from "./Components/StepLine";
import styles from "./ExpressValueForm.module.css";

export default class CarrierAsstExpressValuePolicyDetail extends Component {

    styles = {
        icon: { width: "32px", height: "32px", marginLeft: 8, marginRight: 8, userSelect: "none" },
        descriptionsLabel: { fontWeight: 500, fontSize: 14, color: "#2B3441" },
        descriptionsContent: { fontWeight: 500, fontSize: 14, color: "#2C3440" },
        tableTitle: { fontSize: "14px", fontWeight: 500, color: "#2B3441", lineHeight: "48px" },
        tableTitleContent: {
            display: "inline-block",
            width: "120px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            verticalAlign: "middle",
            whiteSpace: "nowrap"
        },
        tableTitleLabel: { marginLeft: "8px" },
    }

    columns = [
        {
            title: "计费区间综合里程数",
            type: "number",
            editable: true,
            mileRange: true,
            width: 350,
            sorter: (a, b) => a.minimumMileage - b.minimumMileage,
            render: (text, record) => {
                return (
                    <>
                        <span style={{ fontWeight: "bold" }}>
                            {(record.minimumMileage + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </span>
                        <span style={{ marginRight: 8 }}>公里及以上</span>
                        <span style={{ fontWeight: "bold" }}>
                            {(record.maximumMileage + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </span>公里以下
                    </>
                );
            }
        },
        {
            title: "运输单价（吨 / 公里）",
            dataIndex: "unitPrice",
            key: "unitPrice",
            type: "number",
            editable: true,
            render: (text) => {
                return (text + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
        },
        {
            title: "保底费用(元)",
            dataIndex: "minimumCost",
            key: "minimumCost",
            type: "number",
            editable: true,
            render: (text) => {
                return (text + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
        },
        {
            title: "折扣(%)",
            dataIndex: "discount",
            key: "discount",
            type: "number",
            editable: true,
        },
        // {
        //     title: '操作',
        //     render: (_, record) => {
        //         return (
        //             <>
        //                 {
        //                     this.state.data.pricePolicyStatus === 4 ?
        //                         null :
        //                         <Popconfirm
        //                             title="确定删除吗？"
        //                             onConfirm={() => {
        //                                 this.handlDeleteRow(record.key)
        //                             }}
        //                             okText="确认"
        //                             cancelText="取消"
        //                         >
        //                             <a style={{ marginLeft: 8, color: '#f50' }}> 删除 </a>
        //                         </Popconfirm>
        //                 }
        //             </>
        //         )
        //     },
        // },
    ]

    constructor(props) {
        super(props);
        this.sn = (this.props.location.search && new URLSearchParams(this.props.location.search).get("sn")) || "";
        this.state = {
            data: {}
        };
    }

    componentDidMount() {
        this.refresh();
    }

    getStepCurrent(status) {
        switch (status) {
            case 1:
                return 0;

            default:
                break;
        }
    }

    refresh() {
        this.requestCarrierAsstExpressValuePolicyDetail(this.sn).then(
            ({ data }) => {
                // 添加key值
                data.modelList.forEach((item, index) => {
                    item.key = index + "";
                    item.mileageList = item.mileageList.map((i, secIndex) => {
                        return {
                            key: index + "-" + secIndex,
                            ...i
                        };
                    });
                });

                this.setState({
                    data
                }, () => {
                    console.log(this.state.data);
                });
            }
        );
    }

    handlDeleteRow(key) {
        // key值形如‘1-1’
        const keyArr = key.split("-");
        console.log(keyArr);
        const {
            pricePolicyName,
            pricePolicySn,
            isNotify,
            pricePolicyType,
            effectiveStartTime,
            effectiveEndTime,
            isAllCustomer,
            customerList,
            modelList
        } = this.state.data;

        modelList.forEach(item => {
            if (item.key === keyArr[0]) {
                item.mileageList = item.mileageList.filter(i => {
                    return i.key !== key;
                });
            }
        });

        console.log(modelList);

        const data = {
            pricePolicySn,
            pricePolicyName,
            pricePolicyType,
            effectiveStartTime,
            effectiveEndTime,
            isNotify,
            isAllCustomer,
            customerList,
            modelList,
        };
        this.requestCarrierAsstExpressValuePolicyUpdate(data).then((res) => {
            this.refresh();
        });
    }

    handlDelete(key) {
        // key值形如‘1’
        console.log(key);
        const {
            pricePolicyName,
            pricePolicySn,
            isNotify,
            pricePolicyType,
            effectiveStartTime,
            effectiveEndTime,
            isAllCustomer,
            customerList,
            modelList
        } = this.state.data;

        const newList = modelList.filter(item => {
            return item.key !== key;
        });

        console.log(newList);

        const data = {
            pricePolicySn,
            pricePolicyName,
            pricePolicyType,
            effectiveStartTime,
            effectiveEndTime,
            isNotify,
            isAllCustomer,
            customerList,
            modelList: newList,
        };
        this.requestCarrierAsstExpressValuePolicyUpdate(data).then((res) => {
            this.refresh();
        });
    }

    requestCarrierAsstExpressValuePolicyDetail(pricePolicySn) {
        return new Promise((resolve, reject) => {
            model.CarrierAsstExpressValuePolicyGet(
                {
                    pricePolicySn
                },
                (res) => {
                    resolve(res);
                },
                (err) => {
                    console.log(err);
                }
            );
        });
    }

    requestCarrierAsstExpressValuePolicyEnable(pricePolicySn) {
        return new Promise((resolve, reject) => {
            model.CarrierAsstExpressValuePolicyEnable(
                {
                    pricePolicySn
                },
                (res) => {
                    resolve(res);
                },
                (err) => {
                    console.log(err);
                }
            );
        });
    }

    requestCarrierAsstExpressValuePolicyDisable(pricePolicySn) {
        return new Promise((resolve, reject) => {
            model.CarrierAsstExpressValuePolicyDisable(
                {
                    pricePolicySn
                },
                (res) => {
                    resolve(res);
                },
                (err) => {
                    console.log(err);
                }
            );
        });
    }

    requestCarrierAsstExpressValuePolicyUpdate(values) {
        return new Promise((resolve, reject) => {
            model.CarrierAsstExpressValuePolicyUpdate(
                {
                    ...values
                },
                (res) => {
                    message.success("更新成功！");
                    resolve(res);
                },
                (err) => {
                    console.log(err);
                }
            );
        });
    }

    render() {
        const {
            pricePolicyStatus,
            pricePolicyName,
            createTime,
            pricePolicySn,
            isNotify,
            submitTime,
            pricePolicyType,
            effectiveStartTime,
            effectiveEndTime,
            isAllCustomer,
            customerList,
            modelList
        } = this.state.data;
        return (
            <ViewCoat
                breadCrumb={[
                    { title: "承运助手" },
                    { title: "物流价格" },
                    {
                        title: "物流价格政策列表",
                        link: "/pages/appCenter/carrierAsst/carrierAsstHome/carrierAsstExpressValuePolicyList"
                    },
                    {
                        title: "物流价格政策详情",
                        link: {
                            pathname: "/pages/appCenter/carrierAsst/carrierAsstHome/carrierAsstExpressValuePolicyDetail",
                        }
                    },
                ]}
                topView={
                    <div style={{ float: "right" }}>
                        {
                            pricePolicyStatus === 1 || pricePolicyStatus === 6 ?
                                null :
                                <Switch
                                    checkedChildren="启用"
                                    unCheckedChildren="停用"
                                    checked={pricePolicyStatus === 3 || pricePolicyStatus === 4}
                                    onChange={(checked) => {
                                        if (checked) {
                                            this.requestCarrierAsstExpressValuePolicyEnable(this.sn).then(
                                                (res) => {
                                                    message.success("启用成功！");
                                                    this.refresh();
                                                }
                                            );
                                        } else {
                                            this.requestCarrierAsstExpressValuePolicyDisable(this.sn).then(
                                                (res) => {
                                                    message.success("停用成功！");
                                                    this.refresh();
                                                }
                                            );
                                        }
                                    }}
                                />
                        }
                    </div>
                }
                topcenterView={
                    <div>
                        <h2 style={{ fontSize: "16px" }}>业务处理</h2>
                        <div style={{ margin: "24px 80px 0 120px", height: "130px" }}>
                            <StepLine
                                iconList={
                                    [
                                        // 始终都是完成状态
                                        {
                                            icon: <img alt="status" src={rent_complete_icon} style={this.styles.icon} />,
                                            status: "待提交",
                                            isActive: pricePolicyStatus !== 1,
                                            name: this.state.data.submitterName,
                                            time: submitTime,
                                        },
                                        // 除‘待提交’之外都是完成状态
                                        {
                                            icon: <img alt="status" src={pricePolicyStatus === 1 ? rent_undone_icon : rent_complete_icon} style={this.styles.icon} />,
                                            status: "待启用",
                                            isActive: pricePolicyStatus !== 1 && pricePolicyStatus !== 2,
                                            name: this.state.data.enableOperatorName,
                                            time: this.state.data.enableTime,

                                        },
                                        // ‘待执行’、‘执行中’、‘已失效’完成状态， ‘已停用’禁止状态， ’待提交‘、‘待启用’未完成状态
                                        {
                                            icon: <img
                                                alt="status"
                                                src={
                                                    ((status) => {
                                                        // eslint-disable-next-line default-case
                                                        switch (status) {
                                                            case 1:
                                                            case 2:
                                                                return rent_undone_icon;
                                                            case 3:
                                                            case 4:
                                                            case 6:
                                                                return rent_complete_icon;
                                                            case 5:
                                                                return rent_disable_icon;
                                                        }
                                                    })(pricePolicyStatus)
                                                }
                                                style={this.styles.icon} />,
                                            status: pricePolicyStatus === 5 ?
                                                "已停用" :
                                                pricePolicyStatus === 4 ?
                                                    "执行中" :
                                                    "待执行",
                                            isActive: pricePolicyStatus === 6,
                                            name: pricePolicyStatus === 5 ? this.state.data.disableOperatorName : "",
                                            time: pricePolicyStatus === 5 ? this.state.data.disableTime : ""
                                        },
                                        // ‘已失效’完成状态， ’待提交‘、‘待启用’、‘待执行’、‘执行中’、‘已停用’未完成状态
                                        {
                                            icon: <img alt="status" src={pricePolicyStatus === 6 ? events_failure_icon : rent_undone_icon} style={{ width: "32px", height: "32px", marginLeft: 8, marginRight: 8 }} />,
                                            status: pricePolicyStatus === 6 ? "已失效" : "已执行",
                                        },
                                    ]
                                }
                                activeLine={
                                    <div style={{ width: "142px", height: "2px", backgroundColor: "#4481EB", marginTop: "-15px" }}></div>
                                }
                                line={
                                    <div style={{ width: "142px", height: "2px", backgroundColor: "#C8C9CC", marginTop: "-15px" }}></div>
                                }
                            />
                        </div>
                    </div>
                }
            >
                <h2 style={{ fontSize: "16px", marginBottom: "16px" }}>价格政策</h2>

                <h2 className={styles.smalltitle}> 基本信息 </h2>

                <Descriptions contentStyle={this.styles.descriptionsContent} labelStyle={this.styles.descriptionsLabel}>
                    <Descriptions.Item label="价格政策状态">
                        {
                            ((text) => {
                                switch (text) {
                                    // 1:待提交 2:待启用 3:待执行 4:执行中 5:已停用 6:已失效
                                    case 1:
                                        return "待提交";
                                    case 2:
                                        return "待启用";
                                    case 3:
                                        return "待执行";
                                    case 4:
                                        return "执行中";
                                    case 5:
                                        return "已停用";
                                    case 6:
                                        return "已失效";
                                    default:
                                        break;
                                }
                            })(pricePolicyStatus)
                        }
                    </Descriptions.Item>
                    <Descriptions.Item label="价格政策名称">{pricePolicyName}</Descriptions.Item>
                    <Descriptions.Item label="价格创建时间">{createTime}</Descriptions.Item>
                    <Descriptions.Item label="价格政策编码">{pricePolicySn}</Descriptions.Item>
                    <Descriptions.Item label="价格政策通知">
                        {isNotify ? "发送通知" : "不发送通知"}
                    </Descriptions.Item>
                    {
                        submitTime ?
                            <Descriptions.Item label="价格提交时间">
                                {submitTime}
                            </Descriptions.Item> :
                            null
                    }
                    <Descriptions.Item label="价格政策类型">
                        {
                            ((text) => {
                                switch (text) {
                                    // 1:通用价格 2:特殊价格 3:促销价格
                                    case 1:
                                        return "通用价格";
                                    case 2:
                                        return "特殊价格";
                                    case 3:
                                        return "促销价格";
                                    default:
                                        break;
                                }
                            })(pricePolicyType)
                        }
                    </Descriptions.Item>
                    <Descriptions.Item label="价格有效时间">
                        {
                            `${effectiveStartTime} 至 ${effectiveEndTime}`
                        }
                    </Descriptions.Item>
                </Descriptions>
                <div>
                    <span style={this.styles.descriptionsLabel} >适用对象：</span>
                    {
                        isAllCustomer ?
                            "此政策面向全部客户" :
                            <>
                                <br />
                                <div style={{ display: "flex", flexWrap: "wrap", height: "150px", border: "1px solid #D9D9D9", borderRadius: 4, padding: 4, overflow: "auto" }}>
                                    {
                                        customerList && customerList.map((item) => {
                                            return (
                                                <li key={item.shipperCompanySn} style={{ width: "33%", paddingInline: "10px", listStyle: "initial" }}>
                                                    <span style={{ userSelect: "none" }}> {item.shipperCompanyName} </span>
                                                </li>
                                            );
                                        })
                                    }
                                </div>
                            </>
                    }
                </div>

                <h2 className={styles.smalltitle} style={{ marginTop: 24, marginBottom: 24 }}> 运费明细 </h2>
                {
                    modelList && modelList.map((item) => {
                        return (
                            <div
                                key={item.key}
                                style={{ margin: "10px 0", border: "1px solid rgba(43, 52, 65, 0.25)", padding: 8 }}>
                                <div style={{
                                    height: "48px",
                                    width: "100%",
                                    background: "rgba(43, 52, 65, 0.05)",
                                    ...this.styles.tableTitle
                                }}>
                                    <span style={this.styles.tableTitleLabel}> 车型名称： </span>
                                    <span style={this.styles.tableTitleContent} title={item.modelName}> {item.modelName} </span>
                                    <span style={this.styles.tableTitleLabel}> 车厢尺寸（m）： </span>
                                    <span style={this.styles.tableTitleContent} title={item.carriageSize}> {item.carriageSize} </span>
                                    <span style={this.styles.tableTitleLabel}> 载重（吨）： </span>
                                    <span style={this.styles.tableTitleContent} title={item.loadWeight}> {item.loadWeight} </span>
                                    <span style={this.styles.tableTitleLabel}> 载货体积（m³）： </span>
                                    <span style={this.styles.tableTitleContent} title={item.loadVolume}> {item.loadVolume} </span>
                                    {/* {
                                        pricePolicyStatus === 4 || modelList.length <= 1 ?
                                            null :
                                            <Popconfirm
                                                title="确定删除吗？"
                                                onConfirm={() => {
                                                    this.handlDelete(item.key)
                                                }}
                                                okText="确认"
                                                cancelText="取消"
                                            >
                                                <Button style={{ float: 'right', margin: 3 }} size="large" danger > 删除 </Button>
                                            </Popconfirm>
                                    } */}
                                </div>
                                <Table
                                    columns={this.columns}
                                    dataSource={item.mileageList}
                                    pagination={false}
                                />
                            </div>
                        );
                    })
                }

                {
                    pricePolicyStatus === 4 ?
                        null :
                        <Button
                            size="large"
                        >
                            <Link
                                style={{ paddingInline: 5 }}
                                to={{
                                    pathname: "/pages/appCenter/carrierAsst/carrierAsstHome/carrierAsstExpressValuePolicyUpdate",
                                    search: `?sn=${pricePolicySn}`
                                }} >
                                编辑
                            </Link>
                        </Button>
                }

                <Button size="large"
                    style={{ margin: 10 }}
                    onClick={() => {
                        this.props.history.goBack();
                        console.log(this.props);
                    }}
                >
                    返回
                </Button>

            </ViewCoat>
        );
    }
}
