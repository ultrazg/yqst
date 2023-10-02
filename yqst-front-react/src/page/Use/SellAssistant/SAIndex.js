import React, {Component} from 'react';
import {Button, message, Empty} from 'antd';
import {logo} from '../../../resource';
import {getPageQuery} from '../../../utils';
import Model from '../Model';
import './SellAssistant.less';
import {LeftOutlined} from '@ant-design/icons'

const gnList = [
    // {
    //     logo: cPIcon,
    //     name: '产品库管理',
    //     url: '/pages/appCenter/sellAssistant/saProductHome/saProModule/saProductList'
    // }
];

class SAIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isButIn: this.getType(), // 切换终端页面（isButIn = true）、销售助手首页（isButIn = false）
            gnList: gnList,
            shopList: [],
        };
    }

    componentDidMount() {
        this.getAutoLogin();
    }

    componentWillUnmount() {

    }

    render() {
        let {gnList = [], shopList = [], isButIn} = this.state;
        return (
            <div
                style={{
                    width: '1116px',
                    minHeight: '648px',
                    margin: '24px auto',
                    borderRadius: '6px',
                    background: 'rgba(255,255,255,1)',
                    position: 'relative',
                    padding: '0 138px',
                }}
            >
                <Button
                    className={'Button_leftIcon'}
                    icon={<LeftOutlined />}
                    style={{
                        position: 'absolute',
                        left: '39px',
                        top: '25px'
                    }}
                    onClick={() => {
                        if (isButIn)
                            return this.props.history.push('/pages/appCenter/sellAssistant/terminalPage/saGeneral/saGeneralPage');
                        return this.props.history.push('/pages/appCenter/applyIndex');
                    }}
                >返回</Button>
                <h1
                    style={{
                        fontSize: '20px',
                        lineHeight: '28px',
                        padding: '24px 0',
                        borderBottom: '1px solid rgba(43,52,65,0.25)',
                    }}
                >{isButIn ? '选择终端' : '销售助手'}</h1>
                {
                    !isButIn ? <ul style={{
                        marginTop: '24px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        marginBottom: '0px'
                    }}>
                        {
                            gnList.map((item, idx) => {
                                let marginRight = '24px';
                                if (idx !== 0 && ++idx % 4 === 0) {
                                    marginRight = '0px'
                                }
                                return <li
                                    className={'liHover'}
                                    key={'gnList_' + idx}
                                    style={{
                                        width: '192px',
                                        height: '96px',
                                        borderRadius: '4px',
                                        border: '1px solid rgba(43,52,65,0.25)',
                                        padding: '18px 9px',
                                        marginBottom: '24px',
                                        marginRight: marginRight,
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        borderTop: '4px solid rgba(68,129,235,1)',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => {

                                        this.props.history.push(item.url);
                                    }}
                                >
                                    <img src={item.logo} alt=""
                                         style={{
                                             width: '32px',
                                             height: '32px',
                                             borderRadius: '2px',
                                         }}
                                    />
                                    <div
                                        style={{marginTop: '8px', fontWeight: 600}}
                                    >{item.name}</div>
                                </li>
                            })
                        }
                    </ul> : null
                }
                <ul style={{
                    display: 'flex',
                    // justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-start',
                }}>
                    {
                        shopList && shopList.length > 0 ? shopList.map((item, idx) => {
                            let marginRight = '24px';
                            if (idx !== 0 && ++idx % 4 === 0) {
                                marginRight = '0px'
                            }
                            return <li
                                className={'liHover'}
                                key={'gnList_' + idx}
                                style={{
                                    width: '192px',
                                    height: '96px',
                                    borderRadius: '4px',
                                    border: '1px solid rgba(43,52,65,0.25)',
                                    padding: '18px 9px',
                                    marginBottom: '24px',
                                    marginRight: marginRight,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    borderTop: '4px solid rgba(68,129,235,1)',
                                    cursor: 'pointer',
                                }}
                                onClick={() => {
                                    if ('2' === '' + item.shopStatus)
                                        return message.info('产品的服务期已过期，请前往APP续费再使用！', 1);

                                    window.Storage.save({
                                        key: 'SParams',
                                        data: item
                                    });
                                    this.props.history.push(item.url);
                                }}
                                title={item.shopName || ''}
                            >
                                <img src={item.shopLogo || logo} alt=""
                                     style={{
                                         width: '32px',
                                         height: '32px',
                                         borderRadius: '2px',
                                     }}
                                />
                                <div
                                    style={{marginTop: '8px', fontWeight: 600}}
                                >{item.shopName || ''}</div>
                            </li>
                        }) : <div style={{textAlign: 'center', width: '100%'}}>
                            <Empty description={'暂无店铺'} />
                        </div>
                    }
                </ul>
            </div>
        );
    }

    getAutoLogin() {
        Model.AutoLogin({current: 1, pageSize: 9999, shopType: 1}, (res) => {
            const shopList = res.data.records && res.data.records.map(item => {
                return {
                    ...item,
                    key: item.shopSn,
                    url: '/pages/appCenter/sellAssistant/terminalPage/saGeneral/saGeneralPage'
                }
            });
            this.setState({shopList});
        });
    }

    getType() {
        let res = false;
        if (getPageQuery().type)
            res = true;

        return res;
    }
}

export default SAIndex;
