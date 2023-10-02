/**
 * Created by yb on 2019/11/12
 */

import React from 'react';
import {Button, Form, message, Popconfirm,} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import Model from "../Model";
import SWTable from 'SWViews/table';
import moment from 'moment';
import {Link} from "react-router-dom";
import TabsViewContent from "../../../baseview/tabsViewContent/TabsViewContent";
import HeadSearch from "../../../baseview/headSearch/HeadSearch";


class CloudServeClaList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            total: 0,
            requestPar: {
                current: 1,
                pageSize: 10,
                keyWord: '',
            },
        }
    }

    componentDidMount() {
        this.getList();
    }

    render() {
        return (
            <TabsViewContent
                crumb={[{name: '云服务中心'}, {name: "基本配置"}, {name: "云服务分类列表"}]}
                // tabs={this.tabsConfig()}
                topBtn={
                    <Link to={'/Pages/CloudServeClaEdit'}>
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
        Model.CServeSCPage(this.state.requestPar, (res) => {
            const mapChildren = (list) => {
                list.forEach((item, idx) => {
                    item.key = (++idx + (parseInt(this.state.requestPar.current) - 1) * 10) + '_' + item.id;
                    // item.numXH = ++idx + (parseInt(this.state.requestPar.current) - 1) * 10;
                    if(item.listSoftCatDTOS && item.listSoftCatDTOS.length > 0){
                        item.children = item.listSoftCatDTOS;
                        mapChildren(item.listSoftCatDTOS);
                    }
                });
                return list;
            };
            const newList = mapChildren(res.data.records || []).map((item, idx) => {
                return {
                    ...item,
                    numXH: ++idx + (parseInt(this.state.requestPar.current) - 1) * 10,
                }
            });
            this.setState({
                list: newList,
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
            {key: 'keyWord', type: 'Input', value: '', placeholder: '可查询分类ID、分类编码、分类名称', label: '关键字', maxLength: 30},
            // {
            //     key: 'a', type: 'Select', value: '', placeholder: '请选择实例状态', label: '实例状态',
            //     list: [
            //         {value: '', name: '全部'},
            //         {value: 1, name: '激活中'},
            //         {value: 2, name: '未激活'},
            //         {value: 3, name: '已过期'},
            //         {value: 4, name: '禁用中'},
            //     ],
            // },
            // {key: 'times', type:'RangePicker', value:'', placeholder: ['开始时间', '结束时间'], label: '创建时间',}
        ];
        return <HeadSearch data={searchDatas} callBack={(obj) => {
            // obj.startTime = obj.times [0] || '';
            // obj.endTime = obj.times [1] || '';
            obj.current = 1;

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
                title: '排序',
                key: 'numXH',
                dataIndex: 'numXH',
            },
            {
                title: '分类ID',
                key: 'id',
                dataIndex: 'id',
            },
            {
                title: '分类编码',
                key: 'catSn',
                dataIndex: 'catSn',
            },
            {
                title: '分类名称',
                key: 'catName',
                dataIndex: 'catName',
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
                        <Link to={`/Pages/CloudServeClaDetail?id=${res.id}`}>
                            查看
                        </Link>
                        <span style={{
                            margin: '0 10px',
                            borderRight: '1px solid #d7d6d6',
                        }}/>
                        <Popconfirm
                            title="确认要删除该条数据吗？"
                            placement="topRight"
                            onConfirm={() => {
                                Model.CServeSCDelete({id: res.id}, (res) => {
                                    message.success('删除成功！');
                                    this.setState({
                                        requestPar: {
                                            ...this.state.requestPar,
                                            current: 1
                                        }
                                    }, () => {this.getList();})
                                }, (err) => {
                                })
                            }}
                            onCancel={() => {}}
                            okText="确定"
                            cancelText="取消"
                        >
                            <a style={{color: '#f00'}}>删除</a>
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
                            this.setState({requestPar: {
                                ...this.state.requestPar,
                                current: a,
                            }}, () => {
                                this.getList();
                            });
                        },
                        showTotal: (total, range) => `共有${total}条`
                    }
                }
            />
        </div>
    }

}

export default CloudServeClaList
