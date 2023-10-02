import React, {memo, useState, useCallback} from "react";
import {Form, DatePicker, Select, Spin, Button, Col, message} from "antd";
import styles from "../../DataAsst.module.css";
import request from "../../../../../utils/request/request";
import apiInterfaces from "../../apiInterfaces";
import LesseeSelector from "./LesseeSelector";
import moment from "moment";

const {RangePicker} = DatePicker;
const {Option} = Select;
const _layout = {
    wrapperCol: {span: 10},
    labelCol: {span: 3}
};

export default memo(function DataAsstLessorForm({onSubmitSuccess}) {

    const [isKindListLoading, setIsKindListLoading] = useState(false);
    const [kindlist, setKindlist] = useState(null);
    const [isSubmitLoading, setIsSubmitLoading] = useState(false);

    const _onKindlistDropdownVisibleChange = useCallback((open) => {
        if (open && !kindlist) {
            setIsKindListLoading(true);
            request(
                apiInterfaces.lessorExportList,
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

    const _onFinish = (values) => {
        setIsSubmitLoading(true);
        const params = {
            // kindId: values.kind,
            lesseeList: values.lessee.map(
                (item) => {
                    return {
                        lesseeSn: item.value,
                        lesseeName: item.label,
                    };
                }
            ),
            startTime: moment(values.time[0]).format(),
            endTime: moment(values.time[1]).format(),
        };
        request(
            '/api/v1/microdata/statistics/enclosure/payee/express/fee/detail/excel/url/add',
            params,
            (res) => {
                message.success("报表已提交后台生成，稍后刷新列表！");
                onSubmitSuccess();
                setIsSubmitLoading(false);
            },
            (err) => {
                setIsSubmitLoading(false);
            },
            false
        );
    };

    return (
        <Form
            {..._layout}
            requiredMark={false}
            onFinish={_onFinish}
        >
            <Form.Item name="time"
                       label={
                           <span className={styles.label}>
                        统计时间
                                </span>
                       }
                       className={styles.formitem}
                       rules={[
                           {
                               type: "array",
                               required: true,
                               message: "请选择统计时间!",
                           },
                       ]}>
                <RangePicker separator="至" size="large"/>
            </Form.Item>
            {/*<Form.Item name="kind"*/}
            {/*    label={*/}
            {/*        <span className={styles.label}>*/}
            {/*            报表种类*/}
            {/*        </span>*/}
            {/*    }*/}
            {/*    className={styles.formitem}*/}
            {/*    rules={[*/}
            {/*        {*/}
            {/*            required: true,*/}
            {/*            message: "请选择报表种类!",*/}
            {/*        },*/}
            {/*    ]}>*/}
            {/*    <Select*/}
            {/*        placeholder="请选择"*/}
            {/*        loading={isKindListLoading}*/}
            {/*        onDropdownVisibleChange={_onKindlistDropdownVisibleChange}*/}
            {/*        notFoundContent={isKindListLoading ? <Spin size="small" /> : null}*/}
            {/*        size="large"*/}
            {/*    >*/}
            {/*        {*/}
            {/*            kindlist && kindlist.map(*/}
            {/*                (item) => {*/}
            {/*                    return (*/}
            {/*                        <Option value={item.kindId} key={item.kindId}>{item.kindName}</Option>*/}
            {/*                    );*/}
            {/*                }*/}
            {/*            )*/}
            {/*        }*/}
            {/*    </Select>*/}
            {/*</Form.Item>*/}
            <Form.Item
                name="lessee"
                initialValue={[]}
                label={
                    <span className={styles.label}>
                        客户
                    </span>
                }
                // rules={[
                //     {
                //         required: true,
                //         message: "请选择客户!",
                //     },
                // ]}
                className={styles.formitem}
            >
                <LesseeSelector/>
            </Form.Item>

            <Col className={styles.formitem} offset="3">
                <Button type="primary" htmlType="submit" size="large" loading={isSubmitLoading}>生成报表</Button>
            </Col>
        </Form>
    );
});
