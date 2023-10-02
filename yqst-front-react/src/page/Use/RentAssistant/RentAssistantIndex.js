import React, {Component} from 'react';
import RentAssistantMenu from "./RentAssistantMenu";
import {Button, Menu, message} from "antd";
import {LeftOutlined} from "@ant-design/icons";
import RentAssistantRouter from "./RentAssistantRouter";

const {SubMenu} = Menu;

export default class RentAssistantIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openKeys: [],
        };
    }

    componentDidMount() {
        this.setState({
            openKeys: this.getOpenKeys(this.props.history.location.pathname.split('/')[5] ? this.props.history.location.pathname.split('/')[5] : ''),
        });
    }

    render() {
        return (
            <div style={{display: 'flex', margin: '24px 0', paddingRight: '18px'}}>
                <div id='rentSubMenu'>
                    {this.makeLeft()}
                </div>

                {this.makeRight()}
            </div>
        )
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
        openKeysFun(RentAssistantMenu());

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
        selectedKeys = this.props.history.location.pathname.split('/')[5] ? [this.props.history.location.pathname.split('/')[5]] : [];
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
                                      if (item.url) {
                                          if (this.props.history.location.pathname === item.url)
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
                    minHeight: '660px',
                    background: 'rgba(255,255,255,1)',
                    borderRadius: '0px 6px 6px 0px',
                    marginRight: '24px',
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
                            this.props.history.push('/pages/appCenter');
                        }}
                    >返回</Button>
                </div>
                <Menu
                    className={'tpMenu'}
                    mode="inline"
                    openKeys={openKeys}
                    selectedKeys={selectedKeys}
                    onOpenChange={(openKeys) => {
                        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
                        this.setState({openKeys: this.getOpenKeys(latestOpenKey)});
                    }}
                    // style={{ width: 256 }}
                >
                    {menuView(RentAssistantMenu())}
                </Menu>
            </div>
        );
    }

    makeRight() {
        return (
            <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
                <RentAssistantRouter/>
            </div>
        )
    }
}
