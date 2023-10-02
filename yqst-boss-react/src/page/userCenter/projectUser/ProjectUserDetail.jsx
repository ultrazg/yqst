import React, {Component} from 'react';
import ViewContent from "../../../baseview/viewContent/ViewContent";
import {Link} from "react-router-dom";
import {Button, Card, Form, Tabs, Timeline} from "antd";
import {RollbackOutlined} from "@ant-design/icons";
import BusinessModule from "./components/BusinessModule";
import SupplierModule from './components/SupplierModule';
import PartnerModule from "../companyUser/subModule/PartnerModule";
import RoleModule from "../companyUser/subModule/RoleModule";
import RightModule from "../companyUser/subModule/RightModule";
import moment from "moment";
import SwitchName from "../companyUser/SwitchName";
import AssemblySet from "../../../baseview/assemblySet/AssemblySet";
import Model from './Model';
import SWTable from 'SWViews/table';
import NumberFormat from "../../../utils/numberformat/NumberFormat";

const {TabPane} = Tabs;

class ProjectUserDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                bossProjectDetailedInfoVO: {},
                listCompanyLogDTOS: [],
                listStaffMsgDTOS: [],
                listDeptDTOS: [],
                listJobDTOS: [],
            },
            logList: [],
            companyUserName: '',
            status: 0
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

    render() {
        return (
            <Form ref={this.formRef}>
                <ViewContent
                    crumb={[
                        {name: "用户中心"},
                        {name: "项目用户管理列表", link: '/Pages/ProjectUserList'},
                        {name: "项目用户管理详情"},
                    ]}
                    topBtn={
                        <div>
                            <Link to={'/Pages/ProjectUserList'} style={{marginLeft: 15}}>
                                <Button icon={<RollbackOutlined/>}>返回</Button>
                            </Link>
                        </div>
                    }
                >
                    {/*<Tabs type="card">*/}
                    {/*    <TabPane tab="用户信息" key="1">*/}
                    {/*        {this.makeYHView()}*/}
                    {/*    </TabPane>*/}
                    {/*    <TabPane tab="基本信息" key="2">*/}
                    {/*        {this.makeJBView()}*/}
                    {/*    </TabPane>*/}
                    {/*    <TabPane tab="业务信息" key="3">*/}
                    {/*        <BusinessModule data={this.state.data} form={this.formRef.current}/>*/}
                    {/*    </TabPane>*/}
                    {/*    <TabPane tab="项目授权" key="4">*/}
                    {/*        /!*{this.makeSMView()}*!/*/}
                    {/*    </TabPane>*/}
                    {/*    <TabPane tab="员工管理" key="5">*/}
                    {/*        {this.makeYGView()}*/}
                    {/*    </TabPane>*/}
                    {/*    <TabPane tab="供应商管理" key="6">*/}
                    {/*        /!*{this.makeBMView()}*!/*/}
                    {/*    </TabPane>*/}
                    {/*    <TabPane tab="角色管理" key="7">*/}
                    {/*        /!*{this.makeZWView()}*!/*/}
                    {/*        <RoleModule data={this.state.data}/>*/}
                    {/*    </TabPane>*/}
                    {/*    <TabPane tab="权限管理" key="10">*/}
                    {/*        /!*{this.makeQXView()}*!/*/}
                    {/*        <RightModule data={this.state.data}/>*/}
                    {/*    </TabPane>*/}
                    {/*</Tabs>*/}
                    <Tabs type="card">
                        <TabPane tab="用户信息" key="1">
                            {this.makeYHView()}
                        </TabPane>
                        <TabPane tab="基本信息" key="2">
                            {this.makeJBView()}
                        </TabPane>
                        <TabPane tab="业务信息" key="3">
                            {/*{this.makeYWView()}*/}
                            <BusinessModule data={this.state.data} form={this.formRef.current}/>
                        </TabPane>
                        <TabPane tab="项目授权" key="4">
                            {this.makeBMView()}
                        </TabPane>
                        <TabPane tab="团队管理" key="5">
                            {this.makeYGView()}
                        </TabPane>
                        <TabPane tab="供应商管理" key="6">
                            {/*{this.makeSMView()}*/}
                            <SupplierModule data={this.state.data}/>
                        </TabPane>

                        {/*<TabPane tab="供应商管理" key="7">*/}
                        {/*    {this.makeZWView()}*/}
                        {/*</TabPane>*/}
                        {/*<TabPane tab="合作伙伴" key="8">*/}
                        {/*    /!*{this.makeHHRView()}*!/*/}
                        {/*    <PartnerModule data={this.state.data}/>*/}
                        {/*</TabPane>*/}
                        {/*<TabPane tab="角色管理" key="9">*/}
                        {/*    /!*{this.makeJSView()}*!/*/}
                        {/*    <RoleModule data={this.state.data}/>*/}
                        {/*</TabPane>*/}
                        {/*<TabPane tab="权限管理" key="10">*/}
                        {/*    /!*{this.makeQXView()}*!/*/}
                        {/*    <RightModule data={this.state.data}/>*/}
                        {/*</TabPane>*/}
                    </Tabs>
                </ViewContent>
            </Form>
        );
    }

    getInfo() {
        const id = this.id;
        Model.UserProjectGet({id}, res => {
            this.setState({
                data: res.data
            });
        });
        Model.UserProjectRelation({id}, res => {
            this.setState({
                companyUserName: res.data.companyUserName,
                status: res.data.status
            })
        })
    }

    makeYHView() {
        let {data} = this.state;
        let {bossProjectDetailedInfoVO, listStaffMsgDTOS} = data;
        let createId = listStaffMsgDTOS.filter(item => item.isAdmin === 1).map(i => i.id);

        const viewList = [
            {
                key: 'ZHKey',
                title: '账号信息',
                style: {},
                data: [
                    {key: 'uid', type: 'Texts', label: '项目ID', span: 12, value: bossProjectDetailedInfoVO.uid},
                    {
                        key: 'createTime', type: 'Texts', label: '创建时间', span: 12,
                        value: bossProjectDetailedInfoVO.createTime ? moment(bossProjectDetailedInfoVO.createTime).format('YYYY-MM-DD HH:mm:ss') : ''
                    },
                    // {key: 'a2', type: 'Texts', label: '创建者ID', span: 12, value: bossProjectDetailedInfoVO.createId},
                    {key: 'a2', type: 'Texts', label: '创建者ID', span: 12, value: createId},
                    {
                        key: 'accountSn',
                        type: 'Texts',
                        label: '项目号',
                        span: 12,
                        value: bossProjectDetailedInfoVO.accountSn
                    },
                    // {
                    //     key: 'status', type: 'Texts', label: '状态', span: 12,
                    //     value: bossProjectDetailedInfoVO.projectStatus
                    // },
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
            {/*                    this.state.logList && this.state.logList.length <= 0 &&*/}
            {/*                    <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>*/}
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
        let {bossProjectDetailedInfoVO} = data;
        const switchTransactionType = type => {
            let text = '';
            // 交易类型：1.租赁 2,外租 3.维保
            switch (type + '') {
                case '1':
                    text = '租赁';
                    break;
                case '2':
                    text = '外租';
                    break;
                case '3':
                    text = '维保';
                    break;
            }

            return text;
        }
        const viewList = [
            {
                key: 'JBKey',
                title: '基本信息',
                style: {},
                data: [
                    {
                        key: 'companyName',
                        type: 'Texts',
                        label: '项目名称',
                        span: 12,
                        value: bossProjectDetailedInfoVO.companyName
                    },
                    // {key: 'industry', type: 'Texts', label: '行业', span: 12, value: bossProjectDetailedInfoVO.industry},
                    {
                        key: 'provinceName', type: 'Texts', label: '所在地区', span: 12,
                        value: bossProjectDetailedInfoVO.provinceName + bossProjectDetailedInfoVO.cityName + bossProjectDetailedInfoVO.districtName
                    },
                    {
                        key: 'status', type: 'Texts', label: '项目状态', span: 12,
                        value: bossProjectDetailedInfoVO.projectStatus
                    },
                    // {key: 'CHN', type: 'Texts', label: '国家', span: 12, value: '中国'},
                    {key: 'phone', type: 'Texts', label: '联系电话', span: 12, value: bossProjectDetailedInfoVO.phone},
                    // {key: 'faxWay', type: 'Texts', label: '传真', span: 12, value: bossProjectDetailedInfoVO.faxWay},
                    // {key: 'email', type: 'Texts', label: '邮箱', span: 12, value: bossProjectDetailedInfoVO.email},
                    {key: 'address', type: 'Texts', label: '详细地址', span: 12, value: bossProjectDetailedInfoVO.address},
                    {
                        key: 'zipCode',
                        type: 'Texts',
                        label: '项目类型',
                        span: 12,
                        value: switchTransactionType(bossProjectDetailedInfoVO.transactionType)
                    },
                    {
                        key: 'zipCode',
                        type: 'Texts',
                        label: '项目编码',
                        span: 12,
                        value: bossProjectDetailedInfoVO.projectCode
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
            {/*                    this.state.logList && this.state.logList.length <= 0 &&*/}
            {/*                    <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>*/}
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
            {/*                    this.state.logList && this.state.logList.length <= 0 &&*/}
            {/*                    <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>*/}
            {/*                        暂无记录...*/}
            {/*                    </div>*/}
            {/*                }*/}
            {/*            </Timeline>*/}
            {/*        </TabPane>*/}
            {/*    </Tabs>*/}
            {/*</Card>*/}
        </div>
    }

    makeYWView() {
        let {data} = this.state;
        const viewList = [
            {
                key: 'KPKey',
                title: '开票信息',
                style: {},
                data: [
                    {key: 'a1', type: 'Texts', label: '开票信息ID', span: 12, value: ''},
                    {key: 'a2', type: 'Texts', label: '单位名称', span: 12, value: ''},
                    {key: 'a3', type: 'Texts', label: '纳税人识别号', span: 12, value: ''},
                    {key: 'a4', type: 'Texts', label: '地址', span: 12, value: ''},
                    {key: 'a5', type: 'Texts', label: '电话', span: 12, value: ''},
                    {key: 'a6', type: 'Texts', label: '开户行', span: 12, value: ''},
                    {key: 'a7', type: 'Texts', label: '账户', span: 12, value: ''},
                ]
            },
            {
                key: 'CKKey',
                title: '基本存款账户',
                style: {marginTop: 15},
                data: [
                    {key: 'b1', type: 'Texts', label: '企业开户名称', span: 12, value: ''},
                    {key: 'b2', type: 'Texts', label: '开户行', span: 12, value: ''},
                    {key: 'b3', type: 'Texts', label: '开户所在地', span: 12, value: ''},
                    {key: 'b4', type: 'Texts', label: '开户支行名称', span: 12, value: ''},
                    {key: 'b5', type: 'Texts', label: '企业银行账号', span: 12, value: ''},
                ]
            },
        ];
        const columns = [
            {
                title: '收件人',
                key: '',
                dataIndex: '',
            },
            {
                title: '联系电话',
                key: '',
                dataIndex: '',
            },
            {
                title: '邮编',
                key: '',
                dataIndex: '',
            },
            {
                title: '所在地区',
                key: '',
                dataIndex: '',
            },
            {
                title: '详细地址',
                key: '',
                dataIndex: '',
            },
            {
                title: '操作',
                key: '',
                dataIndex: '',
            },
        ];
        const ttColumns = [
            {
                title: 'ID',
                key: '',
                dataIndex: '',
            },
            {
                title: '单位名称',
                key: '',
                dataIndex: '',
            },
            {
                title: '纳税人识别号',
                key: '',
                dataIndex: '',
            },
            {
                title: '地址',
                key: '',
                dataIndex: '',
            },
            {
                title: '电话',
                key: '',
                dataIndex: '',
            },
            {
                title: '开户行',
                key: '',
                dataIndex: '',
            },
            {
                title: '账户',
                key: '',
                dataIndex: '',
            },
            {
                title: '操作',
                key: '',
                dataIndex: '',
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
                title='地址库'
                style={{marginTop: 15}}
            >
                <SWTable
                    columns={columns}
                    dataSource={[]}
                    pagination={false}
                />
            </Card>
            <Card
                type="inner"
                title='抬头库'
                style={{marginTop: 15}}
            >
                <SWTable
                    columns={ttColumns}
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
            {/*                        </Timeline.Item>*/}
            {/*                    })*/}
            {/*                }*/}
            {/*                {*/}
            {/*                    this.state.logList && this.state.logList.length <= 0 &&*/}
            {/*                    <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>*/}
            {/*                        暂无记录...*/}
            {/*                    </div>*/}
            {/*                }*/}
            {/*            </Timeline>*/}
            {/*        </TabPane>*/}
            {/*    </Tabs>*/}
            {/*</Card>*/}
        </div>
    }

    makeSMView() {
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
            {/*                    this.state.logList && this.state.logList.length <= 0 &&*/}
            {/*                    <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>*/}
            {/*                        暂无记录...*/}
            {/*                    </div>*/}
            {/*                }*/}
            {/*            </Timeline>*/}
            {/*        </TabPane>*/}
            {/*    </Tabs>*/}
            {/*</Card>*/}
        </div>
    }

    makeYGView() {
        const {data} = this.state;
        const {listStaffMsgDTOS} = data;
        const isAdmin = (status) => {
            let name = '';
            switch (status + '') {
                case '0':
                    name = '成员';
                    break;

                case '1':
                    name = '管理员';
                    break;

                case '2':
                    name = '企业创建者';
                    break;

                default:
                    break;
            }
            return name;
        }
        const columns = [
            {
                title: '成员ID',
                key: 'id',
                dataIndex: 'id',
            },
            {
                title: '成员姓名',
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
                    return isAdmin(res)
                }
            },
            // {
            //     title: '部门',
            //     key: 'deptName',
            //     dataIndex: 'deptName',
            // },
            // {
            //     title: '职务',
            //     key: 'jobName',
            //     dataIndex: 'jobName',
            // },
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
                title='成员管理'
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
            {/*                                <span>成员ID：123456</span>*/}
            {/*                                <span style={{marginLeft: 25}}>成员名称：陈天华</span>*/}
            {/*                            </div>*/}
            {/*                            <div>*/}
            {/*                                <span>个人用户ID：123456</span>*/}
            {/*                                <span style={{marginLeft: 25}}>个人用户名称：陈天华</span>*/}
            {/*                            </div>*/}
            {/*                        </Timeline.Item>*/}
            {/*                    })*/}
            {/*                }*/}
            {/*                {*/}
            {/*                    this.state.logList && this.state.logList.length <= 0 &&*/}
            {/*                    <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>*/}
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
            {/*                    this.state.logList && this.state.logList.length <= 0 &&*/}
            {/*                    <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>*/}
            {/*                        暂无记录...*/}
            {/*                    </div>*/}
            {/*                }*/}
            {/*            </Timeline>*/}
            {/*        </TabPane>*/}
            {/*    </Tabs>*/}
            {/*</Card>*/}
        </div>
    }

    makeBMView() {
        const switchStatus = status => {
            let text = '';
            // 状态：1.待审核2.审核通过3.审核拒绝4.撤销申请
            switch (status) {
                case 1:
                    return text = '待审核';
                case 2:
                    return text = '审核通过';
                case 3:
                    return text = '审核拒绝';
                case 4:
                    return text = '撤销申请';
            }

            return text;
        }

        return (
            <Card
                type="inner"
                title='项目授权信息'
            >
                <p>项目授权状态：{switchStatus(this.state.status)}</p>
                <p>挂靠企业：{this.state.companyUserName}</p>
            </Card>
        )
        // const columns = [
        //     {
        //         title: '部门ID',
        //         key: 'id',
        //         dataIndex: 'id',
        //     },
        //     {
        //         title: '部门名称',
        //         key: 'depName',
        //         dataIndex: 'depName',
        //     },
        //     {
        //         title: '员工人数',
        //         key: 'num',
        //         dataIndex: 'num',
        //         render: (res) => {
        //             return NumberFormat.thousandBit(res || 0, 0)
        //         }
        //     },
        //     {
        //         title: '创建时间',
        //         key: 'createTime',
        //         dataIndex: 'createTime',
        //         width: 100,
        //         render: (res) => {
        //             let times = res ? moment(res).format('YYYY-MM-DD HH:mm:ss') : '';
        //             return times ? <div>
        //                 <div>{times.split(' ')[0]}</div>
        //                 <div>{times.split(' ')[1]}</div>
        //             </div> : times;
        //         }
        //     },
        //     {
        //         title: '操作',
        //         key: '',
        //         dataIndex: '',
        //     }
        // ];
        //
        // return <div>
        //     <Card
        //         type="inner"
        //         title='部门管理'
        //     >
        //         <SWTable
        //             columns={columns}
        //             dataSource={this.state.data.listDeptDTOS || []}
        //             pagination={false}
        //         />
        //     </Card>
        //     <Card
        //         type="inner"
        //         title='操作记录'
        //         style={{marginTop: 15}}
        //     >
        //         <Tabs type="card">
        //             <TabPane tab="用户记录" key="1">
        //                 <Timeline style={{
        //                     padding: 15
        //                 }}>
        //                     {
        //                         this.state.logList.map((item, idx) => {
        //                             return <Timeline.Item key={'log_' + idx}>
        //                                 <h3>{item.title}</h3>
        //                                 <span>操作时间：{item.createTime ? moment(item.createTime).format('YYYY-MM-DD') : ''}</span>
        //                                 <div>
        //                                     <span>员工ID：123456</span>
        //                                     <span style={{marginLeft: 25}}>员工名称：陈天华</span>
        //                                 </div>
        //                                 <div>
        //                                     <span>个人用户ID：123456</span>
        //                                     <span style={{marginLeft: 25}}>个人用户名称：陈天华</span>
        //                                 </div>
        //                             </Timeline.Item>
        //                         })
        //                     }
        //                     {
        //                         this.state.logList && this.state.logList.length <= 0 &&
        //                         <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>
        //                             暂无记录...
        //                         </div>
        //                     }
        //                 </Timeline>
        //             </TabPane>
        //             <TabPane tab="管理员记录" key="2">
        //                 <Timeline style={{
        //                     padding: 15
        //                 }}>
        //                     {
        //                         this.state.logList.map((item, idx) => {
        //                             return <Timeline.Item key={'log_' + idx}>
        //                                 <h3>{item.title}</h3>
        //                                 <span>操作时间：{item.createTime ? moment(item.createTime).format('YYYY-MM-DD') : ''}</span>
        //                                 <div>
        //                                     <span>管理员ID：{item.createByName}</span>
        //                                     <span style={{marginLeft: 25}}>管理员名称：123</span>
        //                                 </div>
        //                             </Timeline.Item>
        //                         })
        //                     }
        //                     {
        //                         this.state.logList && this.state.logList.length <= 0 &&
        //                         <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>
        //                             暂无记录...
        //                         </div>
        //                     }
        //                 </Timeline>
        //             </TabPane>
        //         </Tabs>
        //     </Card>
        // </div>
    }

    makeZWView() {
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
            {/*                    this.state.logList && this.state.logList.length <= 0 &&*/}
            {/*                    <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>*/}
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
            {/*                    this.state.logList && this.state.logList.length <= 0 &&*/}
            {/*                    <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>*/}
            {/*                        暂无记录...*/}
            {/*                    </div>*/}
            {/*                }*/}
            {/*            </Timeline>*/}
            {/*        </TabPane>*/}
            {/*    </Tabs>*/}
            {/*</Card>*/}
        </div>
    }

    makeHHRView() {
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
            {/*                    this.state.logList && this.state.logList.length <= 0 &&*/}
            {/*                    <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>*/}
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
            {/*                    this.state.logList && this.state.logList.length <= 0 &&*/}
            {/*                    <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>*/}
            {/*                        暂无记录...*/}
            {/*                    </div>*/}
            {/*                }*/}
            {/*            </Timeline>*/}
            {/*        </TabPane>*/}
            {/*    </Tabs>*/}
            {/*</Card>*/}
        </div>
    }

    makeJSView() {
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
            {/*                    this.state.logList && this.state.logList.length <= 0 &&*/}
            {/*                    <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>*/}
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
            {/*                    this.state.logList && this.state.logList.length <= 0 &&*/}
            {/*                    <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>*/}
            {/*                        暂无记录...*/}
            {/*                    </div>*/}
            {/*                }*/}
            {/*            </Timeline>*/}
            {/*        </TabPane>*/}
            {/*    </Tabs>*/}
            {/*</Card>*/}
        </div>
    }

    makeQXView() {
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
            {/*                    this.state.logList && this.state.logList.length <= 0 &&*/}
            {/*                    <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>*/}
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
            {/*                    this.state.logList && this.state.logList.length <= 0 &&*/}
            {/*                    <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>*/}
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

export default ProjectUserDetail;
