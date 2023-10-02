import React, {Component} from 'react';

import { message } from 'antd';
import SubjectSetUpRouter from '../../PageRouters/ChildRouter/SubjectSetUpRouter';

const leftMenu = [
    {
        label: '企业基本信息',
        key: 'companyBasInf',
        path: '/pages/myCompany/subjectSetUp/companyBasInf/index',
    },
    {
        label: '企业认证信息',
        key: 'companyAutInf',
        path: '/pages/myCompany/subjectSetUp/companyAutInf',
    },
    {
        label: '企业业务信息',
        key: 'companyBusInf',
        path: '/pages/myCompany/subjectSetUp/companyBusInf/index',
    },
    // {
    //     label: '企业设置',
    //     key: 'companySetUp',
    //     path: '/pages/myCompany/subjectSetUp/companySetUp',
    // },
    {
        label: '转让企业创建者',
        key: 'companyTraCre',
        path: '/pages/myCompany/subjectSetUp/companyTraCre',
    },
    // {
    //     label: '解散当前企业',
    //     key: 'companyDissolve',
    //     path: '/pages/myCompany/subjectSetUp/companyDissolve',
    // },
    // {
    //     label: '退出当前企业',
    //     key: 'companyPushOut',
    //     path: '/pages/myCompany/subjectSetUp/companyPushOut',
    // },
];


class SubjectSetUp extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    componentWillUnmount() {}

    render() {
        return (
            <div className={'ssuCss'}>
                <div className={'ssuCssL'}>
                    {this.makeMenu()}
                </div>
                <div className={'ssuCssR'}>
                    <SubjectSetUpRouter/>
                </div>
            </div>
        );
    }

    makeMenu(){
        const selectedKeys = this.props.history.location.pathname.split('/')[4] ? this.props.history.location.pathname.split('/')[4] : '';
        return <ul>
            {
                leftMenu.map((item, idx) => {
                    return <li
                        className={selectedKeys == item.key ? 'onLi' : ''}
                        key={item.key}
                        onClick={() => {
                            if(item.key === 'companyTraCre' && localStorage.admin !== '1'){
                                return message.error('您不是该企业的管理员，无法执行该操作');
                            }
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

export default SubjectSetUp;
