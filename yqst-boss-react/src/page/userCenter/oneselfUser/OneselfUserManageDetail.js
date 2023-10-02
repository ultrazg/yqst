/**
 * Created by yb on 2019/10/24.
 */

import React, {Component} from 'react';
import {Form, Button, Card, Timeline, Tabs} from 'antd';
import {RollbackOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import Model from "../Model";
import moment from 'moment'
import SWTable from 'SWViews/table';
import SwitchName from './SwitchName';
import AssemblySet from "../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../baseview/viewContent/ViewContent";

const {TabPane} = Tabs;


class OneselfUserManageDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                userInfoVO: {},
                bindInfoVO: {},
                userAuthInfoVO: {},
                staffInfoVOS: [],
                userFriendsVOS: [],
            },
            logList: [],
        };
        this.id = '';
        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.id = this.props.location.search.substr(1).split("=")[1];
        if (this.id) {
            this.getInfo();
        }
    }

    // 视图层
    render() {
        return (
            <Form ref={this.formRef}>
                <ViewContent
                    crumb={[
                        {name: "用户中心"},
                        {name: "个人用户管理列表", link: '/Pages/OneselfUserManageList'},
                        {name: "个人用户管理详情"},
                    ]}
                    topBtn={
                        <div>
                            {/*<Button type="primary" icon={'edit'}>编辑</Button>*/}
                            {/*<Button type="danger" icon={'delete'} style={{marginLeft: 15}}>删除</Button>*/}
                            <Link to={'/Pages/OneselfUserManageList'} style={{marginLeft: 15}}>
                                <Button icon={<RollbackOutlined/>}>返回</Button>
                            </Link>
                        </div>
                    }
                >
                    <Tabs type="card">
                        <TabPane tab="账号情况" key="1">
                            {this.makeZHView()}
                        </TabPane>
                        <TabPane tab="个人信息" key="2">
                            {this.makeGRView()}
                        </TabPane>
                        <TabPane tab="实名认证" key="3">
                            {this.makeSMView()}
                        </TabPane>
                        <TabPane tab="员工信息" key="4">
                            {this.makeYGView()}
                        </TabPane>
                        <TabPane tab="联系人信息" key="5">
                            {this.makeLXRView()}
                        </TabPane>
                    </Tabs>
                </ViewContent>
            </Form>
        );
    }

    getInfo() {
        Model.UserPGet({id: this.id}, (res) => {
            this.setState({data: {...this.state.data, ...res.data}});
        }, (err) => {
        });
    }

    makeZHView() {
        let {data} = this.state;
        let {userInfoVO, bindInfoVO} = data;
        const viewList = [
            {
                key: 'ZHKey',
                title: '账号信息',
                style: {},
                data: [
                    {key: 'id', type: 'Texts', label: '用户ID', span: 12, value: userInfoVO.id},
                    {
                        key: 'createTime', type: 'Texts', label: '注册时间', span: 12,
                        value: userInfoVO.createTime ? moment(userInfoVO.createTime).format('YYYY-MM-DD HH:mm:ss') : ''
                    },
                    {key: 'userName', type: 'Texts', label: '云企商通账号', span: 12, value: userInfoVO.userName},
                    {
                        key: 'status', type: 'Texts', label: '账号状态', span: 12,
                        value: <span style={{color: SwitchName.status(userInfoVO.status, 'color')}}>
                        {SwitchName.status(userInfoVO.status)}
                    </span>
                    },
                ]
            },
            {
                key: 'BDKey',
                title: '绑定信息',
                style: {marginTop: 15},
                data: [
                    {
                        key: 'bindMobile', type: 'Texts', label: '手机号', span: 12,
                        value: '1' === '' + bindInfoVO.isBindMobile ? bindInfoVO.bindMobile : '未绑定'
                    },
                    {
                        key: 'bindEmail', type: 'Texts', label: '邮箱', span: 12,
                        value: '1' === '' + bindInfoVO.isBindEmail ? bindInfoVO.bindEmail : '未绑定'
                    },
                    {
                        key: 'bindWeChat', type: 'Texts', label: '微信', span: 12,
                        value: '1' === '' + bindInfoVO.isBindWeChat ? bindInfoVO.bindWeChat : '未绑定'
                    },
                    {
                        key: 'bindQQ', type: 'Texts', label: 'QQ', span: 12,
                        value: '1' === '' + bindInfoVO.isBindQQ ? bindInfoVO.bindQQ : '未绑定'
                    },
                    {
                        key: 'bindWeibo', type: 'Texts', label: '微博', span: 12,
                        value: '1' === '' + bindInfoVO.isBindWeibo ? bindInfoVO.bindWeibo : '未绑定'
                    },
                ],
            },
        ];
        return <div>
            {
                viewList.map((item, idx) => {
                    return <Card
                        type="inner"
                        title={item.title}
                        style={item.style ? item.style : ''}
                        key={idx}
                    >
                        <AssemblySet key={item.key} data={item.data} form={this.formRef.current}/>
                    </Card>
                })
            }
            <Card
                type="inner"
                title='操作记录'
                style={{marginTop: 15}}
            >
                <Tabs type="card">
                    <TabPane tab="用户记录" key="1">
                        <Timeline style={{
                            padding: 15
                        }}>
                            {
                                this.state.logList.map((item, idx) => {
                                    return <Timeline.Item key={'log_' + idx}>
                                        <h3>{item.title}</h3>
                                        <span>操作时间：{item.createTime ? moment(item.createTime).format('YYYY-MM-DD') : ''}</span>
                                    </Timeline.Item>
                                })
                            }
                            {
                                this.state.logList && this.state.logList.length <= 0 &&
                                <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>
                                    暂无记录...
                                </div>
                            }
                        </Timeline>
                    </TabPane>
                    <TabPane tab="管理员记录" key="2">
                        <Timeline style={{
                            padding: 15
                        }}>
                            {
                                this.state.logList.map((item, idx) => {
                                    return <Timeline.Item key={'log_' + idx}>
                                        <h3>{item.title}</h3>
                                        <span>操作时间：{item.createTime ? moment(item.createTime).format('YYYY-MM-DD') : ''}</span>
                                        <div>
                                            <span>管理员ID：{item.createByName}</span>
                                            <span style={{marginLeft: 25}}>管理员名称：123</span>
                                        </div>
                                    </Timeline.Item>
                                })
                            }
                            {
                                this.state.logList && this.state.logList.length <= 0 &&
                                <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>
                                    暂无记录...
                                </div>
                            }
                        </Timeline>
                    </TabPane>
                </Tabs>
            </Card>
        </div>
    }

    makeGRView() {
        let {data} = this.state;
        let {userInfoVO, bindInfoVO} = data;
        const viewList = [
            {
                key: 'GRKey',
                title: '个人信息',
                style: {},
                data: [
                    {key: 'alias', type: 'Texts', label: '昵称', span: 12, value: userInfoVO.alias},
                    {
                        key: 'addTexts', type: 'Texts', label: '地区', span: 12,
                        value: userInfoVO.provinceName + userInfoVO.cityName + userInfoVO.districtName
                    },
                    {
                        key: 'sex', type: 'Texts', label: '性别', span: 12,
                        value: SwitchName.sex(userInfoVO.sex)
                    },
                    {key: 'email', type: 'Texts', label: '个人邮箱', span: 12, value: userInfoVO.email},
                    {key: 'signature', type: 'Texts', label: '个性签名', span: 12, value: userInfoVO.signature},
                    {
                        key: 'photo', type: 'UploadFile', label: '头像', span: 12,
                        value: userInfoVO.photo ? userInfoVO.photo.split(',') : [],
                        data: {
                            maxNum: 1,
                            fileUrlList: userInfoVO.photo ? userInfoVO.photo.split(',') : [],
                            isDowload: false,
                            isReadOnly: true,
                        },
                    },
                ]
            },
        ];
        return <div>
            {
                viewList.map((item, idx) => {
                    return <Card
                        type="inner"
                        title={item.title}
                        style={item.style ? item.style : ''}
                        key={item.key + '' + idx}
                    >
                        <AssemblySet key={item.key} data={item.data} form={this.formRef.current}/>
                    </Card>
                })
            }
            <Card
                type="inner"
                title='操作记录'
                style={{marginTop: 15}}
            >
                <Tabs type="card">
                    <TabPane tab="用户记录" key="1">
                        <Timeline style={{
                            padding: 15
                        }}>
                            {
                                this.state.logList.map((item, idx) => {
                                    return <Timeline.Item key={'log_' + idx}>
                                        <h3>{item.title}</h3>
                                        <span>操作时间：{item.createTime ? moment(item.createTime).format('YYYY-MM-DD') : ''}</span>
                                        <div>
                                            <span>个人用户ID：123456</span>
                                            <span style={{marginLeft: 25}}>个人用户名称：陈天华</span>
                                        </div>
                                    </Timeline.Item>
                                })
                            }
                            {
                                this.state.logList && this.state.logList.length <= 0 &&
                                <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>
                                    暂无记录...
                                </div>
                            }
                        </Timeline>
                    </TabPane>
                    <TabPane tab="管理员记录" key="2">
                        <Timeline style={{
                            padding: 15
                        }}>
                            {
                                this.state.logList.map((item, idx) => {
                                    return <Timeline.Item key={'log_' + idx}>
                                        <h3>{item.title}</h3>
                                        <span>操作时间：{item.createTime ? moment(item.createTime).format('YYYY-MM-DD') : ''}</span>
                                        <div>
                                            <span>管理员ID：{item.createByName}</span>
                                            <span style={{marginLeft: 25}}>管理员名称：123</span>
                                        </div>
                                    </Timeline.Item>
                                })
                            }
                            {
                                this.state.logList && this.state.logList.length <= 0 &&
                                <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>
                                    暂无记录...
                                </div>
                            }
                        </Timeline>
                    </TabPane>
                </Tabs>
            </Card>
        </div>
    }

    makeSMView() {
        let {data} = this.state;
        let {userAuthInfoVO} = data;
        const viewList = [
            {
                key: 'SMKey',
                title: '实名认证',
                style: {},
                data: [
                    {
                        key: 'authState',
                        type: 'Texts',
                        label: '实名认证状态',
                        span: 12,
                        value: SwitchName.authState(userAuthInfoVO.authState)
                    },
                    {
                        key: 'userDocParentSn',
                        type: 'Texts',
                        label: '用户认证组编码',
                        span: 12,
                        value: userAuthInfoVO.userDocParentSn
                    },
                    {key: 'authName', type: 'Texts', label: '真实姓名', span: 12, value: userAuthInfoVO.authName},
                ]
            },
        ];
        return <div>
            {
                viewList.map((item, idx) => {
                    return <Card
                        type="inner"
                        title={item.title}
                        style={item.style ? item.style : ''}
                        key={item.key + '' + idx}
                    >
                        <AssemblySet key={item.key} data={item.data} form={this.formRef.current}/>
                    </Card>
                })
            }
            <Card
                type="inner"
                title='操作记录'
                style={{marginTop: 15}}
            >
                <Tabs type="card">
                    <TabPane tab="用户记录" key="1">
                        <Timeline style={{
                            padding: 15
                        }}>
                            {
                                this.state.logList.map((item, idx) => {
                                    return <Timeline.Item key={'log_' + idx}>
                                        <h3>{item.title}</h3>
                                        <span>操作时间：{item.createTime ? moment(item.createTime).format('YYYY-MM-DD') : ''}</span>
                                    </Timeline.Item>
                                })
                            }
                            {
                                this.state.logList && this.state.logList.length <= 0 &&
                                <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>
                                    暂无记录...
                                </div>
                            }
                        </Timeline>
                    </TabPane>
                </Tabs>
            </Card>
        </div>
    }

    makeYGView() {
        const columns = [
            {
                title: '企业ID',
                key: 'cid',
                dataIndex: 'cid',
            },
            {
                title: '企业名称',
                key: 'companyName',
                dataIndex: 'companyName',
            },
            {
                title: '员工ID',
                key: 'accountId',
                dataIndex: 'accountId',
            },
            {
                title: '员工姓名',
                key: 'staffName',
                dataIndex: 'staffName',
            },
            {
                title: '身份',
                key: 'isAdmin',
                dataIndex: 'isAdmin',
                render: (res) => {
                    return SwitchName.isAdmin(res);
                }
            },
            {
                title: '加人时间',
                key: 'createTime',
                dataIndex: 'createTime',
                width: 100,
                render: (res) => {
                    let times = res ? moment(res).format('YYYY-MM-DD HH:mm:ss') : '';
                    return times ? <div>
                        <div>{times.split(' ')[0]}</div>
                        <div>{times.split(' ')[1]}</div>
                    </div> : times;
                }
            },
            // {
            //     title: '操作',
            //     key: '',
            //     dataIndex: '',
            // },
        ];

        return <div>
            <Card
                type="inner"
                title='员工信息'
            >
                <SWTable
                    columns={columns}
                    dataSource={this.state.data.staffInfoVOS || []}
                    pagination={false}
                />
            </Card>
            <Card
                type="inner"
                title='操作记录'
                style={{marginTop: 15}}
            >
                <Tabs type="card">
                    <TabPane tab="用户记录" key="1">
                        <Timeline style={{
                            padding: 15
                        }}>
                            {
                                this.state.logList.map((item, idx) => {
                                    return <Timeline.Item key={'log_' + idx}>
                                        <h3>{item.title}</h3>
                                        <span>操作时间：{item.createTime ? moment(item.createTime).format('YYYY-MM-DD') : ''}</span>
                                        <div>
                                            <span>个人用户ID：123456</span>
                                            <span style={{marginLeft: 25}}>个人用户名称：陈天华</span>
                                        </div>
                                    </Timeline.Item>
                                })
                            }
                            {
                                this.state.logList && this.state.logList.length <= 0 &&
                                <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>
                                    暂无记录...
                                </div>
                            }
                        </Timeline>
                    </TabPane>
                    <TabPane tab="管理员记录" key="2">
                        <Timeline style={{
                            padding: 15
                        }}>
                            {
                                this.state.logList.map((item, idx) => {
                                    return <Timeline.Item key={'log_' + idx}>
                                        <h3>{item.title}</h3>
                                        <span>操作时间：{item.createTime ? moment(item.createTime).format('YYYY-MM-DD') : ''}</span>
                                        <div>
                                            <span>管理员ID：{item.createByName}</span>
                                            <span style={{marginLeft: 25}}>管理员名称：123</span>
                                        </div>
                                    </Timeline.Item>
                                })
                            }
                            {
                                this.state.logList && this.state.logList.length <= 0 &&
                                <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>
                                    暂无记录...
                                </div>
                            }
                        </Timeline>
                    </TabPane>
                </Tabs>
            </Card>
        </div>
    }

    makeLXRView() {
        const columns = [
            {
                title: '用户ID',
                key: 'friendUid',
                dataIndex: 'friendUid',
            },
            {
                title: '用户名',
                key: 'mobile',
                dataIndex: 'mobile',
            },
            {
                title: '用户昵称',
                key: 'alias',
                dataIndex: 'alias',
            },
            {
                title: '联系人备注',
                key: 'remark',
                dataIndex: 'remark',
            },
            {
                title: '添加时间',
                key: 'createTime',
                dataIndex: 'createTime',
                width: 100,
                render: (res) => {
                    let times = res ? moment(res).format('YYYY-MM-DD HH:mm:ss') : '';
                    return times ? <div>
                        <div>{times.split(' ')[0]}</div>
                        <div>{times.split(' ')[1]}</div>
                    </div> : times;
                }
            },
            // {
            //     title: '操作',
            //     key: '',
            //     dataIndex: '',
            // },
        ];

        return <div>
            <Card
                type="inner"
                title='联系人信息'
            >
                <SWTable
                    columns={columns}
                    dataSource={this.state.data.userFriendsVOS || []}
                    pagination={false}
                />
            </Card>
            <Card
                type="inner"
                title='操作记录'
                style={{marginTop: 15}}
            >
                <Tabs type="card">
                    <TabPane tab="用户记录" key="1">
                        <Timeline style={{
                            padding: 15
                        }}>
                            {
                                this.state.logList.map((item, idx) => {
                                    return <Timeline.Item key={'log_' + idx}>
                                        <h3>{item.title}</h3>
                                        <span>操作时间：{item.createTime ? moment(item.createTime).format('YYYY-MM-DD') : ''}</span>
                                        <div>
                                            <span>个人用户ID：123456</span>
                                            <span style={{marginLeft: 25}}>个人用户名称：陈天华</span>
                                        </div>
                                    </Timeline.Item>
                                })
                            }
                            {
                                this.state.logList && this.state.logList.length <= 0 &&
                                <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>
                                    暂无记录...
                                </div>
                            }
                        </Timeline>
                    </TabPane>
                    <TabPane tab="管理员记录" key="2">
                        <Timeline style={{
                            padding: 15
                        }}>
                            {
                                this.state.logList.map((item, idx) => {
                                    return <Timeline.Item key={'log_' + idx}>
                                        <h3>{item.title}</h3>
                                        <span>操作时间：{item.createTime ? moment(item.createTime).format('YYYY-MM-DD') : ''}</span>
                                        <div>
                                            <span>管理员ID：{item.createByName}</span>
                                            <span style={{marginLeft: 25}}>管理员名称：123</span>
                                        </div>
                                    </Timeline.Item>
                                })
                            }
                            {
                                this.state.logList && this.state.logList.length <= 0 &&
                                <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>
                                    暂无记录...
                                </div>
                            }
                        </Timeline>
                    </TabPane>
                </Tabs>
            </Card>
        </div>
    }
}

export default OneselfUserManageDetail
