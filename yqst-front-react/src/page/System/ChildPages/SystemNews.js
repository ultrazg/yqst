import React, {Component} from 'react';
import {Row, Col, Button} from 'antd';
import {logo, seeMes, delMes} from '../../../resource';
import Model from "../Model";

class SystemNews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            list: [
                {
                    url: logo,
                    title: '欢迎来到星岚科技',
                    comtent: '欢迎来到星岚科技大家庭，在这里开始一段美好的旅程吧！',
                    time: '10-11 14:24',
                    isHover: false,
                },
                {
                    url: logo,
                    title: '欢迎来到星岚科技',
                    comtent: '欢迎来到星岚科技大家庭，在这里开始一段美好的旅程吧！',
                    time: '10-11 14:24',
                    isHover: false,
                }
            ]
        };
    }

    componentDidMount() {
        // this.getAutoLogin();
    }

    componentWillUnmount() {

    }

    render() {
        let {list} = this.state;

        return (
            <div
                className={'sysNewCss'}
                style={{padding: '20px', fontSize: '14px'}}
            >
                <h1
                    style={{
                        padding: '10px 12px 24px',
                        color: '#2B3441',
                        fontSize: '20px',
                        borderBottom: '1px solid rgba(43,52,65,0.09)',
                        margin: '0px'
                    }}
                >系统消息</h1>
                <ul className={'sysNew_ul'}>
                    {
                        list && list.map((item, idx) => {
                            return <li
                                key={'list_' + idx}
                                style={{
                                    padding: '12px 10px',
                                    borderBottom: '1px solid rgba(43,52,65,0.09)',
                                    position: 'relative',
                                    transition: 'box-shadow 0.6s',
                                }}
                                onMouseEnter={() => {
                                    list = list.map((cItem, cIdx) => {
                                        cItem.isHover = false;
                                        if(idx == cIdx)
                                            cItem.isHover = true;
                                        return cItem
                                    });
                                    this.setState({list});
                                }}
                                onMouseLeave={() => {
                                    list = list.map((cItem, cIdx) => {
                                        cItem.isHover = false;
                                        return cItem
                                    });
                                    this.setState({list});
                                }}
                            >
                                <div
                                    style={{
                                        position: 'absolute',
                                        width: '190px',
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis'
                                    }}
                                    title={item.title}
                                >
                                    <img
                                        style={{width: '32px', height: '32px', borderRadius: '4px', marginRight: '16px'}}
                                        src={item.url} alt=""/>
                                    <span
                                        style={{color: '#2B3441'}}
                                    >{item.title}</span>
                                </div>
                                <div
                                    style={{
                                        width: '100%',
                                        paddingLeft: '210px',
                                        paddingRight: '120px',
                                        paddingTop: '6px',
                                        paddingBottom: '6px',
                                        lineHeight: '20px',
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                        color: 'rgba(43,52,65,0.65)'
                                    }}
                                    title={item.comtent}
                                >
                                    {item.comtent}
                                </div>
                                <div
                                    style={{
                                        position: 'absolute',
                                        width: '120px',
                                        right: '10px',
                                        top: '12px',
                                        textAlign: 'right'
                                    }}
                                    className={'listR'}
                                >
                                    {
                                        !item.isHover ? <span style={{marginTop: '6px', display: 'inline-block'}}>
                                            {item.time}
                                        </span> : <div style={{marginTop: '6px'}}>
                                            <span className={'list_span'} style={{
                                                padding: '6.8px 9.5px',
                                                borderRadius: '20px',
                                                marginRight: '19px'
                                            }}
                                                title={'查看'}
                                                onClick={() => {console.log('查看： ', idx)}}
                                            >
                                                <img
                                                    style={{width: '13px'}}
                                                    src={seeMes} alt=""/>
                                            </span>
                                            <span className={'list_span'} style={{
                                                padding: '6.8px 9.5px',
                                                borderRadius: '20px',
                                            }}
                                                title={'删除'}
                                                onClick={() => {console.log('删除： ', idx)}}
                                            >
                                                <img
                                                    style={{width: '13px'}}
                                                    src={delMes} alt=""/>
                                            </span>
                                        </div>
                                    }
                                </div>
                            </li>
                        })
                    }
                </ul>
            </div>
        );
    }

    getAutoLogin(){
        Model.AutoLogin({
            phone: localStorage.phone,
            accountSn: localStorage.accountSn,
        }, (res) => {
            this.setState({data: res.data})
        }, (err) => {});
    }
}

export default SystemNews;
