/*
* Created by yb on 2019/09/10
* 订单中心的路由部分
* */

import React from 'react';
import {Route} from 'react-router-dom';

import OrderCenterStatistics from '../../../orderCenter/statisticsMod/OrderCenterStatistics';
import OrderManagementList from '../../../orderCenter/orderManagement/OrderManagementList';
import OrderManagementDetail from '../../../orderCenter/orderManagement/OrderManagementDetail';
import ReceiveAndDeliverList from '../../../orderCenter/receiveAndDeliver/ReceiveAndDeliverList';
import ReceiveAndDeliverDetail from '../../../orderCenter/receiveAndDeliver/ReceiveAndDeliverDetail';
import ReturnedOrderList from '../../../orderCenter/returnedOrder/ReturnedOrderList';
import ReturnedOrderDetail from '../../../orderCenter/returnedOrder/ReturnedOrderDetail';
import TradingOrderList from '../../../orderCenter/tradingOrder/TradingOrderList';
import TradingOrderDetail from "../../../orderCenter/tradingOrder/TradingOrderDetail";
import AfterOrderList from "../../../orderCenter/afterOrder/AfterOrderList";
import AfterOrderDetail from "../../../orderCenter/afterOrder/AfterOrderDetail";

const OrderCenterRoute = (url, DevTipsPage) => {
    return [
        <Route key={'0'} path={url + '/OrderCenterStatistics'}
               component={OrderCenterStatistics}/>,
        <Route key={'1'} path={url + '/OrderManagementList'}
               component={OrderManagementList}/>,
        <Route key={'2'} path={url + '/OrderManagementDetail'}
               component={OrderManagementDetail}/>,
        <Route key={'3'} path={url + '/ReceiveAndDeliverList'}
               component={ReceiveAndDeliverList}/>,
        <Route key={'4'} path={url + '/ReceiveAndDeliverDetail'}
               component={ReceiveAndDeliverDetail}/>,
        <Route key={'5'} path={url + '/ReturnedOrderList'}
               component={ReturnedOrderList}/>,
        <Route key={'6'} path={url + '/ReturnedOrderDetail'}
               component={ReturnedOrderDetail}/>,
        <Route key={'7'} path={url + '/TradingOrderList'}
               component={TradingOrderList}/>,
        <Route key={'8'} path={url + '/TradingOrderDetail'}
               component={TradingOrderDetail}/>,
        <Route key={'9'} path={url + '/AfterOrderList'}
               component={AfterOrderList}/>,
        <Route key={'10'} path={url + '/AfterOrderDetail'}
               component={AfterOrderDetail}/>
    ]
};
export default OrderCenterRoute;