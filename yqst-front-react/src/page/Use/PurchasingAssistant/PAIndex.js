import React, {Component} from 'react';
import {Button, message, Menu} from 'antd';
import TerminalMenuData from './PaMenuData';
import {PaMenuRouter} from './PurchasingAssistantRouter';
import {LeftOutlined} from '@ant-design/icons'

const {SubMenu} = Menu;

class PaIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openKeys: [],
            selectedKeys: []
        };
    }

    componentDidMount() {
        let selectedKeys = this.props.history.location.pathname.split('/');
        TerminalMenuData().some(item => {
            if (item.url === this.props.history.location.pathname) {
                this.setState({
                    openKeys: [selectedKeys[selectedKeys.length - 2]],
                    selectedKeys: [selectedKeys[selectedKeys.length - 1]],
                })
                return true
            }
            if (item.sideMenu) {
                item.sideMenu.some(n => {
                    if (n.url === this.props.history.location.pathname) {
                        this.setState({
                            openKeys: [selectedKeys[selectedKeys.length - 2]],
                            selectedKeys: [selectedKeys[selectedKeys.length - 1]],
                        })
                        return true
                    }
                    if (n.childKeys) {
                        let tag = false
                        n.childKeys.some(k => {
                            if (k === this.props.history.location.pathname) {
                                const newSelectedKeys = n.url.split('/');
                                this.setState({
                                    openKeys: [newSelectedKeys[newSelectedKeys.length - 2]],
                                    selectedKeys: [newSelectedKeys[newSelectedKeys.length - 1]],
                                })
                                tag = true
                                return true
                            }
                        })
                        if (tag === true) {
                            return true
                        }
                    }
                })
            }
        })
    }

    componentWillUnmount() {

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

    makeLeft() {
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

                return <Menu.Item
                    key={item.key}
                    onClick={() => {
                        if (!item.url)
                            return message.warning('工程师还正在紧张的研发中，敬请期待吧！', 1);

                        if(this.props.history.location.pathname === item.url)
                            return false;
                        this.props.history.push(item.url)
                    }}
                >
                    {
                        item.logo ? <img src={this.state.selectedKeys[0] === item.key ? item.hoverLogo : item.logo} alt=""
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
                    openKeys={this.state.openKeys}
                    selectedKeys={this.state.selectedKeys}
                    onSelect={({selectedKeys}) => {
                        this.setState({selectedKeys})
                    }}
                    onOpenChange={(openKeys) => {
                        this.setState({openKeys})
                    }}
                    // style={{ width: 256 }}
                >
                    {menuView(TerminalMenuData())}
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
            <PaMenuRouter/>
        </div>
    }
}

export default PaIndex;
