import ApiConst from '../../../../base/urls/ApiConst';
import FetchUtil from '../../../../base/network/FetchUtil';
import ShopParams from '../../PublicModule/ShopParams/ShopParams';
import AllUsePort from '../../PublicModule/AllUsePort/AllUsePort';
import PublicParams from '../../../../base/publicparams/PublicParams'
import ApiInterface from '../../PublicModule/AllUsePort/AllUsePort'

let Model = {
    businessAdminUserPage(pa, callback, error) {
        const params = {
            ...PublicParams(),
            ...pa,
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.businessAdminUserPage,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    businessAdminSourceList(pa, callback, error) {
        const params = {
            ...PublicParams(),
            ...pa,
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.businessAdminSourceList,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    businessClueAbandon(pa, callback, error) {
        const params = {
            ...PublicParams(),
            ...pa,
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.businessClueAbandon,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    businessAdminBatchImport(file, callback, error) {
        let formData = new FormData();
        formData.append("file", file);
        formData.append("sessionKey", PublicParams().sessionKey);
        formData.append("personSn", localStorage.personSn);
        formData.append("companySn", localStorage.userSn);
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.businessAdminBatchImport,
            formData,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    businessClueShareList(pa, callback, error) {
        const params = {
            ...PublicParams(),
            ...pa,
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.businessClueShareList,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    businessClueShareAdd(pa, callback, error) {
        const params = {
            ...PublicParams(),
            ...pa,
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.businessClueShareAdd,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    businessSharePartnerList(pa, callback, error) {
        const params = {
            ...PublicParams(),
            ...pa,
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.businessSharePartnerList,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    businessSharePartnerAdd(pa, callback, error) {
        const params = {
            ...PublicParams(),
            ...pa,
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.businessSharePartnerAdd,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
};
export default Model;
