/* eslint-disable jsx-a11y/anchor-is-valid */
/*
 * @Description  : 政策列表
 * @version      : 0.1
 * @Author       : Chenglin Huang
 * @Date         : 2021-03-15 11:20:23
 * @LastEditTime : 2021-05-10 14:57:52
 */
import React, {Component} from "react";
import {Link} from "react-router-dom";
import ViewCoat from "../../PublicModule/ViewCoat/ViewCoat";
import {Button, Input, DatePicker, Modal, Select, Tooltip, Popover, Popconfirm} from "antd";
import SWTable from "SWViews/table";
import model from "./CarrierAsstExpressValueModel";
import moment from "moment";

const {RangePicker} = DatePicker;
const {Option} = Select;

export default class CarrierAsstExpressValuePolicyList extends Component {

    #columns = [
        {
            title: "价格政策编码",
            width: '10%',
            key: "pricePolicySn",
            dataIndex: "pricePolicySn"
        },
        {
            title: "名称",
            width: '10%',
            ellipsis: true,
            key: "pricePolicyName",
            dataIndex: "pricePolicyName"
        },
        {
            title: "类型",
            width: '10%',
            key: "pricePolicyType",
            dataIndex: "pricePolicyType",
            render: (text) => {
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
            }
        },
        {
            title: "面向客户",
            width: '10%',
            key: "customer",
            render: (text, record) => {
                if (record.isAllCustomer) {
                    return "全部客户";
                }
                const content = (
                    <div style={{maxHeight: "200px", overflow: "auto"}}>
                        {
                            record.customerList && record.customerList.map((item) => {
                                return (
                                    <p key={item.shipperCompanySn}>
                                        {item.shipperCompanyName}
                                    </p>
                                );
                            })
                        }
                    </div>
                );
                return (
                    <Popover content={content} title="客户列表" trigger="click">
                        <a>
                            {record.customerNum}个客户
                        </a>
                    </Popover>
                );
            }
        },
        {
            title: "状态",
            width: '10%',
            key: "pricePolicyStatus",
            dataIndex: "pricePolicyStatus",
            render: (text) => {
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
            }
        },
        {
            title: "有效时间",
            key: "effectiveTime",
            width: 150,
            render: (text, record) => {
                return (
                    <>
                        <div>
                            起：{record.effectiveStartTime}
                        </div>
                        <div>
                            止：{record.effectiveEndTime}
                        </div>
                    </>
                );
            }
        },
        {
            title: "",
            key: "",
            dataIndex: "",
            width: 200,
            render: (text, record) => {

                return <div>
                    {
                        <span>
                            <Link
                                style={{paddingInline: 5}}
                                to={{
                                    pathname: "/pages/appCenter/carrierAsst/carrierAsstHome/carrierAsstExpressValuePolicyDetail",
                                    search: `?sn=${record.pricePolicySn}`
                                }}>
                                查看
                            </Link>
                                |

                            {record.pricePolicyStatus === 4 ?
                                null :
                                <>
                                    <Link
                                        style={{paddingInline: 5}}
                                        to={{
                                            pathname: "/pages/appCenter/carrierAsst/carrierAsstHome/carrierAsstExpressValuePolicyUpdate",
                                            search: `?sn=${record.pricePolicySn}`
                                        }}>
                                        编辑
                                    </Link>
                                    |
                                </>
                            }
                            <a
                                style={{paddingInline: 5}}
                                onClick={
                                    () => {
                                        switch (record.pricePolicyStatus) {
                                            case 1:
                                                this.requestCarrierAsstExpressValuePolicySubmit(record.pricePolicySn).then(
                                                    () => {
                                                        // 重新请求
                                                        this.current = 1;
                                                        this.requestCarrierAsstExpressValuePolicyList();
                                                    }
                                                ).catch(
                                                    (err) => {
                                                        console.log(err);
                                                    }
                                                );
                                                break;
                                            case 2:
                                            case 5:
                                            case 6:
                                                this.requestCarrierAsstExpressValuePolicyEnable(record.pricePolicySn).then(
                                                    () => {
                                                        // 重新请求
                                                        this.requestCarrierAsstExpressValuePolicyList();
                                                    }
                                                ).catch(
                                                    (err) => {
                                                        console.log(err);
                                                    }
                                                );
                                                break;
                                            case 3:
                                            case 4:
                                                this.requestCarrierAsstExpressValuePolicyDisable(record.pricePolicySn).then(
                                                    () => {
                                                        // 重新请求
                                                        this.requestCarrierAsstExpressValuePolicyList();
                                                    }
                                                ).catch(
                                                    (err) => {
                                                        console.log(err);
                                                    }
                                                );
                                                break;
                                            default:
                                                break;
                                        }
                                    }
                                }
                            >
                                {
                                    function (pricePolicyStatus) {
                                        switch (pricePolicyStatus) {
                                            // 1:待提交 2:待启用 3:待执行 4:执行中 5:已停用 6:已失效
                                            case 1:
                                                return "提交";
                                            case 2:
                                            case 5:
                                            case 6:
                                                return "启用";
                                            case 3:
                                            case 4:
                                                return "停用";
                                            default:
                                                break;
                                        }
                                    }(record.pricePolicyStatus)
                                }
                            </a>
                                |
                            <Popconfirm
                                title="确定删除此项数据吗？"
                                onConfirm={() => {
                                    this.requestCarrierAsstExpressValuePolicyDelete(record.pricePolicySn).then(
                                        () => {
                                            // 重新请求
                                            this.requestCarrierAsstExpressValuePolicyList();
                                        }
                                    ).catch(
                                        (err) => {
                                            console.log(err);
                                        }
                                    );
                                }}
                                okText="确认"
                                cancelText="取消"
                            >
                                <a
                                    style={{paddingInline: 5, color: "#f50"}}
                                >
                                    删除
                                </a>
                            </Popconfirm>
                        </span>
                    }
                </div>;
            }
        }
    ]

    constructor(props) {
        super(props);
        this.pageSize = 10;
        this.current = 1;
        this.sortType = 2;
        this.selectedPolicyName = [];
        this.state = {
            data: [],
            isModalVisible: false,
            startTime: "",
            endTime: "",
            total: 0,
            selectedRowKeys: [],
            keyWord: "",
            pricePolicyType: 0,
            listType: 0
        };
    }

    componentDidMount() {
        this.requestCarrierAsstExpressValuePolicyList();
    }

    onSelectChange = (selectedRowKeys, selectedRows) => {
        // console.log('selectedRowKeys changed: ', selectedRowKeys, selectedRows);
        this.selectedPolicyName = selectedRows.map((item) => {
            return item.pricePolicyName;
        });
        this.setState({selectedRowKeys});
    };

    requestCarrierAsstExpressValuePolicyList() {
        model.CarrierAsstExpressValuePolicyList(
            {
                current: this.current,
                pageSize: this.pageSize,
                endTime: this.state.endTime,
                startTime: this.state.startTime,
                sortType: this.sortType,
                keyWord: this.state.keyWord,
                listType: this.state.listType,
                pricePolicyType: this.state.pricePolicyType
            },
            (res) => {
                this.setState({
                    data: res.data.records || [],
                    total: res.data.total
                });
            },
            (err) => {
            }
        );
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
                    reject(err);
                }
            );
        });
    }

    requestCarrierAsstExpressValuePolicySubmit(pricePolicySn) {
        return new Promise((resolve, reject) => {
            model.CarrierAsstExpressValuePolicySubmit(
                {
                    pricePolicySn
                },
                (res) => {
                    resolve(res);
                },
                (err) => {
                    reject(err);
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
                    reject(err);
                }
            );
        });
    }

    requestCarrierAsstExpressValuePolicyDelete(...rest) {
        return new Promise((resolve, reject) => {
            model.CarrierAsstExpressValuePolicyBatchDelete(
                {
                    pricePolicySnList: rest
                },
                (res) => {
                    resolve(res);
                },
                (err) => {
                    reject(err);
                }
            );
        });
    }

    render() {
        const {selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <ViewCoat
                breadCrumb={[
                    {title: "承运助手"},
                    {title: "物流价格"},
                    {
                        title: "物流价格政策列表",
                        link: "/pages/appCenter/carrierAsst/carrierAsstHome/carrierAsstExpressValuePolicyList"
                    }
                ]}
            >
                {/* 搜索 */}
                <div style={{marginBottom: "24px"}}>
                    <div style={{marginBottom: "12px"}}>
                        <label
                            style={{fontSize: 14, lineHeight: "20px", marginRight: 8}}
                        >
                            关键词 :
                        </label>
                        <Input
                            style={{width: 272, height: 40, fontSize: "14px"}}
                            value={this.state.keyWord}
                            placeholder={"请输入关键字"}
                            onChange={
                                e => {
                                    this.setState({
                                        keyWord: e.target.value
                                    });
                                }
                            }
                        />
                        <Select
                            defaultValue={0}
                            style={{width: 100, height: 40, fontSize: "14px", marginRight: 8, marginLeft: 8}}
                            value={this.state.pricePolicyType}
                            size="large"
                            onChange={
                                (value) => {
                                    this.setState({
                                        pricePolicyType: value
                                    });
                                }
                            }>
                            {/* 0:全部类型 1:通用价格 2:特殊价格 3:促销价格 */}
                            <Option value={0}>全部类型</Option>
                            <Option value={1}>通用价格</Option>
                            <Option value={2}>特殊价格</Option>
                            <Option value={3}>促销价格</Option>
                        </Select>
                        <Select
                            defaultValue={0}
                            style={{width: 100, height: 40, fontSize: "14px", marginRight: 8, marginLeft: 8}}
                            value={this.state.listType}
                            size="large"
                            onChange={
                                (value) => {
                                    this.setState({
                                        listType: value
                                    });
                                }
                            }>
                            {/* 价格政策状态 0:全部状态 1:待提交 2:待启用 3:待执行 4:执行中 5:已停用 6:已失效 */}
                            <Option value={0}>全部状态</Option>
                            <Option value={1}>待提交</Option>
                            <Option value={2}>待启用</Option>
                            <Option value={3}>待执行</Option>
                            <Option value={4}>执行中</Option>
                            <Option value={5}>已停用</Option>
                            <Option value={6}>已失效</Option>
                        </Select>
                        <label style={{fontSize: 14, lineHeight: "20px", marginRight: 8, marginLeft: 8}}>创建时间 ：</label>
                        <RangePicker
                            className={"RangePicker"}
                            value={[
                                this.state.startTime ? moment(this.state.startTime, "YYYY-MM-DD") : null,
                                this.state.endTime ? moment(this.state.endTime, "YYYY-MM-DD") : null
                            ]}
                            onChange={(date, dateString) => {
                                this.setState({
                                    startTime: dateString[0],
                                    endTime: dateString[1]
                                });
                            }}
                            style={{
                                flex: 1,
                                height: "40px",
                                lineHeight: "40px",
                                fontSize: "14px",
                            }}
                        />
                    </div>

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
                                this.requestCarrierAsstExpressValuePolicyList();
                            }}
                    >搜索</Button>
                    <Button
                        style={{width: 96, height: 40, fontSize: 16, verticalAlign: "bottom"}}
                        onClick={() => {
                            this.current = 1;
                            this.setState({
                                startTime: "",
                                endTime: "",
                                keyWord: "",
                                pricePolicyType: 0,
                                listType: 0
                            }, () => {
                                this.requestCarrierAsstExpressValuePolicyList();
                            });
                        }}
                    >
                        重置
                    </Button>
                    <Tooltip title="删除所选列表项" color="#f50">
                        <Button
                            style={{width: 96, height: 40, fontSize: 16, verticalAlign: "bottom", marginLeft: 16}}
                            onClick={() => {
                                if (this.state.selectedRowKeys.length === 0) {
                                    return;
                                }
                                this.modalText = (
                                    <ul>
                                        {
                                            this.selectedPolicyName.map((item) => {
                                                return (
                                                    <li style={{listStyle: "initial"}}>{item}</li>
                                                );
                                            })
                                        }
                                    </ul>
                                );
                                this.setState({
                                    isModalVisible: true
                                });
                            }}
                            danger
                        >
                            删除
                        </Button>
                    </Tooltip>
                </div>
                {/* 搜索 */}

                <SWTable
                    rowKey="pricePolicySn"
                    columns={this.#columns}
                    dataSource={this.state.data}
                    rowSelection={rowSelection}
                    pagination={
                        {
                            total: this.state.total,
                            current: this.current,
                            pageSize: this.pageSize,
                            onChange: (current, b) => {
                                this.current = current;
                                this.requestCarrierAsstExpressValuePolicyList();
                            },
                            showTotal: (total, range) => `共有${total}条`
                        }
                    }
                />

                <Modal
                    title={`确定删除下列数据吗?(共${this.selectedPolicyName.length}项)`}
                    visible={this.state.isModalVisible}
                    onOk={() => {
                        this.requestCarrierAsstExpressValuePolicyDelete(...this.state.selectedRowKeys).then(
                            () => {
                                this.requestCarrierAsstExpressValuePolicyList();
                                this.setState({
                                    isModalVisible: false
                                });
                            }
                        ).catch((err) => {
                            console.log(err);
                            this.setState({
                                isModalVisible: false
                            });
                        });
                    }}
                    onCancel={() => {
                        this.setState({
                            isModalVisible: false
                        });
                    }}
                >
                    <p>{this.modalText}</p>
                </Modal>

            </ViewCoat>
        );
    }
}
