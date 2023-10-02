import React, {Component} from 'react';
import {DatePicker} from 'antd';
import Echarts from "echarts-for-react";

class TaxBrokenLineCanvas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    "month": "10月",
                    "city": "商户账户数",
                    "temperature": 480
                }, {
                    "month": "10月",
                    "city": "绑定数",
                    "temperature": 1
                }, {
                    "month": "11月",
                    "city": "商户账户数",
                    "temperature": 490
                }, {
                    "month": "11月",
                    "city": "绑定数",
                    "temperature": 120
                }, {
                    "month": "12月",
                    "city": "商户账户数",
                    "temperature": 330
                }, {
                    "month": "12月",
                    "city": "绑定数",
                    "temperature": 180
                }, {
                    "month": "01月",
                    "city": "商户账户数",
                    "temperature": 550
                }, {
                    "month": "01月",
                    "city": "绑定数",
                    "temperature": 260
                }, {
                    "month": "02月",
                    "city": "商户账户数",
                    "temperature": 500
                }, {
                    "month": "02月",
                    "city": "绑定数",
                    "temperature": 265
                }, {
                    "month": "03月",
                    "city": "商户账户数",
                    "temperature": 890
                }, {
                    "month": "03月",
                    "city": "绑定数",
                    "temperature": 500
                }, {
                    "month": "04月",
                    "city": "商户账户数",
                    "temperature": 460
                }, {
                    "month": "04月",
                    "city": "绑定数",
                    "temperature": 250
                }, {
                    "month": "05月",
                    "city": "商户账户数",
                    "temperature": 470
                }, {
                    "month": "05月",
                    "city": "绑定数",
                    "temperature": 240
                }, {
                    "month": "06月",
                    "city": "商户账户数",
                    "temperature": 180
                }, {
                    "month": "06月",
                    "city": "绑定数",
                    "temperature": 180
                }, {
                    "month": "07月",
                    "city": "商户账户数",
                    "temperature": 720
                }, {
                    "month": "07月",
                    "city": "绑定数",
                    "temperature": 250
                }, {
                    "month": "08月",
                    "city": "商户账户数",
                    "temperature": 460
                }, {
                    "month": "08月",
                    "city": "绑定数",
                    "temperature": 190
                }, {
                    "month": "09月",
                    "city": "商户账户数",
                    "temperature": 430
                }, {
                    "month": "09月",
                    "city": "绑定数",
                    "temperature": 310
                }
            ],
            options: {}
        }
    }

    componentDidMount() {
        this.setState({
            options:
                {
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['商户账户数', '绑定数']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '商户账户数',
                            type: 'line',
                            stack: 'Total',
                            data: [120, 132, 101, 134, 90, 230, 210, 500, 490]
                        },
                        {
                            name: '绑定数',
                            type: 'line',
                            stack: 'Total',
                            data: [220, 182, 191, 234, 290, 330, 310, 400, 450]
                        }
                    ]
                }
        });
    }

    render() {
        // const {data} = this.state;
        // const scale = {
        //     temperature: { min: 0 },
        //     // city: {
        //     //     formatter: v => {
        //     //         return {
        //     //             London: '伦敦',
        //     //             Tokyo: '东京'
        //     //         }[v]
        //     //     }
        //     // }
        // };

        return <>
            {/*<Chart scale={scale} padding={[30, 20, 60, 60]} autoFit height={360} data={data} interactions={['element-active']}>*/}
            {/*    <Point position="month*temperature" color="city" shape='circle' />*/}
            {/*    <Line shape="smooth" position="month*temperature" color="city" label="temperature" />*/}
            {/*    <Tooltip shared showCrosshairs />*/}
            {/*</Chart>*/}
            <Echarts
                style={{
                    height: 360
                }}
                option={this.state.options}
                lazyUpdate={true}
            />
        </>
    }
}

export default TaxBrokenLineCanvas
