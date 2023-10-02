/* eslint-disable jsx-a11y/anchor-is-valid */
/*
 * @Description  :
 * @version      : 0.1
 * @Author       : Chenglin Huang
 * @Date         : 2021-05-26 17:39:11
 * @LastEditTime : 2021-07-02 17:26:17
 */
import React, {useRef, memo, useMemo} from "react";
import {Popover, Badge} from "antd";
import SWTable from "SWViews/table";
import moment from "moment";

function DataAsstReportTableList({startTime, endTime, data, onRefresh, total, pageSize}) {

    const sortType = useRef();
    const current = useRef();

    const _columns = useMemo(() => ([
        {
            title: "文件名",
            key: "fileName",
            dataIndex: "fileName",
            width: '15%',
            render: (text) => {
                // switch (text) {
                //     // 1.客户（出租报表）2.供应商（承租报表）
                //     case 1:
                //         return "出租";
                //     case 2:
                //         return "承租";
                //     case 3:
                //         return "项目";
                //     default:
                //         break;
                // }
                return text
            }
        },
        {
            title: "开始时间",
            key: "startTime",
            dataIndex: "startTime",
            width: '15%',
        },
        {
            title: "结束时间",
            key: "endTime",
            dataIndex: "endTime",
            width: '15%',
        },
        {
            title: "供应商/客户/项目",
            key: "lessorList",
            dataIndex: "lessorList",
            width: '17%',
            render: (text, record) => {
                if (record.type == 1) {
                    //客户
                    const content = (
                        <div style={{maxHeight: "200px", overflow: "auto"}}>
                            {
                                record.lesseeList && record.lesseeList.length > 0 ?
                                    record.lesseeList.map((item) => {
                                        return (
                                            <p key={item.lesseeSn}>
                                                {item.lesseeName}
                                            </p>
                                        );
                                    }) : <p>全部客户</p>
                            }
                        </div>
                    );
                    return (
                        <Popover content={content} title="客户列表" trigger="click">
                            <a>
                                {
                                    record.lesseeList ?
                                        <>
                                            {
                                                record.lesseeList.length > 0 ?
                                                    <>{record.lesseeList.length}个客户</> :
                                                    <>全部客户</>
                                            }
                                        </> :
                                        ""
                                }
                            </a>
                        </Popover>
                    );
                } else if (record.type == 2) {
                    //供应商
                    const content = (
                        <div style={{maxHeight: "200px", overflow: "auto"}}>
                            {
                                record.lessorList && record.lessorList.length > 0 ?
                                    record.lessorList.map((item) => {
                                        return (
                                            <p key={item.lessorSn}>
                                                {item.lessorName}
                                            </p>
                                        );
                                    }) : <p>全部供应商</p>
                            }
                        </div>
                    );
                    return (
                        <Popover content={content} title="供应商列表" trigger="click">
                            <a>
                                {
                                    record.lessorList ?
                                        <>
                                            {
                                                record.lessorList.length > 0 ?
                                                    <>{record.lessorList.length}个供应商</> :
                                                    <>全部供应商</>
                                            }
                                        </> :
                                        ""
                                }
                            </a>
                        </Popover>
                    );
                } else if (record.type == 3) {
                    //项目
                    const content = (
                        <div style={{maxHeight: "200px", overflow: "auto"}}>
                            {
                                record.projectList && record.projectList.length > 0 ?
                                    record.projectList.map((item) => {
                                        return (
                                            <p key={item.projectSn}>
                                                {item.projectName}
                                            </p>
                                        );
                                    }) : <p>全部项目</p>
                            }
                        </div>
                    );
                    return (
                        <Popover content={content} title="项目列表" trigger="click">
                            <a>
                                {
                                    record.projectList ?
                                        <>
                                            {
                                                record.projectList.length > 0 ?
                                                    <>{record.projectList.length}个项目</> :
                                                    <>全部项目</>
                                            }
                                        </> :
                                        ""
                                }
                            </a>
                        </Popover>
                    );
                } else {
                    return null;
                }
            }
        },
        {
            title: "种类名称",
            key: "kindName",
            dataIndex: "kindName",
            width: '15%',
        },
        {
            title: "创建时间",
            sorter: true,
            key: "createTime",
            dataIndex: "createTime",
            width: '15%',
        },
        {
            title: "",
            key: "url",
            dataIndex: "url",
            render: (text, record) => {

                if (moment(record.createTime).isSame(moment(), "d")) {
                    return (
                        <Badge size="default" dot>
                            <a
                                href={window.getOrginUrl(text)}
                                download
                            >
                                下载
                            </a>
                        </Badge>
                    );
                }
                return (
                    <a
                        href={window.getOrginUrl(text)}
                        download
                    >
                        下载
                    </a>
                );
            }
        }
    ]), []);

    return (
        <SWTable
            rowKey="sn"
            dataSource={data}
            columns={_columns}
            onChange={
                (pagination, filters, sorter) => {
                    // 升序
                    if (sorter.order === "ascend") {
                        sortType.current = 1;
                        // 降序
                    } else if (sorter.order === "descend") {
                        sortType.current = 2;
                    }
                    onRefresh(current.current, sortType.current);
                }
            }
            pagination={
                {
                    total: total,
                    current: current.current,
                    pageSize: pageSize,
                    onChange: (page, b) => {
                        current.current = page;
                        onRefresh(current.current, sortType.current);
                    },
                    showTotal: (total, range) => `共有${total}条`
                }
            }
        />
    );
}

export default memo(DataAsstReportTableList);
