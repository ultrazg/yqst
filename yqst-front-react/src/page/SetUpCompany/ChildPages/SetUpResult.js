import React, {Component} from 'react';
import { Form, Button, Input, Select, Cascader } from 'antd';
import {succeed} from '../../../resource'
import Model from '../Model'
import './ChildCss.less';

class SetUpResult extends Component {
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
            <div className={'surCss'}>
                <h1>创建企业</h1>
                <img src={succeed} alt=""/>
                <h2>{`${this.props.companyName || 'xxx公司'}创建成功！`}</h2>
                <p>企业号：{`${this.props.accountSn}`}</p>
                <Button type="primary" onClick={() => {
                    const loginMes = localStorage.loginMes ? JSON.parse(localStorage.loginMes) : {};
                    Model.switchEnterprise({
                        accountSn: loginMes.accountSn,
                        sessionKey: loginMes.sessKey,
                    }, (res) => {
                        localStorage.accountSn = loginMes.accountSn;
                        localStorage.accountStatus = loginMes.accountStatus;
                        localStorage.admin = loginMes.admin;
                        // localStorage.domain = loginMes.domain;
                        // localStorage.erpSessionId = loginMes.erpSessionId;
                        localStorage.groupSet = JSON.stringify(loginMes.groupSet);
                        localStorage.isCerti = loginMes.isCerti;
                        localStorage.isSetPsw = loginMes.isSetPsw;
                        // localStorage.loginName = loginMes.loginName;
                        localStorage.logo = loginMes.logo;
                        localStorage.phone = loginMes.phone;
                        localStorage.sessKey = loginMes.sessKey;
                        localStorage.staffName = loginMes.staffName;
                        // localStorage.type = loginMes.type;
                        localStorage.uid = loginMes.uid;
                        localStorage.userAlias = loginMes.userAlias;
                        // localStorage.userEmail = loginMes.userEmail;
                        localStorage.userId = loginMes.userId;
                        localStorage.userAlias = loginMes.userAlias;
                        // localStorage.userNo = loginMes.userNo;
                        localStorage.userPhoto = loginMes.userPhoto;
                        localStorage.openId = loginMes.openId;
                        localStorage.company = loginMes.company;
                        localStorage.userSn = loginMes.userSn;
                        setTimeout(() => {
                            this.props.history.push('/pages/home');
                            localStorage.removeItem('loginMes');
                        }, 600);

                    });
                }}>立即进入</Button>
            </div>
        );
    }
}

export default SetUpResult;
