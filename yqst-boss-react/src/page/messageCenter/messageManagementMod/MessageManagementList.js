/**
 * Created by yb on 2019/08/30
 */

import React from 'react';
import {Button, Form, message,} from 'antd';
import Model from "../Model";
import SWTable from 'SWViews/table';
import moment from 'moment';
import {Link} from "react-router-dom";
import TabsViewContent from "../../../baseview/tabsViewContent/TabsViewContent";
import HeadSearch from "../../../baseview/headSearch/HeadSearch";
import NumberFormat from "../../../utils/numberformat/NumberFormat";


class MessageManagementList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            catList: [],
            total: 0,
            requestPar: {
                current: 1,
                pageSize: 10,
                keyWord: '',
                status: '',
                catId: '',
                startTime: '',
                endTime: '',
                sortType: 2,
            },
        }
    }

    componentDidMount() {
        this.getList();
        this.getCatList();
    }

    render() {
        return (
            <TabsViewContent
                crumb={[{name: '消息中心'}, {name: "消息管理列表"}]}
                // tabs={this.tabsConfig()}
            >
                {this.makeHeadSearch()}
                {this.makeTable()}
            </TabsViewContent>
        );
    }

    getList() {
        Model.MesInfoPage(this.state.requestPar, (res) => {
            this.state.total = res.data.total || 0;

            this.setState({
                list: res.data.records || [],
                total: this.state.total || 0,
            })
        }, (err) => {
        })
    }

    getCatList() {
        Model.MesInfoCList({}, (res) => {
            const newCatList = res.data && res.data.map((item, idx) => {
                return {
                    ...item,
                    name: item.infoType,
                    value: item.id,
                }
            });

            this.setState({
                catList: newCatList,
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
            {key: 'keyWord', type: 'Input', value: '', placeholder: '可查询发送者、接收者、消息内容', label: '关键字', maxLength: 30},
            {key: 'tiems', type:'RangePicker', value:'', placeholder: ['开始时间', '结束时间'], label: '发送时间',},
            {
                key: 'status', type: 'Select', value: '', placeholder: '请输入申请状态', label: '消息状态',
                list: [
                    {value: '', name: '全部状态'},
                    {value: 0, name: '已发送'},
                    {value: 1, name: '发送失败'},
                ],
            },
            {
                key: 'infoTypeId', type: 'Select', value: '', placeholder: '请输入申请状态', label: '消息类型',
                list: [
                    {value: '', name: '全部类型'},
                    ...this.state.catList
                ],
            },
        ];
        return <HeadSearch data={searchDatas} form={this.props.form} callBack={(obj) => {
            obj.startTime = obj.tiems [0] || '';
            obj.endTime = obj.tiems [1] || '';
            obj.current = 1;

            delete obj.tiems;
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
                title: '消息ID',
                key: 'id',
                dataIndex: 'id',
                width: 90
            },
            {
                title: '消息发送者',
                key: 'sender',
                dataIndex: 'sender',
            },
            {
                title: '消息接收者',
                key: 'receiverPersonName',
                dataIndex: 'receiverPersonName',
            },
            {
                title: '消息类型',
                key: 'infoType',
                dataIndex: 'infoType',
            },
            {
                title: '消息内容',
                key: 'infoContent',
                dataIndex: 'infoContent',
                width: '30%'
            },
            {
                title: '发送时间',
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
                title: '消息状态',
                key: 'status',
                dataIndex: 'status',
                render: (res) => {
                    return '1' === '' + res ? <span style={{color: '#F12C20'}}>发送失败</span> : <span style={{color: '#46BD4C'}}>已发送</span>
                }
            },
            {
                title: '操作',
                key: '',
                dataIndex: '',
                width: 90,
                render: (res) => {
                    return <Link to={`/Pages/MessageManagementDetail?id=${res.id}`}>
                        查看
                    </Link>
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

export default MessageManagementList
