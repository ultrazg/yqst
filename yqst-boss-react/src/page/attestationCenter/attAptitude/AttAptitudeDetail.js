/**
 * Created by yb on 2019/10/23.
 */

import React, {Component} from 'react';
import {Form, Button, Card, Timeline, message, Modal, Table} from 'antd';
import {EditOutlined, DeleteOutlined, RollbackOutlined,} from '@ant-design/icons';
import {Link} from "react-router-dom";
import Model from "../Model";
import moment from 'moment'
import SwitchName from './SwitchName';
import AssemblySet from "../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../baseview/viewContent/ViewContent";


const {confirm} = Modal;

class AttAptitudeDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
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
                        {name: "资质管理列表", link: '/Pages/AttAptitudeList'},
                        {name: "资质管理详情"},
                    ]}
                    topBtn={
                        <div>
                            <Link to={`/Pages/AttAptitudeEditor?id=${this.id}`} style={{marginLeft: 15}}>
                                <Button type="primary" icon={<EditOutlined/>}>编辑</Button>
                            </Link>
                            <Button type="danger" icon={<DeleteOutlined/>} style={{marginLeft: 15}}
                                    onClick={() => {
                                        this.delBtn();
                                    }}
                            >删除</Button>
                            <Link to={'/Pages/AttAptitudeList'} style={{marginLeft: 15}}>
                                <Button icon={<RollbackOutlined/>}>返回</Button>
                            </Link>
                        </div>
                    }
                >
                    {this.makeBaseView()}
                    {this.makeYHView()}

                </ViewContent>
            </Form>
        );
    }

    getInfo() {
        Model.UserAttDocGet({id: this.id}, (res) => {
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
                    {key: 'id', type: 'Texts', label: '资质ID', span: 12, value: data.id},
                    {
                        key: 'createTime', type: 'Texts', label: '创建时间', span: 12,
                        value: data.createTime ? moment(data.createTime).format('YYYY-MM-DD HH:mm:ss') : ''
                    },
                    {key: 'docCode', type: 'Texts', label: '资质编码', span: 12, value: data.docCode},
                    {key: 'docName', type: 'Texts', label: '资质名称', span: 12, value: data.docName},
                    {key: 'docMemo', type: 'Texts', label: '资质描述', span: 12, value: data.docMemo},
                ]
            },
            {
                key: 'LXView',
                title: '资质类型设置',
                style: {marginTop: 15},
                data: [
                    {
                        key: 'docType', type: 'Texts', label: '资质类型', span: 12,
                        value: SwitchName.docType(data.docType)
                    },
                    '6' === '' + data.docType ? {
                        key: 'fileFormat', type: 'Texts', label: '附件格式', span: 12,
                        value: data.fileFormat
                    } : {},
                    {},
                    '7' === '' + data.docType ? {
                        key: 'fileFormat',
                        type: 'Custom',
                        label: '可选项列表',
                        span: 24,
                        value: data.optionVOList,
                        view: (() => {
                            return (
                                <Table
                                    bordered={true}
                                    rowKey={'optionId'}
                                    columns={[{
                                        title: '序号',
                                        dataIndex: 'optionId',
                                        render: (text, record, index) => data.optionVOList.length - index
                                    }, {
                                        title: '可选项名称',
                                        dataIndex: 'optionName'
                                    }]}
                                    dataSource={(data && data.optionVOList) || []}
                                    pagination={false}
                                />
                            )
                        })(),
                        formItemLayout: {
                            labelCol: {
                                sm: {span: 3},
                            },
                            wrapperCol: {
                                sm: {span: 21},
                            },
                        }
                    } : {},
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

    makeYHView() {
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
                    this.state.logList && this.state.logList.length <= 0 &&
                    <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>
                        暂无记录...
                    </div>
                }
            </Timeline>
        </Card>
    }

    delBtn() {
        confirm({
            title: '确认要删除该资质吗？',
            content: '',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
                Model.UserAttDocDel({docId: this.id}, (res) => {
                    message.success('删除成功！');
                    this.props.history.push('/Pages/AttAptitudeList');
                }, (err) => {
                });
            },
            onCancel() {
                // console.log('Cancel');
            },
        });
    }
}

export default AttAptitudeDetail
