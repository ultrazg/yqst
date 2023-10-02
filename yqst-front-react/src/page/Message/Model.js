import ApiConst from '../../base/urls/ApiConst';
import ApiInterface from '../../base/urls/ApiInterface';
import FetchUtil from '../../base/network/FetchUtil';
import PublicParams from '../../base/publicparams/PublicParams';


let Model = {
	NewsModelIList(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		}
		FetchUtil.fetchPostJson(
			ApiConst.Versions().sunaw + ApiInterface.NewsModelIList,
			params,
			callback,
			error,
			{headers: {"Content-Type": 'application/json;charset=UTF-8'}}
		);
	},
	NewsModelIPage(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		}
		FetchUtil.fetchPostJson(
			ApiConst.Versions().sunaw + ApiInterface.NewsModelIPage,
			params,
			callback,
			error,
		);
	},
	NewsModelIHide(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		}
		FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.NewsModelIHide,
			FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
	},
};
export default Model;
