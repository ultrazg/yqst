import React, {Component} from 'react';
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom';
import './App.css';
import './App.less';
import './App.scss';
import WindowObjectConfig from './WindowObjectConfig';
import Login from './page/login/Login';
// import Index from './page/index/Index';
import NewIndex from './page/index/NewIndex';
import Loading from './baseview/loading/Loading';
import Storage from './utils/localstorage/LocalStorage';
import ApiConst from './base/urls/ApiConst';
import ApiInterface from './base/urls/ApiInterface';
import {login_logo, loginST_logo, zj_logo} from './resource/resourceRef';

class App extends Component {
    constructor(props) {
        super(props);
        window.Storage = Storage;
        this.initConfig()
    }

    initConfig() {
        WindowObjectConfig();
        window.downLoadHost = ApiConst.Versions().sunaw + ApiInterface.DownloadFile;
        // window.imageFetchType = "image/*";
        window.globalConfig = globalConfig();
    }

    render() {
        return (
            <HashRouter>
                <div>
                    <Switch>
                        <Route exact path={'/'} component={Login}/>
                        <Route path={'/Login'} component={Login}/>
                        <Route path={'/Overdue'} component={Login}/>
                        {/*<Route path={'/Index'} component={Index}/>*/}

                        <Route path={'/Pages'} component={NewIndex}/>

                        {/*<Redirect to={'/Pages/SoftList'}/>*/}
                        <Redirect to={'/Pages/CloudServeList'}/>
                    </Switch>
                    <Loading ref={(c) => window.Loading = c}/>
                </div>
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
            // link.href = login_logo;
            link.href = loginST_logo;
            document.head.appendChild(link);
            document.title =  "云企商通";
            return {
                title: "云企商通",
                version: "",
                // logo: login_logo,
                logo: loginST_logo,
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
                themeColor: '#4481EB',
            };
        default:
            return {};
    }
}

export default App;
