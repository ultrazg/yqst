import React, {Component} from 'react';
import { Form, Tabs, Input, Button, Row, Col } from 'antd';
import {succeed} from '../../../resource'

const { TabPane } = Tabs;

class ResetResult extends Component {
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
            <div className={'RRCss'}>
                <img src={succeed} alt=""/>
                <div className={'resText'}>密码重置成功！</div>
                <div className={'footerBtn'}>
                    <Button type="primary" onClick={() => {
                        this.props.history.push('/users/login/index');
                    }}>返回登录</Button>
                </div>
            </div>
        );
    }
}

export default ResetResult;
