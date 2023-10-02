/**
 * Created by yb on 2019/11/08
 */

import ApiConst from '../../base/urls/ApiConst';
import ApiInterface from '../../base/urls/ApiInterface';
import FetchUtil from '../../base/network/FetchUtil';
import PublicParams from '../../base/publicparams/PublicParams';

let Model = {
    SystemSetupAList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.SystemSetupAList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    SystemSetupASave(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.SystemSetupASave,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    SystemSetupADelete(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.SystemSetupADelete,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    SystemSetupAUpdate(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.SystemSetupAUpdate,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    SystemSetupASWPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.SystemSetupASWPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    SystemSetupASWDelete(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.SystemSetupASWDelete,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    SystemSetupASWSave(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.SystemSetupASWSave,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    SystemSetupASWUpload(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.SystemSetupASWUpload,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    SystemSetupASWExport(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.SystemSetupASWExport,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
};
export default Model;