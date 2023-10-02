import React, {Component} from 'react';
import {Form, Row, Col, Input, Radio, Cascader, Button, Modal, message} from 'antd';
import {head, leftArr, logo, succeed, useApp} from '../../../resource';
import Model from "../Model";
import CityData from "../../../resource/SwCityData";
import UploadFileMethod from "../../../baseview/uploadFile/UploadFileMethod";
import '../../AddressBook/index.less'
import {formDeleteEmpty, formRegExp} from '../../../utils'
import {connect} from "react-redux";
import {setIndexMes} from "../../layout/redux/mainLayoutAction";
import CheckInput from "../../../utils/checkInput/CheckInput";

@connect(
    (state) => {
        const {mainLayoutReducers} = state;
        return {
            mainLayoutReducers
        }
    },
    (dispatch) => {
        return {
            setIndexMes: (position) => {
                dispatch(setIndexMes(position))
            },
        }
    }
)
class PersonalInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            data: {},
            hasBeenSent: false, // 是否已经发送验证码
            btnText: '发送验证码', // 按钮名称
        };
    }

    // ------ 生命周期函数 start-----
    componentDidMount() {
        // 获取个人信息接口
        this.getUserData();
    }

    componentWillUnmount() {

    }

    // ------ 生命周期函数 end-------

    render() {
        const {data} = this.state;
        return (<div style={{
                padding: '30px 32px 24px'
            }}>
                {this.renderReplacePhone()}
                <h1
                    style={{
                        fontSize: '20px',
                        color: '#2B3441',
                        marginBottom: '24px',
                        paddingBottom: '24px',
                        borderBottom: '1px solid rgba(43,52,65,0.09)'
                    }}
                >个人信息</h1>
                {this.state.isLoaded ?
                    <Form ref={(c) => this.form = c} autoComplete="off" className={'formCss'}
                          onFinish={this.onSubmit} scrollToFirstError={true} layout={'vertical'}>
                        <Row>
                            <Col span={14}>
                                <Form.Item label={'昵称'} name={'alias'} rules={[
                                    {required: true, message: '昵称不能为空!'},
                                ]} initialValue={data.alias}>
                                    <Input
                                        style={{width: '356px'}}
                                        maxLength={30}
                                        placeholder="请输入昵称"
                                    />
                                </Form.Item>
                                <Form.Item label={'性别'} name={'sex'} rules={[
                                    {required: false, message: '性别不能为空!'},
                                ]} initialValue={data.sex}>
                                    <Radio.Group>
                                        <Radio value={1}>男</Radio>
                                        <Radio value={2}>女</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item label={'手机号'} name={'mobile'} rules={[
                                    {required: false, message: '手机号不能为空!'},
                                    // formRegExp.phone()
                                ]} initialValue={CheckInput.concealNum(data.mobile)}>
                                    <Input
                                        style={{width: '356px'}}
                                        maxLength={11}
                                        placeholder="请输入手机号"
                                        disabled={true}
                                    />
                                    {/*<a style={{marginLeft: '16px'}}*/}
                                    {/*   onClick={() => this.setState({RPVisible: true})}*/}
                                    {/*>更换</a>*/}
                                </Form.Item>
                                <Form.Item label="所在地区" name={'comAddressId'} rules={[
                                    {
                                        required: true,
                                        message: '所在地区不能为空!',
                                    }
                                ]} initialValue={data.provinceId ?
                                    [data.provinceId + '', data.cityId + '', data.regionId + ''] : []}>
                                    <Cascader
                                        popupClassName={'perInfCss_cas'}
                                        options={CityData.data}
                                        placeholder="请选择所在地区"
                                        style={{width: '356px'}}
                                    />
                                </Form.Item>
                                <Form.Item label={'邮箱'} name={'email'} rules={[
                                    {required: false, message: '邮箱不能为空!'},
                                    formRegExp.email()
                                ]} initialValue={data.email}>
                                    <Input
                                        style={{width: '356px'}}
                                        maxLength={30}
                                        placeholder="请输入邮箱"
                                    />
                                </Form.Item>
                                <Form.Item label={'个性签名'} name={'signature'} rules={[
                                    {required: false, message: '个性签名不能为空!'},
                                ]} initialValue={data.signature}>
                                    <Input
                                        style={{width: '356px'}}
                                        maxLength={30}
                                        placeholder="请输入个性签名"
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        style={{width: '96px', height: '40px', fontSize: '16px', marginTop: '8px'}}
                                    >
                                        保存信息
                                    </Button>
                                </Form.Item>
                            </Col>
                            <Col span={10} style={{paddingLeft: '96px'}}>
                                <Form.Item label="个人头像" style={{margin: '0px'}} name={'photo'} rules={[
                                    {
                                        required: false,
                                        message: '个人头像不能为空!',
                                    }
                                ]} initialValue={data.photo}>
                                    <div>
                                        <img
                                            src={data.photo || head}
                                            alt=""
                                            style={{width: '144px', height: '144px', borderRadius: '6px'}}
                                        />
                                        <div>
                                            <UploadFileMethod
                                                accept={'.png,.jpg,.jpeg,.bmp,.gif'}
                                                callBack={(url) => {
                                                    this.setState({
                                                        data: {
                                                            ...data,
                                                            photo: url
                                                        }
                                                    }, () => {
                                                        this.form && this.form.setFieldsValue({
                                                            photo: url || '',
                                                        });
                                                    });
                                                }}
                                            >
                                                <Button
                                                    style={{
                                                        marginLeft: '24px',
                                                        marginTop: '16px',
                                                        width: '102px',
                                                        height: '40px',
                                                        fontSize: '16px'
                                                    }}
                                                >更换头像</Button>
                                            </UploadFileMethod>
                                        </div>
                                    </div>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form> : null}
            </div>
        );
    }

    // ------ 渲染视图函数 start-----
    renderReplacePhone = () => {
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 4},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 20},
            },
        };
        return (
            <Modal
                title='更换手机号'
                className={'sw-modal'}
                visible={this.state.RPVisible}
                onCancel={() => this.setState({RPVisible: false})}
                afterClose={this.clear}
                onOk={this.modifyCellPhoneNumber}
            >
                <Form ref={(c) => this.modalForm = c}
                      className={'form-wrapper'} {...formItemLayout}
                      onFinish={(values) => {

                      }} scrollToFirstError={true}>
                    <Form.Item label="手机号" name={'phone'} rules={[
                        {
                            required: true,
                            message: '请输入能够接受验证码的手机号!',
                        },
                        formRegExp.phone()
                    ]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="验证码" name={'code'} rules={[
                        {
                            required: true,
                            message: '请输入验证码!',
                        },
                    ]}>
                        <Input
                            className='input-no-after-style'
                            style={{width: '100%%'}}
                            addonAfter={<Button style={{width: 100}} disabled={this.state.hasBeenSent}
                                                onClick={this.getVerificationCodeFn}
                                                type='primary'>
                                {this.state.hasBeenSent ? this.state.count + ' s' : this.state.btnText}
                            </Button>}/>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
    // ------ 渲染视图函数 end-------

    // ------ 带请求函数 start-----
    getUserData = () => {
        Model.getUserInfo({}, res => {
            this.setState({isLoaded: true, data: res.data}, () => {
                this.props.setIndexMes(res.data ? {
                    ...res.data,
                    userAlias: res.data.alias || '',
                    userEmail: res.data.email || '',
                } : {});
            });
        })
    }

    getVerificationCodeFn = () => {
        const phone = this.props.form.getFieldValue('phone')
        if (!phone) {
            this.props.form.setFields({
                phone: {
                    value: undefined,
                    errors: [new Error('请先输入手机号码!')],
                },
            });
            return false
        }
        Model.SMSCertification({phone, smsType: 10}, res => {
            message.success('验证码已发送, 请注意查收!')
            this.runGetCaptchaCountDown()
            this.setState({hasBeenSent: true})
        })
    }

    modifyCellPhoneNumber = (e) => {
        e.preventDefault();
        const formValueFiled = ['phone', 'code']
        this.props.form.validateFields(formValueFiled, (err, values) => {
            if (err) return;
            Model.userPhoneChange(values, res => {
                message.success('已成功绑定新手机号!');
                this.setState({RPVisible: false})
            })
        })
    }

    onSubmit = (values) => {
        values.mobile = this.state.data.mobile;
        if (values.comAddressId) {
            values.regionId = values.comAddressId[2]
            delete values.comAddressId
        }
        Model.ModifyPersonalIcon(formDeleteEmpty(values), res => {
            message.success('个人信息更新成功!');
            this.getUserData();
        })
    }
    // ------ 带请求函数 end-------

    // ------ 工具函数 start-----
    runGetCaptchaCountDown = () => {
        let count = 59;
        this.setState({count});
        this.interval = setInterval(() => {
            count -= 1;
            this.setState({count});
            if (count === 0) {
                clearInterval(this.interval);
                this.setState({hasBeenSent: false, btnText: '重新发送'})
            }
        }, 1000);
    };

    clear = () => {
        clearInterval(this.interval);
        this.props.form.resetFields(['phone', 'code'])
        this.setState({
            hasBeenSent: false,
            count: 59,
            btnText: '发送验证码'
        })
    }
    // ------ 工具函数 end-------
}

export default PersonalInfo;
