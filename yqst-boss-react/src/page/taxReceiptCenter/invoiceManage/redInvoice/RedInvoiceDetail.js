/**
 * Created by yb on 2019/09/29
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


class RedInvoiceDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                invoiceDetailsVO: [],
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
                    {name: "红冲发票列表", link: '/Pages/RedInvoiceList'},
                    {name: "红冲发票详情"}
                ]}
                topBtn = {
                    <div>
                        {/*<Button type="primary" icon={'edit'}>编辑</Button>
                        <Button type="danger" icon={'delete'} style={{marginLeft: 15}}
                                onClick={() => {
                                    // this.delData();
                                }}
                        >删除</Button>*/}
                        <Link to={'/Pages/RedInvoiceList'} style={{marginLeft: 15}}>
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
        Model.InvoiceRedGet({redId: this.id}, (res) => {
            this.setState({data: res.data});
        }, (err) => {
        });
    }

    getUserLogList() {
        Model.InvoiceMULog({invoiceId: this.id, invoiceManageType: 4}, (res) => {
            this.setState({uLogList: res.data || []});
        }, (err) => {
        });
    }

    getAdminLogList() {
        Model.InvoiceMALog({invoiceId: this.id, invoiceManageType: 3}, (res) => {
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
                    {key: 'redSn', type: 'Texts', label: '红冲发票单号', span: 12, value: data.redSn},
                    {key: 'invoiceType', type: 'Texts', label: '发票类型', span: 12,
                        value: SwitchStatus.invoiceType(data.invoiceType)},
                    {key: 'createTime', type: 'Texts', label: '产生时间', span: 12,
                        value: data.createTime ? moment(data.createTime).format('YYYY-MM-DD HH:mm:ss') : ''},
                    {key: 'status', type: 'Texts', label: '发票状态', span: 12,
                        value: SwitchStatus.status(data.status)},
                    {key: 'classifyId', type: 'Texts', label: '发票分类ID', span: 12, value: data.classifyId},
                    {key: 'classifyName', type: 'Texts', label: '发票分类', span: 12, value: data.classifyName},
                    {key: 'invoiceAmount', type: 'Texts', label: '红冲金额', span: 12,
                        value: NumberFormat.thousandBit(data.invoiceAmount || 0, 2, true)},
                    {key: 'redApplySn', type: 'Texts', label: '红冲发票申请单号', span: 12, value: data.redApplySn},
                    {key: 'sendStatus', type: 'Texts', label: '寄送状态', span: 12,
                        value: SwitchStatus.sendStatus(data.sendStatus)},
                    {key: 'sendSn', type: 'Texts', label: '发票寄送单号', span: 12, value: data.sendSn},
                    {key: 'blueApplySn', type: 'Texts', label: '原蓝字发票单号', span: 12, value: data.blueApplySn},
                    {key: 'blueInvoiceCode', type: 'Texts', label: '原蓝字发票代码', span: 12, value: data.blueInvoiceCode},
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
            },
            {
                title: '校验详情',
                key: 'JYKey',
                data: [
                    {key: 'verifyTme', type: 'Texts', label: '校验时间', span: 12,
                        value: data.verifyTme ? moment(data.verifyTme).format('YYYY-MM-DD') : ''},
                    {key: 'blueInvoiceCode', type: 'Texts', label: '发票代码', span: 12, value: data.blueInvoiceCode},
                    {key: 'invoiceNumber', type: 'Texts', label: '发票号码', span: 12, value: data.invoiceNumber},
                    {key: 'invoiceTime', type: 'Texts', label: '开票日期', span: 12,
                        value: data.invoiceTime ? moment(data.invoiceTime).format('YYYY-MM-DD') : ''},
                    {key: 'verifyNumber', type: 'Texts', label: '校验码', span: 12, value: data.verifyNumber},
                    {key: 'invoiceMoney', type: 'Texts', label: '合计金额(不含税)', span: 12,
                        value: NumberFormat.thousandBit(data.invoiceMoney || 0, 2, true)},
                    {key: 'taxPaid', type: 'Texts', label: '税额', span: 12, value: data.taxPaid},
                    {key: 'invoiceAmount', type: 'Texts', label: '价税合计', span: 12,
                        value: NumberFormat.thousandBit(data.invoiceAmount || 0, 2, true)},
                ],
                style: {
                    marginTop: 15
                },
                otherView: <div>
                    <a style={{textDecoration: 'underline'}}>查看电子发票 ></a>
                    <div style={{marginTop: 15}}>
                        <a style={{textDecoration: 'underline'}}>查看销售货物或者提供因税劳务清单 ></a>
                    </div>
                </div>
            },
        ];
        const columns = [
            {
                title: '发票要素ID',
                key: 'elementId',
                dataIndex: 'elementId',
            },
            {
                title: '发票要素编码',
                key: 'elementSn',
                dataIndex: 'elementSn',
            },
            {
                title: '要素名称',
                key: 'elementName',
                dataIndex: 'elementName',
            },
            {
                title: '内容',
                key: 'contentVO',
                dataIndex: 'contentVO',
                render: (res) => {
                    const resHtml = res && res.map((item, idx) => {
                        return res.length <= 1 ? <div>
                            {item.content}
                        </div> : <div>
                            值{++idx}：{item.content}
                        </div>
                    });
                    return resHtml || ''
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
                title="发票详情"
                style={{marginTop: 15}}
            >
                {
                    this.state.data.invoiceDetailsVO && this.state.data.invoiceDetailsVO.map((item, idx) => {
                        return <Card
                            key={'inv_' + idx}
                            style={{marginTop: 0 != idx ? 15 : 0}}
                            title={
                                <Row>
                                    <Col span={8}>发票要素组ID：{item.groupId}</Col>
                                    <Col span={8}>发票要素组编码：{item.groupSn}</Col>
                                    <Col span={8}>发票要素组名称：{item.groupName}</Col>
                                </Row>
                            }
                        >
                            <SWTable
                                columns={columns}
                                dataSource={item.elementListVo || []}
                                pagination={false}
                            />
                        </Card>
                    })
                }
                {
                    (!this.state.data.invoiceDetailsVO || this.state.data.invoiceDetailsVO.length <= 0) && <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>
                        暂无数据...
                    </div>
                }
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

export default RedInvoiceDetail
