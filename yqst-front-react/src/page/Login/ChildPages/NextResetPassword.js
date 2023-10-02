import React, {Component} from 'react';
import {Form, Tabs, Input, Button, Row, Col} from 'antd';
import {qrCode} from '../../../resource'
import CheckInput from "../../../utils/checkInput/CheckInput";

const {TabPane} = Tabs;

class NextResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.formRef = React.createRef();
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className={'NRPCss'}>
                <div>
                    <h1>重置密码</h1>
                    <Form
                        ref={this.formRef}
                        autoComplete="off"
                        className={'formCss'}
                        onFinish={this.onSubmit.bind(this)}
                    >
                        <Form.Item
                            label={''}
                            name={'password'}
                            rules={[
                                {required: true, message: '密码不能为空!'},
                                ({validateFields}) => ({
                                    validator(rule, value) {
                                        if (value && value.length < 8) {
                                            return Promise.reject('密码的长度只能在8~18个字符之间！');
                                        }
                                        if (value && !CheckInput.checkPsw(value)) {
                                            return Promise.reject('密码格式有误，请重新输入！');
                                        }
                                        if (value && CheckInput.checkPswSameKind(value)) {
                                            return Promise.reject('密码需包含以下两种类型，大小写字母、数字、特殊字符！');
                                        }
                                        return Promise.resolve();
                                    },
                                }),
                            ]}
                        >
                            <Input
                                maxLength={18}
                                type={'password'}
                                placeholder="请输入密码(8-18位密码，区分大小写)"
                            />
                        </Form.Item>
                        <div style={{width: 1, height: 15}}/>
                        <Form.Item
                            label={''}
                            name={'confirm'}
                            className={'formItem'}
                            dependencies={['password']}
                            rules={[
                                {required: true, message: '密码不能为空!'},
                                ({getFieldValue}) => ({
                                    validator(rule, value) {
                                        if (value && value !== getFieldValue('password')) {
                                            return Promise.reject('两次密码不一致，请重新填写密码!');

                                        }
                                        return Promise.resolve();
                                    },
                                }),
                            ]}
                        >
                            <Input
                                maxLength={18}
                                type={'password'}
                                placeholder={'请在此输入密码'}
                            />
                        </Form.Item>
                        <div style={{width: 1, height: 5}}/>
                        <div style={{color: '#999', fontSize: 10, width: 340}}>
                            {"8位到18位密码，密码需包含以下类型的两种，大小字母、数字、特殊字符只能是\~\!\@\#\$\%\^\&\*\(\)\[\]\{\}\<\>\_\=\:\.\,\'\"\+\-\;\|\/\\"}
                        </div>
                        <Form.Item>
                            <Button type="primary" htmlType="submit"
                                // onClick={() => {
                                //     this.props.history.push('/users/login/resetResult');
                                // }}
                            >
                                确认重置
                            </Button>
                        </Form.Item>
                    </Form>
                    <div style={{width: 1, height: 10}}/>
                    <a onClick={() => this.props.history.push('/users/login/index')}>返回登录</a>
                </div>
            </div>
        );
    }

    onSubmit(values) {
        this.props.callBack && this.props.callBack({password: values.password});
    }
}

export default NextResetPassword;
