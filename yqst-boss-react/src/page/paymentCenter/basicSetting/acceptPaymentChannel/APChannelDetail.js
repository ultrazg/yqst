/**
 * Created by yb on 2019/09/17.
 */

import React, {Component} from 'react';
import {Form, Button, Modal, Card, Timeline,  message} from 'antd';
import {EditOutlined, DeleteOutlined, RollbackOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import Model from "../../Model";
import moment from 'moment'
import SWTable from 'SWViews/table';
import SwitchNames from './SwitchNames';
import AssemblySet from "../../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../../baseview/viewContent/ViewContent";

const { confirm } = Modal;


class APChannelDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            logList: [],
            planList: [],
            total: 0,
            requestPar: {
                current: 1,
                pageSize: 10,
                keyWord: '',
                channelId: '',
                sortType: 2,
            },
        };
        this.id = '';
        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.id = this.props.location.search.substr(1).split("=")[1];
        if (this.id) {
            this.getInfo();
            this.getLogList();
            this.getPlanList();
        }
    }

    // 视图层
    render() {
        return (
            <Form ref={this.formRef}>
                <ViewContent
                    crumb={[
                        {name: '支付中心'},
                        {name: "基础设置"},
                        {name: "收支付渠道列表", link: '/Pages/APChannelList'},
                        {name: "收支付渠道详情"}
                    ]}
                    topBtn = {
                        <div>
                            <Link to={`/Pages/APChannelEdit?id=${this.id}`} style={{marginLeft: 15}}>
                                <Button type="primary" icon={<EditOutlined />}>编辑</Button>
                            </Link>
                            <Button type="danger" icon={<DeleteOutlined />} style={{marginLeft: 15}}
                                    onClick={() => {
                                        this.delData();
                                    }}
                            >删除</Button>
                            <Link to={'/Pages/APChannelList'} style={{marginLeft: 15}}>
                                <Button icon={<RollbackOutlined />}>返回</Button>
                            </Link>
                        </div>
                    }
                >
                    {this.makeBaseView()}
                </ViewContent>
            </Form>
        );
    }

    getInfo() {
        Model.walletPCGet({channelId: this.id}, (res) => {
            this.setState({data: res.data});
        }, (err) => {
        });
    }

    getLogList() {
        Model.walletPSALList({id: this.id, type: 1}, (res) => {
            this.setState({logList: res.data || []});
        }, (err) => {
        });
    }

    getPlanList() {
        Model.walletPPPage({...this.state.requestPar, channelId: this.id}, (res) => {
            this.setState({planList: res.data.records || [], total: this.state.total || 0,});
        }, (err) => {
        });
    }

    makeBaseView() {
        let {data} = this.state;
        let allData = [
            {
                title: '基本信息',
                key: 'JBKey',
                data: [
                    {key: 'channelId', type: 'Texts', label: '收支付渠道ID', span: 12, value: data.channelId},
                    {key: 'createTime', type: 'Texts', label: '创建时间', span: 12,
                        value: data.createTime ? moment(data.createTime).format('YYYY-MM-DD HH:mm:ss') : ''},
                    {key: 'status', type: 'Texts', label: '状态', span: 12,
                        value: <span style={{color: SwitchNames.statusName(data.status, 'color')}}>
                        {SwitchNames.statusName(data.status)}
                    </span>},
                    {key: 'channelSn', type: 'Texts', label: '收支付渠道编码', span: 12, value: data.channelSn},
                    {key: 'channelName', type: 'Texts', label: '收支付渠道名称', span: 12, value: data.channelName},
                    {key: 'desc', type: 'Texts', label: '描述', span: 12, value: data.desc},
                ],
                style: {},
            },
            {
                title: '设置',
                key: 'SZKey',
                data: [
                    {key: 'payType', type: 'Texts', label: '收支付类型', span: 12,
                        value: SwitchNames.payTypeName(data.payType)},
                    {key: 'isVoucher', type: 'Texts', label: '是否需收付款凭证', span: 12,
                        value: SwitchNames.isVoucherName(data.isVoucher)},
                ],
                style: {
                    marginTop: 15
                },
            },
        ];
        const columns = [
            {
                title: '选择',
                key: 'status',
                dataIndex: 'status',
                render: (res) => {
                    if(res == 2){
                        return <span style={{
                            padding: '5px 15px',
                            background: '#3eadd7',
                            borderRadius: '6px',
                            color: '#fff',
                        }}>
                            启用中
                        </span>
                    }
                }
            },
            {
                title: '收支付方案ID',
                key: 'planId',
                dataIndex: 'planId',
            },
            {
                title: '方案编码',
                key: 'planSn',
                dataIndex: 'planSn',
            },
            {
                title: '收支付方案名称',
                key: 'planName',
                dataIndex: 'planName',
            },
            {
                title: '方案描述',
                key: 'planDesc',
                dataIndex: 'planDesc',
                width: 200
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
                        <Link target="_blank" to={`/Pages/APSchemeDetail?id=${res.planId}`}>
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
            }
        ];
        return <div>
            {
                allData.map((item, idx) => {
                    return <Card
                        key={'car_' + idx}
                        type="inner"
                        title={item.title || '信息'}
                        style={item.style ? item.style : {}}
                        bodyStyle={item.bodyStyle ? item.bodyStyle : {}}
                    >
                        <AssemblySet key={item.key} data={item.data} form={this.formRef.current}/>
                    </Card>
                })
            }
            <Card
                type="inner"
                title="关联的收支付方案"
                style={{marginTop: 15}}
            >
                <SWTable
                    columns={columns}
                    dataSource={this.state.planList || []}
                    pagination={
                        {
                            total: this.state.total,
                            current: this.state.requestPar.current,
                            pageSize: this.state.requestPar.pageSize,
                            onChange: (a, b) => {
                                let obj = this.state.requestPar;
                                obj.current = a;
                                this.setState({requestPar: obj}, () => {
                                    this.getPlanList();
                                })
                            },
                            showTotal: (total, range) => `共有${total}条`
                        }
                    }
                />
            </Card>
            <Card
                type="inner"
                title="管理员操作记录"
                style={{marginTop: 15}}
                bodyStyle={{paddingRight: 0}}
            >
                <Timeline
                    style={{
                        maxHeight: 300,
                        overflow: 'auto',
                        paddingTop: 15
                    }}
                >
                    {
                        this.state.logList.map((item, idx) => {
                            return <Timeline.Item key={'log_' + idx}>
                                <div>
                                    <h3>{item.title}</h3>
                                    <div>操作时间：{item.createTime ? moment(item.createTime).format('YYYY-MM-DD HH:mm:ss') : ''}</div>
                                    <div>
                                        <span>管理员ID：{item.adminId}</span>
                                        <span style={{marginLeft: 25}}>管理员名称：{item.adminName}</span>
                                    </div>
                                </div>
                            </Timeline.Item>
                        })
                    }
                    {
                        this.state.logList && this.state.logList.length <= 0 && <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>
                            暂无记录...
                        </div>
                    }
                </Timeline>
            </Card>
        </div>
    }

    delData(){
        confirm({
            title: '',
            content: <div style={{fontSize: 18}}>
                是否确认删除？
            </div>,
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
                Model.walletPCDelete({channelId: this.id}, (res) => {
                    message.success('删除成功！');
                    this.props.history.push('/Pages/APChannelList');
                }, (err) => {});
            },
            onCancel: () => {
                console.log('Cancel');
            },
        });
    }
}

export default APChannelDetail
