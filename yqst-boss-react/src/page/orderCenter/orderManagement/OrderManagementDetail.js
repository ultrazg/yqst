/**
 * Created by yb on 2019/09/12.
 */

import React, {Component} from 'react';
import {Form, Button, Card, Tabs, Timeline, Row, Col} from 'antd';
import {RollbackOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import Model from "../Model";
import moment from 'moment'
import SWTable from 'SWViews/table';
import SwitchNames from './SwitchNames';
import AssemblySet from "../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../baseview/viewContent/ViewContent";
import NumberFormat from "../../../utils/numberformat/NumberFormat";

const { TabPane } = Tabs;


class OrderManagementDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                orderVO: {
                    buyerVO: {},
                    sellerVO: {},
                    cargoDetailListVO: [],
                },
                payListVO: [],
                waybillListVO: [],
            },
            logList: []
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
                        {name: "订单中心"},
                        {name: "订单管理列表", link: '/Pages/OrderManagementList'},
                        {name: "订单管理详情"},
                    ]}
                    topBtn = {
                        <div>
                            {/*<Link to={`/Pages/DistributionRuleEditor?id=${this.id}`}>
                            <Button type="primary" icon={'edit'}>编辑</Button>
                        </Link>*/}
                            <Link to={'/Pages/OrderManagementList'} style={{marginLeft: 15}}>
                                <Button icon={<RollbackOutlined />}>返回</Button>
                            </Link>
                        </div>
                    }
                >
                    <Tabs type="card">
                        <TabPane tab="订单信息" key="1">
                            {this.makeBaseView()}
                        </TabPane>
                        <TabPane tab="付款情况" key="2">
                            {this.makeFKView()}
                        </TabPane>
                        <TabPane tab="发货情况" key="3">
                            {this.makeFHView()}
                        </TabPane>
                        <TabPane tab="开票情况" key="4">
                            {this.makeKPView()}
                        </TabPane>
                    </Tabs>
                </ViewContent>
            </Form>
        );
    }

    getInfo() {
        Model.OrderGet({orderId: this.id}, (res) => {
            this.setState({data: res.data});
        }, (err) => {
        });
    }

    getLogList() {
        Model.OrderLList({orderId: this.id}, (res) => {
            this.setState({logList: res.data || []});
        }, (err) => {
        });
    }

    makeBaseView() {
        let {data} = this.state;
        let {orderVO} = data;

        let noSetDataOne = [
            {key: 'orderStatus', type: 'Texts', label: '订单状态', span: 12,
                value: SwitchNames.orderStatusName(orderVO.orderStatus)},
            {key: 'createTime', type: 'Texts', label: '产生时间', span: 12,
                value: orderVO.createTime ? moment(orderVO.createTime).format('YYYY-MM-DD HH:mm:ss') : ''},
            {key: 'orderSn', type: 'Texts', label: '订单编号', span: 12, value: orderVO.orderSn},
            {key: 'associateSn', type: 'Texts', label: '合同单编号', span: 12, value: orderVO.associateSn},
            {key: 'orderType', type: 'Texts', label: '订单类型', span: 12, value: SwitchNames.orderTypeName(orderVO.orderType)},
        ];
        let noSetDataTow = [
            {key: 'totalMoney', type: 'Texts', label: '商品总价', span: 12,
                value: NumberFormat.thousandBit(orderVO.totalMoney || 0, 2, true)},
            {key: 'logisticsMoney', type: 'Texts', label: '物流费用', span: 12,
                value: NumberFormat.thousandBit(orderVO.logisticsMoney || 0, 2, true)},
            {key: 'terminalDiscounts', type: 'Texts', label: '终端优惠', span: 12,
                value: NumberFormat.thousandBit(orderVO.terminalDiscounts || 0, 2, true)},
            {key: 'otherPay', type: 'Texts', label: '其他费用', span: 12,
                value: NumberFormat.thousandBit(orderVO.otherPay || 0, 2, true)},
            {key: 'orderAmount', type: 'Texts', label: '订单总价', span: 12,
                value: NumberFormat.thousandBit(orderVO.orderAmount || 0, 2, true)},
        ];
        let OMData = [
            {key: 'buyerPersonId', type: 'Texts', label: '购买用户ID', span: 12, value: orderVO.buyerVO.buyerPersonId},
            {key: 'buyerPersonName', type: 'Texts', label: '购买用户名称', span: 12, value: orderVO.buyerVO.buyerPersonName},
            {key: 'buyerId', type: 'Texts', label: '购买企业ID', span: 12, value: orderVO.buyerVO.buyerId},
            {key: 'buyerName', type: 'Texts', label: '购买企业名称', span: 12, value: orderVO.buyerVO.buyerName}
        ];
        let XSData = [
            {key: 'shopId', type: 'Texts', label: '销售终端ID', span: 12, value: orderVO.sellerVO.shopId},
            {key: 'shopName', type: 'Texts', label: '销售终端名称', span: 12, value: orderVO.sellerVO.shopName},
            {key: 'sellerId', type: 'Texts', label: '销售企业ID', span: 12, value: orderVO.sellerVO.sellerId},
            {key: 'sellerName', type: 'Texts', label: '销售企业名称', span: 12, value: orderVO.sellerVO.sellerName}
        ];
        let WLData = [
            {key: 'logisticsWay', type: 'Texts', label: '物流方式', span: 12, value: SwitchNames.logisticsWayName(orderVO.logisticsWay)},
            {key: 'contact', type: 'Texts', label: '收件人', span: 12, value: orderVO.contact},
            {key: 'phone', type: 'Texts', label: '联系电话', span: 12, value: orderVO.phone},
            {key: 'receivingArea', type: 'Texts', label: '收货地区', span: 12, value: orderVO.receivingArea},
            {key: 'streetName', type: 'Texts', label: '收货街道', span: 12, value: orderVO.streetName},
            {key: 'zipCode', type: 'Texts', label: '邮政编码', span: 12, value: orderVO.zipCode},
            {key: 'detailAddress', type: 'Texts', label: '详细地址', span: 12, value: orderVO.detailAddress},
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
                title: '数量',
                key: 'itemNumber',
                dataIndex: 'itemNumber',
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
                title: '含税金额',
                key: 'itemMoney',
                dataIndex: 'itemMoney',
                render: (res) => {
                    return NumberFormat.thousandBit(res || 0, 2, true)
                }
            }
        ];
        return <div>
            <Card
                type="inner"
                title="订单基本信息"
            >
                <AssemblySet key={'noSetDataOne'} data={noSetDataOne} form={this.formRef.current}/>
                <hr style={{
                    border: 0,
                    height: 1,
                    backgroundColor: '#e8e8e8',
                }}/>
                <AssemblySet key={'noSetDataTow'} data={noSetDataTow} form={this.formRef.current}/>
            </Card>

            <Card
                type="inner"
                title="购买方信息"
                style={{marginTop: 15}}
            >
                <AssemblySet key={'OMAss'} data={OMData} form={this.formRef.current}/>
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
                    dataSource={orderVO.cargoDetailListVO || []}
                    pagination={false}
                />
                <div style={{
                    textAlign: 'center',
                    lineHeight: '64.8px',
                    backgroundColor: '#fafafa',
                }}>商品价税合计：{NumberFormat.thousandBit(orderVO.itemTotal || 0, 2, true)}</div>
            </Card>

            <Card
                type="inner"
                title="用户操作记录"
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
                        this.state.logList && this.state.logList.map((item, idx) =>{
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
                </Timeline>
                {
                    this.state.logList && this.state.logList.length <= 0 && <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>暂无用户操作记录...</div>
                }
            </Card>
        </div>
    }

    makeFKView(){
        let {data} = this.state;
        let {payListVO, waybillListVO} = data;
        const columns = [
            {
                title: '收付款单号',
                key: 'paySn',
                dataIndex: 'paySn'
            },
            {
                title: '款单金额',
                key: 'payAmount',
                dataIndex: 'payAmount',
                render: (res) => {
                    return NumberFormat.thousandBit(res || 0, 2, true);
                }
            },
            {
                title: '余款金额',
                key: 'balanceAmount',
                dataIndex: 'balanceAmount',
                render: (res) => {
                    return NumberFormat.thousandBit(res || 0, 2, true);
                }
            },
            {
                title: '产生时间',
                key: '',
                dataIndex: '',
                render: (res) => {
                    return res ? moment(res).format('YYYY-MM-DD HH:mm:ss') : '';
                }
            }
        ];
        return <Card
            type="inner"
            title={
                <div>
                    <span style={{marginRight: 15}}>付款详情</span>
                    ( 订单付款状态:<span style={{fontWeight: 600, marginLeft: 5}}>
                        {SwitchNames.payStatusName(data.payStatus)}
                    </span> )
                </div>
            }
        >
            <SWTable
                columns={columns}
                dataSource={payListVO || []}
                pagination={false}
            />
            <Row style={{
                textAlign: 'center',
                lineHeight: '64.8px',
                backgroundColor: '#fafafa',
            }}>
                <Col span={12}>已付总金额：{NumberFormat.thousandBit(data.paidTotal || 0, 2, true)}</Col>
                <Col span={12}>未付总金额：{NumberFormat.thousandBit(data.unPaidTotal || 0, 2, true)}</Col>
            </Row>
        </Card>
    }

    makeFHView(){
        let {data} = this.state;
        let {waybillListVO} = data;
        const columns = [
            {
                title: '货单编号',
                key: 'paySn',
                dataIndex: 'paySn'
            },
            {
                title: '货单金额',
                key: 'payAmount',
                dataIndex: 'payAmount',
                render: (res) => {
                    return NumberFormat.thousandBit(res || 0, 2, true);
                }
            },
            {
                title: '余货金额',
                key: 'balanceAmount',
                dataIndex: 'balanceAmount',
                render: (res) => {
                    return NumberFormat.thousandBit(res || 0, 2, true);
                }
            },
            {
                title: '产生时间',
                key: 'createTime',
                dataIndex: 'createTime',
                render: (res) => {
                    return res ? moment(res).format('YYYY-MM-DD HH:mm:ss') : '';
                }
            }
        ];
        return <Card
            type="inner"
            title={
                <div>
                    <span style={{marginRight: 15}}>发货详情</span>
                    ( 订单发货状态:<span style={{fontWeight: 600, marginLeft: 5}}>
                        {SwitchNames.itemsStatusName(data.waybillStatus)}
                    </span> )
                </div>
            }
        >
            <SWTable
                columns={columns}
                dataSource={waybillListVO || []}
                pagination={false}
            />
            <Row style={{
                textAlign: 'center',
                lineHeight: '64.8px',
                backgroundColor: '#fafafa',
            }}>
                <Col span={12}>已发货总金额：{NumberFormat.thousandBit(data.shippedTotal || 0, 2, true)}</Col>
                <Col span={12}>未发货总金额：{NumberFormat.thousandBit(data.unShippedTotal || 0, 2, true)}</Col>
            </Row>
        </Card>
    }

    makeKPView(){
        const columns = [
            {
                title: '发票单号',
                key: '',
                dataIndex: ''
            },
            {
                title: '发票金额',
                key: '',
                dataIndex: '',
            },
            {
                title: '余票金额',
                key: '',
                dataIndex: '',
            },
            {
                title: '产生时间',
                key: '',
                dataIndex: '',
            }
        ];
        return <Card
            type="inner"
            title={
                <div>
                    <span style={{marginRight: 15}}>开票详情</span>
                    {/*( 开票状态:<span style={{fontWeight: 600, marginLeft: 5}}>已开部分</span> )*/}
                </div>
            }
        >
            <SWTable
                columns={columns}
                dataSource={[]}
                pagination={false}
            />
            <Row style={{
                textAlign: 'center',
                lineHeight: '64.8px',
                backgroundColor: '#fafafa',
            }}>
                <Col span={12}>已开票总金额：￥0.00</Col>
                <Col span={12}>未开票总金额：￥0.00</Col>
            </Row>
        </Card>
    }
}

export default OrderManagementDetail
