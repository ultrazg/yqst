/**
 * Created by yb on 2019/09/27
 */

import ApiConst from '../../base/urls/ApiConst';
import ApiInterface from '../../base/urls/ApiInterface';
import FetchUtil from '../../base/network/FetchUtil';
import PublicParams from '../../base/publicparams/PublicParams';

let Model = {
    InvoiceIPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.InvoiceIPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    InvoiceIGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.InvoiceIGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    InvoiceILog(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.InvoiceILog,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    InvoiceRPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.InvoiceRPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    InvoiceRGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.InvoiceRGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    InvoiceBAPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.InvoiceBAPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    InvoiceBAGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.InvoiceBAGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    InvoiceMULog(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.InvoiceMULog,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    InvoiceMALog(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.InvoiceMALog,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    InvoiceRAPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.InvoiceRAPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    InvoiceRAGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.InvoiceRAGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    InvoiceBPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.InvoiceBPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    InvoiceBGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.InvoiceBGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    InvoiceRedPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.InvoiceRedPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    InvoiceRedGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.InvoiceRedGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    InvoiceSPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.InvoiceSPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    InvoiceSGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.InvoiceSGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    InvoiceSLGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.InvoiceSLGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    InvoiceBLog(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.InvoiceBLog,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    InvoiceCPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.InvoiceCPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    InvoiceCGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.InvoiceCGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    InvoiceCSave(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.InvoiceCSave,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    InvoiceCDelete(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.InvoiceCDelete,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    InvoiceEPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.InvoiceEPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    InvoiceEGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.InvoiceEGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    InvoiceESave(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.InvoiceESave,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    InvoiceEDelete(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.InvoiceEDelete,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    InvoiceEGPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.InvoiceEGPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    InvoiceEGGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.InvoiceEGGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    InvoiceEGSave(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.InvoiceEGSave,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    InvoiceEGDelete(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.InvoiceEGDelete,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    InvoiceTPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.InvoiceTPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    InvoiceTGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.InvoiceTGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    InvoiceTSave(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.InvoiceTSave,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    InvoiceTDelete(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.InvoiceTDelete,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
};
export default Model;