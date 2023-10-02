import React, {Component} from 'react';
import Echarts from 'echarts-for-react';

class TaxColumnarCanvas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    "月份": "10月",
                    "type": "蓝字发票",
                    "金额": 240
                }, {
                    "月份": "10月",
                    "type": "红冲发票",
                    "金额": 710
                }, {
                    "月份": "11月",
                    "type": "蓝字发票",
                    "金额": 530
                }, {
                    "月份": "11月",
                    "type": "红冲发票",
                    "金额": 310
                }, {
                    "月份": "12月",
                    "type": "蓝字发票",
                    "金额": 270
                }, {
                    "月份": "12月",
                    "type": "红冲发票",
                    "金额": 660
                }, {
                    "月份": "01月",
                    "type": "蓝字发票",
                    "金额": 550
                }, {
                    "月份": "01月",
                    "type": "红冲发票",
                    "金额": 510
                }, {
                    "月份": "02月",
                    "type": "蓝字发票",
                    "金额": 560
                }, {
                    "月份": "02月",
                    "type": "红冲发票",
                    "金额": 520
                }, {
                    "月份": "03月",
                    "type": "蓝字发票",
                    "金额": 240
                }, {
                    "月份": "03月",
                    "type": "红冲发票",
                    "金额": 730
                }, {
                    "月份": "04月",
                    "type": "蓝字发票",
                    "金额": 510
                }, {
                    "月份": "04月",
                    "type": "红冲发票",
                    "金额": 350
                }, {
                    "月份": "05月",
                    "type": "蓝字发票",
                    "金额": 210
                }, {
                    "月份": "05月",
                    "type": "红冲发票",
                    "金额": 680
                }, {
                    "月份": "06月",
                    "type": "蓝字发票",
                    "金额": 180
                }, {
                    "月份": "06月",
                    "type": "红冲发票",
                    "金额": 640
                }, {
                    "月份": "07月",
                    "type": "蓝字发票",
                    "金额": 190
                }, {
                    "月份": "07月",
                    "type": "红冲发票",
                    "金额": 650
                }, {
                    "月份": "08月",
                    "type": "蓝字发票",
                    "金额": 200
                }, {
                    "月份": "08月",
                    "type": "红冲发票",
                    "金额": 660
                }, {
                    "月份": "09月",
                    "type": "蓝字发票",
                    "金额": 200
                }, {
                    "月份": "09月",
                    "type": "红冲发票",
                    "金额": 670
                }
            ],
            options: {}
        }
    }

    componentDidMount() {
        this.setState({
            options: {
                legend: {},
                tooltip: {},
                dataset: {
                    source: [
                        ['type', '红冲', '蓝字发票'],
                        ['1月', 73.9, 19.1],
                        ['2月', 63.9, 89.1],
                        ['3月', 13.9, 99.1],
                        ['4月', 53.9, 89.1],
                        ['5月', 23.9, 99.1],
                        ['6月', 23.9, 69.1],
                        ['7月', 43.9, 69.1],
                        ['8月', 43.9, 39.1],
                        ['9月', 53.9, 39.1],
                        ['10月', 83.1, 73.4],
                        ['10月', 86.4, 65.2],
                        ['11月', 72.4, 53.9],
                        ['12月', 72.4, 53.9, 39.1]
                    ]
                },
                xAxis: {
                    type: 'category'
                }
                ,
                yAxis: {}
                ,
                series: [{type: 'bar'}, {type: 'bar'}]
            }
        })
    }

    render() {
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
                    height: 360
                }}
                option={this.state.options}
                lazyUpdate={true}
            />
        </>
    }
}

export default TaxColumnarCanvas
