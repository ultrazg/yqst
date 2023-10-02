/**
 * Created by yb on 2019/08/26.
 * 改造后的“首页”
 */
import React, {Component} from 'react';
import {Layout, Menu, Dropdown, Button, Modal, Form, Input, message, Row, Col} from 'antd';
import {SearchOutlined, BellOutlined, SettingOutlined, DownOutlined} from '@ant-design/icons';
import * as Res from '../../resource/resourceRef';
// import IndexHead from './component/IndexHead';
// import IndexSideMenu from './component/IndexSideMenu';
import NewIndexSideMenu
    from './component/NewIndexSideMenu';
import IndexContent from './component/IndexContent';
import {selectBigMenu, selectMenu, setScrernSize, updateSelectMenuData, setOpenKey} from './redux/IndexAction';
import {connect} from 'react-redux';
// import {Redirect} from 'react-router-dom'
import AssemblySet from "../../baseview/assemblySet/AssemblySet";
import IndexModel from "./model/IndexModel";
import Md5 from "../../utils/encryption/Md5";
import PublicData from "../../base/publicData/PublicData";
import './index.less'
import CheckInput from "../../utils/checkInput/CheckInput";

// const {Header, Content, Sider} = Layout;
const confirm = Modal.confirm;
const checkName = ['yPassword', 'xPassword', 'xPasswords'];

class NewIndex extends Component {
    indexMenuTag = ''

    constructor(props) {
        super(props);
        document.title = "";
        document.title = window.globalConfig.title + "运营中心";
        this.state = {
            xgpVisible: false,
            confirmDirty: false,
        };
        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.screenChange()
        this.dealUrl()
    }

    screenChange() {
        window.addEventListener('resize', () => {
            let nowWidth = document.documentElement.clientWidth - 200;
            this.props.setScrernSize(nowWidth < 1000 ? 1000 : nowWidth);
        });
    }

    dealUrl() {
        if (window.attachEvent) {
            window.attachEvent('onbeforeunload', (ev) => {
                this.beforeunloadDeal(ev)
            });
        } else {
            window.addEventListener('beforeunload', (ev) => {
                this.beforeunloadDeal(ev)
            }, false);
        }
        window.addEventListener('hashchange', (params) => {
            // console.log(params, "hashchange");
            let url = window.location.href;
            //触发函数
            let urlPa = params.newURL ? params.newURL.split("#") :
                (url ? url.split("#") : "");
            if (urlPa.length > 1) {
                if (urlPa[1].charAt(urlPa[1].length - 1) == "/")
                    urlPa[1] = urlPa[1].substring(0, urlPa[1].length - 1);
                urlPa[1] != '/Login' && urlPa[1] != '/Overdue' && this.dealPageByUrl()
            }
        });
        this.dealPageByUrl();
    }

    beforeunloadDeal(ev) {
        // console.log("urlpa=", this.props.history.location.pathname);
        (this.props.history.location.pathname == '/Pages/CreateCloudService'
            || this.props.history.location.pathname == '/Pages/CreateRules')
        &&
        ev && (ev.returnValue = '你确定要离开？');
    }

    /**
     * 刷新页面后，特殊页面不能停留，需做处理
     * @param pa
     */
    dealPageByUrl() {
        let pathname = this.props.history.location.pathname;
        switch (pathname) {
            case '/Pages/CreateCloudService':
                // this.props.history.replace('/Pages/SoftList');
                this.props.history.replace('/Pages/CloudServeList');
                break;
            case '/Pages/CreateRules':
                this.props.history.replace('/Pages/RulesList');
                break;
            default :
                let pathname = this.props.history.location.pathname;
                //设置菜单
                !this.changeReduxByUrl(pathname,
                    {menuTag: 'SystemSetupMenu', menuData: global.globalMenuData.SystemSetupMenu})
                //主菜单
                && !this.changeReduxByUrl(pathname,
                    {menuTag: 'MainMenu', menuData: global.globalMenuData.MainMenu})
                //默认重置到首页
                && pathname != '/Pages/ReLoadBlankPage'
                // && this.props.history.replace('/Pages/SoftList')
                && this.props.history.replace('/Pages/CloudServeList')
                break;
        }
    }

    updateMenu(menu) {
        if (this.indexMenuTag != menu.menuTag)
            this.props.updateSelectMenuData(menu.menuData);
        this.indexMenuTag = menu.menuTag;
    }

    /**
     * 跳转右侧页面
     * @param pa
     */
    changeReduxByUrl(pa, menu) {
        //匹配地址
        let key = this.getKeyByUrl(pa, menu.menuData);
        //匹配成功
        if (key) {
            //选择性更新菜单
            this.updateMenu(menu);
            //更新菜单位置
            let position = this.getPositionByKey(key, menu.menuData);
            if (position >= 0) {
                this.props.selectBigMenu({position: position, key: key});
                this.props.selectMenu({
                    position: position,
                    key: key,
                });
                this.props.setOpenKey([position + ''])
            }
        }
        return key
    }

    getKeyByUrl(url, thisMenu) {
        let key = "";
        if (url == "/Pages" || url == "/Pages/") {
            key = "";
        } else {
            let indexMenu = thisMenu;
            for (let i = 0; i < indexMenu.length; i++) {
                if (indexMenu[i].sideMenu) {
                    for (let j = 0; j < indexMenu[i].sideMenu.length; j++) {
                        if (indexMenu[i].sideMenu[j].onlyTwo) {
                            if (url != indexMenu[i].sideMenu[j].key && indexMenu[i].sideMenu[j].childKeys) {
                                for (let l = 0; l < indexMenu[i].sideMenu[j].childKeys.length; l++) {
                                    if (url.indexOf(indexMenu[i].sideMenu[j].childKeys[l]) >= 0) {
                                        key = indexMenu[i].sideMenu[j].key;
                                        break;
                                    }
                                }
                            } else if (url == indexMenu[i].sideMenu[j].key) {
                                key = indexMenu[i].sideMenu[j].key;
                                break;
                            }
                        } else if (!indexMenu[i].sideMenu[j].onlyTwo || indexMenu[i].sideMenu[j].subMenuList) {
                            for (let k = 0; k < indexMenu[i].sideMenu[j].subMenuList.length; k++) {
                                if (url != indexMenu[i].sideMenu[j].subMenuList[k].key) {
                                    if (indexMenu[i].sideMenu[j].subMenuList[k].childKeys) {
                                        for (let m = 0; m < indexMenu[i].sideMenu[j].subMenuList[k].childKeys.length; m++) {
                                            if (url.indexOf(indexMenu[i].sideMenu[j].subMenuList[k].childKeys[m]) >= 0) {
                                                key = indexMenu[i].sideMenu[j].subMenuList[k].key;
                                                break;
                                            }
                                        }
                                    }
                                } else {
                                    key = indexMenu[i].sideMenu[j].subMenuList[k].key;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
        return key;
    }

    getPositionByKey(key, thisMenu) {
        let pos = -1;
        let indexMenu = thisMenu;
        for (let i = 0; i < indexMenu.length; i++) {
            if (indexMenu[i].sideMenu) {
                for (let j = 0; j < indexMenu[i].sideMenu.length; j++) {
                    if (indexMenu[i].sideMenu[j].onlyTwo && key == indexMenu[i].sideMenu[j].key) {
                        pos = i;
                        break;
                    } else if (indexMenu[i].sideMenu[j].subMenuList) {
                        for (let k = 0; k < indexMenu[i].sideMenu[j].subMenuList.length; k++) {
                            if (key == indexMenu[i].sideMenu[j].subMenuList[k].key) {
                                pos = i;
                                break;
                            }
                        }
                    }
                }
            }
        }
        return pos;
    }

    render() {
        return <>
            <Form ref={this.formRef}/>
            <Layout>
                {/*页面头部*/}
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: PublicData.pageTopHeight,
                    // background: '#0d4b6c',
                    background: '#000c17',
                    position: 'fixed',
                    width: '100%',
                    zIndex: 168,
                    left: 0,
                    top: 0,
                }}>
                    <div style={{display: 'flex', flex: 1, flexDirection: 'row', width: 200, alignItems: 'center'}}>
                        <Row style={{display: 'flex', flex: 1,}}>
                            <Col span={8}>
                                <a style={{display: 'inline-block'}} onClick={() => {
                                    this.props.history.push('/Index');
                                }}>
                                    <img
                                        className={'imgContain'}
                                        style={{width: 35, height: 35, marginLeft: 15, marginRight: 15}}
                                        alt={'login'}
                                        src={window.globalConfig.logo}/>
                                    <span style={{color: '#fff', fontSize: 14}}>
                                            {window.globalConfig.title}运营中心
                                        </span>
                                </a>
                            </Col>
                            <Col className={'indexLeftIcon'} style={{textAlign: 'right', marginTop: 8}} span={16}>
                                <SearchOutlined/>
                                <BellOutlined/>
                                <SettingOutlined onClick={() => {
                                    this.props.history.push('/Pages/AdministratorSetupList');
                                }}/>
                            </Col>
                        </Row>
                    </div>
                    {/*<IndexHead history={this.props.history}/>*/}
                    <Dropdown overlay={this.menu}>
                        <a>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                marginRight: 30,
                                alignItems: 'center',
                                textAlign: 'right',
                                flex: 1,
                            }}>
                                <img
                                    className={'imgContain'}
                                    style={{width: 28, height: 28, marginRight: 15, marginTop: 5}}
                                    alt={'login'}
                                    // src={window.globalConfig.logo}
                                    src={Res.picc_default}
                                />
                                <span className="text-elli3"
                                      style={{color: '#fff', maxWidth: 140, fontSize: 13, marginRight: 10}}>
                                {localStorage.alias ? localStorage.alias : ''}
                            </span>
                                <DownOutlined/>
                            </div>
                        </a>
                    </Dropdown>
                </div>

                {/*下边内容栏*/}
                <div style={{display: 'flex', flexDirection: 'row', marginTop: PublicData.pageTopHeight}}>
                    {/*页面左边菜单栏*/}
                    <NewIndexSideMenu history={this.props.history}/>

                    {/*页面右边内容部分*/}
                    <Layout>
                        <div id={'RightRouteDiv'} style={{
                            margin: 0,
                            minHeight: document.documentElement.clientHeight - 65
                            // height: document.documentElement.clientHeight - PublicData.pageTopHeight,
                            // overflowY: 'auto',
                            // padding: 5
                        }}>
                            <IndexContent match={this.props.match}/>
                        </div>
                    </Layout>
                </div>
                {this.makeXGPView()}
            </Layout>
        </>
    }

    menu = (
        <Menu>
            {/*<Menu.Item>
                <a onClick={() => {
                    setTimeout(() => {
                        // this.props.selectBigMenu({
                        //     position: 13,
                        //     key: this.props.IndexReducers.selectMenu[13],
                        // });
                        this.props.history.push("/Pages/AdminList");
                    }, 600);
                }}><span style={{fontSize: 16}}>管理员</span>
                </a>
            </Menu.Item>*/}
            <Menu.Item>
                <a onClick={() => {
                    confirm({
                        title: '温馨提示：',
                        content: '修改密码会导致用户重新登录，是否继续？',
                        cancelText: '取消',
                        okText: '继续',
                        onOk: () => {
                            this.setState({xgpVisible: true});
                        },
                        onCancel: () => {
                            // console.log('Cancel');
                        },
                    });
                }}><span style={{fontSize: 16}}>修改密码</span>
                </a>
            </Menu.Item>
            <Menu.Item>
                <a onClick={() => {
                    localStorage.clear();
                    window.location.hash = '/Login';
                }}>
                    <span style={{fontSize: 16}}>退出</span>
                </a>
            </Menu.Item>
        </Menu>
    );

    makeXGPView() {
        let noSetData = [
            {
                key: 'adminNameText',
                type: 'Texts',
                value: localStorage.adminName ? localStorage.adminName : '',
                label: '账号',
                span: 24,
            },
            {
                key: 'yPassword',
                type: 'Password',
                value: '',
                label: '原密码',
                placeholder: '请输入原密码',
                span: 24,
                options: {
                    rules: [{
                        required: true, message: '原密码不能为空',
                    }],
                },
                attribute: {
                    maxLength: 18,
                }
            },
            {
                key: 'xPassword',
                type: 'Password',
                value: '',
                label: '新密码',
                placeholder: '请输入新密码',
                span: 24,
                options: {
                    rules: [{
                        required: true, message: '新密码不能为空',
                    }, {
                        validator: (rule, value, callback) => this.validateToNextPassword(rule, value, callback, ['xPasswords'], this.state.confirmDirty),
                    }],
                },
                attribute: {
                    maxLength: 18,
                }
            },
            {
                key: 'xPasswords',
                type: 'Password',
                value: '',
                label: '确认新密码',
                placeholder: '请再次输入新密码',
                span: 24,
                options: {
                    rules: [{
                        required: true, message: '确认密码不能为空',
                    }, {
                        validator: (rule, value, callback) => this.compareToFirstPassword(rule, value, callback, 'xPassword'),
                    }],
                },
                attribute: {
                    maxLength: 18,
                    onBlur: (e) => {
                        this.setState({confirmDirty: this.state.confirmDirty || !!e.target.value});
                    }
                }
            }
        ];
        return <Modal
            title="修改密码"
            visible={this.state.xgpVisible}
            maskClosable={false}
            footer={null}
            // onOk={() => {}}
            onCancel={() => {
                this.setState({xgpVisible: false}, () => {
                    const {resetFields} = this.formRef.current;
                    resetFields(checkName);
                });
            }}
        >
            <Form ref={this.formRef} autoComplete="off" onFinishFailed={(err) => {
                if (err.errorFields && err.errorFields.length == 0) {
                    this.onSubmits(err.values);
                }
            }} onFinish={(values) => {
                this.onSubmits(values)
            }}>
                {/*防止浏览器密码自动赋值*/}
                <div style={{width: 0, height: 0, margin: 0, padding: 0, border: 0, overflow: 'hidden'}}>
                    <Input key="autoCancelRealName" type="text" id="text"/>
                    <Input key="autoCancelPassword" type="password" id="password" autoComplete="new-password"/>
                    <Input key="autoCancelRealName2" type="text" id="text2"/>
                </div>
                <AssemblySet key={'makeModView'} data={noSetData} form={this.formRef.current}/>
                <div style={{color: '#999', fontSize: 10, paddingLeft: 30}}>
                    {"8位到18位密码，密码需包含以下类型的两种，大小字母、数字、特殊字符只能是\~\!\@\#\$\%\^\&\*\(\)\[\]\{\}\<\>\_\=\:\.\,\'\"\+\-\;\|\/\\"}
                </div>
                <div
                    style={{textAlign: 'right', borderTop: '1px solid #e8e8e8', paddingTop: '10px', marginTop: '10px'}}>
                    <Button
                        style={{marginRight: 10}}
                        onClick={() => {
                            this.setState({xgpVisible: false}, () => {
                                const {resetFields} = this.formRef.current;
                                resetFields(checkName);
                            });
                        }}
                    >取消</Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        确定
                    </Button>
                </div>
            </Form>
        </Modal>
    }

    validateToNextPassword = (rule, value, callback, vTextArr = [], confirmDirty) => {
        const {validateFields} = this.formRef.current;
        if (value && value.length < 8) {
            return callback('密码不能少于8个字符！');
        } else if (!CheckInput.checkPsw(value)) {
            return callback('请输入合适的8位到18位密码');
        } else if (CheckInput.checkPswSameKind(value)) {
            return callback('密码需包含以下两种类型，大小写字母、数字、特殊字符');
        }
        if (value && confirmDirty) {
            validateFields(vTextArr, {force: true});
        }
        callback();
    };

    compareToFirstPassword = (rule, value, callback, vText) => {
        const {getFieldValue} = this.formRef.current;
        if (value && value.length < 8) {
            return callback('密码不能少于8个字符！');
        }
        if (value && value !== getFieldValue(vText)) {
            callback('两次新密码不一致，请重新输入！');
        } else {
            callback();
        }
    };

    onSubmits(values) {
        const {resetFields} = this.formRef.current;
        IndexModel.xtAdminUpdate({
            id: localStorage.userId,
            adminPassword: Md5.hex_md5(values.xPassword),
            oldAdminPassword: Md5.hex_md5(values.yPassword),
        }, (res) => {
            message.success('修改成功！', 1);
            setTimeout(() => {
                resetFields(checkName);
                window.location.hash = '/Overdue';
            }, 1200)
        }, (err) => {
        })
    }
}

const
    mapStateToProps = (state) => {
        const {IndexReducers} = state;
        return {
            IndexReducers
        }
    };
const
    mapDispatchToProps = (dispatch) => {
        return {
            selectBigMenu: (data) => {
                dispatch(selectBigMenu(data))
            },
            selectMenu: (data) => {
                dispatch(selectMenu(data))
            },
            setScrernSize: (data) => {
                dispatch(setScrernSize(data))
            },
            updateSelectMenuData: (data) => {
                dispatch(updateSelectMenuData(data))
            },
            setOpenKey: (data) => {
                dispatch(setOpenKey(data))
            },
        }
    };

export default connect(mapStateToProps, mapDispatchToProps)(NewIndex);
