import React, {Component} from 'react';
import HeadSearch from "../../../../baseview/headSearch/HeadSearch";
import {Button, Form, Table} from "antd";
import {PlusOutlined} from '@ant-design/icons';
import TabsViewContent from "../../../../baseview/tabsViewContent/TabsViewContent";
import {Link} from "react-router-dom";
import Model from "../../Model";
import moment from "moment";

class PASchemeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 1,
            pageSize: 10,
            total: 0,
            startTime: '',
            endTime: '',
            keyWord: '',
            list: []
        };
    }

    getList = ()=>{
        const {current, pageSize, keyWord, startTime, endTime} = this.state;
        Model.GetPayPlanPageList({
            current,
            pageSize,
            keyWord,
            startTime,
            endTime,
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
                crumb={[{name: '收支付助手'}, {name: '支付方案'}]}
                // tabs={this.tabsConfig()}
                topBtn={
                    <Link to='/Pages/PASchemeAdd'>
                        <Button type='primary' icon={<PlusOutlined />}>新增方案</Button>
                    </Link>

                }
            >
                {this.makeHeadSearch()}
                {this.makeTableView()}
            </TabsViewContent>
        )
    }

    makeHeadSearch = ()=> {
        // 搜索字段
        const searchDatas = [
            {key: 'keyWord', type: 'Input', value: '', placeholder: '请输入', label: '编号/名称', maxLength: 30},
            {key: 'times', type:'RangePicker', value:'', placeholder: ['开始时间', '结束时间'], label: '时间',},
        ];
        return (
            <HeadSearch data={searchDatas} form={this.props.form} callBack={({keyWord, times}) => {
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
        const {current, pageSize, total, list} = this.state;
        const columns = [
            {
                title: '方案编号',
                dataIndex: 'sn',
            },
            {
                title: '方案名称',
                dataIndex: 'planName',
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                render: (time)=>{
                    return moment(time).format('YYYY-MM-DD')
                }
            },
            {
                title: '操作',
                dataIndex: 'handle',
                render: (text, record, index)=> {
                    return <Link to={`/Pages/PASchemeAdd?sn=${record.sn}`}>查看</Link>
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
                    onChange: (current)=>{
                        this.setState({
                            current
                        }, ()=>{
                            this.getList()
                        })
                    },
                    showTotal: (total)=> `共有${total}条`
                }}
            />
        )
    }
}

export default PASchemeList;