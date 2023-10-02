import React, { Component } from 'react';
import { Form, Tabs, Input, Button, Row, Col } from 'antd';
import { head } from '../../../resource'
import Model from "../Model";
import TencentCaptcha from 'TencentCaptcha';
import ApiConst from '../../../base/urls/ApiConst';

const { TabPane } = Tabs;

class SetUpNumber extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasNote: false,
            second: 60,
        };
        this.times = '';
        this.formRef = React.createRef();
        this.SMScaptcha = new TencentCaptcha(ApiConst.CaptchaAppId,
            (res) => {
                if (res.ret) {
                    return;
                }
                const { setFields, getFieldValue } = this.formRef.current;
                let { second } = this.state;
                Model.CheckPhone({
                    phone: getFieldValue('phone')
                }, (res) => {
                    Model.SMSCertification({
                        phone: getFieldValue('phone'),
                        smsType: 4,
                    }, (res) => {
                        this.setState({ hasNote: true }, () => {
                            this.times = setInterval(() => {
                                this.setState({ second: --second }, () => {
                                    if (second <= 0) {
                                        clearInterval(this.times);
                                        this.setState({ hasNote: false, second: 60 });
                                    }
                                });
                            }, 1000);
                        });
                    }, (err) => {
                    });

                }, (err) => {
                    setFields([{
                        name: 'number',
                        value: getFieldValue('number'),
                        errors: ['该手机号已被注册，请重新输入手机号！'],
                    }]);
                });
            });
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        const { comData } = this.props;
        let { hasNote, second } = this.state;

        return (
            <div className={'SUNCss'}>
                <h1>
                    <div>
                        <img src={comData.companyLogo} alt="" />
                        <span>{comData.companyName}</span>
                    </div>
                </h1>
                <div>
                    <h2>创建您的个人账号，加入企业</h2>
                    <Form
                        ref={this.formRef}
                        autoComplete="off"
                        className={'formCss'}
                        onFinish={this.onSubmit.bind(this)}
                    >
                        <Form.Item
                            label={''}
                            name={'phone'}
                            rules={[
                                { required: true, message: '手机号不能为空!' }
                            ]}
                        >
                            <Input
                                maxLength={11}
                                placeholder="请输入手机号"
                            />
                        </Form.Item>
                        <div style={{ width: 1, height: 15 }} />
                        <Form.Item>
                            <Form.Item
                                className={'formItem'}
                                label={''}
                                name={'code'}
                                rules={[
                                    { required: true, message: '短信验证码不能为空!' }
                                ]}
                            >
                                <Input
                                    maxLength={8}
                                    placeholder={'短信验证码'}
                                />
                            </Form.Item>
                            <a onClick={() => {
                                const { getFieldValue, setFields } = this.formRef.current;
                                if (hasNote) return false;
                                if (!getFieldValue('phone') || getFieldValue('phone').length < 11) {
                                    setFields([{
                                        name: 'phone',
                                        value: getFieldValue('phone'),
                                        errors: ['请输入正确的手机号'],
                                    }]);
                                    return false;
                                }
                                this.SMScaptcha.show();
                            }}>{!hasNote ? '获取短信验证码' : `${second} s`}</a>
                        </Form.Item>
                        <div style={{ width: 1, height: 15 }} />
                        <Form.Item>
                            <Button type="primary" htmlType="submit"
                            // onClick={() => {
                            //     this.props.history.push(`/users/login/setPassword?key=${true}`);
                            // }}
                            >
                                创建
                            </Button>
                        </Form.Item>
                    </Form>
                    <div style={{ width: 1, height: 10 }} />
                    <a onClick={() => this.props.history.push('/users/login/index')}>返回登录</a>
                </div>
            </div>
        );
    }

    onSubmit(values) {
        Model.CheckPhone({
            phone: values.phone
        }, (res) => {
            this.props.callBack && this.props.callBack(values);

        }, (err) => {
            const { setFields, getFieldValue } = this.formRef.current;
            setFields([{
                name: 'phone',
                value: getFieldValue('phone'),
                errors: ['该手机号已被注册，请重新输入手机号！'],
            }]);
        });
    }
}

export default SetUpNumber;
