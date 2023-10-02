import React, {Component} from 'react';
import {Button, Col, DatePicker, Row} from "antd";
import moment from 'moment';
import EChartsReact from "echarts-for-react";

const {RangePicker} = DatePicker;

class ChannelPieCanvas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            baseOption: {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'horizontal',
                    left: 'center',
                    bottom: '0'
                },
                label: {
                    formatter: '{b}:{d}%'
                },
                series: [
                    {
                        type: 'pie',
                        radius: '50%',
                        data: [
                            {value: 36, name: '极光'},
                            {value: 28, name: '个推'},
                            {value: 20, name: '阿里云'},
                            {value: 10, name: '腾讯云'},
                            {value: 6, name: '其他'}
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            },
            data: [
                {
                    item: '极光',
                    count: 38,
                    percent: 0.28
                }, {
                    item: '个推',
                    count: 28,
                    percent: 0.28
                }, {
                    item: '阿里云',
                    count: 20,
                    percent: 0.20
                }, {
                    item: '腾讯云',
                    count: 10,
                    percent: 0.10
                }, {
                    item: '其他',
                    count: 6,
                    percent: 0.06
                }
            ],
        }
    }

    render() {
        const {data} = this.state;
        const cols = {
            percent: {
                formatter: val => {
                    val = (val * 100).toFixed(0) + '%';
                    return val;
                },
            },
        };
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
            {/*<Chart height={400} padding={[0, 50, 30, 80]} data={data} scale={cols} autoFit>*/}
            {/*    <Coordinate type="theta" radius={0.75} />*/}
            {/*    <Tooltip showTitle={false} />*/}
            {/*    <Axis visible={false} />*/}
            {/*    <Interval*/}
            {/*        position="percent"*/}
            {/*        adjust="stack"*/}
            {/*        color="item"*/}
            {/*        style={{*/}
            {/*            lineWidth: 1,*/}
            {/*            stroke: '#fff',*/}
            {/*        }}*/}
            {/*        label={['count', {*/}
            {/*            content: (data) => {*/}
            {/*                return `${data.item}: ${(data.percent * 100).toFixed(0)}%`;*/}
            {/*            },*/}
            {/*        }]}*/}
            {/*        state={{*/}
            {/*            selected: {*/}
            {/*                style: (t) => {*/}
            {/*                    const res = getTheme().geometries.interval.rect.selected.style(t);*/}
            {/*                    return { ...res, fill: 'red' }*/}
            {/*                }*/}
            {/*            }*/}
            {/*        }}*/}
            {/*    />*/}
            {/*    <Interaction type='element-single-selected' />*/}
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

export default ChannelPieCanvas
