import {Redirect, Route, Switch} from 'react-router-dom'
import React from 'react'

import SAIndex from "./SAIndex";
import TerminalPage from "./TerminalPage/TerminalPage";
import SaProductHome from "./SaProduct/SaProductHome";

export default function () {
    return (
        (
            <Switch>
                <Route path="/pages/appCenter/sellAssistant/saIndex" component={SAIndex}/>
                {/*进入店铺页面*/}
                <Route path="/pages/appCenter/sellAssistant/terminalPage" component={TerminalPage}/>
                {/*产品首页*/}
                <Route path="/pages/appCenter/sellAssistant/saProductHome" component={SaProductHome}/>
                <Redirect from='/pages/appCenter/sellAssistant' to='/pages/appCenter/sellAssistant/SAIndex'/>
            </Switch>
        )
    )
}
