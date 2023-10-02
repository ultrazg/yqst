/**
 * 接口信息，每个功能要注释
 */

let ApiInterface = {
    /*
     短信认证
     */
    SMSCertification: '/api/v1/sms/send',
    verifyCode: '/api/v1/sms/verify',
    verifyPayCode: '/api/v1/sms/check',

    /*
    * 个人隐私
    * */
    userPrivacyGet: '/api/v1/user/privacy/get',
    userPrivacySave: '/api/v1/user/privacy/save',
    UserPrivacyCInfo: '/api/v1/user/individualization/config/info',
    UserPrivacyCUpdate: '/api/v1/user/individualization/config/update',

    /*
    * 名片管理
    * */
    userCardPage: '/api/v1/user/card/page',
    userCardSave: '/api/v1/user/card/save',

    /*
     注册设置密码
     */
    SetPassword: '/api/v1/user/register',
    CheckPhone: '/api/v1/user/checked',
    CheckPhoneReg: '/api/v1/user/checked/register',
    Proto: '/api/v1/user/proto',
    /*
     绑定个人新手机号
     */
    userPhoneChange: '/api/v1/user/phone/change',

    /*
     忘记密码重设
     */
    ForgetPswSetPassword: '/api/v1/user/forget',

    /*
    * 个人设置修改登录密码
    * */
    ChangePassword: '/api/v1/user/init',

    /**
     PC登录
     */
    Login: '/api/v1/erp/account/login',
    LoginWithCode: '/api/v1/erp/account/mobile',
    LoginWithQrCode: '/api/v1/erp/qrCode/login',
    getLoginQrCode: '/api/v1/erp/qrCode/get',
    /*
    * 退出登陆
    * */
    logout: '/api/v1/msg/notify/release',
    /**
     免密码登录
     */
    AutoLogin: '/api/v1/user/autoLogin',
    /**
     通过订单号查询物流信息
     */
    ExpressInfo: '/api/v1/express/express',
    /**
     完善企业信息
     */
    WriteEnterpriseInfo: '/api/v1/company/add',
    /**
     * 邀请码注册模块
     */
    Code: '/api/v1/code/code',              //检测邀请码可用
    GetRegisterType: '/api/v1/code/check',  //检测跳转绑定页面还是注册页面
    BindRegisterCode: '/api/v1/code/apply',  //直接绑定界面
    InviteSucceed: '/api/v1/code/invite',   //邀请码成功页面
    CodeRegister: '/api/v1/code/register',  //邀请码注册时绑定
    /**
     * 生成分享码地址
     */
    GetShareCode: '/api/v1/code/get',
    /**
     * 获取企业信息
     */
    EnterpriseInfo: '/api/v1/company/get',
    /**
     * 根据企业号获取企业信息
     */
    GetEnterpriseInfo: '/api/v1/company/obtain',

    /**
     * 获取版本更新信息
     */
    GetVersionsInfo: '/api/v1/notify/version/check',
    /**
     * 修改企业头像
     */
    ModifyIcon: '/api/v1/company/modify',
    /**
     * 修改个人头像
     */
    ModifyPersonalIcon: '/api/v1/user/update',
    /**
     * 修改企业信息
     */
    SetCompanyInfo: '/api/v1/company/update',
    /**
     * 获取个人信息
     */
    getUserInfo: '/api/v1/user/getInfo',
    /**
     * 获取用户信息二维码
     */
    GetUserCode: '/api/v1/code/userCodeGet',
    /**
     * 获取企业二维码（用于邀请合作伙伴）
     */
    GetEnterpriseCode: '/api/v1/code/enterpriseCodeGet',
    /**
     * 采购单详情
     */
    PurchaseNotesDetail: '/api/v1/order/buyer/get', //"/api/v1/buyer/order/get",
    /**
     * 取消软件服务订单
     */
    CancelServerOrder: '/api/v1/order/buyer/soft/cancel', //'/api/v1/buyer/order/soft/cancel',
    /**
     * 销售单详情
     */
    SalesNotesDetail: '/api/v1/order/seller/desc', //"/api/v1/seller/order/desc",
    /**
     * 提交采购单
     */
    ComfirmPurchaseNotes: '/api/v1/order/buyer/confirm', //"/api/v1/buyer/order/confirm",
    /**
     * 闪购结算
     */
    FastPurchaseNotesEdit: '/api/v1/order/buyer/fast', //"/api/v1/buyer/order/fast",
    /**
     * 应用服务列表
     */
    SoftwareList: '/api/v1/software/goods/paging',

    /**
     * 用户服务列表
     */
    SoftList: '/api/v1/soft/user/list',  //"/api/v1/user/soft/list",
    /**
     * 企业实名认证
     */
    // userDocDetail: '/api/v1/user/doc/detail',
    // rsuDocParentGet: '/api/v1/rsu/doc/parent/get',
    // userDocExist: '/api/v1/user/doc/exist',
    // userParentDocGet: '/api/v1/user/parent/doc/get',
    // userDocSave: '/api/v1/user/doc/save',

    /*
    * 创建企业
    * */
    UserIList: '/api/v1/user/industry/list', // 获取行业列表
    UserCUpdate: '/api/v1/user/company/update', // 编辑企业信息(不含资质信息)

    /*
    初始化工具
     */
    LessorInitPage: '/api/v1/lease/settlement/init/lessor/page', // 出租方
    LesseeInitPage: '/api/v1/lease/settlement/init/lessee/page', // 承租方
    LeaseGoodsPage: '/api/v1/lease/goods/page', // 出租方选择物资
    // LeaseGoodsPage: '/api/v1/lease/goods/sku/page', // 出租方选择物资
    LesseeAllPage: '/api/v1/lease/partner/lessee/all/page',
    LessorUsePage: '/api/v1/lease/project/lessor/init/use/page', // /api/v1/lease/project/lessor/use/page
    LessorInitAdd: '/api/v1/lease/settlement/init/lessor/add',
    InitDetailGet: '/api/v1/lease/settlement/init/get', // 初始化详情
    LessorInitUpdate: '/api/v1/lease/settlement/init/lessor/update',
    LessorInitSubmit: '/api/v1/lease/settlement/init/lessor/submit',
    LesseeInitConfirm: '/api/v1/lease/settlement/init/lessee/confirm',
    LesseeInitReject: '/api/v1/lease/settlement/init/lessee/reject',
    LesseeUseProjectPage: '/api/v1/lease/project/lessee/init/use/page', // /api/v1/lease/project/lessee/use/page
    LesseeGoodsPage: '/api/v1/lease/goods/lessee/page', // 承租方获取租赁物资分页列表
    LesseeAddInit: '/api/v1/lease/settlement/init/lessee/add', // 承租方发起租赁结算期初初始化
    LesseeInitUpdate: '/api/v1/lease/settlement/init/lessee/update', // 承租方修改
    LessorInitConfirm: '/api/v1/lease/settlement/init/lessor/confirm', // 出租方确认
    LessorInitReject: '/api/v1/lease/settlement/init/lessor/reject', //出租方驳回
    LessorAllPage: '/api/v1/lease/partner/lessor/all/page', // 全部出租方分页列表（添加自有出租方等使用）
    LesseeSkuPage: '/api/v1/lease/goods/lessee/sku/page', // 承租方获取租赁物资SKU分页列表
    InitConfGet: '/api/v1/lease/settlement/init/config/get', // 租赁结算期初初始化配置

    /**
     * 垫付款模块接口
     * */
    beforehandApplyRevokePage: '/api/v1/pay/beforehand/apply/revoke/page',
    beforehandApplyRevokeInfo: '/api/v1/pay/beforehand/apply/revoke/info',
    beforehandRevokePage: '/api/v1/pay/beforehand/revoke/page',
    beforehandRevokeInfo: '/api/v1/pay/beforehand/revoke/info',
    // 保证金模块
    beforehandRevokeDepositPage: '/api/v1/pay/beforehand/deposit/page',
    beforehandRevokeDepositInfo: '/api/v1/pay/beforehand/deposit/info',
    beforehandDepositCompanyPayment: '/api/v1/pay/beforehand/deposit/company/payment',
    beforehandDepositCompanyGathering: '/api/v1/pay/beforehand/deposit/company/gathering',
    // 垫付合同模块
    beforehandContractPage: '/api/v1/pay/beforehand/contract/page',
    beforehandContractInfo: '/api/v1/pay/beforehand/contract/info',
    beforehandCEVCGet: '/api/v1/pay/beforehand/contract/esign/verification/code/get', // 获取 e 签宝验证码
    beforehandCCSign: '/api/v1/pay/beforehand/contract/company/sign', // 企业签署合同


    // 代理商合同管理
    agentPBCPage: '/api/v1/agent/pay/beforehand/contract/page',
    agentPBCInfo: '/api/v1/agent/pay/beforehand/contract/info',
    agentPBCEVCGet: '/api/v1/agent/pay/beforehand/contract/esign/verification/code/get',
    agentPBCASign: '/api/v1/agent/pay/beforehand/contract/agent/sign',
    agentARCPage: '/api/v1/agent/advance/receivables/contract/page',
    agentARCInfo: '/api/v1/agent/advance/receivables/contract/info',
    agentARCEVCGet: '/api/v1/agent/advance/receivables/contract/esign/verification/code/get',
    agentARCASign: '/api/v1/agent/advance/receivables/contract/sign/contract',


    payBAPage: '/api/v1/pay/beforehand/apply/page',
    payBAInfo: '/api/v1/pay/beforehand/apply/info',
    payBPage: '/api/v1/pay/beforehand/order/page',
    payBInfo: '/api/v1/pay/beforehand/order/info',
    payBIRevokeTagList: '/api/v1/pay/beforehand/order/revoke/tag/list', // 撤销垫付tag
    payBICompanyRevoke: '/api/v1/pay/beforehand/order/company/revoke', // 企业撤销垫付
    payBICompanySignContract: '/api/v1/pay/beforehand/company/sign/contract', // 企业订单合同签署
    paySCPage: '/api/v1/service/charge/page',
    payBAfterPage: '/api/v1/pay/beforehand/after/page',
    payBAfterInfo: '/api/v1/pay/beforehand/after/info',
    payBARepayment: '/api/v1/pay/beforehand/after/repayment',
    payPPPage: '/api/v1/payment/purchaser/page',
    // payPTPPage: '/api/v1/payment/total/purchaser/page',
    payPTPPage: '/api/v1/payment/total/purchaser/page/for/service',
    payCIRInfo: '/api/v1/service/charge/interest/rate/info',
    payBASave: '/api/v1/pay/beforehand/apply/save',
    payTPInfo: '/api/v1/payment/total/purchaser/info',
    payBSCPage: '/api/v1/pay/beforehand/service/charge/page',
    payBSCInfo: '/api/v1/pay/beforehand/service/charge/info',
    payCPList: '/api/v1/service/charge/period/list',
    paySCDList: '/api/v1/service/charge/day/list',

    /**
     * 服务商品列表
     */
    getSoftGooodsList: '/api/v1/soft/goods/list',
    /**
     * 获取应用父类服务详情
     */
    SoftwareDetails: '/api/v1/software/goods/details',

    /**
     * 获取应用子类服务详情
     */
    SubSoftwareDetails: '/api/v1/software/goods/get',
    /**
     * 获取用户可使用的软件/服务列表(我的服务)
     */
    UserServerGoodsList: '/api/v1/soft/user/bought/list',   //'/api/v1/user/soft/bought/list',
    /**
     * 采购车结算
     */
    PurchaseNotesEdit: '/api/v1/order/buyer/show', //"/api/v1/buyer/order/show",

    /**
     * 采购单列表
     */
    ProcureList: '/api/v1/order/buyer/search', //"/api/v1/buyer/order/search",
    /**
     * 激活服务
     */
    ActivateSoftware: '/api/v1/soft/user/config/add',

    /**
     * 取消采购单
     */
    ProcureCancel: '/api/v1/order/buyer/cancel', //"/api/v1/buyer/order/cancel",
    /**
     * 确认收货
     */
    Receipt: '/api/v1/order/buyer/handle', //"/api/v1/buyer/order/handle",
    /**
     * 再次购买检查
     */
    BuyAgainCheck: '/api/v1/order/buyer/check', //"/api/v1/buyer/order/check",
    /**
     * 再次购买,批量加入购物车
     */
    AddAllToCart: '/api/v1/order/buyer/built', //"/api/v1/buyer/order/built",
    /**
     * 销售方的商品列表
     */
    GoodsList: '/api/v1/seller/goods/inventory',

    /**
     * 采购商品列表
     */
    // BuyerGoodsList: '/reducers.php/api/v1/Buyer/Goods/inventory',
    BuyerGoodsList: '/api/v1/buyer/goods/inventory',

    /**
     * 客户商品分类列表
     */
    // GoodsCategory: "/reducers.php/api/v1/Buyer/Goods/category",
    GoodsCategory: '/api/v1/buyer/goods/category',
    /**
     * 采购方商品详情(父类)
     */
    // GoodsDetail: '/reducers.php/api/v1/Buyer/Goods/details',
    // GoodsDetail: '/api/v1/buyer/goods/details',
    GoodsDetail: '/api/v1/shop/buyer/goods/detail',

    /**
     * 买家商品详情(子类)
     */
    // ChildGoodsDetail: '/reducers.php/api/v1/Buyer/Goods/get',
    // ChildGoodsDetail: '/api/v1/buyer/goods/get',
    ChildGoodsDetail: '/api/v1/shop/buyer/goods/get',

    // AddGoodsToCart: '/reducers.php/api/v1/Buyer/Cart/add',
    AddGoodsToCart: '/api/v1/car/add',
    AddGoodsToCarts: '/api/v1/car/adds',

    /**
     * 获取支付列表
     */
    // GetPaymentList: '/reducers.php/api/v1/Buyer/payment/search',
    GetPaymentList: '/api/v1/pay/search',

    /**
     * 临时支付接口
     */
    // tempPayToOrder: '/reducers.php/api/v1/Buyer/payment/tmp',
    tempPayToOrder: '/api/v1/pay/tmp',
    /**
     * 线下支付
     */
    OfflinePay: '/api/v1/order/buyer/pay', //'/api/v1/buyer/order/buyer/pay',
    /**
     * 确认线下支付
     */
    CheckOfflinePay: '/api/v1/order/seller/sure', //'/api/v1/seller/order/sure',
    /**
     * 添加到购物车
     */
    // AddToCart: '/reducers.php/api/v1/Buyer/Cart/add',
    AddToCart: '/api/v1/car/add',

    /*
     购物车模块
     */
    // BuyingCarInfoList: '/reducers.php/api/v1/Buyer/Cart/search',
    // BuyingCarGoodUpdateCount: '/reducers.php/api/v1/Buyer/Cart/put',
    // BuyingCarGoodDel: '/reducers.php/api/v1/Buyer/Cart/delete',
    // BuyingCarInfoList: '/api/v1/car/search',
    BuyingCarInfoList: '/api/v1/car/desc',
    BuyingCarGoodUpdateCount: '/api/v1/car/put',
    BuyingCarGoodDel: '/api/v1/car/delete',
    BuyingCarGoodList: '/api/v1/car/list',

    /*
     销售单列表
     */
    OrdersList: '/api/v1/order/seller/search', //'/api/v1/seller/order/search',
    /**
     * 获取平台可用物流公司
     */
    GetExpressCompanyList: '/api/v1/express/search',

    /**
     * 订单发货
     */
    OrderSend: '/api/v1/order/seller/send', //"/api/v1/seller/order/send",
    /**
     *    渠道客户模块
     */
    GetUpstreamCustomerInfo: '/api/v1/custom/uppage',//获取上游游客户列表信息
    GetDownstreamCustomerInfo: '/api/v1/custom/page',//获取下游游客户列表信息
    GetCustomerInfo: '/api/v1/custom/info',//获取某个下游游客户信息
    AddDownCustomer: '/api/v1/custom/add',//添加下游游客
    UpdateCustomerInfo: '/api/v1/custom/update',//修改客户信息
    GetLevelList: '/api/v1/level/list',//获取客户等级列表
    AddLevel: '/api/v1/level/add',//添加客户等级,
    UpdateLevel: '/api/v1/level/add',//修改客户等级
    GetUpstreamCustomerList: '/api/v1/custom/uppage',//获取上游游客户列表
    /*
     添加地址
     */
    AddAddress: '/api/v1/address/add',
    /*
     地址列表
     */
    AddressList: '/api/v1/address/search',
    /*
     设置默认地址
     */
    SetDefaultAddress: '/api/v1/address/update',
    /*
     删除地址
     */
    DelAddress: '/api/v1/address/delete',

    //选择地址
    SelectAddress: '/api/v1/address/click',

    /**
     * 售后管理模块
     */
    ApplySaleList: '/api/v1/order/buyer/sale', //'/api/v1/buyer/order/sale',  //买家售后申请列表
    ApplyService: '/api/v1/order/buyer/apply', //'/api/v1/buyer/order/apply',//买家申请售后
    ProcessSaleList: '/api/v1/order/seller/sale', //'/api/v1/seller/order/sale',  //卖家售后处理列表
    DisputeService: '/api/v1/order/seller/dispute', //'/api/v1/seller/order/dispute',//卖家处理售后
    BuyerOrderDeliver: '/api/v1/order/buyer/delivery', //'/api/v1/buyer/order/delivery',//买家售后发回货
    BuyerOrderDetail: '/api/v1/order/buyer/detail', //'/api/v1/buyer/order/detail',//买家售后详情

    // afterWuliu: '/reducers.php/api/v1/express/express/cat',//售后物流
    afterWuliu: '/api/v1/express/get',//售后物流

    //卖家确认收货
    confirmGoods: '/api/v1/order/seller/confirm', //'/api/v1/seller/order/confirm',
    confirmRefund: '/api/v1/order/seller/refund', //'/api/v1/seller/order/refund',
    //撤销售后
    revokeAfterSale: '/api/v1/order/buyer/revoke', //'/api/v1/buyer/order/revoke',
    //售后处理详情
    afterMessageCat: '/api/v1/message/sale/cat',

    TipsForPay: '/api/v1/order/buyer/affect', //'/api/v1/buyer/order/affect',
    /**
     * 问题反馈
     */
    ProblemFeedback: '/api/v1/user/feedback',
    /**
     * 个人中心信息
     */
    EnterpriseCenterInfo: '/api/v1/user/get',
    /**
     * 采购方获取已买过的商品列表
     */
    // GoodshadbuyList: '/reducers.php/api/v1/Goods/Goods/search',
    // GoodshadbuyList: '/api/v1/buyer/goods/search',
    GoodshadbuyList: '/api/v1/buyer/bought/page',

    /***
     * 销售方商品详情
     */
    SellerGoodsDetail: '/api/v1/seller/goods/details',
    /**
     * 单独定价模块
     */
    GetDiscountList: '/api/v1/seller/goods/discount',//销售方获取已定价的客户列表
    UpdateCustomerPrice: '/api/v1/seller/goods/update',//销售方添加/编辑客户单独定价

    /**
     * 交易账号模块
     */
    //GetLicenceNum: "/reducers.php/api/v1/licence/Licence/num",//获取交易账号额度数量
    GetLicenceNum: '/api/v1/licence/num',//获取交易账号额度数量


    //GetLicenceList: "/reducers.php/api/v1/licence/Licence/list",//获取交易账户列表
    GetLicenceList: '/api/v1/licence/list',//获取交易账户列表

    //GetOpenedLicenceUseList: "/reducers.php/api/v1/licence/LicenceUse/opened",//获取已开通账号的下游客户列表
    GetOpenedLicenceUseList: '/api/v1/licenceuse/opened',//获取已开通账号的下游客户列表

    //GetUnopenedLicenceUseList: "/reducers.php/api/v1/licence/LicenceUse/unopened",//获取未开通账号的下游客户列表
    GetUnopenedLicenceUseList: '/api/v1/licenceuse/unopened',//获取未开通账号的下游客户列表

    //GetLicenceUseDetail: "/reducers.php/api/v1/licence/LicenceUse/get",//获取某个下游客户账号详情
    GetLicenceUseDetail: '/api/v1/licenceuse/get',//获取某个下游客户账号详情

    //AddLicence: "/reducers.php/api/v1/licence/Licence/add",//销售方开通个人交易账户
    AddLicence: '/api/v1/licence/add',//销售方开通个人交易账户

    //AddLicenceUse: "/reducers.php/api/v1/licence/LicenceUse/add",//销售方为下游客户开通账号
    AddLicenceUse: '/api/v1/licenceuse/add',//销售方为下游客户开通账号

    //PutLicenceUse: "/reducers.php/api/v1/licence/LicenceUse/put",//销售方为下游客户续费账号
    PutLicenceUse: '/api/v1/licenceuse/put',//销售方为下游客户续费账号

    //GetLicenceGoods: "/reducers.php/api/v1/goods/goods/licence",//销售方获取交易账号商品
    GetLicenceGoods: '/api/v1/seller/goods/licence',//销售方获取交易账号商品

    //商品推荐
    NewOnline: '/api/v1/message/render',

    //获取支付信息
    getPrePay: '/api/v1/pay/pay',

    //极光推送
    //绑定
    JpushBindId: '/api/v1/notify/bind',
    //解绑
    JpushUnBindId: '/api/v1/notify/release',

    //接收方获取消息列表
    getMessageList: '/api/v1/notify/message/list',

    //同意或拒绝合作伙伴
    handleMessage: '/api/v1/erp/partner/status/update',

    //更新消息阅读状态
    updataMessageStatus: '/api/v1/notify/message/modify',

    //邀请信息
    PartnerInvite: '/api/v1/erp/partner/invite',

    PartnerDetail: '/api/v1/erp/partner/get',

    /**
     * 企业管理---------------------------------------------------------------------
     */
    //通过ID获取企业信息
    getCompanyById: '/api/v1/company/getById',

    InitPassword: '/api/v1/user/init',
    //订单交易消息
    OrderMsgList: '/api/v1/message/search',
    //创建企业
    CreatEnterprise: '/api/v1/erp/account/add',
    //切换企业账号
    switchEnterprise: '/api/v1/erp/account/switch',
    //激活企业
    activeEnterprise: '/api/v1/user/instead/register/company/activate',
    //获取企业列表
    getEnterpriseList: '/api/v1/erp/account/list',
    //获取最新的企业状态
    getEnterpriseStatus: '/api/v1/erp/account/status/get',
    //获取企业列表
    enterpriseList: '/api/v1/erp/account/search',
    //添加平台已存在的合作伙伴
    sendAddApply: '/api/v1/erp/partner/add',
    //添加邀请合作伙伴记录
    InviteRecord: '/api/v1/client/invite/list',
    //员工申请加入企业
    JoinEnterprise: '/api/v1/enterprise/apply',
    //合作伙伴列表
    PartnerList: '/api/v1/erp/partner/list',
    partnerListPartner: '/api/v1/erp/partner/listPartner',
    partnerGetById: '/api/v1/erp/partner/getById',
    partnerUpdate: '/api/v1/erp/partner/update',
    contactAdd: '/api/v1/erp/contact/add',
    contactList: '/api/v1/erp/contact/list',
    contactUpdate: '/api/v1/erp/contact/update',
    companyAuthGet: '/api/v1/user/company/auth/get',
    contactDelete: '/api/v1/erp/contact/delete',
    partnerPage: '/api/v1/new/partner/page',
    contactsList: '/api/v1/erp/contacts/list',
    // 企业架构
    staffListall: '/api/v1/erp/staff/listall',
    deptTreeList: '/api/v1/erp/department/tree/list',

    // 职务
    staffJobPage: '/api/v1/erp/staff/job/page',
    erpJobUpdate: '/api/v1/erp/job/update',
    erpJobAdd: '/api/v1/erp/job/add',
    erpJobDelete: '/api/v1/erp/job/delete',
    erpJobList: '/api/v1/erp/job/list',
    erpStaffJobBatchUpdate: '/api/v1/erp/staff/job/batch/update',
    erpStaffManualAdd: '/api/v1/erp/staff/invite/manual/add',
    erpStaffChange: '/api/v1/erp/staff/change',
    erpStaffDel: '/api/v1/erp/staff/del',
    erpStaffInfomation: '/api/v1/erp/staff/infomation',
    // 部门操作
    erpDepartmentUpdate: '/api/v1/erp/department/update',
    erpDepartmentList: '/api/v1/erp/department/list',
    erpDepartmentAdd: '/api/v1/erp/department/add',
    erpDepartmentDelete: '/api/v1/erp/department/delete',
    // 联系人
    communicationPage: '/api/v1/erp/communication/page',
    erpCrmAppend: '/api/v1/erp/crm/append',
    friendCardList: '/api/v1/friend/car/list',
    friendDelete: '/api/v1/friend/delete',
    friendSave: '/api/v1/friend/save',
    //组织结构图
    orgs: '/api/channel/v1/hr/orgs',
    //企业部门列表
    DepartmentList: '/api/channel/v1/hr/listDepartment',
    DepartmentUpdate: '/api/channel/v1/hr/updateDepartment',
    CreateDepartment: '/api/channel/v1/hr/createDepartment',

    //职务
    JobList: '/api/channel/v1/hr/listJob',
    JobUpdate: '/api/channel/v1/hr/updateJob',
    CreateJob: '/api/channel/v1/hr/createJob',
    DelJob: '/api/channel/v1/hr/deleteJob',

    //员工
    CreateEmployee: '/api/channel/v1/hr/createEmployee',
    EditEmployee: '/api/channel/v1/hr/updateEmployee',
    EmployeeList: '/api/channel/v1/hr/listEmployee',
    EmployeeDetail: '/api/channel/v1/hr/getEmployee',
    DelEmployee: '/api/channel/v1/hr/deleteEmployee',
    DeleteUser: '/api/v1/erp/staff/delete',    //企业平台删除员工
    EmployeeInfo: '/api/v1/erp/staff/info',
    UpdateUser: '/api/v1/erp/staff/update',//企业平台修改员工信息

    //部门
    DelDepartment: '/api/channel/v1/hr/deleteDept',

    //获取个人信息
    GetStaffInfo: '/api/v1/erp/staff/get',
    //获取企业信息
    GetErpInfo: '/api/v1/erp/account/enterprise/get',
    //获取企业已加入的员工信息
    GetStaffList: '/api/v1/erp/staff/list',
    //添加合作伙伴
    addCooperativePartner: '/api/v1/erp/crm/add',


    // 应用桌面 - 应用列表
    softUserList: '/api/v1/soft/user/list',
    softMarketList: '/api/v1/soft/market/list',
    softMarketSoftGet: '/api/v1/soft/market/soft/get',
    softGet: '/api/v1/soft/get',
    softGoodsList: '/api/v1/soft/goods/list',
    softRenewGoodsGet: '/api/v1/soft/renew/goods/get',
    softFreeActive: '/api/v1/soft/free/active',
    softGroupUserShowList: '/api/v1/soft/group/user/show/list',
    softGroupUserOftenUseList: '/api/v1/soft/group/user/often/use/list',
    softGroupUserShowSave: '/api/v1/soft/group/user/show/save',
    softUserAuthList: '/api/v1/soft/user/auth/list',
    groupStaffResourceList: '/api/v1/group/staff/resource/list',
    softwareGoodsDetail: '/api/v1/software/goods/details',
    orderBuyerFast: '/api/v1/order/buyer/fast',
    orderBuyerConfirm: '/api/v1/order/buyer/confirm',
    userSoftList: '/api/v1/user/soft/list',
    erpStaffUserList: '/api/v1/erp/staff/user/list',
    softUserAuth: '/api/v1/soft/user/auth',
    softGroupUserSoftList: '/api/v1/soft/group/user/soft/list',
    softGroupUserSoftNotList: '/api/v1/soft/group/user/soft/not/list',
    softGroupPersonSave: '/api/v1/soft/group/person/save',
    softGroupUserSoftSave: '/api/v1/soft/group/user/soft/save',
    softGroupUserDelete: '/api/v1/soft/group/user/delete',

    /*桌面应用分组还原*/
    softGroupUserRecovery: '/api/v1/soft/group/user/recovery',
    /**
     * 企业管理-------------------------------------------------------------------end
     */


    /**
     * 支付系统接口
     */
    /**
     * 设置初始密码
     */
    FirstSetPayPsw: '/v1/user/tradepwd/set',
    /**
     * 修改密码
     */
    EditPayPsw: '/v1/user/tradepwd/edit',
    /**
     * 检验密码
     */
    CheckPsw: '/v1/user/tradepwd/validate',
    /**
     * 创建银行卡
     */
    BankCreate: '/v1/user/userbankaccount/create',
    /**
     * 设置默认收款卡
     */
    SetDefaultBankCard: '/v1/user/userbankaccount/init',
    /**
     * 银行卡类型列表
     */
    BankTypeList: '/v1/remit/bank/banktype/list',
    /**
     * 银行卡查询
     */
    BankCardList: '/v1/user/userbankaccount/search',
    /**
     * 获取钱包用户信息
     */
    GetUserWalletInfo: '/v1/user/get',
    /**
     * 支付密码状态
     */
    PayPswStatus: '/v1/user/tradepwd/get',
    /**
     * 提现信息
     */
    WithdrawalInfo: '/v1/trade/pre_withdraw',
    /**
     * 提现
     */
    Withdrawal: '/v1/trade/withdraw',

    TradeList: '/v1/trade/bill/list',
    TradeDetails: '/v1/trade/bill/get',
    TradePayDetails: '/v1/trade/bill/detail/get',

    /**
     * 支付系统接口END
     */

    /**
     *
     *新采购模块
     *
     */
    shopAllGoods: '/api/v1/shop/owner/goods/page',

    /**
     *
     *
     * B2B模块
     *
     *
     */
    //渠道app端添加商品
    addGoods: '/api/v1/seller/goods/append',
    /**
     * 获取店长客服列表
     */
    getManagerList: '/api/v1/shopManager/list',
    /**
     * 删除店长客服
     */
    delManager: '/api/v1/shopManager/delete',
    /**
     * 保存修改店长客服
     */
    saveManager: '/api/v1/shopManager/save',
    /**
     * 设置默认客服ID
     */
    updateDefaultService: '/api/v1/shopManager/update',

    // productGoodDetail:'/api/v1/seller/goods/operate/details',
    productGoodDetail: '/api/v1/seller/goods/cat',
    productGoodDelete: '/api/v1/seller/goods/delete',
    shopGoodDelete: '/api/v1/shop/goods/parent/delete',
    //类目
    productClassify: '/api/v1/seller/category/search',
    productClassifyAdd: '/api/v1/seller/category/add',
    productClassifyDel: '/api/v1/seller/category/delete',
    storeClassify: '/api/v1/shop/good/cat/list',
    storeClassifyAdd: '/api/v1/shop/good/cat/save',
    storeClassifyDel: '/api/v1/shop/good/cat/delete',
    //店铺列表
    shopList: '/api/v1/shop/page',
    //店铺统计
    shopInfo: '/api/v1/shop/statistic/get',
    //发布商品
    publishGoods: '/api/v1/shop/goods/save',
    goodsDetail: '/api/v1/shop/goods/parent/get',
    //商品上下架
    goodsStatusUpdate: '/api/v1/shop/goods/parent/update',
    //B2B店铺 B2C
    StoreCommodityManage: '/api/v1/shop/goods/list',
    //B2B店铺创建
    CreateStore: '/api/v1/shop/add',
    //获取用户可开通店铺的数量
    GetAvailableStore: '/api/v1/shop/bought/count',
    //获取B2B店铺详情
    GetStoreInfo: '/api/v1/shop/get',
    //B2B店铺信息更新
    UpdataStore: '/api/v1/shop/update',
    //添加或更新标签
    UpdataTag: '/api/v1/shop/tag/save',
    //店铺标签列表
    TagList: '/api/v1/shop/tag/list',
    //删除标签
    DeleteTag: '/api/v1/shop/tag/delete',
    //获取客户列表
    GetCustomerList: '/api/v1/client/page', //'/api/v1/shop/client/page',
    //获取客户等级列表
    GetCustomerLevel: '/api/v1/shop/client/level/list',
    //增加/修改客户等级
    AddCustomerLevel: '/api/v1/shop/client/level/save',
    //删除客户等级
    DeleteCustomerLevel: '/api/v1/shop/client/level/delete',
    //获取指定客户客户等级
    GetTheLevel: '/api/v1/shop/client/level/get',
    //增加/修改指定客户等级
    SetTheLevel: '/api/v1/shop/client/level/update',
    //获取企业邀请员工二维码/邀请码
    GetQRCode: '/api/v1/code/qrCodeGet',

    /**
     * 二维码
     */
    scanQrCode: '/api/v1/code/scanQrCode',
    //申请加入企业
    appyToJoinComp: '/api/v1/enterprise/apply',
    //企业处理加入申请
    compDealApplication: '/api/v1/enterprise/apply/update',
    qrcodeLogin: '/api/v1/erp/qrCode/login',

    //域名
    getDomain: '/api/v1/erp/account/get/domain',
    bindDomain: '/api/v1/erp/account/bind/domain',
    updateTitle: '/api/v1/erp/account/update/websiteName',
    //oddo跳转登录
    odooLogin: '/api/v1/erp/web/login',

    /**
     * 好友
     */
    friendList: '/api/v1/friend/list',
    friendListAll: '/api/v1/friend/listall',
    searchFriends: '/api/v1/friend/search',
    friendDetail: '/api/v1/friend/get',
    friendDealApplication: '/api/v1/friend/update',

    /**
     * 企业资质
     */
    submitQualification: 'v1/user/merchant/submit/qualification',
    getQualification: '/api/v1/user/merchant/get',

    /**
     * 收藏
     */
    // favoriteList: '/api/v1/shop/goods/favorite/list',
    favoriteList: '/api/v1/shop/goods/favorite/page',
    favoriteGet: '/api/v1/shop/goods/favorite/get',
    favoriteAdd: '/api/v1/shop/goods/favorite/add',
    favoriteDelete: '/api/v1/shop/goods/favorite/delete',

    /**
     * 服务商品-变更设置
     */
    serviceGoodSettingList: '/api/v1/goods/change/list',
    serviceGoodSave: '/api/v1/goods/change/save',
    serviceShopGoodSettingList: '/api/v1/shop/goods/change/list',
    serviceShopGoodSave: '/api/v1/shop/goods/change/save',

    /**
     * 会员管理
     */
    GetMemberList: '/api/v1/client/member/list', //'/api/v1/shop/member/list',
    MemberBuyHistory: '/api/v1/order/client/history/list', //'/api/v1/shop/client/hostory/order/list',  //会员购买历史

    //图片服务器
    uploadFile: '/api/v1/file/uploadFile',
    DownloadFile: '/open/v1/file/downloadFile',

    //批量下载文件
    GetDownloadZipUrl: '/api/v1/file/downloadZip',

    /**
     * 业务认证
     */
    userDocDetail: '/api/v1/user/doc/detail',
    rsuDocParentGet: '/api/v1/rsu/doc/parent/get',
    userDocExist: '/api/v1/user/doc/exist',
    userParentDocGet: '/api/v1/user/parent/doc/get',
    userDocSave: '/api/v1/user/doc/save',

    /**
     * 认证管理
     */
    AuthManageList: '/api/v1/user/doc/page',
    AuthManageDetail: '/api/v1/user/doc/get',
    AuthInfoDetail: '/api/v1/user/doc/detail',
    AuthInfoDeal: '/api/v1/user/doc/deal',
    AuthInfoSave: '/api/v1/user/doc/save',
    AuthInfoModuleGet: '/api/v1/rsu/doc/parent/get',
    CheckYQSTAuth: '/api/v1/user/doc/check',
    AuthInfoJiuerliuModuleGet: '/api/v1/rsu/doc/parent/get', //"/api/v1/rsu/doc/parent/jiuerliu/get"
    BusinessAuthList: '/api/v1/user/doc/list',
    BusinessUDCGet: '/api/v1/user/doc/commit/get',
    /*
    * 账户管理
    * */
    walletAccountInfo: '/api/v1/wallet/account/info',
    walletAccountSave: '/api/v1/wallet/account/save',

    /**
     * 银联企业钱包
     */
    UnionCWallet: '/api/v1/wallet/account/login',
    UnionCompanyWalletAccountList: '/api/v1/wallet/account/list',
    UnionCompanyWalletAccountListDetail: '/api/v1/wallet/account/get',
    UnionCompanyWalletAbnormalRecList: '/api/v1/wallet/account/exception/list',
    UnionCompanyWalletApplyList: '/api/v1/wallet/account/apply/page',
    UnionCompanyWalletApplyGet: '/api/v1/wallet/account/apply/get',
    UnionBankAccountList: '/api/v1/wallet/bank/account/list',
    UnionCompanyWalletChargeSave: '/api/v1/wallet/charge/apply/save',
    UnionCompanyWalletChargeList: '/api/v1/wallet/charge/apply/page',
    UnionCompanyWalletChargeBegin: '/api/v1/wallet/charge/apply/begin',
    UnionCompanyWalletChargeGet: '/api/v1/wallet/charge/apply/get',
    UnionCompanyWalletChargeLink: '/api/v1/wallet/charge/apply/to/charge',
    UnionBankAccountUnbind: '/api/v1/wallet/bank/account/unbind',
    UnionCompanyWalletPswReset: '/api/v1/wallet/account/password/reset',
    UnionCompanyWalletPswResetBaseInfo: '/api/v1/wallet/account/security/info',
    UnionCompanyWalletPswResetGetCode: '/api/v1/sms/reset/pwd/send',
    UnionCompanyWalletTransferSave: '/api/v1/wallet/transfer/apply/save',
    UnionCompanyWalletTransferPartnerList: '/api/v1/erp/wallet/partner/list',
    UnionCompanyWalletTransferApplyList: '/api/v1/wallet/transfer/apply/page',
    UnionCompanyWalletTransferApplyGet: '/api/v1/wallet/transfer/apply/get',
    UnionCompanyWalletAccountApplyAdd: '/api/v1/wallet/account/apply/add',
    // 需要转账申请审核的转账接口
    walletTransferAuditApplySave: '/api/v1/wallet/transfer/audit/apply/save',
    openWalletTransferAuditApplySave: '/open/v1/wallet/transfer/audit/apply/save',
    walletChargeAuditApplySave: '/api/v1/wallet/charge/audit/apply/save',
    walletWithdrawalAuditApplySave: '/api/v1/wallet/withdrawal/audit/apply/save',
    openVWUSCheck: '/open/v1/wallet/unionpay/service/check',


    UnionCompanyWalletAccountDetailList: '/api/v1/wallet/account/detail/page',
    UnionCompanyWDExport: '/api/v1/wallet/detail/export',
    UnionCompanyWalletAccountDetailDetail: '/api/v1/wallet/account/detail/get',
    UnionCompanyWalletReceiptAdd: '/api/v1/wallet/receipt/add',
    UnionCompanyWalletReceiptPage: '/api/v1/wallet/receipt/page',
    UnionCompanyWalletReceiptGet: '/api/v1/wallet/receipt/get',

    UnionCompanyWalletWithdrawalSave: '/api/v1/wallet/withdrawal/apply/save',
    UnionCompanyWalletWithdrawalList: '/api/v1/wallet/withdrawal/apply/page',
    UnionCompanyWalletWithdrawalDetail: '/api/v1/wallet/withdrawal/apply/get',
    UnionCompanyWBIPage: '/api/v1/wallet/bank/info/page',

    bpWAList: '/open/v1/wallet/account/list',
    bpWTASave: '/open/v1/wallet/transfer/apply/save',
    // /open/v1/wallet/transfer/apply/save
    bpWACheck: '/open/v1/wallet/auth/check',
    // 通过企业账套号获取银联账户信息
    bpGetUnionPayInformation: '/open/v1/wallet/account/sn/list',
    checkSoftAuth: '/open/v1/soft/auth',
    checkAgentPaymentAuth: '/api/v1/agent/pay/beforehand/judge/payment/state',
    // 获取支付设置详情
    walletUnionpayConfigGet: '/api/v1/wallet/unionpay/config/get',
    walletUnionpayConfigSave: '/api/v1/wallet/unionpay/config/save',

    // 银联企业钱包审批
    walletChargeAuditPage: '/api/v1/wallet/charge/audit/page',
    walletTransferAuditPage: '/api/v1/wallet/transfer/audit/page',
    walletTransferAuditGet: '/api/v1/wallet/transfer/audit/get',
    walletTransferAuditBatchAgree: '/api/v1/wallet/transfer/audit/batch/agree',
    walletTransferAuditBatchReject: '/api/v1/wallet/transfer/audit/reject',
    // 充值详情
    walletChargeAuditGet: '/api/v1/wallet/charge/audit/get',
    walletChargeAuditAgree: '/api/v1/wallet/charge/audit/agree',
    walletChargeAuditReject: '/api/v1/wallet/charge/audit/reject',
    // 提现
    walletWithdrawalAuditPage: '/api/v1/wallet/withdrawal/audit/page',
    walletWithdrawalAuditGet: '/api/v1/wallet/withdrawal/audit/get',
    walletWithdrawalAuditAgree: '/api/v1/wallet/withdrawal/audit/agree',
    walletWithdrawalAuditReject: '/api/v1/wallet/withdrawal/audit/reject',
    walletWithdrawalAuditConfirm: '/api/v1/wallet/withdrawal/audit/confirm',
    walletChargeAuditToCharge: '/api/v1/wallet/charge/audit/to/charge',
    walletTABConfirm: '/api/v1/wallet/transfer/audit/batch/confirm',

    /*
    * 银联账户助手
    * */
    walletBankPage: '/admin/v1/wallet/bank/apply/page',
    walletBankAgree: '/admin/v1/wallet/bank/apply/agree',
    walletBankReject: '/admin/v1/wallet/bank/apply/reject',
    walletBankApplyGet: '/admin/v1/wallet/bank/apply/get',
    walletBankAccountPage: '/admin/v1/wallet/bank/account/page',
    walletBankAccountDeal: '/admin/v1/wallet/bank/account/deal',
    walletBankAccountGet: '/admin/v1/wallet/bank/account/get',
    walletBankConfigGet: '/admin/v1/wallet/bank/config/page',
    walletBankLogList: '/admin/v1/wallet/bank/log/list',
    walletBankAccountSave: '/admin/v1/wallet/bank/account/save',
    bankConfigPage: '/admin/v1/wallet/bank/config/page',
    bankConfigDelete: '/admin/v1/wallet/bank/config/delete',
    bankConfigSave: '/admin/v1/wallet/bank/config/save',
    bankConfigGet: '/admin/v1/wallet/bank/config/get',
    chargeApplyPage: '/admin/v1/wallet/charge/apply/page',
    transferApplyPage: '/admin/v1/wallet/transfer/apply/page',
    transferApplyGet: '/admin/v1/wallet/transfer/apply/get',
    transferApplyAgree: '/admin/v1/wallet/transfer/apply/agree',
    transferApplyReject: '/admin/v1/wallet/transfer/apply/reject',
    transferChargeAgree: '/admin/v1/wallet/charge/apply/agree',
    transferChargeReject: '/admin/v1/wallet/charge/apply/reject',
    transferChargeGet: '/admin/v1/wallet/charge/apply/get',
    transferWAPage: '/admin/v1/wallet/withdrawal/apply/page',
    transferWAAgree: '/admin/v1/wallet/withdrawal/apply/agree',
    transferWAGet: '/admin/v1/wallet/withdrawal/apply/get',
    transferWAReject: '/admin/v1/wallet/withdrawal/apply/reject',
    transferCABAgree: '/admin/v1/wallet/charge/apply/batch/agree',
    walletReceiptPage: '/admin/v1/wallet/receipt/page',
    walletReceiptGet: '/admin/v1/wallet/receipt/get',
    walletDetailPage: '/admin/v1/wallet/detail/page',
    walletReceiptDeal: '/admin/v1/wallet/receipt/deal',
    walletDetailGet: '/admin/v1/wallet/detail/get',
    walletDExport: '/admin/v1/wallet/detail/export',
    walletBankApplyPage: '/admin/v1/wallet/account/apply/page',
    walletAccountAgree: '/admin/v1/wallet/account/apply/agree',
    walletAccountReject: '/admin/v1/wallet/account/apply/reject',
    walletAccountApplyGet: '/admin/v1/wallet/account/apply/get',
    walletUserDocGet: '/admin/v1/user/doc/get',
    walletAccountPage: '/admin/v1/wallet/account/page',
    walletAccountDeal: '/admin/v1/wallet/account/deal',
    walletAccountGet: '/admin/v1/wallet/account/get',
    walletAccountLogList: '/admin/v1/wallet/account/log/list',
    walletASave: '/admin/v1/wallet/account/save',
    walletAccountBankSave: '/admin/v1/wallet/account/bank/save',

    /*
    * 我的企业模块接口
    * */
    MyCompanyIIGet: '/api/v1/invoice/info/get', // 企业开票信息
    MyCompanyIISave: '/api/v1/invoice/info/save', // 企业开票信息修改
    MyCompanyCBGet: '/api/v1/company/bank/get', // 企业基本存款账户信息
    MyCompanyCBIPage: '/api/v1/company/bank/info/page', // 开户行列表
    MyCompanyCBSave: '/api/v1/company/bank/save', // 企业基本存款账户信息修改
    // MyCompanyCAPage: '/api/v1/company/address/page', // 企业地址库列表
    MyCompanyCAPage: '/api/v1/address/page', // 企业地址库列表
    // MyCompanyCASave: '/api/v1/company/address/save', // 企业地址库保存
    MyCompanyCASave: '/api/v1/address/save', // 企业地址库保存
    // MyCompanyCAGet: '/api/v1/company/address/get', // 企业地址库详情
    MyCompanyCAGet: '/api/v1/address/get', // 企业地址库详情
    // MyCompanyCADelete: '/api/v1/company/address/delete', // 企业地址库删除
    MyCompanyCADelete: '/api/v1/address/delete', // 企业地址库删除
    MyCompanyAdressTypeList: '/api/v1/address/category/list',
    MyCompanyAdressTypeDetail: '/api/v1/address/category/info',
    MyCompanyAdressTypeSave: '/api/v1/address/category/save',
    MyCompanyAdressTypeDel: '/api/v1/address/category/delete',
    // MyCompanyIRPage: '/api/v1/invoice/rise/page', // 企业抬头库列表
    MyCompanyIRPage: '/api/v1/invoice/title/page', // 企业抬头库列表
    // MyCompanyIRSave: '/api/v1/invoice/rise/save', // 企业抬头库保存
    MyCompanyIRSave: '/api/v1/invoice/title/save', // 企业抬头库保存
    // MyCompanyIRGet: '/api/v1/invoice/rise/get', // 企业抬头库详情
    MyCompanyIRGet: '/api/v1/invoice/title/get', // 企业抬头库详情
    // MyCompanyIRDelete: '/api/v1/invoice/rise/delete', // 企业抬头库删除
    MyCompanyIRDelete: '/api/v1/invoice/title/delete', // 企业抬头库删除
    MyCompanyRList: '/api/v1/role/list', // 角色列表
    MyCompanyRSList: '/api/v1/role/staff/list', // 角色员工列表
    MyCompanyRAdd: '/api/v1/role/add', // 添加角色
    MyCompanyRUpdate: '/api/v1/role/update', // 修改角色名称
    MyCompanyRDelete: '/api/v1/role/delete', // 删除角色
    MyCompanyRSAdd: '/api/v1/role/staff/add', // 角色员工添加
    MyCompanyRSBDelete: '/api/v1/role/staff/batch/delete', // 角色员工添加
    MyCompanyGList: '/api/v1/group/list', // 用户权限组列表
    MyCompanyGGet: '/api/v1/group/get', // 权限组详情
    MyCompanyGAdd: '/api/v1/group/add', // 添加权限组
    MyCompanyGDelete: '/api/v1/group/delete', // 删除权限组
    MyCompanyGUpdate: '/api/v1/group/update', // 修改权限组
    MyCompanyCLUpdate: '/api/v1/user/company/logo/update', // 更换企业logo
    MyCompanyGetCode: '/api/v1/erp/get/code', // 转让企业获取验证码
    MyCompanyCheckCode: '/api/v1/erp/code/check', // 转让企业校验验证码L
    MyCompanyGetEmployeeList: '/api/v1/erp/staff/user/list', // 获取员工列表
    MyCompanyChangeAdmin: '/api/v1/erp/change/admin', // 转让企业

    /*
    * 消息模块接口
    * */
    NewsModelIList: '/api/v1/info/type/list', // 获取所有消息类型
    NewsModelUCount: '/api/v1/info/unread/count', // 获取消息未读数量统计
    NewsModelIPage: '/api/v1/info/page', // 消息列表
    NewsModelIHide: '/api/v1/info/hide', // 根据消息id隐藏消息（用户点击删除消息操作）
    /*
     * 企业产品库
     * */
    CompanyClassList: '/api/v1/seller/category/list',
    CompanyClassGet: '/api/v1/seller/category/get',
    CompanyClassSave: '/api/v1/seller/category/save',
    CompanyClassDel: '/api/v1/seller/category/delete',
    CompanyClassEnable: '/api/v1/seller/category/status/update',
    CompanyProductList: '/api/v1/seller/goods/page',
    CompanyProductGet: '/api/v1/seller/goods/get',
    CompanyProductAdd: '/api/v1/seller/goods/add',
    CompanyProductUpdate: '/api/v1/seller/goods/update',
    CompanyProductDel: '/api/v1/seller/goods/del',
    CompanyProductBatchDel: '/api/v1/seller/goods/batch/del',
    CompanyProductEnable: '/api/v1/seller/goods/enable',
    CompanyProductDisable: '/api/v1/seller/goods/forbidden',
    CompanyProductPlatformList: '/api/v1/goods/platform/goods/parent/page',
    CompanyProductPlatformGet: '/api/v1/goods/platform/goods/get',
    CompanyProductApplyList: '/api/v1/goods/platform/goods/apply/page',
    CompanyProductApplyDetail: '/api/v1/goods/platform/goods/apply/get',
    CompanyProductApplyAdd: '/api/v1/goods/platform/goods/apply/add',
    CompanyProductCorrelationList: '/api/v1/goods/relation/page',
    CompanyProductCorrelationAdd: '/api/v1/goods/relation/add',
    CompanyProductCorrelationCancel: '/api/v1/goods/relation/delete',
    CompanyProductCorrelationPlatformList: '/api/v1/goods/platform/goods/page',
    CompanyProductCorrelationPlatformGet: '/api/v1/goods/platform/goods/get',


    /* 出租价格系统 */
    RentAsstGetCompanyAndProjectList: '/api/v1/lease/partner/lessee/project/list',
    RentAsstAddPolicy: '/api/v1/lease/price/policy/add',
    // RentAsstGoodList: '/api/v1/lease/goods/page',
    RentAsstGoodList: '/api/v1/lease/goods/usable/page',
    RentAsstPolicyList: '/api/v1/lease/price/policy/page',
    RentAsstPolicyEnable: '/api/v1/lease/price/policy/enable',
    RentAsstPolicyDisable: '/api/v1/lease/price/policy/disable',
    RentAsstPolicySubmit: '/api/v1/lease/price/policy/submit',
    RentAsstPolicyDelete: '/api/v1/lease/price/policy/delete',
    RentAsstPolicyDeleteForMultiSelect: '/api/v1/lease/price/policy/batch/delete',
    RentAsstPolicyInfo: '/api/v1/lease/price/policy/get',
    RentAsstPolicyUpdate: '/api/v1/lease/price/policy/update',

};
export default ApiInterface;
