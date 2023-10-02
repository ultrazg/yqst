/*
* Created by yb on 2019/11/08
* 系统设置的路由部分
* */

import React from 'react';
import {Route} from 'react-router-dom';

import AdministratorSetupList from '../../../systemSetup/administratorSetup/AdministratorSetupList';
import SensitiveWordList from "../../../systemSetup/sensitiveWord/SensitiveWordList";

const SystemSetupCenterRoute = (url, DevTipsPage) => {
    return [
        <Route key={'0'} path={url + '/AdministratorSetupList'}
               component={AdministratorSetupList}/>,
        <Route key={'1'} path={url + '/SensitiveWordList'}
               component={SensitiveWordList}/>,
    ]
};
export default SystemSetupCenterRoute;