/*
 * @Description  : 合同存档
 * @version      : 0.1
 * @Author       : Chenglin Huang
 * @Date         : 2021-05-12 10:35:25
 * @LastEditTime : 2021-07-05 11:26:22
 */
import React, { Component } from "react";
import ViewCoat from "../../PublicModule/ViewCoat/ViewCoat";
import { Button, Input, Select } from "antd";
import SWTable from "SWViews/table";
import request from "../../../../utils/request/request";
import apiInterfaces from "../apiInterfaces";
import { Link } from "react-router-dom";
import moment from "moment";

const { Option } = Select;

export default class ContractArchiveIndex extends Component {

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
            type: 2, // 1线上，2线下存档
            listType: 0, // 发起人类型
        };
    }

    componentDidMount() {
        this.requestList();
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
                    { title: "合同存档" }
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
