import React, {Component} from 'react';
import { Form, Input, Button, Row, Col, message } from 'antd';
import Model from '../../Model'

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 24 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
    },
};


class CompanyBusInfEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            list: [],
        };
        this.id = '';
        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.id = this.props.location.search.substr(1).split("=")[1];
        if(this.id)
            this.getMyCompanyIIGet();
    }

    render() {
        return (
            <div className={'cbiCss'}>
                <h1>企业业务信息
                    <span
                        style={{fontSize: '12px',color: 'rgba(43,52,65,0.65)'}}
                    >
                        （ {this.id ? '编辑开票信息' : '新增开票信息'} ）
                    </span>
                </h1>
                {this.makeBaseView()}
            </div>
        );
    }

    getMyCompanyIIGet(){
        Model.MyCompanyIIGet({}, (res) => {
            this.setState({data: res.data}, () => {
                this.formRef.current.setFieldsValue({
                    infoName: res.data.infoName || '',
                    taxpayerNumber: res.data.taxpayerNumber || '',
                    address: res.data.address || '',
                    phone: res.data.phone || '',
                    accountBank: res.data.accountBank || '',
                    depositNumber: res.data.depositNumber || '',
                });
            });
        }, (err) => {});
    }

    makeBaseView(){
        return (
            <Form ref={this.formRef} scrollToFirstError={true} {...formItemLayout} autoComplete="off" className={'formCss'}
                 onFinish={() => {
                     // e.persist();
                     const _that = this;
                     window.globalPermissions.checkPermission('ERP_INVOICE_EDIT', (res) => {
                         if(res)
                             return message.error('抱歉，您没有该操作权限，请联系管理员！');

                         _that.onSubmit();
                     });
                 }}
            >
                <Row>
                    <Col span={12}>
                        <Form.Item label={'单位名称'} name={'infoName'} rules={[
                            { required: true, message: '单位名称不能为空!' },
                        ]}>
                            <Input
                                style={{width: '356px'}}
                                maxLength={50}
                                placeholder="请输入单位名称"
                            />
                        </Form.Item>
                        <Form.Item label={'纳税人识别号'} name={'taxpayerNumber'} rules={[
                            { required: true, message: '纳税人识别号不能为空!' },
                            {
                                validator: (rule, value, callback) => {
                                    let reg = /^[A-Za-z0-9]+$/;
                                    if(value && !reg.test(value)){
                                        callback('纳税人识别号只能是数字和字母组合或全部数字！');
                                        return false;
                                    }
                                    callback();
                                }
                            }
                        ]}>
                            <Input
                                style={{width: '356px'}}
                                maxLength={30}
                                placeholder="请输入纳税人识别号"
                            />
                        </Form.Item>
                        <Form.Item label="地址" name={'address'} rules={[
                            {
                                required: true,
                                message: '地址不能为空!',
                            }
                        ]}>
                            <Input
                                style={{width: '356px'}}
                                maxLength={50}
                                placeholder="请输入地址"
                            />
                        </Form.Item>
                        <Form.Item label={'电话'} name={'phone'} rules={[
                            { required: true, message: '电话不能为空!' },
                            {
                                validator: (rule, value, callback) => this.checkPho(rule, value, callback)
                            }
                        ]}>
                            <Input
                                style={{width: '356px'}}
                                maxLength={15}
                                placeholder="请输入电话"
                            />
                        </Form.Item>
                        <Form.Item label={'开户行'} name={'accountBank'} rules={[
                            { required: true, message: '开户行不能为空!' },
                        ]}>
                            <Input
                                style={{width: '356px'}}
                                maxLength={50}
                                placeholder="请输入开户行"
                            />
                        </Form.Item>
                        <Form.Item label={'账户'} name={'depositNumber'} rules={[
                            { required: true, message: '账户不能为空!' },
                            {
                                validator: (rule, value, callback) => this.checkDep(rule, value, callback)
                            }
                        ]}>
                            <Input
                                style={{width: '356px'}}
                                maxLength={30}
                                placeholder="请输入账户"
                            />,
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{width: '96px', height: '32px', fontSize: '16px', marginTop: '8px', lineHeight: '100%'}}
                            >
                                保存信息
                            </Button>
                            <Button
                                style={{width: '80px', height: '32px', fontSize: '16px', marginLeft: '16px', lineHeight: '100%'}}
                                onClick={() => {
                                    this.props.history.push('/pages/myCompany/subjectSetUp/companyBusInf/index?key=1');
                                }}
                            >
                                取消
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        );
    }

    checkPho(rule, value, callback){
        const numAndLet = /^[0-9]+$/;
        if(value && (!numAndLet.test(value) || value.length > 15)){
            callback('电话能输入1到15位的数字！');
            return false;
        }
        callback();
    }

    checkDep(rule, value, callback){
        const numAndLet = /^[0-9]+$/;
        if(value && !numAndLet.test(value)){
            callback('账户只能输入数字！');
            return false;
        }
        callback();
    }

    onSubmit = () => {
        this.formRef.current.validateFields(['infoName', 'taxpayerNumber', 'address', 'phone', 'accountBank', 'depositNumber'])
            .then(values => {
                if(this.id)
                    values.id = this.id;
                    Model.MyCompanyIISave({...values}, (res) => {
                        message.success('保存成功！');
                        this.props.history.push('/pages/myCompany/subjectSetUp/companyBusInf/index?key=1');
                    }, (err) => {});
            });
    }
}

export default CompanyBusInfEdit;
