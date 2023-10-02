import React, {Component} from 'react';
import { Button} from 'antd'
import AppCenterManageRouter from '../../PageRouters/ChildRouter/AppCenterManageRouter'
import {LeftOutlined} from "@ant-design/icons";


const leftMenu = [
    {
        label: '应用设置',
        key: 'applySetting',
        path: '/pages/appCenter/ApplyManageNewUI/applySetting',
        childrenPath: ['/pages/appCenter/ApplyManageNewUI/applyDetail']
    },
    {
        label: '应用分组设置',
        key: 'applyGroupSetting',
        path: '/pages/appCenter/ApplyManageNewUI/applyGroupSetting',
    },
    {
        label: '应用可见性设置',
        key: 'applyVisibleSetting',
        path: '/pages/appCenter/ApplyManageNewUI/applyVisibleSetting',
    },
];

class ApplyManageNewUi extends Component {
    state = {};

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className='appManageNewUI'>
                <div className='content-left'>
                    {/*    返回按钮*/}
                    <Button
                        className={'Button_leftIcon'}
                        icon={<LeftOutlined/>}
                        style={{marginTop: '25px', marginLeft: '25px', marginBottom: '25px'}}
                        onClick={() => {
                            this.props.history.push('/pages/appCenter/applyIndex');
                        }}
                    >
                        返回
                    </Button>
                    {/*菜单栏*/}
                    <div className='itemLi'>
                        {this.makeMenu()}
                    </div>
                </div>
                <div className='content-right'>
                    <AppCenterManageRouter/>
                </div>
            </div>
        );
    }

    makeMenu() {
        const selectedKeys = this.props.history.location.pathname.split('/')[4] ? this.props.history.location.pathname.split('/')[4] : '';
        const judgeSelect = (item) => {
            if (selectedKeys === item.key) {
                return true
            } else {
                if (item.childrenPath) {
                    let tag = false;
                    item.childrenPath.forEach(n => {
                        if (n === this.props.history.location.pathname) {
                            tag = true
                        }
                    })
                    return tag
                }
            }
            return false
        }
        return <ul>
            {
                leftMenu.map((item, idx) => {
                    return <li
                        className={judgeSelect(item) ? 'onLi' : ''}
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

export default ApplyManageNewUi;
