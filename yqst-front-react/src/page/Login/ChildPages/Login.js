import React, {Component} from 'react';
import {Form, Tabs, Input, Button, Row, Col, message, Modal} from 'antd';
import {qrCode} from '../../../resource'
import Model from '../Model'
import ScanLogin from './ScanLogin'
import Md5 from '../../../utils/encryption/Md5';
import CheckInput from '../../../utils/checkInput/CheckInput';
import TencentCaptcha from 'TencentCaptcha';
import ApiConst from '../../../base/urls/ApiConst';

const {TabPane} = Tabs;

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: '密码登录',
            key: 1,
            hasNote: false,
            second: 60,
        };
        this.times = '';
        this.formRef = React.createRef();
        if (localStorage && localStorage.sessKey) {
            this.stopAllTimer = true;
            this.props.history.replace('/pages/home');
            // this.props.history.push('/pages/home');
        }
        this.SMScaptcha = new TencentCaptcha(ApiConst.CaptchaAppId,
            (res) => {
                if (res.ret) {
                    return;
                }
                const {setFields, getFieldValue} = this.formRef.current;
                let {second} = this.state;
                // 先检测手机号是否用过
                Model.CheckPhoneReg({
                    phone: getFieldValue('phones'),
                }, (res) => {

                    // 再请求发送验证码
                    Model.SMSCertification({
                        phone: getFieldValue('phones'),
                        smsType: 2,
                    }, (res) => {
                        this.setState({hasNote: true}, () => {
                            this.times = setInterval(() => {
                                this.setState({second: --second}, () => {
                                    if (second <= 0) {
                                        clearInterval(this.times);
                                        this.setState({hasNote: false, second: 60});
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
                {
                    '扫码登录' === this.state.type ? <ScanLogin
                        {
                            ...this.props
                        }
                        callBack={() => {
                            this.setState({type: '密码登录'});
                        }}
                    /> : this.makeBaseView()
                }
            </div>
        );
    }

    makeBaseView() {
        let {key, hasNote, second} = this.state;

        return <div className={'LoginCss'}>
            <img src={qrCode} alt="" title={'扫码登录'} onClick={() => {
                // this.props.history.push('/users/login/scanLogin');
                this.setState({type: '扫码登录'});
            }}/>
            <h1>登录</h1>
            <div>
                <div className={'1' === '' + key ? 'tabs' : 'tabs onTabs'}>
                    <span className={'1' === '' + key ? 'onSpan' : ''} onClick={() => {
                        this.setState({key: 1}, () => {
                            const {setFieldsValue, setFields} = this.formRef.current;
                            setFieldsValue({numbers: ''});
                            setFields([{
                                name: 'numbers',
                                value: '',
                                errors: [null],
                            }]);
                        });
                    }}>验证码登录</span>
                    <span className={'2' === '' + key ? 'onSpan' : ''} onClick={() => {
                        this.setState({key: 2}, () => {
                            const {setFieldsValue, setFields} = this.formRef.current;
                            setFieldsValue({numbers: ''});
                            setFields([{
                                name: 'numbers',
                                value: '',
                                errors: [null],
                            }]);
                        });
                    }}>密码登录</span>
                </div>
                <Form ref={this.formRef} autoComplete="off" className={'formCss'} onFinish={this.onSubmit.bind(this)}>
                    <Form.Item
                        label=""
                        name="phones"
                        rules={[
                            {required: true, message: '手机号不能为空!'},
                            ({getFieldValue}) => ({
                                validator(rule, value) {
                                    if (value && CheckInput.checkPhone(value, false)) {
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
                    <div style={{width: 1, height: 15}}/>
                    <Form.Item className={'formItem'} labelCol={{offset: 4}} wrapperCol={{span: 10}}>
                        <Form.Item
                            label={""}
                            name={"numbers"}
                            rules={[
                                {required: true, message: '2' === '' + key ? '密码不能为空' : '短信验证码不能为空!'},
                            ]}
                        >
                            <Input
                                maxLength={'2' === '' + key ? 18 : 10}
                                type={'2' === '' + key ? 'password' : 'input'}
                                placeholder={'1' === '' + key ? '短信验证码' : '请输入密码'}
                            />
                        </Form.Item>
                        {
                            '1' === '' + key && <a onClick={() => {
                                const {getFieldValue, setFields} = this.formRef.current;
                                if (hasNote) return false;
                                if (!getFieldValue('phones') || getFieldValue('phones').length < 11) {
                                    setFields([{
                                        name: 'phones',
                                        value: getFieldValue('phones'),
                                        errors: ['请输入正确的手机号'],
                                    }]);
                                    return false;
                                }
                                this.SMScaptcha.show();

                            }}>{!hasNote ? '获取短信验证码' : `${second} s`}</a>
                        }
                    </Form.Item>
                    <div style={{width: 1, height: 15}}/>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
                <div style={{width: 1, height: 10}}/>
                <Row className={'regTxt'}>
                    <Col span={12}>
                        <a onClick={() => this.props.history.push('/users/login/register')}>注册</a>
                    </Col>
                    {
                        '2' === '' + key && <Col span={12} style={{textAlign: 'right'}}>
                            <a onClick={() => this.props.history.push('/users/login/resetPassword')}>忘记密码</a>
                        </Col>
                    }
                </Row>
            </div>
        </div>
    }

    onSubmit(values) {
        let {key} = this.state;
        // 验证码登录
        if ('1' === '' + key) {
            Model.LoginCode({
                phone: values.phones,
                code: values.numbers,
            }, (res) => {
                this.stopAllTimer = true;
                localStorage.loginMes = res.data ? JSON.stringify(res.data) : null;

                setTimeout(() => {
                    this.props.history.push('/users/setUpCompany/index');
                }, 10);

                // // accountStatus 帐号状态 -1:未创建 1：正在创建中 2：创建成功 3：禁用4：创建失败
                // if (res.data.accountStatus == 2) {
                //     message.success('登录成功！');
                //     localStorage.accountSn = res.data.accountSn;
                //     localStorage.accountStatus = res.data.accountStatus;
                //     localStorage.admin = res.data.admin;
                //     localStorage.domain = res.data.domain;
                //     localStorage.erpSessionId = res.data.erpSessionId;
                //     localStorage.groupSet = JSON.stringify(res.data.groupSet);
                //     localStorage.isCerti = res.data.isCerti;
                //     localStorage.isSetPsw = res.data.isSetPsw;
                //     localStorage.loginName = res.data.loginName;
                //     localStorage.logo = res.data.logo;
                //     localStorage.phone = res.data.phone;
                //     localStorage.sessKey = res.data.sessKey;
                //     localStorage.staffName = res.data.staffName;
                //     localStorage.type = res.data.type;
                //     localStorage.uid = res.data.uid;
                //     localStorage.userAlias = res.data.userAlias;
                //     localStorage.userEmail = res.data.userEmail;
                //     localStorage.userId = res.data.userId;
                //     localStorage.userAlias = res.data.userAlias;
                //     localStorage.userNo = res.data.userNo;
                //     localStorage.userPhoto = res.data.userPhoto;
                //     localStorage.openId = res.data.openId;
                //     localStorage.company = res.data.company;
                //     setTimeout(() => {
                //         this.props.history.push('/pages/home');
                //     }, 600);
                //
                // // 还未创建企业
                // } else if('-1' === '' + res.data.accountStatus){
                //     message.success('登录成功！');
                //     setTimeout(() => {
                //         this.props.history.push('/users/login/registerResult');
                //     }, 600);
                //
                // // 其它情况
                // }else {
                //     Modal.error({
                //         title: ((() => {
                //             switch (res.data.accountStatus) {
                //                 case -1:
                //                     return '未创建企业或加入企业,请到APP操作后再登录';
                //                 case 1:
                //                     return '正在创建中,请稍后再试';
                //                 case 3:
                //                     return '账号被禁用,请稍后再试';
                //                 case 4:
                //                     return '账号异常,请稍后再试';
                //                 default:
                //                     return '';
                //             }
                //         })())
                //     });
                // }

            }, (err) => {
            });

        } else {
            if (values.numbers && values.numbers.length < 8) {
                return message.info('密码的长度只能在8~18个字符之间！');
            }
            // 密码登录
            Model.Login({
                phone: values.phones,
                password: Md5.hex_md5(values.numbers),
            }, (res) => {
                this.stopAllTimer = true;
                localStorage.loginMes = res.data ? JSON.stringify(res.data) : null;

                setTimeout(() => {
                    this.props.history.push('/users/setUpCompany/index');
                }, 10);
                // // accountStatus 帐号状态 -1:未创建 1：正在创建中 2：创建成功 3：禁用4：创建失败
                // if (res.data.accountStatus == 2) {
                //     message.success('登录成功！');
                //     localStorage.accountSn = res.data.accountSn;
                //     localStorage.accountStatus = res.data.accountStatus;
                //     localStorage.admin = res.data.admin;
                //     localStorage.domain = res.data.domain;
                //     localStorage.erpSessionId = res.data.erpSessionId;
                //     localStorage.groupSet = JSON.stringify(res.data.groupSet);
                //     localStorage.isCerti = res.data.isCerti;
                //     localStorage.isSetPsw = res.data.isSetPsw;
                //     localStorage.loginName = res.data.loginName;
                //     localStorage.logo = res.data.logo;
                //     localStorage.phone = res.data.phone;
                //     localStorage.sessKey = res.data.sessKey;
                //     localStorage.staffName = res.data.staffName;
                //     localStorage.type = res.data.type;
                //     localStorage.uid = res.data.uid;
                //     localStorage.userAlias = res.data.userAlias;
                //     localStorage.userEmail = res.data.userEmail;
                //     localStorage.userId = res.data.userId;
                //     localStorage.userAlias = res.data.userAlias;
                //     localStorage.userNo = res.data.userNo;
                //     localStorage.userPhoto = res.data.userPhoto;
                //     localStorage.openId = res.data.openId;
                //     setTimeout(() => {
                //         this.props.history.push('/users/login/index');
                //     }, 600);
                // } else {
                //     Modal.error({
                //         title: ((() => {
                //             switch (res.data.accountStatus) {
                //                 case -1:
                //                     return '未创建企业或加入企业,请到APP操作后再登录';
                //                 case 1:
                //                     return '正在创建中,请稍后再试';
                //                 case 3:
                //                     return '账号被禁用,请稍后再试';
                //                 case 4:
                //                     return '账号异常,请稍后再试';
                //                 default:
                //                     return '';
                //             }
                //         })())
                //     });
                // }

            }, (err) => {
            });
        }
    }
}

export default Login;
