/*
* Created by yb on 2019/09/25
* 合同中心的路由部分
* */

import React from 'react';
import {Route} from 'react-router-dom';

import ContractManageList from '../../../contractCenter/contractAndAgreement/contractManage/ContractManageList';
import ContractManageDetail from "../../../contractCenter/contractAndAgreement/contractManage/ContractManageDetail";
import AgreementManageList from "../../../contractCenter/contractAndAgreement/agreementManage/AgreementManageList";
import AgreementManageDetail from "../../../contractCenter/contractAndAgreement/agreementManage/AgreementManageDetail";
import ContractTemplateList from "../../../contractCenter/templateManage/contractTemplate/ContractTemplateList";
import ContractTemplateDetail from "../../../contractCenter/templateManage/contractTemplate/ContractTemplateDetail";
import AgreementTemplateList from "../../../contractCenter/templateManage/agreementTemplate/AgreementTemplateList";
import AgreementTemplateDetail from "../../../contractCenter/templateManage/agreementTemplate/AgreementTemplateDetail";
import ESignatureList from "../../../contractCenter/thirdPartyService/eSignature/ESignatureList";
import ContractStatistics from "../../../contractCenter/statistics/ContractStatistics";

const ContractCenterRoute = (url, DevTipsPage) => {
    return [
        <Route key={'0'} path={url + '/ContractManageList'}
               component={ContractManageList}/>,
        <Route key={'1'} path={url + '/ContractManageDetail'}
               component={ContractManageDetail}/>,
        <Route key={'2'} path={url + '/AgreementManageList'}
               component={AgreementManageList}/>,
        <Route key={'3'} path={url + '/AgreementManageDetail'}
               component={AgreementManageDetail}/>,
        <Route key={'4'} path={url + '/ContractTemplateList'}
               // component={ContractTemplateList}
               component={DevTipsPage}
        />,
        <Route key={'5'} path={url + '/ContractTemplateDetail'}
               component={ContractTemplateDetail}/>,
        <Route key={'6'} path={url + '/AgreementTemplateList'}
               // component={AgreementTemplateList}
               component={DevTipsPage}
        />,
        <Route key={'7'} path={url + '/AgreementTemplateDetail'}
               component={AgreementTemplateDetail}/>,
        <Route key={'8'} path={url + '/ESignatureList'}
               // component={ESignatureList}
               component={DevTipsPage}
        />,
        <Route key={'9'} path={url + '/ContractStatistics'}
               component={ContractStatistics}/>
    ]
};
export default ContractCenterRoute;