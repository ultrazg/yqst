/**
 * Created by yb
 */

import React from 'react';
import {Button, Form, message,} from 'antd';
import Model from "../Model";
import SWTable from 'SWViews/table';
import moment from 'moment';
import {Link} from "react-router-dom";
import TabsViewContent from "../../../../baseview/tabsViewContent/TabsViewContent";
import HeadSearch from "../../../../baseview/headSearch/HeadSearch";
import NumberFormat from "../../../../utils/numberformat/NumberFormat";
import StatusName from "./StatusName";

class ESApplyForList extends React.Component {
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
                crumb={[{name: '电子签章服务中心'}, {name: '电子签章申请'}, {name: "申请列表"}]}
                tabs={this.tabsConfig()}
                // topBtn={
                //     <Button type='primary' icon={'plus'}>添加</Button>
                // }
            >
                {this.makeHeadSearch()}
                {this.makeTable()}
            </TabsViewContent>
        );
    }

    getList() {
        Model.ESPlatformApplyPage(this.state.requestPar, (res) => {
            this.state.total = res.data.total || 0;
            // const newList = res.data.records && res.data.records.map((item, idx) => {
            //     return {
            //         ...item,
            //         sNum: (++idx) + (this.state.requestPar.current * 10) // 添加序号字段
            //     }
            // });

            this.setState({
                list: res.data.records || [],
                total: this.state.total || 0,
            })
        }, (err) => {
        })
    }

    tabsConfig(){
        return [{
            tabName: '全部', callback: () => {
                this.setState({
                    requestPar: {
                        ...this.state.requestPar,
                        status: '',
                    }
                }, () => {this.getList();});
            }
        }, {
            tabName: '待处理', callback: () => {
                this.setState({
                    requestPar: {
                        ...this.state.requestPar,
                        status: 1,
                    }
                }, () => {this.getList();});
            }
        }, {
            tabName: '驳回', callback: () => {
                this.setState({
                    requestPar: {
                        ...this.state.requestPar,
                        status: 3,
                    }
                }, () => {this.getList();});
            }
        }, {
            tabName: '已处理', callback: () => {
                this.setState({
                    requestPar: {
                        ...this.state.requestPar,
                        status: 2,
                    }
                }, () => {this.getList();});
            }
        }]
    }

    makeHeadSearch() {
        const searchDatas = [
            {key: 'keyWord', type: 'Input', value: '', placeholder: '可查询公司名称', label: '关键字', maxLength: 30},
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
                key: 'bindStatus', type: 'Select', value: '', placeholder: '请选择模版状态', label: '模版状态',
                list: [
                    {value: '', name: '全部'},
                    {value: 1, name: '已启用'},
                    {value: 2, name: '未启用'},
                ],
            },*/
            {key: 'times', type:'RangePicker', value:'', placeholder: ['开始时间', '结束时间'], label: '申请时间',},
        ];
        return <HeadSearch data={searchDatas} callBack={(obj) => {
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
                title: '申请ID',
                key: 'platformApplySn',
                dataIndex: 'platformApplySn',
            },
            {
                title: '申请公司名称',
                key: 'companyName',
                dataIndex: 'companyName',
            },
            {
                title: '申请时间',
                key: 'createTime',
                dataIndex: 'createTime',
                width: 200
            },
            {
                title: '申请人',
                key: 'contactName',
                dataIndex: 'contactName',
            },
            {
                title: '联系电话',
                key: 'contactPhone',
                dataIndex: 'contactPhone'
            },
            // {
            //     title: '申请状态',
            //     key: 'status',
            //     dataIndex: 'status',
            //     render: (res) => {
            //         console.log(res)
            //         return <div style={{color: StatusName(res, true)}}>
            //             {StatusName(res)}
            //         </div>
            //     }
            // },
            {
                title: '操作',
                key: '',
                dataIndex: '',
                width: 90,
                render: (res) => {
                    return <div>
                        <Link to={`/Pages/ESApplyForDetail?sn=${res.platformApplySn}`}>
                            {StatusName(res.status)}
                        </Link>
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

export default ESApplyForList
