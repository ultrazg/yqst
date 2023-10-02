import ApiConst from '../../base/urls/ApiConst';
import ApiInterface from '../../base/urls/ApiInterface';
import FetchUtil from '../../base/network/FetchUtil';
import PublicParams from '../../base/publicparams/PublicParams';


let Model = {
    partnerListPartner(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.partnerListPartner,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    partnerGetById(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.partnerGetById,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    partnerUpdate(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.partnerUpdate,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    companyAuthGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.companyAuthGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    communicationPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.communicationPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    partnerPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.partnerPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    contactDelete(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.contactDelete,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    contactsList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.contactsList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    friendList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.friendList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    contactAdd(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.contactAdd,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    contactList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.contactList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    contactUpdate(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.contactUpdate,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    // ------ 企业架构 start-----
    staffListall(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.staffListall,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    deptTreeList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.deptTreeList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    staffJobPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.staffJobPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    erpCrmAppend(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.erpCrmAppend,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    erpJobUpdate(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.erpJobUpdate,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    erpJobAdd(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.erpJobAdd,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    erpJobDelete(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.erpJobDelete,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    // ------ 企业架构 end-------

    // ------ 部门操作 start-----
    erpDepartmentList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.erpDepartmentList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    erpDepartmentUpdate(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.erpDepartmentUpdate,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    erpDepartmentAdd(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.erpDepartmentAdd,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    erpDepartmentDelete(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.erpDepartmentDelete,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    erpJobList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.erpJobList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    erpStaffJobBatchUpdate(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.erpStaffJobBatchUpdate,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    erpStaffManualAdd(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.erpStaffManualAdd,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    erpStaffChange(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.erpStaffChange,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    erpStaffInfomation(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.erpStaffInfomation,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    erpStaffDel(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.erpStaffDel,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    friendCardList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.friendCardList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    friendListAll(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.friendListAll,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    friendDetail(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.friendDetail,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    friendDelete(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.friendDelete,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    friendSave(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.friendSave,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    erpStaffUserList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.erpStaffUserList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },


    // ------ 部门操作 end-------
}
export default Model
