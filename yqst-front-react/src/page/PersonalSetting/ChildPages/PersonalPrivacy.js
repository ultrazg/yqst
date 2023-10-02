import React, {Component} from 'react';
import {Row, Col, Switch, message} from 'antd';
import Model from "../Model";


class PersonalPrivacy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
    }

    componentDidMount() {
        this.getDefaultValue()
    }

    componentWillUnmount() {

    }

    getDefaultValue = () => {
        Model.UserPrivacyCInfo({}, res => {
            this.setState({data: res.data})
        })
    }

    switchChange = (checked, filed) => {
        let {data} = this.state;
        data[filed] = checked ? 1 : 0;

        Model.UserPrivacyCUpdate({
            ...data,
        }, res => {
            message.success('修改成功');
            this.getDefaultValue()
        })
    }

    render() {
        const {data} = this.state;
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
                >隐私</h1>
                <Row style={{color: 'rgba(43,52,65,0.65)', marginBottom: '24px'}}>
                    <Col span={20}>
                        <h3 style={{color: '#2B3441', fontSize: '14px', marginBottom: '4px'}}>可通过手机号搜索到我</h3>
                        其他用户可通过准确的手机号搜索到我，对方只能看到我的昵称及{window.globalConfig.title}账号
                    </Col>
                    <Col span={4} style={{lineHeight: '46px', textAlign: 'right'}}>
                        <Switch
                            className={'Switch'}
                            checked={'' + data.isFoundByPhone === '1'}
                            onChange={(checked) => this.switchChange(checked, 'isFoundByPhone')}
                        />
                    </Col>
                </Row>
                <Row style={{color: 'rgba(43,52,65,0.65)', marginBottom: '24px'}}>
                    <Col span={20}>
                        <h3 style={{color: '#2B3441', fontSize: '14px', marginBottom: '4px'}}>可通过邮箱搜索到我</h3>
                        其他用户可通过准确的邮箱搜索到我，对方只能看到我的昵称及{window.globalConfig.title}账号
                    </Col>
                    <Col span={4} style={{lineHeight: '46px', textAlign: 'right'}}>
                        <Switch
                            className={'Switch'}
                            checked={'' + data.isFoundByEmail === '1'}
                            onChange={(checked) => this.switchChange(checked, 'isFoundByEmail')}
                        />
                    </Col>
                </Row>
                <Row style={{color: 'rgba(43,52,65,0.65)', marginBottom: '24px'}}>
                    <Col span={20}>
                        <h3 style={{color: '#2B3441', fontSize: '14px', marginBottom: '4px'}}>向联系人隐藏真实姓名</h3>
                        开启后，将对有查看我个人信息权限的联系人隐藏真实姓名
                    </Col>
                    <Col span={4} style={{lineHeight: '46px', textAlign: 'right'}}>
                        <Switch
                            onChange={(checked) => this.switchChange(checked, 'isHideName')}
                            className={'Switch'}
                            checked={'' + data.isHideName === '1'}
                        />
                    </Col>
                </Row>
                <Row style={{color: 'rgba(43,52,65,0.65)', marginBottom: '24px'}}>
                    <Col span={20}>
                        <h3 style={{color: '#2B3441', fontSize: '14px', marginBottom: '4px'}}>对联系人显示完整手机号</h3>
                        开启后，将对有查看我个人信息权限的联系人显示完整手机号；关闭则将隐藏中间四位
                    </Col>
                    <Col span={4} style={{lineHeight: '46px', textAlign: 'right'}}>
                        <Switch
                            onChange={(checked) => this.switchChange(checked, 'isShowPhone')}
                            className={'Switch'}
                            checked={'' + data.isShowPhone === '1'}
                        />
                    </Col>
                </Row>
                <Row style={{color: 'rgba(43,52,65,0.65)'}}>
                    <Col span={20}>
                        <h3 style={{color: '#2B3441', fontSize: '14px', marginBottom: '4px'}}>添加我为联系人时需要验证</h3>
                        开启后，其他用户添加我为联系人时需要我验证；关闭则将自动通过并成为我的联系人
                    </Col>
                    <Col span={4} style={{lineHeight: '46px', textAlign: 'right'}}>
                        <Switch
                            className={'Switch'}
                            checked={'' + data.isVerify === '1'}
                            onChange={(checked) => this.switchChange(checked, 'isVerify')}
                        />
                    </Col>
                </Row>
                {/*<Row style={{color: 'rgba(43,52,65,0.65)'}}>
                    <Col span={20}>
                        <h3 style={{color: '#2B3441', fontSize: '14px', marginBottom: '4px'}}>接受消息推送</h3>
                        开启后，将接受所有消息的推送
                    </Col>
                    <Col span={4} style={{lineHeight: '46px', textAlign: 'right'}}>
                        <Switch
                            className={'Switch'}
                            checked={'' + data.isVerify === '1'}
                        />
                    </Col>
                </Row>*/}
            </div>
        );
    }
}

export default PersonalPrivacy;
