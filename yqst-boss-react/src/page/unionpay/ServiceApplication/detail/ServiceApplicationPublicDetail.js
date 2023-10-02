/**
 * Created by ljy on 2019-01-24
 */
import React, {Component} from 'react'
import ViewContent from "../../../../baseview/viewContent/ViewContent";
import {Button, Card, Col, Form, Input, message, Modal, Radio, Row, Select, Steps, Table, Tabs, Timeline} from "antd";
import moment from 'moment'
import UnionpayModel from "../../model/UnionpayModel";
import {RViewer, RViewerTrigger} from "../../../../baseview/react-viewerjs/lib";
import ApiConst from '../../../../base/urls/ApiConst';
import ApiInterface from "../../../../base/urls/ApiInterface";

const FormItem = Form.Item
const Option = Select.Option
const TabPane = Tabs.TabPane;
const TextArea = Input.TextArea;

class ServiceApplicationPublicDetails extends Component {
    id = this.props.location.search.split('?id=')[1]

    constructor(props) {
        super(props)
        this.state = {
            data: {
                appealUserVO: {},
                appealManageVO: {},
                appealServiceVO: {},
                appealAnnexVO: {}
            },
            LogList: [],
            imgUrl: '',
            appealDeal: {
                isShow: false,
                isPass: true,
                submit: {
                    appealId: this.id,
                    status: '',
                    memo: ''
                }
            },

            isShowDownloadModal: false,
            downUrl: ""
        }
    }

    componentDidMount() {
        this.getData({appealId: this.id})
    }

    getData = (info = {appealId: this.id}) => {
        UnionpayModel.getAppealDetails({...info}, success => {
            let obj = {
                ...this.state.data,
                ...success.data
            }
            this.setState({data: obj})
        })
    }

    colorSelect(color = '') {
        switch (color) {
            case 'red':
                return '#F12C20'
            case 'green':
                return '#0FB64B'
            default:
                return "#333333"
        }
    }

    crumbConfig(status) {
        // 0：草稿 1：待初审 2：待寄合同 3：初审驳回 4：待收合同 5：待二次审核 6：待交POS机费用
        // 7：二次审核驳回 8：待收POS机费用 9：待寄POS机 10：待收POS机 11：已收POS机
        switch (status) {
            case 1:
            case 3:
            case 7:
                return [
                    {name: '服务申请管理'},
                    {name: '待初审列表', link: '/Pages/ServiceApplicationPendingTrial'},
                    {name: '申请详情'},
                ]
            case 2:
            case 4:
                return [
                    {name: '服务申请管理'},
                    {name: '待寄/待收合同列表', link: '/Pages/ServiceApplicationContractAccepted'},
                    {name: '申请详情'},
                ]
            case 5:
                return [
                    {name: '服务申请管理'},
                    {name: '待二次审核列表', link: '/Pages/ServiceApplicationAuditedTwice'},
                    {name: '申请详情'},
                ]
            case 6:
            case 8:
                return [
                    {name: '服务申请管理'},
                    {name: '待收POS机费用列表', link: '/Pages/ServiceApplicationDepositReceived'},
                    {name: '申请详情'},
                ]
            case 9:
            case 10:
                return [
                    {name: '服务申请管理'},
                    {name: '待收POS机列表', link: '/Pages/ServiceApplicationPOSMachine'},
                    {name: '申请详情'},
                ]
            case 11:
                return [
                    {name: '服务申请管理'},
                    {name: '已完成列表', link: '/Pages/ServiceApplicationCompleted'},
                    {name: '申请详情'},
                ]
            default :
                return [];
        }
    }

    rightBtnsConfig(status) {
        const {data, appealDeal} = this.state
        switch (status) {
            case 1:
            case 3:
            case 7:
                return <Col span={9}
                            style={{display: 'flex', justifyContent: 'center', algorithm: 'center'}}>
                    {data.status == 1 ? <span>
                                <Button type='primary' style={{marginRight: 20}} onClick={() => {
                                    appealDeal.isShow = true
                                    appealDeal.isPass = true
                                    this.setState({appealDeal: appealDeal})
                                }}>通过</Button>
                                <Button onClick={() => {
                                    appealDeal.isShow = true
                                    appealDeal.isPass = false
                                    this.setState({appealDeal: appealDeal})
                                }}>驳回</Button>
                            </span> : null}
                </Col>
            case 2:
            case 4:
                return <Col span={9}
                            style={{display: 'flex', justifyContent: 'center', algorithm: 'center'}}>
                    {data.status == 4 ? <span>
                                <Button type='primary' onClick={() => {
                                    Modal.confirm({
                                        title: '确定确定收到合同?',
                                        onOk: () => {
                                            let obj = {
                                                ...(appealDeal.submit),
                                                status: 5
                                            }
                                            UnionpayModel.getAppealDeal({...obj}, success => {
                                                this.getData()
                                                return message.success('操作成功')
                                            })
                                        },
                                        onCancel() {
                                        },
                                    });
                                }}>确定收到合同</Button>
                                <Button style={{marginLeft: 15}} onClick={() => {
                                    UnionpayModel.getAppealExpressGet({
                                        appealId: this.id,
                                        status: data.status
                                    }, success => {
                                        let obj = {
                                            "status": "0",
                                            "msg": "ok",
                                            "result": {
                                                "number": "",
                                                "type": "",
                                                "list": [],
                                                "deliverystatus": "",
                                                "issign": "1"
                                            },
                                            ...(() => {
                                                try {
                                                    return JSON.parse(success.data)
                                                } catch (e) {
                                                    return {}
                                                }
                                            })()
                                        }
                                        Modal.info({
                                            title: '物流信息',
                                            width: '50%',
                                            content: (
                                                <Row>
                                                    <Col span={24}>
                                                        {this.headerList([
                                                            {
                                                                title: '物流状态',
                                                                value: {
                                                                    1: '在途中',
                                                                    2: '派件中',
                                                                    3: '已签收',
                                                                    4: '派送失败'
                                                                }[parseInt(obj.result.deliverystatus)]
                                                            },
                                                            {title: '快递公司', value: obj.result.type},
                                                            {title: '快递单号', value: obj.result.number},
                                                        ], [24, 10, 14])}
                                                    </Col>
                                                    <Col span={24}>
                                                        <div style={{overflow: 'auto', maxHeight: 300}}>
                                                            <Timeline>
                                                                {obj.result.list.map((v, k) => {
                                                                    return <Timeline.Item>
                                                                        <div>
                                                                            <div style={{
                                                                                fontSize: 14,
                                                                                color: '#333',
                                                                                marginTop: 5
                                                                            }}>{v.status}</div>
                                                                            <div style={{
                                                                                fontSize: 13,
                                                                                color: '#666',
                                                                                marginTop: 5
                                                                            }}>{v.time}</div>
                                                                        </div>
                                                                    </Timeline.Item>
                                                                })}
                                                            </Timeline>
                                                        </div>
                                                    </Col>
                                                </Row>),
                                            onOk() {
                                            },
                                        });
                                    })
                                }}>查看物流</Button>
                            </span> : null}
                </Col>
            case 5:
                return <Col span={9}
                            style={{display: 'flex', justifyContent: 'center', algorithm: 'center'}}>
                    {data.status == 5 ? <span>
                                <Button type='primary' style={{marginRight: 20}} onClick={() => {
                                    Modal.confirm({
                                        title: '确定审核通过?',
                                        onOk: () => {
                                            let obj = {
                                                ...(appealDeal.submit),
                                                status: 6
                                            }
                                            UnionpayModel.getAppealDeal({...obj}, success => {
                                                this.getData()
                                                return message.success('操作成功')
                                            })
                                        },
                                        onCancel() {
                                        },
                                    });
                                }}>二次审核通过</Button>
                                <Button onClick={() => {
                                    appealDeal.isShow = true
                                    appealDeal.isPass = false
                                    this.setState({appealDeal: appealDeal})
                                }}>驳回</Button>
                            </span> : null}
                </Col>
            case 6:
            case 8:
                return <Col span={9}
                            style={{display: 'flex', justifyContent: 'center', algorithm: 'center'}}>
                    {data.status == 8 ? <span>
                                <Button type='primary' style={{marginRight: 20}} onClick={() => {
                                    Modal.confirm({
                                        title: '确定收到POS机费用?',
                                        onOk: () => {
                                            let obj = {
                                                ...(appealDeal.submit),
                                                status: 9
                                            }
                                            UnionpayModel.getAppealDeal({...obj}, success => {
                                                this.getData()
                                                return message.success('操作成功')
                                            })
                                        },
                                        onCancel() {
                                        },
                                    });
                                }}>确定收到POS机费用</Button>
                            </span> : null}
                </Col>
            case 9:
            case 10:
                return <Col span={9}
                            style={{display: 'flex', justifyContent: 'center', algorithm: 'center'}}>
                    {data.status == 9 ? <span>
                                <Button type='primary' onClick={() => {
                                    appealDeal.isShow = true
                                    appealDeal.isPass = true
                                    this.setState({appealDeal: appealDeal})
                                }}>填写POS机物流单号</Button>
                            </span> : null}
                    {data.status == 10 ? <span>
                    <Button style={{marginLeft: 15}} onClick={() => {
                        UnionpayModel.getAppealExpressGet({appealId: this.id, status: data.status}, success => {
                            let obj = {
                                "status": "0",
                                "msg": "ok",
                                "result": {
                                    "number": "",
                                    "type": "",
                                    "list": [],
                                    "deliverystatus": "",
                                    "issign": "1"
                                },
                                ...(() => {
                                    try {
                                        return JSON.parse(success.data)
                                    } catch (e) {
                                        return {}
                                    }
                                })()
                            }
                            Modal.info({
                                title: '物流信息',
                                width: '50%',
                                content: (
                                    <Row>
                                        <Col span={24}>
                                            {this.headerList([
                                                {
                                                    title: '物流状态',
                                                    value: {
                                                        1: '在途中',
                                                        2: '派件中',
                                                        3: '已签收',
                                                        4: '派送失败'
                                                    }[parseInt(obj.result.deliverystatus)]
                                                },
                                                {title: '快递公司', value: obj.result.type},
                                                {title: '快递单号', value: obj.result.number},
                                            ], [24, 10, 14])}
                                        </Col>
                                        <Col span={24}>
                                            <div style={{overflow: 'auto', maxHeight: 300}}>
                                                <Timeline>
                                                    {obj.result.list.map((v, k) => {
                                                        return <Timeline.Item>
                                                            <div>
                                                                <div style={{
                                                                    fontSize: 14,
                                                                    color: '#333',
                                                                    marginTop: 5
                                                                }}>{v.status}</div>
                                                                <div style={{
                                                                    fontSize: 13,
                                                                    color: '#666',
                                                                    marginTop: 5
                                                                }}>{v.time}</div>
                                                            </div>
                                                        </Timeline.Item>
                                                    })}
                                                </Timeline>
                                            </div>
                                        </Col>
                                    </Row>
                                ),
                                onOk() {
                                },
                            });
                        })
                    }}>查看物流</Button>
                    </span> : null}
                </Col>
            default :
                return <Col
                    span={9}
                    style={{display: 'flex', justifyContent: 'center', algorithm: 'center'}}/>
        }
    }

    headerList = (array, span = [12, 8, 16],
                  rightBtn = {
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
    formItemLayout = {
        labelCol: {
            xs: {span: 24},
            sm: {span: 8},
        },
        wrapperCol: {
            xs: {span: 24},
            sm: {span: 16},
        },
    };

    render() {
        const {data, LogList} = this.state
        const {
            appealUserVO,
            appealManageVO,
            appealServiceVO,
            appealAnnexVO
        } = data
        const {getFieldDecorator, resetFields} = this.props.form
        const momentTime = (e, isHorse = true) => (e ? moment(e).format(isHorse ? `YYYY-MM-DD HH:mm:ss` : `YYYY-MM-DD`) : '')
        const nature = (e) => {
            //11：公司制 12：合伙企业 13：个体工商户 14：事业单位/社会团体 15：其他
            let obj = {11: '公司制', 12: '公司制', 13: '公司制', 14: '公司制', 15: '公司制'}
            return obj[e] || ''
        }
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
        return (
            <ViewContent crumb={this.crumbConfig(data.status)}>
                <Row>
                    <Col span={24}>
                        <Col span={15} style={{
                            height: 'auto',
                            border: '1px solid #eee',
                            borderRadius: 10,
                            boxShadow: '3px 3px 5px #eee'
                        }}>
                            {this.headerList([
                                {title: '申请单号', value: data.appealSn},
                                {title: '提交时间', value: momentTime(data.time)},
                                {title: '申请商户名', value: data.appealName},
                                {title: '商户性质', value: nature(data.nature)},
                                {title: '状态', value: <span style={{color: '#ee9849'}}>{status(data.status)}</span>},
                            ], [12, 10, 14])}
                        </Col>
                        {this.rightBtnsConfig(data.status)}
                    </Col>
                    <Col span={24} style={{marginTop: 20}}>
                        <Tabs defaultActiveKey="1" onChange={(e) => {
                            if (e == 2) {
                                UnionpayModel.getAppealLogList({appealId: this.id}, success => {
                                    this.setState({LogList: success.data})
                                })
                            }
                        }}>
                            <TabPane tab="申请单信息" key="1">
                                <Card
                                    style={{marginTop: 16}}
                                    type="inner"
                                    title="商户基本信息"
                                >
                                    <Col span={24}>
                                        <Col span={24}>
                                            {this.headerList([
                                                {title: '营业执照注册名称', value: appealUserVO.registerName},
                                                {title: '注册地址', value: appealUserVO.registerAddress},
                                                {title: '营业名称', value: appealUserVO.businessName},
                                                {title: '营业地址', value: appealUserVO.businessAddress},
                                                {title: '营业执照号码', value: appealUserVO.businessLicense},
                                                {
                                                    title: '营业执照有效期',
                                                    value:
                                                        <span>{momentTime(appealUserVO.businessBeginTime, false)}至{momentTime(appealUserVO.businessEndTime, false)}</span>
                                                },
                                                {title: '联系人', value: appealUserVO.contact},
                                                {title: '联系号码', value: appealUserVO.contactPhone},
                                                {title: '法人代表', value: appealUserVO.lawPerson},
                                                {title: '证件类型', value: {2: '身份证', 3: '其他'}[appealUserVO.idType]},
                                                {title: '证件号码', value: appealUserVO.idCard},
                                                {
                                                    title: '证件有效期',
                                                    value:
                                                        <span>{momentTime(appealUserVO.idBeginTime, false)}至{momentTime(appealUserVO.idEndTime, false)}</span>
                                                },
                                                {title: '控股股东', value: appealUserVO.shareholder},
                                                {title: '证件类型', value: {2: '身份证', 3: '其他'}[appealUserVO.sIdType]},
                                                {title: '证件号码', value: appealUserVO.sIdCard},
                                                {
                                                    title: '证件有效期',
                                                    value:
                                                        <span>{momentTime(appealUserVO.sIdBeginTime, false)}至{momentTime(appealUserVO.sIdEndTime, false)}</span>
                                                },
                                                {
                                                    title: '商户销售方式',
                                                    value: {
                                                        5: '实地交易',
                                                        6: '网上交易',
                                                        7: '电购',
                                                        8: '邮购',
                                                        9: '其他'
                                                    }[appealUserVO.saleWay]
                                                },
                                                {
                                                    title: '商户性质',
                                                    value: {
                                                        11: '公司制',
                                                        12: '合伙企业',
                                                        13: '个体工商户',
                                                        14: '事业单位/社会团体',
                                                        15: '其他'
                                                    }[appealUserVO.nature]
                                                },
                                                {title: '商户开户行名称', value: appealUserVO.bankName},
                                                {title: '商户开户行账号', value: appealUserVO.bankNumber},
                                                {title: '邮编', value: appealUserVO.zipCode},
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
                                            {this.headerList([
                                                {title: '营业用地性质', value: {17: '自有', 18: '私用'}[appealManageVO.nature]},
                                                {title: '商户用地面积', value: appealManageVO.acreage},
                                                {
                                                    title: '经营地段',
                                                    value: {20: '商业区', 21: '工业区', 22: '住宅区'}[appealManageVO.area]
                                                },
                                                {
                                                    title: '营业时间',
                                                    value:
                                                        <span>{appealManageVO.beginTime}至{appealManageVO.endTime}</span>
                                                },
                                                {
                                                    title: '商户属性',
                                                    value: {28: '对公商户', 29: '个体商户'}[appealManageVO.attribute]
                                                },
                                                {title: '员工人数', value: appealManageVO.staffNumber},
                                                {title: '主业', value: appealManageVO.majorWork},
                                                {title: '电话', value: appealManageVO.tel},
                                                {title: '传真', value: appealManageVO.fax},
                                                {
                                                    title: '经营区域',
                                                    value: {24: '城区', 25: '郊区', 26: '边远地区'}[appealManageVO.region]
                                                },
                                                {title: '负责人', value: appealManageVO.chargePerson},
                                                {title: '职务', value: appealManageVO.post},
                                            ], [8, 10, 14])}
                                        </Col>
                                    </Col>
                                </Card>
                                <Card
                                    style={{marginTop: 16}}
                                    type="inner"
                                    title="受益所有人"
                                >
                                    <Col span={24}>
                                        <Col span={24}>
                                            {
                                                (appealUserVO.appealBenefits || []).map((v) => {
                                                    return <Col span={24}>{this.headerList([
                                                        {
                                                            title: '受益所有人名称',
                                                            value: v.name
                                                        },
                                                        {
                                                            title: '证件类型',
                                                            value: {2: '身份证', 3: '其他'}[v.idType]
                                                        },
                                                        {
                                                            title: '证件号码',
                                                            value: v.idCard
                                                        },
                                                        {
                                                            title: '地址',
                                                            value: v.address
                                                        },
                                                        {
                                                            title: '证件有效期',
                                                            value:
                                                                <span>{momentTime(v.idBeginTime, false)}至{momentTime(v.idEndTime, false)}</span>
                                                        },
                                                    ], [8, 10, 14])}
                                                    </Col>
                                                })
                                            }

                                        </Col>
                                    </Col>
                                </Card>
                                <Card
                                    style={{marginTop: 16}}
                                    type="inner"
                                    title="业务信息"
                                >
                                    <Col span={24}>
                                        <Col span={24} style={{padding: 10}}>
                                            <Radio checked={!!(appealServiceVO.cardFee || {}).zft}>支付通</Radio>
                                            <Radio checked={!!(appealServiceVO.cardFee || {}).tysy}>统一收银</Radio>
                                            <Radio checked={!!(appealServiceVO.cardFee || {}).qmfsyt}>全民付收银台</Radio>
                                            <Radio checked={!!(appealServiceVO.cardFee || {}).yxlm}>营销联盟</Radio>
                                        </Col>
                                        <Col span={24}>
                                            {this.headerList([
                                                {title: '结算账户名称', value: (appealServiceVO.cardFee || {}).name},
                                                {title: '结算账户', value: (appealServiceVO.cardFee || {}).account},
                                                {title: '结算开户行行号', value: (appealServiceVO.cardFee || {}).bankNumber},
                                                {title: '结算开户行名称', value: (appealServiceVO.cardFee || {}).bankName},
                                            ], [8, 10, 14])}
                                        </Col>
                                        <Col span={24} style={{padding: 10}}>
                                            <Radio checked={!!(appealServiceVO.quanminpayFee || {}).btc}>B扫C</Radio>
                                            <Radio checked={!!(appealServiceVO.quanminpayFee || {}).ctb}>C扫B</Radio>
                                            <Radio checked={!!(appealServiceVO.quanminpayFee || {}).yd}> 悦单</Radio>
                                        </Col>
                                        <Col span={24}>
                                            {this.headerList([
                                                {title: '结算账户名称', value: (appealServiceVO.quanminpayFee || {}).name},
                                                {title: '结算账户', value: (appealServiceVO.quanminpayFee || {}).account},
                                                {
                                                    title: '结算开户行行号',
                                                    value: (appealServiceVO.quanminpayFee || {}).bankNumber
                                                },
                                                {
                                                    title: '结算开户行名称',
                                                    value: (appealServiceVO.quanminpayFee || {}).bankName
                                                },
                                            ], [8, 10, 14])}
                                        </Col>
                                    </Col>
                                </Card>
                                <Card
                                    style={{marginTop: 16}}
                                    type="inner"
                                    title="终端设备"
                                >
                                    <Col span={24}>
                                        <Col span={24}>
                                            {this.headerList([
                                                {title: '申请设备台数', value: appealServiceVO.number},
                                                {title: '装机联系人', value: appealServiceVO.contact},
                                                {title: '联系电话', value: appealServiceVO.phone},
                                            ], [8, 10, 14])}
                                        </Col>
                                    </Col>
                                </Card>
                                <Card
                                    style={{marginTop: 16}}
                                    type="inner"
                                    title="附件照片"
                                >
                                    <Col span={24}>
                                        <Col span={12}>
                                            <Col span={24}><span style={{padding: 10}}>法人身份证正反面：</span></Col>
                                            <Col span={24} style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                flexWrap: 'wrap'
                                            }}>
                                                {
                                                    ((appealAnnexVO.idPhoto || '').split(',')).map((v, k) =>
                                                        <div key={k}
                                                             onClick={() => this.showModal(v)}
                                                             style={{
                                                                 border: '1px solid #eee',
                                                                 width: 100,
                                                                 height: 100,

                                                                 margin: 20,
                                                                 backgroundImage: `url(${v})`,
                                                                 backgroundSize: '98px',
                                                                 backgroundPosition: 'center',
                                                             }}/>
                                                    )
                                                }
                                            </Col>
                                        </Col>
                                        <Col span={12}>
                                            <Col span={24}><span style={{padding: 10}}>营业执照照片：</span></Col>
                                            <Col span={24} style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                flexWrap: 'wrap'
                                            }}>
                                                {
                                                    ((appealAnnexVO.businessLicense || '').split(',')).map((v, k) =>
                                                        <div key={k}
                                                             onClick={() => this.showModal(v)}
                                                             style={{
                                                                 border: '1px solid #eee',
                                                                 width: 100,
                                                                 height: 100,

                                                                 margin: 20,
                                                                 backgroundImage: `url(${v})`,
                                                                 backgroundSize: '98px',
                                                                 backgroundPosition: 'center',
                                                             }}/>
                                                    )
                                                }
                                            </Col>
                                        </Col>
                                        <Col span={12}>
                                            <Col span={24}><span style={{padding: 10}}>店面照片：</span></Col>
                                            <Col span={24} style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                flexWrap: 'wrap'
                                            }}>
                                                {
                                                    ((appealAnnexVO.shopPhoto || '').split(',')).map((v, k) =>
                                                        <div key={k}
                                                             onClick={() => this.showModal(v)}
                                                             style={{
                                                                 border: '1px solid #eee',
                                                                 width: 100,
                                                                 height: 100,

                                                                 margin: 20,
                                                                 backgroundImage: `url(${v})`,
                                                                 backgroundSize: '98px',
                                                                 backgroundPosition: 'center',
                                                             }}/>
                                                    )
                                                }
                                            </Col>
                                        </Col>
                                        <Col span={12}>
                                            <Col span={24}><span style={{padding: 10}}>招牌照片：</span></Col>
                                            <Col span={24} style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                flexWrap: 'wrap'
                                            }}>
                                                {
                                                    ((appealAnnexVO.signPhoto || '').split(',')).map((v, k) =>
                                                        <div key={k}
                                                             onClick={() => this.showModal(v)}
                                                             style={{
                                                                 border: '1px solid #eee',
                                                                 width: 100,
                                                                 height: 100,

                                                                 margin: 20,
                                                                 backgroundImage: `url(${v})`,
                                                                 backgroundSize: '98px',
                                                                 backgroundPosition: 'center',
                                                             }}/>
                                                    )
                                                }
                                            </Col>
                                        </Col>
                                        <Col span={12}>
                                            <Col span={24}><span style={{padding: 10}}>收银台照片：</span></Col>
                                            <Col span={24} style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                flexWrap: 'wrap'
                                            }}>
                                                {
                                                    ((appealAnnexVO.countPhoto || '').split(',')).map((v, k) =>
                                                        <div key={k}
                                                             onClick={() => this.showModal(v)}
                                                             style={{
                                                                 border: '1px solid #eee',
                                                                 width: 100,
                                                                 height: 100,

                                                                 margin: 20,
                                                                 backgroundImage: `url(${v})`,
                                                                 backgroundSize: '98px',
                                                                 backgroundPosition: 'center',
                                                             }}/>
                                                    )
                                                }
                                            </Col>
                                        </Col>
                                        <Col span={12}>
                                            <Col span={24}><span style={{padding: 10}}>开户许可证照片：</span></Col>
                                            <Col span={24} style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                flexWrap: 'wrap'
                                            }}>
                                                {
                                                    ((appealAnnexVO.openPermit || '').split(',')).map((v, k) =>
                                                        <div key={k}
                                                             onClick={() => this.showModal(v)}
                                                             style={{
                                                                 border: '1px solid #eee',
                                                                 width: 100,
                                                                 height: 100,

                                                                 margin: 20,
                                                                 backgroundImage: `url(${v})`,
                                                                 backgroundSize: '98px',
                                                                 backgroundPosition: 'center',
                                                             }}/>
                                                    )
                                                }
                                            </Col>
                                        </Col>
                                        <Col span={12}>
                                            <Col span={24}><span style={{padding: 10}}>银行卡正反面：</span></Col>
                                            <Col span={24} style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                flexWrap: 'wrap'
                                            }}>
                                                {
                                                    ((appealAnnexVO.bankPhoto || '').split(',')).map((v, k) =>
                                                        <div key={k}
                                                             onClick={() => this.showModal(v)}
                                                             style={{
                                                                 border: '1px solid #eee',
                                                                 width: 100,
                                                                 height: 100,

                                                                 margin: 20,
                                                                 backgroundImage: `url(${v})`,
                                                                 backgroundSize: '98px',
                                                                 backgroundPosition: 'center',
                                                             }}/>
                                                    )
                                                }
                                            </Col>
                                        </Col>
                                    </Col>
                                </Card>
                            </TabPane>
                            <TabPane tab="审批记录" key="2">
                                <Col span={24} style={{padding: 8}}>
                                    <Timeline>
                                        {(LogList).map((v, k) => {
                                            return (<Timeline.Item>
                                                <div>
                                                    <div style={{
                                                        fontSize: 15,
                                                        color: this.colorSelect(v.color),
                                                        marginTop: 5
                                                    }}>{v.title}</div>
                                                    {v.memo ? <div style={{
                                                        fontSize: 13,
                                                        color: '#333',
                                                        marginTop: 5
                                                    }}>备注：{v.memo}</div> : null}
                                                    <div style={{marginTop: 5}}>
                                                        {this.logBtns(v)}
                                                    </div>
                                                    <div style={{
                                                        fontSize: 13,
                                                        color: '#666',
                                                        marginTop: 5
                                                    }}>时间：{momentTime(v.createTime) || ''}</div>
                                                </div>
                                            </Timeline.Item>)
                                        })}
                                    </Timeline>
                                </Col>
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
                {this.renderPublicModal(data.status)}
                {this.downloadModal()}
                <RViewer options={{
                    toolbar: {//Since there is only one picture, let's hide "prev" and "next"
                        prev: false,
                        next: false
                    }
                }} imageUrls={this.state.imgUrl}>
                    <RViewerTrigger>
                        <div ref={(c) => {
                            this.showPicPreview = c
                        }}></div>
                    </RViewerTrigger>
                </RViewer>
            </ViewContent>
        )
    }

    logBtns(rowData) {
        let btn = null
        if (rowData.button) {
            let data = JSON.parse(rowData.button);
            const btnStr = () => {
                return data.type == 'contract' ? "下载合同"
                    : (data.type == 'express' ? '查看物流' : '')
                switch (data.type) {
                    case 'contract':
                        return "下载合同";
                    case 'express':
                        return "查看物流";
                    default:
                        break;
                }
            };
            const btnClick = () => {
                switch (data.type) {
                    case 'contract':
                        // UnionpayModel.UnionpayContractDownload({
                        //     appealId: this.id
                        // }, (res) => {
                        //
                        // }, () => {
                        // });
                        this.setState({downUrl: ApiConst.Versions().sunaw + data.data}, () => {
                            this.setState({
                                isShowDownloadModal: true
                            });
                        });
                        break;
                    case 'express':
                        UnionpayModel.getAppealExpressGet({
                            logId: rowData.logId
                        }, success => {
                            let obj = {
                                "status": "0",
                                "msg": "ok",
                                "result": {
                                    "number": "",
                                    "type": "",
                                    "list": [],
                                    "deliverystatus": "",
                                    "issign": "1"
                                },
                                ...(() => {
                                    try {
                                        return JSON.parse(success.data)
                                    } catch (e) {
                                        return {}
                                    }
                                })()
                            }
                            Modal.info({
                                title: '物流信息',
                                width: '50%',
                                content: (
                                    <Row>
                                        <Col span={24}>
                                            {this.headerList([
                                                {
                                                    title: '物流状态',
                                                    value: {
                                                        1: '在途中',
                                                        2: '派件中',
                                                        3: '已签收',
                                                        4: '派送失败'
                                                    }[parseInt(obj.result.deliverystatus)]
                                                },
                                                {title: '快递公司', value: obj.result.type},
                                                {title: '快递单号', value: obj.result.number},
                                            ], [24, 10, 14])}
                                        </Col>
                                        <Col span={24}>
                                            <div style={{overflow: 'auto', maxHeight: 300}}>
                                                <Timeline>
                                                    {obj.result.list.map((v, k) => {
                                                        return <Timeline.Item>
                                                            <div>
                                                                <div style={{
                                                                    fontSize: 14,
                                                                    color: '#333',
                                                                    marginTop: 5
                                                                }}>{v.status}</div>
                                                                <div style={{
                                                                    fontSize: 13,
                                                                    color: '#666',
                                                                    marginTop: 5
                                                                }}>{v.time}</div>
                                                            </div>
                                                        </Timeline.Item>
                                                    })}
                                                </Timeline>
                                            </div>
                                        </Col>
                                    </Row>),
                                onOk() {
                                },
                            });
                        });
                        break;
                    default:
                        break;
                }
                return data.type == 'contract' ? "下载合同"
                    : (data.type == 'express' ? '查看物流' : '')
            };
            btn = <Button
                type={'primary'}
                onClick={() => {
                    btnClick();
                }}>
                {btnStr()}
            </Button>;
        }
        return btn;
    }

    showModal = (url) => {
        this.setState({
            // visible: true,
            imgUrl: url
        });
        setTimeout(() => {
            this.showPicPreview && this.showPicPreview.click();
        }, 1)
    }

    renderPublicModal(status) {
        const {getFieldDecorator, resetFields} = this.props.form
        const {appealDeal} = this.state;
        switch (status) {
            case 1:
            case 3:
            case 7:
                return appealDeal.isShow ? <Modal
                    title={appealDeal.isPass ? "请填写合同单信息" : '请填写驳回原因'}
                    visible={true}
                    onOk={() => {
                        appealDeal.isShow = false;
                        this.setState({appealDeal: appealDeal})
                    }}
                    onCancel={() => {
                        appealDeal.isShow = false;
                        this.setState({appealDeal: appealDeal})
                    }}
                    footer={<span>
                        <Button style={{marginRight: 15}} onClick={() => {
                            appealDeal.isShow = false
                            this.setState({appealDeal: appealDeal})
                        }}>取消</Button>
                        <Button type='primary' onClick={() => {
                            let submit = this.props.form.getFieldsValue()
                            let obj = {}
                            if (appealDeal.isPass) {
                                if (!submit.orgName) {
                                    return message.warning('请输入收单机构名')
                                }
                                if (!submit.mcc) {
                                    return message.warning('请输入mcc')
                                }
                                if (!submit.businessNum) {
                                    return message.warning('请输入商户编号')
                                }
                                obj = {
                                    ...(appealDeal.submit),
                                    ...submit,
                                    status: 2
                                }
                            } else {
                                if (!submit.memo) {
                                    return message.warning('请输入审核驳回理由')
                                }
                                if (submit.memo.length > 50) {
                                    return message.warning('驳回理由不超过50个字')
                                }
                                obj = {
                                    ...(appealDeal.submit),
                                    ...submit,
                                    status: 3
                                }
                            }
                            UnionpayModel.getAppealDeal({...obj}, success => {
                                appealDeal.isShow = false;
                                this.setState({appealDeal: appealDeal})
                                this.getData()
                                return message.success('操作成功')
                            })
                        }}>{appealDeal.isPass ? '审核通过并生成合同' : '确定'}</Button>
                        </span>}
                >{appealDeal.isPass ?
                    <div>
                        <FormItem {...this.formItemLayout} label="收单机构名">
                            {getFieldDecorator('orgName', {initialValue: this.state.data.orgName || ''})(<Input
                                placeholder='请输入'/>)}
                        </FormItem>
                        <FormItem {...this.formItemLayout} label="商户服务类别码(mcc)">
                            {getFieldDecorator('mcc')(<Input placeholder='请输入'/>)}
                        </FormItem>
                        <FormItem {...this.formItemLayout} label="商户编号">
                            {getFieldDecorator('businessNum')(<Input placeholder='请输入'/>)}
                        </FormItem>
                    </div> : <FormItem {...this.formItemLayout} label="审核驳回理由">
                        {getFieldDecorator('memo')(<TextArea placeholder='请输入不超过50个字'/>)}
                    </FormItem>
                }</Modal> : null
            case 5:
                return appealDeal.isShow ? <Modal
                    title={'请填写驳回原因'}
                    visible={true}
                    onOk={() => {
                        appealDeal.isShow = false;
                        this.setState({appealDeal: appealDeal})
                    }}
                    onCancel={() => {
                        appealDeal.isShow = false;
                        this.setState({appealDeal: appealDeal})
                    }}
                    footer={<span>
                                   <Button style={{marginRight: 15}} onClick={() => {
                                       appealDeal.isShow = false
                                       this.setState({appealDeal: appealDeal})
                                   }}>取消</Button>
                                   <Button type='primary' onClick={() => {
                                       let submit = this.props.form.getFieldsValue()
                                       let obj = {}
                                       if (!submit.memo) {
                                           return message.warning('请输入审核驳回理由')
                                       }
                                       if (submit.memo.length > 50) {
                                           return message.warning('驳回理由不超过50个字')
                                       }
                                       obj = {
                                           ...(appealDeal.submit),
                                           ...submit,
                                           status: 7
                                       }
                                       UnionpayModel.getAppealDeal({...obj}, success => {
                                           appealDeal.isShow = false;
                                           this.setState({appealDeal: appealDeal})
                                           this.getData()
                                           return message.success('操作成功')
                                       })
                                   }}>确定</Button>
                        </span>}
                ><FormItem {...this.formItemLayout} label="审核驳回理由">
                    {getFieldDecorator('memo')(<TextArea placeholder='请输入不超过50个字'/>)}
                </FormItem>
                </Modal> : null
            case 9:
            case 10:
                return appealDeal.isShow ? <Modal
                    title={'填写POS机物流单号'}
                    visible={true}
                    onOk={() => {
                        appealDeal.isShow = false;
                        this.setState({appealDeal: appealDeal})
                    }}
                    onCancel={() => {
                        appealDeal.isShow = false;
                        this.setState({appealDeal: appealDeal})
                    }}
                    footer={<span>
                                   <Button style={{marginRight: 15}} onClick={() => {
                                       appealDeal.isShow = false
                                       this.setState({appealDeal: appealDeal})
                                   }}>取消</Button>
                                   <Button type='primary' onClick={() => {
                                       let submit = this.props.form.getFieldsValue()
                                       let obj = {}
                                       if (!submit.expressName) {
                                           return message.warning('请输入物流公司')
                                       }
                                       if (!submit.expressSn) {
                                           return message.warning('请输入物流单号')
                                       }
                                       obj = {
                                           ...(appealDeal.submit),
                                           ...submit,
                                           status: 10
                                       }
                                       UnionpayModel.getExpressSend({...obj}, success => {
                                           appealDeal.isShow = false;
                                           this.setState({appealDeal: appealDeal})
                                           this.getData()
                                           return message.success('操作成功')
                                       })
                                   }}>确定</Button>
                        </span>}
                >
                    <FormItem {...this.formItemLayout} label="物流公司">
                        {getFieldDecorator('expressName')(<Input placeholder='请输入'/>)}
                    </FormItem>
                    <FormItem {...this.formItemLayout} label="物流单号">
                        {getFieldDecorator('expressSn')(<Input placeholder='请输入'/>)}
                    </FormItem>
                </Modal> : null
            default:
                return null
        }
    }

    downloadModal() {
        return this.state.isShowDownloadModal ? <Modal
            maskClosable={false}
            visible={true}
            onCancel={() => {
                this.setState({
                    isShowDownloadModal: false
                });
            }}
            onOk={() => {
                try {
                    window.downloadZip(this.state.downUrl)
                    this.setState({
                        isShowDownloadModal: false
                    });
                } catch (e) {

                }
            }}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 16,
                marginBottom: 15,
                marginTop: 15
            }}>{"是否立即下载?"}</div>
        </Modal> : null
    }
}

const ServiceApplicationPublicDetail = ServiceApplicationPublicDetails
export default ServiceApplicationPublicDetail
