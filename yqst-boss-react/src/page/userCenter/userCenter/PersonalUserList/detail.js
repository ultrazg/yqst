import React, {Component, Fragment} from 'react';
import {Card, Form, Divider, Row, Col, Button, Table, Timeline, Empty, Popconfirm, Modal} from 'antd';
import get from 'lodash/get';

import ViewContent from '../../../../baseview/viewContent/ViewContent';
import AssemblySet from '../../../../baseview/assemblySet/AssemblySet';
import model from './model';
import moment from 'moment';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultValue: undefined
        };
        this.id = this.props.location.search.substr(1).split('=')[1];
        this.formRef = React.createRef();
    }

    componentDidMount() {
        if (this.id) {
            this.getDefaultValue();
        }
    }

    componentWillUnmount() {

    }

    getDefaultValue = () => {
        model.get({id: this.id}, res => {
            if (res && res.ret === 0) {
                this.setState({
                    defaultValue: res.data
                });
            }
        });
    };

    logoff = () => {
        console.log('注销用户');
    };

    resetPassword = () => {
        console.log('重置密码');
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.formRef.current.validateFields();
    };

    switchChange = (checked) => {
        const {setFieldsValue} = this.formRef.current;
        Modal.confirm({
            title: `确定${!checked ? '停用' : '启用'}该账户?`,
            onOk() {
                setFieldsValue({
                    status: checked
                });
            },
            onCancel() {
                setFieldsValue({
                    status: !checked
                });
            }
        });
    };

    render() {
        return (
            <Form ref={this.formRef}>
                <ViewContent
                    backgroundColor='rgba(0,0,0,0)'
                    crumb={
                        [
                            {name: '个人用户管理'},
                            {name: '个人用户列表', link: '/Pages/PersonalUserList'},
                            {name: '个人用户详情'}
                        ]
                    }
                >
                    <Card title='基本信息'>
                        {this.renderBaseInfo()}
                        <Row>
                            <Col span={24} style={{textAlign: 'center'}}>
                                <Popconfirm
                                    title="确定注销用户?"
                                    onConfirm={this.logoff}
                                    okText="确定"
                                    okType='danger'
                                    cancelText="取消"
                                >
                                    <Button type='danger'>注销用户</Button>
                                </Popconfirm>
                                <span style={{padding: '0 5px'}}/>
                                <Popconfirm
                                    title="确定重置密码?"
                                    onConfirm={this.resetPassword}
                                    okText="确定"
                                    okType='danger'
                                    cancelText="取消"
                                >
                                    <Button type='danger'>重置密码</Button>
                                </Popconfirm>
                            </Col>
                        </Row>
                        <Divider/>
                        {this.renderBaseInfo2()}
                        <Row>
                            <Col span={24} style={{textAlign: 'center'}}>
                                <Button onClick={this.handleSubmit} type='primary'>保存修改</Button>
                            </Col>
                        </Row>
                    </Card>
                    <Card title='员工信息' style={{marginTop: 15}}>
                        {
                            this.renderEmployeeInformation()
                        }
                    </Card>
                    <Card title='好友信息' style={{marginTop: 15}}>
                        {
                            this.renderFriendsInformation()
                        }
                    </Card>
                    <Card title='操作纪录' style={{marginTop: 15}}>
                        {
                            this.renderOperationalRecords()
                        }
                    </Card>
                </ViewContent>
            </Form>
        );
    }


    renderOperationalRecords = () => {
        const {defaultValue} = this.state;
        return (
            <div style={{marginLeft: 30}}>
                {
                    get(defaultValue, 'userPersonLogVOS') && get(defaultValue, 'userPersonLogVOS').length !== 0
                        ?
                        <Timeline>
                            {
                                defaultValue.userPersonLogVOS.map((item, index) => {
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

    renderFriendsInformation = () => {
        const {defaultValue} = this.state;
        const columns = [
            {title: '用户 ID', dataIndex: 'friendUid'},
            {title: '用户名', dataIndex: 'friendUid'},
            {title: '用户昵称', dataIndex: 'friendUid'},
            {title: '备注', dataIndex: 'friendUid'},
            {title: '添加时间', dataIndex: 'friendUid'},
            {title: '添加时间', dataIndex: 'friendUid'},
            {
                title: '操作', dataIndex: 'operation', render: (text, records) => (
                    <Fragment>
                        <a>编辑</a>
                        <Divider type='vertical'/>
                        <Popconfirm
                            title="确认删除?"
                            onConfirm={() => console.log('删除成功')}
                            okText="确认"
                            okType='danger'
                            cancelText="取消"
                        >
                            <a style={{color: '#F5222D'}}>删除</a>
                        </Popconfirm>
                    </Fragment>
                )
            }
        ];
        return (
            <Table
                dataSource={get(defaultValue, 'userFriendsVOS') || []}
                columns={columns}
                pagination={false}
            />
        );
    };

    renderEmployeeInformation = () => {
        const {defaultValue} = this.state;
        const columns = [
            {
                title: '企业 ID',
                dataIndex: 'cid',
                key: 'cid'
            },
            {
                title: '企业名称',
                dataIndex: 'companyName',
                key: 'companyName'
            },
            {
                title: '员工 ID',
                dataIndex: 'uid',
                key: 'uid'
            },
            {
                title: '员工姓名',
                dataIndex: 'staffName',
                key: 'staffName'
            },
            {
                title: '加入时间',
                dataIndex: 'johnTime',
                key: 'johnTime',
                render: text => (<span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>)
            },
            {
                title: '身份',
                dataIndex: 'isAdmin',
                key: 'isAdmin',
                render: text => (
                    text === 0 ? <span>员工</span> : <span style={{color: '#1890FF'}}>管理员</span>
                )
            },
            {
                title: '操作',
                dataIndex: 'address',
                key: 'address',
                render: (text, record) => (
                    record.isAdmin === 0 ? <a style={{color: '#F5222D'}}>退出企业</a> :
                        <a style={{color: '#F5222D'}}>转让管理员</a>
                )
            }
        ];
        return (
            <Table
                dataSource={get(defaultValue, 'staffInfoVOS') || []}
                columns={columns}
                pagination={false}
            />
        );
    };

    renderBaseInfo = () => {
        const {defaultValue} = this.state;
        const userInfoData = [
            {
                key: 'id',
                type: 'Texts',
                label: '用户 ID',
                span: 12,
                value: get(defaultValue, 'id')
            },
            {
                key: 'createTime',
                type: 'Texts',
                label: '注册时间',
                span: 12,
                value: get(defaultValue, 'createTime') ? moment(defaultValue.createTime).format('YYYY-MM-DD HH:mm:ss') : ''
            },
            {
                key: 'userName',
                type: 'Texts',
                label: '用户名',
                span: 12,
                value: get(defaultValue, 'userName')
            },
            {
                key: 'status',
                type: 'Switch',
                label: '状态',
                span: 12,
                value: get(defaultValue, 'status') === 1 ? '启用' : '停用',
                checkedChildren: '启用',
                unCheckedChildren: '停用',
                attribute: {
                    onChange: (checked) => this.switchChange(checked)
                }
            }
        ];
        return (
            <AssemblySet
                form={this.formRef.current}
                data={userInfoData}
            />
        );
    };

    renderBaseInfo2 = () => {
        const {defaultValue} = this.state;
        const userInfoData = [
            {
                key: 'alias',
                type: 'Input',
                label: '昵称',
                span: 12,
                value: get(defaultValue, 'alias')
            },
            {
                key: 'regionId',
                type: 'Cascader',
                label: '地区',
                attribute: {
                    style: {width: '100%'},
                    placeholder: '请选择地区'
                },
                span: 12,
                value: [
                    get(defaultValue, 'provinceId') + '',
                    get(defaultValue, 'cityId') + '',
                    get(defaultValue, 'districtId') + ''
                ]
            },
            {
                key: 'sex',
                type: 'Select',
                attribute: {
                    style: {width: '100%'}
                },
                label: '性别',
                span: 12,
                value: get(defaultValue, 'sex'),
                data: {
                    list: [
                        {value: 0, name: '未设置'},
                        {value: 1, name: '男'},
                        {value: 2, name: '女'}
                    ]
                }
            },
            {
                key: 'email',
                type: 'Input',
                label: '邮箱',
                span: 12,
                options: {
                    rules: [{
                        type: 'email',
                        message: '邮箱格式不正确!'
                    }]
                },
                value: get(defaultValue, 'email')
            },
            {
                key: 'signature',
                type: 'Input',
                label: '个性签名',
                attribute: {
                    maxLength: 200,
                    type: 'textarea',
                    rows: 4
                },
                span: 12,
                value: get(defaultValue, 'signature')
            },
            {
                key: 'id',
                type: 'UploadFile',
                label: '头像',
                span: 12,
                value: get(defaultValue, 'photo'),
                data: {
                    fileUrlList: [get(defaultValue, 'photo')],
                    isReadOnly: true
                }
            }

        ];
        return (
            <AssemblySet
                form={this.formRef.current}
                data={userInfoData}
            />
        );
    };
}

export default Detail;
