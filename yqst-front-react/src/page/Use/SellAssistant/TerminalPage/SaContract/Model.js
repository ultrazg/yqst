import ApiConst from '../../../../../base/urls/ApiConst';
import FetchUtil from '../../../../../base/network/FetchUtil';
import ShopParams from '../../../PublicModule/ShopParams/ShopParams';
import AllUsePort from '../../../PublicModule/AllUsePort/AllUsePort';
import PublicParams from '../../../../../base/publicparams/PublicParams';

let Model = {
    ContractTPage(pa, callback, error) {
        ShopParams((params) => {
            params = {
                ...params,
                ...pa,
            };
            FetchUtil.fetchPostJson(
                ApiConst.Versions().sunaw + AllUsePort.ContractTPage,
                params,
                callback,
                error,
                {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
            );
        });
    },
    ContractTTPage(pa, callback, error) {
        ShopParams((params) => {
            params = {
                ...params,
                ...pa,
            };
            FetchUtil.fetchPostJson(
                ApiConst.Versions().sunaw + AllUsePort.ContractTTPage,
                params,
                callback,
                error,
                {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
            );
        });
    },
    ContractTTSave(pa, callback, error) {
        ShopParams((params) => {
            params = {
                ...params,
                ...pa,
            };
            FetchUtil.fetchPostJson(
                ApiConst.Versions().sunaw + AllUsePort.ContractTTSave,
                params,
                callback,
                error,
                {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
            );
        });
    },
    ContractTTDel(pa, callback, error) {
        ShopParams((params) => {
            params = {
                ...params,
                ...pa,
            };
            FetchUtil.fetchPostJson(
                ApiConst.Versions().sunaw + AllUsePort.ContractTTDel,
                params,
                callback,
                error,
                {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
            );
        });
    },
    ContractTAnalysis(pa, callback, error) {
        ShopParams((params) => {
            params = {
                ...params,
                ...pa,
            };
            FetchUtil.fetchPostJson(
                ApiConst.Versions().sunaw + AllUsePort.ContractTAnalysis,
                params,
                callback,
                error,
                {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
            );
        });
    },
    ContractTSave(pa, callback, error) {
        ShopParams((params) => {
            params = {
                ...params,
                ...pa,
            };
            FetchUtil.fetchPostJson(
                ApiConst.Versions().sunaw + AllUsePort.ContractTSave,
                params,
                callback,
                error,
                {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
            );
        });
    },
    ContractTInfo(pa, callback, error) {
        ShopParams((params) => {
            params = {
                ...params,
                ...pa,
            };
            FetchUtil.fetchPostJson(
                ApiConst.Versions().sunaw + AllUsePort.ContractTInfo,
                params,
                callback,
                error,
                {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
            );
        });
    },
    ContractTDel(pa, callback, error) {
        ShopParams((params) => {
            params = {
                ...params,
                ...pa,
            };
            FetchUtil.fetchPostJson(
                ApiConst.Versions().sunaw + AllUsePort.ContractTDel,
                params,
                callback,
                error,
                {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
            );
        });
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
