/**
 * Created by yb on 2019/03/08.
 */
import ApiConst from '../../../base/urls/ApiConst';
import ApiInterface from '../../../base/urls/ApiInterface';
import FetchUtil from '../../../base/network/FetchUtil';
import PublicParams from '../../../base/publicparams/PublicParams';

let accountingModel = {
    // 标准科目
    getAccountingList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.subjectList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    saveOrUpdateAccounting(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.subjectSave,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    deleteAccounting(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.subjectDelete,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // 科目模板
    getTemplateList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.templateList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    templateDetail(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.templateGet,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error, {}, false);
    },
    templateUpdate(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.templateUpdate,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    templateDelete(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.templateDelete,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    templateSave(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.templateSave,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    templateAllList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.templateAllList,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error, {}, false);
    },

    // 业务节点管理
    businessNodePage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.businessNodePage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    businessNodeSave(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.businessNodeSave,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    businessNodeDelete(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.businessNodeDelete,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // 记账规则列表
    accountingRulePage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.accountingRulePage,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    accountingRuleDelete(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.accountingRuleDelete,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },
    accountingRuleEnable(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.accountingRuleEnable,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    accountingRuleSave(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.accountingRuleSave,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    accountingRuleDetail(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.accountingRuleDetail,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    },

    // 借方科目搜索
    accountingDebitEntrySearch(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(ApiConst.Versions().sunaw + ApiInterface.accountingDebitEntrySearch,
            FetchUtil.toQueryString(FetchUtil.signParam(params)), callback, error);
    }

};
export default accountingModel;
