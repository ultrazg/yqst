import React, {Component} from 'react';
import ViewCoat from '../../../PublicModule/ViewCoat/ViewCoat';
import {
    Button,
    Row,
    Col,
} from 'antd';
import {connect} from "react-redux";
import {saveCompanyInfo} from "../../Redux/BTBEnterpriseWalletAction";

@connect(
    (state) => {
        const {BTBEnterpriseWalletReducers} = state;
        return {
            BTBEnterpriseWalletReducers
        }
    },
    (dispatch) => {
        return {
            saveCompanyInfo: (position) => {
                dispatch(saveCompanyInfo(position))
            },
        }
    }
)
class BTBAccountViewPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        // this.makeSYG2();
        // this.makeFFG2();
    }

    componentWillUnmount() {
    }

    render() {
        const {companyInfo} = this.props.BTBEnterpriseWalletReducers;

        return (
            <ViewCoat
                breadCrumb={[
                    {title: '账户管理'},
                    {title: '账户概览'},
                ]}
                botStyle={{
                    background: 'none',
                    padding: '0px'
                }}
            >
                <div
                    style={{
                        height: '150px',
                        borderRadius: '6px',
                        background: '#fff',
                        padding: '24px',
                        marginBottom: '24px'
                    }}
                >
                    <h1
                        style={{
                            fontWeight: 500,
                            fontSize: '16px',
                            lineHeight: '22px',
                            color: '#2B3441',
                            marginBottom: '16px',
                            marginTop: '6px',
                        }}
                    >基本信息</h1>
                    <Row>
                        {this.makeColTxt('商沃商户编号', companyInfo.companySn)}
                        {this.makeColTxt('商户简称', companyInfo.companySimpleName)}
                    </Row>
                    <Row>
                        {this.makeColTxt('联系人', companyInfo.contactName)}
                        {this.makeColTxt('联系人电话', companyInfo.contactPhone)}
                    </Row>
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        marginBottom: '24px'
                    }}
                >
                    <div style={{flex: 1, marginRight: '24px', height: '200px', borderRadius: '6px', background: '#fff'}}>
                        <h1
                            style={{
                                fontSize: '16px',
                                color: '#2B3441',
                                padding: '16px 24px',
                                borderBottom: '1px solid #E8E8E8',
                                margin: '0px',
                                fontWeight: 100
                            }}
                        >
                            银联B端账户（YL00099）
                            <span
                                style={{
                                    color: 'rgba(43,52,65,0.65)',
                                    float: 'right',
                                    fontWeight: 100,
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                }}
                            >账户详情</span>
                        </h1>
                        <div
                            style={{padding: '16px 24px'}}
                        >
                            <Row>
                                <Col span={8} style={{color: 'rgba(43,52,65,0.65)', fontSize: '14px', marginBottom: '16px'}}>
                                    账户总资金（元）
                                    <h1 style={{color: '#2B3441', fontSize: '30px', lineHeight: '42px', margin: '0px'}}>--</h1>
                                </Col>
                                <Col span={8} style={{color: 'rgba(43,52,65,0.65)', fontSize: '14px', marginBottom: '16px'}}>
                                    可用余额（元）
                                    <h1 style={{color: '#2B3441', fontSize: '30px', lineHeight: '42px', margin: '0px'}}>--</h1>
                                </Col>
                                <Col span={8} style={{color: 'rgba(43,52,65,0.65)', fontSize: '14px', marginBottom: '16px'}}>
                                    冻结金额（元）
                                    <h1 style={{color: '#2B3441', fontSize: '30px', lineHeight: '42px', margin: '0px'}}>--</h1>
                                </Col>
                            </Row>
                            <Button type="primary" style={{width: '64px', height: '32px', fontSize: '14px', marginRight: '16px'}}>充值</Button>
                            <Button style={{width: '64px', height: '32px', fontSize: '14px', background: '#33B347', marginRight: '16px', color: '#fff'}}>提现</Button>
                            <Button style={{width: '64px', height: '32px', fontSize: '14px'}}>充值</Button>
                        </div>
                    </div>
                    <div style={{flex: 1, height: '200px', borderRadius: '6px', background: '#fff'}}>
                        <h1
                            style={{
                                fontSize: '16px',
                                color: '#2B3441',
                                padding: '16px 24px',
                                borderBottom: '1px solid #E8E8E8',
                                margin: '0px',
                                fontWeight: 100
                            }}
                        >
                            微信支付商户（YL00099）
                            <span
                                style={{
                                    color: 'rgba(43,52,65,0.65)',
                                    float: 'right',
                                    fontWeight: 100,
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                }}
                            >编辑</span>
                        </h1>
                        <div
                            style={{padding: '16px 24px'}}
                        >
                            <Row>
                                <Col span={8} style={{color: 'rgba(43,52,65,0.65)', fontSize: '14px', marginBottom: '16px'}}>
                                    已收款总额（元）
                                    <h1 style={{color: '#2B3441', fontSize: '30px', lineHeight: '42px', margin: '0px'}}>--</h1>
                                </Col>
                                <Col span={8} style={{color: 'rgba(43,52,65,0.65)', fontSize: '14px', marginBottom: '16px'}}>

                                </Col>
                                <Col span={8} style={{color: 'rgba(43,52,65,0.65)', fontSize: '14px', marginBottom: '16px'}}>

                                </Col>
                            </Row>
                            <Button style={{width: '120px', height: '32px', fontSize: '14px', marginRight: '16px'}}>微信收款记录</Button>
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                    }}
                >
                    <div style={{flex: 1, marginRight: '24px', height: '200px', borderRadius: '6px', background: '#fff'}}>
                        <h1
                            style={{
                                fontSize: '16px',
                                color: '#2B3441',
                                padding: '16px 24px',
                                borderBottom: '1px solid #E8E8E8',
                                margin: '0px',
                                fontWeight: 100
                            }}
                        >
                            支付宝账户（YL00099）
                            <span
                                style={{
                                    color: 'rgba(43,52,65,0.65)',
                                    float: 'right',
                                    fontWeight: 100,
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                }}
                            >编辑</span>
                        </h1>
                        <div
                            style={{padding: '16px 24px'}}
                        >
                            <Row>
                                <Col span={8} style={{color: 'rgba(43,52,65,0.65)', fontSize: '14px', marginBottom: '16px'}}>
                                    合作伙伴号PID
                                    <h1 style={{color: '#2B3441', fontSize: '30px', lineHeight: '42px', margin: '0px'}}>--</h1>
                                </Col>
                                <Col span={8} style={{color: 'rgba(43,52,65,0.65)', fontSize: '14px', marginBottom: '16px'}}>
                                    已收款总额（元）
                                    <h1 style={{color: '#2B3441', fontSize: '30px', lineHeight: '42px', margin: '0px'}}>--</h1>
                                </Col>
                                <Col span={8} style={{color: 'rgba(43,52,65,0.65)', fontSize: '14px', marginBottom: '16px'}}>

                                </Col>
                            </Row>
                            <Button style={{width: '128px', height: '32px', fontSize: '14px', marginRight: '16px'}}>支付宝收款记录</Button>
                        </div>
                    </div>
                    <div style={{flex: 1, height: '200px', borderRadius: '6px', background: 'none'}}></div>
                </div>
            </ViewCoat>
        );
    }

    makeColTxt(label = '', val = ''){
        return <Col span={8}
            style={{fontSize: '14px', color: '#2B3441', lineHeight: '20px', marginBottom: '16px'}}
        >
            <label>{label ? label + '：' : ''}</label>
            {val}
        </Col>
    }
}

export default BTBAccountViewPage;
