import ApiConst from '../../../../base/urls/ApiConst';
import ApiInterface from '../../../../base/urls/ApiInterface';
import FetchUtil from '../../../../base/network/FetchUtil';
import PublicParams from '../../../../base/publicparams/PublicParams';

let model = {
    page(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.PersonalUserListPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    get(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.PersonalUserListGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    }
};
export default model;
