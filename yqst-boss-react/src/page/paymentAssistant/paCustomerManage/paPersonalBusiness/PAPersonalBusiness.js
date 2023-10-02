import React from 'react';
import {Button, Form, message, Table,} from 'antd';
import Model from "../../Model";
import moment from 'moment';
import {Link} from "react-router-dom";
import TabsViewContent from "../../../../baseview/tabsViewContent/TabsViewContent";
import HeadSearch from "../../../../baseview/headSearch/HeadSearch";


class PAPersonalBusiness extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            total: 0,
            current: 1,
            pageSize: 10,
            keyWord: '',
            startTime: '',
            endTime: '',
            sortType: 1,
            status: ''
        }
    }

    getList() {
        const {current, pageSize, keyWord, startTime, endTime, sortType, status} = this.state;
        Model.GetPersonalPageList({
            current,
            pageSize,
            keyWord,
            startTime,
            endTime,
            sortType,
            status
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
                crumb={[{name: '收支付助手'}, {name: '商户管理'}, {name: "个人商户"}]}
                topBtn={
                    <Button type='primary'>导出</Button>
                }
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
            {key: 'status', type:'Select', value:'', placeholder: '请选择', label: '状态',
                list: [
                    {value: '', name: '全部'},
                    {value: 0, name: '审核中'},
                    {value: 1, name: '通过'},
                    {value: 2, name: '拒绝'}
                ],
            },
        ];
        return <HeadSearch data={searchDatas} form={this.props.form} callBack={({keyWord, times, status}) => {
            let startTime = times[0] || '';
            let endTime = times[1] || '';

            this.setState({
                current: 1,
                keyWord,
                startTime,
                endTime,
                status
            }, () => {
                this.getList();
            });
        }}/>
    }

    makeTable() {
        let {list, current, pageSize, total} = this.state;

        const columns = [
            {
                title: '商户编号',
                dataIndex: 'merchantsApplySn',
            },
            {
                title: '姓名',
                dataIndex: 'merchantsName',
            },
            {
                title: '电话',
                dataIndex: 'merchantsPhone',
            },
            {
                title: '状态',
                dataIndex: 'status',
                render: (status)=>{
                    switch (status) {
                        case 0:
                            return '未激活'
                        case 1:
                            return '未签约'
                        case 2:
                            return '未绑定银行卡'
                        case 3:
                            return '正常'
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
                render: (text, record) => {
                    let sn = record.sn;
                    return (
                        <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
                            <Link to={`/Pages/PAPersonalBusinessDetail?sn=${sn}`}>
                                查看
                            </Link>
                            <span style={{cursor: 'pointer', color: 'red', marginLeft: 15}} onClick={()=>{
                                Model.MerchantsEnable({sn});
                            }}>禁用</span>
                        </div>
                    )
                }
            },
        ];


        return (
            <Table
                columns={columns}
                dataSource={list}
                pagination={
                    {
                        total,
                        current,
                        pageSize,
                        onChange: (current, b) => {

                            this.setState({
                                current
                            }, () => {
                                this.getList();
                            })
                        },
                        showTotal: (total, range) => `共有${total}条`
                    }
                }
            />
        )
    }

}

export default PAPersonalBusiness
