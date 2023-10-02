import {Redirect, Route, Switch} from 'react-router-dom'
import React from 'react'
import ESHDataPanelPage from "./ESHDataManage/ESHDataPanel/ESHDataPanelPage";
import ESHPlatformDataList from "./ESHDataManage/ESHPlatformData/ESHPlatformDataList";
import ESHPlatformDataDetail from "./ESHDataManage/ESHPlatformData/ESHPlatformDataDetail";
import ESHPlatformDataSealDetail from "./ESHDataManage/ESHPlatformData/ESHPlatformDataSealDetail";
import ESHClientList from "./ESHClientManage/ESHClientList/ESHClientList";
import ESHClientDetail from "./ESHClientManage/ESHClientList/ESHClientDetail";
import OpenApplication from "./ESHOpenApplication/OpenApplication";
import OpenApplicationResult from "./ESHOpenApplication/OpenApplicationResult";

export default function () {
    return (
        <Switch>
            <Route path="/pages/appCenter/electronicSealHelper/eshDataPanel/eshDataPanelPage" component={ESHDataPanelPage}/>
            <Route path="/pages/appCenter/electronicSealHelper/eshPlatformData/eshPlatformDataList" component={ESHPlatformDataList}/>
            <Route path="/pages/appCenter/electronicSealHelper/eshPlatformData/eshPlatformDataDetail" component={ESHPlatformDataDetail}/>
            <Route path="/pages/appCenter/electronicSealHelper/eshPlatformData/eshPlatformDataSealDetail" component={ESHPlatformDataSealDetail}/>
            <Route path="/pages/appCenter/electronicSealHelper/eshClientManage/eshClientList" component={ESHClientList}/>
            <Route path="/pages/appCenter/electronicSealHelper/eshClientManage/eshClientDetail" component={ESHClientDetail}/>
            <Route path="/pages/appCenter/electronicSealHelper/eshOpenApplication/openApplication" component={OpenApplication}/>
            <Route path="/pages/appCenter/electronicSealHelper/eshOpenApplication/openApplicationResult" component={OpenApplicationResult}/>
            <Redirect from='/pages/appCenter/electronicSealHelper' to='/pages/appCenter/electronicSealHelper/eshDataPanel/eshDataPanelPage'/>
        </Switch>
    )
}
