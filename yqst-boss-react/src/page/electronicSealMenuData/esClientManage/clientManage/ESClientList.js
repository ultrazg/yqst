/**
 * Created by yb
 */

import React from 'react';
import {Form, Table} from 'antd';
import {Link} from "react-router-dom";
import TabsViewContent from "../../../../baseview/tabsViewContent/TabsViewContent";
import HeadSearch from "../../../../baseview/headSearch/HeadSearch";
import Model from "../Model";

class ESClientList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 1,
            pageSize: 10,
            total: 0,
            keyWord: '',
            platformSn: '',
            list: [],
            platformList : [{value: '', name: '请选择平台'}],
        }
    }

    getList = ()=>{
        const {current, pageSize, keyWord, platformSn} = this.state;
        Model.GetCustomerPageList({
            current,
            pageSize,
            platformSn,
            status: '',
            keyWord
        }, res=>{
            this.setState({
                list: res.data.records,
                total: res.data.total
            })
        })
    }

    componentDidMount() {
        this.getList();

        Model.GetPlatformList({}, res=>{
            let {platformList} = this.state;
            res.data.forEach(item=>{
                platformList.push({value: item.platformSn, name: item.platformName})
            })
            this.setState({
                platformList
            })
        })
    }


    render() {
        return (
            <TabsViewContent crumb={[{name: '电子签章服务中心'}, {name: "客户管理"}, {name: "客户列表"}]}>
                {this.makeHeadSearch()}
                {this.tableView()}
            </TabsViewContent>
        );
    }

    makeHeadSearch = ()=> {
        const {platformList} = this.state;
        let searchDatas = [
            {key: 'keyWord', type: 'Input', value: '', placeholder: '可查询编号、企业名称', label: '关键字', maxLength: 30},
            {
                key: 'platformSn', type: 'Select', value: '', placeholder: '请选择平台', label: '平台筛选',
                list: platformList
            }
        ];
        return (
            <HeadSearch data={searchDatas} callBack={(obj) => {
                const {keyWord, platformSn} = obj;
                this.setState({
                    current: 1,
                    keyWord,
                    platformSn
                },()=>{
                    this.getList();
                })
            }}/>
        )
    }

    tableView = ()=> {
        const {current, pageSize, total, list} = this.state;
        const columns = [
            {
                title: '企业编号',
                dataIndex: 'companySn'
            },
            {
                title: '企业名称',
                dataIndex: 'companyName'
            },
            {
                title: '所属平台',
                dataIndex: 'platformName'
            },
            {
                title: '法人',
                dataIndex: 'legalName'
            },
            {
                title: '经办人',
                dataIndex: 'creatorName'
            },
            {
                title: '联系电话',
                dataIndex: 'creatorMobile'
            },
            {
                title: '客户状态',
                dataIndex: 'status',
                render(text){
                    switch (text) {
                        case 0:
                            return '未注册'
                        case 1:
                            return '使用中'
                        case 2:
                            return '已注销'
                    }
                }
            },
            {
                title: '操作',
                dataIndex: 'handle',
                render(text, record) {
                    return <Link to={`/Pages/ESContractManageDetail?companySn=${record.companySn}`}>查看</Link>
                }
            }
        ];

        return (
            <Table
                columns={columns}
                dataSource={list}
                bordered
                rowKey={'companySn'}
                pagination={{
                    total,
                    current,
                    pageSize,
                    onChange: (current, pageSize) => {
                        this.setState({
                            current
                        }, ()=>{
                            this.getList()
                        })
                    },
                    showTotal: (total, range) => `共有${total}条`
                }}
            />
        )
    }

}

export default ESClientList
