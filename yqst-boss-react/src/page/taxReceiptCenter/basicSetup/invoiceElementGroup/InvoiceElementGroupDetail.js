/**
 * Created by yb on 2019/09/29
 */

import React, {Component} from 'react';
import {Button, Modal, Card, Timeline, message} from 'antd';
import {Link} from "react-router-dom";
import Model from "../../Model";
import moment from 'moment'
import SWTable from 'SWViews/table';
import AssemblySet from "../../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../../baseview/viewContent/ViewContent";
import {RollbackOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';

const {confirm} = Modal;


class InvoiceElementGroupDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                elementListVO: []
            },
            logList: []
        };
        this.id = '';
    }

    componentDidMount() {
        this.id = this.props.location.search.substr(1).split("=")[1];
        if (this.id) {
            this.getInfo();
            this.getLogList();
        }
    }

    // 视图层
    render() {
        return (
            <ViewContent
                crumb={[
                    {name: '税票中心'},
                    {name: "基本设置"},
                    {name: "发票要素组列表", link: '/Pages/InvoiceElementGroupList'},
                    {name: "发票要素组详情"}
                ]}
                topBtn={
                    <div>
                        <Link to={`/Pages/InvoiceElementGroupEditor?id=${this.id}`}>
                            <Button type="primary" icon={<EditOutlined/>}>编辑</Button>
                        </Link>
                        <Button type="danger" icon={<DeleteOutlined/>} style={{marginLeft: 15}}
                                onClick={() => {
                                    this.delData();
                                }}
                        >删除</Button>
                        <Link to={'/Pages/InvoiceElementGroupList'} style={{marginLeft: 15}}>
                            <Button icon={<RollbackOutlined/>}>返回</Button>
                        </Link>
                    </div>
                }
            >
                {this.makeBaseView()}
            </ViewContent>
        );
    }

    getInfo() {
        Model.InvoiceEGGet({groupId: this.id}, (res) => {
            this.setState({data: res.data});
        }, (err) => {
        });
    }

    getLogList() {
        Model.InvoiceBLog({basicId: this.id, invoiceType: 3}, (res) => {
            this.setState({logList: res.data || []});
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
                    {key: 'groupId', type: 'Texts', label: '要素组ID', span: 12, value: data.groupId},
                    {key: 'groupSn', type: 'Texts', label: '要素组编码', span: 12, value: data.groupSn},
                    {
                        key: 'createTime', type: 'Texts', label: '产生时间', span: 12,
                        value: data.createTime ? moment(data.createTime).format('YYYY-MM-DD HH:mm:ss') : ''
                    },
                    {key: 'groupName', type: 'Texts', label: '要素组名称', span: 12, value: data.groupName},
                    {key: 'memo', type: 'Texts', label: '备注', span: 12, value: data.memo},
                ],
                style: {},
            }
        ];
        const columns = [
            {
                title: '要素ID',
                key: 'elementId',
                dataIndex: 'elementId',
            },
            {
                title: '要素编码',
                key: 'elementSn',
                dataIndex: 'elementSn',
            },
            {
                title: '要素名称',
                key: 'elementName',
                dataIndex: 'elementName',
            },
            {
                title: '产生时间',
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
                        <AssemblySet key={item.key} data={item.data} form={this.props.form}/>
                    </Card>
                })
            }
            <Card
                type="inner"
                title="要素详情"
                style={{marginTop: 15}}
            >
                <SWTable
                    columns={columns}
                    dataSource={data.elementListVO || []}
                    pagination={false}
                />
            </Card>
            <Card
                type="inner"
                title="操作记录"
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
                                <h3>{item.title}</h3>
                                <div>操作时间：{item.createTime ? moment(item.createTime).format('YYYY-MM-DD HH:mm:ss') : ''}</div>
                                <div>
                                    <span>管理员ID：{item.adminId}</span>
                                    <span style={{marginLeft: 25}}>管理员名称：{item.adminName}</span>
                                </div>
                            </Timeline.Item>
                        })
                    }
                    {
                        this.state.logList && this.state.logList.length <= 0 &&
                        <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>
                            暂无记录...
                        </div>
                    }
                </Timeline>
            </Card>
        </div>
    }

    delData() {
        confirm({
            title: '确认删除该要素组吗？',
            content: '',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
                Model.InvoiceEGDelete({groupId: this.id}, (res) => {
                    message.success('删除成功！');
                    this.props.history.push('/Pages/InvoiceElementGroupList');
                }, (err) => {
                });
            },
            onCancel: () => {
                // console.log('Cancel');
            },
        });
    }
}

export default InvoiceElementGroupDetail
