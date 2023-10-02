import React, {Component} from 'react';
import {Button, message, Menu, Spin} from 'antd';
import Model from './Model';
import BTBMenuData from './BTBMenuData';
import BTBEnterpriseWalletRouter from './BTBEnterpriseWalletRouter';
import {connect} from "react-redux";
import {saveCompanyInfo} from "./Redux/BTBEnterpriseWalletAction";
import "./BTBEnterpriseWalletCss.less";
import {LeftOutlined} from '@ant-design/icons'

const {SubMenu} = Menu;

@connect(
    (state) => {
        const {BTBEnterpriseWalletReducers} = state;
        return {
            BTBEnterpriseWalletReducers
        }
    },
    (dispatch) => {
        return {
            saveCompanyInfo: (position) => {
                dispatch(saveCompanyInfo(position))
            },
        }
    }
)
class BTBEnterpriseWallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openKeys: [],
            hasApplication: true,
            spinning: true,
        };
    }

    componentDidMount() {
        this.setState({
            openKeys: this.getOpenKeys(this.props.history.location.pathname.split('/')[4] ? this.props.history.location.pathname.split('/')[4] : ''),
        }, () => {
            this.btbMerchantsStatusGet();
        });
    }

    componentWillUnmount() {
    }

    componentWillReceiveProps(nextProps, prevState) {
        // 防止地址直接跳转
        const pathname = nextProps.location.pathname.split('/')[4] ? nextProps.location.pathname.split('/')[4] : '';

        if (this.state.hasApplication && pathname !== 'btbRegister') {
            this.setState({spinning: true, openKeys: []}, () => {
                this.setState({
                    spinning: false
                }, () => {
                    this.btbMerchantsStatusGet();
                });
            });
        } else {
            this.setState({openKeys: this.getOpenKeys(this.props.history.location.pathname.split('/')[4] ? this.props.history.location.pathname.split('/')[4] : ''),});
        }
    }

    // static getDerivedStateFromProps(nextProps,prevState){
    //     console.log('111: ', nextProps);
    //     console.log('222: ', prevState);
    //
    //     //该方法内禁止访问this
    //     if(nextProps.email !== prevState.email){
    //         //通过对比nextProps和prevState，返回一个用于更新状态的对象
    //         return {
    //             value:nextProps.email
    //         }
    //     }
    //     //不需要更新状态，返回null
    //     return null
    // }

    render() {
        return (
            <div
                style={{
                    margin: '24px 0',
                    position: 'relative',
                    minHeight: '660px',
                    // overflow: 'auto'
                }}
            >
                {this.makeLeft()}
                {this.makeRight()}
            </div>
        );
    }

    btbMerchantsStatusGet() {
        Model.btbMerchantsStatusGet({}, (res) => {
            if ('0' === '' + res.data.isCompanyMerchantsApply) {
                this.setState({
                    hasApplication: true,
                    spinning: false,
                    openKeys: [],
                }, () => {
                    this.props.history.push('/pages/appCenter/btbEnterpriseWallet/btbRegister/btbEnterprisePage');
                });

            } else if ('1' === '' + res.data.isCompanyMerchantsApply) {
                this.btbMerchantsCompanyInfo();

            }
            // else if('0' === '' + localStorage.admin && '0' === '' + res.data.isPersonMerchantsApply){
            //     this.setState({
            //         hasApplication: true,
            //         spinning: false,
            //     }, () => {
            //         this.props.history.push('/pages/appCenter/btbEnterpriseWallet/btbRegister/btbPersonGuidePage');
            //     });
            //
            //     // 账户不是管理员 & 已开通过钱包账户
            // }else if('0' === '' + localStorage.admin && '1' === '' + res.data.isPersonMerchantsApply){
            //     this.props.history.push('/pages/appCenter/btbEnterpriseWallet/btbRegister/btbPersonRegisterResult');
            //
            // }

        }, (err) => {
            message.info('网络掉线了，请稍后刷新试试！');
        });
    }

    btbMerchantsCompanyInfo() {
        Model.btbMerchantsCompanyInfo({}, (res) => {
            // 审核已通过
            if ('2' === '' + res.data.auditStatus) {
                this.setState({
                    hasApplication: false,
                    spinning: false,
                }, () => {
                    this.props.saveCompanyInfo(res.data);
                    const pathname = this.props.location.pathname.split('/')[4] ? this.props.location.pathname.split('/')[4] : '';
                    if (pathname === 'btbRegister')
                        this.props.history.push('/pages/appCenter/btbEnterpriseWallet/btbAccountView/btbAccountViewPage');
                });

            } else {
                this.setState({
                    hasApplication: true,
                    spinning: false,
                }, () => {
                    this.props.saveCompanyInfo(res.data);
                    this.props.history.push('/pages/appCenter/btbEnterpriseWallet/btbRegister/btbEnterpriseRegisterResult');
                });
            }
        }, (err) => {
        });
    }

    arrangeKeys() {
        let openKeys = [], everyKeys = [];
        const openKeysFun = (list = []) => {
            list.forEach(item => {
                if (item.sideMenu && item.sideMenu.length > 0) {
                    openKeysFun(item.sideMenu);
                } else {
                    if (!item.isFirstOrder)
                        everyKeys.push(item.key);
                }

                if (item.isFirstOrder) {
                    everyKeys.push(item.key);
                    if (everyKeys.length > 0)
                        openKeys.push(everyKeys);

                    everyKeys = [];
                }

            });
        };
        openKeysFun(BTBMenuData());

        return openKeys;
    }

    getOpenKeys(selectedKey) {
        let resArr = null;
        this.arrangeKeys().forEach(arr => {
            if (arr.indexOf(selectedKey) >= 0) {
                resArr = arr;
                return false;
            }
        });
        return resArr ? resArr : [];
    }

    makeLeft() {
        let {selectedKeys = [], openKeys} = this.state;
        selectedKeys = this.props.history.location.pathname.split('/')[4] ? [this.props.history.location.pathname.split('/')[4]] : [];
        const menuView = (list = []) => {
            return list.map((item, idx) => {
                if (item.sideMenu && item.sideMenu.length > 0) {
                    return <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <img src={item.logo} alt=""
                                     style={{
                                         width: '22px',
                                         height: '22px',
                                         marginRight: '8px'
                                     }}
                                />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {menuView(item.sideMenu)}
                    </SubMenu>
                }

                return <Menu.Item key={item.key}
                                  onClick={() => {
                                      if (this.state.hasApplication)
                                          return message.warning('请先开通应用账号！');

                                      if (item.url) {
                                          if(this.props.history.location.pathname === item.url)
                                              return false;
                                          return this.props.history.push(item.url);

                                      } else {
                                          return message.warning('工程师还正在紧张的研发中，敬请期待吧！', 1);

                                      }
                                  }}
                >
                    {
                        item.logo ? <img src={selectedKeys[0] === item.key ? item.hoverLogo : item.logo} alt=""
                                         style={{
                                             width: '22px',
                                             height: '22px',
                                             marginRight: '8px'
                                         }}
                        /> : null
                    }
                    {item.title}
                </Menu.Item>;
            });
        };

        return (
            <div
                style={{
                    width: '276px',
                    height: '100%',
                    background: 'rgba(255,255,255,1)',
                    borderRadius: '0px 6px 6px 0px',
                    position: 'absolute',
                    left: '0px',
                    top: '0px',
                }}
            >
                <div
                    style={{
                        padding: '16px 0px 8px 24px'
                    }}
                >
                    <Button
                        className={'Button_leftIcon'}
                        icon={<LeftOutlined/>}
                        onClick={() => {
                            this.props.history.push('/pages/appCenter/applyIndex');
                        }}
                    >返回</Button>
                </div>
                <Menu
                    className={'tpMenu'}
                    mode="inline"
                    openKeys={openKeys}
                    selectedKeys={selectedKeys}
                    onOpenChange={(openKeys) => {
                        if (this.state.hasApplication) {
                            return message.warning('请先开通应用账号！');

                        } else {
                            const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
                            this.setState({openKeys: this.getOpenKeys(latestOpenKey)});
                        }
                    }}
                    // style={{ width: 256 }}
                >
                    {menuView(BTBMenuData())}
                </Menu>
            </div>
        );
    }

    makeRight() {
        return <div
            style={{
                minHeight: '660px',
                height: '100%',
                width: '100%',
                paddingLeft: '300px',
                paddingRight: '24px',
            }}
        >
            <Spin spinning={this.state.spinning}>
                <BTBEnterpriseWalletRouter/>
            </Spin>
        </div>
    }
}

export default BTBEnterpriseWallet;
