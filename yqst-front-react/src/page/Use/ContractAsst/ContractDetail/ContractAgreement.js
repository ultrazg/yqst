/*
 * @Description  : 合同确定签署
 * @version      : 0.1
 * @Author       : Chenglin Huang
 * @Date         : 2021-05-14 10:26:51
 * @LastEditTime : 2021-05-14 17:54:45
 */

import React, { Component, createRef } from "react";
import { Form, Checkbox, Modal, Button, Input, message } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import request from "../../../../utils/request/request";
import apiInterfaces from "../apiInterfaces";
import PDFViewer from "SWViews/renderPDF";


export default class ContractAgreement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            isModalVisible: false,
            isLoading: false,
            isCheckcodeLoading: false,
            waitTime: 0, // 发送验证码后的等待时间
        };
        this.sn = (this.props.location.search && new URLSearchParams(this.props.location.search).get("sn")) || "";
        this.readedFormRef = createRef();
        this.formRef = createRef();
    }

    componentDidMount() {
        this.requestDetail();
    }

    requestDetail() {
        request(
            apiInterfaces.contractInfo,
            { sn: this.sn },
            (res) => {
                this.setState({
                    data: res.data
                });
            },
            (err) => {
                console.warn(err);
            }
        );
    }
    requestSendCode(phone) {
        return new Promise((resolve, reject) => {
            request(
                apiInterfaces.contractSendCode,
                {
                    mobile: phone,
                },
                (res) => {
                    resolve(res);
                },
                (err) => {
                    reject(err);
                },
                false,
            );
        });
    }
    requestSign(code) {
        this.setState({
            isLoading: true
        });
        request(
            apiInterfaces.contractSign,
            {
                sn: this.sn,
                code,
                party: this.state.data.party,
                phone: this.state.data.eSignMobile,
            },
            (res) => {
                message.success("合同签署成功！");
                this.props.history.replace(
                    {
                        pathname: "/pages/appCenter/contractAsst/contractAsstHome/contractDetailIndex",
                        search: `?sn=${this.sn}`
                    }
                );
            },
            (err) => {
                this.setState({
                    isLoading: false,
                });
                console.warn(err);
            }
        );
    }

    setWaitTimeInterval() {
        this.waitTimeInterval = setInterval(() => {
            if(this.state.waitTime === 0) {
                clearInterval(this.waitTimeInterval);
                return;
            }
            this.setState({ waitTime: this.state.waitTime - 1 });
        }, 1000);
    }

    render() {
        const { contractEnclosure, eSignMobile } = this.state.data;
        return (
            <div style={{ backgroundColor: "#fff", borderRadius: "6px", padding: "20px" }}>
                <div style={{ display: "flex" }}>
                    <div
                        style={{ alignItems: "center", fontSize: 16, userSelect: "none", cursor: "pointer" }}
                        onClick={
                            () => {
                                this.props.history.goBack();
                            }
                        }
                    >
                        <LeftOutlined />返回
                    </div>
                    <h2 style={{ marginBottom: "20px", textAlign: "center", flex: 1 }}>合同审签</h2>
                </div>
                <div style={{ width: 1010 }}>
                    <PDFViewer url={window.getOrginUrl(contractEnclosure)} width={1000} height={500} />
                </div>
                <Form
                    ref={this.readedFormRef}
                >
                    <Form.Item
                        name="agreement"
                        valuePropName="checked"
                        rules={[{
                            validator: (rule, value) => {
                                if (!value) {
                                    return Promise.reject("请勾选“已阅读并同意审签”！");
                                } else {
                                    return Promise.resolve();
                                }
                            }
                        }]}
                    >
                        <Checkbox>
                            已阅读并同意审签
                        </Checkbox>
                    </Form.Item>
                    <Button
                        size="large"
                        type="primary"
                        onClick={
                            () => {
                                this.readedFormRef.current.validateFields()
                                    .then(() => {
                                        this.setState({
                                            isModalVisible: true,
                                        });
                                    })
                                    .catch((err) => {
                                        console.warn(err);
                                    });
                            }
                        }
                    >确认审签</Button>
                </Form>
                <Modal
                    title="短信验证"
                    visible={this.state.isModalVisible}
                    onOk={() => {
                        this.formRef.current.validateFields()
                            .then(({ code }) => {
                                this.requestSign(code);
                            })
                            .catch((err) => {
                                console.warn(err);
                            });
                    }}
                    confirmLoading={this.state.isLoading}
                    onCancel={() => {
                        this.setState({
                            isModalVisible: false
                        });
                    }}
                >
                    <Form
                        ref={this.formRef}
                    >
                        <Form.Item>
                            <Form.Item
                                name="code"
                                noStyle
                                rules={
                                    [
                                        { required: true, message: "请输入验证码！" }
                                    ]
                                }
                            >
                                <Input placeholder="请输入验证码" allowClear style={{ width: 300 }} />
                            </Form.Item>
                            <Button
                                type="primary"
                                style={{ width: 100 }}
                                loading={this.state.isCheckcodeLoading}
                                disabled={this.state.waitTime}
                                onClick={
                                    () => {
                                        this.setState({
                                            isCheckcodeLoading: true
                                        });
                                        this.requestSendCode(eSignMobile)
                                            .then(() => {
                                                message.success("发送成功，请注意验收");
                                                this.setState({
                                                    isCheckcodeLoading: false,
                                                    waitTime: 60,
                                                }, () => {
                                                    this.setWaitTimeInterval();
                                                });
                                            })
                                            .catch(() => {
                                                this.setState({
                                                    isCheckcodeLoading: false
                                                });
                                            });
                                    }
                                }
                            >
                                获取验证码
                                {
                                    this.state.waitTime ?
                                        <>
                                            ({this.state.waitTime})
                                        </> :
                                        null
                                }
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}
