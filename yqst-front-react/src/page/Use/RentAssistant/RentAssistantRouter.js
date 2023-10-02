import {Redirect, Route, Switch} from 'react-router-dom'
import React from 'react'
import RentAssistantSituation from "./RentAssistantSituation/RentAssistantSituation";
import RentalWarehouse from "./RentAssistantPrice/RentalWarehouse";
import RentalPricePolicyAdd from "./RentAssistantPrice/RentalPricePolicyAdd";
import RentalPricePolicyList from "./RentAssistantPrice/RentalPricePolicyList";
import RentPricePolicyDetail from "./RentAssistantPrice/RentPricePolicyDetail";

export default function () {
    return (
        <Switch>
            <Route path="/pages/appCenter/rentAssistant/rentAssistantHome/rentAssistantSituation" component={RentAssistantSituation}/>
            <Route path="/pages/appCenter/rentAssistant/rentAssistantHome/rentalWarehouse" component={RentalWarehouse}/>
            <Route path="/pages/appCenter/rentAssistant/rentAssistantHome/rentalPricePolicyAdd/:pricePolicySn" component={RentalPricePolicyAdd}/>
            <Route exact path="/pages/appCenter/rentAssistant/rentAssistantHome/rentalPricePolicyList" component={RentalPricePolicyList}/>
            <Route exact path="/pages/appCenter/rentAssistant/rentAssistantHome/rentalPricePolicyList/rentPricePolicyDetail/:pricePolicySn" component={RentPricePolicyDetail}/>
            <Redirect to="/pages/appCenter/rentAssistant/rentAssistantHome/rentAssistantSituation"/>
        </Switch>
    )
}
