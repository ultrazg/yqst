import {Redirect, Route, Switch} from 'react-router-dom'
import React from 'react'

import SaGeneralPage from './SaGeneral/SaGeneralPage'
import SaContractList from './SaContract/SaContractList'
import SaContractEdit from './SaContract/SaContractEdit'
import SaContractDetail from './SaContract/SaContractDetail'
import SaTemplateType from './SaContract/SaTemplateType'
import saComList from './SaCommodity/saComList'
import saComDetail from './SaCommodity/saComDetail'
import saComLabList from './SaComLabel/SaComLabList'

export default function () {
    return (
        (
            <Switch>
                <Route path="/pages/appCenter/sellAssistant/terminalPage/saGeneral/saGeneralPage" component={SaGeneralPage}/>
                <Route path="/pages/appCenter/sellAssistant/terminalPage/saConTemplate/saContractList" component={SaContractList}/>
                <Route path="/pages/appCenter/sellAssistant/terminalPage/saConTemplate/saContractEdit" component={SaContractEdit}/>
                <Route path="/pages/appCenter/sellAssistant/terminalPage/saConTemplate/SaContractDetail" component={SaContractDetail}/>
                <Route path="/pages/appCenter/sellAssistant/terminalPage/saConTemType/saTemplateType" component={SaTemplateType}/>
                <Route path="/pages/appCenter/sellAssistant/terminalPage/saCommodity/saComList" component={saComList}/>
                <Route path="/pages/appCenter/sellAssistant/terminalPage/saCommodity/saComDetail" component={saComDetail}/>
                <Route path="/pages/appCenter/sellAssistant/terminalPage/saComLabel/saComLabList" component={saComLabList}/>
                <Redirect from='/pages/appCenter/sellAssistant/terminalPage/saGeneral' to='/pages/appCenter/sellAssistant/terminalPage/saGeneral/saGeneralPage'/>
            </Switch>
        )
    )
}
