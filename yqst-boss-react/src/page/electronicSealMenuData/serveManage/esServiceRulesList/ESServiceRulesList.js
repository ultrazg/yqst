import React, {Component} from 'react';
import TabsViewContent from "../../../../baseview/tabsViewContent/TabsViewContent";
import HeadSearch from "../../../../baseview/headSearch/HeadSearch";
import {Form, Button, Table} from "antd";
import {Link} from "react-router-dom";
import Model from '../Model';

class ESServiceRulesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 60,
            loading: false,
            tableData: [],
            current: 1,
            pageSize: 10,
            startTime: '',
            endTime: '',
            keyWord: ''
        };
    }

    getServiceRuleList = ()=>{
        const {current, pageSize, startTime, endTime, keyWord} = this.state;
        Model.GetServiceRuleList({
            current,
            pageSize,
            startTime,
            endTime,
            keyWord
        }, res => {
            this.setState({
                tableData: res.data.records,
                total: res.data.total
            })
        }, err =>{
            console.log(err)
        })
    }


    componentDidMount() {
        this.getServiceRuleList();
    }

    render() {
        return (
            <TabsViewContent
                crumb={[{name: '电子签章服务中心'}, {name: '服务管理'}, {name: "服务规则管理"}]}
                topBtn={
                    <Button
                        type='primary'
                        onClick={()=>{this.props.history.push('/Pages/ESAddServiceRule')}}
                    >添加</Button>
                }
            >
                {this.makeHeadSearch()}
                {this.tableView()}
            </TabsViewContent>
        )
    }


    makeHeadSearch() {
        const searchDatas = [
            {key: 'keyWord', type: 'Input', value: '', placeholder: '可查询规则名称', label: '搜索规则名称', maxLength: 30},
            {key: 'time', type:'RangePicker', value:'', placeholder: ['开始时间', '结束时间'], label: '搜索日期',},
        ];

        return <HeadSearch data={searchDatas} callBack={(obj) => {
            let {keyWord, startTime, endTime} = this.state;
            if(obj.time){
                startTime = obj.time[0];
                endTime = obj.time[1];
            }else {
                startTime = '';
                endTime = '';
            }

            keyWord = obj.keyWord;

            this.setState({
                current: 1,
                keyWord,
                startTime,
                endTime
            },()=>{
                this.getServiceRuleList();
            })

        }}/>
    }


    tableView = ()=> {

        const columns = [
            {
                title: '规则ID',
                dataIndex: 'serviceRuleSn'
            },
            {
                title: '服务spu',
                dataIndex: 'goodsName'
            },
            {
                title: '服务sku',
                dataIndex: 'specList',
                render: (text, record, index)=>{
                    return (
                        <ul style={{listStyle: 'none', width: '100%', height: '100%', margin: 0, padding: 0}}>
                            {
                                text && text.map(item=>{
                                    return (
                                        <li key={item.specName}>{item.specName} {item.specValue}</li>
                                    )
                                })
                            }
                        </ul>
                    )
                }
            },
            {
                title: '服务时长',
                dataIndex: 'serviceLife',
                render: (text)=>{
                    return text ? `${text}个月` : '无限'
                }
            },
            {
                title: '创建时间',
                dataIndex: 'createTime'
            },
            {
                title: '是否认证前服务',
                dataIndex: 'ruleType',
                render: (text) => <div style={{display: 'flex', height: '100%', alignItems: 'center'}}>
                    {text === 1 ? '是' : '否'}
                </div>
            },
            {
                title: '操作',
                dataIndex: 'handle',
                render: (text, record)=> {
                    return (
                        <Link to={'/Pages/ESServiceRuleDetail?serviceRuleSn=' + record.serviceRuleSn}>查看</Link>
                    )
                }
            }
        ];

        const {loading, total, current, pageSize, tableData} = this.state;

        return (
            <Table
                columns={columns}
                dataSource={tableData}
                bordered
                loading={loading}
                rowKey='serviceRuleSn'
                pagination={{
                    total,
                    current,
                    pageSize,
                    onChange: (current, pageSize) => {
                        this.setState({
                            current
                        }, ()=>{
                            this.getServiceRuleList()
                        })
                    },
                    showTotal: (total, range) => `共有${total}条`
                }}
            />
        )
    }

}

export default ESServiceRulesList