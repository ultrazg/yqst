import React, {Component} from 'react';
import Echarts from 'echarts-for-react';

class PieChartCanvas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            baseOption: {
                title: {
                    show: true,
                    text: '收付款金额',
                    subtext: '￥123,224',
                    left: 0,
                    top: 'top'
                },
                tooltip: {
                    trigger: 'item',
                    showContent: false
                },
                legend: {
                    top: 'middle',
                    right: 0,
                    orient: 'vertical'
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '12',
                                formatter: '{b}: {d}'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            {value: 36, name: '采购助手'},
                            {value: 20, name: '销售助手'},
                            {value: 16, name: '零售微店'},
                            {value: 10, name: '代理交易助手'},
                            {value: 9, name: '金服分销'},
                            {value: 9, name: '其他'}
                        ]
                    }
                ]
            }
        }
    }

    render() {
        let data = [
            {
                type: '采购助手 | 36%  ￥3,666',
                value: 36,
                percent: 0.36,
                money: '￥3,666'
            }, {
                type: '销售助手 | 20%  ￥3,666',
                value: 20,
                percent: 0.20,
                money: '￥3,666'
            }, {
                type: '零售微店 | 16%  ￥3,666',
                value: 16,
                percent: 0.16,
                money: '￥3,666'
            }, {
                type: '代理交易助手 | 10%  ￥3,666',
                value: 10,
                percent: 0.10,
                money: '￥3,666'
            }, {
                type: '金服分销 | 9%  ￥3,666',
                value: 9,
                percent: 0.09,
                money: '￥3,666'
            }, {
                type: '其他 | 9%  ￥3,666',
                value: 9,
                percent: 0.09,
                money: '￥3,666',
            }
        ];
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
        return (
            <Echarts
                style={{
                    height:'350px'
                }}
                lazyUpdate={true}
                option={this.state.baseOption}
            />
        )

        // <Chart data={data} height={350} autoFit padding={[0, 300, 0, 0]} >
        //     <Coordinate type="theta" radius={0.9} innerRadius={0.75} />
        //     <Legend
        //         position={'right'}
        //         offsetX={-50}
        //     />
        //     <Axis visible={false} />
        //     <Tooltip visible={false}/>
        //     <Annotation.Text
        //         position={['50%', '45%']}
        //         content={'收付款金额'}
        //         style={{
        //             lineHeight: '240px',
        //             fontSize: '16',
        //             fill: '#8c8c8c',
        //             textAlign: 'center',
        //             fontWeight: 'initial'
        //         }}
        //     />
        //     <Annotation.Text
        //         position={['50%', '55%']}
        //         content={'￥123,224'}
        //         style={{
        //             lineHeight: '240px',
        //             fontSize: '20',
        //             fill: '#000',
        //             textAlign: 'center',
        //             fontWeight: 'bold'
        //         }}
        //     />
        //     <Interval
        //         adjust="stack"
        //         position="value"
        //         color="type"
        //         shape="sliceShape"
        //     />
        //     <Interaction type="element-single-selected" />
        // </Chart>
    }
}

export default PieChartCanvas
