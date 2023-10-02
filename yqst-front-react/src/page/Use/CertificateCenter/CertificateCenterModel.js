import PublicParams from "../../../base/publicparams/PublicParams";
import FetchUtil from "../../../base/network/FetchUtil";
import ApiConst from "../../../base/urls/ApiConst";
import AllUsePort from '../PublicModule/AllUsePort/AllUsePort';

let CertificateCenterModel = {

    CertificateCenterList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.CertificateCenterList,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    }

};
export default CertificateCenterModel;
