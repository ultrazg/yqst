/**
 * Created by yb on 2019/09/27
 */

import React from 'react';
import {Button, Form, message, Row, Col, DatePicker, Card, Table, Radio} from 'antd';
import {CaretUpOutlined, CaretDownOutlined} from '@ant-design/icons';
import moment from 'moment';
import {Link} from "react-router-dom";
import TabsViewContent from "../../../baseview/tabsViewContent/TabsViewContent";
import {picc_default} from "../../../resource/resourceRef";
import NumberFormat from "../../../utils/numberformat/NumberFormat";
import ContractColumnarCanvas from "./canvas/ContractColumnarCanvas";

const { MonthPicker, RangePicker } = DatePicker;


class ContractStatistics extends React.Component {
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
                    {name: '合同中心'},
                    {name: "数据统计"}
                ]}
            >
                {this.makeTopView()}
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
                今日发起合同总数
                <h2 style={styles.h2}>{NumberFormat.thousandBit(34, 0)}</h2>
                <span style={{marginRight: 10, color: '#f00'}}><CaretDownOutlined /> 10%</span> 同比上周
            </div>
            <div style={styles.divs}>
                今日待签核合同
                <h2 style={styles.h2}>{NumberFormat.thousandBit(12,0)}</h2>
                <span style={{marginRight: 10, color: '#46BD4C'}}><CaretUpOutlined /> 26%</span> 同比上周
            </div>
            <div style={styles.divs}>
                今日已拒绝合同
                <h2 style={styles.h2}>{NumberFormat.thousandBit(5,0)}</h2>
                <span style={{marginRight: 10, color: '#46BD4C'}}><CaretUpOutlined /> 26%</span> 同比上周
            </div>
            <div style={styles.divs}>
                今日已完成合同
                <h2 style={styles.h2}>{NumberFormat.thousandBit(36,0)}</h2>
                <span style={{marginRight: 10, color: '#f00'}}><CaretDownOutlined /> 10%</span> 同比上周
            </div>
            <div style={styles.divs}>
                今日履行合同
                <h2 style={styles.h2}>{NumberFormat.thousandBit(120,0)}</h2>
                <span style={{marginRight: 10, color: '#46BD4C'}}><CaretUpOutlined /> 26%</span> 同比上周
            </div>
        </div>
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
                title: '排名',
                dataIndex: 'key',
                key: 'key',
                width: 85
            },
            {
                title: '拒绝原因',
                dataIndex: 'a',
                key: 'a'
            },
            {
                title: '占比',
                dataIndex: 'b',
                key: 'b'
            },
        ];
        const data = [
            {
                key: '1',
                a: '内容填写有误',
                b: '10%'
            },
            {
                key: '2',
                a: '内容填写有误',
                b: '10%'
            },
            {
                key: '3',
                a: '内容填写有误',
                b: '10%'
            },
            {
                key: '4',
                a: '内容填写有误',
                b: '10%'
            },
            {
                key: '5',
                a: '内容填写有误',
                b: '10%'
            }
        ];
        return <div style={{
            display: 'flex',
            marginTop: 15
        }}>
            <Card title="合同数据统计" style={{flexGrow: 1}} bodyStyle={{padding: 10}}>
                <div style={{marginBottom: 15}}>
                    <Row>
                        <Col span={8}>
                            <Radio.Group defaultValue={'1'}>
                                <Radio.Button value="1">状态</Radio.Button>
                                <Radio.Button value="2">数量</Radio.Button>
                                <Radio.Button value="3">企业</Radio.Button>
                                <Radio.Button value="4">应用</Radio.Button>
                            </Radio.Group>
                        </Col>
                        <Col span={16} style={{textAlign: 'right'}}>
                            <span style={{...styles.span, ...styles.onSpan}}>今日</span>
                            <span style={{...styles.span}}>本周</span>
                            <span style={{...styles.span}}>本月</span>
                            <RangePicker
                                defaultValue={[moment('2019-08/26', 'YYYY-MM-DD'), moment('2019/08/30', 'YYYY-MM-DD')]}
                                format={'YYYY-MM-DD'}
                                style={{marginLeft: 5}}
                            />
                        </Col>
                    </Row>
                </div>
                <ContractColumnarCanvas/>
            </Card>
            <Card title="拒绝原因统计" style={{marginLeft: 10, width: 350}} bodyStyle={{padding: 10}}>
                <Table columns={columns} dataSource={data}/>
            </Card>
        </div>
    }
}
export default ContractStatistics
