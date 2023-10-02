/**
 * Created by ljy on 2018/11/28
 */

// 用户中心
import UserMenuData from './otherCenterMenuData/UserMenuData'

// 认证中心
import AttestationMenuData from './otherCenterMenuData/AttestationMenuData'

//运营工具
import OperationsMenuData from './otherCenterMenuData/OperationsMenuData'

// 商品中心
import CommodityMenuData from './otherCenterMenuData/CommodityMenuData'

// 消息中心
import MessageMenuData from './otherCenterMenuData/MessageMenuData'

// 订单中心
import OrderMenuData from './otherCenterMenuData/OrderMenuData'

// 支付中心
import PaymentMenuData from './otherCenterMenuData/PaymentMenuData'

// 合同中心
import ContractMenuData from "./otherCenterMenuData/ContractMenuData";

// 税票中心
import TaxReceiptMenuData from "./otherCenterMenuData/TaxReceiptMenuData";

// 云服务中心
import ServeMenuData from "./otherCenterMenuData/ServeMenuData";

// 云服务中心
import ElectronicSealMenuData from "./otherCenterMenuData/ElectronicSealMenuData";

// 商机助手中心
import BusinessAssistantMenuData from "./otherCenterMenuData/BusinessAssistantMenuData";

// 收支付助手
import PaymentAssistantMenuData from "./otherCenterMenuData/PaymentAssistantMenuData";

// 产品中心
import ProductCentreMenuData from "./otherCenterMenuData/ProductCentreMenuData";

//平台物资库
import MaterialCentreMenuData from "./otherCenterMenuData/MaterialCentreMenuData";

// 数据中心
import DataCenter from "./otherCenterMenuData/DataCenter";

// 业务配置中心
import BusinessConfCenter from "./otherCenterMenuData/BusinessConfCenter";

const YqstIndexMenuData = [
    /*云服务中心*/
    ServeMenuData(),

    /*用户中心*/
    UserMenuData(),

    /*认证中心*/
    AttestationMenuData(),

    /* 业务配置中心 */
    BusinessConfCenter(),

    /*运营工具*/
    OperationsMenuData(),

    /* 数据中心 */
    DataCenter(),

    {
        title: '银联收银台',
        isShow: true,
        tag: "Unionpay",
        sideMenu: [
            {
                subMenuTitle: '服务申请管理',
                subMenuList: [
                    {
                        title: '待初审',
                        key: '/Pages/ServiceApplicationPendingTrial',
                        childKeys: ['/Pages/ServiceApplicationPendingTrialDetail']
                    },
                    {
                        title: '待寄/待收合同',
                        key: '/Pages/ServiceApplicationContractAccepted',
                        childKeys: ['/Pages/ServiceApplicationContractAcceptedDetail']
                    },
                    {
                        title: '待二次审核',
                        key: '/Pages/ServiceApplicationAuditedTwice',
                        childKeys: ['/Pages/ServiceApplicationAuditedTwiceDetail']
                    },
                    {
                        title: '待收POS机费用',
                        key: '/Pages/ServiceApplicationDepositReceived',
                        childKeys: ['/Pages/ServiceApplicationDepositReceivedDetail']
                    },
                    {
                        title: '待收POS机',
                        key: '/Pages/ServiceApplicationPOSMachine',
                        childKeys: ['/Pages/ServiceApplicationPOSMachineDetail']
                    },
                    {
                        title: '已完成',
                        key: '/Pages/ServiceApplicationCompleted',
                        childKeys: ['/Pages/ServiceApplicationCompletedDetail']
                    },
                ]
            }, {
                subMenuTitle: '商户管理',
                subMenuList: [
                    {
                        title: '商户列表',
                        key: '/Pages/MerchantManagementList',
                        childKeys: ['/Pages/MerchantManagementListDetail']
                    },
                ]
            }, {
                subMenuTitle: '业务信息管理',
                subMenuList: [
                    {
                        title: '业务参数设置',
                        key: '/Pages/BusinessParameterSettings',
                    }, {
                        title: '其他参数设置',
                        key: '/Pages/OtherParameterSettings',
                    },
                ]
            },
        ]
    },

    {
        title: 'App更新管理',
        isShow: true,
        sideMenu: [
            {
                subMenuTitle: 'App更新管理',
                subMenuList: [
                    {
                        title: 'App更新管理',
                        key: '/Pages/AppUpdateManage',
                    }
                ]
            }
        ],
    },

    /*消息中心*/
    MessageMenuData(),

    /*平台物资库*/
    MaterialCentreMenuData(),

    /*产品中心*/
    ProductCentreMenuData(),

    /*商品中心*/
    CommodityMenuData(),

    /*订单中心*/
    OrderMenuData(),

    /*支付中心*/
    PaymentMenuData(),

    /*合同中心*/
    ContractMenuData(),

    /*税票中心*/
    // TaxReceiptMenuData(),

    // {
    //     title: '管理员',
    //     isShow: true,
    //     sideMenu: [
    //         {
    //             subMenuTitle: '系统管理',
    //             subMenuList: [
    //                 {
    //                     title: '管理员列表',
    //                     key: '/Pages/SAAdminList',
    //                 }
    //             ]
    //         }
    //     ],
    // },
    // {
    //     title: '用户中心',
    //     isShow: true,
    //     sideMenu: [
    //         {
    //             subMenuTitle: '个人用户管理',
    //             subMenuList: [
    //                 {
    //                     title: '个人用户列表',
    //                     key: '/Pages/PersonalUserList',
    //                     childKeys: ['/Pages/PersonalUserDetail']
    //                 }
    //             ]
    //         },
    //         {
    //             subMenuTitle: '企业用户管理',
    //             subMenuList: [
    //                 {
    //                     title: '企业用户列表',
    //                     key: '/Pages/EnterpriseUsersList',
    //                     childKeys: [
    //                         '/Pages/EnterpriseUsersDetail',
    //                         '/Pages/EnterpriseUsersJurisdiction',
    //                         '/Pages/EnterpriseUsersRuleAddDetail',
    //                         '/Pages/EnterpriseUsersRuleEditDetail',
    //                         '/Pages/EnterpriseCooperativePartner',
    //                         '/Pages/NewPermissionGroup',
    //                         '/Pages/PermissionGroupDetail',
    //                     ]
    //                 }
    //             ]
    //         },
    //         {
    //             subMenuTitle: '用户日志管理',
    //             subMenuList: [
    //                 {
    //                     title: '登录登出日志',
    //                     key: '/Pages/LogInAndLogOut',
    //                 },
    //                 {
    //                     title: '操作日志',
    //                     key: '/Pages/OperationalLog',
    //                 }
    //             ]
    //         },
    //     ],
    // },
    {
        title: '金融中心',
        isShow: true,
        sideMenu: [
            {
                subMenuTitle: '金融方案管理',
                subMenuList: [
                    {
                        title: '金融方案列表',
                        key: '/Pages/PlanList',
                    },
                    {
                        title: '方案类型管理',
                        key: '/Pages/PlanCategory',
                    },
                    {
                        title: '标签管理',
                        key: '/Pages/PlanTag',
                    }
                ]
            },
            {
                subMenuTitle: '金融渠道管理',
                subMenuList: [
                    {
                        title: '金融渠道列表',
                        key: '/Pages/FinancialChannel',
                    }
                ]
            },
            {
                subMenuTitle: '交易规则管理',
                subMenuList: [
                    {
                        title: '交易规则列表',
                        key: '/Pages/FinancialRules',
                    }
                ]
            },
            {
                subMenuTitle: '金服实例管理',
                subMenuList: [
                    {
                        title: '金服实例列表',
                        key: '/Pages/FinancialInstance',
                    }
                ]
            }
        ],

    },
    // {
    //     title: '税票中心',
    //     isShow: true,
    //     sideMenu: [
    //         {
    //             subMenuTitle: '税票中心',
    //             subMenuList: [
    //                 {
    //                     title: '税票中心',
    //                     key: '/Pages/tax',
    //                 }
    //             ]
    //         }
    //     ],
    // },
    // {
    //     title: '评价中心',
    //     isShow: true,
    //     sideMenu: [
    //         {
    //             subMenuTitle: '评价中心',
    //             subMenuList: [{
    //                 title: '评价中心',
    //                 key: '/Pages/evaluation',
    //             }]
    //         }
    //     ],
    // },
    // {
    //     title: '广告中心',
    //     isShow: true,
    //     sideMenu: [
    //         {
    //             subMenuTitle: '广告中心',
    //             subMenuList: [{
    //                 title: '广告中心',
    //                 key: '/Pages/ad',
    //             }]
    //         }
    //     ],
    // },
    // {
    //     title: '数据服务中心',
    //     isShow: true,
    //     sideMenu: [
    //         {
    //             subMenuTitle: '数据服务中心',
    //             subMenuList: [{
    //                 title: '数据服务中心',
    //                 key: '/Pages/data',
    //             }]
    //         }
    //     ],
    // },
    // {
    //     title: '订单中心',
    //     isShow: true,
    //     sideMenu: [
    //         {
    //             subMenuTitle: '订单中心',
    //             subMenuList: [
    //                 {
    //                     title: '订单中心',
    //                     key: '/Pages/order',
    //                 }
    //             ]
    //         }
    //     ],
    // },
    // {
    //     title: '对账中心',
    //     isShow: true,
    //     sideMenu: [
    //         {
    //             subMenuTitle: '对账中心',
    //             subMenuList: [
    //                 {
    //                     title: '对账中心',
    //                     key: '/Pages/account',
    //                 }
    //             ]
    //         }
    //     ],
    // },
    // {
    //     title: '结算中心',
    //     isShow: true,
    //     sideMenu: [
    //         {
    //             subMenuTitle: '结算中心',
    //             subMenuList: [
    //                 {
    //                     title: '结算中心',
    //                     key: '/Pages/cal',
    //                 }
    //             ]
    //         }
    //     ],
    // },

    /*电子签章服务中心*/
    ElectronicSealMenuData(),

    /*商机助手中心*/
    BusinessAssistantMenuData(),

    /*收支付助手*/
    PaymentAssistantMenuData(),

];
export default YqstIndexMenuData;
