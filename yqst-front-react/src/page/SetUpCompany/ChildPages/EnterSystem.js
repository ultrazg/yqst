import React, {Component} from 'react';
import {SearchOutlined} from '@ant-design/icons';
import {Form, Button, Input, Select, Cascader, message, Spin, Modal} from 'antd';
import './ChildCss.less';
import Model from "../Model";
import {head, loginCover, logo} from "../../../resource";

const {Option} = Select;
const {Search} = Input;

class EnterSystem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginMes: localStorage.loginMes ? JSON.parse(localStorage.loginMes) : null,
            list: [],
            isSpin: true,
            isShowSearch: false
        };
    }

    componentDidMount() {
        this.getCompanyList();
    }

    componentWillUnmount() {

    }

    toActive(accountSn) {
        Model.activeEnterprise({
            sessionKey: this.state.loginMes.sessKey || "",
            accountSn: accountSn
        }, (res) => {
            message.info("激活成功")
            this.getCompanyList();
        }, () => {

        })
    }

    render() {
        let {onSetUpBtn, onAddBtn} = this.props, {list, loginMes, isSpin, isShowSearch} = this.state;
        return (
            <div className={'esCss'} style={{display: 'flex', flex: 1}}>
                <div className='content-left'>
                    <img src={loginCover} alt=""/>
                    <div className='content-leftDiv'>
                        <div>
                            <img src={window.globalConfig.logo} alt=""/>
                            <h1>{window.globalConfig.title}</h1>
                            {window.globalConfig.desc}
                        </div>
                    </div>
                </div>
                <div className='content-right'>
                    <h1
                        style={{
                            position: 'relative',
                        }}
                    >
                        登录成功，选择已有企业进入
                        <SearchOutlined
                            title={'搜索'}
                            className={!isShowSearch ? 'es_Icon es_ShowIcon' : 'es_Icon es_HideIcon'}
                            onClick={() => {
                                this.setState({isShowSearch: !this.state.isShowSearch});
                            }}/>
                        <Search
                            className={isShowSearch ? 'es_showSearch es_Search' : 'es_Search es_hideSearch'}
                            placeholder="请输入"
                            maxLength={30}
                            onSearch={(value, e) => {
                                // 回车的时候搜索，点击的时候隐藏
                                if ('13' === '' + e.keyCode) {
                                    const newList = list.map(item => {
                                        return {
                                            ...item,
                                            isHide: item.companyName.indexOf(value) >= 0 ? false : true
                                        }
                                    });
                                    this.setState({list: newList});

                                } else {
                                    let newList = this.state.list.map(item => {
                                        return {
                                            ...item,
                                            isHide: false
                                        }
                                    });
                                    this.setState({isShowSearch: false, list: newList});

                                }

                            }}
                            onChange={(e) => {
                                const newList = list.map(item => {
                                    return {
                                        ...item,
                                        isHide: item.companyName.indexOf(e.target.value) >= 0 ? false : true
                                    }
                                });
                                this.setState({list: newList});
                            }}
                        />
                    </h1>
                    {
                        isSpin ? <Spin size="large"
                                       style={{marginTop: '100px'}}
                        /> : null
                    }
                    <div className={'listDiv'}>
                        {
                            list && list.map((item, idx) => {
                                if (item.isHide)
                                    return null;

                                const names = item.companyName && item.companyName.length > (item.insteadStatus == 1 ? 10 : 12) ?
                                    `${item.companyName.slice(0, (item.insteadStatus == 1 ? 10 : 12))}...` : item.companyName;
                                return <div className={'companyList'} key={'com_' + idx} title={item.companyName}
                                            style={{paddingLeft: 0}}
                                            onClick={() => {
                                                if (item.insteadStatus == 1) {
                                                    Modal.confirm({
                                                        title: '确认激活该企业?',
                                                        content: '',
                                                        okText: '确认激活',
                                                        cancelText: '再想想',
                                                        width: 220,
                                                        onOk: () => {
                                                            this.toActive(item.accountSn);
                                                        },
                                                        onCancel: () => {
                                                            // console.log('Cancel');
                                                        },
                                                    });
                                                    return;
                                                }
                                                Model.switchEnterprise({
                                                    accountSn: item.accountSn,
                                                    sessionKey: loginMes.sessKey,
                                                }, (res) => {
                                                    message.success('成功进入！', 1);
                                                    // localStorage.accountSn = loginMes.accountSn;
                                                    localStorage.accountSn = res.data.accountSn || item.accountSn;
                                                    localStorage.admin = res.data.admin;
                                                    localStorage.logo = res.data.logo || item.companyLogo;
                                                    localStorage.openId = res.data.openId || loginMes.openId;
                                                    // localStorage.userEmail = res.data.userEmail || loginMes.userEmail;
                                                    localStorage.isCerti = res.data.isCerti || loginMes.isCerti;
                                                    localStorage.groupSet = res.data.groupSet ? JSON.stringify(res.data.groupSet) : JSON.stringify(loginMes.groupSet);
                                                    localStorage.accountStatus = loginMes.accountStatus;
                                                    // localStorage.domain = loginMes.domain;
                                                    // localStorage.erpSessionId = loginMes.erpSessionId;
                                                    localStorage.isSetPsw = loginMes.isSetPsw;
                                                    // localStorage.loginName = loginMes.loginName;
                                                    // localStorage.logo = loginMes.logo;
                                                    localStorage.phone = loginMes.phone;
                                                    localStorage.sessKey = loginMes.sessKey;
                                                    // localStorage.staffName = loginMes.staffName;
                                                    localStorage.staffName = item.staffName;
                                                    // localStorage.type = loginMes.type;
                                                    // localStorage.uid = loginMes.uid;
                                                    localStorage.uid = item.uid;
                                                    localStorage.userAlias = loginMes.userAlias;
                                                    localStorage.userId = loginMes.userId;
                                                    localStorage.userAlias = loginMes.userAlias;
                                                    // localStorage.userNo = loginMes.userNo;
                                                    localStorage.userPhoto = loginMes.userPhoto;
                                                    localStorage.personSn = loginMes.personSn;
                                                    localStorage.userSn = loginMes.userSn;
                                                    setTimeout(() => {
                                                        this.props.history.push('/pages/home');
                                                        localStorage.removeItem('loginMes');
                                                    }, 600);
                                                }, (err) => {
                                                });
                                            }}
                                >
                                    {item.insteadStatus == 1 ? <span style={{
                                        backgroundColor: 'red',
                                        color: '#fff',
                                        fontSize: 10,
                                        borderRadius: 4,
                                        padding: 2,
                                        marginRight: 6
                                    }}>待激活</span> : <span style={{
                                        padding: 6,
                                        marginRight: 4
                                    }}> </span>}
                                    <img src={item.companyLogo || window.globalConfig.logo} alt=""
                                         style={{borderRadius: '6px', width: '32px', height: '32px'}}
                                    />
                                    <span>{names}</span>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }

    getCompanyList() {
        Model.GetEnterpriseList({
            sessionKey: this.state.loginMes.sessKey
        }, (res) => {
            const list = res.data && res.data.map(item => {
                return {
                    ...item,
                    isHide: false
                }
            });
            this.setState({list, isSpin: false});
        }, (err) => {
        });
    }

}

export default EnterSystem;
