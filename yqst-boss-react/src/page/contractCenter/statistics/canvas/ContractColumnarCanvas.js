import React, {Component} from 'react';
// import moment from 'moment';
import {DatePicker} from 'antd';
import Echarts from "echarts-for-react";

const { MonthPicker, RangePicker } = DatePicker;

class ContractColumnarCanvas extends Component{
    constructor(props) {
        super(props);
        this.state = {
            baseOption: {
                legend: {},
                tooltip: {
                    show:true,
                    trigger: 'axis',
                },
                dataset: {
                    source: [
                        ['product', '待签', '履行', '被拒绝'],
                        ['12-01', 43, 85, 93],
                        ['12-02', 83, 73, 55],
                        ['12-03', 86, 65, 82],
                        ['12-04', 72, 53, 31],
                        ['12-05', 72, 53, 39],
                        ['12-06', 22, 23, 19],
                        ['12-07', 72, 83, 32],
                        ['12-08', 82, 53, 29],
                    ]
                },
                xAxis: {type: 'category'},
                yAxis: {},
                series: [{type: 'bar'}, {type: 'bar'}, {type: 'bar'}]
            },
            // data: [
            //     {
            //         "月份": "12-01",
            //         "type": "待签",
            //         "金额": 31
            //     },{
            //         "月份": "12-01",
            //         "type": "履行",
            //         "金额": 76
            //     },{
            //         "月份": "12-01",
            //         "type": "被拒绝",
            //         "金额": 50
            //     },{
            //         "月份": "12-02",
            //         "type": "待签",
            //         "金额": 73
            //     },{
            //         "月份": "12-02",
            //         "type": "履行",
            //         "金额": 60
            //     },{
            //         "月份": "12-02",
            //         "type": "被拒绝",
            //         "金额": 42
            //     },{
            //         "月份": "12-03",
            //         "type": "待签",
            //         "金额": 38
            //     },{
            //         "月份": "12-03",
            //         "type": "履行",
            //         "金额": 65
            //     },{
            //         "月份": "12-03",
            //         "type": "被拒绝",
            //         "金额": 61
            //     },{
            //         "月份": "12-04",
            //         "type": "待签",
            //         "金额": 57
            //     },{
            //         "月份": "12-04",
            //         "type": "履行",
            //         "金额": 55
            //     },{
            //         "月份": "12-04",
            //         "type": "被拒绝",
            //         "金额": 46
            //     },{
            //         "月份": "12-05",
            //         "type": "待签",
            //         "金额": 29
            //     },{
            //         "月份": "12-05",
            //         "type": "履行",
            //         "金额": 75
            //     },{
            //         "月份": "12-05",
            //         "type": "被拒绝",
            //         "金额": 51
            //     },{
            //         "月份": "12-06",
            //         "type": "待签",
            //         "金额": 70
            //     },{
            //         "月份": "12-06",
            //         "type": "履行",
            //         "金额": 68
            //     },{
            //         "月份": "12-06",
            //         "type": "被拒绝",
            //         "金额": 51
            //     },{
            //         "月份": "12-07",
            //         "type": "待签",
            //         "金额": 21
            //     },{
            //         "月份": "12-07",
            //         "type": "履行",
            //         "金额": 53
            //     },{
            //         "月份": "12-07",
            //         "type": "被拒绝",
            //         "金额": 33
            //     }
            // ],
        }
    }

    render(){
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
            {/*    <Tooltip shared />*/}
            {/*</Chart>*/}
            <Echarts
                style={{
                    height: '360px'
                }}
                option={this.state.baseOption}
                lazyUpdate={true}
            />
        </>
    }
}

export default ContractColumnarCanvas
