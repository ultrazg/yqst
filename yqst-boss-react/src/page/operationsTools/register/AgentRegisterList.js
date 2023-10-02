import React from 'react';
import Model from "./Model";
import SWTable from 'SWViews/table';
import moment from 'moment';
import {Link} from "react-router-dom";
import {Button} from 'antd';
import TabsViewContent from "../../../baseview/tabsViewContent/TabsViewContent";
import HeadSearch from "../../../baseview/headSearch/HeadSearch";
import NumberFormat from "../../../utils/numberformat/NumberFormat";
import request from "../../../utils/request/request";
import ApiInterface from "./ApiInterface";
import {PlusOutlined} from '@ant-design/icons';

class AgentRegisterList extends React.Component {
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
                crumb={[{name: '代办注册'}]}
                topBtn={
                    <Link to={'/Pages/AgentRegisterCreate'}>
                        <Button type='primary' icon={<PlusOutlined/>}>新增</Button>
                    </Link>
                }
            >
                {this.makeHeadSearch()}
                {this.makeTable()}
            </TabsViewContent>
        );
    }

    getList() {
        // Model.UserAPage(this.state.requestPar, (res) => {
        //     this.setState({
        //         list: res.data.records || [],
        //         total: res.data.total || 0,
        //     })
        // }, (err) => {
        // })
        request(ApiInterface.AgentProjectList, this.state.requestPar,
            (res) => {
                this.setState({
                    list: res.data.records || [],
                    total: res.data.total || 0,
                })
            }, () => {
            })
    }

    tabsConfig() {
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
            {key: 'keyWord', type: 'Input', value: '', placeholder: '项目名称', label: '关键字', maxLength: 30},
            {
                key: 'status', type: 'Select', value: '', placeholder: '请选择状态', label: '状态',
                list: [
                    {value: '', name: '全部'},
                    {value: 1, name: '待激活'},
                    {value: 2, name: '已激活'},
                ],
            },
            // {key: 'time', type:'RangePicker', value:'', placeholder: ['开始时间', '结束时间'], label: '创建时间',},
        ];
        return <HeadSearch data={searchDatas} callBack={(obj) => {
            // obj.startTime = obj.time [0] || '';
            // obj.endTime = obj.time [1] || '';
            obj.current = 1;
            //
            // delete obj.time;
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
        // id	long	企业id
        // sn	string	系统编码
        // accountSn	string	账套号
        // userName	string	用户名
        // createTime	Date	创建时间
        // status	Integer	运营中心代注册状态：1.运营代注册未激活，2运营代注册已激活
        const columns = [
            {
                title: '团队ID',
                key: 'id',
                dataIndex: 'id',
                width: 100,
            },
            {
                title: '团队号',
                key: 'accountSn',
                dataIndex: 'accountSn',
                width: 130,
            },
            {
                title: '项目名称',
                key: 'userName',
                dataIndex: 'userName',
                width: 180,
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
                title: '状态',
                key: 'insteadStatus',
                dataIndex: 'insteadStatus',
                width: 90,
                render: (res) => {
                    //1.运营代注册未激活，2运营代注册已激活
                    switch (res) {
                        case 1:
                            return "未激活"
                        case 2:
                            return "已激活"
                        default:
                            return ""
                    }
                }
            },
            {
                title: '操作',
                key: '',
                dataIndex: '',
                width: 120,
                render: (res, record) => {
                    return <div style={{display: 'flex', flexDirection: 'row'}}>
                        <a onClick={() => {
                            this.props.history.push('/Pages/AgentRegisterDetail?sn=' + record.sn)
                        }}>
                            查看
                        </a>
                        {/*<span style={{*/}
                        {/*    margin: '0 10px',*/}
                        {/*    borderRight: '1px solid #d7d6d6',*/}
                        {/*}}/>*/}
                        {/*<a style={{color: 'red'}} onClick={() => {*/}
                        {/*    alert('暂不支持');*/}
                        {/*}}>*/}
                        {/*    删除*/}
                        {/*</a>*/}
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

export default AgentRegisterList
