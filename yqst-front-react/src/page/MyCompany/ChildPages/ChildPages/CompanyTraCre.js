import React, { Component } from 'react';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input, Button, Row, Col, message, Modal, Radio } from 'antd';
import { warning } from '../../../../resource'
import Model from '../../Model'
import TencentCaptcha from 'TencentCaptcha';
import ApiConst from '../../../../base/urls/ApiConst';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 17 },
    },
};

class CompanyTraCre extends Component {
    constructor(props) {
        super(props);
        this.state = {
            codeVisible: false,
            chooseVisible: false,
            List: [],   // 员工列表
            filterList: [],
            timeNum: 0, // 验证码倒计时
            searchText: '', // 搜索文本
            selectObj: null,
        };
        this.time = null;
        this.formRef = React.createRef();
        this.SMScaptcha = new TencentCaptcha(ApiConst.CaptchaAppId,
            (res) => {
                if (res.ret) {
                    return;
                }
                const phone = localStorage.phone;
                Model.GetVerificationCode({ phone }, res => {
                    this.setState({
                        timeNum: 60
                    }, () => {
                        this.ShowCountdown()
                    })
                })
            });
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        clearInterval(this.time);
    }

    render() {
        return (
            <div id='CompanyTraCre' className={'ctcCss'} style={{ textAlign: 'center', fontSize: '14px' }}>
                <img style={{ width: '114px', marginTop: '79px' }} src={warning} alt="" />
                <p style={{ marginBottom: '8px', marginTop: '15px', color: '#2B3441' }}>转让企业创建者</p>
                <div style={{ color: 'rgba(43,52,65,0.65)' }}>通过身份认证后，指定当前企业一位成员成为企业创建者；转让后你的身份将变成员工</div>
                <Button
                    type="primary"
                    style={{ marginTop: '24px', width: '96px', height: '32px', fontSize: '16px', padding: '0px' }}
                    onClick={() => {
                        this.setState({ codeVisible: true });
                    }}
                >确认转让</Button>
                {this.makeModView()}
                {this.makeChooseTransferModal()}
            </div>
        );
    }

    GetVerificationCode = () => {
        const phone = localStorage.phone;
        if (!phone) {
            return message.error('手机号码不能为空！');
        }
        this.SMScaptcha.show();
    };

    CheckVerificationCode = () => {
        const { getFieldValue } = this.formRef.current;
        const code = getFieldValue('code');
        const phone = localStorage.phone;
        if (!phone) {
            return message.error('手机号码不能为空！');
        } else if (!code) {
            return message.error('验证码不能为空！');
        }

        Model.CheckVerificationCode({
            phone,
            code
        }, res => {
            this.GetEmployeeList();
            this.setState({
                chooseVisible: true,
                codeVisible: false
            })
        })
    };

    GetEmployeeList = () => {
        Model.GetEmployeeList({}, res => {
            this.setState({
                List: res.data,
                filterList: res.data
            })
        })
    };

    ShowCountdown = () => {
        if (this.time) clearInterval(this.time);

        this.time = setInterval(() => {
            const { timeNum } = this.state;
            if (timeNum <= 0) {
                clearInterval(this.time);
                return;
            }
            setTimeout(() => {
                this.setState({
                    timeNum: timeNum - 1
                })
            }, 0)
        }, 1000)
    };

    makeModView() {
        const { timeNum } = this.state;
        return <Modal
            title="身份验证"
            visible={this.state.codeVisible}
            onOk={() => { }}
            onCancel={() => {
                this.setState({ codeVisible: false });
            }}
            className={'Modal'}
            closable={false}
            width={564}
            footer={<div style={{ margin: '6px 0' }}>
                <Button type="primary"
                    style={{ width: '64px', height: '32px', fontSize: '16px', marginRight: '16px' }}
                    onClick={this.CheckVerificationCode}
                >确认</Button>
                <Button
                    style={{ width: '64px', height: '32px', fontSize: '16px' }}
                    onClick={() => {
                        this.setState({ codeVisible: false });
                    }}
                >取消</Button>
            </div>}
        >
            <div style={{ fontSize: '14px' }}>
                <div style={{ color: '#FACC14', marginBottom: '20px' }}>为了确保信息安全，请输入手机验证吗</div>
                <Row>
                    <Col span={18}>
                        <Form ref={this.formRef} scrollToFirstError={true} {...formItemLayout} autoComplete="off" className={'Form'}>
                            <Form.Item label="绑定手机号码" name={'phone'} rules={[
                                {
                                    required: true,
                                    message: '手机号码不能为空!',
                                },
                            ]}>
                                <Input
                                    maxLength={11}
                                    placeholder={localStorage.phone}
                                    disabled={true}
                                />
                            </Form.Item>
                            <Form.Item label="验证码" name={'code'} rules={[
                                {
                                    required: true,
                                    message: '验证码不能为空!',
                                },
                            ]}>
                                <Input
                                    maxLength={8}
                                    placeholder="请输入验证码"
                                />
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col span={6} style={{ textAlign: 'right', marginTop: '2px' }}>
                        <Button
                            type="primary"
                            style={{ width: '112px', height: '32px', fontSize: '16px' }}
                            onClick={this.GetVerificationCode}
                            disabled={timeNum}
                        >
                            {
                                timeNum ? `${timeNum}s` : '获取验证码'
                            }
                        </Button>
                    </Col>
                </Row>
            </div>
        </Modal>
    }

    makeChooseTransferModal = () => {
        let { searchText, filterList, chooseVisible, selectObj } = this.state;

        return (
            <Modal
                className={'Modal'}
                title="选择转让者"
                visible={chooseVisible}
                closable={false}
                onOk={this.transferAdmin}
                onCancel={() => {
                    this.setState({
                        chooseVisible: false,
                        selectObj: null
                    })
                }}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 0 }}
                footer={<div style={{ margin: '6px 0' }}>
                    <Button type="primary"
                        style={{ width: '64px', height: '32px', fontSize: '16px', marginRight: '16px' }}
                        onClick={this.transferAdmin}
                    >确认</Button>
                    <Button
                        style={{ width: '64px', height: '32px', fontSize: '16px' }}
                        onClick={() => {
                            this.setState({
                                chooseVisible: false,
                                selectObj: null
                            })
                        }}
                    >取消</Button>
                </div>}
            >
                <div style={{ width: 380, height: 300, border: '1px solid #d9d9d9', borderRadius: 6 }}>
                    {/*top*/}
                    <div style={{ padding: '5px 0px 5px 15px', fontSize: 14, borderBottom: '1px solid #d9d9d9' }}>
                        选择：{this.getSelectName()}
                    </div>
                    {/*search*/}
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px 10px 5px 10px' }}>
                        <Input
                            placeholder="搜索"
                            prefix={<SearchOutlined />}
                            value={searchText}
                            onChange={e => {
                                this.setState({
                                    searchText: e.target.value
                                }, () => {
                                    this.filterForSearchText();
                                })
                            }}
                        />
                    </div>
                    {/*list*/}
                    <p style={{ fontSize: 14, padding: '5px 0px 5px 10px', marginBottom: 0 }}>
                        {localStorage.company}
                    </p>
                    <Radio.Group onChange={(e) => {
                        this.setState({
                            selectObj: e.target.value
                        })
                    }} value={selectObj} style={{ width: '100%' }}>
                        <ul style={{ width: '100%', padding: '0px 15px 6px', height: 180, overflow: 'auto' }}>
                            {
                                filterList && filterList.map(item => {
                                    const { staffAccount, staffName } = item;
                                    return (
                                        <li key={staffAccount} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: 36, fontSize: 14 }}>
                                            {/*left*/}
                                            <span>
                                                <UserOutlined style={{ color: '#2593fc' }} />
                                                <span style={{ marginLeft: 10 }}>{staffName}</span>
                                            </span>
                                            {/*right*/}
                                            <Radio value={item} />
                                        </li>
                                    );
                                })
                            }
                        </ul>

                    </Radio.Group>

                </div>
            </Modal>
        );
    };

    transferAdmin = () => {
        const { selectObj } = this.state;
        if (selectObj) {
            if (selectObj.isAdmin == 1) {
                return message.info('已经是管理员，无需转让');
            }
            this.confirmModal = Modal.confirm({
                title: '提示',
                content: `转让了管理员之后，就不能执行管理员的权限了。确定要转让给${selectObj.staffName}吗？`,
                okText: '确定',
                okType: 'danger',
                cancelText: '取消',
                onOk: () => {
                    Model.ChangeAdmin({
                        staffId: selectObj.staffAccount
                    }, res => {
                        this.setState({
                            chooseVisible: false
                        });
                        Modal.success({
                            content: `转让企业成功！请重新登录!`,
                            okText: '确定',
                            okType: 'primary',
                            onOk: () => {
                                localStorage.clear();
                                this.props.history.replace('/users/login/index');
                            }
                        })
                    });
                },
                onCancel: () => {
                    this.confirmModal.destroy();
                },
            })
        } else {
            message.info('没有选择转让的员工');
        }
    };

    getSelectName = () => {
        const { selectObj, List } = this.state;
        if (!selectObj) {
            return '';
        }

        for (let i = 0; i < List.length; i++) {
            if (List[i].staffAccount === selectObj.staffAccount) {
                return selectObj.staffName
            }
        }

    };

    filterForSearchText = () => {
        let { searchText, List } = this.state;
        if (searchText) {
            let filterList = List.filter(item => {
                return item.staffName.indexOf(searchText) !== -1
            });

            this.setState({
                filterList
            })
        } else {
            this.setState({
                filterList: List
            })
        }
    };
}

export default CompanyTraCre;
