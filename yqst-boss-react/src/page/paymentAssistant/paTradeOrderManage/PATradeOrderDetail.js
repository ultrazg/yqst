import React, {Component} from 'react';
import {Button, Card, Form} from "antd";
import {Link} from "react-router-dom";
import TabsViewContent from "../../../baseview/tabsViewContent/TabsViewContent";
import AssemblySet from "../../../baseview/assemblySet/AssemblySet";


class PATradeOrderDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <TabsViewContent
                crumb={[{name: '收支付助手'}, {name: '交易订单', link: 'PATradeOrderList'}, {name: "订单详情"}]}
                topBtn={
                    <Link to='/Pages/PATradeOrderList'>
                        <Button type='primary'>返回</Button>
                    </Link>
                }
            >
                {this.makeBaseView()}

                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 80}}>
                    <Link to='/Pages/PATradeOrderList'>
                        <Button style={{width: 180, height: 35}} type='primary'>确定</Button>
                    </Link>
                </div>
            </TabsViewContent>
        )
    }

    makeBaseView = () => {
        let allData = [
            {
                title: '详情内容',
                key: 'JBKey',
                data: [
                    {key: 'qw1', type: 'Texts', label: '账单编号', span: 12, value: ''},
                    {key: 'qw2', type: 'Texts', label: '交易订单号', span: 12, value: ''},
                    {key: 'qw3', type: 'Texts', label: '提交时间', span: 12, value: ''},
                    {key: 'qw4', type: 'Texts', label: '回盘时间', span: 12, value: ''},
                    {key: 'qw5', type: 'Texts', label: '支付账户', span: 12, value: ''},
                    {key: 'qw6', type: 'Texts', label: '用户名称', span: 12, value: ''},
                    {key: 'qw7', type: 'Texts', label: '对方账户', span: 12, value: ''},
                    {key: 'qw8', type: 'Texts', label: '对方名称', span: 12, value: ''},
                    {key: 'qw9', type: 'Texts', label: '交易金额', span: 12, value: ''},
                    {key: 'qw10', type: 'Texts', label: '到账金额', span: 12, value: ''},
                    {key: 'qw11', type: 'Texts', label: '手续费', span: 12, value: ''},
                    {key: 'qw12', type: 'Texts', label: '支付通道', span: 12, value: ''},
                    {key: 'qw13', type: 'Texts', label: '交易类型', span: 12, value: ''},
                    {key: 'qw14', type: 'Texts', label: '交易结果', span: 12, value: ''},
                    {key: 'qw15', type: 'Texts', label: '备注', span: 12, value: ''},
                ],
                style: {
                    marginBottom: '15px'
                },
            }
        ];

        return (
            <div>
                {
                    allData.map((item, idx) => {
                        return (
                            <Card
                                key={'car_' + idx}
                                type="inner"
                                title={item.title || '信息'}
                                style={item.style ? item.style : {}}
                                bodyStyle={item.bodyStyle ? item.bodyStyle : {}}
                            >
                                <AssemblySet key={item.key} data={item.data} form={this.props.form}/>
                            </Card>
                        )
                    })
                }
            </div>
        )
    }
}

export default PATradeOrderDetail;