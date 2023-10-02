/**
 * Created by yb on 2019/09/03
 */
import ApiConst from '../../base/urls/ApiConst';
import ApiInterface from '../../base/urls/ApiInterface';
import FetchUtil from '../../base/network/FetchUtil';
import PublicParams from '../../base/publicparams/PublicParams';

let Model = {
    SellerGPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.SellerGPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    SellerGGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.SellerGGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    SellerGLList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.SellerGLList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    SellerGCPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.SellerGCPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    SellerGCGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.SellerGCGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    ShopGPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.ShopGPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    ShopGGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.ShopGGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    ShopGLList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.ShopGLList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    ShopGCPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.ShopGCPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    ShopGCGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.ShopGCGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    ShopGTPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.ShopGTPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    ShopPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.ShopPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    ShopGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.ShopGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    }
};
export default Model;