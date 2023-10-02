import React, {Component} from 'react';
import HeadSearch from "../../../../baseview/headSearch/HeadSearch";
import {Table, Form} from "antd";
import TabsViewContent from "../../../../baseview/tabsViewContent/TabsViewContent";
import {Link} from "react-router-dom";
import Model from "../Model";

class ESServiceInstanceList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 1,
            pageSize: '',
            startTime: '',
            endTime: '',
            keyWord: '',
            list: [],
            total: 0
        };
    }

    getServiceInstanceList(){
        const {current, pageSize, startTime, endTime, keyWord} = this.state;
        Model.GetServiceInstanceList({current, pageSize, startTime, endTime, keyWord}, res=>{
            let list = res.data.records;
            for(let i=0; i<list.length; i++){
                let item = list[i];
                item.timeLimit = item.activeTime + ' - ' + (item.expireTime ? item.expireTime : '');
            }

            this.setState({
                list,
                total: res.data.total
            })
        })
    }

    componentDidMount() {
        this.getServiceInstanceList()
    }

    render() {
        return (
            <TabsViewContent
                crumb={[{name: '电子签章服务中心'}, {name: "服务管理"}, {name: "服务实例管理"}]}
            >
                {this.makeHeadSearch()}
                {this.tableView()}
            </TabsViewContent>
        )
    }

    makeHeadSearch = ()=> {
        let searchDatas = [
            {key: 'keyWord', type: 'Input', value: '', placeholder: '可查询实例名称', label: '搜索实例名称', maxLength: 30},
            {key: 'times', type:'RangePicker', value:'', placeholder: ['开始时间', '结束时间'], label: '搜索产生时间',},
        ];
        return (
            <HeadSearch data={searchDatas} callBack={(obj) => {
                let keyWord = obj.keyWord;
                let startTime = obj.times ? obj.times[0] : '';
                let endTime = obj.times ? obj.times[1] : '';
                this.setState({
                    current: 1,
                    keyWord,
                    startTime,
                    endTime
                }, ()=>{
                    this.getServiceInstanceList()
                })
            }}/>
        )
    }

    tableView = ()=> {
        let {list, total, current, pageSize} = this.state;

        let columns = [
            {
                title: '实例ID',
                dataIndex: 'serviceInstanceSn',
            },
            {
                title: '所有权用户名称',
                dataIndex: 'companyName',
            },
            {
                title: '实例名称',
                dataIndex: 'instanceName',
            },
            {
                title: '实例规格',
                dataIndex: 'specList',
                render: (specList)=>{
                    return (
                        <div>
                            {
                                specList && specList.map((item, index)=>{
                                    return <p key={index}>{item.specName} {item.specValue}</p>
                                })
                            }
                        </div>
                    )
                }
            },
            {
                title: '实例期限',
                dataIndex: 'timeLimit',
            },
            {
                title: '产生时间',
                dataIndex: 'createTime',
            },
            {
                title: '操作',
                dataIndex: 'handle',
                render: (text, record)=> {
                    const {serviceInstanceSn} = record;
                    return <Link to={`/Pages/ESServiceInstanceDetail?serviceInstanceSn=${serviceInstanceSn}`}>查看</Link>
                }
            }
        ];

        return (
            <Table
                columns={columns}
                dataSource={list}
                bordered
                rowKey="serviceInstanceSn"
                style={{marginTop: 18}}
                pagination={
                    {
                        total: total,
                        current: current,
                        pageSize: pageSize,
                        onChange: (a, b) => {
                            current = a;
                            this.setState({current}, () => {
                                this.getServiceInstanceList();
                            })
                        },
                        showTotal: (total, range) => `共有${total}条`
                    }
                }
            />
        )
    }
}

export default ESServiceInstanceList