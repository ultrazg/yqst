/**
 * Created by yb
 */

import ApiConst from '../../base/urls/ApiConst';
import ApiInterface from '../../base/urls/ApiInterface';
import FetchUtil from '../../base/network/FetchUtil';
import PublicParams from '../../base/publicparams/PublicParams';

let Model = {
    OrderSPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.OrderSPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // 平台获取企业商户列表
    GetCompanyPageList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.GetCompanyPageList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // 平台获取企业商户详情
    GetCompanyInfo(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.GetCompanyInfo,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // 平台获取个人商户列表
    GetPersonalPageList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.GetPersonalPageList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // 平台获取个人商户详情
    GetPersonalInfo(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.GetPersonalInfo,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // 启用商户
    MerchantsEnable(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.MerchantsEnable,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // 禁用商户
    MerchantsForbidden(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.MerchantsForbidden,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // 获取企业商户申请列表
    GetApplyCompanyPageList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.GetApplyCompanyPageList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // 获取个人商户申请列表
    GetApplyPersonalPageList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.GetApplyPersonalPageList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // 获取企业商户申请列表详情
    GetApplyCompanyInfo(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.GetApplyCompanyInfo,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // 获取个人商户申请列表详情
    GetApplyPersonalInfo(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.GetApplyPersonalInfo,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // 同意企业商户申请
    ApprovedCompanyApply(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.ApprovedCompanyApply,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // 拒绝企业商户申请
    RefuseCompanyApply(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.RefuseCompanyApply,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // 同意个人商户申请
    ApprovedPersonalApply(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.ApprovedPersonalApply,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // 拒绝个人商户申请
    RefusePersonalApply(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.RefusePersonalApply,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // 支付通道分页列表
    GetChannelPageList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.GetChannelPageList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // 支付通道分页列表
    GetChannelOptionList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.GetChannelList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // 支付通道详情
    GetChannelInfo(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.GetChannelInfo,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // 启用支付通道
    EnableChannel(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.EnableChannel,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // 禁用支付通道
    ForbiddenChannel(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.ForbiddenChannel,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // 方案分页列表
    GetPayPlanPageList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.GetPayPlanPageList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // 方案详情
    GetPayPlanInfo(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.GetPayPlanInfo,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // 获取方案列表
    GetPayPlanList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.GetPayPlanList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // 新增或修改支付方案
    AddOrEditPayPlanInfo(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.AddOrEditPayPlanInfo,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },


    // 费率分页列表
    GetRatePageList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.GetRatePageList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // 费率详情
    GetRateInfo(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.GetRateInfo,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // 费率列表
    GetRateList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.GetRateList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // 新增或修改支付费率
    AddOrEditRate(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.AddOrEditRate,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // 限额分页列表
    GetLimitPageList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.GetLimitPageList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // 限额详情
    GetLimitInfo(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.GetLimitInfo,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // 限额列表
    GetLimitList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.GetLimitList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // 新增或修改限额
    AddOrEditLimit(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.AddOrEditLimit,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // 修改商户支付方案
    UpdatePayPlan(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UpdatePayPlan,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

};
export default Model;