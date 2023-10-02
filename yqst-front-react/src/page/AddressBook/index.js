import React, {Component} from 'react';
import AddressBookRouter from '../PageRouters/ChildRouter/AddressBookRouter'
import './index.less'

const menuData = [
    {title: '企业架构', path: '/pages/addressBook/enterpriseArchitecture', key: 'enterpriseArchitecture'},
    {title: '合作伙伴', path: '/pages/addressBook/partners', key: 'partners'},
    {title: '联系人', path: '/pages/addressBook/contact', key: 'contact'},
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
            <div className={'page-wrapper'}>
                <div className={'menuCss'}>
                    <div className={'menuCss_div'}>
                        <div style={{width: '87%', textAlign: 'center'}}>
                            {this.renderMenu()}
                        </div>
                    </div>
                </div>
                {/*<Row className={'page-wrapper-top'}>
                    <Col span={11}></Col>
                    <Col span={13}>
                        {this.renderMenu()}
                    </Col>
                </Row>*/}
                <div className={'page-wrapper-content'}>
                    <AddressBookRouter/>
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
        //         onClick={() => {
        //         }}
        //         selectedKeys={[selectedKeys]}
        //         mode="horizontal"
        //         style={{lineHeight: '42px', borderBottom: 'none', fontSize: '16px', paddingLeft: '20px'}}
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
