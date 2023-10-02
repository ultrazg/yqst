/**
 * Created by yb on 2019/09/29
 */

import React, {Component} from 'react';
import {Form, Button, Modal, Card, Table, Tabs, Timeline, Row, Col} from 'antd';
import {Link} from "react-router-dom";
import Model from "../Model";
import moment from 'moment'
import SWTable from 'SWViews/table';
import SwitchStatus from "./SwitchStatus";
import AssemblySet from "../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../baseview/viewContent/ViewContent";
import NumberFormat from "../../../utils/numberformat/NumberFormat";
import {RollbackOutlined} from "@ant-design/icons";

const { TabPane } = Tabs;


class InvoiceSendDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                invoiceListVO: []
            },
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
                    {name: "发票寄送单列表", link: '/Pages/InvoiceSendList'},
                    {name: "发票寄送单详情"}
                ]}
                topBtn = {
                    <div>
                        {/*<Button type="primary" icon={'edit'}>编辑</Button>
                        <Button type="danger" icon={'delete'} style={{marginLeft: 15}}
                                onClick={() => {
                                    // this.delData();
                                }}
                        >删除</Button>*/}
                        <Link to={'/Pages/InvoiceSendList'} style={{marginLeft: 15}}>
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
        Model.InvoiceSGet({sendId: this.id}, (res) => {
            this.setState({data: res.data});
        }, (err) => {
        });
    }

    getLogData() {
        Model.InvoiceSLGet({sendId: this.id}, (res) => {
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
                    {key: 'sendSn', type: 'Texts', label: '发票寄送单号', span: 12, value: data.sendSn},
                    {key: 'sendType', type: 'Texts', label: '寄送类型', span: 12,
                        value: SwitchStatus.sendType(data.sendType)},
                    {key: 'status', type: 'Texts', label: '状态', span: 12,
                        value: SwitchStatus.status(data.status)},
                    {key: 'createTime', type: 'Texts', label: '产生时间', span: 12,
                        value: data.createTime ? moment(data.createTime).format('YYYY-MM-DD HH:mm:ss') : ''},
                    {key: 'sendAmount', type: 'Texts', label: '寄送金额', span: 12,
                        value: NumberFormat.thousandBit(data.sendAmount || 0, 2, true)},
                    {key: 'trackingNumber', type: 'Texts', label: '物流单号', span: 12, value: data.trackingNumber},
                ],
                style: {},
            },
            {
                title: '销售方',
                key: 'XSKey',
                data: [
                    {key: 'sellerId', type: 'Texts', label: '企业ID', span: 12, value: data.sellerId},
                    {key: 'sellerName', type: 'Texts', label: '企业名称', span: 12, value: data.sellerName},
                ],
                style: {
                    marginTop: 15
                },
            },
            {
                title: '购买方',
                key: 'GMKey',
                data: [
                    {key: 'buyerId', type: 'Texts', label: '个人用户ID', span: 12, value: data.buyerId},
                    {key: 'buyerName', type: 'Texts', label: '个人用户名称', span: 12, value: data.buyerName},
                    {key: 'userId', type: 'Texts', label: '企业ID', span: 12, value: data.userId},
                    {key: 'userName', type: 'Texts', label: '企业名称', span: 12, value: data.userName},
                ],
                style: {
                    marginTop: 15
                },
            }
        ];
        const columns = [
            {
                title: '蓝字/红冲发票单号',
                key: 'invoiceSn',
                dataIndex: 'invoiceSn',
            },
            {
                title: '发票单种类',
                key: 'invoiceType',
                dataIndex: 'invoiceType',
                render: (res) => {
                    return SwitchStatus.invoiceType(res)
                }
            },
            {
                title: '发票代码',
                key: 'invoiceCode',
                dataIndex: 'invoiceCode',
            },
            {
                title: '销售方名称',
                key: 'sellerName',
                dataIndex: 'sellerName',
            },
            {
                title: '购买方名称',
                key: 'buyerName',
                dataIndex: 'buyerName',
            },
            {
                title: '发票金额',
                key: 'invoiceMoney',
                dataIndex: 'invoiceMoney',
                render: (res) => {
                    return NumberFormat.thousandBit(res || 0, 2, true)
                }
            },
            {
                title: '产生时间',
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
                        {
                            item.otherView && item.otherView
                        }
                    </Card>
                })
            }
            <Card
                type="inner"
                title="发票单详情"
                style={{marginTop: 15}}
            >
                <SWTable
                    columns={columns}
                    dataSource={data.invoiceListVO || []}
                    pagination={false}
                />
            </Card>

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
                                (!this.state.logData.usersLogVOList || this.state.logData.usersLogVOList.length <= 0) && <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>
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
                                this.state.logData.adminLogVOList && this.state.logData.adminLogVOList.map((item, idx) => {
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
                                (!this.state.logData.adminLogVOList || this.state.logData.adminLogVOList.length <= 0) && <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>
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

export default InvoiceSendDetail
