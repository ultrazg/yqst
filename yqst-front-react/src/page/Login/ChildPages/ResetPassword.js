import React, { Component } from 'react';
import { Form, Tabs, Input, Button, Row, Col } from 'antd';
import Model from '../Model';
import { qrCode } from '../../../resource'
import NextResetPassword from './NextResetPassword'
import ResetResult from './ResetResult'
import Md5 from '../../../utils/encryption/Md5';
import CheckInput from "../../../utils/checkInput/CheckInput";
import ApiConst from '../../../base/urls/ApiConst';
import TencentCaptcha from 'TencentCaptcha';

const { TabPane } = Tabs;

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            second: 60,
            hasNote: false,
            phonePar: {
                phone: '',
                code: ''
            }
        };
        this.times = '';
        this.formRef = React.createRef();
        this.SMScaptcha = new TencentCaptcha(ApiConst.CaptchaAppId,
            (res) => {
                if (res.ret) {
                    return;
                }
                const { getFieldValue, setFields } = this.formRef.current;
                let { second } = this.state;
                Model.CheckPhoneReg({
                    phone: getFieldValue('phone'),
                }, (res) => {
                    Model.SMSCertification({
                        phone: getFieldValue('phone'),
                        smsType: 3,
                    }, (cRes) => {
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
                });
            });
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        this.times && clearInterval(this.times);
    }

    render() {
        return (
            <div>
                {this.makeStepView()}
            </div>
        );
    }

    makeStepView() {
        let { hasNote, second, phonePar } = this.state;

        switch ('' + this.state.step) {
            case '3': // 重置密码的结果
                return <ResetResult
                    {...{
                        ...this.props,
                        ...this.state.phonePar,
                    }}
                    callBack={() => {
                    }}
                />;

            case '2': // 设置密码
                return <NextResetPassword
                    {...{
                        ...this.props,
                        ...this.state.phonePar,
                    }}
                    callBack={(data) => {
                        Model.ForgetPswSetPassword({
                            phone: phonePar.phone,
                            password: Md5.hex_md5(data.password),
                        }, (res) => {
                            this.setState({ step: 3 });
                        }, (err) => {
                        });
                    }}
                />;

            case '1': // 获取验证码步骤
            default:
                return <div className={'RPCss'}>
                    <div>
                        <h1>重置密码</h1>
                        <span>验证手机号后，重置登录密码</span>
                        <Form
                            ref={this.formRef}
                            autoComplete="off"
                            className={'formCss'}
                            onFinish={this.onSubmit.bind(this)}
                        >
                            <Form.Item
                                label={""}
                                name={"phone"}
                                rules={[
                                    { required: true, message: '手机号不能为空!' },
                                    ({ getFieldValue }) => ({
                                        validator(rule, value) {
                                            if (value && !CheckInput.isPhoneNumber(value)) {
                                                return Promise.reject('请输入正确的手机号！');

                                            }
                                            return Promise.resolve();
                                        },
                                    }),
                                ]}
                            >
                                <Input
                                    maxLength={11}
                                    placeholder="请输入手机号"
                                />
                            </Form.Item>
                            <div style={{ width: 1, height: 15 }} />
                            <Form.Item className={'formItem'}>
                                <Form.Item
                                    label={""}
                                    name={"code"}
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
                                //     this.props.history.push('/users/login/nextResetPassword');
                                // }}
                                >
                                    下一步
                                </Button>
                            </Form.Item>
                        </Form>
                        <div style={{ width: 1, height: 10 }} />
                        <a onClick={() => this.props.history.push('/users/login/index')}>返回登录</a>
                    </div>
                </div>
        }
    }

    onSubmit(values) {
        Model.CheckPhoneReg({ phone: values.phone }, (res) => {
            Model.verifyCode({
                phone: values.phone,
                code: values.code,
                action: 'forgetPsw',
            }, (res) => {
                this.setState({
                    phonePar: {
                        ...values
                    },
                    step: 2
                });
            });
        }, (err) => {
        });
    }
}

export default ResetPassword;
