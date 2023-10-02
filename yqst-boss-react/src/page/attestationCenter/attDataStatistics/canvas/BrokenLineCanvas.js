import React, {Component} from 'react';
import moment from 'moment';
import {DatePicker} from 'antd';
import Echarts from 'echarts-for-react';

const { MonthPicker, RangePicker } = DatePicker;

class BrokenLineCanvas extends Component{
    constructor(props) {
        super(props);
        this.state = {
            baseOption:{
                tooltip:{
                    show:true,
                    trigger:'axis'
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
                        data: [8, 12, 25, 45, 50, 55, 65],
                        type: 'line',
                        smooth: true
                    }
                ]
            },
            data: [
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
            ]
        }
    }

    render(){
        const {data} = this.state;
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
        const scale={
            price:{
                min:0,
                max:1.5
            },
            year:{
                range:[0.05, 0.95]
            }
        }
        return <>
            <div style={{
                position: 'absolute',
                right: 0,
                top: 0,
                zIndex: 1,
            }}>
                <span style={{...styles.span}}>今日</span>
                <span style={{...styles.span, ...styles.onSpan}}>本周</span>
                <span style={{...styles.span}}>本月</span>
                <span style={{...styles.span}}>本年</span>
                <RangePicker
                    defaultValue={[moment('2019-08/27', 'YYYY-MM-DD'), moment('2019/08/30', 'YYYY-MM-DD')]}
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
                    <h2 style={{paddingLeft: 20}}>资质数量</h2>
                    {/*<Chart height={360}  padding={[10, 10, 30, 30]} autoFit data={data} scale={scale}>*/}
                    {/*    <Path*/}
                    {/*        animate={{*/}
                    {/*            appear: {*/}
                    {/*                animation: 'path-in',*/}
                    {/*                duration: 1000,*/}
                    {/*                easing: 'easeLinear',*/}
                    {/*            }*/}
                    {/*        }}*/}
                    {/*        shape="smooth"*/}
                    {/*        position="month*value"*/}
                    {/*    />*/}
                    {/*</Chart>*/}
                    <Echarts
                        style={{
                            height:'360px'
                        }}
                        option={this.state.baseOption}
                        lazyUpdate={true}
                    />
                </div>
            </div>
        </>
    }
}

export default BrokenLineCanvas
