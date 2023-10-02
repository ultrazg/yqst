/**
 * Created by yb on 2019/09/29
 */

import React, {Component} from 'react';
import {Button, Modal, Card, Timeline, message} from 'antd';
import {Link} from "react-router-dom";
import Model from "../../Model";
import moment from 'moment'
import AssemblySet from "../../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../../baseview/viewContent/ViewContent";
import {EditOutlined, DeleteOutlined, RollbackOutlined} from '@ant-design/icons'

const {confirm} = Modal;


class InvoiceClassifyDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
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
                    {name: "发票分类列表", link: '/Pages/InvoiceClassifyList'},
                    {name: "发票分类详情"}
                ]}
                topBtn={
                    <div>
                        <Link to={`/Pages/InvoiceClassifyEditor?id=${this.id}`}>
                            <Button type="primary" icon={<EditOutlined/>}>编辑</Button>
                        </Link>
                        <Button type="danger" icon={<DeleteOutlined/>} style={{marginLeft: 15}}
                                onClick={() => {
                                    this.delData();
                                }}
                        >删除</Button>
                        <Link to={'/Pages/InvoiceClassifyList'} style={{marginLeft: 15}}>
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
        Model.InvoiceCGet({classifyId: this.id}, (res) => {
            this.setState({data: res.data});
        }, (err) => {
        });
    }

    getLogList() {
        Model.InvoiceBLog({basicId: this.id, invoiceType: 1}, (res) => {
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
                    {key: 'classifyId', type: 'Texts', label: '发票分类ID', span: 12, value: data.classifyId},
                    {key: 'classifySn', type: 'Texts', label: '发票分类编码', span: 12, value: data.classifySn},
                    {
                        key: 'createTime', type: 'Texts', label: '产生时间', span: 12,
                        value: data.createTime ? moment(data.createTime).format('YYYY-MM-DD HH:mm:ss') : ''
                    },
                    {key: 'classifyName', type: 'Texts', label: '发票分类名称', span: 12, value: data.classifyName},
                    {key: 'desc', type: 'Texts', label: '描述说明', span: 12, value: data.desc},
                ],
                style: {},
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
                        (!this.state.logList || this.state.logList.length <= 0) &&
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
            title: '确认删除该分类吗？',
            content: '',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
                Model.InvoiceCDelete({classifyId: this.id}, (res) => {
                    message.success('删除成功！');
                    this.props.history.push('/Pages/InvoiceClassifyList');
                }, (err) => {
                });
            },
            onCancel: () => {
                // console.log('Cancel');
            },
        });
    }
}

export default InvoiceClassifyDetail
