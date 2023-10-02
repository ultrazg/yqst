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
import SwitchName from "./SwitchName";
import BusinessModule from "./subModule/BusinessModule";
import PartnerModule from "./subModule/PartnerModule";
import RoleModule from "./subModule/RoleModule";
import RightModule from "./subModule/RightModule";
import AssemblySet from "../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../baseview/viewContent/ViewContent";
import NumberFormat from "../../../utils/numberformat/NumberFormat";

const { TabPane } = Tabs;

class CompanyUserDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                listAccountDTO: {},
                listStaffMsgDTOS: [],
                listDeptDTOS: [],
                listJobDTOS: [],
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
                        {name: "企业用户管理列表", link: '/Pages/CompanyUserList'},
                        {name: "企业用户管理详情"},
                    ]}
                    topBtn = {
                        <div>
                            {/*<Button type="primary" icon={'edit'}>编辑</Button>*/}
                            {/*<Button type="danger" icon={'delete'} style={{marginLeft: 15}}>删除</Button>*/}
                            <Link to={'/Pages/CompanyUserList'} style={{marginLeft: 15}}>
                                <Button icon={<RollbackOutlined />}>返回</Button>
                            </Link>
                        </div>
                    }
                >
                    <Tabs type="card">
                        <TabPane tab="用户信息" key="1">
                            {this.makeYHView()}
                        </TabPane>
                        <TabPane tab="基本信息" key="2">
                            {this.makeJBView()}
                        </TabPane>
                        <TabPane tab="业务信息" key="3">
                            <BusinessModule data={this.state.data} form={this.formRef.current}/>
                        </TabPane>
                        {/*<TabPane tab="实名认证" key="4">*/}
                        {/*    {this.makeSMView()}*/}
                        {/*</TabPane>*/}
                        <TabPane tab="员工管理" key="5">
                            {this.makeYGView()}
                        </TabPane>
                        <TabPane tab="部门管理" key="6">
                            {this.makeBMView()}
                        </TabPane>
                        <TabPane tab="职务管理" key="7">
                            {this.makeZWView()}
                        </TabPane>
                        <TabPane tab="合作伙伴" key="8">
                            {/*{this.makeHHRView()}*/}
                            <PartnerModule data={this.state.data}/>
                        </TabPane>
                        <TabPane tab="角色管理" key="9">
                            {/*{this.makeJSView()}*/}
                            <RoleModule data={this.state.data}/>
                        </TabPane>
                        <TabPane tab="权限管理" key="10">
                            {/*{this.makeQXView()}*/}
                            <RightModule data={this.state.data}/>
                        </TabPane>
                    </Tabs>
                </ViewContent>
            </Form>
        );
    }

    getInfo() {
        Model.UserAGet({id: this.id}, (res) => {
            this.setState({data: res.data});
        }, (err) => {
        });
    }

    makeYHView() {
        let {data} = this.state;
        let {listAccountDTO} = data;
        const viewList = [
            {
                key: 'ZHKey',
                title: '账号信息',
                style: {},
                data: [
                    {key: 'uid', type: 'Texts', label: '企业ID', span: 12, value: listAccountDTO.uid},
                    {key: 'createTime', type: 'Texts', label: '创建时间', span: 12,
                        value: listAccountDTO.createTime ? moment(listAccountDTO.createTime).format('YYYY-MM-DD HH:mm:ss') : ''},
                    {key: 'a2', type: 'Texts', label: '创建者ID', span: 12, value: ''},
                    {key: 'accountSn', type: 'Texts', label: '企业号', span: 12, value: listAccountDTO.accountSn},
                    {key: 'status', type: 'Texts', label: '状态', span: 12,
                        value: <span style={{color: SwitchName.status(listAccountDTO.status, 'color')}}>
                        {SwitchName.status(listAccountDTO.status)}
                    </span>},
                ]
            }
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
            {/*<Card*/}
            {/*    type="inner"*/}
            {/*    title='操作记录'*/}
            {/*    style={{marginTop: 15}}*/}
            {/*>*/}
            {/*    <Tabs type="card">*/}
            {/*        <TabPane tab="管理员记录" key="2">*/}
            {/*            <Timeline style={{*/}
            {/*                padding: 15*/}
            {/*            }}>*/}
            {/*                {*/}
            {/*                    this.state.logList.map((item, idx) => {*/}
            {/*                        return <Timeline.Item key={'log_' + idx}>*/}
            {/*                            <h3>{item.title}</h3>*/}
            {/*                            <span>操作时间：{item.createTime ? moment(item.createTime).format('YYYY-MM-DD') : ''}</span>*/}
            {/*                            <div>*/}
            {/*                                <span>管理员ID：{item.createByName}</span>*/}
            {/*                                <span style={{marginLeft: 25}}>管理员名称：123</span>*/}
            {/*                            </div>*/}
            {/*                        </Timeline.Item>*/}
            {/*                    })*/}
            {/*                }*/}
            {/*                {*/}
            {/*                    this.state.logList && this.state.logList.length <= 0 && <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>*/}
            {/*                        暂无记录...*/}
            {/*                    </div>*/}
            {/*                }*/}
            {/*            </Timeline>*/}
            {/*        </TabPane>*/}
            {/*    </Tabs>*/}
            {/*</Card>*/}
        </div>
    }

    makeJBView() {
        let {data} = this.state;
        let {listAccountDTO} = data;
        const viewList = [
            {
                key: 'JBKey',
                title: '基本信息',
                style: {},
                data: [
                    {key: 'companyName', type: 'Texts', label: '企业名称', span: 12, value: listAccountDTO.companyName},
                    {key: 'industry', type: 'Texts', label: '行业', span: 12, value: listAccountDTO.industry},
                    {key: 'provinceName', type: 'Texts', label: '所在地区', span: 12,
                        value: listAccountDTO.provinceName + listAccountDTO.cityName + listAccountDTO.districtName},
                    {key: 'CHN', type: 'Texts', label: '国家', span: 12, value: '中国'},
                    {key: 'phone', type: 'Texts', label: '电话', span: 12, value: listAccountDTO.phone},
                    {key: 'faxWay', type: 'Texts', label: '传真', span: 12, value: listAccountDTO.faxWay},
                    {key: 'email', type: 'Texts', label: '邮箱', span: 12, value: listAccountDTO.email},
                    {key: 'address', type: 'Texts', label: '办公地址', span: 12, value: listAccountDTO.address},
                    {key: 'zipCode', type: 'Texts', label: '邮编', span: 12, value: listAccountDTO.zipCode},
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
            {/*<Card*/}
            {/*    type="inner"*/}
            {/*    title='操作记录'*/}
            {/*    style={{marginTop: 15}}*/}
            {/*>*/}
            {/*    <Tabs type="card">*/}
            {/*        <TabPane tab="用户记录" key="1">*/}
            {/*            <Timeline style={{*/}
            {/*                padding: 15*/}
            {/*            }}>*/}
            {/*                {*/}
            {/*                    this.state.logList.map((item, idx) => {*/}
            {/*                        return <Timeline.Item key={'log_' + idx}>*/}
            {/*                            <h3>{item.title}</h3>*/}
            {/*                            <span>操作时间：{item.createTime ? moment(item.createTime).format('YYYY-MM-DD') : ''}</span>*/}
            {/*                            <div>*/}
            {/*                                <span>员工ID：123456</span>*/}
            {/*                                <span style={{marginLeft: 25}}>员工名称：陈天华</span>*/}
            {/*                            </div>*/}
            {/*                            <div>*/}
            {/*                                <span>个人用户ID：123456</span>*/}
            {/*                                <span style={{marginLeft: 25}}>个人用户名称：陈天华</span>*/}
            {/*                            </div>*/}
            {/*                        </Timeline.Item>*/}
            {/*                    })*/}
            {/*                }*/}
            {/*                {*/}
            {/*                    this.state.logList && this.state.logList.length <= 0 && <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>*/}
            {/*                        暂无记录...*/}
            {/*                    </div>*/}
            {/*                }*/}
            {/*            </Timeline>*/}
            {/*        </TabPane>*/}
            {/*        <TabPane tab="管理员记录" key="2">*/}
            {/*            <Timeline style={{*/}
            {/*                padding: 15*/}
            {/*            }}>*/}
            {/*                {*/}
            {/*                    this.state.logList.map((item, idx) => {*/}
            {/*                        return <Timeline.Item key={'log_' + idx}>*/}
            {/*                            <h3>{item.title}</h3>*/}
            {/*                            <span>操作时间：{item.createTime ? moment(item.createTime).format('YYYY-MM-DD') : ''}</span>*/}
            {/*                            <div>*/}
            {/*                                <span>管理员ID：{item.createByName}</span>*/}
            {/*                                <span style={{marginLeft: 25}}>管理员名称：123</span>*/}
            {/*                            </div>*/}
            {/*                        </Timeline.Item>*/}
            {/*                    })*/}
            {/*                }*/}
            {/*                {*/}
            {/*                    this.state.logList && this.state.logList.length <= 0 && <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>*/}
            {/*                        暂无记录...*/}
            {/*                    </div>*/}
            {/*                }*/}
            {/*            </Timeline>*/}
            {/*        </TabPane>*/}
            {/*    </Tabs>*/}
            {/*</Card>*/}
        </div>
    }

    makeSMView(){
        let {data} = this.state;
        const viewList = [
            {
                key: 'SMKey',
                title: '实名认证',
                style: {},
                data: [
                    {key: 'smText', type: 'Texts', label: '实名认证状态', span: 12, value: '已实名'},
                    {key: 'bmText', type: 'Texts', label: '用户认证组编码', span: 12, value: '3959349584'},
                    {key: 'mcText', type: 'Texts', label: '认证名称', span: 12, value: '广州科技有限发展公司'},
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
            {/*<Card*/}
            {/*    type="inner"*/}
            {/*    title='操作记录'*/}
            {/*    style={{marginTop: 15}}*/}
            {/*>*/}
            {/*    <Tabs type="card">*/}
            {/*        <TabPane tab="用户记录" key="1">*/}
            {/*            <Timeline style={{*/}
            {/*                padding: 15*/}
            {/*            }}>*/}
            {/*                {*/}
            {/*                    this.state.logList.map((item, idx) => {*/}
            {/*                        return <Timeline.Item key={'log_' + idx}>*/}
            {/*                            <h3>{item.title}</h3>*/}
            {/*                            <span>操作时间：{item.createTime ? moment(item.createTime).format('YYYY-MM-DD') : ''}</span>*/}
            {/*                        </Timeline.Item>*/}
            {/*                    })*/}
            {/*                }*/}
            {/*                {*/}
            {/*                    this.state.logList && this.state.logList.length <= 0 && <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>*/}
            {/*                        暂无记录...*/}
            {/*                    </div>*/}
            {/*                }*/}
            {/*            </Timeline>*/}
            {/*        </TabPane>*/}
            {/*    </Tabs>*/}
            {/*</Card>*/}
        </div>
    }

    makeYGView(){
        const {data} = this.state;
        const {listStaffMsgDTOS} = data;
        const columns = [
            {
                title: '员工ID',
                key: 'id',
                dataIndex: 'id',
            },
            {
                title: '员工姓名',
                key: 'staffName',
                dataIndex: 'staffName',
            },
            {
                title: '用户ID',
                key: 'uid',
                dataIndex: 'uid',
            },
            {
                title: '身份',
                key: 'isAdmin',
                dataIndex: 'isAdmin',
                render: (res) => {
                    return SwitchName.isAdmin(res)
                }
            },
            {
                title: '部门',
                key: 'deptName',
                dataIndex: 'deptName',
            },
            {
                title: '职务',
                key: 'jobName',
                dataIndex: 'jobName',
            },
            {
                title: '工作电话',
                key: 'phone',
                dataIndex: 'phone',
            },
            {
                title: '工作邮箱',
                key: 'email',
                dataIndex: 'email',
            },
            {
                title: '加入时间',
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
                title='员工管理'
            >
                <SWTable
                    columns={columns}
                    dataSource={listStaffMsgDTOS || []}
                    pagination={false}
                />
            </Card>
            {/*<Card*/}
            {/*    type="inner"*/}
            {/*    title='操作记录'*/}
            {/*    style={{marginTop: 15}}*/}
            {/*>*/}
            {/*    <Tabs type="card">*/}
            {/*        <TabPane tab="用户记录" key="1">*/}
            {/*            <Timeline style={{*/}
            {/*                padding: 15*/}
            {/*            }}>*/}
            {/*                {*/}
            {/*                    this.state.logList.map((item, idx) => {*/}
            {/*                        return <Timeline.Item key={'log_' + idx}>*/}
            {/*                            <h3>{item.title}</h3>*/}
            {/*                            <span>操作时间：{item.createTime ? moment(item.createTime).format('YYYY-MM-DD') : ''}</span>*/}
            {/*                            <div>*/}
            {/*                                <span>员工ID：123456</span>*/}
            {/*                                <span style={{marginLeft: 25}}>员工名称：陈天华</span>*/}
            {/*                            </div>*/}
            {/*                            <div>*/}
            {/*                                <span>个人用户ID：123456</span>*/}
            {/*                                <span style={{marginLeft: 25}}>个人用户名称：陈天华</span>*/}
            {/*                            </div>*/}
            {/*                        </Timeline.Item>*/}
            {/*                    })*/}
            {/*                }*/}
            {/*                {*/}
            {/*                    this.state.logList && this.state.logList.length <= 0 && <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>*/}
            {/*                        暂无记录...*/}
            {/*                    </div>*/}
            {/*                }*/}
            {/*            </Timeline>*/}
            {/*        </TabPane>*/}
            {/*        <TabPane tab="管理员记录" key="2">*/}
            {/*            <Timeline style={{*/}
            {/*                padding: 15*/}
            {/*            }}>*/}
            {/*                {*/}
            {/*                    this.state.logList.map((item, idx) => {*/}
            {/*                        return <Timeline.Item key={'log_' + idx}>*/}
            {/*                            <h3>{item.title}</h3>*/}
            {/*                            <span>操作时间：{item.createTime ? moment(item.createTime).format('YYYY-MM-DD') : ''}</span>*/}
            {/*                            <div>*/}
            {/*                                <span>管理员ID：{item.createByName}</span>*/}
            {/*                                <span style={{marginLeft: 25}}>管理员名称：123</span>*/}
            {/*                            </div>*/}
            {/*                        </Timeline.Item>*/}
            {/*                    })*/}
            {/*                }*/}
            {/*                {*/}
            {/*                    this.state.logList && this.state.logList.length <= 0 && <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>*/}
            {/*                        暂无记录...*/}
            {/*                    </div>*/}
            {/*                }*/}
            {/*            </Timeline>*/}
            {/*        </TabPane>*/}
            {/*    </Tabs>*/}
            {/*</Card>*/}
        </div>
    }

    makeBMView(){
        const columns = [
            {
                title: '部门ID',
                key: 'id',
                dataIndex: 'id',
            },
            {
                title: '部门名称',
                key: 'depName',
                dataIndex: 'depName',
            },
            {
                title: '员工人数',
                key: 'num',
                dataIndex: 'num',
                render: (res) => {
                    return NumberFormat.thousandBit(res || 0, 0)
                }
            },
            {
                title: '创建时间',
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
            {
                title: '操作',
                key: '',
                dataIndex: '',
            }
        ];

        return <div>
            <Card
                type="inner"
                title='部门管理'
            >
                <SWTable
                    columns={columns}
                    dataSource={this.state.data.listDeptDTOS || []}
                    pagination={false}
                />
            </Card>
            {/*<Card*/}
            {/*    type="inner"*/}
            {/*    title='操作记录'*/}
            {/*    style={{marginTop: 15}}*/}
            {/*>*/}
            {/*    <Tabs type="card">*/}
            {/*        <TabPane tab="用户记录" key="1">*/}
            {/*            <Timeline style={{*/}
            {/*                padding: 15*/}
            {/*            }}>*/}
            {/*                {*/}
            {/*                    this.state.logList.map((item, idx) => {*/}
            {/*                        return <Timeline.Item key={'log_' + idx}>*/}
            {/*                            <h3>{item.title}</h3>*/}
            {/*                            <span>操作时间：{item.createTime ? moment(item.createTime).format('YYYY-MM-DD') : ''}</span>*/}
            {/*                            <div>*/}
            {/*                                <span>员工ID：123456</span>*/}
            {/*                                <span style={{marginLeft: 25}}>员工名称：陈天华</span>*/}
            {/*                            </div>*/}
            {/*                            <div>*/}
            {/*                                <span>个人用户ID：123456</span>*/}
            {/*                                <span style={{marginLeft: 25}}>个人用户名称：陈天华</span>*/}
            {/*                            </div>*/}
            {/*                        </Timeline.Item>*/}
            {/*                    })*/}
            {/*                }*/}
            {/*                {*/}
            {/*                    this.state.logList && this.state.logList.length <= 0 && <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>*/}
            {/*                        暂无记录...*/}
            {/*                    </div>*/}
            {/*                }*/}
            {/*            </Timeline>*/}
            {/*        </TabPane>*/}
            {/*        <TabPane tab="管理员记录" key="2">*/}
            {/*            <Timeline style={{*/}
            {/*                padding: 15*/}
            {/*            }}>*/}
            {/*                {*/}
            {/*                    this.state.logList.map((item, idx) => {*/}
            {/*                        return <Timeline.Item key={'log_' + idx}>*/}
            {/*                            <h3>{item.title}</h3>*/}
            {/*                            <span>操作时间：{item.createTime ? moment(item.createTime).format('YYYY-MM-DD') : ''}</span>*/}
            {/*                            <div>*/}
            {/*                                <span>管理员ID：{item.createByName}</span>*/}
            {/*                                <span style={{marginLeft: 25}}>管理员名称：123</span>*/}
            {/*                            </div>*/}
            {/*                        </Timeline.Item>*/}
            {/*                    })*/}
            {/*                }*/}
            {/*                {*/}
            {/*                    this.state.logList && this.state.logList.length <= 0 && <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>*/}
            {/*                        暂无记录...*/}
            {/*                    </div>*/}
            {/*                }*/}
            {/*            </Timeline>*/}
            {/*        </TabPane>*/}
            {/*    </Tabs>*/}
            {/*</Card>*/}
        </div>
    }

    makeZWView(){
        const columns = [
            {
                title: '职务ID',
                key: 'id',
                dataIndex: 'id',
            },
            {
                title: '职务名称',
                key: 'name',
                dataIndex: 'name',
            },
            {
                title: '员工人数',
                key: 'num',
                dataIndex: 'num',
            },
            {
                title: '创建时间',
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
            // }
        ];

        return <div>
            <Card
                type="inner"
                title='职务管理'
            >
                <SWTable
                    columns={columns}
                    dataSource={this.state.data.listJobDTOS || []}
                    pagination={false}
                />
            </Card>
            {/*<Card*/}
            {/*    type="inner"*/}
            {/*    title='操作记录'*/}
            {/*    style={{marginTop: 15}}*/}
            {/*>*/}
            {/*    <Tabs type="card">*/}
            {/*        <TabPane tab="用户记录" key="1">*/}
            {/*            <Timeline style={{*/}
            {/*                padding: 15*/}
            {/*            }}>*/}
            {/*                {*/}
            {/*                    this.state.logList.map((item, idx) => {*/}
            {/*                        return <Timeline.Item key={'log_' + idx}>*/}
            {/*                            <h3>{item.title}</h3>*/}
            {/*                            <span>操作时间：{item.createTime ? moment(item.createTime).format('YYYY-MM-DD') : ''}</span>*/}
            {/*                            <div>*/}
            {/*                                <span>员工ID：123456</span>*/}
            {/*                                <span style={{marginLeft: 25}}>员工名称：陈天华</span>*/}
            {/*                            </div>*/}
            {/*                            <div>*/}
            {/*                                <span>个人用户ID：123456</span>*/}
            {/*                                <span style={{marginLeft: 25}}>个人用户名称：陈天华</span>*/}
            {/*                            </div>*/}
            {/*                        </Timeline.Item>*/}
            {/*                    })*/}
            {/*                }*/}
            {/*                {*/}
            {/*                    this.state.logList && this.state.logList.length <= 0 && <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>*/}
            {/*                        暂无记录...*/}
            {/*                    </div>*/}
            {/*                }*/}
            {/*            </Timeline>*/}
            {/*        </TabPane>*/}
            {/*        <TabPane tab="管理员记录" key="2">*/}
            {/*            <Timeline style={{*/}
            {/*                padding: 15*/}
            {/*            }}>*/}
            {/*                {*/}
            {/*                    this.state.logList.map((item, idx) => {*/}
            {/*                        return <Timeline.Item key={'log_' + idx}>*/}
            {/*                            <h3>{item.title}</h3>*/}
            {/*                            <span>操作时间：{item.createTime ? moment(item.createTime).format('YYYY-MM-DD') : ''}</span>*/}
            {/*                            <div>*/}
            {/*                                <span>管理员ID：{item.createByName}</span>*/}
            {/*                                <span style={{marginLeft: 25}}>管理员名称：123</span>*/}
            {/*                            </div>*/}
            {/*                        </Timeline.Item>*/}
            {/*                    })*/}
            {/*                }*/}
            {/*                {*/}
            {/*                    this.state.logList && this.state.logList.length <= 0 && <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>*/}
            {/*                        暂无记录...*/}
            {/*                    </div>*/}
            {/*                }*/}
            {/*            </Timeline>*/}
            {/*        </TabPane>*/}
            {/*    </Tabs>*/}
            {/*</Card>*/}
        </div>
    }

    makeHHRView(){
        const columns = [
            {
                title: '企业ID',
                key: '',
                dataIndex: '',
            },
            {
                title: '企业号',
                key: '',
                dataIndex: '',
            },
            {
                title: '企业名称',
                key: '',
                dataIndex: '',
            },
            {
                title: '合作伙伴类型',
                key: '',
                dataIndex: '',
            },
            {
                title: '添加时间',
                key: '',
                dataIndex: '',
                width: 100,
                render: (res) => {
                    let times = res ? moment(res).format('YYYY-MM-DD HH:mm:ss') : '';
                    return times ? <div>
                        <div>{times.split(' ')[0]}</div>
                        <div>{times.split(' ')[1]}</div>
                    </div> : times;
                }
            },
            {
                title: '操作',
                key: '',
                dataIndex: '',
            }
        ];

        return <div>
            <Card
                type="inner"
                title='合作伙伴'
            >
                <SWTable
                    columns={columns}
                    dataSource={[]}
                    pagination={false}
                />
            </Card>
            {/*<Card*/}
            {/*    type="inner"*/}
            {/*    title='操作记录'*/}
            {/*    style={{marginTop: 15}}*/}
            {/*>*/}
            {/*    <Tabs type="card">*/}
            {/*        <TabPane tab="用户记录" key="1">*/}
            {/*            <Timeline style={{*/}
            {/*                padding: 15*/}
            {/*            }}>*/}
            {/*                {*/}
            {/*                    this.state.logList.map((item, idx) => {*/}
            {/*                        return <Timeline.Item key={'log_' + idx}>*/}
            {/*                            <h3>{item.title}</h3>*/}
            {/*                            <span>操作时间：{item.createTime ? moment(item.createTime).format('YYYY-MM-DD') : ''}</span>*/}
            {/*                            <div>*/}
            {/*                                <span>员工ID：123456</span>*/}
            {/*                                <span style={{marginLeft: 25}}>员工名称：陈天华</span>*/}
            {/*                            </div>*/}
            {/*                            <div>*/}
            {/*                                <span>个人用户ID：123456</span>*/}
            {/*                                <span style={{marginLeft: 25}}>个人用户名称：陈天华</span>*/}
            {/*                            </div>*/}
            {/*                        </Timeline.Item>*/}
            {/*                    })*/}
            {/*                }*/}
            {/*                {*/}
            {/*                    this.state.logList && this.state.logList.length <= 0 && <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>*/}
            {/*                        暂无记录...*/}
            {/*                    </div>*/}
            {/*                }*/}
            {/*            </Timeline>*/}
            {/*        </TabPane>*/}
            {/*        <TabPane tab="管理员记录" key="2">*/}
            {/*            <Timeline style={{*/}
            {/*                padding: 15*/}
            {/*            }}>*/}
            {/*                {*/}
            {/*                    this.state.logList.map((item, idx) => {*/}
            {/*                        return <Timeline.Item key={'log_' + idx}>*/}
            {/*                            <h3>{item.title}</h3>*/}
            {/*                            <span>操作时间：{item.createTime ? moment(item.createTime).format('YYYY-MM-DD') : ''}</span>*/}
            {/*                            <div>*/}
            {/*                                <span>管理员ID：{item.createByName}</span>*/}
            {/*                                <span style={{marginLeft: 25}}>管理员名称：123</span>*/}
            {/*                            </div>*/}
            {/*                        </Timeline.Item>*/}
            {/*                    })*/}
            {/*                }*/}
            {/*                {*/}
            {/*                    this.state.logList && this.state.logList.length <= 0 && <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>*/}
            {/*                        暂无记录...*/}
            {/*                    </div>*/}
            {/*                }*/}
            {/*            </Timeline>*/}
            {/*        </TabPane>*/}
            {/*    </Tabs>*/}
            {/*</Card>*/}
        </div>
    }

    makeJSView(){
        const columns = [
            {
                title: '角色ID',
                key: '',
                dataIndex: '',
            },
            {
                title: '角色名称',
                key: '',
                dataIndex: '',
            },
            {
                title: '角色描述',
                key: '',
                dataIndex: '',
            },
            {
                title: '员工数',
                key: '',
                dataIndex: '',
            },
            {
                title: '创建时间',
                key: '',
                dataIndex: '',
                width: 100,
                render: (res) => {
                    let times = res ? moment(res).format('YYYY-MM-DD HH:mm:ss') : '';
                    return times ? <div>
                        <div>{times.split(' ')[0]}</div>
                        <div>{times.split(' ')[1]}</div>
                    </div> : times;
                }
            },
            {
                title: '操作',
                key: '',
                dataIndex: '',
            }
        ];

        return <div>
            <Card
                type="inner"
                title='角色管理'
            >
                <SWTable
                    columns={columns}
                    dataSource={[]}
                    pagination={false}
                />
            </Card>
            {/*<Card*/}
            {/*    type="inner"*/}
            {/*    title='操作记录'*/}
            {/*    style={{marginTop: 15}}*/}
            {/*>*/}
            {/*    <Tabs type="card">*/}
            {/*        <TabPane tab="用户记录" key="1">*/}
            {/*            <Timeline style={{*/}
            {/*                padding: 15*/}
            {/*            }}>*/}
            {/*                {*/}
            {/*                    this.state.logList.map((item, idx) => {*/}
            {/*                        return <Timeline.Item key={'log_' + idx}>*/}
            {/*                            <h3>{item.title}</h3>*/}
            {/*                            <span>操作时间：{item.createTime ? moment(item.createTime).format('YYYY-MM-DD') : ''}</span>*/}
            {/*                            <div>*/}
            {/*                                <span>员工ID：123456</span>*/}
            {/*                                <span style={{marginLeft: 25}}>员工名称：陈天华</span>*/}
            {/*                            </div>*/}
            {/*                            <div>*/}
            {/*                                <span>个人用户ID：123456</span>*/}
            {/*                                <span style={{marginLeft: 25}}>个人用户名称：陈天华</span>*/}
            {/*                            </div>*/}
            {/*                        </Timeline.Item>*/}
            {/*                    })*/}
            {/*                }*/}
            {/*                {*/}
            {/*                    this.state.logList && this.state.logList.length <= 0 && <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>*/}
            {/*                        暂无记录...*/}
            {/*                    </div>*/}
            {/*                }*/}
            {/*            </Timeline>*/}
            {/*        </TabPane>*/}
            {/*        <TabPane tab="管理员记录" key="2">*/}
            {/*            <Timeline style={{*/}
            {/*                padding: 15*/}
            {/*            }}>*/}
            {/*                {*/}
            {/*                    this.state.logList.map((item, idx) => {*/}
            {/*                        return <Timeline.Item key={'log_' + idx}>*/}
            {/*                            <h3>{item.title}</h3>*/}
            {/*                            <span>操作时间：{item.createTime ? moment(item.createTime).format('YYYY-MM-DD') : ''}</span>*/}
            {/*                            <div>*/}
            {/*                                <span>管理员ID：{item.createByName}</span>*/}
            {/*                                <span style={{marginLeft: 25}}>管理员名称：123</span>*/}
            {/*                            </div>*/}
            {/*                        </Timeline.Item>*/}
            {/*                    })*/}
            {/*                }*/}
            {/*                {*/}
            {/*                    this.state.logList && this.state.logList.length <= 0 && <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>*/}
            {/*                        暂无记录...*/}
            {/*                    </div>*/}
            {/*                }*/}
            {/*            </Timeline>*/}
            {/*        </TabPane>*/}
            {/*    </Tabs>*/}
            {/*</Card>*/}
        </div>
    }

    makeQXView(){
        const columns = [
            {
                title: '权限组ID',
                key: '',
                dataIndex: '',
            },
            {
                title: '权限组名称',
                key: '',
                dataIndex: '',
            },
            {
                title: '权限组描述',
                key: '',
                dataIndex: '',
            },
            {
                title: '使用范围',
                key: '',
                dataIndex: '',
            },
            {
                title: '创建时间',
                key: '',
                dataIndex: '',
                width: 100,
                render: (res) => {
                    let times = res ? moment(res).format('YYYY-MM-DD HH:mm:ss') : '';
                    return times ? <div>
                        <div>{times.split(' ')[0]}</div>
                        <div>{times.split(' ')[1]}</div>
                    </div> : times;
                }
            },
            {
                title: '操作',
                key: '',
                dataIndex: '',
            }
        ];

        return <div>
            <Card
                type="inner"
                title='权限管理'
            >
                <SWTable
                    columns={columns}
                    dataSource={[]}
                    pagination={false}
                />
            </Card>
            {/*<Card*/}
            {/*    type="inner"*/}
            {/*    title='操作记录'*/}
            {/*    style={{marginTop: 15}}*/}
            {/*>*/}
            {/*    <Tabs type="card">*/}
            {/*        <TabPane tab="用户记录" key="1">*/}
            {/*            <Timeline style={{*/}
            {/*                padding: 15*/}
            {/*            }}>*/}
            {/*                {*/}
            {/*                    this.state.logList.map((item, idx) => {*/}
            {/*                        return <Timeline.Item key={'log_' + idx}>*/}
            {/*                            <h3>{item.title}</h3>*/}
            {/*                            <span>操作时间：{item.createTime ? moment(item.createTime).format('YYYY-MM-DD') : ''}</span>*/}
            {/*                            <div>*/}
            {/*                                <span>员工ID：123456</span>*/}
            {/*                                <span style={{marginLeft: 25}}>员工名称：陈天华</span>*/}
            {/*                            </div>*/}
            {/*                            <div>*/}
            {/*                                <span>个人用户ID：123456</span>*/}
            {/*                                <span style={{marginLeft: 25}}>个人用户名称：陈天华</span>*/}
            {/*                            </div>*/}
            {/*                        </Timeline.Item>*/}
            {/*                    })*/}
            {/*                }*/}
            {/*                {*/}
            {/*                    this.state.logList && this.state.logList.length <= 0 && <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>*/}
            {/*                        暂无记录...*/}
            {/*                    </div>*/}
            {/*                }*/}
            {/*            </Timeline>*/}
            {/*        </TabPane>*/}
            {/*        <TabPane tab="管理员记录" key="2">*/}
            {/*            <Timeline style={{*/}
            {/*                padding: 15*/}
            {/*            }}>*/}
            {/*                {*/}
            {/*                    this.state.logList.map((item, idx) => {*/}
            {/*                        return <Timeline.Item key={'log_' + idx}>*/}
            {/*                            <h3>{item.title}</h3>*/}
            {/*                            <span>操作时间：{item.createTime ? moment(item.createTime).format('YYYY-MM-DD') : ''}</span>*/}
            {/*                            <div>*/}
            {/*                                <span>管理员ID：{item.createByName}</span>*/}
            {/*                                <span style={{marginLeft: 25}}>管理员名称：123</span>*/}
            {/*                            </div>*/}
            {/*                        </Timeline.Item>*/}
            {/*                    })*/}
            {/*                }*/}
            {/*                {*/}
            {/*                    this.state.logList && this.state.logList.length <= 0 && <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>*/}
            {/*                        暂无记录...*/}
            {/*                    </div>*/}
            {/*                }*/}
            {/*            </Timeline>*/}
            {/*        </TabPane>*/}
            {/*    </Tabs>*/}
            {/*</Card>*/}
        </div>
    }
}

export default CompanyUserDetail
