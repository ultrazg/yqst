import React, {Component} from 'react';
import './PersonalSetting.less';
import PersonalSettingRouter from "../PageRouters/ChildRouter/PersonalSettingRouter";

const leftMenu = [
    {
        label: '个人信息',
        key: 'personalInfo',
        path: '/pages/home/personalSetting/personalInfo',
    },
    {
        label: '名片管理',
        key: 'businessCardManagement',
        path: '/pages/home/personalSetting/businessCardManagement',
    },
    {
        label: '个人实名认证',
        key: 'personalRealName',
        path: '/pages/home/personalSetting/personalRealName',
    },
    {
        label: '账号与安全',
        key: 'accountAndSecurity',
        path: '/pages/home/personalSetting/accountAndSecurity',
    },
    // {
    //     label: '其他企业消息提醒',
    //     key: 'otherCompanyMes',
    //     path: '/pages/home/personalSetting/otherCompanyMes',
    // },
    {
        label: '隐私',
        key: 'personalPrivacy',
        path: '/pages/home/personalSetting/personalPrivacy',
    },
    // {
    //     label: '意见与反馈',
    //     key: 'ideaAndFeedback',
    //     path: '/pages/home/personalSetting/ideaAndFeedback',
    // },
];

class PersonalSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    componentWillUnmount() {

    }

    render() {
        return (
            <div
                className={'perSetCss'}
                style={{
                    width: '1116px',
                    margin: '24px auto',
                    background: '#fff',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    position: 'relative',
                    minHeight: '662px',
                    fontSize: '14px'
                }}
            >
                <div
                    style={{
                        width: '261px',
                        height: '100%',
                        background: '#F9FAFC',
                        borderRadius: '6px 0px 0px 6px',
                        position: 'absolute',
                        left: '0px'
                    }}
                >
                    {this.makeMenu()}
                </div>
                <div
                    className={'rightComtent'}
                    style={{
                        width: '100%',
                        paddingLeft: '261px',
                        borderRadius: '6px'
                    }}
                >
                    <PersonalSettingRouter/>
                </div>
            </div>
        );
    }

    makeMenu(){
        const selectedKeys = this.props.history.location.pathname.split('/')[4] ? this.props.history.location.pathname.split('/')[4] : '';
        return <ul className={'leftMenu'}>
            {
                leftMenu.map((item, idx) => {
                    return <li
                        className={selectedKeys == item.key ? 'onLi' : ''}
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

export default PersonalSetting;
