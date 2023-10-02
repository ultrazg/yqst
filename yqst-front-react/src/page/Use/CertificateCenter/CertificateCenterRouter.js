import {Redirect, Route, Switch} from 'react-router-dom'
import React from 'react'

import CertificateCenterList from './CertificateCenterList'

export default function () {
    return (
        (
            <Switch>
                <Route path="/pages/appCenter/certificateCenter/certificateCenterHome/certificateCenterList" component={CertificateCenterList}/>
                <Redirect from='/pages/appCenter/certificateCenter/certificateCenterHome' to='/pages/appCenter/certificateCenter/certificateCenterHome/certificateCenterList'/>
            </Switch>
        )
    )
}
