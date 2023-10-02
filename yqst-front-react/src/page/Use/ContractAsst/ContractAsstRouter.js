import {Redirect, Route, Switch} from "react-router-dom";
import React from "react";
import ContractAsstSituationPage from "./ContractAsstSituationPage";
import ContractManageIndex from "./ContractManage/ContractManageIndex";
import ContractCreateIndex from "./ContractCreate/ContractCreateIndex";
import ContractDetailIndex from "./ContractDetail/ContractDetailIndex";
import ContractArchiveIndex from "./ContractArchive/ContractArchiveIndex";
import ContractAgreement from "./ContractDetail/ContractAgreement";
import ContractUpdate from "./ContractDetail/ContractUpdate";

import ContractMaintainIndex from "./ContractMaintain/ContractMaintainIndex";
import LessorContractCreate from "./ContractMaintain/lessor/Create/LessorContractCreate";
import LesseeContractCreate from "./ContractMaintain/lessee/Create/LesseeContractCreate";
import ContractAsstDetail from "./ContractMaintain/lessor/detail/ContractAsstDetail";

import MaintainContractIndex from "./MaintainContract/MaintainContractIndex";
import MaintainContracLessorCreate from "./MaintainContract/lessor/Create/MaintainContracLessorCreate";
import MaintainContracLessorDetail from "./MaintainContract/lessor/Detail/MaintainContracLessorDetail";


export default function () {
    return (
        (
            <Switch>
                <Route path="/pages/appCenter/contractAsst/contractAsstHome/contractInfoMaintain/list"
                       component={ContractMaintainIndex}/>
                <Route path="/pages/appCenter/contractAsst/contractAsstHome/contractInfoMaintain/createlessor"
                       component={LessorContractCreate}/>
                <Route path="/pages/appCenter/contractAsst/contractAsstHome/contractInfoMaintain/createlessee"
                       component={LesseeContractCreate}/>
                <Route path="/pages/appCenter/contractAsst/contractAsstHome/contractInfoMaintain/detail"
                       component={ContractAsstDetail}/>

                <Route path="/pages/appCenter/contractAsst/contractAsstHome/maintainContractInfo/list"
                       component={MaintainContractIndex}/>
                <Route path="/pages/appCenter/contractAsst/contractAsstHome/maintainContractInfo/createlessor"
                       component={MaintainContracLessorCreate}/>
                <Route path="/pages/appCenter/contractAsst/contractAsstHome/maintainContractInfo/detail"
                       component={MaintainContracLessorDetail}/>

                <Route path="/pages/appCenter/contractAsst/contractAsstHome/contractAsstSituationPage"
                       component={ContractAsstSituationPage}/>
                <Route path="/pages/appCenter/contractAsst/contractAsstHome/contractManageIndex"
                       component={ContractManageIndex}/>
                <Route path="/pages/appCenter/contractAsst/contractAsstHome/contractCreateIndex"
                       component={ContractCreateIndex}/>
                <Route path="/pages/appCenter/contractAsst/contractAsstHome/contractDetailIndex"
                       component={ContractDetailIndex}/>
                <Route path="/pages/appCenter/contractAsst/contractAsstHome/contractArchiveIndex"
                       component={ContractArchiveIndex}/>
                <Route path="/pages/appCenter/contractAsst/contractAsstHome/contractAgreement"
                       component={ContractAgreement}/>
                <Route path="/pages/appCenter/contractAsst/contractAsstHome/contractUpdate" component={ContractUpdate}/>
                <Redirect from="/pages/appCenter/contractAsst/contractAsstHome"
                          to="/pages/appCenter/contractAsst/contractAsstHome/contractAsstSituationPage"/>
            </Switch>
        )
    );
}
