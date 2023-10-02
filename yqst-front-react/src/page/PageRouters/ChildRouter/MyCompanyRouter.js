import {Redirect, Route, Switch} from 'react-router-dom'
import React from 'react'

import SubjectSetUp from '../../MyCompany/ChildPages/SubjectSetUp'
import OperationRecord from '../../MyCompany/ChildPages/OperationRecord'
import RoleAndPower from '../../MyCompany/ChildPages/RoleAndPower'

export default function () {
    return (
        <Switch>
            <Route path="/pages/myCompany/subjectSetUp" component={SubjectSetUp}/>
            <Route path="/pages/myCompany/operationRecord" component={OperationRecord}/>
            <Route path="/pages/myCompany/RoleAndPower" component={RoleAndPower}/>
            <Redirect from='/pages/myCompany' to='/pages/myCompany/subjectSetUp'/>
        </Switch>
    )
}
