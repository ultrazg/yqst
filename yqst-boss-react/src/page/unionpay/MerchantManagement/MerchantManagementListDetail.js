import React, {Component} from 'react'
import ViewContent from "../../../baseview/viewContent/ViewContent";
import {Button, Card, Col, Form, Input, Radio, Row, Select, Table, Tabs, Steps, Modal, message} from "antd";
import moment from 'moment'
import UnionpayModel from "../model/UnionpayModel";

const FormItem = Form.Item
const Option = Select.Option
const TabPane = Tabs.TabPane;
const Step = Steps.Step;

class MerchantManagementListDetails extends Component {
    id = this.props.location.search.split('?id=')[1]

    constructor(props) {
        super(props)
        this.state = {
            data: {
                merchantMessageVO: {
                    getAppealUserDTO: {},
                    getAppealManageDTO: {},
                },
                listTerminalVOS: []
            },
            showModal: false,
            listTerminal: {
                obj: {},
                title: '添加'
            }
        }
    }

    componentDidMount() {
        this.getData({id: this.id})
    }

    getData = (info = {id: this.id}) => {
        UnionpayModel.getMerchantDetails({...info}, success => {
            let obj = {
                merchantMessageVO: {
                    getAppealUserDTO: {},
                    getAppealManageDTO: {},
                },
                listTerminalVOS: [],
                ...(success.data),
            }
            this.setState({data: obj})
        })
    }

    render() {
        const {data, showModal, listTerminal} = this.state
        const crumb = [
            {name: '商户管理'},
            {name: '商户列表'},
            {name: '商户列表详情'},
        ]
        const {getFieldDecorator, getFieldValue} = this.props.form
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
        const momentTime = (e,isHorse=true) => (e ? moment(e).format(isHorse?`YYYY-MM-DD HH:mm:ss`:`YYYY-MM-DD`) : '')
        const headerList = (array, span = [12, 8, 16], rightBtn = {
            title: '', onClick: () => {
            }
        }, leftBtn = {
            title: '', onClick: () => {
            }
        }) => {
            //span配置比例 1/24为每份比例
            return (array || []).map((v) => (
                <Col span={span[0]} style={{padding: 10}}>
                    <Col span={span[1]} style={{textAlign: 'right', fontWeight: 600}}>
                        {leftBtn.title ? <Button
                            style={{float: 'left'}}
                            type='primary' size='small'
                            onClick={leftBtn.onClick}>
                            {leftBtn.title}
                        </Button> : null}
                        {v.title}：
                    </Col>
                    <Col span={span[2]}>{v.value}
                        {rightBtn.title ? <Button
                            style={{float: 'right'}}
                            type='primary' size='small'
                            onClick={rightBtn.onClick}>
                            {rightBtn.title}
                        </Button> : null}
                    </Col>
                </Col>
            ))
        }
        const {getAppealUserDTO, getAppealManageDTO} = data.merchantMessageVO
        return (
            <ViewContent crumb={crumb}>
                <Row style={{padding: 15}}>
                    <Col span={24}>
                        <Col span={15} style={{
                            height: 'auto',
                            border: '1px solid #eee',
                            borderRadius: 10,
                            boxShadow: '3px 3px 5px #eee'
                        }}>
                            {headerList([
                                {title: '企业名称', value: data.companyName},
                                {title: '商户名', value: data.name},
                                {title: '商户编号', value: data.merchantSn},
                                {title: '创建时间', value: momentTime(data.createTime)},
                            ], [12, 10, 14])}
                        </Col>
                        {/*<Col span={9}*/}
                        {/*style={{display: 'flex', justifyContent: 'center', algorithm: 'center'}}>*/}
                        {/*<span>*/}
                        {/*<Button type='primary' style={{marginRight:20}} onClick={() => {*/}
                        {/*}}>通过</Button>*/}
                        {/*<Button  onClick={() => {*/}
                        {/*}}>驳回</Button>*/}
                        {/*</span>*/}
                        {/*</Col>*/}
                    </Col>
                    <Col span={24} style={{marginTop: 20}}>
                        <Tabs defaultActiveKey="1" onChange={() => {
                        }}>
                            <TabPane tab="商户信息" key="1">
                                <Card
                                    style={{marginTop: 16}}
                                    type="inner"
                                    title="商户基本信息"
                                >
                                    <Col span={24}>
                                        <Col span={24}>
                                            {headerList([
                                                {title: '营业执照注册名称', value: (getAppealUserDTO||{}).registerName},
                                                {title: '注册地址', value: (getAppealUserDTO||{}).registerAddress},
                                                {title: '营业名称', value: (getAppealUserDTO||{}).businessName},
                                                {title: '营业地址', value: (getAppealUserDTO||{}).businessAddress},
                                                {title: '营业执照号码', value: (getAppealUserDTO||{}).businessLicense},
                                                {
                                                    title: '营业执照有效期',
                                                    value:
                                                        <span>{momentTime((getAppealUserDTO||{}).businessBeginTime,false)}至{momentTime((getAppealUserDTO||{}).businessEndTime,false)}</span>
                                                },
                                                {title: '联系人', value: (getAppealUserDTO||{}).contact},
                                                {title: '联系号码', value: (getAppealUserDTO||{}).contactPhone},
                                                {title: '法人代表', value: (getAppealUserDTO||{}).lawPerson},
                                                {title: '证件类型', value: {2: '身份证', 3: '其他'}[(getAppealUserDTO||{}).idType]},
                                                {title: '证件号码', value: (getAppealUserDTO||{}).idCard},
                                                {
                                                    title: '证件有效期',
                                                    value:
                                                        <span>{momentTime((getAppealUserDTO||{}).idBeginTime,false)}至{momentTime((getAppealUserDTO||{}).idEndTime,false)}</span>
                                                },
                                                {title: '控股股东', value: (getAppealUserDTO||{}).shareholder},
                                                {title: '证件类型', value: {2: '身份证', 3: '其他'}[(getAppealUserDTO||{}).sIdType]},
                                                {title: '证件号码', value: (getAppealUserDTO||{}).sIdCard},
                                                {
                                                    title: '证件有效期',
                                                    value:
                                                        <span>{momentTime((getAppealUserDTO||{}).sIdBeginTime,false)}至{momentTime((getAppealUserDTO||{}).sIdEndTime,false)}</span>
                                                },
                                                {title: '商户销售方式', value: {5:'实地交易', 6:'网上交易', 7:'电购',8:'邮购', 9:'其他'}[(getAppealUserDTO||{}).saleWay]},
                                                {title: '商户性质', value: {11:'公司制', 12:'合伙企业', 13:'个体工商户',14:'事业单位/社会团体', 15:'其他'}[(getAppealUserDTO||{}).nature]},
                                                {title: '商户开户行名称', value: (getAppealUserDTO||{}).bankName},
                                                {title: '商户开户行账号', value: (getAppealUserDTO||{}).bankNumber},
                                                {title: '邮编', value: (getAppealUserDTO||{}).zipCode},
                                            ], [8, 10, 14])}
                                        </Col>
                                    </Col>
                                </Card>
                                <Card
                                    style={{marginTop: 16}}
                                    type="inner"
                                    title="商户经营信息"
                                >
                                    <Col span={24}>
                                        <Col span={24}>
                                            {headerList([
                                                {title: '营业用地性质', value:{17:'自有', 18:'私用'}[(getAppealManageDTO||{}).nature]},
                                                {title: '商户用地面积', value: (getAppealManageDTO||{}).acreage},
                                                {title: '经营地段', value:{20:'商业区',21:'工业区',22:'住宅区'}[(getAppealManageDTO||{}).area]},
                                                {
                                                    title: '营业时间',
                                                    value:
                                                        <span>{(getAppealManageDTO||{}).beginTime}至{(getAppealManageDTO||{}).endTime}</span>
                                                },
                                                {title: '商户属性', value:{28:'对公商户',29:'个体商户'}[(getAppealManageDTO||{}).attribute]},
                                                {title: '员工人数', value: (getAppealManageDTO||{}).staffNumber},
                                                {title: '主业', value: (getAppealManageDTO||{}).majorWork},
                                                {title: '电话', value: (getAppealManageDTO||{}).tel},
                                                {title: '传真', value: (getAppealManageDTO||{}).fax},
                                                {title: '经营区域', value:{24:'城区', 25:'郊区', 26:'边远地区'}[(getAppealManageDTO||{}).region]},
                                                {title: '负责人', value: (getAppealManageDTO||{}).chargePerson},
                                                {title: '职务', value: (getAppealManageDTO||{}).post},
                                            ], [8, 10, 14])}
                                        </Col>
                                    </Col>
                                </Card>
                            </TabPane>
                            <TabPane tab="商户终端管理" key="2">
                                <Col span={24}>
                                    <p><Button
                                        icon='plus'
                                        onClick={() => {
                                            listTerminal.obj = {}
                                            listTerminal.title = '添加'
                                            this.setState({showModal: true, listTerminal: listTerminal})
                                        }}
                                    >添加</Button></p>
                                    <Table
                                        bordered
                                        dataSource={data.listTerminalVOS}
                                        columns={[{
                                            title: '序号',
                                            dataIndex: 'index',
                                            key: 'index',
                                            render: (a, b, c) => {
                                                return <span>{c}</span>
                                            }
                                        }, {
                                            title: '终端编号',
                                            dataIndex: 'terminalSn',
                                            key: 'terminalSn',
                                        }, {
                                            title: '绑定时间',
                                            dataIndex: 'createTime',
                                            key: 'createTime',
                                            render: (a, b, c) => {
                                                return a ? momentTime(a) : ''
                                            }
                                        }, {
                                            title: '操作',
                                            dataIndex: 'operation',
                                            key: 'operation',
                                            render: (a, b, c) => {
                                                return <span>
                                               <Button size='small' type='primary' style={{marginRight: '10px'}}
                                                       onClick={() => {
                                                           listTerminal.obj = {
                                                               ...b
                                                           }
                                                           listTerminal.title = '修改'
                                                           this.setState({showModal: true, listTerminal: listTerminal})

                                                       }}>修改</Button>
                                               <Button size='small' type='danger'
                                                       onClick={() => {
                                                           Modal.confirm({
                                                               title: '删除',
                                                               onOk: () => {
                                                                   let obj = {
                                                                       id: b.id
                                                                   }
                                                                   UnionpayModel.getMerchantTerminalDelete({...obj}, success => {
                                                                       this.getData()
                                                                       return message.success('删除成功!')
                                                                   })
                                                               },
                                                               onCancel() {

                                                               },
                                                           })
                                                       }}>删除</Button>
                                           </span>
                                            }
                                        }]}
                                    />
                                </Col>
                            </TabPane>
                            {/*<TabPane tab="商户流水信息" key="3">*/}
                            {/*<Col span={24}>*/}
                            {/*</Col>*/}
                            {/*</TabPane>*/}
                        </Tabs>
                    </Col>
                </Row>
                {
                    showModal ?
                        <Modal
                            title={listTerminal.title}
                            visible={true}
                            onOk={() => this.setState({showModal: false})}
                            onCancel={() => this.setState({showModal: false})}
                            footer={<span>
                            <Button
                                type='primary'
                                style={{marginRight: '10px'}}
                                onClick={() => {
                                    let obj = {
                                        id: listTerminal.obj.id || '',
                                        merchantId: listTerminal.obj.merchantId || data.id,
                                        terminalSn: getFieldValue('terminalSn')
                                    }
                                    if (!getFieldValue('terminalSn')) {
                                        return message.warning('请先输入终端编号')
                                    }
                                    UnionpayModel.getMerchantTerminalSave({...obj}, success => {
                                        this.getData()
                                        this.setState({showModal: false})
                                        return message.success(listTerminal.title+'成功!')
                                    })
                                }}
                            >
                                确定
                            </Button>
                            <Button onClick={() => this.setState({showModal: false})}>取消</Button>
                        </span>}>
                            <Row>
                                <Col span={24}>
                                    <FormItem {...formItemLayout} label="终端编号">
                                        {getFieldDecorator('terminalSn', {initialValue: listTerminal.obj.terminalSn})(
                                            <Input placeholder='请输入'/>)}
                                    </FormItem>
                                </Col>
                            </Row>
                        </Modal>
                        : null}
            </ViewContent>
        )
    }

}

const MerchantManagementListDetail = MerchantManagementListDetails
export default MerchantManagementListDetail
