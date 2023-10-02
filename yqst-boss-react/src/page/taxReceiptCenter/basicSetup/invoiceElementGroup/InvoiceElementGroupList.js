/**
 * Created by yb on 2019/09/27
 */

import React from 'react';
import {Button} from 'antd';
import Model from "../../Model";
import SWTable from 'SWViews/table';
import moment from 'moment';
import {Link} from "react-router-dom";
import TabsViewContent from "../../../../baseview/tabsViewContent/TabsViewContent";
import HeadSearch from "../../../../baseview/headSearch/HeadSearch";
import {PlusOutlined} from '@ant-design/icons'

class InvoiceElementGroupList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            total: 0,
            requestPar: {
                current: 1,
                pageSize: 10,
                keyWord: '',
                isElement: 0,
            },
        }
    }

    componentDidMount() {
        this.getList();
    }

    render() {
        return (
            <TabsViewContent
                crumb={[{name: '税票中心'}, {name: "基本设置"}, {name: "发票要素组列表"}]}
                // tabs={this.tabsConfig()}
                topBtn={
                    <Link to={'/Pages/InvoiceElementGroupEditor'}>
                        <Button type='primary' icon={<PlusOutlined/>}>新增</Button>
                    </Link>
                }
            >
                {this.makeHeadSearch()}
                {this.makeTable()}
            </TabsViewContent>
        );
    }

    getList() {
        Model.InvoiceEGPage(this.state.requestPar, (res) => {
            // const newList = res.data.records && res.data.records.map((item, idx) => {
            //     return {
            //         ...item,
            //         sNum: (++idx) + (this.state.requestPar.current * 10) // 添加序号字段
            //     }
            // });

            this.setState({
                list: res.data.records || [],
                total: res.data.total || 0,
            })
        }, (err) => {
        })
    }

    tabsConfig() {
        return [{
            tabName: '全部', callback: () => {
                this.setState({status: 0}, () => {
                    this.getList()
                })
            }
        }, {
            tabName: '申请中', callback: () => {
                this.setState({status: 1}, () => {
                    this.getList()
                })
            }
        }, {
            tabName: '申请成功', callback: () => {
                this.setState({status: 2}, () => {
                    this.getList()
                })
            }
        }, {
            tabName: '申请失败', callback: () => {
                this.setState({status: 3}, () => {
                    this.getList()
                })
            }
        }]
    }

    makeHeadSearch() {
        const searchDatas = [
            {key: 'keyWord', type: 'Input', value: '', placeholder: '可查询ID、编码、名称', label: '关键字', maxLength: 30},
            // {
            //     key: 'a', type: 'Select', value: '', placeholder: '请选择发票类型', label: '发票类型',
            //     list: [
            //         {value: '', name: '全部'},
            //         {value: 1, name: '电子发票'},
            //         {value: 2, name: '纸质发票'},
            //     ],
            // },
            // {
            //     key: 'b', type: 'Select', value: '', placeholder: '请选择状态', label: '状态',
            //     list: [
            //         {value: '', name: '全部'},
            //         {value: 1, name: '待同意'},
            //         {value: 2, name: '已同意'},
            //         {value: 3, name: '已驳回'},
            //         {value: 4, name: '已取消'},
            //     ],
            // },
            // {key: 'times', type:'RangePicker', value:'', placeholder: ['开始时间', '结束时间'], label: '申请时间',}
        ];
        return <HeadSearch data={searchDatas} form={this.props.form} callBack={(obj) => {
            // obj.startTime = obj.times [0] || '';
            // obj.endTime = obj.times [1] || '';
            // obj.current = 1;
            //
            // delete obj.times;
            this.setState({
                requestPar: {
                    ...this.state.requestPar,
                    ...obj
                }
            }, () => {
                this.getList();
            });
        }}/>
    }

    makeTable() {
        let {list, requestPar} = this.state;
        const columns = [
            {
                title: '要素组ID',
                key: 'groupId',
                dataIndex: 'groupId',
            },
            {
                title: '要素组编码',
                key: 'groupSn',
                dataIndex: 'groupSn',
            },
            {
                title: '要素组名称',
                key: 'groupName',
                dataIndex: 'groupName',
            },
            {
                title: '产生时间',
                key: 'createTime',
                dataIndex: 'createTime',
                width: 100,
                render: (res) => {
                    let times = res ? moment(res).format('YYYY-MM-DD HH:mm:ss') : '';

                    return times ? <div>
                        <div>{times.split(' ')[0]}</div>
                        <div>{times.split(' ')[1]}</div>
                    </div> : times;
                }
            },
            {
                title: '操作',
                key: '',
                dataIndex: '',
                width: 90,
                render: (res) => {
                    return <div>
                        <Link to={`/Pages/InvoiceElementGroupDetail?id=${res.groupId}`}>
                            查看
                        </Link>
                        {/*<span style={{
                            margin: '0 10px',
                            borderRight: '1px solid #d7d6d6',
                        }}/>
                        <Link to={`/Pages/MessageTemplateEditor?id=${res.id}`}>
                            编辑
                        </Link>*/}
                    </div>
                }
            },
        ];
        return <div>
            <SWTable
                columns={columns}
                dataSource={list}
                pagination={
                    {
                        total: this.state.total,
                        current: requestPar.current,
                        pageSize: requestPar.pageSize,
                        onChange: (a, b) => {
                            let obj = this.state.requestPar;
                            obj.current = a;
                            this.setState({requestPar: obj}, () => {
                                this.getList();
                            })
                        },
                        showTotal: (total, range) => `共有${total}条`
                    }
                }
            />
        </div>
    }

}

export default InvoiceElementGroupList
