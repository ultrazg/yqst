import React, {Component} from 'react';
import {Form, Button, Modal, Card, Table, Tabs, Timeline, Row, Col} from 'antd';
import {Link} from "react-router-dom";
import TabsViewContent from "../../../../../baseview/tabsViewContent/TabsViewContent";
import HeadSearch from "../../../../../baseview/headSearch/HeadSearch";
import Model from "../../../Model";
import moment from "moment";

class PAEnterpriseMerchantsAudit extends Component {
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
            sortType: 2
        };
    }

    getList = ()=>{
        const {auditStatus, current, pageSize, keyWord, sortType, startTime, endTime} = this.state;
        Model.GetApplyCompanyPageList({
            auditStatus,
            current,
            pageSize,
            keyWord,
            sortType,
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
                crumb={[{name: '收支付助手'}, {name: '商户管理'}, {name: "企业商户审核"}]}
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
                    {value: 1, name: '待审核'},
                    {value: 2, name: '通过'},
                    {value: 3, name: '拒绝'}
                ],
            },
        ];
        return <HeadSearch data={searchDatas} callBack={({keyWord, times, auditStatus}) => {
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
                dataIndex: 'companyName',
            },
            {
                title: '电话',
                dataIndex: 'contactPhone',
            },
            {
                title: '商户类型',
                dataIndex: '',
                render(){
                    return '企业商户'
                }
            },
            {
                title: '状态',
                dataIndex: 'auditStatus',
                render(auditStatus){
                    switch (auditStatus) {
                        case 1:
                            return '待审核';
                        case 2:
                            return '通过';
                        case 3:
                            return '拒绝';
                    }
                }
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                render(time) {
                    return moment(time).format('YYYY-MM-DD')
                }
            },
            {
                title: '操作',
                dataIndex: '',
                width: 90,
                render: (text, records) => {
                    let sn = records.sn;
                    return (
                        <Link to={`/Pages/PAEnterpriseMerchantsAuditDetail?sn=${sn}`}>
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

export default PAEnterpriseMerchantsAudit
