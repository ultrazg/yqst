import React, {Component} from 'react';
import {Button, Col, DatePicker, Row} from "antd";
import moment from 'moment';
import EChartsReact from "echarts-for-react";

const { RangePicker } = DatePicker;

class AreaCanvas extends Component{
    constructor(props) {
        super(props);
        this.state = {
            baseOption:{
                grid: {
                    left: '25',
                    top: '25',
                    right: '25',
                    bottom: '25',
                },
                tooltip: {
                    show: true,
                    trigger:'axis'
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: [78, 25, 38, 62, 28, 16, 20],
                        type: 'line',
                        areaStyle: {}
                    }
                ]
            },
            // data: [
            //     {
            //         week: '周日',
            //         value: 78
            //     }, {
            //         week: '周一',
            //         value: 25
            //     }, {
            //         week: '周二',
            //         value: 38
            //     }, {
            //         week: '周三',
            //         value: 62
            //     }, {
            //         week: '周四',
            //         value: 28
            //     }, {
            //         week: '周五',
            //         value: 16
            //     }, {
            //         week: '周六',
            //         value: 20
            //     }
            // ],
        }
    }

    render(){
        const {data} = this.state;
        const scale = {
            value: {
                min: 10000,
                nice: true,
            },
            week: {
                range: [0, 1],
            },
        };

        return <>
            <div style={{
                width: '100%',
                height: '100%',
                padding: '10px 10px 10px 271px',
            }}>
                <Row style={{height: 40}}>
                    <Col span={8}>
                        <Button style={{marginRight: 15, color: '#20a5c7', borderColor: '#20a5c7'}}>消息数量</Button>
                        <Button>用户数量</Button>
                    </Col>
                    <Col span={16} style={{textAlign: 'right'}}>
                        <span style={{
                            padding: '5px 10px',
                            display: 'inline-block',
                            color: '#20a5c7',
                            cursor: 'pointer',
                        }}>今日</span>
                        <span style={{
                            padding: '5px 10px',
                            display: 'inline-block',
                            cursor: 'pointer',
                        }}>本周</span>
                        <span style={{
                            padding: '5px 10px',
                            display: 'inline-block',
                            cursor: 'pointer',
                        }}>本月</span>
                        <RangePicker
                            defaultValue={[moment('2019-08/26', 'YYYY-MM-DD'), moment('2019/08/30', 'YYYY-MM-DD')]}
                            format={'YYYY-MM-DD'}
                            style={{marginLeft: 15}}
                        />
                    </Col>
                </Row>
                {/*<Chart scale={scale} height={245} padding={[ 30, 20, 40, 40 ]} data={data} autoFit>*/}
                {/*    <Tooltip shared />*/}
                {/*    <Area position="week*value" />*/}
                {/*    <Line position="week*value" />*/}
                {/*</Chart>*/}
                <EChartsReact
                    style={{
                        height:'245px'
                    }}
                    lazyUpdate={true}
                    option={this.state.baseOption}
                />
            </div>
        </>
    }
}

export default AreaCanvas
