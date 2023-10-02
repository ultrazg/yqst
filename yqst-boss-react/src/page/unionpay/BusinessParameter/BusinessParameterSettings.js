import React, {Component} from 'react'
import ViewContent from "../../../baseview/viewContent/ViewContent";
import {Button, Row, Col, Form, Input, Select, Modal, message} from "antd";
import {QuestionCircleOutlined} from '@ant-design/icons';
import moment from 'moment'
import UnionpayModel from "../model/UnionpayModel";

const FormItem = Form.Item
const Option = Select.Option

class BusinessParameterSetting extends Component {
    constructor() {
        super()
        this.state = {
            list: [],
            updateValue: {
                id: '',
                ratio: ''
            }
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        UnionpayModel.getServiceList({}, success => {
            this.setState({list: success.data})
        })
    }

    render() {
        const {list, updateValue} = this.state
        const crumb = [
            {name: '业务信息管理'},
            {name: '业务参数设置'},
        ]
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
        const {getFieldDecorator, resetFields, getFieldValue} = this.props.form
        return (
            <ViewContent crumb={crumb}>
                <Row>
                    <Col span={24}>
                        <p style={{padding: '10px', display: 'flex', alignItems: 'center'}}>
                            <QuestionCircleOutlined />
                            <span style={{padding: '10px'}}>
                            这里设置的参数会直接在生成合同的时候调用。可以进行修改。
                            </span>
                        </p>
                    </Col>
                    <Col span={24}>
                        <table style={{width: '100%'}}>
                            <tr style={{backgroundColor: '#eee', width: '100%'}}>
                                <th style={{padding: '10px 0', textAlign: 'center', width: '25%'}}>业务类型</th>
                                <th style={{padding: '10px 0', textAlign: 'center', width: '25%'}}>开通业务类型</th>
                                <th style={{padding: '10px 0', textAlign: 'center', width: '25%'}}>每笔交易手续费率</th>
                                <th style={{padding: '10px 0', textAlign: 'center', width: '25%'}}>操作</th>
                            </tr>
                            {
                                (list).map((v, k) => {
                                    return (
                                        <tr key={k} style={{
                                            outline: '1px solid #eee',
                                            textAlign: 'center',
                                            width: '100%',
                                            padding: '8px 0'
                                        }}>
                                            <td style={{padding: '8px 0', textAlign: 'center', width: '25%'}}>
                                                <span>{v.name}</span>
                                            </td>
                                            <td colSpan={3} style={{width: '75%'}}>
                                                {
                                                    v.getServiceVOS.map((vs, ks) => {

                                                        return (
                                                            <tr style={{
                                                                width: '100%',
                                                                display: 'block',
                                                                outline: '1px solid #eee',
                                                            }} key={ks}>
                                                                <td style={{
                                                                    padding: '8px 0',
                                                                    textAlign: 'center',
                                                                    width: 'calc(100% / 3)',
                                                                    display: 'inline-block'
                                                                }}>
                                                                    {vs.name}
                                                                </td>
                                                                <td style={{
                                                                    padding: '8px 0',
                                                                    textAlign: 'center',
                                                                    width: 'calc(100% / 3)',
                                                                    display: 'inline-block'
                                                                }}>
                                                                    {vs.isEdit ? <Input type="text" value={vs.ratio}
                                                                                        onChange={(e) => {
                                                                                            list[k].getServiceVOS[ks].ratio = e.target.value
                                                                                            this.setState({list: list})
                                                                                        }}/> : vs.ratio}

                                                                </td>
                                                                <td style={{
                                                                    padding: '8px 0',
                                                                    textAlign: 'center',
                                                                    width: 'calc(100% / 3)',
                                                                    display: 'inline-block'
                                                                }}>
                                                                    <Button
                                                                        type='primary'
                                                                        size="small"
                                                                        onClick={() => {
                                                                            list[k].getServiceVOS[ks]['isEdit'] = !vs.isEdit
                                                                            this.setState({list: list})

                                                                        }}

                                                                    >操作</Button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })

                                                }


                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </table>
                    </Col>
                    <Col span={24} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Button type='primary' style={{margin: '20px 0'}} onClick={() => {
                            let obj = {
                                updateService: []
                            }
                            for (let i in list) {
                                for (let j in list[i].getServiceVOS) {
                                    obj.updateService.push({
                                        id: list[i].getServiceVOS[j].id,
                                        ratio: list[i].getServiceVOS[j].ratio,
                                    })
                                }
                            }
                            obj.updateService = JSON.stringify(obj.updateService)
                            Modal.confirm({
                                title: '是否保存?',
                                onOk: () => {
                                    UnionpayModel.getServiceUpdate({...obj}, success => {
                                        this.getData()
                                        return message.success('修改成功!')
                                    })
                                },
                                onCancel() {

                                },
                            })
                        }}>保存</Button>
                    </Col>
                </Row>
            </ViewContent>
        )
    }

}

const BusinessParameterSettings = BusinessParameterSetting
export default BusinessParameterSettings


