/**
 * Created by yb on 2019/09/03.
 * 详情和修改记录页面共用的内容
 */

import React, {Component} from 'react';
import {Form, Radio, Table} from 'antd';
import AssemblySet from "../../../baseview/assemblySet/AssemblySet";

const senderTypes = (types) => {
    let typeName = '';
    switch (types + '') {
        case '1':
            typeName = '平台';
            break;

        case '2':
            typeName = '业务应用';
            break;

        case '3':
            typeName = '企业用户';
            break;

        case '4':
            typeName = '个人用户';
            break;

        default:
            typeName = '类型有误';
            break;
    }
    return typeName;
};
const switchType = (types) => {
    let typeName = '';
    switch (types + '') {
        case '1':
            typeName = '通知类';
            break;

        case '2':
            typeName = '营销类';
            break;

        case '3':
            typeName = '公告类';
            break;

        default:
            typeName = '类型有误';
            break;
    }
    return typeName;
};
const switchStatus = (status, types = 'name') => {
    let names = '', colors = '';
    switch (status + '') {
        case '0':
            names = '启用';
            colors = '#46BD4C';
            break;

        case '1':
            names = '停用';
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


class RulePublicMod extends Component {
    constructor(props) {
        super(props);
        this.state = {
            radValue: 1,
        };
        this.formRef = this.props.formRef;
    }

    componentDidMount() {}

    // 视图层
    render() {
        let {key = 'only', data} = this.props;
        let noSetDataOne = [
            {key: 'ruleSn', type: 'Texts', label: '规则ID', span: 12, value: data.ruleSn},
            {key: 'ruleName', type: 'Texts', label: '规则名称', span: 12, value: data.ruleName},
            {key: 'senderType', type: 'Texts', label: '发送者类型', span: 12, value: senderTypes(data.senderType)},
            {key: 'infoType', type: 'Texts', label: '消息类型', span: 12, value: switchType(data.infoType)},
            {key: 'template', type: 'Texts', label: '选择消息模版', span: 12, value: data.template},
            {key: 'status', type: 'Texts', label: '状态', span: 12,
                value: <span style={{color: switchStatus(data.status, 'colors')}}>
                    {switchStatus(data.status)}
                </span>
            },
        ];
        let noSetDataTow = [
            {key: 'lxTexts', type: 'Texts', label: '分发类型', span: 12,
                value: <Radio.Group value={this.state.radValue} onChange={(e) => {
                    this.setState({radValue: e.target.value})
                }}>
                    <Radio value={1}>推送</Radio>
                    <Radio value={2}>短信</Radio>
                    <Radio value={3}>邮件</Radio>
                </Radio.Group>
            },
            {key: 'lxTexts', type: 'Texts', label: '分发设置', span: 24,
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
                value: this.makeFFTab(this.state.radValue)
            },
        ];
        return (
            <div key={key}>
                <AssemblySet key={'makeBaseView'} data={noSetDataOne} form={this.formRef.current}/>
                <hr style={{
                    border: 0,
                    height: 1,
                    backgroundColor: '#e8e8e8',
                }}/>
                <AssemblySet key={'noSetDataTow'} data={noSetDataTow} form={this.formRef.current}/>
            </div>
        );
    }

    makeFFTab(keys){
        let {data} = this.props;
        let columns = [];
        switch (keys + '') {
            case '1':
                columns = [
                    {
                        title: '序号',
                        dataIndex: 'id',
                        key: 'id',
                        width: 85
                    },
                    {
                        title: '分发渠道',
                        dataIndex: 'pushDitch',
                        key: 'pushDitch'
                    },
                    {
                        title: '终端平台',
                        dataIndex: 'chanel',
                        key: 'chanel'
                    },
                    {
                        title: 'AppKey',
                        dataIndex: 'appKey',
                        key: 'appKey'
                    },
                    {
                        title: '是否设为默认',
                        dataIndex: 'isDefault',
                        key: 'isDefault',
                        render: (res) => {
                            return '1' === '' + res ? '是' : '否';
                            // return <Checkbox checked={'1' === '' + res} disabled={true}/>
                        }
                    },
                    {
                        title: '是否设为备用',
                        dataIndex: 'isSpare',
                        key: 'isSpare',
                        render: (res) => {
                            return '1' === '' + res ? '是' : '否';
                            // return <Checkbox checked={'1' === '' + res} disabled={true}/>
                        }
                    }
                ];
                return <Table dataSource={data.distributePushVO || []} columns={columns} />;

            case '2':
                columns = [
                    {
                        title: '序号',
                        dataIndex: 'id',
                        key: 'id',
                        width: 85
                    },
                    {
                        title: '分发渠道',
                        dataIndex: 'pushDitch',
                        key: 'pushDitch'
                    },
                    {
                        title: '对接API',
                        dataIndex: 'chanel',
                        key: 'chanel'
                    },
                    {
                        title: '回调API',
                        dataIndex: 'appKey',
                        key: 'appKey'
                    },
                    {
                        title: '设为默认',
                        dataIndex: 'isDefault',
                        key: 'isDefault'
                    },
                    {
                        title: '设为备用',
                        dataIndex: 'isSpare',
                        key: 'isSpare'
                    }
                ];
                return <Table dataSource={data.distributeMsgVO || []} columns={columns} />;

            case '3':
                columns = [
                    {
                        title: '序号',
                        dataIndex: 'id',
                        key: 'id',
                        width: 85
                    },
                    {
                        title: '分发渠道',
                        dataIndex: 'pushDitch',
                        key: 'pushDitch'
                    },
                    {
                        title: '域名',
                        dataIndex: 'chanel',
                        key: 'chanel'
                    },
                    {
                        title: 'STMP',
                        dataIndex: 'appKey',
                        key: 'appKey'
                    },
                    {
                        title: '设为默认',
                        dataIndex: 'isDefault',
                        key: 'isDefault'
                    },
                    {
                        title: '设为备用',
                        dataIndex: 'isSpare',
                        key: 'isSpare'
                    }
                ];
                return <Table dataSource={data.distributeEmailVO || []} columns={columns} />;

            default:
                return null;
        }
    }
}

export default RulePublicMod
