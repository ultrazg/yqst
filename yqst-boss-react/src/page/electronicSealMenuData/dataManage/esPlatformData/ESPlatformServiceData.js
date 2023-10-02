/*规则数据模块*/
import React, {Component} from 'react';
import TabsViewContent from "../../../../baseview/tabsViewContent/TabsViewContent";
import {Button, Form, Table} from "antd";
import {RollbackOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import HeadSearch from "../../../../baseview/headSearch/HeadSearch";
import Model from "../Model";

class ESPlatformServiceData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            platformSn: '',
            current: 1,
            pageSize: 10,
            keyWord: '',
            total: 0,
            list: [],
            platformName: ''
        };
    }

    getPlatformServiceList = ()=>{
        const {platformSn, keyWord} = this.state;
        Model.GetPlatformServiceList({
            platformSn,
            keyWord
        }, res=>{
            this.setState({
                list: res.data
            })
        })
    }

    componentDidMount() {
        let platformSn = this.props.location.search.substr(1).split("=")[1];
        if(!platformSn){
            return
        }

        this.setState({
            platformSn
        }, ()=>{
            this.getPlatformServiceList()
        })

        Model.GetPlatformList({}, res=>{
            let arr = res.data;
            let {platformName} = this.state;
            for(let i=0; i<arr.length; i++){
                if(arr[i].platformSn === platformSn){
                    platformName = arr[i].platformName
                }
            }
            this.setState({
                platformName
            })
        })

    }

    render() {
        return (
            <TabsViewContent
                crumb={[
                        {name: '电子签章服务中心'},
                        {name: "数据管理"},
                        {name: "平台数据", link: '/Pages/ESPlatformData'},
                        {name: "服务数据"}
                    ]}
                topBtn={
                    <Link to={'/Pages/ESPlatformData'}>
                        <Button icon={<RollbackOutlined />}>返回</Button>
                    </Link>
                }
            >
                {/*{this.makeHeadSearch()}*/}
                {this.tableView()}
            </TabsViewContent>
        )
    }

    makeHeadSearch = ()=> {
        let searchDatas = [
            {key: 'keyWord', type: 'Input', value: '', placeholder: '可查询规则名称', label: '搜索规则名称', maxLength: 30},
        ];
        return (
            <HeadSearch data={searchDatas} form={this.props.form} callBack={({keyWord}) => {
                this.setState({
                    keyWord
                }, ()=>{
                    this.getPlatformServiceList();
                })

            }}/>
        )
    }

    tableView = ()=> {

        const {list, current, pageSize, total} = this.state;
        const columns = [
            {
                title: '服务编号',
                dataIndex: 'serviceSn'
            },
            {
                title: '服务名称',
                dataIndex: 'serviceName'
            },
            {
                title: '今日使用次数',
                dataIndex: 'todayUseCount'
            },
            {
                title: '今日使用客户',
                dataIndex: 'todayUseCompanyCount'
            },
            {
                title: '累计使用数量',
                dataIndex: 'totalUseCount'
            },
            {
                title: '操作',
                dataIndex: 'handle',
                render: (text, record, index)=> {
                    return (
                        <Link
                            to={
                                record['serviceName'].indexOf('印章') !== -1 ?
                                `/Pages/ESPlatformSealDetail?serviceSn=${record.serviceSn}&platformSn=${this.state.platformSn}`:
                                `/Pages/ESPlatformCertificationDetail?serviceSn=${record.serviceSn}&platformSn=${this.state.platformSn}`
                            }
                        >
                            详情
                        </Link>
                    )
                }
            }
        ];


        return (
            <div>
                <p style={{marginLeft: 10, fontWeight: 'normal'}}>平台：{this.state.platformName}</p>
                <Table
                    columns={columns}
                    dataSource={list}
                    bordered
                    rowKey={'serviceSn'}
                    pagination={{
                        total,
                        current,
                        pageSize,
                        onChange: (current, b) => {
                            this.setState({
                                current
                            }, ()=>{
                                this.getPlatformServiceList()
                            })
                        },
                        showTotal: (total, range) => `共有${total}条`
                    }}
                    style={{marginTop: 10}}
                />
            </div>
        )
    }
}

export default ESPlatformServiceData