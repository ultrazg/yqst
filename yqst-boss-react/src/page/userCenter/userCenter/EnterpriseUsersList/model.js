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
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.EnterpriseUsersPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    get(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.EnterpriseUsersGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    // 获取行业列表
    EnterpriseUsersIndustryList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.EnterpriseUsersIndustryList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    getJurisdiction(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.EnterpriseUsersJurisdiction,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    // 获取角色详情
    EnterpriseUsersRoleGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.EnterpriseUsersRoleGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    // 获取权限组详情
    EnterpriseUsersGroupGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.EnterpriseUsersGroupGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    // 获取合作伙伴数据
    EnterpriseUsersPartnerGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.EnterpriseUsersPartnerGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    }
};
export default model;
