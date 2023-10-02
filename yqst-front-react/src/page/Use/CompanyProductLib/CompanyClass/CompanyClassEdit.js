import React, {Component} from 'react';

import {
    Button,
    message,
    Input,
    Select,
    Switch,
    Table,
} from 'antd';
import {
    CheckOutlined,
    RollbackOutlined
} from '@ant-design/icons';
import {upload, word} from '../../../../resource';
import UploadFileMethod from '../../../../baseview/uploadFile/UploadFileMethod';
import ViewCoat from '../../PublicModule/ViewCoat/ViewCoat';

const {Option} = Select;

class CompanyClassEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            pSn: ''
        };
        this.sn = '';
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <ViewCoat
                breadCrumb={[
                    {title: '企业产品库'},
                    {
                        title: '类目列表',
                        link: '/pages/appCenter/companyProductLib/companyProductLibHome/companyClass/companyClassList'
                    },
                    {title: this.sn ? '编辑企业产品类目' : '新增企业产品类目'},
                ]}
                topView={<div>
                    <Button type="primary" icon={<CheckOutlined/>}
                            style={{
                                fontSize: '16px',
                                borderRadius: '6px',
                                paddingTop: '0px',
                                paddingBottom: '0px'
                            }}
                            onClick={() => {
                                message.warning('工程师还在紧张有序的研发中，请敬请期待！');
                            }}
                    >保存</Button>
                    <Button
                        icon={<RollbackOutlined/>}
                        style={{
                            fontSize: '16px',
                            borderRadius: '6px',
                            paddingTop: '0px',
                            paddingBottom: '0px',
                            marginLeft: '16px'
                        }}
                        onClick={() => {
                            this.props.history.push('/pages/appCenter/companyProductLib/companyProductLibHome/companyClass/companyClassList');
                        }}
                    >返回</Button>
                </div>}
            >
                {
                    this.sn ? [
                        this.TxtView('企业产品类目ID', 'LM100001'),
                        this.TxtView('创建时间', '2020.11.19 10:54')
                    ] : null
                }
                {this.InputView(
                    '类目名称',
                    this.state.name,
                    (name) => {
                        this.setState({name});
                    }
                )}
                {this.SelectView(
                    '上级类目',
                    this.state.pSn,
                    [{value: 1, name: '类目一'}, {value: 2, name: '类目二'},],
                    (key) => {
                        this.setState({pSn: key});
                    }
                )}
            </ViewCoat>
        );
    }

    SelectView(label, val, data = [], callback, placeholder = '请选择', labelSty = {}) {
        return <>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div style={{
                    color: '#2B3441',
                    paddingRight: 12,
                    ...labelSty
                }}>{label}：
                </div>
                <div style={{flex: 1}}>
                    <Select
                        showSearch
                        placeholder={placeholder}
                        value={val + ''}
                        onChange={callback && callback}
                        style={{width: 356, height: 32}}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value={''}>请选择</Option>
                        {
                            data.map(item => {
                                return <Option key={item.value} value={item.value + ''}>{item.name}</Option>
                            })
                        }
                    </Select>
                </div>
            </div>
            <div style={{height: '24px'}}/>
        </>
    }

    InputView(label, val, callback, maxLength = 50, placeholder = '请选择', labelSty = {}) {
        return <>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div style={{
                    paddingRight: 12,
                    color: '#2B3441',
                    ...labelSty
                }}>{label}：
                </div>
                <div style={{flex: 1}}>
                    <Input
                        placeholder={placeholder}
                        value={val + ''}
                        maxLength={maxLength}
                        style={{width: 356, height: 32}}
                        onChange={(e) => {
                            callback && callback(e.target.value);
                        }}
                    />
                </div>
            </div>
            <div style={{height: '24px'}}/>
        </>
    }

    TxtView(label, content) {
        return <>
            <div style={{display: 'flex', lineHeight: '32px'}}>
                <div
                    style={{
                        width: '120px',
                        textAlign: 'right',
                        color: '#2B3441',
                    }}
                >{label}：
                </div>
                <div
                    style={{
                        flex: 1,
                    }}
                >{content}</div>
            </div>
            <div style={{height: '10px'}}/>
        </>
    }
}

export default CompanyClassEdit;
