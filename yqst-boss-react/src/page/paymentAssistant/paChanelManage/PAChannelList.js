import React, {Component} from 'react';
import TabsViewContent from "../../../baseview/tabsViewContent/TabsViewContent";
import {Link} from "react-router-dom";
import {Button, Form, message, Modal, Table} from "antd";
import HeadSearch from "../../../baseview/headSearch/HeadSearch";
import Model from "../Model";


class PAChannelList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keyWord: '',
            current: 1,
            pageSize: 10,
            total: 0,
            list: [],
            channelStatus: null, // 是否启用 1是；0否 null 所有状态
            channelOption: [{value: 1, name: '---不限---'}]
        };
    }

    getList = ()=>{
        const {current, pageSize, keyWord, channelStatus, channelOption} = this.state;
        Model.GetChannelPageList({
            current,
            pageSize,
            keyWord,
            channelStatus,
            sortType: 1,
            startTime: '',
            endTime: ''
        }, res=>{
            this.setState({
                total: res.data.total,
                list: res.data.records
            })
        })
    }

    componentDidMount() {
        this.getList();
    }

    render() {
        return (
            <TabsViewContent crumb={[{name: '收支付助手'}, {name: '渠道管理'}]}>
                {this.makeHeadSearch()}
                {this.makeTableView()}
            </TabsViewContent>
        )
    }


    makeHeadSearch = () => {
        const searchDatas = [
            {key: 'keyWord', type: 'Input', value: '', placeholder: '请输入', label: '编号/名称', maxLength: 30},
            {
                key: 'channelStatus', type: 'Select', value: '1', placeholder: '状态', label: '状态',
                list: [
                    {value: null, name: '---不限---'},
                    {value: 1, name: '正常'},
                    {value: 0, name: '关闭'},
                ],
            },

        ];
        return (
            <HeadSearch data={searchDatas} callBack={({keyWord, channelStatus}) => {
                this.setState({
                    keyWord,
                    channelStatus,
                    current: 1
                }, ()=>{
                    this.getList()
                })
            }}/>
        )
    };



    makeTableView = ()=>{
        const {current, pageSize, total, list} = this.state;
        const columns = [
            {
                title: '通道编号',
                dataIndex: 'sn',
            },
            {
                title: '通道名称',
                dataIndex: 'channelName',
            },
            {
                title: '通道状态',
                dataIndex: 'channelStatus',
                render: (channelStatus)=>{
                    if(channelStatus){
                        return '正常';
                    }else {
                        return '关闭';
                    }
                }
            },
            {
                title: '操作',
                dataIndex: 'handle',
                render: (text, record, index)=> {
                    let {channelStatus, sn, channelName} = record
                    return (
                        <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
                            <Link to={`/Pages/PAChannelDetail?sn=${sn}`}>查看</Link>
                            {
                                channelStatus ?
                                    <a style={{color: '#fd505a'}} onClick={()=>{

                                        Modal.confirm({
                                            content: `是否关闭${channelName}通道，关闭会导致${channelName}充值、转账、提现等业务无法使用！`,
                                            onOk: ()=> {
                                                Model.ForbiddenChannel({sn}, res=>{
                                                    message.success('通道关闭成功！');
                                                    this.getList();
                                                }, err=>{
                                                    message.error('通道关闭失败！')
                                                })

                                            },
                                            onCancel() {},
                                        })

                                    }}>关闭</a>
                                     :
                                    <a onClick={()=>{
                                        Modal.confirm({
                                            content: `是否开启${channelName}通道！`,
                                            onOk: ()=> {
                                                Model.EnableChannel({sn}, res=>{
                                                    message.success('通道开启成功！');
                                                    this.getList();
                                                }, err=>{
                                                    message.error('通道开启失败！');
                                                })

                                            },
                                            onCancel() {},
                                        })
                                    }}>开启</a>

                            }


                        </div>
                    )
                }
            }
        ];

        return (
            <Table
                columns={columns}
                dataSource={list}
                bordered
                rowKey={'sn'}
                style={{marginTop: 18}}
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

        )
    }

}

export default PAChannelList;
