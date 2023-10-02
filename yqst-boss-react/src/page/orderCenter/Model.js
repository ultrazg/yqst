/**
 * Created by yb on 2019/09/12
 */

import ApiConst from '../../base/urls/ApiConst';
import ApiInterface from '../../base/urls/ApiInterface';
import FetchUtil from '../../base/network/FetchUtil';
import PublicParams from '../../base/publicparams/PublicParams';

let Model = {
    OrderSPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.OrderSPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    OrderSGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.OrderSGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    OrderASPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.OrderASPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    OrderASGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.OrderASGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    OrderASLList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.OrderASLList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    OrderPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.OrderPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    OrderGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.OrderGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    OrderLList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.OrderLList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    OrderDPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.OrderDPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    OrderDGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.OrderDGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    OrderWLList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.OrderWLList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    OrderSRPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.OrderSRPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    OrderSRGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.OrderSRGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
};
export default Model;