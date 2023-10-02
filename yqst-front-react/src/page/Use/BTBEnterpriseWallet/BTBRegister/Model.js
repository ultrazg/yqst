import ApiConst from '../../../../base/urls/ApiConst';
import FetchUtil from '../../../../base/network/FetchUtil';
import AllUsePort from '../../PublicModule/AllUsePort/AllUsePort';
import PublicParams from '../../../../base/publicparams/PublicParams'

let Model = {
    btbApplyCompanyApply(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.btbApplyCompanyApply,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    btbMerchantsCompanyInfo(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.btbMerchantsCompanyInfo,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
};
export default Model;
