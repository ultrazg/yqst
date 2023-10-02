import React from 'react';
import {Route} from 'react-router-dom';

import MaterialManageList from '../../../MaterialsCenter/MaterialManage/Product/MaterialManageList';
import MaterialManageDetail from '../../../MaterialsCenter/MaterialManage/Product/MaterialManageDetail';
import MaterialClassList from '../../../MaterialsCenter/MaterialManage/Class/MaterialClassList';
// import ProductApplyForList from "../../../ProductCentre/ApplyFor/ProductApplyForList";
// import ProductApplyForDetail from "../../../ProductCentre/ApplyFor/ProductApplyForDetail";
// import ProductRelevanceList from "../../../ProductCentre/Relevance/ProductRelevanceList";

const MaterialsCentreRoute = (url, DevTipsPage) => {
    return [
        <Route key={'0'} path={url + '/MaterialManageList'}
               component={MaterialManageList}/>,
        <Route key={'0'} path={url + '/MaterialManageDetail'}
               component={MaterialManageDetail}/>,
        <Route key={'1'} path={url + '/MaterialClassList'}
               component={MaterialClassList}/>,
        // <Route key={'2'} path={url + '/ProductApplyForList'}
        //        component={ProductApplyForList}/>,
        // <Route key={'2'} path={url + '/ProductApplyForDetail'}
        //        component={ProductApplyForDetail}/>,
        // <Route key={'3'} path={url + '/ProductRelevanceList'}
        //        component={ProductRelevanceList}/>,
    ]
};
export default MaterialsCentreRoute;
