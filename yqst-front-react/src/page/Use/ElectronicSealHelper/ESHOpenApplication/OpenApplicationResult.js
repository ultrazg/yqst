import React, {Component} from 'react';
import {Button, Menu, Steps, Input} from 'antd';
import ViewCoat from '../../PublicModule/ViewCoat/ViewCoat';
import Model from "../Model";

const {Step} = Steps;

class OpenApplicationResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {}
        };
    }

    componentDidMount() {
        Model.openPlatformApplyGet({}, (res) => {
            this.setState({info: res.data});
        });
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
                    {title: '电子签章助手'},
                    {title: '开通申请'},
                ]}
                topView={<div>
                    {
                        '3' === '' + info.status ? <Button type="primary"
                                                           onClick={() => {
                                                               this.props.history.push(`/pages/appCenter/electronicSealHelper/eshOpenApplication/openApplication?isEdit=true`);
                                                           }}
                        >重新提交</Button> : null
                    }
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
                {this.makeText('公司注册名称', info.companyName)}
                {this.makeText('法人名称', info.legalRepresentative)}
                {this.makeText('营业执照号码', info.businessLicenseNumber)}
                {this.makeText('申请人', info.contactName)}
                {this.makeText('联系电话', info.contactPhone)}
                {this.makeText('申请理由', info.applyReason)}
                {this.makeText('营业执照', info.businessLicenseUrl, 'Img')}
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

export default OpenApplicationResult;
