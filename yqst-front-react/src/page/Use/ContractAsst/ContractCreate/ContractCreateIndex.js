/*
 * @Description  : 创建合同
 * @version      : 0.1
 * @Author       : Chenglin Huang
 * @Date         : 2021-05-08 09:55:05
 * @LastEditTime : 2021-07-05 11:27:27
 */

import React, { Component } from "react";
import { Form, Input, Select, Upload, Button, Radio, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import ViewCoat from "../../PublicModule/ViewCoat/ViewCoat";
import request from "../../../../utils/request/request";
import apiInterfaces from "../apiInterfaces";
import styles from "../Contract.module.css";
import ApiConst from "../../../../base/urls/ApiConst";
import PublicParams from "../../../../base/publicparams/PublicParams";
import CooperationCompanySelector from "./Components/CooperationCompanySelector";
import PdfModalViewer from "SWViews/renderPDF/PdfModalViewer";

const { Option } = Select;

export default class ContractCreateIndex extends Component {

    #layout = {
        // labelCol: { span: 8 },
        wrapperCol: { span: 10 },
    };

    state = {
        isModalVisible: false,
        pdfUrl: "",
        typelist: [],
        isLoading: false,
    }

    componentDidMount() {
        this.requestTypeList();
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

    normFile(e) {

        if (Array.isArray(e)) {
            return e;
        }

        return e && e.fileList;
    };

    onFinish(values) {

        this.setState({
            isLoading: true
        });

        const {
            contractName,
            contractSn,
            contractType: typeSn,
            cooperationType,
            type,
        } = values;

        const cooperationCompanySn = values.cooperationCompany.selectedCompany.cooperationCompanySn;

        const contractEnclosureName = values.contractEnclosure[0].name;
        const contractEnclosure = values.contractEnclosure[0].response.data.url;

        request(
            apiInterfaces.contractCreate,
            {
                contractName,
                contractSn,
                typeSn,
                cooperationType,
                cooperationCompanySn,
                contractEnclosureName,
                contractEnclosure,
                type,
            },
            (res) => {
                message.success("合同创建成功！");
                this.setState({
                    isLoading: false
                }, () => {
                    this.props.history.push(
                        {
                            pathname: "/pages/appCenter/contractAsst/contractAsstHome/contractDetailIndex",
                            search: `?sn=${res.data}`
                        }
                    );
                });
            },
            (err) => {
                console.log(err);
                this.setState({
                    isLoading: false
                });
            }
        );
    }

    render() {
        return (
            <ViewCoat
                breadCrumb={[
                    { title: "合同助手" },
                    {
                        title: "创建合同",
                    },
                ]}
            >
                <Form
                    {...this.#layout}
                    requiredMark={false}
                    onFinish={(values) => this.onFinish(values)}
                >
                    <Form.Item
                        name="type"
                        initialValue={2}
                        label={
                            <span className={styles.label}>
                                类型
                            </span>
                        }
                        rules={[{ required: true, message: "请选择类型!" }]}
                        className={styles.formitem}
                    >
                        <Radio.Group size="large">
                            {/*<Radio value={1}>*/}
                            {/*    <span className={styles.label}>*/}
                            {/*        线上合同*/}
                            {/*    </span>*/}
                            {/*</Radio>*/}
                            <Radio value={2}>
                                <span className={styles.label}>
                                    线下合同
                                </span>
                            </Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        name="contractSn"
                        label={
                            <span className={styles.label}>
                                合同编号
                            </span>
                        }
                        rules={[
                            { required: true, message: "请填写合同编号!" },
                            { pattern: /^[0-9a-zA-Z]*$/, message: "合同编号只能输入数字和英文字母!" }
                        ]}
                        className={styles.formitem}
                    >
                        <Input size="large" allowClear maxLength={30} />
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
                        rules={[{ required: true, message: "请选择合同类型!" }]}
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
                                <p className="ant-upload-hint">合同附件甲方盖章处请标明“甲方签名”乙方盖章处请标明“乙方签名”否则可能无法盖章</p>
                            </Upload.Dragger>
                        </Form.Item>
                    </Form.Item>

                    <h2 className={styles.smalltitle}> 选择合作方 </h2>

                    <Form.Item
                        name="cooperationType"
                        label={
                            <span className={styles.label}>
                                合作方类型
                            </span>
                        }
                        className={styles.formitem}
                        rules={[{ required: true, message: "请选择合作方类型!" }]}
                    >
                        <Radio.Group size="large">
                            <Radio value={1}>
                                <span className={styles.label}>
                                    甲方
                                </span>
                            </Radio>
                            <Radio value={2}>
                                <span className={styles.label}>
                                    乙方
                                </span>
                            </Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        name="cooperationCompany"
                        label={
                            <span className={styles.label}>
                                合作方
                            </span>
                        }
                        className={styles.formitem}
                        rules={
                            [{
                                validator: (_, value) => {
                                    if (value && value.selectedCompany) {
                                        return Promise.resolve();
                                    } else {
                                        return Promise.reject("请选择合作方!");
                                    }
                                }
                            }]
                        }
                    >
                        <CooperationCompanySelector />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" loading={this.state.isLoading} size="large" style={{ marginTop: 10 }}>
                        保存
                    </Button>
                </Form>

                <PdfModalViewer visible={this.state.isModalVisible} url={this.state.pdfUrl} onCancel={() => this.setState({ isModalVisible: false })} />
            </ViewCoat>
        );
    }
}
