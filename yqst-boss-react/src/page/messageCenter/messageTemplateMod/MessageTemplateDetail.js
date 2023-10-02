/**
 * Created by yb on 2019/09/02.
 */

import React, {Component} from 'react';
import {Form, Button, Card} from 'antd';
import {RollbackOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import Model from "../Model";
import moment from 'moment'
import AssemblySet from "../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../baseview/viewContent/ViewContent";

const switchType = (types) => {
    let typeName = '';
    switch (types + '') {
        case '1':
            typeName = '业务通知';
            break;

        case '2':
            typeName = '系统通知';
            break;

        case '3':
            typeName = '营销通知';
            break;

        default:
            typeName = '类型有误';
            break;
    }
    return typeName;
};


class MessageTemplateDetail extends Component {
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
                        {name: "消息模板管理列表", link: '/Pages/MessageTemplateList'},
                        {name: "消息模板详情"},
                    ]}
                    topBtn = {
                        <div>
                            {/*<Link to={`/Pages/MessageTemplateEditor?id=${this.id}`}>
                            <Button type="primary" icon={'edit'}>编辑</Button>
                        </Link>*/}
                            <Link to={'/Pages/MessageTemplateList'} style={{marginLeft: 15}}>
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
        Model.MesInfoTGet({templateId: this.id}, (res) => {
            this.setState({data: res.data});
        }, (err) => {
        });
    }

    makeBaseView() {
        let {data} = this.state;
        let noSetDataOne = [
            {key: 'templateSn', type: 'Texts', label: '消息模板ID', span: 12, value: data.templateSn},
            {key: 'templateName', type: 'Texts', label: '消息模板名称', span: 12, value: data.templateName},
            {key: 'infoType', type: 'Texts', label: '模板类型', span: 12, value: data.infoType},
            {key: 'templateContent', type: 'Texts', label: '消息模板内容', span: 12, value: data.templateContent},
            {key: 'link', type: 'Texts', label: '链接URL', span: 12, value: data.link},
        ];
        let noSetDataTow = [
            {key: 'createAdminName', type: 'Texts', label: '创建者', span: 12, value: data.createAdminName},
            {
                key: 'createTime',
                type: 'Texts',
                label: '创建时间',
                span: 12,
                value: data.createTime ? moment(data.createTime).format("YYYY-MM-DD HH:mm:ss") : ''
            },
            {key: 'updateAdminName', type: 'Texts', label: '修改者', span: 12, value: data.updateAdminName},
            {
                key: 'updateTime',
                type: 'Texts',
                label: '修改时间',
                span: 12,
                value: data.updateTime ? moment(data.updateTime).format("YYYY-MM-DD HH:mm:ss") : ''
            },
        ];
        return <Card
            type="inner"
            title="模板详情"
        >
            <AssemblySet key={'makeBaseView'} data={noSetDataOne} form={this.formRef.current}/>
            <hr style={{
                border: 0,
                height: 1,
                backgroundColor: '#e8e8e8',
            }}/>
            <AssemblySet key={'noSetDataTow'} data={noSetDataTow} form={this.formRef.current}/>
        </Card>
    }
}

export default MessageTemplateDetail
