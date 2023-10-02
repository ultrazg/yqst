import React, {Component} from 'react';
import {Button, Col, Empty, Form, Row, Table, Tabs, Timeline} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import get from 'lodash/get';
import ViewContent from '../../../../baseview/viewContent/ViewContent';
import AssemblySet from '../../../../baseview/assemblySet/AssemblySet';
import moment from 'moment';
import model from './model';
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
        model.EnterpriseUsersGroupGet({groupId: this.pageQuery.groupId}, res => {
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
                        {name: '权限详情'}
                    ]
                }
            >
                <Tabs style={{minHeight: 300}} onChange={this.tabChange} type="card">
                    <Tabs.TabPane tab="权限组信息" key="1">
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
                    <Tabs.TabPane tab="功能设置" key="2">
                        <div style={{paddingLeft: 20}}>
                            <Button type='primary'><PlusOutlined />选择</Button>
                            <span style={{padding: '0 10px'}}>员工数 : {
                                get(defaultValue, 'getRangeDTOS') ?
                                    defaultValue.getRangeDTOS.length : 0
                            }</span>
                        </div>
                        <div>
                            {this.renderTable()}
                        </div>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="使用范围" key="3">
                        <div style={{paddingLeft: 20}}>
                            <Button type='primary'><PlusOutlined />选择</Button>
                            {/*<span style={{padding: '0 10px'}}>员工数 : {}</span>*/}
                        </div>
                        <div>
                            {this.renderScopeOfUse()}
                        </div>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="操作纪录" key="4">
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

    renderScopeOfUse = () => {
        const {defaultValue} = this.state;
        const columns = [
            {title: '类型', dataIndex: 'rangeName'},
            {title: '已选择', dataIndex: 'rangeContent'},
            {title: '操作', dataIndex: 'num', render: text => <a>选择</a>}
        ];
        return (
            <div style={{padding: 20}}>
                <Table
                    columns={columns}
                    rowKey='id'
                    dataSource={get(defaultValue, 'getRangeDTOS')}
                />
            </div>
        );
    };

    renderTable = () => {
        const {defaultValue} = this.state;
        const columns = [
            {title: '应用 ID', dataIndex: 'id'},
            {title: '应用名称', dataIndex: 'resName'},
            {title: '功能数', dataIndex: 'num'}
        ];

        function expandedRowRender(record) {
            const childrenColumns = [
                {title: '功能名称', dataIndex: 'resName'},
                {title: '功能描述', dataIndex: 'resDesc'},
                {title: '操作', dataIndex: 'num', render: text => <a style={{color: '#F5222D'}}>删除</a>}
            ];
            return (
                <Table
                    columns={childrenColumns}
                    dataSource={get(record, 'listResourceDTOS')}
                    pagination={{hideOnSinglePage: true}}
                />
            );
        }

        return (
            <div style={{padding: 20}}>
                <Table
                    columns={columns}
                    rowKey='id'
                    expandedRowRender={expandedRowRender}
                    dataSource={get(defaultValue, 'listResourceDTOS')}
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
                key: 'id',
                type: 'Texts',
                label: '权限 ID',
                span: 12,
                value: get(defaultValue, 'getGroupDTO.id')
            },
            {
                key: 'createTime',
                type: 'Texts',
                label: '创建时间',
                span: 12,
                value: get(defaultValue, 'getGroupDTO.createTime') ? moment(defaultValue.getGroupDTO.createTime).format('YYYY-MM-DD HH:mm:ss') : ''
            },
            {
                key: 'groupName',
                type: 'Texts',
                label: '权限组名称',
                span: 12,
                value: get(defaultValue, 'getGroupDTO.groupName')
            },
            {
                key: 'groupDesc',
                type: 'Texts',
                label: '权限组描述',
                span: 12,
                value: get(defaultValue, 'getGroupDTO.groupDesc')
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
