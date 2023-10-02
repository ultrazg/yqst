import PublicParams from "../../base/publicparams/PublicParams";
import FetchUtil from "../../base/network/FetchUtil";
import ApiConst from "../../base/urls/ApiConst";
import ApiInterface from "../../base/urls/ApiInterface";

let MaterialCenterModel = {
    /**
     * 平台产品
     */
    ProductList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + ApiInterface.MaterialsCenterProductList,
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
            ApiConst.Versions().sunaw + ApiInterface.MaterialsCenterProductGet,
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
            ApiConst.Versions().sunaw + ApiInterface.MaterialsCenterProductAdd,
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
            ApiConst.Versions().sunaw + ApiInterface.MaterialsCenterProductUpdate,
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
            ApiConst.Versions().sunaw + ApiInterface.MaterialsCenterProductDel,
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
            ApiConst.Versions().sunaw + ApiInterface.MaterialsCenterProductBatchDel,
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
            ApiConst.Versions().sunaw + ApiInterface.MaterialsCenterProductEnable,
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
            ApiConst.Versions().sunaw + ApiInterface.MaterialsCenterProductDisable,
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
            ApiConst.Versions().sunaw + ApiInterface.MaterialsCenterClassList,
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
            ApiConst.Versions().sunaw + ApiInterface.MaterialsCenterClassSave,
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
            ApiConst.Versions().sunaw + ApiInterface.MaterialsCenterClassDel,
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
            ApiConst.Versions().sunaw + ApiInterface.MaterialsCenterClassEnable,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    // /**
    //  * 平台产品申请
    //  */
    // ApplyList(params, callback, error) {
    //     params = {
    //         ...PublicParams(),
    //         ...params
    //     }
    //     FetchUtil.fetchPostJson(
    //         ApiConst.Versions().sunaw + ApiInterface.PlatformProductApplyList,
    //         params,
    //         callback,
    //         error,
    //         {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
    //     );
    // },
    // ApplyDetail(params, callback, error) {
    //     params = {
    //         ...PublicParams(),
    //         ...params
    //     }
    //     FetchUtil.fetchPostJson(
    //         ApiConst.Versions().sunaw + ApiInterface.PlatformProductApplyGet,
    //         params,
    //         callback,
    //         error,
    //         {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
    //     );
    // },
    // ApplyAgree(params, callback, error) {
    //     params = {
    //         ...PublicParams(),
    //         ...params
    //     }
    //     FetchUtil.fetchPostJson(
    //         ApiConst.Versions().sunaw + ApiInterface.PlatformProductApplyAgree,
    //         params,
    //         callback,
    //         error,
    //         {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
    //     );
    // },
    // ApplyReject(params, callback, error) {
    //     params = {
    //         ...PublicParams(),
    //         ...params
    //     }
    //     FetchUtil.fetchPostJson(
    //         ApiConst.Versions().sunaw + ApiInterface.PlatformProductApplyReject,
    //         params,
    //         callback,
    //         error,
    //         {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
    //     );
    // },
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

    //选择关联产品
    MaterialsCenterPlatformGoodsSelecct(params, callback, error) {

        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + ApiInterface.MaterialsCenterPlatformGoodsSelecct,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    //选择副单位列表
    MaterialsCenterConvertUntitSelect(params, callback, error) {

        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + ApiInterface.MaterialsCenterConvertUntitSelect,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
}

export default MaterialCenterModel;
