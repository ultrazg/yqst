import React, {Component} from 'react';
import TabsViewContent from "../../../baseview/tabsViewContent/TabsViewContent";
import HeadSearch from "../../../baseview/headSearch/HeadSearch";
import {Link} from "react-router-dom";
import {Table, Form, Button} from "antd";
import {ExclamationOutlined} from '@ant-design/icons';


class PACostList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            current: 1,
            pageSize: 10,
            total: 0,
            list: [{}],
            keyWord: '',

        };
    }

    render() {
        return (
            <TabsViewContent
                crumb={[{name: '收支付助手'}, {name: '费用明细'}]}
                topBtn={<Button type='primary'>导出</Button>}
            >
                {this.makeHeadSearch()}
                {this.makeTableView()}
            </TabsViewContent>
        )
    }


    makeHeadSearch = () => {
        const searchDatas = [
            {key: 'name', type: 'Input', value: '', placeholder: '请输入', label: '关键字', maxLength: 30},
            {
                key: 'status', type: 'Select', value: '1', placeholder: '请输入', label: '账单状态',
                list: [
                    {value: 1, name: '---不限---'},
                    {value: 2, name: '账单状态1'},
                ],
            },
            {key: 'time1', type:'RangePicker', value:'', placeholder: ['开始时间', '结束时间'], label: '账单生成时间'},
            {key: 'time2', type:'RangePicker', value:'', placeholder: ['开始时间', '结束时间'], label: '账单扣费时间'},

        ];
        return (
            <HeadSearch data={searchDatas} form={this.props.form} callBack={(obj) => {

            }}/>
        )
    };

    makeTableView = ()=>{

        const columns = [
            {
                title: '账单编号',
                dataIndex: '',
            },
            {
                title: '企业编号',
                dataIndex: '',
            },
            {
                title: '企业名称',
                dataIndex: '',
            },
            {
                title: '支付通道',
                dataIndex: ''
            },
            {
                title: '账单金额',
                dataIndex: ''
            },
            {
                title: '账单生成时间',
                dataIndex: '',
            },
            {
                title: '账单扣费时间',
                dataIndex: ''
            },
            {
                title: '账单状态',
                dataIndex: ''
            },
            {
                title: '操作',
                dataIndex: 'handle',
                // width: 100,
                // fixed: 'right',
                render: (text, record, index)=> {
                    return <Link to={`/Pages/PACostDetail`}>查看</Link>
                }
            }
        ];
        const {current, pageSize, total, list} = this.state;

        return (
            <div>
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

export default PACostList;