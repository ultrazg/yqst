import React, {Component} from 'react';
import {Row, Col, Switch} from 'antd';

class OtherCompanyMes extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div
                style={{
                    padding: '30px 32px 24px'
                }}
            >
                <h1
                    style={{
                        fontSize: '20px',
                        color: '#2B3441',
                        marginBottom: '32px',
                        paddingBottom: '24px',
                        borderBottom: '1px solid rgba(43,52,65,0.09)'
                    }}
                >其他企业消息提醒</h1>
                <Row style={{color: 'rgba(43,52,65,0.65)'}}>
                    <Col span={20}>
                        <h3 style={{color: '#2B3441', fontSize: '14px', marginBottom: '4px'}}>其他企业消息提醒</h3>
                        其他用户可通过准确的企业号搜索到本企业
                    </Col>
                    <Col span={4} style={{lineHeight: '46px', textAlign: 'right'}}>
                        <Switch
                            className={'Switch'}
                            defaultChecked
                        />
                    </Col>
                </Row>
                <h2 style={{marginTop: '24px', marginBottom: '16px', fontSize: '16px'}}>接收提醒的企业</h2>
                <Row style={{
                    color: 'rgba(43,52,65,0.65)',
                    paddingBottom: '16px',
                    marginBottom: '16px',
                    borderBottom: '1px solid rgba(43,52,65,0.09)'
                }}
                >
                    <Col span={20}>
                        <h3 style={{color: '#2B3441', fontSize: '14px', marginBottom: '4px'}}>深圳科技</h3>
                        企业号：63636
                    </Col>
                    <Col span={4} style={{lineHeight: '46px', textAlign: 'right'}}>
                        <Switch
                            className={'Switch'}
                            defaultChecked
                        />
                    </Col>
                </Row>
                <Row style={{color: 'rgba(43,52,65,0.65)'}}>
                    <Col span={20}>
                        <h3 style={{color: '#2B3441', fontSize: '14px', marginBottom: '4px'}}>广州科技</h3>
                        企业号：32423
                    </Col>
                    <Col span={4} style={{lineHeight: '46px', textAlign: 'right'}}>
                        <Switch
                            className={'Switch'}
                            defaultChecked
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default OtherCompanyMes;
