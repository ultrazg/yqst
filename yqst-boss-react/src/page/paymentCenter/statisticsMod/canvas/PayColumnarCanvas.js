import React, {Component} from 'react';
import moment from 'moment';
import {DatePicker} from 'antd';
import EChartsReact from "echarts-for-react";

const {MonthPicker, RangePicker} = DatePicker;

class PayColumnarCanvas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            baseOption: {
                grid: {
                    left: 45,
                    top: 45,
                    right: 45,
                    bottom: 45
                },
                legend: {},
                tooltip: {},
                dataset: {
                    source: [
                        ['product', '收付款', '退款'],
                        ['10月', 240, 710],
                        ['11月', 530, 310],
                        ['12月', 270, 660],
                        ['1月', 550, 510]
                    ]
                },
                xAxis: {type: 'category'},
                yAxis: {},
                series: [{type: 'bar'}, {type: 'bar'}]
            },
            data: [
                {
                    "月份": "10月",
                    "type": "收付款",
                    "金额": 240
                }, {
                    "月份": "10月",
                    "type": "退款",
                    "金额": 710
                }, {
                    "月份": "11月",
                    "type": "收付款",
                    "金额": 530
                }, {
                    "月份": "11月",
                    "type": "退款",
                    "金额": 310
                }, {
                    "月份": "12月",
                    "type": "收付款",
                    "金额": 270
                }, {
                    "月份": "12月",
                    "type": "退款",
                    "金额": 660
                }, {
                    "月份": "01月",
                    "type": "收付款",
                    "金额": 550
                }, {
                    "月份": "01月",
                    "type": "退款",
                    "金额": 510
                }, {
                    "月份": "02月",
                    "type": "收付款",
                    "金额": 560
                }, {
                    "月份": "02月",
                    "type": "退款",
                    "金额": 520
                }, {
                    "月份": "03月",
                    "type": "收付款",
                    "金额": 240
                }, {
                    "月份": "03月",
                    "type": "退款",
                    "金额": 730
                }, {
                    "月份": "04月",
                    "type": "收付款",
                    "金额": 510
                }, {
                    "月份": "04月",
                    "type": "退款",
                    "金额": 350
                }, {
                    "月份": "05月",
                    "type": "收付款",
                    "金额": 210
                }, {
                    "月份": "05月",
                    "type": "退款",
                    "金额": 680
                }, {
                    "月份": "06月",
                    "type": "收付款",
                    "金额": 180
                }, {
                    "月份": "06月",
                    "type": "退款",
                    "金额": 640
                }, {
                    "月份": "07月",
                    "type": "收付款",
                    "金额": 190
                }, {
                    "月份": "07月",
                    "type": "退款",
                    "金额": 650
                }, {
                    "月份": "08月",
                    "type": "收付款",
                    "金额": 200
                }, {
                    "月份": "08月",
                    "type": "退款",
                    "金额": 660
                }, {
                    "月份": "09月",
                    "type": "收付款",
                    "金额": 200
                }, {
                    "月份": "09月",
                    "type": "退款",
                    "金额": 670
                }
            ],
        }
    }

    render() {
        const {data} = this.state;
        return <>
            {/*<Chart height={360} padding={[10, 10, 80, 50]} data={data} autoFit>*/}
            {/*    <Interval*/}
            {/*        adjust={[*/}
            {/*            {*/}
            {/*                type: 'dodge',*/}
            {/*                marginRatio: 0,*/}
            {/*            },*/}
            {/*        ]}*/}
            {/*        color="type"*/}
            {/*        position="月份*金额"*/}
            {/*    />*/}
            {/*    <Tooltip shared/>*/}
            {/*</Chart>*/}
            <EChartsReact
                style={{
                    height: '360px'
                }}
                option={this.state.baseOption}
            />
        </>
    }
}

export default PayColumnarCanvas
