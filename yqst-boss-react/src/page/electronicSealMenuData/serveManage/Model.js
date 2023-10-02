/**
 * Created by yb
 */

import ApiConst from '../../../base/urls/ApiConst';
import ApiInterface from '../../../base/urls/ApiInterface';
import FetchUtil from '../../../base/network/FetchUtil';
import PublicParams from '../../../base/publicparams/PublicParams';

let Model = {
    ContractPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.ContractPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // 服务规则分页列表
    GetServiceRuleList(params, callback, error){
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.GetServiceRuleList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // 服务规则详情
    GetServiceRuleDetail(params, callback, error){
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.GetServiceRuleDetail,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // 添加或修改服务规则
    AddOrEditServiceRule(params, callback, error){
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.AddOrEditServiceRule,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // 删除指定的服务规则
    DeleteServiceRule(params, callback, error){
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.DeleteServiceRule,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // 获取spu商品列表
    GetServiceGoodsList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.GetServiceGoodsList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // sku
    GetServiceGoodsDetail(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.GetServiceGoodsDetail,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // 服务列表
    GetServiceList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.GetServiceList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // 服务实例分页列表
    GetServiceInstanceList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.GetServiceInstanceList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // 服务实例详情
    GetServiceInstanceDetail(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.GetServiceInstanceDetail,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // 服务实例使用记录列表
    GetServiceInstanceLog(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.GetServiceInstanceLog,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

};
export default Model;