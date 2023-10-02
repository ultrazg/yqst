/*
* Created by yb on 2019/09/11
* 支付中心的路由部分
* */

import React from 'react';
import {Route} from 'react-router-dom';

import PaymentCenterStatistics from '../../../paymentCenter/statisticsMod/PaymentCenterStatistics';
import ReceivingManageList from "../../../paymentCenter/userMoneyManage/receivingManage/ReceivingManageList";
import ReceivingManageDetail from "../../../paymentCenter/userMoneyManage/receivingManage/ReceivingManageDetail";
import RefundManageList from "../../../paymentCenter/userMoneyManage/refundManage/RefundManageList";
import RefundManageDetail from "../../../paymentCenter/userMoneyManage/refundManage/RefundManageDetail";
import MerchantAccountList from "../../../paymentCenter/merchantAccountManage/accountManage/MerchantAccountList";
import MerchantAccountDetail from "../../../paymentCenter/merchantAccountManage/accountManage/MerchantAccountDetail";
import AccountApplicationList from "../../../paymentCenter/merchantAccountManage/accountApplication/AccountApplicationList";
import AccountApplicationDetail from "../../../paymentCenter/merchantAccountManage/accountApplication/AccountApplicationDetail";
import CancellationApplicationList from "../../../paymentCenter/merchantAccountManage/cancellationApplication/CancellationApplicationList";
import CancellationApplicationDetail from "../../../paymentCenter/merchantAccountManage/cancellationApplication/CancellationApplicationDetail";
import BindingRelationshipList from "../../../paymentCenter/accountBinding/bindingRelationship/BindingRelationshipList";
import BindingRelationshipDetail from "../../../paymentCenter/accountBinding/bindingRelationship/BindingRelationshipDetail";
import BindingApplicationList from "../../../paymentCenter/accountBinding/bindingApplication/BindingApplicationList";
import BindingApplicationDetail from "../../../paymentCenter/accountBinding/bindingApplication/BindingApplicationDetail";
import UntieApplicationList from "../../../paymentCenter/accountBinding/untieApplication/UntieApplicationList";
import UntieApplicationDetail from "../../../paymentCenter/accountBinding/untieApplication/UntieApplicationDetail";
import APChannelList from "../../../paymentCenter/basicSetting/acceptPaymentChannel/APChannelList";
import APChannelDetail from "../../../paymentCenter/basicSetting/acceptPaymentChannel/APChannelDetail";
import APChannelEdit from "../../../paymentCenter/basicSetting/acceptPaymentChannel/APChannelEdit";
import APSchemeList from "../../../paymentCenter/basicSetting/acceptPaymentScheme/APSchemeList";
import APSchemeDetail from "../../../paymentCenter/basicSetting/acceptPaymentScheme/APSchemeDetail";
import APSchemeEdit from "../../../paymentCenter/basicSetting/acceptPaymentScheme/APSchemeEdit";

const OrderCenterRoute = (url, DevTipsPage) => {
    return [
        <Route key={'0'} path={url + '/PaymentCenterStatistics'}
               component={PaymentCenterStatistics}/>,
        <Route key={'1'} path={url + '/ReceivingManageList'}
               component={ReceivingManageList}/>,
        <Route key={'2'} path={url + '/ReceivingManageDetail'}
               component={ReceivingManageDetail}/>,
        <Route key={'3'} path={url + '/RefundManageList'}
               component={RefundManageList}/>,
        <Route key={'4'} path={url + '/RefundManageDetail'}
               component={RefundManageDetail}/>,
        <Route key={'5'} path={url + '/MerchantAccountList'}
               component={MerchantAccountList}/>,
        <Route key={'6'} path={url + '/MerchantAccountDetail'}
               component={MerchantAccountDetail}/>,
        <Route key={'7'} path={url + '/AccountApplicationList'}
               component={AccountApplicationList}/>,
        <Route key={'8'} path={url + '/AccountApplicationDetail'}
               component={AccountApplicationDetail}/>,
        <Route key={'9'} path={url + '/CancellationApplicationList'}
               component={CancellationApplicationList}/>,
        <Route key={'10'} path={url + '/CancellationApplicationDetail'}
               component={CancellationApplicationDetail}/>,
        <Route key={'11'} path={url + '/BindingRelationshipList'}
               component={BindingRelationshipList}/>,
        <Route key={'12'} path={url + '/BindingRelationshipDetail'}
               component={BindingRelationshipDetail}/>,
        <Route key={'13'} path={url + '/BindingRelationshipDetail'}
               component={BindingRelationshipDetail}/>,
        <Route key={'14'} path={url + '/BindingApplicationList'}
               component={BindingApplicationList}/>,
        <Route key={'15'} path={url + '/BindingApplicationDetail'}
               component={BindingApplicationDetail}/>,
        <Route key={'16'} path={url + '/UntieApplicationList'}
               component={UntieApplicationList}/>,
        <Route key={'17'} path={url + '/UntieApplicationDetail'}
               component={UntieApplicationDetail}/>,
        <Route key={'18'} path={url + '/APChannelList'}
               component={APChannelList}/>,
        <Route key={'19'} path={url + '/APChannelDetail'}
               component={APChannelDetail}/>,
        <Route key={'20'} path={url + '/APChannelEdit'}
               component={APChannelEdit}/>,
        <Route key={'21'} path={url + '/APSchemeList'}
               component={APSchemeList}/>,
        <Route key={'22'} path={url + '/APSchemeDetail'}
               component={APSchemeDetail}/>,
        <Route key={'23'} path={url + '/APSchemeEdit'}
               component={APSchemeEdit}/>
    ]
};
export default OrderCenterRoute;