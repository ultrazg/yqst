import React, {Component, Fragment} from 'react';

import {Form, Row, Col, Input, message, Modal} from 'antd';
import Md5 from "../../../utils/encryption/Md5";
import Model from "../Model";
import CheckInput from "../../../utils/checkInput/CheckInput";

class AccountAndSecurity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <Fragment>
                <div style={{padding: '30px 32px 24px'}}>
                    <h1
                        style={{
                            fontSize: '20px',
                            color: '#2B3441',
                            marginBottom: '24px',
                            paddingBottom: '24px',
                            borderBottom: '1px solid rgba(43,52,65,0.09)'
                        }}
                    >账号与安全</h1>
                    <Row
                        style={{color: 'rgba(43,52,65,0.65)', marginBottom: '24px'}}
                    >
                        <Col span={20}>
                            <h2 style={{color: '#2B3441', marginBottom: '4px', fontSize: '14px'}}>账号密码</h2>
                            账号密码操作
                        </Col>
                        <Col span={4}
                             style={{
                                 lineHeight: '46px',
                                 textAlign: 'right'
                             }}
                        >
                            <a onClick={() => {
                                this.setState({
                                    visible: true
                                })
                            }}>编辑</a>
                        </Col>
                    </Row>
                    <Row
                        style={{color: 'rgba(43,52,65,0.65)', marginBottom: '24px'}}
                    >
                        <Col span={20}>
                            <h2 style={{color: '#2B3441', marginBottom: '4px', fontSize: '14px'}}>手机号</h2>
                            已绑定手机：
                            {localStorage.phone ? localStorage.phone.slice(0, 4) + '****' + localStorage.phone.slice(8) : ''}
                        </Col>
                        <Col span={4}
                             style={{
                                 lineHeight: '46px',
                                 textAlign: 'right'
                             }}
                        >
                            <a onClick={this.modifyTheBindingPhone}>编辑</a>
                        </Col>
                    </Row>
                    {/*<Row
                    style={{color: 'rgba(43,52,65,0.65)', marginBottom: '24px'}}
                >
                    <Col span={20}>
                        <h2 style={{color: '#2B3441', marginBottom: '4px', fontSize: '14px'}}>邮箱</h2>
                        已绑定手机：office.com
                    </Col>
                    <Col span={4}
                        style={{
                            lineHeight: '46px',
                            textAlign: 'right'
                        }}
                    >
                        <a>编辑</a>
                    </Col>
                </Row>*/}
                </div>
                {this.makeChangePasswordModal()}
            </Fragment>

        );
    }

    validateToNextPassword = (rule, value, callback) => {
        const {form} = this.props;
        if (value && value.length < 8) {
            return callback('密码的长度只能在8~18个字符之间！');
        }
        if (value && !CheckInput.checkPsw(value)) {
            return callback('密码格式有误，请重新输入！');
        }
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    };

    modifyTheBindingPhone = () => {
        Modal.info({
            content: <div style={{fontSize: '16px'}}>暂不提供自己修改绑定手机号的功能，若有需要，请联系客服进行更改！</div>,
            okText: '确定',
            width: 310,
        });
    };

    makeChangePasswordModal = () => {
        const {visible} = this.state;
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 15},
        };
        return (
            <Modal
                title="修改密码"
                visible={visible}
                onOk={this.changePassword}
                onCancel={this.hideChangePasswordModal}>
                <Form ref={(c) => this.form = c}
                      className={'form'}
                      scrollToFirstError={true}>
                    <Form.Item label="原密码" {...formItemLayout}
                               name={'oldPwd'}
                               rules={[{
                                   required: true,
                                   message: '请输入原密码!',
                               }, {
                                   // validator: this.validateToNextPassword,
                               }
                               ]}>
                        <Input maxLength={18} placeholder={'请输入'} type="password"/>
                    </Form.Item>
                    <Form.Item label="新密码" {...formItemLayout}
                               name={'newPwd'}
                               rules={[{
                                   required: true,
                                   message: '请输入新密码!',
                               }, {
                                   validator: this.validateToNextPassword,
                               }
                               ]}>
                        <Input maxLength={18} placeholder={'请输入'} type="password"/>
                    </Form.Item>
                    <Form.Item label="再次输入新密码" {...formItemLayout}
                               name={'newPwdAgain'}
                               rules={[
                                   {
                                       required: true,
                                       message: '请再次输入新密码!',
                                   },
                                   {
                                       validator: this.validateToNextPassword,
                                   }
                               ]}>
                        <Input maxLength={18} placeholder={'请输入'} type="password"/>
                    </Form.Item>
                </Form>
                <div style={{color: '#999', fontSize: 10}}>
                    {"8位到18位密码，密码需包含以下类型的两种，大小字母、数字、特殊字符\~\!\@\#\$\%\^\&\*\(\)\[\]\{\}\<\>\_\=\:\.\,\'\"\+\-\;\|\/\\"}
                </div>
            </Modal>
        )
    };

    changePassword = () => {
        let validateFields = this.form && this.form.validateFields;
        validateFields().then(values => {
            const {oldPwd, newPwd, newPwdAgain} = values;
            if (newPwd !== newPwdAgain) {
                return message.error('两次输入的新密码不一致！')
            }
                // else if (oldPwd === newPwd) {
                //     return message.error('新密码与旧密码一致！');
            // }
            else if (!CheckInput.checkPsw(newPwd)) {
                return message.error('请输入合适的8位到18位密码');
            } else if (CheckInput.checkPswSameKind(newPwd)) {
                return message.error('密码需包含以下两种类型，大小写字母、数字、特殊字符');
            }

            Model.ChangePassword({
                oldPwd: Md5.hex_md5(oldPwd),
                newPwd: Md5.hex_md5(newPwd)
            }, res => {
                this.setState({
                    visible: false
                }, () => {
                    Modal.success({
                        content: <div style={{fontSize: '16px'}}>修改密码成功，请重新登录！</div>,
                        okText: '确定',
                        width: 310,
                        onOk: () => {
                            localStorage.clear();
                            this.props.history.replace('/users/login/index');
                        }
                    });
                });
            })
        });
    };

    hideChangePasswordModal = () => {
        let resetFields = this.form ? this.form.resetFields : null;
        resetFields && resetFields();
        this.setState({
            visible: false
        })
    }
}

export default AccountAndSecurity;
