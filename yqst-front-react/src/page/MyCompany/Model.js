import ApiConst from '../../base/urls/ApiConst';
import ApiInterface from '../../base/urls/ApiInterface';
import FetchUtil from '../../base/network/FetchUtil';
import PublicParams from '../../base/publicparams/PublicParams';

let Model = {
    GetErpInfo(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.GetErpInfo,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    UserIList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UserIList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    UserCUpdate(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UserCUpdate,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    MyCompanyIIGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.MyCompanyIIGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    MyCompanyIISave(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.MyCompanyIISave,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    MyCompanyCBGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.MyCompanyCBGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    MyCompanyCBIPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.MyCompanyCBIPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    MyCompanyCBSave(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.MyCompanyCBSave,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    MyCompanyCAPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.MyCompanyCAPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    MyCompanyIRPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.MyCompanyIRPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    MyCompanyCASave(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.MyCompanyCASave,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    MyCompanyCAGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.MyCompanyCAGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    MyCompanyCADelete(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.MyCompanyCADelete,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    MyCompanyAdressTypeList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.MyCompanyAdressTypeList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    MyCompanyAdressTypeDetail(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.MyCompanyAdressTypeDetail,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    MyCompanyAdressTypeSave(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.MyCompanyAdressTypeSave,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    MyCompanyAdressTypeDel(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.MyCompanyAdressTypeDel,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    MyCompanyIRSave(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.MyCompanyIRSave,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    MyCompanyIRGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.MyCompanyIRGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    MyCompanyIRDelete(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.MyCompanyIRDelete,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    AuthInfoModuleGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.AuthInfoModuleGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    AuthInfoSave(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.AuthInfoSave,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    AuthManageDetail(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.AuthManageDetail,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    CompanyAuthGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.companyAuthGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    MyCompanyRList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.MyCompanyRList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    MyCompanyRSList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.MyCompanyRSList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    MyCompanyRAdd(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.MyCompanyRAdd,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    MyCompanyRUpdate(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.MyCompanyRUpdate,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    MyCompanyRDelete(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.MyCompanyRDelete,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    StaffListAll(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.staffListall,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    CommunicationPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.communicationPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    MyCompanyRSAdd(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.MyCompanyRSAdd,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    MyCompanyRSBDelete(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.MyCompanyRSBDelete,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    BusinessUDCGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.BusinessUDCGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    UserParentDocGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.userParentDocGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    MyCompanyGList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.MyCompanyGList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    MyCompanyGGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.MyCompanyGGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    ErpJobList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.erpJobList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    MyCompanyGAdd(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.MyCompanyGAdd,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    MyCompanyGDelete(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.MyCompanyGDelete,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    MyCompanyGUpdate(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.MyCompanyGUpdate,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    MyCompanyCLUpdate(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.MyCompanyCLUpdate,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    GetVerificationCode(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.MyCompanyGetCode,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    CheckVerificationCode(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.MyCompanyCheckCode,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    GetEmployeeList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.MyCompanyGetEmployeeList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    ChangeAdmin(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.MyCompanyChangeAdmin,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

};
export default Model;
