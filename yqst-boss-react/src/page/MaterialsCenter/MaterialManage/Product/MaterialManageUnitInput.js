/*
 * @Description  : 单位换算公式输入框
 * @version      : 0.1
 * @Author       : Chenglin Huang
 * @Date         : 2021-06-21 16:46:05
 * @LastEditTime : 2021-07-21 10:51:14
 */
import React, { PureComponent, createRef } from "react";
import { Space, InputNumber, Form, Button, Select } from "antd";

export default class MaterialManageUnitInput extends PureComponent {

    constructor(props) {
        super(props);
        this.formRef = createRef();
    }

    getDefaultUnit() {
        // 获取默认单位的值
        const { convertUnitList } = this.props;
        if(convertUnitList.length < 1) {
            return null;
        }
        const res =  convertUnitList.find((item) => {
            return item.isDefault;
        });
        if(res) {
            return res.convertUnit;
        }else {
            return convertUnitList[0].convertUnit;
        }
    }

    render() {
        const { onRemove, onEdit, onSave, disabled, allowEdit, convertUnitList, allowRemove, unit, value = {}, onChange } = this.props;
        return (
            <div>
                <Form
                    layout="inline"
                    ref={this.formRef}
                    component={false}
                >
                    <Space align="baseline">
                        <Form.Item
                            name={"goodsUnitValue"}
                            initialValue={value.goodsUnitValue}
                            rules={[
                                { required: true, message: "请填写物资单位值！" },
                                {
                                    validator(_, value) {
                                        if (value === 0) {
                                            return Promise.reject("物资单位值不能为0！");
                                        }
                                        return Promise.resolve();
                                    }
                                }
                            ]}
                        >
                            {
                                disabled ?
                                    <p>{value.goodsUnitValue}</p> :
                                    <InputNumber min={0} precision={8} max={10000000000} />
                            }
                        </Form.Item>
                        {unit} =
                        <Form.Item
                            name={"convertUnitValue"}
                            initialValue={value.convertUnitValue}
                            rules={[
                                { required: true, message: "请填写转换单位值！" },
                                {
                                    validator(_, value) {
                                        if (value === 0) {
                                            return Promise.reject("转换单位值不能为0！");
                                        }
                                        return Promise.resolve();
                                    }
                                },
                            ]}
                        >
                            {
                                disabled ?
                                    <p>{value.convertUnitValue}</p> :
                                    <InputNumber min={0} precision={8} max={10000000000} />
                            }
                        </Form.Item>
                        <Form.Item
                            name={"convertUnit"}
                            initialValue={this.getDefaultUnit()}
                            rules={[
                                { required: true, message: "请填写转换单位！" },
                            ]}
                        >
                            {
                                disabled ?
                                    <p>{value.convertUnit}</p> :
                                    <Select 
                                        size="middle"
                                        style={{
                                            width: 100
                                        }}
                                        notFoundContent={
                                            <p>请在副单位管理中添加！</p>
                                        }
                                    >
                                        {
                                            convertUnitList.map((item) => {
                                                return (
                                                    <Select.Option
                                                        value={item.convertUnit}
                                                    >
                                                        {item.convertUnit}
                                                    </Select.Option>
                                                );
                                            })
                                        }
                                    </Select>
                            }
                        </Form.Item>
                        {
                            disabled ?
                                <Button disabled={!allowEdit} onClick={onEdit}> 修改 </Button> :
                                <Button
                                    onClick={
                                        () => {
                                            this.formRef.current.validateFields().then((values) => {
                                                onChange(values);
                                                onSave();
                                            });
                                        }
                                    }
                                > 保存 </Button>
                        }
                        <Button danger onClick={() => onRemove()} disabled={!allowRemove}> 删除 </Button>
                    </Space>
                </Form>
            </div>
        );
    }
}