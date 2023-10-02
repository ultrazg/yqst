import React, {Component} from 'react';
import EChartsReact from "echarts-for-react";

class ExampleCanvas extends Component{
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

    render(){
        let data = [
            {
                name: '银联支付',
                type: '银联支付 | 36%  ￥3,666',
                value: 36,
                percent: 0.36,
                money: '￥3,666'
            }, {
                name: '微信支付',
                type: '微信支付 | 20%  ￥3,666',
                value: 20,
                percent: 0.20,
                money: '￥3,666'
            }, {
                name: '商业汇票',
                type: '商业汇票 | 16%  ￥3,666',
                value: 16,
                percent: 0.16,
                money: '￥3,666'
            }, {
                name: '支付宝支付',
                type: '支付宝支付 | 10%  ￥3,666',
                value: 10,
                percent: 0.10,
                money: '￥3,666'
            }, {
                name: '京东钱包',
                type: '京东钱包 | 9%  ￥3,666',
                value: 9,
                percent: 0.09,
                money: '￥3,666'
            }, {
                name: '其他',
                type: '其他 | 9%  ￥3,666',
                value: 9,
                percent: 0.09,
                money: '￥3,666',
            }
        ];
        const sliceNumber = 0; // 自定义 other 的图形，增加两条线

        return <EChartsReact
            style={{
                height: '350px'
            }}
            option={this.state.baseOption}
        />
        // return <Chart data={data} height={350} autoFit padding={[0, 300, 0, 0]} >
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

export default ExampleCanvas
