import {Redirect, Route, Switch} from 'react-router-dom'
import React from 'react'

import PersonalInfo from '../../PersonalSetting/ChildPages/PersonalInfo'
import PersonalRealName from '../../PersonalSetting/ChildPages/PersonalRealName'
import AccountAndSecurity from '../../PersonalSetting/ChildPages/AccountAndSecurity'
import OtherCompanyMes from '../../PersonalSetting/ChildPages/OtherCompanyMes'
import PersonalPrivacy from '../../PersonalSetting/ChildPages/PersonalPrivacy'
import BusinessCardManagement from '../../PersonalSetting/ChildPages/BusinessCardManagement'
import IdeaAndFeedback from '../../PersonalSetting/ChildPages/IdeaAndFeedback'

export default function () {
    return (
        (
            <Switch>
                <Route path="/pages/home/personalSetting/personalInfo" component={PersonalInfo}/>
                <Route path="/pages/home/personalSetting/personalRealName" component={PersonalRealName}/>
                <Route path="/pages/home/personalSetting/accountAndSecurity" component={AccountAndSecurity}/>
                <Route path="/pages/home/personalSetting/otherCompanyMes" component={OtherCompanyMes}/>
                <Route path="/pages/home/personalSetting/personalPrivacy" component={PersonalPrivacy}/>
                <Route path="/pages/home/personalSetting/businessCardManagement" component={BusinessCardManagement}/>
                <Route path="/pages/home/personalSetting/ideaAndFeedback" component={IdeaAndFeedback}/>
                <Redirect from='/pages/home/personalSetting' to='/pages/home/PersonalSetting/personalInfo'/>
            </Switch>
        )
    )
}
