import React, {Component} from 'react';
import ViewCoat from '../../../PublicModule/ViewCoat/ViewCoat';
import {
    Button,
    Input,
    Select,
    Row,
    Col,
    DatePicker,
} from 'antd';
import SWTable from 'SWViews/table';

const {RangePicker} = DatePicker;
const {Option} = Select;

class BTBCostBreakdownList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [{}]
        };
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <ViewCoat
                breadCrumb={[
                    {title: '通道费用'},
                    {title: '费用明细'},
                ]}
            >
                {this.parameterView()}
                {this.btnView()}
                {this.SWTableView()}
            </ViewCoat>
        );
    }

    parameterView() {
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
                <div style={{display: 'flex', flex: 1, marginRight: '24px',}}>
                    <label style={{
                        fontSize: '14px',
                        marginRight: '4px',
                        color: '#2B3441',
                        lineHeight: '40px',
                        display: 'inline-block',
                        width: '98px',
                        textAlign: 'right'
                    }}>账单编号：</label>
                    <Input placeholder='请输入'
                           style={{
                               flex: 1,
                               height: '40px',
                               lineHeight: '40px',
                               fontSize: '14px',
                           }}
                    />
                </div>
                <div style={{display: 'flex', flex: 1, marginRight: '24px',}}>
                    <label style={{
                        fontSize: '14px',
                        marginRight: '4px',
                        color: '#2B3441',
                        lineHeight: '40px',
                        display: 'inline-block',
                        width: '98px',
                        textAlign: 'right'
                    }}>账单生成时间：</label>
                    <RangePicker
                        className={'RangePicker'}
                        onChange={(date, dateString) => {
                        }}
                        style={{
                            flex: 1,
                            height: '40px',
                            lineHeight: '40px',
                            fontSize: '14px',
                        }}
                    />
                </div>
                <div style={{display: 'flex', flex: 1}}>
                    <label style={{
                        fontSize: '14px',
                        marginRight: '4px',
                        color: '#2B3441',
                        lineHeight: '40px',
                        display: 'inline-block',
                        width: '98px',
                        textAlign: 'right'
                    }}>账单扣费时间：</label>
                    <RangePicker
                        className={'RangePicker'}
                        onChange={(date, dateString) => {
                        }}
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
                        width: '98px',
                        textAlign: 'right'
                    }}>支付通道：</label>
                    <Select className={'BTBSelect'} defaultValue="全部" onChange={(val) => {
                    }}
                            style={{
                                flex: 1
                            }}
                    >
                        <Option value="全部">全部</Option>
                        <Option value="1">通道一</Option>
                        <Option value="2">通道二</Option>
                    </Select>
                </div>
                <div style={{display: 'flex', flex: 1, marginRight: '24px',}}>
                    <label
                        style={{
                            fontSize: '14px',
                            marginRight: '4px',
                            color: '#2B3441',
                            lineHeight: '40px',
                            display: 'inline-block',
                            width: '98px',
                            textAlign: 'right'
                        }}
                    >账单状态：</label>
                    <Select className={'BTBSelect'} defaultValue="全部" onChange={(val) => {
                    }}
                            style={{
                                flex: 1
                            }}
                    >
                        <Option value="全部">全部</Option>
                        <Option value="1">状态一</Option>
                        <Option value="2">状态二</Option>
                    </Select>
                </div>
                <div style={{display: 'flex', flex: 1,}}></div>
            </div>
        </div>
    }

    btnView() {
        return <Row style={{marginTop: '16px', marginBottom: '16px'}}>
            <Col span={12}>
                <Button type="primary"
                        style={{width: '80px', height: '40px', fontSize: '16px'}}
                >导出</Button>
            </Col>
            <Col span={12} style={{textAlign: 'right'}}>
                <Button type="primary"
                        style={{
                            width: '80px',
                            height: '40px',
                            // lineHeight: '40px',
                            fontSize: '16px',
                            marginRight: '16px'
                        }}
                >搜索</Button>
                <Button
                    style={{width: '80px', height: '40px', fontSize: '16px'}}
                >重置</Button>
            </Col>
        </Row>
    }

    SWTableView() {
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
                title: '企业编号',
                key: '',
                dataIndex: '',
            },
            {
                title: '企业名称',
                key: '',
                dataIndex: '',
            },
            {
                title: '支付通道',
                key: '',
                dataIndex: '',
            },
            {
                title: '账单金额',
                key: '',
                dataIndex: '',
            },
            {
                title: '账单生成时间',
                key: '',
                dataIndex: '',
            },
            {
                title: '账单扣费时间',
                key: '',
                dataIndex: '',
            },
            {
                title: '账单状态',
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
                                this.props.history.push(`/pages/appCenter/btbEnterpriseWallet/btbCostBreakdown/btbCostBreakdownDetail`);
                            }}
                        >
                            查看
                        </a>
                    </div>
                }
            },
        ];

        return <SWTable
            scroll={{x: 1000}}
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

export default BTBCostBreakdownList;
