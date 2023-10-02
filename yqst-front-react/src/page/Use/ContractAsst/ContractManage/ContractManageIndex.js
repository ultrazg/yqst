import React, { Component } from "react";
import ViewCoat from "../../PublicModule/ViewCoat/ViewCoat";
import { Button, Input, Select } from "antd";
import SWTable from "SWViews/table";
import request from "../../../../utils/request/request";
import apiInterfaces from "../apiInterfaces";
import { Link } from "react-router-dom";
import moment from "moment";

const { Option } = Select;

export default class ContractManageIndex extends Component {

    #columns = [
        {
            title: "合同编码",
            key: "contractSn",
            dataIndex: "contractSn"
        },
        {
            title: "类型",
            key: "type",
            dataIndex: "type",
            render: (text) => {
                if (text === 1) {
                    return "线上合同";
                } else {
                    return "线下合同";
                }
            }
        },
        {
            title: "合同名称",
            ellipsis: true,
            key: "contractName",
            dataIndex: "contractName"
        },
        {
            title: "甲方",
            ellipsis: true,
            key: "contractFirstPartyCompanyName",
            dataIndex: "contractFirstPartyCompanyName",
        },
        {
            title: "乙方",
            ellipsis: true,
            key: "contractSecondPartyCompanyName",
            dataIndex: "contractSecondPartyCompanyName",
        },
        {
            title: "状态",
            key: "state",
            dataIndex: "state",
            render: (text, record) => {
                return (
                    <span style={
                        {
                            color: text === 109 ?
                                "#0f0" :
                                text === 103 || text === 105 ?
                                    "#f00" :
                                    "#00f"
                        }
                    }>
                        {this.getStatusName(record)}
                    </span>
                );
            }
        },
        {
            title: "创建时间",
            width: 180,
            key: "createTime",
            dataIndex: "createTime",
            render: (text) => {
                return moment(text).format("YYYY-MM-DD HH:mm");
            }
        },
        {
            title: "",
            width: 100,
            render: (text, record) => {
                return (
                    <Link
                        style={{ paddingInline: 5 }}
                        to={{
                            pathname: "/pages/appCenter/contractAsst/contractAsstHome/contractDetailIndex",
                            search: `?sn=${record.sn}`
                        }} >
                        查看
                    </Link>
                );
            }
        }
    ]

    constructor(props) {
        super(props);
        this.pageSize = 10;
        this.current = 1;
        this.state = {
            data: [],
            keyWord: "",
            status: 0, // 合同状态 0全部，1待提交，2我方待签署，3对方待签署，4我方拒签，5对方拒签，6已完成签署(线上)
            type: 1, // 1线上，2线下存档
            listType: 0, // 发起人类型
        };
    }

    componentDidMount() {
        this.requestList();
    }

    getStatusName(item) {
        const { state } = item;
        // 101.待发起方内部审核(发起方发起合同)
        // 102.待签署方签署合同(发起方内部审核通过)
        // 103 发起方内部审核不通过
        // 104 待发起方签署合同(签署方签署通过)
        // 105 签署方驳回合同
        // 106 发起方签署合同
        // 107 取消合同
        // 108 提交合同
        // 109 签署完成
        switch (state) {
            case 101:
                return "待提交";
            // case 102:
            //     return '待签署方签署合同';
            case 103:
                //isInitiator是否发起方 是-我方拒绝 否-对方拒绝
                // return '发起方内部审核不通过';
                return item.isInitiator ? "我方拒签" : "对方拒签";
            case 104:
                //isInitiator是否发起方 是-未签 否-已签
                // return '待发起方签署合同';
                return item.isInitiator ? "待我方签署" : "待对方签署";
            case 105:
                //isInitiator是否发起方 是-对方拒绝 否-我方拒绝
                // return '签署方驳回合同';
                return item.isInitiator ? "对方拒签" : "我方拒签";
            case 106:
                //isInitiator是否发起方 是-已签 否-未签
                // return '发起方签署合同';
                return item.isInitiator ? "待对方签署" : "待我方签署";
            // case 107:
            //     return '取消合同';
            case 108:
                // return '提交合同';
                return "待我方签署";
            case 109:
                return "签署完成";
            default:
                return "";
        }
    }

    requestList() {
        const { current, pageSize } = this;
        const { status, keyWord, type, listType } = this.state;
        request(
            apiInterfaces.contractAsstPage,
            {
                current, pageSize, status, keyWord, type, listType
            },
            (res) => {
                this.total = res.data.total;
                this.setState({
                    data: res.data.records
                });
            },
            (err) => {
                console.warn(err);
            }
        );
    }


    render() {
        return (
            <ViewCoat
                breadCrumb={[
                    { title: "合同助手" },
                    { title: "合同管理" }
                ]}
            >
                {/* 搜索 */}
                <div style={{ marginBottom: "24px" }}>
                    <label
                        style={{ fontSize: 14, lineHeight: "20px", marginRight: 8 }}
                    >
                        关键词 :
                    </label>
                    <Input
                        allowClear
                        style={{ width: 272, height: 40, fontSize: "14px" }}
                        value={this.state.keyWord}
                        placeholder={"请输入关键词"}
                        onChange={
                            e => {
                                this.setState({
                                    keyWord: e.target.value
                                });
                            }
                        }
                    />
                    <label
                        style={{ fontSize: 14, lineHeight: "20px", marginInline: 8 }}
                    >
                        发起人 :
                    </label>
                    <Select
                        defaultValue={0}
                        style={{ width: 100, height: 40, fontSize: "14px", marginRight: 8, marginLeft: 8 }}
                        value={this.state.listType}
                        size="large"
                        onChange={
                            (value) => {
                                this.setState({
                                    listType: value
                                });
                            }
                        }>
                        {/* 0:全部类型 1:通用价格 2:特殊价格 3:促销价格 */}
                        <Option value={0}>全部</Option>
                        <Option value={1}>我方发起</Option>
                        <Option value={2}>对方发起</Option>
                    </Select>
                    <Select
                        defaultValue={0}
                        style={{ width: 150, height: 40, fontSize: "14px", marginRight: 8, marginLeft: 8 }}
                        value={this.state.status}
                        size="large"
                        onChange={
                            (value) => {
                                this.setState({
                                    status: value
                                });
                            }
                        }>
                        {/* 合同状态 0全部，1待提交，2我方待签署，3对方待签署，4我方拒签，5对方拒签，6已完成签署(线上) */}
                        <Option value={0}>全部状态</Option>
                        <Option value={1}>待提交</Option>
                        <Option value={2}>待我方签署</Option>
                        <Option value={3}>待对方签署</Option>
                        <Option value={4}>我方拒签</Option>
                        <Option value={5}>对方拒签</Option>
                        <Option value={6}>已完成签署(线上)</Option>
                    </Select>

                    <Button type="primary"
                        style={{
                            width: "80px",
                            height: "40px",
                            // lineHeight: '40px',
                            fontSize: "16px",
                            margin: "0px 16px 0px 0px",
                            borderRadius: "6px",
                        }}
                        onClick={() => {
                            this.current = 1;
                            this.requestList();
                        }}
                    >搜索</Button>
                    <Button
                        style={{ width: 96, height: 40, fontSize: 16, verticalAlign: "bottom" }}
                        onClick={() => {
                            this.current = 1;
                            this.setState({
                                startTime: "",
                                endTime: "",
                                keyWord: "",
                                status: 0,
                                listType: 0
                            }, () => {
                                this.requestList();
                            });
                        }}
                    >
                        重置
                    </Button>
                </div>
                {/* 搜索 */}

                <SWTable
                    rowKey="pricePolicySn"
                    columns={this.#columns}
                    dataSource={this.state.data}
                    pagination={
                        {
                            total: this.total,
                            current: this.current,
                            pageSize: this.pageSize,
                            onChange: (current, b) => {
                                this.current = current;
                                this.requestList();
                            },
                            showTotal: (total, range) => `共有${total}条`
                        }
                    }
                />

            </ViewCoat>
        );
    }
}
