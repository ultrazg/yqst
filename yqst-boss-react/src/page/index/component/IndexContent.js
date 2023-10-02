/**
 * Created by liqiang on 2017/11/15.
 * 首页内容
 */
import React from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import ScrollToTop from './ScrollToTop';

// 云服务管理列表
import CloudServeList from '../../serveCenter/cloudServe/CloudServeList';
// 系统管理
import SAAdminList from '../../systemManageMod/adminMod/SAAdminList';

import UserList from '../../userCenter/userCenter/UserList';

// PersonalUserList 个人用户列表
import PersonalUserList from '../../userCenter/userCenter/PersonalUserList';
import PersonalUserDetail from '../../userCenter/userCenter/PersonalUserList/detail';
// EnterpriseUsersList 企业用户列表
import EnterpriseUsersList from '../../userCenter/userCenter/EnterpriseUsersList';
import EnterpriseUsersDetail from '../../userCenter/userCenter/EnterpriseUsersList/detail';
import EnterpriseUsersJurisdiction from '../../userCenter/userCenter/EnterpriseUsersList/jurisdictionDetail';
import EnterpriseUsersRuleAddDetail from '../../userCenter/userCenter/EnterpriseUsersList/ruleAddDetail';
import EnterpriseUsersRuleEditDetail from '../../userCenter/userCenter/EnterpriseUsersList/ruleEditDetail';
import EnterpriseCooperativePartner from '../../userCenter/userCenter/EnterpriseUsersList/cooperativePartner';
import NewPermissionGroup from '../../userCenter/userCenter/EnterpriseUsersList/newPermissionGroup';
import PermissionGroupDetail from '../../userCenter/userCenter/EnterpriseUsersList/permissionGroupDetail';
// LogInAndLogOut 登录登出日志
import LogInAndLogOut from '../../userCenter/userCenter/LogInAndLogOut';
// LogInAndLogOut 操作日志
import OperationalLog from '../../userCenter/userCenter/OperationalLog';

/*账务中心*/
import EnterpriseList from '../../accountingCenter/enterpriseBooks/EnterpriseList';
import BooksList from "../../accountingCenter/enterpriseBooks/BooksList";
import BooksDetail from "../../accountingCenter/enterpriseBooks/BooksDetail";
import AccountBooksDetail from "../../accountingCenter/enterpriseBooks/AccountBooksDetail";
import SubjectList from "../../accountingCenter/foundationSetup/subjectManage/SubjectList";
import TemplateList from "../../accountingCenter/foundationSetup/templateManage/TemplateList";
import TemplateEdit from "../../accountingCenter/foundationSetup/templateManage/TemplateEdit";
// 业务节点管理
import BusinessNode from "../../accountingCenter/foundationSetup/businessNode";
import AccountingRules from "../../accountingCenter/foundationSetup/accountingRules";
import AccountingRulesDetail from "../../accountingCenter/foundationSetup/accountingRules/detail";
//app更新管理
import AppUpdateManage from '../../appUpdateManage/AppUpdateManage';
//金融中心
import FinancialInstanceList from '../../financialCenter/financialInstance/FinancialInstanceList';
import FinancialRulesList from '../../financialCenter/financialRules/FinancialRulesList';
import FinancialChannelList from '../../financialCenter/financialChannel/FinancialChannelList';
import FinancialCategory from '../../financialCenter/financialCategory/FinancialCategory';
import FinancialTag from '../../financialCenter/financialTag/FinancialTag';
import FinancialPlanList from '../../financialCenter/financialPlan/FinancialPlanList';
import ServiceApplicationAuditedTwice from "../../unionpay/ServiceApplication/ServiceApplicationAuditedTwice";
import ServiceApplicationCompleted from "../../unionpay/ServiceApplication/ServiceApplicationCompleted";
import ServiceApplicationContractAccepted
    from "../../unionpay/ServiceApplication/detail/ServiceApplicationContractAccepted";
import ServiceApplicationDepositReceived
    from "../../unionpay/ServiceApplication/detail/ServiceApplicationDepositReceived";
import ServiceApplicationPendingTrial from "../../unionpay/ServiceApplication/ServiceApplicationPendingTrial";
import ServiceApplicationPOSMachine from "../../unionpay/ServiceApplication/ServiceApplicationPOSMachine";
import MerchantManagementList from "../../unionpay/MerchantManagement/MerchantManagementList";
import BusinessParameterSettings from "../../unionpay/BusinessParameter/BusinessParameterSettings";
import OtherParameterSettings from "../../unionpay/BusinessParameter/OtherParameterSettings";
import MerchantManagementListDetail from "../../unionpay/MerchantManagement/MerchantManagementListDetail";
// import ServiceApplicationPendingTrialDetail
//     from "../../unionpay/ServiceApplication/detail/ServiceApplicationPendingTrialDetail";
// import ServiceApplicationAuditedTwiceDetail
//     from "../../unionpay/ServiceApplication/detail/ServiceApplicationAuditedTwiceDetail";
// import ServiceApplicationCompletedDetail from "../../unionpay/ServiceApplication/detail/ServiceApplicationCompletedDetail";
// import ServiceApplicationContractAcceptedDetail
//     from "../../unionpay/ServiceApplication/detail/ServiceApplicationContractAcceptedDetail";
// import ServiceApplicationPOSMachineDetail from "../../unionpay/ServiceApplication/detail/ServiceApplicationPOSMachineDetail";
// import ServiceApplicationDepositReceivedDetail
//     from "../../unionpay/ServiceApplication/detail/ServiceApplicationDepositReceivedDetail";
import ServiceApplicationPublicDetails from "../../unionpay/ServiceApplication/detail/ServiceApplicationPublicDetail";

import UserCenterRoute from "./otherCenterRoute/UserCenterRoute";
import AttestationCenterRoute from './otherCenterRoute/AttestationCenterRoute';
import MessageCenterRoute from './otherCenterRoute/MessageCenterRoute';
import CommodityCenterRoute from './otherCenterRoute/CommodityCenterRoute';
import OrderCenterRoute from './otherCenterRoute/OrderCenterRoute';
import PaymentCenterRoute from './otherCenterRoute/PaymentCenterRoute';
import ContractCenterRoute from './otherCenterRoute/ContractCenterRoute';
import TaxReceiptCenterRoute from './otherCenterRoute/TaxReceiptCenterRoute';
import SystemSetupCenterRoute from './otherCenterRoute/SystemSetupCenterRoute';
import ServeCenterRoute from './otherCenterRoute/ServeCenterRoute';
import ElectronicSealCenterRoute from './otherCenterRoute/ElectronicSealCenterRoute';
import BusinessAssistantRoute from './otherCenterRoute/BusinessAssistantRoute';
import PaymentAssistantRouter from './otherCenterRoute/PaymentAssistantRouter';
import ProductCentreRoute from './otherCenterRoute/ProductCentreRoute';
import MaterialsCentreRoute from './otherCenterRoute/MaterialsCentreRoute';
import OperationsToolRoute from "./otherCenterRoute/OperationsToolRoute";

/*data center*/
import DataCenter from '../../dataCenter/DataCenter';

// 平台单位库
import PlatformUnitLib from '../../ProductCentre/unitLib/UnitManager';

// 业务配置中心
import LeaseConf from "../../businessConfCenter/LeaseConf";
import DigitalModeConf from "../../businessConfCenter/DigitalModeConf";

class IndexContent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <ScrollToTop>
            <Switch>
                <Route path={this.props.match.url + '/'} exact component={CloudServeList}/>
                {/*银联收银台*/}
                <Route path={this.props.match.url + '/ServiceApplicationAuditedTwice'} exact
                       component={ServiceApplicationAuditedTwice}/>
                <Route path={this.props.match.url + '/ServiceApplicationCompleted'} exact
                       component={ServiceApplicationCompleted}/>
                <Route path={this.props.match.url + '/ServiceApplicationContractAccepted'} exact
                       component={ServiceApplicationContractAccepted}/>
                <Route path={this.props.match.url + '/ServiceApplicationDepositReceived'} exact
                       component={ServiceApplicationDepositReceived}/>
                <Route path={this.props.match.url + '/ServiceApplicationPendingTrial'} exact
                       component={ServiceApplicationPendingTrial}/>

                <Route path={this.props.match.url + '/ServiceApplicationPOSMachine'} exact
                       component={ServiceApplicationPOSMachine}/>
                <Route path={this.props.match.url + '/MerchantManagementList'} exact
                       component={MerchantManagementList}/>
                <Route path={this.props.match.url + '/BusinessParameterSettings'} exact
                       component={BusinessParameterSettings}/>
                <Route path={this.props.match.url + '/OtherParameterSettings'} exact
                       component={OtherParameterSettings}/>
                <Route path={this.props.match.url + '/MerchantManagementListDetail'} exact
                       component={MerchantManagementListDetail}/>

                {/*<Route path={this.props.match.url + '/ServiceApplicationPendingTrialDetail'} exact*/}
                {/*component={ServiceApplicationPendingTrialDetail}/>*/}
                {/*<Route path={this.props.match.url + '/ServiceApplicationAuditedTwiceDetail'} exact component={ServiceApplicationAuditedTwiceDetail}/>*/}
                {/*<Route path={this.props.match.url + '/ServiceApplicationCompletedDetail'} exact component={ServiceApplicationCompletedDetail}/>*/}
                {/*<Route path={this.props.match.url + '/ServiceApplicationContractAcceptedDetail'} exact component={ServiceApplicationContractAcceptedDetail}/>*/}
                {/*<Route path={this.props.match.url + '/ServiceApplicationDepositReceivedDetail'} exact component={ServiceApplicationDepositReceivedDetail}/>*/}
                {/*<Route path={this.props.match.url + '/ServiceApplicationPOSMachineDetail'} exact component={ServiceApplicationPOSMachineDetail}/>*/}
                <Route path={this.props.match.url + '/ServiceApplicationPendingTrialDetail'} exact
                       component={ServiceApplicationPublicDetails}/>
                <Route path={this.props.match.url + '/ServiceApplicationAuditedTwiceDetail'} exact
                       component={ServiceApplicationPublicDetails}/>
                <Route path={this.props.match.url + '/ServiceApplicationCompletedDetail'} exact
                       component={ServiceApplicationPublicDetails}/>
                <Route path={this.props.match.url + '/ServiceApplicationContractAcceptedDetail'} exact
                       component={ServiceApplicationPublicDetails}/>
                <Route path={this.props.match.url + '/ServiceApplicationDepositReceivedDetail'} exact
                       component={ServiceApplicationPublicDetails}/>
                <Route path={this.props.match.url + '/ServiceApplicationPOSMachineDetail'} exact
                       component={ServiceApplicationPublicDetails}/>

                {/*数据中心*/}
                <Route path={this.props.match.url + '/DataCenter'} component={DataCenter}/>

                {/*业务配置中心*/}
                <Route path={this.props.match.url + '/BusinessConfCenter/LeaseConf'} component={LeaseConf}/>
                <Route path={this.props.match.url + '/BusinessConfCenter/DigitalModeConf'} component={DigitalModeConf}/>

                {/*平台单位库*/}
                <Route path={this.props.match.url + '/UnitManager'} component={PlatformUnitLib}/>

                {/*金融中心*/}
                <Route path={this.props.match.url + '/PlanList'} component={FinancialPlanList}/>
                <Route path={this.props.match.url + '/PlanCategory'} component={FinancialCategory}/>
                <Route path={this.props.match.url + '/PlanTag'} component={FinancialTag}/>
                <Route path={this.props.match.url + '/FinancialRules'} component={FinancialRulesList}/>
                <Route path={this.props.match.url + '/FinancialChannel'} component={FinancialChannelList}/>
                <Route path={this.props.match.url + '/FinancialInstance'} component={FinancialInstanceList}/>

                {/*账务中心*/}
                <Route path={this.props.match.url + '/EnterpriseList'}
                       component={EnterpriseList}/>
                <Route path={this.props.match.url + '/BooksList'}
                       component={BooksList}/>
                <Route path={this.props.match.url + '/BooksDetail'}
                       component={BooksDetail}/>
                <Route path={this.props.match.url + '/AccountBooksDetail'}
                       component={AccountBooksDetail}/>
                <Route path={this.props.match.url + '/SubjectList'}
                       component={SubjectList}/>
                <Route path={this.props.match.url + '/TemplateList'}
                       component={TemplateList}/>
                <Route path={this.props.match.url + '/TemplateEdit'}
                       component={TemplateEdit}/>
                <Route path={this.props.match.url + '/BusinessNode'}
                       component={BusinessNode}/>
                <Route path={this.props.match.url + '/AccountingRules'}
                       component={AccountingRules}/>
                <Route path={this.props.match.url + '/AccountingRulesDetail'}
                       component={AccountingRulesDetail}/>

                {/*APP更新管理*/}
                <Route path={this.props.match.url + '/AppUpdateManage'}
                       component={AppUpdateManage}/>
                {/*用户中心*/}
                <Route path={this.props.match.url + '/UserList'}
                       component={UserList}/>

                {/*系统管理*/}
                <Route path={this.props.match.url + '/SAAdminList'}
                       component={SAAdminList}/>
                {/*个人用户列表*/}
                <Route path={this.props.match.url + '/PersonalUserList'} component={PersonalUserList}/>
                <Route path={this.props.match.url + '/PersonalUserDetail'} component={PersonalUserDetail}/>
                {/*企业用户列表*/}
                <Route path={this.props.match.url + '/EnterpriseUsersList'} component={EnterpriseUsersList}/>
                <Route path={this.props.match.url + '/EnterpriseUsersDetail'} component={EnterpriseUsersDetail}/>
                <Route path={this.props.match.url + '/EnterpriseUsersJurisdiction'}
                       component={EnterpriseUsersJurisdiction}/>
                <Route path={this.props.match.url + '/EnterpriseUsersRuleAddDetail'}
                       component={EnterpriseUsersRuleAddDetail}/>
                <Route path={this.props.match.url + '/EnterpriseUsersRuleEditDetail'}
                       component={EnterpriseUsersRuleEditDetail}/>
                <Route path={this.props.match.url + '/EnterpriseCooperativePartner'}
                       component={EnterpriseCooperativePartner}/>
                <Route path={this.props.match.url + '/NewPermissionGroup'} component={NewPermissionGroup}/>
                <Route path={this.props.match.url + '/PermissionGroupDetail'} component={PermissionGroupDetail}/>
                {/*登陆登出日志*/}
                <Route path={this.props.match.url + '/LogInAndLogOut'} component={LogInAndLogOut}/>
                {/*操作日志*/}
                <Route path={this.props.match.url + '/OperationalLog'} component={OperationalLog}/>

                {/*用户中心*/}
                {UserCenterRoute(this.props.match.url, DevTipsPage)}
                {/*认证中心*/}
                {AttestationCenterRoute(this.props.match.url, DevTipsPage)}


                {/*消息中心*/}
                {MessageCenterRoute(this.props.match.url, DevTipsPage)}

                {/*商品中心*/}
                {CommodityCenterRoute(this.props.match.url, DevTipsPage)}

                {/*订单中心*/}
                {OrderCenterRoute(this.props.match.url, DevTipsPage)}

                {/*支付中心*/}
                {PaymentCenterRoute(this.props.match.url, DevTipsPage)}

                {/*合同中心*/}
                {ContractCenterRoute(this.props.match.url, DevTipsPage)}

                {/*税票中心*/}
                {TaxReceiptCenterRoute(this.props.match.url, DevTipsPage)}

                {/*系统设置*/}
                {SystemSetupCenterRoute(this.props.match.url, DevTipsPage)}

                {/*系统设置*/}
                {ServeCenterRoute(this.props.match.url, DevTipsPage)}

                {/*电子签章服务中心*/}
                {ElectronicSealCenterRoute(this.props.match.url, DevTipsPage)}

                {/*商机助手中心*/}
                {BusinessAssistantRoute(this.props.match.url, DevTipsPage)}

                {/*收支付助手*/}
                {PaymentAssistantRouter(this.props.match.url, DevTipsPage)}

                {/*产品中心*/}
                {ProductCentreRoute(this.props.match.url, DevTipsPage)}
                {/*平台物资*/}
                {MaterialsCentreRoute(this.props.match.url, DevTipsPage)}
                {/*运营工具*/}
                {OperationsToolRoute(this.props.match.url, DevTipsPage)}

                <Route path={this.props.match.url + '/ReLoadBlankPage'} component={ReLoadBlankPage}/>
            </Switch>
        </ScrollToTop>;
    }
}

class ReLoadBlankPage extends React.Component {
    render() {
        return <div/>
    }
}

@connect(
    (state) => {
        const {IndexReducers} = state;
        return {IndexReducers}
    }
)
class DevTipsPage extends React.Component {
    render() {
        return <div style={{
            width: this.props.IndexReducers.contentWidth - 17,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 20,
            minHeight: document.documentElement.clientHeight * 0.7
        }}>功能暂未开放,敬请期待</div>
    }
}

const mapStateToProps = (state) => {
    const {IndexReducers} = state;
    return {
        IndexReducers
    }
};
export default connect(mapStateToProps)(IndexContent)
