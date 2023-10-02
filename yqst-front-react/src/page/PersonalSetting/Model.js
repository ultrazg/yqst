import ApiConst from '../../base/urls/ApiConst';
import ApiInterface from '../../base/urls/ApiInterface';
import FetchUtil from '../../base/network/FetchUtil';
import PublicParams from '../../base/publicparams/PublicParams';

let Model = {
    CheckYQSTAuth(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson( ApiConst.Versions().sunaw + ApiInterface.CheckYQSTAuth,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    AuthInfoModuleGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson( ApiConst.Versions().sunaw + ApiInterface.AuthInfoModuleGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    AuthInfoSave(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson( ApiConst.Versions().sunaw + ApiInterface.AuthInfoSave,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    AuthManageDetail(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson( ApiConst.Versions().sunaw + ApiInterface.AuthManageDetail,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    getUserInfo(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson( ApiConst.Versions().sunaw + ApiInterface.getUserInfo,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    ModifyPersonalIcon(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson( ApiConst.Versions().sunaw + ApiInterface.ModifyPersonalIcon,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    SMSCertification(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson( ApiConst.Versions().sunaw + ApiInterface.SMSCertification,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    userPhoneChange(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson( ApiConst.Versions().sunaw + ApiInterface.userPhoneChange,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    userPrivacyGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.userPrivacyGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    userPrivacySave(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.userPrivacySave,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    userCardPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.userCardPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    userCardSave(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.userCardSave,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    UserPrivacyCInfo(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UserPrivacyCInfo,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    UserPrivacyCUpdate(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UserPrivacyCUpdate,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    ChangePassword(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.ChangePassword,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
};
export default Model;
