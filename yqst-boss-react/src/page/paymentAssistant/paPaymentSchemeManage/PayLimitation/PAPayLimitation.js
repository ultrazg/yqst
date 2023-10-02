import React, {Component} from 'react';
import TabsViewContent from "../../../../baseview/tabsViewContent/TabsViewContent";
import HeadSearch from "../../../../baseview/headSearch/HeadSearch";
import {Table, Form, Button} from "antd";
import {PlusOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import Model from "../../Model";
import moment from "moment";

class PAPayLimitation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            current: 1,
            pageSize: 10,
            total: 0,
            keyWork: '',
            startTime:'',
            endTime: '',
            list: []
        };
    }

    getList = ()=>{
        const {current, pageSize, startTime, endTime, keyWord} = this.state;
        Model.GetLimitPageList({
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
                crumb={[{name: '收支付助手'}, {name: "支付限额"}]}
                topBtn={(
                    <Link to='/Pages/PAPayLimitationAdd'>
                        <Button type='primary' icon={<PlusOutlined />}>新增限额</Button>
                    </Link>
                )}
            >
                {this.makeHeadSearch()}
                {this.tableView()}
            </TabsViewContent>
        )
    }

    makeHeadSearch = ()=> {
        let searchDatas = [
            {key: 'keyWord', type: 'Input', value: '', placeholder: '请输入', label: '编号/名称', maxLength: 30},
            {key: 'times', type: 'RangePicker', value: '', placeholder: ['开始时间', '结束时间'], label: '时间', maxLength: 30},
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
                    this.getList()
                })

            }}/>
        )
    };

    tableView = ()=> {
        const {current, pageSize, total, list} = this.state;
        const columns = [
            {
                title: '限额编号',
                dataIndex: 'sn'
            },
            {
                title: '限额名称',
                dataIndex: 'limitName'
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
                    return <Link to={`/Pages/PAPayLimitationAdd?sn=${record.sn}`}>查看</Link>
                }
            }
        ];
        return (
            <Table
                columns={columns}
                dataSource={list}
                bordered
                rowKey={'sn'}
                pagination={{
                    total,
                    current,
                    pageSize,
                    onChange: (current, pageSize) => {
                        this.setState({
                            current
                        }, ()=>{
                            this.getList();
                        })
                    },
                    showTotal: (total, range) => `共有${total}条`
                }}
            />
        )
    }
}

export default PAPayLimitation;