/**
 * Created by yb on 2019/09/16.
 */

import React, {Component} from 'react';
import {Form, Button, Card, Timeline} from 'antd';
import {RollbackOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import Model from "../../Model";
import moment from 'moment'
import SwitchName from "./SwitchName";
import AssemblySet from "../../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../../baseview/viewContent/ViewContent";
import NumberFormat from "../../../../utils/numberformat/NumberFormat";



class RefundManageDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                payerVO: {},
                receiverVO: {},
            },
            logList: []
        };
        this.id = '';
        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.id = this.props.location.search.substr(1).split("=")[1];
        if (this.id) {
            this.getInfo();
            this.getLogList();
        }
    }

    // 视图层
    render() {
        return (
            <Form ref={this.formRef}>
                <ViewContent
                    crumb={[
                        {name: '支付中心'},
                        {name: "用户资金管理"},
                        {name: "退款管理列表", link: '/Pages/RefundManageList'},
                        {name: "退款管理详情"}
                    ]}
                    topBtn = {
                        <div>
                            {/*<Button type="primary" icon={'edit'}>编辑</Button>*/}
                            <Link to={'/Pages/RefundManageList'} style={{marginLeft: 15}}>
                                <Button icon={<RollbackOutlined />}>返回</Button>
                            </Link>
                        </div>
                    }
                >
                    {this.makeBaseView()}
                </ViewContent>
            </Form>
        );
    }

    getInfo() {
        Model.walletPRefundGet({refundId: this.id}, (res) => {
            this.setState({data: res.data});
        }, (err) => {
        });
    }

    getLogList() {
        Model.walletPCLList({id: this.id, type: 2}, (res) => {
            this.setState({logList: res.data || []});
        }, (err) => {
        });
    }

    makeBaseView() {
        let {data} = this.state;
        let {payerVO, receiverVO} = data;

        let allData = [
            {
                title: '退款基本信息',
                key: 'JBKey',
                data: [
                    {key: 'refundSn', type: 'Texts', label: '退款单号', span: 12, value: data.refundSn},
                    {key: 'status', type: 'Texts', label: '状态', span: 12,
                        value: <span style={{color: SwitchName.statusName(data.status, 'color')}}>
                        {SwitchName.statusName(data.status)}
                    </span>},
                    {key: 'refundMoney', type: 'Texts', label: '退款金额', span: 12,
                        value: NumberFormat.thousandBit(data.refundMoney || 0, 2, true)},
                    {key: 'receiveSn', type: 'Texts', label: '收付款单号', span: 12, value: data.receiveSn},
                    {key: 'createTime', type: 'Texts', label: '产生时间', span: 12,
                        value: data.createTime ? moment(data.createTime).format('YYYY-MM-DD HH:mm:ss') : ''},
                ],
                style: {},
            },
            {
                title: '退款渠道信息',
                key: 'TKKey',
                data: [
                    {key: 'refundType', type: 'Texts', label: '退款类型', span: 12,
                        value: SwitchName.refundTypeName(data.refundType)},
                    {key: 'channelId', type: 'Texts', label: '收支付渠道ID', span: 12, value: data.channelId},
                    {key: 'channelName', type: 'Texts', label: '收支付渠道名称', span: 12, value: data.channelName},
                    {key: 'serialNumber', type: 'Texts', label: '流水单号', span: 12, value: data.serialNumber},
                    {
                        key: 'vouchers', type: 'UploadFile', label: '退款凭证', span: 12,
                        value: data.vouchers ? data.vouchers.split(',') : [],
                        data: {
                            maxNum: 1,
                            fileUrlList: data.vouchers ? data.vouchers.split(',') : [],
                            isDowload: false,
                            isReadOnly: true,
                        },
                    },
                    {key: 'accountId', type: 'Texts', label: '商户账户ID', span: 12, value: data.accountId},
                ],
                style: {
                    marginTop: 15
                },
            },
            {
                title: '付款方信息',
                key: 'FKFKey',
                data: [
                    {key: 'payPersonId', type: 'Texts', label: '付款用户ID', span: 12, value: payerVO.payPersonId},
                    {key: 'payPersonName', type: 'Texts', label: '付款用户名称', span: 12, value: payerVO.payPersonName},
                    {key: 'payId', type: 'Texts', label: '付款企业ID', span: 12, value: payerVO.payId},
                    {key: 'payName', type: 'Texts', label: '付款企业名称', span: 12, value: payerVO.payName}
                ],
                style: {
                    marginTop: 15
                },
            },
            {
                title: '收款方信息',
                key: 'SKFKey',
                data: [
                    {key: 'receiverPersonId', type: 'Texts', label: '收款用户ID', span: 12, value: receiverVO.receiverPersonId},
                    {key: 'receiverPersonName', type: 'Texts', label: '收款用户名称', span: 12, value: receiverVO.receiverPersonName},
                    {key: 'receiverId', type: 'Texts', label: '收款企业ID', span: 12, value: receiverVO.receiverId},
                    {key: 'receiverName', type: 'Texts', label: '收款企业名称', span: 12, value: receiverVO.receiverName},
                ],
                style: {
                    marginTop: 15
                },
            },
        ];
        return <div>
            {
                allData.map((item, idx) => {
                    return <Card
                        key={'car_' + idx}
                        type="inner"
                        title={item.title || '信息'}
                        style={item.style ? item.style : {}}
                        bodyStyle={item.bodyStyle ? item.bodyStyle : {}}
                    >
                        <AssemblySet key={item.key} data={item.data} form={this.formRef.current}/>
                    </Card>
                })
            }
            <Card
                type="inner"
                title="操作记录"
                style={{marginTop: 15}}
                bodyStyle={{paddingRight: 0}}
            >
                <Timeline
                    style={{
                        maxHeight: 300,
                        overflow: 'auto',
                        paddingTop: 15
                    }}
                >
                    {
                        this.state.logList.map((item, idx) => {
                            return <Timeline.Item key={'log_' + idx}>
                                <h3>{item.title}</h3>
                                <div>操作时间：{item.createTime ? moment(item.createTime).format('YYYY-MM-DD HH:mm:ss') : ''}</div>
                                <div>
                                    <span>企业ID：{item.userId}</span>
                                    <span style={{marginLeft: 25}}>企业名称：{item.userName}</span>
                                </div>
                                <div>
                                    <span>员工ID：{item.staffId}</span>
                                    <span style={{marginLeft: 25}}>员工名称：{item.staffName}</span>
                                </div>
                                <div>
                                    <span>个人用户ID：{item.personId}</span>
                                    <span style={{marginLeft: 25}}>个人用户名称：{item.personName}</span>
                                </div>
                            </Timeline.Item>
                        })
                    }

                    {
                        this.state.logList && this.state.logList.length <= 0 && <div style={{textAlign: 'center', fontSize: 20, color: '#ccc'}}>
                            暂无操作记录...
                        </div>
                    }
                </Timeline>
            </Card>
        </div>
    }
}

export default RefundManageDetail
