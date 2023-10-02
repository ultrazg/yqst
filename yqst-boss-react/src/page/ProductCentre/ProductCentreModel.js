import PublicParams from "../../base/publicparams/PublicParams";
import FetchUtil from "../../base/network/FetchUtil";
import ApiConst from "../../base/urls/ApiConst";
import ApiInterface from "../../base/urls/ApiInterface";

let ProductCentreModel = {
    /**
     * 平台产品
     */
    ProductList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + ApiInterface.PlatformProductList,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    ProductGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + ApiInterface.PlatformProductGet,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    ProductAdd(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + ApiInterface.PlatformProductAdd,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    ProductUpdate(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + ApiInterface.PlatformProductUpdate,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    ProductDel(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + ApiInterface.PlatformProductDel,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    ProductBatchDel(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + ApiInterface.PlatformProductBatchDel,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    ProductEnable(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + ApiInterface.PlatformProductEnable,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    ProductDisable(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + ApiInterface.PlatformProductDisable,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    /**
     * 平台产品类目
     */
    CategoryList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + ApiInterface.PlatformClassList,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    CategorySave(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + ApiInterface.PlatformClassSave,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    CategoryDel(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + ApiInterface.PlatformClassDel,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    CategoryEnable(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + ApiInterface.PlatformClassEnable,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    /**
     * 平台产品申请
     */
    ApplyList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + ApiInterface.PlatformProductApplyList,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    ApplyDetail(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + ApiInterface.PlatformProductApplyGet,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    ApplyAgree(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + ApiInterface.PlatformProductApplyAgree,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    ApplyReject(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + ApiInterface.PlatformProductApplyReject,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    /**
     * 平台产品关联
     */
    CorrelationPlatformGoodsList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + ApiInterface.PlatformProductPlatformGoodsList,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    CorrelationErpGoodsList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + ApiInterface.PlatformProductErpGoodsList,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    CorrelationErpGoodsGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + ApiInterface.PlatformCompanyErpGet,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },

}
export default ProductCentreModel;
