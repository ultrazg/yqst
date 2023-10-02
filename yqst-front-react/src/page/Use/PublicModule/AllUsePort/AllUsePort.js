/*
* 应用所有的接口
* */
const AllUsePort = {
    /*
    * 图片下载
    * */
    DownloadFile: '/open/v1/file/downloadFile',

    ShopPage: '/api/v1/shop/page', // 获取店铺列表

    /*
    * 合同
    * */
    ContractTPage: '/api/v1/contract/template/page', // 合同模板列表
    ContractTTPage: '/api/v1/contract/template/type/page', // 合同模版类型列表
    ContractTTSave: '/api/v1/contract/template/type/save', // 添加/修该合同模版类型
    ContractTTDel: '/api/v1/contract/template/type/del', // 删除合同模版类型
    ContractTAnalysis: '/api/v1/contract/template/analysis', // 根据文件解析出英文字段
    ContractTSave: '/api/v1/contract/template/save', // 添加/修改合同模版
    ContractTInfo: '/api/v1/contract/template/info', // 合同模板详情
    ContractTDel: '/api/v1/contract/template/del', // 删除合同模版
    ContractTUpdate: '/api/v1/contract/template/update', // 启用停用合同模板

    /*
    * 产品
    * */
    sellerGoodsPage: '/api/v1/seller/goods/page',
    sellerGoodsAdd: '/api/v1/seller/goods/add',
    sellerGoodsUpdate: '/api/v1/seller/goods/update',
    sellerGoodsDel: '/api/v1/seller/goods/del',
    sellerGoodsBatchDel: '/api/v1/seller/goods/batch/del',
    sellerGoodsEnable: '/api/v1/seller/goods/enable',
    sellerGoodsGet: '/api/v1/seller/goods/get',

    /*
    * 产品类目
    * */
    sellerCategoryList: '/api/v1/seller/category/list',
    sellerCategorySave: '/api/v1/seller/category/save',
    sellerCategoryGet: '/api/v1/seller/category/get',
    sellerCategoryDelete: '/api/v1/seller/category/delete',

    /*
    * 商品
    * */

    shopGoodsPage: '/api/v1/shop/goods/page',
    shopGoodsGet: '/api/v1/shop/goods/get',
    shopGoodsUpdate: '/api/v1/shop/goods/update',
    shopGoodsAdd: '/api/v1/shop/goods/add',
    shopGoodsPublish: '/api/v1/shop/goods/publish',
    shopGoodsDelete: '/api/v1/shop/goods/delete',
    shopGoodsBatchDelete: '/api/v1/shop/goods/batch/delete',
    shopGoodsStatusBatchUpdate: '/api/v1/shop/goods/status/update/batch',
    shopGoodsStatusUpdate: '/api/v1/shop/goods/status/update',
    shopGoodsSkuIsChange: '/api/v1/shop/goods/sku/is/change',

    /*
    * 商品分类
    * */

    goodsCatList: '/api/v1/shop/goods/cat/list',

    /*
    * 店铺商品标签
    * */
    shopTagList: '/api/v1/shop/tag/list',

    /*
    * 电子签章平台助手
    * */
    openPlatformApplyGet: '/api/v1/esign/sunaw/platform/apply/get',
    openPlatformApplyAdd: '/api/v1/esign/sunaw/platform/apply/add',
    openPlatformStatisticsGet: '/api/v1/esign/sunaw/platform/statistics/get',
    openPlatformStatisticsServiceList: '/api/v1/esign/sunaw/platform/statistics/service/list',
    openPlatformCustomerList: '/api/v1/esign/sunaw/platform/customer/list',
    openSunawServiceList: '/api/v1/esign/sunaw/service/list',
    openStatisticsPaymentList: '/api/v1/esign/sunaw/platform/statistics/payment/list',
    openServicePaymentList: '/api/v1/esign/sunaw/service/platform/list',
    openAuthPlatformPage: '/api/v1/esign/sunaw/service/log/auth/platform/page',
    openSealPlatformPage: '/api/v1/esign/sunaw/service/log/seal/platform/page',
    openPlatformCustomerPage: '/api/v1/esign/sunaw/platform/customer/page',
    openPlatformCustomerGet: '/api/v1/esign/sunaw/platform/customer/get',
    openCustomerPurchaseList: '/api/v1/esign/sunaw/service/instance/customer/purchase/list',

    /*
    * 商机助手
    * */
    businessAdminUserPage: '/api/v1/clue/admin/user/page',
    businessAdminBatchImport: '/api/v1/clue/admin/batch/import',
    businessAdminSourceList: '/api/v1/clue/admin/source/list',
    businessClueAbandon: '/api/v1/clue/abandon',
    businessClueShareList: '/api/v1/clue/share/list',
    businessClueShareAdd: '/api/v1/clue/share/add',
    businessSharePartnerList: '/api/v1/clue/share/partner/list',
    businessSharePartnerAdd: '/api/v1/clue/share/partner/add',

    /*
    * b2b企业钱包
    * */
    btbMerchantsStatusGet: '/api/v1/wallet/merchants/status/get',
    btbMerchantsCompanyInfo: '/api/v1/wallet/merchants/apply/company/info',
    btbApplyCompanyApply: '/api/v1/wallet/merchants/apply/company/apply',
    /*
    * 费用助手
    * */
    CostAssistantPlatformGoodsGet: '/api/v1/fee/index',

    /**
     * 结算中心
     */
    FinalStatementPayeeList: '/api/v1/fee/settlement/bill/payee/page',
    FinalStatementPayerList: '/api/v1/fee/settlement/bill/payer/page',
    FinalStatementBillInfo: '/api/v1/fee/settlement/bill/info',
    FinalStatementCreateServicePage: '/api/v1/fee/settlement/bill/service/page',
    FeeList: '/api/v1/fee/settlement/bill/fee/bill/list',
    CostAsstSettlementGoodsList: '/api/v1/fee/settlement/bill/info/good/list',
    CostAsstSettlementOriginalBillList: '/api/v1/fee/settlement/bill/info/business/bill/list',
    CostAsstSettlementOriginalBillUrl: '/api/v1/fee/settlement/bill/info/business/bill/enclosure/get',
    CostAsstSettlementOriginalBillExcelUrl: '/api/v1/fee/settlement/bill/info/business/execl/get',
    CostAsstGetSettlementPdf: '/api/v1/fee/settlement/bill/info/pdf/get', //结算单PDF
    CostAsstGetSettlementPdfPreview: '/api/v1/fee/settlement/bill/sku/sign/pdf/preview',
    CostAsstGetSettlementSpuPdf: '/api/v1/fee/settlement/bill/info/spu/pdf/get', //结算单PDF
    CostAsstGetSettlementSpuPdfPreview: '/api/v1/fee/settlement/bill/spu/sign/pdf/preview',
    CostAsstSettlementGoodsSpuFile: '/api/v1/fee/settlement/bill/info/good/spu/list/execl/get', // 结算清单下载
    CostAsstSettlementGoodsSkuFile: '/api/v1/fee/settlement/bill/info/good/sku/list/execl/get', // 结算清单下载
    CostAsstBeneficiarySubmit: '/api/v1/fee/settlement/bill/payee/submit', // 提交结算
    CostAsstPlayerConfirm: '/api/v1/fee/settlement/bill/payer/confirm', // 确认结算
    CostAsstPlayerRefuse: '/api/v1/fee/settlement/bill/payer/refuse', // 拒绝结算
    CostAsstGetSettlementServiceTypeList: '/api/v1/fee/settlement/bill/service/page', // 业务类型
    CostAsstGetSettlementCompanyList: '/api/v1/fee/settlement/bill/payer/company/page', // 选择客户
    CostAsstGetSettlementProjectUserList: '/api/v1/fee/settlement/bill/project/page', // 选择项目
    CostAsstBeneficiaryBillInfo: '/api/v1/fee/settlement/bill/settle/page/amount/get',
    CostAsstGetSettlementFeeList: '/api/v1/fee/settlement/bill/settle/page',
    CostAsstBeneficiaryAddBill: '/api/v1/fee/settlement/bill/payee/add',
    CostAsstSettlementGoodsListPreview: '/api/v1/lease/settlement/goods/list',
    CostAsstSettlementOriginalBillListPreview: '/api/v1/fee/settlement/bill/business/bill/list/preview',
    CostAsstAdditionalList: '/api/v1/lease/settlement/additional/list', // 结算清单附加列表（结算清单预览）
    CostAsstSettlementAdditionalList: '/api/v1/fee/settlement/bill/info/additional/list', // 结算清单附加列表

    FeeExpressPayeePage: '/api/v1/lease/fee/express/payee/page', // 收款方（出租方）租赁物流费用单分页列表
    FeeGuaranteePayeePage: '/api/v1/lease/fee/guarantee/payee/page', // 收款方（出租方）租赁保底费用单分页列表
    // FeeServicePayeePage: '/api/v1/service/fee/payee/page', // 收款方维保服务费用单分页列表
    FeeServicePayeePage: '/api/v1/lease/fee/maintenance/payee/page', // 收款方维保服务费用单分页列表
    FeeExpressPayeeSave: '/api/v1/lease/fee/express/payee/save', // 收款方（出租方）保存租赁物流费用
    FeeGuaranteePayeeSave: '/api/v1/lease/fee/guarantee/payee/save', // 收款方（出租方）收款方保存租赁保底费用
    LesseeAllPage: '/api/v1/lease/partner/lessee/all/page', // 全部承租方分页列表（出租报价等使用）
    LessorProjectPage: '/api/v1/lease/project/lessor/use/page', // 出租方使用项目分页列表（出租报价、合同价格、结算期初初始化等使用，仅特供）
    LeaseFeeGet: '/api/v1/lease/fee/get', // 费用单详情
    LeaseFeeDel: '/api/v1/lease/fee/delete', // 删除费用单
    FeeServiceSave: '/api/v1/lease/fee/maintenance/payee/save', // 保存维保服务费用单
    FeeServiceDel: '/api/v1/lease/fee/delete', // 删除维保单
    LessorEntryPage: '/api/v1/lease/entry/lessor/reportable/fee/page', // 出租方租赁进场单分页列表
    LessorExitPage: '/api/v1/lease/exit/lessor/reportable/fee/page', // 出租方租赁退场单分页列表
    FeeCompensationPayeeSave: '/api/v1/lease/fee/compensation/payee/save', //收款方（出租方）收款方保存租赁赔偿费用
    LessorEntryGet: '/api/v1/lease/entry/lessor/get', // 出租方租赁进场单详情
    LessorExitGet: '/api/v1/lease/exit/lessor/get', // 出租方租赁退场单详情
    FeePayeePage: '/api/v1/lease/fee/payee/page', // 收款方（出租方）租赁费用单分页列表
    // FeePayeePage: '/api/v1/lease/fee/payer/page', // 收款方（出租方）租赁费用单分页列表

    /**
     * 存证中心
     */
    CertificateCenterList: '/api/v1/user/company/sign/record/page',

    /**
     * 承运助手
     */
    CarrierAsstExpressValuePolicyList: '/api/v1/express/price/policy/page',
    CarrierAsstExpressValuePolicyEnable: '/api/v1/express/price/policy/enable',
    CarrierAsstExpressValuePolicyDisable: '/api/v1/express/price/policy/disable',
    CarrierAsstExpressValuePolicyDelete: '/api/v1/express/price/policy/delete',
    CarrierAsstExpressValuePolicyBatchDelete: '/api/v1/express/price/policy/batch/delete',
    CarrierAsstExpressValuePolicySubmit: '/api/v1/express/price/policy/submit',
    CarrierAsstExpressValuePolicyCustomer: '/api/v2/customer/page',
    CarrierAsstExpressValuePolicyAdd: '/api/v1/express/price/policy/add',
    CarrierAsstExpressValuePolicyGet: '/api/v1/express/price/policy/get',
    CarrierAsstExpressValuePolicyUpdate: '/api/v1/express/price/policy/update'
};

export default AllUsePort;
