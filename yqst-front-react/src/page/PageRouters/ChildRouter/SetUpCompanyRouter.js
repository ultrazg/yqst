import {Redirect, Route, Switch} from 'react-router-dom'
import React from 'react'

import SetUpCompany from '../../SetUpCompany/ChildPages/SetUpCompany'
import SetUpResult from '../../SetUpCompany/ChildPages/SetUpResult'
import JoinCompany from '../../SetUpCompany/ChildPages/JoinCompany'

export default function () {
    return (
        (
            <Switch>
                <Route path="/users/setUpCompany/index" component={SetUpCompany}/>
                <Route path="/users/setUpCompany/setUpResult" component={SetUpResult}/>
                <Route path="/users/setUpCompany/joinCompany" component={JoinCompany}/>
                <Redirect from='/users/setUpCompany' to='/users/setUpCompany/index'/>
            </Switch>
        )
    )
}
