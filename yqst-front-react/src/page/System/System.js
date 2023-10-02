import React, {Component} from 'react';
import {Button} from 'antd';
import Model from "./Model";
import "./System.less";
import SystemRouter from '../PageRouters/ChildRouter/SystemRouter'
import {LeftOutlined} from '@ant-design/icons'

const leftMenu = [
    {
        label: '系统消息',
        key: 'systemNews',
        path: '/pages/home/system/systemNews',
    },
];

class System extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
    }

    componentDidMount() {
        // this.getAutoLogin();
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className={'SystemCss'}>
                <div className={'SystemCssL'}>
                    <div
                        style={{height: '58px',}}
                    >
                        <Button icon={<LeftOutlined/>}
                                style={{marginTop: 16, marginLeft: 24, width: 60, height: 24}}
                                className={'returnPage'}
                                onClick={() => {
                                    this.props.history.push('/pages/home/index');
                                }}
                        >返回</Button>
                    </div>
                    {
                        this.makeMenu()
                    }
                </div>
                <div className={'SystemCssR'}>
                    <SystemRouter/>
                </div>
            </div>
        );
    }

    getAutoLogin() {
        Model.AutoLogin({
            phone: localStorage.phone,
            accountSn: localStorage.accountSn,
        }, (res) => {
            this.setState({data: res.data})
        }, (err) => {
        });
    }

    makeMenu() {
        const selectedKeys = this.props.history.location.pathname.split('/')[4] ? this.props.history.location.pathname.split('/')[4] : '';
        return <ul>
            {
                leftMenu.map((item, idx) => {
                    return <li
                        className={selectedKeys == item.key ? 'onLi' : ''}
                        key={item.key}
                        onClick={() => {
                            this.props.history.push(item.path);
                        }}
                    >
                        {item.label}
                    </li>
                })
            }
        </ul>
    }
}

export default System;
