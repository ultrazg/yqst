import React, {Component} from 'react';
import TabsViewContent from "../../../baseview/tabsViewContent/TabsViewContent";
import {Button, Card, Form, message, Switch, Table} from "antd";
import {RollbackOutlined, CheckOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import Model from "../Model";


class PAChannelDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            channelName: '',
            channelDescribe: '',
            channelStatus: 0, //是否启用 1是；0否,
        };
        this.sn = '';
    }

    componentDidMount() {
        this.sn = this.props.location.search.substr(1).split('=')[1];
        Model.GetChannelInfo({sn: this.sn}, res=>{
            const {channelName, channelDescribe, channelStatus} = res.data
            this.setState({
                channelName,
                channelDescribe,
                channelStatus
            })
        })
    }

    render() {
        let {channelStatus, channelName, channelDescribe} = this.state;
        if(typeof channelStatus === 'number'){
            channelStatus = Boolean(channelStatus);
        }

        return (
            <TabsViewContent
                crumb={[{name: '收支付助手'}, {name: '渠道列表', link: '/Pages/PAChannelList'}, {name: '渠道详情'}]}
                topBtn={
                    <Link to={'/Pages/PAChannelList'} style={{marginLeft: 15}}>
                        <Button icon={<RollbackOutlined />}>返回</Button>
                    </Link>
                }
            >
                <Card title={channelName} headStyle={{background: '#f9f9f9'}}>
                    <p>通道描述：{channelDescribe}</p>
                    <div style={{marginTop: 15}}>
                        <span style={{verticalAlign: 'center'}}>通道启用：</span>
                        <Switch
                            checkedChildren="ON"
                            unCheckedChildren="OFF"
                            checked={channelStatus}
                            onChange={()=>{
                                this.setState({
                                    channelStatus: !channelStatus
                                })
                            }}
                        />
                    </div>
                </Card>

                <h3 style={{marginLeft: 10, marginTop: 25, fontWeight: 'bold'}}>已对接接口</h3>
                {this.makeTableView()}
                {this.makeButtonView()}
            </TabsViewContent>
        )
    }

    makeTableView = ()=>{

        const columns = [
            {
                title: '接口名称',
                dataIndex: '',
            },
            {
                title: '接口地址',
                dataIndex: '',
            },
            {
                title: '接口类型',
                dataIndex: '',
            },
            {
                title: '创建时间',
                dataIndex: ''
            },
            {
                title: '备注',
                dataIndex: ''
            }
        ];

        return (
            <Table
                columns={columns}
                dataSource={this.state.list}
                bordered
                style={{marginTop: 18}}
            />

        )
    };

    makeButtonView = ()=>{
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 180}}>
                <Button icon={<CheckOutlined />} type='primary' style={{width: 138, height: 38}} onClick={this.saveChannelStatus}>确认保存</Button>
            </div>
        )
    }

    saveChannelStatus = ()=>{
        let channelStatus = Number(this.state.channelStatus);
        if(channelStatus){
            Model.EnableChannel({sn: this.sn}, res=>{
                message.success('修改成功！');
                this.props.history.replace('/Pages/PAChannelList');
            })
        }else {
            Model.ForbiddenChannel({sn: this.sn}, res=>{
                message.success('修改成功！');
                this.props.history.replace('/Pages/PAChannelList');
            })
        }
    }

}

export default PAChannelDetail;