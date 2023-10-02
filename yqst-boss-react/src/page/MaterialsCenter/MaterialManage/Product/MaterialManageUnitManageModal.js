/*
 * @Description  : 副单位管理
 * @version      : 0.1
 * @Author       : Chenglin Huang
 * @Date         : 2021-07-06 15:32:38
 * @LastEditTime : 2021-07-09 18:08:00
 */
import React, {PureComponent, createRef} from "react";
import {Modal, Form, Button, Input, Row, Col, Checkbox} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import ConvertUnitSelectModal from "./ConvertUnitSelectModal";

export default class MaterialManageUnitManageModal extends PureComponent {

    constructor(props) {
        super(props);
        this.formRef = createRef();
        this.isDefaultRow = null;
        this.state = {
            isFobidAdd: false,
            unitSelectVisi: false
        }
    }

    render() {
        const {unit, visible, onOk, onCancel, convertUnitList} = this.props;
        return (
            <Modal
                title="副单位管理"
                visible={visible}
                bodyStyle={{
                    overflow: "auto",
                }}
                destroyOnClose
                onOk={() => {
                    this.formRef.current.validateFields()
                        .then((values) => {
                            onCancel();
                            onOk(values);
                        })
                        .catch(() => {
                        });
                }}
                onCancel={() => {
                    this.setState({
                        isFobidAdd: false
                    });
                    onCancel();
                }}
            >
                <p>
                    主单位：{unit}
                </p>
                <Form ref={this.formRef} requiredMark={false}>
                    <Form.List
                        name="convertUnitList"
                        initialValue={convertUnitList}
                        rules={[
                            ({getFieldValue}) => ({
                                validator: (_, value) => {
                                    const list = getFieldValue("convertUnitList");
                                    if (list) {
                                        for (let i = 0; i < list.length; i++) {
                                            if (
                                                list[i] &&
                                                list[i].convertUnit &&
                                                list.some((item, index) => {
                                                    return item && item.convertUnit && item.convertUnit === list[i].convertUnit && i !== index;
                                                })
                                            ) {
                                                return Promise.reject("副单位不能重复！");
                                            }
                                        }
                                    }
                                    return Promise.resolve();
                                }
                            }),
                            ({getFieldValue}) => ({
                                validator: (_, value) => {
                                    const list = getFieldValue("convertUnitList");
                                    if (list) {
                                        let count = 0;
                                        for (let i = 0; i < list.length; i++) {
                                            if (
                                                list[i] &&
                                                list[i].isDefault
                                            ) {
                                                count++;
                                            }
                                        }
                                        if (count > 1) {
                                            return Promise.reject("只能设置一个默认副单位！");
                                        }
                                    }
                                    return Promise.resolve();
                                }
                            }),
                            {
                                validator: (_, value) => {
                                    if (value && value.length > 1) {
                                        if (!value.some((item) => {
                                            return item && item.isDefault;
                                        })) {
                                            return Promise.reject("请设置一个默认副单位！");
                                        }
                                    }
                                    return Promise.resolve();
                                }
                            }
                        ]}
                    >
                        {(fields, {add, remove}, {errors}) => (
                            <>
                                <div style={{maxHeight: 300, overflow: "auto"}}>
                                    {fields.map(field => (
                                        <Form.Item
                                            key={field.key}
                                        >
                                            <Row align="middle">
                                                <Col>
                                                    <Form.Item
                                                        {...field}
                                                        name={[field.name, "convertUnit"]}
                                                        fieldKey={[field.fieldKey, "convertUnit"]}
                                                        label={`副单位${field.name + 1}`}
                                                        rules={[
                                                            {required: true, message: "请选择副单位！"},
                                                            // {
                                                            //     validator(_, value) {
                                                            //         if (value && value === unit) {
                                                            //             return Promise.reject("副单位不能与主单位相同！");
                                                            //         }
                                                            //         return Promise.resolve();
                                                            //     }
                                                            // },
                                                        ]}
                                                    >
                                                        <Input
                                                            onChange={() => {
                                                                // this.formRef.current.validateFields(["convertUnitList"]);
                                                            }}
                                                            maxLength={10}
                                                            onClick={() => {
                                                                this.unitSelectFun = (data) => {
                                                                    if (this.formRef.current && this.formRef.current.getFieldValue("convertUnitList")) {
                                                                        let convertUnitList = this.formRef.current.getFieldValue("convertUnitList");
                                                                        // console.log(convertUnitList[field.fieldKey].convertUnit, "current");
                                                                        convertUnitList[field.fieldKey].convertUnit = data;
                                                                        this.formRef.current.setFieldsValue({
                                                                            convertUnitList
                                                                        });
                                                                    }
                                                                }
                                                                this.setState({unitSelectVisi: true})
                                                            }}
                                                        />
                                                    </Form.Item>
                                                </Col>
                                                <Col offset={1}>
                                                    <Form.Item
                                                        name={[field.name, "isDefault"]}
                                                        fieldKey={[field.fieldKey, "isDefault"]}
                                                        valuePropName="checked"
                                                        initialValue={false}
                                                    >
                                                        <Checkbox
                                                            onChange={() => {
                                                                this.formRef.current.validateFields(["convertUnitList"]);
                                                            }}
                                                        >
                                                            设为默认副单位
                                                        </Checkbox>
                                                    </Form.Item>
                                                </Col>
                                                <Col offset={1}>
                                                    <Button
                                                        onClick={
                                                            () => {
                                                                remove(field.name);
                                                            }
                                                        }
                                                        danger
                                                    >删除</Button>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                    ))}
                                </div>
                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        disabled={this.state.isFobidAdd}
                                        onClick={() => {
                                            add();
                                        }}
                                        block
                                        icon={<PlusOutlined/>}>
                                    </Button>
                                    <Form.ErrorList errors={errors}/>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                </Form>
                {this.state.unitSelectVisi ? <ConvertUnitSelectModal
                    sn={this.props.sn}
                    onSelect={(data) => {
                        this.unitSelectFun && this.unitSelectFun(data.unit)
                        this.setState({unitSelectVisi: false})
                    }}
                    onClose={() => {
                        this.setState({unitSelectVisi: false})
                    }}/> : null}
            </Modal>
        );
    }
}
