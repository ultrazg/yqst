import React, {Component} from 'react'
import ViewContent from "../../../../baseview/viewContent/ViewContent";
import {Button, Row, Col, Form, Input, Select, Table} from "antd";
import moment from 'moment'
import UnionpayModel from "../../model/UnionpayModel";

const FormItem = Form.Item
const Option = Select.Option

class ServiceApplicationDepositReceiveds extends Component {
    constructor(props){
        super(props)
        this.state={
            data:{
                records:[],
                total:0,
                current:1
            },
            //11:公司制,12:合伙企业,13:个体工商户,14:事业单位/社会团体,15:其他",
            DictionaryList:[{value:11,name:'公司制'},{value:12,name:'合伙企业'},{value:13,name:'个体工商户'},{value:14,name:'事业单位/社会团体'},{value:15,name:'其他'},]
        }
    }
    componentDidMount() {
        this.getData()

    }

    getData=(info={})=>{
        let obj={
            status:8,
            ...info,
            current:info.current||1,
            appealName:this.props.form.getFieldValue('appealName')||'',
            nature:this.props.form.getFieldValue('nature')||'',
        }
        UnionpayModel.getAppealPage({...obj,size:10},success=>{
            let submit = {
                current: obj.current,
                ...(success.data)
            }
            this.setState({data:submit})
        })
    }
    render() {
        const {data,DictionaryList}=this.state
        const crumb = [
            {name: '服务申请管理'},
            {name: '待收POS机费用列表'},
        ]
        const {getFieldDecorator, resetFields} = this.props.form
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
            title: '申请单号',
            dataIndex: 'appealSn',
            key: 'appealSn',
        }, {
            title: '处理时间',
            dataIndex: 'time',
            sorter: (a, b) => a.time - b.time,
            key: 'time',
            render: (a, b, c) => {
                return a ? moment(a).format('YYYY-MM-DD HH:mm:ss') : ''
            }
        },
            {
                title: '申请商户名',
                dataIndex: 'appealName',
                key: 'appealName',
            },
            {
                title: '商户性质',
                dataIndex: 'nature',
                key: 'nature',
                render:(a,b,c)=>{
                    const status=(a)=>{
                        //11:公司制,12:合伙企业,13:个体工商户,14:事业单位/社会团体,15:其他",
                        switch (a) {
                            case 11:return'公司制'
                            case 12:return'合伙企业'
                            case 13:return'个体工商户'
                            case 14:return'事业单位/社会团体'
                            case 15:return'其他'
                            default:return ''

                        }

                    }
                    return <span>{status(a)}</span>
                }
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                render:(a,b,c)=>{
                    const status = (e) => {
                        //（0：草稿 1：待初审 2：待寄合同 3：初审驳回 4：待收合同 5：待二次审核 6：待交押金 7：二次审核驳回 8：待收押金 9：待寄POS机 10：待收POS机 11：已收POS机）
                        let obj = {
                            0: '草稿',
                            1: '待初审',
                            2: '待寄合同',
                            3: '初审驳回',
                            4: '待收合同',
                            5: '待二次审核',
                            6: '待交POS机费用',
                            7: '二次审核驳回',
                            8: '待收POS机费用',
                            9: '待寄POS机',
                            10: '待收POS机',
                            11: '已收POS机'
                        }
                        return obj[e] || ''
                    }
                    return <span>{status(a)}</span>
                }
            },
            {
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
                render: (a, b, c) => {
                    return <Button size='small' type='primary'
                                   onClick={() => {
                                       return this.props.history.push(`/Pages/ServiceApplicationDepositReceivedDetail?id=${b.appealId}`)

                                   }}>操作</Button>
                }
            }]
        return (
            <ViewContent crumb={crumb}>
                <Row span={24}>
                    <Col span={6}>
                        <FormItem {...formItemLayout} label="申请商户名">
                            {getFieldDecorator('appealName')(<Input placeholder='请输入'/>)}
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem {...formItemLayout} label="商户性质">
                            {getFieldDecorator('nature', {initialValue: ''})(
                                <Select style={{width: '100%'}}>
                                    <Option value={''}>全部</Option>
                                    {DictionaryList.map((v,k)=>{
                                            return <Option value={v.value} key={k}>{v.name}</Option>
                                        }
                                    )}
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={12} style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginTop: 9
                    }}>
                        <Button type='primary' onClick={() => {
                            this.getData()
                        }}>搜索</Button>
                        <Button style={{marginLeft: 15}} onClick={() => {
                            resetFields()
                        }}>重置</Button>
                    </Col>
                </Row>
                <Table dataSource={data.records} columns={columns}
                       pagination={
                           {
                               total:data.total,
                               current:data.current,
                               pageSize:10,
                               onChange: (a, b) => {
                                   this.getData({current:a})
                               },
                               showTotal: (total, range) => `共有${total}条`
                           }
                       }/>
            </ViewContent>
        )
    }

}

const ServiceApplicationDepositReceived = ServiceApplicationDepositReceiveds
export default ServiceApplicationDepositReceived

