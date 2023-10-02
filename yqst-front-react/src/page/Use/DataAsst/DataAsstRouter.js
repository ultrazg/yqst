import {Redirect, Route, Switch} from "react-router-dom";
import React from "react";
import DataAsstSituationPage from "./DataAsstSituationPage";
import DataAsstDashBoardIndex from "./DataAsstDashBoard/DataAsstDashBoardIndex";
import DataAsstReportTableIndex from "./DataAsstReportTable/DataAsstReportTableIndex";
import DataAsstReportTableCreate from "./DataAsstReportTable/DataAsstReportTableCreate";
import DataAsstBusinessDataIndex from "./BusinessData/DataAsstBusinessDataIndex";
import DataAsstGroupDataIndex from "./GroupData/DataAsstGroupDataIndex";

export default function () {
    return (
        <Switch>
            <Route path="/pages/appCenter/dataAsst/home/situationPage" component={DataAsstSituationPage}/>
            <Route path="/pages/appCenter/dataAsst/home/dataAsstDashBoardIndex" component={DataAsstDashBoardIndex}/>
            <Route path="/pages/appCenter/dataAsst/home/dataAsstReportTableIndex" component={DataAsstReportTableIndex}/>
            <Route path="/pages/appCenter/dataAsst/home/dataAsstReportTableCreate" component={DataAsstReportTableCreate}/>
            <Route path="/pages/appCenter/dataAsst/home/dataAsstBusinessDataIndex"
                   component={DataAsstBusinessDataIndex}/>
            <Route path="/pages/appCenter/dataAsst/home/dataAsstGroupDataIndex" component={DataAsstGroupDataIndex}/>
            <Redirect from='/pages/appCenter/dataAsst/home' to='/pages/appCenter/dataAsst/home/situationPage'/>
        </Switch>
    );
}
