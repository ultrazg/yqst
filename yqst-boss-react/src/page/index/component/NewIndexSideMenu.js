/**
 * Created by yb on 2019/08/26.
 * 首页侧边菜单（改造后）
 */

import React from 'react';
import {Menu, Input, Spin} from 'antd';
import {AppstoreOutlined, ProfileOutlined} from '@ant-design/icons';
import {connect} from 'react-redux';
import UnionpayModel from "../../unionpay/model/UnionpayModel";
import PublicData from "../../../base/publicData/PublicData";
import indexOf from 'lodash/indexOf';
import pull from 'lodash/pull';
import * as IndexAction from '../redux/IndexAction';

const {SubMenu} = Menu;
const {Search} = Input;

@connect(
    (state) => {
        const {IndexReducers} = state;
        return {IndexReducers}
    },
    (dispatch) => {
        return {setOpenKey: (data) => dispatch(IndexAction.setOpenKey(data))}
    }
)
class NewIndexSideMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchMenuValue: '',
            loading: false,
            sidMenuKeys: [],
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                sidMenuKeys: this.sideMenuKeys()
            });
        }, 1);
        setTimeout(this.menuScrollTopFun, 0.55 * 1000);
    }

    sideMenuKeys(openKeys) {
        let keys = openKeys ? openKeys : this.props.IndexReducers.openKeys;
        let indexMenuList = this.props.IndexReducers.indexMenu;
        let newSidMenuKeys = [];

        // 一级菜单
        indexMenuList && indexMenuList.forEach((idxItem, iIdx) => {
            // 二级菜单
            idxItem.sideMenu && idxItem.sideMenu.forEach((sidItem, jIdx) => {
                // 收集一级选中的二级idx
                if (keys.length > 0 && iIdx == keys[0]) {
                    // 需要和二级菜单中的idx保持一致
                    newSidMenuKeys.push('sid_' + ('' + iIdx) + ('' + jIdx));
                }
            });
        });

        return newSidMenuKeys; // 可以返回选择了一级菜单后的二级所有的idx
    }

    menuOnClick(key) {
        // eslint-disable-next-line
        if (this.props.IndexReducers.nowChoseMenu == key) {
            this.props.history.push("/Pages/ReLoadBlankPage");
            setTimeout(() => {
                this.props.history.replace(key);
            }, 1);
        } else {
            this.props.history.push(key);
        }
        //backtop
        // window.setScrollTop(0);
    }

    render() {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                width: PublicData.leftMenuWidth,
                backgroundColor: 'transparent'
            }}>
                <Search
                    className={'menuSearch'}
                    placeholder="菜单搜索"
                    maxLength={20}
                    onSearch={value => {
                        this.setState({searchMenuValue: value, loading: true}, () => {
                            setTimeout(() => {
                                this.setState({loading: false});
                            }, 500)
                        });
                    }}
                    onChange={e => {
                        this.setState({searchMenuValue: e.target.value, loading: true}, () => {
                            setTimeout(() => {
                                this.setState({loading: false});
                            }, 500)
                        });
                    }}
                    style={{
                        width: PublicData.leftMenuWidth,
                        height: PublicData.breadHeight,
                        padding: 5,
                        backgroundColor: '#303030',
                    }}
                />
                <Spin spinning={this.state.loading}>
                    <div id={'SideMenuDiv'} className="side-bar" style={{
                        width: PublicData.leftMenuWidth,
                        height: document.documentElement.clientHeight - PublicData.pageTopHeight - PublicData.breadHeight,
                        overflow: 'auto',
                    }}>
                        <Menu
                            mode="inline"
                            theme="dark"
                            openKeys={[...this.props.IndexReducers.openKeys, ...this.state.sidMenuKeys]}
                            selectedKeys={[this.props.IndexReducers.selectMenu[this.props.IndexReducers.position]]}
                        >
                            {this.makeMenuHtml()}
                        </Menu>
                    </div>
                </Spin>
            </div>
        );
    }

    makeMenuHtml() {
        let indexMenuList = this.props.IndexReducers.indexMenu;
        let resMenuHtml = [], hasSearchVal = false;

        // 一级菜单
        indexMenuList && indexMenuList.forEach((idxItem, iIdx) => {
            hasSearchVal = false;
            // 判断搜索的菜单值是否存在
            if (idxItem.title.indexOf(this.state.searchMenuValue) >= 0) {
                hasSearchVal = true;
            }

            // 二级菜单
            let sidArrHtml = [];
            idxItem.sideMenu && idxItem.sideMenu.forEach((sidItem, jIdx) => {
                // 判断搜索的菜单值是否存在
                if (sidItem.subMenuTitle.indexOf(this.state.searchMenuValue) >= 0) {
                    hasSearchVal = true;
                }

                // 三级菜单
                let subArrHtml = [];
                sidItem.subMenuList && sidItem.subMenuList.forEach((subItem, kIdx) => {
                    // 判断搜索的菜单值是否存在
                    if (subItem.title.indexOf(this.state.searchMenuValue) >= 0) {
                        hasSearchVal = true;
                    }

                    subArrHtml.push(
                        <Menu.Item key={subItem.key}>
                            <a onClick={() => {
                                this.menuOnClick(subItem.key);
                            }}>{subItem.title}</a>
                        </Menu.Item>
                    );
                });

                // 收集二级菜单
                if (sidItem.onlyTwo) {
                    sidArrHtml.push(
                        <Menu.Item key={sidItem.key}>
                            <a onClick={() => {
                                this.menuOnClick(sidItem.key);
                            }}>{sidItem.subMenuTitle}</a>
                        </Menu.Item>
                    );
                } else {
                    sidArrHtml.push(
                        <SubMenu
                            key={'sid_' + ('' + iIdx) + ('' + jIdx)}
                            title={
                                <span>
                                <AppstoreOutlined style={{fontSize: 14}}/>
                                <span>{sidItem.subMenuTitle}</span>
                            </span>
                            }
                            onTitleClick={(e) => {
                                if (indexOf(this.state.sidMenuKeys, e.key) >= 0) {
                                    this.state.sidMenuKeys = pull(this.state.sidMenuKeys, e.key);
                                } else {
                                    this.state.sidMenuKeys.push(e.key);
                                }
                                this.setState({sidMenuKeys: this.state.sidMenuKeys});
                            }}
                        >
                            {subArrHtml}
                        </SubMenu>
                    );
                }
            });

            // 收集一级菜单
            if (hasSearchVal) {
                resMenuHtml.push(
                    <SubMenu
                        key={'' + iIdx}
                        id={'menu-one-' + iIdx}
                        title={
                            <span>
                                <ProfileOutlined style={{fontSize: 14}}/>
                                <span>{idxItem.title}</span>
                            </span>
                        }
                        onTitleClick={(domEvent) => {
                            this.menuClick(domEvent.key);
                        }}
                    >
                        {sidArrHtml}
                    </SubMenu>
                );
            }
        });
        return resMenuHtml;
    }

    menuScrollTopFun = () => {
        let position = this.props.IndexReducers.openKeys[0];
        let MenuElement = document.getElementById("menu-one-" + position);
        let LeftRouteDiv = document.getElementById("SideMenuDiv");
        if (LeftRouteDiv && MenuElement)
            LeftRouteDiv.scrollTop = MenuElement.offsetTop;
    };

    menuClick(position) {
        let linkTag = this.props.IndexReducers.indexMenu[position].tag;
        let keys = [];
        if (this.props.IndexReducers.openKeys[0] === position + '') {
            keys = [];
        } else {
            keys = [position + ''];
            // 展开第一个菜单的时候，对应的菜单滚动到顶部位置
            // setTimeout(menuScrollTopFun, 0.55 * 1000);
        }
        // 拦截菜单展开前是否需要登录
        switch (linkTag) {
            case 'Unionpay': // 银联收银台
                // 展开菜单的时候才请求，收起菜单的时候不需要请求
                if (this.props.IndexReducers.openKeys.length > 0) {
                    UnionpayModel.UnionpayLogin({openId: localStorage.openId}, (res) => {
                        window.Storage.save({
                            key: "UnionpayBossInfo",
                            data: res.data
                        });
                        this.props.setOpenKey(keys);
                        this.setState({sidMenuKeys: this.sideMenuKeys(keys)});
                        setTimeout(this.menuScrollTopFun, 0.45 * 1000);
                    });
                    break;
                }

            // case 'BusinessAssistant': // 商机助手
            //     if (this.state.openKeys.length > 0) {
            //         UnionpayModel.boosLogin({openId: localStorage.openId}, (res) => {
            //             window.Storage.save({
            //                 key: "XmBossOpportunityInfo",
            //                 data: res.data
            //             })
            //             this.setState({openKeys: this.state.openKeys},
            //                 () => {
            //                     this.setState({sidMenuKeys: this.makeMenuHtml('keys')});
            //
            //                     // 展开第一个菜单的时候，对应的菜单滚动到顶部位置
            //                     setTimeout(menuScrollTopFun, 0.45 * 1000);
            //                 }
            //             );
            //         });
            //         break;
            //     }

            default:
                this.props.setOpenKey(keys);
                this.setState({sidMenuKeys: this.sideMenuKeys(keys)});
                setTimeout(this.menuScrollTopFun, 0.45 * 1000);
                // this.setState({openKeys: this.state.openKeys},
                //     () => {
                //
                //         // 展开第一个菜单的时候，对应的菜单滚动到顶部位置
                //     }
                // );
                break;
        }
    }
}

export default NewIndexSideMenu;
