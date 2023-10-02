//认证数据明细模块
import React, {Component} from 'react';
import {Link} from "react-router-dom";
import TabsViewContent from "../../../../baseview/tabsViewContent/TabsViewContent";
import {Button, Form, Modal, Table} from "antd";
import {RollbackOutlined} from '@ant-design/icons';
import HeadSearch from "../../../../baseview/headSearch/HeadSearch";
import Model from "../Model";

class ESPlatformCertificationDetail extends Component {
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
            visible: false,
            subFlowList: [],
            serviceName: ''
        };
        this.serviceSn = '';
        this.platformSn = '';
    }

    getList = ()=>{
        const {current, pageSize, keyWord, startTime, endTime} = this.state;
        Model.GetAuthPageList({
            current,
            pageSize,
            keyWord,
            startTime,
            endTime,
            serviceSn: this.serviceSn,
            platformSn: this.platformSn
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
            this.getList();

            Model.GetServiceList({}, res=>{
                for(let i=0; i<res.data.length; i++){
                    if(this.serviceSn === res.data[i].serviceSn){
                        this.setState({
                            serviceName: res.data[i].serviceName
                        })
                        return
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
                        <Button icon={<RollbackOutlined />}>返回</Button>
                    </Link>
                }
            >
                {this.makeHeadSearch()}
                {this.tableView()}
                {this.ModalView()}
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

    getSubFlowTypeName(type){
        switch (type) {
            case 1:
                return '三要素比对';
            case 2:
                return '四要素比对';
            case 3:
                return '打款认证';
            case 4:
                return '支付宝认证';
            case 5:
                return '法人授权书';
            case 6:
                return '短信认证';
            case 7:
                return '银行卡认证';
            case 8:
                return '手机认证';
            case 9:
                return '人脸识别';
        }
    }

    tableView = ()=> {

        let columns = [
            {
                title: '使用编号',
                dataIndex: 'logSn'
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
                title: '剩余可用次数',
                dataIndex: 'surplusCount'
            },
            {
                title: '操作',
                dataIndex: 'subFlowList',
                render: (subFlowList)=>{
                    return (
                        <a onClick={()=>{
                            this.setState({
                                subFlowList,
                                visible: true
                            })
                        }}>详情</a>
                    )
                }
            }
        ];

        const {current, pageSize, total, list, serviceName} = this.state;

        return (
            <div>
                <p style={{marginLeft: 10, fontWeight: 'normal'}}>服务名称：{serviceName}</p>
                <Table
                    columns={columns}
                    dataSource={list}
                    bordered
                    rowKey={'logSn'}
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

    ModalView = ()=>{
        let {subFlowList, visible} = this.state;
        return (
            <Modal
                title="使用详情"
                visible={visible}
                onOk={()=>{
                    this.setState({
                        visible: false
                    })
                }}
                onCancel={()=>{
                    this.setState({
                        visible: false
                    })
                }}
            >
                <ul style={{listStyle: 'none', padding: 0, maxHeight: 250, overflow: 'scroll'}}>
                    {
                        subFlowList && subFlowList.map((item, index)=>{
                            return (
                                <li key={index} style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: index === 0 ? 0 : 25}}>
                                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50%'}}>
                                        {this.getSubFlowTypeName(item['subFlowType'])}
                                    </div>
                                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50%'}}>
                                        {item['deductionTime']}
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </Modal>
        )
    }

}

export default ESPlatformCertificationDetail