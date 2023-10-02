import {Redirect, Route, Switch} from 'react-router-dom'
import React from 'react'

import SaProductList from './SaProductList/SaProductList'
import SaProductDetail from './SaProductList/SaProductDetail'
import SaOrdTypeList from './SaOrdTypeList/SaOrdTypeList'

export default function () {
    return (
        (
            <Switch>
                <Route path="/pages/appCenter/productLib/SaProductHome/SaProModule/SaProductList" component={SaProductList}/>
                <Route path="/pages/appCenter/productLib/SaProductHome/SaProModule/SaProductDetail" component={SaProductDetail}/>
                <Route path="/pages/appCenter/productLib/SaProductHome/SaOrdType/SaOrdTypeList" component={SaOrdTypeList}/>
                <Redirect from='/pages/appCenter/productLib/SaProductHome' to='/pages/appCenter/productLib/SaProductHome/SaProModule/SaProductList'/>
            </Switch>
        )
    )
}
