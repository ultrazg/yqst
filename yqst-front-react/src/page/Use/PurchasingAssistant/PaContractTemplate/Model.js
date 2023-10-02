import ApiConst from '../../../../base/urls/ApiConst';
import FetchUtil from '../../../../base/network/FetchUtil';
import ShopParams from '../../PublicModule/ShopParams/ShopParams';
import AllUsePort from '../../PublicModule/AllUsePort/AllUsePort';
import PublicParams from '../../../../base/publicparams/PublicParams';

let Model = {
    ContractTPage(pa, callback, error) {
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.ContractTPage,
            {
                ...PublicParams(),
                ...pa,
            },
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    ContractTTPage(pa, callback, error) {
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.ContractTTPage,
            {
                ...PublicParams(),
                ...pa,
            },
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    ContractTTSave(pa, callback, error) {
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.ContractTTSave,
            {
                ...PublicParams(),
                ...pa,
            },
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    ContractTTDel(pa, callback, error) {
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.ContractTTDel,
            {
                ...PublicParams(),
                ...pa,
            },
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    ContractTAnalysis(pa, callback, error) {
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.ContractTAnalysis,
            {
                ...PublicParams(),
                ...pa,
            },
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    ContractTSave(pa, callback, error) {
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.ContractTSave,
            {
                ...PublicParams(),
                ...pa,
            },
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    ContractTInfo(pa, callback, error) {
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.ContractTInfo,
            {
                ...PublicParams(),
                ...pa,
            },
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    ContractTDel(pa, callback, error) {
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.ContractTDel,
            {
                ...PublicParams(),
                ...pa,
            },
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    ContractTUpdate(pa, callback, error) {
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.ContractTUpdate,
            {
                ...PublicParams(),
                ...pa,
            },
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
};
export default Model;
