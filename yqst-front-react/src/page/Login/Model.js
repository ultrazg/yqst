import ApiConst from '../../base/urls/ApiConst';
import ApiInterface from '../../base/urls/ApiInterface';
import FetchUtil from '../../base/network/FetchUtil';
import PublicParams from '../../base/publicparams/PublicParams';

let Model = {
    LoginCode(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.LoginWithCode,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    Login(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        } // ApiConst.Versions().sunaw
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.Login,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    SMSCertification(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.SMSCertification,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    getLoginQrCode(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.loadingTitle = 'undefined';
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.getLoginQrCode,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    LoginWithQrCode(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.loadingTitle = 'undefined';
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.LoginWithQrCode,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    SetPassword(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.SetPassword,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    CheckPhone(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.loadingTitle = 'undefined';
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.CheckPhone,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    verifyCode(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.loadingTitle = 'undefined';
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.verifyCode,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    CheckPhoneReg(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.loadingTitle = 'undefined';
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.CheckPhoneReg,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    ForgetPswSetPassword(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.ForgetPswSetPassword,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    ScanQrCode(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.scanQrCode,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    CodeRegister(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.CodeRegister,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    SwitchEnterprise(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.switchEnterprise,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
}
export default Model;
