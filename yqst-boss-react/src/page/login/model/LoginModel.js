/**
 * Created by ljy on 2017/11/15
 */
import ApiConst from '../../../base/urls/ApiConst';
import ApiInterface from '../../../base/urls/ApiInterface';
import FetchUtil from '../../../base/network/FetchUtil';
import PublicParams from '../../../base/publicparams/PublicParams';

let LoginModel = {
    loginWithPsw(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.adminLogin,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    // loginWithCode(params, callback, error) {
    //     params = {
    //         ...PublicParams(),
    //         ...params
    //     }
    //     // FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.Login,
    //     //     FetchUtil.toQueryString(params), callback, error);
    // },
    // loginCode(params, callback, error) {
    //     params = {
    //         ...PublicParams(),
    //         ...params
    //     }
    //     FetchUtil.loadingTitle = 'undefined';
    //     // FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.LoginWithQrCode,
    //     //     FetchUtil.toQueryString(params), callback, error);
    // },
    // loginWithQrCode(params, callback, error) {
    //     params = {
    //         ...PublicParams(),
    //         ...params
    //     }
    //     FetchUtil.loadingTitle = 'undefined';
    //     // FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.LoginWithQrCode,
    //     //     FetchUtil.toQueryString(params), callback, error);
    // },
    // getLoginQrCode(params, callback, error) {
    //     params = {
    //         ...PublicParams(),
    //         ...params
    //     }
    //     FetchUtil.loadingTitle = 'undefined';
    //     // FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.getLoginQrCode,
    //     //     FetchUtil.toQueryString(params), callback, error);
    // }
}
export default LoginModel;