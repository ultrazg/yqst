/**
 * Created by yb on 2019/09/12.
 */

import React, {Component} from 'react';
import {Form, Button, Card} from 'antd';
import {RollbackOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import Model from "../Model";
import moment from 'moment';
import AssemblySet from "../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../baseview/viewContent/ViewContent";
import NumberFormat from "../../../utils/numberformat/NumberFormat";



class TradingOrderDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                buyerVO: {},
                sellerVO: {}
            },
        };
        this.id = '';
        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.id = this.props.location.search.substr(1).split("=")[1];
        if (this.id) {
            this.getInfo();
        }
    }

    // 视图层
    render() {
        return (
            <Form ref={this.formRef}>
                <ViewContent
                    crumb={[
                        {name: '订单中心'},
                        {name: "交易单管理列表", link: '/Pages/TradingOrderList'},
                        {name: "交易单管理详情"}
                    ]}
                    topBtn = {
                        <div>
                            {/*<Link to={`/Pages/DistributionRuleEditor?id=${this.id}`}>
                            <Button type="primary" icon={'edit'}>编辑</Button>
                        </Link>*/}
                            <Link to={'/Pages/TradingOrderList'} style={{marginLeft: 15}}>
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
        Model.OrderSGet({saleId: this.id}, (res) => {
            this.setState({data: res.data});
        }, (err) => {
        });
    }

    makeBaseView() {
        let {data} = this.state;
        let noSetDataOne = [
            {key: 'saleSn', type: 'Texts', label: '交易单编号', span: 12, value: data.saleSn},
            {key: 'deliverySn', type: 'Texts', label: '收发货单编号', span: 12, value: data.deliverySn},
            {key: 'returnSn', type: 'Texts', label: '退货单编号', span: 12, value: data.returnSn},
            {key: 'totalMoney', type: 'Texts', label: '交易单金额', span: 12,
                value: NumberFormat.thousandBit(data.totalMoney || 0, 2, true)},
            {key: 'createTime', type: 'Texts', label: '产生时间', span: 12,
                value: data.createTime ? moment(data.createTime).format('YYYY-MM-DD HH:mm:ss') : ''},
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
                title="交易单基本信息"
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
        </div>
    }
}

export default TradingOrderDetail
