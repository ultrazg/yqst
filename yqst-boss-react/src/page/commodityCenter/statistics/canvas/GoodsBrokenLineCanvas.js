import React, {Component} from 'react';
import moment from 'moment';
import {Col, DatePicker, Row} from 'antd';
import EChartsReact from "echarts-for-react";

const { MonthPicker, RangePicker } = DatePicker;

class GoodsBrokenLineCanvas extends Component{
    constructor(props) {
        super(props);
        this.state = {
            baseOption:{
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['商品总数', '新增商品']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['1.1', '1.2', '1.3', '1.4', '1.5', '1.6', '1.7', '1.8']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: '商品总数',
                        type: 'line',
                        data: [12, 13, 10, 14, 9, 23, 21, 25],
                        smooth: true
                    },
                    {
                        name: '新增商品',
                        type: 'line',
                        data: [22, 18, 19, 23, 29, 30, 31, 28],
                        smooth: true
                    }
                ]
            },
            data: [
                {
                    "month": "1.1",
                    "city": "商品总数",
                    "temperature": 31
                }, {
                    "month": "1.1",
                    "city": "新增商品",
                    "temperature": 9
                },{
                    "month": "1.2",
                    "city": "商品总数",
                    "temperature": 32
                }, {
                    "month": "1.2",
                    "city": "新增商品",
                    "temperature": 12
                },{
                    "month": "1.3",
                    "city": "商品总数",
                    "temperature": 25
                }, {
                    "month": "1.3",
                    "city": "新增商品",
                    "temperature": 15
                },{
                    "month": "1.4",
                    "city": "商品总数",
                    "temperature": 35
                }, {
                    "month": "1.4",
                    "city": "新增商品",
                    "temperature": 21
                },{
                    "month": "1.5",
                    "city": "商品总数",
                    "temperature": 33
                }, {
                    "month": "1.5",
                    "city": "新增商品",
                    "temperature": 18
                },{
                    "month": "1.6",
                    "city": "商品总数",
                    "temperature": 60
                }, {
                    "month": "1.6",
                    "city": "新增商品",
                    "temperature": 45
                },{
                    "month": "1.7",
                    "city": "商品总数",
                    "temperature": 36
                }, {
                    "month": "1.7",
                    "city": "新增商品",
                    "temperature": 26
                },{
                    "month": "1.8",
                    "city": "商品总数",
                    "temperature": 28
                }, {
                    "month": "1.8",
                    "city": "新增商品",
                    "temperature": 19
                }
            ],
        }
    }

    render(){
        const {data} = this.state;
        const scale = {
            temperature: { min: 0 },
            // city: {
            //     formatter: v => {
            //         return {
            //             London: '伦敦',
            //             Tokyo: '东京'
            //         }[v]
            //     }
            // }
        };
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
        return <>
            <div style={{marginBottom: 15}}>
                <Row>
                    <Col span={6}>
                        <span style={{fontSize: 20, marginRight: 15}}>121</span>
                        平均日增长
                    </Col>
                    <Col span={18}>
                        <span style={{...styles.span, ...styles.onSpan}}>今日</span>
                        <span style={{...styles.span}}>本周</span>
                        <span style={{...styles.span}}>本月</span>
                        <RangePicker
                            defaultValue={[moment('2019-08/26', 'YYYY-MM-DD'), moment('2019/08/30', 'YYYY-MM-DD')]}
                            format={'YYYY-MM-DD'}
                            style={{marginLeft: 15}}
                        />
                    </Col>
                </Row>
            </div>
            {/*<Chart scale={scale} padding={[30, 10, 60, 60]} autoFit height={400} data={data} interactions={['element-active']}>*/}
            {/*    <Point position="month*temperature" color="city" shape='circle' />*/}
            {/*    <Line shape="smooth" position="month*temperature" color="city" label="temperature" />*/}
            {/*    <Tooltip shared showCrosshairs />*/}
            {/*</Chart>*/}
            <EChartsReact
                style={{
                    height:'400px'
                }}
                option={this.state.baseOption}
            />
        </>
    }
}

export default GoodsBrokenLineCanvas
