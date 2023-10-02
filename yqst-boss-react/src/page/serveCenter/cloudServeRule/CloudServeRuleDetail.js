/**
 * Created by yb on 2019/11/11.
 */

import React, {Component} from 'react';
import {Form, Button, Modal, Card, message} from 'antd';
import {EditOutlined, DeleteOutlined, RollbackOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import Model from "../Model";
import moment from 'moment'
import SWTable from 'SWViews/table';
import AssemblySet from "../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../baseview/viewContent/ViewContent";

const { confirm } = Modal;


class CloudServeRuleDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
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
            <ViewContent
                crumb={[
                    {name: '云服务中心'},
                    {name: "云服务及规则管理"},
                    {name: "云服务规则列表", link: '/Pages/CloudServeRuleList'},
                    {name: "云服务规则详情"},
                ]}
                topBtn = {
                    <div>
                        <Link to={`/Pages/CloudServeRuleEdit?id=${this.id}`}>
                            <Button type="primary" icon={<EditOutlined />}>编辑</Button>
                        </Link>
                        <Button type="danger" icon={<DeleteOutlined />} style={{marginLeft: 15}} onClick={() => {
                            this.onDel();
                        }}>删除</Button>
                        <Link to={'/Pages/CloudServeRuleList'} style={{marginLeft: 15}}>
                            <Button icon={<RollbackOutlined />}>返回</Button>
                        </Link>
                    </div>
                }
            >
                {this.makeBaseView()}
            </ViewContent>
        );
    }

    getInfo() {
        Model.CServeSGGet({id: this.id}, (res) => {
            this.setState({data: res.data});
        }, (err) => {
        });
    }

    makeBaseView() {
        let {data} = this.state;
        const carData = [
            {
                key: 'jbKey',
                title: '基本信息',
                data: [
                    {key: 'id', type: 'Texts', label: '规则ID', span: 12, value: data.id},
                    {key: 'ruleSn', label: '规则编码', span: 12, value: data.ruleSn, type: 'Texts'},
                    {key: 'createTime', type: 'Texts', label: '创建时间', span: 12,
                        value: data.createTime ? moment(data.createTime).format('YYYY-MM-DD HH:mm:ss') : ''},
                    {key: 'name', label: '规则名称', span: 12, value: data.name, type: 'Texts'},
                    {key: 'brief', label: '规则描述', span: 12, value: data.brief, type: 'Texts'},
                ],
                style: {marginTop: 0},
            },
            {
                key: 'gzKey',
                title: '规则设置',
                data: [
                    {key: 'softId', type: 'Texts', label: '云服务ID', span: 12, value: data.softId},
                    {key: 'softName', label: '云服务名称', span: 12, value: data.softName, type: 'Texts'},
                    {key: 'goodsParentName', type: 'Texts', label: '规则SPU', span: 12, value: data.goodsParentName},
                    {key: 'skuName', type: 'Texts', label: '规则SKU', span: 12, value: data.skuName},
                    // {key: 'b4', type: 'Texts', label: '配置参数', span: 12, value: ''},
                ],
                style: {marginTop: 15},
            },
        ];
        const columns = [
            {
                title: '选中项',
                key: '',
                dataIndex: '',
                render: (res) => {
                    return '1' === '' + res.isSelect ? '是' : ''
                }
            },
            {
                title: '参数ID',
                key: 'parId',
                dataIndex: 'parId',
            },
            {
                title: '参数编码',
                key: 'parSn',
                dataIndex: 'parSn',
            },
            {
                title: '参数',
                key: '',
                dataIndex: '',
                render: (res) => {
                    const vals = res.parValueList && res.parValueList.map(item => {
                        return item.parValue + item.typeValue
                    });
                    return vals.join(',');
                }
            },
        ];

        return (
            <Form ref={this.formRef}>
                {
                    carData.map((item, idx) => {
                        return <Card
                            type="inner"
                            key={item.key}
                            title={item.title}
                            style={item.style ? item.style : ''}
                        >
                            <AssemblySet key={item.key} data={item.data} form={this.formRef.current}/>
                        </Card>
                    })
                }
                <Card
                    type="inner"
                    title='配置参数'
                    style={{marginTop: 15}}
                >
                    <SWTable
                        columns={columns}
                        dataSource={data.softFreeParDTOS || []}
                        pagination={false}
                    />
                </Card>

            </Form>
        )
    }

    onDel(){
        return confirm({
            title: '确定要删除该条数据吗?',
            content: '',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
                Model.CServeSGDelete({id: this.id}, (res) => {
                    message.success('删除成功！');
                    this.props.history.push('/Pages/CloudServeRuleList');
                }, (err) => {
                });
            },
            onCancel: () => {
                console.log('Cancel');
            },
        });
    }
}

export default CloudServeRuleDetail
