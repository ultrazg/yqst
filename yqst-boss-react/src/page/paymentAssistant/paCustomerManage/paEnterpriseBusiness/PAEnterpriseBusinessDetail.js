/**
 * Created by yb
 */

import React, {Component} from 'react';
import {Form, Button, Modal, Card, Table, Tabs, Upload, message} from 'antd';
import {RollbackOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import Model from "../../Model";
import moment from 'moment'
import AssemblySet from "../../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../../baseview/viewContent/ViewContent";
import UploadFiles from "../../../../baseview/uploadFile/UploadFile";
import HeadSearch from "../../../../baseview/headSearch/HeadSearch";
import SettlementEditorModal from "../SettlementEditorModal/SettlementEditorModal";
import UploadFile from "../../../../baseview/uploadFile/UploadFile";
import { getTimeString} from '../common';

const { TabPane } = Tabs;

class PAEnterpriseBusinessDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 是否显示结算编辑弹窗
            isShow: false,
            // 1为账户明细 2为基本信息
            tabKey: '1',
            list: [],
            total: 0,
            current: 1,
            pageSize: 10,
            startTime: '',
            endTime: '',
            keyWord: '',

            info: {
                bossMerchantsCompanyApplyInfoVO: {},
                bossMerchantsAuditLogListVOList: [],
                bossMerchantsPayPlanAssociatedVO: {}
            },

        }

        this.formRef = React.createRef();
    }

    getCompanyInfo = ()=>{
        Model.GetCompanyInfo({sn: this.sn}, res=>{
            this.setState({
                info: res.data,
            })
        })
    };

    componentDidMount() {
        this.sn = this.props.location.search.substr(1).split("=")[1] || '';
        if (this.sn) {
            this.getCompanyInfo();
        }
    }

    getList = ()=>{

    };

    // 视图层
    render() {
        let {isShow, tabKey} = this.state;
        const {
            payPlanSn, channelBillCycleType, channelBillDay, channelBillDate,
            channelDeductCycleType, channelDeductDay, channelDeductDate
        } = this.state.info.bossMerchantsPayPlanAssociatedVO;
        let payInfo = {
            payPlanSn,
            channelBillCycleType,
            channelBillDay,
            channelBillDate,
            channelDeductCycleType,
            channelDeductDay,
            channelDeductDate
        };

        let topBtn = tabKey === '1' ?
            (<Link to={'/Pages/PAEnterpriseBusiness'}><Button icon={<RollbackOutlined />}>返回</Button></Link>):
            (<Button type='primary' onClick={()=>{this.setState({isShow: true})}}>结算编辑</Button>)

        return (
            <>
                <Form ref={this.formRef}/>
                <ViewContent
                    crumb={[
                        {name: '收支付助手'},
                        {name: '商户管理'},
                        {name: "企业商户", link: '/Pages/PAEnterpriseBusiness'},
                        {name: "企业商户详情"}
                    ]}
                    topBtn = {
                        <div>
                            {topBtn}
                        </div>
                    }
                >
                    <Tabs defaultActiveKey="1" onChange={(key) => {this.setState({tabKey: key})}}>
                        <TabPane tab="账户明细" key="1">
                            {this.makeHeadSearch()}
                            {this.makeTable()}
                        </TabPane>
                        <TabPane tab="基本信息" key="2">
                            {this.makeBaseView()}
                            {this.makeLogTable()}
                        </TabPane>
                    </Tabs>

                    <SettlementEditorModal isShow={isShow} payInfo={payInfo} getModalData={this.getModalData}/>
                </ViewContent>
            </>
        );
    }

    makeHeadSearch() {
        const searchDatas = [
            {key: 'keyWord', type: 'Input', value: '', placeholder: '请输入', label: '关键词', maxLength: 30},
            {key: 'times', type:'RangePicker', value:'', placeholder: ['开始时间', '结束时间'], label: '操作时间',},
        ];
        return <HeadSearch data={searchDatas} callBack={({keyWord, times}) => {
            let startTime = times [0] || '';
            let endTime = times [1] || '';

            this.setState({
                current: 1,
                keyWord,
                startTime,
                endTime
            }, () => {
                this.getList();
            });
        }}/>
    }

    makeTable() {
        let {list, current, total, pageSize} = this.state;
        const columns = [
            {
                title: '编号',
                dataIndex: '1',
            },
            {
                title: '操作金额',
                dataIndex: '2',
            },
            {
                title: '结余',
                dataIndex: '3',
            },
            {
                title: '操作备注',
                dataIndex: '4',
            },
            {
                title: '操作时间',
                dataIndex: '5',
            },
        ];
        return (
            <Table
                columns={columns}
                dataSource={list}
                pagination={
                    {
                        total: total,
                        current: current,
                        pageSize: pageSize,
                        onChange: ( current, b) => {
                            this.setState({
                                current
                            }, () => {
                                this.getList();
                            })
                        },
                        showTotal: (total, range) => `共有${total}条`
                    }
                }
            />
        )
    }

    makeLogTable() {
        let logList = this.state.info['bossMerchantsAuditLogListVOList'] || [];
        const columns = [
            {
                title: '审核类型',
                dataIndex: 'merchantsType',
                render: (type)=>{
                    switch (type) {
                        case 1:
                            return '企业审核'
                        case 2:
                            return '个人审核'
                    }
                }
            },
            {
                title: '审核结果',
                dataIndex: 'auditStatus',
                render: (status)=> {
                    switch (status) {
                        case 1:
                            return '未激活';
                        case 2:
                            return '未签约';
                        case 3:
                            return '未绑定银行卡';
                        case 4:
                            return '正常';
                    }
                }
            },
            {
                title: '管理员',
                dataIndex: 'adminName',
            },
            {
                title: '审核时间',
                dataIndex: 'createTime',
                render(time){
                    return moment(time).format('YYYY-MM-DD hh:mm:ss')
                }
            }
        ];
        return <div>
            <Table
                columns={columns}
                dataSource={logList}
                // rowKey={'merchantsApplySn'}
                rowKey={'createTime'}
                bordered
                // pagination={
                //     {
                //         total: total,
                //         current: current,
                //         pageSize: pageSize,
                //         onChange: ( current, b) => {
                //             this.setState({
                //                 current
                //             }, () => {
                //                 this.getList();
                //             })
                //         },
                //         showTotal: (total, range) => `共有${total}条`
                //     }
                // }
            />
        </div>
    }

    makeBaseView() {
        const {payPlan, channelBillCycleType, channelBillDay, channelBillDate,
            channelDeductCycleType, channelDeductDay, channelDeductDate
        } = this.state.info.bossMerchantsPayPlanAssociatedVO;

        let settlementBillStr = getTimeString('channelBillCycleType', {
            channelBillCycleType,
            channelBillDay,
            channelBillDate
        })

        let settlementDeductStr = getTimeString('channelDeductCycleType', {
            channelDeductCycleType,
            channelDeductDay,
            channelDeductDate
        })

        const {
            companyName,
            companySimpleName,
            contactName,
            contactPhone,
            address,
            businessLicenseNo,
            businessLicenseStartDate,
            businessLicenseEndDate,
            legalName,
            legalIdCard,
            legalIdCardStartDate,
            legalIdCardEndDate,
            legalPhoneNum,
            settlementAccountNo,
            settlementAccountName,
            bankNo,
            businessLicenseEnclosure,
            legalIdCardEnclosure
        } = this.state.info.bossMerchantsCompanyApplyInfoVO;

        let fileList = [];
        if(businessLicenseEnclosure){
            fileList.push(businessLicenseEnclosure)
        }
        if(legalIdCardEnclosure){
            fileList.push(legalIdCardEnclosure)
        }


        let allData = [
            {
                title: '基本信息',
                key: 'JBKey',
                data: [
                    {key: 'qw1', type: 'Texts', label: '企业名称', span: 12, value: companyName || ''},
                    {key: 'qw2', type: 'Texts', label: '企业简称', span: 12, value: companySimpleName || ''},
                    {key: 'qw3', type: 'Texts', label: '联系人姓名', span: 12, value: contactName || ''},
                    {key: 'qw4', type: 'Texts', label: '联系人手机', span: 12, value: contactPhone || ''},
                    {key: 'qw5', type: 'Texts', label: '支付方案', span: 12, value: payPlan || ''},
                    {key: 'qw6', type: 'Texts', label: '结算账单', span: 12, value: settlementBillStr || ''},
                    {key: 'qw7', type: 'Texts', label: '结算扣费', span: 12, value: settlementDeductStr || ''},
                    {key: 'qw8', type: 'Texts', label: '公司地址', span: 12, value: address || ''},
                ],
                style: {
                    marginBottom: '15px'
                },
            },
            {
                title: '企业信息',
                key: 'QYKey',
                data: [
                    {key: 'qw1', type: 'Texts', label: '营业执照编号', span: 12, value: businessLicenseNo || ''},
                    {key: 'qw2', type: 'Texts', label: '营业执照有效期', span: 12,
                        value: (businessLicenseStartDate && businessLicenseEndDate) ?
                            `${moment(businessLicenseStartDate).format('YYYY-MM-DD')}至${moment(businessLicenseEndDate).format('YYYY-MM-DD')}` : ''
                    },
                    {key: 'qw3', type: 'Texts', label: '法人姓名', span: 12, value: legalName || ''},
                    {key: 'qw4', type: 'Texts', label: '法人身份证号', span: 12, value: legalIdCard || ''},
                    {key: 'qw5', type: 'Texts', label: '法人身份证有效期', span: 12,
                        value: (legalIdCardStartDate && legalIdCardEndDate) ?
                            `${moment(legalIdCardStartDate).format('YYYY-MM-DD')}至${moment(legalIdCardEndDate).format('YYYY-MM-DD')}` : ''
                    },
                    {key: 'qw6', type: 'Texts', label: '法人手机号', span: 12, value: legalPhoneNum || ''},
                    {key: 'qw7', type: 'Texts', label: '结算账户', span: 12, value: settlementAccountNo || ''},
                    {key: 'qw8', type: 'Texts', label: '结算账户名称', span: 12, value: settlementAccountName || ''},
                    {key: 'qw8', type: 'Texts', label: '开户行号', span: 12, value: bankNo || ''},
                    {key: 'qw8', type: 'Texts', label: '附件', span: 12,
                        value: fileList.length ? <UploadFile
                            data={{
                                maxNum:1,
                                uploadText: '',
                                fileUrlList: fileList,
                                isReadOnly: true
                            }}
                        /> : ''},
                ],
                style: {
                    marginBottom: '15px'
                },
            },
            {
                title: '银行卡信息',
                key: 'YHKey',
                data: [
                    {key: 'qw1', type: 'Texts', label: '银行卡账户编号', span: 12, value: ''},
                    {key: 'qw2', type: 'Texts', label: '银行卡账户名称', span: 12, value: ''},
                    {key: 'qw3', type: 'Texts', label: '银行账户类型', span: 12, value: ''},
                    {key: 'qw4', type: 'Texts', label: '开户证件类型', span: 12, value: ''},
                    {key: 'qw5', type: 'Texts', label: '证件号', span: 12, value: ''},
                    {key: 'qw6', type: 'Texts', label: '手机号', span: 12, value: ''},
                ],
                style: {
                    marginBottom: '15px'
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

    getModalData = (isShow, obj)=>{
        this.setState({
            isShow
        });

        if(obj){
            const {
                channelBillCycleType,
                channelBillDate,
                channelBillDay,
                channelDeductCycleType,
                channelDeductDate,
                channelDeductDay,
                payPlanSn
            } = obj;

            Model.UpdatePayPlan({
                sn: this.sn,
                payPlanSn,
                channelBillSettlementType: 2,
                channelBillCycleType,
                channelBillDay,
                channelBillDate,
                channelDeductCycleType,
                channelDeductDate,
                channelDeductDay,
            }, res=>{
                message.success('结算编辑成功!');
                this.getCompanyInfo();
            })
        }
    }

}

export default PAEnterpriseBusinessDetail
