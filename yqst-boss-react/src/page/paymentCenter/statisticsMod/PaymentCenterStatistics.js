/**
 * Created by yb on 2019/09/11
 */

import React from 'react';
import {Row, Col, DatePicker, Tabs, List, Tooltip, Radio, Card} from 'antd';
import {InfoCircleOutlined, CaretDownOutlined, CaretUpOutlined,} from '@ant-design/icons';
import moment from 'moment';
import TabsViewContent from "../../../baseview/tabsViewContent/TabsViewContent";
import NumberFormat from "../../../utils/numberformat/NumberFormat";
import PayColumnarCanvas from "./canvas/PayColumnarCanvas";
import PayBrokenLineCanvas from "./canvas/PayBrokenLineCanvas";
import PayCakeCanvas from "./canvas/PayCakeCanvas";

const { MonthPicker, RangePicker } = DatePicker;
const { TabPane } = Tabs;


class PaymentCenterStatistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <TabsViewContent
                crumb={[
                    {name: '支付中心'},
                    {name: "支付中心数据统计"}
                ]}
                backgroundColor={'#ececec'}
            >
                {this.makeDayView()}
                {this.makeTabView()}
                {this.makeQDView()}
            </TabsViewContent>
        );
    }

    makeDayView(){
        const styles = {
            fDiv: {
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap'
            },
            cDiv: {
                width: '23%',
                height: 210,
                border: '1px solid #e8e8e8',
                borderRadius: 6,
                marginBottom: 15,
                padding: 10,
                backgroundColor: '#fff'
            },
        };
        return <div>
            <div style={{...styles.fDiv}}>
                <div style={{...styles.cDiv}}>
                    <div style={{fontSize: 18}}>当日收付款笔数
                        <Tooltip placement="top" title="当日收付款笔数...">
                            <InfoCircleOutlined style={{
                                float: 'right',
                                marginTop: 3,
                                cursor: 'pointer',
                            }}/>
                        </Tooltip>
                    </div>
                    <p style={{
                        fontSize: 30,
                        fontWeight: 600,
                    }}>{NumberFormat.thousandBit(5650, 0)}</p>
                    <Row style={{
                        borderBottom: '1px solid #e8e8e8',
                        paddingBottom: 20,
                        marginBottom: 10
                    }}>
                        <Col span={12}>
                            周同比<span style={{marginLeft: 10, color: '#f00'}}><CaretDownOutlined /> 10%</span>
                        </Col>
                        <Col span={12}>
                            日环比<span style={{marginLeft: 10, color: '#46BD4C'}}><CaretUpOutlined /> 10%</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>日均：{NumberFormat.thousandBit(423, 0)}</Col>
                        <Col span={12}>总笔数：{NumberFormat.thousandBit(42300, 0)}</Col>
                    </Row>
                </div>
                <div style={{...styles.cDiv}}>
                    <div style={{fontSize: 18}}>当日收付款金额
                        <Tooltip placement="top" title="当日收付款金额...">
                            <InfoCircleOutlined style={{
                                float: 'right',
                                marginTop: 3,
                                cursor: 'pointer',
                            }} type="info-circle" />
                        </Tooltip>
                    </div>
                    <p style={{
                        fontSize: 30,
                        fontWeight: 600,
                    }}><span style={{fontSize: 16}}>￥</span>{NumberFormat.thousandBit(126560, 2)}</p>
                    <Row style={{
                        borderBottom: '1px solid #e8e8e8',
                        paddingBottom: 20,
                        marginBottom: 10
                    }}>
                        <Col span={12}>
                            周同比<span style={{marginLeft: 10, color: '#f00'}}><CaretDownOutlined /> 10%</span>
                        </Col>
                        <Col span={12}>
                            日环比<span style={{marginLeft: 10, color: '#46BD4C'}}><CaretUpOutlined /> 10%</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>日均：{NumberFormat.thousandBit(423, 0)}</Col>
                        <Col span={12}>总金额：{NumberFormat.thousandBit(42300, 2, true)}</Col>
                    </Row>
                </div>
                <div style={{...styles.cDiv}}>
                    <div style={{fontSize: 18}}>当日退款笔数
                        <Tooltip placement="top" title="当日退款笔数...">
                            <InfoCircleOutlined style={{
                                float: 'right',
                                marginTop: 3,
                                cursor: 'pointer',
                            }} type="info-circle" />
                        </Tooltip>
                    </div>
                    <p style={{
                        fontSize: 30,
                        fontWeight: 600,
                    }}>{NumberFormat.thousandBit(60,0)}</p>
                    <Row style={{
                        borderBottom: '1px solid #e8e8e8',
                        paddingBottom: 20,
                        marginBottom: 10
                    }}>
                        <Col span={12}>
                            周同比<span style={{marginLeft: 10, color: '#f00'}}><CaretDownOutlined /> 10%</span>
                        </Col>
                        <Col span={12}>
                            日环比<span style={{marginLeft: 10, color: '#46BD4C'}}><CaretUpOutlined /> 10%</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>日均：{NumberFormat.thousandBit(423, 0)}</Col>
                        <Col span={12}>总笔数：{NumberFormat.thousandBit(42300, 0)}</Col>
                    </Row>
                </div>
                <div style={{...styles.cDiv}}>
                    <div style={{fontSize: 18}}>当日退款金额
                        <Tooltip placement="top" title="当日退款金额...">
                            <InfoCircleOutlined style={{
                                float: 'right',
                                marginTop: 3,
                                cursor: 'pointer',
                            }} type="info-circle" />
                        </Tooltip>
                    </div>
                    <p style={{
                        fontSize: 30,
                        fontWeight: 600,
                    }}><span style={{fontSize: 16}}>￥</span>{NumberFormat.thousandBit(125560)}</p>
                    <Row style={{
                        borderBottom: '1px solid #e8e8e8',
                        paddingBottom: 20,
                        marginBottom: 10
                    }}>
                        <Col span={12}>
                            周同比<span style={{marginLeft: 10, color: '#f00'}}><CaretDownOutlined /> 10%</span>
                        </Col>
                        <Col span={12}>
                            日环比<span style={{marginLeft: 10, color: '#46BD4C'}}><CaretUpOutlined /> 10%</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>日均：{NumberFormat.thousandBit(423, 0)}</Col>
                        <Col span={12}>退款率：{NumberFormat.thousandBit(4.2, 2)} %</Col>
                    </Row>
                </div>
            </div>

            <div style={{...styles.fDiv}}>
                <div style={{...styles.cDiv}}>
                    <div style={{fontSize: 18}}>当日新增商户账户数
                        <Tooltip placement="top" title="当日新增商户账户数...">
                            <InfoCircleOutlined style={{
                                float: 'right',
                                marginTop: 3,
                                cursor: 'pointer',
                            }} type="info-circle" />
                        </Tooltip>
                    </div>
                    <p style={{
                        fontSize: 30,
                        fontWeight: 600,
                    }}>{NumberFormat.thousandBit(6560, 0)}</p>
                    <Row style={{
                        borderBottom: '1px solid #e8e8e8',
                        paddingBottom: 20,
                        marginBottom: 10
                    }}>
                        <Col span={12}>
                            周同比<span style={{marginLeft: 10, color: '#f00'}}><CaretDownOutlined /> 10%</span>
                        </Col>
                        <Col span={12}>
                            日环比<span style={{marginLeft: 10, color: '#46BD4C'}}><CaretUpOutlined /> 10%</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>日均：{NumberFormat.thousandBit(423, 0)}</Col>
                        <Col span={12}>总数：{NumberFormat.thousandBit(4230, 0)}</Col>
                    </Row>
                </div>
                <div style={{...styles.cDiv, border: 0, backgroundColor: 'none'}}></div>
                <div style={{...styles.cDiv, border: 0, backgroundColor: 'none'}}></div>
                <div style={{...styles.cDiv, border: 0, backgroundColor: 'none'}}></div>
            </div>
        </div>
    }

    makeTabView(){
        const styles = {
            span:{
                padding: '5px 10px',
                display: 'inline-block',
                cursor: 'pointer',
            },
            onSpan: {
                color: '#20a5c7',
            }
        };
        const data = [
            {
                serial: 1,
                name: '的哈萨克静安大火',
                amount: 11111,
            },
            {
                serial: 2,
                name: '的哈萨克静安大火',
                amount: 22222,
            },
            {
                serial: 3,
                name: '的哈萨克静安大火',
                amount: 33333,
            },
            {
                serial: 4,
                name: '的哈萨克静安大火',
                amount: 44444,
            },
            {
                serial: 5,
                name: '的哈萨克静安大火',
                amount: 55555,
            },
            {
                serial: 6,
                name: '的哈萨克静安大火',
                amount: 66666,
            },
            {
                serial: 7,
                name: '的哈萨克静安大火',
                amount: 77777,
            },
        ];
        const data02 = [
            {
                serial: 1,
                name: '微信支付',
                amount: 323234,
            },
            {
                serial: 2,
                name: '支付宝支付',
                amount: 323234,
            },
            {
                serial: 3,
                name: '银联企业账户',
                amount: 323234,
            },
            {
                serial: 4,
                name: '京东钱包',
                amount: 323234,
            },
            {
                serial: 5,
                name: '美团钱包',
                amount: 323234,
            },
            {
                serial: 6,
                name: '银联企业账户',
                amount: 66666,
            },
            {
                serial: 7,
                name: '京东钱包',
                amount: 77777,
            },
        ];
        return <Tabs style={{backgroundColor: '#fff', padding: 10, borderRadius: 6, position: 'relative'}} defaultActiveKey="1" onChange={(key) => {
        }}>
            <TabPane tab="款项金额" key="1">
                <div style={{
                    position: 'absolute',
                    right: 10,
                    top: 10,
                    zIndex: 1,
                }}>
                    <span style={{...styles.span, ...styles.onSpan}}>今日</span>
                    <span style={{...styles.span}}>本周</span>
                    <span style={{...styles.span}}>本月</span>
                    <RangePicker
                        defaultValue={[moment('2019-08/26', 'YYYY-MM-DD'), moment('2019/08/30', 'YYYY-MM-DD')]}
                        format={'YYYY-MM-DD'}
                        style={{marginLeft: 15}}
                    />
                </div>

                <div style={{
                    display: 'flex',
                    overflow: 'hidden',
                    height: 400
                }}>
                    <div style={{flexGrow: 1}}>
                        <h2 style={{paddingLeft: 20}}>款项金额统计</h2>
                        <PayColumnarCanvas/>
                    </div>
                    <div style={{width: 400, paddingLeft: 15}}>
                        <h2 style={{overflow: 'hidden'}}>排名
                            <Radio.Group defaultValue={'1'} style={{float: 'right'}}>
                                <Radio.Button value="1">收付款</Radio.Button>
                                <Radio.Button value="2">退款</Radio.Button>
                            </Radio.Group>
                        </h2>
                        <List
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={(item, idx) => (
                                <List.Item>
                                    <List.Item.Meta
                                        // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                        // title={<a href="https://ant.design">{item.title}</a>}
                                        description={
                                            <Row>
                                                <Col span={4}>
                                                    <span style={{
                                                        padding: '2px 8px',
                                                        borderRadius: '50%',
                                                        background: idx == 0 || idx == 1 || idx == 2 ? '#999' : '#e8e8e8',
                                                        color: idx == 0 || idx == 1 || idx == 2 ? '#fff' : '#111',
                                                        display: 'inline-block'
                                                    }}>{item.serial}</span>
                                                </Col>
                                                <Col span={14}>{item.name}</Col>
                                                <Col span={6}>{NumberFormat.thousandBit(item.amount, 0)}</Col>
                                            </Row>
                                        }
                                    />
                                </List.Item>
                            )}
                            style={{
                                height: '360px',
                                overflow: 'auto'
                            }}
                        />
                    </div>
                </div>
            </TabPane>

            <TabPane tab="商户账户" key="2">
                <div style={{
                    position: 'absolute',
                    right: 10,
                    top: 10,
                    zIndex: 1,
                }}>
                    <span style={{...styles.span}}>今日</span>
                    <span style={{...styles.span, ...styles.onSpan}}>本周</span>
                    <span style={{...styles.span}}>本月</span>
                    <RangePicker
                        defaultValue={[moment('2019-08/27', 'YYYY-MM-DD'), moment('2019/08/30', 'YYYY-MM-DD')]}
                        format={'YYYY-MM-DD'}
                        style={{marginLeft: 15}}
                    />
                </div>

                <div style={{
                    display: 'flex',
                    overflow: 'hidden',
                    height: 400
                }}>
                    <div style={{flexGrow: 1}}>
                        <h2 style={{paddingLeft: 20}}>商户账户数量趋势</h2>
                        <PayBrokenLineCanvas/>
                    </div>
                    <div style={{width: 400, paddingLeft: 15}}>
                        <h2>收支付渠道排名</h2>
                        <List
                            itemLayout="horizontal"
                            dataSource={data02}
                            renderItem={(item, idx) => (
                                <List.Item>
                                    <List.Item.Meta
                                        // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                        // title={<a href="https://ant.design">{item.title}</a>}
                                        description={
                                            <Row>
                                                <Col span={4}>
                                                    <span style={{
                                                        padding: '2px 8px',
                                                        borderRadius: '50%',
                                                        background: idx == 0 || idx == 1 || idx == 2 ? '#999' : '#e8e8e8',
                                                        color: idx == 0 || idx == 1 || idx == 2 ? '#fff' : '#111',
                                                        display: 'inline-block'
                                                    }}>{item.serial}</span>
                                                </Col>
                                                <Col span={14}>{item.name}</Col>
                                                <Col span={6}>{NumberFormat.thousandBit(item.amount, 0)}</Col>
                                            </Row>
                                        }
                                    />
                                </List.Item>
                            )}
                            style={{
                                height: '360px',
                                overflow: 'auto'
                            }}
                        />
                    </div>
                </div>
            </TabPane>
        </Tabs>
    }

    makeQDView(){
        return <Card title="交易渠道占比" bordered={false} style={{marginTop: 15}}>
            <Radio.Group defaultValue={'1'}>
                <Radio.Button value="1">全部渠道</Radio.Button>
                <Radio.Button value="2">线上</Radio.Button>
                <Radio.Button value="3">线下</Radio.Button>
            </Radio.Group>
            <PayCakeCanvas/>
        </Card>
    }

}
export default PaymentCenterStatistics
