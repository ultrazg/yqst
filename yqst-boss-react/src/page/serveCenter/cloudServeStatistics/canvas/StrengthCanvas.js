import React, {Component} from 'react';
import EChartsReact from "echarts-for-react";

class StrengthCanvas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            baseOption: {
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['实例数', '激活数']
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
                    data: ['10月', '11月', '12月', '1月', '2月', '3月', '4月']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: '实例数',
                        type: 'line',
                        stack: 'Total',
                        data: [120, 132, 101, 134, 90, 230, 210],
                        smooth: true
                    },
                    {
                        name: '激活数',
                        type: 'line',
                        stack: 'Total',
                        data: [220, 182, 191, 234, 290, 330, 310],
                        smooth: true
                    }
                ]
            }
        }
    }

    render() {
        let data = [
            {
                "month": "10月",
                "city": "实例数",
                "temperature": 480
            }, {
                "month": "10月",
                "city": "激活数",
                "temperature": 1
            }, {
                "month": "11月",
                "city": "实例数",
                "temperature": 490
            }, {
                "month": "11月",
                "city": "激活数",
                "temperature": 120
            }, {
                "month": "12月",
                "city": "实例数",
                "temperature": 330
            }, {
                "month": "12月",
                "city": "激活数",
                "temperature": 180
            }, {
                "month": "01月",
                "city": "实例数",
                "temperature": 550
            }, {
                "month": "01月",
                "city": "激活数",
                "temperature": 260
            }, {
                "month": "02月",
                "city": "实例数",
                "temperature": 500
            }, {
                "month": "02月",
                "city": "激活数",
                "temperature": 265
            }, {
                "month": "03月",
                "city": "实例数",
                "temperature": 890
            }, {
                "month": "03月",
                "city": "激活数",
                "temperature": 500
            }, {
                "month": "04月",
                "city": "实例数",
                "temperature": 460
            }, {
                "month": "04月",
                "city": "激活数",
                "temperature": 250
            }, {
                "month": "05月",
                "city": "实例数",
                "temperature": 470
            }, {
                "month": "05月",
                "city": "激活数",
                "temperature": 240
            }, {
                "month": "06月",
                "city": "实例数",
                "temperature": 180
            }, {
                "month": "06月",
                "city": "激活数",
                "temperature": 180
            }, {
                "month": "07月",
                "city": "实例数",
                "temperature": 720
            }, {
                "month": "07月",
                "city": "激活数",
                "temperature": 250
            }, {
                "month": "08月",
                "city": "实例数",
                "temperature": 460
            }, {
                "month": "08月",
                "city": "激活数",
                "temperature": 190
            }, {
                "month": "09月",
                "city": "实例数",
                "temperature": 430
            }, {
                "month": "09月",
                "city": "激活数",
                "temperature": 310
            }
        ];
        return <EChartsReact
            style={{
                height: '360px'
            }}
            option={this.state.baseOption}
        />
        // return <Chart scale={{ temperature: { min: 0 } }} padding={[10, 20, 60, 60]} autoFit height={360} data={data} >
        //     <Line shape="smooth" position="month*temperature" color="city" />
        //     <Point position="month*temperature" color="city" />
        //     <Tooltip shared={true} showCrosshairs/>
        //     <Legend itemName={{
        //         style: {
        //             fill: "#333"
        //         }
        //     }} />
        // </Chart>
    }
}

export default StrengthCanvas
