import React, {Component} from 'react';
import TabsViewContent from "../../../../baseview/tabsViewContent/TabsViewContent";
import HeadSearch from "../../../../baseview/headSearch/HeadSearch";
import {Table, Button} from "antd";
import {Link} from "react-router-dom";
import Model from "../Model";

class ESPaymentData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 1,
            pageSize: 10,
            total: 0,
            list: [],
            keyWord: '',
            platformSn: '',
            platformList: [{value: '', name: '全部'}]
        };
    }

    getList = ()=>{
        const {current, pageSize, keyWord, platformSn} = this.state;
        Model.GetPaymentPageList({
            current,
            pageSize,
            keyWord,
            platformSn,
            startTime: '',
            endTime: ''
        },res=>{
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
            <TabsViewContent
                crumb={[{name: '电子签章服务中心'}, {name: "数据管理"}, {name: "付费数据"}]}
                topBtn={<Button type='primary'>明细下载</Button>}
            >
                {this.makeHeadSearch()}
                {this.tableView()}
            </TabsViewContent>
        )
    }

    makeHeadSearch = ()=> {
        const {platformList} = this.state;
        let searchDatas = [
            {key: 'keyWord', type: 'Input', value: '', placeholder: '可查询公司名称', label: '搜索公司', maxLength: 30},
            {
                key: 'platformSn', type: 'Select', value: '', placeholder: '', label: '平台筛选',
                list: platformList,
            },
        ];
        return (
            <HeadSearch data={searchDatas} callBack={({keyWord, platformSn}) => {
                this.setState({
                    current: 1,
                    keyWord,
                    platformSn
                }, ()=>{
                    this.getList();
                })
            }}/>
        )
    }

    tableView = ()=> {

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
                title: '累计付费金额',
                dataIndex: 'totalPaymentAmount'
            },
            {
                title: '操作',
                dataIndex: 'handle',
                render: (text, record, index)=> {
                    const {companySn, companyName} = record;
                    return <Link to={`/Pages/ESPayDetail?companySn=${companySn}&companyName=${companyName}`}>详情</Link>
                }
            }
        ];
        const {current, pageSize, total, list} = this.state;

        return (
            <div>
                <Table
                    columns={columns}
                    dataSource={list}
                    bordered
                    rowKey={'companySn'}
                    pagination={{
                        total,
                        current,
                        pageSize,
                        onChange: (current, b) => {
                            this.setState({
                                current
                            }, ()=>{
                                this.getList()
                            })
                        },
                        showTotal: (total, range) => `共有${total}条`
                    }}
                    style={{marginTop: 18}}
                />
            </div>
        )
    }

}

export default ESPaymentData