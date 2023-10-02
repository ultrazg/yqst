import React, {Component} from 'react';
import {Card, Divider, Empty, Form, Popconfirm, Table, Timeline} from 'antd';
import moment from 'moment';
import get from 'lodash/get';
import model from './model';
import ViewContent from '../../../../baseview/viewContent/ViewContent';
import AssemblySet from '../../../../baseview/assemblySet/AssemblySet';
import {getPageQuery} from '../../../../utils';

class CooperativePartner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultValue: undefined
        };
        this.urlParams = getPageQuery();
    }
    componentDidMount() {
        this.getDefaultValue();
    }

    componentWillUnmount() {}

    getDefaultValue = () => {
        model.EnterpriseUsersPartnerGet({userId: this.urlParams.uid}, res => {
            if (res && res.ret === 0) {
                this.setState({defaultValue: res.data});
            }
        });
    };

    render() {
        return (
            <ViewContent
                backgroundColor='rgba(0,0,0,0)'
                style={{marginBottom: 30}}
                crumb={
                    [
                        {name: '企业用户管理'},
                        {name: '企业用户列表', link: '/Pages/EnterpriseUsersList'},
                        {name: '合作伙伴详情'}
                    ]
                }
            >
                <Card title='基本信息'>
                    {this.renderBaseInfo()}
                </Card>
                <Card title='合作伙伴列表' style={{marginTop: 15}}>
                    {this.renderPartnerList()}
                </Card>
                <Card title='操作纪录' style={{marginTop: 15}}>
                    {this.renderOperationalRecords()}
                </Card>
            </ViewContent>
        );
    }
    // 基本信息
    renderBaseInfo = () => {
        const {form} = this.props;
        const {defaultValue} = this.state;
        const userInfoData = [
            {
                key: 'uid',
                type: 'Texts',
                label: '企业 ID',
                span: 8,
                value: get(defaultValue, 'getAccountDTO.uid')
            },
            {
                key: 'companyName',
                type: 'Texts',
                label: '企业名称',
                span: 8,
                value: get(defaultValue, 'getAccountDTO.companyName')
            },
            {
                key: 'num',
                type: 'Texts',
                label: '企业成员数',
                span: 8,
                value: get(defaultValue, 'getAccountDTO.num')
            },
            {
                key: 'accountSn',
                type: 'Texts',
                label: '企业号',
                span: 8,
                value: get(defaultValue, 'getAccountDTO.accountSn')
            },
            {
                key: 'createTime',
                type: 'Texts',
                label: '创建时间',
                span: 8,
                value: get(defaultValue, 'getAccountDTO.createTime') ? moment(defaultValue.getAccountDTO.createTime).format('YYYY-MM-DD HH:mm:ss') : ''
            }
        ];
        return (
            <AssemblySet
                form={form}
                data={userInfoData}
            />
        );
    };
    // 合作伙伴列表
    renderPartnerList = () => {
        const {defaultValue} = this.state;
        const columns = [
            {title: '企业 ID', dataIndex: 'partnerUser'},
            {title: '企业号', dataIndex: 'partnerId'},
            {title: '企业名称', dataIndex: 'parName'},
            {title: '合作伙伴类型', dataIndex: 'parType'},
            {
                title: '添加时间', dataIndex: 'createTime', render: text => (
                    moment(text).format('YYYY-MM-DD HH:mm:ss')
                )
            },
            {
                title: '操作', dataIndex: '', render: (text, record) => (
                    <span>
                        <a>编辑</a>
                        <Divider type='vertical'/>
                        <Popconfirm
                            title="确认删除?"
                            onConfirm={() => console.log('删除')}
                            okText="确认"
                            okType='danger'
                            cancelText="取消"
                        >
                            <a style={{color: 'red'}}>删除</a>
                        </Popconfirm>
                    </span>
                )
            }
        ];
        return (
            <div>
                <Table
                    columns={columns}
                    rowKey='id'
                    dataSource={get(defaultValue, 'listPartnerDTO')}
                    pagination={false}
                />
            </div>
        );
    };
    // 操作纪录
    renderOperationalRecords = () => {
        const {defaultValue} = this.state;
        return (
            <div style={{marginLeft: 30}}>
                {
                    get(defaultValue, 'listCompanyLogDTOS') && get(defaultValue, 'listCompanyLogDTOS').length !== 0
                        ? <Timeline>
                            {
                                defaultValue.listCompanyLogDTOS.map((item, index) => {
                                    return (
                                        <Timeline.Item key={item.createTime + index}>
                                            <h3>{item.content}</h3>
                                            <p>操作人: {item.name}</p>
                                            <p>操作时间: {moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}</p>
                                        </Timeline.Item>
                                    );
                                })
                            }
                        </Timeline>
                        : <Empty/>
                }
            </div>
        );
    };
}

export default CooperativePartner;
