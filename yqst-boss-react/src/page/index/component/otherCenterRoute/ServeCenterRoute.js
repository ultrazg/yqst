/*
* Created by yb on 2019/11/11
* 云服务中心的路由部分
* */

import React from 'react';
import {Route} from 'react-router-dom';

import CloudServeList from '../../../serveCenter/cloudServe/CloudServeList';
import CloudServeDetail from "../../../serveCenter/cloudServe/CloudServeDetail";
import CloudServeEdit from "../../../serveCenter/cloudServe/CloudServeEdit";
import CloudServeRuleList from "../../../serveCenter/cloudServeRule/CloudServeRuleList";
import CloudServeRuleDetail from "../../../serveCenter/cloudServeRule/CloudServeRuleDetail";
import CloudServeRuleEdit from "../../../serveCenter/cloudServeRule/CloudServeRuleEdit";
import CloudServeExList from "../../../serveCenter/cloudServeEx/CloudServeExList";
import CloudServeExDetail from "../../../serveCenter/cloudServeEx/CloudServeExDetail";
import CloudServeClaList from "../../../serveCenter/cloudServeCla/CloudServeClaList";
import CloudServeClaDetail from "../../../serveCenter/cloudServeCla/CloudServeClaDetail";
import CloudServeDevelopersList from "../../../serveCenter/cloudServeDevelopers/CloudServeDevelopersList";
import CloudServeStatistics from "../../../serveCenter/cloudServeStatistics/CloudServeStatistics";
import CloudServeClaEdit from "../../../serveCenter/cloudServeCla/CloudServeClaEdit";

const ServeCenterRoute = (url, DevTipsPage) => {
    return [
        <Route key={'0'} path={url + '/CloudServeList'}
               component={CloudServeList}/>,
        <Route key={'1'} path={url + '/CloudServeDetail'}
               component={CloudServeDetail}/>,
        <Route key={'11'} path={url + '/CloudServeEdit'}
               component={CloudServeEdit}/>,
        <Route key={'2'} path={url + '/CloudServeRuleList'}
               component={CloudServeRuleList}/>,
        <Route key={'3'} path={url + '/CloudServeRuleDetail'}
               component={CloudServeRuleDetail}/>,
        <Route key={'3'} path={url + '/CloudServeRuleEdit'}
               component={CloudServeRuleEdit}/>,
        <Route key={'4'} path={url + '/CloudServeExList'}
               component={CloudServeExList}/>,
        <Route key={'5'} path={url + '/CloudServeExDetail'}
               component={CloudServeExDetail}/>,
        <Route key={'6'} path={url + '/CloudServeClaList'}
               component={CloudServeClaList}/>,
        <Route key={'7'} path={url + '/CloudServeClaDetail'}
               component={CloudServeClaDetail}/>,
        <Route key={'8'} path={url + '/CloudServeDevelopersList'}
               component={CloudServeDevelopersList}/>,
        <Route key={'9'} path={url + '/CloudServeStatistics'}
               component={CloudServeStatistics}/>,
        <Route key={'10'} path={url + '/CloudServeClaEdit'}
               component={CloudServeClaEdit}/>,
    ]
};
export default ServeCenterRoute;