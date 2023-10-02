import {Redirect, Route, Switch} from 'react-router-dom'
import React from 'react'

import ApplySetting from '../../AppCenter/ChildPage/ApplyManage/ApplySetting'
import ApplyGroupSetting from '../../AppCenter/ChildPage/ApplyManage/ApplyGroupSetting'
import ApplyVisibleSetting from '../../AppCenter/ChildPage/ApplyManage/ApplyVisibleSetting'
import ApplyDetail from '../../AppCenter/ChildPage/ApplyManage/ApplyDetail'

export default function () {
    return (
        <Switch>
            <Route path="/pages/appCenter/ApplyManageNewUI/applySetting" component={ApplySetting}/>
            <Route path="/pages/appCenter/ApplyManageNewUI/applyGroupSetting" component={ApplyGroupSetting}/>
            <Route path="/pages/appCenter/ApplyManageNewUI/applyVisibleSetting" component={ApplyVisibleSetting}/>
            <Route path="/pages/appCenter/ApplyManageNewUI/applyDetail" component={ApplyDetail}/>
            <Redirect from='/pages/appCenter/ApplyManageNewUI' to='/pages/appCenter/ApplyManageNewUI/applySetting'/>
        </Switch>
    )
}
