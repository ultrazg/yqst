/**
 * Created by yb on 2019/11/11
 */

import React from 'react';
import {Button, Form, message,} from 'antd';
import Model from "../Model";
import SWTable from 'SWViews/table';
import moment from 'moment';
import {Link} from "react-router-dom";
import SwitchName from "./SwitchName";
import TabsViewContent from "../../../baseview/tabsViewContent/TabsViewContent";
import HeadSearch from "../../../baseview/headSearch/HeadSearch";
import NumberFormat from "../../../utils/numberformat/NumberFormat";


class CloudServeExList extends React.Component {
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
            },
        }
    }

    componentDidMount() {
        this.getList();
    }

    render() {
        return (
            <TabsViewContent
                crumb={[{name: '云服务中心'}, {name: "云服务实力列表"}]}
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
        Model.CServeSUPage(this.state.requestPar, (res) => {
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
            {key: 'keyWord', type: 'Input', value: '', placeholder: '可查询ID、名称', label: '关键字', maxLength: 30},
            {
                key: 'status', type: 'Select', value: '', placeholder: '请选择实例状态', label: '实例状态',
                list: [
                    {value: '', name: '全部'},
                    {value: 2, name: '激活中'},
                    {value: 1, name: '未激活'},
                    {value: 3, name: '已过期'},
                    {value: 4, name: '禁用中'},
                ],
            },
            // {key: 'times', type:'RangePicker', value:'', placeholder: ['开始时间', '结束时间'], label: '创建时间',}
        ];
        return <HeadSearch data={searchDatas} form={this.props.form} callBack={(obj) => {
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
                title: '实例ID',
                key: 'id',
                dataIndex: 'id',
            },
            {
                title: '所有权用户名称',
                key: 'userName',
                dataIndex: 'userName',
            },
            {
                title: '云服务规则名称',
                key: 'softGoodsName',
                dataIndex: 'softGoodsName',
            },
            {
                title: '实例状态',
                key: 'status',
                dataIndex: 'status',
                render: (res) => {
                    return SwitchName.status(res);
                }
            },
            {
                title: '使用权用户数',
                key: 'authAccount',
                dataIndex: 'authAccount',
            },
            {
                title: '实例期限',
                key: '',
                dataIndex: '',
                width: 300,
                render: (res) => {
                    const staTime = res.activeTime ? moment(res.activeTime).format('YYYY-MM-DD HH:mm:ss') : '';
                    const endTime = res.expireTime ? moment(res.expireTime).format('YYYY-MM-DD HH:mm:ss') : '';
                    return `${staTime} ~ ${endTime}`;
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
                        <Link to={`/Pages/CloudServeExDetail?id=${res.id}`}>
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

export default CloudServeExList
