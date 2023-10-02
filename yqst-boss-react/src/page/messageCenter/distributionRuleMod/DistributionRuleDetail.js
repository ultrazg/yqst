/**
 * Created by yb on 2019/09/02.
 */

import React, {Component} from 'react';
import {Form, Button, Card, Table} from 'antd';
import {EditOutlined, RollbackOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import Model from "../Model";
import moment from 'moment'
import AssemblySet from "../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../baseview/viewContent/ViewContent";
import RulePublicMod from "./RulePublicMod";


class DistributionRuleDetail extends Component {
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
            <Form ref={this.formRef}>
                <ViewContent
                    crumb={[
                        {name: "消息中心"},
                        {name: "分发规则管理列表", link: '/Pages/DistributionRuleList'},
                        {name: "分发规则详情"},
                    ]}
                    topBtn = {
                        <div>
                            <Link to={`/Pages/DistributionRuleEditor?id=${this.id}`}>
                                <Button type="primary" icon={<EditOutlined />}>编辑</Button>
                            </Link>
                            <Link to={'/Pages/DistributionRuleList'} style={{marginLeft: 15}}>
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
        Model.MesInfoRGet({ruleId: this.id}, (res) => {
            this.setState({data: res.data});
        }, (err) => {
        });
    }

    makeBaseView() {
        let {data} = this.state;
        let noSetDataThr = [
            {key: 'adminName', type: 'Texts', label: '创建者', span: 12, value: data.adminName},
            {
                key: 'createTime',
                type: 'Texts',
                label: '创建时间',
                span: 12,
                value: data.createTime ? moment(data.createTime).format("YYYY-MM-DD HH:mm:ss") : ''
            },
            {key: 'updateAdmin', type: 'Texts', label: '修改者', span: 12, value: data.updateAdmin},
            {
                key: 'updateTime',
                type: 'Texts',
                label: '修改时间',
                span: 12,
                value: data.updateTime ? moment(data.updateTime).format("YYYY-MM-DD HH:mm:ss") : ''
            },
            // {key: 'xgText', type: 'Texts', label: '规则修改记录', span: 12, value: <a>查看</a>},
            {key: 'yyText', type: 'Texts', label: '规则应用情况', span: 24,
                formItemLayout: {
                    labelCol: {
                        xs: {span: 24},
                        sm: {span: 3},
                    },
                    wrapperCol: {
                        xs: {span: 24},
                        sm: {span: 21},
                    },
                },
                value: this.makeYYTab()
            },
        ];
        return <Card
            type="inner"
            title="分发规则详情"
        >
            <RulePublicMod data={this.state.data} formRef={this.formRef}/>
            <hr style={{
                border: 0,
                height: 1,
                backgroundColor: '#e8e8e8',
            }}/>
            <div style={{textAlign: 'right'}}>
                <Link to={`/Pages/RuleAmendantRecord?id=${this.state.data.id}`}>
                    <Button>规则修改记录 >></Button>
                </Link>
            </div>
            <AssemblySet key={'noSetDataThr'} data={noSetDataThr} form={this.formRef.current}/>
        </Card>
    }

    makeYYTab(){
        const statusName = (status, types = 'name') => {
            let names = '', colors = '';
            switch (status + '') {
                case '0':
                    names = '已发送';
                    colors = '#46BD4C';
                    break;

                case '1':
                    names = '发送失败';
                    colors = '#F12C20';
                    break;

                default:
                    names = '状态有误';
                    colors = '#F12C20';
                    break;
            }
            if('colors' == types) return colors;
            return names;
        };
        const columns = [
            {
                title: '消息ID',
                dataIndex: 'infoId',
                key: 'infoId'
            },
            {
                title: '消息发送者',
                dataIndex: 'sender',
                key: 'sender'
            },
            {
                title: '消息接收者',
                dataIndex: 'receiver',
                key: 'receiver'
            },
            {
                title: '消息类型',
                dataIndex: 'catType',
                key: 'catType'
            },
            {
                title: '消息内容',
                dataIndex: 'content',
                key: 'content',
                width: '30%'
            },
            {
                title: '发送时间',
                dataIndex: 'createTime',
                key: 'createTime',
                width: 100,
                render: (res) => {
                    let times = res ? moment(res).format('YYYY-MM-DD HH:mm:ss') : '';

                    return times ? <div>
                        <div>{times.split(' ')[0]}</div>
                        <div>{times.split(' ')[1]}</div>
                    </div> : times;
                }
            },
            {
                title: '消息状态',
                dataIndex: 'status',
                key: 'status',
                width: 90,
                render: (res) => {
                    return <span style={{color: statusName(res, 'colors')}}>
                        {statusName(res)}
                    </span>
                }
            }
        ];
        return <Table dataSource={this.state.data.bossListInfoVOList || []} columns={columns} />;
    }
}

export default DistributionRuleDetail
