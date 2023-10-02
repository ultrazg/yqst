/**
 * Created by yb on 2019/10/28
 * 业务模块
 */

import React, {Component} from 'react';
import {Form, Button, Card, Row, Col, Timeline, Tabs} from 'antd';
import {Link} from "react-router-dom";
import Model from "../../Model";
import moment from 'moment'
import SWTable from 'SWViews/table';
import SwitchName from "../SwitchName";
import AssemblySet from "../../../../baseview/assemblySet/AssemblySet";

const {TabPane} = Tabs;

class BusinessModule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                invoiceInfoVO: {},
                erpBankVO: {},
                addressListVOS: [],
                riseListVOS: [],
            },
            logList: [],
        };
    }

    componentDidMount() {
        this.getInfo();
    }

    // 视图层
    render() {
        return (
            this.makeYWView()
        );
    }

    getInfo() {
        Model.UserEBGet({userId: this.props.data.listAccountDTO.uid}, (res) => {
            this.setState({data: {...this.state.data, ...res.data}});
        }, (err) => {
        });
    }

    makeYWView() {
        let {data} = this.state;
        let {invoiceInfoVO, erpBankVO, addressListVOS, riseListVOS} = data;
        const viewList = [
            {
                key: 'KPKey',
                title: '开票信息',
                style: {},
                data: [
                    {key: 'id', type: 'Texts', label: '开票信息ID', span: 12, value: invoiceInfoVO.id},
                    {key: 'infoName', type: 'Texts', label: '单位名称', span: 12, value: invoiceInfoVO.infoName},
                    {key: 'taxpayerNumber', type: 'Texts', label: '纳税人识别号', span: 12, value: invoiceInfoVO.taxpayerNumber},
                    {key: 'address', type: 'Texts', label: '地址', span: 12, value: invoiceInfoVO.address},
                    {key: 'phone', type: 'Texts', label: '电话', span: 12, value: invoiceInfoVO.phone},
                    {key: 'accountBank', type: 'Texts', label: '开户行', span: 12, value: invoiceInfoVO.accountBank},
                    {key: 'depositNumber', type: 'Texts', label: '账户', span: 12, value: invoiceInfoVO.depositNumber},
                ]
            },
            {
                key: 'CKKey',
                title: '基本存款账户',
                style: {marginTop: 15},
                data: [
                    {
                        key: 'depositBankName',
                        type: 'Texts',
                        label: '企业开户名称',
                        span: 12,
                        value: erpBankVO.depositBankName
                    },
                    {key: 'depositBank', type: 'Texts', label: '开户行', span: 12, value: erpBankVO.depositBank},
                    {key: 'region', type: 'Texts', label: '开户所在地', span: 12, value: erpBankVO.region},
                    {key: 'bankBranchName', type: 'Texts', label: '开户支行名称', span: 12, value: erpBankVO.bankBranchName},
                    {key: 'bankAccount', type: 'Texts', label: '企业银行账号', span: 12, value: erpBankVO.bankAccount},
                ]
            },
        ];
        const columns = [
            {
                title: '收件人',
                key: 'contact',
                dataIndex: 'contact',
            },
            {
                title: '联系电话',
                key: 'tel',
                dataIndex: 'tel',
            },
            {
                title: '邮编',
                key: 'zipCode',
                dataIndex: 'zipCode',
            },
            {
                title: '所在地区',
                key: 'area',
                dataIndex: 'area',
            },
            {
                title: '详细地址',
                key: 'address',
                dataIndex: 'address',
            },
            // {
            //     title: '操作',
            //     key: '',
            //     dataIndex: '',
            // },
        ];
        const ttColumns = [
            {
                title: 'ID',
                key: 'id',
                dataIndex: 'id',
            },
            {
                title: '单位名称',
                key: 'riseName',
                dataIndex: 'riseName',
            },
            {
                title: '纳税人识别号',
                key: 'taxpayerNumber',
                dataIndex: 'taxpayerNumber',
            },
            {
                title: '地址',
                key: 'address',
                dataIndex: 'address',
            },
            {
                title: '电话',
                key: 'phone',
                dataIndex: 'phone',
            },
            {
                title: '开户行',
                key: 'accountBank',
                dataIndex: 'accountBank',
            },
            {
                title: '账户',
                key: 'depositNumber',
                dataIndex: 'depositNumber',
            },
            // {
            //     title: '操作',
            //     key: '',
            //     dataIndex: '',
            // },
        ];
        return <div>
            {
                viewList.map((item, idx) => {
                    return <Card
                        type="inner"
                        title={item.title}
                        style={item.style ? item.style : ''}
                        key={idx}
                    >
                        <AssemblySet key={item.key} data={item.data} form={this.props.form}/>
                    </Card>
                })
            }
            <Card
                type="inner"
                title='地址库'
                style={{marginTop: 15}}
            >
                <SWTable
                    columns={columns}
                    dataSource={addressListVOS || []}
                    pagination={false}
                />
            </Card>
            <Card
                type="inner"
                title='抬头库'
                style={{marginTop: 15}}
            >
                <SWTable
                    columns={ttColumns}
                    dataSource={riseListVOS || []}
                    pagination={false}
                />
            </Card>
            {/*<Card*/}
            {/*    type="inner"*/}
            {/*    title='操作记录'*/}
            {/*    style={{marginTop: 15}}*/}
            {/*>*/}
            {/*    <Tabs type="card">*/}
            {/*        <TabPane tab="用户记录" key="1">*/}
            {/*            <Timeline style={{*/}
            {/*                padding: 15*/}
            {/*            }}>*/}
            {/*                {*/}
            {/*                    this.state.logList.map((item, idx) => {*/}
            {/*                        return <Timeline.Item key={'log_' + idx}>*/}
            {/*                            <h3>{item.title}</h3>*/}
            {/*                            <span>操作时间：{item.createTime ? moment(item.createTime).format('YYYY-MM-DD') : ''}</span>*/}
            {/*                        </Timeline.Item>*/}
            {/*                    })*/}
            {/*                }*/}
            {/*                {*/}
            {/*                    this.state.logList && this.state.logList.length <= 0 &&*/}
            {/*                    <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>*/}
            {/*                        暂无记录...*/}
            {/*                    </div>*/}
            {/*                }*/}
            {/*            </Timeline>*/}
            {/*        </TabPane>*/}
            {/*    </Tabs>*/}
            {/*</Card>*/}
        </div>
    }
}

export default BusinessModule
