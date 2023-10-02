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

    // 平台数据统计
    GetPlatformDataStatistics(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.GetPlatformDataStatistics,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // 获取客户管理列表
    GetCustomerList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.GetCustomerList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // 获取终端企业使用数据
    GetUseDateList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.GetUseDateList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // 获取终端企业付费数据
    GetPayDateList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.GetPayDateList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // 获取平台列表
    GetPlatformList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.GetPlatformList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // 获取服务列表
    GetServiceList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.GetServiceList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // 获取平台分页列表
    GetPlatformForPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.GetPlatformForPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // 获取平台服务列表
    GetPlatformServiceList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.GetPlatformServiceList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // 获取付费数据分页列表
    GetPaymentPageList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.GetPaymentPageList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // 获取企业付费分页列表
    GetPaymentDetailPageList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.GetPaymentDetailPageList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // 认证服务使用明细分页列表
    GetAuthPageList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.GetAuthPageList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // 印章服务使用明细分页列表
    GetSealPageList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.GetSealPageList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

};
export default Model;