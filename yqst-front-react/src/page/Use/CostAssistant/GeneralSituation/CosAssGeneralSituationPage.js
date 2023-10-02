import React, {Component} from 'react';
import {Card, Row, Col, message} from 'antd'
import {firm_settlement_btn, firm_cost_btn, firm_count_btn} from '../../../../resource';
import Model from '../CostAssistantModel';

const featureData = [
    {
        icon: firm_settlement_btn,
        label: '结算单',
        url: '/pages/appCenter/costAssistant/costAssistantHome/FinalStatementPayee/List',
    },
    {
        icon: firm_cost_btn,
        label: '结算调整',
        url: '/pages/appCenter/costAssistant/costAssistantHome/BusinessAdjust/BusinessAdjustIndex',
    },
    // {
    //     icon: firm_cost_btn,
    //     label: '制费用单',
    //     url: '/pages/appCenter/costAssistant/costAssistantHome/ExpressFeeList',
    // },
    {
        icon: firm_cost_btn,
        label: '附加费用',
        url: '/pages/appCenter/costAssistant/costAssistantHome/AddFees/AddFeesIndex'
    }
];

class CosAssGeneralSituationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numbers: {}
        };
    }

    componentDidMount() {
        this.CostAssistantPlatformGoodsGet();
    }

    componentWillUnmount() {

    }

    CostAssistantPlatformGoodsGet() {
        Model.CostAssistantPlatformGoodsGet({}, (res) => {
            this.setState({
                numbers: res.data || {}
            })
        }, (err) => {
        });
    }

    render() {
        const {numbers} = this.state;
        return (
            <>
                <Card bodyStyle={{padding: 0}} style={{padding: '36px 24px', borderRadius: '6px'}}>
                    <h1
                        style={{
                            margin: 0,
                            fontSize: '24px',
                            fontWeight: 500,
                            lineHeight: '33px',
                            color: '#2B3441'
                        }}
                    >
                        结算中心
                    </h1>
                </Card>
                <div style={{padding: '24px', borderRadius: '6px', marginTop: '24px', background: '#fff'}}>
                    <div>收入</div>
                    <Row>
                        <Col span={8}>
                            <div
                                style={{
                                    fontSize: '14px',
                                    fontWeight: 300,
                                    color: 'rgba(43, 52, 65, 0.65)',
                                    margin: '0px'
                                }}
                            >本月待结算(元)
                            </div>
                            <div
                                style={{
                                    fontWeight: 300,
                                    color: '#2B3441',
                                    fontSize: '30px',
                                }}
                            >{numbers.payerToBeSettledAmountTheMonth || 0}</div>
                        </Col>
                        <Col span={8}>
                            <div
                                style={{
                                    fontSize: '14px',
                                    fontWeight: 300,
                                    color: 'rgba(43, 52, 65, 0.65)',
                                    margin: '0px'
                                }}
                            >本月已结算总额(元)
                            </div>
                            <div
                                style={{
                                    fontWeight: 300,
                                    color: '#2B3441',
                                    fontSize: '30px',
                                }}
                            >{numbers.payerSettledAmountTheMonth || 0}</div>
                        </Col>
                    </Row>
                    <div>支出</div>
                    <Row>
                        <Col span={8}>
                            <div
                                style={{
                                    fontSize: '14px',
                                    fontWeight: 300,
                                    color: 'rgba(43, 52, 65, 0.65)',
                                    margin: '0px'
                                }}
                            >本月待结算(元)
                            </div>
                            <div
                                style={{
                                    fontWeight: 300,
                                    color: '#2B3441',
                                    fontSize: '30px',
                                }}
                            >{numbers.payeeToBeSettledAmountTheMonth || 0}</div>
                        </Col>
                        <Col span={8}>
                            <div
                                style={{
                                    fontSize: '14px',
                                    fontWeight: 300,
                                    color: 'rgba(43, 52, 65, 0.65)',
                                    margin: '0px'
                                }}
                            >本月已结算总额(元)
                            </div>
                            <div
                                style={{
                                    fontWeight: 300,
                                    color: '#2B3441',
                                    fontSize: '30px',
                                }}
                            >{numbers.payeeSettledAmountTheMonth || 0}</div>
                        </Col>
                    </Row>
                </div>
                <Card
                    style={{marginTop: 24, borderRadius: 6, minHeight: '413px'}}
                    title={
                        <h1
                            style={{fontSize: 16, margin: 0, color: '#2B3441'}}
                        >
                            业务处理
                        </h1>
                    }
                >
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
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
                                        <img style={{cursor: 'pointer'}} width={32} height={32} src={n.icon} alt=""/>
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

export default CosAssGeneralSituationPage;
