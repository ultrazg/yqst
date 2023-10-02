/**
 * Created by yb
 */

import React from 'react';
import {Button, Form, Table,} from 'antd';
import {Link} from "react-router-dom";
import TabsViewContent from "../../../../baseview/tabsViewContent/TabsViewContent";
import HeadSearch from "../../../../baseview/headSearch/HeadSearch";


const columns = [
    {
        title: '服务ID',
        dataIndex: 'id'
    },
    {
        title: '服务编码',
        dataIndex: 'serviceCode'
    },
    {
        title: '服务名称',
        dataIndex: 'serviceName'
    },
    {
        title: '服务单位',
        dataIndex: 'unit'
    },
    {
        title: '创建时间',
        dataIndex: 'createTime'
    },
    {
        title: '操作',
        dataIndex: 'handle',
        render: ()=> {
            return (
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-around'
                }}>
                    <a>查看</a>
                    <a>删除</a>
                </div>
            )
        }
    }
];
const data = [{}];


class ESServeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <TabsViewContent
                crumb={[{name: '电子签章服务中心'}, {name: '服务管理'}, {name: "服务列表"}]}
                topBtn={
                    <Button type='primary' icon='plus'>添加服务</Button>
                }
            >
                {this.makeHeadSearch()}
                {this.tableView()}
            </TabsViewContent>
        );
    }


    makeHeadSearch() {
        const searchDatas = [
            {key: 'keyWord', type: 'Input', value: '', placeholder: '可查询服务名称', label: '关键字', maxLength: 30},
            {key: 'times', type:'RangePicker', value:'', placeholder: ['开始时间', '结束时间'], label: '创建时间',},
        ];
        return <HeadSearch data={searchDatas} form={this.props.form} callBack={(obj) => {
            console.log(obj)
        }}/>
    }


    tableView = ()=> {
        return (
            <Table
                columns={columns}
                dataSource={data}
                bordered
            />
        )
    }

}

export default ESServeList
