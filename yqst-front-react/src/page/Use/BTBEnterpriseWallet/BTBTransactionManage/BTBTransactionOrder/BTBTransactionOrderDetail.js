import React, {Component} from 'react';
import ViewCoat from '../../../PublicModule/ViewCoat/ViewCoat';
import {
    Row,
    Col,
} from 'antd';
import '../BTBTransactionManageCss.less'

class BTBTransactionOrderDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    componentWillUnmount() {
    }

    render() {
        return (
            <ViewCoat
                breadCrumb={[
                    {title: '交易管理'},
                    {title: '交易订单', link: '/pages/appCenter/btbEnterpriseWallet/btbTransactionOrder/btbTransactionOrderList'},
                    {title: '订单详情'},
                ]}
            >
                <h1
                    style={{color: '#2B3441', marginBottom: '16px', fontWeight: 500, fontSize: '16px'}}
                >详情内容</h1>
                <Row>
                    {this.ColView('账单编号', '1241231231')}
                    {this.ColView('交易订单号', '2141241231')}
                    {this.ColView('提交时间', '2020-03-03 12:31')}
                    {this.ColView('回盘时间', '2020-03-03 12:31')}
                    {this.ColView('支付账户', '21213313')}
                    {this.ColView('用户名称', '陈星岚')}
                    {this.ColView('对方账户', '3321212')}
                    {this.ColView('对方名称', '洲喵喵')}
                    {this.ColView('交易金额', '¥132111212.00')}
                    {this.ColView('到账金额', '¥132111212.00')}
                    {this.ColView('手续费', '¥132112.00')}
                    {this.ColView('支付通道', '银联')}
                    {this.ColView('交易类型', '转账')}
                    {this.ColView('交易结果', '成功')}
                    {this.ColView('备注', '呆呆呆呆呆呆呆')}
                </Row>
            </ViewCoat>
        );
    }

    ColView(label = '', val = ''){
        return <Col span={8} style={{marginBottom: '16px', color: '#2B3441', }}>
            <label>{label ? label + '：' : ''}</label>
            {val}
        </Col>
    }
}

export default BTBTransactionOrderDetail;
