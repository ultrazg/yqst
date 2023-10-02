import React, {Component} from 'react'
import ViewContent from "../../../baseview/viewContent/ViewContent";
import {Button, Col, Form, Input, message, Modal, Select, Table} from "antd";
import moment from 'moment'
import UnionpayModel from "../model/UnionpayModel";

const FormItem = Form.Item
const Option = Select.Option

class OtherParameterSetting extends Component {
    constructor() {
        super()
        this.state = {
            data: {}
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        UnionpayModel.getOtherInfo({}, success => {
            this.setState({data: success.data})
        })
    }

    render() {
        const {data} = this.state
        const crumb = [
            {name: '业务信息管理'},
            {name: '其他参数设置'},
        ]
        const {getFieldDecorator, resetFields, getFieldsValue} = this.props.form
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };
        const columns = [{
            title: '用户账号',
            dataIndex: 'applySn',
            key: 'applySn',
        }, {
            title: '企业名称',
            dataIndex: 'applySn',
            key: 'applySn',
        }, {
            title: '商户名',
            dataIndex: 'applySn',
            key: 'applySn',
        }, {
            title: '商户编号',
            dataIndex: 'applySn',
            key: 'applySn',
        }, {
            title: '创建时间',
            dataIndex: 'submitTime',
            sorter: (a, b) => a.submitTime - b.submitTime,
            key: 'submitTime',
            render: (a, b, c) => {
                return a ? moment(a).format('YYYY-MM-DD') : ''
            }
        },
            {
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
                render: (a, b, c) => {
                    return <Button size='small' type='primary'
                                   onClick={() => {

                                   }}>操作</Button>
                }
            }]
        return (
            <ViewContent crumb={crumb}>
                <Col span={24} style={{marginTop: 20}}>
                    <Col span={24} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Col span={10}>
                            <FormItem {...formItemLayout} label="收单机构名称">
                                {getFieldDecorator('orgName', {
                                    rules: [{
                                        required: true,
                                        message: '请输入收单机构名称!'
                                    }], initialValue: data.orgName
                                })(<Input placeholder='请输入'/>)}
                            </FormItem>
                        </Col>
                    </Col>
                    <Col span={24} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Col span={10}>
                            <FormItem {...formItemLayout} label="收单机构地址">
                                {getFieldDecorator('orgAddress', {
                                    rules: [{
                                        required: true,
                                        message: '请输入收单机构地址!'
                                    }], initialValue: data.orgAddress
                                })(<Input
                                    placeholder='请输入'/>)}
                            </FormItem>
                        </Col>
                    </Col>
                    <Col span={24} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Col span={10}>
                            <FormItem {...formItemLayout} label="收件人">
                                {getFieldDecorator('addressee', {
                                    rules: [{
                                        required: true,
                                        message: '请输入收件人!'
                                    }], initialValue: data.addressee
                                })(<Input
                                    placeholder='请输入'/>)}
                            </FormItem>
                        </Col>
                    </Col>
                    <Col span={24} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Col span={10}>
                            <FormItem {...formItemLayout} label="联系方式">
                                {getFieldDecorator('phone', {
                                    rules: [{
                                        required: true,
                                        message: '请输入联系方式!'
                                    }], initialValue: data.phone
                                })(<Input placeholder='请输入'/>)}
                            </FormItem>
                        </Col>
                    </Col>
                    <Col span={24} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Col span={10}>
                            <FormItem {...formItemLayout} label="收款账户">
                                {getFieldDecorator('collectAccount', {
                                    rules: [{
                                        required: true,
                                        message: '请输入收款账户!'
                                    }], initialValue: data.collectAccount
                                })(<Input
                                    placeholder='请输入'/>)}
                            </FormItem>
                        </Col>
                    </Col>
                    <Col span={24} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Col span={10}>
                            <FormItem {...formItemLayout} label="收款抬头">
                                {getFieldDecorator('collectHead', {
                                    rules: [{
                                        required: true,
                                        message: '请输入收款抬头!'
                                    }], initialValue: data.collectHead
                                })(<Input
                                    placeholder='请输入'/>)}
                            </FormItem>
                        </Col>
                    </Col>
                    <Col span={24} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Col span={10}>
                            <FormItem {...formItemLayout} label="联系电话">
                                {getFieldDecorator('tel', {
                                    rules: [{
                                        required: true,
                                        message: '请输入联系电话!'
                                    }], initialValue: data.tel
                                })(<Input placeholder='请输入'/>)}
                            </FormItem>
                        </Col>
                    </Col>
                    <Col span={24} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Col span={10}>
                            <FormItem {...formItemLayout} label="POS机单价">
                                {getFieldDecorator('price', {
                                    rules: [{
                                        required: true,
                                        message: '请输入POS机单价!'
                                    }], initialValue: data.price
                                })(<Input placeholder='请输入'/>)}
                            </FormItem>
                        </Col>
                    </Col>
                    <Col span={24}>
                        <Col span={24} style={{display: 'flex', justifyContent: 'center'}}>
                            <Button
                                type='primary'
                                style={{marginBottom: 20}}
                                onClick={() => {
                                    this.props.form.validateFields((err, values) => {
                                        if (!err) {
                                            Modal.confirm({
                                                title: '是否保存?',
                                                onOk: () => {
                                                    UnionpayModel.getOtherSave({...values}, success => {
                                                        this.getData()
                                                        return message.success('修改成功!')
                                                    })
                                                },
                                                onCancel() {

                                                },
                                            })
                                        }
                                    });


                                }}>保存</Button>
                        </Col>
                    </Col>
                </Col>
            </ViewContent>
        )
    }

}

const OtherParameterSettings = OtherParameterSetting
export default OtherParameterSettings


