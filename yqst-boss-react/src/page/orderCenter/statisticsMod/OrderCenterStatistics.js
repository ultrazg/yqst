/**
 * Created by yb on 2019/09/10
 */

import React from 'react';
import { Form, Row, Col, DatePicker, Tabs, List, Tooltip} from 'antd';
import {InfoCircleOutlined, CaretDownOutlined, CaretUpOutlined} from '@ant-design/icons';
import moment from 'moment';
import TabsViewContent from "../../../baseview/tabsViewContent/TabsViewContent";
import NumberFormat from "../../../utils/numberformat/NumberFormat";
import OrderColumnarCanvas from "./canvas/OrderColumnarCanvas";

const { MonthPicker, RangePicker } = DatePicker;
const { TabPane } = Tabs;


class OrderCenterStatistics extends React.Component {
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
                    {name: '订单中心'},
                    {name: "订单中心数据统计"}
                ]}
            >
                {this.makeDayView()}
                {this.makeTabView()}
            </TabsViewContent>
        );
    }

    makeDayView(){
        const styles = {
            fDiv: {
                display: 'flex',
                justifyContent: 'space-around',
                flexWrap: 'wrap'
            },
            cDiv: {
                width: '23%',
                height: 210,
                border: '1px solid #e8e8e8',
                borderRadius: 6,
                marginBottom: 15,
                padding: 10
            },
        };
        return <div>
            <div style={{...styles.fDiv}}>
                <div style={{...styles.cDiv}}>
                    <div style={{fontSize: 18}}>当日订单金额
                        <Tooltip placement="top" title="当日订单金额...">
                            <InfoCircleOutlined
                                style={{
                                    float: 'right',
                                    marginTop: 3,
                                    cursor: 'pointer',
                                }}
                            />
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
                    日均：{NumberFormat.thousandBit(12423, 2, true)}
                </div>
                <div style={{...styles.cDiv}}>
                    <div style={{fontSize: 18}}>当日订单数
                        <Tooltip placement="top" title="当日订单数...">
                            <InfoCircleOutlined
                                style={{
                                    float: 'right',
                                    marginTop: 3,
                                    cursor: 'pointer',
                                }}
                            />
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
                    已付款订单：{NumberFormat.thousandBit(12423, 0)}
                </div>
                <div style={{...styles.cDiv}}>
                    <div style={{fontSize: 18}}>当日售后单数量
                        <Tooltip placement="top" title="当日售后单数量...">
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
                    }}>{NumberFormat.thousandBit(26,0)}</p>
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
                    售后比率：{NumberFormat.thousandBit(3.13, 2)} %
                </div>
                <div style={{...styles.cDiv}}>
                    <div style={{fontSize: 18}}>当日交易单金额
                        <Tooltip placement="top" title="当日交易单金额...">
                            <InfoCircleOutlined
                                style={{
                                    float: 'right',
                                    marginTop: 3,
                                    cursor: 'pointer',
                                }}
                            />
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
                    日均：{NumberFormat.thousandBit(12423, 2, true)}
                </div>
            </div>

            <div style={{...styles.fDiv}}>
                <div style={{...styles.cDiv}}>
                    <div style={{fontSize: 18}}>当日收发货单数
                        <Tooltip placement="top" title="当日收发货单数...">
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
                    }}>{NumberFormat.thousandBit(125560, 0)}</p>
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
                    日均：{NumberFormat.thousandBit(12423, 0)}
                </div>
                <div style={{...styles.cDiv}}>
                    <div style={{fontSize: 18}}>当日退货单数
                        <Tooltip placement="top" title="当日退货单数...">
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
                    }}>{NumberFormat.thousandBit(125560)}</p>
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
                    日均：{NumberFormat.thousandBit(12423, 0)}
                </div>
                <div style={{...styles.cDiv, border: 0}}></div>
                <div style={{...styles.cDiv, border: 0}}></div>
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
        return <Tabs style={{position: 'relative'}} defaultActiveKey="1" onChange={(key) => {}}>
            <TabPane tab="订单金额" key="1" style={{position: 'relative'}}>
                <div style={{
                    position: 'absolute',
                    right: 0,
                    top: -56,
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
                        <h2 style={{paddingLeft: 20}}>订单金额趋势</h2>
                        <OrderColumnarCanvas
                            alias={'订单金额'}
                        />
                    </div>
                    <div style={{width: 400, paddingLeft: 15}}>
                        <h2>销售终端订单金额排名</h2>
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

            <TabPane tab="交易单金额" key="2">
                <div style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
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
                        <h2 style={{paddingLeft: 20}}>交易单金额趋势</h2>
                        <OrderColumnarCanvas
                            alias={'交易金额'}
                        />
                    </div>
                    <div style={{width: 400, paddingLeft: 15}}>
                        <h2>销售终端交易单金额排名</h2>
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

            <TabPane tab="售后单金额" key="3">
                <div style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    zIndex: 1,
                }}>
                    <span style={{...styles.span}}>今日</span>
                    <span style={{...styles.span}}>本周</span>
                    <span style={{...styles.span, ...styles.onSpan}}>本月</span>
                    <RangePicker
                        defaultValue={[moment('2019-08/28', 'YYYY-MM-DD'), moment('2019/08/30', 'YYYY-MM-DD')]}
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
                        <h2 style={{paddingLeft: 20}}>售后单金额趋势</h2>
                        <OrderColumnarCanvas
                            alias={'售后金额'}
                        />
                    </div>
                    <div style={{width: 400, paddingLeft: 15}}>
                        <h2>销售终端售后单金额排名</h2>
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
        </Tabs>
    }

}
export default OrderCenterStatistics
