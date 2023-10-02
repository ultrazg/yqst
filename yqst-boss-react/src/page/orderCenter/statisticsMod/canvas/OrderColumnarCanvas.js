import React, {Component} from 'react';
import moment from 'moment';
import {DatePicker} from 'antd';
import EChartsReact from "echarts-for-react";

const {MonthPicker, RangePicker} = DatePicker;

class OrderColumnarCanvas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            baseOption: {
                grid: {
                    left: 50,
                    top: 50,
                    right: 50,
                    bottom: 50
                },
                tooltip: {
                    show: true,
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    data: ['10月', '11月', '12月', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: [310, 780, 980, 560, 102, 550, 260, 330, 780, 510, 250, 410],
                        type: 'bar'
                    }
                ]
            },
            // data: [
            //     {
            //         month: '10月',
            //         value: 310
            //     }, {
            //         month: '11月',
            //         value: 780
            //     }, {
            //         month: '12月',
            //         value: 980
            //     }, {
            //         month: '1月',
            //         value: 560
            //     }, {
            //         month: '2月',
            //         value: 102
            //     }, {
            //         month: '3月',
            //         value: 550
            //     }, {
            //         month: '4月',
            //         value: 260
            //     }, {
            //         month: '5月',
            //         value: 330
            //     }, {
            //         month: '6月',
            //         value: 780
            //     }, {
            //         month: '7月',
            //         value: 510
            //     }, {
            //         month: '8月',
            //         value: 250
            //     }, {
            //         month: '9月',
            //         value: 410
            //     }
            // ],
        }
    }

    render() {
        const {data} = this.state;
        return <>
            {/*<Chart height={350} padding={[10, 10, 30, 50]} autoFit data={data}*/}
            {/*       scale={{value: {alias: this.props.alias || '金额'}}}>*/}
            {/*    <Interval position="month*value"/>*/}
            {/*</Chart>*/}
            <EChartsReact
                style={{
                    height: '350px'
                }}
                option={this.state.baseOption}
            />
        </>
    }
}

export default OrderColumnarCanvas
