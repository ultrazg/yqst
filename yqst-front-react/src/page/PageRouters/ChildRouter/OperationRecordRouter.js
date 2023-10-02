import {Redirect, Route, Switch} from 'react-router-dom'
import React from 'react'

import RecordIndex from '../../MyCompany/ChildPages/ChildPages/RecordIndex'

export default function () {
    return (
        <Switch>
            <Route path="/pages/myCompany/operationRecord/recordIndex" component={RecordIndex}/>
            <Redirect from='/pages/myCompany/operationRecord' to='/pages/myCompany/operationRecord/recordIndex'/>
        </Switch>
    )
}
