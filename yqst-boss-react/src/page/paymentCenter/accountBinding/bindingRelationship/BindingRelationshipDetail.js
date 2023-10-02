/**
 * Created by yb on 2019/09/17
 */

import React, {Component} from 'react';
import {Form, Button, Card, Timeline} from 'antd';
import {RollbackOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import Model from "../../Model";
import moment from 'moment'
import SwitchNames from "./SwitchNames";
import AssemblySet from "../../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../../baseview/viewContent/ViewContent";


class BindingRelationshipDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            adminLogList: []
        };
        this.id = '';
        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.id = this.props.location.search.substr(1).split("=")[1];
        if (this.id) {
            this.getInfo();
            this.getAdminLogList();
        }
    }

    // 视图层
    render() {
        return (
            <Form ref={this.formRef}>
                <ViewContent
                    crumb={[
                        {name: '支付中心'},
                        {name: "商户账户绑定"},
                        {name: "账户绑定列表", link: '/Pages/BindingRelationshipList'},
                        {name: "账户绑定详情"}
                    ]}
                    topBtn = {
                        <div>
                            {/*<Button type="primary" icon={'edit'}>编辑</Button>*/}
                            <Link to={'/Pages/BindingRelationshipList'} style={{marginLeft: 15}}>
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
        Model.walletPSBGet({bindId: this.id}, (res) => {
            this.setState({data: res.data});
        }, (err) => {
        });
    }

    getAdminLogList() {
        Model.walletPBALList({id: this.id, type: 1}, (res) => {
            this.setState({adminLogList: res.data || []});
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
                    {key: 'bindId', type: 'Texts', label: '绑定关系ID', span: 12, value: data.bindId},
                    {key: 'bindStatus', type: 'Texts', label: '绑定状态', span: 12,
                        value: SwitchNames.bindStatusName(data.bindStatus)},
                    {key: 'createTime', type: 'Texts', label: '产生时间', span: 12,
                        value: data.createTime ? moment(data.createTime).format('YYYY-MM-DD HH:mm:ss') : ''},
                ],
                style: {},
            },
            {
                title: '绑定信息',
                key: 'BDKey',
                data: [
                    {key: 'userId', type: 'Texts', label: '企业ID', span: 12, value: data.userId},
                    {key: 'userName', type: 'Texts', label: '企业名称', span: 12, value: data.userName},
                    {key: 'shopId', type: 'Texts', label: '终端ID', span: 12, value: data.shopId},
                    {key: 'shopName', type: 'Texts', label: '终端名称', span: 12, value: data.shopName},
                    {key: 'accountId', type: 'Texts', label: '商户账户ID', span: 12, value: data.accountId},
                ],
                style: {
                    marginTop: 15
                },
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
                        <AssemblySet key={item.key} data={item.data} form={this.formRef.current}/>
                    </Card>
                })
            }
            <Card
                type="inner"
                title="管理员操作记录"
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
                        this.state.adminLogList.map((item, idx) => {
                            return <Timeline.Item key={'aLog_' + idx}>
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
                        this.state.adminLogList && this.state.adminLogList.length <= 0 && <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>
                            暂无记录...
                        </div>
                    }
                </Timeline>
            </Card>
        </div>
    }
}

export default BindingRelationshipDetail
