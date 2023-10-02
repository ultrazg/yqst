/**
 * Created by yb on 2019/09/02.
 */

import React, {Component} from 'react';
import {Form, Button, Modal, Card} from 'antd';
import Model from "../Model";
import moment from 'moment'
import AssemblySet from "../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../baseview/viewContent/ViewContent";

const switchStatus = (status, type='names') => {
    let name = '', color = '';
    switch (status + '') {
        case '0':
            name = '已发送';
            color = '#46BD4C';
            break;

        case '1':
            name = '发送失败';
            color = '#F12C20';
            break;

        default:
            name = '状态错误';
            color = '#F12C20';
            break;
    }
    if(type == 'color') return color;
    return name;
};


class MessageManagementDetail extends Component {
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
                <ViewContent crumb={[
                    {name: "消息中心"},
                    {name: "消息管理列表", link: '/Pages/MessageManagementList'},
                    {name: "消息管理详情"},
                ]}>
                    {this.makeBaseView()}
                </ViewContent>
            </Form>
        );
    }

    getInfo() {
        Model.MesInfoGet({id: this.id}, (res) => {
            this.setState({data: res.data});
        }, (err) => {
        });
    }

    makeBaseView() {
        let {data} = this.state;
        let noSetDataOne = [
            {key: 'infoType', type: 'Texts', label: '消息类型', span: 12, value: data.infoType},
            {key: 'status', type: 'Texts', label: '消息状态', span: 12,
                value: <span style={{color: switchStatus(data.status, 'color')}}>
                    {switchStatus(data.status)}
                </span>},
            {key: 'content', type: 'Texts', label: '消息内容', span: 12, value: data.content},
            {key: 'urlParam', type: 'Texts', label: '链接URL/API', span: 12, value: data.urlParam},
        ];
        let noSetDataTow = [
            {key: 'sender', type: 'Texts', label: '消息发送者', span: 12, value: data.sender},
            {
                key: 'createTime',
                type: 'Texts',
                label: '消息发送时间',
                span: 12,
                value: data.createTime ? moment(data.createTime).format("YYYY-MM-DD HH:mm:ss") : ''
            },
            {key: 'receiverPersonName', type: 'Texts', label: '消息接收者', span: 12, value: data.receiverPersonName},
            {
                key: 'receiptTime',
                type: 'Texts',
                label: '消息接收时间',
                span: 12,
                value: data.receiptTime ? moment(data.receiptTime).format("YYYY-MM-DD HH:mm:ss") : ''
            },
        ];
        let noSetDataThr = [
            {key: 'id', type: 'Texts', label: '消息ID', span: 12, value: data.id},
            {key: 'templateId', type: 'Texts', label: '消息模板ID', span: 12, value: data.templateId},
            {key: 'templateName', type: 'Texts', label: '消息模板名称', span: 12, value: data.templateName},
            {key: 'ruleId', type: 'Texts', label: '消息规则ID', span: 12, value: data.ruleId},
            {key: 'ruleName', type: 'Texts', label: '消息规则名称', span: 12, value: data.ruleName},
        ];
        return <Card
            type="inner"
            title="消息详情"
        >
            <AssemblySet key={'makeBaseView'} data={noSetDataOne} form={this.formRef.current}/>
            <hr style={{
                border: 0,
                height: 1,
                backgroundColor: '#e8e8e8',
            }}/>
            <AssemblySet key={'noSetDataTow'} data={noSetDataTow} form={this.formRef.current}/>
            {
                data.templateId && <div>
                    <hr style={{
                        border: 0,
                        height: 1,
                        backgroundColor: '#e8e8e8',
                    }}/>
                    <AssemblySet key={'noSetDataThr'} data={noSetDataThr} form={this.formRef.current}/>
                </div>
            }
        </Card>
    }
}

export default MessageManagementDetail
