import ApiConst from '../../../../base/urls/ApiConst';
import FetchUtil from '../../../../base/network/FetchUtil';
import ShopParams from '../../PublicModule/ShopParams/ShopParams';
import AllUsePort from '../../PublicModule/AllUsePort/AllUsePort';
import PublicParams from '../../../../base/publicparams/PublicParams'
import ApiInterface from '../../PublicModule/AllUsePort/AllUsePort'

let Model = {
    openPlatformStatisticsGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.openPlatformStatisticsGet,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    openPlatformStatisticsServiceList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.openPlatformStatisticsServiceList,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    openPlatformCustomerList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.openPlatformCustomerList,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    openSunawServiceList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.openSunawServiceList,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    openStatisticsPaymentList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.openStatisticsPaymentList,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    openServicePaymentList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.openServicePaymentList,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    openAuthPlatformPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.openAuthPlatformPage,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    openSealPlatformPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.openSealPlatformPage,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
};
export default Model;
