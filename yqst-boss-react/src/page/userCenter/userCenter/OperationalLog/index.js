import React, {Component} from 'react';
import {Form, Table, Badge} from 'antd';
import assign from 'lodash/assign';
import moment from 'moment';

import HeadSearch from '../../../../baseview/headSearch/HeadSearch';
import ViewContent from '../../../../baseview/viewContent/ViewContent';
import {filterObject} from '../../../../utils';
import model from './model';

class SubjectLists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchData: {},
            tableData: {
                list: [],
                current: 1,
                pageSize: 10,
                total: 0
            }
        };
    }

    componentDidMount() {
        this.getList();
    }

    // 获取页面 table 数据逻辑
    getList = (current = this.state.tableData.current, searchData = this.state.searchData) => {
        const {tableData} = this.state;
        const {pageSize} = tableData;
        const cons = {current, pageSize, ...searchData};
        model.page(filterObject(cons), (res) => {
            this.setState({
                searchData,
                tableData: assign(tableData, {
                    list: res.data.records,
                    total: res.data.total,
                    current: res.data.current
                })
            });
        });
    };

    // 视图层
    render() {
        return (
            <ViewContent crumb={[{name: '个人用户管理'}, {name: '个人用户列表'}]}>
                <div style={{background: '#fff', padding: '5px', margin: '5px', borderRadius: '6px'}}>
                    {this.makeHeadSearch()}
                    {this.makeTable()}
                </div>
            </ViewContent>
        );
    }

    // 生成搜索内容
    makeHeadSearch() {
        // 搜索字段
        const searchData = [
            {
                key: 'keyWord',
                type: 'Input',
                placeholder: '搜索：序号 / 用户 ID / 企业 ID/ URL 地址',
                label: '关键字搜索',
                maxLength: 30
            },
            {
                key: 'platform',
                type: 'Select',
                placeholder: '请选择平台',
                value: '',
                label: '平台',
                list: [
                    {name: '全部', value: ''},
                    {name: 'App', value: '1'},
                    {name: 'PC', value: '3'},
                    {name: 'Web', value: '2'},
                    {name: '终端', value: '4'}
                ]
            },
            {
                key: 'date',
                type: 'RangePicker',
                placeholder: ['开始时间', '结束时间'],
                label: '选择日期'
            }
        ];
        return (
            <HeadSearch data={searchData} form={this.props.form} callBack={(obj) => {
                const searchData = {
                    ...obj,
                    startTime: obj.date[0],
                    endTime: obj.date[1]
                };
                delete searchData.date;
                this.getList(1, searchData);
            }}/>
        );
    }

    // 生成列表
    makeTable() {
        const {list, total, current, pageSize} = this.state.tableData;
        const platformName = ['', 'App', 'Web', 'PC', '终端'];
        const columns = [
            {title: '序号', key: 'id', dataIndex: 'id'},
            {
                title: '用户 ID', key: 'uid', dataIndex: 'uid', render: text => (
                    <span>{text}</span>
                )
            },
            {
                title: '操作企业 ID', key: 'userId', dataIndex: 'userId', render: text => (
                    <span>{text}</span>
                )
            },
            {
                title: 'IP 地址', key: 'ipAddress', dataIndex: 'ipAddress', render: text => (
                    <span>{text}</span>
                )
            },
            {
                title: '平台', key: 'platform', dataIndex: 'platform', render: text => (
                    <span>{platformName[text]}</span>
                )
            },
            {
                title: 'url 地址', key: 'url', dataIndex: 'url', render: text => (
                    <span>{text}</span>
                )
            },
            {
                title: '操作时间', key: 'createTime', dataIndex: 'createTime', render: text => (
                    <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>
                )
            },
            {
                title: '结果', key: 'result', dataIndex: 'result', render: text => (
                    <Badge status={text === 1 ? 'success' : 'error'} text={text === 1 ? '成功' : '失败'}/>
                )
            }
        ];
        return (
            <Table
                columns={columns}
                dataSource={list}
                rowKey={(record) => {
                    return record.id;
                }}
                size='default'
                pagination={
                    {
                        total,
                        current,
                        pageSize,
                        onChange: (a, b) => {
                            this.getList(a);
                        },
                        showTotal: (total, range) => `共有${total}条`
                    }
                }
            />
        );
    }
}

const SubjectList = SubjectLists;

export default SubjectList;
