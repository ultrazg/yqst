import {Redirect, Route, Switch} from 'react-router-dom'
import React from 'react'

import SystemNews from '../../System/ChildPages/SystemNews'

export default function () {
    return (
        (
            <Switch>
                <Route path="/pages/home/system/systemNews" component={SystemNews}/>
                <Redirect from='/pages/home/system' to='/pages/home/system/systemNews'/>
            </Switch>
        )
    )
}
