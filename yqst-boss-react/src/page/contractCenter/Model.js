/**
 * Created by yb on 2019/09/25
 */

import ApiConst from '../../base/urls/ApiConst';
import ApiInterface from '../../base/urls/ApiInterface';
import FetchUtil from '../../base/network/FetchUtil';
import PublicParams from '../../base/publicparams/PublicParams';

let Model = {
    ContractPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.ContractPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    ContractGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.ContractGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    ContractLList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.ContractLList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    ContractAPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.ContractAPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    ContractPPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.ContractPPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    ContractPGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.ContractPGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    ContractPLList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.ContractPLList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
};
export default Model;