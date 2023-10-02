/*
* Created by yb on 2019/09/27
* 税票中心的路由部分
* */

import React from 'react';
import {Route} from 'react-router-dom';

import MakeOutAnInvoiceList from "../../../taxReceiptCenter/invoiceAndRise/makeOutAnInvoice/MakeOutAnInvoiceList";
import MakeOutAnInvoiceDetail from "../../../taxReceiptCenter/invoiceAndRise/makeOutAnInvoice/MakeOutAnInvoiceDetail";
import RiseManageList from "../../../taxReceiptCenter/invoiceAndRise/riseManage/RiseManageList";
import RiseManageDetail from "../../../taxReceiptCenter/invoiceAndRise/riseManage/RiseManageDetail";
import BlueInvoiceApplyList from "../../../taxReceiptCenter/invoiceManage/blueInvoiceApply/BlueInvoiceApplyList";
import BlueInvoiceApplyDetail from "../../../taxReceiptCenter/invoiceManage/blueInvoiceApply/BlueInvoiceApplyDetail";
import RedInvoiceApplyList from "../../../taxReceiptCenter/invoiceManage/redInvoiceApply/RedInvoiceApplyList";
import RedInvoiceApplyDetail from "../../../taxReceiptCenter/invoiceManage/redInvoiceApply/RedInvoiceApplyDetail";
import BlueInvoiceList from "../../../taxReceiptCenter/invoiceManage/blueInvoice/BlueInvoiceList";
import BlueInvoiceDetail from "../../../taxReceiptCenter/invoiceManage/blueInvoice/BlueInvoiceDetail";
import RedInvoiceList from "../../../taxReceiptCenter/invoiceManage/redInvoice/RedInvoiceList";
import RedInvoiceDetail from "../../../taxReceiptCenter/invoiceManage/redInvoice/RedInvoiceDetail";
import InvoiceSendList from "../../../taxReceiptCenter/invoiceSend/InvoiceSendList";
import InvoiceSendDetail from "../../../taxReceiptCenter/invoiceSend/InvoiceSendDetail";
import InvoiceClassifyList from "../../../taxReceiptCenter/basicSetup/invoiceClassify/InvoiceClassifyList";
import InvoiceClassifyDetail from "../../../taxReceiptCenter/basicSetup/invoiceClassify/InvoiceClassifyDetail";
import InvoiceClassifyEditor from "../../../taxReceiptCenter/basicSetup/invoiceClassify/InvoiceClassifyEditor";
import InvoiceElementList from "../../../taxReceiptCenter/basicSetup/invoiceElement/InvoiceElementList";
import InvoiceElementDetail from "../../../taxReceiptCenter/basicSetup/invoiceElement/InvoiceElementDetail";
import InvoiceElementEditor from "../../../taxReceiptCenter/basicSetup/invoiceElement/InvoiceElementEditor";
import InvoiceElementGroupList from "../../../taxReceiptCenter/basicSetup/invoiceElementGroup/InvoiceElementGroupList";
import InvoiceElementGroupDetail from "../../../taxReceiptCenter/basicSetup/invoiceElementGroup/InvoiceElementGroupDetail";
import InvoiceElementGroupEditor from "../../../taxReceiptCenter/basicSetup/invoiceElementGroup/InvoiceElementGroupEditor";
import InvoiceTemplateList from "../../../taxReceiptCenter/basicSetup/invoiceTemplate/InvoiceTemplateList";
import InvoiceTemplateDetail from "../../../taxReceiptCenter/basicSetup/invoiceTemplate/InvoiceTemplateDetail";
import InvoiceTemplateEditor from "../../../taxReceiptCenter/basicSetup/invoiceTemplate/InvoiceTemplateEditor";
import TaxReceiptStatistics from "../../../taxReceiptCenter/taxReceiptStatistics/TaxReceiptStatistics";

const TaxReceiptCenterRoute = (url, DevTipsPage) => {
    return [
        <Route key={'0'} path={url + '/MakeOutAnInvoiceList'}
               component={MakeOutAnInvoiceList}/>,
        <Route key={'1'} path={url + '/MakeOutAnInvoiceDetail'}
               component={MakeOutAnInvoiceDetail}/>,
        <Route key={'2'} path={url + '/RiseManageList'}
               component={RiseManageList}/>,
        <Route key={'3'} path={url + '/RiseManageDetail'}
               component={RiseManageDetail}/>,
        <Route key={'4'} path={url + '/BlueInvoiceApplyList'}
               component={BlueInvoiceApplyList}/>,
        <Route key={'5'} path={url + '/BlueInvoiceApplyDetail'}
               component={BlueInvoiceApplyDetail}/>,
        <Route key={'6'} path={url + '/RedInvoiceApplyList'}
               component={RedInvoiceApplyList}/>,
        <Route key={'7'} path={url + '/RedInvoiceApplyDetail'}
               component={RedInvoiceApplyDetail}/>,
        <Route key={'8'} path={url + '/BlueInvoiceList'}
               component={BlueInvoiceList}/>,
        <Route key={'9'} path={url + '/BlueInvoiceDetail'}
               component={BlueInvoiceDetail}/>,
        <Route key={'10'} path={url + '/RedInvoiceList'}
               component={RedInvoiceList}/>,
        <Route key={'11'} path={url + '/RedInvoiceDetail'}
               component={RedInvoiceDetail}/>,
        <Route key={'12'} path={url + '/InvoiceSendList'}
               component={InvoiceSendList}/>,
        <Route key={'13'} path={url + '/InvoiceSendDetail'}
               component={InvoiceSendDetail}/>,
        <Route key={'14'} path={url + '/InvoiceClassifyList'}
               component={InvoiceClassifyList}/>,
        <Route key={'15'} path={url + '/InvoiceClassifyDetail'}
               component={InvoiceClassifyDetail}/>,
        <Route key={'16'} path={url + '/InvoiceClassifyEditor'}
               component={InvoiceClassifyEditor}/>,
        <Route key={'17'} path={url + '/InvoiceElementList'}
               component={InvoiceElementList}/>,
        <Route key={'18'} path={url + '/InvoiceElementDetail'}
               component={InvoiceElementDetail}/>,
        <Route key={'19'} path={url + '/InvoiceElementEditor'}
               component={InvoiceElementEditor}/>,
        <Route key={'20'} path={url + '/InvoiceElementGroupList'}
               component={InvoiceElementGroupList}/>,
        <Route key={'21'} path={url + '/InvoiceElementGroupDetail'}
               component={InvoiceElementGroupDetail}/>,
        <Route key={'22'} path={url + '/InvoiceElementGroupEditor'}
               component={InvoiceElementGroupEditor}/>,
        <Route key={'23'} path={url + '/InvoiceTemplateList'}
               component={InvoiceTemplateList}/>,
        <Route key={'24'} path={url + '/InvoiceTemplateDetail'}
               component={InvoiceTemplateDetail}/>,
        <Route key={'25'} path={url + '/InvoiceTemplateEditor'}
               component={InvoiceTemplateEditor}/>,
        <Route key={'26'} path={url + '/TaxReceiptStatistics'}
               component={TaxReceiptStatistics}/>,
    ]
};
export default TaxReceiptCenterRoute;