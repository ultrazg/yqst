import {Redirect, Route, Switch} from 'react-router-dom'
import React from 'react'

import SaProductList from './SaProductList/SaProductList'
import SaProductDetail from './SaProductList/SaProductDetail'
import SaOrdTypeList from './SaOrdTypeList/SaOrdTypeList'

export default function () {
    return (
        (
            <Switch>
                <Route path="/pages/appCenter/sellAssistant/saProductHome/saProModule/saProductList" component={SaProductList}/>
                <Route path="/pages/appCenter/sellAssistant/saProductHome/saProModule/saProductDetail" component={SaProductDetail}/>
                <Route path="/pages/appCenter/sellAssistant/saProductHome/saOrdType/saOrdTypeList" component={SaOrdTypeList}/>
                <Redirect from='/pages/appCenter/sellAssistant/saProductHome/saProModule' to='/pages/appCenter/sellAssistant/saProductHome/saProModule/saProductList'/>
            </Switch>
        )
    )
}
