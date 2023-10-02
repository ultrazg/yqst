import {Redirect, Route, Switch} from 'react-router-dom'
import React from 'react'

import CompanyBasInf from '../../MyCompany/ChildPages/ChildPages/CompanyBasInf'
import CompanyBasInfEdit from '../../MyCompany/ChildPages/ChildPages/CompanyBasInfEdit'
import CompanyAutInf from '../../MyCompany/ChildPages/ChildPages/CompanyAutInf'
import CompanyBusInf from '../../MyCompany/ChildPages/ChildPages/CompanyBusInf'
import AddressBaseEdit from '../../MyCompany/ChildPages/ChildPages/AddressBaseEdit'
import AddressTypeList from '../../MyCompany/ChildPages/ChildPages/AddressTypeList'
import RiseEdit from '../../MyCompany/ChildPages/ChildPages/RiseEdit'
import CompanySetUp from '../../MyCompany/ChildPages/ChildPages/CompanySetUp'
import CompanyTraCre from '../../MyCompany/ChildPages/ChildPages/CompanyTraCre'
import CompanyBusInfEdit from "../../MyCompany/ChildPages/ChildPages/CompanyBusInfEdit";
import BankDepositEdit from "../../MyCompany/ChildPages/ChildPages/BankDepositEdit";
import CompanyDissolve from "../../MyCompany/ChildPages/ChildPages/CompanyDissolve";
import CompanyPushOut from "../../MyCompany/ChildPages/ChildPages/CompanyPushOut";

export default function () {
    return (
        <Switch>
            <Route path="/pages/myCompany/subjectSetUp/companyBasInf/index" component={CompanyBasInf}/>
            <Route path="/pages/myCompany/subjectSetUp/companyBasInf/companyBasInfEdit" component={CompanyBasInfEdit}/>
            <Route path="/pages/myCompany/subjectSetUp/companyAutInf" component={CompanyAutInf}/>
            <Route path="/pages/myCompany/subjectSetUp/companyBusInf/index" component={CompanyBusInf}/>
            <Route path="/pages/myCompany/subjectSetUp/companyBusInf/companyBusInfEdit" component={CompanyBusInfEdit}/>
            <Route path="/pages/myCompany/subjectSetUp/companyBusInf/addressBaseEdit" component={AddressBaseEdit}/>
            <Route path="/pages/myCompany/subjectSetUp/companyBusInf/AddressTypeList" component={AddressTypeList}/>
            <Route path="/pages/myCompany/subjectSetUp/companyBusInf/bankDepositEdit" component={BankDepositEdit}/>
            <Route path="/pages/myCompany/subjectSetUp/companyBusInf/riseEdit" component={RiseEdit}/>
            <Route path="/pages/myCompany/subjectSetUp/companySetUp" component={CompanySetUp}/>
            <Route path="/pages/myCompany/subjectSetUp/companyTraCre" component={CompanyTraCre}/>
            <Route path="/pages/myCompany/subjectSetUp/companyDissolve" component={CompanyDissolve}/>
            <Route path="/pages/myCompany/subjectSetUp/companyPushOut" component={CompanyPushOut}/>
            <Redirect from='/pages/myCompany/subjectSetUp' to='/pages/myCompany/subjectSetUp/companyBasInf/index'/>
        </Switch>
    )
}
