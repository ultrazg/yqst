import {Redirect, Route, Switch} from 'react-router-dom'
import React from 'react'
import BTBAccountViewPage from "./BTBAccountManage/BTBAccountView/BTBAccountViewPage";
import BTBTransactionOrderList from "./BTBTransactionManage/BTBTransactionOrder/BTBTransactionOrderList";
import BTBTransactionOrderDetail from "./BTBTransactionManage/BTBTransactionOrder/BTBTransactionOrderDetail";
import BTBCostBreakdownList from "./BTBChannelCost/BTBCostBreakdown/BTBCostBreakdownList";
import BTBCostBreakdownDetail from "./BTBChannelCost/BTBCostBreakdown/BTBCostBreakdownDetail";
import BTBPersonGuidePage from "./BTBRegister/BTBPersonRegister/BTBPersonGuidePage";
import BTBPersonRegister from "./BTBRegister/BTBPersonRegister/BTBPersonRegister";
import BTBPersonRegisterResult from "./BTBRegister/BTBPersonRegister/BTBPersonRegisterResult";
import BTBEnterprisePage from "./BTBRegister/BTBEnterpriseRegister/BTBEnterprisePage";
import BTBEnterpriseRegister from "./BTBRegister/BTBEnterpriseRegister/BTBEnterpriseRegister";
import BTBEnterpriseRegisterResult from "./BTBRegister/BTBEnterpriseRegister/BTBEnterpriseRegisterResult";

export default function () {
    return (
        <Switch>
            <Route path="/pages/appCenter/btbEnterpriseWallet/btbAccountView/btbAccountViewPage" component={BTBAccountViewPage}/>
            <Route path="/pages/appCenter/btbEnterpriseWallet/btbTransactionOrder/btbTransactionOrderList" component={BTBTransactionOrderList}/>
            <Route path="/pages/appCenter/btbEnterpriseWallet/btbTransactionOrder/btbTransactionOrderDetail" component={BTBTransactionOrderDetail}/>
            <Route path="/pages/appCenter/btbEnterpriseWallet/btbCostBreakdown/btbCostBreakdownList" component={BTBCostBreakdownList}/>
            <Route path="/pages/appCenter/btbEnterpriseWallet/btbCostBreakdown/btbCostBreakdownDetail" component={BTBCostBreakdownDetail}/>
            <Route path="/pages/appCenter/btbEnterpriseWallet/btbRegister/btbPersonGuidePage" component={BTBPersonGuidePage}/>
            <Route path="/pages/appCenter/btbEnterpriseWallet/btbRegister/btbPersonRegister" component={BTBPersonRegister}/>
            <Route path="/pages/appCenter/btbEnterpriseWallet/btbRegister/btbPersonRegisterResult" component={BTBPersonRegisterResult}/>
            <Route path="/pages/appCenter/btbEnterpriseWallet/btbRegister/btbEnterprisePage" component={BTBEnterprisePage}/>
            <Route path="/pages/appCenter/btbEnterpriseWallet/btbRegister/btbEnterpriseRegister" component={BTBEnterpriseRegister}/>
            <Route path="/pages/appCenter/btbEnterpriseWallet/btbRegister/btbEnterpriseRegisterResult" component={BTBEnterpriseRegisterResult}/>
            <Redirect from='/pages/appCenter/btbEnterpriseWallet' to='/pages/appCenter/btbEnterpriseWallet/btbAccountView/btbAccountViewPage'/>
        </Switch>
    )
}
