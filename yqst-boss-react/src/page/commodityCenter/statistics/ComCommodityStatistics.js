/**
 * Created by yb on 2019/08/30
 */

import React from 'react';
import {Button, Form, message, Row, Col, DatePicker, Card, Table} from 'antd';
import {CaretDownOutlined, CaretUpOutlined} from '@ant-design/icons';
import moment from 'moment';
import {Link} from "react-router-dom";
import TabsViewContent from "../../../baseview/tabsViewContent/TabsViewContent";
import {picc_default} from "../../../resource/resourceRef";
import NumberFormat from "../../../utils/numberformat/NumberFormat";
import GoodsColumnarCanvas from "./canvas/GoodsColumnarCanvas";
import GoodsBrokenLineCanvas from "./canvas/GoodsBrokenLineCanvas";

const { MonthPicker, RangePicker } = DatePicker;

class ComCommodityStatistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <TabsViewContent
                crumb={[
                    {name: '商品中心'},
                    {name: "商品数据统计"}
                ]}
            >
                {this.makeTopView()}
                {this.makeFLView()}
                {this.makeBotView()}
            </TabsViewContent>
        );
    }

    makeTopView(){
        const styles = {
            topStyles: {
                width: '100%',
                height: 150,
                border: '1px solid #e8e8e8',
                borderRadius: 6,
                padding: 15,
                display: 'flex',
            },
            divs: {
                flexGrow: 1,
                padding: 10,
                textAlign: 'center'
            },
            img: {
                width: 80,
                height: 80,
                marginTop: 17,
            },
            h2:{
                margin: 0,
                fontSize: 40
            }
        };
        return <div style={styles.topStyles}>
            <img src={picc_default} alt="" style={styles.img}/>
            <div style={{...styles.divs, borderRight: '1px solid #e8e8e8'}}>
                累计商品总数(个)
                <h2 style={styles.h2}>{NumberFormat.thousandBit(12345, 0)}</h2>
                <span style={{marginRight: 10, color: '#f00'}}><CaretDownOutlined /> 10%</span> 同比上周
            </div>
            <div style={styles.divs}>
                本周新增商品(个)
                <h2 style={styles.h2}>{NumberFormat.thousandBit(1200,0)}</h2>
                <span style={{marginRight: 10, color: '#46BD4C'}}><CaretUpOutlined /> 26%</span> 同比上周
            </div>
            <div style={styles.divs}>
                本周上架商品(个)
                <h2 style={styles.h2}>{NumberFormat.thousandBit(680,0)}</h2>
                <span style={{marginRight: 10, color: '#46BD4C'}}><CaretUpOutlined /> 26%</span> 同比上周
            </div>
            <div style={styles.divs}>
                本周下架商品(个)
                <h2 style={styles.h2}>{NumberFormat.thousandBit(363,0)}</h2>
                <span style={{marginRight: 10, color: '#f00'}}><CaretDownOutlined /> 10%</span> 同比上周
            </div>
            <div style={styles.divs}>
                销售终端总数量(个)
                <h2 style={styles.h2}>{NumberFormat.thousandBit(120,0)}</h2>
                <span style={{marginRight: 10, color: '#46BD4C'}}><CaretUpOutlined /> 26%</span> 同比上周
            </div>
        </div>
    }

    makeFLView(){
        return <Card title="商品分类统计" style={{marginTop: 15}}>
            <GoodsColumnarCanvas/>
        </Card>
    }

    makeBotView(){
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
        const columns = [
            {
                title: '序号',
                dataIndex: 'key',
                key: 'key',
                width: 85
            },
            {
                title: '商品数量区间',
                dataIndex: 'a',
                key: 'a'
            },
            {
                title: '销售总段数量',
                dataIndex: 'b',
                key: 'b'
            },
        ];
        const data = [
            {
                key: '1',
                a: '0 - 10',
                b: 300
            },
            {
                key: '2',
                a: '10 - 30',
                b: 31
            },
            {
                key: '3',
                a: '30 - 50',
                b: 27
            },
            {
                key: '4',
                a: '50 - 60',
                b: 4
            },
            {
                key: '5',
                a: '60 - 70',
                b: 18
            }
        ];
        return <div style={{
            display: 'flex',
            marginTop: 15
        }}>
            <Card title="商品数量区间统计" style={{marginRight: 10, width: 450}}>
                <div style={{marginBottom: 15}}>
                    <span style={{...styles.span, ...styles.onSpan}}>今日</span>
                    <span style={{...styles.span}}>本周</span>
                    <span style={{...styles.span}}>本月</span>
                    <RangePicker
                        defaultValue={[moment('2019-08/26', 'YYYY-MM-DD'), moment('2019/08/30', 'YYYY-MM-DD')]}
                        format={'YYYY-MM-DD'}
                        style={{marginLeft: 15, width: 240}}
                    />
                </div>
                <Table columns={columns} dataSource={data}/>
            </Card>
            <Card title="商品数量统计" style={{flexGrow: 1}}>
                <GoodsBrokenLineCanvas/>
            </Card>
        </div>
    }

}
export default ComCommodityStatistics
