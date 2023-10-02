import React, {Component} from 'react';
import {LeftOutlined} from '@ant-design/icons';
import {Form, Button, Input, Cascader} from 'antd';
import {succeed} from '../../../resource';
import Model from "../Model";
import CityData from "../../../resource/SwCityData";


class FoundCompany extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            resMes: {},
            indList: []
        };
    }

    componentDidMount() {
        this.getUserIList();
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className={'fouComCss'}>
                <Button style={{height: '32px', fontSize: '14px'}} icon={<LeftOutlined/>} onClick={() => {
                    this.props.history.push('/pages/home/index');
                }}>返回</Button>
                {this.stepView()}
            </div>
        );
    }

    getUserIList() {
        Model.UserIList({}, (res) => {
            const indList = res.data && res.data.map(item => {
                item.childList = item.childList && item.childList.map(cItem => {
                    return {
                        ...cItem,
                        value: cItem.id,
                        label: cItem.industryName,
                    }
                });
                item.children = item.childList;
                delete item.childList;
                return {
                    ...item,
                    value: item.id,
                    label: item.industryName,
                }
            });
            this.setState({indList})
        }, (err) => {
        });
    }

    stepView() {
        let {step, resMes, indList} = this.state;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 4},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 20},
            },
        };
        switch (step + '') {
            case '2': // 创建成功页面
                return <div style={{textAlign: 'center'}}>
                    <h1>创建企业</h1>
                    <img src={succeed} alt=""
                         style={{width: '77px', marginTop: '11px'}}
                    />
                    <h2 style={{
                        fontSize: '14px',
                        marginTop: '17px',
                        marginBottom: '10px'
                    }}>{`${resMes.companyName || ''}创建成功！`}</h2>
                    <p style={{
                        fontSize: '12px',
                        marginBottom: '40px',
                        color: 'rgba(43,52,65,0.45)',
                    }}>企业号：{`${resMes.accountSn || ''}`}</p>
                    <div>
                        <Button type="primary"
                                style={{width: '92px', height: '40px', fontSize: '16px', marginRight: '16px'}}
                                onClick={() => {
                                    this.props.history.push('/pages/home/index');
                                }}
                        >返回首页</Button>
                        <Button
                            style={{width: '92px', height: '40px', fontSize: '16px'}}
                            onClick={() => {
                                Model.SwitchEnterprise({
                                    accountSn: this.state.resMes.accountSn

                                }, (res) => {
                                    localStorage.accountSn = res.data.accountSn;
                                    localStorage.accountStatus = res.data.accountStatus;
                                    localStorage.admin = res.data.admin;
                                    // localStorage.domain = res.data.domain;
                                    // localStorage.erpSessionId = res.data.erpSessionId;
                                    localStorage.isCerti = res.data.isCerti;
                                    localStorage.logo = res.data.logo;
                                    localStorage.staffName = res.data.staffName;
                                    // localStorage.userNo = res.data.userNo;
                                    localStorage.company = res.data.company;
                                    localStorage.sessionKeyPicc = '';      //清除人保登录的sessionkey
                                    if (res.data.openId)
                                        localStorage.openId = res.data.openId;

                                    // window.location.href = "/#/pages/home/index";
                                    window.location.href = "/";

                                }, (err) => {
                                });
                            }}
                        >立即进入</Button>
                    </div>
                </div>;

            case '1': // 创建企业页面
            default:
                return <div>
                    <h1>创建企业</h1>
                    <Form ref={(c) => this.form = c} autoComplete="off" {...formItemLayout}
                          className={'formCss'} onFinish={this.onSubmit.bind(this)} scrollToFirstError={true}>
                        <Form.Item label="企业名称" name={'companyName'} rules={[
                            {
                                required: true,
                                message: '企业名称不能为空!',
                            }
                        ]}>
                            <Input
                                maxLength={30}
                                placeholder="请输入企业名称"
                            />
                        </Form.Item>
                        <Form.Item label="所属行业" name={'industryId'} rules={[
                            {
                                required: true,
                                message: '所属行业不能为空!',
                            }
                        ]}>
                            <Cascader
                                popupClassName={'fouComCss_hyCas'}
                                placeholder="请选择所属行业"
                                options={indList}
                                showSearch={{
                                    filter: (inputValue, path) => {
                                        return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
                                    }
                                }}
                            />
                            {/*<Select
                                showSearch
                                placeholder="请选择所属行业"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {
                                    indList && indList.map((item, idx) => {
                                        return <Option key={'opt_' + idx} value={item.id}>
                                            {item.industryName}
                                        </Option>
                                    })
                                }
                            </Select>*/}
                        </Form.Item>
                        <Form.Item label="所在地区" name={'regionId'} rules={[
                            {
                                required: true,
                                message: '所在地区不能为空!',
                            }
                        ]} initialValue={['87', '486', '850']}>
                            <Cascader
                                popupClassName={'fouComCss_cas'}
                                options={CityData.data}
                                placeholder="请选择所在地区"
                                showSearch={{
                                    filter: (inputValue, path) => {
                                        return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
                                    }
                                }}
                            />
                        </Form.Item>
                        <div className={'btn'}>
                            <Button type="primary" htmlType="submit"
                                // onClick={() => {
                                //     this.props.history.push('/users/setUpCompany/setUpResult');
                                // }}
                            >
                                创建企业
                            </Button>
                        </div>
                    </Form>
                </div>;
        }
    }

    onSubmit = (values) => {
        if (values.regionId[2]) {
            values.regionId = values.regionId[2];

        } else if (values.regionId[1]) {
            values.regionId = values.regionId[1];

        } else {
            values.regionId = values.regionId[0];

        }
        values.industryId = values.industryId[1];

        Model.CreatEnterprise({
            ...values,
        }, (res) => {
            this.setState({resMes: res.data, step: 2});
        }, (err) => {
        });
    }
}

export default FoundCompany;
