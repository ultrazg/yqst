/*
 * @Description  : 选择图表的种类
 * @version      : 0.1
 * @Author       : Chenglin Huang
 * @Date         : 2021-05-21 10:56:53
 * @LastEditTime : 2021-05-25 18:31:25
 */
import React, {memo, useCallback, useState, useMemo} from "react";
import {Modal, Button, Select, Form, Spin} from "antd";
import request from "../../../../../utils/request/request";
import apiInterfaces from "../../apiInterfaces";
import CategorySelector from "./CategorySelector";
import SPUSelector from "./SPUSelector";
import SKUSelector from "./SKUSelector";

const {Option} = Select;

export default memo(function ChartChangeModal({visible, title, onCancel, onConfirm, onReset}) {

    const [kindlist, setKindlist] = useState(null);
    const [isKindListLoading, setIsKindListLoading] = useState(false);
    const [isModalLoading, setIsModalLoading] = useState(false);
    const [kindSelected, setKindSelected] = useState(null); // 选中的种类

    const [form] = Form.useForm();

    const _onReset = useCallback(() => {
        form.resetFields();
        setKindSelected(null);
        onReset();
    }, [form, onReset]);

    const _onConfirm = useCallback(() => {
        setIsModalLoading(true);
        form.validateFields()
            .then((values) => {
                onConfirm(values);
            })
            .catch((err) => {
                console.warn(err);
            })
            .finally(() => {
                setIsModalLoading(false);
            });
    }, [onConfirm, form]);

    const _onKindlistDropdownVisibleChange = useCallback((open) => {
        if (open && !kindlist) {
            setIsKindListLoading(true);
            request(
                apiInterfaces.kindlist,
                {},
                (res) => {
                    setKindlist(res.data);
                    setIsKindListLoading(false);
                },
                (err) => {
                    console.warn(err);
                },
                false
            );
        }
    }, [kindlist]);

    const _onKindSelected = useCallback((value) => {
        setKindSelected(value);
    }, []);

    const modalFooter = useMemo(() => {
        return (
            <div>
                <Button
                    onClick={onCancel}
                >取消</Button>
                <Button
                    style={{backgroundColor: "#52c41a", color: "#fff"}}
                    onClick={_onReset}
                >重置</Button>
                <Button
                    type="primary"
                    onClick={_onConfirm}
                >确定</Button>
            </div>
        );
    }, [_onConfirm, _onReset, onCancel]);

    return (
        <Modal
            visible={visible}
            title={title}
            onCancel={onCancel}
            loading={isModalLoading}
            footer={modalFooter}
        >
            <Form
                form={form}
                wrapperCol={{
                    span: 18,
                }}
                requiredMark={false}
            >
                <Form.Item
                    label="种类"
                    name="kind"
                    rules={[{required: true, message: "请选择种类!"}]}
                >
                    <Select
                        placeholder="请选择"
                        loading={isKindListLoading}
                        onDropdownVisibleChange={_onKindlistDropdownVisibleChange}
                        notFoundContent={isKindListLoading ? <Spin size="small"/> : null}
                        onChange={_onKindSelected}
                        labelInValue
                    >
                        {
                            kindlist && kindlist.map(
                                (item) => {
                                    return (
                                        <Option value={item.kindId} key={item.kindId}>{item.kindName}</Option>
                                    );
                                }
                            )
                        }
                    </Select>
                </Form.Item>
                {
                    kindSelected && kindSelected.value === 1 ?
                        (
                            <Form.Item
                                label={kindSelected.label}
                                name="category"
                                rules={[{required: true, message: `请选择${kindSelected.label}!`}]}
                            >
                                <CategorySelector/>
                            </Form.Item>
                        ) : null
                }
                {
                    kindSelected && kindSelected.value === 2 ?
                        (
                            <Form.Item
                                label={kindSelected.label}
                                name="SPU"
                                rules={[{required: true, message: `请选择${kindSelected.label}!`}]}
                            >
                                <SPUSelector/>
                            </Form.Item>
                        )
                        : null
                }
                {
                    kindSelected && kindSelected.value === 3 ?
                        (
                            <Form.Item
                                label={kindSelected.label}
                                name="SKU"
                                rules={[{required: true, message: `请选择${kindSelected.label}!`}]}
                            >
                                <SKUSelector/>
                            </Form.Item>
                        )
                        : null
                }
            </Form>
        </Modal>
    );
});
