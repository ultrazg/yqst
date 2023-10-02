import React, {Component} from 'react';
import {Form, Tabs, Input, Button, Row, Col, message} from 'antd';
import SetPassword from './SetPassword';
import RegisterResult from './RegisterResult';
import SetUpNumber from './SetUpNumber';
import StaffName from './StaffName';
import SetPasswordRes from './SetPasswordRes';
import Model from "../Model";
import Md5 from '../../../utils/encryption/Md5';
import CheckInput from '../../../utils/checkInput/CheckInput';
import TencentCaptcha from 'TencentCaptcha';
import ApiConst from '../../../base/urls/ApiConst';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 1=手机号注册；3=手机号注册_设置密码；5=手机号注册_设置密码_注册完成；

            // 2=邀请码注册；4=邀请码注册_手机获取短信；6=邀请码注册_手机获取短信_设置密码；8=邀请码注册_手机获取短信_设置密码_成功页面
            step: 1,
            repeatPhone: false,
            hasNote: false,
            second: 60,
            phonePar: {
                phone: '',
                code: '',
                password: '',
            },
            invitePar: {
                inviteCode: '',
                phone: '',
                code: '',
                password: '',
                comData: {},
                staffName: '',
                remark: '',
            }
        };
        this.times = '';
        this.formRef = React.createRef();
        this.SMScaptcha = new TencentCaptcha(ApiConst.CaptchaAppId,
            (res) => {
                if (res.ret) {
                    return;
                }
                const {setFields, getFieldValue} = this.formRef.current;
                let {second} = this.state;
                Model.CheckPhone({
                    phone: getFieldValue('number')
                }, (res) => {
                    Model.SMSCertification({
                        phone: getFieldValue('number'),
                        smsType: 1,

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
                    setFields([{
                        name: 'number',
                        value: getFieldValue('number'),
                        errors: [err.msg ? err.msg : '该手机号已被注册，请重新输入手机号！'],
                    }]);
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
                    this.switchView()
                }
            </div>
        );
    }

    switchView() {
        let {phonePar, invitePar} = this.state;

        switch ('' + this.state.step) {
            case '1': // 手机号注册
            case '2': // 邀请码注册
                return this.makeBaseView();

            case '3': // 手机号注册_设置密码
                return <SetPassword
                    {...{
                        step: this.state.step,
                        ...this.props
                    }}
                    callBack={(res) => {
                        phonePar.password = Md5.hex_md5(res.password);
                        Model.SetPassword({
                            phone: phonePar.phone,
                            password: phonePar.password,
                        }, (res) => {

                            // 调用登录接口
                            Model.Login({
                                phone: phonePar.phone,
                                password: phonePar.password,
                            }, (res) => {
                                localStorage.loginMes = res.data ? JSON.stringify(res.data) : null;

                                this.setState({step: 5});
                                // message.success('注册成功！');
                                // setTimeout(() => {
                                //     this.props.history.push('/users/login/index');
                                // }, 600);

                            }, (err) => {
                            });

                        }, (err) => {
                        });
                    }}
                />;

            case '4': // 4=邀请码注册_填写员工名称和备注_手机获取短信；
                return <SetUpNumber
                    {
                        ...{
                            ...invitePar,
                            ...this.props,
                        }
                    }
                    callBack={(data) => {
                        this.setState({
                            invitePar: {
                                ...invitePar,
                                ...data
                            },
                            step: 6,
                        });
                    }}
                />;

            case '10': // 10=邀请码注册_填写员工名称和备注；
                return <StaffName
                    {
                        ...{
                            ...invitePar,
                            ...this.props,
                        }
                    }
                    callBack={(data) => {
                        this.setState({
                            invitePar: {
                                ...invitePar,
                                ...data
                            },
                            step: 4,
                        });
                    }}
                />;

            case '5': // 手机号注册_设置密码_注册完成
                let loginMes = localStorage.loginMes ? JSON.parse(localStorage.loginMes) : null
                //帐号状态
                // -1  没企业
                // 0   有未激活企业
                // 1   帐套正常
                // 2   帐套禁用
                switch (loginMes.accountStatus) {
                    case -1:
                        return <RegisterResult
                            {
                                ...this.props
                            }
                            callBack={() => {
                            }}
                        />;
                    case 0:
                    case 1:
                        this.props.history.push(`/users/setUpCompany/index?step=3`);
                        break;
                    case 2:
                        break;
                    default:
                        break;
                }

            case '6': // 6=邀请码注册_填写员工名称和备注_手机获取短信_设置密码
                return <SetPassword
                    {
                        ...{
                            ...this.props,
                            ...invitePar
                        }
                    }
                    callBack={(data) => {
                        // 注册并绑定（企业邀请码注册员工时使用）
                        Model.CodeRegister({
                            phone: invitePar.phone,
                            pwd: Md5.hex_md5(data.password),
                            code: invitePar.inviteCode,
                            staffName: invitePar.staffName,
                            remark: invitePar.remark,
                        }, (res) => {

                            // 调用登录接口
                            Model.Login({
                                phone: invitePar.phone,
                                password: Md5.hex_md5(data.password),
                            }, (res) => {
                                message.success('注册成功！');
                                setTimeout(() => {
                                    this.props.history.push('/users/login/index');
                                }, 600);

                                // this.setState({step: 8});

                            }, (err) => {
                            });
                        }, (err) => {
                        });
                    }}
                />;

            case '8': // 8=邀请码注册_填写员工名称和备注_手机获取短信_设置密码_成功页面
                return <SetPasswordRes
                    {
                        ...this.props
                    }
                    callBack={() => {
                    }}
                />;

            default:
                return this.makeBaseView();
        }
    }

    makeBaseView() {
        let {step, hasNote, second, repeatPhone} = this.state;

        return <div className={'RegisterCss'}>
            <h1>注册</h1>
            <div>
                <div className={'1' === '' + step ? 'tabs' : 'tabs onTabs'}>
                    <span className={'1' === '' + step ? 'onSpan' : ''} onClick={() => {
                        this.setState({step: 1}, () => {
                            const {resetFields} = this.formRef.current;
                            resetFields();
                        });
                    }}>手机号注册</span>
                    <span className={'2' === '' + step ? 'onSpan' : ''} onClick={() => {
                        this.setState({step: 2}, () => {
                            const {resetFields} = this.formRef.current;
                            resetFields();
                        });
                    }}>邀请码注册</span>
                </div>
                <Form ref={this.formRef} autoComplete="off" className={'formCss'} onFinish={this.onSubmit.bind(this)}>
                    <Form.Item
                        label={""}
                        name={"number"}
                        rules={[
                            {required: true, message: '1' === '' + step ? '手机号不能为空!' : '邀请码不能为空！'},
                            () => ({
                                validator(rule, value) {
                                    if ('1' === '' + step && value && !CheckInput.isPhoneNumber(value)) {
                                        return Promise.reject('请输入正确的手机号！');
                                    }
                                    return Promise.resolve();
                                },
                            }),
                        ]}
                    >
                        <Input
                            maxLength={11}
                            placeholder={'1' === '' + step ? '请输入手机号' : '请输入邀请码'}
                        />
                    </Form.Item>
                    <div style={{width: 1, height: 15}}/>
                    <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) => '2' === '' + step}
                    >
                        {({getFieldValue}) => {
                            return '1' === '' + step ? <Form.Item className={'formItem'}>
                                <Form.Item
                                    name={"code"}
                                    label={""}
                                    rules={[{required: true, message: '短信验证码不能为空!'}]}
                                >
                                    <Input
                                        maxLength={8}
                                        placeholder={'短信验证码'}
                                    />
                                </Form.Item>
                                {
                                    '1' === '' + step && <a onClick={() => {
                                        const {setFields} = this.formRef.current;
                                        if (hasNote) return false;
                                        if (!getFieldValue('number') || getFieldValue('number').length < 11) {
                                            setFields([{
                                                name: 'number',
                                                value: getFieldValue('number'),
                                                errors: ['请输入正确的手机号'],
                                            }]);
                                            return false;
                                        }
                                        this.SMScaptcha.show();
                                    }}>{!hasNote ? '获取短信验证码' : `${second} s`}</a>
                                }
                            </Form.Item> : null;
                        }}
                    </Form.Item>
                    <div style={{width: 1, height: 15}}/>
                    <Form.Item>
                        <Button type="primary" htmlType="submit"
                            // onClick={() => {
                            //     if('1' === '' + step)
                            //         this.props.history.push('/users/login/setPassword');
                            //     else
                            //         this.props.history.push('/users/login/setUpNumber');
                            // }}
                        >
                            注册
                        </Button>
                    </Form.Item>
                </Form>
                <div style={{width: 1, height: 10}}/>
                <Row className={'regTxt'}>
                    <Col span={12}>
                        <a onClick={() => {
                            this.props.history.push('/users/login/index');
                        }}>返回登录</a>
                    </Col>
                </Row>
            </div>
        </div>
    }

    checkValidator(rule, value, callback) {
        if ('1' === '' + this.state.step) {
            if (value && !CheckInput.isPhoneNumber(value)) {
                callback('请输入正确的手机号！');
                return false;
            }
        }
        callback();
    }

    onSubmit(values) {
        let checkPar = ['number', 'code'], {step, phonePar, invitePar} = this.state;
        const {setFields, getFieldValue} = this.formRef.current;
        if ('2' === '' + step)
            checkPar = ['number'];

        if ('1' === '' + step) {
            // 校验手机
            Model.CheckPhone({
                phone: values.number
            }, (res) => {
                // 校验验证码
                Model.verifyCode({
                    phone: values.number,
                    code: values.code,
                    action: '',
                }, (res) => {
                    phonePar.phone = values.number;
                    phonePar.code = values.code;
                    this.setState({
                        step: 3,
                        phonePar,
                    });
                });

            }, (err) => {
                setFields([{
                    name: 'number',
                    value: getFieldValue('number'),
                    errors: ['该手机号已被注册，请输入新的手机号！'],
                }]);
            });

        } else {
            invitePar.inviteCode = values.number;
            Model.ScanQrCode({
                codeSn: values.number
            }, (res) => {
                if ('' + res.data.scanType === 'none') {
                    setFields([{
                        name: 'number',
                        value: getFieldValue('number'),
                        errors: ['无效邀请码，请重新输入！']
                    }]);
                    return false;
                }
                invitePar.comData = res.data;

                this.setState({
                    step: 10,
                    invitePar,
                });
            }, (err) => {
            });
        }
        this.times && clearInterval(this.times);
    }
}

export default Register;
