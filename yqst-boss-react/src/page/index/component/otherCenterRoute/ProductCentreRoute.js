/*
* Created by yb on 2020/11/24
* 产品中心的路由部分
* */

import React from 'react';
import {Route} from 'react-router-dom';

import ProductManageList from '../../../ProductCentre/ProductManage/Product/ProductManageList';
import ProductManageDetail from '../../../ProductCentre/ProductManage/Product/ProductManageDetail';
import ProductClassList from '../../../ProductCentre/ProductManage/Class/ProductClassList';
// import ProductApplyForList from "../../../ProductCentre/ApplyFor/ProductApplyForList";
// import ProductApplyForDetail from "../../../ProductCentre/ApplyFor/ProductApplyForDetail";
// import ProductRelevanceList from "../../../ProductCentre/Relevance/ProductRelevanceList";

const ProductCentreRoute = (url, DevTipsPage) => {
    return [
        <Route key={'0'} path={url + '/ProductManageList'}
               component={ProductManageList}/>,
        <Route key={'0'} path={url + '/ProductManageDetail'}
               component={ProductManageDetail}/>,
        <Route key={'1'} path={url + '/ProductClassList'}
               component={ProductClassList}/>,
        // <Route key={'2'} path={url + '/ProductApplyForList'}
        //        component={ProductApplyForList}/>,
        // <Route key={'2'} path={url + '/ProductApplyForDetail'}
        //        component={ProductApplyForDetail}/>,
        // <Route key={'3'} path={url + '/ProductRelevanceList'}
        //        component={ProductRelevanceList}/>,
    ]
};
export default ProductCentreRoute;
