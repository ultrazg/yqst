import ApiConst from '../../../../base/urls/ApiConst';
import FetchUtil from '../../../../base/network/FetchUtil';
import AllUsePort from '../../PublicModule/AllUsePort/AllUsePort';
import PublicParams from '../../../../base/publicparams/PublicParams'

let Model = {
    DownloadFile(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        };
        FetchUtil.downloadImage(
            ApiConst.Versions().sunaw + AllUsePort.DownloadFile,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
};
export default Model;
