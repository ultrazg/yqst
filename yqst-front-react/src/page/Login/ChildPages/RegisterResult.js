import React, {Component} from 'react';
import { Form, Tabs, Input, Button, Row, Col } from 'antd';
import {succeed} from '../../../resource'

const { TabPane } = Tabs;

class RegisterResult extends Component {
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
            <div className={'LRCss'}>
                <img src={succeed} alt=""/>
                <div className={'resText'}>账户注册成功！</div>
                <p>为确保有效的使用软件服务，请立即创建或加入企业</p>
                <div className={'footerBtn'}>
                    <Button type="primary" onClick={() => {
                        this.props.history.push(`/users/setUpCompany/index?step=2`);
                    }}>创建企业</Button>
                    <span/>
                    <Button onClick={() => {
                        this.props.history.push(`/users/setUpCompany/index?step=3`);
                        // this.props.history.push('/users/setUpCompany/joinCompany');
                    }}>进入企业</Button>
                </div>
            </div>
        );
    }
}

export default RegisterResult;
