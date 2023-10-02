/**
 * Created by liqiang on 2017/11/14.
 * 登录
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginActionType from './redux/LoginActionType';
import LoginAction from './redux/LoginAction';
import * as Res from '../../resource/resourceRef';
import { Form, Input, Button, Menu, message, Modal } from 'antd';
import LoginModel from './model/LoginModel';
import Md5 from '../../utils/encryption/Md5';
import CheckInput from "../../utils/checkInput/CheckInput";
import { UserOutlined, FormOutlined } from '@ant-design/icons';
import ApiConst from '../../base/urls/ApiConst';
import TencentCaptcha from 'TencentCaptcha';

const FormItem = Form.Item;

class Login extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     loginMode: 'loginwithcode',
        //     getCode: '获取验证码',
        //     codeSn: ''
        // }
        this.state = {};
        document.title = "";
        document.title = window.globalConfig.title + "运营中心";
        if (localStorage && localStorage.sessionKey) {
            this.stopAllTimer = true;
            // this.props.history.replace("/Pages/SoftList");
            this.props.history.replace("/Pages/CloudServeList");
        }

        this.formRef = React.createRef();
        // 实例化验证码
        this.captcha = new TencentCaptcha(ApiConst.CaptchaAppId,
            (res) => {
                if (res.ret) {
                    return;
                }
                const { userName, passWord } = this.formRef.current.getFieldsValue();

                if (CheckInput.checkInputValue(userName, "账号")) {
                    return;
                }
                if (CheckInput.checkInputValue(passWord, "密码")) {
                    return;
                }
                // if (passWord && passWord.length < 8) {
                //     return message.info('密码的长度只能在8~18个字符之间！');
                // }
                LoginModel.loginWithPsw({
                    adminName: userName ? userName : '',
                    adminPassword: passWord ? Md5.hex_md5(passWord) : '',
                },
                    (res) => {
                        if (res && res.ret === 0) {
                            // usageTimeTooLong 提示密码超过3个月以上没改
                            if (res.data.usageTimeTooLong) {
                                Modal.warning({
                                    title: '登录密码修改提示',
                                    content: '密码超过3个月以上没改，为了你的账号安全，请尽快修改',
                                    onOk: () => {
                                    },
                                    onCancel: () => {
                                    },
                                });
                            }
                            message.success("登录成功", 2);
                            localStorage.sessionKey = res.data.sessionKey;
                            localStorage.alias = res.data.alias;
                            localStorage.adminName = res.data.adminName;
                            localStorage.userId = res.data.id;
                            localStorage.userLevel = res.data.level;
                            localStorage.openId = res.data.openId;
                            // this.props.history.push("/Pages/SoftList");
                            this.props.history.push("/Pages/CloudServeList");
                        } else {
                            message.error("登录失败,请联系管理员", 2);
                        }
                    }, () => {
                    }
                );
            });
    }

    componentDidMount() {
        setTimeout(() => {
            if (window.location.href.toLowerCase().indexOf("overdue") >= 0) {
                message.info("登录过期,请重新登录");
            }
        }, 0.5 * 1000);
    }

    reset() {
        this.timer && clearInterval(this.timer);
        this.props.dispatch(LoginAction(LoginActionType.RESET_ACTION));
    }

    // getCodeSn() {
    //     LoginModel.getLoginQrCode({}, (res) => {
    //         this.props.dispatch(LoginAction(LoginActionType.SETCODESN_ACTION, res.data));
    //         this.loadCodeStatus(res.data);
    //     }, () => {
    //         this.timer_getcode = setTimeout(() => {
    //             this.getCodeSn();
    //         }, 3 * 1000);
    //     });
    // }

    // loadCodeStatus(codeSn) {
    //     LoginModel.loginWithQrCode({codeSn: codeSn}, (res) => {
    //         message.info("二维码登录成功", 2);
    //         localStorage.loginInfo = res.data;
    //         this.props.history.push("Index");
    //     }, () => {
    //         setTimeout(() => {
    //             this.loadCodeStatus(codeSn);
    //         }, 4 * 1000);
    //     });
    // }

    submit() {
        // if (this.props.LoginReducers.loginMode == 'loginwithcode') {
        //     LoginModel.loginWithCode({
        //         phone: this.phone.props.value,
        //         accountSn: this.accountSn.props.value,
        //         code: this.code.props.value,
        //     }, (res) => {
        //         message.info("登录成功", 2);
        //         this.props.history.push("Index");
        //     }, () => {
        //     });
        // } else {
        //     LoginModel.loginWithPsw({
        //         phone: this.phone.props.value,
        //         accountSn: this.accountSn.props.value,
        //         password: this.pwd.props.value,
        //     }, (res) => {
        //         message.info("登录成功", 2);
        //         this.props.history.push("Index");
        //     }, () => {
        //     });
        // }
        const { userName, passWord } = this.formRef.current.getFieldsValue();

        if (CheckInput.checkInputValue(userName, "账号")) {
            return;
        }
        if (CheckInput.checkInputValue(passWord, "密码")) {
            return;
        }
        this.captcha.show();
    }

    render() {
        return (
            <div style={{}}>
                <div style={{
                    display: 'flex',
                    height: document.documentElement.clientHeight * 0.15,
                    backgroundColor: '#fff',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingLeft: document.documentElement.clientWidth * 0.05,
                    paddingRight: document.documentElement.clientWidth * 0.05,
                }}>
                    <img
                        className={"imgContain"}
                        style={{
                            width: document.documentElement.clientHeight * 0.075,
                            height: document.documentElement.clientHeight * 0.075,
                        }} src={window.globalConfig.logo} alt='' />
                    <div style={{
                        flex: 1,
                        color: window.globalConfig.themeColor,
                        fontSize: document.documentElement.clientHeight * 0.04
                    }}>
                        &nbsp;{window.globalConfig.title}运营管理中心&nbsp;&nbsp;登录
                    </div>
                </div>
                <div style={{
                    display: 'flex',
                    height: document.documentElement.clientHeight * 0.65,
                    width: '100%',
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        position: 'fixed',
                        height: document.documentElement.clientHeight * 0.65,
                        width: '100%',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        paddingRight: document.documentElement.clientHeight * 0.05
                    }}>
                        {/*{this.props.LoginReducers.codeSn ? <div style={{*/}
                        {/*display: 'flex',*/}
                        {/*flexDirection: 'column',*/}
                        {/*alignItems: 'center',*/}
                        {/*width: document.documentElement.clientHeight * 0.25,*/}
                        {/*height: document.documentElement.clientHeight * 0.25,*/}
                        {/*}}>*/}

                        {/*<div style={{color: '#555', fontSize: document.documentElement.clientWidth * 0.01}}>*/}
                        {/*使用云企商通App 扫一扫登录*/}
                        {/*</div>*/}
                        {/*</div> : null}*/}
                        <div style={{
                            marginLeft: document.documentElement.clientHeight * 0.04,
                            marginRight: document.documentElement.clientHeight * 0.06,
                            width: document.documentElement.clientHeight * 0.5,
                            maxHeight: document.documentElement.clientHeight * 0.6,
                            backgroundColor: '#fff',
                            borderRadius: 7,
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 15,
                            boxShadow: '1px 1px 20px 1px #3332'
                        }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    marginBottom: 10,
                                }}>
                                    <Menu
                                        style={{ flex: 1 }}
                                        onClick={() => {
                                            // this.props.dispatch(LoginAction(LoginActionType.CHANGE_LOGINMODE_ACTION, this.props.LoginReducers.loginMode == 'loginwithcode' ? 'loginwithpwd' : 'loginwithcode'));
                                        }}
                                        selectedKeys={[this.props.LoginReducers.loginMode]}
                                        mode="horizontal"
                                    >
                                        {/*<Menu.Item style={{width: '50%', textAlign: 'center'}} key="loginwithcode">*/}
                                        {/*验证码登录*/}
                                        {/*</Menu.Item>*/}
                                        <Menu.Item style={{ width: '50%', textAlign: 'center' }} key="loginwithpwd">
                                            密码登录
                                        </Menu.Item>
                                    </Menu>
                                </div>
                                {this.loginForm()}
                            </div>
                        </div>
                    </div>
                    <img className={"imgCover"}
                        style={{
                            height: document.documentElement.clientHeight * 0.65,
                            width: '100%', overflow: 'hidden'
                        }} src={Res.login_bg} alt=''>
                    </img>
                </div>
                {window.globalConfig.infoDom}
            </div>
        );
    }

    loginForm() {
        return (
            <Form ref={this.formRef} style={{ padding: 5 }} className="login-form">
                {/*<FormItem>*/}
                {/*{getFieldDecorator('企业号', {*/}
                {/*rules: [{required: true, message: '请输入企业号'}],*/}
                {/*})(*/}
                {/*<Input*/}
                {/*ref={(c) => {*/}
                {/*this.accountSn = c;*/}
                {/*}}*/}
                {/*prefix={<Icon type="desktop" style={{fontSize: 13}}/>}*/}
                {/*placeholder="企业号"/>*/}
                {/*)}*/}
                {/*</FormItem>*/}
                <FormItem
                    label={'账号'}
                    name={'userName'}
                    rules={[{ required: true, message: '请输入账号' }]}
                >
                    <Input
                        ref={(c) => {
                            this.phone = c;
                        }}
                        prefix={<UserOutlined style={{ fontSize: 13 }} />}
                        placeholder="账号"
                    />
                </FormItem>
                <div style={{ padding: '7px 0px' }} />
                {this.props.LoginReducers.loginMode == 'loginwithpwd' ?
                    <FormItem
                        label={'密码'}
                        name={'passWord'}
                        rules={[{ required: true, message: '请输入密码' }]}
                    >
                        <Input
                            ref={(c) => {
                                this.pwd = c;
                            }}
                            prefix={<FormOutlined style={{ fontSize: 13 }} />}
                            type="password"
                            placeholder="密码"
                            onPressEnter={() => {
                                this.submit()
                            }}
                            maxLength={18}
                        />
                    </FormItem> :
                    <FormItem label={'验证码'} rules={[{ required: true, message: '请输入验证码' }]}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Input
                                ref={(c) => {
                                    this.code = c;
                                }}
                                prefix={<FormOutlined style={{ fontSize: 13 }} />}
                                type="password"
                                placeholder="验证码"
                            />

                            <div style={{ width: 5 }} />
                            <Button
                                type="primary"
                                className="login-form-button"
                                disabled={this.props.LoginReducers.getCode != '获取验证码'}
                                onClick={() => {
                                    if (this.props.LoginReducers.getCode == '获取验证码') {
                                        // LoginModel.getLoginQrCode()
                                        this.timer = setInterval(() => {
                                            if (this.props.LoginReducers.getCode == 0) {
                                                this.props.dispatch(LoginAction(LoginActionType.CHANGE_CODE_TEXT_ACTION, '获取验证码'));
                                            } else {
                                                this.props.dispatch(LoginAction(LoginActionType.CHANGE_CODE_TEXT_ACTION, this.props.LoginReducers.getCode - 1));
                                            }
                                        }, 1000);
                                        this.props.dispatch(LoginAction(LoginActionType.CHANGE_CODE_TEXT_ACTION, 59));
                                    }
                                }}
                            >
                                {this.props.LoginReducers.getCode}
                            </Button>
                        </div>
                    </FormItem>}
                <div style={{ padding: '7px 0px' }} />
                <Button
                    onClick={() => {
                        this.submit();
                    }}
                    style={{ width: '100%' }} type="primary" className="login-form-button">
                    登录
                </Button>
            </Form>
        );
    }
}

const LoginPage = Login;

function mapStateToProps(state) {
    const { LoginReducers } = state;
    return {
        LoginReducers
    }
}

export default connect(mapStateToProps)(LoginPage)
