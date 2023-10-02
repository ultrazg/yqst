/**
 * Created by yb on 2019/10/23
 */

import React from 'react';
import {Button} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import Model from "../Model";
import SWTable from 'SWViews/table';
import moment from 'moment';
import {Link} from "react-router-dom";
import SwitchName from "./SwitchName";
import TabsViewContent from "../../../baseview/tabsViewContent/TabsViewContent";
import HeadSearch from "../../../baseview/headSearch/HeadSearch";


class AttGroupList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            total: 0,
            requestPar: {
                current: 1,
                pageSize: 10,
                keyWord: '',
                type: '',
            },
        }
    }

    componentDidMount() {
        this.getList();
    }

    render() {
        return (
            <TabsViewContent
                crumb={[{name: '认证中心'}, {name: "认证内容管理"}, {name: "认证组管理列表"}]}
                // tabs={this.tabsConfig()}
                topBtn={
                    <Link to={'/Pages/AttGroupEditor'}>
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
        Model.UserAttDocPPage(this.state.requestPar, (res) => {
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
            {key: 'keyWord', type: 'Input', value: '', placeholder: '可查询ID、编码、名称、云服务', label: '关键字', maxLength: 30},
            {
                key: 'type', type: 'Select', value: '', placeholder: '请选择认证组类型', label: '认证组类型',
                list: [
                    {value: '', name: '全部'},
                    {value: 1, name: '企业实名认证'},
                    {value: 3, name: '个人实名认证'},
                    {value: 2, name: '云服务主认证'},
                    {value: 4, name: '云服务子模块认证'},
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
            }, () => {this.getList();});
        }}/>
    }

    makeTable() {
        let {list, requestPar} = this.state;
        const columns = [
            {
                title: '认证组ID',
                key: 'docParentId',
                dataIndex: 'docParentId',
            },
            {
                title: '认证组编码',
                key: 'parentCode',
                dataIndex: 'parentCode'
            },
            {
                title: '认证组名称',
                key: 'name',
                dataIndex: 'name',
            },
            {
                title: '认证组类型',
                key: 'type',
                dataIndex: 'type',
                render: (res) => {
                    return SwitchName.type(res);
                }
            },
            {
                title: '关联云服务',
                key: 'softName',
                dataIndex: 'softName',
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
                        <Link to={`/Pages/AttGroupDetail?id=${res.docParentId}`}>
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

export default AttGroupList
