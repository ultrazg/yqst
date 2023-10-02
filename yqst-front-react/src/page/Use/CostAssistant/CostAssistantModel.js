import PublicParams from "../../../base/publicparams/PublicParams";
import FetchUtil from "../../../base/network/FetchUtil";
import ApiConst from "../../../base/urls/ApiConst";
import AllUsePort from '../PublicModule/AllUsePort/AllUsePort';

let CostAssistantModel = {
    CostAssistantPlatformGoodsGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.CostAssistantPlatformGoodsGet,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    FinalStatementPayeeList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.FinalStatementPayeeList,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    FinalStatementPayerList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.FinalStatementPayerList,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    FinalStatementBillInfo(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.FinalStatementBillInfo,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    FinalStatementCreateServicePage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.FinalStatementCreateServicePage,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    FeeList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.FeeList,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    CostAsstSettlementGoodsList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.CostAsstSettlementGoodsList,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    CostAsstSettlementOriginalBillList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.CostAsstSettlementOriginalBillList,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    CostAsstSettlementOriginalBillUrl(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.CostAsstSettlementOriginalBillUrl,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    CostAsstSettlementOriginalBillExcelUrl(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.CostAsstSettlementOriginalBillExcelUrl,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    CostAsstGetSettlementPdf(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.CostAsstGetSettlementPdf,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    CostAsstGetSettlementPdfPreview(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.CostAsstGetSettlementPdfPreview,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    CostAsstGetSettlementSpuPdf(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.CostAsstGetSettlementSpuPdf,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    CostAsstGetSettlementSpuPdfPreview(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.CostAsstGetSettlementSpuPdfPreview,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    CostAsstSettlementGoodsSpuFile(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.CostAsstSettlementGoodsSpuFile,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    CostAsstSettlementGoodsSkuFile(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.CostAsstSettlementGoodsSkuFile,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    CostAsstBeneficiarySubmit(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.CostAsstBeneficiarySubmit,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    CostAsstPlayerConfirm(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.CostAsstPlayerConfirm,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    CostAsstPlayerRefuse(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.CostAsstPlayerRefuse,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    CostAsstGetSettlementServiceTypeList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.CostAsstGetSettlementServiceTypeList,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    CostAsstGetSettlementCompanyList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.CostAsstGetSettlementCompanyList,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    CostAsstGetSettlementProjectUserList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.CostAsstGetSettlementProjectUserList,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    CostAsstBeneficiaryBillInfo(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.CostAsstBeneficiaryBillInfo,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    CostAsstGetSettlementFeeList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.CostAsstGetSettlementFeeList,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    CostAsstBeneficiaryAddBill(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.CostAsstBeneficiaryAddBill,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    CostAsstSettlementGoodsListPreview(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.CostAsstSettlementGoodsListPreview,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    CostAsstSettlementOriginalBillListPreview(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.CostAsstSettlementOriginalBillListPreview,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    FeeExpressPayeePage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.FeeExpressPayeePage,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    FeeGuaranteePayeePage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.FeeGuaranteePayeePage,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    FeeExpressPayeeSave(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.FeeExpressPayeeSave,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    FeeGuaranteePayeeSave(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.FeeGuaranteePayeeSave,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    LesseeAllPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.LesseeAllPage,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    LessorProjectPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.LessorProjectPage,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    LeaseFeeGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.LeaseFeeGet,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    LeaseFeeDel(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.LeaseFeeDel,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    FeeServicePayeePage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.FeeServicePayeePage,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    FeeServiceSave(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.FeeServiceSave,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    FeeServiceDel(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.FeeServiceDel,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    LessorEntryPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.LessorEntryPage,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    LessorExitPage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.LessorExitPage,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    FeeCompensationPayeeSave(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.FeeCompensationPayeeSave,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    LessorEntryGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.LessorEntryGet,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    LessorExitGet(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.LessorExitGet,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    FeePayeePage(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.FeePayeePage,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    CostAsstAdditionalList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.CostAsstAdditionalList,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
    CostAsstSettlementAdditionalList(params, callback, error) {
        params = {
            ...PublicParams(),
            ...params
        };
        FetchUtil.fetchPostJson(
            ApiConst.Versions().sunaw + AllUsePort.CostAsstSettlementAdditionalList,
            params,
            callback,
            error,
            {headers: {"Content-Type": 'application/json;charset=UTF-8'}}
        );
    },
};
export default CostAssistantModel;
