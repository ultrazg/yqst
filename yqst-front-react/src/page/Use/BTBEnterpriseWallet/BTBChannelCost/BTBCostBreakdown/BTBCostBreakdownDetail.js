import React, {Component} from 'react';
import ViewCoat from '../../../PublicModule/ViewCoat/ViewCoat';
import {
    Table,
    Row,
    Col,
} from 'antd';

class BTBCostBreakdownDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                {
                    q: '1',
                    w: '充值',
                    e: '¥118.00',
                    r: '费率',
                    t: '2020-03-01 12:31',
                    y: '¥118.00',
                },
                {
                    q: '2',
                    w: '充值',
                    e: '¥118.00',
                    r: '费率',
                    t: '2020-03-01 12:31',
                    y: '¥118.00',
                },
            ],
        };
    }

    componentDidMount() {}

    componentWillUnmount() {
    }

    render() {
        const columns = [
            {
                title: '序号',
                dataIndex: 'q',
                key: 'q',
            },
            {
                title: '计费项目',
                dataIndex: 'w',
                key: 'w',
            },
            {
                title: '项目金额',
                dataIndex: 'e',
                key: 'e',
            },
            {
                title: '计费模式',
                dataIndex: 'r',
                key: 'r',
            },
            {
                title: '使用时间',
                dataIndex: 't',
                key: 't',
            },
            {
                title: '价格',
                dataIndex: 'y',
                key: 'y',
            },
        ];

        return (
            <ViewCoat
                breadCrumb={[
                    {title: '通道费用'},
                    {title: '费用明细', link: '/pages/appCenter/btbEnterpriseWallet/btbCostBreakdown/btbCostBreakdownList'},
                    {title: '账单详情'},
                ]}
                topTxtView={
                    <div style={{marginTop: '18px'}}>
                        <Row>
                            {this.ColView('账单状态', '已支付')}
                            {this.ColView('企业名称', '星蓝科技（账号：1111122）')}
                        </Row>
                        <Row>
                            {this.ColView('账单金额', '¥2121213.00')}
                            {this.ColView('账单日期', '2020-03-03')}
                            {this.ColView('扣费日期', '2020-03-03')}
                        </Row>
                    </div>
                }
                topStyle={{
                    height: 'auto',
                    minHeight: '119px'
                }}
                botStyle={{
                    background: 'none',
                    padding: '0px'
                }}
            >
                <div
                    style={{
                        background: '#fff',
                        borderRadius: '6px',
                        padding: '24px',
                        marginBottom: '24px'
                    }}
                >
                    <Row>
                        {this.ColView('账单周期', '2020-03-03 至 2020-03-01')}
                        {this.ColView('结算账户', '商户银联账户')}
                        {this.ColView('计费项目', '充值')}
                        {this.ColView('计费方式', '按费率')}
                        {this.ColView('费率分段', '是')}
                    </Row>
                    <Row>
                        {this.ColView('分段一区间', '100 至 200')}
                        {this.ColView('分段一费率', '3%')}
                    </Row>
                    <Row>
                        {this.ColView('分段二区间', '100 至 200')}
                        {this.ColView('分段二费率', '3%')}
                    </Row>
                </div>
                <div
                    style={{
                        background: '#fff',
                        borderRadius: '6px',
                        padding: '24px',
                    }}
                >
                    <h1
                        style={{color: '#2B3441', marginBottom: '16px', fontWeight: 500, fontSize: '16px'}}
                    >记账明细</h1>
                    <Table dataSource={this.state.list} columns={columns} bordered pagination={false}/>
                </div>
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

export default BTBCostBreakdownDetail;
