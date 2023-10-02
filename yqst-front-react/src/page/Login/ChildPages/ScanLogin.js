import React, {Component} from 'react';
import { Form, Tabs, Input, Button, Row, Col, message, Spin, Modal } from 'antd';
import Model from '../Model'
import QRCode from 'qrcode.react';
import {backQR, qrImg} from '../../../resource'

const { TabPane } = Tabs;

class ScanLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            codeSn: '',
        };
        this.times = '';
        // this.stopAllTimer = true;
    }

    componentDidMount(){
        this.getLoginQrCode();
    }

    componentWillUnmount() {
        this.timer_getcode && clearInterval(this.timer_getcode);
        this.times && clearInterval(this.times);
    }

    render() {
        const {codeSn} = this.state;

        return (
            <div className={'ScanLoginCss'}>
                <img src={backQR} alt="" title={'密码登录'} onClick={() => {
                    // this.props.history.push('/users/login/index');
                    this.props.callBack && this.props.callBack();
                }}/>
                <div>
                    <h1>扫描登录</h1>
                    {/*<img src={qrImg} alt=""/>*/}
                    {
                        !codeSn && <Spin size="large" />
                    }
                    {
                        codeSn && <QRCode style={{width: '200px', height: '200px'}}
                            // size={document.documentElement.clientHeight * 0.25}
                            fgColor={window.globalConfig.themeColor}
                            value={'http://down.sunaw.com/ch?code=' + this.state.codeSn}/>
                    }
                    <div className={'footerText'}>打开<a>{window.globalConfig.title}APP</a></div>
                    <div>在「消息」页面右上角打开扫一扫</div>
                </div>
            </div>
        );
    }

    stopAllTimer = false;

    getLoginQrCode(){
        Model.getLoginQrCode({}, (res) => {
            this.setState({codeSn: res.data}, () => {
                this.loadCodeStatus(res.data);
            });
        }, () => {
            if (!this.stopAllTimer)
                this.timer_getcode = setTimeout(() => {
                    this.getLoginQrCode();
                }, 3 * 1000);
        });
    }

    loadCodeStatus(codeSn){
        Model.LoginWithQrCode({codeSn}, (res) => {
            this.stopAllTimer = true;
            // localStorage.loginMes = res.data ? JSON.stringify(res.data) : null;

            message.success('成功进入！', 1);
            localStorage.accountSn = res.data.accountSn;
            localStorage.admin = res.data.admin;
            localStorage.logo = res.data.logo;
            localStorage.openId = res.data.openId;
            // localStorage.isCerti = res.data.isCerti;
            // localStorage.groupSet = res.data.groupSet ? JSON.stringify(res.data.groupSet) : null;
            localStorage.accountStatus = res.data.accountStatus;
            localStorage.isSetPsw = res.data.isSetPsw;
            localStorage.phone = res.data.phone;
            localStorage.sessKey = res.data.sessKey;
            localStorage.staffName = res.data.staffName;
            localStorage.uid = res.data.uid;
            localStorage.userAlias = res.data.userAlias;
            localStorage.userId = res.data.userId;
            localStorage.userAlias = res.data.userAlias;
            localStorage.userPhoto = res.data.userPhoto;

            setTimeout(() => {
                // this.props.history.push('/users/setUpCompany/index');
                this.props.history.push('/pages/home/index');
            }, 10);

            // // accountStatus 帐号状态 -1:未创建 1：正在创建中 2：创建成功 3：禁用4：创建失败
            // if (res.data.accountStatus == 2) {
            //     switch (res.data.codeType) {
            //         case 'odoo':
            //             message.info('ERP登录成功', 2);
            //             this.tempParams = {
            //                 webUrl: res.data.webUrl,
            //                 login: res.data.loginName,
            //                 password: res.data.password,
            //                 menu_id: 82,
            //                 action: 92,
            //                 active_id: 'channel_inbox'
            //             };
            //             setTimeout(() => {
            //                 window.openPostWindow.run(this.tempParams.webUrl + '/url_redict', this.tempParams, '_self');
            //             }, 1 * 1000);
            //             break;
            //         case 'xiaoma':
            //             message.info('小马登录成功', 2);
            //             setTimeout(() => {
            //                 window.location.href = res.data.url;
            //             }, 1 * 1000);
            //             break;
            //         default:
            //             message.success('登录成功！');
            //             localStorage.accountSn = res.data.accountSn;
            //             localStorage.accountStatus = res.data.accountStatus;
            //             localStorage.admin = res.data.admin;
            //             localStorage.domain = res.data.domain;
            //             localStorage.erpSessionId = res.data.erpSessionId;
            //             localStorage.groupSet = JSON.stringify(res.data.groupSet);
            //             localStorage.isCerti = res.data.isCerti;
            //             localStorage.isSetPsw = res.data.isSetPsw;
            //             localStorage.loginName = res.data.loginName;
            //             localStorage.logo = res.data.logo;
            //             localStorage.phone = res.data.phone;
            //             localStorage.sessKey = res.data.sessKey;
            //             localStorage.staffName = res.data.staffName;
            //             localStorage.type = res.data.type;
            //             localStorage.uid = res.data.uid;
            //             localStorage.userAlias = res.data.userAlias;
            //             localStorage.userEmail = res.data.userEmail;
            //             localStorage.userId = res.data.userId;
            //             localStorage.userAlias = res.data.userAlias;
            //             localStorage.userNo = res.data.userNo;
            //             localStorage.userPhoto = res.data.userPhoto;
            //             localStorage.openId = res.data.openId;
            //             setTimeout(() => {
            //                 this.props.history.push('/pages/home');
            //             }, 600);
            //             break;
            //     }
            // } else {
            //     Modal.error({
            //         title: ((() => {
            //             switch (res.data.accountStatus) {
            //                 case -1:
            //                     return '未创建企业或加入企业,请到APP操作后再登录';
            //                 case 1:
            //                     return '正在创建企业中,请稍后再试';
            //                 case 3:
            //                     return '账号被禁用,请稍后再试';
            //                 case 4:
            //                     return '账号异常,请稍后再试';
            //                 default:
            //                     return '';
            //             }
            //         })())
            //     });
            // }

        }, () => {
            if (!this.stopAllTimer)
                this.times = setTimeout(() => {
                    this.loadCodeStatus(codeSn);
                }, 4 * 1000);
        });
    }
}

export default ScanLogin;
