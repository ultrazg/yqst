import React, {Component} from 'react';
import {Button, Steps} from 'antd';
import {logo} from '../../../../../resource';
import ViewCoat from '../../../PublicModule/ViewCoat/ViewCoat';
import {connect} from "react-redux";
import {saveCompanyInfo} from "../../Redux/BTBEnterpriseWalletAction";
import moment from "moment";

const {Step} = Steps;

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
class BTBEnterpriseRegisterResult extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        // this.btbMerchantsCompanyInfo();
    }

    componentWillUnmount() {
    }

    render() {
        let {companyInfo} = this.props.BTBEnterpriseWalletReducers;
        const current = (status) => {
            switch (status + '') {
                case '1':
                case '3':
                    return 1;

                default:
                    return 2;
            }
        };
        const changeDate = (dateStr) => {
            return dateStr ? moment(dateStr).format("YYYY-MM-DD") : ''
        };

        return (
            <ViewCoat
                breadCrumb={[
                    {title: 'B2B企业钱包'},
                    {title: '申请商户号'},
                ]}
                topView={<div>
                    {
                        '3' === '' + companyInfo.auditStatus ? <Button type="primary"
                                                                       style={{
                                                                           width: '120px',
                                                                           fontSize: '14px',
                                                                           height: '32px',
                                                                       }}
                                                                       onClick={() => {
                                                                           this.props.history.push(`/pages/appCenter/btbEnterpriseWallet/btbRegister/btbEnterpriseRegister?isEdit=1`);
                                                                       }}
                        >重新申请</Button> : null
                    }
                </div>}
            >
                <div
                    style={{width: '550px', margin: '0 auto', marginBottom: '24px'}}
                >
                    <Steps size="small" current={current(companyInfo.auditStatus)}
                           status={'3' === '' + companyInfo.auditStatus ? 'error' : 'wait'}>
                        <Step title={<div style={{fontSize: '14px', color: '#2B3441'}}>已申请</div>}/>
                        <Step
                            title={<div style={{fontSize: '14px', color: '#2B3441'}}>
                                {'1' === '' + companyInfo.auditStatus && '审核中'}
                                {'3' === '' + companyInfo.auditStatus && '拒绝'}
                            </div>}
                        />
                        <Step title={<div style={{fontSize: '14px', color: '#2B3441'}}>完成</div>}/>
                    </Steps>
                </div>
                <h1
                    style={{
                        fontSize: '16px',
                        fontWeight: 500,
                        color: 'rgba(43,52,65,1)',
                        marginBottom: '24px'
                    }}
                >基本信息</h1>
                {this.makeText('企业名称', companyInfo.companyName)}
                {this.makeText('企业简称', companyInfo.companySimpleName)}
                {this.makeText('联系人', companyInfo.contactName)}
                {this.makeText('联系人手机', companyInfo.contactPhone)}
                {this.makeText('地址', companyInfo.address)}
                {
                    '3' === '' + companyInfo.auditStatus ? this.makeText('拒绝理由', companyInfo.refuseReason) : null
                }
                <h1
                    style={{
                        fontSize: '16px',
                        fontWeight: 500,
                        color: 'rgba(43,52,65,1)',
                        marginBottom: '24px'
                    }}
                >企业信息</h1>
                {this.makeText('营业执照编号', companyInfo.businessLicenseNo)}
                {this.makeText('营业执照开始至结束日期', changeDate(companyInfo.businessLicenseStartDate) + ' 至 ' + changeDate(companyInfo.businessLicenseEndDate))}
                {this.makeText('法人姓名', companyInfo.legalName)}
                {this.makeText('法人身份证开始至结束日期', changeDate(companyInfo.legalIdCardStartDate) + ' 至 ' + changeDate(companyInfo.legalIdCardEndDate))}
                {this.makeText('法人手机号', companyInfo.legalPhoneNum)}
                {this.makeText('结算账户', companyInfo.settlementAccountNo)}
                {this.makeText('结算账户名称', companyInfo.settlementAccountName)}
                {this.makeText('开户行号', companyInfo.bankNo)}
                {this.makeText('营业执照（扫描件）', companyInfo.businessLicenseEnclosure, 'Img')}
                {this.makeText('法人身份证（扫描件）', companyInfo.legalIdCardEnclosure, 'Img')}
            </ViewCoat>
        );
    }

    makeText(label = '', val = '', type = 'Text') {
        return <div style={{marginBottom: '24px'}}>
            <span style={{
                display: 'inline-block',
                width: '200px',
                textAlign: 'right',
                marginRight: '9px',
                color: '#2B3441'
            }}>
                {label ? `${label}：` : ''}
            </span>
            {
                (() => {
                    switch (type) {
                        case 'Img':
                            return <img src={val || logo} alt=""
                                        style={{
                                            width: '72px',
                                            height: '72px',
                                            borderRadius: '6px',
                                            verticalAlign: 'text-top'
                                        }}
                            />;

                        case 'Text':
                        default:
                            return <span style={{color: 'rgba(43,52,65,0.65)', fontSize: '14px'}}>
                                {val || ''}
                            </span>
                    }
                })()
            }
        </div>
    }

    // btbMerchantsCompanyInfo(){
    //     Model.btbMerchantsCompanyInfo({}, (res) => {
    //         if('1' === '' + res.data.auditStatus){
    //             this.props.history.push('/pages/appCenter/btbEnterpriseWallet/btbAccountView/btbAccountViewPage');
    //         }
    //     }, (err) => {});
    // }

}

export default BTBEnterpriseRegisterResult;
