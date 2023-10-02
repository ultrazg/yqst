/**
 * Created by yb on 2019/11/11
 */

import React from 'react';
import {Button, Form, message,} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Model from "../Model";
import SWTable from 'SWViews/table';
import moment from 'moment';
import {Link} from "react-router-dom";
import SwitchName from "./SwitchName";
import TabsViewContent from "../../../baseview/tabsViewContent/TabsViewContent";
import HeadSearch from "../../../baseview/headSearch/HeadSearch";


class CloudServeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            total: 0,
            requestPar: {
                current: 1,
                pageSize: 10,
                keyWord: '',
                isHide: '',
                startTime: '',
                endTime: '',
                catId: '',
            },
        }
    }

    componentDidMount() {
        this.getList();
    }

    render() {
        return (
            <TabsViewContent
                crumb={[{name: '云服务中心'}, {name: "云服务及规则管理"}, {name: "云服务列表"}]}
                // tabs={this.tabsConfig()}
                topBtn={
                    <Link to={'/Pages/CloudServeEdit'}>
                        <Button type='primary' icon={<PlusOutlined />}>添加</Button>
                    </Link>
                }
            >
                {this.makeHeadSearch()}
                {this.makeTable()}
            </TabsViewContent>
        );
    }

    getList() {
        Model.UserAttSList(this.state.requestPar, (res) => {
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
            {key: 'keyWord', type: 'Input', value: '', placeholder: '可查询ID、编码、名称、分类', label: '关键字', maxLength: 30},
            {
                key: 'isHide', type: 'Select', value: '', placeholder: '请选择可见性', label: '可见性',
                list: [
                    {value: '', name: '全部'},
                    {value: '0', name: '全部可见'},
                    {value: '2', name: '白名单可见'},
                    {value: '3', name: '黑名单隐藏'},
                    {value: '1', name: '全部隐藏'},
                ],
            },
            {key: 'times', type:'RangePicker', value:'', placeholder: ['开始时间', '结束时间'], label: '创建时间',}
        ];
        return (
            <HeadSearch data={searchDatas} callBack={(obj) => {
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
        )
    }

    makeTable() {
        let {list, requestPar} = this.state;
        const columns = [
            {
                title: '云服务ID',
                key: 'id',
                dataIndex: 'id',
            },
            {
                title: '云服务编码',
                key: 'softSn',
                dataIndex: 'softSn',
            },
            {
                title: '云服务名称',
                key: 'name',
                dataIndex: 'name',
            },
            {
                title: '云服务分类',
                key: 'catName',
                dataIndex: 'catName',
            },
            {
                title: '开发者ID',
                key: 'devId',
                dataIndex: 'devId',
            },
            {
                title: '可见性',
                key: 'isHide',
                dataIndex: 'isHide',
                render: (res) => {
                    return SwitchName.isHide(res);
                }
            },
            {
                title: '版本',
                key: 'softVersion',
                dataIndex: 'softVersion',
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
                width: 90,
                render: (res) => {
                    return <div>
                        <Link to={`/Pages/CloudServeDetail?id=${res.id}`}>
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

export default CloudServeList
