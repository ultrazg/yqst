/**
 * Created by yb
 */

import ApiConst from '../../../base/urls/ApiConst';
import ApiInterface from '../../../base/urls/ApiInterface';
import FetchUtil from '../../../base/network/FetchUtil';
import PublicParams from '../../../base/publicparams/PublicParams';

let Model = {
    ESPlatformApplyPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.ESPlatformApplyPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    ESPlatformApplyGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.ESPlatformApplyGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    ESPlatformApplyAgree(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.ESPlatformApplyAgree,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    ESPlatformApplyReject(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.ESPlatformApplyReject,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
};
export default Model;