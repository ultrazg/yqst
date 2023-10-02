/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Card, Button, Input, DatePicker, Select } from "antd";
import SWTable from "SWViews/table";
import Model from "./CertificateCenterModel";
import moment from "moment";
import print from "print-js";
import PdfModalViewer from "SWViews/renderPDF/PdfModalViewer";

const { RangePicker } = DatePicker;
const { Option } = Select;

class CertificateCenterList extends Component {
    constructor(props) {
        super(props);
        this.pageSize = 10;
        this.current = 1;
        this.sortType = 2;
        // 表格样式
        this.columns = [
            {
                title: "业务单号",
                key: "busId",
                dataIndex: "busId"
            },
            {
                title: "业务类型",
                key: "businessType",
                dataIndex: "businessType",
                render: (text) => {
                    // 1.结算单;2.租赁发货单;3.租赁进场单; 4.租赁回收单;5.租赁退场单;6.物流提货单;7.物流运输单;8.维保订单
                    switch (text) {
                        case 1:
                            return "结算单";
                        case 2:
                            return "租赁发货单";
                        case 3:
                            return "租赁进场单";
                        case 4:
                            return "租赁回收单";
                        case 5:
                            return "租赁退场单";
                        case 6:
                            return "物流提货单";
                        case 7:
                            return "物流运输单";
                        case 8:
                            return "维保订单";
                        default:
                            break;
                    }
                }
            },
            {
                title: "创建时间",
                key: "createTime",
                dataIndex: "createTime",
                sorter: true,
                render: (text) => {
                    if (text) {
                        return moment(text).format("YYYY-MM-DD hh:mm:ss");
                    } else {
                        return "";
                    }
                },
            },
            {
                title: "",
                key: "",
                dataIndex: "",
                width: 120,
                render: (text, record) => {

                    let PDFfile = record.signFilePath;
                    return <div>
                        {
                            PDFfile !== "" ?
                                <span>
                                    <a
                                        onClick={() => {
                                            this.setState({
                                                pdfUrl: window.getOrginUrl(PDFfile),
                                            }, () => {
                                                this.setState({
                                                    isModalVisible: true,
                                                });
                                            });
                                        }}
                                    >
                                        查看
                                    </a>
                                    |
                                    <a
                                        href={window.getOrginUrl(PDFfile)}
                                        download
                                    >
                                        下载
                                    </a>
                                    |
                                    <a
                                        onClick={() => {
                                            this.printPDFFile(window.getOrginUrl(PDFfile));
                                        }}
                                    >
                                        打印
                                    </a>
                                </span> :
                                <span>暂无文件</span>
                        }
                    </div>;
                }
            },
        ];
        this.state = {
            data: [],
            isModalVisible: false,
            pdfUrl: "",
            startTime: "",
            endTime: "",
            total: 0,
            keyWord: "",
            businessType: 0
        };
    }

    componentDidMount() {
        this.requestCertificateCenterList();
    }

    componentWillUnmount() {

    }

    requestCertificateCenterList() {
        Model.CertificateCenterList({
            current: this.current,
            pageSize: this.pageSize,
            endTime: this.state.endTime,
            startTime: this.state.startTime,
            sortType: this.sortType,
            keyWord: this.state.keyWord,
            businessType: this.state.businessType
        }, (res) => {
            this.setState({
                data: res.data.records || [],
                total: res.data.total
            });
        }, (err) => {
        });
    }

    printPDFFile(url) {
        print({
            printable: url,
            showModal: true,
            modalMessage: "正在处理，请稍等..."
        });
    }

    render() {
        return (
            <>
                <Card bodyStyle={{ padding: 0 }} style={{ padding: "36px 24px", borderRadius: "6px" }}>
                    <h1
                        style={{
                            margin: 0,
                            fontSize: "24px",
                            fontWeight: 500,
                            lineHeight: "33px",
                            color: "#2B3441"
                        }}
                    >
                        存证列表
                    </h1>
                </Card>
                <div style={{ padding: "24px", borderRadius: "6px", marginTop: "24px", background: "#fff" }}>
                    {/* 搜索 */}
                    <div style={{ marginBottom: "24px" }}>
                        <div style={{ marginBottom: "12px" }}>
                            <label
                                style={{ fontSize: 14, lineHeight: "20px", marginRight: 8 }}
                            >
                                关键词 :
                                </label>
                            <Input
                                style={{ width: 272, height: 40, fontSize: "14px" }}
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
                            <label
                                style={{ fontSize: 14, lineHeight: "20px", marginRight: 8, marginLeft: 8 }}
                            >
                                业务类型 :
                                </label>
                            <Select
                                defaultValue={0}
                                style={{ width: 200, height: 40, fontSize: "14px" }}
                                value={this.state.businessType}
                                size="large"
                                onChange={
                                    // 1.结算单;2.租赁发货单;3.租赁进场单; 4.租赁回收单;5.租赁退场单;6.物流提货单;7.物流运输单;8.维保订单;0.全部
                                    (value) => {
                                        this.setState({
                                            businessType: value
                                        });
                                    }
                                }>
                                <Option value={0}>全部</Option>
                                <Option value={1}>结算单</Option>
                                <Option value={2}>租赁发货单</Option>
                                <Option value={3}>租赁进场单</Option>
                                <Option value={4}>租赁回收单</Option>
                                <Option value={5}>租赁退场单</Option>
                                <Option value={6}>物流提货单</Option>
                                <Option value={7}>物流运输单</Option>
                                <Option value={8}>维保订单</Option>
                            </Select>
                            <label style={{ fontSize: 14, lineHeight: "20px", marginRight: 8, marginLeft: 8 }}>创建时间 ：</label>
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
                                this.requestCertificateCenterList();
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
                                    businessType: 0
                                }, () => {
                                    this.requestCertificateCenterList();
                                });
                            }}
                        >
                            重置
                        </Button>
                    </div>
                    {/* 搜索 */}

                    <SWTable
                        columns={this.columns}
                        dataSource={this.state.data}
                        onChange={
                            (pagination, filters, sorter) => {
                                // 升序
                                if (sorter.order === "ascend") {
                                    this.sortType = 1;
                                    // 降序
                                } else if (sorter.order === "descend") {
                                    this.sortType = 2;
                                }
                                this.requestCertificateCenterList();
                            }
                        }
                        pagination={
                            {
                                total: this.state.total,
                                current: this.current,
                                pageSize: this.pageSize,
                                onChange: (current, b) => {
                                    this.current = current;
                                    this.requestCertificateCenterList();
                                },
                                showTotal: (total, range) => `共有${total}条`
                            }
                        }
                    />

                    <PdfModalViewer url={this.state.pdfUrl} visible={this.state.isModalVisible} onCancel={() => this.setState({ isModalVisible: false })} />
                </div>

            </>
        );
    }
}

export default CertificateCenterList;
