import React, {Component} from 'react';
import moment from 'moment';
import {DatePicker} from 'antd';
import ECharts from 'echarts-for-react';

const {MonthPicker, RangePicker} = DatePicker;

class GoodsColumnarCanvas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            baseOption: {
                tooltip: {
                    show: true
                },
                xAxis: {
                    type: 'category',
                    data: ['服饰', '汽车零配件', '五金零件', '鞋包', '家具大物品', '家电', '数码产品', '美容护肤', '其他', '宠物', '食物', '生鲜食品', '发饰', '箱包', '办公用品']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: [26, 66, 38, 12, 28, 27, 36, 28, 20, 37, 15, 26, 58, 30, 15],
                        type: 'bar'
                    }
                ]
            },
            // data: [
            //     {
            //         type: '服饰',
            //         value: 26
            //     }, {
            //         type: '汽车零配件',
            //         value: 66
            //     }, {
            //         type: '五金零件',
            //         value: 38
            //     }, {
            //         type: '鞋包',
            //         value: 13
            //     }, {
            //         type: '家具大物品',
            //         value: 28
            //     }, {
            //         type: '家电',
            //         value: 27
            //     }, {
            //         type: '数码产品',
            //         value: 36
            //     }, {
            //         type: '美容护肤',
            //         value: 36
            //     }, {
            //         type: '其他',
            //         value: 58
            //     }, {
            //         type: '宠物',
            //         value: 16
            //     }, {
            //         type: '食物',
            //         value: 25
            //     }, {
            //         type: '生鲜食品',
            //         value: 55
            //     }, {
            //         type: '发饰',
            //         value: 23
            //     }, {
            //         type: '箱包',
            //         value: 18
            //     }, {
            //         type: '运动',
            //         value: 37
            //     }, {
            //         type: '虚拟',
            //         value: 20
            //     }, {
            //         type: '办公用品',
            //         value: 28
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
            <div style={{marginBottom: 15}}>
                <span style={{...styles.span, ...styles.onSpan}}>今日</span>
                <span style={{...styles.span}}>本周</span>
                <span style={{...styles.span}}>本月</span>
                <RangePicker
                    defaultValue={[moment('2019-08/26', 'YYYY-MM-DD'), moment('2019/08/30', 'YYYY-MM-DD')]}
                    format={'YYYY-MM-DD'}
                    style={{marginLeft: 15}}
                />
            </div>
            {/*<Chart height={350} autoFit data={data} padding={[10, 10, 30, 30]}>*/}
            {/*    <Interval position="type*value"/>*/}
            {/*</Chart>*/}
            <ECharts
                style={{
                    width:'100%',
                    height: '350px'
                }}
                option={this.state.baseOption}
            />
        </>
    }
}

export default GoodsColumnarCanvas
