/**
 * Created by yb
 */

import ApiConst from '../../../base/urls/ApiConst';
import ApiInterface from '../../../base/urls/ApiInterface';
import FetchUtil from '../../../base/network/FetchUtil';
import PublicParams from '../../../base/publicparams/PublicParams';

let Model = {
    ContractPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.ContractPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    GetCustomerPageList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.GetCustomerPageList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    GetCustomerDetail(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.GetCustomerDetail,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    GetCustomerPurchaseList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.GetCustomerPurchaseList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    GetPlatformList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.GetPlatformList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },


};
export default Model;