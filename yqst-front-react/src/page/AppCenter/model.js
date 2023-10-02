import ApiConst from '../../base/urls/ApiConst';
import ApiInterface from '../../base/urls/ApiInterface';
import FetchUtil from '../../base/network/FetchUtil';
import PublicParams from '../../base/publicparams/PublicParams';


let Model = {
	softUserList(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		};
		FetchUtil.fetchPostJson(
			ApiConst.Versions().sunaw + ApiInterface.softUserList,
			params,
			callback,
			error,
			{headers: {"Content-Type": 'application/json;charset=UTF-8'}}
		);
	},
	softMarketList(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		};
		FetchUtil.fetchPostJson(
			ApiConst.Versions().sunaw + ApiInterface.softMarketList,
			params,
			callback,
			error,
			{headers: {"Content-Type": 'application/json;charset=UTF-8'}}
		);
	},
	softGet(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		};
		FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.softGet,
			FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
	},
	softFreeActive(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		};
		FetchUtil.fetchPostJson(
			ApiConst.Versions().sunaw + ApiInterface.softFreeActive,
			params,
			callback,
			error,
			{headers: {"Content-Type": 'application/json;charset=UTF-8'}}
		);
	},
	softGroupUserShowList(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		};
		FetchUtil.fetchPostJson(
			ApiConst.Versions().sunaw + ApiInterface.softGroupUserShowList,
			params,
			callback,
			error,
			{headers: {"Content-Type": 'application/json;charset=UTF-8'}}
		);
	},
	softGroupUserOftenUseList(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		};
		FetchUtil.loadingTitle = 'undefined';
		FetchUtil.fetchPostJson(
			ApiConst.Versions().sunaw + ApiInterface.softGroupUserOftenUseList,
			params,
			callback,
			error,
			{headers: {"Content-Type": 'application/json;charset=UTF-8'}}
		);
	},
	softMarketSoftGet(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		};
		FetchUtil.fetchPostJson(
			ApiConst.Versions().sunaw + ApiInterface.softMarketSoftGet,
			params,
			callback,
			error,
			{headers: {"Content-Type": 'application/json;charset=UTF-8'}}
		);
	},
	softGoodsList(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		};
		FetchUtil.fetchPostJson(
			ApiConst.Versions().sunaw + ApiInterface.softGoodsList,
			params,
			callback,
			error,
			{headers: {"Content-Type": 'application/json;charset=UTF-8'}}
		);
	},
	softGroupUserShowSave(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		};
		FetchUtil.fetchPostJson(
			ApiConst.Versions().sunaw + ApiInterface.softGroupUserShowSave,
			params,
			callback,
			error,
			{headers: {"Content-Type": 'application/json;charset=UTF-8'}}
		);
	},
	softUserAuthList(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		};
		FetchUtil.fetchPostJson(
			ApiConst.Versions().sunaw + ApiInterface.softUserAuthList,
			params,
			callback,
			error,
			{headers: {"Content-Type": 'application/json;charset=UTF-8'}}
		);
	},
	groupStaffResourceList(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		};
		FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.groupStaffResourceList,
			FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
	},
	softRenewGoodsGet(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		};
		FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.softRenewGoodsGet,
			FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
	},
	softwareGoodsDetail(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		};
		FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.softwareGoodsDetail,
			FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
	},
	orderBuyerFast(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		};
		FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.orderBuyerFast,
			FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
	},
	SubSoftwareDetails(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		};
		FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.SubSoftwareDetails,
			FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
	},
	orderBuyerConfirm(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		};
		FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.orderBuyerConfirm,
			FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
	},
	userSoftList(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		};
		FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.userSoftList,
			FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
	},
	erpStaffUserList(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		};
		FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.userSoftList,
			FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
	},
	softUserAuth(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		};
		FetchUtil.fetchPostJson(
			ApiConst.Versions().sunaw + ApiInterface.softUserAuth,
			FetchUtil.toQueryString(FetchUtil.signParam(params)),
			callback,
			error
		);
	},
	softGroupUserSoftNotList(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		};
		FetchUtil.fetchPostJson(
			ApiConst.Versions().sunaw + ApiInterface.softGroupUserSoftNotList,
			params,
			callback,
			error,
			{headers: {"Content-Type": 'application/json;charset=UTF-8'}}
		);
	},
	softGroupPersonSave(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		};
		FetchUtil.fetchPostJson(
			ApiConst.Versions().sunaw + ApiInterface.softGroupPersonSave,
			params,
			callback,
			error,
			{headers: {"Content-Type": 'application/json;charset=UTF-8'}}
		);
	},
	softGroupUserSoftSave(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		};
		FetchUtil.fetchPostJson(
			ApiConst.Versions().sunaw + ApiInterface.softGroupUserSoftSave,
			params,
			callback,
			error,
			{headers: {"Content-Type": 'application/json;charset=UTF-8'}}
		);
	},
	softGroupUserSoftList(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		};
		FetchUtil.fetchPostJson(
			ApiConst.Versions().sunaw + ApiInterface.softGroupUserSoftList,
			params,
			callback,
			error,
			{headers: {"Content-Type": 'application/json;charset=UTF-8'}}
		);
	},
	softGroupUserDelete(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		};
		FetchUtil.fetchPostJson(
			ApiConst.Versions().sunaw + ApiInterface.softGroupUserDelete,
			params,
			callback,
			error,
			{headers: {"Content-Type": 'application/json;charset=UTF-8'}}
		);
	},
	softGroupUserRecovery(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		};
		FetchUtil.fetchPostJson(
			ApiConst.Versions().sunaw + ApiInterface.softGroupUserRecovery,
			params,
			callback,
			error,
			{headers: {"Content-Type": 'application/json;charset=UTF-8'}}
		);
	},
};
export default Model
