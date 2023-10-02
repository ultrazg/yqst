/**
 * Created by yb on 2019/09/12
 */

import React from 'react';
import {Button, Form, message,} from 'antd';
import Model from "../Model";
import SWTable from 'SWViews/table';
import moment from 'moment';
import {Link} from "react-router-dom";
import SwitchNames from "./SwitchNames";
import TabsViewContent from "../../../baseview/tabsViewContent/TabsViewContent";
import HeadSearch from "../../../baseview/headSearch/HeadSearch";
import NumberFormat from "../../../utils/numberformat/NumberFormat";


class OrderManagementList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            total: 0,
            requestPar: {
                current: 1,
                pageSize: 10,
                keyWord: '',
                orderType: '',
                orderStatus: '',
                payStatus: '',
                itemsStatus: '',
                ticketStatus: '',
                startTime: '',
                endTime: '',
                sortType: 2,
            },
        }
    }

    componentDidMount() {
        this.getList();
    }

    render() {
        return (
            <TabsViewContent
                crumb={[{name: '订单中心'}, {name: "订单管理列表"}]}
                // tabs={this.tabsConfig()}
                // topBtn={
                //     <Link to={'/Pages/MessageTemplateEditor'}>
                //         <Button type='primary' icon={'plus'}>添加</Button>
                //     </Link>
                // }
            >
                {this.makeHeadSearch()}
                {this.makeTable()}
            </TabsViewContent>
        );
    }

    getList() {
        Model.OrderPage(this.state.requestPar, (res) => {
            this.state.total = res.data.total || 0;
            // const newList = res.data.records && res.data.records.map((item, idx) => {
            //     return {
            //         ...item,
            //         sNum: (++idx) + (this.state.requestPar.current * 10) // 添加序号字段
            //     }
            // });

            this.setState({
                list: res.data.records || [],
                total: this.state.total || 0,
            })
        }, (err) => {
        })
    }

    tabsConfig(){
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
            {key: 'keyWord', type: 'Input', value: '', placeholder: '可查询编号、购买方、销售方', label: '关键字', maxLength: 30},
            {key: 'times', type:'RangePicker', value:'', placeholder: ['开始时间', '结束时间'], label: '产生时间',},
            {
                key: 'orderType', type: 'Select', value: '', placeholder: '请选择订单类型', label: '订单类型',
                list: [
                    {value: '', name: '全部'},
                    {value: '1', name: '一般合同单'},
                    {value: '4', name: '一般选购单'},
                    {value: '2', name: '代理合同单'},
                    {value: '3', name: '零售订单'},
                ],
            },
            {
                key: 'orderStatus', type: 'Select', value: '', placeholder: '请选择订单状态', label: '订单状态',
                list: [
                    {value: '', name: '全部'},
                    {value: '2', name: '正常'},
                    {value: '1', name: '已关闭'},
                ],
            },
            {
                key: 'payStatus', type: 'Select', value: '', placeholder: '请选择付款状态', label: '付款状态',
                list: [
                    {value: '', name: '全部'},
                    {value: '1', name: '未付款'},
                    {value: '3', name: '已付全额'},
                    {value: '2', name: '已付部分'},
                ],
            },
            {
                key: 'itemsStatus', type: 'Select', value: '', placeholder: '请选择发货状态', label: '发货状态',
                list: [
                    {value: '', name: '全部'},
                    {value: '0', name: '未发货'},
                    {value: '2', name: '已发全部'},
                    {value: '1', name: '已发部分'},
                ],
            },
            {
                key: 'ticketStatus', type: 'Select', value: '', placeholder: '请选择开票状态', label: '开票状态',
                list: [
                    {value: '', name: '全部'},
                    {value: '0', name: '未开票'},
                    {value: '1', name: '已开全部'},
                    {value: '2', name: '已开部分'},
                ],
            }
        ];
        return <HeadSearch data={searchDatas} form={this.props.form} callBack={(obj) => {
            obj.startTime = obj.times [0] || '';
            obj.endTime = obj.times [1] || '';
            obj.current = 1;

            delete obj.times;
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
                title: '订单编号',
                key: 'orderSn',
                dataIndex: 'orderSn',
            },
            {
                title: '购买方',
                key: 'buyerName',
                dataIndex: 'buyerName',
            },
            {
                title: '销售方',
                key: 'shopName',
                dataIndex: 'shopName',
            },
            {
                title: '订单总价',
                key: 'orderAmount',
                dataIndex: 'orderAmount',
                render: (res) => {
                    return NumberFormat.thousandBit(res || 0, 2, true)
                }
            },
            {
                title: '订单类型',
                key: 'orderType',
                dataIndex: 'orderType',
                render: (res) => {
                    return SwitchNames.orderTypeName(res);
                }
            },
            {
                title: '付款状态',
                key: 'payStatus',
                dataIndex: 'payStatus',
                render: (res) => {
                    return SwitchNames.payStatusName(res);
                }
            },
            {
                title: '发货状态',
                key: 'itemsStatus',
                dataIndex: 'itemsStatus',
                render: (res) => {
                    return SwitchNames.itemsStatusName(res);
                }
            },
            {
                title: '开票状态',
                key: 'ticketStatus',
                dataIndex: 'ticketStatus',
                render: (res) => {
                    return SwitchNames.ticketStatusName(res);
                }
            },
            {
                title: '订单状态',
                key: 'orderStatus',
                dataIndex: 'orderStatus',
                render: (res) => {
                    return SwitchNames.orderStatusName(res);
                }
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
                        <Link to={`/Pages/OrderManagementDetail?id=${res.orderId}`}>
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

export default OrderManagementList
