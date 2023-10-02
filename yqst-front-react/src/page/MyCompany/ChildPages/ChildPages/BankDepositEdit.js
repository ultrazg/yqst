import React, {Component} from 'react';

import {Input, Button, Row, Col, message, Select, Cascader, Form} from 'antd';
import Model from '../../Model'
import CityData from "../../../../resource/SwCityData";

const {Option} = Select;
const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 24},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 24},
    },
};

class BankDepositEdit extends Component {
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
        this.getMyCompanyCBIPage();

    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div className={'cbiCss'}>
                <h1>企业业务信息
                    <span
                        style={{fontSize: '12px', color: 'rgba(43,52,65,0.65)'}}
                    >
                        （ {this.id ? '编辑基本存款账户' : '新增基本存款账户'} ）
                    </span>
                </h1>
                {this.makeBaseView()}
            </div>
        );
    }

    getMyCompanyCBGet() {
        Model.MyCompanyCBGet({}, (res) => {
            this.setState({data: res.data}, () => {
                let regionId = [];
                if (res.data.provinceId) {
                    regionId.push(res.data.provinceId + '')
                }
                if (res.data.cityId) {
                    regionId.push(res.data.cityId + '')
                }
                if (res.data.regionId) {
                    regionId.push(res.data.regionId + '')
                }
                this.formRef.current.setFieldsValue({
                    depositBankName: res.data.depositBankName || '',
                    bankInfoId: res.data.bankInfoId ? res.data.bankInfoId + '' : '',
                    regionId: regionId,
                    bankBranchName: res.data.bankBranchName || '',
                    bankAccount: res.data.bankAccount || '',
                });
            });
        }, (err) => {
        });
    }

    getMyCompanyCBIPage() {
        Model.MyCompanyCBIPage({
            current: 1,
            pageSize: 10000,
            keyWord: ''
        }, (res) => {
            this.setState({list: res.data.records || []}, () => {
                if (this.id)
                    this.getMyCompanyCBGet();
            });
        }, (err) => {
        })
    }

    makeBaseView() {
        let {list} = this.state;

        return <Form ref={this.formRef} {...formItemLayout} scrollToFirstError={true} autoComplete="off"
                     className={'formCss'}
                     onFinish={(e) => {
                         // e.persist();
                         window.globalPermissions.checkPermission('ERP_DEPOSIT_EDIT', (res) => {
                             if (res)
                                 return message.error('抱歉，您没有该操作权限，请联系管理员！');

                             this.onSubmit();
                         });
                     }}
        >
            <Row>
                <Col span={12}>
                    <Form.Item label={'企业开户名称'} name={'depositBankName'} rules={[
                        {required: true, message: '企业开户名称不能为空!'},
                    ]}>
                        <Input
                            style={{width: '356px'}}
                            maxLength={50}
                            placeholder="请输入企业开户名称"
                        />
                    </Form.Item>
                    <Form.Item label={'开户行'} name={'bankInfoId'} rules={[
                        {required: true, message: '开户行不能为空!'},
                    ]}>
                        <Select
                            showSearch
                            placeholder="请选择开户行"
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            style={{width: '356px', fontSize: '14px'}}
                        >
                            {
                                list && list.map((item, idx) => {
                                    return <Option key={'opt_' + idx} value={item.id + ''}>
                                        {item.bankName}
                                    </Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="开户所在地" name={'regionId'} rules={[
                        {
                            required: true,
                            message: '开户所在地不能为空!',
                        }
                    ]}>
                        <Cascader
                            popupClassName={'sucCss_cas'}
                            options={CityData.data}
                            placeholder="请选择开户所在地"
                            style={{width: '356px'}}
                            showSearch={{
                                filter: (inputValue, path) => {
                                    return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
                                }
                            }}
                        />

                    </Form.Item>
                    <Form.Item label={'开户支行名称'} name={'bankBranchName'} rules={[
                        {required: true, message: '开户支行名称不能为空!'},
                    ]}>
                        <Input
                            style={{width: '356px'}}
                            maxLength={50}
                            placeholder="请输入开户支行名称"
                        />
                    </Form.Item>
                    <Form.Item label={'企业银行账号'} name={'bankAccount'} rules={[
                        {required: true, message: '企业银行账号不能为空!'},
                        {
                            validator: (rule, value, callback) => this.checkValidator(rule, value, callback)
                        }
                    ]}>
                        <Input
                            style={{width: '356px'}}
                            maxLength={30}
                            placeholder="请输入企业银行账号"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{
                                width: '96px',
                                height: '32px',
                                fontSize: '16px',
                                marginTop: '8px',
                                lineHeight: '100%'
                            }}
                        >
                            保存信息
                        </Button>
                        <Button
                            style={{
                                width: '80px',
                                height: '32px',
                                fontSize: '16px',
                                marginLeft: '16px',
                                lineHeight: '100%'
                            }}
                            onClick={() => {
                                this.props.history.push('/pages/myCompany/subjectSetUp/companyBusInf/index?key=2');
                            }}
                        >
                            取消
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    }

    checkValidator(rule, value, callback) {
        const numAndLet = /^[0-9]+$/;
        if (value && !numAndLet.test(value)) {
            callback('企业银行账号只能输入数字！');
            return false;
        }
        callback();
    }

    onSubmit() {
        let {list} = this.state;
        this.formRef.current.validateFields(['depositBankName', 'bankInfoId', 'bankBranchName', 'regionId', 'bankAccount']).then(values => {
            if (this.id)
                values.id = this.id;
            if (values.regionId[2]) {
                values.regionId = values.regionId[2];
            } else if (values.regionId[1]) {
                values.regionId = values.regionId[1];
            } else {
                values.regionId = values.regionId[0];
            }
            list && list.forEach(item => {
                if ('' + values.bankInfoId === '' + item.id) {
                    values.depositBank = item.bankName;
                    return false;
                }
            });

            Model.MyCompanyCBSave({...values}, (res) => {
                message.success('保存成功！');
                this.props.history.push('/pages/myCompany/subjectSetUp/companyBusInf/index?key=2');
            }, (err) => {
            });
        });
    }
}

export default BankDepositEdit;
