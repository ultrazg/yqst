import React, {Component} from 'react';
import {Form, Table, Badge} from 'antd';
import assign from 'lodash/assign';
import moment from 'moment';

import HeadSearch from '../../../../baseview/headSearch/HeadSearch';
import ViewContent from '../../../../baseview/viewContent/ViewContent';
import Ellipsis from '../../../../baseview/Ellipsis';
import model from './model';
import {filterObject} from '../../../../utils';

class SubjectLists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: {
                list: [],
                current: 1,
                pageSize: 10,
                total: 0
            },
            searchData: {}
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
                searchData: searchData,
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
                placeholder: '搜索：ID / 用户名 / 用户昵称',
                label: '关键字搜索',
                maxLength: 30
            },
            {
                key: 'status',
                type: 'Select',
                placeholder: '请选择状态',
                value: '0',
                label: '状态',
                list: [
                    {name: '全部', value: '0'},
                    {name: '启用', value: '1'},
                    {name: '停用', value: '2'}
                ]
            }
        ];
        return (
            <HeadSearch data={searchData} form={this.props.form} callBack={(obj) => {
                this.getList(1, {...obj});
            }}/>
        );
    }

    // 生成列表
    makeTable() {
        const {list, total, current, pageSize} = this.state.tableData;
        const columns = [
            {title: '用户 ID', key: 'id', dataIndex: 'id'},
            {
                title: '用户名', key: 'userName', dataIndex: 'userName', render: text => (
                    <Ellipsis length={15} tooltip>{text}</Ellipsis>
                )
            },
            {
                title: '用户昵称', key: 'alias', dataIndex: 'alias', render: text => (
                    <Ellipsis length={15} tooltip>{text}</Ellipsis>
                )
            },
            {
                title: '注册时间', key: 'createTime', dataIndex: 'createTime', render: text => (
                    <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>
                )
            },
            {
                title: '状态', key: 'status', dataIndex: 'status', render: text => (
                    <Badge
                        status={text === 1 ? 'success' : 'error'}
                        text={text === 1 ? '启用中' : '停用中'}
                    />
                )
            },
            {
                title: '操作',
                key: '',
                dataIndex: '',
                width: 100,
                render: (text, record) => (
                    <a
                        onClick={() => this.props.history.push(`/Pages/PersonalUserDetail?id=${record.id}`)}
                    >
                        编辑
                    </a>
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
