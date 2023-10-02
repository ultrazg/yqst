// 印章数据明细模块
import React, {Component} from 'react';
import {Link} from "react-router-dom";
import TabsViewContent from "../../../../baseview/tabsViewContent/TabsViewContent";
import {Button, Form, Table} from "antd";
import {RollbackOutlined} from '@ant-design/icons';
import HeadSearch from "../../../../baseview/headSearch/HeadSearch";
import Model from "../Model";

class ESPlatformSealDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 1,
            pageSize: 10,
            total: 0,
            list: [],
            keyWord: '',
            startTime: '',
            endTime: '',
            serviceName: ''
        };
        this.serviceSn = '';
        this.platformSn = '';
    }

    getList = ()=>{
        const {current, pageSize, keyWord, startTime, endTime} = this.state;
        Model.GetSealPageList({
            current,
            pageSize,
            keyWord,
            startTime,
            endTime,
            platformSn: this.platformSn,
            serviceSn: this.serviceSn
        }, res=>{
            this.setState({
                list: res.data.records,
                total: res.data.total
            })
        })
    }

    getParams(name) {
        let arr = this.props.location.search.substr(1).split("&");
        for(let i=0; i<arr.length; i++){
            if(arr[i].indexOf(name) !== -1){
                return arr[i].split('=')[1]
            }
        }
    }

    componentDidMount() {
        this.serviceSn = this.getParams('serviceSn');
        this.platformSn = this.getParams('platformSn');
        if(this.serviceSn && this.platformSn){
            this.getList()

            Model.GetServiceList({}, res=>{
                for(let i=0; i<res.data.length; i++){
                    if(this.serviceSn === res.data[i].serviceSn){
                        this.setState({
                            serviceName: res.data[i].serviceName
                        })
                        break
                    }
                }
            })

        }
    }

    render() {
        return (
            <TabsViewContent
                crumb={[
                        {name: '电子签章服务中心'},
                        {name: "数据管理"},
                        {name: "平台数据", link: '/Pages/ESPlatformData'},
                        {name: "服务数据", link: '/Pages/ESPlatformServiceData?platformSn=' + this.platformSn},
                        {name: "数据明细"}
                ]}
                topBtn={
                    <Link to={'/Pages/ESPlatformServiceData?platformSn=' + this.platformSn}>
                        <Button icon={<RollbackOutlined/>}>返回</Button>
                    </Link>
                }
            >
                {this.makeHeadSearch()}
                {this.tableView()}
            </TabsViewContent>
        )
    }


    makeHeadSearch() {
        const searchDatas = [
            {key: 'keyWord', type: 'Input', value: '', placeholder: '可查询公司名称', label: '搜索公司', maxLength: 30},
            {key: 'times', type:'RangePicker', value:'', placeholder: ['开始时间', '结束时间'], label: '扣费日期',},
        ];
        return (
            <HeadSearch data={searchDatas} callBack={(obj) => {
                let keyWord = obj.keyWord,
                startTime = obj.times[0] || '',
                endTime = obj.times[1] || '';
                this.setState({
                    current: 1,
                    startTime,
                    endTime,
                    keyWord
                }, ()=>{
                    this.getList();
                })
            }}/>
        )
    }

    tableView = ()=> {

        let columns = [
            {
                title: '列表编号',
                dataIndex: 'logSn'
            },
            {
                title: '服务名称',
                dataIndex: 'serviceName'
            },
            {
                title: '公司名称',
                dataIndex: 'companyName'
            },
            {
                title: '扣费时间',
                dataIndex: 'deductionTime'
            },
            {
                title: '剩余次数',
                dataIndex: 'surplusCount'
            }
        ];

        const {current, pageSize, total, list} = this.state;

        return (
            <div>
                <p style={{marginLeft: 10, fontWeight: 'normal'}}>服务名称：{this.state.serviceName}</p>
                <Table
                    columns={columns}
                    dataSource={list}
                    bordered
                    style={{marginTop: 10}}
                    pagination={{
                        total,
                        current,
                        pageSize,
                        onChange: (current)=>{
                            this.setState({
                                current
                            }, ()=>{
                                this.getList()
                            })
                        },
                        showTotal: total=> `共${total}条`
                    }}
                />
            </div>
        )
    }

}

export default ESPlatformSealDetail