/*
* Created by yb
* 商机助手
* */

import React from 'react';
import {Route} from 'react-router-dom';

import OpportunityAssistantUserList from '../../../opportunityAssistant/OpportunityAssistantUserList';
import BusinessOpportunityList from '../../../opportunityAssistant/BusinessOpportunityList';

const BusinessAssistantRoute = (url, DevTipsPage) => {
    return [
        <Route key={'0'} path={url + '/OpportunityAssistantUserList'}
               component={OpportunityAssistantUserList}/>,
        <Route key={'1'} path={url + '/BusinessOpportunityList'}
               component={BusinessOpportunityList}/>,
    ]
};

export default BusinessAssistantRoute;