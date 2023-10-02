import React, {Component} from 'react';
import { Form, Input, Button, Row, Col, message} from 'antd';
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
const analysisPar = (str = '') => {
    let resObj = {};
    if(str){
        let arr = [];
        if(str.indexOf('&')){
            arr = str.split('&');
            arr.forEach(item => {
                resObj[item.split('=')[0]] = item.split('=')[1];
            });

        }else{
            arr = str.split('=');
            resObj[arr[0]] = arr[1];
        }
    }
    return resObj;
};


class RiseEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
        };
        this.formRef = React.createRef();
        this.praObj = analysisPar(this.props.location.search.substr(1));
    }

    componentDidMount() {
        if(this.praObj.id || this.praObj.sn)
            this.getMyCompanyIRGet();
    }

    componentWillUnmount() {}

    render() {
        return (
            <div className={'cbiCss'}>
                <h1>企业业务信息
                    <span
                        style={{fontSize: '12px',color: 'rgba(43,52,65,0.65)'}}
                    >
                        （ {this.id ? '编辑抬头库' : '新增抬头库'} ）
                    </span>
                </h1>
                {this.makeBaseView()}
            </div>
        );
    }

    getMyCompanyIRGet(){
        Model.MyCompanyIRGet({sn: this.praObj.sn}, (res) => {
            this.setState({data: res.data}, () => {
                this.formRef.current.setFieldsValue({
                    invoiceName: res.data.invoiceName || '',
                    taxpayerNo: res.data.taxpayerNo || '',
                    address: res.data.address || '',
                    phone: res.data.phone || '',
                    bank: res.data.bank || '',
                    account: res.data.account || '',
                });

            });
        }, (err) => {});
    }

    makeBaseView(){
        return (
            <Form ref={this.formRef} scrollToFirstError={true} {...formItemLayout} autoComplete="off" className={'formCss'}  onFinish={this.onSubmit}>
                <Row>
                    <Col span={12}>
                        <Form.Item label={'抬头名称'} name={'invoiceName'} rules={[
                            { required: true, message: '抬头名称不能为空!' },
                        ]}>
                            <Input
                                style={{width: '356px'}}
                                maxLength={50}
                                placeholder="请输入抬头名称"
                            />
                        </Form.Item>
                        <Form.Item label={'纳税人识别号'} name={'taxpayerNo'} rules={[
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
                        <Form.Item label={'地址'} name={'address'} rules={[
                            { required: true, message: '地址不能为空!' },
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
                        <Form.Item label={'开户行'} name={'bank'} rules={[
                            { required: true, message: '开户行不能为空!' },
                        ]}>
                            <Input
                                style={{width: '356px'}}
                                maxLength={50}
                                placeholder="请输入开户行"
                            />
                        </Form.Item>
                        <Form.Item label={'账户'} name={'account'} rules={[
                            { required: true, message: '账户不能为空!' },
                            {
                                validator: (rule, value, callback) => this.checkDep(rule, value, callback)
                            }
                        ]}>
                            <Input
                                style={{width: '356px'}}
                                maxLength={30}
                                placeholder="请输入账户"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{width: '96px', height: '32px', fontSize: '16px', marginTop: '8px', padding: '0px'}}
                            >
                                保存信息
                            </Button>
                            <Button
                                style={{width: '80px', height: '32px', fontSize: '16px', marginLeft: '16px', padding: '0px'}}
                                onClick={() => {
                                    this.props.history.push('/pages/myCompany/subjectSetUp/companyBusInf/index?key=4');
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

    onSubmit = () =>{
        this.formRef.current.validateFields(['invoiceName', 'taxpayerNo', 'address', 'phone', 'bank', 'account']).then(values => {
            if(this.praObj.sn){
                values.sn = this.praObj.sn;

            }else{
                values.sn = null;

            }


            // if(values.addressId[2]){
            //     values.regionId = values.addressId[2];
            // }else if(values.addressId[1]){
            //     values.regionId = values.addressId[1];
            // }else{
            //     values.regionId = values.addressId[0];
            // }

            // delete values.addressId;
            // console.log('values: ', values);
            // return false;

            if(this.praObj.sn){
                window.globalPermissions.checkPermission('ERP_RISE_EDIT', (res) => {
                    if(res)
                        return message.error('抱歉，您没有该操作权限，请联系管理员！');
                    this.saveFun(values);
                });
            }else{
                window.globalPermissions.checkPermission('ERP_RISE_ADD', (res) => {
                    if(res)
                        return message.error('抱歉，您没有该操作权限，请联系管理员！');
                    this.saveFun(values);
                });
            }
        });
    }

    saveFun(obj = {}){
        Model.MyCompanyIRSave({...obj}, (res) => {
            message.success('保存成功！');
            this.props.history.push('/pages/myCompany/subjectSetUp/companyBusInf/index?key=4');
        }, (err) => {});
    }
}

export default RiseEdit;
