import React, {Component} from 'react';
import TabsViewContent from "../../../baseview/tabsViewContent/TabsViewContent";
import HeadSearch from "../../../baseview/headSearch/HeadSearch";
import {Link} from "react-router-dom";
import {Table, Form, Button} from "antd";
import {ExclamationOutlined} from '@ant-design/icons';


class PATradeStatistics extends Component {

    constructor(props) {
        super(props);
        this.state = {
            current: 1,
            pageSize: 10,
            total: 0,
            list: [],
            startTime: '',
            endTime: ''
        };
    }

    render() {
        return (
            <TabsViewContent
                crumb={[{name: '收支付助手'}, {name: '业务统计'}, {name: '交易统计'}]}
                topBtn={<Button type='primary'>导出</Button>}
            >
                {this.makeHeadSearch()}
                {this.makeTableView()}
            </TabsViewContent>
        )
    }


    makeHeadSearch = () => {
        const searchDatas = [
            {key: 'time', type:'RangePicker', value:'', placeholder: ['开始时间', '结束时间'], label: '时间'},
        ];
        return (
            <HeadSearch data={searchDatas} form={this.props.form} callBack={(obj) => {

            }}/>
        )
    };

    makeTableView = ()=>{

        const columns = [
            {
                title: '日期',
                dataIndex: '',
            },
            {
                title: '充值金额',
                dataIndex: '',
            },
            {
                title: '转账金额',
                dataIndex: '',
            },
            {
                title: '提现金额',
                dataIndex: ''
            },
            {
                title: '留存金额',
                dataIndex: ''
            },
        ];

        const {current, pageSize, total, list} = this.state;

        return (
            <div>
                <div style={{height: 36, display: 'flex', alignItems: 'center', backgroundColor: '#e7f3fc'}}>
                    <ExclamationOutlined theme="filled" style={{color: '#1f90e6', marginLeft: 15, fontSize: 15}}/>
                    <span style={{marginLeft: 10}}>充值总金额：</span>
                    <span style={{color: '#ca0810'}}>0</span>
                    <span style={{marginLeft: 18}}>转账总金额：</span>
                    <span style={{color: '#ca0810'}}>0</span>
                    <span style={{marginLeft: 18}}>提现总金额：</span>
                    <span style={{color: '#ca0810'}}>0</span>
                    <span style={{marginLeft: 18}}>留存总金额：</span>
                    <span style={{color: '#ca0810'}}>0</span>
                </div>

                <Table
                    columns={columns}
                    dataSource={list}
                    bordered
                    style={{marginTop: 18}}
                    pagination={{
                        current,
                        pageSize,
                        total,
                        onChange: current=> {
                            this.setState({
                                current
                            }, ()=>{

                            })
                        },
                        showTotal: total=> `共${total}条`
                    }}
                />
            </div>

        )
    }
}

export default PATradeStatistics;