/**
 * Created by yb on 2019/09/16.
 */

import React, {Component} from 'react';
import {Form, Button, Card, Timeline} from 'antd';
import {RollbackOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import Model from "../Model";
import moment from 'moment'
import JudgeNames from "./JudgeNames";
import AssemblySet from "../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../baseview/viewContent/ViewContent";


class AfterOrderDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                buyerVO: {},
                sellerVO: {}
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
                        {name: '订单中心'},
                        {name: "售后单管理列表", link: '/Pages/AfterOrderList'},
                        {name: "售后单管理详情"}
                    ]}
                    topBtn = {
                        <div>
                            {/*<Button type="primary" icon={'edit'}>编辑</Button>*/}
                            <Link to={'/Pages/AfterOrderList'} style={{marginLeft: 15}}>
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
        Model.OrderASGet({afterSaleId: this.id}, (res) => {
            this.setState({data: res.data});
        }, (err) => {
        });
    }

    getLogList() {
        Model.OrderASLList({afterSaleId: this.id}, (res) => {
            this.setState({logList: res.data || []});
        }, (err) => {
        });
    }

    makeBaseView() {
        let {data} = this.state;
        let noSetDataOne = [
            {key: 'afterSaleSn', type: 'Texts', label: '售后单编号', span: 12, value: data.afterSaleSn},
            {key: 'status', type: 'Texts', label: '状态', span: 12,
                value: <span style={{color: JudgeNames.statusFun(data.status, 'colors')}}>
                        {JudgeNames.statusFun(data.status)}
                    </span>},
            {key: 'type', type: 'Texts', label: '售后类型', span: 12,
                value: JudgeNames.typeFun(data.type)},
            {key: 'deliverySn', type: 'Texts', label: '收发货单编号', span: 12, value: data.deliverySn},
            {key: 'paySn', type: 'Texts', label: '收付款单编号', span: 12, value: data.paySn},
            {key: 'createTime', type: 'Texts', label: '产生时间', span: 12,
                value: data.createTime ? moment(data.createTime).format('YYYY-MM-DD HH:mm:ss') : ''},
            {key: 'returnSn', type: 'Texts', label: '退货单编号', span: 12, value: data.returnSn},
            {key: 'refundSn', type: 'Texts', label: '退款单编号', span: 12, value: data.refundSn},
        ];
        let GMData = [
            {key: 'buyerPersonId', type: 'Texts', label: '购买用户ID', span: 12, value: data.buyerVO.buyerPersonId},
            {key: 'buyerPersonName', type: 'Texts', label: '购买用户名称', span: 12, value: data.buyerVO.buyerPersonName},
            {key: 'buyerId', type: 'Texts', label: '购买企业ID', span: 12, value: data.buyerVO.buyerId},
            {key: 'buyerName', type: 'Texts', label: '购买企业名称', span: 12, value: data.buyerVO.buyerName}
        ];
        let XSData = [
            {key: 'shopId', type: 'Texts', label: '销售终端ID', span: 12, value: data.sellerVO.shopId},
            {key: 'shopName', type: 'Texts', label: '销售终端名称', span: 12, value: data.sellerVO.shopName},
            {key: 'sellerId', type: 'Texts', label: '销售企业ID', span: 12, value: data.sellerVO.sellerId},
            {key: 'sellerName', type: 'Texts', label: '销售企业名称', span: 12, value: data.sellerVO.sellerName}
        ];
        return <div>
            <Card
                type="inner"
                title="售后单基本信息"
            >
                <AssemblySet key={'noSetDataOne'} data={noSetDataOne} form={this.formRef.current}/>
            </Card>

            <Card
                type="inner"
                title="购买方信息"
                style={{marginTop: 15}}
            >
                <AssemblySet key={'OMAss'} data={GMData} form={this.formRef.current}/>
            </Card>

            <Card
                type="inner"
                title="销售方信息"
                style={{marginTop: 15}}
            >
                <AssemblySet key={'XSAss'} data={XSData} form={this.formRef.current}/>
            </Card>

            <Card
                type="inner"
                title="操作记录"
                style={{marginTop: 15}}
                bodyStyle={{paddingRight: 0}}
            >
                <Timeline
                    style={{
                        maxHeight: 300,
                        overflow: 'auto'
                    }}
                >
                    {
                        this.state.logList && this.state.logList.map((item, idx) => {
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
                        (!this.state.logList || this.state.logList.length <= 0) && <div style={{color: '#ccc', textAlign: 'center', fontSize: 20}}>
                            暂无操作记录...
                        </div>
                    }
                </Timeline>
            </Card>
        </div>
    }
}

export default AfterOrderDetail
