import {Redirect, Route, Switch} from 'react-router-dom'
import React from 'react'

import Contact from '../../AddressBook/Contact/Contact'
import EnterpriseArchitecture from '../../AddressBook/EnterpriseArchitecture/EnterpriseArchitecture'
import Partners from '../../AddressBook/Partners/Partners'

export default function () {
    return (
        <Switch>
            <Route path="/pages/addressBook/enterpriseArchitecture" component={EnterpriseArchitecture}/>
            <Route path="/pages/addressBook/contact" component={Contact}/>
            <Route path="/pages/addressBook/partners" component={Partners}/>
            <Redirect from='/pages/addressBook' to='/pages/addressBook/enterpriseArchitecture'/>
        </Switch>
    )
}
