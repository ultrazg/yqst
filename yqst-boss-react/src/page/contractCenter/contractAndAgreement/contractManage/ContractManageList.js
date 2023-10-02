/**
 * Created by yb on 2019/09/25
 */

import React from 'react';
import {Button, Form, message,} from 'antd';
import Model from "../../Model";
import SWTable from 'SWViews/table';
import moment from 'moment';
import {Link} from "react-router-dom";
import TabsViewContent from "../../../../baseview/tabsViewContent/TabsViewContent";
import HeadSearch from "../../../../baseview/headSearch/HeadSearch";
import NumberFormat from "../../../../utils/numberformat/NumberFormat";
import ContractManageDetail from "./ContractManageDetail";
import SwitchStatus from "./SwitchStatus";


class ContractManageList extends React.Component {
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
                checkStartTime: '',
                checkEndTime: '',
                status: '',
            },
        }
    }

    componentDidMount() {
        this.getList();
    }

    render() {
        return (
            <TabsViewContent
                crumb={[{name: '合同中心'}, {name: "合同、协议管理"}, {name: "合同列表"}]}
                tabs={this.tabsConfig()}
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
        console.log('------------')
        Model.ContractPage(this.state.requestPar, (res) => {
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
                // this.changeState();
            }
        }, {
            tabName: '待签署', callback: () => {
                // this.changeState('1');
            }
        }, {
            tabName: '已完成', callback: () => {
                // this.changeState('3');
            }
        }, {
            tabName: '已拒绝', callback: () => {
                // this.changeState('4');
            }
        }, {
            tabName: '履行中', callback: () => {
                // this.changeState('5');
            }
        }, {
            tabName: '已取消', callback: () => {
                // this.changeState('6');
            }
        }, {
            tabName: '已到期', callback: () => {
                // this.changeState('7');
            }
        }]
    }

    changeState(status = ''){
        this.setState({
            requestPar: {
                ...this.state.requestPar,
                status
            },
        }, () => {
            this.getList()
        })
    }

    makeHeadSearch() {
        const searchDatas = [
            {key: 'keyWord', type: 'Input', value: '', placeholder: '可查询合同名称、合同发起人、合同签署人', label: '关键字', maxLength: 30},
            /*{
                key: 'accountStatus', type: 'Select', value: '', placeholder: '请选择账户状态', label: '账户状态',
                list: [
                    {value: '', name: '全部'},
                    {value: 1, name: '启用中'},
                    {value: 2, name: '禁止中'},
                    {value: 3, name: '已注销'},
                ],
            },
            {
                key: 'bindStatus', type: 'Select', value: '', placeholder: '请选择绑定状态', label: '绑定状态',
                list: [
                    {value: '', name: '全部'},
                    {value: 1, name: '已绑定'},
                    {value: 2, name: '未绑定'},
                ],
            },*/
            {key: 'fTimes', type:'RangePicker', value:'', placeholder: ['开始时间', '结束时间'], label: '发起时间',},
            {key: 'sTimes', type:'RangePicker', value:'', placeholder: ['开始时间', '结束时间'], label: '签审时间',}
        ];
        return <HeadSearch data={searchDatas} form={this.props.form} callBack={(obj) => {
            obj.startTime = obj.fTimes [0] || '';
            obj.endTime = obj.fTimes [1] || '';
            obj.checkStartTime = obj.sTimes [0] || '';
            obj.checkEndTime = obj.sTimes [1] || '';
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
                width: 85,
                fixed: 'left',
            },
            {
                title: '合同ID',
                key: 'id',
                dataIndex: 'id',
                width: 100,
                fixed: 'left',
            },
            {
                title: '合同编号',
                key: 'contractSn',
                dataIndex: 'contractSn',
            },
            {
                title: '合同类型',
                key: 'contractType',
                dataIndex: 'contractType',
                render: (res) => {
                    return SwitchStatus.contractType(res);
                }
            },
            {
                title: '合同名称',
                key: 'contractName',
                dataIndex: 'contractName'
            },
            {
                title: '合同发起方',
                key: 'startName',
                dataIndex: 'startName'
            },
            {
                title: '合同签署方',
                key: 'signName',
                dataIndex: 'signName'
            },
            {
                title: '发起时间',
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
                title: '签审时间',
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
                title: '合同状态',
                key: 'status',
                dataIndex: 'status',
                render: (res) => {
                    return SwitchStatus.status(res);
                }
            },
            {
                title: '操作',
                key: '',
                dataIndex: '',
                width: 90,
                fixed: 'right',
                render: (res) => {
                    return <div>
                        <Link to={`/Pages/ContractManageDetail?id=${res.id}`}>
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
                scroll={{ x: 1300 }}
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

export default ContractManageList
