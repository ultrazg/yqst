import React, {Component} from 'react'
import ViewContent from "../../../baseview/viewContent/ViewContent";
import {Button, Row, Col, Form, Input, Select, Table} from "antd";
import moment from 'moment'
import UnionpayModel from "../model/UnionpayModel";

const FormItem = Form.Item
const Option = Select.Option

class MerchantManagementLists extends Component {
    constructor() {
        super()
        this.state = {
            data:{
                records:[],
                total:0,
                current:1
            }
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = (info={},isSearch=false) => {
        let obj={
            ...info,
            current:info.current||1,
            name:this.props.form.getFieldValue('name')||'',
            merchantSn:this.props.form.getFieldValue('merchantSn')||'',
        }
           UnionpayModel.getMerchantPage({...obj,size:10},success=>{
               let obj1={
                   records:success.data.records,
                   total:success.data.total,
                   current:isSearch?1:obj.current
               }
               this.setState({
                   data:{...obj1}
               })
           })
    }

    render() {
        const {data}=this.state
        const crumb = [
            {name: '商户管理'},
            {name: '商户列表'},
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
            title: '序号',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: '企业名称',
            dataIndex: 'companyName',
            key: 'companyName',
        }, {
            title: '商户名',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '商户编号',
            dataIndex: 'merchantSn',
            key: 'merchantSn',
        }, {
            title: '创建时间',
            dataIndex: 'createTime',
            sorter: (a, b) => a.createTime - b.createTime,
            key: 'createTime',
            render: (a, b, c) => {
                return a ? moment(a).format('YYYY-MM-DD HH:mm:ss') : ''
            }
        },
            {
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
                render: (a, b, c) => {
                    return <Button size='small' type='primary'
                                   onClick={() => {
                                       return this.props.history.push(`/Pages/MerchantManagementListDetail?id=${b.id}`)
                                   }}>操作</Button>
                }
            }]
        return (
            <ViewContent crumb={crumb}>
                <Row>
                    <Col span={6}>
                        <FormItem {...formItemLayout} label="商户名">
                            {getFieldDecorator('name')(<Input placeholder='请输入'/>)}
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem {...formItemLayout} label="商户编号">
                            {getFieldDecorator('merchantSn')(<Input placeholder='请输入'/>)}
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

const MerchantManagementList = MerchantManagementLists
export default MerchantManagementList


