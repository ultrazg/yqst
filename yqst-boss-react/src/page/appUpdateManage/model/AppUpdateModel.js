/**
 * Created by ljy on 2018/4/18
 */
import ApiConst from '../../../base/urls/ApiConst';
import ApiInterface from '../../../base/urls/ApiInterface';
import FetchUtil from '../../../base/network/FetchUtil';
import PublicParams from '../../../base/publicparams/PublicParams';

let AppUpdateModel = {
    getAppUpdateList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.appUpdateList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    appUpdateInfo(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.appUpdateInfo,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    }
}
export default AppUpdateModel;