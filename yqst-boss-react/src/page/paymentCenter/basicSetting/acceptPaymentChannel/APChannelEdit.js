/**
 * Created by yb on 2019/09/17.
 */

import React, {Component} from 'react';
import {Form, Button, Card, message, Radio} from 'antd';
import {RollbackOutlined, CheckOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import Model from "../../Model";
import moment from 'moment'
import SWTable from 'SWViews/table';
import AssemblySet from "../../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../../baseview/viewContent/ViewContent";

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const checkName = ['channelSn', 'channelName', 'desc', 'payType', 'isVoucher'];
let crumb = [
    {name: '支付中心'},
    {name: "基础设置"},
    {name: "收支付渠道列表", link: '/Pages/APChannelList'},
    {name: '新建收支付渠道'}
];


class APChannelEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            loading: false,
            onPlanData: {},
            planList: [],
            total: 0,
            requestPar: {
                current: 1,
                pageSize: 10,
                keyWord: '',
                channelId: '',
                sortType: 2,
            },
        };
        this.id = '';
        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.id = this.props.location.search.substr(1).split("=")[1];
        if (this.id) {
            crumb = [
                {name: '支付中心'},
                {name: "基础设置"},
                {name: "收支付渠道列表", link: '/Pages/APChannelList'},
                {name: "收支付渠道详情", link: `/Pages/APChannelDetail?id=${this.id}`},
                {name: '编辑收支付渠道'}
            ];
            this.getInfo();
            this.getPlanList();
        }
    }

    // 视图层
    render() {
        return (
            <Form ref={this.formRef} autoComplete="off" onFinish={this.handleSubmit}>
                <ViewContent
                    crumb={crumb}
                    topBtn = {
                        <div>
                            <Button htmlType="submit" type="primary" icon={<CheckOutlined />} loading={this.state.loading}>保存</Button>
                            <Link to={this.id ? `/Pages/APChannelDetail?id=${this.id}` : `/Pages/APChannelList`} style={{marginLeft: 15}}>
                                <Button icon={<RollbackOutlined />}>取消</Button>
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
        Model.walletPCGet({channelId: this.id}, (res) => {
            this.setState({
                data: res.data
            }, ()=>{
                this.formRef.current.resetFields();
            });
        }, (err) => {
        });
    }

    getPlanList() {
        Model.walletPPPage({...this.state.requestPar, channelId: this.id}, (res) => {
            const newList = res.data.records || [];
            // 查看关联的方案是否开启过；
            let onPlanData = null;
            newList.forEach(item => {
                if('' + item.status === '2'){
                    onPlanData = item;
                    return false;
                }
            });

            this.setState({planList: newList, total: this.state.total || 0, onPlanData});
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
                    this.id ? {key: 'channelId', type: 'Texts', label: '收支付渠道ID', span: 12, formItemLayout, value: data.channelId} : {},
                    this.id ? {key: 'createTime', type: 'Texts', label: '创建时间', span: 12, formItemLayout,
                        value: data.createTime ? moment(data.createTime).format('YYYY-MM-DD HH:mm:ss') : ''} : {},
                    this.id ? {
                        key: 'status',
                        type: 'Select',
                        value: data.status,
                        label: '状态',
                        placeholder: '请选择状态',
                        span: 12,
                        formItemLayout,
                        options: {
                            rules: [{
                                required: true, message: '状态不能为空',
                            }],
                        },
                        data: {
                            list: [
                                {value: '2', name: '启用中'},
                                {value: '1', name: '关闭中'},
                            ],
                        },
                    } : {},
                    {
                        key: 'channelSn', type: 'Input', span: 12, value: data.channelSn, formItemLayout, placeholder: '请填写收支付渠道编码', label: '收支付渠道编码',
                        options: {
                            rules: [{
                                required: true, message: '收支付渠道编码不能为空',
                            }, {
                                validator: (rule, value, callback) => this.checkValidator('0', rule, value, callback)
                            }],
                        },
                        attribute: {
                            maxLength: 50
                        }
                    },
                    {
                        key: 'channelName', type: 'Input', span: 12, value: data.channelName, formItemLayout, placeholder: '请填写收支付渠道名称', label: '收支付渠道名称',
                        options: {
                            rules: [{
                                required: true, message: '收支付渠道名称不能为空',
                            }],
                        },
                        attribute: {
                            maxLength: 50
                        }
                    },
                    {
                        key: 'desc', type: 'Input', value: data.desc, formItemLayout, label: '描述', placeholder: '请填写描述', span: 12,
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
                title: '设置',
                key: 'SZKey',
                data: [
                    {
                        key: 'payType',
                        type: 'Select',
                        value: data.payType,
                        label: '收支付类型',
                        placeholder: '请选择收支付类型',
                        span: 12,
                        formItemLayout,
                        options: {
                            rules: [{
                                required: true, message: '收支付类型不能为空',
                            }],
                        },
                        data: {
                            list: [
                                {value: '1', name: '线上'},
                                {value: '2', name: '线下'},
                            ],
                        },
                        attribute: {
                            onChange: (key) => {
                                if(key === '1'){
                                    this.formRef.current.setFieldsValue({isVoucher: '0'});
                                }
                            }
                        }
                    },
                    {
                        key: 'isVoucher',
                        type: 'Select',
                        value: data.isVoucher,
                        label: '是否需收付款凭证',
                        placeholder: '请选择',
                        span: 12,
                        formItemLayout,
                        options: {
                            rules: [{
                                required: true, message: '收付款凭证不能为空',
                            }],
                        },
                        data: {
                            list: [
                                {value: '1', name: '是'},
                                {value: '0', name: '否'},
                            ],
                        },
                        attribute: {
                            disabled: '' + this.formRef.current.getFieldValue('payType') === '1'
                        }
                    },
                ],
                style: {
                    marginTop: 15
                },
            },
        ];
        const columns = [
            {
                title: '选择',
                key: 'status',
                dataIndex: 'status',
                render: (res, data, rowIdx) => {
                    return <Radio checked={'2' === '' + res}
                        onChange={(e) => {
                            this.state.planList.forEach((item, idx) => {
                                item.status = 1;
                                if(rowIdx == idx){
                                    item.status = 2;
                                    this.state.onPlanData = item;
                                }
                            });
                            this.setState({planList: this.state.planList, onPlanData: this.state.onPlanData});
                        }}
                    />
                }
            },
            {
                title: '收支付方案ID',
                key: 'planId',
                dataIndex: 'planId',
            },
            {
                title: '方案编码',
                key: 'planSn',
                dataIndex: 'planSn',
            },
            {
                title: '收支付方案名称',
                key: 'planName',
                dataIndex: 'planName',
            },
            {
                title: '方案描述',
                key: 'planDesc',
                dataIndex: 'planDesc',
                width: 200
            },
            {
                title: '创建时间',
                key: 'createTime',
                dataIndex: 'createTime',
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
                title: '操作',
                key: '',
                dataIndex: '',
                width: 90,
                render: (res) => {
                    return <div>
                        <Link target="_blank" to={`/Pages/APSchemeDetail?id=${res.planId}`}>
                            查看
                        </Link>
                        {/*<span style={{
                            margin: '0 10px',
                            borderRight: '1px solid #d7d6d6',
                        }}/>
                        <Link to={`/Pages/MessageTemplateEditor?id=${res.id}`}>
                            编辑
                        </Link>*/}
                    </div>
                }
            }
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
            {
                this.id && <Card
                    type="inner"
                    title="关联的收支付方案"
                    style={{marginTop: 15}}
                >
                    <SWTable
                        columns={columns}
                        dataSource={this.state.planList || []}
                        pagination={
                            {
                                total: this.state.total,
                                current: this.state.requestPar.current,
                                pageSize: this.state.requestPar.pageSize,
                                onChange: (a, b) => {
                                    let obj = this.state.requestPar;
                                    obj.current = a;
                                    this.setState({requestPar: obj}, () => {
                                        this.getPlanList();
                                    })
                                },
                                showTotal: (total, range) => `共有${total}条`
                            }
                        }
                    />
                </Card>
            }
        </div>
    }

    checkValidator(type, rule, value, callback){
        const numAndLet = /^[0-9a-zA-Z]+$/;
        switch (type + '') {
            case '0':
                if(value && !numAndLet.test(value)){
                    callback('渠道编码只能是数字或者字母！');
                    return false;
                }
                callback();
                break;
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({loading: true});
        if(this.id){
            checkName.push('status');
        }
        const {validateFields} = this.formRef.current;
        validateFields(checkName).then((err, values) => {

            if(this.id){
                if('2'=== '' + values.status){
                    if(this.state.planList.length <= 0){
                        message.error('开启状态下的渠道没有关联支付方案，请先前往关联支付方案！');
                        this.setState({loading: false});
                        return false;
                    }
                    if(!this.state.onPlanData.planId){
                        message.error('支付渠道为开启状态下的必须选择一个支付方案！');
                        this.setState({loading: false});
                        return false;
                    }
                }
                values.channelId = this.id;
                values.planId = this.state.onPlanData.planId || '';
            }
            Model.walletPCSave(values, (res) => {
                message.success('保存成功！', 1);
                setTimeout(() => {
                    this.props.history.push('/Pages/APChannelList');
                }, 1000);
            }, (err) => {this.setState({loading: false});});

        }).catch(()=>{
            this.setState({loading: false});
        });
    }
}

export default APChannelEdit
