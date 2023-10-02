import React, {Component} from 'react';
import moment from 'moment';
import {DatePicker} from 'antd';
import Echarts from 'echarts-for-react';

const {MonthPicker, RangePicker} = DatePicker;

class HistogramCanvas extends Component {
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
                        ['product', '提交数', '通过数', '不通过数'],
                        ['1月', 43.3, 85.8, 93.7],
                        ['2月', 83.1, 73.4, 55.1],
                        ['3月', 86.4, 65.2, 82.5],
                        ['4月', 72.4, 53.9, 31.1],
                        ['5月', 72.4, 53.9, 39.1],
                        ['6月', 22.4, 23.9, 19.1],
                        ['7月', 72.4, 83.9, 32.1],
                        ['8月', 82.4, 53.9, 29.1],
                    ]
                },
                xAxis: {type: 'category'},
                yAxis: {},
                series: [{type: 'bar'}, {type: 'bar'}, {type: 'bar'}]
            },
            // data: [
            //     {
            //         月份: "1月",
            //         type: "提交数",
            //         数量: 31,
            //     },{
            //         月份: "1月",
            //         type: "通过数",
            //         数量: 76,
            //     },{
            //         月份: "1月",
            //         type: "不通过数",
            //         数量: 50,
            //     },{
            //         月份: "2月",
            //         type: "提交数",
            //         数量: 73,
            //     },{
            //         月份: "2月",
            //         type: "通过数",
            //         数量: 60,
            //     },{
            //         月份: "2月",
            //         type: "不通过数",
            //         数量: 42,
            //     },{
            //         月份: "3月",
            //         type: "提交数",
            //         数量: 38,
            //     },{
            //         月份: "3月",
            //         type: "通过数",
            //         数量: 65,
            //     },{
            //         月份: "3月",
            //         type: "不通过数",
            //         数量: 61,
            //     },{
            //         月份: "4月",
            //         type: "提交数",
            //         数量: 57,
            //     },{
            //         月份: "4月",
            //         type: "通过数",
            //         数量: 55,
            //     },{
            //         月份: "4月",
            //         type: "不通过数",
            //         数量: 46,
            //     },{
            //         月份: "5月",
            //         type: "提交数",
            //         数量: 29,
            //     },{
            //         月份: "5月",
            //         type: "通过数",
            //         数量: 75,
            //     },{
            //         月份: "5月",
            //         type: "不通过数",
            //         数量: 51,
            //     },{
            //         月份: "6月",
            //         type: "提交数",
            //         数量: 70,
            //     },{
            //         月份: "6月",
            //         type: "通过数",
            //         数量: 68,
            //     },{
            //         月份: "6月",
            //         type: "不通过数",
            //         数量: 51,
            //     },{
            //         月份: "7月",
            //         type: "提交数",
            //         数量: 21,
            //     },{
            //         月份: "7月",
            //         type: "通过数",
            //         数量: 53,
            //     },{
            //         月份: "7月",
            //         type: "不通过数",
            //         数量: 33,
            //     }
            // ],
        }
    }

    render() {
        const {data} = this.state;
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
        return <>
            <div style={{
                position: 'absolute',
                right: 0,
                top: -56,
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
                    <h2 style={{paddingLeft: 20}}>用户认证情况</h2>
                    {/*<Chart height={360} padding={[10, 10, 50, 50]} data={data} autoFit>*/}
                    {/*    <Interval*/}
                    {/*        adjust={[*/}
                    {/*            {*/}
                    {/*                type: 'dodge',*/}
                    {/*                marginRatio: 0,*/}
                    {/*            },*/}
                    {/*        ]}*/}
                    {/*        color="type"*/}
                    {/*        position="月份*数量"*/}
                    {/*    />*/}
                    {/*    <Tooltip shared/>*/}
                    {/*    <Interaction type="active-region" />*/}
                    {/*</Chart>*/}
                    <Echarts
                        style={{
                            height: '360px'
                        }}
                        option={this.state.baseOption}
                        lazyUpdate={true}
                    />
                </div>
            </div>
        </>
    }
}

export default HistogramCanvas
