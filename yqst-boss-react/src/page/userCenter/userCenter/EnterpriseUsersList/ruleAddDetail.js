import React, {Component} from 'react';
import {Button, Card, Col, Form, Row} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import get from 'lodash/get';
import ViewContent from '../../../../baseview/viewContent/ViewContent';
import AssemblySet from '../../../../baseview/assemblySet/AssemblySet';

class RuleAddDetail extends Component {
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
                        {name: '角色与权限详情'},
                        {name: '权限详情'}
                    ]
                }
            >
                <Card title='角色信息'>
                    {this.renderBaseInfo()}
                </Card>
                <Card title='员工选择' style={{marginTop: 20}}>
                    <Button type='primary'><PlusOutlined />选择</Button>
                    <span>员工数</span>
                </Card>
                <Row style={{marginTop: 20, textAlign: 'center'}}>
                    <Col span={24}>
                        <Button type='primary'>保存</Button>
                        <span style={{padding: '0 5px'}}/>
                        <Button type='danger'>取消</Button>
                    </Col>
                </Row>
            </ViewContent>
        );
    }

    renderBaseInfo = () => {
        const {form} = this.props;
        const {defaultValue} = this.state;
        const userInfoData = [
            {
                key: 'uid',
                type: 'Texts',
                label: '角色名称',
                span: 12,
                value: get(defaultValue, 'listAccountDTO.uid')
            },
            {
                key: 'createTime',
                type: 'Texts',
                label: '角色描述',
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

export default RuleAddDetail;
