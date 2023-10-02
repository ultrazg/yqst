import React, {Component} from 'react'
import ViewContent from "../../../../baseview/viewContent/ViewContent";
import {Button, Card, Col, Form, Input, Radio, Row, Select, Table, Tabs, Steps} from "antd";
import moment from 'moment'
import UnionpayModel from "../../model/UnionpayModel";
import {RViewer, RViewerTrigger} from "../../../../baseview/react-viewerjs/lib";

const FormItem = Form.Item
const Option = Select.Option
const TabPane = Tabs.TabPane;
const Step = Steps.Step;

class ServiceApplicationCompletedDetails extends Component {
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

    render() {
        const {data, LogList} = this.state
        const {
            appealUserVO,
            appealManageVO,
            appealServiceVO,
            appealAnnexVO
        } = data
        const crumb = [
            {name: '服务申请管理'},
            {name: '已完成列表'},
            {name: '申请详情'},
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
        const momentTime = (e, isHorse = true) => (e ? moment(e).format(isHorse ? `YYYY-MM-DD HH:mm:ss` : `YYYY-MM-DD`) : '')
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
                                {title: '申请单号', value: data.appealSn},
                                {title: '提交时间', value: momentTime(data.time)},
                                {title: '申请商户名', value: data.appealName},
                                {title: '商户性质', value: nature(data.nature)},
                                {title: '状态', value: <span style={{color: '#ee9849'}}>{status(data.status)}</span>},
                            ], [12, 10, 14])}
                        </Col>
                        <Col span={9}
                             style={{display: 'flex', justifyContent: 'center', algorithm: 'center'}}>
                            {/*<span>*/}
                            {/*<Button type='primary' style={{marginRight: 20}} onClick={() => {*/}
                            {/*}}>通过</Button>*/}
                            {/*<Button onClick={() => {*/}
                            {/*}}>驳回</Button>*/}
                            {/*</span>*/}
                        </Col>
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
                                            {headerList([
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
                                            {headerList([
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
                                            {headerList([
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
                                            {headerList([
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
                                            {headerList([
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
                                <Col span={24}>
                                    <Steps direction="vertical" current={LogList.length - 1}>
                                        {(LogList.reverse()).map((v, k) => {
                                            return (
                                                <Step
                                                    size='small'
                                                    key={k}
                                                    title={v.title}
                                                    description={
                                                        <span>
                                                             {v.mome ? <p>驳回原因：{v.mome}</p> : null}
                                                            <p>时间：{momentTime(v.createTime) || ''}</p>
                                                        </span>
                                                    }
                                                />
                                            )
                                        })}
                                    </Steps>
                                </Col>
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
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

    showModal = (url) => {
        this.setState({
            // visible: true,
            imgUrl: url
        });
        setTimeout(() => {
            this.showPicPreview && this.showPicPreview.click();
        }, 1)
    }

}

const ServiceApplicationCompletedDetail = Form.create()(ServiceApplicationCompletedDetails)
export default ServiceApplicationCompletedDetail
