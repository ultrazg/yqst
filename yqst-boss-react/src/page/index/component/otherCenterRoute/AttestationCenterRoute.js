/*
* 商品中心的路由部分
* */

import React from 'react';
import {Route} from 'react-router-dom';

import AttUserGroupList from '../../../attestationCenter/attUserGroup/AttUserGroupList';
import AttUserGroupDetail from "../../../attestationCenter/attUserGroup/AttUserGroupDetail";
import AttAptitudeList from "../../../attestationCenter/attAptitude/AttAptitudeList";
import AttAptitudeDetail from "../../../attestationCenter/attAptitude/AttAptitudeDetail";
import AttAptitudeEditor from "../../../attestationCenter/attAptitude/AttAptitudeEditor";
import AttAptitudeGroupList from "../../../attestationCenter/attAptitudeGroup/AttAptitudeGroupList";
import AttAptitudeGroupDetail from "../../../attestationCenter/attAptitudeGroup/AttAptitudeGroupDetail";
import AttAptitudeGroupEditor from "../../../attestationCenter/attAptitudeGroup/AttAptitudeGroupEditor";
import AttGroupList from "../../../attestationCenter/attGroup/AttGroupList";
import AttGroupDetail from "../../../attestationCenter/attGroup/AttGroupDetail";
import AttGroupEditor from "../../../attestationCenter/attGroup/AttGroupEditor";
import AttRuleList from "../../../attestationCenter/attRule/AttRuleList";
import AttRuleDetail from "../../../attestationCenter/attRule/AttRuleDetail";
import AttDataStatistics from "../../../attestationCenter/attDataStatistics/AttDataStatistics";
import AttRuleEditor from "../../../attestationCenter/attRule/AttRuleEditor";

const AttestationCenterRoute = (url, DevTipsPage) => {
    return [
        <Route key={'0'} path={url + '/AttUserGroupList'}
               component={AttUserGroupList}/>,
        <Route key={'1'} path={url + '/AttUserGroupDetail'}
               component={AttUserGroupDetail}/>,
        <Route key={'2'} path={url + '/AttAptitudeList'}
               component={AttAptitudeList}/>,
        <Route key={'3'} path={url + '/AttAptitudeDetail'}
               component={AttAptitudeDetail}/>,
        <Route key={'4'} path={url + '/AttAptitudeEditor'}
               component={AttAptitudeEditor}/>,
        <Route key={'5'} path={url + '/AttAptitudeGroupList'}
               component={AttAptitudeGroupList}/>,
        <Route key={'6'} path={url + '/AttAptitudeGroupDetail'}
               component={AttAptitudeGroupDetail}/>,
        <Route key={'7'} path={url + '/AttAptitudeGroupEditor'}
               component={AttAptitudeGroupEditor}/>,
        <Route key={'8'} path={url + '/AttGroupList'}
               component={AttGroupList}/>,
        <Route key={'9'} path={url + '/AttGroupDetail'}
               component={AttGroupDetail}/>,
        <Route key={'10'} path={url + '/AttGroupEditor'}
               component={AttGroupEditor}/>,
        <Route key={'11'} path={url + '/AttRuleList'}
               component={AttRuleList}/>,
        <Route key={'12'} path={url + '/AttRuleDetail'}
               component={AttRuleDetail}/>,
        <Route key={'14'} path={url + '/AttDataStatistics'}
               component={AttDataStatistics}/>,
        <Route key={'15'} path={url + '/AttRuleEditor'}
               component={AttRuleEditor}/>,
    ]
};
export default AttestationCenterRoute;