import React, {Component} from 'react';
import {message} from 'antd';
import './MyCompany.less';
import MyCompanyRouter from '../PageRouters/ChildRouter/MyCompanyRouter';

const menuData = [
    {title: '主体设置', path: '/pages/myCompany/subjectSetUp', key: 'subjectSetUp'},
    {title: '角色与权限', path: '/pages/myCompany/roleAndPower', key: 'roleAndPower'},
    // {
    //     title: '操作记录',
    //     // path: '/pages/myCompany/operationRecord',
    //     path: '',
    //     key: 'operationRecord'
    // },
];

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className={'myCompanyCss'}>
                <div className={'menuCss'}>
                    <div className={'menuCss_div'}>
                        <div style={{width: '80.3%', textAlign: 'right'}}>
                            {this.renderMenu()}
                        </div>
                    </div>
                </div>
                <div className={'contents'}>
                    <MyCompanyRouter/>
                </div>
            </div>
        );
    }

    renderMenu = () => {
        const selectedKeys = this.props.history.location.pathname.split('/')[3] ? this.props.history.location.pathname.split('/')[3] : [];
        return <ul className={'menu_ul'}>
            {
                menuData && menuData.map((item, idx) => {
                    return <li key={'menu_' + idx}
                               className={'' + item.key === '' + selectedKeys ? 'onLi' : ''}
                               style={{fontSize: '14px'}}
                               onClick={() => {
                                   if (!item.path)
                                       return message.info('功能还在研发中，敬请期待！');
                                   this.props.history.push(item.path);
                               }}
                    >
                        {item.title}
                    </li>
                })
            }
        </ul>;

        // return (
        //     <Menu
        //         onClick={() => {}}
        //         selectedKeys={[selectedKeys]}
        //         mode="horizontal"
        //         style={{lineHeight: '42px', borderBottom: 'none', fontSize: '14px', paddingLeft: '20px'}}
        //     >
        //         {
        //             menuData && menuData.map(item => (
        //                 <Menu.Item key={item.key} onClick={() => this.props.history.push(item.path)}>
        //                     {item.title}
        //                 </Menu.Item>
        //             ))
        //         }
        //     </Menu>
        // )
    }
}

export default Index;
