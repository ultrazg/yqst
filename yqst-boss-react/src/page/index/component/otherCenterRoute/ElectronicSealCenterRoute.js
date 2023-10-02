/*
* Created by yb
* 电子签章服务中心的路由部分
* */

import React from 'react';
import {Route} from 'react-router-dom';

import ESApplyForList from '../../../electronicSealMenuData/esApplyFor/applyForList/ESApplyForList';
import ESApplyForDetail from '../../../electronicSealMenuData/esApplyFor/applyForList/ESApplyForDetail';
import ESClientList from '../../../electronicSealMenuData/esClientManage/clientManage/ESClientList';
import ESContractManageDetail from '../../../electronicSealMenuData/esClientManage/clientManage/ESContractManageDetail';
import ESDataTemplate from "../../../electronicSealMenuData/dataManage/esDataTemplate/ESDataTemplate";
import ESPlatformData from "../../../electronicSealMenuData/dataManage/esPlatformData/ESPlatformData";
import ESPlatformServiceData from "../../../electronicSealMenuData/dataManage/esPlatformData/ESPlatformServiceData";
import ESPlatformSealDetail from "../../../electronicSealMenuData/dataManage/esPlatformData/ESPlatformSealDetail";
import ESPaymentData from "../../../electronicSealMenuData/dataManage/esPayData/ESPaymentData";
import ESPayDetail from "../../../electronicSealMenuData/dataManage/esPayData/ESPayDetail";
import ESServeList from "../../../electronicSealMenuData/serveManage/esServeList/ESServeList";
import ESServeDetail from "../../../electronicSealMenuData/serveManage/esServeList/ESServeDetail";
import ESServiceRulesList from "../../../electronicSealMenuData/serveManage/esServiceRulesList/ESServiceRulesList";
import ESAddServiceRule from "../../../electronicSealMenuData/serveManage/esServiceRulesList/ESAddServiceRule";
import ESEditServiceRule from "../../../electronicSealMenuData/serveManage/esServiceRulesList/ESEditServiceRule";
import ESServiceRuleDetail from "../../../electronicSealMenuData/serveManage/esServiceRulesList/ESServiceRuleDetail";
import ESServiceInstanceList from "../../../electronicSealMenuData/serveManage/esServiceInstanceList/ESServiceInstanceList";
import ESServiceInstanceDetail from "../../../electronicSealMenuData/serveManage/esServiceInstanceList/ESServiceInstanceDetail";
import ESPlatformCertificationDetail from "../../../electronicSealMenuData/dataManage/esPlatformData/ESPlatformCertificationDetail";

const ElectronicSealCenterRoute = (url, DevTipsPage) => {
    return [
        <Route key={'0'} path={url + '/ESClientList'}
               component={ESClientList}/>,
        <Route key={'1'} path={url + '/ESContractManageDetail'}
               component={ESContractManageDetail}/>,
        <Route key={'2'} path={url + '/ESDataTemplate'}
               component={ESDataTemplate}/>,
        <Route key={'3'} path={url + '/ESPlatformData'}
               component={ESPlatformData}/>,
        <Route key={'4'} path={url + '/ESApplyForList'}
               component={ESApplyForList}/>,
        <Route key={'5'} path={url + '/ESApplyForDetail'}
               component={ESApplyForDetail}/>,
        <Route key={'6'} path={url + '/ESServeList'}
               component={ESServeList}/>,
        <Route key={'7'} path={url + '/ESServeDetail'}
               component={ESServeDetail}/>,
        <Route key={'8'} path={url + '/ESPlatformServiceData'}
               component={ESPlatformServiceData}/>,
        <Route key={'9'} path={url + '/ESPlatformSealDetail'}
               component={ESPlatformSealDetail}/>,
        <Route key={'10'} path={url + '/ESPaymentData'}
               component={ESPaymentData}/>,
        <Route key={'11'} path={url + '/ESPayDetail'}
               component={ESPayDetail}/>,
        <Route key={'12'} path={url + '/esServiceRulesList'}
               component={ESServiceRulesList}/>,
        <Route key={'13'} path={url + '/ESAddServiceRule'}
               component={ESAddServiceRule}/>,
        <Route key={'14'} path={url + '/ESServiceRuleDetail'}
               component={ESServiceRuleDetail}/>,
        <Route key={'15'} path={url + '/ESServiceInstanceList'}
               component={ESServiceInstanceList}/>,
        <Route key={'16'} path={url + '/ESServiceInstanceDetail'}
               component={ESServiceInstanceDetail}/>,
        <Route key={'17'} path={url + '/ESEditServiceRule'}
               component={ESEditServiceRule}/>,
        <Route key={'18'} path={url + '/ESPlatformCertificationDetail'}
               component={ESPlatformCertificationDetail}/>,
    ]
};

export default ElectronicSealCenterRoute;