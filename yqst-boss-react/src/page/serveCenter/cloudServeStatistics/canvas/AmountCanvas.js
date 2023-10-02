import React, {Component} from 'react';
import EChartsReact from "echarts-for-react";

class AmountCanvas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            baseOption: {
                grid: {
                    top: 45,
                    left: 45,
                    right: 45,
                    bottom: 45
                },
                tooltip: {
                    show: true,
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: [120, 200, 150, 80, 70, 110, 130],
                        type: 'bar'
                    }
                ]
            }
        }
    }

    render() {
        let data = [
            {
                month: '10月',
                value: 310
            }, {
                month: '11月',
                value: 780
            }, {
                month: '12月',
                value: 980
            }, {
                month: '1月',
                value: 560
            }, {
                month: '2月',
                value: 102
            }, {
                month: '3月',
                value: 550
            }, {
                month: '4月',
                value: 260
            }, {
                month: '5月',
                value: 330
            }, {
                month: '6月',
                value: 780
            }, {
                month: '7月',
                value: 510
            }, {
                month: '8月',
                value: 250
            }, {
                month: '9月',
                value: 410
            }
        ];
        // return <Chart height={350} autoFit data={data} interactions={['active-region']} padding={[10, 10, 30, 50]} >
        //     <Interval position="month*value" />
        //     <Tooltip shared />
        // </Chart>
        return <EChartsReact
            styl={{
                height: '350px'
            }}
            option={this.state.baseOption}
        />
    }
}

export default AmountCanvas
