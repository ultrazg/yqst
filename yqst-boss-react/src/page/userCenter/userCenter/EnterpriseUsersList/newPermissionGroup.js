import React, {Component} from 'react';
import {Card, Row, Col, Button, Form, Table} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import get from 'lodash/get';
import ViewContent from '../../../../baseview/viewContent/ViewContent';
import AssemblySet from '../../../../baseview/assemblySet/AssemblySet';

class NewPermissionGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <ViewContent
                backgroundColor='rgba(0,0,0,0)'
                style={{marginBottom: 30}}
                crumb={
                    [
                        {name: '企业用户列表'},
                        {name: '企业角色与权限'},
                        {name: '新建权限组'}
                    ]
                }
            >
                <Card title='权限组信息'>
                    {this.renderBaseInfo()}
                </Card>
                <Card title='使用范围' style={{marginTop: 10}}>
                    {this.renderTable()}
                </Card>
                <Card title='功能设置' style={{marginTop: 10}}>
                    <Button type='primary' size='large'><PlusOutlined />选择</Button>
                </Card>
                <Row style={{marginTop: 10, textAlign: 'center'}}>
                    <Col span={24}>
                        <Button type='primary'>保存</Button>
                        <span style={{padding: '0 5px'}}/>
                        <Button type='danger'>取消</Button>
                    </Col>
                </Row>
            </ViewContent>
        );
    }

    renderTable = () => {
        const data = [
            {key: 1, type: '指定角色', selected: '暂无'},
            {key: 2, type: '指定员工', selected: '暂无'},
            {key: 3, type: '指定部门', selected: '暂无'},
            {key: 4, type: '指定职务', selected: '暂无'}
        ];
        const columns = [
            {
                title: '类型',
                dataIndex: 'type'
            },
            {
                title: '已选择',
                dataIndex: 'selected'
            },
            {
                title: '操作',
                dataIndex: '1',
                render: text => (
                    <a>选择</a>
                )
            }
        ];
        return (
            <Table
                dataSource={data}
                columns={columns}
                pagination={false}
            />
        );
    };

    renderBaseInfo = () => {
        const {form} = this.props;
        const {defaultValue} = this.state;
        const userInfoData = [
            {
                key: 'uid',
                type: 'Texts',
                label: '权限 ID',
                span: 12,
                value: get(defaultValue, 'listAccountDTO.uid')
            },
            {
                key: 'createTime',
                type: 'Texts',
                label: '创建时间',
                span: 12,
                value: get(defaultValue, 'listAccountDTO.createTime')
            },
            {
                key: 'createTime',
                type: 'Texts',
                label: '权限组名称',
                span: 12,
                value: get(defaultValue, 'listAccountDTO.createTime')
            },
            {
                key: 'createTime',
                type: 'Texts',
                label: '权限组描述',
                span: 12,
                value: get(defaultValue, 'listAccountDTO.createTime')
            }
        ];
        return (
            <AssemblySet
                form={form}
                data={userInfoData}
            />
        );
    };
}

export default NewPermissionGroup;
