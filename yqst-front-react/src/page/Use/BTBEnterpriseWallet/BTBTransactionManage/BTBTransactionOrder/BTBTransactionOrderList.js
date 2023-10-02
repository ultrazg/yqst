import React, {Component} from 'react';
import ViewCoat from '../../../PublicModule/ViewCoat/ViewCoat';
import { InfoCircleOutlined } from '@ant-design/icons';
import {
    Button,
    Input,
    Select,
    Row,
    Col,
    DatePicker,
} from 'antd';
import SWTable from 'SWViews/table';
import '../BTBTransactionManageCss.less'

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const { Option } = Select;

class BTBTransactionOrderList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [{}]
        };
    }

    componentDidMount() {}

    componentWillUnmount() {
    }

    render() {
        return (
            <ViewCoat
                breadCrumb={[
                    {title: '交易管理'},
                    {title: '交易订单'},
                ]}
            >
                {this.parameterView()}
                {this.btnView()}
                {this.totalNumView()}
                {this.SWTableView()}
            </ViewCoat>
        );
    }

    parameterView(){
        return <div>
            <h1
                style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#2B3441',
                    marginBottom: '12px'
                }}
            >
                搜索
            </h1>
            <div style={{marginBottom: '16px', display: 'flex'}}>
                <div style={{flex: 1,marginRight: '24px', display: 'flex'}}>
                    <label style={{
                        fontSize: '14px',
                        marginRight: '4px',
                        color: '#2B3441',
                        lineHeight: '40px',
                        display: 'inline-block',
                        width: '70px'
                    }}>用户名称：</label>
                    <Input placeholder='请输入'
                       style={{
                           flex: 1,
                           height: '40px',
                           lineHeight: '40px',
                           fontSize: '14px',
                       }}
                    />
                </div>
                <div style={{flex: 1, marginRight: '24px', display: 'flex'}}>
                    <label style={{
                        fontSize: '14px',
                        marginRight: '4px',
                        color: '#2B3441',
                        lineHeight: '40px',
                        display: 'inline-block',
                        width: '70px'
                    }}>提交时间：</label>
                    <RangePicker
                        className={'RangePicker'}
                        onChange={(date, dateString) => {}}
                        style={{
                            flex: 1,
                            height: '40px',
                            lineHeight: '40px',
                            fontSize: '14px',
                        }}
                    />
                </div>
                <div style={{flex: 1, display: 'flex'}}>
                    <label style={{
                        fontSize: '14px',
                        marginRight: '4px',
                        color: '#2B3441',
                        lineHeight: '40px',
                        display: 'inline-block',
                        width: '70px'
                    }}>回盘时间：</label>
                    <RangePicker
                        className={'RangePicker'}
                        onChange={(date, dateString) => {}}
                        style={{
                            flex: 1,
                            height: '40px',
                            lineHeight: '40px',
                            fontSize: '14px',
                        }}
                    />
                </div>
            </div>
            <div style={{display: 'flex'}}>
                <div style={{display: 'flex', flex: 1, marginRight: '24px',}}>
                    <label style={{
                        fontSize: '14px',
                        marginRight: '4px',
                        color: '#2B3441',
                        lineHeight: '40px',
                        display: 'inline-block',
                        width: '70px'
                    }}>交易类型：</label>
                    <Select className={'BTBSelect'} defaultValue="全部" onChange={(val) => {}}
                        style={{
                            flex: 1,
                        }}
                    >
                        <Option value="全部">全部</Option>
                        <Option value="1">类型一</Option>
                        <Option value="2">类型二</Option>
                    </Select>
                </div>
                <div style={{display: 'flex', flex: 1, marginRight: '24px',}}>
                    <label style={{
                        fontSize: '14px',
                        marginRight: '4px',
                        color: '#2B3441',
                        lineHeight: '40px',
                        display: 'inline-block',
                        width: '70px'
                    }}>交易结果：</label>
                    <Select className={'BTBSelect'} defaultValue="全部" onChange={(val) => {}}
                        style={{
                            flex: 1,
                        }}
                    >
                        <Option value="全部">全部</Option>
                        <Option value="1">结果一</Option>
                        <Option value="2">结果二</Option>
                    </Select>
                </div>
                <div style={{display: 'flex', flex: 1}}>
                    <label style={{
                        fontSize: '14px',
                        marginRight: '4px',
                        color: '#2B3441',
                        lineHeight: '40px',
                        display: 'inline-block',
                        width: '70px'
                    }}>支付通道：</label>
                    <Select className={'BTBSelect'} defaultValue="全部" onChange={(val) => {}}
                        style={{
                            flex: 1,
                        }}
                    >
                        <Option value="全部">全部</Option>
                        <Option value="1">通道一</Option>
                        <Option value="2">通道二</Option>
                    </Select>
                </div>
            </div>
        </div>
    }

    btnView(){
        return <Row style={{marginTop: '16px'}}>
            <Col span={12}>
                <Button type="primary"
                    style={{width: '80px', height: '40px', fontSize: '16px'}}
                >导出</Button>
            </Col>
            <Col span={12} style={{textAlign: 'right'}}>
                <Button type="primary"
                    style={{width: '80px', height: '40px', fontSize: '16px', marginRight: '16px'}}
                >搜索</Button>
                <Button
                    style={{width: '80px', height: '40px', fontSize: '16px'}}
                >重置</Button>
            </Col>
        </Row>
    }

    totalNumView(){
        return (
            <div
                style={{
                    height: '48px',
                    padding: '14px 16px',
                    border: '1px solid rgba(111,166,247,1)',
                    background: 'rgba(237,246,255,1)',
                    borderRadius: '2px',
                    marginTop: '16px',
                    marginBottom: '19px'
                }}
            >
                <InfoCircleOutlined style={{marginRight: '8px', color: '#4481EB'}} />
                <label style={{color: '#2B3441', fontSize: '14px'}}>交易笔数：</label>
                <span style={{color: '#4481EB', fontSize: '14px', marginRight: '8px'}}>1500</span>
                <label style={{color: '#2B3441', fontSize: '14px'}}>交易金额：</label>
                <span style={{color: '#4481EB', fontSize: '14px', marginRight: '8px'}}>1500</span>
                <label style={{color: '#2B3441', fontSize: '14px'}}>到账金额：</label>
                <span style={{color: '#4481EB', fontSize: '14px', marginRight: '8px'}}>1500</span>
                <label style={{color: '#2B3441', fontSize: '14px'}}>手续费：</label>
                <span style={{color: '#4481EB', fontSize: '14px', marginRight: '8px'}}>0</span>
            </div>
        );
    }

    SWTableView(){
        let {list} = this.state;
        let columns = [
            {
                title: '账单编号',
                key: '',
                dataIndex: '',
                width: 150,
                fixed: 'left',
            },
            {
                title: '交易订单号',
                key: '',
                dataIndex: '',
            },
            {
                title: '支付账户',
                key: '',
                dataIndex: '',
            },
            {
                title: '用户名称',
                key: '',
                dataIndex: '',
            },
            {
                title: '对方支付账户',
                key: '',
                dataIndex: '',
            },
            {
                title: '对方名称',
                key: '',
                dataIndex: '',
            },
            {
                title: '交易金额',
                key: '',
                dataIndex: '',
            },
            {
                title: '到账金额',
                key: '',
                dataIndex: '',
            },
            {
                title: '手续费',
                key: '',
                dataIndex: '',
            },
            {
                title: '提交时间',
                key: '',
                dataIndex: '',
            },
            {
                title: '回盘时间',
                key: '',
                dataIndex: '',
            },
            {
                title: '交易类型',
                key: '',
                dataIndex: '',
            },
            {
                title: '交易结果',
                key: '',
                dataIndex: '',
            },
            {
                title: '支付通道',
                key: '',
                dataIndex: '',
                width: 150,
                fixed: 'right',
            },
            {
                title: '查看',
                key: '',
                dataIndex: '',
                width: 90,
                fixed: 'right',
                render: (res) => {
                    return <div>
                        <a
                            onClick={() => {
                                this.props.history.push(`/pages/appCenter/btbEnterpriseWallet/btbTransactionOrder/btbTransactionOrderDetail`);
                            }}
                        >
                            查看
                        </a>
                    </div>
                }
            },
        ];
        if(list.length <= 0){
            columns = [
                {
                    title: '账单编号',
                    key: '',
                    dataIndex: '',
                    width: 150,
                    fixed: 'left',
                },
                {
                    title: '交易订单号',
                    key: '',
                    dataIndex: '',
                },
                {
                    title: '支付账户',
                    key: '',
                    dataIndex: '',
                },
                {
                    title: '用户名称',
                    key: '',
                    dataIndex: '',
                },
                {
                    title: '对方支付账户',
                    key: '',
                    dataIndex: '',
                },
                {
                    title: '支付通道',
                    key: '',
                    dataIndex: '',
                    width: 150,
                    fixed: 'right',
                },
                {
                    title: '查看',
                    key: '',
                    dataIndex: '',
                    width: 90,
                    fixed: 'right',
                    render: (res) => {
                        return <div>
                            <a
                                onClick={() => {
                                    this.props.history.push(`/pages/appCenter/btbEnterpriseWallet/btbTransactionOrder/btbTransactionOrderDetail`);
                                }}
                            >
                                查看
                            </a>
                        </div>
                    }
                },
            ];
        }

        return <SWTable
            scroll={{ x: 1800 }}
            columns={columns}
            dataSource={list}
            // pagination={
            //     {
            //         total: listPar.total,
            //         current: listPar.current,
            //         pageSize: listPar.pageSize,
            //         onChange: (a, b) => {
            //             this.setState({
            //                     listPar: {
            //                         ...listPar,
            //                         current: a,
            //                     }
            //                 },
            //                 () => {
            //                     this.getContractTPage();
            //                 }
            //             )
            //         },
            //         showTotal: (total, range) => `共有${total}条`
            //     }
            // }
        />
    }
}

export default BTBTransactionOrderList;
