/**
 * Created by yb on 2019/10/24
 */

import React from 'react';
import {Button, Form, message, Row, Col, DatePicker, Tabs, List, Tooltip, Card, Radio} from 'antd';
import {InfoCircleOutlined, CaretDownOutlined, CaretUpOutlined} from '@ant-design/icons';
import moment from 'moment';
import {Link} from "react-router-dom";
import SWTable from 'SWViews/table';
import TabsViewContent from "../../../baseview/tabsViewContent/TabsViewContent";
import NumberFormat from "../../../utils/numberformat/NumberFormat";
import HeadSearch from "../../../baseview/headSearch/HeadSearch";
import NewlyIncreasedCanvas from "./NewlyIncreasedCanvas";

const { MonthPicker, RangePicker } = DatePicker;
const { TabPane } = Tabs;

class UserDataStatistics extends React.Component {
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
            activeKey: 1,
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
                    {name: '用户中心'},
                    {name: "用户数据统计"}
                ]}
                // backgroundColor={'#ececec'}
            >
                {this.makeDayView()}
                {this.makeTabView()}
                {this.makeTableView()}
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
                padding: 10,
            },
        };
        return <div style={{
            borderBottom: '1px solid #efefef',
            marginBottom: 15
        }}>
            <div style={{...styles.fDiv}}>
                <div style={{...styles.cDiv}}>
                    <div style={{fontSize: 18}}>当日新增个人用户数
                        <Tooltip placement="top" title="当日新增个人用户数...">
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
                    }}>{NumberFormat.thousandBit(16000 || 0, 0)}</p>
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
                    <div>个人用户总数：{NumberFormat.thousandBit(12423, 0)}</div>
                    <div>日均：60</div>
                </div>
                <div style={{...styles.cDiv}}>
                    <div style={{fontSize: 18}}>当日新增企业用户数
                        <Tooltip placement="top" title="当日新增企业用户数...">
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
                    }}>{NumberFormat.thousandBit(10000, 0)}</p>
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
                    <div>企业用户总数：{NumberFormat.thousandBit(12423, 0)}</div>
                    <div>日均：23</div>
                </div>
                <div style={{...styles.cDiv}}>
                    <div style={{fontSize: 18}}>当日活跃个人用户数
                        <Tooltip placement="top" title="当日活跃个人用户数...">
                            <InfoCircleOutlined style={{
                                float: 'right',
                                marginTop: 3,
                                cursor: 'pointer',
                            }} />
                        </Tooltip>
                    </div>
                    <p style={{
                        fontSize: 30,
                        fontWeight: 600,
                    }}>{NumberFormat.thousandBit(99999,0)}</p>
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
                    <div>活跃率：60 %</div>
                </div>
                <div style={{...styles.cDiv}}>
                    <div style={{fontSize: 18}}>当日活跃企业用户数
                        <Tooltip placement="top" title="当日活跃企业用户数...">
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
                    <div>活跃率：60 %</div>
                </div>
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
        return <Tabs
            activeKey={this.state.activeKey + ''}
            onChange={(key) => {
                this.setState({activeKey: key});
            }}
            style={{position: 'relative'}}
        >
            <TabPane tab="个人用户" key="1">
                <NewlyIncreasedCanvas/>
            </TabPane>

            <TabPane tab="企业用户" key="2">
                <NewlyIncreasedCanvas/>
            </TabPane>

            <TabPane tab="活跃用户" key="3">
                <NewlyIncreasedCanvas/>
            </TabPane>
        </Tabs>
    }

    makeTableView(){
        let {list, requestPar} = this.state;
        const searchDatas = [
            {key: 'keyWord', type: 'Input', value: '', placeholder: '可查询ID、企业号、企业名称', label: '关键字', maxLength: 30},
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
                title: '企业ID',
                key: 'b',
                dataIndex: 'b'
            },
            {
                title: '企业号',
                key: 'c',
                dataIndex: 'c',
            },
            {
                title: '企业名称',
                key: 'd',
                dataIndex: 'd',
            },
            {
                title: '登录次数',
                key: 'e',
                dataIndex: 'e',
            },
            {
                title: '员工人数',
                key: 'f',
                dataIndex: 'f',
            },
            {
                title: '部门数',
                key: 'g',
                dataIndex: 'g',
            },
            {
                title: '当日员工登录数',
                key: 'h',
                dataIndex: 'h',
            },
            {
                title: '活跃率(%)',
                key: 'i',
                dataIndex: 'i',
            },
        ];

        return <div style={{
            borderTop: '1px solid #efefef',
        }}>
            <HeadSearch data={searchDatas} form={this.props.form} callBack={(obj) => {
                // obj.startTime = obj.time [0] || '';
                // obj.endTime = obj.time [1] || '';
                // obj.current = 1;
                //
                // delete obj.time;
                // this.setState({
                //     requestPar: {
                //         ...this.state.requestPar,
                //         ...obj
                //     }
                // }, () => {this.getList();});
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
export default UserDataStatistics
