/**
 * Created by yb on 2019/09/17
 */

import React, {Component} from 'react';
import {Form, Button, Card, Tabs, Timeline} from 'antd';
import {RollbackOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import Model from "../../Model";
import moment from 'moment';
import SwitchNames from "./SwitchNames";
import AssemblySet from "../../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../../baseview/viewContent/ViewContent";

const { TabPane } = Tabs;


class AccountApplicationDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            logList: [],
            adminLogList: []
        };
        this.id = '';
        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.id = this.props.location.search.substr(1).split("=")[1];
        if (this.id) {
            this.getInfo();
            this.getLogList();
        }
    }

    // 视图层
    render() {
        return (
            <Form ref={this.formRef}>
                <ViewContent
                    crumb={[
                        {name: '支付中心'},
                        {name: "商户账户管理"},
                        {name: "账户申请列表", link: '/Pages/AccountApplicationList'},
                        {name: "账户申请详情"}
                    ]}
                    topBtn = {
                        <div>
                            {/*<Button type="primary" icon={'edit'}>编辑</Button>*/}
                            <Link to={'/Pages/AccountApplicationList'} style={{marginLeft: 15}}>
                                <Button icon={<RollbackOutlined />}>返回</Button>
                            </Link>
                        </div>
                    }
                >
                    {this.makeBaseView()}
                </ViewContent>
            </Form>
        );
    }

    getInfo() {
        Model.walletPAAGet({applyId: this.id}, (res) => {
            this.setState({data: res.data});
        }, (err) => {
        });
    }

    // 用户操作记录
    getLogList() {
        Model.walletPALList({id: this.id, type: 2}, (res) => {
            this.setState({logList: res.data || []});
        }, (err) => {
        });
    }

    // 管理者操作记录
    getAdminLogList() {
        Model.walletPAALList({id: this.id, type: 2}, (res) => {
            this.setState({adminLogList: res.data || []});
        }, (err) => {
        });
    }

    makeBaseView() {
        let {data} = this.state;
        let allData = [
            {
                title: '账户申请基本信息',
                key: 'JBKey',
                data: [
                    {key: 'applySn', type: 'Texts', label: '申请单号', span: 12, value: data.applySn},
                    {key: 'createTime', type: 'Texts', label: '申请时间', span: 12,
                        value: data.createTime ? moment(data.createTime).format('YYYY-MM-DD HH:mm:ss') : ''},
                    {key: 'applyStatus', type: 'Texts', label: '申请状态', span: 12,
                        value: <span style={{color: SwitchNames.applyStatusName(data.applyStatus, 'color')}}>
                        {SwitchNames.applyStatusName(data.applyStatus)}
                    </span>},
                    {key: 'accountId', type: 'Texts', label: '商户账户ID', span: 12, value: data.accountId},
                    {key: 'channelId', type: 'Texts', label: '收支付渠道ID', span: 12, value: data.channelId},
                    {key: 'channelName', type: 'Texts', label: '收支付渠道名称', span: 12, value: data.channelName},
                    {key: 'accountCode', type: 'Texts', label: '商户ID', span: 12, value: data.accountCode},
                    {key: 'accountKey', type: 'Texts', label: '商户秘钥', span: 12, value: '******'},
                ],
                style: {},
            },
            {
                title: '商户信息',
                key: 'SHKey',
                data: [
                    {key: 'userId', type: 'Texts', label: '企业ID', span: 12, value: data.userId},
                    {key: 'userName', type: 'Texts', label: '企业名称', span: 12, value: data.userName},
                ],
                style: {
                    marginTop: 15
                },
            },
        ];
        return <div>
            {
                allData.map((item, idx) => {
                    return <Card
                        key={'car_' + idx}
                        type="inner"
                        title={item.title || '信息'}
                        style={item.style ? item.style : {}}
                        bodyStyle={item.bodyStyle ? item.bodyStyle : {}}
                    >
                        <AssemblySet key={item.key} data={item.data} form={this.formRef.current}/>
                    </Card>
                })
            }
            <Card
                type="inner"
                title="管理员操作记录"
                style={{marginTop: 15}}
                bodyStyle={{paddingRight: 0}}
            >
                <Tabs type="card" onChange={(key) => {
                    if('2' === '' + key && this.state.adminLogList.length <= 0){
                        this.getAdminLogList();
                    }
                }}>
                    <TabPane tab="用户记录" key="1">
                        <Timeline
                            style={{
                                maxHeight: 300,
                                overflow: 'auto',
                                paddingTop: 15
                            }}
                        >
                            {
                                this.state.logList.map((item, idx) => {
                                    return <Timeline.Item key={'log_' + idx}>
                                        <h3>{item.title}</h3>
                                        <div>操作时间：{item.createTime ? moment(item.createTime).format('YYYY-MM-DD HH:mm:ss') : ''}</div>
                                        <div>
                                            <span>企业ID：{item.userId}</span>
                                            <span style={{marginLeft: 25}}>企业名称：{item.userName}</span>
                                        </div>
                                        <div>
                                            <span>员工ID：{item.staffId}</span>
                                            <span style={{marginLeft: 25}}>员工名称：{item.staffName}</span>
                                        </div>
                                        <div>
                                            <span>个人用户ID：{item.personId}</span>
                                            <span style={{marginLeft: 25}}>个人用户名称：{item.personName}</span>
                                        </div>
                                    </Timeline.Item>
                                })
                            }
                            {
                                this.state.logList && this.state.logList.length <= 0 && <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>
                                    暂无记录...
                                </div>
                            }
                        </Timeline>
                    </TabPane>
                    <TabPane tab="管理员记录" key="2">
                        <Timeline
                            style={{
                                maxHeight: 300,
                                overflow: 'auto',
                                paddingTop: 15
                            }}
                        >
                            {
                                this.state.adminLogList.map((item, idx) => {
                                    return <Timeline.Item key={'aLog_' + idx}>
                                        <h3>{item.title}</h3>
                                        <div>操作时间：{item.createTime ? moment(item.createTime).format('YYYY-MM-DD HH:mm:ss') : ''}</div>
                                        <div>
                                            <span>管理员ID：{item.adminId}</span>
                                            <span style={{marginLeft: 25}}>管理员名称：{item.adminName}</span>
                                        </div>
                                    </Timeline.Item>
                                })
                            }
                            {
                                this.state.adminLogList && this.state.adminLogList.length <= 0 && <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>
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

export default AccountApplicationDetail
