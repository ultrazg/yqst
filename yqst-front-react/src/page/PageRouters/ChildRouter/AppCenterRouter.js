import {Redirect, Route, Switch} from "react-router-dom";
import {Spin} from "antd";
import React, {lazy, Suspense} from "react";

import ApplyIndex from "../../AppCenter/ChildPage/ApplyIndex";
import ApplySetUp from "../../AppCenter/ChildPage/ApplySetUp";
import ApplyBazaar from "../../AppCenter/ChildPage/ApplyBazaar";
import ApplyDetail from "../../AppCenter/ChildPage/ApplyDetail";
import ApplyManage from "../../AppCenter/ChildPage/ApplyManage";
import ApplyGroup from "../../AppCenter/ChildPage/ApplyGroup";
import ApplyVisible from "../../AppCenter/ChildPage/ApplyVisible";
import ApplyManageNewUI from "../../AppCenter/ChildPage/ApplyManageNewUI";

/**
 * 应用
 */
import SellAssistant from "../../Use/SellAssistant/SellAssistant";
import PurchasingAssistant from "../../Use/PurchasingAssistant/PurchasingAssistant";
import ElectronicSealHelper from "../../Use/ElectronicSealHelper/ElectronicSealHelper";
import BTBEnterpriseWallet from "../../Use/BTBEnterpriseWallet/BTBEnterpriseWallet";
import BusinessAssistant from "../../Use/BusinessAssistant/BusinessAssistant";
//产品库
import SaProductHome from "../../Use/ProductLib/SaProductHome";

//企业产品库
import CompanyProductLibHome from "../../Use/CompanyProductLib/CompanyProductLibHome";

//费用助手
import CostAssistantHome from "../../Use/CostAssistant/CostAssistantHome";

// 存证中心
import CertificateCenter from "../../Use/CertificateCenter/CertificateCenterHome";

// 出租助手
import RentAssistantIndex from "../../Use/RentAssistant/RentAssistantIndex";
// 承运助手
import CarrierAsstHome from "../../Use/CarrierAsst/CarrierAsstHome";

// 路由懒加载 CodeSplit
// 合同助手
// const ContractAsstHome = lazy(() => import(/* webpackChunkName: "ContractAsst" */ "../../Use/ContractAsst/ContractAsstHome"));
import ContractAsstHome from "../../Use/ContractAsst/ContractAsstHome";

// 数据助手
// const DataAsstHome = lazy(() => import(/* webpackChunkName: "DataAsst" */ "../../Use/DataAsst/DataAsstHome"));
import DataAsstHome from "../../Use/DataAsst/DataAsstHome";

// 初始化工具
import InitializationTool from "../../Use/InitializationTool/InitializationTool";

// 补单助手
import SupplementAsstHome from '../../Use/SupplementAsst/SupplementAsstHome'

export default function () {
    return (
        <Suspense fallback={<Spin size="large"/>}>
            <Switch>
                <Route path="/pages/appCenter/applyIndex" component={ApplyIndex}/>
                <Route path="/pages/appCenter/applySetUp" component={ApplySetUp}/>
                <Route path="/pages/appCenter/applyBazaar" component={ApplyBazaar}/>
                <Route path="/pages/appCenter/applyDetail" component={ApplyDetail}/>
                <Route path="/pages/appCenter/applyManage" component={ApplyManage}/>
                <Route path="/pages/appCenter/applyGroup" component={ApplyGroup}/>
                <Route path="/pages/appCenter/ApplyVisible" component={ApplyVisible}/>
                <Route path="/pages/appCenter/ApplyManageNewUI" component={ApplyManageNewUI}/>
                {/*销售助手*/}
                <Route path="/pages/appCenter/sellAssistant" component={SellAssistant}/>
                {/*采购助手*/}
                <Route path="/pages/appCenter/purchasingAssistant" component={PurchasingAssistant}/>
                {/*电子签章*/}
                <Route path="/pages/appCenter/electronicSealHelper" component={ElectronicSealHelper}/>
                {/*b2b钱包*/}
                <Route path="/pages/appCenter/btbEnterpriseWallet" component={BTBEnterpriseWallet}/>
                {/*商机助手*/}
                <Route path="/pages/appCenter/businessAssistant" component={BusinessAssistant}/>
                {/*产品库*/}
                <Route path="/pages/appCenter/productLib/SaProductHome" component={SaProductHome}/>
                {/*企业产品库*/}
                <Route path="/pages/appCenter/companyProductLib/companyProductLibHome"
                       component={CompanyProductLibHome}/>
                {/*费用助手*/}
                <Route path="/pages/appCenter/costAssistant/costAssistantHome" component={CostAssistantHome}/>
                {/*存证中心*/}
                <Route path="/pages/appCenter/certificateCenter/certificateCenterHome" component={CertificateCenter}/>
                {/*出租助手*/}
                <Route path="/pages/appCenter/rentAssistant/rentAssistantHome" component={RentAssistantIndex}/>
                {/*承运助手*/}
                <Route path="/pages/appCenter/carrierAsst/carrierAsstHome" component={CarrierAsstHome}/>
                {/*数据助手*/}
                <Route path="/pages/appCenter/dataAsst/home" component={DataAsstHome}/>
                {/*合同助手*/}
                <Route path="/pages/appCenter/contractAsst/contractAsstHome" component={ContractAsstHome}/>
                {/*初始化工具*/}
                <Route path="/pages/appCenter/InitializationTool" component={InitializationTool}/>
                {/*补单助手*/}
                {/*<Route path="/pages/appCenter/SupplementAsstHome" component={SupplementAsstHome}/>*/}
                <Redirect from='/pages/appCenter' to='/pages/appCenter/applyIndex'/>
            </Switch>
        </Suspense>
    );
}
