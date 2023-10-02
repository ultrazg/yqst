/**
 * Created by yb on 2019/09/30
 */

import React from 'react';
import {Button, Form, message, Row, Col, DatePicker, Tabs, List, Tooltip, Radio, Card} from 'antd';
import {InfoCircleOutlined, CaretDownOutlined, CaretUpOutlined} from '@ant-design/icons';
import moment from 'moment';
import {Link} from "react-router-dom";
import TabsViewContent from "../../../baseview/tabsViewContent/TabsViewContent";
import NumberFormat from "../../../utils/numberformat/NumberFormat";
import TaxColumnarCanvas from "./canvas/TaxColumnarCanvas";
import TaxBrokenLineCanvas from "./canvas/TaxBrokenLineCanvas";

const { MonthPicker, RangePicker } = DatePicker;
const { TabPane } = Tabs;


class TaxReceiptStatistics extends React.Component {
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
                    {name: '税票中心'},
                    {name: "税票中心数据统计"}
                ]}
                backgroundColor={'#ececec'}
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
                    <div style={{fontSize: 18}}>当日蓝字发票申请单数
                        <Tooltip placement="top" title="当日蓝字发票申请单数...">
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
                        <Col span={12}>同意数：{NumberFormat.thousandBit(423, 0)}</Col>
                        <Col span={12}>同意率：17%</Col>
                    </Row>
                </div>
                <div style={{...styles.cDiv}}>
                    <div style={{fontSize: 18}}>当日红冲发票申请单数
                        <Tooltip placement="top" title="当日红冲发票申请单数...">
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
                    }}>{NumberFormat.thousandBit(126560, 0)}</p>
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
                        <Col span={12}>同意数：{NumberFormat.thousandBit(423, 0)}</Col>
                        <Col span={12}>同意率：10%</Col>
                    </Row>
                </div>
                <div style={{...styles.cDiv}}>
                    <div style={{fontSize: 18}}>当日蓝字发票单金额
                        <Tooltip placement="top" title="当日蓝字发票单金额...">
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
                        <Col span={24}>日均：{NumberFormat.thousandBit(423, 0)}</Col>
                    </Row>
                </div>
                <div style={{...styles.cDiv}}>
                    <div style={{fontSize: 18}}>当日发票寄送单数
                        <Tooltip placement="top" title="当日发票寄送单数...">
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
                    <Row>
                        <Col span={12}>确认数：{NumberFormat.thousandBit(423, 0)}</Col>
                        <Col span={12}>确认率：{NumberFormat.thousandBit(4.2, 2)} %</Col>
                    </Row>
                </div>
            </div>

            <div style={{...styles.fDiv}}>
                <div style={{...styles.cDiv}}>
                    <div style={{fontSize: 18}}>当日蓝字发票单数
                        <Tooltip placement="top" title="当日蓝字发票单数...">
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
                        <Col span={12}>校验数：{NumberFormat.thousandBit(423, 0)}</Col>
                        <Col span={12}>校验率：18%</Col>
                    </Row>
                </div>
                <div style={{...styles.cDiv}}>
                    <div style={{fontSize: 18}}>当日红冲发票单数
                        <Tooltip placement="top" title="当日红冲发票单数...">
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
                        <Col span={12}>校验数：{NumberFormat.thousandBit(423, 0)}</Col>
                        <Col span={12}>校验率：18%</Col>
                    </Row>
                </div>
                <div style={{...styles.cDiv}}>
                    <div style={{fontSize: 18}}>当日红冲发票单金额
                        <Tooltip placement="top" title="当日红冲发票单金额...">
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
                        <Col span={24}>日均：{NumberFormat.thousandBit(423, 0)}</Col>
                    </Row>
                </div>
                <div style={{...styles.cDiv}}>
                    <Row>
                        <Col span={12}>
                            发票要素数量
                            <p style={{
                                fontSize: 30,
                                fontWeight: 600,
                            }}>{NumberFormat.thousandBit(6560, 0)}</p>
                        </Col>
                        <Col span={12}>
                            发票要素组数量
                            <p style={{
                                fontSize: 30,
                                fontWeight: 600,
                            }}>{NumberFormat.thousandBit(6560, 0)}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            发票模板数量
                            <p style={{
                                fontSize: 30,
                                fontWeight: 600,
                            }}>{NumberFormat.thousandBit(6560, 0)}</p>
                        </Col>
                    </Row>
                </div>
                {/*<div style={{...styles.cDiv, border: 0, backgroundColor: 'none'}}></div>*/}
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
            <TabPane tab="发票金额" key="1">
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
                        <h2 style={{paddingLeft: 20}}>发票金额趋势</h2>
                        <TaxColumnarCanvas/>
                    </div>
                    <div style={{width: 400, paddingLeft: 15}}>
                        <h2 style={{overflow: 'hidden'}}>蓝字发票金额排名
                            <Radio.Group defaultValue={'1'} style={{float: 'right'}}>
                                <Radio.Button value="1">蓝字发票</Radio.Button>
                                <Radio.Button value="2">红冲发票</Radio.Button>
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

            <TabPane tab="发票单数量" key="2">
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
                        <h2 style={{paddingLeft: 20}}>发票单数量</h2>
                        <TaxBrokenLineCanvas/>
                    </div>
                    <div style={{width: 400, paddingLeft: 15}}>
                        <h2>蓝字发票金额排名</h2>
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

            <TabPane tab="寄送单数" key="3">
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
                        <h2 style={{paddingLeft: 20}}>寄送单数</h2>
                        <TaxBrokenLineCanvas/>
                    </div>
                    <div style={{width: 400, paddingLeft: 15}}>
                        <h2>蓝字发票金额排名</h2>
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

}
export default TaxReceiptStatistics
