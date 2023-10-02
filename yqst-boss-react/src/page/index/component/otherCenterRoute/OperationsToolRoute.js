import React from 'react';
import {Route} from 'react-router-dom';

import AgentRegisterList from "../../../operationsTools/register/AgentRegisterList";
import AgentRegisterCreate from "../../../operationsTools/register/AgentRegisterCreate";
import AgentRegisterDetail from "../../../operationsTools/register/AgentRegisterDetail";
import AgentRegisterErpList from "../../../operationsTools/register/AgentRegisterErpList";

const OperationsToolRoute = (url, DevTipsPage) => {
    return [
        <Route key={'0'} path={url + '/AgentRegisterList'}
               component={AgentRegisterList}/>,
        <Route key={'1'} path={url + '/AgentRegisterCreate'}
               component={AgentRegisterCreate}/>,
        <Route key={'2'} path={url + '/AgentRegisterDetail'}
               component={AgentRegisterDetail}/>,
        <Route key={'3'} path={url + '/AgentRegisterErpList'}
               component={AgentRegisterErpList}/>,
    ]
}
export default OperationsToolRoute;
