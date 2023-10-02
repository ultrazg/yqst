/*
 * @Description  : 概况
 * @version      : 0.1
 * @Author       : Chenglin Huang
 * @Date         : 2021-03-12 16:23:59
 * @LastEditTime : 2021-03-15 18:09:14
 */
import React, { Component } from 'react';
import { Card, Row, Col, message } from 'antd'
import { price_logistics_btn } from '../../../resource';

const featureData = [
    {
        icon: price_logistics_btn,
        label: '物流价格',
        url: '/pages/appCenter/carrierAsst/carrierAsstHome/carrierAsstExpressValuePolicyAdd',
    },
];

class CarrierAsstSituationPage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <>
                <Card bodyStyle={{ padding: 0 }} style={{ padding: '36px 24px', borderRadius: '6px' }}>
                    <h1
                        style={{
                            margin: 0,
                            fontSize: '24px',
                            fontWeight: 500,
                            lineHeight: '33px',
                            color: '#2B3441'
                        }}
                    >
                        承运助手
                    </h1>
                </Card>
                <Card
                    style={{ marginTop: 24, borderRadius: 6, minHeight: '553px' }}
                    title={
                        <h1
                            style={{ fontSize: 16, margin: 0, color: '#2B3441' }}
                        >
                            业务处理
                        </h1>
                    }
                >
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {
                            featureData && featureData.map((n, index) => {
                                return (
                                    <div
                                        style={{
                                            width: '20%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            marginBottom: (index + 1 > (parseInt((featureData.length - 1) / 5) * 5)) ? 0 : 32,
                                        }}
                                        key={index}
                                        onClick={() => {
                                            if (!n.url)
                                                return message.warning('工程师正在紧张的研发中...');
                                            this.props.history.push(n.url);
                                        }}
                                    >
                                        <img style={{ cursor: 'pointer' }} width={32} height={32} src={n.icon} alt="" />
                                        <h4
                                            style={{
                                                flex: 1,
                                                marginBottom: 0,
                                                marginLeft: 8,
                                                cursor: 'pointer'
                                            }}
                                        >
                                            {n.label}
                                        </h4>
                                    </div>
                                )
                            })
                        }
                    </div>
                </Card>
            </>
        );
    }
}

export default CarrierAsstSituationPage;
