/*
 * @Description  : 物资管理设置单位换算公式弹窗组件
 * @version      : 0.1
 * @Author       : Chenglin Huang
 * @Date         : 2021-06-21 10:57:48
 * @LastEditTime : 2021-07-12 09:52:16
 */
import React, { PureComponent, createRef } from "react";
import { Modal, Form, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import MaterialManageUnitInput from "./MaterialManageUnitInput";

export default class MaterialManageUnitModal extends PureComponent {
    constructor(props) {
        super(props);
        this.formRef = createRef();
        this.state = {
            editingRow: null,
        };
    }

    filterByConvertUnitList(list) {
        const { convertUnitList } = this.props;
        // 过滤掉不属于副单位列表里的公式
        return list.filter((item, index) => {
            if (
                convertUnitList.some((i) => {
                    return item.convertUnit === i.convertUnit;
                })
            ) {
                return true;
            }
            return false;
        });
    }

    render() {
        const { visible, onOk, onCancel, unit, unitRelationList = [], convertUnitList = [] } = this.props;
        return (
            <Modal
                title="设置单位换算公式"
                visible={visible}
                bodyStyle={{
                    overflow: "auto",
                    maxHeight: 300
                }}
                destroyOnClose
                onOk={() => {
                    if (this.state.editingRow !== null) {
                        message.error("请保存公式！");
                        return;
                    }
                    this.formRef.current.validateFields().then((values) => {
                        this.setState({
                            editingRow: null
                        });
                        onCancel();
                        onOk(values);
                    });
                }}
                onCancel={() => {
                    this.setState({
                        editingRow: null
                    });
                    onCancel();
                }}
            >
                <p> 例如：1 箱 = 12 个 </p>
                <Form ref={this.formRef}>
                    <Form.List
                        name="unitRelationList"
                        initialValue={this.filterByConvertUnitList(unitRelationList)}
                    >
                        {(fields, { add, remove }, { errors }) => (
                            <>
                                {fields.map(field => (
                                    <Form.Item
                                        name={field.name}
                                        key={field.key}
                                        rules={[
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    const list = getFieldValue("unitRelationList");
                                                    for (let i = 0; i < list.length; i++) {
                                                        if (
                                                            list[i] &&
                                                            list[i].convertUnit &&
                                                            list.some((item, index) => {
                                                                return item && item.convertUnit && item.convertUnit === list[i].convertUnit && i !== index;
                                                            })
                                                        ) {
                                                            return Promise.reject("转换单位不能重复！");
                                                        }
                                                    }
                                                    return Promise.resolve();
                                                }
                                            }),
                                            // {
                                            //     validator(_, value) {
                                            //         if (value && value.convertUnit === unit) {
                                            //             return Promise.reject("转换单位不能与主单位相同！");
                                            //         }
                                            //         return Promise.resolve();
                                            //     }
                                            // },
                                        ]}
                                    >
                                        <MaterialManageUnitInput
                                            unit={unit}
                                            disabled={this.state.editingRow !== field.name}// 是否正在修改当前行
                                            allowEdit={this.state.editingRow === null}// 允许进行修改
                                            // 允许删除
                                            allowRemove={this.state.editingRow === null || this.state.editingRow === field.name}
                                            onRemove={() => {
                                                this.setState({
                                                    editingRow: null
                                                });
                                                remove(field.name);
                                            }}
                                            convertUnitList={convertUnitList}
                                            onEdit={
                                                () => {
                                                    this.setState({
                                                        editingRow: field.name
                                                    });
                                                }
                                            }
                                            onSave={
                                                () => {
                                                    this.formRef.current.validateFields([["unitRelationList", field.name]]).then(() => {
                                                        this.setState({
                                                            editingRow: null
                                                        });
                                                    });
                                                }
                                            }
                                        />
                                    </Form.Item>
                                ))}

                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        disabled={this.state.editingRow !== null}
                                        onClick={() => {
                                            if (this.state.editingRow === null) {
                                                add();
                                                this.setState({
                                                    editingRow: fields.length
                                                });
                                            }
                                        }}
                                        block
                                        icon={<PlusOutlined />}>
                                    </Button>
                                    <Form.ErrorList errors={errors} />
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                </Form>
            </Modal>
        );
    }
}