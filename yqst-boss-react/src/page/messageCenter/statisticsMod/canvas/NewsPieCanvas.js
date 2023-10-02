import React, {Component} from 'react';
import {Button, Col, DatePicker, Row} from "antd";
import moment from 'moment';
import EChartsReact from "echarts-for-react";

const {RangePicker} = DatePicker;

class NewsPieCanvas extends Component {
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
                        radius: ['30%', '50%'],
                        data: [
                            {value: 78, name: 'Android'},
                            {value: 58, name: 'IOS'},
                            {value: 42, name: 'WinPhone'},
                            {value: 22, name: '其他'},
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
                    type: 'Android 78台、38%',
                    value: 78,
                    percent: 0.38
                }, {
                    type: 'IOS 58、28%',
                    value: 58,
                    percent: 0.28
                }, {
                    type: 'WinPhone 42、22%',
                    value: 42,
                    percent: 0.22
                }, {
                    type: '其他 22、12%',
                    value: 22,
                    percent: 0.12
                }
            ]
        }
    }

    render() {
        const {data} = this.state;
        const sliceNumber = 0; // 自定义 other 的图形，增加两条线

        // registerShape("interval", "sliceShape", {
        //     draw(cfg, container) {
        //         const points = cfg.points;
        //         let path = [];
        //         path.push(["M", points[0].x, points[0].y]);
        //         path.push(["L", points[1].x, points[1].y - sliceNumber]);
        //         path.push(["L", points[2].x, points[2].y - sliceNumber]);
        //         path.push(["L", points[3].x, points[3].y]);
        //         path.push("Z");
        //         path = this.parsePath(path);
        //         return container.addShape("path", {
        //             attrs: {
        //                 fill: cfg.color,
        //                 path: path
        //             }
        //         });
        //     }
        // });

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
            <EChartsReact
                style={{
                    height: '400px'
                }}
                option={this.state.baseOption}
            />
            {/*<Chart data={data} height={400} autoFit padding={[0, 200, 0, 0]} >*/}
            {/*    <Coordinate type="theta" radius={0.9} innerRadius={0.75} />*/}
            {/*    <Legend*/}
            {/*        position={'right'}*/}
            {/*        offsetX={-50}*/}
            {/*    />*/}
            {/*    <Axis visible={false} />*/}
            {/*    <Tooltip visible={false}/>*/}
            {/*    <Annotation.Text*/}
            {/*        position={['50%', '45%']}*/}
            {/*        content={'项目总计'}*/}
            {/*        style={{*/}
            {/*            lineHeight: '240px',*/}
            {/*            fontSize: '16',*/}
            {/*            fill: '#8c8c8c',*/}
            {/*            textAlign: 'center',*/}
            {/*            fontWeight: 'initial'*/}
            {/*        }}*/}
            {/*    />*/}
            {/*    <Annotation.Text*/}
            {/*        position={['50%', '55%']}*/}
            {/*        content={'200+'}*/}
            {/*        style={{*/}
            {/*            lineHeight: '240px',*/}
            {/*            fontSize: '20',*/}
            {/*            fill: '#000',*/}
            {/*            textAlign: 'center',*/}
            {/*            fontWeight: 'bold'*/}
            {/*        }}*/}
            {/*    />*/}
            {/*    <Interval*/}
            {/*        adjust="stack"*/}
            {/*        position="value"*/}
            {/*        color="type"*/}
            {/*        shape="sliceShape"*/}
            {/*    />*/}
            {/*    <Interaction type="element-single-selected" />*/}
            {/*</Chart>*/}
        </>
    }
}

export default NewsPieCanvas
