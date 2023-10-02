import React, {Component} from 'react';
import {Button, message, Menu, Steps, Input} from 'antd';
import ViewCoat from '../../PublicModule/ViewCoat/ViewCoat';
import UploadImgs from "../../../../baseview/uploadFile/UploadImgs";
import Model from "../Model";

const {Step} = Steps;
const {TextArea} = Input;

class OpenApplication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyName: '',
            legalRepresentative: '',
            businessLicenseNumber: '',
            businessLicenseUrl: [],
            contactName: '',
            contactPhone: '',
            applyReason: '',
            status: '',
            createTime: '',
        };
        this.isEdit = false;
    }

    componentDidMount() {
        this.isEdit = this.props.location.search.substr(1).split("=")[1];
        if (this.isEdit) {
            Model.openPlatformApplyGet({}, (res) => {
                this.setState({
                    companyName: res.data.companyName,
                    legalRepresentative: res.data.legalRepresentative,
                    businessLicenseNumber: res.data.businessLicenseNumber,
                    businessLicenseUrl: [res.data.businessLicenseUrl + ''],
                    contactName: res.data.contactName,
                    contactPhone: res.data.contactPhone,
                    applyReason: res.data.applyReason,
                    status: res.data.status,
                    createTime: res.data.createTime,
                });
            });
        }
    }

    componentWillUnmount() {
    }

    render() {
        let {companyName, legalRepresentative, businessLicenseNumber, contactName, contactPhone, applyReason} = this.state;

        return (
            <ViewCoat
                breadCrumb={[
                    {title: '电子签章助手'},
                    {title: '开通申请'},
                ]}
                // topView={<div>
                //     <Button>提交</Button>
                // </div>}
            >
                <div
                    style={{width: '550px', margin: '0 auto', marginBottom: '24px'}}
                >
                    <Steps size="small" current={0}>
                        <Step title={<div style={{fontSize: '14px', color: '#2B3441'}}>申请开通</div>}/>
                        <Step title={<div style={{fontSize: '14px', color: '#2B3441'}}>待审核</div>}/>
                        <Step title={<div style={{fontSize: '14px', color: '#2B3441'}}>完成</div>}/>
                    </Steps>
                </div>
                {this.makeInput('公司注册名称', companyName, (val) => {
                    this.setState({companyName: val});
                })}
                {this.makeInput('法人名称', legalRepresentative, (val) => {
                    this.setState({legalRepresentative: val});
                })}
                {this.makeInput('营业执照号码', businessLicenseNumber, (val) => {
                    this.setState({businessLicenseNumber: val});
                })}
                {this.makeInput('申请人', contactName, (val) => {
                    this.setState({contactName: val});
                })}
                {this.makeInput('联系电话', contactPhone, (val) => {
                    this.setState({contactPhone: val});
                }, 15)}
                {this.makeInput('申请理由', applyReason, (val) => {
                    this.setState({applyReason: val});
                }, 200, 'TextArea')}
                {this.makeImg('营业执照', '', (val) => {
                    this.setState({businessLicenseUrl: val});
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

    makeInput(label = '', val = '', onChange, maxLength = 30, type = 'Input', placeholder = '请输入') {
        return <div style={{marginBottom: '24px'}}>
            <span style={{
                display: 'inline-block',
                width: '100px',
                textAlign: 'right',
                marginRight: '9px',
                color: '#2B3441'
            }}>
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
                                style={{
                                    width: '356px',
                                    resize: 'none',
                                    height: '72px',
                                    lineHeight: '32px',
                                    fontSize: '14px',
                                    verticalAlign: 'top',
                                }}
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

    makeImg(label = '', val = '', onChange) {
        let {businessLicenseUrl} = this.state;

        return <div style={{marginBottom: '24px'}}>
            <span style={{
                display: 'inline-block',
                width: '100px',
                textAlign: 'right',
                marginRight: '9px',
                color: '#2B3441'
            }}>
                {label ? `${label}：` : ''}
            </span>
            <UploadImgs
                style={{
                    display: 'inline-block',
                    verticalAlign: 'top',
                    paddingTop: 0,
                    overflow: 'inherit',
                }}
                data={{
                    fileUrl: businessLicenseUrl ? businessLicenseUrl : [],
                    maxNum: 1,
                }}
                callBack={(url) => {
                    onChange && onChange(url);
                }}
            />
        </div>
    }

    onSubmit() {
        let {companyName, legalRepresentative, businessLicenseNumber, contactName, contactPhone, applyReason, businessLicenseUrl} = this.state;
        if (!companyName)
            return message.error('公司注册名称不能为空！');
        if (!legalRepresentative)
            return message.error('法人名称不能为空！');
        if (!businessLicenseNumber)
            return message.error('营业执照号码不能为空！');
        if (!contactName)
            return message.error('申请人不能为空！');
        if (!contactPhone)
            return message.error('联系电话不能为空！');
        if (!/^\d{3,15}$/.test(contactPhone))
            return message.error('只能输入3-15个数字组成的联系电话！');
        if (!applyReason)
            return message.error('申请理由不能为空！');
        if (businessLicenseUrl.length <= 0)
            return message.error('营业执照不能为空！');

        Model.openPlatformApplyAdd({
            companyName,
            legalRepresentative,
            businessLicenseNumber,
            contactName,
            contactPhone,
            applyReason,
            businessLicenseUrl: businessLicenseUrl.join(','),
        }, (res) => {
            message.success('提交成功！', 1);
            this.props.history.push('/pages/appCenter/electronicSealHelper/eshOpenApplication/openApplicationResult');
        });
    }

}

export default OpenApplication;
