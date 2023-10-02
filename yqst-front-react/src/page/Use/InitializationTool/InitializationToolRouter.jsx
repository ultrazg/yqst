import {Redirect, Route, Switch} from 'react-router-dom'
import React from 'react'

import MaterialRecList from "./List/MaterialRecList";
import LessorInitCreate from "./Lessor/Create/LessorInitCreate";
import LesseeInitCreate from "./Lessee/Create/LesseeInitCreate";
import LessorInitDetail from "./Lessor/Detail/LessorInitDetail";
import LessorRecDetail from "./Lessor/Detail/LessorRecDetail";
import LesseeInitDetail from "./Lessee/Detail/LesseeInitDetail";
import LesseeRecDetail from "./Lessee/Detail/LesseeRecDetail";

export default function () {
    return (
        (
            <Switch>
                <Route path="/pages/appCenter/InitializationTool/MaterialRecListModule/List"
                       component={MaterialRecList}/>
                <Route path="/pages/appCenter/InitializationTool/MaterialRecListModule/LessorInitCreate"
                       component={LessorInitCreate}/>
                <Route path="/pages/appCenter/InitializationTool/MaterialRecListModule/LesseeInitCreate"
                       component={LesseeInitCreate}/>
                <Route path="/pages/appCenter/InitializationTool/MaterialRecListModule/LessorInitDetail"
                       component={LessorInitDetail}/>
                <Route path="/pages/appCenter/InitializationTool/MaterialRecListModule/LessorRecDetail"
                       component={LessorRecDetail}/>
                <Route path="/pages/appCenter/InitializationTool/MaterialRecListModule/LesseeInitDetail"
                       component={LesseeInitDetail}/>
                <Route path="/pages/appCenter/InitializationTool/MaterialRecListModule/LesseeRecDetail"
                       component={LesseeRecDetail}/>
                <Redirect from="/pages/appCenter/InitializationTool"
                          to="/pages/appCenter/InitializationTool/MaterialRecListModule/List"/>
            </Switch>
        )
    )
}
