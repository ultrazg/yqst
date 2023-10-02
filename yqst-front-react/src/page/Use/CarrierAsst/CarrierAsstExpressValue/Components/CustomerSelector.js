/*
 * @Description  : 选择客户组件（能直接用于antd Form组件）
 * @version      : 0.1
 * @Author       : Chenglin Huang
 * @Date         : 2021-03-18 18:16:16
 * @LastEditTime : 2021-05-11 10:18:30
 */
import React, { useState, useRef, useCallback, memo, useEffect } from "react";
import { Input, Button, Modal, Checkbox, List, Skeleton, Avatar } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";
import Model from "../CarrierAsstExpressValueModel";

const { Search } = Input;

export default memo(function CustomSelector({ value = {}, updateValue, onChange }) {
    const [isAllCustomers, setIsAllCustomers] = useState(value.isAllCustomers || true);
    const [selectedCustomers, setSelectedCustomers] = useState(value.selectedCustomers || []);
    const [customers, setCustomers] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hasmore, setHasmore] = useState(false);

    const tempCustomers = useRef([]);
    const tempIsAll = useRef(false);
    const current = useRef(1);
    const pageSize = 10;
    const keyword = useRef("");

    useEffect(() => {
        setIsAllCustomers(updateValue.isAllCustomers || false);
        setSelectedCustomers(updateValue.selectedCustomers || []);
    }, [updateValue]);

    useEffect(() => {
        requestCustomers(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const triggerChange = useCallback((changedValue) => {
        if (onChange) {
            onChange({
                selectedCustomers,
                isAllCustomers,
                ...value,
                ...changedValue,
            });
        }
    }, [selectedCustomers, isAllCustomers, value, onChange]);

    // 包装setter函数，同时调用onChange
    const onSelectedCustomersChange = useCallback((newSelectedCustomers) => {

        setSelectedCustomers(newSelectedCustomers);

        triggerChange({
            selectedCustomers: newSelectedCustomers,
        });
    }, [triggerChange]);

    const onIsAllCustomersChange = useCallback((newIsAllCustomers) => {
        setIsAllCustomers(newIsAllCustomers);

        triggerChange({
            isAllCustomers: newIsAllCustomers,
        });
    }, [triggerChange]);

    const requestCustomers = useCallback((isLoadMore) => {
        setIsLoading(true);
        if (isLoadMore) {
            current.current = current.current + 1;
        } else {
            current.current = 1;
        }
        Model.CarrierAsstExpressValuePolcyCustomer({
            current: current.current,
            pageSize,
            keyword: keyword.current
        }, (res) => {
            if (isLoadMore) {
                setCustomers(customers.concat(res.data.records));
            } else {
                setCustomers(res.data.records);
            }
            if (res.data.total <= current.current * pageSize) {
                setHasmore(false);
            } else {
                setHasmore(true);
            }
            setIsLoading(false);
        }, (err) => {
            setIsLoading(false);
        });
    }, [customers]);

    const loadMore =
        hasmore && !isLoading ? (
            <div
                style={{
                    textAlign: "center",
                    marginTop: 12,
                    height: 32,
                    lineHeight: "32px",
                }}
            >
                <Button onClick={() => requestCustomers(true)}>加载更多</Button>
            </div>
        ) : null;

    return (
        <>
            <Button
                size="large"
                onClick={
                    () => {
                        setIsModalVisible(true);
                        tempCustomers.current = selectedCustomers;
                        tempIsAll.current = isAllCustomers;
                    }
                }
            >点击添加</Button>
            {
                isAllCustomers ?
                    <span style={{ color: "#F12C20" }}> 已选择适用于全部客户! </span> :
                    <div style={{ display: "flex", flexWrap: "wrap", height: "150px", width: "100%", border: "solid", borderWidth: 1, borderColor: "#D9D9D9", borderRadius: 4, marginTop: 8, padding: 4, overflow: "auto" }}>
                        {
                            selectedCustomers.map((item) => {
                                return (
                                    <div key={item.shipperCompanySn} style={{ width: "33%", paddingInline: "10px" }}>
                                        <span style={{ userSelect: "none" }}> {item.shipperCompanyName} </span>
                                        <CloseCircleFilled style={{ color: "#CACCCF", cursor: "pointer" }}
                                            onClick={() => {
                                                onSelectedCustomersChange(selectedCustomers.filter((i) => {
                                                    return i.shipperCompanySn !== item.shipperCompanySn;
                                                }));
                                            }}
                                        />
                                    </div>
                                );
                            })
                        }
                    </div>
            }
            <Modal
                visible={isModalVisible}
                title="选择适用对象"
                onOk={() => {
                    setIsModalVisible(false);
                }}
                onCancel={() => {
                    setIsModalVisible(false);
                    // console.log('取消', tempCustomers.current, tempIsAll.current)
                    // 还原
                    setSelectedCustomers(tempCustomers.current);
                    setIsAllCustomers(tempIsAll.current);
                    triggerChange({
                        selectedCustomers: tempCustomers.current,
                        isAllCustomers: tempIsAll.current
                    });
                }}
                footer={
                    <div>
                        <Checkbox
                            style={{ height: "32px", lineHeight: "32px", float: "left" }}
                            checked={
                                // 客户中的每一个都在被选中的客户列表中
                                customers.length === selectedCustomers.length
                            }
                            onChange={(e) => {
                                if (e.target.checked) {
                                    const newList = customers.map((item) => {
                                        return {
                                            shipperCompanySn: item.userSn,
                                            shipperCompanyName: item.alias
                                        };
                                    });
                                    setIsAllCustomers(!e.target.checked);
                                    setSelectedCustomers(newList);
                                    triggerChange({
                                        selectedCustomers: newList,
                                        isAllCustomers: !e.target.checked
                                    });
                                } else {
                                    onSelectedCustomersChange([]);
                                }
                            }}
                        >
                            全选
                        </Checkbox>
                        <Checkbox
                            style={{ height: "32px", lineHeight: "32px", float: "left" }}
                            checked={isAllCustomers}
                            onChange={(e) => {
                                setSelectedCustomers([]);
                                setIsAllCustomers(e.target.checked);
                                triggerChange({
                                    selectedCustomers: [],
                                    isAllCustomers: e.target.checked
                                });
                            }}
                        >
                            适用于全部客户
                        </Checkbox>
                        <Button type="primary"
                            onClick={
                                () => {
                                    setIsModalVisible(false);
                                }
                            }>确定</Button>
                        <Button onClick={
                            () => {
                                setIsModalVisible(false);
                                // 还原 不能调用多个onChange
                                setSelectedCustomers(tempCustomers.current);
                                setIsAllCustomers(tempIsAll.current);
                                triggerChange({
                                    selectedCustomers: tempCustomers.current,
                                    isAllCustomers: tempIsAll.current
                                });
                            }
                        }>取消</Button>
                    </div>
                }
            >
                <>
                    <Search
                        placeholder="搜索企业名"
                        allowClear
                        enterButton="搜索"
                        size="large"
                        onSearch={(value) => {
                            keyword.current = value;
                            requestCustomers(false);
                        }}
                    />
                    <List
                        // loading={isLoading}
                        style={{ maxHeight: "500px", width: "100%", overflowY: "auto" }}
                        itemLayout="horizontal"
                        loadMore={loadMore}
                        dataSource={customers}
                        renderItem={item => (
                            <List.Item
                                extra={
                                    isAllCustomers ?
                                        null :
                                        <Checkbox
                                            checked={
                                                selectedCustomers.some((i) => {
                                                    return i.shipperCompanySn === item.userSn;
                                                })
                                            }
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    onSelectedCustomersChange(selectedCustomers.concat({ shipperCompanySn: item.userSn, shipperCompanyName: item.alias }));
                                                } else {
                                                    onSelectedCustomersChange(selectedCustomers.filter((i) => {
                                                        return i.shipperCompanySn !== item.userSn;
                                                    }));
                                                }
                                            }}
                                        />
                                }>
                                <Skeleton avatar title={false} loading={isLoading} active>
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar src={item.photo} />
                                        }
                                        title={
                                            <div style={{ fontSize: 14 }}>{item.alias}</div>
                                        }
                                    />
                                </Skeleton>
                            </List.Item>
                        )}
                    />
                </>
            </Modal>
        </>
    );
});