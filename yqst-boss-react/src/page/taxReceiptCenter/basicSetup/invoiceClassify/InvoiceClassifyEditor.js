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
import {CheckOutlined, RollbackOutlined} from '@ant-design/icons'

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


class InvoiceClassifyEditor extends Component {
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
            {name: "发票分类列表", link: '/Pages/InvoiceClassifyList'},
            {name: "新增发票分类"}
        ];
    }

    componentDidMount() {
        this.id = this.props.location.search.substr(1).split("=")[1];
        if (this.id) {
            this.getInfo();
            this.crumb = [
                {name: '税票中心'},
                {name: "基本设置"},
                {name: "发票分类列表", link: '/Pages/InvoiceClassifyList'},
                {name: "发票分类详情", link: `/Pages/InvoiceClassifyDetail?id=${this.id}`},
                {name: "编辑发票分类"}
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
                                  to={this.id ? `/Pages/InvoiceClassifyDetail?id=${this.id}` : '/Pages/InvoiceClassifyList'}
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
        Model.InvoiceCGet({classifyId: this.id}, (res) => {
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
                        key: 'classifyId',
                        type: 'Texts',
                        label: '发票分类ID',
                        span: 12,
                        formItemLayout,
                        value: data.classifyId
                    } : {},
                    this.id ? {
                        key: 'createTime', type: 'Texts', label: '产生时间', span: 12, formItemLayout,
                        value: data.createTime ? moment(data.createTime).format('YYYY-MM-DD HH:mm:ss') : ''
                    } : {},
                    {
                        key: 'classifySn',
                        type: 'Input',
                        span: 12,
                        formItemLayout,
                        placeholder: '请填写(仅限英文及数字字符)',
                        label: '发票分类编码',
                        value: data.classifySn || '',
                        options: {
                            rules: [{
                                required: true, message: '发票分类编码不能为空',
                            }, {
                                validator: (rule, value, callback) => this.checkValidator(rule, value, callback)
                            }],
                        },
                        attribute: {
                            maxLength: 50
                        }
                    },
                    {
                        key: 'classifyName',
                        type: 'Input',
                        span: 12,
                        value: data.classifyName || '',
                        formItemLayout,
                        placeholder: '请填写',
                        label: '发票分类名称',
                        options: {
                            rules: [{
                                required: true, message: '发票分类名称不能为空',
                            }],
                        },
                        attribute: {
                            maxLength: 50
                        }
                    },
                    {
                        key: 'desc',
                        type: 'Input',
                        value: data.desc || '',
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

    handleSubmit(e) {
        e.preventDefault();
        this.setState({loading: true});
        this.props.form.validateFieldsAndScroll(['classifySn', 'classifyName', 'desc'], (err, values) => {
            if (!err) {
                if (this.id) {
                    values.id = this.id;
                }
                Model.InvoiceCSave({...values}, (res) => {
                    message.success('保存成功！');
                    setTimeout(() => {
                        this.props.history.push('/Pages/InvoiceClassifyList');
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

export default InvoiceClassifyEditor
