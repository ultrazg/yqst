/*平台数据*/
import React, {Component} from 'react';
import TabsViewContent from "../../../../baseview/tabsViewContent/TabsViewContent";
import {Form, Table, Button} from "antd";
import {Link} from "react-router-dom";
import HeadSearch from "../../../../baseview/headSearch/HeadSearch";
import Model from "../Model";

class ESPlatformData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 1,
            pageSize: 10,
            keyWord: '',
            list: [],
            total: 0
        };
    }

    getPlatformForPage = ()=>{
        const {current, pageSize, keyWord} = this.state;
        Model.GetPlatformForPage({current, pageSize, keyWord}, res=>{
            this.setState({
                list: res.data.records
            })
        })
    }

    componentDidMount() {
        this.getPlatformForPage();
    }


    render() {
        return (
            <TabsViewContent
                crumb={[{name: '电子签章服务中心'}, {name: "数据管理"}, {name: "平台数据"}]}
            >
                {this.makeHeadSearch()}
                {this.tableView()}
            </TabsViewContent>
        )
    }


    makeHeadSearch = ()=> {
        let searchDatas = [
            {key: 'keyWord', type: 'Input', value: '', placeholder: '可查询平台名称', label: '搜索平台名称', maxLength: 30},
        ];
        return (
            <HeadSearch data={searchDatas} callBack={(obj) => {
                const {keyWord} = obj;
                this.setState({
                    current: 1,
                    keyWord
                }, ()=>{
                    this.getPlatformForPage();
                })

            }}/>
        )
    }


    tableView = ()=> {
        const columns = [
            {
                title: '平台编号',
                dataIndex: 'platformSn'
            },
            {
                title: '平台名称',
                dataIndex: 'platformName'
            },
            {
                title: '平台客户数量',
                dataIndex: 'companyQuantity'
            },
            {
                title: '累计付费金额',
                dataIndex: 'totalPaymentAmount'
            },
            {
                title: '操作',
                dataIndex: 'handle',
                render: (text, record, index)=> {
                    return <Link to={`/Pages/ESPlatformServiceData?platformSn=${record.platformSn}`}>详情</Link>
                }
            }
        ];
        const {list, current, pageSize, total} = this.state;

        return (
            <Table
                columns={columns}
                dataSource={list}
                bordered
                rowKey={'platformSn'}
                pagination={{
                    total,
                    current,
                    pageSize,
                    onChange: (current, b) => {
                        this.setState({
                            current
                        }, ()=>{
                            this.getPlatformForPage()
                        })
                    },
                    showTotal: (total, range) => `共有${total}条`
                }}
            />
        )
    }
}

export default ESPlatformData