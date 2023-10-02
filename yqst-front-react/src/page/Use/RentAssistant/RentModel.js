import FetchUtil from "../../../base/network/FetchUtil";
import ApiInterface from "../../../base/urls/ApiInterface";
import ApiConst from "../../../base/urls/ApiConst";
import PublicParams from "../../../base/publicparams/PublicParams";


let Model = {
	RentAsstGetCompanyAndProjectList(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		}
		FetchUtil.fetchPostJson(
			ApiConst.Versions().sunaw + ApiInterface.RentAsstGetCompanyAndProjectList,
			params,
			callback,
			error,
			{headers: {"Content-Type": 'application/json;charset=UTF-8'}}
		);
	},
	RentAsstAddPolicy(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		}
		FetchUtil.fetchPostJson(
			ApiConst.Versions().sunaw + ApiInterface.RentAsstAddPolicy,
			params,
			callback,
			error,
			{headers: {"Content-Type": 'application/json;charset=UTF-8'}}
		);
	},
	RentAsstGoodList(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		}
		FetchUtil.fetchPostJson(
			ApiConst.Versions().sunaw + ApiInterface.RentAsstGoodList,
			params,
			callback,
			error,
			{headers: {"Content-Type": 'application/json;charset=UTF-8'}}
		);
	},
	RentAsstPolicyList(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		}
		FetchUtil.fetchPostJson(
			ApiConst.Versions().sunaw + ApiInterface.RentAsstPolicyList,
			params,
			callback,
			error,
			{headers: {"Content-Type": 'application/json;charset=UTF-8'}}
		);
	},
	RentAsstPolicyEnable(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		}
		FetchUtil.fetchPostJson(
			ApiConst.Versions().sunaw + ApiInterface.RentAsstPolicyEnable,
			params,
			callback,
			error,
			{headers: {"Content-Type": 'application/json;charset=UTF-8'}}
		);
	},
	RentAsstPolicyDisable(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		}
		FetchUtil.fetchPostJson(
			ApiConst.Versions().sunaw + ApiInterface.RentAsstPolicyDisable,
			params,
			callback,
			error,
			{headers: {"Content-Type": 'application/json;charset=UTF-8'}}
		);
	},
	RentAsstPolicySubmit(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		}
		FetchUtil.fetchPostJson(
			ApiConst.Versions().sunaw + ApiInterface.RentAsstPolicySubmit,
			params,
			callback,
			error,
			{headers: {"Content-Type": 'application/json;charset=UTF-8'}}
		);
	},
	RentAsstPolicyDelete(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		}
		FetchUtil.fetchPostJson(
			ApiConst.Versions().sunaw + ApiInterface.RentAsstPolicyDelete,
			params,
			callback,
			error,
			{headers: {"Content-Type": 'application/json;charset=UTF-8'}}
		);
	},
	RentAsstPolicyDeleteForMultiSelect(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		}
		FetchUtil.fetchPostJson(
			ApiConst.Versions().sunaw + ApiInterface.RentAsstPolicyDeleteForMultiSelect,
			params,
			callback,
			error,
			{headers: {"Content-Type": 'application/json;charset=UTF-8'}}
		);
	},
	RentAsstPolicyInfo(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		}
		FetchUtil.fetchPostJson(
			ApiConst.Versions().sunaw + ApiInterface.RentAsstPolicyInfo,
			params,
			callback,
			error,
			{headers: {"Content-Type": 'application/json;charset=UTF-8'}}
		);
	},
	RentAsstPolicyUpdate(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		}
		FetchUtil.fetchPostJson(
			ApiConst.Versions().sunaw + ApiInterface.RentAsstPolicyUpdate,
			params,
			callback,
			error,
			{headers: {"Content-Type": 'application/json;charset=UTF-8'}}
		);
	},
};

export default Model;
