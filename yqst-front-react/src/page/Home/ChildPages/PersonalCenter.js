import React, {Component} from 'react';
import {Tabs, Button} from 'antd';
import {em, phone, sig, address, head} from '../../../resource';
import Model from "../Model";
import Developing from "../../ErrorPage/Developing";

const {TabPane} = Tabs;

class PersonalCenter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {}
        };
    }

    componentDidMount() {
        this.getInfo();
    }

    componentWillUnmount() {

    }

    render() {
        let {info} = this.state;

        return (
            <div
                style={{
                    width: '1116px',
                    margin: '24px auto',
                    fontSize: '14px',
                    position: 'relative',
                    overflow: 'hidden',
                    minHeight: '684px'
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        left: '0px',
                        height: '100%',
                        width: '279px',
                        background: '#fff',
                        borderRadius: '6px 6px 6px 0px',
                        padding: '24px'
                    }}
                >
                    <div
                        style={{
                            textAlign: 'center', marginBottom: '21px'
                        }}
                    >
                        <img src={info.photo || head} alt=""
                             style={{width: '88px', height: '88px', marginTop: '22px', borderRadius: '8px'}}
                        />
                        <h2 style={{margin: '15px 0 8px', fontSize: '16px', color: '#2B3441'}}>{info.alias || ''}</h2>
                        <span style={{
                            fontSize: '12px',
                            color: 'rgba(43,52,65,0.65)'
                        }}>{window.globalConfig.title}ID：{info.id || ''}</span>
                        <div style={{
                            marginTop: '16px',
                            height: '1px',
                            background: 'linear-gradient(90deg,rgba(255,255,255,0) 0%,rgba(43,52,65,0.09) 50%,rgba(255,255,255,0) 100%)'
                        }}/>
                    </div>
                    <ul
                        style={{margin: '0'}}
                    >
                        <li style={{marginBottom: '16px', color: '#2B3441'}}>
                            <img src={address} alt="" style={{width: '12px', marginRight: '10px'}}/>
                            {info.regionName || ''}
                        </li>
                        <li style={{marginBottom: '16px', color: '#2B3441'}}>
                            <img src={phone} alt="" style={{width: '12px', marginRight: '10px'}}/>
                            {info.mobile || ''}
                        </li>
                        <li style={{marginBottom: '16px', color: '#2B3441'}}>
                            <img src={em} alt="" style={{width: '12px', marginRight: '10px'}}/>
                            {info.email || ''}
                        </li>
                        <li style={{marginBottom: '16px', color: '#2B3441'}}>
                            <img src={sig} alt="" style={{width: '12px', marginRight: '10px'}}/>
                            {info.signature || ''}
                        </li>
                    </ul>
                </div>
                <div
                    style={{
                        position: 'absolute',
                        right: '0px',
                        height: '100%',
                        width: '813px',
                        background: '#fff',
                        borderRadius: '6px',
                        padding: '20px 24px 24px'
                    }}
                >
                    <Tabs defaultActiveKey="1"
                          className={'Tabs'}
                          style={{fontSize: '14px'}}
                    >
                        <TabPane tab="个人钱包" key="1">
                            <Developing>
                                <Button type="primary" style={{fontSize: 14, height: 40, width: '100px'}}
                                        onClick={() => {
                                            this.props.history.push('/pages/home/index');
                                        }}
                                >返回首页</Button>
                            </Developing>
                        </TabPane>
                        <TabPane tab="文件" key="2">
                            <Developing>
                                <Button type="primary" style={{fontSize: 14, height: 40, width: '100px'}}
                                        onClick={() => {
                                            this.props.history.push('/pages/home/index');
                                        }}
                                >返回首页</Button>
                            </Developing>
                        </TabPane>
                        <TabPane tab="收藏" key="3">
                            <Developing>
                                <Button type="primary" style={{fontSize: 14, height: 40, width: '100px'}}
                                        onClick={() => {
                                            this.props.history.push('/pages/home/index');
                                        }}
                                >返回首页</Button>
                            </Developing>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }

    getInfo() {
        Model.getUserInfo({}, (res) => {
            this.setState({info: res.data});
        });
    }
}

export default PersonalCenter;
