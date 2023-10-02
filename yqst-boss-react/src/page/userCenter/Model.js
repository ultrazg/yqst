/**
 * Created by yb on 2019/10/24
 */
import ApiConst from '../../base/urls/ApiConst';
import ApiInterface from '../../base/urls/ApiInterface';
import FetchUtil from '../../base/network/FetchUtil';
import PublicParams from '../../base/publicparams/PublicParams';

let Model = {
    UserLLPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UserLLPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    UserOLPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UserOLPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    UserPPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UserPPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    UserPGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UserPGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    UserAPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UserAPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    UserAGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UserAGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    UserEBGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UserEBGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    UserEPGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UserEPGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    UserARGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UserARGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    UserAAGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UserAAGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    UserProjectAddressPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UserProjectAddressPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    UserProjectSupplier(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UserProjectSupplier,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
};
export default Model;
