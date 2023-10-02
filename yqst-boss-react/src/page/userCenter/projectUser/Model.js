import ApiConst from '../../../base/urls/ApiConst';
import ApiInterface from '../../../base/urls/ApiInterface';
import FetchUtil from '../../../base/network/FetchUtil';
import PublicParams from '../../../base/publicparams/PublicParams';

let Model = {
    UserProjectPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UserProjectPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    UserProjectGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UserProjectGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    UserProjectRelation(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UserProjectRelation,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
}

export default Model;
