/**
 * Created by yb on 2019/09/16.
 */

import React, {Component} from 'react';
import {Form, Button, Modal, Card, Table, Tabs, Timeline, Row, Col} from 'antd';
import {Link} from "react-router-dom";
import Model from "../../Model";
import moment from 'moment'
import SWTable from 'SWViews/table';
import SwitchStatus from "./SwitchStatus";
import AssemblySet from "../../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../../baseview/viewContent/ViewContent";
import NumberFormat from "../../../../utils/numberformat/NumberFormat";
import {RollbackOutlined} from "@ant-design/icons";

const { TabPane } = Tabs;


class BlueInvoiceApplyDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                orderListVO: [],
            },
            uLogList: [],
            aLogList: [],
        };
        this.id = '';
    }

    componentDidMount() {
        this.id = this.props.location.search.substr(1).split("=")[1];
        if (this.id) {
            this.getInfo();
            this.getUserLogList();
            this.getAdminLogList();
        }
    }

    // 视图层
    render() {
        return (
            <ViewContent
                crumb={[
                    {name: '税票中心'},
                    {name: "发票管理"},
                    {name: "蓝字发票申请列表", link: '/Pages/BlueInvoiceApplyList'},
                    {name: "蓝字发票申请详情"}
                ]}
                topBtn = {
                    <div>
                        {/*<Button type="primary" icon={'edit'}>编辑</Button>
                        <Button type="danger" icon={'delete'} style={{marginLeft: 15}}
                                onClick={() => {
                                    // this.delData();
                                }}
                        >删除</Button>*/}
                        <Link to={'/Pages/BlueInvoiceApplyList'} style={{marginLeft: 15}}>
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
        Model.InvoiceBAGet({blueApplyId: this.id}, (res) => {
            this.setState({data: res.data});
        }, (err) => {
        });
    }

    getUserLogList() {
        Model.InvoiceMULog({invoiceId: this.id, invoiceManageType: 1}, (res) => {
            this.setState({uLogList: res.data || []});
        }, (err) => {
        });
    }

    getAdminLogList() {
        Model.InvoiceMALog({invoiceId: this.id, invoiceManageType: 1}, (res) => {
            this.setState({aLogList: res.data || []});
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
                    {key: 'blueApplySn', type: 'Texts', label: '蓝字发票申请单号', span: 12, value: data.blueApplySn},
                    {key: 'invoiceType', type: 'Texts', label: '发票类型', span: 12,
                        value: SwitchStatus.invoiceType(data.invoiceType)},
                    {key: 'createTime', type: 'Texts', label: '申请时间', span: 12,
                        value: data.createTime ? moment(data.createTime).format('YYYY-MM-DD HH:mm:ss') : ''},
                    {key: 'status', type: 'Texts', label: '申请状态', span: 12,
                        value: SwitchStatus.status(data.status)},
                    {key: 'classifyId', type: 'Texts', label: '发票分类ID', span: 12, value: data.classifyId},
                    {key: 'classifyName', type: 'Texts', label: '发票分类', span: 12, value: data.classifyName},
                    {key: 'invoiceAmount', type: 'Texts', label: '开票总金额', span: 12,
                        value: NumberFormat.thousandBit(data.invoiceAmount || 0, 2, true)},
                    {key: 'blueSn', type: 'Texts', label: '蓝字发票单号', span: 12, value: data.blueSn},
                ],
                style: {},
            },
            {
                title: '销售方',
                key: 'XSKey',
                data: [
                    {key: 'sellerId', type: 'Texts', label: '企业ID', span: 12, value: data.sellerId},
                    {key: 'sellerName', type: 'Texts', label: '企业名称', span: 12, value: data.sellerName},
                    {key: 'sellerInvoiceName', type: 'Texts', label: '开票名称', span: 12, value: data.sellerInvoiceName},
                    {key: 'sellerTaxpayerNumber', type: 'Texts', label: '纳税人识别号', span: 12, value: data.sellerTaxpayerNumber},
                    {key: 'sellerAddressPhone', type: 'Texts', label: '地址、电话', span: 12, value: data.sellerAddressPhone},
                    {key: 'sellerAccountNumber', type: 'Texts', label: '开户行及账号', span: 12, value: data.sellerAccountNumber},
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
                    {key: 'buyerRiseName', type: 'Texts', label: '抬头名称', span: 12, value: data.buyerRiseName},
                    {key: 'buyerTaxpayerNumber', type: 'Texts', label: '纳税人识别号', span: 12, value: data.buyerTaxpayerNumber},
                    {key: 'buyerAddressPhone', type: 'Texts', label: '地址、电话', span: 12, value: data.buyerAddressPhone},
                    {key: 'buyerAccountNumber', type: 'Texts', label: '开户行及账号', span: 12, value: data.buyerAccountNumber},
                ],
                style: {
                    marginTop: 15
                },
            },
        ];
        const columns = [
            {
                title: '订单编号',
                key: 'orderSn',
                dataIndex: 'orderSn',
            },
            {
                title: '购买方',
                key: 'buyerName',
                dataIndex: 'buyerName',
            },
            {
                title: '销售方',
                key: 'sellerName',
                dataIndex: 'sellerName',
            },
            {
                title: '订单类型',
                key: 'orderType',
                dataIndex: 'orderType',
                render: (res) => {
                    return SwitchStatus.orderType(res);
                }
            },
            {
                title: '订单产生时间',
                key: 'createTime',
                dataIndex: 'createTime',
                width: 120,
                render: (res) => {
                    let times = res ? moment(res).format('YYYY-MM-DD HH:mm:ss') : '';

                    return times ? <div>
                        <div>{times.split(' ')[0]}</div>
                        <div>{times.split(' ')[1]}</div>
                    </div> : times;
                }
            },
            {
                title: '订单总价',
                key: 'orderAmount',
                dataIndex: 'orderAmount',
                render: (res) => {
                    return NumberFormat.thousandBit(res || 0, 2, true)
                }
            },
            {
                title: '开票金额',
                key: 'invoiceAmount',
                dataIndex: 'invoiceAmount',
                render: (res) => {
                    return NumberFormat.thousandBit(res || 0, 2, true)
                }
            },
            {
                title: '操作',
                key: '',
                dataIndex: '',
                width: 90,
                render: (res) => {
                    return <div>
                        <a>
                            查看
                        </a>
                    </div>
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
                    </Card>
                })
            }
            <Card
                type="inner"
                title="申请开票订单信息"
                style={{marginTop: 15}}
                bodyStyle={{paddingRight: 0}}
            >
                <SWTable
                    columns={columns}
                    dataSource={data.orderListVO || []}
                    pagination={false}
                />
                <div style={{
                    padding: 20,
                    background: '#fafafa',
                    textAlign: 'right',
                    color: 'blue',
                }}>开票总金额：{NumberFormat.thousandBit(data.money || 0, 2, true)}</div>
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
                                this.state.uLogList && this.state.uLogList.map((item, idx) => {
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
                                this.state.uLogList && this.state.uLogList.length <= 0 && <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>
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
                                this.state.aLogList && this.state.aLogList.map((item, idx) => {
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
                                this.state.aLogList && this.state.aLogList.length <= 0 && <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>
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

export default BlueInvoiceApplyDetail
