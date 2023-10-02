/*
* Created by yb
* 收支付助手
* */

import React from 'react';
import {Route} from 'react-router-dom';

import PAEnterpriseBusiness from '../../../paymentAssistant/paCustomerManage/paEnterpriseBusiness/PAEnterpriseBusiness';
import PAEnterpriseBusinessDetail from '../../../paymentAssistant/paCustomerManage/paEnterpriseBusiness/PAEnterpriseBusinessDetail';
import PAPersonalBusiness from "../../../paymentAssistant/paCustomerManage/paPersonalBusiness/PAPersonalBusiness";
import PAPersonalBusinessDetail from "../../../paymentAssistant/paCustomerManage/paPersonalBusiness/PAPersonalBusinessDetail";
import PAEnterpriseMerchantsAudit from "../../../paymentAssistant/paCustomerManage/paMerchantsAudit/PAEnterpriseMerchantsAudit/PAEnterpriseMerchantsAudit";
import PAEnterpriseMerchantsAuditDetail from "../../../paymentAssistant/paCustomerManage/paMerchantsAudit/PAEnterpriseMerchantsAudit/PAEnterpriseMerchantsAuditDetail";
import PAPersonalMerchantsAudit from "../../../paymentAssistant/paCustomerManage/paMerchantsAudit/PAPersonalMerchantsAudit/PAPersonalMerchantsAudit";
import PAPersonalMerchantsAuditDetail from "../../../paymentAssistant/paCustomerManage/paMerchantsAudit/PAPersonalMerchantsAudit/PAPersonalMerchantsAuditDetail";
import PATradeOrderList from "../../../paymentAssistant/paTradeOrderManage/PATradeOrderList";
import PATradeOrderDetail from "../../../paymentAssistant/paTradeOrderManage/PATradeOrderDetail";
import PAApplicationList from "../../../paymentAssistant/paApplicationManage/PAApplicationList";
import PAApplicationAdd from "../../../paymentAssistant/paApplicationManage/PAApplicationAdd";
import PAApplicationDetail from "../../../paymentAssistant/paApplicationManage/PAApplicationDetail";
import PASchemeList from "../../../paymentAssistant/paPaymentSchemeManage/payScheme/PASchemeList";
import PASchemeAdd from "../../../paymentAssistant/paPaymentSchemeManage/payScheme/PASchemeAdd";
import PAPayRateList from "../../../paymentAssistant/paPaymentSchemeManage/PayRates/PAPayRateList";
import PAPayRateAdd from "../../../paymentAssistant/paPaymentSchemeManage/PayRates/PAPayRateAdd";
import PAPayLimitation from "../../../paymentAssistant/paPaymentSchemeManage/PayLimitation/PAPayLimitation";
import PAPayLimitationDetail from "../../../paymentAssistant/paPaymentSchemeManage/PayLimitation/PAPayLimitationDetail";
import PAPayLimitationAdd from "../../../paymentAssistant/paPaymentSchemeManage/PayLimitation/PAPayLimitationAdd";
import PAChannelList from "../../../paymentAssistant/paChanelManage/PAChannelList";
import PAChannelDetail from "../../../paymentAssistant/paChanelManage/PAChannelDetail";
import PAUserStatistics from "../../../paymentAssistant/paBusinessStatistics/PAUserStatistics";
import PATradeStatistics from "../../../paymentAssistant/paBusinessStatistics/PATradeStatistics";
import PAChannelStatistics from "../../../paymentAssistant/paBusinessStatistics/PAChannelStatistics";
import PABusinessesStatistics from "../../../paymentAssistant/paBusinessStatistics/PABusinessesStatistics";
import PACostList from "../../../paymentAssistant/paCostManage/PACostList";
import PACostDetail from "../../../paymentAssistant/paCostManage/PACostDetail";

const PaymentAssistantRouter = (url, DevTipsPage) => {
    return [
        <Route key={'0'} path={url + '/PAEnterpriseBusiness'}
               component={PAEnterpriseBusiness}/>,
        <Route key={'1'} path={url + '/PAEnterpriseBusinessDetail'}
               component={PAEnterpriseBusinessDetail}/>,
        <Route key={'2'} path={url + '/PAPersonalBusiness'}
               component={PAPersonalBusiness}/>,
        <Route key={'3'} path={url + '/PAPersonalBusinessDetail'}
               component={PAPersonalBusinessDetail}/>,
        <Route key={'4'} path={url + '/PAEnterpriseMerchantsAudit'}
               component={PAEnterpriseMerchantsAudit}/>,
        <Route key={'5'} path={url + '/PAEnterpriseMerchantsAuditDetail'}
               component={PAEnterpriseMerchantsAuditDetail}/>,
        <Route key={'6'} path={url + '/PATradeOrderList'}
               component={PATradeOrderList}/>,
        <Route key={'7'} path={url + '/PATradeOrderDetail'}
               component={PATradeOrderDetail}/>,
        <Route key={'8'} path={url + '/PAApplicationList'}
               component={PAApplicationList}/>,
        <Route key={'9'} path={url + '/PAApplicationAdd'}
               component={PAApplicationAdd}/>,
        <Route key={'10'} path={url + '/PAApplicationDetail'}
               component={PAApplicationDetail}/>,
        <Route key={'11'} path={url + '/PASchemeList'}
               component={PASchemeList}/>,
        <Route key={'12'} path={url + '/PASchemeAdd'}
               component={PASchemeAdd}/>,
        <Route key={'13'} path={url + '/PAPayRateList'}
               component={PAPayRateList}/>,
        <Route key={'14'} path={url + '/PAPayLimitation'}
               component={PAPayLimitation}/>,
        <Route key={'15'} path={url + '/PAPayLimitationDetail'}
               component={PAPayLimitationDetail}/>,
        <Route key={'16'} path={url + '/PAPayLimitationAdd'}
               component={PAPayLimitationAdd}/>,
        <Route key={'17'} path={url + '/PAChannelList'}
               component={PAChannelList}/>,
        <Route key={'18'} path={url + '/PAChannelDetail'}
               component={PAChannelDetail}/>,
        <Route key={'19'} path={url + '/PAUserStatistics'}
               component={PAUserStatistics}/>,
        <Route key={'20'} path={url + '/PATradeStatistics'}
               component={PATradeStatistics}/>,
        <Route key={'21'} path={url + '/PAChannelStatistics'}
               component={PAChannelStatistics}/>,
        <Route key={'22'} path={url + '/PABusinessesStatistics'}
               component={PABusinessesStatistics}/>,
        <Route key={'23'} path={url + '/PAPayRateAdd'}
               component={PAPayRateAdd}/>,
        <Route key={'24'} path={url + '/PACostList'}
               component={PACostList}/>,
        <Route key={'25'} path={url + '/PACostDetail'}
               component={PACostDetail}/>,
        <Route key={'26'} path={url + '/PAPersonalMerchantsAudit'}
               component={PAPersonalMerchantsAudit}/>,
        <Route key={'27'} path={url + '/PAPersonalMerchantsAuditDetail'}
               component={PAPersonalMerchantsAuditDetail}/>,
    ]
};

export default PaymentAssistantRouter;