/**
 * Created by yb on 2019/08/29
 */

import React from 'react';
import {Button, Form, message, Row, Col, DatePicker} from 'antd';
import {CaretDownOutlined, CaretUpOutlined} from '@ant-design/icons';
import moment from 'moment';
import {Link} from "react-router-dom";
import TabsViewContent from "../../../baseview/tabsViewContent/TabsViewContent";
import AreaCanvas from "./canvas/AreaCanvas";
import ChannelPieCanvas from "./canvas/ChannelPieCanvas";
import NewsPieCanvas from "./canvas/NewsPieCanvas";
import ColumnarCanvas from "./canvas/ColumnarCanvas";

const { MonthPicker, RangePicker } = DatePicker;


class MessageStatistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {}

    render() {
        return (
            <TabsViewContent
                crumb={[
                    {name: '消息中心'},
                    {name: "消息统计"}
                ]}
            >
                {this.makeTopView()}
                {this.makeBottomView()}
            </TabsViewContent>
        );
    }

    makeTopView(){
        return <div style={{
            height: 300,
            position: 'relative',
            border: '1px solid #e8e8e8',
            borderRadius: 6,
        }}>
            <div
                style={{
                    position: 'absolute',
                    width: 260,
                    height: '100%',
                    padding: '10px 30px',
                    top: 0,
                    left: 0,
                    borderRight: '1px solid #e8e8e8',
                }}
            >
                <div>
                    累计发送消息数
                    <h3 style={{fontSize: 30, margin: 0}}>4320</h3>
                </div>
                <div style={{margin: '20px 0'}}>
                    累计发送消息数
                    <h3 style={{fontSize: 30, margin: 0}}>1342</h3>
                    <span
                        style={{marginRight: 10, color: '#f00'}}
                    ><CaretDownOutlined />10%</span>同比上周
                </div>
                <div>
                    今日发送消息数
                    <h3 style={{fontSize: 30, margin: 0}}>342</h3>
                    <span
                        style={{marginRight: 10, color: '#f00'}}
                    ><CaretDownOutlined /> 10%</span>同比上周
                </div>
            </div>
            <AreaCanvas/>
        </div>
    }

    makeBottomView(){
        const styles = {
            divCommon: {
                width: '33%',
                height: '100%',
                border: '1px solid #e8e8e8',
                borderRadius: 6,
            },
            h1:{
                height: 52,
                lineHeight: '52px',
                textAlign: 'center',
                borderBottom: '1px solid #e8e8e8',
                fontSize: 18,
            },
            span:{
                padding: '5px 10px',
                display: 'inline-block',
                cursor: 'pointer',
            },
            onSpan:{
                color: '#20a5c7',
            },
            dates:{
                marginLeft: 15,
                width: 230
            }
        };
        return <div style={{
            marginTop: 15,
            display: 'flex',
            justifyContent: 'space-between',
            height: 530
        }}>
            <div style={styles.divCommon}>
                <h1 style={styles.h1}>消息分发渠道统计</h1>
                <ChannelPieCanvas/>
            </div>
            <div style={styles.divCommon}>
                <h1 style={styles.h1}>手机端接收消息统计</h1>
                <NewsPieCanvas/>
            </div>
            <div style={styles.divCommon}>
                <h1 style={styles.h1}>各应用消息发送统计</h1>
                <ColumnarCanvas/>
            </div>
        </div>
    }

}
export default MessageStatistics
