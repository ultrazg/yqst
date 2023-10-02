import React, {Component} from 'react';
import { Form, Tabs, Input, Button, Row, Col, message } from 'antd';
import {succeed} from '../../../resource'
import Model from "../../SetUpCompany/Model";

const { TabPane } = Tabs;

class SetPasswordRes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginMes: localStorage.loginMes ? JSON.parse(localStorage.loginMes) : null,
        };
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        let {loginMes} = this.state;

        return (
            <div className={'LRCss'}>
                <img src={succeed} alt=""/>
                <div className={'resText'}>账户注册成功！</div>
                <p>为确保有效的使用软件服务，请立即创建或加入企业</p>
                <div className={'footerBtn'}>
                    <Button type="primary"
                        onClick={() => {
                            Model.switchEnterprise({
                                accountSn: loginMes.accountSn,
                                sessionKey: loginMes.sessKey,
                            }, (res) => {
                                message.success('成功进入！', 1);
                                // localStorage.accountSn = loginMes.accountSn;
                                localStorage.accountSn = res.data.accountSn || loginMes.accountSn;
                                localStorage.accountStatus = loginMes.accountStatus;
                                localStorage.admin = loginMes.admin;
                                // localStorage.domain = loginMes.domain;
                                // localStorage.erpSessionId = loginMes.erpSessionId;
                                localStorage.groupSet = JSON.stringify(loginMes.groupSet);
                                localStorage.isCerti = loginMes.isCerti;
                                localStorage.isSetPsw = loginMes.isSetPsw;
                                // localStorage.loginName = loginMes.loginName;
                                // localStorage.logo = loginMes.logo;
                                localStorage.logo = res.data.logo || loginMes.companyLogo;
                                localStorage.phone = loginMes.phone;
                                localStorage.sessKey = loginMes.sessKey;
                                // localStorage.staffName = loginMes.staffName;
                                localStorage.staffName = loginMes.staffName;
                                // localStorage.type = loginMes.type;
                                // localStorage.uid = loginMes.uid;
                                localStorage.uid = loginMes.uid;
                                localStorage.userAlias = loginMes.userAlias;
                                // localStorage.userEmail = loginMes.userEmail;
                                localStorage.userId = loginMes.userId;
                                localStorage.userAlias = loginMes.userAlias;
                                // localStorage.userNo = loginMes.userNo;
                                localStorage.userPhoto = loginMes.userPhoto;
                                localStorage.openId = res.data.openId || loginMes.openId;
                                setTimeout(() => {
                                    this.props.history.push('/pages/home/index');
                                    localStorage.removeItem('loginMes');
                                }, 600);
                            }, (err) => {});
                        }}
                    >进入企业</Button>
                </div>
            </div>
        );
    }
}

export default SetPasswordRes;
