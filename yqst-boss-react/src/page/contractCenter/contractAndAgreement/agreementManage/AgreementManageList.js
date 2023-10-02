/**
 * Created by yb on 2019/09/25
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


class AgreementManageList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            total: 0,
            requestPar: {
                current: 1,
                pageSize: 10,
                keyWord: '',
                startTime: '',
                endTime: '',
                status: '',
                sortType: '2',
            },
        }
    }

    componentDidMount() {
        // this.getList();
    }

    render() {
        return (
            <TabsViewContent
                crumb={[{name: '合同中心'}, {name: "合同、协议管理"}, {name: "协议列表"}]}
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
        Model.ContractPPage(this.state.requestPar, (res) => {
            const newList = res.data.records && res.data.records.map((item, idx) => {
                return {
                    ...item,
                    sNum: (++idx) + ((this.state.requestPar.current - 1) * 10) // 添加序号字段
                }
            });

            this.setState({
                list: newList || [],
                total: res.data.total || 0,
            })
        }, (err) => {
        })
    }

    tabsConfig(){
        return [{
            tabName: '全部', callback: () => {
                // this.setState({status: 0}, () => {
                //     this.getList()
                // })
            }
        }, {
            tabName: '待签署', callback: () => {
                // this.setState({status: 1}, () => {
                //     this.getList()
                // })
            }
        }, {
            tabName: '已完成', callback: () => {
                // this.setState({status: 2}, () => {
                //     this.getList()
                // })
            }
        }, {
            tabName: '已拒绝', callback: () => {
                // this.setState({status: 3}, () => {
                //     this.getList()
                // })
            }
        }, {
            tabName: '履行中', callback: () => {
                // this.setState({status: 3}, () => {
                //     this.getList()
                // })
            }
        }, {
            tabName: '已取消', callback: () => {
                // this.setState({status: 3}, () => {
                //     this.getList()
                // })
            }
        }, {
            tabName: '已到期', callback: () => {
                // this.setState({status: 3}, () => {
                //     this.getList()
                // })
            }
        }]
    }

    makeHeadSearch() {
        const searchDatas = [
            {key: 'keyWord', type: 'Input', value: '', placeholder: '可查询协议名称、协议发起人、协议签署人', label: '关键字', maxLength: 30},
            /*{
                key: 'accountStatus', type: 'Select', value: '', placeholder: '请选择账户状态', label: '账户状态',
                list: [
                    {value: '', name: '全部'},
                    {value: 1, name: '启用中'},
                    {value: 2, name: '禁止中'},
                    {value: 3, name: '已注销'},
                ],
            },*/
            {
                key: 'status', type: 'Select', value: '', placeholder: '请选择绑定状态', label: '协议状态',
                list: [
                    {value: '', name: '全部'},
                    {value: 1, name: '待确认'},
                    {value: 2, name: '已确认'},
                    {value: 3, name: '不同意'},
                ],
            },
            {key: 'times', type:'RangePicker', value:'', placeholder: ['开始时间', '结束时间'], label: '确认时间',},
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
                // this.getList();
            });
        }}/>
    }

    makeTable() {
        let {list, requestPar} = this.state;
        const columns = [
            {
                title: '序号',
                key: 'sNum',
                dataIndex: 'sNum',
            },
            {
                title: '协议ID',
                key: 'id',
                dataIndex: 'id',
            },
            {
                title: '协议编号',
                key: 'protocolSn',
                dataIndex: 'protocolSn',
            },
            {
                title: '协议类型',
                key: 'protocolType',
                dataIndex: 'protocolType',
                render: (res) => {
                    return SwitchStatus.protocolType(res)
                }
            },
            {
                title: '协议名称',
                key: 'protocolName',
                dataIndex: 'protocolName'
            },
            {
                title: '协议发起方',
                key: 'startName',
                dataIndex: 'startName'
            },
            {
                title: '协议签署方',
                key: 'signName',
                dataIndex: 'signName'
            },
            {
                title: '确认时间',
                key: 'checkTime',
                dataIndex: 'checkTime',
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
                title: '协议状态',
                key: 'status',
                dataIndex: 'status',
                render: (res) => {
                    return SwitchStatus.status(res)
                }
            },
            {
                title: '操作',
                key: '',
                dataIndex: '',
                width: 90,
                render: (res) => {
                    return <div>
                        <Link to={`/Pages/AgreementManageDetail?id=${res.id}`}>
                            查看
                        </Link>
                        {/*<span style={{
                            margin: '0 10px',
                            borderRight: '1px solid #d7d6d6',
                        }}/>
                        <a>
                            删除
                        </a>*/}
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

export default AgreementManageList
