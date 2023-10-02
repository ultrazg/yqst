import React, {Component} from 'react';
import {Button, Form, Table} from "antd";
import {ExclamationOutlined, PlusOutlined} from '@ant-design/icons';
import TabsViewContent from "../../../baseview/tabsViewContent/TabsViewContent";
import HeadSearch from "../../../baseview/headSearch/HeadSearch";
import {Link} from "react-router-dom";


class PATradeOrderList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <TabsViewContent
                crumb={[{name: '收支付助手'}, {name: '商户管理'}, {name: "企业商户"}]}
                // tabs={this.tabsConfig()}
                topBtn={
                    <Button type='primary' icon={<PlusOutlined />}>导出</Button>
                }
            >
                {this.makeHeadSearch()}
                {this.makeTableView()}
            </TabsViewContent>
        )
    }

    makeHeadSearch = () => {
        const searchDatas = [
            {key: 'keyWord', type: 'Input', value: '', placeholder: '请输入', label: '关键字', maxLength: 30},
            {key: 'submitTime', type:'RangePicker', value:'', placeholder: ['开始时间', '结束时间'], label: '提交时间'},
            {key: 'backPlateTime', type:'RangePicker', value:'', placeholder: ['开始时间', '结束时间'], label: '回盘时间'},
            {
                key: 'type', type: 'Select', value: '1', placeholder: '交易类型', label: '交易类型',
                list: [
                    {value: 1, name: '---不限---'},
                    {value: 2, name: '交易类型1'},
                ],
            },
            {
                key: 'result', type: 'Select', value: '1', placeholder: '交易结果', label: '交易结果',
                list: [
                    {value: 1, name: '---不限---'},
                    {value: 2, name: '交易结果1'},
                ],
            },
            {
                key: 'chanel', type: 'Select', value: '1', placeholder: '支付通道', label: '支付通道',
                list: [
                    {value: 1, name: '---不限---'},
                    {value: 2, name: '交易渠道1'},
                ],
            },
        ];
        return (
            <HeadSearch data={searchDatas} form={this.props.form} callBack={(obj) => {

            }}/>
        )
    }

    makeTableView = ()=>{

        const columns = [
            {
                title: '账单编号',
                dataIndex: '',
                width: 100,
                fixed: 'left',
            },
            {
                title: '交易订单号',
                dataIndex: '',
                width: 100,
                fixed: 'left',
            },
            {
                title: '支付账户',
                dataIndex: '',
                width: 100,
                fixed: 'left',
            },
            {
                title: '用户名称',
                dataIndex: ''
            },
            {
                title: '对方支付账户',
                dataIndex: ''
            },
            {
                title: '对方名称',
                dataIndex: ''
            },
            {
                title: '交易金额',
                dataIndex: ''
            },
            {
                title: '到账金额',
                dataIndex: ''
            },
            {
                title: '手续费',
                dataIndex: ''
            },
            {
                title: '提交时间',
                dataIndex: ''
            },
            {
                title: '回盘时间',
                dataIndex: ''
            },
            {
                title: '交易类型',
                dataIndex: ''
            },
            {
                title: '交易结果',
                dataIndex: ''
            },
            {
                title: '支付通道',
                dataIndex: ''
            },
            {
                title: '操作',
                dataIndex: 'handle',
                width: 100,
                fixed: 'right',
                render: (text, record, index)=> {
                    return <Link to={`/Pages/PATradeOrderDetail`}>查看</Link>
                }
            }
        ];
        const data = [{}];

        return (
            <div>
                <p style={{fontSize: 10, paddingLeft: 15}}>共搜索到 922 条数据</p>
                <div style={{height: 36, display: 'flex', alignItems: 'center', backgroundColor: '#e7f3fc'}}>
                    <ExclamationOutlined theme="filled" style={{color: '#1f90e6', marginLeft: 15, fontSize: 15}}/>
                    <span style={{marginLeft: 10}}>交易笔数：</span>
                    <span style={{color: '#ca0810'}}>0</span>
                    <span style={{marginLeft: 18}}>交易金额：</span>
                    <span style={{color: '#ca0810'}}>0</span>
                    <span style={{marginLeft: 18}}>到账金额：</span>
                    <span style={{color: '#ca0810'}}>0</span>
                    <span style={{marginLeft: 18}}>手续费：</span>
                    <span style={{color: '#ca0810'}}>0</span>
                </div>

                <Table
                    columns={columns}
                    dataSource={data}
                    bordered
                    scroll={{ x: 1500 }}
                    style={{marginTop: 18}}
                />
            </div>

        )
    }
}

export default PATradeOrderList;