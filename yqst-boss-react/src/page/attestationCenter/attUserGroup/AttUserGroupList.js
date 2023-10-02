/**
 * Created by yb on 2019/10/23
 */

import React from 'react';
import {Form} from 'antd';
import Model from "../Model";
import SWTable from 'SWViews/table';
import moment from 'moment';
import {Link} from "react-router-dom";
import SwitchName from "./SwitchName";
import TabsViewContent from "../../../baseview/tabsViewContent/TabsViewContent";
import HeadSearch from "../../../baseview/headSearch/HeadSearch";


class AttUserGroupList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            total: 0,
            requestPar: {
                current: 1,
                pageSize: 10,
                keyWord: '',
                serviceTag: '',
                isAuth: '',
            },
            softList: []
        }
    }

    componentDidMount() {
        this.getSoftList();
        this.getList();
    }

    render() {
        return (
            <TabsViewContent
                crumb={[{name: '认证中心'}, {name: "用户认证组列表"}]}
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
        Model.UserAttDPage(this.state.requestPar, (res) => {
            this.setState({
                list: res.data.records || [],
                total: res.data.total || 0,
            })
        }, (err) => {
        })
    }

    getSoftList() {
        Model.UserAttSBigList({}, (res) => {
            let newList = [
                {value: '', name: '全部'},
                {value: '0', name: '无'},
            ];
            res.data && res.data.forEach(item => {
                item.value = item.serviceTag;
                newList.push(item);
            });
            this.setState({
                softList: newList,
            })
        }, (err) => {
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
            {key: 'keyWord', type: 'Input', value: '', placeholder: '可查询编号、企业名称、认证组名称', label: '关键字', maxLength: 30},
            {
                key: 'serviceTag', type: 'Select', value: '', placeholder: '请选择', label: '关联云服务',
                list: this.state.softList,
                attribute: {
                    showSearch: true,
                    filterOption: (input, option) => {
                        return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                }
            },
            {
                key: 'isAuth', type: 'Select', value: '', placeholder: '请选择认证状态', label: '认证状态',
                list: [
                    {value: '', name: '全部'},
                    {value: 0, name: '待认证'},
                    {value: 1, name: '已通过'},
                    {value: 2, name: '不通过'},
                    {value: 3, name: '已失效'},
                ],
            },
            // {key: 'time', type:'RangePicker', value:'', placeholder: ['开始时间', '结束时间'], label: '创建时间',},
        ];
        return <HeadSearch data={searchDatas} form={this.props.form} callBack={(obj) => {
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
        const columns = [
            {
                title: '用户认证组编号',
                key: 'uParentSn',
                dataIndex: 'uParentSn',
            },
            {
                title: '企业名称',
                key: 'userName',
                dataIndex: 'userName'
            },
            {
                title: '认证组名称',
                key: 'parentName',
                dataIndex: 'parentName',
            },
            {
                title: '关联云服务',
                key: 'softName',
                dataIndex: 'softName',
            },
            {
                title: '认证状态',
                key: 'isAuth',
                dataIndex: 'isAuth',
                render: (res) => {
                    return SwitchName.isAuth(res);
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
                        <Link to={`/Pages/AttUserGroupDetail?id=${res.id}`}>
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

export default AttUserGroupList
