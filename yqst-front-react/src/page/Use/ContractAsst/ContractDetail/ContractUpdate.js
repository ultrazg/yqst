/*
 * @Description  : 合同修改
 * @version      : 0.1
 * @Author       : Chenglin Huang
 * @Date         : 2021-05-17 17:13:20
 * @LastEditTime : 2021-05-18 17:43:37
 */
import React, { Component, createRef } from "react";
import ViewCoat from "../../PublicModule/ViewCoat/ViewCoat";
import { InboxOutlined } from "@ant-design/icons";
import { Form, Input, Select, Upload, Button, message } from "antd";
import request from "../../../../utils/request/request";
import apiInterfaces from "../apiInterfaces";
import styles from "../Contract.module.css";
import ApiConst from "../../../../base/urls/ApiConst";
import PublicParams from "../../../../base/publicparams/PublicParams";
import PdfModalViewer from "SWViews/renderPDF/PdfModalViewer";

const { Option } = Select;

export default class ContractUpdate extends Component {

    #layout = {
        // labelCol: { span: 8 },
        wrapperCol: { span: 10 },
    };

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            typelist: [],
            loading: false,
        };
        this.sn = (this.props.location.search && new URLSearchParams(this.props.location.search).get("sn")) || "";
        this.formRef = createRef();
    }

    componentDidMount() {
        this.requestTypeList();
        this.requestDetail();
    }

    requestDetail() {
        request(
            apiInterfaces.contractInfo,
            {
                sn: this.sn
            },
            ({ data }) => {
                let oldValues = {
                    contractName: data.contractName,
                    contractType: data.typeSn,
                    contractEnclosure: [
                        {
                            name: data.contractEnclosureName || "合同附件",
                            response: {
                                data: {
                                    url: data.contractEnclosure,
                                }
                            },
                        }
                    ],
                    contractFirstPartyLegalPerson: data.contractFirstPartyLegalPerson,
                    contractSecondPartyLegalPerson: data.contractSecondPartyLegalPerson,
                    contractFirstPartyPhone: data.contractFirstPartyPhone,
                    contractSecondPartyPhone: data.contractSecondPartyPhone,
                    contractFirstPartyAddress: data.contractFirstPartyAddress,
                    contractSecondPartyAddress: data.contractSecondPartyAddress
                };
                this.formRef.current.setFieldsValue(oldValues);
                this.setState({
                    data,
                });
            },
            (err) => {
                console.log(err);
            }
        );
    }

    requestTypeList() {
        request(
            apiInterfaces.contractAsstTypeList,
            {},
            (res) => {
                this.setState({
                    typelist: res.data
                });
            },
            (err) => {
                console.warn(err);
            }
        );
    }

    onFinish(values) {
        this.setState({
            loading: true
        });
        request(
            apiInterfaces.contractUpdate,
            {
                sn: this.sn,
                contractSn: this.state.data.contractSn,
                type: this.state.data.type,
                typeSn: values.contractType,
                contractName: values.contractName,
                contractEnclosureName: values.contractEnclosure[0].name,
                contractEnclosure: values.contractEnclosure[0].response.data.url,
                contractFirstPartyAddress: values.contractFirstPartyAddress,
                contractFirstPartyLegalPerson: values.contractFirstPartyLegalPerson,
                contractFirstPartyPhone: values.contractFirstPartyPhone,
                contractSecondPartyAddress: values.contractSecondPartyAddress,
                contractSecondPartyLegalPerson: values.contractSecondPartyLegalPerson,
                contractSecondPartyPhone: values.contractSecondPartyPhone,
            },
            (res) => {
                message.success("修改成功！");
                this.setState({
                    loading: false
                });
                this.props.history.goBack();
            },
            (err) => {
                console.warn(err);
                this.setState({
                    loading: false
                });
            }
        );
    }

    normFile(e) {

        if (Array.isArray(e)) {
            return e;
        }

        return e && e.fileList;
    };

    render() {
        return (
            <ViewCoat
                breadCrumb={[
                    { title: "合同助手" },
                    { title: "合同管理" },
                    { title: "合同详情" },
                    { title: "合同编辑" },
                ]}
            >
                <Form
                    {...this.#layout}
                    ref={this.formRef}
                    requiredMark={false}
                    onFinish={(values) => this.onFinish(values)}
                >
                    <Form.Item
                        label={
                            <span className={styles.label}>
                                合同编号
                            </span>
                        }
                        className={styles.formitem}
                    >
                        <p style={{ lineHeight: "32px" }}>{this.state.data.contractSn}</p>
                    </Form.Item>
                    <Form.Item
                        name="contractName"
                        label={
                            <span className={styles.label}>
                                合同名称
                            </span>
                        }
                        rules={[{ required: true, message: "请填写合同名称!" }]}
                        className={styles.formitem}
                    >
                        <Input size="large" allowClear maxLength={30} />
                    </Form.Item>
                    <Form.Item
                        name="contractType"
                        label={
                            <span className={styles.label}>
                                合同类型
                            </span>
                        }
                        rules={[{ required: true, message: "请选择类型!" }]}
                        className={styles.formitem}
                    >
                        <Select
                            size="large"
                            placeholder="请选择"
                            style={{ width: 100 }}
                            allowClear
                        >
                            {
                                this.state.typelist.map(
                                    item => {
                                        return (
                                            <Option value={item.sn} key={item.sn}>
                                                {item.typeName}
                                            </Option>
                                        );
                                    }
                                )
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label={
                            <span className={styles.label}>
                                合同附件
                            </span>
                        }
                        className={styles.formitem}
                    >
                        <Form.Item
                            name="contractEnclosure"
                            valuePropName="fileList"
                            getValueFromEvent={this.normFile}
                            noStyle
                            rules={[
                                { required: true, message: "请上传合同附件!" },
                                {
                                    validator: (rule, value) => {
                                        if (value) {
                                            for (let i = 0; i < value.length; i++) {
                                                if (value[i].size > 33554432) {
                                                    // 单个文件大于32M
                                                    return Promise.reject("单个文件不能大于32M!");
                                                }
                                            }
                                        }
                                        return Promise.resolve("");
                                    }
                                },
                            ]}
                        >
                            <Upload.Dragger
                                name="file"
                                maxCount={1}
                                accept=".pdf"
                                action={ApiConst.Versions().sunaw + apiInterfaces.uploadFile}
                                data={{
                                    sessionKey: PublicParams().sessionKey
                                }}
                                onPreview={
                                    (file) => {
                                        if (!file.response || !file.response.data) {
                                            return;
                                        }
                                        const url = file.response.data.url;
                                        this.setState({
                                            pdfUrl: window.getOrginUrl(url)
                                        }, () => {
                                            this.setState({ isModalVisible: true });
                                        });
                                    }
                                }
                            >
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">点击选择文件或拖拽文件到此区域中</p>
                                <p className="ant-upload-hint">仅支持上传单个32M以下的pdf文件</p>
                                <p className="ant-upload-hint">合同附件甲方盖章处请标明“盖章1”乙方盖章处请标明“盖章2”否则可能无法盖章</p>
                            </Upload.Dragger>
                        </Form.Item>
                    </Form.Item>

                    <h2 className={styles.smalltitle}> 甲方信息 </h2>

                    <Form.Item
                        name="contractFirstPartyLegalPerson"
                        label={
                            <span className={styles.label}>
                                法人代表
                            </span>
                        }
                        className={styles.formitem}
                    >
                        <Input size="large" allowClear maxLength={30} />
                    </Form.Item>

                    <Form.Item
                        name="contractFirstPartyPhone"
                        label={
                            <span className={styles.label}>
                                联系方式
                            </span>
                        }
                        className={styles.formitem}
                        rules={[
                            {
                                pattern: /^\d*$/,
                                message: "联系方式只接受数字输入！"
                            },
                            {
                                validator: (_, value) => {
                                    if (value) {
                                        if (value.length >= 3 && value.length <= 20) {
                                            return Promise.resolve();
                                        } else {
                                            return Promise.reject("请填写3到20位的联系号码！");
                                        }
                                    } else {
                                        return Promise.resolve();
                                    }
                                }
                            }
                        ]}
                    >
                        <Input size="large" allowClear maxLength={30} />
                    </Form.Item>

                    <Form.Item
                        name="contractFirstPartyAddress"
                        label={
                            <span className={styles.label}>
                                联系地址
                            </span>
                        }
                        className={styles.formitem}
                    >
                        <Input size="large" allowClear maxLength={30} />
                    </Form.Item>

                    <h2 className={styles.smalltitle}> 乙方信息 </h2>

                    <Form.Item
                        name="contractSecondPartyLegalPerson"
                        label={
                            <span className={styles.label}>
                                法人代表
                            </span>
                        }
                        className={styles.formitem}
                    >
                        <Input size="large" allowClear maxLength={30} />
                    </Form.Item>

                    <Form.Item
                        name="contractSecondPartyPhone"
                        label={
                            <span className={styles.label}>
                                联系方式
                            </span>
                        }
                        className={styles.formitem}
                    >
                        <Input size="large" allowClear maxLength={30} />
                    </Form.Item>

                    <Form.Item
                        name="contractSecondPartyAddress"
                        label={
                            <span className={styles.label}>
                                联系地址
                            </span>
                        }
                        className={styles.formitem}
                    >
                        <Input size="large" allowClear maxLength={30} />
                    </Form.Item>

                    <Button
                        size="large"
                        htmlType="submit"
                        type="primary"
                        style={{ margin: 10 }}
                        loading={this.state.loading}
                    >
                        保存
                    </Button>
                    <Button 
                        size="large" 
                        style={{ margin: 10 }}
                        onClick={
                            () => {
                                this.props.history.goBack();
                            }
                        }
                    >返回</Button>
                </Form>
                <PdfModalViewer visible={this.state.isModalVisible} url={this.state.pdfUrl} onCancel={() => this.setState({ isModalVisible: false })} />
            </ViewCoat>
        );
    }
}