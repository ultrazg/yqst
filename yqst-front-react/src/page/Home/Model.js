import ApiConst from '../../base/urls/ApiConst';
import ApiInterface from '../../base/urls/ApiInterface';
import FetchUtil from '../../base/network/FetchUtil';
import PublicParams from '../../base/publicparams/PublicParams';


let Model = {
    AutoLogin(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.AutoLogin,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    CreatEnterprise(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.CreatEnterprise,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    SwitchEnterprise(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.switchEnterprise,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    UserIList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UserIList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    AppyToJoinComp(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.appyToJoinComp,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    GetErpInfo(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.GetErpInfo,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    getUserInfo(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.getUserInfo,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    GetStaffInfo(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.GetStaffInfo,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    NewsModelIList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + ApiInterface.NewsModelIList,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    NewsModelUCount(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.loadingTitle = 'undefined';
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + ApiInterface.NewsModelUCount,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
};
export default Model;
