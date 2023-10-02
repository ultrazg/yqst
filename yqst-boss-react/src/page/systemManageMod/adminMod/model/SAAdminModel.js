import ApiConst from '../../../../base/urls/ApiConst';
import ApiInterface from '../../../../base/urls/ApiInterface';
import FetchUtil from '../../../../base/network/FetchUtil';
import PublicParams from '../../../../base/publicparams/PublicParams';

let SAAdminModel = {
    xtAdminList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.xtAdminList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    xtAdminSave(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.xtAdminSave,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    xtAdminDelete(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.xtAdminDelete,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    xtAdminUpdate(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.xtAdminUpdate,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
};
export default SAAdminModel;
