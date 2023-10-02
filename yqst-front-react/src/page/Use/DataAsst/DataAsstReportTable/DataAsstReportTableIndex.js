/*
 * @Description  : 数据助手报表首页
 * @version      : 0.1
 * @Author       : Chenglin Huang
 * @Date         : 2021-05-25 16:57:46
 * @LastEditTime : 2021-07-01 14:18:51
 */
import React, {useState, useCallback, useEffect, useRef} from "react";
import ViewCoat from "../../PublicModule/ViewCoat/ViewCoat";
import DataAsstReportTableList from "./Components/DataAsstReportTableList";
import request from "../../../../utils/request/request";
import apiInterfaces from "../apiInterfaces";
import styles from "../DataAsst.module.css";
import {Button, DatePicker, Form} from "antd";
import moment from "moment";

const {RangePicker} = DatePicker;

export default function DataAsstReportTableIndex() {

    const endTime = useRef();
    const startTime = useRef();
    const [data, setData] = useState([]); // 列表数据
    const keyWord = useRef("");
    const [total, setTotal] = useState();
    const [form] = Form.useForm();
    const pageSize = 10;

    const requestReportTableList = useCallback((current = 1, sortType = null) => {
        request(
            apiInterfaces.reportTableList,
            {
                current: current,
                pageSize: pageSize.current,
                endTime: endTime.current,
                startTime: startTime.current,
                sortType: sortType,
                keyWord: keyWord.current,
            },
            (res) => {
                setData(res.data.records || []);
                setTotal(res.data.total);
            },
            (err) => {
                console.warn(err);
            }
        );
    }, []);

    useEffect(
        () => {
            requestReportTableList();
        },
        [requestReportTableList]
    );

    const _onReset = useCallback(() => {
        form.resetFields();
        // 列表刷新一次
        keyWord.current = "";
        startTime.current = null;
        endTime.current = null;
        requestReportTableList();
    }, [requestReportTableList, form]);

    const _onFinish = useCallback((values) => {
        startTime.current = values.time ? moment(values.time[0]).format() : null;
        endTime.current = values.time ? moment(values.time[1]).format() : null;
        keyWord.current = values.keyWord;
        requestReportTableList();
    }, [requestReportTableList]);

    return (
        <ViewCoat
            breadCrumb={[
                {title: "数据助手"},
                {title: "报表生成记录"},
            ]}
        >
            <h2 className={styles.smalltitle}> 生成记录 </h2>

            <Form
                layout="inline"
                onFinish={_onFinish}
                form={form}
                style={{marginLeft: 36}}
            >
                <Form.Item
                    name="time"
                    label={
                        <span className={styles.label}>
                            创建时间
                        </span>
                    }
                >
                    <RangePicker size="large"/>
                </Form.Item>
                {/* <Form.Item
                    name="keyWord"
                >
                    <Input size="large" allowClear placeholder="关键字（外租订单号、承租单位）" style={{ width: 400 }} />
                </Form.Item> */}
                <Form.Item>
                    <Button size="large" type="primary" htmlType="submit">搜索</Button>
                </Form.Item>
                <Form.Item>
                    <Button size="large" onClick={_onReset}>重置</Button>
                </Form.Item>
            </Form>
            <DataAsstReportTableList
                data={data}
                total={total}
                pageSize={pageSize}
                onRefresh={requestReportTableList}
                startTime={startTime.current}
                endTime={endTime.current}
            />
        </ViewCoat>
    );
}
