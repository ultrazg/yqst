import ApiConst from '../../../base/urls/ApiConst';
import FetchUtil from '../../../base/network/FetchUtil';
import ElectronicSealParams from '../PublicModule/ElectronicSealParams/ElectronicSealParams';
import AllUsePort from '../PublicModule/AllUsePort/AllUsePort';
import PublicParams from '../../../base/publicparams/PublicParams'

let Model = {
    openPlatformApplyGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.openPlatformApplyGet,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    openPlatformApplyAdd(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.openPlatformApplyAdd,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
};
export default Model;
