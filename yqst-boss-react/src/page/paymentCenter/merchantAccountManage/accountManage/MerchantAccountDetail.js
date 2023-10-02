/**
 * Created by yb on 2019/09/17.
 */

import React, {Component} from 'react';
import {Form, Button, Card, Timeline} from 'antd';
import {RollbackOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import Model from "../../Model";
import moment from 'moment'
import SWTable from 'SWViews/table';
import SwitchNames from "./SwitchNames";
import AssemblySet from "../../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../../baseview/viewContent/ViewContent";


class MerchantAccountDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                bindVO: [],
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
                       {name: "商户账户列表", link: '/Pages/MerchantAccountList'},
                       {name: "商户账户详情"}
                   ]}
                   topBtn = {
                       <div>
                           {/*<Button type="primary" icon={'edit'}>编辑</Button>*/}
                           <Link to={'/Pages/MerchantAccountList'} style={{marginLeft: 15}}>
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
        Model.walletPAGet({accountId: this.id}, (res) => {
            this.setState({data: res.data});
        }, (err) => {
        });
    }

    getLogList() {
        Model.walletPAALList({id: this.id, type: 1}, (res) => {
            this.setState({logList: res.data || []});
        }, (err) => {
        });
    }

    makeBaseView() {
        let {data} = this.state;
        let allData = [
            {
                title: '基本信息',
                key: 'JBKey',
                data: [
                    {key: 'accountId', type: 'Texts', label: '商户账户ID', span: 12, value: data.accountId},
                    {key: 'accountStatus', type: 'Texts', label: '账户状态', span: 12,
                        value: <span style={{color: SwitchNames.accountStatusName(data.accountStatus, 'color')}}>
                        {SwitchNames.accountStatusName(data.accountStatus)}
                    </span>},
                    {key: 'createTime', type: 'Texts', label: '产生时间', span: 12,
                        value: data.createTime ? moment(data.createTime).format('YYYY-MM-DD HH:mm:ss') : ''},
                    {key: 'applySn', type: 'Texts', label: '商户账户申请单号', span: 12, value: data.applySn},
                    {key: 'bindStatus', type: 'Texts', label: '绑定状态', span: 12, value: SwitchNames.bindStatusName(data.bindStatus)},
                ],
                style: {},
            },
            {
                title: '账户信息',
                key: 'ZHKey',
                data: [
                    {key: 'channelId', type: 'Texts', label: '收支付渠道ID', span: 12, value: data.channelId},
                    {key: 'channelName', type: 'Texts', label: '收支付渠道名称', span: 12, value: data.channelName},
                    {key: 'accountCode', type: 'Texts', label: '商户ID', span: 12, value: data.accountCode},
                    {key: 'accountKey', type: 'Texts', label: '商户秘钥', span: 12, value: '******'},
                ],
                style: {
                    marginTop: 15
                },
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
        const columns = [
            {
                title: '绑定关系ID',
                key: 'bindId',
                dataIndex: 'bindId',
            },
            {
                title: '终端名称',
                key: 'shopName',
                dataIndex: 'shopName',
            },
            {
                title: '绑定状态',
                key: 'bindStatus',
                dataIndex: 'bindStatus',
                render: (res) => {
                    return SwitchNames.bindStatusName(res);
                }
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
                title="绑定信息"
                style={{marginTop: 15}}
            >
                <SWTable
                    columns={columns}
                    dataSource={data.bindVO || []}
                    pagination={false}
                />
            </Card>
            <Card
                type="inner"
                title="管理员操作记录"
                style={{marginTop: 15}}
                bodyStyle={{paddingRight: 0}}
            >
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
                                <div>
                                    <h3>{item.title}</h3>
                                    <div>操作时间：{item.createTime ? moment(item.createTime).format('YYYY-MM-DD HH:mm:ss') : ''}</div>
                                    <div>
                                        <span>管理员ID：{item.adminId}</span>
                                        <span style={{marginLeft: 25}}>管理员名称：{item.adminName}</span>
                                    </div>
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
            </Card>
        </div>
    }
}

export default MerchantAccountDetail
