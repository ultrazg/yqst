/**
 * Created by yb on 2019/11/12
 */

import React from 'react';
import {Button, Form, message, Row, Col, DatePicker, Tabs, List, Tooltip, Radio, Card} from 'antd';
import {InfoCircleOutlined, CaretDownOutlined, CaretUpOutlined} from '@ant-design/icons';
import moment from 'moment';
import {Link} from "react-router-dom";
import SWTable from 'SWViews/table';
import TabsViewContent from "../../../baseview/tabsViewContent/TabsViewContent";
import NumberFormat from "../../../utils/numberformat/NumberFormat";
import HeadSearch from "../../../baseview/headSearch/HeadSearch";
import StrengthCanvas from "./canvas/StrengthCanvas";
import AmountCanvas from "./canvas/AmountCanvas";
import ClassifyCanvas from "./canvas/ClassifyCanvas";
import ExampleCanvas from "./canvas/ExampleCanvas";

const { MonthPicker, RangePicker } = DatePicker;
const { TabPane } = Tabs;


class CloudServeStatistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                {
                    a: '1',
                    b: '09893',
                    c: '09893',
                    d: '广东宏大集团',
                    e: '13',
                    f: '13',
                    g: '13',
                    h: '13',
                    i: '13',
                },
                {
                    a: '2',
                    b: '09893',
                    c: '09893',
                    d: '广东红十字会集团',
                    e: '13',
                    f: '13',
                    g: '13',
                    h: '13',
                    i: '13',
                },
                {
                    a: '3',
                    b: '09893',
                    c: '09893',
                    d: '广东宏大集团',
                    e: '13',
                    f: '13',
                    g: '13',
                    h: '13',
                    i: '13',
                },
                {
                    a: '4',
                    b: '09893',
                    c: '09893',
                    d: '广东红十字会集团',
                    e: '13',
                    f: '13',
                    g: '13',
                    h: '13',
                    i: '13',
                },
                {
                    a: '5',
                    b: '09893',
                    c: '09893',
                    d: '广东宏大集团',
                    e: '13',
                    f: '13',
                    g: '13',
                    h: '13',
                    i: '13',
                },
            ],
            total: 0,
            requestPar: {
                current: 1,
                pageSize: 10,
                keyWord: '',
                startTime: '',
                endTime: '',
                sortType: 2,
            },
        }
    }

    componentDidMount() {}

    render() {
        return (
            <TabsViewContent
                crumb={[
                    {name: '云服务中心'},
                    {name: "云服务中心数据统计"}
                ]}
                backgroundColor={'#ececec'}
            >
                {this.makeDayView()}
                {this.makeTabView()}
                {this.makeQDView()}
                {this.makeTableView()}
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
                    <div style={{fontSize: 18}}>当日新增云服务实例
                        <Tooltip placement="top" title="当日新增云服务实例...">
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
                    }}>{NumberFormat.thousandBit(60, 0)}</p>
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
                        <Col span={12}>实例总数：{NumberFormat.thousandBit(2423, 0)}</Col>
                        <Col span={12}>日均：{NumberFormat.thousandBit(23, 0)}</Col>
                    </Row>
                </div>
                <div style={{...styles.cDiv}}>
                    <div style={{fontSize: 18}}>实例激活数
                        <Tooltip placement="top" title="实例激活数...">
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
                        <Col span={12}>实例总数：{NumberFormat.thousandBit(2423, 0)}</Col>
                        <Col span={12}>激活率：{NumberFormat.thousandBit(60, 2)} %</Col>
                    </Row>
                </div>
                <div style={{...styles.cDiv}}>
                    <div style={{fontSize: 18}}>当月新增云服务数
                        <Tooltip placement="top" title="当月新增云服务数...">
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
                        <Col span={12}>云服务总数：{NumberFormat.thousandBit(2423, 0)}</Col>
                        <Col span={12}>月均：{NumberFormat.thousandBit(60, 0)}</Col>
                    </Row>
                </div>
                <div style={{...styles.cDiv}}>
                    <div style={{fontSize: 18}}>当月新增云服务规则数
                        <Tooltip placement="top" title="当月新增云服务规则数...">
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
                    }}>{NumberFormat.thousandBit(60, 0)}</p>
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
                        <Col span={12}>规则总数：{NumberFormat.thousandBit(2423, 0)}</Col>
                        <Col span={12}>月均：{NumberFormat.thousandBit(60, 0)}</Col>
                    </Row>
                </div>
            </div>

            {/*<div style={{...styles.fDiv}}>
                <div style={{...styles.cDiv}}>
                    <div style={{fontSize: 18}}>当日新增实例数
                        <Tooltip placement="top" title="当日新增实例数...">
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
                            周同比<span style={{marginLeft: 10, color: '#f00'}}><Icon type="caret-down" /> 10%</span>
                        </Col>
                        <Col span={12}>
                            日环比<span style={{marginLeft: 10, color: '#46BD4C'}}><Icon type="caret-up" /> 10%</span>
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
            </div>*/}
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
                name: '采购助手',
                amount: 11111,
            },
            {
                serial: 2,
                name: '销售助手',
                amount: 22222,
            },
            {
                serial: 3,
                name: '零售微店',
                amount: 33333,
            },
            {
                serial: 4,
                name: '采购助手',
                amount: 44444,
            },
            {
                serial: 5,
                name: '采购助手',
                amount: 55555,
            },
            {
                serial: 6,
                name: '采购助手',
                amount: 66666,
            },
            {
                serial: 7,
                name: '采购助手',
                amount: 77777,
            },
        ];
        const data02 = [
            {
                serial: 1,
                name: '商沃科技',
                amount: 323234,
            },
            {
                serial: 2,
                name: '商沃科技',
                amount: 323234,
            },
            {
                serial: 3,
                name: '商沃科技',
                amount: 323234,
            },
            {
                serial: 4,
                name: '商沃科技',
                amount: 323234,
            },
            {
                serial: 5,
                name: '商沃科技',
                amount: 323234,
            },
            {
                serial: 6,
                name: '商沃科技',
                amount: 66666,
            },
            {
                serial: 7,
                name: '商沃科技',
                amount: 77777,
            },
        ];
        return <Tabs style={{backgroundColor: '#fff', padding: 10, borderRadius: 6, position: 'relative'}} defaultActiveKey="1" onChange={(key) => {
            switch (key + '') {
                case '1':
                    setTimeout(() => {
                        // this.makeZHCanvas();
                    }, 100);
                    break;

                case '2':
                    setTimeout(() => {
                        // this.makeNewAddCanvas();
                    }, 100);
                    break;

                default:
                    break;
            }
        }}>
            <TabPane tab="云服务实例" key="1">
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
                        <h2 style={{paddingLeft: 20}}>云服务实例趋势</h2>
                        <StrengthCanvas/>
                    </div>
                    <div style={{width: 400, paddingLeft: 15}}>
                        <h2 style={{overflow: 'hidden'}}>云服务排名
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

            <TabPane tab="云服务数" key="2">
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
                        <h2 style={{paddingLeft: 20}}>云服务数量</h2>
                        <AmountCanvas/>
                    </div>
                    <div style={{width: 400, paddingLeft: 15}}>
                        <h2>开发者排名</h2>
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
        return <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            marginTop: 15
        }}>
            <div style={{width: '49%'}}>
                <Card title="云服务分类占比" bordered={false} bodyStyle={{padding: 10}}>
                    <h3>云服务</h3>
                    {/*<Radio.Group defaultValue={'1'}>*/}
                        {/*<Radio.Button value="1">全部渠道</Radio.Button>*/}
                        {/*<Radio.Button value="2">线上</Radio.Button>*/}
                        {/*<Radio.Button value="3">线下</Radio.Button>*/}
                    {/*</Radio.Group>*/}
                    <ClassifyCanvas/>
                </Card>
            </div>
            <div style={{width: '49%'}}>
                <Card title="云服务实例占比" bordered={false} bodyStyle={{padding: 10}}>
                    <h3>云服务实例</h3>
                    {/*<Radio.Group defaultValue={'1'}>
                        <Radio.Button value="1">全部渠道</Radio.Button>
                        <Radio.Button value="2">线上</Radio.Button>
                        <Radio.Button value="3">线下</Radio.Button>
                    </Radio.Group>*/}
                    {/*<div id={'SLCanvas'}></div>*/}
                    <ExampleCanvas/>
                </Card>
            </div>

        </div>
    }

    makeTableView(){
        let {list, requestPar} = this.state;
        const searchDatas = [
            {key: 'keyWord', type: 'Input', value: '', placeholder: '可查询ID、名称', label: '关键字', maxLength: 30},
            // {key: 'time', type:'RangePicker', value:'', placeholder: ['开始时间', '结束时间'], label: '时间',},
            // {
            //     key: 'a', type: 'Select', value: '', placeholder: '请选择平台', label: '平台',
            //     list: [
            //         {value: '', name: '全部'},
            //         {value: 1, name: 'APP'},
            //         {value: 2, name: 'WEB'},
            //         {value: 3, name: 'PC'},
            //         {value: 4, name: '终端'},
            //     ],
            // },
            // {
            //     key: 'b', type: 'Select', value: '', placeholder: '请选择类型', label: '类型',
            //     list: [
            //         {value: '', name: '全部'},
            //         {value: 1, name: '登录'},
            //         {value: 2, name: '登出（主动）'},
            //         {value: 3, name: '登出（被动）'},
            //     ],
            // },
        ];
        const columns = [
            {
                title: '排名',
                key: 'a',
                dataIndex: 'a',
            },
            {
                title: '用户ID',
                key: 'b',
                dataIndex: 'b'
            },
            {
                title: '所有权用户名称',
                key: 'd',
                dataIndex: 'd',
            },
            {
                title: '云服务实例数',
                key: 'c',
                dataIndex: 'c',
            },
            {
                title: '实例激活数',
                key: 'e',
                dataIndex: 'e',
            },
            {
                title: '使用权用户数',
                key: 'f',
                dataIndex: 'f',
            },
        ];

        return <div style={{
            background: '#fff',
            marginTop: 15,
            padding: 5,
        }}>
            <HeadSearch data={searchDatas} form={this.props.form} callBack={(obj) => {
                obj.startTime = obj.time [0] || '';
                obj.endTime = obj.time [1] || '';
                obj.current = 1;

                delete obj.time;
                this.setState({
                    requestPar: {
                        ...this.state.requestPar,
                        ...obj
                    }
                }, () => {this.getList();});
            }}/>
            <div style={{marginTop: 15}}/>
            <SWTable
                columns={columns}
                dataSource={list}
                pagination={
                    {
                        total: this.state.total,
                        current: requestPar.current,
                        pageSize: requestPar.pageSize,
                        onChange: (a, b) => {
                            let obj = this.state.requestPar;
                            obj.current = a;
                            this.setState({requestPar: obj}, () => {
                                this.getList();
                            })
                        },
                        showTotal: (total, range) => `共有${total}条`
                    }
                }
            />
        </div>
    }

}
export default CloudServeStatistics
