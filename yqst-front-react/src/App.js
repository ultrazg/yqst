import React, {Component} from 'react';
import {Route, Switch, Redirect, HashRouter} from 'react-router-dom';
import './App.css';
import './App.less';
import './App.scss';
import WindowObjectConfig from './WindowObjectConfig';
import Loading from './baseview/loading/Loading';
import Storage from './utils/localstorage/LocalStorage';
import ApiConst from './base/urls/ApiConst';
import ApiInterface from './base/urls/ApiInterface';
import {logo, zj_logo, yzw_pre, xmd_pre} from './resource';
import Permissions from './base/permissions/Permissions';

import UserLayout from './page/layout/userLayout';
import MainLayout from './page/layout/mainLayout';

class App extends Component {
    constructor(props) {
        super(props);
        window.Storage = Storage;
        this.initConfig();

    }

    initConfig() {
        WindowObjectConfig();
        window.downLoadHost = ApiConst.Versions().sunaw + ApiInterface.DownloadFile;
        window.imageFetchType = "image/*";
        window.globalConfig = globalConfig();
        window.globalPermissions = Permissions;
    }

    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/users" component={UserLayout}/>
                    <Route path="/pages" component={MainLayout}/>
                    <Redirect from='/' to='/users'/>
                </Switch>
                <Loading ref={(c) => window.Loading = c}/>
            </HashRouter>
        );
    }
}

const globalConfig = () => {
    let developeType = ApiConst.getVersions();
    let link = document.createElement("link");
    switch (developeType) {
        case ApiConst.Ver.DEVELOP:
        case ApiConst.Ver.TEST:
        case ApiConst.Ver.PRODUCT:
            //配置icon
            link.setAttribute("rel", "shortcut icon");
            link.href = logo;
            document.head.appendChild(link);
            document.title = "云企商通";
            return {
                title: "云企商通",
                version: "",
                logo: logo,
                desc: '致力于帮助传统企业产业互联网+转型',
                themeColor: '#4481EB',
                infoDom: <section
                    style={{
                        marginTop: 7,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: 12
                    }}>
                    <span>深圳总部：深圳市龙华新区观光路1301号银星科技大厦C606</span>
                    <span>联系方式： 0755--66632697</span>
                    <span>广州公司：广州市天河区天慧路3号广州互联网产业园六楼</span>
                    <span>联系方式： 020--38039233</span>
                    <span>汕头公司：汕头市高新区领域大厦10楼1002</span>
                    <span>联系方式： 0754--83652027</span>
                    <span>Copyright © 2019 Shenzhen Sunaw.Co All Rights Reserved. ICP备案号：粤ICP备案14100294号​-1 版权所有：©商沃科技 </span>
                </section>
            };
        case ApiConst.Ver.ZJ_PRE_PRODUCT:
        case ApiConst.Ver.ZJ_PRODUCT:
            link.setAttribute("rel", "shortcut icon");
            link.href = zj_logo;
            document.head.appendChild(link);
            document.title = "易租网";
            return {
                title: "易租网",
                version: "",
                logo: zj_logo,
                desc: '中建四局深圳实业有限公司',
                themeColor: '#4481EB',
                infoDom: <section
                    style={{
                        marginTop: 7,
                        marginBottom: 7,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: 12
                    }}>
                    <span>技术支持：中建四局深圳实业有限公司数字化运营中心 电话：4008015750</span>
                    <span>地址：广州市天河区科韵路广州信息港B座8楼 邮编：510665</span>
                    <span>粤ICP备16038730号-3</span>
                    <div style={{display: 'flex', flexDirection: 'row', marginTop: 5}}>
                        <span>易租网Pre：<img style={{width: 100, height: 100}} src={yzw_pre}/></span>
                        <span style={{width: 20, height: 1}}/>
                        <span>易租网项目端Pre：<img style={{width: 100, height: 100}} src={xmd_pre}/></span>
                    </div>
                </section>
            };
        default:
            return {};
    }
}

export default App;
