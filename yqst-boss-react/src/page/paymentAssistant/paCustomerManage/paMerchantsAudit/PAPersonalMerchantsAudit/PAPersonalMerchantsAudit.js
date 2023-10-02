import React, {Component} from 'react';
import {Form, Button, Modal, Card, Table, Tabs, Timeline, Row, Col} from 'antd';
import {Link} from "react-router-dom";
import TabsViewContent from "../../../../../baseview/tabsViewContent/TabsViewContent";
import HeadSearch from "../../../../../baseview/headSearch/HeadSearch";
import Model from "../../../Model";


class PAPersonalMerchantsAudit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            total: 0,
            current: 1,
            pageSize: 10,
            keyWord: '',
            auditStatus: '',
            startTime: '',
            endTime: '',
        };
    }

    getList = () =>{
        const {current, pageSize, keyWord, auditStatus, startTime, endTime} = this.state;
        Model.GetApplyPersonalPageList({
            auditStatus,
            current,
            pageSize,
            keyWord,
            sortType: 1,
            startTime,
            endTime
        }, res=>{
            this.setState({
                list: res.data.records,
                total: res.data.total
            })
        })
    };

    componentDidMount() {
        this.getList();
    }

    render() {
        return (
            <TabsViewContent
                crumb={[{name: '收支付助手'}, {name: '商户管理'}, {name: "个人商户审核"}]}
            >
                {this.makeHeadSearch()}
                {this.makeTable()}
            </TabsViewContent>
        );
    }


    makeHeadSearch() {
        const searchDatas = [
            {key: 'keyWord', type: 'Input', value: '', placeholder: '请输入', label: '编号/名称/电话', maxLength: 30},
            {key: 'times', type:'RangePicker', value:'', placeholder: ['开始时间', '结束时间'], label: '时间',},
            {key: 'auditStatus', type:'Select', value:'', placeholder: '请选择', label: '状态',
                list: [
                    {value: '', name: '全部'},
                    {value: 0, name: '审核中'},
                    {value: 1, name: '通过'},
                    {value: 2, name: '拒绝'}
                ],
            },
        ];
        return <HeadSearch data={searchDatas} form={this.props.form} callBack={({keyWord, times, auditStatus}) => {
            let startTime = times[0] || '';
            let endTime = times[1] || '';

            this.setState({
                current: 1,
                keyWord,
                startTime,
                endTime,
                auditStatus
            }, () => {
                this.getList()
            });
        }}/>
    }

    makeTable() {
        let {list, current, pageSize, total} = this.state;
        const columns = [
            {
                title: '商户编号',
                dataIndex: 'sn',
            },
            {
                title: '商户名称',
                dataIndex: 'userName',
            },
            {
                title: '电话',
                dataIndex: 'mobile',
            },
            {
                title: '商户类型',
                dataIndex: '',
                render(){
                    return '个人商户'
                }
            },
            {
                title: '状态',
                dataIndex: 'auditStatus',
                render(auditStatus){
                    switch (auditStatus) {
                        case 0:
                            return '审核中';
                        case 1:
                            return '通过';
                        case 2:
                            return '拒绝';
                    }
                }
            },
            {
                title: '创建时间',
                dataIndex: 'createTime'
            },
            {
                title: '操作',
                dataIndex: '',
                width: 90,
                render: (text, records) => {
                    let sn = records.sn;
                    return (
                        <Link to={`/Pages/PAPersonalMerchantsAuditDetail?sn=${sn}`}>
                            查看
                        </Link>
                    )
                }
            },
        ];
        return (
            <Table
                columns={columns}
                dataSource={list}
                rowKey={'sn'}
                pagination={
                    {
                        total,
                        current,
                        pageSize,
                        onChange: (current, b) => {
                            this.setState({
                                current
                            }, () => {
                                this.getList()
                            })
                        },
                        showTotal: (total, range) => `共有${total}条`
                    }
                }
            />
        )
    }
}

export default PAPersonalMerchantsAudit