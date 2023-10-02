import {Redirect, Route, Switch} from 'react-router-dom'
import React from 'react'

import Login from '../Login'
import SetUpCompany from '../SetUpCompany'

export default function () {
    return (
        <Switch>
            <Route path="/users/login" component={Login}/>
            <Route path="/users/setUpCompany" component={SetUpCompany}/>
            <Redirect from='/users' to='/users/login'/>
        </Switch>
    )
}
