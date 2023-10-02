import React, {Component} from 'react';
import {Layout, Row, Col, Menu, Dropdown, Modal, Button, Select, Spin, message} from 'antd';
import Model from './Model';
import './mainLayout.less'
import MainLayoutRouter from '../PageRouters/MainLayoutRouter'
import {small, head, perCenter, perOtherCon, perOut, perSetUp, Inform, none} from '../../resource';
import {connect} from 'react-redux';
import {setIndexMes, allTypeNews} from './redux/mainLayoutAction';
import {setPermissionsData} from '../../baseview/permission/redux/PermissionsAction';
import moment from 'moment';
import Model2 from '../SetUpCompany/Model';

const {Header, Content} = Layout;
const {SubMenu} = Menu;
const {Option} = Select;

const menuData = [
    {title: '首页', path: '/pages/home', key: 'home'},
    {title: '通讯录', path: '/pages/addressBook', key: 'addressBook'},
    {title: '应用中心', path: '/pages/appCenter', key: 'appCenter'},
    {title: '我的企业', path: '/pages/myCompany', key: 'myCompany'},
];

@connect(
    (state) => {
        const {mainLayoutReducers} = state;
        return {
            mainLayoutReducers
        }
    },
    (dispatch) => {
        return {
            setIndexMes: (position) => {
                dispatch(setIndexMes(position))
            },
            allTypeNews: (position) => {
                dispatch(allTypeNews(position))
            },
            setPermissionsData: (data) => {
                dispatch(setPermissionsData(data))
            }
        }
    }
)
class MainLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            cutVisible: false,
            companyList: [],
            changeAccountSn: null,
            perVisible: false,
            exitVisible: false,
        };
        this.height = document.documentElement.clientHeight;
        this.width = document.documentElement.clientWidth;
        if (localStorage && !localStorage.sessKey) {
            this.props.history.replace('/users/login/index');
            // this.props.history.push('/users/login/index');
        }
    }

    componentDidMount() {
        this.getNewsModelIList();
        this.getAutoLogin();
    }

    componentWillUnmount() {
    }

    render() {
        let {data} = this.state;
        let {mainLayoutReducers} = this.props;
        let {indexData, total} = mainLayoutReducers;
        const menu = (
            <Menu>
                <Menu.Item
                    onClick={() => {
                        // this.setState({perVisible: false});
                        this.props.history.push('/pages/home/personalCenter');
                    }}
                >
                    <a style={{fontSize: '14px'}} target="_blank" rel="noopener noreferrer">
                        <img style={{width: '20px', marginRight: '10px'}} src={perCenter} alt=""/>
                        个人中心
                    </a>
                </Menu.Item>
                <Menu.Item
                    onClick={() => {
                        // this.setState({perVisible: false});
                        this.props.history.push('/pages/home/personalSetting/personalInfo');
                    }}
                >
                    <a target="_blank" rel="noopener noreferrer">
                        <img style={{width: '20px', marginRight: '10px'}} src={perSetUp} alt=""/>
                        个人设置
                    </a>
                </Menu.Item>
                <SubMenu className="create-project" title={
                    <span>
                        <img style={{width: '20px', marginRight: '10px'}} src={perOtherCon} alt=""/>
                        其他企业
                    </span>
                }>
                    <Menu.Item
                        onClick={() => {
                            // this.setState({perVisible: false});
                            this.GetEnterpriseList();
                        }}
                    >切换企业</Menu.Item>
                    <Menu.Item
                        onClick={() => {
                            // this.setState({perVisible: false});
                            this.props.history.push('/pages/home/foundCompany');
                        }}
                    >创建企业</Menu.Item>
                    <Menu.Item
                        onClick={() => {
                            // this.setState({perVisible: false});
                            this.props.history.push('/pages/home/findCompany');
                        }}
                    >查找企业</Menu.Item>
                </SubMenu>
                <Menu.Item onClick={() => {
                    this.setState({exitVisible: true});
                    // localStorage.clear();
                    // this.props.setIndexMes({});
                    // this.props.history.push('/users/login/index');
                }}>
                    <a target="_blank" rel="noopener noreferrer">
                        <img style={{width: '20px', marginRight: '10px'}} src={perOut} alt=""/>
                        退出登录
                    </a>
                </Menu.Item>
            </Menu>
        );

        return (
            <Layout>
                <Header className={'homeHeader'}>
                    <Row className={'homeHeader_com'}>
                        <Col span={4} className={'topL'}>
                            <img src={window.globalConfig.logo} alt=""
                                 style={{width: '32px', height: '32px', marginRight: '8px'}}
                            />
                            <h1
                                style={{
                                    margin: '0px',
                                    fontSize: '24px',
                                    display: 'inline-block',
                                    verticalAlign: 'bottom',
                                }}
                            >{window.globalConfig.title}</h1>
                        </Col>
                        <Col span={16} className={'topM'}>
                            {this.renderMenu()}
                        </Col>
                        <Col span={4} className={'topR'}>
                            <Dropdown overlayClassName={'Dropdown_mes'} overlay={this.makeDropdown()}
                                      placement="bottomRight">
                                <span
                                    style={{
                                        position: 'relative'
                                    }}
                                >
                                    <img src={small} alt=""/>
                                    {
                                        total <= 0 ? null : <span
                                            style={{
                                                position: 'absolute',
                                                left: '10px',
                                                top: '10px',
                                                padding: '4px 6px',
                                                borderRadius: '50%',
                                                background: 'rgb(255, 0, 0)',
                                                lineHeight: '10px',
                                                color: 'rgb(255, 255, 255)',
                                                fontSize: '10px',
                                                zIndex: 1,
                                            }}
                                        >{total}</span>
                                    }
                                </span>
                            </Dropdown>
                            <Dropdown overlay={menu} overlayClassName={'Dropdown'}
                                      onVisibleChange={(visible) => {
                                          // this.setState({perVisible: visible});
                                      }}
                            >
                                <a className={'per'} title={indexData.userAlias || 'xxx'}
                                   style={{
                                       // padding: '0 10px',
                                       // background: this.state.perVisible ? '#EDF6FF' : '#fff'
                                   }}
                                >
                                    <img src={indexData.userPhoto || head} alt=""/>
                                    <span>{indexData.userAlias || 'xxx'}</span>
                                </a>
                            </Dropdown>
                        </Col>
                    </Row>
                </Header>
                <Content className={'homeContent'}>
                    <MainLayoutRouter/>
                </Content>

                {this.makeCutCompany()}
                {this.makeExitMod()}
            </Layout>
        );
    }

    getNewsModelIList() {
        Model.NewsModelIList({}, (res) => {
            this.props.allTypeNews({
                allList: res.data,
                isAwait: false
            });
        }, (err) => {
            this.props.allTypeNews({
                allList: [],
                isAwait: false
            });
        });
    }

    GetEnterpriseList() {
        Model.GetEnterpriseList({}, (res) => {
            this.setState({
                companyList: res.data || [],
                cutVisible: true,
                // changeAccountSn: null
            });
        }, (err) => {
        });
    }

    getAutoLogin() {
        Model.AutoLogin({}, (res) => {
            this.setState({data: res.data, changeAccountSn: res.data.accountSn}, () => {
                window.globalPermissions.savePermissionsToLocal(res.data.groupSet);
                this.props.setPermissionsData({
                    isNetworkSync: true,
                    permissionsList: res.data.groupSet,
                    isAdmin: localStorage.admin
                });

                delete res.data.userAlias;
                delete res.data.staffId;
                delete res.data.departmentName;
                delete res.data.jobName;
                delete res.data.workPhone;
                delete res.data.workEmail;
                this.props.setIndexMes(res.data || {});
                localStorage.userPhoto = res.data.userPhoto || '';
                localStorage.userEmail = res.data.userEmail || '';
                localStorage.isCerti = res.data.isCerti || '';
                localStorage.company = res.data.company || '';
                localStorage.industry = res.data.industry || '';
                localStorage.provinceName = res.data.provinceName || '';
                localStorage.cityName = res.data.cityName || '';
                localStorage.districtName = res.data.districtName || '';
                localStorage.companyPhone = res.data.companyPhone || '';
                localStorage.companyEmail = res.data.companyEmail || '';
                localStorage.admin = res.data.admin;
                localStorage.personSn = res.data.personSn;
                localStorage.userSn = res.data.userSn;
            })
        }, (err) => {
        });
    }

    renderMenu = () => {
        const selectedKeys = this.props.history.location.pathname.split('/')[2] ? this.props.history.location.pathname.split('/')[2] : [];
        return (
            <Menu
                onClick={() => {
                }}
                selectedKeys={[selectedKeys]}
                mode="horizontal"
                style={{
                    display: 'flex',
                    flex: 1,
                    height: '62px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    lineHeight: '56px',
                    borderBottom: 'none',
                }}
                className={'TopMenu'}
            >
                {
                    menuData && menuData.map(item => (
                        <Menu.Item key={item.key} onClick={() => this.props.history.push(item.path)}>
                            {item.title}
                        </Menu.Item>
                    ))
                }
            </Menu>
        )
    }

    makeDropdown() {
        const {mainLayoutReducers} = this.props;
        const {allTypeNews} = mainLayoutReducers;
        const {isAwait, allList = []} = allTypeNews;
        const numBerFun = (num = 0) => {
            if (num >= 100) {
                return <span
                    style={{
                        position: 'absolute',
                        left: '24px',
                        top: '0px',
                        padding: '4px',
                        borderRadius: '50%',
                        background: '#f00',
                        lineHeight: '10px',
                        color: '#fff',
                        fontSize: '10px',
                        zIndex: '1'
                    }}
                >99<sup>+</sup></span>;

            } else {
                return <span
                    style={{
                        position: 'absolute',
                        left: '24px',
                        top: '0px',
                        padding: num < 10 ? '4px 6px' : '4px 4px',
                        borderRadius: '50%',
                        background: '#f00',
                        lineHeight: '10px',
                        color: '#fff',
                        fontSize: '10px',
                        zIndex: '1'
                    }}
                >{num}</span>;

            }
        };
        const newAllList = [];
        allList && allList.forEach(item => {
            if ('1' === '' + item.id || '2' === '' + item.id)
                return newAllList.push(item);
        });

        return <div style={{width: 372, height: 470, paddingTop: '7px'}}>
            <div
                style={{
                    background: '#fff',
                    width: '100%',
                    height: '100%',
                    boxShadow: '0px 0px 10px 0px rgba(43,52,65,0.15)',
                    borderRadius: '6px'
                }}
            >
                <i className={'icon'}/>
                <h1
                    style={{
                        fontSize: '16px',
                        textAlign: 'center',
                        lineHeight: '22px',
                        color: '#4481EB',
                        padding: '11px 0 14px',
                        borderBottom: '1px solid rgba(43,52,65,0.09)',
                        position: 'relative',
                        margin: '0px'
                    }}
                >通知 <span style={{
                    position: 'absolute',
                    width: '96%',
                    height: '3px',
                    bottom: '0',
                    background: '#4481EB',
                    left: '2%',
                }}/></h1>
                {
                    isAwait ? <div style={{textAlign: 'center', marginTop: '150px'}}>
                        <Spin size="large" spinning={isAwait}/>
                        <div style={{color: '#BBBBBB', marginTop: '8px'}}>加载中，请稍等...</div>
                    </div> : newAllList && newAllList.length > 0 ? [
                        <ul key={'ul'} style={{
                            height: '367px',
                            overflowY: 'auto',
                            margin: '0',
                            paddingBottom: '5px',
                        }}>
                            {
                                newAllList && newAllList.map((item, idx) => {
                                    return <li className={'list_li'} key={'allLists_' + idx}
                                               style={{
                                                   padding: '0 24px',
                                               }}
                                               onClick={() => {
                                                   this.props.history.push(`/pages/home/systemMessage?id=${item.id}`);
                                               }}
                                    >
                                        <Row style={{
                                            padding: '12px 0 9px',
                                            borderBottom: '1px solid rgba(43,52,65,0.09)',
                                        }}>
                                            <Col span={3} style={{
                                                position: 'relative',
                                            }}>
                                                <img
                                                    style={{width: '32px', marginTop: '5px'}}
                                                    src={item.avatar || Inform} alt=""/>
                                                {item.unReadNumber && item.unReadNumber > 0 ? numBerFun(item.unReadNumber) : null}
                                            </Col>
                                            <Col span={21} style={{paddingLeft: '8px'}}>
                                                <h3 style={{
                                                    fontSize: '16px',
                                                    color: '#2B3441',
                                                    marginBottom: '8px'
                                                }}>{item.infoType}消息</h3>
                                                <span style={{fontSize: '12px', color: '#2B3441'}}>
                                                {item.createTime ? moment(item.createTime).format("MM-DD HH:mm") : ''}
                                            </span>
                                            </Col>
                                        </Row>
                                    </li>;
                                })
                            }
                        </ul>,
                        <div
                            key={'divs'}
                            style={{
                                borderTop: '1px solid rgba(43,52,65,0.09)',
                                height: '48px',
                                width: '100%',
                                textAlign: 'center',
                                fontSize: '16px',
                                position: 'relative',
                            }}
                        >
                            {/*<div className={'bottom_btn'} style={{
                                width: '50%',
                                height: '100%',
                                display: 'inline-block',
                                lineHeight: '48px',
                                cursor: 'pointer',
                            }}>
                                全部已读
                            </div>*/}
                            <div className={'bottom_btn'} style={{
                                width: '100%',
                                height: '100%',
                                display: 'inline-block',
                                lineHeight: '48px',
                                cursor: 'pointer',
                            }}
                                 onClick={() => {
                                     // this.props.history.push('/pages/home/system');
                                     this.props.history.push(`/pages/home/systemMessage`);
                                 }}
                            >
                                查看全部
                            </div>
                            {/*<div
                                style={{
                                    position: 'absolute',
                                    height: '100%',
                                    width: '1px',
                                    left: '50%',
                                    top: '0',
                                    background: '#ECEDEE',
                                }}
                            />*/}
                        </div>
                    ] : <ul key={'ul'} style={{
                        maxHeight: '367px',
                        overflowY: 'auto',
                        margin: '0',
                        paddingBottom: '5px',
                    }}>
                        <li
                            style={{
                                fontSize: '14px',
                                textAlign: 'center'
                            }}
                        >
                            <img style={{width: '300px', marginTop: '60px'}} src={none} alt=""/>
                            <p style={{
                                marginTop: '20px',
                                fontSize: '14px',
                                color: 'rgba(43,52,65,0.65)',
                            }}>暂无消息</p>
                        </li>
                    </ul>
                }
            </div>
        </div>
    }

    makeCutCompany() {
        let {cutVisible, companyList, data} = this.state;
        const toActive = (accountSn) => {
            Model2.activeEnterprise({
                accountSn: accountSn
            }, (res) => {
                message.info("激活成功")
                this.GetEnterpriseList();
            }, () => {
            })
        }
        return <Modal
            title="切换企业"
            closable={false}
            width={546}
            visible={cutVisible}
            onOk={() => {
            }}
            onCancel={() => {
                this.setState({cutVisible: false, changeAccountSn: null});
            }}
            className={'Modal'}
            footer={<div>
                <Button type="primary"
                        style={{marginRight: '16px', fontSize: '16px', width: '70px', height: '40px'}}
                        onClick={() => {
                            let insteadStatus = 0;
                            for (let i = 0; i < companyList.length; i++) {
                                if (companyList[i].accountSn == this.state.changeAccountSn) {
                                    insteadStatus = companyList[i].insteadStatus;
                                    break;
                                }
                            }
                            if (insteadStatus == 1) {
                                Modal.confirm({
                                    title: '确认激活该企业?',
                                    content: '',
                                    okText: '确认激活',
                                    cancelText: '再想想',
                                    width: 220,
                                    onOk: () => {
                                        toActive(this.state.changeAccountSn);
                                    },
                                    onCancel: () => {
                                        // console.log('Cancel');
                                    },
                                });
                                return;
                            }
                            Model.SwitchEnterprise({
                                accountSn: this.state.changeAccountSn
                            }, (res) => {
                                this.setState({cutVisible: false}, () => {
                                    localStorage.accountSn = res.data.accountSn;
                                    localStorage.accountStatus = res.data.accountStatus;
                                    localStorage.admin = res.data.admin;
                                    localStorage.domain = res.data.domain;
                                    localStorage.erpSessionId = res.data.erpSessionId;
                                    localStorage.isCerti = res.data.isCerti;
                                    localStorage.logo = res.data.logo;
                                    localStorage.staffName = res.data.staffName;
                                    localStorage.userNo = res.data.userNo;
                                    localStorage.company = res.data.company;
                                    localStorage.sessionKeyPicc = '';      //清除人保登录的sessionkey
                                    if (res.data.openId)
                                        localStorage.openId = res.data.openId;

                                    window.location.href = "/";
                                });

                            }, (err) => {
                            });
                        }}
                >
                    确定
                </Button>
                <Button
                    style={{fontSize: '16px', width: '70px', height: '40px'}}
                    onClick={() => {
                        this.setState({
                            changeAccountSn: null,
                            cutVisible: false
                        });
                    }}
                >
                    取消
                </Button>
            </div>}
        >
            <Row>
                <Col span={4}
                     style={{fontSize: '14px', textAlign: 'right', lineHeight: '32px'}}
                >选择企业：</Col>
                <Col span={20}
                     style={{paddingLeft: '8px'}}
                >
                    <Select
                        showSearch
                        defaultValue={data.accountSn + ''}
                        style={{width: '90%'}}
                        placeholder="请选择企业"
                        onChange={(val, record) => {
                            this.setState({changeAccountSn: val});
                        }}
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {
                            companyList && companyList.map((item, idx) => {
                                return <Option key={'companyLists_' + idx}
                                               value={item.accountSn + ''}
                                               title={item.companyName}>
                                    {item.insteadStatus == 1 ?
                                        <span style={{color: 'red'}}>(待激活)</span> : ""}
                                    {item.companyName}
                                </Option>
                            })
                        }
                    </Select>
                </Col>
            </Row>
        </Modal>
    }

    makeExitMod() {
        return <Modal
            className={'Modal'}
            title="温馨提示"
            width={400}
            closable={false}
            maskClosable={false}
            visible={this.state.exitVisible}
            onOk={() => {
            }}
            onCancel={() => {
                this.setState({exitVisible: false});
            }}
            footer={null}
        >
            <h1
                style={{marginBottom: '30px', fontSize: '18px', textAlign: 'center'}}
            >确定要退出登录吗？</h1>
            <div
                style={{textAlign: 'center'}}
            >
                <Button type="primary"
                        style={{
                            width: '64px',
                            height: '32px',
                            marginRight: '16px',
                            fontSize: '16px',
                            padding: '0px'
                        }}
                        onClick={() => {
                            localStorage.clear();
                            this.props.setIndexMes({});
                            this.props.history.push('/users/login/index');
                        }}
                >确定</Button>
                <Button
                    style={{width: '64px', height: '32px', fontSize: '16px', padding: '0px'}}
                    onClick={() => {
                        this.setState({exitVisible: false});
                    }}
                >取消</Button>
            </div>
        </Modal>
    }
}

export default MainLayout;
