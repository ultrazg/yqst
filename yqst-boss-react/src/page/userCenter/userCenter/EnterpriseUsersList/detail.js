import React, {Component} from 'react';
import {Card, Form, Divider, Row, Col, Button, Table, Timeline, Tabs, Empty, Modal, Input} from 'antd';
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
            industryList: [],
            staffVisible: false,
            departmentVisible: false,
            postVisible: false
        };
        this.id = this.props.location.search.substr(1).split('=')[1];
    }

    componentDidMount() {
        this.EnterpriseUsersIndustryList();
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

    // 获取行业列表
    EnterpriseUsersIndustryList = () => {
        model.EnterpriseUsersIndustryList({}, res => {
            console.log(res);
            if (res && res.ret === 0) {
                this.setState({
                    industryList: res.data
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
                        {name: '企业用户详情'}
                    ]
                }
            >
                <Card title='基本信息'>
                    {this.renderBaseInfo()}
                    <Row>
                        <Col span={24} style={{textAlign: 'center'}}>
                            <Button type='danger'>注销企业</Button>
                        </Col>
                    </Row>
                    <Divider/>
                    {this.renderBaseInfo2()}
                    <Row>
                        <Col span={24} style={{textAlign: 'center'}}>
                            <Button type='primary'>保存</Button>
                        </Col>
                    </Row>
                </Card>
                <Tabs onChange={this.tabChange} type="card"
                      style={{backgroundColor: '#fff', marginTop: 15, minHeight: 400}}>
                    <Tabs.TabPane tab="员工管理" key="1">
                        {this.renderStaffManage()}
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="部门管理" key="2">
                        {this.renderDepartment()}
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="职务管理" key="3">
                        {this.renderPost()}
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="操作纪录" key="4">
                        {this.renderOperationalRecords()}
                    </Tabs.TabPane>
                </Tabs>
            </ViewContent>
        );
    }

    removeData = (type) => {
        let title, content;
        switch (type) {
            case 1 :
                title = '确认删除员工 ?';
                content = <p>{`删除员工后,该员工将无法进入企业。是否确定`}</p>;
                break;
            case 2:
                title = '确认删除该部门 ?';
                content = '';
                break;
            case 3:
                title = '确认删除该职务 ?';
                content = '';
                break;
            default :
                title = '';
                content = '';
        }
        Modal.confirm({
            title,
            content,
            onOk() {
                return new Promise((resolve, reject) => {
                    setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                }).catch(() => console.log('Oops errors!'));
            }
        });
    };

    editStaffModal = () => {
        const {staffVisible} = this.state;
        let _form = undefined;
        const CreateForm = Form.create()(props => {
            const {form} = props;
            const {getFieldDecorator} = form;
            _form = form;

            return (
                <Form layout="vertical">
                    <Form.Item label="员工姓名">
                        {getFieldDecorator('name')(
                            <Input/>
                        )}
                    </Form.Item>
                    <Form.Item label="部门">
                        {getFieldDecorator('bm')(
                            <Input/>
                        )}
                    </Form.Item>
                    <Form.Item label="职务">
                        {getFieldDecorator('zw')(
                            <Input/>
                        )}
                    </Form.Item>
                    <Form.Item label="联系电话">
                        {getFieldDecorator('tl')(
                            <Input/>
                        )}
                    </Form.Item>
                </Form>
            );
        });
        const submit = (e) => {
            e.preventDefault();
            _form.validateFields((err, values) => {
                if (err) return;
                console.log(values);
            });
        };
        return (
            <Modal
                title='编辑员工信息'
                visible={staffVisible}
                onOk={submit}
                onCancel={() => {
                    this.setState({staffVisible: false});
                }}
            >
                <CreateForm/>
            </Modal>
        );
    };

    departmentModal = () => {
        const {departmentVisible} = this.state;
        let _form = undefined;
        const CreateForm = Form.create()(props => {
            const {form} = props;
            const {getFieldDecorator} = form;
            _form = form;

            return (
                <Form layout="vertical">
                    <Form.Item label="部门名称">
                        {getFieldDecorator('name')(
                            <Input/>
                        )}
                    </Form.Item>
                    <Form.Item label="选择上级部门">
                        {getFieldDecorator('bm')(
                            <Input/>
                        )}
                    </Form.Item>
                </Form>
            );
        });
        const submit = (e) => {
            e.preventDefault();
            _form.validateFields((err, values) => {
                if (err) return;
                console.log(values);
            });
        };
        return (
            <Modal
                title='添加部门'
                visible={departmentVisible}
                onOk={submit}
                onCancel={() => {
                    this.setState({departmentVisible: false});
                }}
            >
                <CreateForm/>
            </Modal>
        );
    };

    postModal = () => {
        const {postVisible} = this.state;
        let _form = undefined;
        const CreateForm = Form.create()(props => {
            const {form} = props;
            const {getFieldDecorator} = form;
            _form = form;
            return (
                <Form layout="vertical">
                    <Form.Item label="职务名称">
                        {getFieldDecorator('name', {
                            rules: [{required: true, message: '职务名称未填!'}]
                        })(
                            <Input/>
                        )}
                    </Form.Item>
                </Form>
            );
        });
        const submit = (e) => {
            e.preventDefault();
            _form.validateFields((err, values) => {
                if (err) return;
                console.log(values);
            });
        };
        return (
            <Modal
                title='添加职务'
                visible={postVisible}
                onOk={submit}
                onCancel={() => {
                    this.setState({postVisible: false});
                }}
            >
                <CreateForm/>
            </Modal>
        );
    };

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

    renderStaffManage = () => {
        const {defaultValue} = this.state;
        const columns = [
            {title: '员工 ID', dataIndex: 'id'},
            {title: '员工姓名', dataIndex: 'staffName'},
            {title: '用户 ID', dataIndex: 'uid'},
            {
                title: '身份', dataIndex: 'isAdmin', render: text => (
                    text === 0 ? '员工' : '管理员'
                )
            },
            {title: '部门', dataIndex: 'deptName'},
            {title: '职务', dataIndex: 'jobName'},
            {title: '联系电话', dataIndex: 'phone'},
            {
                title: '加入时间', dataIndex: 'createTime', render: text => (
                    moment(text).format('YYYY-MM-DD HH:mm:ss')
                )
            },
            {
                title: '操作', dataIndex: '', render: (text, record) => (
                    <span>
                        {/*<a onClick={() => this.setState({staffVisible: true})}>编辑</a>*/}
                        <a>编辑</a>
                        <Divider type='vertical'/>
                        {/*<a style={{color: 'red'}} onClick={() => this.removeData(1)}>删除</a>*/}
                        <a style={{color: 'red'}}>删除</a>
                    </span>
                )
            }
        ];
        return (
            <div style={{padding: 20}}>
                {this.editStaffModal()}
                <Table
                    columns={columns}
                    rowKey='id'
                    dataSource={get(defaultValue, 'listStaffMsgDTOS')}
                    pagination={false}
                />
            </div>
        );
    };

    renderDepartment = () => {
        const {defaultValue} = this.state;
        const columns = [
            {title: '序号', dataIndex: 'id'},
            {title: '部门名称', dataIndex: 'depName'},
            {title: '员工人数', dataIndex: 'num'},
            {
                title: '创建时间', dataIndex: 'createTime', render: text => (
                    moment(text).format('YYYY-MM-DD HH:mm:ss')
                )
            },
            // {title: '操作', dataIndex: '', render: text => <a onClick={() => this.removeData(2)}>删除</a>},
            {title: '操作', dataIndex: '', render: text => <a>删除</a>}
        ];
        return (
            <div style={{padding: 20}}>
                {this.departmentModal()}
                {/*<Button onClick={() => this.setState({departmentVisible: true})} type='primary'>添加部门</Button>*/}
                <Button type='primary'>添加部门</Button>
                <Table
                    columns={columns}
                    rowKey='id'
                    dataSource={get(defaultValue, 'listDeptDTOS')}
                    pagination={false}
                />
            </div>
        );
    };

    renderPost = () => {
        const {defaultValue} = this.state;
        const columns = [
            {title: '序号', dataIndex: 'id'},
            {title: '职务名称', dataIndex: 'name'},
            {title: '员工人数', dataIndex: 'num'},
            {
                title: '创建时间', dataIndex: 'createTime', render: text => (
                    moment(text).format('YYYY-MM-DD HH:mm:ss')
                )
            },
            // {title: '操作', dataIndex: '', render: text => <a onClick={() => this.removeData(3)}>删除</a>},
            {title: '操作', dataIndex: '', render: text => <a>删除</a>}
        ];
        return (
            <div style={{padding: 20}}>
                {this.postModal()}
                {/*<Button onClick={() => this.setState({postVisible: true})} type='primary'>添加职务</Button>*/}
                <Button type='primary'>添加职务</Button>
                <Table
                    columns={columns}
                    rowKey='id'
                    dataSource={get(defaultValue, 'listJobDTOS')}
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
                value: get(defaultValue, 'listAccountDTO.uid')
            },
            {
                key: 'createTime',
                type: 'Texts',
                label: '创建时间',
                span: 12,
                value: get(defaultValue, 'listAccountDTO.createTime') ? moment(defaultValue.listAccountDTO.createTime).format('YYYY-MM-DD HH:mm:ss') : ''
            },
            {
                key: 'accountSn',
                type: 'Texts',
                label: '企业号',
                span: 12,
                value: get(defaultValue, 'listAccountDTO.accountSn')
            },
            {
                key: 'status',
                type: 'Switch',
                label: '状态',
                span: 12,
                value: get(defaultValue, 'listAccountDTO.status') === 1,
                checkedChildren: '启用',
                unCheckedChildren: '停用'
            }
        ];
        return (
            <AssemblySet
                form={form}
                data={userInfoData}
            />
        );
    };

    renderBaseInfo2 = () => {
        const {form} = this.props;
        const {defaultValue} = this.state;
        const userInfoData = [
            {
                key: 'companyName',
                type: 'Input',
                label: '企业名称',
                span: 8,
                value: get(defaultValue, 'listAccountDTO.companyName')
            },
            {
                key: 'phone',
                type: 'Input',
                label: '电话',
                span: 8,
                value: get(defaultValue, 'listAccountDTO.phone')
            },
            {
                key: 'id',
                type: 'Select',
                attribute: {
                    style: {width: '100%'}
                },
                label: '行业',
                data: {
                    list: this.state.industryList,
                    valueName: 'id',
                    labelName: 'industryName'
                },
                span: 8,
                value: get(defaultValue, 'listAccountDTO.industryId')
            },
            {
                key: 'faxWay',
                type: 'Input',
                label: '传真',
                span: 8,
                value: get(defaultValue, 'listAccountDTO.faxWay')
            },
            {
                key: 'accountSn',
                type: 'Texts',
                label: '国家',
                span: 8,
                value: '中国'
            },
            {
                key: 'region',
                type: 'Cascader',
                label: '地区',
                attribute: {
                    style: {width: '100%'},
                    placeholder: '请选择地区'
                },
                span: 8,
                value: [
                    get(defaultValue, 'listAccountDTO.provinceId') + '',
                    get(defaultValue, 'listAccountDTO.cityId') + '',
                    get(defaultValue, 'listAccountDTO.districtId') + ''
                ]
            },
            {
                key: 'address',
                type: 'Input',
                label: '地址',
                span: 8,
                value: get(defaultValue, 'listAccountDTO.address')
            },
            {
                key: 'zipCode',
                type: 'Input',
                label: '邮编',
                span: 8,
                value: get(defaultValue, 'listAccountDTO.zipCode')
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
