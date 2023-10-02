import React, {Component} from 'react';
import ViewContent from "../../../../../baseview/viewContent/ViewContent";
import {Card, Button, Form, Table, Modal, Input, message} from "antd";
import {RollbackOutlined} from '@ant-design/icons';
import AssemblySet from "../../../../../baseview/assemblySet/AssemblySet";
import {Link} from "react-router-dom";
import UploadFile from "../../../../../baseview/uploadFile/UploadFile";
import SettlementEditorModal from "../../SettlementEditorModal/SettlementEditorModal";
import Model from "../../../Model";
import moment from "moment";

const {TextArea} = Input;

class PAEnterpriseMerchantsAuditDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            isLoading: false,
            refuseReason: '',
            info: {
                bossMerchantsAuditLogListVOList: [],
            },
            isShow: false
        };
        this.sn = '';
        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.sn = this.props.location.search.substr(1).split('=')[1];
        if(this.sn){
            Model.GetApplyCompanyInfo({sn: this.sn}, res=>{
                this.setState({
                    info: res.data
                })
            })
        }
    }

    render() {
        const {auditStatus} = this.state.info;
        const {isShow} = this.state;
        return (
           <Form ref={this.formRef}>
               <ViewContent
                   crumb={[
                       {name: '收支付助手'},
                       {name: '商户管理'},
                       {name: "商户审核", link: '/Pages/PAEnterpriseMerchantsAudit'},
                       {name: "商户审核详情"}
                   ]}
                   topBtn = {
                       <Link to={'/Pages/PAEnterpriseMerchantsAudit'}>
                           <Button icon={<RollbackOutlined />}>返回</Button>
                       </Link>
                   }
               >
                   {this.makeBaseView()}
                   {this.makeTableView()}


                   {
                       auditStatus === 1 ? (
                           <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: 100, width: '60%', margin: '0 auto'}}>
                               <Button
                                   onClick={()=>{
                                       this.setState({
                                           isShow: true
                                       })
                                   }}
                                   style={{width: 138, height: 38, backgroundColor: 'rgba(20, 118, 255, .9)', color: '#fff'}}>
                                   通过
                               </Button>
                               <Button
                                   onClick={()=>{this.setState({visible: true})}}
                                   style={{width: 138, height: 38, backgroundColor: 'rgba(20, 118, 255, .9)', color: '#fff'}}>
                                   拒绝
                               </Button>
                           </div>
                       ) : false

                   }

                   {this.makeRefuseModal()}
                   <SettlementEditorModal isShow={isShow} getModalData={this.getModalData}/>
               </ViewContent>
           </Form>
        );
    }

    makeBaseView() {
        const {auditStatus, sn, companyName, companySimpleName, contactName, contactPhone, address,
            businessLicenseNo, businessLicenseStartDate, businessLicenseEndDate, legalName, legalPhoneNum,
            legalIdCard, legalIdCardStartDate, legalIdCardEndDate, settlementAccountNo, settlementAccountName,
            bankNo, businessLicenseEnclosure, legalIdCardEnclosure, createTime, refuseReason
        } = this.state.info;
        let fileList = [businessLicenseEnclosure, legalIdCardEnclosure];
        let statusText = '';
        switch(auditStatus){
            case 1:
                statusText = '待审核';
                break;
            case 2:
                statusText = '通过';
                break;
            case 3:
                statusText = '拒绝';
                break;
            default:
                return statusText = '';
        }

        const allData = [
            {
                title: '审核信息',
                key: 'SHKey',
                data: [
                    {key: 'qw1', type: 'Texts', label: '申请状态', span: 12, value: statusText},
                    {key: 'qw2', type: 'Texts', label: '商户编号', span: 12, value: sn},
                    {key: 'qw3', type: 'Texts', label: '申请时间', span: 12, value: moment(createTime).format('YYYY-MM-DD hh:mm:ss')},

                ],
                style: {
                    marginBottom: '15px'
                },
            },
            {
                title: '基本信息',
                key: 'JBKey',
                data: [
                    {key: 'qw1', type: 'Texts', label: '企业名称', span: 12, value: companyName},
                    {key: 'qw2', type: 'Texts', label: '企业简称', span: 12, value: companySimpleName},
                    {key: 'qw3', type: 'Texts', label: '联系人姓名', span: 12, value: contactName},
                    {key: 'qw4', type: 'Texts', label: '联系人手机', span: 12, value: contactPhone},
                    {key: 'qw5', type: 'Texts', label: '公司地址', span: 12, value: address}
                ],
                style: {
                    marginBottom: '15px'
                },
            },
            {
                title: '企业信息',
                key: 'QYKey',
                data: [
                    {key: 'qw1', type: 'Texts', label: '营业执照编号', span: 12, value: businessLicenseNo},
                    {key: 'qw2', type: 'Texts', label: '营业执照有效期', span: 12,
                        value: `${moment(businessLicenseStartDate).format('YYYY-MM-DD')}至${moment(businessLicenseEndDate).format('YYYY-MM-DD')}`
                    },
                    {key: 'qw3', type: 'Texts', label: '法人姓名', span: 12, value: legalName},
                    {key: 'qw4', type: 'Texts', label: '法人身份证号', span: 12, value: legalIdCard},
                    {key: 'qw5', type: 'Texts', label: '法人身份证有效期', span: 12,
                        value: `${moment(legalIdCardStartDate).format('YYYY-MM-DD')}至${moment(legalIdCardEndDate).format('YYYY-MM-DD')}`
                    },
                    {key: 'qw6', type: 'Texts', label: '法人手机号', span: 12, value: legalPhoneNum},
                    {key: 'qw7', type: 'Texts', label: '结算账户', span: 12, value: settlementAccountNo},
                    {key: 'qw8', type: 'Texts', label: '结算账户名称', span: 12, value: settlementAccountName},
                    {key: 'qw9', type: 'Texts', label: '开户行号', span: 12, value: bankNo},
                    {key: 'qw10', type: 'Texts', label: '附件', span: 12,
                        value: fileList.length ? <UploadFile
                            data={{
                                maxNum:1,
                                uploadText: '',
                                fileUrlList: fileList,
                                isReadOnly: true
                            }}
                        /> : ''}
                ],
                style: {
                    marginBottom: '15px'
                },
            }
        ];

        if(auditStatus === 3){
            allData[0].data.push({
                key: 'rejectText', type: 'Texts', label: '拒绝理由', span: 12, value: <pre>{refuseReason || ''}</pre>
            })
        }



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

    makeTableView = ()=>{
        const list = this.state.info.bossMerchantsAuditLogListVOList;
        const columns = [
            {
                title: '审核类型',
                render(){
                    return '企业'
                }
            },
            {
                title: '审核结果',
                dataIndex: 'auditStatus',
                render: (auditStatus) =>{
                    switch (auditStatus) {
                        case 2:
                            return '通过';
                        case 3:
                            return '拒绝';
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
                render(time) {
                    return moment(time).format('YYYY-MM-DD hh:mm:ss');
                }
            }
        ];
        return (
            <div>
                <h3 style={{marginTop: 15}}>审核日志</h3>
                <Table
                    columns={columns}
                    dataSource={list}
                    rowKey={'merchantsApplySn'}
                    bordered
                    style={{marginTop: 15}}
                />
            </div>
        )
    };

    makeRefuseModal = ()=>{
        const {visible, isLoading} = this.state;
        return (
            <Modal
                title="请说明拒绝理由"
                visible={visible}
                confirmLoading={isLoading}
                onOk={()=>{

                    let refuseReason = this.state.refuseReason.trim();
                    if(refuseReason.length === 0){
                        return message.error('请输入拒绝理由！');
                    }else if(refuseReason.length > 200){
                        return message.error('拒绝理由长度不能大于200');
                    }
                    this.setState({
                        isLoading: true
                    })
                    this.refuseApply();
                }}
                onCancel={()=>{
                    this.setState({
                        isLoading: false,
                        visible: false
                    })
                }}
            >
                <TextArea
                    placeholder="请输入"
                    rows={6}
                    onChange={(e)=>{
                        this.setState({
                            refuseReason: e.target.value
                        })
                    }}
                    style={{resize: 'none'}}
                />
            </Modal>
        )
    }

    agreeApply = (obj)=>{
        Model.ApprovedCompanyApply({
            sn: this.sn,
            payPlanSn: obj.payPlanSn,
            channelBillSettlementType: 2,
            channelBillCycleType: obj.channelBillCycleType,
            channelBillDay: obj.channelBillDay,
            channelBillDate: obj.channelBillDate,
            channelDeductCycleType: obj.channelDeductCycleType,
            channelDeductDay: obj.channelDeductDay,
            channelDeductDate: obj.channelDeductDate
        }, res=>{
            message.success('设置成功，审核通过！');
            this.props.history.replace('/Pages/PAEnterpriseMerchantsAudit');
        })
    }

    refuseApply = ()=>{
        Model.RefuseCompanyApply({
            sn: this.sn,
            refuseReason: this.state.refuseReason
        }, res=>{
            message.info('已拒绝！');
            this.props.history.replace('/Pages/PAEnterpriseMerchantsAudit')
        })
    };

    getModalData = (isShow, obj)=>{
        this.setState({
            isShow
        });

        if(obj){
            this.agreeApply(obj)
        }

    }

}

export default PAEnterpriseMerchantsAuditDetail
