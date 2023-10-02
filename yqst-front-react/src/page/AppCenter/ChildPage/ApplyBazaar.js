import React, {Component} from 'react';
import {Button, Tabs, Tag, message} from 'antd';
import model from '../model'
import {getQueryVariable} from '../../../utils'
import IsPower from '../../Power/IsPower';
import {LeftOutlined} from "@ant-design/icons";

const {TabPane} = Tabs;

class ApplyBazaar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            softList: []
        };
    }

    componentDidMount() {
        this.getList()
    }

    componentWillUnmount() {
    }

    getList = () => {
        const tabKey = getQueryVariable('tabTag')
        console.log(decodeURI(tabKey))
        model.softMarketList({}, res => {
            this.setState({
                softList: res.data,
                tabKey: !tabKey ? res.data[0].catName : decodeURI(tabKey)
            })
        })
    }

    render() {
        let {list} = this.state;

        return (
            <div
                className={'applyBazaar'}
                style={{
                    width: '1116px',
                    minHeight: '648px',
                    background: '#fff',
                    borderRadius: '6px',
                    margin: '24px auto',
                    padding: '0 138px',
                    fontSize: '14px',
                    position: 'relative'
                }}
            >
                <Button
                    className={'Button_leftIcon'}
                    icon={<LeftOutlined/>}
                    style={{
                        position: 'absolute',
                        left: '24px',
                        top: '25px',
                    }}
                    onClick={() => {
                        this.props.history.push('/pages/appCenter/applyIndex');
                    }}
                >返回</Button>
                <IsPower
                    key={'SOFT_MARKET_ENTER'}
                    permissionsName={'SOFT_MARKET_ENTER'}
                    style={{paddingTop: '240px'}}
                >
                    <h1
                        style={{
                            fontSize: '20px',
                            lineHeight: '28px',
                            padding: '24px 0 17px',
                            margin: '0px'
                        }}
                    >
                        应用市场
                    </h1>
                    <Tabs activeKey={this.state.tabKey} className={'Tabs'} onChange={(key) => {
                        this.setState({tabKey: key})
                    }}>
                        {
                            this.state.softList && this.state.softList.map(item => (
                                <TabPane tab={item.catName} key={item.catName}>
                                    {this.makeTabView(item)}
                                </TabPane>
                            ))
                        }
                    </Tabs>
                </IsPower>
            </div>
        );
    }

    checkStatus = (status) => {
        switch (status) {
            case 0:
                return '未激活'
            case 1:
                return '已激活'
            case 2:
                return '需购买'
            case 3:
                return '已过期'
            default:
                return '错误代码'
        }
    }

    makeTabView(n = []) {
        return <ul>
            {
                n.softList.map((item, idx) => {
                    return <li
                        className={'applyS'}
                        key={'list_' + idx}
                        style={{
                            float: 'left',
                            textAlign: 'center',
                            border: '1px solid rgba(43,52,65,0.25)',
                            borderRadius: '6px',
                            width: '192px',
                            height: '205px',
                            marginRight: (idx === 0 || ++idx % 4 !== 0) ? '24px' : '0px',
                            marginBottom: '24px',
                            cursor: 'pointer',
                        }}
                        onClick={() => {
                            window.globalPermissions.checkPermission('SOFT_MARKET_INF0', (res) => {
                                if (res)
                                    return message.error('抱歉，您没有该操作权限，请联系管理员！');

                                this.props.history.push(`/pages/appCenter/applyDetail?softId=${item.softId}&serviceTag=${item.serviceTag}&tabTag=${n.catName}`);
                            });
                        }}
                    >
                        <img src={item.logo} alt=""
                             style={{
                                 width: '56px',
                                 height: '56px',
                                 borderRadius: '6px',
                                 marginTop: '23px'
                             }}
                        />
                        <p
                            style={{
                                margin: '8px 0px 4px',
                                color: '#2B3441'
                            }}
                        >{item.title}</p>
                        <div
                            style={{
                                color: 'rgba(43,52,65,0.65)',
                                fontSize: '12px',
                            }}
                        >{item.exp}</div>
                        <div
                            style={{
                                color: '#2B3441',
                                fontSize: '14px',
                                marginBottom: '4px'
                            }}
                        >{item.name}</div>

                        <div>
                            <p className={'text-elli2'} style={{
                                paddingLeft: '12px',
                                paddingRight: '12px',
                                color: '#2B344177',
                                fontSize: '12px',
                                marginBottom: '14px',
                                height: '36px'
                            }}>
                                {item.description}
                            </p>
                        </div>
                        <div>
                            {item.status != 1 ?
                                <Button style={{width: '64px', height: '28px'}}>开通</Button>
                                : <p style={{
                                    color: '#2B344177',
                                    fontSize: '14px',
                                    marginBottom: 0
                                }}>{this.checkStatus(item.status)}</p>}
                        </div>
                    </li>
                })
            }
        </ul>
    }
}

export default ApplyBazaar;
