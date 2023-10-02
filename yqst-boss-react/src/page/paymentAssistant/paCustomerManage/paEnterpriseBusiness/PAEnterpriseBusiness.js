/**
 * Created by yb
 */

import React from 'react';
import {Button, Form, message, Table, Modal} from 'antd';
import Model from "../../Model";
import moment from 'moment';
import {Link} from "react-router-dom";
import TabsViewContent from "../../../../baseview/tabsViewContent/TabsViewContent";
import HeadSearch from "../../../../baseview/headSearch/HeadSearch";

class PAEnterpriseBusiness extends React.Component {
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
            status: 0, //  0全部 1.未激活,2.未签约,3.未绑定银行卡,4.正常
            sortType: 1, // 排序方式 1：正序 2：倒序

        }
    }

    getList = ()=>{
        const {current, pageSize, startTime, endTime, keyWord, status, sortType} = this.state;
        Model.GetCompanyPageList({
            current,
            pageSize,
            startTime,
            endTime,
            keyWord,
            status,
            sortType
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
                crumb={[{name: '收支付助手'}, {name: '商户管理'}, {name: "企业商户"}]}
                // topBtn={
                //     <Button type='primary'>导出</Button>
                // }
            >
                {this.makeHeadSearch()}
                {this.makeTable()}
            </TabsViewContent>
        );
    }

    makeHeadSearch() {
        const searchDatas = [
            {key: 'keyWord', type: 'Input', value: '', placeholder: '可查询编号/名称/电话', label: '关键字', maxLength: 30},
            {key: 'times', type:'RangePicker', value:'', placeholder: ['开始时间', '结束时间'], label: '时间',},
            {key: 'status', type:'Select', value: null, placeholder: '请选择', label: '状态',
                list: [
                    {value: null, name: '全部'},
                    {value: 1, name: '未激活'},
                    {value: 2, name: '未签约'},
                    {value: 3, name: '未绑定银行卡'},
                    {value: 4, name: '正常'},
                ],
            },
        ];
        return <HeadSearch data={searchDatas} callBack={({keyWord, times, status}) => {
            let startTime = times[0] || '';
            let endTime = times[1] || '';

            this.setState({
                current: 1,
                startTime,
                endTime,
                keyWord,
                status: Number(status)
            }, () => {
                this.getList();
            });
        }}/>
    }

    makeTable() {
        let {list, total, current, pageSize} = this.state;

        const columns = [
            {
                title: '商户编号',
                dataIndex: 'sn',
            },
            {
                title: '商户名称',
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
                        case 1:
                            return '未激活';
                        case 2:
                            return '未签约';
                        case 3:
                            return '未绑定银行卡';
                        case 4:
                            return '正常';
                    }
                }
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
                dataIndex: '',
                width: 90,
                render: (text, record) => {
                    const {isForbidden, sn} = record;
                    return (
                        <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
                            <Link to={`/Pages/PAEnterpriseBusinessDetail?sn=${sn}`}>
                                查看
                            </Link>
                            {
                                isForbidden
                                    ?
                                    <a style={{cursor: 'pointer', marginLeft: 15}} onClick={()=>{
                                        Modal.confirm({
                                            content: '是否开启该商户',
                                            onOk: ()=> {
                                                Model.MerchantsEnable({sn}, res=>{
                                                    this.getList();
                                                    message.success('开启商户成功');
                                                }, err=>{
                                                    message.success('开启商户失败');
                                                });

                                            },
                                            onCancel() {},
                                            okText: '确定',
                                            cancelText: '取消',
                                        })
                                    }}>开启</a>
                                    :
                                    <span style={{cursor: 'pointer', color: 'red', marginLeft: 15}} onClick={()=>{
                                        Modal.confirm({
                                            content: '是否禁用该商户，禁用会导致商户不能充值、不能转账、不能提现，只能查看！',
                                            onOk: ()=> {
                                                Model.MerchantsForbidden({sn}, ()=>{
                                                    this.getList();
                                                    message.success('禁用商户成功');
                                                }, err=>{
                                                    message.error('开启商户失败');
                                                });

                                            },
                                            onCancel() {},
                                            okText: '确定',
                                            cancelText: '取消',
                                        })
                                    }}>禁用</span>
                            }


                        </div>
                    )
                }
            },
        ];
        return (
            <div>
                <Table
                    columns={columns}
                    dataSource={list}
                    rowKey={'sn'}
                    pagination={
                        {
                            total,
                            current,
                            pageSize,
                            onChange: (current) => {
                                this.setState({
                                    current
                                }, () => {
                                    this.getList();
                                })
                            },
                            showTotal: total => `共有${total}条`
                        }
                    }
                />
            </div>
        )
    }

}

export default PAEnterpriseBusiness
