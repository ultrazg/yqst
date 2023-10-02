import React, {Component} from 'react';
import {Button, Steps, Input, Select} from 'antd';
import ViewCoat from '../../../PublicModule/ViewCoat/ViewCoat';

const {Step} = Steps;
const {TextArea} = Input;
const {Option} = Select;

class BTBPersonRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
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
                        <Step title={<div style={{fontSize: '14px', color: '#2B3441'}}>提交申请</div>}/>
                        <Step title={<div style={{fontSize: '14px', color: '#2B3441'}}>审核</div>}/>
                        <Step title={<div style={{fontSize: '14px', color: '#2B3441'}}>完成</div>}/>
                    </Steps>
                </div>
                {this.makeInput('用户姓名', '', (val) => {
                    // this.setState({companyName: val});
                })}
                {this.makeInput('用户手机', '', (val) => {
                    // this.setState({companyName: val});
                })}
                {this.makeInput('身份证', '', (val) => {
                    // this.setState({legalRepresentative: val});
                })}
                {this.makeSelect('认证类型', '', (val) => {
                    // this.setState({businessLicenseNumber: val});
                }, [{value: '1', name: '银行卡'}, {value: '2', name: '运营商'}])}
                {this.makeInput('银行账号', '', (val) => {
                    // this.setState({contactName: val});
                })}
                <Button type="primary"
                        style={{width: '64px', height: '32px', fontSize: '16px', marginTop: '8px'}}
                        onClick={() => {
                            // this.onSubmit();
                            this.props.history.push('/pages/appCenter/btbEnterpriseWallet/btbRegister/btbPersonRegisterResult');
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

    makeSelect(label = '', val = '', onChange, list = [], placeholder = '请输入') {
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
            <Select
                placeholder={placeholder}
                value={val + ''}
                style={{width: '356px'}}
                onChange={(val) => {
                    onChange && onChange(val);
                }}
            >
                <Option value={''}>请选择</Option>
                {
                    list.map(item => {
                        return <Option key={item.value + ''} value={item.value + ''}>{item.name}</Option>
                    })
                }
            </Select>
        </div>
    }

}

export default BTBPersonRegister;
