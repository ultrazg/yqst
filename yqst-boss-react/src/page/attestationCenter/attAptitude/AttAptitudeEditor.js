/**
 * Created by yb on 2019/09/129
 */

import React, {Component} from 'react';
import {Form, Button, Card, message} from 'antd';
import {CheckOutlined, RollbackOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import Model from "../Model";
import moment from 'moment'
import AssemblySet from "../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../baseview/viewContent/ViewContent";


const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 8},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
    },
};

const oneLineFormItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 4},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 14},
    },
};


class AttAptitudeEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            loading: false,
        };
        this.id = '';
        this.crumb = [
            {name: '认证中心'},
            {name: "认证内容管理"},
            {name: "资质管理列表", link: '/Pages/AttAptitudeList'},
            {name: "新增资质"}
        ];
        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.id = this.props.location.search.substr(1).split("=")[1];
        if (this.id) {
            this.getInfo();
            this.crumb = [
                {name: '认证中心'},
                {name: "认证内容管理"},
                {name: "资质管理列表", link: '/Pages/AttAptitudeList'},
                {name: "资质管理详情", link: `/Pages/AttAptitudeDetail?id=${this.id}`},
                {name: "编辑资质"},
            ];
        }
    }

    // 视图层
    render() {
        return (
            <Form ref={this.formRef} autoComplete="off" onFinish={this.handleSubmit}>
                <ViewContent
                    crumb={this.crumb}
                    topBtn={
                        <div>
                            <Button
                                htmlType="submit"
                                type="primary"
                                icon={<CheckOutlined/>}
                                loading={this.state.loading}
                            >
                                保存
                            </Button>
                            <Link style={{marginLeft: 15}}
                                  to={this.id ? `/Pages/AttAptitudeDetail?id=${this.id}` : '/Pages/AttAptitudeList'}
                            >
                                <Button icon={<RollbackOutlined/>}>返回</Button>
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
        Model.UserAttDocGet({id: this.id}, (res) => {
            this.setState({
                data: res.data
            }, () => {
                const {setFieldsValue, resetFields} = this.formRef.current;
                if ('6' === '' + res.data.docType) {
                    setFieldsValue({number: res.data.docType});
                } else if ('7' === '' + res.data.docType) {
                    setFieldsValue({number: res.data.docType});
                }

                resetFields();
            });
        }, (err) => {
        });
    }

    makeBaseView() {
        let {data} = this.state;
        if (!this.formRef.current) {
            return null;
        }

        let allData = [
            {
                title: '基本信息',
                key: 'JBKey',
                data: [
                    this.id ? {key: 'id', type: 'Texts', label: '资质ID', span: 12, formItemLayout, value: data.id} : {},
                    this.id ? {
                        key: 'createTime', type: 'Texts', label: '创建时间', span: 12, formItemLayout,
                        value: data.createTime ? moment(data.createTime).format('YYYY-MM-DD HH:mm:ss') : ''
                    } : {},
                    {
                        key: 'docCode',
                        type: 'Input',
                        span: 12,
                        value: data.docCode || '',
                        formItemLayout,
                        placeholder: '请填写(仅限英文及数字字符)',
                        label: '资质编码',
                        options: {
                            rules: [
                                {
                                    required: true, message: '资质编码不能为空',
                                },
                                ({getFieldValue}) => ({
                                    validator(rule, value) {
                                        const numAndLet = /^[0-9a-zA-Z]+$/;
                                        if (value && !numAndLet.test(value)) {
                                            return Promise.reject('编码只能是数字或者字母！');
                                        }
                                        return Promise.resolve();
                                    },
                                }),
                            ],
                        },
                        attribute: {
                            maxLength: 20
                        }
                    },
                    {
                        key: 'docName',
                        type: 'Input',
                        span: 12,
                        value: data.docName || '',
                        formItemLayout,
                        placeholder: '请填写',
                        label: '资质名称',
                        options: {
                            rules: [{
                                required: true, message: '资质名称不能为空',
                            }],
                        },
                        attribute: {
                            maxLength: 30
                        }
                    },
                    {
                        key: 'docMemo',
                        type: 'Input',
                        value: data.docMemo || '',
                        formItemLayout,
                        label: '资质描述',
                        placeholder: '请填写资质描述',
                        span: 12,
                        attribute: {
                            maxLength: 200,
                            style: {
                                width: '100%',
                                height: '100px',
                            },
                            type: "textarea",
                        },
                    },
                ],
                style: {},
            },
            {
                title: '资质类型设置',
                key: 'LXKey',
                data: [
                    {
                        key: 'docType', type: 'Select', span: 12, formItemLayout, label: '资质类型',
                        value: '0' === '' + data.docType ? '0' : data.docType ? data.docType : '',
                        options: {
                            rules: [{
                                required: true, message: '资质类型不能为空',
                            }],
                        },
                        data: {
                            list: [
                                {
                                    value: '',
                                    name: '请选择'
                                },
                                {
                                    value: '1',
                                    name: '文本'
                                },
                                {
                                    value: '2',
                                    name: '图片'
                                },
                                {
                                    value: '5',
                                    name: '地址'
                                },
                                {
                                    value: '3',
                                    name: '时间点'
                                },
                                {
                                    value: '4',
                                    name: '时间区间'
                                },
                                {
                                    value: '6',
                                    name: '附件'
                                },
                                {
                                    value: '7',
                                    name: '选项'
                                },
                            ]
                        },
                        callBack: (docType) => {
                            data.docType = docType;
                            this.setState({
                                data
                            })
                        }
                    },
                    '6' === '' + data.docType ? {
                        key: 'fileFormat', type: 'Select', span: 12, formItemLayout, label: '附件格式',
                        placeholder: '请选择',
                        value: data.fileFormat ? data.fileFormat.split(',') : [],
                        options: {
                            rules: [{
                                required: true, message: '附件格式不能为空',
                            }],
                        },
                        data: {
                            list: [
                                // {
                                //     value: '全部',
                                //     name: '全部'
                                // },
                                {
                                    value: '.txt',
                                    name: 'txt'
                                },
                                {
                                    value: '.doc',
                                    name: 'doc'
                                },
                                {
                                    value: '.docx',
                                    name: 'docx'
                                },
                                {
                                    value: '.xls',
                                    name: 'xls'
                                },
                                {
                                    value: '.ppt',
                                    name: 'ppt'
                                },
                                {
                                    value: '.xlsx',
                                    name: 'xlsx'
                                },
                                {
                                    value: '.pptx',
                                    name: 'ppyx'
                                },
                                {
                                    value: '.pdf',
                                    name: 'pdf'
                                },
                                {
                                    value: '.rar',
                                    name: 'rar'
                                }
                            ]
                        },
                        attribute: {
                            mode: 'multiple',
                        }
                    } : {},
                    '7' === '' + data.docType ? {
                        key: 'option',
                        type: 'MultitermForm',
                        span: 24,
                        formItemLayout: oneLineFormItemLayout,
                        label: '可选项详情',
                        value: data.optionVOList,
                        options: {
                            rules: [{
                                required: false, message: '可选项详情不能为空',
                            }],
                        },
                    } : {},
                ],
                style: {marginTop: 15},
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
        </div>;
    }

    handleSubmit = () => {
        this.setState({loading: true});
        const {validateFields} = this.formRef.current;
        validateFields().then(values => {

            if (this.id) {
                values.docId = this.id;
                delete values.id;
                delete values.createTime;
            }
            if ('6' === '' + values.docType) {
                values.fileFormat = values.fileFormat.join(',');
            } else {
                values.fileFormat = '';
            }
            if ('7' === '' + values.docType && values.option) {
                values.option.forEach(n => {
                    if (n.optionId === undefined) n.optionId = 0
                    delete n.index
                    delete n.key
                })
                for (let i = 0; i < values.option.length; i++) {
                    let n = values.option[i];
                    if (n.optionName == undefined || n.optionName == '') {
                        this.setState({loading: false});
                        return message.info("选项不能为空，请完善选项信息");
                    }
                }
                values.option = JSON.stringify(values.option)
            }
            Model.UserAttDocSave({...values}, (res) => {
                message.success('保存成功！');
                this.props.history.push('/Pages/AttAptitudeList');

            }, (err) => {
                this.setState({loading: false});
            });

        }).catch(() => {
            this.setState({loading: false});
        });
    }
}

export default AttAptitudeEditor
