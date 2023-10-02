import React, {Component} from 'react';
import {Button, message, Menu, Spin} from 'antd';
import Model from './Model';
import ESHMenuData from './ESHMenuData';
import './ElectronicSealHelperCss.less';
import ElectronicSealHelperRoute from './ElectronicSealHelperRouter';
import {LeftOutlined} from '@ant-design/icons'
const {SubMenu} = Menu;

class ElectronicSealHelper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openKeys: [],
            hasApplication: false, // 是否存在账户
            spinning: true,
        };
    }

    componentDidMount() {
        const judUrl = () => {
            if (this.props.location.pathname === '/pages/appCenter/electronicSealHelper/eshOpenApplication/openApplication' || this.props.history === '/pages/appCenter/electronicSealHelper/eshOpenApplication/openApplicationResult')
                return true;
            return false;
        };

        Model.openPlatformApplyGet({}, (res) => {
            this.setState({
                hasApplication: res.data && '2' === '' + res.data.status ? true : false, // 认证已通过
                spinning: false,
            }, () => {
                if (!res.data) {
                    this.props.history.push('/pages/appCenter/electronicSealHelper/eshOpenApplication/openApplication');

                } else if (res.data && '2' === '' + res.data.status) {
                    if (judUrl()) {
                        this.props.history.push('/pages/appCenter/electronicSealHelper/eshDataPanel/eshDataPanelPage');
                    }
                    this.setState({
                        openKeys: this.getOpenKeys(this.props.history.location.pathname.split('/')[4] ? this.props.history.location.pathname.split('/')[4] : ''),
                    });

                } else if (res.data && ('1' === '' + res.data.status || '3' === '' + res.data.status)) {
                    this.props.history.push('/pages/appCenter/electronicSealHelper/eshOpenApplication/openApplicationResult');

                }
            });

        }, () => {
            message.error('网络异常，请稍后再试！', 1);
            setTimeout(() => {
                this.props.history.push('/pages/appCenter/applyIndex');
            }, 1100);
        });
    }

    componentWillUnmount() {
    }

    componentWillReceiveProps(nextProps, prevState) {
        // 防止地址直接跳转
        setTimeout(() => {
            const pathname = nextProps.location.pathname.split('/')[4] ? nextProps.location.pathname.split('/')[4] : '';
            if (!this.state.hasApplication && pathname !== 'eshOpenApplication') {
                this.setState({
                    openKeys: []
                }, () => {
                    this.props.history.push('/pages/appCenter/electronicSealHelper/eshOpenApplication/openApplication');
                });
            }
        }, 100);
    }

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
        openKeysFun(ESHMenuData());

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
                                      if (!this.state.hasApplication)
                                          return message.warning('请先申请开通电子签章应用！');

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
                        icon={<LeftOutlined />}
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
                        if (!this.state.hasApplication) {
                            return message.warning('请先申请开通电子签章应用！');

                        } else {
                            const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
                            this.setState({openKeys: this.getOpenKeys(latestOpenKey)});
                        }
                    }}
                    // style={{ width: 256 }}
                >
                    {menuView(ESHMenuData())}
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
            <Spin tip="加载中" spinning={this.state.spinning}>
                <ElectronicSealHelperRoute/>
            </Spin>
        </div>
    }
}

export default ElectronicSealHelper;
