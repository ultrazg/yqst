import ApiConst from '../../../../../base/urls/ApiConst';
import FetchUtil from '../../../../../base/network/FetchUtil';
import ShopParams from '../../../PublicModule/ShopParams/ShopParams';
import AllUsePort from '../../../PublicModule/AllUsePort/AllUsePort';

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
};
export default Model;
