/**
 * Created by yb on 2019/09/16.
 */

import React, {Component} from 'react';
import {Form, Button, Card, Tabs, Timeline, Row, Col} from 'antd';
import {RollbackOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import Model from "../Model";
import moment from 'moment'
import SWTable from 'SWViews/table';
import SwitchNames from './SwitchNames';
import NumberFormat from "../../../utils/numberformat/NumberFormat";
import AssemblySet from "../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../baseview/viewContent/ViewContent";

const { TabPane } = Tabs;


class ReturnedOrderDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                buyerVO: {},
                sellerVO: {},
                cargoDetail: [],
            },
            logData: {
                usersLogVOList: [],
                adminLogVOList: [],
            }
        };
        this.id = '';
        this.formRef = React.createRef();
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
                    {name: '订单中心'},
                    {name: "货单管理"},
                    {name: "退货单管理列表", link: '/Pages/ReturnedOrderList'},
                    {name: "退货单单管理详情"}
                ]}
                topBtn = {
                    <div>
                        {/*<Button type="primary" icon={'edit'}>编辑</Button>*/}
                        <Link to={'/Pages/ReturnedOrderList'} style={{marginLeft: 15}}>
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
        Model.OrderSRGet({salesReturnId: this.id}, (res) => {
            this.setState({data: res.data});
        }, (err) => {
        });
    }

    getLogData() {
        Model.OrderWLList({deliveryId: this.id, deliveryType: 2}, (res) => {
            this.setState({logData: res.data});
        }, (err) => {
        });
    }

    makeBaseView() {
        let {data, logData} = this.state;
        let {buyerVO, sellerVO, cargoDetail} = data;
        let {usersLogVOList, adminLogVOList} = logData;

        let noSetDataOne = [
            {key: 'returnSn', type: 'Texts', label: '退货单编号', span: 12, value: data.returnSn},
            {key: 'status', type: 'Texts', label: '状态', span: 12, value: SwitchNames.statusName(data.status)},
            {key: 'afterSaleSn', type: 'Texts', label: '售后单编号', span: 12, value: data.afterSaleSn},
            {key: 'alreadyPay', type: 'Texts', label: '商品总价(含税)', span: 12,
                value: NumberFormat.thousandBit(data.alreadyPay || 0, 2, true)},
            {key: 'createTime', type: 'Texts', label: '产生时间', span: 12,
                value: data.createTime ? moment(data.createTime).format('YYYY-MM-DD HH:mm:ss') : ''},
        ];
        let GMData = [
            {key: 'buyerPersonId', type: 'Texts', label: '购买用户ID', span: 12, value: buyerVO.buyerPersonId},
            {key: 'buyerPersonName', type: 'Texts', label: '购买用户名称', span: 12, value: buyerVO.buyerPersonName},
            {key: 'buyerId', type: 'Texts', label: '购买企业ID', span: 12, value: buyerVO.buyerId},
            {key: 'buyerName', type: 'Texts', label: '购买企业名称', span: 12, value: buyerVO.buyerName}
        ];
        let XSData = [
            {key: 'shopId', type: 'Texts', label: '销售终端ID', span: 12, value: sellerVO.shopId},
            {key: 'shopName', type: 'Texts', label: '销售终端名称', span: 12, value: sellerVO.shopName},
            {key: 'sellerId', type: 'Texts', label: '销售企业ID', span: 12, value: sellerVO.sellerId},
            {key: 'sellerName', type: 'Texts', label: '销售企业名称', span: 12, value: sellerVO.sellerName}
        ];
        let WLData = [
            {key: 'logisticsWay', type: 'Texts', label: '物流方式', span: 12, value: SwitchNames.logisticsWayName(data.logisticsWay)},
            {key: 'shippingSn', type: 'Texts', label: '物流单号', span: 12, value: data.shippingSn},
            {
                key: 'cargoVoucher', type: 'UploadFile', label: '货物凭证', span: 12,
                value: data.cargoVoucher ? data.cargoVoucher.split(',') : [],
                data: {
                    maxNum: 1,
                    fileUrlList: data.cargoVoucher ? data.cargoVoucher.split(',') : [],
                    isDowload: false,
                    isReadOnly: true,
                },
            },
            {
                key: 'deliveryChargeVoucher', type: 'UploadFile', label: '送货单凭证', span: 12,
                value: data.deliveryChargeVoucher ? data.deliveryChargeVoucher.split(',') : [],
                data: {
                    maxNum: 1,
                    fileUrlList: data.deliveryChargeVoucher ? data.deliveryChargeVoucher.split(',') : [],
                    isDowload: false,
                    isReadOnly: true,
                },
            },
        ];
        const columns = [
            {
                title: '商品ID',
                key: 'itemId',
                dataIndex: 'itemId',
                width: 120,
            },
            {
                title: '税收分类编码',
                key: 'itemSn',
                dataIndex: 'itemSn',
            },
            {
                title: '货物或服务名称',
                key: 'itemName',
                dataIndex: 'itemName',
            },
            {
                title: '规格型号',
                key: 'itemAttrs',
                dataIndex: 'itemAttrs',
            },
            {
                title: '单位',
                key: 'itemUnit',
                dataIndex: 'itemUnit'
            },
            {
                title: '含税单价',
                key: 'itemPrice',
                dataIndex: 'itemPrice',
                render: (res) => {
                    return NumberFormat.thousandBit(res || 0, 2, true)
                }
            },
            {
                title: '退货数量',
                key: 'salesReturnNumber',
                dataIndex: 'salesReturnNumber',
                render: (res) => {
                    return NumberFormat.thousandBit(res || 0,0)
                }
            },
            {
                title: '退货金额（含税）',
                key: 'salesReturnPrice',
                dataIndex: 'salesReturnPrice',
                render: (res) => {
                    return NumberFormat.thousandBit(res || 0, 2, true)
                }
            }
        ];
        return <div>
            <Card
                type="inner"
                title="退货单基本信息"
            >
                <AssemblySet key={'noSetDataOne'} data={noSetDataOne} form={this.formRef.current}/>
            </Card>

            <Card
                type="inner"
                title="购买方信息"
                style={{marginTop: 15}}
            >
                <AssemblySet key={'OMAss'} data={GMData} form={this.formRef.current}/>
            </Card>

            <Card
                type="inner"
                title="销售方信息"
                style={{marginTop: 15}}
            >
                <AssemblySet key={'XSAss'} data={XSData} form={this.formRef.current}/>
            </Card>

            <Card
                type="inner"
                title="物流信息"
                style={{marginTop: 15}}
            >
                <AssemblySet key={'WLAss'} data={WLData} form={this.formRef.current}/>
            </Card>

            <Card
                type="inner"
                title="货物或服务详情"
                style={{marginTop: 15}}
            >
                <SWTable
                    columns={columns}
                    dataSource={cargoDetail}
                    pagination={false}
                />
                <Row style={{
                    textAlign: 'center',
                    lineHeight: '64.8px',
                    backgroundColor: '#fafafa',
                }}>
                    <Col span={24}>退货商品总金额（含税）：{NumberFormat.thousandBit(data.itemTotal || 0, 2, true)} </Col>
                </Row>
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
                                usersLogVOList && usersLogVOList.map((item, idx) => {
                                    return <Timeline.Item key={'log_' + idx}>
                                        <div style={{backgroundColor: item.title.indexOf('系统自动确认收货') >= 0 ? '#ffebf5' : '#fff', padding: 10}}>
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
                                        </div>
                                    </Timeline.Item>
                                })
                            }
                        </Timeline>
                        {
                            usersLogVOList && usersLogVOList.length <= 0 && <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>
                                暂无记录...
                            </div>
                        }
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
                                adminLogVOList && adminLogVOList.map((item, idx) => {
                                    return <Timeline.Item key={'logs_' + idx}>
                                        <h3>{item.title}</h3>
                                        <div>操作时间：{item.createTime ? moment(item.createTime).format('YYYY-MM-DD HH:mm:ss') : ''}</div>
                                        <div>
                                            <span>管理员ID：{item.adminId}</span>
                                            <span style={{marginLeft: 25}}>管理员名称：{item.adminName}</span>
                                        </div>
                                    </Timeline.Item>
                                })
                            }
                        </Timeline>
                        {
                            adminLogVOList && adminLogVOList.length <= 0 && <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>
                                暂无记录...
                            </div>
                        }
                    </TabPane>
                </Tabs>
            </Card>
        </div>
    }
}

export default ReturnedOrderDetail
