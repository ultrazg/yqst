/**
 * Created by yb on 2019/09/16.
 */

import React, {Component} from 'react';
import {Form, Button, Modal, Card, Table, Tabs, Timeline, Row, Col} from 'antd';
import {Link} from "react-router-dom";
import Model from "../../Model";
import moment from 'moment'
import SWTable from 'SWViews/table';
import SwitchStatus from "./SwitchStatus";
import AssemblySet from "../../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../../baseview/viewContent/ViewContent";
import NumberFormat from "../../../../utils/numberformat/NumberFormat";
import {RollbackOutlined} from "@ant-design/icons";

const { TabPane } = Tabs;


class RedInvoiceApplyDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                getBlueApplyVO: {},
            },
            uLogList: [],
        };
        this.id = '';
    }

    componentDidMount() {
        this.id = this.props.location.search.substr(1).split("=")[1];
        if (this.id) {
            this.getInfo();
            this.getUserLogList();
        }
    }

    // 视图层
    render() {
        return (
            <ViewContent
                crumb={[
                    {name: '税票中心'},
                    {name: "发票管理"},
                    {name: "红冲发票申请列表", link: '/Pages/RedInvoiceApplyList'},
                    {name: "红冲发票申请详情"}
                ]}
                topBtn = {
                    <div>
                        {/*<Button type="primary" icon={'edit'}>编辑</Button>
                        <Button type="danger" icon={'delete'} style={{marginLeft: 15}}
                                onClick={() => {
                                    // this.delData();
                                }}
                        >删除</Button>*/}
                        <Link to={'/Pages/RedInvoiceApplyList'} style={{marginLeft: 15}}>
                            <Button icon={<RollbackOutlined />}>返回</Button>
                        </Link>
                    </div>
                }
            >
                {this.makeBaseView()}
            </ViewContent>
        );
    }

    getInfo() {
        Model.InvoiceRAGet({redApplyId: this.id}, (res) => {
            this.setState({data: res.data});
        }, (err) => {
        });
    }

    getUserLogList() {
        Model.InvoiceMULog({invoiceId: this.id, invoiceManageType: 1}, (res) => {
            this.setState({uLogList: res.data || []});
        }, (err) => {
        });
    }

    makeBaseView() {
        let {data} = this.state;
        let {getBlueApplyVO} = data;
        let allData = [
            {
                title: '基本信息',
                key: 'JBKey',
                data: [
                    {key: 'redApplySn', type: 'Texts', label: '红冲发票申请单号', span: 12, value: data.redApplySn},
                    {key: 'invoiceType', type: 'Texts', label: '发票类型', span: 12,
                        value: SwitchStatus.invoiceType(data.invoiceType)},
                    {key: 'createTime', type: 'Texts', label: '申请时间', span: 12,
                        value: data.createTime ? moment(data.createTime).format('YYYY-MM-DD HH:mm:ss') : ''},
                    {key: 'status', type: 'Texts', label: '申请状态', span: 12,
                        value: SwitchStatus.status(data.status)},
                    {key: 'classifyId', type: 'Texts', label: '发票分类ID', span: 12, value: getBlueApplyVO.classifyId},
                    {key: 'classifyName', type: 'Texts', label: '发票分类', span: 12, value: getBlueApplyVO.classifyName},
                    {key: 'invoiceAmount', type: 'Texts', label: '红冲金额', span: 12,
                        value: NumberFormat.thousandBit(data.invoiceAmount || 0, 2, true)},
                    {key: 'blueSn', type: 'Texts', label: '原蓝字发票单号', span: 12, value: data.blueSn},
                    {key: 'redSn', type: 'Texts', label: '红冲发票单号', span: 12, value: data.redSn},
                ],
                style: {},
            },
            {
                title: '销售方',
                key: 'XSKey',
                data: [
                    {key: 'sellerId', type: 'Texts', label: '企业ID', span: 12, value: getBlueApplyVO.sellerId},
                    {key: 'sellerName', type: 'Texts', label: '企业名称', span: 12, value: getBlueApplyVO.sellerName},
                    {key: 'sellerInvoiceName', type: 'Texts', label: '开票名称', span: 12, value: getBlueApplyVO.sellerInvoiceName},
                    {key: 'sellerTaxpayerNumber', type: 'Texts', label: '纳税人识别号', span: 12, value: getBlueApplyVO.sellerTaxpayerNumber},
                    {key: 'sellerAddressPhone', type: 'Texts', label: '地址、电话', span: 12, value: getBlueApplyVO.sellerAddressPhone},
                    {key: 'sellerAccountNumber', type: 'Texts', label: '开户行及账号', span: 12, value: getBlueApplyVO.sellerAccountNumber},
                ],
                style: {
                    marginTop: 15
                },
            },
            {
                title: '购买方',
                key: 'GMKey',
                data: [
                    {key: 'buyerId', type: 'Texts', label: '个人用户ID', span: 12, value: getBlueApplyVO.buyerId},
                    {key: 'buyerName', type: 'Texts', label: '个人用户名称', span: 12, value: getBlueApplyVO.buyerName},
                    {key: 'userId', type: 'Texts', label: '企业ID', span: 12, value: data.userId},
                    {key: 'userName', type: 'Texts', label: '企业名称', span: 12, value: data.userName},
                    {key: 'buyerRiseName', type: 'Texts', label: '抬头名称', span: 12, value: getBlueApplyVO.buyerRiseName},
                    {key: 'buyerTaxpayerNumber', type: 'Texts', label: '纳税人识别号', span: 12, value: getBlueApplyVO.buyerTaxpayerNumber},
                    {key: 'buyerAddressPhone', type: 'Texts', label: '地址、电话', span: 12, value: getBlueApplyVO.buyerAddressPhone},
                    {key: 'buyerAccountNumber', type: 'Texts', label: '开户行及账号', span: 12, value: getBlueApplyVO.buyerAccountNumber},
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
                        <AssemblySet key={item.key} data={item.data} form={this.props.form}/>
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
                        this.state.uLogList && this.state.uLogList.map((item, idx) => {
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
                        this.state.uLogList && this.state.uLogList.length <= 0 && <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>
                            暂无记录...
                        </div>
                    }
                </Timeline>
            </Card>
        </div>
    }
}

export default RedInvoiceApplyDetail
