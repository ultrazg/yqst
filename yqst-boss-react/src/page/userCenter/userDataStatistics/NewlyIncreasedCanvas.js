import React, {Component} from 'react';
import moment from "moment";
import {DatePicker} from "antd";
import EChartsReact from "echarts-for-react";

const {MonthPicker, RangePicker} = DatePicker;

class NewlyIncreasedCanvas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                grid: {
                    top: 50,
                    left: 50,
                    right: 50,
                    bottom: 50
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
            },
            newData: {
                grid: {
                    top: 50,
                    left: 50,
                    right: 50,
                    bottom: 50
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
                        data: [150, 230, 224, 218, 135, 147, 260],
                        type: 'line'
                    }
                ]
            }
        }
    }

    render() {
        const styles = {
            span: {
                padding: '5px 10px',
                display: 'inline-block',
                cursor: 'pointer',
            },
            onSpan: {
                color: '#20a5c7',
            }
        };
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
        let newData = [
            {
                month: '1月',
                value: 8
            }, {
                month: '2月',
                value: 12
            }, {
                month: '3月',
                value: 25
            }, {
                month: '4月',
                value: 45
            }, {
                month: '5月',
                value: 50
            }, {
                month: '6月',
                value: 55
            }, {
                month: '7月',
                value: 65
            }
        ];
        return <div>
            <div style={{
                position: 'absolute',
                right: 0,
                top: 0,
                zIndex: 1,
            }}>
                <span style={{...styles.span, ...styles.onSpan}}>今日</span>
                <span style={{...styles.span}}>本周</span>
                <span style={{...styles.span}}>本月</span>
                <span style={{...styles.span}}>本年</span>
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
                    <h2 style={{paddingLeft: 20}}>新增统计</h2>
                    {/*<Chart height={360} interactions={['active-region']} autoFit data={data} padding={[10, 30, 30, 30]}>*/}
                    {/*    <Interval position="month*value"  />*/}
                    {/*    <Tooltip shared/>*/}
                    {/*</Chart>*/}
                    <EChartsReact
                        style={{
                            height: '360px'
                        }} a
                        option={this.state.data}
                    />
                </div>
            </div>

            <div style={{
                display: 'flex',
                overflow: 'hidden',
                height: 400
            }}>
                <div style={{flexGrow: 1}}>
                    <h2 style={{paddingLeft: 20}}>数量趋势</h2>
                    <EChartsReact
                        style={{
                            height: '360px'
                        }}
                        option={this.state.newData}
                    />
                    {/*<Chart*/}
                    {/*    padding={[10, 20, 50, 40]}*/}
                    {/*    autoFit*/}
                    {/*    height={360}*/}
                    {/*    data={newData}*/}
                    {/*    scale={{ value: { min: 0 } }}*/}
                    {/*>*/}
                    {/*    <Line position="month*value" />*/}
                    {/*    <Point position="month*value" />*/}
                    {/*    <Tooltip showCrosshairs />*/}
                    {/*</Chart>*/}
                </div>
            </div>
        </div>
    }
}

export default NewlyIncreasedCanvas
