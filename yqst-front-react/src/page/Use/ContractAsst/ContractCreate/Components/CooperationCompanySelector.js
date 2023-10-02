/*
 * @Description  : 选择合作方
 * @version      : 0.1
 * @Author       : Chenglin Huang
 * @Date         : 2021-05-08 16:24:30
 * @LastEditTime : 2021-05-11 09:45:55
 */
import React, { useState, useCallback, useRef, useEffect } from "react";
import { Input, Button, Modal, Checkbox, List, Skeleton, Avatar } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import request from "../../../../../utils/request/request";
import apiInterfaces from "../../apiInterfaces";
import styles from "../../Contract.module.css";

const { Search } = Input;

export default function CooperationCompanySelector({ value = {}, onChange }) {

    const [selectedCompany, setSelectedCompany] = useState(null);
    const [companys, setCompanys] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const tempCompany = useRef([]);
    const keyword = useRef("");

    useEffect(() => {
        requestCompanys();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const requestCompanys = useCallback(() => {
        setIsLoading(true);
        request(
            apiInterfaces.contractAsstSelectPartner,
            {
                keyword: keyword.current
            },
            (res) => {
                setCompanys(res.data);
                setIsLoading(false);
            },
            (err) => {
                setIsLoading(false);
            }
        );
    }, []);

    const triggerChange = useCallback((changedValue) => {
        if (onChange) {
            onChange({
                selectedCompany,
                ...value,
                ...changedValue,
            });
        }
    }, [selectedCompany, onChange, value]);

    // 包装setter函数，同时调用onChange
    const onSelectedCompanyChange = useCallback((newSelectedCompany) => {

        setSelectedCompany(newSelectedCompany);

        triggerChange({
            selectedCompany: newSelectedCompany,
        });
    }, [triggerChange]);



    return (
        <>
            <Button
                size="large"
                onClick={
                    () => {
                        setIsModalVisible(true);
                        tempCompany.current = selectedCompany;
                    }
                }
            >点击选择</Button>
            {
                selectedCompany ?
                    <div
                        className={styles.selector}
                    >
                        <span
                            title={selectedCompany.cooperationCompanyName}
                            style={{
                                flex: 1,
                                overflow: "hidden",
                                lineHeight: 1.5715,
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {selectedCompany.cooperationCompanyName}
                        </span>
                        <button 
                            className="ant-btn ant-btn-text ant-btn-sm ant-btn-icon-only"
                            onClick={
                                () => {
                                    onSelectedCompanyChange(null);
                                }
                            }
                        >
                            <DeleteOutlined style={{ color: "#f00" }}/>
                        </button>
                    </div> :
                    null
            }
            <Modal
                visible={isModalVisible}
                title="选择合作方"
                style={{
                    top: "10px"
                }}
                onOk={() => {
                    setIsModalVisible(false);
                }}
                onCancel={() => {
                    setIsModalVisible(false);
                    // 还原 不能调用多个onChange
                    setSelectedCompany(tempCompany.current);
                    triggerChange({
                        selectedCompany: tempCompany.current,
                    });
                }}
                footer={
                    <div>
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
                                setSelectedCompany(tempCompany.current);
                                triggerChange({
                                    selectedCompany: tempCompany.current,
                                });
                            }
                        }>取消</Button>
                    </div>
                }
            >
                <>
                    <Search
                        placeholder="搜索合作方"
                        allowClear
                        enterButton="搜索"
                        size="large"
                        onSearch={(value) => {
                            keyword.current = value;
                            requestCompanys();
                        }}
                    />
                    <List
                        // loading={isLoading}
                        style={{ maxHeight: "500px", width: "100%", overflowY: "auto" }}
                        itemLayout="horizontal"
                        dataSource={companys}
                        renderItem={item => (
                            <List.Item
                                extra={
                                    <Checkbox
                                        checked={
                                            selectedCompany && selectedCompany.cooperationCompanySn === item.partnerSn
                                        }
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                onSelectedCompanyChange({ cooperationCompanySn: item.partnerSn, cooperationCompanyName: item.name });
                                            } else {
                                                onSelectedCompanyChange(null);
                                            }
                                        }}
                                    />
                                }>
                                <Skeleton avatar title={false} loading={isLoading} active>
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar src={item.image} />
                                        }
                                        title={
                                            <div style={{ fontSize: 14 }}>{item.name}</div>
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
}