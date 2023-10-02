import React, {Component} from 'react';
import {
    Button,
    message,
    Steps,
    Input,
    DatePicker,
} from 'antd';
import ViewCoat from '../../../PublicModule/ViewCoat/ViewCoat';
import UploadImgs from "../../../../../baseview/uploadFile/UploadImgs";
import Model from "../Model";
import moment from 'moment';
import {connect} from "react-redux";
import {saveCompanyInfo} from "../../Redux/BTBEnterpriseWalletAction";

const { Step } = Steps;
const { TextArea } = Input;
const {  RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

@connect(
    (state) => {
        const {BTBEnterpriseWalletReducers} = state;
        return {
            BTBEnterpriseWalletReducers
        }
    },
    (dispatch) => {
        return {
            saveCompanyInfo: (position) => {
                dispatch(saveCompanyInfo(position))
            },
        }
    }
)
class BTBEnterpriseRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyName: '',
            companySimpleName: '',
            contactName: '',
            contactPhone: '',
            address: '',
            businessLicenseNo: '',
            businessLicenseStartDateStr: '',
            businessLicenseEndDateStr: '',
            businessLicenseEnclosure: '',
            legalName: '',
            legalPhoneNum: '',
            legalIdCard: '',
            legalIdCardStartDateStr: '',
            legalIdCardEndDateStr: '',
            legalIdCardEnclosure: '',
            bankNo: '',
            settlementAccountNo: '',
            settlementAccountName: '',
        };
        this.isEdit = '';
    }

    componentDidMount(){
        this.isEdit = this.props.location.search.substr(1).split("=")[1];
        if(this.isEdit){
            this.btbMerchantsCompanyInfo();
        }
    }

    componentWillUnmount() {
    }

    render() {
        const {companyName, companySimpleName, contactName, contactPhone, address, businessLicenseNo, businessLicenseStartDateStr,
            businessLicenseEndDateStr, businessLicenseEnclosure, legalName, legalPhoneNum, legalIdCard,
            legalIdCardStartDateStr, legalIdCardEndDateStr, legalIdCardEnclosure, bankNo, settlementAccountNo, settlementAccountName
        } = this.state;

        return (
            <ViewCoat
                breadCrumb={[
                    {title: 'B2B企业钱包'},
                    {title: '申请商户号'},
                ]}
                // topView={<div>
                //     <Button>提交</Button>
                // </div>}
            >
                <div
                    style={{width: '550px', margin: '0 auto', marginBottom: '24px'}}
                >
                    <Steps size="small" current={0}>
                        <Step title={<div style={{fontSize: '14px', color: '#2B3441'}}>提交申请</div>} />
                        <Step title={<div style={{fontSize: '14px', color: '#2B3441'}}>审核</div>} />
                        <Step title={<div style={{fontSize: '14px', color: '#2B3441'}}>完成</div>} />
                    </Steps>
                </div>
                <h1
                    style={{
                        fontSize: '16px',
                        fontWeight: 500,
                        color: 'rgba(43,52,65,1)',
                        marginBottom: '24px'
                    }}
                >填写基本信息</h1>
                {this.makeInput('企业名称', companyName, (val) => {
                    this.setState({companyName: val});
                })}
                {this.makeInput('企业简称', companySimpleName, (val) => {
                    this.setState({companySimpleName: val});
                })}
                {this.makeInput('联系人', contactName, (val) => {
                    this.setState({contactName: val});
                })}
                {this.makeInput('联系人手机', contactPhone, (val) => {
                    this.setState({contactPhone: val});
                })}
                {this.makeInput('地址', address, (val) => {
                    this.setState({address: val});
                }, 50)}
                <h1
                    style={{
                        fontSize: '16px',
                        fontWeight: 500,
                        color: 'rgba(43,52,65,1)',
                        marginBottom: '24px'
                    }}
                >填写企业信息</h1>
                {this.makeInput('营业执照编号', businessLicenseNo, (val) => {
                    this.setState({businessLicenseNo: val});
                })}
                {this.makeDate('营业执照开始至结束日期', [businessLicenseStartDateStr, businessLicenseEndDateStr], (str) => {
                    this.setState({businessLicenseStartDateStr: str[0] || null, businessLicenseEndDateStr: str[1] || null});
                })}
                {this.makeInput('法人姓名', legalName, (val) => {
                    this.setState({legalName: val});
                })}
                {this.makeInput('法人身份证号码', legalIdCard, (val) => {
                    this.setState({legalIdCard: val});
                })}
                {this.makeDate('法人身份证开始至结束日期', [legalIdCardStartDateStr, legalIdCardEndDateStr], (str) => {
                    this.setState({legalIdCardStartDateStr: str[0] || null, legalIdCardEndDateStr: str[1] || null});
                })}
                {this.makeInput('法人手机号码', legalPhoneNum, (val) => {
                    this.setState({legalPhoneNum: val});
                })}
                {this.makeInput('结算账户', settlementAccountNo, (val) => {
                    this.setState({settlementAccountNo: val});
                })}
                {this.makeInput('结算账户名称', settlementAccountName, (val) => {
                    this.setState({settlementAccountName: val});
                })}
                {this.makeInput('开户行号', bankNo, (val) => {
                    this.setState({bankNo: val});
                })}
                {this.makeImg('营业执照（扫描件）', businessLicenseEnclosure, (val) => {
                    this.setState({businessLicenseEnclosure: val});
                })}
                {this.makeImg('法人身份证（扫描件）', legalIdCardEnclosure, (val) => {
                    this.setState({legalIdCardEnclosure: val});
                })}
                <Button type="primary"
                    style={{width: '64px', height: '32px', fontSize: '16px', marginTop: '8px', padding: '0px'}}
                    onClick={() => {
                        this.onSubmit();
                    }}
                >提交</Button>
            </ViewCoat>
        );
    }

    btbMerchantsCompanyInfo(){
        Model.btbMerchantsCompanyInfo({}, (res) => {
            this.props.saveCompanyInfo(res.data);
            res.data.businessLicenseStartDateStr = res.data.businessLicenseStartDate ? moment(res.data.businessLicenseStartDate).format("YYYY-MM-DD") : '';
            res.data.businessLicenseEndDateStr = res.data.businessLicenseEndDate ? moment(res.data.businessLicenseEndDate).format("YYYY-MM-DD") : '';
            res.data.legalIdCardStartDateStr = res.data.legalIdCardStartDate ? moment(res.data.legalIdCardStartDate).format("YYYY-MM-DD") : '';
            res.data.legalIdCardEndDateStr = res.data.legalIdCardEndDate ? moment(res.data.legalIdCardEndDate).format("YYYY-MM-DD") : '';
            this.setState({
                ...this.state,
                ...res.data,
            });
        });
    }

    makeInput(label = '', val = '', onChange, maxLength = 20, type = 'Input', placeholder = '请输入'){
        return <div style={{marginBottom: '24px'}}>
            <span style={{display: 'inline-block', width: '200px', textAlign: 'right', marginRight: '9px', color: '#2B3441'}}>
                {label ? `${label}：` : ''}
            </span>
            {
                (() => {
                    switch (type) {
                        case 'TextArea':
                            return <TextArea
                                rows={4}
                                value={val}
                                placeholder={placeholder}
                                maxLength={maxLength}
                                style={{width: '356px', resize: 'none', height: '72px', lineHeight: '32px', fontSize: '14px', verticalAlign: 'top',}}
                                onChange={(e) => {
                                    onChange && onChange(e.target.value);
                                }}
                            />;

                        default:
                            return <Input
                                value={val}
                                placeholder={placeholder}
                                maxLength={maxLength}
                                style={{width: '356px', height: '32px', lineHeight: '32px', fontSize: '14px'}}
                                onChange={(e) => {
                                    onChange && onChange(e.target.value);
                                }}
                            />
                    }
                })()
            }
        </div>
    }

    makeDate(label = '', val = [], onChange, maxLength = 30, type = 'Input', placeholder = '请输入'){
        return <div style={{marginBottom: '24px'}}>
            <span style={{display: 'inline-block', width: '200px', textAlign: 'right', marginRight: '9px', color: '#2B3441'}}>
                {label ? `${label}：` : ''}
            </span>
            <RangePicker
                allowClear={false}
                style={{width: '356px', height: '32px', lineHeight: '32px', fontSize: '14px'}}
                value={[val[0] ? moment(val[0], dateFormat) : null, val[1] ? moment(val[1], dateFormat) : null]}
                onChange={(date, dateString) => {
                    onChange && onChange(dateString);
                }}
            />
        </div>
    }

    makeImg(label = '', val = '', onChange){
        return <div style={{marginBottom: '24px'}}>
            <span style={{display: 'inline-block', width: '200px', textAlign: 'right', marginRight: '9px', color: '#2B3441'}}>
                {label ? `${label}：` : ''}
            </span>
            <UploadImgs
                key={label}
                style={{
                    display: 'inline-block',
                    verticalAlign: 'top',
                    paddingTop: 0,
                    overflow: 'inherit',
                }}
                data={{
                    fileUrl: val ? [val] : [],
                    maxNum: 1,
                }}
                callBack={(url) => {
                    onChange && onChange(url[0]);
                }}
            />
        </div>
    }

    onSubmit(){
        const {companyName, companySimpleName, contactName, contactPhone, address, businessLicenseNo, businessLicenseStartDateStr,
            businessLicenseEndDateStr, businessLicenseEnclosure, legalName, legalPhoneNum, legalIdCard,
            legalIdCardStartDateStr, legalIdCardEndDateStr, legalIdCardEnclosure, bankNo, settlementAccountNo, settlementAccountName
        } = this.state;

        if(!companyName)
            return message.error('企业名称不能为空！', 1);

        if(!companySimpleName)
            return message.error('企业简称不能为空！', 1);

        if(!contactName)
            return message.error('联系人不能为空！', 1);

        if(!contactPhone)
            return message.error('联系人手机不能为空！', 1);

        if(!/^\d{3,15}$/.test(contactPhone))
            return message.error('联系人手机只能填写3-15个数字的字符！', 1);

        if(!address)
            return message.error('地址不能为空！', 1);

        if(!businessLicenseNo)
            return message.error('营业执照编号不能为空！', 1);

        if(!/\d/.test(businessLicenseNo))
            return message.error('营业执照编号只能填写数字！', 1);

        if(!businessLicenseStartDateStr || !businessLicenseEndDateStr)
            return message.error('营业执照开始至结束日期不能为空！', 1);

        if(!legalName)
            return message.error('法人姓名不能为空！', 1);

        if(!legalIdCard)
            return message.error('法人身份证号码不能为空！', 1);

        if(!/\d/.test(legalIdCard))
            return message.error('法人身份证号码只能填写数字！', 1);

        if(!legalIdCardStartDateStr || !legalIdCardEndDateStr)
            return message.error('法人身份证开始至结束日期不能为空！', 1);

        if(!legalPhoneNum)
            return message.error('法人手机号码不能为空！', 1);

        if(!/^\d{3,15}$/.test(legalPhoneNum))
            return message.error('法人手机号码只能填写3-15个数字的字符！', 1);

        if(!settlementAccountNo)
            return message.error('结算账户不能为空！', 1);

        if(!/\d/.test(settlementAccountNo))
            return message.error('结算账户只能填写数字！', 1);

        if(!settlementAccountName)
            return message.error('结算账户名称不能为空！', 1);

        if(!bankNo)
            return message.error('开户行号不能为空！', 1);

        if(!/\d/.test(bankNo))
            return message.error('开户行号只能填写数字！', 1);

        if(!businessLicenseEnclosure)
            return message.error('营业执照（扫描件）不能为空！', 1);

        if(!legalIdCardEnclosure)
            return message.error('法人身份照（扫描件）不能为空！', 1);

        Model.btbApplyCompanyApply({
            companyName, companySimpleName, contactName, contactPhone, address, businessLicenseNo, businessLicenseStartDateStr,
            businessLicenseEndDateStr, businessLicenseEnclosure, legalName, legalPhoneNum, legalIdCard,
            legalIdCardStartDateStr, legalIdCardEndDateStr, legalIdCardEnclosure, bankNo, settlementAccountNo, settlementAccountName
        }, (res) => {
            message.success('提交成功！');
            this.btbMerchantsCompanyInfo();
            setTimeout(() => {
                this.props.history.push('/pages/appCenter/btbEnterpriseWallet/btbRegister/btbEnterpriseRegisterResult');
            }, 300);
        }, (err) => {});
    }

}

export default BTBEnterpriseRegister;
