/**
 * Created by yb on 2019/09/16
 */

import ApiConst from '../../base/urls/ApiConst';
import ApiInterface from '../../base/urls/ApiInterface';
import FetchUtil from '../../base/network/FetchUtil';
import PublicParams from '../../base/publicparams/PublicParams';

let Model = {
    walletPRPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.walletPRPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    walletPRGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.walletPRGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    walletPCLList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.walletPCLList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    walletPRefundPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.walletPRefundPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    walletPRefundGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.walletPRefundGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    walletPAPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.walletPAPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    walletPAGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.walletPAGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    walletPAALList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.walletPAALList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    walletPALList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.walletPALList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    walletPAAPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.walletPAAPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    walletPAAGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.walletPAAGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    walletPACPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.walletPACPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    walletPACGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.walletPACGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    walletPSBPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.walletPSBPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    walletPSBGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.walletPSBGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    walletPBALList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.walletPBALList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    walletPBLList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.walletPBLList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    walletPSBAPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.walletPSBAPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    walletPSBAGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.walletPSBAGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    walletPSBCPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.walletPSBCPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    walletPSBCGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.walletPSBCGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    walletPCPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.walletPCPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    walletPCGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.walletPCGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    walletPSALList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.walletPSALList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    walletPCSave(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.walletPCSave,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    walletPCDelete(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.walletPCDelete,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    walletPPPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.walletPPPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    walletPPGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.walletPPGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    walletPPSave(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.walletPPSave,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    walletPPDelete(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.walletPPDelete,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
};
export default Model;