import PublicParams from "../../../../base/publicparams/PublicParams";
import FetchUtil from "../../../../base/network/FetchUtil";
import ApiConst from "../../../../base/urls/ApiConst";
import AllUsePort from '../../PublicModule/AllUsePort/AllUsePort';

let Model = {
    // 物流运输政策列表
    CarrierAsstExpressValuePolicyList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.CarrierAsstExpressValuePolicyList,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    // 物流运输政策启用
    CarrierAsstExpressValuePolicyEnable(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.CarrierAsstExpressValuePolicyEnable,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    // 物流运输政策停用
    CarrierAsstExpressValuePolicyDisable(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.CarrierAsstExpressValuePolicyDisable,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    // 物流运输政策删除
    CarrierAsstExpressValuePolicyBatchDelete(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.CarrierAsstExpressValuePolicyBatchDelete,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    // 物流运输政策提交
    CarrierAsstExpressValuePolicySubmit(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.CarrierAsstExpressValuePolicySubmit,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    // 适用对象
    CarrierAsstExpressValuePolcyCustomer(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.CarrierAsstExpressValuePolicyCustomer,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    // 物流运输政策新增
    CarrierAsstExpressValuePolicyAdd(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.CarrierAsstExpressValuePolicyAdd,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    // 物流运输政策更新
    CarrierAsstExpressValuePolicyUpdate(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.CarrierAsstExpressValuePolicyUpdate,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    // 物流运输政策查询
    CarrierAsstExpressValuePolicyGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.CarrierAsstExpressValuePolicyGet,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
};
export default Model;
