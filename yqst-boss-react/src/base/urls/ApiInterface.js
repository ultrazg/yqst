/**
 * 接口信息，每个功能要注释
 */
import ApiConst from './ApiConst';

let ApiInterface = {
    /*
    * 系统管理
    * */
    xtAdminList: '/boss/v1/admin/list',
    xtAdminSave: '/boss/v1/admin/save',
    xtAdminDelete: '/boss/v1/admin/delete',
    xtAdminUpdate: '/boss/v1/admin/update',

    adminList: '/boss/v1/admin/list', //'/admin/admin/list',
    adminSave: '/boss/v1/admin/save', //'/admin/admin/save',
    adminDelete: '/boss/v1/admin/delete',
    adminLogin: '/boss/v1/admin/login', //'/admin/admin/login',
    appUpdateList: '/boss/v1/info/app/version/list', //'/admin/app/version/list',
    appUpdateInfo: '/boss/v1/info/app/version/update', //'/admin/app/version/update',
    paramsList: '/boss/v1/soft/par/list', //'/admin/par/list',
    paramsItemDel: '/boss/v1/soft/par/delete', //'/admin/par/delete',
    addsoftCategory: '/boss/v1/soft/cat/save', //'/admin/soft/cat/save',
    softCategoryList: '/boss/v1/soft/cat/list', //'/admin/soft/cat/list',
    delsoftCategory: '/boss/v1/soft/cat/delete', //'/admin/soft/cat/delete',
    softSave: '/boss/v1/soft/save', //"/admin/soft/save",
    paramsCreateOrEdit: '/boss/v1/soft/save', //'/admin/soft/save',
    softList: '/boss/v1/soft/list', //"/admin/soft/list",
    paramsDetail: '/boss/v1/soft/get', //'/admin/soft/get',
    paramsDel: '/boss/v1/soft/delete', //'/admin/soft/delete',
    RuleAddInfo: '/boss/v1/soft/detail', //'/admin/soft/detail',
    RuleList: '/boss/v1/soft/goods/page', //'/admin/soft/goods/page',
    RuleAddOrSave: '/boss/v1/soft/goods/save', //'/admin/soft/goods/save',
    RuleDetail: '/boss/v1/soft/goods/get', //'/admin/soft/goods/get',
    RuleDel: '/boss/v1/soft/goods/delete', //'/admin/soft/goods/delete',
    softInstanceList: '/boss/v1/soft/user/list', //'/admin/soft/user/list',
    newsList: '/boss/v1/info/list', //'/admin/info/list',
    saveNewsModule: '/boss/v1/info/template/save', //'/admin/info/template/save',
    newsModuleList: '/boss/v1/info/template/list', //'/admin/info/template/list',
    deleteNewsModule: '/boss/v1/info/template/del', //'/admin/info/template/del',

    DownloadFile: "/open/v1/file/downloadFile",
    //批量下载文件
    GetDownloadZipUrl: '/api/v1/file/downloadZip',

    /**
     * 认证中心
     */
    AddQualification: '/boss/v1/doc/save', //'/admin/rsu/doc/save',
    QualificationList: '/boss/v1/doc/page', //'/admin/rsu/doc/list',
    DeleteQualification: '/boss/v1/doc/del', //'/admin/rsu/doc/del',
    AddQualificationGroup: '/boss/v1/doc/group/save', //'/admin/rsu/doc/group/save',
    QualificationSubGroupList: '/boss/v1/doc/group/sub/page', //'/admin/rsu/doc/group/sub/list',
    QualificationTopGroupList: '/boss/v1/doc/group/top/page', //'/admin/rsu/doc/group/top/list',
    DeleteQualificationGroup: '/boss/v1/doc/group/del', //'/admin/rsu/doc/group/del',
    AddSubGroupList: '/boss/v1/doc/group/sub/add', //'/admin/rsu/doc/Group/sub/add',
    RemoveSubGroupList: '/boss/v1/doc/group/sub/del', //'/admin/rsu/doc/Group/sub/del',
    GetAllSubGroupList: '/boss/v1/doc/group/sub/list', //'/admin/rsu/doc/Group/sub/list',
    GetSubGroupList: '/boss/v1/doc/group/list/sub/list', //'/admin/rsu/doc/Group/list/sub/list',
    PassUserQualification: '/boss/v1/user/doc/auth', //'/admin/rsu/user/doc/auth',
    NoPassUserQualification: '/boss/v1/user/doc/refuse', //'/admin/rsu/user/doc/refuse',
    GetUserQualificationList: '/boss/v1/user/doc/refuse/auth/list', //'/admin/rsu/user/doc/list',
    PassUserQualificationGroup: '/boss/v1/user/doc/group/auth', //'/admin/rsu/user/doc/group/auth',
    NoPassUserQualificationGroup: '/boss/v1/user/doc/group/refuse', //'/admin/rsu/user/doc/group/refuse',
    GetUserQualificationGroup: '/boss/v1/user/doc/page', //'/admin/rsu/user/doc/group/list',
    GetUserQualificationGroupItems: '/boss/v1/user/doc/group/list/doc', //'/admin/rsu/user/doc/group/list/doc',
    GetUserQualificationGroupUserDelete: '/boss/v1/user/doc/delete', //'/admin/rsu/user/doc/group/list/doc',
    GetUserQualificationGroupUserDetail: '/boss/v1/user/doc/get', //'
    GetUserQualificationGroupDocUpdate: '/boss/v1/user/doc/update', //'
    DocParentPage: '/boss/v1/doc/parent/page',
    OpenSoftList: '/open/v1/soft/list',
    OpenParentDel: '/boss/v1/doc/parent/del',
    BossDocGroupPage: '/boss/v1/doc/group/sub/page',
    BossDocSave: '/boss/v1/doc/parent/save',
    BossDocGet: '/boss/v1/doc/parent/get',
    BossDocSoftList: '/boss/v1/doc/soft/list',
    NewAuthInfoModule: '/boss/v1/rsu/doc/parent/get',

    uploadFile: '/api/v1/file/uploadFile',

    //unionpay
    UnionpayLogin: "/admin/v1/boss/login",
    getServiceList: "/admin/v1/service/list",
    getServiceUpdate: "/admin/v1/service/update",
    getOtherInfo: "/admin/v1/other/get",
    getOtherSave: "/admin/v1/other/save",
    getMerchantPage: "/admin/v1/merchant/page",
    getAppealPage: "/admin/v1/appeal/page",
    getAppealDictionaryList: "/api/v1/appeal/dictionary/list",
    getAppealDetails: "/admin/v1/appeal/details/get",
    getMerchantDetails: "/admin/v1/merchant/get",
    getMerchantTerminalSave: "/admin/v1/merchant/terminal/save",
    getMerchantTerminalDelete: "/admin/v1/merchant/terminal/delete",
    getAppealLogList: "/api/v1/appeal/log/list",
    getAppealDeal: "/admin/v1/appeal/deal",
    getExpressSend: "/api/v1/appeal/express/send",
    getAppealExpressGet: "/api/v1/appeal/express/get",
    UnionpayContractDownload: "/api/v1/appeal/contract/download",

    // 企业账户管理
    walletAccountPage: '/boss/v1/wallet/account/page',
    walletAccountDeal: '/boss/v1/wallet/account/deal',
    walletAccountGet: '/boss/v1/wallet/account/get',
    walletAccountLogList: '/boss/v1/wallet/account/log/list',
    walletAccountSave: '/boss/v1/wallet/account/save',
    walletAccountBankSave: '/boss/v1/wallet/account/bank/save',
    walletBankAccountPage: '/boss/v1/wallet/bank/account/page',
    walletBankAccountDeal: '/boss/v1/wallet/bank/account/deal',
    walletBankAccountGet: '/boss/v1/wallet/bank/account/get',
    walletBankConfigGet: '/boss/v1/wallet/bank/config/page',
    walletBankLogList: '/boss/v1/wallet/bank/log/list',
    walletBankAccountSave: '/boss/v1/wallet/bank/account/save',
    walletBankApplyPage: '/boss/v1/wallet/account/apply/page',
    walletAccountAgree: '/boss/v1/wallet/account/apply/agree',
    walletAccountReject: '/boss/v1/wallet/account/apply/reject',
    walletAccountApplyGet: '/boss/v1/wallet/account/apply/get',
    walletUserDocGet: '/boss/v1/user/doc/get',
    walletBankPage: '/boss/v1/wallet/bank/apply/page',
    walletBankAgree: '/boss/v1/wallet/bank/apply/agree',
    walletBankReject: '/boss/v1/wallet/bank/apply/reject',
    walletBankApplyGet: '/boss/v1/wallet/bank/apply/get',

    // 资金管理
    chargeApplyPage: '/boss/v1/wallet/charge/apply/page',
    transferApplyPage: '/boss/v1/wallet/transfer/apply/page',
    transferApplyGet: '/boss/v1/wallet/transfer/apply/get',
    transferApplyAgree: '/boss/v1/wallet/transfer/apply/agree',
    transferApplyReject: '/boss/v1/wallet/transfer/apply/reject',
    transferChargeAgree: '/boss/v1/wallet/charge/apply/agree',
    transferChargeReject: '/boss/v1/wallet/charge/apply/reject',
    transferChargeGet: '/boss/v1/wallet/charge/apply/get',
    transferWAPage: '/boss/v1/wallet/withdrawal/apply/page',
    transferWAGet: '/boss/v1/wallet/withdrawal/apply/get',
    transferWAAgree: '/boss/v1/wallet/withdrawal/apply/agree',
    transferWAReject: '/boss/v1/wallet/withdrawal/apply/reject',
    transferCABAgree: '/boss/v1/wallet/charge/apply/batch/agree',

    // 基础设置
    bankConfigPage: '/boss/v1/wallet/bank/config/page',
    bankConfigDelete: '/boss/v1/wallet/bank/config/delete',
    bankConfigSave: '/boss/v1/wallet/bank/config/save',
    bankConfigGet: '/boss/v1/wallet/bank/config/get',

    // 交易流水管理
    walletDetailPage: '/boss/v1/wallet/detail/page',
    walletDetailGet: '/boss/v1/wallet/detail/get',
    walletDExport: '/boss/v1/wallet/detail/export',
    walletReceiptPage: '/boss/v1/wallet/receipt/page',
    walletReceiptGet: '/boss/v1/wallet/receipt/get',
    walletReceiptDeal: '/boss/v1/wallet/receipt/deal',

    // 账务中心 - 标准科目管理
    subjectList: '/boss/v1/course/page',
    subjectSave: '/boss/v1/course/save',
    subjectDelete: '/boss/v1/course/delete',
    subjectDownload: '/boss/v1/course/export',
    subjectUpload: '/boss/v1/course/upload',


    // 账务中兴 - 科目模板管理
    templateList: '/boss/v1/course/template/page',
    templateUpdate: '/boss/v1/course/template/update',
    templateGet: '/boss/v1/course/template/get',
    templateDelete: '/boss/v1/course/template/delete',
    templateSave: '/boss/v1/course/template/save',
    templateAllList: '/boss/v1/course/template/list',

    // 账务中心 - 业务节点管理
    businessNodePage: '/boss/v1/course/node/page',
    businessNodeSave: '/boss/v1/course/node/save',
    businessNodeDelete: '/boss/v1/course/node/delete',

    // 账务中心 - 记账规则
    accountingRulePage: '/boss/v1/course/rule/page',
    accountingRuleDelete: '/boss/v1/course/rule/delete',
    accountingRuleEnable: '/boss/v1/course/rule/update',
    accountingRuleSave: '/boss/v1/course/rule/save',
    accountingRuleDetail: '/boss/v1/course/rule/get',

    // 借方科目搜索
    accountingDebitEntrySearch: '/boss/v1/course/template/find',


    // 用户中心
    PersonalUserListPage: '/boss/v1/user/person/page', // 个人用户列表
    PersonalUserListGet: '/boss/v1/user/person/get', // 个人用户详情

    EnterpriseUsersPage: '/boss/v1/user/account/page', // 企业用户列表
    EnterpriseUsersGet: '/boss/v1/user/account/get', // 企业用户详情
    EnterpriseUsersIndustryList: '/api/v1/user/industry/list', // 行业列表
    EnterpriseUsersJurisdiction: '/boss/v1/user/account/auth/get', // 权限
    EnterpriseUsersRoleGet: '/boss/v1/user/auth/role/get', // 获取角色详情
    EnterpriseUsersGroupGet: '/boss/v1/user/auth/group/get', // 权限组详情
    EnterpriseUsersPartnerGet: '/boss/v1/user/erp/partner/get', // 权限组详情

    OperationalLogPage: '/boss/v1/user/operate/log/page', // 用户日志管理
    LogInAndLogOutPage: '/boss/v1/user/login/log/page', // 登录登出列表

    /*
    * 消息中心
    * */
    MesInfoPage: '/boss/v1/info/page', // 消息管理列表
    // MesInfoCList: '/boss/v1/info/cat/list', // 消息类型列表
    MesInfoCList: '/boss/v1/info/type/list', // 消息类型列表
    MesInfoGet: '/boss/v1/info/get', // 消息类型列表
    MesInfoTPage: '/boss/v1/info/template/page', // 消息模板列表
    // MesInfoTGet: '/boss/v1/info/template/get', // 消息模板详情
    MesInfoTGet: '/boss/v1/info/template/info', // 消息模板详情
    MesInfoTSave: '/boss/v1/info/template/save', // 消息模板新增、编辑
    MesInfoRPage: '/boss/v1/info/rule/page', // 消息分发规则列表
    MesInfoRGet: '/boss/v1/info/rule/get', // 消息分发规则详情
    MesInfoRLGet: '/boss/v1/info/rule/log/get', // 消息分发规则修改记录

    /*
    * 商品中心
    * */
    SellerGPage: '/boss/v1/seller/goods/page', // 产品列表
    SellerGGet: '/boss/v1/seller/goods/get', // 产品详情
    SellerGLList: '/boss/v1/seller/goods/log/list', // 产品操作记录
    SellerGCPage: '/boss/v1/seller/goods/category/page', // 产品类目列表
    SellerGCGet: '/boss/v1/seller/goods/category/get', // 产品类目详情
    ShopGPage: '/boss/v1/shop/goods/page', // 商品列表
    ShopGGet: '/boss/v1/shop/goods/get', // 商品详情
    ShopGLList: '/boss/v1/shop/goods/log/list', // 商品操作记录
    ShopGCPage: '/boss/v1/shop/goods/cat/page', // 商品分类列表
    ShopGCGet: '/boss/v1/shop/goods/cat/get', // 商品分类详情
    ShopGTPage: '/boss/v1/shop/goods/tag/page', // 商品标签列表
    ShopPage: '/boss/v1/shop/page', // 销售终端列表
    ShopGet: '/boss/v1/shop/get', // 销售终端详情

    /*
    * 订单中心
    * */
    OrderSPage: '/boss/v1/order/sale/page', // 交易单列表
    OrderSGet: '/boss/v1/order/sale/get', // 交易单详情
    OrderASPage: '/boss/v1/order/after/sale/page', // 售后单列表
    OrderASGet: '/boss/v1/order/after/sale/get', // 售后单详情
    OrderASLList: '/boss/v1/order/after/sale/log/list', // 售后单操作记录
    OrderPage: '/boss/v1/order/page', // 订单管理列表
    OrderGet: '/boss/v1/order/get', // 订单管理详情
    OrderLList: '/boss/v1/order/log/list', // 操作记录
    OrderDPage: '/boss/v1/order/delivery/page', // 收发货管理列表
    OrderDGet: '/boss/v1/order/delivery/get', // 收发货管理详情
    OrderWLList: '/boss/v1/order/waybill/log/list', // 货单操作记录
    OrderSRPage: '/boss/v1/order/sales/return/page', // 退货单列表
    OrderSRGet: '/boss/v1/order/sales/return/get', // 退货单详情

    /*
    * 支付中心
    * */
    walletPRPage: '/boss/v1/wallet/pay/receive/page', // 收付款单列表
    walletPRGet: '/boss/v1/wallet/pay/receive/get', // 收付款单详情
    walletPCLList: '/boss/v1/wallet/pay/capital/log/list', // 用户操作记录
    walletPRefundPage: '/boss/v1/wallet/pay/refund/page', // 退款单列表
    walletPRefundGet: '/boss/v1/wallet/pay/refund/get', // 退款单详情
    walletPAPage: '/boss/v1/wallet/pay/account/page', // 商户账户列表
    walletPAGet: '/boss/v1/wallet/pay/account/get', // 商户账户详情
    walletPAALList: '/boss/v1/wallet/pay/account/admin/log/list', // 管理员操作记录
    walletPALList: '/boss/v1/wallet/pay/account/log/list', // 用户操作记录
    walletPAAPage: '/boss/v1/wallet/pay/account/apply/page', // 账户申请列表
    walletPAAGet: '/boss/v1/wallet/pay/account/apply/get', // 账户申请详情
    walletPACPage: '/boss/v1/wallet/pay/account/cancel/page', // 注销申请列表
    walletPACGet: '/boss/v1/wallet/pay/account/cancel/get', // 注销申请详情
    walletPSBPage: '/boss/v1/wallet/pay/shop/bind/page', // 绑定关系列表
    walletPSBGet: '/boss/v1/wallet/pay/shop/bind/get', // 绑定关系详情
    walletPBALList: '/boss/v1/wallet/pay/bind/admin/log/list', // 管理员操作记录
    walletPBLList: '/boss/v1/wallet/pay/bind/log/list', // 用户操作记录
    walletPSBAPage: '/boss/v1/wallet/pay/shop/bind/apply/page', // 绑定申请列表
    walletPSBAGet: '/boss/v1/wallet/pay/shop/bind/apply/get', // 绑定申请详情
    walletPSBCPage: '/boss/v1/wallet/pay/shop/bind/cancel/page', // 解绑申请列表
    walletPSBCGet: '/boss/v1/wallet/pay/shop/bind/cancel/get', // 解绑申请详情
    walletPCPage: '/boss/v1/wallet/pay/channel/page', // 收支付渠道列表
    walletPCGet: '/boss/v1/wallet/pay/channel/get', // 收支付渠道详情
    walletPSALList: '/boss/v1/wallet/pay/set/admin/log/list', // 基本设置的管理员操作
    walletPCSave: '/boss/v1/wallet/pay/channel/save', // 收支付渠道保存
    walletPCDelete: '/boss/v1/wallet/pay/channel/delete', // 收支付渠道删除
    walletPPPage: '/boss/v1/wallet/pay/plan/page', // 收支付方案列表
    walletPPGet: '/boss/v1/wallet/pay/plan/get', // 收支付方案详情
    walletPPSave: '/boss/v1/wallet/pay/plan/save', // 收支付方案新建、编辑
    walletPPDelete: '/boss/v1/wallet/pay/plan/delete', // 收支付方案删除

    /*
    * 合同中心
    * */
    ContractPage: '/boss/v1/contract/page', // 合同列表
    ContractGet: '/boss/v1/contract/get', // 合同详情
    ContractLList: '/boss/v1/contract/log/list', // 合同审批记录
    ContractAPage: '/boss/v1/contract/apply/get', // 合同申请信息
    ContractPPage: '/boss/v1/contract/protocol/page', // 协议列表
    ContractPGet: '/boss/v1/contract/protocol/get', // 协议详情
    ContractPLList: '/boss/v1/contract/protocol/log/list', // 协议审批记录

    /*
    * 税票中心
    * */
    InvoiceIPage: '/boss/v1/invoice/info/page', // 开票信息列表
    InvoiceIGet: '/boss/v1/invoice/info/get', // 开票信息详情
    InvoiceILog: '/boss/v1/invoice/info/log', // 开票信息与抬头信息操作日志
    InvoiceRPage: '/boss/v1/invoice/rise/page', // 抬头信息列表
    InvoiceRGet: '/boss/v1/invoice/rise/get', // 抬头信息详情
    InvoiceBAPage: '/boss/v1/invoice/blue/apply/page', // 蓝字发票申请列表
    InvoiceBAGet: '/boss/v1/invoice/blue/apply/get', // 蓝字发票申请详情
    InvoiceMULog: '/boss/v1/invoice/manage/user/log', // 发票用户操作日志
    InvoiceMALog: '/boss/v1/invoice/manage/admin/log', // 发票管理员操作日志
    InvoiceRAPage: '/boss/v1/invoice/red/apply/page', // 红冲发票申请列表
    InvoiceRAGet: '/boss/v1/invoice/red/apply/get', // 红冲发票申请详情
    InvoiceBPage: '/boss/v1/invoice/blue/page', // 蓝字发票列表
    InvoiceBGet: '/boss/v1/invoice/blue/get', // 蓝字发票详情
    InvoiceRedPage: '/boss/v1/invoice/red/page', // 红冲发票列表
    InvoiceRedGet: '/boss/v1/invoice/red/get', // 红冲发票详情
    InvoiceSPage: '/boss/v1/invoice/send/page', // 发票单寄送列表
    InvoiceSGet: '/boss/v1/invoice/send/get', // 发票单寄送详情
    InvoiceSLGet: '/boss/v1/invoice/send/log/get', // 发票单寄送操作日志
    InvoiceCPage: '/boss/v1/invoice/classify/page', // 发票分类列表
    InvoiceCGet: '/boss/v1/invoice/classify/get', // 发票分类详情
    InvoiceCSave: '/boss/v1/invoice/classify/save', // 发票分类新增、编辑
    InvoiceCDelete: '/boss/v1/invoice/classify/delete', // 发票分类删除
    InvoiceBLog: '/boss/v1/invoice/basics/log', // 基本信息操作日志
    InvoiceEPage: '/boss/v1/invoice/element/page', // 发票要素列表
    InvoiceEGet: '/boss/v1/invoice/element/get', // 发票要素详情
    InvoiceESave: '/boss/v1/invoice/element/save', // 发票要素新增、编辑
    InvoiceEDelete: '/boss/v1/invoice/element/delete', // 发票要素新增、编辑
    InvoiceEGPage: '/boss/v1/invoice/element/group/page', // 发票要素组列表
    InvoiceEGGet: '/boss/v1/invoice/element/group/get', // 发票要素组详情
    InvoiceEGSave: '/boss/v1/invoice/element/group/save', // 发票要素组新增、编辑
    InvoiceEGDelete: '/boss/v1/invoice/element/group/delete', // 发票要素组删除
    InvoiceTPage: '/boss/v1/invoice/template/page', // 发票模板列表
    InvoiceTGet: '/boss/v1/invoice/template/get', // 发票模板详情
    InvoiceTSave: '/boss/v1/invoice/template/save', // 发票模板新增、编辑
    InvoiceTDelete: '/boss/v1/invoice/template/delete', // 发票模板删除

    /*
    * 用户中心
    * */
    UserLLPage: '/boss/v1/user/login/log/page', // 登录登出日志列表
    UserOLPage: '/boss/v1/user/operate/log/page', // 登录登出日志列表
    UserPPage: '/boss/v1/user/person/page', // 个人用户列表
    UserPGet: '/boss/v1/user/person/get', // 个人用户详情
    UserAPage: '/boss/v1/user/account/page', // 企业用户列表
    UserAGet: '/boss/v1/user/account/get', // 企业用户详情
    UserEBGet: '/boss/v1/user/erp/business/get', // 企业业务详情
    UserEPGet: '/boss/v1/user/erp/partner/get', // 企业合作伙伴详情
    UserARGet: '/boss/v1/user/auth/role/get', // 获取角色详情
    UserAAGet: '/boss/v1/user/account/auth/get', // 企业用户权限详情
    UserProjectPage: '/boss/v1/user/project/page', // 项目用户列表
    UserProjectGet: '/boss/v1/user/project/get', // 项目用户详情
    UserProjectAddressPage:'/boss/v1/user/project/address/page',// 项目用户业务地址列表
    UserProjectRelation:'/boss/v1/user/project/relation/company/info', // 项目用户企业授权详情
    UserProjectSupplier:'/boss/v1/user/project/supplier/page', // 项目用户供应商列表

    /*
    * 认证中心
    * */
    UserAttDPage: '/boss/v1/user/doc/page', // 用户认证组列表
    UserAttDGet: '/boss/v1/user/doc/get', // 用户认证组详情
    UserAttDDelete: '/boss/v1/user/doc/delete', // 用户认证组删除
    UserAttDUpdate: '/boss/v1/user/doc/update', // 用户认证组修改
    UserAttDPGet: '/boss/v1/rsu/doc/parent/get', // 获取认证模板
    UserAttDocPage: '/boss/v1/doc/page', // 资质列表
    UserAttDocGet: '/boss/v1/doc/get', // 资质详情
    UserAttDocDel: '/boss/v1/doc/del', // 资质删除
    UserAttDocSave: '/boss/v1/doc/save', // 资质新增、编辑
    UserAttDGSPage: '/boss/v1/doc/group/sub/page', // 资质组列表
    UserAttDGGet: '/boss/v1/doc/group/get', // 资质组详情
    UserAttDGDel: '/boss/v1/doc/group/del', // 资质组删除
    UserAttDGSave: '/boss/v1/doc/group/save', // 资质组新增、编辑
    UserAttDocPPage: '/boss/v1/doc/parent/page', // 认证组列表
    UserAttDocPGet: '/boss/v1/doc/parent/get', // 认证组详情
    UserAttDocPDel: '/boss/v1/doc/parent/del', // 认证组删除
    UserAttDocPSave: '/boss/v1/doc/parent/save', // 认证组新增、编辑
    UserAttDRPage: '/boss/v1/doc/rule/page', // 认证规则列表
    UserAttDRGet: '/boss/v1/doc/rule/get', // 认证规则详情
    UserAttDRDel: '/boss/v1/doc/rule/del', // 认证规则删除
    UserAttDRSave: '/boss/v1/doc/rule/save', // 认证规则新增、编辑
    UserAttDRSModify: '/boss/v1/doc/rule/status/modify', // 认证规则状态修改

    /*
    * 系统设置
    * */
    SystemSetupAList: '/boss/v1/admin/list', // 管理员列表
    SystemSetupASave: '/boss/v1/admin/save', // 管理员新增、编辑
    SystemSetupADelete: '/boss/v1/admin/delete', // 删除改管理员
    SystemSetupAUpdate: '/boss/v1/admin/update', // 重置密码
    SystemSetupASWPage: '/boss/v1/admin/sensitive/word/page', // 敏感词列表
    SystemSetupASWDelete: '/boss/v1/admin/sensitive/word/delete', // 敏感词删除
    SystemSetupASWSave: '/boss/v1/admin/sensitive/word/save', // 敏感词新增、编辑
    SystemSetupASWUpload: '/boss/v1/admin/sensitive/word/upload', // 上传敏感词文件
    SystemSetupASWExport: '/boss/v1/admin/sensitive/word/export', // 下载敏感词文件

    /*
    * 云服务中心
    * */
    CServeSDPage: '/boss/v1/soft/developer/page', // 开发者白名单列表
    CServeSDSave: '/boss/v1/soft/developer/save', // 开发者白名单保存
    CServeSDDelete: '/boss/v1/soft/developer/delete', // 开发者白名单删除
    CServeSCPage: '/boss/v1/soft/cat/page', // 云服务分类列表
    CServeSCGet: '/boss/v1/soft/cat/get', // 云服务分类详情
    CServeSCSave: '/boss/v1/soft/cat/save', // 云服务分类保存
    CServeSCDelete: '/boss/v1/soft/cat/delete', // 云服务分类删除
    CServeSUPage: '/boss/v1/soft/user/page', // 云服务实例列表
    CServeSUGet: '/boss/v1/soft/user/get', // 云服务实例详情
    CServeSUSave: '/boss/v1/soft/user/save', // 云服务实例保存
    CServeSUAPage: '/boss/v1/soft/user/auth/page', // 云服务实例使用权用户列表
    CServeSGPage: '/boss/v1/soft/goods/page', // 云服务规则列表
    CServeSGGet: '/boss/v1/soft/goods/get', // 云服务规则详情
    CServeSGSave: '/boss/v1/soft/goods/save', // 云服务规则保存
    CServeSGDelete: '/boss/v1/soft/goods/delete', // 云服务规则删除
    UserAttSList: '/boss/v1/soft/page', // 云服务列表
    UserAttSBigList: '/boss/v1/soft/list', // 云服务列表
    UserAttSGet: '/boss/v1/soft/get', // 云服务详情
    CServeSVPage: '/boss/v1/soft/version/page', // 云服务版本情况列表
    CServeSLPage: '/boss/v1/soft/list/page', // 云服务黑\白名单列表
    CServeSAPage: '/boss/v1/user/auth/resource/page', // 云服务权限配置列表
    CServeSDelete: '/boss/v1/soft/delete', // 云服务删除
    CServeSARDownload: '/boss/v1/soft/auth/resource/download', // 云服务下载权限模板
    CServeSARUpload: '/boss/v1/soft/auth/resource/upload', // 云服务导入权限模板
    CServeSSave: '/boss/v1/soft/save', // 云服务保存

    /*商机助手*/
    boosLogin: '/boss/login',
    // getOpportunityUserList: '/boss/admin/user/list',
    getOpportunityUserList: '/boss/v1/clue/user/page',
    // getOpportunityClueList: '/boss/admin/clue/list',
    getOpportunityClueList: '/boss/v1/clue/user/clue/page',
    // getOpportunityExport: '/boss/admin/clue/export',
    getOpportunityExport: '/boss/v1/clue/batch/export',
    // getOpportunitySourceList: '/boss/source/list',
    getOpportunitySourceList: '/boss/v1/clue/source/list',


    /*电子签章服务中心*/
    ESPlatformApplyPage: '/boss/v1/esign/platform/apply/page',
    ESPlatformApplyGet: '/boss/v1/esign/platform/apply/get',
    ESPlatformApplyAgree: '/boss/v1/esign/platform/apply/agree',
    ESPlatformApplyReject: '/boss/v1/esign/platform/apply/reject',
    GetServiceRuleList: '/boss/v1/esign/service/rule/page',  // 获取服务规则列表
    GetServiceRuleDetail: '/boss/v1/esign/service/rule/get', // 获取服务规则详情
    AddOrEditServiceRule: '/boss/v1/esign/service/rule/save', // 添加或修改服务规则
    GetServiceGoodsList: '/boss/v1/shop/goods/service/page', // 获取服务商品列表
    GetServiceGoodsDetail: '/boss/v1/shop/goods/service/get', // 获取服务商品详情
    GetServiceList: '/boss/v1/esign/service/list', //获取服务列表
    DeleteServiceRule: '/boss/v1/esign/service/rule/delete', // 删除指定的服务规则

    GetPlatformDataStatistics: '/boss/v1/esign/platform/statistics/get', //平台数据统计(今日数据)
    GetPlatformUseData: '/boss/v1/esign/platform/statistics/service/list', // 获取终端使用数据
    GetPlatformPayData: '/boss/v1/esign/platform/statistics/payment/list', // 获取终端付费数据
    GetPlatformList: '/boss/v1/esign/platform/list', // 获取平台列表
    GetPlatformForPage: '/boss/v1/esign/platform/page', // 获取平台分页列表
    GetPlatformServiceList: '/boss/v1/esign/service/platform/list', // 获取平台服务列表

    GetServiceInstanceList: '/boss/v1/esign/service/instance/page', // 服务实例分页列表
    GetServiceInstanceDetail: '/boss/v1/esign/service/instance/get', // 服务实例详情
    GetServiceInstanceLog: '/boss/v1/esign/service/instance/log/list', // 服务实例使用记录列表

    GetCustomerList: '/boss/v1/esign/platform/customer/list', // 获取平台客户列表
    GetUseDateList: '/boss/v1/esign/platform/statistics/service/list', // 获取终端企业使用数据
    GetPayDateList: '/boss/v1/esign/platform/statistics/payment/list', // 获取终端企业付费数据

    GetCustomerPageList: '/boss/v1/esign/platform/customer/page', // 获取平台客户分页列表
    GetCustomerDetail: '/boss/v1/esign/platform/customer/get', // 获取平台客户详情
    GetCustomerPurchaseList: '/boss/v1/esign/service/instance/customer/purchase/list', // 获取平台客户购买记录

    GetPaymentPageList: '/boss/v1/esign/service/instance/customer/payment/page', // 付费分页列表
    GetPaymentDetailPageList: '/boss/v1/esign/service/instance/customer/payment/detail/page', // 企业付费分页列表
    GetSealPageList: '/boss/v1/esign/service/log/seal/page', // 印章服务使用明细分页列表
    GetAuthPageList: '/boss/v1/esign/service/log/auth/page', // 认证服务使用明细分页列表


    /*收支付助手*/
    GetCompanyPageList: '/boss/v1/wallet/merchants/company/page', // 平台获取企业商户列表
    GetCompanyInfo: '/boss/v1/wallet/merchants/company/info', // 平台获取企业商户详情
    GetPersonalPageList: '/boss/v1/wallet/merchants/persona/page', // 平台获取个人商户列表
    GetPersonalInfo: '/boss/v1/wallet/merchants/personal/info', // 平台获取个人商户详情
    MerchantsEnable: '/boss/v1/wallet/merchants/enable', // 启用商户
    MerchantsForbidden: '/boss/v1/wallet/merchants/forbidden', // 禁用商户

    GetApplyCompanyPageList: '/boss/v1/wallet/merchants/apply/company/page', // 获取企业商户申请列表
    GetApplyPersonalPageList: '/boss/v1/wallet/merchants/apply/personal/page', // 获取个人商户申请列表
    GetApplyCompanyInfo: '/boss/v1/wallet/merchants/apply/company/info', // 获取企业商户申请列表详情
    GetApplyPersonalInfo: '/boss/v1/wallet/merchants/apply/personal/info', // 获取个人商户申请详情
    ApprovedCompanyApply: '/boss/v1/wallet/merchants/apply/company/approved', // 同意企业商户申请
    RefuseCompanyApply: '/boss/v1/wallet/merchants/apply/company/refuse', // 拒绝企业商户申请
    ApprovedPersonalApply: '/boss/v1/wallet/merchants/apply/personal/approved', // 同意个人商户申请
    RefusePersonalApply: '/boss/v1/wallet/merchants/apply/personal/refuse', // 拒绝个人商户申请
    UpdatePayPlan: '/boss/v1/wallet/merchants/pay/plan/update', // 修改商户支付方案

    GetChannelPageList: '/boss/v1/pay/channel/page', // 支付通道分页列表
    GetChannelList: '/boss/v1/pay/channel/list', // 支付通道列表
    GetChannelInfo: '/boss/v1/pay/channel/info', // 支付通道详情
    EnableChannel: '/boss/v1/pay/channel/enable', // 启用支付通道
    ForbiddenChannel: '/boss/v1/pay/channel/forbidden', // 禁用支付通道

    GetPayPlanPageList: '/boss/v1/pay/plan/page', // 方案分页列表
    GetPayPlanInfo: '/boss/v1/pay/plan/info', // 方案详情
    GetPayPlanList: '/boss/v1/pay/plan/list', // 获取方案列表
    AddOrEditPayPlanInfo: '/boss/v1/pay/plan/save', // 新增或修改支付方案

    GetRatePageList: '/boss/v1/pay/rate/page', // 费率分页列表
    GetRateInfo: '/boss/v1/pay/rate/info', // 费率详情
    GetRateList: '/boss/v1/pay/rate/list', // 费率列表
    AddOrEditRate: '/boss/v1/pay/rate/save', // 新增或修改支付费率

    GetLimitPageList: '/boss/v1/pay/limit/page', // 限额分页列表
    GetLimitInfo: '/boss/v1/pay/limit/info', // 限额详情
    GetLimitList: '/boss/v1/pay/limit/list', // 限额列表
    AddOrEditLimit: '/boss/v1/pay/limit/save', // 新增或修改限额

    /*
     * 平台产品库
     * */
    PlatformProductList: "/boss/v1/goods/platform/goods/page",
    PlatformProductGet: "/boss/v1/goods/platform/goods/get",
    PlatformProductAdd: "/boss/v1/goods/platform/goods/add",
    PlatformProductUpdate: "/boss/v1/goods/platform/goods/update",
    PlatformProductEnable: "/boss/v1/goods/platform/goods/enable",
    PlatformProductDisable: "/boss/v1/goods/platform/goods/forbidden",
    PlatformProductDel: "/boss/v1/goods/platform/goods/delete",
    PlatformProductBatchDel: "/boss/v1/goods/platform/goods/batch/delete",
    PlatformClassList: "/boss/v1/goods/platform/goods/category/list",
    PlatformClassGet: "/boss/v1/goods/platform/goods/category/get",
    PlatformClassSave: "/boss/v1/goods/platform/goods/category/save",
    PlatformClassDel: "/boss/v1/goods/platform/goods/category/delete",
    PlatformClassEnable: "/boss/v1/goods/platform/goods/category/status/update",
    PlatformProductApplyList: "/boss/v1/goods/platform/goods/apply/page",
    PlatformProductApplyGet: "/boss/v1/goods/platform/goods/apply/get",
    PlatformProductApplyAgree: "/boss/v1/goods/platform/goods/apply/agree",
    PlatformProductApplyReject: "/boss/v1/goods/platform/goods/apply/reject",
    PlatformProductPlatformGoodsList: "/boss/v1/goods/relation/platform/goods/page",
    PlatformProductErpGoodsList: "/boss/v1/goods/relation/goods/page",
    PlatformCompanyErpGet: "/boss/v1/seller/goods/parent/get",

    /*
     * 平台物资库
     * */
    MaterialsCenterProductList: "/boss/v1/lease/platform/goods/page",
    MaterialsCenterProductGet: "/boss/v1/lease/platform/goods/get",
    MaterialsCenterProductAdd: "/boss/v1/lease/platform/goods/add",
    MaterialsCenterProductUpdate: "/boss/v1/lease/platform/goods/update",
    MaterialsCenterProductEnable: "/boss/v1/lease/platform/goods/enable",
    MaterialsCenterProductDisable: "/boss/v1/lease/platform/goods/forbidden",
    MaterialsCenterProductDel: "/boss/v1/lease/platform/goods/delete",
    MaterialsCenterProductBatchDel: "/boss/v1/lease/platform/goods/batch/delete",
    MaterialsCenterClassList: "/boss/v1/lease/platform/goods/category/list",
    MaterialsCenterClassGet: "/boss/v1/lease/platform/goods/category/get",
    MaterialsCenterClassSave: "/boss/v1/lease/platform/goods/category/save",
    MaterialsCenterClassDel: "/boss/v1/lease/platform/goods/category/delete",
    MaterialsCenterClassEnable: "/boss/v1/lease/platform/goods/category/status/update",
    MaterialsCenterPlatformGoodsSelecct: '/boss/v2/goods/platform/goods/page',
    MaterialsCenterConvertUntitSelect: "/boss/v1/lease/platform/goods/optional/unit/list",

    /**
     * 平台单位
     */
    PlatformUnitPage: '/boss/v1/goods/platform/unit/page', // 平台单位分页列表
    UnitSave: '/boss/v1/goods/platform/unit/save', // 保存单位
    UnitDelete: '/boss/v1/goods/platform/unit/delete', // 删除单位
    UnitEnable: '/boss/v1/goods/platform/unit/enable', // 启用单位
    UnitDisable: '/boss/v1/goods/platform/unit/forbidden', // 停用单位


};
export default ApiInterface;
