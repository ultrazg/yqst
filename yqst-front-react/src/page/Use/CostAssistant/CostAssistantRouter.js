import {Redirect, Route, Switch} from 'react-router-dom'
import React from 'react'

import CosAssGeneralSituationPage from './GeneralSituation/CosAssGeneralSituationPage'
import BusinessAdjustIndex from "./BusinessAdjust/BusinessAdjustIndex";
import FinalStatementPayeeIndex from "./FinalStatement/Payee/FinalStatementPayeeIndex";
import FinalStatementPayerIndex from "./FinalStatement/Payer/FinalStatementPayerIndex";
import FinalStatementPayeeDetail from "./FinalStatement/Payee/Detail/FinalStatementPayeeDetail";
import FinalStatementPayerDetail from "./FinalStatement/Payer/Detail/FinalStatementPayerDetail";
import FinalStatementCreate from "./FinalStatement/Create/FinalStatementCreate";
import FinalStatementLesseeCreate from "./FinalStatement/Create/FinalStatementLesseeCreate";
import CostAsstInitiateOriginalIndex from "./FinalStatement/Components/CostAsstInitiateOriginalIndex";
import ExpressFeeList from "./HandMadeOrder/Express/List/ExpressFeeList";
import GuaranteeFeeList from "./HandMadeOrder/Guarantee/List/GuaranteeFeeList";
import ExpressFeeCreate from "./HandMadeOrder/Express/Create/ExpressFeeCreate";
import GuaranteeFeeCreate from "./HandMadeOrder/Guarantee/Create/GuaranteeFeeCreate";
import ExpressFeeDetail from "./HandMadeOrder/Express/Detail/ExpressFeeDetail";
import GuaranteeFeeDetail from "./HandMadeOrder/Guarantee/Detail/GuaranteeFeeDetail";
import ServiceFeeCreate from './HandMadeOrder/Service/Create/ServiceFeeCreate';
import ServiceFeeDetail from './HandMadeOrder/Service/Detail/ServiceFeeDetail';
import ServiceFeeList from './HandMadeOrder/Service/List/ServiceFeeList';
import AddFeesIndex from "./AddFees/AddFeesIndex";
import AddFeesExpressCreate from "./AddFees/Create/AddFeesExpressCreate";
import AddFeesExpressDetail from "./AddFees/Detail/AddFeesExpressDetail";
import AddFeesCompensationDetail from "./AddFees/Detail/AddFeesCompensationDetail";
import AddFeesMaintenanceDetail from "./AddFees/Detail/AddFeesMaintenanceDetail";
import AddFeesMaintenanceCreate from "./AddFees/Create/AddFeesMaintenanceCreate";
import AddFeesCompensationCreate from "./AddFees/Create/AddFeesCompensationCreate";
import CostFeeIndex from "./FinalStatement/Components/CostFeeIndex";
import CostAsstInitiateIndex from "./FinalStatement/Components/CostAsstInitiateIndex";

export default function () {
    return (
        (
            <Switch>
                <Route
                    path="/pages/appCenter/costAssistant/costAssistantHome/cosAssGeneralSituation/cosAssGeneralSituationPage"
                    component={CosAssGeneralSituationPage}/>
                <Route path="/pages/appCenter/costAssistant/costAssistantHome/BusinessAdjust/BusinessAdjustIndex"
                       component={BusinessAdjustIndex}/>
                <Route path="/pages/appCenter/costAssistant/costAssistantHome/FinalStatementPayee/List"
                       component={FinalStatementPayeeIndex}/>
                <Route path="/pages/appCenter/costAssistant/costAssistantHome/FinalStatementPayer/List"
                       component={FinalStatementPayerIndex}/>
                {/*<Route path="/pages/appCenter/costAssistant/costAssistantHome/FinalStatement/List"*/}
                {/*       component={FinalStatementIndex}/>*/}
                <Route
                    path="/pages/appCenter/costAssistant/costAssistantHome/FinalStatementPayee/FinalStatementPayeeDetail"
                    component={FinalStatementPayeeDetail}/>
                <Route
                    path="/pages/appCenter/costAssistant/costAssistantHome/FinalStatementPayer/FinalStatementPayerDetail"
                    component={FinalStatementPayerDetail}/>
                <Route path="/pages/appCenter/costAssistant/costAssistantHome/FinalStatementCreate"
                       component={FinalStatementCreate}/>
                <Route path="/pages/appCenter/costAssistant/costAssistantHome/FinalStatementLesseeCreate"
                       component={FinalStatementLesseeCreate}/>
                <Route path="/pages/appCenter/costAssistant/costAssistantHome/FinalStatement/CostFeeIndex"
                       component={CostFeeIndex}/>
                <Route path="/pages/appCenter/costAssistant/costAssistantHome/FinalStatement/CostAsstInitiateIndex"
                       component={CostAsstInitiateIndex}/>
                <Route
                    path="/pages/appCenter/costAssistant/costAssistantHome/FinalStatement/CostAsstInitiateOriginalIndex"
                    component={CostAsstInitiateOriginalIndex}/>

                <Route path="/pages/appCenter/costAssistant/costAssistantHome/ExpressFeeList"
                       component={ExpressFeeList}/>
                <Route path="/pages/appCenter/costAssistant/costAssistantHome/GuaranteeFeeList"
                       component={GuaranteeFeeList}/>
                <Route path="/pages/appCenter/costAssistant/costAssistantHome/ServiceFeeList"
                       component={ServiceFeeList}/>
                <Route path="/pages/appCenter/costAssistant/costAssistantHome/ExpressFeeCreate"
                       component={ExpressFeeCreate}/>
                <Route path="/pages/appCenter/costAssistant/costAssistantHome/GuaranteeFeeCreate"
                       component={GuaranteeFeeCreate}/>
                <Route path="/pages/appCenter/costAssistant/costAssistantHome/ServiceFeeCreate"
                       component={ServiceFeeCreate}/>
                <Route path="/pages/appCenter/costAssistant/costAssistantHome/ExpressFeeDetail"
                       component={ExpressFeeDetail}/>
                <Route path="/pages/appCenter/costAssistant/costAssistantHome/GuaranteeFeeDetail"
                       component={GuaranteeFeeDetail}/>
                <Route path="/pages/appCenter/costAssistant/costAssistantHome/ServiceFeeDetail"
                       component={ServiceFeeDetail}/>

                <Route path="/pages/appCenter/costAssistant/costAssistantHome/AddFees/AddFeesIndex"
                       component={AddFeesIndex}/>
                <Route path="/pages/appCenter/costAssistant/costAssistantHome/AddFees/AddFeesExpressCreate"
                       component={AddFeesExpressCreate}/>
                <Route path="/pages/appCenter/costAssistant/costAssistantHome/AddFees/AddFeesExpressDetail"
                       component={AddFeesExpressDetail}/>
                <Route path="/pages/appCenter/costAssistant/costAssistantHome/AddFees/AddFeesCompensationDetail"
                       component={AddFeesCompensationDetail}/>
                <Route path="/pages/appCenter/costAssistant/costAssistantHome/AddFees/AddFeesMaintenanceDetail"
                       component={AddFeesMaintenanceDetail}/>
                <Route path="/pages/appCenter/costAssistant/costAssistantHome/AddFees/AddFeesMaintenanceCreate"
                       component={AddFeesMaintenanceCreate}/>
                <Route path="/pages/appCenter/costAssistant/costAssistantHome/AddFees/AddFeesCompensationCreate"
                       component={AddFeesCompensationCreate}/>

                <Redirect from='/pages/appCenter/costAssistant/costAssistantHome'
                          to='/pages/appCenter/costAssistant/costAssistantHome/cosAssGeneralSituation/cosAssGeneralSituationPage'/>
            </Switch>
        )
    )
}
