/**
 * Created by yb on 2019/09/29
 */

import React from 'react';
import {Button, Form, message,} from 'antd';
import Model from "../../Model";
import SWTable from 'SWViews/table';
import moment from 'moment';
import {Link} from "react-router-dom";
import SwitchStatus from "./SwitchStatus";
import TabsViewContent from "../../../../baseview/tabsViewContent/TabsViewContent";
import HeadSearch from "../../../../baseview/headSearch/HeadSearch";
import NumberFormat from "../../../../utils/numberformat/NumberFormat";


class BlueInvoiceList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            total: 0,
            requestPar: {
                current: 1,
                pageSize: 10,
                keyWord: '',
                status: '',
                invoiceType: '',
                sendStatus: '',
                redDashedStatus: '',
                startTime: '',
                endTime: '',
            },
        }
    }

    componentDidMount() {
        this.getList();
    }

    render() {
        return (
            <TabsViewContent
                crumb={[{name: '税票中心'}, {name: "发票管理"}, {name: "蓝字发票列表"}]}
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
        Model.InvoiceBPage(this.state.requestPar, (res) => {
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
            {key: 'keyWord', type: 'Input', value: '', placeholder: '可查询单号、发票代码、名称', label: '关键字', maxLength: 30},
            {
                key: 'invoiceType', type: 'Select', value: '', placeholder: '请选择发票类型', label: '发票类型',
                list: [
                    {value: '', name: '全部'},
                    {value: 1, name: '电子发票'},
                    {value: 2, name: '纸质发票'},
                ],
            },
            {
                key: 'status', type: 'Select', value: '', placeholder: '请选择发票状态', label: '发票状态',
                list: [
                    {value: '', name: '全部'},
                    {value: 1, name: '待校验'},
                    {value: 2, name: '已校验'},
                    {value: 3, name: '已取消'},
                ],
            },
            {
                key: 'sendStatus', type: 'Select', value: '', placeholder: '请选择寄送状态', label: '寄送状态',
                list: [
                    {value: '', name: '全部'},
                    {value: 2, name: '已寄送'},
                    {value: 1, name: '未寄送'},
                ],
            },
            {
                key: 'redDashedStatus', type: 'Select', value: '', placeholder: '请选择冲红状态', label: '冲红状态',
                list: [
                    {value: '', name: '全部'},
                    {value: 2, name: '已红冲'},
                    {value: 1, name: '未红冲'},
                ],
            },
            {key: 'times', type:'RangePicker', value:'', placeholder: ['开始时间', '结束时间'], label: '产生时间',}
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
                title: '蓝字发票单号',
                key: 'blueSn',
                dataIndex: 'blueSn',
            },
            {
                title: '发票代码',
                key: 'blueInvoiceCode',
                dataIndex: 'blueInvoiceCode',
            },
            {
                title: '销售方名称',
                key: 'sellerName',
                dataIndex: 'sellerName',
            },
            {
                title: '购买方名称',
                key: 'buyerName',
                dataIndex: 'buyerName',
                // render: (res) => {
                //     return NumberFormat.thousandBit(res || 0, 2, true)
                // }
            },
            {
                title: '发票类型',
                key: 'invoiceType',
                dataIndex: 'invoiceType',
                render: (res) => {
                    return SwitchStatus.invoiceType(res)
                }
            },
            {
                title: '发票金额',
                key: 'invoiceAmount',
                dataIndex: 'invoiceAmount',
                render: (res) => {
                    return NumberFormat.thousandBit(res || 0, 2, true)
                }
            },
            {
                title: '发票单状态',
                key: 'status',
                dataIndex: 'status',
                render: (res) => {
                    return SwitchStatus.status(res)
                }
            },
            {
                title: '寄送状态',
                key: 'sendStatus',
                dataIndex: 'sendStatus',
                render: (res) => {
                    return SwitchStatus.sendStatus(res)
                }
            },
            {
                title: '冲红状态',
                key: 'redDashedStatus',
                dataIndex: 'redDashedStatus',
                render: (res) => {
                    return SwitchStatus.redDashedStatus(res)
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
                        <Link to={`/Pages/BlueInvoiceDetail?id=${res.blueId}`}>
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

export default BlueInvoiceList
