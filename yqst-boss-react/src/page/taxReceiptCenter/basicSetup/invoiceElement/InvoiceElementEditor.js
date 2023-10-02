/**
 * Created by yb on 2019/09/129
 */

import React, {Component} from 'react';
import {Form, Button, Card, message} from 'antd';
import {Link} from "react-router-dom";
import Model from "../../Model";
import moment from 'moment'
import AssemblySet from "../../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../../baseview/viewContent/ViewContent";
import {RollbackOutlined, CheckOutlined} from '@ant-design/icons'

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


class InvoiceElementEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            loading: false,
        };
        this.id = '';
        this.crumb = [
            {name: '税票中心'},
            {name: "基本设置"},
            {name: "发票要素列表", link: '/Pages/InvoiceElementList'},
            {name: "新增发票要素"}
        ];
    }

    componentDidMount() {
        this.id = this.props.location.search.substr(1).split("=")[1];
        if (this.id) {
            this.getInfo();
            this.crumb = [
                {name: '税票中心'},
                {name: "基本设置"},
                {name: "发票要素列表", link: '/Pages/InvoiceElementList'},
                {name: "发票要素详情", link: `/Pages/InvoiceElementDetail?id=${this.id}`},
                {name: "编辑发票要素"}
            ];
        }
    }

    // 视图层
    render() {
        return (
            <Form autoComplete="off" onSubmit={this.handleSubmit.bind(this)}>
                <ViewContent
                    crumb={this.crumb}
                    topBtn={
                        <div>
                            <Button htmlType="submit" type="primary" icon={<CheckOutlined/>}
                                    loading={this.state.loading}>保存</Button>
                            <Link style={{marginLeft: 15}}
                                  to={this.id ? `/Pages/InvoiceElementDetail?id=${this.id}` : '/Pages/InvoiceElementList'}
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
        Model.InvoiceEGet({elementId: this.id}, (res) => {
            this.props.form.setFieldsValue({isMulti: res.data.isMulti + ''});
            this.setState({data: res.data});
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
                    this.id ? {
                        key: 'elementId',
                        type: 'Texts',
                        label: '发票分类ID',
                        span: 12,
                        formItemLayout,
                        value: data.elementId
                    } : {},
                    this.id ? {
                        key: 'createTime', type: 'Texts', label: '产生时间', span: 12, formItemLayout,
                        value: data.createTime ? moment(data.createTime).format('YYYY-MM-DD HH:mm:ss') : ''
                    } : {},
                    {
                        key: 'elementSn',
                        type: 'Input',
                        span: 12,
                        value: data.elementSn || '',
                        formItemLayout,
                        placeholder: '请填写(仅限英文及数字字符)',
                        label: '发票要素编码',
                        options: {
                            rules: [{
                                required: true, message: '发票要素编码不能为空',
                            }, {
                                validator: (rule, value, callback) => this.checkValidator(rule, value, callback)
                            }],
                        },
                        attribute: {
                            maxLength: 50
                        }
                    },
                    {
                        key: 'elementName',
                        type: 'Input',
                        span: 12,
                        value: data.elementName || '',
                        formItemLayout,
                        placeholder: '请填写',
                        label: '发票要素名称',
                        options: {
                            rules: [{
                                required: true, message: '发票要素名称不能为空',
                            }],
                        },
                        attribute: {
                            maxLength: 50
                        }
                    },
                    {
                        key: 'memo',
                        type: 'Input',
                        value: data.memo || '',
                        formItemLayout,
                        label: '描述说明',
                        placeholder: '请填写描述说明',
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
                title: '属性信息',
                key: 'SXKey',
                data: [
                    {
                        key: 'isMulti', type: 'Select', span: 12, formItemLayout, label: '是否有多个值',
                        value: '0' === '' + data.isMulti ? '0' : data.isMulti ? data.isMulti : '',
                        options: {
                            rules: [{
                                required: true, message: '是否有多个值不能为空',
                            }],
                        },
                        data: {
                            list: [
                                {
                                    value: '',
                                    name: '请选择'
                                },
                                {
                                    value: '0',
                                    name: '否'
                                },
                                {
                                    value: '1',
                                    name: '是'
                                }
                            ]
                        },
                        attribute: {
                            onChange: (val) => {
                                if ('1' !== '' + val) {
                                    this.props.form.setFieldsValue({number: ''});

                                } else if ('1' === '' + val) {
                                    this.props.form.setFieldsValue({number: data.number || ''});

                                }
                            }
                        }
                    },
                    {
                        key: 'number',
                        type: 'Input',
                        span: 12,
                        value: data.number || '',
                        formItemLayout,
                        placeholder: '请填写',
                        label: '值数量上限',
                        options: {
                            rules: [{
                                required: '1' === '' + this.props.form.getFieldValue('isMulti'),
                                message: '值数量上限不能为空',
                            }, {
                                validator: (rule, value, callback) => this.checkNum(rule, value, callback)
                            }],
                        },
                        attribute: {
                            maxLength: 15,
                            disabled: '1' !== '' + this.props.form.getFieldValue('isMulti')
                        }
                    },
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
                        <AssemblySet key={item.key} data={item.data} form={this.props.form}/>
                    </Card>
                })
            }
        </div>;
    }

    checkValidator(rule, value, callback) {
        const numAndLet = /^[0-9a-zA-Z]+$/;
        if (value && !numAndLet.test(value)) {
            callback('编码只能是数字或者字母！');
            return false;
        }
        callback();
    }

    checkNum(rule, value, callback) {
        const numAndLet = /^[0-9]+$/;
        if (value && (!numAndLet.test(value) || value <= 0)) {
            callback('数量只能是大于零的整数！');
            return false;
        }
        callback();
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({loading: true});
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                if (this.id) {
                    values.id = this.id;
                }
                Model.InvoiceESave({...values}, (res) => {
                    message.success('保存成功！');
                    setTimeout(() => {
                        this.props.history.push('/Pages/InvoiceElementList');
                    }, 100);
                }, (err) => {
                    this.setState({loading: false});
                });
            } else {
                this.setState({loading: false});
            }
        });
    }
}

export default InvoiceElementEditor
