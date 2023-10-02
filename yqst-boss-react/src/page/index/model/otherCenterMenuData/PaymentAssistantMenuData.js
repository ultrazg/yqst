/*
*   Created by yb
*   收支付助手
*  */

const PaymentAssistantMenuData = () => {
    return {
        title: '收支付助手',
        isShow: true,
        // tag: "BusinessAssistant",
        sideMenu: [
            {
                subMenuTitle: '商户管理',
                subMenuList: [
                    {
                        title: '企业商户',
                        key: '/Pages/PAEnterpriseBusiness',
                        childKeys: ['/Pages/PAEnterpriseBusinessDetail'],
                    },
                    // {
                    //     title: '个人商户',
                    //     key: '/Pages/PAPersonalBusiness',
                    //     childKeys: ['/Pages/PAPersonalBusinessDetail'],
                    // },
                    {
                        title: '企业商户审核',
                        key: '/Pages/PAEnterpriseMerchantsAudit',
                        childKeys: ['/Pages/PAEnterpriseMerchantsAuditDetail'],
                    },
                    // {
                    //     title: '个人商户审核',
                    //     key: '/Pages/PAPersonalMerchantsAudit',
                    //     childKeys: ['/Pages/PAPersonalMerchantsAuditDetail'],
                    // },
                ]
            },
            // {
            //     subMenuTitle: '订单管理',
            //     subMenuList: [
            //         {
            //             title: '交易订单',
            //             key: '/Pages/PATradeOrderList',
            //             childKeys: ['/Pages/PATradeOrderDetail'],
            //         },
            //     ]
            // },
            // {
            //     subMenuTitle: '应用平台',
            //     subMenuList: [
            //         {
            //             title: '应用列表',
            //             key: '/Pages/PAApplicationList',
            //             childKeys: [
            //                 '/Pages/PAApplicationAdd',
            //                 '/Pages/PAApplicationDetail'
            //             ],
            //         },
            //     ]
            // },
            {
                subMenuTitle: '支付方案',
                subMenuList: [
                    {
                        title: '方案列表',
                        key: '/Pages/PASchemeList',
                        childKeys: [
                            '/Pages/PASchemeDetail',
                            '/Pages/PASchemeAdd'
                        ],
                    },
                    {
                        title: '支付费率',
                        key: '/Pages/PAPayRateList',
                        childKeys: [
                            '/Pages/PAPayRateDetail',
                            '/Pages/PAPayRateAdd',
                        ],
                    },
                    {
                        title: '支付限额',
                        key: '/Pages/PAPayLimitation',
                        childKeys: [
                            '/Pages/PAPayLimitationDetail',
                            '/Pages/PAPayLimitationAdd',
                        ],
                    },
                ]
            },
            {
                subMenuTitle: '渠道管理',
                subMenuList: [
                    {
                        title: '通道列表',
                        key: '/Pages/PAChannelList',
                        childKeys: ['/Pages/PAChannelDetail'],
                    },
                ]
            },
            // {
            //     subMenuTitle: '业务统计',
            //     subMenuList: [
            //         {
            //             title: '用户统计',
            //             key: '/Pages/PAUserStatistics',
            //             // childKeys: ['/Pages/ESApplyForDetail'],
            //         },
            //         {
            //             title: '交易统计',
            //             key: '/Pages/PATradeStatistics',
            //             // childKeys: ['/Pages/ESApplyForDetail'],
            //         },
            //         {
            //             title: '渠道统计',
            //             key: '/Pages/PAChannelStatistics',
            //             // childKeys: ['/Pages/ESApplyForDetail'],
            //         },
            //         {
            //             title: '商户统计',
            //             key: '/Pages/PABusinessesStatistics',
            //             // childKeys: ['/Pages/ESApplyForDetail'],
            //         },
            //     ]
            // },
            // {
            //     subMenuTitle: '通道费用',
            //     subMenuList: [
            //         {
            //             title: '费用明细',
            //             key: '/Pages/PACostList',
            //             childKeys: ['/Pages/PACostDetail'],
            //         },
            //     ]
            // },
        ],
    }
};
export default PaymentAssistantMenuData;
