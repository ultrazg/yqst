/**
 * Created by yb on 2019/09/29
 */

import React, {Component} from 'react';
import {Button, Modal, Card, Timeline, Row, Col, message} from 'antd';
import {Link} from "react-router-dom";
import Model from "../../Model";
import moment from 'moment'
import SWTable from 'SWViews/table';
import SwitchStatus from "./SwitchStatus";
import Ellipsis from "../../../../baseview/Ellipsis";
import AssemblySet from "../../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../../baseview/viewContent/ViewContent";
import {EditOutlined, DeleteOutlined, RollbackOutlined} from '@ant-design/icons'

const {confirm} = Modal;


class InvoiceTemplateDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                elementGroupVO: []
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
                    {name: "发票模板列表", link: '/Pages/InvoiceTemplateList'},
                    {name: "发票模板详情"}
                ]}
                topBtn={
                    <div>
                        <Link to={`/Pages/InvoiceTemplateEditor?id=${this.id}`}>
                            <Button type="primary" icon={<EditOutlined/>}>编辑</Button>
                        </Link>
                        <Button type="danger" icon={<DeleteOutlined/>} style={{marginLeft: 15}}
                                onClick={() => {
                                    this.delData();
                                }}
                        >删除</Button>
                        <Link to={'/Pages/InvoiceTemplateList'} style={{marginLeft: 15}}>
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
        Model.InvoiceTGet({templateId: this.id}, (res) => {
            this.setState({data: res.data});
        }, (err) => {
        });
    }

    getLogList() {
        Model.InvoiceBLog({basicId: this.id, invoiceType: 4}, (res) => {
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
                    {key: 'templateId', type: 'Texts', label: '模板ID', span: 12, value: data.templateId},
                    {key: 'templateName', type: 'Texts', label: '模板名称', span: 12, value: data.templateName},
                    {key: 'templateSn', type: 'Texts', label: '模板编码', span: 12, value: data.templateSn},
                    {
                        key: 'status', type: 'Texts', label: '状态', span: 12,
                        value: SwitchStatus.status(data.status)
                    },
                    {
                        key: 'createTime', type: 'Texts', label: '产生时间', span: 12,
                        value: data.createTime ? moment(data.createTime).format('YYYY-MM-DD HH:mm:ss') : ''
                    },
                    {key: 'memo', type: 'Texts', label: '备注', span: 12, value: data.memo},
                ],
                style: {},
            },
            {
                title: '应用的发票分类',
                key: 'FLKey',
                data: [
                    {key: 'classifyId', type: 'Texts', label: '分类ID', span: 12, value: data.classifyId},
                    {key: 'classifySn', type: 'Texts', label: '分类编码', span: 12, value: data.classifySn},
                    {key: 'classifyName', type: 'Texts', label: '分类名称', span: 12, value: data.classifyName},
                ],
                style: {marginTop: 15},
            },
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
                title: '是否显示',
                key: 'isDisplay',
                dataIndex: 'isDisplay',
                render: (res) => {
                    return '1' === '' + res ? '是' : '否'
                }
            },
            {
                title: '是否必填',
                key: 'isRequired',
                dataIndex: 'isRequired',
                render: (res) => {
                    return '1' === '' + res ? '是' : '否'
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
                title="要素组详情"
                style={{marginTop: 15}}
            >
                {
                    this.state.data.elementGroupVO && this.state.data.elementGroupVO.map((item, idx) => {
                        return <Card
                            key={'ele_' + idx}
                            style={{marginTop: idx != 0 ? 15 : 0}}
                            title={
                                <Row>
                                    <Col span={8}>发票要素组ID：{item.groupId}</Col>
                                    <Col span={8}>
                                        发票要素组编码：
                                        <Ellipsis length={20} tooltip={true}>{item.groupSn}</Ellipsis>
                                    </Col>
                                    <Col span={8}>
                                        发票要素组名称：
                                        <Ellipsis length={20} tooltip={true}>{item.groupName}</Ellipsis>
                                    </Col>
                                </Row>
                            }
                        >
                            <SWTable
                                columns={columns}
                                dataSource={item.elementListVO || []}
                                pagination={false}
                            />
                        </Card>
                    })
                }
                {
                    (!this.state.data.elementGroupVO || this.state.data.elementGroupVO.length <= 0) &&
                    <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>
                        暂无数据...
                    </div>
                }
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
            title: '确认删除该模板吗？',
            content: '',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
                Model.InvoiceTDelete({templateId: this.id}, (res) => {
                    message.success('删除成功！');
                    this.props.history.push('/Pages/InvoiceTemplateList');
                }, (err) => {
                });
            },
            onCancel: () => {
                // console.log('Cancel');
            },
        });
    }
}

export default InvoiceTemplateDetail
