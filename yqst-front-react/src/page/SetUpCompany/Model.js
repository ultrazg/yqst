import ApiConst from '../../base/urls/ApiConst';
import ApiInterface from '../../base/urls/ApiInterface';
import FetchUtil from '../../base/network/FetchUtil';
import PublicParams from '../../base/publicparams/PublicParams';

let Model = {
	UserIList(params, callback, error) {
		const data = JSON.parse(localStorage.getItem('loginMes'))
		params = {
			...PublicParams(),
			sessionKey: data.sessKey,
			...params
		}
		FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.UserIList,
			FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
	},
	CreatEnterprise(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		}
		FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.CreatEnterprise,
			FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
	},
	GetErpInfo(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		}
		FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.GetErpInfo,
			FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
	},
	AppyToJoinComp(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		}
		FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.appyToJoinComp,
			FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
	},
	GetEnterpriseList(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		}
		FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.getEnterpriseList,
			FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
	},
	switchEnterprise(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		}
		FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.switchEnterprise,
			FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
	},
	activeEnterprise(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		}
		FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.activeEnterprise,
			FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
	},
};
export default Model;
