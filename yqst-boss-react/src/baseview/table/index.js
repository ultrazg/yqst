import {Table} from "antd";
import React from "react";
import moment from 'moment';

/**
 * Created by ljy on 2018-12-25
 */
export default function (props) {
    // 处理列表没有数据的情况，防止没有数据的时候出现滚动条
    if(props.dataSource && props.dataSource.length <= 0){
        if(props.scroll && props.scroll.x){
            props.scroll.x = false;
        }
        props.columns && props.columns.forEach(item => {
            if(item.fixed){
                item.fixed = false;
            }
        });
    }

    return <Table
        {...props}
        // dataSource={props.dataSource ?
        //     (props.pagination ?
        //         props.dataSource.map((item, index) => {
        //             return {
        //                 ...item,
        //                 key: item.key ? item.key : (moment().valueOf() + "-" + index)
        //             }
        //         }) : props.dataSource)
        //     : []}
        dataSource={props.dataSource && props.dataSource.length > 0 ? props.dataSource.map((item, index) => {
            return {
                ...item,
                key: item.key ? item.key : (moment().valueOf() + "-" + index)
            }
        }) : []}
        {...(props.pagination?{
            pagination: {
                showSizeChanger: false,
                ...props.pagination,
            }}:{})}
    />
}
