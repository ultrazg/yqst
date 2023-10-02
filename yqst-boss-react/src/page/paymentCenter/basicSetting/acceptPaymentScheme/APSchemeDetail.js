/**
 * Created by yb on 2019/09/17.
 */

import React, {Component} from 'react';
import {Form, Button, Modal, Card, Timeline, message} from 'antd';
import {EditOutlined, DeleteOutlined, RollbackOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import Model from "../../Model";
import moment from 'moment';
import AssemblySet from "../../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../../baseview/viewContent/ViewContent";
import NumberFormat from "../../../../utils/numberformat/NumberFormat";

const { confirm } = Modal;
const baseRateListVO = [
    {
        id: 1,
        type: 1, // 1：付款手续费，2：收款手续费，3：退款手续费
        rateType: 1, // 1：按笔收费，2：按金额*费率收费
        rateValue: '',
        rateMin: '',
        rateMax: '',
    },
    {
        id: 2,
        type: 2,
        rateType: 1,
        rateValue: '',
        rateMin: '',
        rateMax: '',
    },
    {
        id: 3,
        type: 3,
        rateType: 1,
        rateValue: '',
        rateMin: '',
        rateMax: '',
    },
]


class APSchemeDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                rateListVO: baseRateListVO,
            },
            logList: [],
        };
        this.id = '';
        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.id = this.props.location.search.substr(1).split("=")[1];
        if (this.id) {
            this.getInfo();
            this.getLogList();
        }
    }

    // 视图层
    render() {
        return (
            <Form ref={this.formRef}>
                <ViewContent
                    crumb={[
                        {name: '支付中心'},
                        {name: "基础设置"},
                        {name: "收支付方案列表", link: '/Pages/APSchemeList'},
                        {name: "收支付方案详情"}
                    ]}
                    topBtn = {
                        <div>
                            <Link to={`/Pages/APSchemeEdit?id=${this.id}`} style={{marginLeft: 15}}>
                                <Button type="primary" icon={<EditOutlined />}>编辑</Button>
                            </Link>
                            <Button type="danger" icon={<DeleteOutlined />} style={{marginLeft: 15}}
                                    onClick={() => {
                                        this.delData();
                                    }}
                            >删除</Button>
                            <Link to={'/Pages/APSchemeList'} style={{marginLeft: 15}}>
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
        Model.walletPPGet({planId: this.id}, (res) => {
            this.setState({data: res.data});
        }, (err) => {
        });
    }

    getLogList() {
        Model.walletPSALList({id: this.id, type: 2}, (res) => {
            this.setState({logList: res.data || []});
        }, (err) => {
        });
    }

    makeBaseView() {
        let {data} = this.state;
        let {rateListVO} = data, sxData = [];
        if(!rateListVO || rateListVO.length <= 0){
            rateListVO = baseRateListVO;
        }
        rateListVO.forEach(item => {
            switch (item.type + '') {
                case '1':
                    sxData.push(
                        {key: 'sxTexts', type: 'Texts', label: '付款手续费', span: 8,
                            value: '1' === '' + item.rateType ? '按笔收费' : '按金额 * 费率收费'},
                        {key: 'rateValue1', type: 'Texts', span: 8,
                            label: '1' === '' + item.rateType ? '单笔费用' : '费率',
                            value: '1' === '' + item.rateType ? NumberFormat.thousandBit(item.rateValue || 0, 2, true) : item.rateValue + ' %'
                        },
                        {key: 'qxTexts1', type: 'Texts', label: '起算范围', span: 8, value: item.rateMin + ' ~ ' + item.rateMax},
                    );
                    break;

                case '2':
                    sxData.push(
                        {key: 'skTexts', type: 'Texts', label: '收款手续费', span: 8,
                            value: '1' === '' + item.rateType ? '按笔收费' : '按金额 * 费率收费'},
                        {key: 'rateValue2', type: 'Texts', span: 8,
                            label: '1' === '' + item.rateType ? '单笔费用' : '费率',
                            value: '1' === '' + item.rateType ? NumberFormat.thousandBit(item.rateValue || 0, 2, true) : item.rateValue + ' %'},
                        {key: 'qxTexts2', type: 'Texts', label: '起算范围', span: 8, value: item.rateMin + ' ~ ' + item.rateMax},
                    );
                    break;

                case '3':
                    sxData.push(
                        {key: 'tkTexts', type: 'Texts', label: '退款手续费', span: 8,
                            value: '1' === '' + item.rateType ? '按笔收费' : '按金额 * 费率收费'},
                        {key: 'rateValue3', type: 'Texts', span: 8,
                            label: '1' === '' + item.rateType ? '单笔费用' : '费率',
                            value: '1' === '' + item.rateType ? NumberFormat.thousandBit(item.rateValue || 0, 2, true) : item.rateValue + ' %'},
                        {key: 'qxTexts3', type: 'Texts', label: '起算范围', span: 8, value: item.rateMin + ' ~ ' + item.rateMax},
                    );
                    break;
                default:
                    break;
            }
        });

        let allData = [
            {
                title: '基本信息',
                key: 'JBKey',
                data: [
                    {key: 'planId', type: 'Texts', label: '方案ID', span: 12, value: data.planId},
                    // {key: 'status', type: 'Texts', label: '状态', span: 12,
                    //     value: <span style={{color: SwitchNames.statusName(data.status, 'color')}}>
                    //     {SwitchNames.statusName(data.status)}
                    // </span>},
                    {key: 'createTime', type: 'Texts', label: '创建时间', span: 12,
                        value: data.createTime ? moment(data.createTime).format('YYYY-MM-DD HH:mm:ss') : ''},
                    {key: 'planSn', type: 'Texts', label: '方案编码', span: 12, value: data.planSn},
                    {key: 'channelId', type: 'Texts', label: '渠道ID', span: 12, value: data.channelId},
                    {key: 'channelName', type: 'Texts', label: '渠道名称', span: 12, value: data.channelName},
                    {key: 'planName', type: 'Texts', label: '方案名称', span: 12, value: data.planName},
                    {key: 'planDesc', type: 'Texts', label: '方案描述', span: 12, value: data.planDesc},
                ],
                style: {},
            },
            {
                title: '限额设置',
                key: 'XEKey',
                data: [
                    {key: 'isPayLimit', type: 'Texts', label: '是否收支付金额限额', span: 12,
                        value: '' + data.isPayLimit === '1' ? '是' : '否'},
                    {key: 'fwTexts', type: 'Texts', label: '限额范围', span: 12,
                        value: '' + data.isPayLimit === '1' ? data.payMin + ' ~ ' + data.payMax : '无范围'},
                    {key: 'isRefundLimit', type: 'Texts', label: '退款金额限额', span: 12,
                        value: '' + data.isRefundLimit === '1' ? '是' : '否'},
                    {key: 'fwTexts', type: 'Texts', label: '限额范围', span: 12,
                        value: '' + data.isRefundLimit === '1' ? data.refundMin + ' ~ ' + data.refundMax : '无范围'},
                ],
                style: {
                    marginTop: 15
                },
            },
            {
                title: '手续费设置',
                key: 'SXFKey',
                data: sxData,
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
                        this.state.logList.map((item, idx) => {
                            return <Timeline.Item key={'log_' + idx}>
                                <div>
                                    <h3>{item.title}</h3>
                                    <div>操作时间：{item.createTime ? moment(item.createTime).format('YYYY-MM-DD HH:mm:ss') : ''}</div>
                                    <div>
                                        <span>管理员ID：{item.adminId}</span>
                                        <span style={{marginLeft: 25}}>管理员名称：{item.adminName}</span>
                                    </div>
                                </div>
                            </Timeline.Item>
                        })
                    }
                    {
                        this.state.logList && this.state.logList.length <= 0 && <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>
                            暂无记录...
                        </div>
                    }
                </Timeline>
            </Card>
        </div>
    }

    delData(){
        confirm({
            title: '',
            content: <div style={{fontSize: 18}}>
                是否确认删除？
            </div>,
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
                Model.walletPPDelete({planId: this.id}, (res) => {
                    message.success('删除成功！');
                    this.props.history.push('/Pages/APSchemeList');
                }, (err) => {});
            },
            onCancel: () => {
                console.log('Cancel');
            },
        });
    }
}

export default APSchemeDetail
