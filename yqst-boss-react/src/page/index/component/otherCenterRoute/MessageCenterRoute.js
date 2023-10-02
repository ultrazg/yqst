/*
* 消息中心的路由部分
* */
import React from 'react';
import {Route} from 'react-router-dom';

import MessageStatistics from '../../../messageCenter/statisticsMod/MessageStatistics';
import MessageManagementList from '../../../messageCenter/messageManagementMod/MessageManagementList';
import MessageManagementDetail from "../../../messageCenter/messageManagementMod/MessageManagementDetail";
import MessageTemplateList from "../../../messageCenter/messageTemplateMod/MessageTemplateList";
import MessageTemplateDetail from "../../../messageCenter/messageTemplateMod/MessageTemplateDetail";
import MessageTemplateEditor from "../../../messageCenter/messageTemplateMod/MessageTemplateEditor";
// import DistributionRuleList from "../../../messageCenter/distributionRuleMod/DistributionRuleList";
import DistributionRuleEditor from "../../../messageCenter/distributionRuleMod/DistributionRuleEditor";
import DistributionRuleDetail from "../../../messageCenter/distributionRuleMod/DistributionRuleDetail";
import RuleAmendantRecord from "../../../messageCenter/distributionRuleMod/RuleAmendantRecord";

const MessageCenterRoute = (url, DevTipsPage) => {
    return [
        <Route key={'0'} path={url + '/MessageStatistics'}
               component={MessageStatistics}/>,
        <Route key={'1'} path={url + '/MessageManagementList'}
               component={MessageManagementList}/>,
        <Route key={'2'} path={url + '/MessageManagementDetail'}
               component={MessageManagementDetail}/>,
        <Route key={'3'} path={url + '/MessageTemplateList'}
               component={MessageTemplateList}/>,
        <Route key={'4'} path={url + '/MessageTemplateDetail'}
               component={MessageTemplateDetail}/>,
        <Route key={'5'} path={url + '/MessageTemplateEditor'}
               component={MessageTemplateEditor}/>,
        // <Route key={'6'} path={url + '/DistributionRuleList'}
        //        component={DistributionRuleList}/>,
        <Route key={'7'} path={url + '/DistributionRuleEditor'}
               component={DistributionRuleEditor}/>,
        <Route key={'8'} path={url + '/DistributionRuleDetail'}
               component={DistributionRuleDetail}/>,
        <Route key={'9'} path={url + '/RuleAmendantRecord'}
               component={RuleAmendantRecord}/>
    ]
};
export default MessageCenterRoute;
