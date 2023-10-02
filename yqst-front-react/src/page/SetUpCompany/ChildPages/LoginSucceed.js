import React, {Component} from 'react';
import { Form, Button, Input, Select, Cascader } from 'antd';
import './ChildCss.less';
import {loginCover, logo} from "../../../resource";

const { Option } = Select;
const options = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
            {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                    {
                        value: 'xihu',
                        label: 'West Lake',
                    },
                ],
            },
        ],
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                    {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                    },
                ],
            },
        ],
    },
];

class LoginSucceed extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        let {onSetUpBtn, onAddBtn} = this.props;
        return (
            <div className={'lsCss'} style={{display: 'flex', flex: 1}}>
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
                    <h1>登录成功</h1>
                    <p>您还没有创建或加入企业，请选择</p>
                    <div>
                        <Button type="primary" onClick={() => {
                            onSetUpBtn && onSetUpBtn();
                        }}>创建企业</Button>
                    </div>
                    <div className={'secondBtn'}>
                        <Button  onClick={() => {
                            onAddBtn && onAddBtn();
                        }}>加入企业</Button>
                    </div>
                    <a onClick={() => {
                        localStorage.removeItem('loginMes');
                        this.props.history.push('/users/login/index');
                    }}>返回登录</a>
                </div>
            </div>
        );
    }

}

export default LoginSucceed;
