import React, {Component} from 'react';

import {  Row, Col, message, Switch } from 'antd';
import Model from '../../Model'
import IsPower from '../../../Power/IsPower'

class CompanySetUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            checkedVal_0: false,
            checkedVal_1: false,
            checkedVal_2: false,
        };

    }

    componentDidMount() {
        // this.getGetErpInfo();
    }

    componentWillUnmount() {}

    render() {
        return (
            <div className={'csuCss'}>
                <IsPower
                    key={'ERP_SET_ENTER'}
                    permissionsName={'ERP_SET_ENTER'}
                    style={{paddingTop: '240px'}}
                >
                    <h1>企业设置</h1>
                    <div className={'con_ys'}>
                        <h2>隐私设置</h2>
                        <Row>
                            <Col span={20}>
                                <div style={{color: '#2B3441'}}>可通过企业号搜索到本企业</div>
                                <span style={{color: 'rgba(43,52,65,0.65)'}}>其他用户可通过准确的企业号搜索到本企业</span>
                            </Col>
                            <Col span={4} style={{textAlign: 'right', marginTop: '15px'}}>
                                <Switch className={'swi'}
                                    checked={this.state.checkedVal_0}
                                    onChange={(checked) => {
                                        this.onChangeSwitch(checked, 0);
                                    }}
                                />
                            </Col>
                        </Row>
                    </div>
                    <div className={'con_ys'}>
                        <h2>审核设置</h2>
                        <Row style={{paddingBottom: '16px', marginBottom: '16px', borderBottom: '1px solid rgba(43,52,65,0.09)'}}>
                            <Col span={20}>
                                <div style={{color: '#2B3441'}}>添加本企业为合作伙伴时需验证</div>
                                <span style={{color: 'rgba(43,52,65,0.65)'}}>开启后，其他用户添加本企业为合作伙伴时需要本企业验证；关闭则将自动通过并成为合作伙伴</span>
                            </Col>
                            <Col span={4} style={{textAlign: 'right', marginTop: '15px'}}>
                                <Switch className={'swi'}
                                    checked={this.state.checkedVal_1}
                                    onChange={(checked) => {
                                        this.onChangeSwitch(checked, 1);
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={20}>
                                <div style={{color: '#2B3441'}}>员工申请加入时需验证</div>
                                <span style={{color: 'rgba(43,52,65,0.65)'}}>开启后，其他用户申请成为员工时需要本企业验证；关闭则将自动通过并成为本企业成员</span>
                            </Col>
                            <Col span={4} style={{textAlign: 'right', marginTop: '15px'}}>
                                <Switch className={'swi'}
                                    checked={this.state.checkedVal_2}
                                    onChange={(checked) => {
                                        this.onChangeSwitch(checked, 2);
                                    }}
                                />
                            </Col>
                        </Row>
                    </div>
                </IsPower>
            </div>
        );
    }

    getGetErpInfo(){
        Model.GetErpInfo({
            accountSn: localStorage.accountSn
        }, (res) => {
            this.setState({data: res.data});
        }, (err) => {});
    }

    onChangeSwitch(checked, type){
        let {checkedVal_0, checkedVal_1, checkedVal_2} = this.state;
        window.globalPermissions.checkPermission('ERP_SET_SET', (res) => {
            if(res)
                return message.error('抱歉，您没有该操作权限，请联系管理员！');

            switch (type + '') {
                case '0':
                    checkedVal_0 = checked;
                    break;

                case '1':
                    checkedVal_1 = checked;
                    break;

                case '2':
                    checkedVal_2 = checked;
                    break;

                default:
                    break;
            }
            this.setState({checkedVal_0, checkedVal_1, checkedVal_2});
        });
    }
}

export default CompanySetUp;
