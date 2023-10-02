/*
* Created by yb on 2019/10/24
* 用户中心的路由部分
* */

import React from 'react';
import {Route} from 'react-router-dom';

import OneselfUserManageList from "../../../userCenter/oneselfUser/OneselfUserManageList";
import OneselfUserManageDetail from "../../../userCenter/oneselfUser/OneselfUserManageDetail";
import CompanyUserList from "../../../userCenter/companyUser/CompanyUserList";
import CompanyUserDetail from "../../../userCenter/companyUser/CompanyUserDetail";
import LoginLogOutList from "../../../userCenter/loginLogOut/LoginLogOutList";
import OperationLogList from "../../../userCenter/operationLog/OperationLogList";
import UserDataStatistics from "../../../userCenter/userDataStatistics/UserDataStatistics";
import ProjectUserList from "../../../userCenter/projectUser/ProjectUserList";
import ProjectUserDetail from "../../../userCenter/projectUser/ProjectUserDetail";

const UserCenterRoute = (url, DevTipsPage) => {
    return [
        <Route key={'0'} path={url + '/OneselfUserManageList'}
               component={OneselfUserManageList}/>,
        <Route key={'1'} path={url + '/OneselfUserManageDetail'}
               component={OneselfUserManageDetail}/>,
        <Route key={'2'} path={url + '/CompanyUserList'}
               component={CompanyUserList}/>,
        <Route key={'3'} path={url + '/CompanyUserDetail'}
               component={CompanyUserDetail}/>,
        <Route key={'4'} path={url + '/LoginLogOutList'}
               component={LoginLogOutList}/>,
        <Route key={'5'} path={url + '/OperationLogList'}
               component={OperationLogList}/>,
        <Route key={'6'} path={url + '/UserDataStatistics'}
               component={UserDataStatistics}/>,
        <Route key={'7'} path={url + '/ProjectUserList'}
               component={ProjectUserList}/>,
        <Route key={'8'} path={url + '/ProjectUserDetail'}
               component={ProjectUserDetail}/>,
    ]
};
export default UserCenterRoute;
