/**
 * Created by ljy on 2018/1/2
 */

import ApiConst from '../../../base/urls/ApiConst';
import ApiInterface from '../../../base/urls/ApiInterface';
import FetchUtil from '../../../base/network/FetchUtil';
import PublicParams from '../../../base/publicparams/PublicParams';
import BaseParamsXMOpp from '../../../base/publicparams/BaseParamsXMOpp';

let OpportunityModel = {
    boosLogin(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.boosLogin,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    getOpportunityUserList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        };
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.getOpportunityUserList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    getOpportunityExport(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + ApiInterface.getOpportunityExport,
            FetchUtil.toQueryString(FetchUtil.signParam(params)),
            callback,
            error
        );
    },

    getOpportunityClueList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        };
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.getOpportunityClueList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    getOpportunitySourceList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        };
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.getOpportunitySourceList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
};
export default OpportunityModel;