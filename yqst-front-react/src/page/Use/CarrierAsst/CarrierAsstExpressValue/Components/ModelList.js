/* eslint-disable jsx-a11y/anchor-is-valid */
/*
 * @Description  : 填写运费明细组件（能直接用于antd Form组件）
 * @version      : 0.1
 * @Author       : Chenglin Huang
 * @Date         : 2021-03-22 12:05:58
 * @LastEditTime : 2021-06-02 14:40:53
 */

import React, { useState, useCallback, memo, useMemo } from "react";
import { Form, Input, Button, Table, InputNumber, Popconfirm, Typography } from "antd";

const styles = {
    label: { display: "flex", whiteSpace: "nowrap", alignItems: "center", justifyContent: "space-around" },
    labeltext: { fontSize: 14, lineHeight: "48px", textAlign: "right" }
};

const column = [
    {
        title: "计费区间综合里程数",
        type: "number",
        editable: true,
        mileRange: true,
        width: 350,
        sorter: (a, b) => a.minimumMileage - b.minimumMileage,
        render: (text, record) => {
            return (
                <>
                    <span style={{ fontWeight: "bold" }}>
                        {(record.minimumMileage + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </span>
                    <span style={{ marginRight: 8 }}>公里及以上</span>
                    <span style={{ fontWeight: "bold" }}>
                        {(record.maximumMileage + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </span>公里以下
                </>
            );
        }
    },
    {
        title: "运输单价（吨 / 公里）",
        dataIndex: "unitPrice",
        key: "unitPrice",
        type: "number",
        editable: true,
        render: (text) => {
            return (text + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    },
    {
        title: "保底费用(元)",
        dataIndex: "minimumCost",
        key: "minimumCost",
        type: "number",
        editable: true,
        render: (text) => {
            return (text + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    },
    {
        title: "折扣(%)",
        dataIndex: "discount",
        key: "discount",
        type: "number",
        editable: true,
    },
];

export default memo(function ModelList({ value = {}, onChange, remove }) {

    const [mileageList, setMileageList] = useState(value.mileageList || []);
    const [modelName, setModelName] = useState(value.modelName || "");
    const [carriageSize, setCarriageSize] = useState(value.carriageSize || "");
    const [loadWeight, setLoadWeight] = useState(value.loadWeight || "");
    const [loadVolume, setLoadVolume] = useState(value.loadVolume || "");
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState("");

    // 判断一个区间是否在已存在的mileageList公里数区间之间
    const isAmongMileageList = useCallback((minVal, maxVal, key) => {
        return mileageList.some((item) => {
            if (item.key !== key) {
                return !((minVal >= item.maximumMileage) || (maxVal <= item.minimumMileage));
            } else {
                return false;
            }
        });
    }, [mileageList]);

    const EditableCell = useCallback(
        ({
            title,
            editing,
            children,
            dataIndex,
            type,
            mileRange,
            record,
            handleSave,
            ...restProps
        }) => {
            return (
                <td {...restProps}>
                    {editing ? (
                        (
                            <>

                                {
                                    // 对里程区间进行特殊处理
                                    mileRange ?
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <Form.Item
                                                style={{
                                                    margin: 0,
                                                }}
                                                name="minimumMileage"
                                                dependencies={["maximumMileage"]}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "里程区间是必填项",
                                                    },
                                                    ({ getFieldValue }) => ({
                                                        validator: (_, value) => {
                                                            if (!getFieldValue("maximumMileage") && getFieldValue("maximumMileage") !== 0) {
                                                                return Promise.reject("请完善区间上限！");
                                                            }
                                                            if (getFieldValue("maximumMileage") <= value) {
                                                                return Promise.reject("区间上限不能低于或等于区间下限！");
                                                            }
                                                            if (isAmongMileageList(value, getFieldValue("maximumMileage"), record.key)) {
                                                                return Promise.reject("输入的数值已包含在其他区间！");
                                                            }
                                                            return Promise.resolve();
                                                        }
                                                    }),
                                                ]}
                                            >
                                                <InputNumber placeholder="请输入" min={0} max={1000000000} precision={2} />
                                            </Form.Item>
                                            公里及以上
                                            <Form.Item
                                                style={{
                                                    margin: 0,
                                                }}
                                                name="maximumMileage"
                                                dependencies={["minimumMileage"]}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "里程区间是必填项",
                                                    },
                                                    ({ getFieldValue }) => ({
                                                        validator: (_, value) => {
                                                            if (!getFieldValue("minimumMileage") && getFieldValue("minimumMileage") !== 0) {
                                                                return Promise.reject("请完善区间下限！");
                                                            }
                                                            if (getFieldValue("minimumMileage") >= value) {
                                                                return Promise.reject("区间上限不能低于或等于区间下限！");
                                                            }
                                                            if (isAmongMileageList(getFieldValue("minimumMileage"), value, record.key)) {
                                                                return Promise.reject("输入的数值已包含在其他区间！");
                                                            }
                                                            if (value === 0) {
                                                                return Promise.reject("区间上限不能为0！");
                                                            }
                                                            return Promise.resolve();
                                                        }
                                                    }),
                                                ]}
                                            >
                                                <InputNumber placeholder="请输入" min={0} max={1000000000} precision={2} />
                                            </Form.Item>
                                            公里以下
                                        </div>
                                        :
                                        <Form.Item
                                            style={{
                                                margin: 0,
                                            }}
                                            name={dataIndex}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: `${title} 是必填项`,
                                                },
                                            ]}
                                        >
                                            {
                                                type && type === "number" ?
                                                    <InputNumber
                                                        min={0}
                                                        max={dataIndex === "discount" ? 100 : 1000000000}
                                                        placeholder="请输入"
                                                        type={type}
                                                        precision={2}
                                                    /> :
                                                    <Input />
                                            }
                                        </Form.Item>
                                }

                            </>
                        )
                    ) : (
                            children
                        )}
                </td>
            );
        }, [isAmongMileageList]);


    const triggerChange = useCallback((changedValue) => {
        if (onChange) {
            onChange({
                mileageList,
                modelName,
                carriageSize,
                loadWeight,
                loadVolume,
                ...value,
                ...changedValue,
            });
        }
    }, [mileageList, modelName, carriageSize, loadVolume, loadWeight, value, onChange]);

    // 包装setter函数，同时调用onChange
    const onMileageListChange = useCallback((newList) => {
        setMileageList(newList);

        triggerChange({
            mileageList: newList,
        });
    }, [triggerChange]);

    const onModelNameChange = useCallback((newName) => {
        setModelName(newName);

        triggerChange({
            modelName: newName,
        });
    }, [triggerChange]);

    const onCarriageSizeChange = useCallback((newSize) => {
        setCarriageSize(newSize);

        triggerChange({
            carriageSize: newSize,
        });
    }, [triggerChange]);

    const onLoadWeightChange = useCallback((newWeight) => {
        setLoadWeight(newWeight);

        triggerChange({
            loadWeight: newWeight,
        });
    }, [triggerChange]);

    const onLoadVolumeChange = useCallback((newVolume) => {
        setLoadVolume(newVolume);

        triggerChange({
            loadVolume: newVolume,
        });
    }, [triggerChange]);


    const isEditing = useCallback(
        (record) => {
            return record.key === editingKey;
        }, [editingKey]
    );

    const edit = useCallback(
        (record) => {
            form.setFieldsValue({
                ...record,
            });
            setEditingKey(record.key);
        }, [form]
    );

    const cancel = useCallback((record) => {
        if (record.minimumMileage === null) {
            if (mileageList.length === 1) {
                onMileageListChange([]);
            } else {
                const newList = mileageList.slice(0, mileageList.length - 1);
                onMileageListChange(newList);
            }
        }
        setEditingKey("");
    }, [mileageList, onMileageListChange]);

    const handlDelete = useCallback((key) => {
        const data = mileageList;
        const newData = data.filter(item => {
            return item.key !== key;
        });
        onMileageListChange(newData);
    }, [mileageList, onMileageListChange]);

    const save = useCallback(async (key) => {
        try {
            const data = mileageList;
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                onMileageListChange(newData);
                setEditingKey("");
            } else {
                newData.push(row);
                onMileageListChange(newData);
                setEditingKey("");
            }
        } catch (errInfo) {
            console.log("Validate Failed:", errInfo);
        }
    }, [form, mileageList, onMileageListChange]);



    const columns = useMemo(() => [
        ...column,
        {
            title: "操作",
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <a
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            保存
                        </a>
                            |
                        <Popconfirm title="确定取消吗?" onConfirm={() => cancel(record)}>
                            {/* 最小值不能为null */}
                            <Typography.Link style={{ marginLeft: 8 }}>
                                取消
                            </Typography.Link>
                        </Popconfirm>
                    </span>
                ) : (
                        <>
                            <Typography.Link style={{ marginRight: 8 }} disabled={editingKey !== ""} onClick={() => edit(record)}>
                                编辑
                        </Typography.Link>
                            |
                            <Popconfirm
                                title="确定删除吗？"
                                onConfirm={() => {
                                    handlDelete(record.key);
                                }}
                                okText="确认"
                                cancelText="取消"
                            >
                                <a style={{ marginLeft: 8, color: "#f50" }}> 删除 </a>
                            </Popconfirm>
                        </>
                    );
            },
        },
    ], [handlDelete, isEditing, cancel, edit, save, editingKey]);

    const cols = useMemo(
        () => {
            return columns.map((col) => {
                if (!col.editable) {
                    return col;
                }

                return {
                    ...col,
                    onCell: (record) => ({
                        record,
                        type: col.type,
                        mileRange: col.mileRange,
                        dataIndex: col.dataIndex,
                        title: col.title,
                        editing: isEditing(record),
                    }),
                };
            });
        }, [columns, isEditing]);

    return (
        <>
            <div style={{ border: "1px solid rgba(43, 52, 65, 0.25)", padding: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-evenly", width: "100%", background: "#FAFAFA" }}>
                    <label style={styles.label}>
                        <span style={styles.labeltext}>车型名称：</span>
                        <Input size="large"
                            maxLength={30}
                            placeholder="请填写"
                            value={modelName}
                            onChange={(e) => {
                                onModelNameChange(e.target.value);
                            }} />
                    </label>
                    <label style={styles.label}>
                        {/* 车厢尺寸(m)，载重(吨)，载货体积(m³) */}
                        <span style={styles.labeltext}>车厢尺寸(m)：</span>
                        <Input size="large"
                            maxLength={30}
                            placeholder="请填写（长×宽×高）"
                            value={carriageSize}
                            onChange={(e) => {
                                onCarriageSizeChange(e.target.value);
                            }}
                        />
                    </label>
                    <label style={styles.label}>
                        <span style={styles.labeltext}>载重(吨)：</span>
                        <InputNumber size="large"
                            placeholder="请填写"
                            max={1000000000}
                            min={0}
                            value={loadWeight}
                            onChange={(value) => {
                                onLoadWeightChange(value);
                            }}
                        />
                    </label>
                    <label style={styles.label}>
                        <span style={styles.labeltext}>载货体积(m³)：</span>
                        <InputNumber size="large"
                            placeholder="请填写"
                            max={1000000000}
                            min={0}
                            value={loadVolume}
                            onChange={(value) => {
                                onLoadVolumeChange(value);
                            }}
                        />
                    </label>
                </div>
                <Form form={form} component={false}>
                    <Table
                        components={{
                            body: {
                                cell: EditableCell,
                            },
                        }}
                        rowClassName={() => "editable-row"}
                        columns={cols}
                        dataSource={mileageList}
                        pagination={false}
                    />
                </Form>
                <div style={{ backgroundColor: "#FAFAFA", padding: "4px" }}>
                    <Button size="large"
                        disabled={editingKey !== ""}
                        style={{ marginRight: 8 }}
                        onClick={
                            () => {
                                let key = new Date().getTime() + Math.random() * 100;
                                // minimumMileage	string	是	最小里程
                                // maximumMileage	string	是	最大里程
                                // unitPrice	string	是	运输单价
                                // minimumCost	string	是	保底费用
                                // discount   string	是	折扣
                                let list = mileageList.concat({
                                    key,
                                    minimumMileage: null,
                                    maximumMileage: null,
                                    unitPrice: null,
                                    minimumCost: null,
                                    discount: null
                                });
                                onMileageListChange(list);
                                form.setFieldsValue({
                                    minimumMileage: "",
                                    maximumMileage: "",
                                    unitPrice: "",
                                    minimumCost: "",
                                    discount: ""
                                });
                                setEditingKey(key);
                            }
                        }
                    >添加规格</Button>
                    <Popconfirm
                        title="确定删除吗？"
                        onConfirm={() => {
                            remove && remove();
                        }}
                        okText="确认"
                        cancelText="取消"
                    >
                        <Button danger size="large">删除</Button>
                    </Popconfirm>
                </div>
            </div>
        </>
    );
});