import {Redirect, Route, Switch} from 'react-router-dom'
import React from 'react'

import Login from '../../Login/ChildPages/Login'
import Register from '../../Login/ChildPages/Register'
import ScanLogin from '../../Login/ChildPages/ScanLogin'
import ResetPassword from '../../Login/ChildPages/ResetPassword'
import NextResetPassword from '../../Login/ChildPages/NextResetPassword'
import ResetResult from '../../Login/ChildPages/ResetResult'
import RegisterResult from '../../Login/ChildPages/RegisterResult'
import SetPassword from '../../Login/ChildPages/SetPassword'
import SetUpNumber from '../../Login/ChildPages/SetUpNumber'

export default function () {
    return (
        (
            <Switch>
                <Route path="/users/login/index" component={Login}/>
                <Route path="/users/login/register" component={Register}/>
                {/*<Route path="/users/login/scanLogin" component={ScanLogin}/>*/}
                <Route path="/users/login/resetPassword" component={ResetPassword}/>
                <Route path="/users/login/nextResetPassword" component={NextResetPassword}/>
                <Route path="/users/login/resetResult" component={ResetResult}/>
                <Route path="/users/login/registerResult" component={RegisterResult}/>
                {/*<Route path="/users/login/setPassword" component={SetPassword}/>*/}
                <Route path="/users/login/setUpNumber" component={SetUpNumber}/>
                <Redirect from='/users/login' to='/users/login/index'/>
            </Switch>
        )
    )
}
