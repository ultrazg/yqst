import ApiConst from '../../../base/urls/ApiConst';
import ApiInterface from '../../../base/urls/ApiInterface';
import FetchUtil from '../../../base/network/FetchUtil';
import PublicParams from '../../../base/publicparams/PublicParams';

let Model = {
    LessorInitPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson( ApiConst.Versions().sunaw + ApiInterface.LessorInitPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    LesseeInitPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson( ApiConst.Versions().sunaw + ApiInterface.LesseeInitPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    LeaseGoodsPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson( ApiConst.Versions().sunaw + ApiInterface.LeaseGoodsPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    LesseeAllPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson( ApiConst.Versions().sunaw + ApiInterface.LesseeAllPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    LessorUsePage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson( ApiConst.Versions().sunaw + ApiInterface.LessorUsePage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    LessorInitAdd(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson( ApiConst.Versions().sunaw + ApiInterface.LessorInitAdd,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    InitDetailGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson( ApiConst.Versions().sunaw + ApiInterface.InitDetailGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    LessorInitUpdate(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson( ApiConst.Versions().sunaw + ApiInterface.LessorInitUpdate,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    LessorInitSubmit(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson( ApiConst.Versions().sunaw + ApiInterface.LessorInitSubmit,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    LesseeInitConfirm(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson( ApiConst.Versions().sunaw + ApiInterface.LesseeInitConfirm,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    LesseeInitReject(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson( ApiConst.Versions().sunaw + ApiInterface.LesseeInitReject,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    LesseeUseProjectPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson( ApiConst.Versions().sunaw + ApiInterface.LesseeUseProjectPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    LesseeGoodsPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson( ApiConst.Versions().sunaw + ApiInterface.LesseeGoodsPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    LesseeAddInit(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson( ApiConst.Versions().sunaw + ApiInterface.LesseeAddInit,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    LesseeInitUpdate(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson( ApiConst.Versions().sunaw + ApiInterface.LesseeInitUpdate,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    LessorInitConfirm(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson( ApiConst.Versions().sunaw + ApiInterface.LessorInitConfirm,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    LessorInitReject(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson( ApiConst.Versions().sunaw + ApiInterface.LessorInitReject,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    LessorAllPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson( ApiConst.Versions().sunaw + ApiInterface.LessorAllPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    LesseeSkuPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson( ApiConst.Versions().sunaw + ApiInterface.LesseeSkuPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    InitConfGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson( ApiConst.Versions().sunaw + ApiInterface.InitConfGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
}

export default Model;
