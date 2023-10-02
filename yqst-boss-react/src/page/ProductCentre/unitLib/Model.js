import ApiConst from '../../../base/urls/ApiConst';
import ApiInterface from '../../../base/urls/ApiInterface';
import FetchUtil from '../../../base/network/FetchUtil';
import PublicParams from '../../../base/publicparams/PublicParams';

let Model = {
    UnitPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.PlatformUnitPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    UnitEnable(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UnitEnable,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    UnitDisable(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UnitDisable,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    UnitDelete(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UnitDelete,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    UnitSave(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UnitSave,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
}

export default Model;
