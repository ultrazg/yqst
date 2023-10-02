/**
 * Created by yb on 2019/09/25
 */

import React from 'react';
import {Button} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import Model from "../../Model";
import SWTable from 'SWViews/table';
import {Link} from "react-router-dom";
import TabsViewContent from "../../../../baseview/tabsViewContent/TabsViewContent";
import HeadSearch from "../../../../baseview/headSearch/HeadSearch";


class ContractTemplateList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            total: 0,
            requestPar: {
                current: 1,
                pageSize: 10,
                keyWord: '',
                accountStatus: '',
                bindStatus: '',
                startTime: '',
                endTime: '',
                sortType: 2,
            },
        }
    }

    componentDidMount() {
        // this.getList();
    }

    render() {
        return (
            <TabsViewContent
                crumb={[{name: '合同中心'}, {name: "模板管理"}, {name: "合同模板列表"}]}
                // tabs={this.tabsConfig()}
                topBtn={
                    <Button type='primary' icon={<PlusOutlined />}>添加</Button>
                }
            >
                {this.makeHeadSearch()}
                {this.makeTable()}
            </TabsViewContent>
        );
    }

    getList() {
        Model.walletPAPage(this.state.requestPar, (res) => {
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
                // this.setState({status: 0}, () => {
                //     this.getList()
                // })
            }
        }, {
            tabName: '待签署', callback: () => {
                // this.setState({status: 1}, () => {
                //     this.getList()
                // })
            }
        }, {
            tabName: '已完成', callback: () => {
                // this.setState({status: 2}, () => {
                //     this.getList()
                // })
            }
        }, {
            tabName: '已拒绝', callback: () => {
                // this.setState({status: 3}, () => {
                //     this.getList()
                // })
            }
        }, {
            tabName: '履行中', callback: () => {
                // this.setState({status: 3}, () => {
                //     this.getList()
                // })
            }
        }, {
            tabName: '已取消', callback: () => {
                // this.setState({status: 3}, () => {
                //     this.getList()
                // })
            }
        }, {
            tabName: '已到期', callback: () => {
                // this.setState({status: 3}, () => {
                //     this.getList()
                // })
            }
        }]
    }

    makeHeadSearch() {
        const searchDatas = [
            {key: 'keyWord', type: 'Input', value: '', placeholder: '可查询模版名称', label: '关键字', maxLength: 30},
            /*{
                key: 'accountStatus', type: 'Select', value: '', placeholder: '请选择账户状态', label: '账户状态',
                list: [
                    {value: '', name: '全部'},
                    {value: 1, name: '启用中'},
                    {value: 2, name: '禁止中'},
                    {value: 3, name: '已注销'},
                ],
            },*/
            {
                key: 'bindStatus', type: 'Select', value: '', placeholder: '请选择模版状态', label: '模版状态',
                list: [
                    {value: '', name: '全部'},
                    {value: 1, name: '已启用'},
                    {value: 2, name: '未启用'},
                ],
            },
            // {key: 'times', type:'RangePicker', value:'', placeholder: ['开始时间', '结束时间'], label: '发起时间',},
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
                // this.getList();
            });
        }}/>
    }

    makeTable() {
        let {list, requestPar} = this.state;
        const columns = [
            {
                title: '序号',
                key: '',
                dataIndex: '',
            },
            {
                title: '合同模版ID',
                key: '',
                dataIndex: '',
            },
            {
                title: '合同模版类型',
                key: '',
                dataIndex: '',
            },
            {
                title: '合同模版名称',
                key: '',
                dataIndex: '',
            },
            {
                title: '创建人',
                key: '',
                dataIndex: ''
            },
            {
                title: '更新时间',
                key: '',
                dataIndex: '',
                // width: 100,
                // render: (res) => {
                //     let times = res ? moment(res).format('YYYY-MM-DD HH:mm:ss') : '';
                //
                //     return times ? <div>
                //         <div>{times.split(' ')[0]}</div>
                //         <div>{times.split(' ')[1]}</div>
                //     </div> : times;
                // }
            },
            {
                title: '模版状态',
                key: '',
                dataIndex: ''
            },
            {
                title: '操作',
                key: '',
                dataIndex: '',
                width: 90,
                render: (res) => {
                    return <div>
                        <Link to={`/Pages/ContractTemplateDetail`}>
                            查看
                        </Link>
                        <span style={{
                            margin: '0 10px',
                            borderRight: '1px solid #d7d6d6',
                        }}/>
                        <a>
                            启用
                        </a>
                        <span style={{
                            margin: '0 10px',
                            borderRight: '1px solid #d7d6d6',
                        }}/>
                        <a>
                            删除
                        </a>
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

export default ContractTemplateList
