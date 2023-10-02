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

class AttAptitudeList extends React.Component {
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
                crumb={[{name: '认证中心'}, {name: "认证内容管理"}, {name: "资质管理列表"}]}
                // tabs={this.tabsConfig()}
                topBtn={
                    <Link to={'/Pages/AttAptitudeEditor'}>
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
        Model.UserAttDocPage(this.state.requestPar, (res) => {
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
                key: 'type', type: 'Select', value: '', placeholder: '请选择资质类型', label: '资质类型',
                list: [
                    {value: '', name: '全部'},
                    {value: 1, name: '文本'},
                    {value: 2, name: '图片'},
                    {value: 5, name: '地址'},
                    {value: 3, name: '时间点'},
                    {value: 4, name: '时间区间'},
                    {value: 6, name: '附件'},
                    {value: 7, name: '选项'},
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
                title: '资质ID',
                key: 'id',
                dataIndex: 'id',
            },
            {
                title: '资质编码',
                key: 'docCode',
                dataIndex: 'docCode'
            },
            {
                title: '资质名称',
                key: 'docName',
                dataIndex: 'docName',
            },
            {
                title: '资质类型',
                key: 'docType',
                dataIndex: 'docType',
                render: (res) => {
                    return SwitchName.docType(res);
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
                width: 90,
                render: (res) => {
                    return <div>
                        <Link to={`/Pages/AttAptitudeDetail?id=${res.id}`}>
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

export default AttAptitudeList
