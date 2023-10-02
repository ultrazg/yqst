/*
*   Created by yb on 2019/09/10.
*   支付中心的菜单
*  */

const PaymentMenuData = () => {
    return {
        title: '支付中心',
        isShow: true,
        sideMenu: [
            {
                subMenuTitle: '用户资金管理',
                subMenuList: [
                    {
                        title: '收付款管理',
                        key: '/Pages/ReceivingManageList',
                        childKeys: ['/Pages/ReceivingManageDetail'],
                    },
                    {
                        title: '退款管理',
                        key: '/Pages/RefundManageList',
                        childKeys: ['/Pages/RefundManageDetail'],
                    }
                ]
            },
            {
                subMenuTitle: '商户账户管理',
                subMenuList: [
                    {
                        title: '商户账户管理',
                        key: '/Pages/MerchantAccountList',
                        childKeys: ['/Pages/MerchantAccountDetail'],
                    },
                    {
                        title: '账户申请管理',
                        key: '/Pages/AccountApplicationList',
                        childKeys: ['/Pages/AccountApplicationDetail'],
                    },
                    {
                        title: '注销申请管理',
                        key: '/Pages/CancellationApplicationList',
                        childKeys: ['/Pages/CancellationApplicationDetail'],
                    }
                ]
            },
            {
                subMenuTitle: '商户账户绑定',
                subMenuList: [
                    {
                        title: '绑定关系管理',
                        key: '/Pages/BindingRelationshipList',
                        childKeys: ['/Pages/BindingRelationshipDetail'],
                    },
                    {
                        title: '绑定申请管理',
                        key: '/Pages/BindingApplicationList',
                        childKeys: ['/Pages/BindingApplicationDetail'],
                    },
                    {
                        title: '解绑申请管理',
                        key: '/Pages/UntieApplicationList',
                        childKeys: ['/Pages/UntieApplicationDetail'],
                    }
                ]
            },
            {
                subMenuTitle: '基础设置',
                subMenuList: [
                    {
                        title: '收支付渠道管理',
                        key: '/Pages/APChannelList',
                        childKeys: ['/Pages/APChannelDetail', '/Pages/APChannelEdit'],
                    },
                    {
                        title: '收支付方案管理',
                        key: '/Pages/APSchemeList',
                        childKeys: ['/Pages/APSchemeDetail', '/Pages/APSchemeEdit'],
                    }
                ]
            },
            {
                subMenuTitle: '支付中心数据统计',
                onlyTwo: true,
                key: '/Pages/PaymentCenterStatistics',
                // childKeys: ['/Pages/MessageManagementDetail'],
            }
        ],
    }
};
export default PaymentMenuData;
