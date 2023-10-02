/**
 * Created by yb on 2019/05/24
 */
import ApiConst from '../../../base/urls/ApiConst';
import ApiInterface from '../../../base/urls/ApiInterface';
import FetchUtil from '../../../base/network/FetchUtil';
import PublicParams from '../../../base/publicparams/PublicParams';

let IndexModel = {
    xtAdminUpdate(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.xtAdminUpdate,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
};
export default IndexModel;
