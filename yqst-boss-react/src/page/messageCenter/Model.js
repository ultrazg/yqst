/**
 * Created by yb on 2019/08/30
 */
import ApiConst from '../../base/urls/ApiConst';
import ApiInterface from '../../base/urls/ApiInterface';
import FetchUtil from '../../base/network/FetchUtil';
import PublicParams from '../../base/publicparams/PublicParams';

let Model = {
    MesInfoPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.MesInfoPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    MesInfoCList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.MesInfoCList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    MesInfoGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.MesInfoGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    MesInfoTPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.MesInfoTPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    MesInfoTGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.MesInfoTGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    MesInfoTSave(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.MesInfoTSave,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    MesInfoRPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.MesInfoRPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    MesInfoRGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.MesInfoRGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    MesInfoRLGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.MesInfoRLGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    }
}
export default Model;