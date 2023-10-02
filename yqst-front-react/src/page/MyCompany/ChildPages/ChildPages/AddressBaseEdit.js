import React, {Component} from 'react';

import {Input, Button, Row, Col, message, Cascader, Form, TreeSelect} from 'antd';
import Model from '../../Model'
import CityData from "../../../../resource/SwCityData";

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

class AddressBaseEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            typeListData: []
        };
        this.id = '';
        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.id = this.props.location.search.substr(1).split("=")[1];
        if (this.id)
            this.getMyCompanyCAGet();
        this.getTypeList()
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
                        （ {this.id ? '编辑地址库' : '新增地址库'} ）
                    </span>
                </h1>
                {this.makeBaseView()}
            </div>
        );
    }

    getMyCompanyCAGet() {
        Model.MyCompanyCAGet({id: this.id}, (res) => {
            this.setState({data: res.data}, () => {
                const addressId = [];
                // 地址id
                if (res.data.province) {
                    addressId.push(res.data.province + '');
                }
                if (res.data.city) {
                    addressId.push(res.data.city + '');
                }
                if (res.data.district) {
                    addressId.push(res.data.district + '');
                }
                this.formRef.current.setFieldsValue({
                    contact: res.data.contact || '',
                    tel: res.data.tel || '',
                    spareContact: res.data.spareContact || '',
                    spareTel: res.data.spareTel || '',
                    zipCode: res.data.zipCode || '',
                    address: res.data.address || '',
                    addressId: addressId,
                    addressCategorySn: res.data.addressCategorySn || '',
                    addressCategory: res.data.addressCategory || '',
                    addressCategoryAllName: res.data.addressCategoryAllName || '',
                    remark: res.data.remark || '',
                });

            });
        }, (err) => {
        });
    }

    getTypeList = () => {
        Model.MyCompanyAdressTypeList({}, res => {
            const recursive = (data) => {
                data.forEach(n => {
                    n.title = n.addressCategory;
                    n.value = n.sn;
                    if (n.addressCategoryListVOList && n.addressCategoryListVOList.length === 0) {
                        delete n.addressCategoryListVOList
                    } else {
                        n.children = n.addressCategoryListVOList;
                        recursive(n.children)
                    }
                })
            }
            recursive(res.data)
            this.setState({
                typeListData: res.data,
            })
        })
    }

    makeBaseView() {
        return <Form ref={this.formRef} {...formItemLayout} scrollToFirstError={true} autoComplete="off"
                     className={'formCss'} onFinish={this.onSubmit}>
            <Row>
                <Col span={12}>
                    <Form.Item label={'收件人'} name={'contact'} rules={[
                        {required: true, message: '收件人不能为空!'},
                    ]}>
                        <Input
                            style={{width: '356px'}}
                            maxLength={20}
                            placeholder="请输入收件人"
                        />
                    </Form.Item>
                    <Form.Item label={'联系电话'} name={'tel'} rules={[
                        {required: true, message: '联系电话不能为空!'},
                        {
                            validator: (rule, value, callback) => this.checkPho(rule, value, callback)
                        }
                    ]}>
                        <Input
                            style={{width: '356px'}}
                            maxLength={15}
                            placeholder="请输入联系电话"
                        />
                    </Form.Item>
                    <Form.Item label={'备用收件人'} name={'spareContact'} rules={[]}>
                        <Input
                            style={{width: '356px'}}
                            maxLength={20}
                            placeholder="请输入收件人"
                        />
                    </Form.Item>
                    <Form.Item label={'备用联系电话'} name={'spareTel'} rules={[
                        {
                            validator: (rule, value, callback) => this.checkPho(rule, value, callback)
                        }
                    ]}>
                        <Input
                            style={{width: '356px'}}
                            maxLength={15}
                            placeholder="请输入联系电话"
                        />
                    </Form.Item>
                    <Form.Item label={'邮编'} name={'zipCode'} rules={[
                        {required: false, message: '邮编不能为空!'},
                        {
                            validator: (rule, value, callback) => this.checkValidator(rule, value, callback)
                        }
                    ]}>
                        <Input
                            style={{width: '356px'}}
                            maxLength={6}
                            placeholder="请输入邮编"
                        />
                    </Form.Item>
                    <Form.Item label="所在地区" name={'addressId'} rules={[
                        {
                            required: true,
                            message: '所在地区不能为空!',
                        }
                    ]}>
                        <Cascader
                            popupClassName={'sucCss_cas'}
                            options={CityData.data}
                            placeholder="请选择所在地区"
                            style={{width: '356px'}}
                            showSearch={{
                                filter: (inputValue, path) => {
                                    return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
                                }
                            }}
                        />
                    </Form.Item>
                    <Form.Item label={'详细地址'} name={'address'} rules={[
                        {required: true, message: '详细地址不能为空!'},
                    ]}>
                        <Input
                            style={{width: '356px'}}
                            maxLength={50}
                            placeholder="请输入详细地址"
                        />
                    </Form.Item>
                    <Form.Item label={'地址分类'}
                               name={'addressCategory'}
                    >
                        <TreeSelect
                            placeholder={'请选择分类'}
                            treeData={this.state.typeListData || []}
                            style={{width: '356px'}}
                            allowClear
                            onChange={(value, label, extra) => {
                                this.formRef.current.setFieldsValue({
                                    addressCategorySn: value || ''
                                })
                            }}
                        />
                    </Form.Item>
                    <Form.Item label={'备注'} name={'remark'} rules={[]}>
                        <Input.TextArea
                            style={{width: '356px'}}
                            maxLength={30}
                            placeholder="请输入备注"
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
                                this.props.history.push('/pages/myCompany/subjectSetUp/companyBusInf/index?key=3');
                            }}
                        >
                            取消
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    }

    checkPho(rule, value, callback) {
        const numAndLet = /^[0-9]+$/;
        if (value && (!numAndLet.test(value) || value.length > 15)) {
            callback('电话能输入1到15位的数字！');
            return false;
        }
        callback();
    }

    checkValidator(rule, value, callback) {
        const numAndLet = /^[0-9]{6}$/;
        if (value && !numAndLet.test(value)) {
            return callback('请输入六位数字的邮编！');
        }
        callback();
    }

    onSubmit = () => {
        this.formRef.current.validateFields(['contact', 'tel', 'spareContact', 'spareTel', 'zipCode', 'address', 'addressId', 'addressCategorySn', 'remark']).then(values => {
            if (this.id)
                values.id = this.id;
            if (values.addressId[2]) {
                values.regionId = values.addressId[2];
            } else if (values.addressId[1]) {
                values.regionId = values.addressId[1];
            } else {
                values.regionId = values.addressId[0];
            }

            delete values.addressId;
            // console.log('values: ', values);
            // return false;
            if (values.spareContact || values.spareTel) {
                if (!values.spareContact) {
                    return message.info("请填写备用收件人")
                }
                if (!values.spareTel) {
                    return message.info("请填写备用联系电话")
                }
            }
            if (this.id) {
                window.globalPermissions.checkPermission('ERP_ADDRESS_EDIT', (res) => {
                    if (res)
                        return message.error('抱歉，您没有该操作权限，请联系管理员！');
                    this.saveFun(values);
                });

            } else {
                window.globalPermissions.checkPermission('ERP_ADDRESS_ADD', (res) => {
                    if (res)
                        return message.error('抱歉，您没有该操作权限，请联系管理员！');
                    this.saveFun(values);
                });

            }
        });
    }

    saveFun(obj = {}) {
        Model.MyCompanyCASave({...obj}, (res) => {
            message.success('保存成功！');
            this.props.history.push('/pages/myCompany/subjectSetUp/companyBusInf/index?key=3');
        }, (err) => {
        });
    }
}

export default AddressBaseEdit;
