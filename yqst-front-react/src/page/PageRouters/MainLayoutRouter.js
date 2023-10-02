import {Redirect, Route, Switch} from 'react-router-dom'
import React from 'react'

import Home from '../Home'
import AddressBook from '../AddressBook'
import AppCenter from '../AppCenter/AppCenter'
import MyCompany from '../MyCompany'

export default function () {
    return (
        <Switch>
            <Route path="/pages/home" component={Home}/>
            <Route path="/pages/addressBook" component={AddressBook}/>
            <Route path="/pages/appCenter" component={AppCenter}/>
            <Route path="/pages/myCompany" component={MyCompany}/>
            <Redirect from='/pages' to='/pages/home'/>
        </Switch>
    )
}
