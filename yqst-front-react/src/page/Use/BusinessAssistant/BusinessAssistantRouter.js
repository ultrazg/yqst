import {Redirect, Route, Switch} from 'react-router-dom'
import React from 'react'
import BAPersonalBusinessList from "./BAPersonalBusinessManage/BAPersonalBusiness/BAPersonalBusinessList";

export default function () {
    return (
        <Switch>
            <Route path="/pages/appCenter/businessAssistant/baPersonalBusiness/baPersonalBusinessList" component={BAPersonalBusinessList}/>
            <Redirect from='/pages/appCenter/businessAssistant' to='/pages/appCenter/businessAssistant/baPersonalBusiness/baPersonalBusinessList'/>
        </Switch>
    )
}
