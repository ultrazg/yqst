/**
 * Created by yb on 2019/10/23
 */
import ApiConst from '../../base/urls/ApiConst';
import ApiInterface from '../../base/urls/ApiInterface';
import FetchUtil from '../../base/network/FetchUtil';
import PublicParams from '../../base/publicparams/PublicParams';

let Model = {
    UserAttSList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UserAttSList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    UserAttSBigList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UserAttSBigList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    UserAttDPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UserAttDPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    UserAttDGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UserAttDGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    UserAttDDelete(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UserAttDDelete,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    UserAttDUpdate(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UserAttDUpdate,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    UserAttDPGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UserAttDPGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    UserAttDocPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UserAttDocPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    UserAttDocGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UserAttDocGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    UserAttDocDel(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UserAttDocDel,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    UserAttDocSave(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UserAttDocSave,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    UserAttDGSPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UserAttDGSPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    UserAttDGGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UserAttDGGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    UserAttDGDel(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UserAttDGDel,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    UserAttDGSave(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UserAttDGSave,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    UserAttDocPPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UserAttDocPPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    UserAttDocPGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UserAttDocPGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    UserAttDocPDel(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UserAttDocPDel,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    UserAttDocPSave(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UserAttDocPSave,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    UserAttDRPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UserAttDRPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    UserAttDRGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UserAttDRGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    UserAttDRDel(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UserAttDRDel,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    UserAttDRSave(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UserAttDRSave,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    UserAttDRSModify(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UserAttDRSModify,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
};
export default Model;
