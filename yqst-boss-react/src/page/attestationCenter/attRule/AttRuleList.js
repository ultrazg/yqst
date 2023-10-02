/**
 * Created by yb on 2019/10/23
 */

import React from 'react';
import {Button, Popconfirm, message} from 'antd';
import {PlusOutlined, } from '@ant-design/icons';
import Model from "../Model";
import SWTable from 'SWViews/table';
import moment from 'moment';
import {Link} from "react-router-dom";
import SwitchName from "./SwitchName";
import TabsViewContent from "../../../baseview/tabsViewContent/TabsViewContent";
import HeadSearch from "../../../baseview/headSearch/HeadSearch";


class AttRuleList extends React.Component {
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
            },
        }
    }

    componentDidMount() {
        this.getList();
    }

    render() {
        return (
            <TabsViewContent
                crumb={[{name: '认证中心'}, {name: "认证规则管理列表"}]}
                // tabs={this.tabsConfig()}
                topBtn={
                    <Link to={'/Pages/AttRuleEditor'}>
                        <Button type='primary' icon={<PlusOutlined />}>新增</Button>
                    </Link>
                }
            >
                {this.makeHeadSearch()}
                {this.makeTable()}
            </TabsViewContent>
        );
    }

    getList() {
        Model.UserAttDRPage(this.state.requestPar, (res) => {
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
            {key: 'keyWord', type: 'Input', value: '', placeholder: '可查询ID、编码、名称', label: '关键字', maxLength: 30},
            {
                key: 'status', type: 'Select', value: '', placeholder: '请选择状态', label: '状态',
                list: [
                    {value: '', name: '全部'},
                    {value: 2, name: '启用中'},
                    {value: 1, name: '关闭中'},
                ],
            },
            {key: 'time', type:'RangePicker', value:'', placeholder: ['开始时间', '结束时间'], label: '创建时间',},
        ];
        return <HeadSearch data={searchDatas} callBack={(obj) => {
            obj.startTime = obj.time[0] || '';
            obj.endTime = obj.time[1] || '';
            obj.current = 1;

            delete obj.time;
            this.setState({
                requestPar: {
                    ...this.state.requestPar,
                    ...obj
                }
            }, () => {this.getList();});
        }}/>
    }

    makeTable() {
        let {list, requestPar} = this.state;
        const columns = [
            {
                title: '规则ID',
                key: 'ruleId',
                dataIndex: 'ruleId',
            },
            {
                title: '规则编码',
                key: 'ruleCode',
                dataIndex: 'ruleCode'
            },
            {
                title: '规则名称',
                key: 'ruleName',
                dataIndex: 'ruleName',
            },
            {
                title: '认证组ID',
                key: 'parentId',
                dataIndex: 'parentId',
            },
            {
                title: '认证组名称',
                key: 'parentName',
                dataIndex: 'parentName',
            },
            {
                title: '状态',
                key: 'status',
                dataIndex: 'status',
                render: (res) => {
                    return SwitchName.status(res);
                }
            },
            {
                title: '创建时间',
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
                width: 120,
                render: (res) => {
                    return <div>
                        <Link to={`/Pages/AttRuleDetail?id=${res.ruleId}`}>
                            查看
                        </Link>
                        <span style={{
                            margin: '0 10px',
                            borderRight: '1px solid #d7d6d6',
                        }}/>
                        <Popconfirm
                            placement="topRight"
                            title={`确认要${'2' === '' + res.status ? '关闭' : '开启'}该规则吗？`}
                            onConfirm={() => {
                                Model.UserAttDRSModify({
                                    ruleId: res.ruleId,
                                    status: '2' === '' + res.status ? '1' : '2'
                                }, (res) => {
                                    message.success('操作成功！');
                                    this.getList();
                                }, (err) => {
                                })
                            }}
                            onCancel={() => {}}
                            okText="确认"
                            cancelText="取消"
                        >
                            <a>{'2' === '' + res.status ? '关闭' : '开启'}</a>
                        </Popconfirm>
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

export default AttRuleList
