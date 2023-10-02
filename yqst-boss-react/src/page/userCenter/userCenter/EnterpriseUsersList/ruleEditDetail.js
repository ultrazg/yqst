import React, {Component} from 'react';
import {Button, Col, Empty, Form, Row, Table, Tabs, Timeline} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import get from 'lodash/get';
import ViewContent from '../../../../baseview/viewContent/ViewContent';
import AssemblySet from '../../../../baseview/assemblySet/AssemblySet';
import model from './model';
import moment from 'moment';
import {getPageQuery} from '../../../../utils';

class RuleAddDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultValue: undefined
        };
        this.pageQuery = getPageQuery() || {};
    }

    componentDidMount() {
        this.getDefaultValue();
    }

    getDefaultValue = () => {
        model.EnterpriseUsersRoleGet({roleId: this.pageQuery.ruleId}, res => {
            if (res && res.ret === 0) {
                this.setState({
                    defaultValue: res.data
                });
            }
        });
    };

    componentWillUnmount() {

    }

    tabChange = (key) => {
    };

    render() {
        const {defaultValue} = this.state;
        return (
            <ViewContent
                style={{marginBottom: 30}}
                crumb={
                    [
                        {name: '企业用户管理'},
                        {name: '企业用户列表', link: '/Pages/EnterpriseUsersList'},
                        {name: '角色与权限详情', link: `/Pages/EnterpriseUsersJurisdiction?id=${this.pageQuery.id}`},
                        {name: '角色详情'}
                    ]
                }
            >
                <Tabs style={{minHeight: 300}} onChange={this.tabChange} type="card">
                    <Tabs.TabPane tab="角色信息" key="1">
                        <Row>
                            <Col span={18}>
                                {this.renderBaseInfo()}
                            </Col>
                            <Col span={6}>
                                <div><Button type='danger'>删除</Button></div>
                                <div style={{marginTop: 10}}><Button type='primary'>保存</Button></div>
                            </Col>
                        </Row>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="员工列表" key="2">
                        <div style={{paddingLeft: 20}}>
                            <Button type='primary'><PlusOutlined />选择</Button>
                            <span style={{padding: '0 10px'}}>员工数 : {get(defaultValue, 'num')}</span>
                        </div>
                        <div>
                            {this.renderTable()}
                        </div>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="操作纪录" key="3">
                        {this.renderOperationalRecords()}
                    </Tabs.TabPane>
                </Tabs>
            </ViewContent>
        );
    }

    renderOperationalRecords = () => {
        const {defaultValue} = this.state;
        return (
            <div style={{marginLeft: 30}}>
                {
                    get(defaultValue, 'listCompanyLogDTOS') && get(defaultValue, 'listCompanyLogDTOS').length !== 0
                        ?
                        <Timeline>
                            {
                                defaultValue.listCompanyLogDTOS.map((item, index) => {
                                    return (
                                        <Timeline.Item key={item.createTime + index}>
                                            <h3>{item.content}</h3>
                                            <p>操作人: {item.name}</p>
                                            <p>操作时间: {moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}</p>
                                        </Timeline.Item>
                                    );
                                })
                            }
                        </Timeline>
                        :
                        <Empty/>
                }
            </div>
        );
    };

    renderTable = () => {
        const {defaultValue} = this.state;
        const columns = [
            {title: '员工 ID', dataIndex: 'id'},
            {title: '员工姓名', dataIndex: 'staffName'},
            {title: '用户 ID', dataIndex: 'uid'},
            {
                title: '身份', dataIndex: 'isAdmin', render: text => (
                    <span>{text + '' === '0' ? '员工' : '管理员'}</span>
                )
            },
            {title: '部门', dataIndex: 'deptName'},
            {title: '职务', dataIndex: 'jobName'},
            {title: '联系电话', dataIndex: 'phone'},
            {
                title: '加入时间', dataIndex: 'createTime', render: text => (
                    <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>
                )
            }
        ];
        return (
            <div style={{padding: 20}}>
                <Table
                    columns={columns}
                    rowKey='id'
                    dataSource={get(defaultValue, 'listStaffMsgDTOList')}
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
                label: '角色 ID',
                span: 12,
                value: get(defaultValue, 'getRoleMsgDTO.id')
            },
            {
                key: 'createTime',
                type: 'Texts',
                label: '创建时间',
                span: 12,
                value: get(defaultValue, 'getRoleMsgDTO.createTime')
                    ? moment(defaultValue.getRoleMsgDTO.createTime).format('YYYY-MM-DD HH:mm:ss') : ''
            },
            {
                key: 'createTime',
                type: 'Texts',
                label: '角色名称',
                span: 12,
                value: get(defaultValue, 'getRoleMsgDTO.roleName')
            },
            {
                key: 'createTime',
                type: 'Texts',
                label: '角色描述',
                span: 12,
                value: get(defaultValue, 'getRoleMsgDTO.roleDesc')
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

export default RuleAddDetail;
