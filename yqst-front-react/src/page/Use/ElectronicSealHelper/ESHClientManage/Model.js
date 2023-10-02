import ApiConst from '../../../../base/urls/ApiConst';
import FetchUtil from '../../../../base/network/FetchUtil';
import ShopParams from '../../PublicModule/ShopParams/ShopParams';
import AllUsePort from '../../PublicModule/AllUsePort/AllUsePort';
import PublicParams from '../../../../base/publicparams/PublicParams'
import ApiInterface from '../../PublicModule/AllUsePort/AllUsePort'

let Model = {
    openPlatformCustomerPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.openPlatformCustomerPage,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    openPlatformCustomerGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.openPlatformCustomerGet,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    openCustomerPurchaseList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.openCustomerPurchaseList,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
};
export default Model;
