/**
 * Created by ljy on 2018/5/30
 */
import ApiConst from '../../../../base/urls/ApiConst';
import ApiInterface from '../../../../base/urls/ApiInterface';
import FetchUtil from '../../../../base/network/FetchUtil';
import PublicParams from '../../../../base/publicparams/PublicParams';

let FinancialChannelModel = {
    getFinancialChannelList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        }
        FetchUtil.fetchPostJson(ApiConst.Versions().czd + ApiInterface.financialChannelList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
}
export default FinancialChannelModel;