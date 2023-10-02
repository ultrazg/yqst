import React, {Component} from 'react';
import {Form, Tabs, Input, Button, Row, Col, message} from 'antd';
import {head} from '../../../resource'
import CheckInput from '../../../utils/checkInput/CheckInput'

const {TabPane} = Tabs;

class SetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false
        };
        this.formRef = React.createRef();
    }

    componentDidMount() {
    }

    componentWillUnmount() {

    }

    render() {
        const {step, comData} = this.props;

        return (
            <div className={'SPCss'}>
                <h1>
                    {
                        '3' === '' + step ? '注册' : <div>
                            <img src={comData.companyLogo} alt=""/>
                            <span>{comData.companyName}</span>
                        </div>
                    }
                </h1>
                <div>
                    <h2>设置密码</h2>
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
                                () => ({
                                    validator(rule, value) {
                                        if (value && value.length < 8) {
                                            return Promise.reject('密码的长度只能在8~18个字符之间！');
                                        }
                                        if (value && !CheckInput.checkPsw(value)) {
                                            return Promise.reject('请输入合适的8位到18位密码');
                                        } else if (value && CheckInput.checkPswSameKind(value)) {
                                            return Promise.reject('密码需包含以下两种类型，大小写字母、数字、特殊字符');
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
                            className={'formItem'}
                            label={''}
                            name={'confirm'}
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
                                placeholder={'请再次输入密码'}
                            />
                        </Form.Item>
                        <div style={{width: 1, height: 5}}/>
                        <div style={{color: '#999', fontSize: 10, width: 340}}>
                            {"8位到18位密码，密码需包含以下类型的两种，大小字母、数字、特殊字符只能是\~\!\@\#\$\%\^\&\*\(\)\[\]\{\}\<\>\_\=\:\.\,\'\"\+\-\;\|\/\\"}
                        </div>
                        <Form.Item>
                            <Button type="primary" htmlType="submit"
                                // onClick={() => {
                                //     this.props.history.push('/users/login/registerResult');
                                // }}
                            >
                                完成
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

export default SetPassword;
