import React, {Component} from 'react';
import {Button, Steps} from 'antd';
import ViewCoat from '../../../PublicModule/ViewCoat/ViewCoat';

const {Step} = Steps;

class BTBPersonRegisterResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {
                status: 3
            },
        };
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        let {info} = this.state;
        const current = (status) => {
            switch (status + '') {
                case '1':
                    return 1;

                case '3':
                    return 1;

                default:
                    return 0;
            }
        };

        return (
            <ViewCoat
                breadCrumb={[
                    {title: 'B2B企业钱包'},
                    {title: '申请商户号'},
                ]}
                topView={<div>
                    <Button>重新审核</Button>
                </div>}
            >
                <div
                    style={{width: '550px', margin: '0 auto', marginBottom: '24px'}}
                >
                    <Steps size="small" current={current(info.status)}
                           status={'3' === '' + info.status ? 'error' : 'wait'}>
                        <Step title={<div style={{fontSize: '14px', color: '#2B3441'}}>已申请</div>}/>
                        <Step
                            title={<div style={{fontSize: '14px', color: '#2B3441'}}>
                                {'1' === '' + info.status && '审核协商中'}
                                {'3' === '' + info.status && '驳回'}
                            </div>}
                        />
                        <Step title={<div style={{fontSize: '14px', color: '#2B3441'}}>完成</div>}/>
                    </Steps>
                </div>
                {this.makeText('用户姓名', info.companyName)}
                {this.makeText('用户手机', info.legalRepresentative)}
                {this.makeText('身份证', info.businessLicenseNumber)}
                {this.makeText('认证类型', info.contactName)}
                {this.makeText('银行账号', info.contactPhone)}
                {
                    '3' === '' + info.status ? this.makeText('驳回理由', info.rejectReason) : null
                }
            </ViewCoat>
        );
    }

    makeText(label = '', val = '', type = 'Text') {
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
                        case 'Img':
                            return <img src={val || ''} alt=""
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

}

export default BTBPersonRegisterResult;
