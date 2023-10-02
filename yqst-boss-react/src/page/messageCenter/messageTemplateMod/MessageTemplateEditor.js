/**
 * Created by yb on 2019/04/09.
 */
import React, {Component} from 'react';
import {Form, Button, message, Row, Col} from 'antd';
import {CheckOutlined, RollbackOutlined} from '@ant-design/icons';
import Model from "../Model";
import AssemblySet from "../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../baseview/viewContent/ViewContent";
import {Link} from "react-router-dom";


class MessageTemplateEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            list: []
        };
        this.id = '';
        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.id = this.props.location.search.substr(1).split("=")[1];
        this.getMesInfoCList();
        if (this.id) {
            this.getInfo();
        }
    }

    // 视图层
    render() {
        return (
            <Form ref={this.formRef} autoComplete="off" onFinish={this.handleSubmit}>
                <ViewContent
                    crumb={[
                        {name: "消息中心"},
                        {name: "消息模板管理列表", link: '/Pages/MessageTemplateList'},
                        {name: this.id ? '编辑消息模板' : '添加消息模板'},
                    ]}
                    topBtn = {
                        <div>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{width: '100px'}}
                                icon={<CheckOutlined />}
                            >
                                保存
                            </Button>
                            <Link to={'/Pages/MessageTemplateList'} style={{marginLeft: 15}}>
                                <Button icon={<RollbackOutlined />} style={{width: '100px'}}>返回</Button>
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
            this.setState({
                data: res.data
            })
        }, (err) => {
        });
    }

    getMesInfoCList() {
        Model.MesInfoCList({}, (res) => {
            const list = res.data && res.data.map(item => {
                return {
                    ...item,
                    value: item.id,
                    name: item.infoType,
                }
            });
            this.setState({list});
        }, (err) => {
        });
    }

    makeBaseView() {
        let {data, list} = this.state;
        let noSetData = [
            !this.id ? {
                    key: 'templateSn', type: 'Input', span: 24, value: data.templateSn || '', placeholder: '请填写消息模板ID', label: '消息模板ID',
                    options: {
                        rules: [{
                            required: true, message: '消息模板ID不能为空',
                        }],
                    },
                    attribute: {
                        maxLength: 50
                    }
                } : {key: 'templateSn', type: 'Texts', label: '消息模板ID', span: 24, value: data.templateSn},
            {
                key: 'templateName', type: 'Input', span: 24, value: data.templateName || '', placeholder: '请填写消息模板名称', label: '消息模板名称',
                options: {
                    rules: [{
                        required: true, message: '消息模板名称不能为空',
                    }],
                },
                attribute: {
                    maxLength: 50
                }
            },
            {
                key: 'infoTypeId',
                type: 'Select',
                value: data.infoTypeId || [],
                label: '模板类型',
                placeholder: '请选择模板类型',
                span: 24,
                options: {
                    rules: [{
                        required: true, message: '模板类型不能为空',
                    }],
                },
                attribute: {
                    showSearch: true,
                    filterOption: (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                },
                data: {
                    list,
                },
            },
            {
                key: 'link', type: 'Input', span: 24, value: data.link || '', placeholder: '请填写链接URL', label: '链接URL',
                options: {
                    rules: [{
                        required: false, message: '链接URL不能为空',
                    }],
                },
                attribute: {
                    maxLength: 50
                }
            },
            {
                key: 'templateContent', type: 'Input', value: data.templateContent || '', label: '消息模板内容', placeholder: '请填写消息模板内容', span: 24,
                options: {
                    rules: [{
                        required: true, message: '消息模板内容不能为空',
                    }],
                },
                attribute: {
                    maxLength: 200,
                    style: {
                        width: '100%',
                        height: '100px',
                    },
                    type: "textarea",
                },
            },
        ];
        return <Row style={{display: 'flex',justifyContent: 'center',}}>
            <Col span={12}>
                <AssemblySet key={'makeBaseView'} data={noSetData} form={this.formRef.current}/>
            </Col>
        </Row>
    }

    handleSubmit = (e) => {
        const checkName = ['templateSn', 'templateName', 'infoTypeId', 'templateContent', 'link'];
        const {validateFields} = this.formRef.current;
        validateFields(checkName).then(values => {
            if(this.id){
                values.templateSn = this.state.data.templateSn;
            }
            Model.MesInfoTSave({
                ...values,
            }, (res) => {
                message.success(this.id ? '编辑成功！' : '添加成功！', 1);
                setTimeout(() => {
                    this.props.history.push('/Pages/MessageTemplateList');
                }, 1200)
            }, (err) => {
            });
        }).catch(()=>{

        });
    }
}

export default MessageTemplateEditor
