/**
 * Created by yb on 2019/09/25
 */

import React, {Component} from 'react';
import {Form, Button, Card, Timeline} from 'antd';
import {EditOutlined, RollbackOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import Model from "../../Model";
import SWTable from 'SWViews/table';
import AssemblySet from "../../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../../baseview/viewContent/ViewContent";


class ContractTemplateDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            logList: [],
            adminLogList: []
        };
        this.id = '';
        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.id = this.props.location.search.substr(1).split("=")[1];
        if (this.id) {
            // this.getInfo();
        }
    }

    // 视图层
    render() {
        return (
            <Form ref={this.formRef}>
                <ViewContent
                    crumb={[
                        {name: '合同中心'},
                        {name: "模板管理"},
                        {name: "合同模板列表", link: '/Pages/ContractTemplateList'},
                        {name: "合同模板详情"}
                    ]}
                    topBtn = {
                        <div>
                            <Button type="primary" icon={<EditOutlined />}>编辑</Button>
                            <Link to={'/Pages/ContractManageList'} style={{marginLeft: 15}}>
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
        Model.walletPAAGet({applyId: this.id}, (res) => {
            this.setState({data: res.data});
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
                    {key: 'qw1', type: 'Texts', label: '合同模版ID', span: 12, value: ''},
                    {key: 'qw2', type: 'Texts', label: '合同模版类型', span: 12, value: ''},
                    {key: 'qw3', type: 'Texts', label: '合同模版名称', span: 12, value: ''},
                    {key: 'qw4', type: 'Texts', label: '合同模版状态', span: 12, value: ''},
                    {key: 'qw5', type: 'Texts', label: '是否为默认模版', span: 12, value: ''},
                    {key: 'qw6', type: 'Texts', label: '创建时间', span: 12, value: ''},
                    {key: 'qw7', type: 'Texts', label: '创建人', span: 12, value: ''},
                ],
                style: {},
            },
            {
                title: '模版内容',
                key: 'NRKey',
                data: [
                    {key: 'qw8', type: 'Texts', label: '模版内容', span: 12, value: ''},
                ],
                style: {marginTop: 15},
            },
        ];
        const columns = [
            {
                title: '角色名称',
                key: '',
                dataIndex: ''
            },
            {
                title: '是否签署',
                key: '',
                dataIndex: ''
            },
            {
                title: '角色设置',
                key: '',
                dataIndex: ''
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
                title="设置参与方"
                style={{marginTop: 15}}
            >
                <SWTable
                    columns={columns}
                    dataSource={[]}
                    pagination={false}
                />
            </Card>
            <Card
                type="inner"
                title="操作记录"
                style={{marginTop: 15}}
            >
                <Timeline>
                    <Timeline.Item>
                        <h3>填写合同内容</h3>
                        <div>
                            <span>操作人：张丽丽</span>
                            <span style={{marginLeft: 25}}>操作时间：2015-09-01</span>
                        </div>
                    </Timeline.Item>
                    <Timeline.Item>
                        <h3>填写合同内容</h3>
                        <div>
                            <span>操作人：张丽丽</span>
                            <span style={{marginLeft: 25}}>操作时间：2015-09-01</span>
                        </div>
                    </Timeline.Item>
                    <Timeline.Item>
                        <h3>填写合同内容</h3>
                        <div>
                            <span>操作人：张丽丽</span>
                            <span style={{marginLeft: 25}}>操作时间：2015-09-01</span>
                        </div>
                    </Timeline.Item>
                </Timeline>
            </Card>
        </div>
    }
}

export default ContractTemplateDetail
