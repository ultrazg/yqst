import React, {Component} from 'react';
import {Card, Form, Button, Table, Tabs} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import get from 'lodash/get';
import ViewContent from '../../../../baseview/viewContent/ViewContent';
import AssemblySet from '../../../../baseview/assemblySet/AssemblySet';
import model from './model';
import moment from 'moment';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultValue: undefined,
            staffVisible: false,
            departmentVisible: false,
            postVisible: false
        };
        this.id = this.props.location.search.substr(1).split('=')[1];
    }

    componentDidMount() {
        if (this.id) {
            this.getDefaultValue();
        }
    }

    componentWillUnmount() {

    }

    getDefaultValue = () => {
        model.getJurisdiction({userId: this.id}, res => {
            if (res && res.ret === 0) {
                this.setState({
                    defaultValue: res.data
                });
            }
        });
    };

    tabChange = (key) => {
        console.log(key);
    };

    render() {
        return (
            <ViewContent
                backgroundColor='rgba(0,0,0,0)'
                style={{marginBottom: 30}}
                crumb={
                    [
                        {name: '企业用户管理'},
                        {name: '企业用户列表', link: '/Pages/EnterpriseUsersList'},
                        {name: '角色与权限详情'}
                    ]
                }
            >
                <Card title='基本信息'>
                    {this.renderBaseInfo()}
                </Card>
                <Tabs onChange={this.tabChange} type="card"
                      style={{backgroundColor: '#fff', marginTop: 15, minHeight: 400}}>
                    <Tabs.TabPane tab="角色管理" key="1">
                        {this.renderRule()}
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="权限管理" key="2">
                        {this.renderJurisdiction()}
                    </Tabs.TabPane>
                </Tabs>
            </ViewContent>
        );
    }

    renderRule = () => {
        const {defaultValue} = this.state;
        const columns = [
            {title: '角色 ID', dataIndex: 'id'},
            {title: '角色名称', dataIndex: 'roleName'},
            {title: '角色描述', dataIndex: 'roleDesc'},
            {title: '员工数', dataIndex: 'num'},
            {
                title: '创建时间', dataIndex: 'createTime', render: text => (
                    <span>{text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : ''}</span>
                )
            },
            {
                title: '操作',
                dataIndex: '',
                render: (text, record) => <a
                    onClick={() => this.props.history.push(`/Pages/EnterpriseUsersRuleEditDetail?id=${this.id}&ruleId=${record.id}`)}>查看</a>
                // render: text => <a>查看</a>
            }
        ];
        return (
            <div style={{padding: 20}}>
                <Button
                    // onClick={() => this.props.history.push('/Pages/EnterpriseUsersRuleAddDetail')}
                    type='primary'
                >
                    <PlusOutlined />新建
                </Button>
                <Table
                    columns={columns}
                    rowKey='id'
                    dataSource={get(defaultValue, 'listRoleDTOS')}
                    pagination={false}
                />
            </div>
        );
    };

    renderJurisdiction = () => {
        const {defaultValue} = this.state;
        const columns = [
            {title: '权限 ID', dataIndex: 'id'},
            {title: '权限组名称', dataIndex: 'groupName'},
            {title: '权限组描述', dataIndex: 'groupDesc'},
            {title: '使用范围', dataIndex: 'range'},
            {
                title: '创建时间', dataIndex: 'createTime', render: text => (
                    <span>{text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : ''}</span>
                )
            },
            {
                title: '操作',
                dataIndex: '',
                render: (text, record) => <a
                    onClick={() => this.props.history.push(`/Pages/PermissionGroupDetail?id=${this.id}&groupId=${record.id}`)}>查看</a>
                // render: text => <a>查看</a>
            }
        ];
        return (
            <div style={{padding: 20}}>
                <Button
                    // onClick={() => this.props.history.push('/Pages/NewPermissionGroup')}
                    type='primary'
                >
                    <PlusOutlined />新建
                </Button>
                <Table
                    columns={columns}
                    rowKey='id'
                    dataSource={get(defaultValue, 'listGroupDTOS')}
                    pagination={false}
                />
            </div>
        );
    };

    renderBaseInfo = () => {
        const {form} = this.props;
        const {defaultValue} = this.state;
        const userInfoData = [
            {
                key: 'uid',
                type: 'Texts',
                label: '企业 ID',
                span: 12,
                value: get(defaultValue, 'getAccountDTO.uid')
            },
            {
                key: 'companyName',
                type: 'Texts',
                label: '企业名称',
                span: 12,
                value: get(defaultValue, 'getAccountDTO.companyName')
            },
            {
                key: 'num',
                type: 'Texts',
                label: '企业成员数',
                span: 12,
                value: get(defaultValue, 'getAccountDTO.num')
            },
            {
                key: 'accountSn',
                type: 'Texts',
                label: '企业号',
                span: 12,
                value: get(defaultValue, 'getAccountDTO.accountSn')
            },
            {
                key: 'createTime',
                type: 'Texts',
                label: '创建时间',
                span: 12,
                value: get(defaultValue, 'getAccountDTO.createTime')
                    ? moment(defaultValue.getAccountDTO.createTime).format('YYYY-MM-DD HH:mm:ss')
                    : ''
            }
        ];
        return (
            <AssemblySet
                form={form}
                data={userInfoData}
            />
        );
    };

}

export default Detail;
