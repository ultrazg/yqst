import ApiConst from '../../base/urls/ApiConst';
import ApiInterface from '../../base/urls/ApiInterface';
import FetchUtil from '../../base/network/FetchUtil';
import PublicParams from '../../base/publicparams/PublicParams';

let Model = {
    GetErpInfo(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson( ApiConst.Versions().sunaw + ApiInterface.GetErpInfo,
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
    NewsModelIPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + ApiInterface.NewsModelIPage,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    NewsModelIHide(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson( ApiConst.Versions().sunaw + ApiInterface.NewsModelIHide,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    NewsModelUCount(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + ApiInterface.NewsModelUCount,
            FetchUtil.toQueryString(FetchUtil.signParam(params)),
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
}
export default Model;
