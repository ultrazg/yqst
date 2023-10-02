/*
 * @Description  : 
 * @version      : 0.1
 * @Author       : Chenglin Huang
 * @Date         : 2021-03-15 11:19:59
 * @LastEditTime : 2021-05-13 15:26:27
 */

import React, { Component } from "react";
import ViewCoat from "../../PublicModule/ViewCoat/ViewCoat";
import Model from "./CarrierAsstExpressValueModel";
import { Button, Input, Form, Select, DatePicker, Radio, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CustomerSelector from "./Components/CustomerSelector";
import ModelList from "./Components/ModelList";
import styles from "./ExpressValueForm.module.css";
import moment from "moment";

const { Option } = Select;
const { RangePicker } = DatePicker;

export default class CarrierAsstExpressValuePolicyAdd extends Component {

    #layout = {
        // labelCol: { span: 8 },
        wrapperCol: { span: 10 },
    };

    constructor(props) {
        super(props);
        this.formRef = React.createRef(null);
    }

    // 表单验证
    onFinish(values) {
        // console.log(values)

        const effectiveStartTime = moment(values.effectiveTime[0]).format("YYYY-MM-DD");
        const effectiveEndTime = moment(values.effectiveTime[1]).format("YYYY-MM-DD");

        const data = {
            pricePolicyName: values.pricePolicyName,
            pricePolicyType: values.pricePolicyType,
            effectiveStartTime,
            effectiveEndTime,
            isNotify: values.isNotify,
            isAllCustomer: values.customers.isAllCustomers ? 1 : 0,
            customerList: values.customers.selectedCustomers,
            modelList: values.modelList,
            // isSubmit: values.isSubmit ? 1 : 0
        };
        this.requestCarrierAsstExpressValuePolicyAdd(data).then(
            (res) => {
                message.success("添加成功！");
                this.props.history.push(
                    {
                        pathname: "/pages/appCenter/carrierAsst/carrierAsstHome/carrierAsstExpressValuePolicyDetail",
                        search: `?sn=${res.data}`
                    }
                );
            }
        );
    }

    // 立即提交
    onSubmit() {
        let values = {};

        if (this.formRef) {
            this.formRef.current.validateFields().then((vals) => {
                values = vals;
                const effectiveStartTime = moment(values.effectiveTime[0]).format("YYYY-MM-DD");
                const effectiveEndTime = moment(values.effectiveTime[1]).format("YYYY-MM-DD");

                const data = {
                    pricePolicyName: values.pricePolicyName,
                    pricePolicyType: values.pricePolicyType,
                    effectiveStartTime,
                    effectiveEndTime,
                    isNotify: values.isNotify,
                    isAllCustomer: values.customers.isAllCustomers ? 1 : 0,
                    customerList: values.customers.selectedCustomers,
                    modelList: values.modelList,
                    isSubmit: 1
                };
                this.requestCarrierAsstExpressValuePolicyAdd(data).then(
                    (res) => {
                        message.success("添加并提交成功！");
                        this.props.history.push(
                            {
                                pathname: "/pages/appCenter/carrierAsst/carrierAsstHome/carrierAsstExpressValuePolicyDetail",
                                search: `?sn=${res.data}`
                            }
                        );
                    }
                );
            }).catch((err) => {
                console.log(err);
                return;
            });
        } else {
            return;
        }
    }

    requestCarrierAsstExpressValuePolicyAdd(values) {
        console.log(values);
        return new Promise((resolve) => {
            Model.CarrierAsstExpressValuePolicyAdd(
                { ...values },
                (res) => {
                    resolve(res);
                }, (err) => {
                    console.log(err);
                }
            );
        });
    }

    render() {
        return (
            <ViewCoat
                breadCrumb={[
                    { title: "承运助手" },
                    { title: "物流价格" },
                    {
                        title: "创建物流价格政策",
                        link: {
                            pathname: "/pages/appCenter/carrierAsst/carrierAsstHome/carrierAsstExpressValuePolicyAdd",
                        }
                    },
                ]}
            >
                <Form
                    {...this.#layout}
                    ref={this.formRef}
                    requiredMark={false}
                    onFinish={(values) => this.onFinish(values)}
                >
                    <h2 className={styles.smalltitle}> 基本信息 </h2>

                    {
                        this.sn ?
                            (
                                <Form.Item
                                    label={
                                        <span className={styles.label}>
                                            价格政策编码
                                        </span>
                                    }
                                    className={styles.formitem}
                                    name="pricePolicySn"
                                >
                                    <p className={styles.text}>
                                        {this.sn}
                                    </p>
                                </Form.Item>
                            ) :
                            null
                    }

                    <Form.Item
                        label={
                            <span className={styles.label}>
                                价格政策类型
                            </span>
                        }
                        className={styles.formitem}
                        name="pricePolicyType"
                        rules={[{ required: true, message: "请选择价格政策类型!" }]}
                    >
                        <Select
                            size="large"
                            placeholder="请选择"
                        >
                            {/* 1:通用价格 2:特殊价格 3:促销价格 */}
                            <Option value={1}>通用价格</Option>
                            <Option value={2}>特殊价格</Option>
                            <Option value={3}>促销价格</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label={
                            <span className={styles.label}>
                                价格政策名称
                            </span>
                        }
                        className={styles.formitem}
                        rules={[{ required: true, message: "请填写价格政策名称!" }]}
                        name="pricePolicyName"
                    >
                        <Input size="large" allowClear maxLength={50} />
                    </Form.Item>

                    <Form.Item name="effectiveTime"
                        label={
                            <span className={styles.label}>
                                价格政策有效时间
                            </span>
                        }
                        className={styles.formitem}
                        rules={[
                            {
                                type: "array",
                                required: true,
                                message: "请选择有效时间!",
                            },
                        ]}>
                        <RangePicker separator="至" size="large" />
                    </Form.Item>

                    <Form.Item name="isNotify"
                        label={
                            <span className={styles.label}>
                                价格政策通知
                            </span>
                        }
                        rules={[{ required: true, message: "请选择是否发送通知!" }]}
                        className={styles.formitem}>
                        <Radio.Group size="large">
                            <Radio value={0}>
                                <span className={styles.label}>
                                    不发送通知
                                </span>
                            </Radio>
                            <Radio value={1}>
                                <span className={styles.label}>
                                    发送通知
                                </span>
                            </Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item name="customers"
                        wrapperCol={{ span: 24 }}
                        label={
                            <span className={styles.label}>
                                适用对象
                            </span>
                        }
                        rules={
                            [{
                                validator: (_, value) => {
                                    if (value) {
                                        if (!value.isAllCustomers && value.selectedCustomers.length < 1) {
                                            return Promise.reject("请添加客户！");
                                        }
                                    } else {
                                        return Promise.reject("请添加客户！");
                                    }
                                    return Promise.resolve();
                                }
                            }]
                        }
                        className={styles.formitem}>

                        <CustomerSelector updateValue={{}} />

                    </Form.Item>

                    <h2 className={styles.smalltitle}> 运费明细 </h2>

                    <Form.List name="modelList"
                        rules={[
                            {
                                validator: async (_, modelList) => {
                                    if (!modelList || modelList.length < 1) {
                                        return Promise.reject(new Error("请至少添加一条运费明细！"));
                                    }
                                    return Promise.resolve();
                                },
                            },
                        ]}
                    >
                        {
                            (fields, { add, remove }, { errors }) => {
                                return (
                                    <>
                                        {fields.map((field, index) => (

                                            <Form.Item
                                                wrapperCol={{ span: 24 }}
                                                {...field}
                                                rules={[
                                                    {
                                                        validator: (_, value) => {
                                                            if (value) {
                                                                if (value.loadWeight === 0) {
                                                                    return Promise.reject("载重不能为0!");
                                                                }
                                                                if (value.loadVolume === 0) {
                                                                    return Promise.reject("载货体积不能为0!");
                                                                }
                                                                if (!value.carriageSize || !value.loadWeight ||
                                                                    !value.loadVolume || !value.modelName) {
                                                                    return Promise.reject("请完善运费明细!");
                                                                }
                                                                if (!value.mileageList || value.mileageList.length < 1) {
                                                                    return Promise.reject("请至少添加一条里程数据!");
                                                                }
                                                                if (value.mileageList.some(item => {
                                                                    return Object.values(item).some(i => {
                                                                        return i === null;
                                                                    });
                                                                })) {
                                                                    return Promise.reject("请完善里程数据!");
                                                                }
                                                            } else {
                                                                return Promise.reject("请完善运费明细!");
                                                            }
                                                            return Promise.resolve();
                                                        }
                                                    },
                                                ]}
                                            >
                                                <ModelList remove={() => remove(field.name)} />
                                            </Form.Item>
                                        ))}
                                        <Button
                                            type="dashed"
                                            size="large"
                                            onClick={() => add()}
                                            style={{ width: "60%", marginTop: 10, marginLeft: 250 }}
                                            icon={<PlusOutlined />}
                                        >
                                            新增一条
                                        </Button>
                                        <Form.ErrorList errors={errors} />
                                    </>
                                );
                            }

                        }

                    </Form.List>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" style={{ marginTop: 10 }}>
                            保存
                        </Button>
                        <Button
                            type="primary"
                            size="large"
                            style={{ margin: 10 }}
                            onClick={
                                () => {
                                    this.onSubmit();
                                }
                            }
                        >
                            立即提交
                        </Button>
                    </Form.Item>

                </Form>

            </ ViewCoat >
        );
    }
}