import {Redirect, Route, Switch} from 'react-router-dom'
import React from 'react'

import CarrierAsstSituationPage from './CarrierAsstSituationPage'
import CarrierAsstExpressValuePolicyAdd from './CarrierAsstExpressValue/CarrierAsstExpressValuePolicyAdd'
import CarrierAsstExpressValuePolicyList from './CarrierAsstExpressValue/CarrierAsstExpressValuePolicyList'
import CarrierAsstExpressValuePolicyUpdate from './CarrierAsstExpressValue/CarrierAsstExpressValuePolicyUpdate'
import CarrierAsstExpressValuePolicyDetail from './CarrierAsstExpressValue/CarrierAsstExpressValuePolicyDetail'

export default function () {
    return (
        (
            <Switch>
                <Route path="/pages/appCenter/carrierAsst/carrierAsstHome/carrierAsstSituationPage" component={CarrierAsstSituationPage}/>
                <Route path="/pages/appCenter/carrierAsst/carrierAsstHome/carrierAsstExpressValuePolicyAdd" component={CarrierAsstExpressValuePolicyAdd}/>
                <Route path="/pages/appCenter/carrierAsst/carrierAsstHome/carrierAsstExpressValuePolicyList" component={CarrierAsstExpressValuePolicyList}/>
                <Route path="/pages/appCenter/carrierAsst/carrierAsstHome/carrierAsstExpressValuePolicyUpdate" component={CarrierAsstExpressValuePolicyUpdate}/>
                <Route path="/pages/appCenter/carrierAsst/carrierAsstHome/carrierAsstExpressValuePolicyDetail" component={CarrierAsstExpressValuePolicyDetail}/>
                <Redirect from='/pages/appCenter/carrierAsst/carrierAsstHome' to='/pages/appCenter/carrierAsst/carrierAsstHome/carrierAsstSituationPage'/>
            </Switch>
        )
    )
}
