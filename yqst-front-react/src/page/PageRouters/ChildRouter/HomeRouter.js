import {Redirect, Route, Switch} from 'react-router-dom'
import React from 'react'
import Home from '../../Home/ChildPages/Home'
import FoundCompany from '../../Home/ChildPages/FoundCompany'
import FindCompany from '../../Home/ChildPages/FindCompany'
import PersonalCenter from '../../Home/ChildPages/PersonalCenter'
import PersonalSetting from '../../PersonalSetting/PersonalSetting'
import System from '../../System/System'
import SystemMessage from '../../System/SystemMessage'
import ApplyMessage from '../../Message/ApplyMessage'

export default function () {
    return (
        (
            <Switch>
                <Route path="/pages/home/index" component={Home}/>
                <Route path="/pages/home/foundCompany" component={FoundCompany}/>
                <Route path="/pages/home/findCompany" component={FindCompany}/>
                <Route path="/pages/home/personalCenter" component={PersonalCenter}/>
                <Route path="/pages/home/personalSetting" component={PersonalSetting}/>
                <Route path="/pages/home/systemMessage" component={SystemMessage}/>
                <Route path="/pages/home/system" component={System}/>
                <Route path="/pages/home/applyMessage" component={ApplyMessage}/>
                <Redirect from='/pages/home' to='/pages/home/index'/>
            </Switch>
        )
    )
}
