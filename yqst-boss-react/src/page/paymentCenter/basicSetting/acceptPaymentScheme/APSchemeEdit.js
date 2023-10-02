/**
 * Created by yb on 2019/09/17.
 */

import React, {Component} from 'react';
import {Form, Button, Modal, Card, Input, Radio, message} from 'antd';
import {Link} from "react-router-dom";
import Model from "../../Model";
import moment from 'moment'
import SWTable from 'SWViews/table';
import SwitchNames from "./SwitchNames";
import AssemblySet from "../../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../../baseview/viewContent/ViewContent";
import HeadSearch from "../../../../baseview/headSearch/HeadSearch";
import {RollbackOutlined, CheckOutlined} from "@ant-design/icons";


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
const checkName = [];
let crumb = [
    {name: '支付中心'},
    {name: "基础设置"},
    {name: "收支付方案列表", link: '/Pages/APSchemeList'},
    {name: '新建收支付方案'}
];


class APSchemeEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            chaVisible: false,
            chaList: [],
            chaTotal: 0,
            requestPar: {
                current: 1,
                pageSize: 10,
                keyWord: '',
                status: 1,
                sortType: 2,
            },
            rowChannel: {
                channelId: '',
                channelName: '',
            },
            payMin: '',
            payMax: '',
            refundMin: '',
            refundMax: '',
            id1: '',
            type1: '',
            rateValue1: '',
            rateMin1: '',
            rateMax1: '',
            id2: '',
            type2: '',
            rateValue2: '',
            rateMin2: '',
            rateMax2: '',
            id3: '',
            type3: '',
            rateValue3: '',
            rateMin3: '',
            rateMax3: '',
            loading: false,
        };
        this.id = '';
        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.id = this.props.location.search.substr(1).split("=")[1];
        if (this.id) {
            this.getInfo();
            crumb = [
                {name: '支付中心'},
                {name: "基础设置"},
                {name: "收支付方案列表", link: '/Pages/APSchemeList'},
                {name: "收支付方案详情", link: `/Pages/APSchemeDetail?id=${this.id}`},
                {name: '新建收支付方案'}
            ];
        }
    }

    // 视图层
    render() {
        return (
            <Form autoComplete="off" onSubmit={this.handleSubmit}>
                <ViewContent
                    crumb={crumb}
                    topBtn={
                        <div>
                            <Button htmlType="submit" type="primary" icon={<CheckOutlined/>}
                                    loading={this.state.loading}>保存</Button>
                            <Link to={!this.id ? `/Pages/APSchemeList` : `/Pages/APSchemeDetail?id=${this.id}`}
                                  style={{marginLeft: 15}}>
                                <Button icon={<RollbackOutlined/>}>取消</Button>
                            </Link>
                        </div>
                    }
                >
                    {this.makeBaseView()}
                    {this.makeChannelView()}
                </ViewContent>
            </Form>
        );
    }

    getInfo() {
        Model.walletPPGet({planId: this.id}, (res) => {
            this.state.rowChannel.channelId = res.data.channelId;
            this.state.rowChannel.channelName = res.data.channelName;
            this.state.payMin = res.data.payMin;
            this.state.payMax = res.data.payMax;
            this.state.refundMin = res.data.refundMin;
            this.state.refundMax = res.data.refundMax;
            res.data.rateListVO && res.data.rateListVO.forEach(item => {
                switch ('' + item.type) {
                    case '1':
                        this.state.id1 = item.id;
                        this.state.rateType1 = item.rateType;
                        this.state.rateValue1 = item.rateValue;
                        this.state.rateMin1 = item.rateMin;
                        this.state.rateMax1 = item.rateMax;
                        break;

                    case '2':
                        this.state.id2 = item.id;
                        this.state.rateType2 = item.rateType;
                        this.state.rateValue2 = item.rateValue;
                        this.state.rateMin2 = item.rateMin;
                        this.state.rateMax2 = item.rateMax;
                        break;

                    case '3':
                        this.state.id3 = item.id;
                        this.state.rateType3 = item.rateType;
                        this.state.rateValue3 = item.rateValue;
                        this.state.rateMin3 = item.rateMin;
                        this.state.rateMax3 = item.rateMax;
                        break;
                }
            });

            this.setState({
                data: res.data,
                rowChannel: this.state.rowChannel,
                payMin: this.state.payMin,
                payMax: this.state.payMax,
                refundMin: this.state.refundMin,
                refundMax: this.state.refundMax,
                id1: this.state.id1,
                rateType1: this.state.rateType1,
                rateValue1: this.state.rateValue1,
                rateMin1: this.state.rateMin1,
                rateMax1: this.state.rateMax1,

                id2: this.state.id2,
                rateType2: this.state.rateType2,
                rateValue2: this.state.rateValue2,
                rateMin2: this.state.rateMin2,
                rateMax2: this.state.rateMax2,

                id3: this.state.id3,
                rateType3: this.state.rateType3,
                rateValue3: this.state.rateValue3,
                rateMin3: this.state.rateMin3,
                rateMax3: this.state.rateMax3,
                loading: false
            }, () => {
                this.formRef.current.resetFields();
                this.formRef.current.setFieldsValue({
                    isPayLimit: this.state.data.isPayLimit + '',
                    isRefundLimit: this.state.data.isRefundLimit + ''
                });
            });
        }, (err) => {
        });
    }

    getChaList() {
        Model.walletPCPage(this.state.requestPar, (res) => {
            this.state.chaTotal = res.data.total || 0;
            const newList = res.data.records && res.data.records.map((item, idx) => {
                item.isChecked = false;
                if (this.state.rowChannel.channelId == item.channelId) {
                    item.isChecked = true;
                }
                return item
            });

            this.setState({
                chaList: newList || [],
                chaTotal: this.state.total,
                chaVisible: true
            })
        }, (err) => {
        })
    }

    makeBaseView() {
        let {data} = this.state;
        let allData = [
            {
                title: '基本信息',
                key: 'JBKey',
                data: [
                    this.id ? {
                        key: 'planId',
                        type: 'Texts',
                        label: '收支付方案ID',
                        span: 12,
                        formItemLayout,
                        value: data.planId
                    } : {},
                    this.id ? {
                        key: 'createTime', type: 'Texts', label: '创建时间', span: 12, formItemLayout,
                        value: data.createTime ? moment(data.createTime).format('YYYY-MM-DD HH:mm:ss') : ''
                    } : {},
                    {
                        key: 'channelName',
                        type: 'Custom',
                        span: 12,
                        formItemLayout,
                        placeholder: '请选择收支付渠道名称',
                        label: '收支付渠道名称',
                        options: {
                            rules: [{
                                required: true, message: '收支付渠道名称不能为空',
                            }],
                        },
                        value: this.state.rowChannel.channelName,
                        view: <Input placeholder="点击选择" readOnly={true}
                                     value={this.state.rowChannel.channelName}
                                     onClick={() => {
                                         this.getChaList();
                                     }}
                        />
                    },
                    {
                        key: 'channelId',
                        type: 'Input',
                        span: 12,
                        value: this.state.rowChannel.channelId,
                        formItemLayout,
                        placeholder: '渠道ID由选中渠道后自动带出',
                        label: '收支付渠道ID',
                        options: {
                            rules: [{
                                required: false, message: '收支付渠道ID不能为空',
                            }],
                        },
                        attribute: {
                            disabled: true
                        }
                    },
                    {
                        key: 'planSn',
                        type: 'Input',
                        span: 12,
                        value: data.planSn,
                        formItemLayout,
                        placeholder: '请填写方案编码',
                        label: '方案编码',
                        options: {
                            rules: [{
                                required: true, message: '方案编码不能为空',
                            }, {
                                validator: (rule, value, callback) => this.checkValidator('0', rule, value, callback)
                            }],
                        },
                        attribute: {
                            maxLength: 50
                        }
                    },
                    {
                        key: 'planName',
                        type: 'Input',
                        span: 12,
                        value: data.planName,
                        formItemLayout,
                        placeholder: '请填写收支付方案名称',
                        label: '收支付方案名称',
                        options: {
                            rules: [{
                                required: true, message: '收支付方案名称不能为空',
                            }],
                        },
                        attribute: {
                            maxLength: 50
                        }
                    },
                    {
                        key: 'planDesc',
                        type: 'Input',
                        value: data.planDesc,
                        formItemLayout,
                        label: '方案描述',
                        placeholder: '请填写方案描述',
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
                title: '限额设置',
                key: 'SZKey',
                data: [
                    {
                        key: 'isPayLimit',
                        type: 'Radio',
                        value: data.isPayLimit || '',
                        label: '收支付金额限额',
                        span: 24,
                        formItemLayout: {
                            labelCol: {
                                xs: {span: 24},
                                sm: {span: 4},
                            },
                            wrapperCol: {
                                xs: {span: 24},
                                sm: {span: 20},
                            },
                        },
                        options: {
                            rules: [{
                                required: true, message: '收支付金额限额不能为空',
                            }],
                        },
                        data: {
                            list: [
                                {value: '1', name: '是'},
                                {value: '0', name: '否'},
                            ],
                        },
                        attribute: {
                            onChange: (e) => {
                                if (!this.state.payMin && !this.state.payMax) {
                                    this.formRef.current.resetFields(['payMinAndPayMax']);
                                }
                                if (e.target.value == 0) {
                                    this.setState({payMin: '', payMax: ''});
                                }
                            }
                        }
                    },
                    {
                        key: 'payMinAndPayMax', type: 'Custom', span: 24, label: '限额范围',
                        formItemLayout: {
                            labelCol: {
                                xs: {span: 24},
                                sm: {span: 4},
                            },
                            wrapperCol: {
                                xs: {span: 24},
                                sm: {span: 20},
                            },
                        },
                        options: {
                            rules: [{
                                required: '' + this.formRef.current.getFieldValue('isPayLimit') === '1',
                                message: '限额范围不能都为空',
                            }, {
                                validator: (rule, value, callback) => this.checkValidator('1', rule, value, callback)
                            }],
                        },
                        value: this.state.payMin || this.state.payMax,
                        view: <div>
                            <Input style={{width: 300}} placeholder="请填写（为空则无限制）"
                                   disabled={'' + this.formRef.current.getFieldValue('isPayLimit') === '0'}
                                   value={this.state.payMin}
                                   onChange={(e) => {
                                       this.setState({payMin: e.target.value}, () => {
                                           this.formRef.current.setFieldsValue({payMinAndPayMax: this.state.payMin || this.state.payMax});
                                       });
                                   }}
                            />
                            <span style={{margin: '0 10px '}}>~</span>
                            <Input style={{width: 300}} placeholder="请填写（为空则无限制）"
                                   disabled={'' + this.formRef.current.getFieldValue('isPayLimit') === '0'}
                                   value={this.state.payMax}
                                   onChange={(e) => {
                                       this.setState({payMax: e.target.value}, () => {
                                           this.formRef.current.setFieldsValue({payMinAndPayMax: this.state.payMin || this.state.payMax});
                                       });
                                   }}
                            />
                        </div>
                    },

                    {
                        key: 'isRefundLimit',
                        type: 'Radio',
                        value: data.isRefundLimit || '',
                        label: '退款金额限额',
                        span: 24,
                        formItemLayout: {
                            labelCol: {
                                xs: {span: 24},
                                sm: {span: 4},
                            },
                            wrapperCol: {
                                xs: {span: 24},
                                sm: {span: 20},
                            },
                        },
                        options: {
                            rules: [{
                                required: true, message: '退款金额限额不能为空',
                            }],
                        },
                        data: {
                            list: [
                                {value: '1', name: '是'},
                                {value: '0', name: '否'},
                            ],
                        },
                        attribute: {
                            onChange: (e) => {
                                if (!this.state.refundMin && !this.state.refundMax) {
                                    this.formRef.current.resetFields(['refundMinAndRefundMax']);
                                }
                                if (e.target.value == 0) {
                                    this.setState({refundMin: '', refundMax: ''});
                                }
                            }
                        }
                    },
                    {
                        key: 'refundMinAndRefundMax', type: 'Custom', span: 24, label: '限额范围',
                        formItemLayout: {
                            labelCol: {
                                xs: {span: 24},
                                sm: {span: 4},
                            },
                            wrapperCol: {
                                xs: {span: 24},
                                sm: {span: 20},
                            },
                        },
                        options: {
                            rules: [{
                                required: '' + this.formRef.current.getFieldValue('isRefundLimit') === '1',
                                message: '限额范围不能都为空',
                            }, {
                                validator: (rule, value, callback) => this.checkValidator('2', rule, value, callback)
                            }],
                        },
                        value: this.state.refundMin || this.state.refundMax,
                        view: <div>
                            <Input style={{width: 300}} placeholder="请填写（为空则无限制）"
                                   disabled={'' + this.formRef.current.getFieldValue('isRefundLimit') === '0'}
                                   value={this.state.refundMin}
                                   onChange={(e) => {
                                       this.setState({refundMin: e.target.value}, () => {
                                           this.formRef.current.setFieldsValue({refundMinAndRefundMax: this.state.refundMin || this.state.refundMax});
                                       });
                                   }}
                            />
                            <span style={{margin: '0 10px '}}>~</span>
                            <Input style={{width: 300}} placeholder="请填写（为空则无限制）"
                                   disabled={'' + this.formRef.current.getFieldValue('isRefundLimit') === '0'}
                                   value={this.state.refundMax}
                                   onChange={(e) => {
                                       this.setState({refundMax: e.target.value}, () => {
                                           this.formRef.current.setFieldsValue({refundMinAndRefundMax: this.state.refundMin || this.state.refundMax});
                                       });
                                   }}
                            />
                        </div>
                    },
                ],
                style: {
                    marginTop: 15
                },
            },
            {
                title: '手续费设置',
                key: 'SXFKey',
                data: [
                    {
                        key: 'type1',
                        type: 'Radio',
                        value: this.state.rateType1 || '',
                        label: '付款手续费',
                        span: 24,
                        formItemLayout: {
                            labelCol: {
                                xs: {span: 24},
                                sm: {span: 4},
                            },
                            wrapperCol: {
                                xs: {span: 24},
                                sm: {span: 20},
                            },
                        },
                        options: {
                            rules: [{
                                required: true, message: '付款手续费不能为空',
                            }],
                        },
                        data: {
                            list: [
                                {value: '1', name: '按笔收费'},
                                {value: '2', name: '按金额*费率收费'},
                            ],
                        },
                        attribute: {
                            onChange: (e) => {
                                this.formRef.current.setFieldsValue({rateValue1: ''});
                            }
                        }
                    },
                    {
                        key: 'rateValue1', type: 'Input', span: 8, value: this.state.rateValue1,
                        placeholder: '请填写(>=0)',
                        label: '' + this.formRef.current.getFieldValue('type1') === '1' ? '单笔费用' : '费率',
                        formItemLayout: {
                            labelCol: {
                                xs: {span: 24},
                                sm: {span: 12},
                            },
                            wrapperCol: {
                                xs: {span: 24},
                                sm: {span: 12},
                            },
                        },
                        options: {
                            rules: [{
                                required: true,
                                message: '' + this.formRef.current.getFieldValue('type1') === '1' ? '单笔费用不能为空' : '费率不能为空',
                            }, {
                                validator: (rule, value, callback) => '' + this.formRef.current.getFieldValue('type1') === '1' ?
                                    this.checkValidator('3', rule, value, callback) : this.checkValidator('4', rule, value, callback)
                            }],
                        },
                        attribute: {
                            maxLength: 50
                        }
                    },
                    {
                        key: 'rateMinAndRateMax1', type: 'Custom', span: 16, label: '起算范围',
                        formItemLayout: {
                            labelCol: {
                                xs: {span: 24},
                                sm: {span: 4},
                            },
                            wrapperCol: {
                                xs: {span: 24},
                                sm: {span: 20},
                            },
                        },
                        options: {
                            rules: [{
                                required: true, message: '起算范围不能全为空',
                            }, {
                                validator: (rule, value, callback) => this.checkValidator('5', rule, value, callback)
                            }],
                        },
                        value: this.state.rateMin1 || this.state.rateMax1,
                        view: <div>
                            <Input style={{width: '40%'}} placeholder="请填写（为空则无限制）"
                                   value={this.state.rateMin1}
                                   onChange={(e) => {
                                       this.setState({rateMin1: e.target.value}, () => {
                                           this.formRef.current.setFieldsValue({rateMinAndRateMax1: this.state.rateMin1 || this.state.rateMax1});
                                       });
                                   }}
                            />
                            <span style={{margin: '0 10px '}}>~</span>
                            <Input style={{width: '40%'}} placeholder="请填写（为空则无限制）"
                                   value={this.state.rateMax1}
                                   onChange={(e) => {
                                       this.setState({rateMax1: e.target.value}, () => {
                                           this.formRef.current.setFieldsValue({rateMinAndRateMax1: this.state.rateMin1 || this.state.rateMax1});
                                       });
                                   }}
                            />
                        </div>
                    },

                    {
                        key: 'type2',
                        type: 'Radio',
                        value: this.state.rateType2 || '',
                        label: '收款手续费',
                        placeholder: '请选择收款手续费',
                        span: 24,
                        formItemLayout: {
                            labelCol: {
                                xs: {span: 24},
                                sm: {span: 4},
                            },
                            wrapperCol: {
                                xs: {span: 24},
                                sm: {span: 20},
                            },
                        },
                        options: {
                            rules: [{
                                required: true, message: '收款手续费不能为空',
                            }],
                        },
                        data: {
                            list: [
                                {value: '1', name: '按笔收费'},
                                {value: '2', name: '按金额 * 费率收费'},
                            ],
                        },
                        attribute: {
                            onChange: (e) => {
                                this.formRef.current.setFieldsValue({rateValue2: ''});
                            }
                        }
                    },
                    {
                        key: 'rateValue2', type: 'Input', span: 8, value: this.state.rateValue2,
                        placeholder: '请填写(>=0)',
                        label: '' + this.formRef.current.getFieldValue('type2') === '1' ? '单笔费用' : '费率',
                        formItemLayout: {
                            labelCol: {
                                xs: {span: 24},
                                sm: {span: 12},
                            },
                            wrapperCol: {
                                xs: {span: 24},
                                sm: {span: 12},
                            },
                        },
                        options: {
                            rules: [{
                                required: true,
                                message: '' + this.formRef.current.getFieldValue('type2') === '1' ? '单笔费用不能为空' : '费率不能为空',
                            }, {
                                validator: (rule, value, callback) => '' + this.formRef.current.getFieldValue('type2') === '1' ?
                                    this.checkValidator('3', rule, value, callback) : this.checkValidator('4', rule, value, callback)
                            }],
                        },
                        attribute: {
                            maxLength: 50
                        }
                    },
                    {
                        key: 'rateMinAndRateMax2', type: 'Custom', span: 16, label: '起算范围',
                        formItemLayout: {
                            labelCol: {
                                xs: {span: 24},
                                sm: {span: 4},
                            },
                            wrapperCol: {
                                xs: {span: 24},
                                sm: {span: 20},
                            },
                        },
                        options: {
                            rules: [{
                                required: true, message: '起算范围不能全为空',
                            }, {
                                validator: (rule, value, callback) => this.checkValidator('6', rule, value, callback)
                            }],
                        },
                        value: this.state.rateMin2 || this.state.rateMax2,
                        view: <div>
                            <Input style={{width: '40%'}} placeholder="请填写（为空则无限制）"
                                   value={this.state.rateMin2}
                                   onChange={(e) => {
                                       this.setState({rateMin2: e.target.value}, () => {
                                           this.formRef.current.setFieldsValue({rateMinAndRateMax2: this.state.rateMin2 || this.state.rateMax2});
                                       });
                                   }}
                            />
                            <span style={{margin: '0 10px '}}>~</span>
                            <Input style={{width: '40%'}} placeholder="请填写（为空则无限制）"
                                   value={this.state.rateMax2}
                                   onChange={(e) => {
                                       this.setState({rateMax2: e.target.value}, () => {
                                           this.formRef.current.setFieldsValue({rateMinAndRateMax2: this.state.rateMin2 || this.state.rateMax2});
                                       });
                                   }}
                            />
                        </div>
                    },

                    {
                        key: 'type3',
                        type: 'Radio',
                        value: this.state.rateType3 || '',
                        label: '退款手续费',
                        placeholder: '请选择退款手续费',
                        span: 24,
                        formItemLayout: {
                            labelCol: {
                                xs: {span: 24},
                                sm: {span: 4},
                            },
                            wrapperCol: {
                                xs: {span: 24},
                                sm: {span: 20},
                            },
                        },
                        options: {
                            rules: [{
                                required: true, message: '退款手续费不能为空',
                            }],
                        },
                        data: {
                            list: [
                                {value: '1', name: '按笔收费'},
                                {value: '2', name: '按金额 * 费率收费'},
                            ],
                        },
                        attribute: {
                            onChange: (e) => {
                                this.formRef.current.setFieldsValue({rateValue3: ''});
                            }
                        }
                    },
                    {
                        key: 'rateValue3', type: 'Input', span: 8, value: this.state.rateValue3,
                        placeholder: '请填写(>=0)',
                        label: '' + this.formRef.current.getFieldValue('type3') === '1' ? '单笔费用' : '费率',
                        formItemLayout: {
                            labelCol: {
                                xs: {span: 24},
                                sm: {span: 12},
                            },
                            wrapperCol: {
                                xs: {span: 24},
                                sm: {span: 12},
                            },
                        },
                        options: {
                            rules: [{
                                required: true,
                                message: '' + this.formRef.current.getFieldValue('type3') === '1' ? '单笔费用不能为空' : '费率不能为空',
                            }, {
                                validator: (rule, value, callback) => '' + this.formRef.current.getFieldValue('type3') === '1' ?
                                    this.checkValidator('3', rule, value, callback) : this.checkValidator('4', rule, value, callback)
                            }],
                        },
                        attribute: {
                            maxLength: 50
                        }
                    },
                    {
                        key: 'rateMinAndRateMax3', type: 'Custom', span: 16, label: '单笔费用',
                        formItemLayout: {
                            labelCol: {
                                xs: {span: 24},
                                sm: {span: 4},
                            },
                            wrapperCol: {
                                xs: {span: 24},
                                sm: {span: 20},
                            },
                        },
                        options: {
                            rules: [{
                                required: true, message: '起算范围不能全为空',
                            }, {
                                validator: (rule, value, callback) => this.checkValidator('7', rule, value, callback)
                            }],
                        },
                        value: this.state.rateMin3 || this.state.rateMax3,
                        view: <div>
                            <Input style={{width: '40%'}} placeholder="请填写（为空则无限制）"
                                   value={this.state.rateMin3}
                                   onChange={(e) => {
                                       this.setState({rateMin3: e.target.value}, () => {
                                           this.formRef.current.setFieldsValue({rateMinAndRateMax3: this.state.rateMin3 || this.state.rateMax3});
                                       });
                                   }}
                            />
                            <span style={{margin: '0 10px '}}>~</span>
                            <Input style={{width: '40%'}} placeholder="请填写（为空则无限制）"
                                   value={this.state.rateMax3}
                                   onChange={(e) => {
                                       this.setState({rateMax3: e.target.value}, () => {
                                           this.formRef.current.setFieldsValue({rateMinAndRateMax3: this.state.rateMin3 || this.state.rateMax3});
                                       });
                                   }}
                            />
                        </div>
                    },
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
        </div>
    }

    makeChannelView() {
        const columns = [
            {
                title: '',
                key: '',
                dataIndex: '',
                width: 60,
                render: (res) => {
                    return <Radio checked={res.isChecked}/>
                }
            },
            {
                title: '渠道ID',
                key: 'channelId',
                dataIndex: 'channelId',
            },
            {
                title: '渠道名称',
                key: 'channelName',
                dataIndex: 'channelName',
            },
            {
                title: '描述',
                key: 'desc',
                dataIndex: 'desc',
                width: 200
            },
            {
                title: '收支付类型',
                key: 'payType',
                dataIndex: 'payType',
                render: (res) => {
                    return SwitchNames.payTypeName(res);
                }
            },
            {
                title: '状态',
                key: 'status',
                dataIndex: 'status',
                render: (res) => {
                    return <span style={{color: SwitchNames.chaStatusName(res, 'color')}}>
                        {SwitchNames.chaStatusName(res)}
                    </span>
                }
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
        ];
        return <Modal
            title="选择收支付渠道"
            width={900}
            visible={this.state.chaVisible}
            onOk={() => {
                this.state.chaList.forEach(item => {
                    if (item.isChecked) {
                        this.setState({rowChannel: item, chaVisible: false}, () => {
                            this.formRef.current.setFieldsValue({
                                channelName: item.channelName,
                                channelId: item.channelId
                            });
                        });
                        return false;
                    }
                });
            }}
            onCancel={() => {
                this.setState({chaVisible: false});
            }}
        >
            {this.makeHeadSearch()}
            <SWTable
                columns={columns}
                dataSource={this.state.chaList}
                onRow={(record, idx) => {
                    return {
                        onClick: (event) => {
                            this.state.chaList.forEach(item => {
                                item.isChecked = false;
                                if (record.channelId == item.channelId) {
                                    item.isChecked = !item.isChecked;
                                }
                            });
                            this.setState({chaList: this.state.chaList});
                        }
                    }
                }}
                pagination={
                    {
                        total: this.state.chaTotal,
                        current: this.state.requestPar.current,
                        pageSize: this.state.requestPar.pageSize,
                        onChange: (a, b) => {
                            let obj = this.state.requestPar;
                            obj.current = a;
                            this.setState({requestPar: obj}, () => {
                                this.getChaList();
                            })
                        },
                        showTotal: (total, range) => `共有${total}条`
                    }
                }
            />
        </Modal>
    }

    makeHeadSearch() {
        const searchDatas = [
            {key: 'keyWord', type: 'Input', value: '', placeholder: '可查询渠道ID、渠道名称', label: '关键字', maxLength: 30},
        ];
        return <HeadSearch data={searchDatas} colSpan={20} callBack={(obj) => {
            this.setState({
                requestPar: {
                    ...this.state.requestPar,
                    ...obj
                }
            }, () => {
                this.getChaList();
            });
        }}/>
    }

    checkValidator(type, rule, value, callback) {
        const reg = /^\d{0,8}\.{0,1}(\d{1,2})?$/;
        const numAndLet = /^[0-9a-zA-Z]+$/;
        const regDian = /\.$/;
        switch (type + '') {
            case '0':
                if (value && !numAndLet.test(value)) {
                    callback('方案编码只能是数字或者字母！');
                    return false;
                }
                callback();
                break;

            case '1': // 校验收支付金额限额
                if (value) {
                    if (this.state.payMin && (!reg.test(this.state.payMin) || regDian.test(this.state.payMin))) {
                        callback('限额只能是最多两位小数的数字，或者格式有误！');
                        return false;

                    } else if (this.state.payMax && (!reg.test(this.state.payMax) || regDian.test(this.state.payMax))) {
                        callback('限额只能是最多两位小数的数字，或者格式有误！');
                        return false;

                    }
                }
                callback();
                break;

            case '2': // 校验退款金额限额
                if (value) {
                    if (this.state.refundMin && (!reg.test(this.state.refundMin) || regDian.test(this.state.refundMin))) {
                        callback('限额只能是最多两位小数的数字，或者格式有误！');
                        return false;

                    } else if (this.state.refundMax && (!reg.test(this.state.refundMax) || regDian.test(this.state.refundMax))) {
                        callback('限额只能是最多两位小数的数字，或者格式有误！');
                        return false;

                    }
                }
                callback();
                break;

            case '3': // 付款手续费_单笔费用
                if (value && (!reg.test(value) || regDian.test(value))) {
                    callback('单笔费用只能是最多两位小数的数字，或者格式有误！');
                    return false;
                }
                callback();
                break;

            case '4': // 付款手续费_单笔费用
                if (value && (!reg.test(value) || regDian.test(value) || value > 100)) {
                    callback('费率只能是不大于100且最多两位小数的数字；或者格式有误！');
                    return false;
                }
                callback();
                break;

            case '5': // 付款手续费_范围
                if (value) {
                    if (this.state.rateMin1 && (!reg.test(this.state.rateMin1) || regDian.test(this.state.rateMin1))) {
                        callback('范围只能是最多两位小数的数字，或者格式有误！');
                        return false;

                    } else if (this.state.rateMax1 && (!reg.test(this.state.rateMax1) || regDian.test(this.state.rateMax1))) {
                        callback('限额只能是最多两位小数的数字，或者格式有误！');
                        return false;

                    }
                }
                callback();
                break;

            case '6': // 收款手续费_范围
                if (value) {
                    if (this.state.rateMin2 && (!reg.test(this.state.rateMin2) || regDian.test(this.state.rateMin2))) {
                        callback('范围只能是最多两位小数的数字，或者格式有误！');
                        return false;

                    } else if (this.state.rateMax2 && (!reg.test(this.state.rateMax2) || regDian.test(this.state.rateMax2))) {
                        callback('限额只能是最多两位小数的数字，或者格式有误！');
                        return false;

                    }
                }
                callback();
                break;

            case '7': // 退款手续费_范围
                if (value) {
                    if (this.state.rateMin3 && (!reg.test(this.state.rateMin3) || regDian.test(this.state.rateMin3))) {
                        callback('范围只能是最多两位小数的数字，或者格式有误！');
                        return false;

                    } else if (this.state.rateMax3 && (!reg.test(this.state.rateMax3) || regDian.test(this.state.rateMax3))) {
                        callback('限额只能是最多两位小数的数字，或者格式有误！');
                        return false;

                    }
                }
                callback();
                break;
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({loading: true});
        this.formRef.current.validateFields().then((err, values) => {
            let obj = {};
            obj.channelId = this.state.rowChannel.channelId;
            obj.channelName = this.state.rowChannel.channelName;
            obj.planSn = values.planSn;
            obj.planName = values.planName;
            obj.planDesc = values.planDesc;
            obj.isPayLimit = values.isPayLimit;
            obj.payMin = this.state.payMin;
            obj.payMax = this.state.payMax;
            obj.isRefundLimit = values.isRefundLimit;
            obj.refundMin = this.state.refundMin;
            obj.refundMax = this.state.refundMax;
            obj.planRate = [
                {
                    type: 1,
                    rateType: values.type1,
                    rateValue: values.rateValue1,
                    rateMin: this.state.rateMin1,
                    rateMax: this.state.rateMax1,
                },
                {
                    type: 2,
                    rateType: values.type2,
                    rateValue: values.rateValue2,
                    rateMin: this.state.rateMin2,
                    rateMax: this.state.rateMax2,
                },
                {
                    type: 3,
                    rateType: values.type3,
                    rateValue: values.rateValue3,
                    rateMin: this.state.rateMin3,
                    rateMax: this.state.rateMax3,
                },
            ];
            if (this.id) {
                obj.planId = this.id;
                obj.planRate[0].id = this.state.id1;
                obj.planRate[1].id = this.state.id2;
                obj.planRate[2].id = this.state.id3;
            }

            Model.walletPPSave({planMessage: JSON.stringify(obj)}, (res) => {
                message.success('保存成功！', 1);
                setTimeout(() => {
                    this.props.history.push('/Pages/APSchemeList');
                }, 1000);
            }, (err) => {
                this.setState({loading: false});
            });
        }).catch(() => {
            this.setState({loading: false});
        });
    }
}

export default APSchemeEdit
