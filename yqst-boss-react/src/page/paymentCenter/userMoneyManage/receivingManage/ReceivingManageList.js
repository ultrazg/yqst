/**
 * Created by yb on 2019/09/16
 */

import React from 'react';
import Model from "../../Model";
import SWTable from 'SWViews/table';
import moment from 'moment';
import {Link} from "react-router-dom";
import SwitchName from "./SwitchName";
import TabsViewContent from "../../../../baseview/tabsViewContent/TabsViewContent";
import HeadSearch from "../../../../baseview/headSearch/HeadSearch";
import NumberFormat from "../../../../utils/numberformat/NumberFormat";


class ReceivingManageList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            total: 0,
            requestPar: {
                current: 1,
                pageSize: 10,
                keyWord: '',
                billType: '',
                payType: '',
                status: '',
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
                crumb={[{name: '支付中心'}, {name: "用户资金管理"}, {name: "收付款管理列表"}]}
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
        Model.walletPRPage(this.state.requestPar, (res) => {
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
            {key: 'keyWord', type: 'Input', value: '', placeholder: '可查收付款单号、付款方、收款方', label: '关键字', maxLength: 30},
            {
                key: 'billType', type: 'Select', value: '', placeholder: '请选择来源单据', label: '来源单据',
                list: [
                    {value: '', name: '全部'},
                    {value: 1, name: '订单'},
                    {value: 2, name: '对账单'},
                    {value: 3, name: '金融订单'},
                    {value: 4, name: '服务费单'},
                ],
            },
            {
                key: 'payType', type: 'Select', value: '', placeholder: '请选择支付类型', label: '支付类型',
                list: [
                    {value: '', name: '全部'},
                    {value: 1, name: '线上'},
                    {value: 2, name: '线下'},
                ],
            },
            {
                key: 'status', type: 'Select', value: '', placeholder: '请选择状态', label: '状态',
                list: [
                    {value: '', name: '全部'},
                    {value: 1, name: '待确认'},
                    {value: 2, name: '支付成功'},
                    {value: 3, name: '支付失败'},
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
                title: '收付款单号',
                key: 'receiveSn',
                dataIndex: 'receiveSn',
            },
            {
                title: '付款方',
                key: 'payName',
                dataIndex: 'payName',
            },
            {
                title: '收款方',
                key: 'receiveName',
                dataIndex: 'receiveName',
            },
            {
                title: '款项金额',
                key: 'accountMoney',
                dataIndex: 'accountMoney',
                render: (res) => {
                    return NumberFormat.thousandBit(res || 0, 2, true)
                }
            },
            {
                title: '来源单据',
                key: 'billType',
                dataIndex: 'billType',
                render: (res) => {
                    return SwitchName.billTypeName(res);
                }
            },
            {
                title: '来源单号',
                key: 'billSn',
                dataIndex: 'billSn'
            },
            {
                title: '支付类型',
                key: 'payType',
                dataIndex: 'payType',
                render: (res) => {
                    return SwitchName.payTypeName(res);
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
                title: '状态',
                key: 'status',
                dataIndex: 'status',
                render: (res) => {
                    return <span style={{color: SwitchName.statusName(res, 'color')}}>
                        {SwitchName.statusName(res)}
                    </span>;
                }
            },
            {
                title: '操作',
                key: '',
                dataIndex: '',
                width: 90,
                render: (res) => {
                    return <div>
                        <Link to={`/Pages/ReceivingManageDetail?id=${res.receiveId}`}>
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

export default ReceivingManageList
