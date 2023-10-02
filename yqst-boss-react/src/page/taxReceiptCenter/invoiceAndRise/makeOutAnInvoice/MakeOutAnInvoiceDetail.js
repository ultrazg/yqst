/**
 * Created by yb on 2019/09/16.
 */

import React, {Component} from 'react';
import {Form, Button, Modal, Card, Table, Tabs, Timeline, Row, Col} from 'antd';
import {Link} from "react-router-dom";
import Model from "../../Model";
import moment from 'moment'
import SWTable from 'SWViews/table';
import AssemblySet from "../../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../../baseview/viewContent/ViewContent";
import NumberFormat from "../../../../utils/numberformat/NumberFormat";
import {RollbackOutlined} from "@ant-design/icons";

const { TabPane } = Tabs;


class MakeOutAnInvoiceDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            logData: {
                usersLogVOList: [],
                adminLogVOList: [],
            }
        };
        this.id = '';
    }

    componentDidMount() {
        this.id = this.props.location.search.substr(1).split("=")[1];
        if (this.id) {
            this.getInfo();
            this.getLogData();
        }
    }

    // 视图层
    render() {
        return (
            <ViewContent
                crumb={[
                    {name: '税票中心'},
                    {name: "开票信息与抬头管理"},
                    {name: "开票信息列表", link: '/Pages/MakeOutAnInvoiceList'},
                    {name: "开票信息详情"}
                ]}
                topBtn = {
                    <div>
                        {/*<Button type="primary" icon={'edit'}>编辑</Button>
                        <Button type="danger" icon={'delete'} style={{marginLeft: 15}}
                            onClick={() => {
                                // this.delData();
                            }}
                        >删除</Button>*/}
                        <Link to={'/Pages/MakeOutAnInvoiceList'} style={{marginLeft: 15}}>
                            <Button icon={<RollbackOutlined />}>返回</Button>
                        </Link>
                    </div>
                }
            >
                {this.makeBaseView()}
            </ViewContent>
        );
    }

    getInfo() {
        Model.InvoiceIGet({invoiceId: this.id}, (res) => {
            this.setState({data: res.data});
        }, (err) => {
        });
    }

    getLogData() {
        Model.InvoiceILog({invoiceId: this.id, invoiceType: 1}, (res) => {
            this.setState({logData: res.data});
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
                    {key: 'invoiceId', type: 'Texts', label: '开票信息ID', span: 12, value: data.invoiceId},
                    {key: 'createTime', type: 'Texts', label: '产生时间', span: 12,
                        value: data.createTime ? moment(data.createTime).format('YYYY-MM-DD HH:mm:ss') : ''},
                    {key: 'userId', type: 'Texts', label: '企业ID', span: 12, value: data.userId},
                    {key: 'userNo', type: 'Texts', label: '企业号', span: 12, value: data.userNo},
                    {key: 'userName', type: 'Texts', label: '企业名称', span: 12, value: data.userName},
                ],
                style: {},
            },
            {
                title: '开票信息',
                key: 'TKKey',
                data: [
                    {key: 'infoName', type: 'Texts', label: '开票名称', span: 12, value: data.infoName},
                    {key: 'taxpayerNumber', type: 'Texts', label: '纳税人识别号', span: 12, value: data.taxpayerNumber},
                    {key: 'address', type: 'Texts', label: '地址', span: 12, value: data.address},
                    {key: 'phone', type: 'Texts', label: '电话', span: 12, value: data.phone},
                    {key: 'accountBank', type: 'Texts', label: '开户行', span: 12, value: data.accountBank},
                    {key: 'depositNumber', type: 'Texts', label: '账户', span: 12, value: data.depositNumber},
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
                        <AssemblySet key={item.key} data={item.data} form={this.props.form}/>
                    </Card>
                })
            }
            <Card
                type="inner"
                title="操作记录"
                style={{marginTop: 15}}
                bodyStyle={{paddingRight: 0}}
            >
                <Tabs type="card">
                    <TabPane tab="用户记录" key="1">
                        <Timeline
                            style={{
                                maxHeight: 300,
                                overflow: 'auto',
                                paddingTop: 15
                            }}
                        >
                            {
                                this.state.logData.usersLogVOList && this.state.logData.usersLogVOList.map((item, idx) => {
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
                                this.state.logData.usersLogVOList && this.state.logData.usersLogVOList.length <= 0 && <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>
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
                                this.state.adminLogVOList && this.state.adminLogVOList.map((item, idx) => {
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
                                this.state.adminLogVOList && this.state.adminLogVOList.length <= 0 && <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>
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

export default MakeOutAnInvoiceDetail
