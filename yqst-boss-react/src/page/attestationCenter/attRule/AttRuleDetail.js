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


class AttRuleDetail extends Component {
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
                        {name: "认证规则管理列表", link: '/Pages/AttRuleList'},
                        {name: "认证规则详情"},
                    ]}
                    topBtn = {
                        <div>
                            <Link to={`/Pages/AttRuleEditor?id=${this.id}`}>
                                <Button type="primary" icon={<EditOutlined />}>编辑</Button>
                            </Link>
                            {
                                '2' !== '' + this.state.data.status && <Button type="danger" icon={<DeleteOutlined />} style={{marginLeft: 15}}
                                                                               onClick={() => {
                                                                                   this.delBtn();
                                                                               }}
                                >删除</Button>
                            }
                            <Link to={'/Pages/AttRuleList'} style={{marginLeft: 15}}>
                                <Button icon={<RollbackOutlined />}>返回</Button>
                            </Link>
                        </div>
                    }
                >
                    {this.makeBaseView()}
                    {this.makeZZLBView()}
                    {this.makeYHView()}
                </ViewContent>
            </Form>
        );
    }

    getInfo() {
        Model.UserAttDRGet({ruleId: this.id}, (res) => {
            this.setState({data: res.data});
        }, (err) => {
        });
    }

    makeBaseView() {
        let {data} = this.state;
        const viewList = [
            {
                key: 'JBKey',
                title: '基本信息',
                style: {},
                data: [
                    {key: 'ruleId', type: 'Texts', label: '规则ID', span: 12, value: data.ruleId},
                    {key: 'status', type: 'Texts', label: '状态', span: 12,
                        value: SwitchName.status(data.status)},
                    {key: 'createTime', type: 'Texts', label: '创建时间', span: 12,
                        value: data.createTime ? moment(data.createTime).format('YYYY-MM-DD HH:mm:ss') : ''},
                    {key: 'ruleCode', type: 'Texts', label: '规则编码', span: 12, value: data.ruleCode},
                    {key: 'ruleName', type: 'Texts', label: '规则名称', span: 12, value: data.ruleName},
                    {key: 'ruleMemo', type: 'Texts', label: '规则描述', span: 12, value: data.ruleMemo},
                ]
            },
            {
                key: 'YYKey',
                title: '应用的认证组',
                style: {marginTop: 15},
                data: [
                    {key: 'parentId', type: 'Texts', label: '认证组ID', span: 12, value: data.parentId},
                    {key: 'parentName', type: 'Texts', label: '认证组名称', span: 12, value: data.parentName},
                ]
            },
            {
                key: 'TJKey',
                title: '限制条件设置',
                style: {marginTop: 15},
                data: [
                    {key: 'isPre', type: 'Texts', label: '前置条件', span: 12,
                        value: SwitchName.isPre(data.isPre)},
                    {key: 'preId', type: 'Texts', label: '认证组ID', span: 12, value: data.preId},
                    {key: 'preName', type: 'Texts', label: '认证组名称', span: 12, value: data.preName},
                    {key: 'isApprove', type: 'Texts', label: '是否多次认证', span: 12,
                        value: SwitchName.isApprove(data.isApprove)},
                ]
            },
        ];
        return viewList.map((item, idx) => {
            return <Card
                key={'vCar_' + idx}
                type="inner"
                title={item.title}
                style={item.style ? item.style : ''}
            >
                <AssemblySet key={item.key} data={item.data} form={this.formRef.current}/>
            </Card>
        })
    }

    makeZZLBView(){
        const {data} = this.state;
        const columns = [
            {
                title: '资质ID',
                key: 'docId',
                dataIndex: 'docId',
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
                title: '限制数量',
                key: 'docParam',
                dataIndex: 'docParam',
                render: (res) => {
                    return '0' === '' + res ? '0' : res ? res : '无';
                }
            },
            {
                title: '是否显示',
                key: 'isDisplay',
                dataIndex: 'isDisplay',
                render: (res) => {
                    return SwitchName.isDisplay(res);
                }
            },
            {
                title: '是否必填',
                key: 'isRequired',
                dataIndex: 'isRequired',
                render: (res) => {
                    return SwitchName.isRequired(res);
                }
            },
            {
                title: '是否自动填写',
                key: 'isAutoWrite',
                dataIndex: 'isAutoWrite',
                render: (res) => {
                    return SwitchName.isAutoWrite(res);
                }
            },
            {
                title: '自动填写依据',
                key: 'autoDocId',
                dataIndex: 'autoDocId',
                render: (res) => {
                    return res ? res : '无';
                }
            },
            {
                title: '接口认证',
                key: 'isVerify',
                dataIndex: 'isVerify',
                render: (res) => {
                    return SwitchName.isVerify(res);
                }
            }
        ];

        return <Card
            type="inner"
            title="关联的资质"
            style={{marginTop: 15}}
        >
            {
                data.getDocGroupVOList && data.getDocGroupVOList.map((item, idx) => {
                    return <Card
                        key={'dCar_' + idx}
                        type="inner"
                        style={{marginTop: 0 == idx ? 0 : 15}}
                        title={
                            <Row>
                                <Col span={8}>资质组ID：{item.docGroupId}</Col>
                                <Col span={8}>资质组名称：{item.docGroupName}</Col>
                                <Col span={8}>接口认证：{SwitchName.isVerify(item.isVerify)}</Col>
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
            title: '确认要删除该规则吗？',
            content: '',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
                Model.UserAttDRDel({ruleId: this.id}, (res) => {
                    message.success('删除成功！');
                    this.props.history.push('/Pages/AttRuleList');
                }, (err) => {
                });
            },
            onCancel() {
                // console.log('Cancel');
            },
        });
    }
}

export default AttRuleDetail
