import {Redirect, Route, Switch} from 'react-router-dom'
import React from 'react'

import CompanyProductList from './CompanyProduct/CompanyProductList'
import CompanyProductDetail from './CompanyProduct/CompanyProductDetail'
import CompanyClassList from './CompanyClass/CompanyClassList'
import ApplyForList from "./ApplyFor/ApplyForList";
import ApplyForEdit from "./ApplyFor/ApplyForEdit";
import ApplyForDetail from "./ApplyFor/ApplyForDetail";
import CorrelationList from "./Correlation/CorrelationList";
import CompanyClassEdit from "./CompanyClass/CompanyClassEdit";

export default function () {
    return (
        (
            <Switch>
                <Route path="/pages/appCenter/companyProductLib/companyProductLibHome/companyProduct/companyProductList" component={CompanyProductList}/>
                <Route path="/pages/appCenter/companyProductLib/companyProductLibHome/companyProduct/CompanyProductDetail" component={CompanyProductDetail}/>
                <Route path="/pages/appCenter/companyProductLib/companyProductLibHome/companyClass/companyClassList" component={CompanyClassList}/>
                <Route path="/pages/appCenter/companyProductLib/companyProductLibHome/companyClass/companyClassEdit" component={CompanyClassEdit}/>
                <Route path="/pages/appCenter/companyProductLib/companyProductLibHome/applyFor/applyForList" component={ApplyForList}/>
                <Route path="/pages/appCenter/companyProductLib/companyProductLibHome/applyFor/applyForEdit" component={ApplyForEdit}/>
                <Route path="/pages/appCenter/companyProductLib/companyProductLibHome/applyFor/ApplyForDetail" component={ApplyForDetail}/>
                <Route path="/pages/appCenter/companyProductLib/companyProductLibHome/correlation/correlationList" component={CorrelationList}/>
                <Redirect from='/pages/appCenter/companyProductLib/companyProductLibHome' to='/pages/appCenter/companyProductLib/companyProductLibHome/companyProduct/companyProductList'/>
            </Switch>
        )
    )
}
