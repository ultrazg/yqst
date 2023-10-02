import ApiConst from '../../../base/urls/ApiConst';
import FetchUtil from '../../../base/network/FetchUtil';
import ShopParams from '../PublicModule/ShopParams/ShopParams';
import AllUsePort from '../PublicModule/AllUsePort/AllUsePort';
import PublicParams from '../../../base/publicparams/PublicParams'
import ApiInterface from '../PublicModule/AllUsePort/AllUsePort'

let Model = {
    DownloadFile(pa, callback, error) {
        ShopParams((params) => {
            params = {
                ...params,
                ...pa,
            };
            FetchUtil.downloadImage(
                ApiConst.Versions().sunaw + AllUsePort.DownloadFile,
                params,
                callback,
                error,
                {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
            );
        });
    },
};
export default Model;
