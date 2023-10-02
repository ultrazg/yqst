/**
 * Created by jinfenliu on 2017/12/29.
 */
import React, {Component} from 'react';
import {Card, Button, Form, Select, Table, Menu, Dropdown, message, Modal, Input} from 'antd';
import {EllipsisOutlined} from '@ant-design/icons';
import {connect} from 'react-redux';
import HeadBar from '../../../baseview/headbar/HeadBar';

class UserList extends Component {
    limit = 10;

    constructor(props) {
        super(props);
        this.state = {
            userList: [],
            pagination: {pageSize: this.limit, total: 0},
            delVisible: false,
        };
    }

    componentDidMount() {
        let tempListData = [];
        for (var i = 0; i < 15; i++) {
            tempListData.push({
                id: i,
                userId: i * 123,
                nickName: '提莫队长',
                userName: '17022223333',
                state: '在线',
                registerTime: '2018-1-2 12:12',
                lastTime: '2018-1-2 12:30',
            });
        }
        this.setState({
            userList: tempListData,
        });
    }

    handleTableChange = (pagination, filters, sorter) => {
        const pager = {...this.state.pagination};
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
    }

    /**
     * 表格操作下拉菜单
     * @param record 当行表格数据
     */
    dropDownMenu = (record) => {
        return (
            <Menu onClick={(e) => this.dropDownClick(e, record)}>
                <Menu.Item key="see">查看</Menu.Item>
                <Menu.Item key="more">更多</Menu.Item>
            </Menu>
        )
    };

    dropDownClick(e, record) {
        switch (e.key) {
            case 'see':
                break;
            case 'more':
                break;
        }
    };

    render() {
        const columns = [
            {title: '序号', dataIndex: 'id'},
            {title: '用户ID', dataIndex: 'userId'},
            {title: '用户昵称', dataIndex: 'nickName'},
            {title: '用户名／手机号', dataIndex: 'userName'},
            {title: '状态', dataIndex: 'state'},
            {title: '注册时间', dataIndex: 'registerTime'},
            {title: '最后操作日期', dataIndex: 'lastTime'},
            {
                title: '操作',
                key: 'operation',
                render: (text, record) => <div className="table-action">
                    <Dropdown placement="bottomRight" overlay={this.dropDownMenu(record)}>
                        <EllipsisOutlined />
                    </Dropdown></div>,
            },
        ];
        return (
            <div style={{width: this.props.IndexReducers.contentWidth}}>
                <HeadBar data={[{name: "用户中心"}, {name: "用户列表"}]}/>
                <Card title="用户列表" className="card-search-header">
                    <div style={{
                        display: 'flex',
                        height: 44,
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 10,
                    }}>
                        <div style={{minWidth: 70}}>
                            <span>用户昵称：</span>
                        </div>
                        <Input style={{maxWidth: 150}} placeholder="请输入"/>
                        <div style={{minWidth: 70, marginLeft: 15}}>
                            <span>手机号：</span>
                        </div>
                        <Input style={{maxWidth: 150}} placeholder="请输入"/>
                        <div style={{display: 'flex', flex: 1}}/>
                        <Button style={{marginRight: 25}} type="primary">搜索</Button>
                    </div>
                    <Table pagination={this.state.pagination}
                           onChange={this.handleTableChange}
                           columns={columns}
                           dataSource={this.state.userList}
                           bordered
                    />
                </Card>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {IndexReducers} = state;
    return {IndexReducers}
}

export default connect(mapStateToProps)(UserList)