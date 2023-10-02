/*
* 商品中心的路由部分
* */

import React from 'react';
import {Route} from 'react-router-dom';

import ComCommodityStatistics from '../../../commodityCenter/statistics/ComCommodityStatistics';
import ComProductList from '../../../commodityCenter/productManagement/ComProductList';
import ComProductDetail from "../../../commodityCenter/productManagement/ComProductDetail";
import ComProductCategoryList from "../../../commodityCenter/productCategory/ComProductCategoryList";
import ComProductCategoryDetail from "../../../commodityCenter/productCategory/ComProductCategoryDetail";
import ComCommodityList from "../../../commodityCenter/commodityManagement/ComCommodityList";
import ComCommodityDetail from "../../../commodityCenter/commodityManagement/ComCommodityDetail";
import ComCommodityClassList from "../../../commodityCenter/commodityClass/ComCommodityClassList";
import ComCommodityClassDetail from "../../../commodityCenter/commodityClass/ComCommodityClassDetail";
import ComCommodityLabelList from "../../../commodityCenter/commodityLabel/ComCommodityLabelList";
import ComPOSTerminalList from "../../../commodityCenter/posTerminal/ComPOSTerminalList";
import ComPOSTerminalDetail from "../../../commodityCenter/posTerminal/ComPOSTerminalDetail";

const CommodityCenterRoute = (url, DevTipsPage) => {
    return [
        <Route key={'0'} path={url + '/ComCommodityStatistics'}
               component={ComCommodityStatistics}/>,
        <Route key={'1'} path={url + '/ComProductList'}
               component={ComProductList}/>,
        <Route key={'2'} path={url + '/ComProductDetail'}
               component={ComProductDetail}/>,
        <Route key={'3'} path={url + '/ComProductCategoryList'}
               component={ComProductCategoryList}/>,
        <Route key={'4'} path={url + '/ComProductCategoryDetail'}
               component={ComProductCategoryDetail}/>,
        <Route key={'5'} path={url + '/ComCommodityList'}
               component={ComCommodityList}/>,
        <Route key={'6'} path={url + '/ComCommodityDetail'}
               component={ComCommodityDetail}/>,
        <Route key={'7'} path={url + '/ComCommodityClassList'}
               component={ComCommodityClassList}/>,
        <Route key={'8'} path={url + '/ComCommodityClassDetail'}
               component={ComCommodityClassDetail}/>,
        <Route key={'9'} path={url + '/ComCommodityLabelList'}
               component={ComCommodityLabelList}/>,
        <Route key={'10'} path={url + '/ComPOSTerminalList'}
               component={ComPOSTerminalList}/>,
        <Route key={'11'} path={url + '/ComPOSTerminalDetail'}
               component={ComPOSTerminalDetail}/>
    ]
};
export default CommodityCenterRoute;