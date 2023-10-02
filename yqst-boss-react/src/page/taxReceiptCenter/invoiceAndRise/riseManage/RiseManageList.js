/**
 * Created by yb on 2019/09/27
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


class RiseManageList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            total: 0,
            requestPar: {
                current: 1,
                pageSize: 10,
                keyWord: '',
                riseStatus: '',
                riseType: '',
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
                crumb={[{name: '税票中心'}, {name: "开票信息与抬头管理"}, {name: "抬头管理列表"}]}
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
        Model.InvoiceRPage(this.state.requestPar, (res) => {
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
            {key: 'keyWord', type: 'Input', value: '', placeholder: '可查询抬头ID、名称、纳税人识别号', label: '关键字', maxLength: 30},
            {
                key: 'riseType', type: 'Select', value: '', placeholder: '请选择抬头类型', label: '抬头类型',
                list: [
                    {value: '', name: '全部'},
                    {value: 2, name: '企业抬头'},
                    {value: 1, name: '个人抬头'},
                ],
            },
            {
                key: 'riseStatus', type: 'Select', value: '', placeholder: '请选择抬头状态', label: '抬头状态',
                list: [
                    {value: '', name: '全部'},
                    {value: '1', name: '默认'},
                    {value: '0', name: '非默认'},
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
                title: '抬头ID',
                key: 'riseId',
                dataIndex: 'riseId',
            },
            {
                title: '个人用户名称',
                key: 'personName',
                dataIndex: 'personName',
            },
            {
                title: '企业名称',
                key: 'userName',
                dataIndex: 'userName',
            },
            {
                title: '抬头名称',
                key: 'riseName',
                dataIndex: 'riseName',
                // render: (res) => {
                //     return NumberFormat.thousandBit(res || 0, 2, true)
                // }
            },
            {
                title: '纳税人识别号',
                key: 'taxpayerNumber',
                dataIndex: 'taxpayerNumber',
                // render: (res) => {
                //     return NumberFormat.thousandBit(res || 0, 2, true)
                // }
            },
            {
                title: '抬头类型',
                key: 'riseType',
                dataIndex: 'riseType',
                render: (res) => {
                    return SwitchStatus.riseType(res);
                }
            },
            {
                title: '抬头状态',
                key: 'riseStatus',
                dataIndex: 'riseStatus',
                render: (res) => {
                    return SwitchStatus.riseStatus(res);
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
                        <Link to={`/Pages/RiseManageDetail?id=${res.riseId}`}>
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

export default RiseManageList
