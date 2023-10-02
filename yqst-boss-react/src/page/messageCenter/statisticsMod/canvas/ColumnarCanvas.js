import React, {Component} from 'react';
import {Button, Col, DatePicker, Row} from "antd";
import moment from 'moment';
import EChartsReact from "echarts-for-react";

const {RangePicker} = DatePicker;

class ColumnarCanvas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            baseOption: {
                grid:{
                  left:'20%'
                },
                tooltip: {
                    show: true,
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    data: ['Android', 'IOS', 'WinPhone', '其他']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: [32000, 25000, 11000, 9000],
                        type: 'bar'
                    }
                ]
            },
            // data: [
            //     {
            //         type: 'Android',
            //         value: 32000
            //     }, {
            //         type: 'IOS',
            //         value: 25000
            //     }, {
            //         type: 'WinPhone',
            //         value: 11000
            //     }, {
            //         type: '其他',
            //         value: 9000
            //     }
            // ],
        }
    }

    render() {
        const {data} = this.state;
        const styles = {
            divCommon: {
                width: '33%',
                height: '100%',
                border: '1px solid #e8e8e8',
                borderRadius: 6,
            },
            h1: {
                height: 52,
                lineHeight: '52px',
                textAlign: 'center',
                borderBottom: '1px solid #e8e8e8',
                fontSize: 18,
            },
            span: {
                padding: '5px 10px',
                display: 'inline-block',
                cursor: 'pointer',
            },
            onSpan: {
                color: '#20a5c7',
            },
            dates: {
                marginLeft: 15,
                width: 230
            }
        };

        return <>
            <div style={{textAlign: 'center'}}>
                <span style={{...styles.span, ...styles.onSpan}}>今日</span>
                <span style={{...styles.span}}>本周</span>
                <span style={{...styles.span}}>本月</span>
                <RangePicker
                    defaultValue={[moment('2019-08/26', 'YYYY-MM-DD'), moment('2019/08/30', 'YYYY-MM-DD')]}
                    format={'YYYY-MM-DD'}
                    style={styles.dates}
                />
            </div>
            {/*<Chart height={400} padding={[20, 20, 30, 90]} autoFit data={data} >*/}
            {/*    <Interval position="type*value"  />*/}
            {/*</Chart>*/}
            <EChartsReact
                style={{
                    height: '400px'
                }}
                option={this.state.baseOption}
            />
        </>
    }
}

export default ColumnarCanvas
