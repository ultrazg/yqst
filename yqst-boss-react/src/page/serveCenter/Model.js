/**
 * Created by yb on 2019/11/11
 */

import ApiConst from '../../base/urls/ApiConst';
import ApiInterface from '../../base/urls/ApiInterface';
import FetchUtil from '../../base/network/FetchUtil';
import PublicParams from '../../base/publicparams/PublicParams';

let Model = {
    CServeSDPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.CServeSDPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    CServeSDSave(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.CServeSDSave,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    CServeSDDelete(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.CServeSDDelete,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    UserAPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UserAPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    CServeSCPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.CServeSCPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    CServeSCGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.CServeSCGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    CServeSCSave(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.CServeSCSave,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    CServeSCDelete(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.CServeSCDelete,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    UserAttSList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UserAttSList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    CServeSUPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.CServeSUPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    CServeSUGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.CServeSUGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    CServeSUSave(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.CServeSUSave,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    CServeSUAPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.CServeSUAPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    UserPPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UserPPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    CServeSGPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.CServeSGPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    CServeSGGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.CServeSGGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    CServeSGSave(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.CServeSGSave,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    CServeSGDelete(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.CServeSGDelete,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    UserAttSGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UserAttSGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    ShopGPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.ShopGPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    ShopGGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.ShopGGet
            ,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    CServeSVPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.CServeSVPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    CServeSLPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.CServeSLPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    CServeSAPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.CServeSAPage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    CServeSDelete(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.CServeSDelete,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    ParamsList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.paramsList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    CServeSARDownload(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.CServeSARDownload,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    CServeSARUpload(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.CServeSARUpload,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    CServeSSave(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params,
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.CServeSSave,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
};
export default Model;