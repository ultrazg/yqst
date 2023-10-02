/**
 * Created by yb on 2019/10/23.
 */

import React, {Component} from 'react';
import {Form, Button, Card, Row, Col, Timeline, message, Modal} from 'antd';
import {EditOutlined, DeleteOutlined, RollbackOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import Model from "../Model";
import moment from 'moment'
import SWTable from 'SWViews/table';
import SwitchName from "./SwitchName";
import AssemblySet from "../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../baseview/viewContent/ViewContent";

const { confirm } = Modal;


class AttGroupDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                getDocGroupVOList: []
            },
            logList: [],
        };
        this.id = '';
        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.id = this.props.location.search.substr(1).split("=")[1];
        if (this.id) {
            this.getInfo();
        }
    }

    // 视图层
    render() {
        return (
            <Form ref={this.formRef}>
                <ViewContent
                    crumb={[
                        {name: "认证中心"},
                        {name: "认证内容管理"},
                        {name: "认证组管理列表", link: '/Pages/AttGroupList'},
                        {name: "认证组管理详情"},
                    ]}
                    topBtn = {
                        <div>
                            <Link to={`/Pages/AttGroupEditor?id=${this.id}`}>
                                <Button type="primary" icon={<EditOutlined />}>编辑</Button>
                            </Link>
                            <Button type="danger" icon={<DeleteOutlined />} style={{marginLeft: 15}}
                                    onClick={() => {
                                        this.delBtn();
                                    }}
                            >删除</Button>
                            <Link to={'/Pages/AttGroupList'} style={{marginLeft: 15}}>
                                <Button icon={<RollbackOutlined />}>返回</Button>
                            </Link>
                        </div>
                    }
                >
                    {this.makeBaseView()}
                    {this.makeGLView()}
                    {this.makeYHView()}
                </ViewContent>
            </Form>
        );
    }

    getInfo() {
        Model.UserAttDocPGet({docParentId: this.id}, (res) => {
            this.setState({data: res.data});
        }, (err) => {
        });
    }

    makeBaseView() {
        let {data} = this.state;
        const viewList = [
            {
                key: 'JBView',
                title: '基本信息',
                style: {},
                data: [
                    {key: 'docParentId', type: 'Texts', label: '认证组ID', span: 12, value: data.docParentId},
                    {key: 'createTime', type: 'Texts', label: '创建时间', span: 12,
                        value: data.createTime ? moment(data.createTime).format('YYYY-MM-DD HH:mm:ss') : ''},
                    {key: 'parentCode', type: 'Texts', label: '认证组编码', span: 12, value: data.parentCode},
                    {key: 'name', type: 'Texts', label: '认证组名称', span: 12, value: data.name},
                    {key: 'memo', type: 'Texts', label: '认证组描述', span: 12, value: data.memo},
                ]
            },
            {
                key: 'LXView',
                title: '认证组类型设置',
                style: {marginTop: 15},
                data: [
                    {key: 'type', type: 'Texts', label: '认证组类型', span: 12,
                        value: SwitchName.type(data.type)},
                    '3' === '' + data.type || '4' === '' + data.type ? {key: 'softId', type: 'Texts', label: '关联云服务ID', span: 12, value: data.softId} : {},
                    '3' === '' + data.type || '4' === '' + data.type ? {key: 'softName', type: 'Texts', label: '关联云服务名称', span: 12, value: data.softName} : {},
                ]
            },
        ];
        return viewList.map((item, idx) => {
            return <Card
                key={'car_' + idx}
                type="inner"
                title={item.title}
                style={item.style ? item.style : ''}
            >
                <AssemblySet key={item.key} data={item.data} form={this.formRef.current}/>
            </Card>
        })
    }

    makeGLView(){
        const {data} = this.state;
        const columns = [
            {
                title: '资质ID',
                key: 'docId',
                dataIndex: 'docId',
            },
            {
                title: '资质编码',
                key: 'docSn',
                dataIndex: 'docSn',
            },
            {
                title: '资质名称',
                key: 'docName',
                dataIndex: 'docName',
            },
            {
                title: '资质类型',
                key: 'docType',
                dataIndex: 'docType',
                render: (res) => {
                    return SwitchName.docType(res);
                }
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
        ];

        return <Card
            type="inner"
            title="资质组列表"
            style={{marginTop: 15}}
        >
            {
                data.getDocGroupVOList && data.getDocGroupVOList.map((item, idx) => {
                    return <Card
                        key={'car_' + idx}
                        type="inner"
                        style={{marginTop: 0 == idx ? 0 : 15}}
                        title={
                            <Row>
                                <Col span={12}>资质组ID：{item.docGroupId}</Col>
                                <Col span={12}>资质组名称：{item.docGroupName}</Col>
                            </Row>
                        }
                    >
                        <SWTable
                            columns={columns}
                            dataSource={item.getDocVOList || []}
                            pagination={false}
                        />
                    </Card>
                })
            }
            {
                (!data.getDocGroupVOList || data.getDocGroupVOList.length <= 0) && <div style={{
                    textAlign: 'center',
                    color: '#ccc',
                    fontSize: 20
                }}>
                    暂无数据......
                </div>
            }
        </Card>
    }

    makeYHView(){
        return <Card
            type="inner"
            title="管理员操作记录"
            style={{marginTop: 15}}
        >
            <Timeline style={{
                padding: 15
            }}>
                {
                    this.state.logList.map((item, idx) => {
                        return <Timeline.Item key={'log_' + idx}>
                            <h3>{item.title}</h3>
                            <span>操作时间：{item.createTime ? moment(item.createTime).format('YYYY-MM-DD') : ''}</span>
                            <div>
                                <span>管理员ID：{item.createByName}</span>
                                <span style={{marginLeft: 25}}>管理员名称：123</span>
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
    }

    delBtn(){
        confirm({
            title: '确认要删除该认证组吗？',
            content: '',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
                Model.UserAttDocPDel({docParentId: this.id}, (res) => {
                    message.success('删除成功！');
                    this.props.history.push('/Pages/AttGroupList');
                }, (err) => {
                });
            },
            onCancel() {
                // console.log('Cancel');
            },
        });
    }
}

export default AttGroupDetail
