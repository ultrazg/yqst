import PublicParams from "../../../base/publicparams/PublicParams";
import FetchUtil from "../../../base/network/FetchUtil";
import ApiConst from "../../../base/urls/ApiConst";
import ApiInterface from "../../../base/urls/ApiInterface";
import BaseParamsUnionpay from "../../../base/publicparams/BaseParamsUnionpay";

/**
 * Created by ljy on 2019-01-11
 */
let UnionpayModel = {
    UnionpayLogin(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().unionpay + ApiInterface.UnionpayLogin,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    //示例
    // xxxxx(pa, callback, error) {
    //     BaseParamsUnionpay((params) => {
    //         params = {
    //             ...params,
    //             ...pa
    //         }
    //         FetchUtil.fetchPostJson(ApiConst.Versions().unionpay + ApiInterface.UnionpayLogin,
    //             FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    //     });
    // },
    getServiceList(pa, callback, error) {
        BaseParamsUnionpay((params) => {
            params = {
                ...params,
                ...pa
            }
            FetchUtil.fetchPostJson(ApiConst.Versions().unionpay + ApiInterface.getServiceList,
                FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
        });
    },
    getServiceUpdate(pa, callback, error) {
        BaseParamsUnionpay((params) => {
            params = {
                ...params,
                ...pa
            }
            FetchUtil.fetchPostJson(ApiConst.Versions().unionpay + ApiInterface.getServiceUpdate,
                FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
        });
    }, getOtherInfo(pa, callback, error) {
        BaseParamsUnionpay((params) => {
            params = {
                ...params,
                ...pa
            }
            FetchUtil.fetchPostJson(ApiConst.Versions().unionpay + ApiInterface.getOtherInfo,
                FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
        });
    }, getOtherSave(pa, callback, error) {
        BaseParamsUnionpay((params) => {
            params = {
                ...params,
                ...pa
            }
            FetchUtil.fetchPostJson(ApiConst.Versions().unionpay + ApiInterface.getOtherSave,
                FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
        });
    }, getMerchantPage(pa, callback, error) {
        BaseParamsUnionpay((params) => {
            params = {
                ...params,
                ...pa
            }
            FetchUtil.fetchPostJson(ApiConst.Versions().unionpay + ApiInterface.getMerchantPage,
                FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
        });
    }, getAppealPage(pa, callback, error) {
        BaseParamsUnionpay((params) => {
            params = {
                ...params,
                ...pa
            }
            FetchUtil.fetchPostJson(ApiConst.Versions().unionpay + ApiInterface.getAppealPage,
                FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
        });
    }, getAppealDictionaryList(pa, callback, error) {
        BaseParamsUnionpay((params) => {
            params = {
                ...params,
                ...pa
            }
            FetchUtil.fetchPostJson(ApiConst.Versions().unionpay + ApiInterface.getAppealDictionaryList,
                FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
        });
    }, getAppealDetails(pa, callback, error) {
        BaseParamsUnionpay((params) => {
            params = {
                ...params,
                ...pa
            }
            FetchUtil.fetchPostJson(ApiConst.Versions().unionpay + ApiInterface.getAppealDetails,
                FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
        });
    }, getMerchantDetails(pa, callback, error) {
        BaseParamsUnionpay((params) => {
            params = {
                ...params,
                ...pa
            }
            FetchUtil.fetchPostJson(ApiConst.Versions().unionpay + ApiInterface.getMerchantDetails,
                FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
        });
    }, getMerchantTerminalSave(pa, callback, error) {
        BaseParamsUnionpay((params) => {
            params = {
                ...params,
                ...pa
            }
            FetchUtil.fetchPostJson(ApiConst.Versions().unionpay + ApiInterface.getMerchantTerminalSave,
                FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
        });
    }, getMerchantTerminalDelete(pa, callback, error) {
        BaseParamsUnionpay((params) => {
            params = {
                ...params,
                ...pa
            }
            FetchUtil.fetchPostJson(ApiConst.Versions().unionpay + ApiInterface.getMerchantTerminalDelete,
                FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
        });
    }, getAppealLogList(pa, callback, error) {
        BaseParamsUnionpay((params) => {
            params = {
                ...params,
                ...pa
            }
            FetchUtil.fetchPostJson(ApiConst.Versions().unionpay + ApiInterface.getAppealLogList,
                FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
        });
    }, getAppealDeal(pa, callback, error) {
        BaseParamsUnionpay((params) => {
            params = {
                ...params,
                ...pa
            }
            FetchUtil.fetchPostJson(ApiConst.Versions().unionpay + ApiInterface.getAppealDeal,
                FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
        });
    }, getExpressSend(pa, callback, error) {
        BaseParamsUnionpay((params) => {
            params = {
                ...params,
                ...pa
            }
            FetchUtil.fetchPostJson(ApiConst.Versions().unionpay + ApiInterface.getExpressSend,
                FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
        });
    }, getAppealExpressGet(pa, callback, error) {
        BaseParamsUnionpay((params) => {
            params = {
                ...params,
                ...pa
            }
            FetchUtil.fetchPostJson(ApiConst.Versions().unionpay + ApiInterface.getAppealExpressGet,
                FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
        });
    },
    GetDownloadZipUrl(pa, response, error) {
        let params = {
            ...PublicParams(),
            ...pa
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.GetDownloadZipUrl,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), response, error);
    },
    UnionpayContractDownload(pa, response, error) {
        let params = {
            ...PublicParams(),
            ...pa
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UnionpayContractDownload,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), response, error);
    },
    boosLogin(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().opportunity + ApiInterface.boosLogin,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
}
export default UnionpayModel;
