/**
 * Created by yb on 2019/10/24
 */

import React from 'react';
import {Button, Form, message, Row, Col, DatePicker, Tabs, List, Tooltip, Card, Radio} from 'antd';
import {InfoCircleOutlined, CaretDownOutlined, CaretUpOutlined} from '@ant-design/icons';
import moment from 'moment';
import {Link} from "react-router-dom";
import TabsViewContent from "../../../baseview/tabsViewContent/TabsViewContent";
import NumberFormat from "../../../utils/numberformat/NumberFormat";
import HistogramCanvas from "./canvas/HistogramCanvas";
import BrokenLineCanvas from "./canvas/BrokenLineCanvas";
import PieChartCanvas from "./canvas/PieChartCanvas";

const { MonthPicker, RangePicker } = DatePicker;
const { TabPane } = Tabs;


class AttDataStatistics extends React.Component {
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
                    {name: '认证中心'},
                    {name: "认证数据统计"}
                ]}
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
                    <div style={{fontSize: 18}}>当日认证提交数
                        <Tooltip placement="top" title="当日认证提交数...">
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
                    }}>{NumberFormat.thousandBit(6560 || 0, 0)}</p>
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
                    <div>当日认证通过数：{NumberFormat.thousandBit(12423, 0)}</div>
                    <div>通过率：60 %</div>
                </div>
                <div style={{...styles.cDiv}}>
                    <div style={{fontSize: 18}}>资质总数
                        <Tooltip placement="top" title="资质总数...">
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
                    }}>{NumberFormat.thousandBit(8846, 0)}</p>
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
                    <div>当日认证通过数：{NumberFormat.thousandBit(12423, 0)}</div>
                    <div>通过率：60 %</div>
                </div>
                <div style={{...styles.cDiv}}>
                    <div style={{fontSize: 18}}>资质组总数
                        <Tooltip placement="top" title="资质组总数...">
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
                    }}>{NumberFormat.thousandBit(6560,0)}</p>
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
                    <div>当日认证通过数：{NumberFormat.thousandBit(12423, 0)}</div>
                    <div>通过率：60 %</div>
                </div>
                <div style={{...styles.cDiv}}>
                    <div style={{fontSize: 18}}>认证组总数
                        <Tooltip placement="top" title="认证组总数...">
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
                    }}>{NumberFormat.thousandBit(8846,0)}</p>
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
                    <div>当日认证通过数：{NumberFormat.thousandBit(12423, 0)}</div>
                    <div>通过率：60 %</div>
                </div>
            </div>
        </div>
    }

    makeTabView(){
        return <Tabs style={{position: 'relative'}} defaultActiveKey="1" onChange={(key) => {

        }}>
            <TabPane tab="用户认证情况" key="1" style={{position: 'relative'}}>
                <HistogramCanvas/>
            </TabPane>

            <TabPane tab="资质趋势" key="2">
                <BrokenLineCanvas/>
            </TabPane>

            <TabPane tab="资质组趋势" key="3">
                <BrokenLineCanvas/>
            </TabPane>

            <TabPane tab="认证组趋势" key="4">
                <BrokenLineCanvas/>
            </TabPane>
        </Tabs>
    }

    makeQDView(){
        return <Card title="用户认证占比" style={{marginTop: 15}} bodyStyle={{padding: 10}}>
            <Radio.Group defaultValue={'1'}>
                <Radio.Button value="1">云服务认证</Radio.Button>
                <Radio.Button value="2">实名认证</Radio.Button>
            </Radio.Group>
            <Row style={{marginTop: 15}}>
                <Col span={12}>
                    <h3>提交数</h3>
                    <PieChartCanvas/>
                </Col>
                <Col span={12}>
                    <h3>通过数</h3>
                    <PieChartCanvas/>
                </Col>
            </Row>
        </Card>
    }

}
export default AttDataStatistics
