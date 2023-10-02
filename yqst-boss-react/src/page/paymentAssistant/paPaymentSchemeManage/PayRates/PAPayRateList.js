import React, {Component} from 'react';
import {Button, Table, Form} from "antd";
import {PlusOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import TabsViewContent from "../../../../baseview/tabsViewContent/TabsViewContent";
import HeadSearch from "../../../../baseview/headSearch/HeadSearch";
import Model from "../../Model";
import moment from "moment";

class PAPayRateList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 1,
            pageSize: 10,
            total: 0,
            list: [],
            startTime: '',
            endTime: '',
            keyWord: ''
        };
    }

    getList = ()=>{
        const {current, pageSize, startTime, endTime, keyWord} = this.state;
        Model.GetRatePageList({
            current,
            pageSize,
            startTime,
            endTime,
            keyWord,
            sortType: 1
        }, res=>{
            this.setState({
                list: res.data.records,
                total: res.data.total
            })
        })
    }

    componentDidMount() {
        this.getList();
    }

    render() {
        return (
            <TabsViewContent
                crumb={[{name: '收支付助手'}, {name: '支付费率'}]}
                topBtn={
                    <Link to='/Pages/PAPayRateAdd'>
                        <Button type='primary' icon={<PlusOutlined />}>新增费率</Button>
                    </Link>
                }
            >
                {this.makeHeadSearch()}
                {this.makeTableView()}
            </TabsViewContent>
        )
    }

    makeHeadSearch() {
        const searchDatas = [
            {key: 'keyWord', type: 'Input', value: '', placeholder: '编号/名称', label: '费率编号', maxLength: 30},
            {key: 'times', type: 'RangePicker', value: '', placeholder: ['开始时间', '结束时间'], label: '时间'},
        ];
        return (
            <HeadSearch data={searchDatas} callBack={({keyWord, times}) => {
                let startTime = times[0] || '';
                let endTime = times[1] || '';

                this.setState({
                    startTime,
                    endTime,
                    keyWord,
                    current: 1
                }, ()=>{
                    this.getList();
                })

            }}/>
        )
    }

    makeTableView = ()=>{
        const {list, total, current, pageSize} = this.state;

        const columns = [
            {
                title: '费率编号',
                dataIndex: 'sn',
            },
            {
                title: '费率名称',
                dataIndex: 'rateName',
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                render(time){
                    return moment(time).format('YYYY-MM-DD')
                }
            },
            {
                title: '操作',
                dataIndex: 'handle',
                render: (text, record, index)=> {
                    return <Link to={`/Pages/PAPayRateAdd?sn=${record.sn}`}>查看</Link>
                }
            }
        ];

        return (
            <Table
                columns={columns}
                dataSource={list}
                bordered
                rowKey={'sn'}
                style={{marginTop: 18}}
                pagination={{
                    total,
                    current,
                    pageSize,
                    onChange: current=>{
                        this.setState({
                            current
                        }, ()=>{
                            this.getList()
                        })
                    },
                    showTotal: total=> `共${total}条`
                }}
            />
        )
    }
}

export default PAPayRateList;