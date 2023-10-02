/* eslint-disable jsx-a11y/anchor-is-valid */
/*
 * @Description  : 
 * @version      : 0.1
 * @Author       : Chenglin Huang
 * @Date         : 2021-05-10 15:35:44
 * @LastEditTime : 2021-05-18 17:44:39
 */

import React, { Component, createRef } from "react";
import { Descriptions, Button, Popover, Timeline, Modal, message, Form, Input } from "antd";
import ViewCoat from "../../PublicModule/ViewCoat/ViewCoat";
import request from "../../../../utils/request/request";
import apiInterfaces from "../apiInterfaces";
import moment from "moment";
import styles from "../Contract.module.css";
import PdfModalViewer from "SWViews/renderPDF/PdfModalViewer";


export default class ContractDetailIndex extends Component {

    constructor(props) {
        super(props);
        this.sn = (this.props.location.search && new URLSearchParams(this.props.location.search).get("sn")) || "";
        this.state = {
            data: {},
            isPdfModalVisible: false,
            pdfurl: "",
            isLoading: false,
            isSubmitModalVisible: false,
            isDeleteModalVisible: false,
            isRejectModalVisible: false,
        };
        this.rejectFormRef = createRef();
        this.requestDetail();
    }

    styles = {
        icon: { width: "32px", height: "32px", marginLeft: 8, marginRight: 8, userSelect: "none" },
        descriptionsLabel: { fontWeight: 500, fontSize: 14, color: "#2B3441" },
        descriptionsContent: { fontWeight: 500, fontSize: 14, color: "#2C3440" },
    };

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

    requestSubmit() {
        this.setState({
            isLoading: true
        });
        request(
            apiInterfaces.contractSubmit,
            { sn: this.sn },
            (res) => {
                message.success("合同提交成功！");
                this.setState({
                    isLoading: false,
                    isSubmitModalVisible: false,
                });
                this.requestDetail();
            },
            (err) => {
                this.setState({
                    isLoading: false
                });
                console.warn(err);
            }
        );
    }

    requestDelete() {
        this.setState({
            isLoading: true
        });
        request(
            apiInterfaces.contractDelete,
            { sn: this.sn },
            (res) => {
                message.success("删除成功！");
                this.setState({
                    isLoading: false,
                    isDeleteModalVisible: false,
                });
                if (this.state.data.type === 1) {
                    this.props.history.push(
                        {
                            pathname: "/pages/appCenter/contractAsst/contractAsstHome/contractManageIndex",
                        }
                    );
                } else {
                    this.props.history.push(
                        {
                            pathname: "/pages/appCenter/contractAsst/contractAsstHome/contractArchiveIndex",
                        }
                    );
                }
            },
            (err) => {
                this.setState({
                    isLoading: false
                });
                console.warn(err);
            }
        );
    }

    requestReject(reason) {
        this.setState({
            isLoading: true
        });
        request(
            apiInterfaces.contractReject,
            {
                sn: this.sn,
                remark: reason,
            },
            (res) => {
                this.setState({
                    isLoading: false,
                    isRejectModalVisible: false,
                });
                this.requestDetail();
            },
            (err) => {
                this.setState({
                    isLoading: false
                });
                console.warn(err);
            }
        );
    }

    getTypeName(type) {
        switch (type) {
            case 1:
                return "线上合同";
            case 2:
                return "线下合同";
            default:
                break;
        }
    }

    getstateName() {
        const { state, isInitiator } = this.state.data;
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
                return isInitiator ? "我方拒签" : "对方拒签";
            case 104:
                //isInitiator是否发起方 是-未签 否-已签
                // return '待发起方签署合同';
                return isInitiator ? "待我方签署" : "待对方签署";
            case 105:
                //isInitiator是否发起方 是-对方拒绝 否-我方拒绝
                // return '签署方驳回合同';
                return isInitiator ? "对方拒签" : "我方拒签";
            case 106:
                //isInitiator是否发起方 是-已签 否-未签
                // return '发起方签署合同';
                return isInitiator ? "待对方签署" : "待我方签署";
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

    render() {

        const {
            state,
            createTime,
            contractSn,
            sn,
            contractName,
            typeName,
            type,
            visaCompany,
            visaRemark,
            contractFirstPartyCompanyName,
            contractFirstPartyLegalPerson,
            contractFirstPartyPhone,
            contractFirstPartyAddress,
            contractSecondPartyCompanyName,
            contractSecondPartyLegalPerson,
            contractSecondPartyPhone,
            contractSecondPartyAddress,
            contractEnclosure,
            contractEnclosureName,
            operationLogListVO,
            isInitiator,
        } = this.state.data;
        return (
            <ViewCoat
                breadCrumb={[
                    { title: "合同助手" },
                    { title: "合同管理" },
                    {
                        title: "合同详情"
                    },
                ]}
            >
                <h2 className={styles.smalltitle}> 基本信息 </h2>
                <Descriptions contentStyle={this.styles.descriptionsContent} labelStyle={this.styles.descriptionsLabel}>
                    {
                        type === 1 ?
                            <Descriptions.Item label="合同状态">
                                {this.getstateName()}
                            </Descriptions.Item> :
                            null
                    }
                    <Descriptions.Item label="合同ID">
                        {sn}
                    </Descriptions.Item>
                    <Descriptions.Item label="合同编号">
                        {contractSn}
                    </Descriptions.Item>
                    <Descriptions.Item label="合同名称">
                        {contractName}
                    </Descriptions.Item>
                    <Descriptions.Item label="合同类型">
                        {typeName}
                    </Descriptions.Item>
                    <Descriptions.Item label="类型">
                        {this.getTypeName(type)}
                    </Descriptions.Item>
                    <Descriptions.Item label="创建时间" span={state === 105 || state === 103 ? 1 : 3}>
                        {moment(createTime).format("YYYY-MM-DD HH:mm")}
                    </Descriptions.Item>
                    {
                        state === 105 || state === 103 ?
                            <>
                                <Descriptions.Item label="拒签方">
                                    {visaCompany}
                                </Descriptions.Item>
                                <Descriptions.Item label="拒签理由">
                                    {visaRemark}
                                </Descriptions.Item>
                            </> :
                            null
                    }
                    <Descriptions.Item label="甲方" span={3}>
                        <Popover
                            content={
                                <>
                                    <p>法人代表：{contractFirstPartyLegalPerson}</p>
                                    <p>联系电话：{contractFirstPartyPhone}</p>
                                    <p>联系地址：{contractFirstPartyAddress}</p>
                                </>
                            }
                            title="甲方信息"
                            trigger="click"
                        >
                            <a>{contractFirstPartyCompanyName}</a>
                        </Popover>
                    </Descriptions.Item>
                    <Descriptions.Item label="乙方" span={3}>
                        <Popover
                            content={
                                <>
                                    <p>法人代表：{contractSecondPartyLegalPerson}</p>
                                    <p>联系电话：{contractSecondPartyPhone}</p>
                                    <p>联系地址：{contractSecondPartyAddress}</p>
                                </>
                            }
                            title="乙方信息"
                            trigger="click"
                        >
                            <a>{contractSecondPartyCompanyName}</a>
                        </Popover>
                    </Descriptions.Item>
                    <Descriptions.Item label="合同附件" span={3}>
                        <a
                            onClick={
                                () => {
                                    this.setState({
                                        pdfUrl: window.getOrginUrl(contractEnclosure),
                                    }, () => {
                                        this.setState({ isPdfModalVisible: true });
                                    });
                                }
                            }
                        >
                            {contractEnclosureName || "合同附件.pdf"}
                        </a>
                    </Descriptions.Item>
                </Descriptions>

                {
                    type === 1 ?
                        <>
                            <h2 className={styles.smalltitle}> 操作记录 </h2>
                            <div style={{ display: "flex", maxHeight: 600, overflow: "auto", paddingBlock: 30 }}>
                                <Timeline mode="left">
                                    {
                                        operationLogListVO && operationLogListVO.map((item) => {
                                            return (
                                                <Timeline.Item>
                                                    <p>{item.operationLog}</p>
                                                    <p style={{ width: 500 }}>操作方：{item.operationObject}</p>
                                                    <p>操作人：{item.operationStaff}</p>
                                                    <p>操作时间：{moment(item.operationTime).format("YYYY-MM-DD HH:mm")}</p>
                                                </Timeline.Item>
                                            );
                                        })
                                    }
                                </Timeline>
                            </div>
                        </> :
                        null
                }

                {
                    state === 101 ?
                        <Button
                            size="large"
                            type="primary"
                            style={{ margin: 10 }}
                            onClick={() => {
                                this.setState({ isSubmitModalVisible: true });
                            }}
                        >
                            提交
                        </Button> :
                        null
                }
                {
                    state === 101 || type === 2 ?
                        <Button
                            size="large"
                            style={{ margin: 10 }}
                            onClick={() => {
                                this.props.history.push({
                                    pathname: "/pages/appCenter/contractAsst/contractAsstHome/contractUpdate",
                                    search: `?sn=${this.sn}`
                                });
                            }}
                        >
                            编辑
                        </Button> :
                        null
                }
                {
                    state === 101 || type === 2 ?
                        <Button
                            size="large"
                            danger
                            style={{ margin: 10 }}
                            onClick={() => {
                                this.setState({ isDeleteModalVisible: true });
                            }}
                        >
                            删除
                        </Button> : null
                }

                {
                    state === 108 || (state === 104 && isInitiator) || (state === 106 && !isInitiator) ?
                        <>
                            <Button
                                size="large"
                                type="primary"
                                style={{ margin: 10 }}
                                onClick={() => {
                                    this.props.history.push(
                                        {
                                            pathname: "/pages/appCenter/contractAsst/contractAsstHome/contractAgreement",
                                            search: `?sn=${this.sn}`
                                        }
                                    );
                                }}
                            >
                                合同签署
                            </Button>
                            <Button
                                size="large"
                                danger
                                style={{ margin: 10 }}
                                onClick={() => {
                                    this.setState({ isRejectModalVisible: true });
                                }}
                            >
                                拒签
                            </Button>
                        </> : null
                }
                <PdfModalViewer visible={this.state.isPdfModalVisible} url={this.state.pdfUrl} onCancel={() => this.setState({ isPdfModalVisible: false })} />
                <Modal
                    title="确认提交"
                    visible={this.state.isSubmitModalVisible}
                    onOk={() => {
                        this.requestSubmit();
                    }}
                    confirmLoading={this.state.isLoading}
                    onCancel={() => {
                        this.setState({
                            isSubmitModalVisible: false
                        });
                    }}
                >
                    <p>是否确认提交？</p>
                </Modal>
                <Modal
                    title="确认删除"
                    visible={this.state.isDeleteModalVisible}
                    onOk={() => {
                        this.requestDelete();
                    }}
                    confirmLoading={this.state.isLoading}
                    onCancel={() => {
                        this.setState({
                            isDeleteModalVisible: false
                        });
                    }}
                >
                    <p>是否确认删除？</p>
                </Modal>
                <Modal
                    title="确认拒签"
                    visible={this.state.isRejectModalVisible}
                    onOk={() => {
                        this.rejectFormRef.current.validateFields()
                            .then(({ reason }) => {
                                this.requestReject(reason);
                            })
                            .catch((err) => {
                                console.warn(err);
                            });
                    }}
                    confirmLoading={this.state.isLoading}
                    onCancel={() => {
                        this.setState({
                            isRejectModalVisible: false
                        });
                    }}
                >
                    <Form
                        ref={this.rejectFormRef}
                    >
                        <Form.Item
                            name="reason"
                            rules={
                                [{ required: true, message: "请填写拒签理由！" }]
                            }
                        >
                            <Input.TextArea placeholder="请填写拒签理由！" />
                        </Form.Item>
                    </Form>
                </Modal>
            </ViewCoat>
        );
    }
}
