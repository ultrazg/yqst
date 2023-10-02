import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom'

import SupplementAsstIndex from "./SupplementAsstIndex";

export default function () {
    return (
        (
            <Switch>
                <Route path="/pages/appCenter/SupplementAsstHome" component={SupplementAsstIndex}/>
            </Switch>
        )
    )
}