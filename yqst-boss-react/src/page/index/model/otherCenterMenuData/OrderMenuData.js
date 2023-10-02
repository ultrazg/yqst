/*
*   Created by yb on 2019/09/10.
*   订单中心的菜单
*  */

const PaymentMenuData = () => {
    return {
        title: '订单中心',
        isShow: true,
        sideMenu: [
            {
                subMenuTitle: '订单管理',
                onlyTwo: true,
                key: '/Pages/OrderManagementList',
                childKeys: ['/Pages/OrderManagementDetail'],
            },
            {
                subMenuTitle: '货单管理',
                subMenuList: [
                    {
                        title: '收发货单管理',
                        key: '/Pages/ReceiveAndDeliverList',
                        childKeys: ['/Pages/ReceiveAndDeliverDetail'],
                    },
                    {
                        title: '退货单管理',
                        key: '/Pages/ReturnedOrderList',
                        childKeys: ['/Pages/ReturnedOrderDetail'],
                    }
                ]
            },
            {
                subMenuTitle: '交易单管理',
                onlyTwo: true,
                key: '/Pages/TradingOrderList',
                childKeys: ['/Pages/TradingOrderDetail'],
            },
            {
                subMenuTitle: '售后单管理',
                onlyTwo: true,
                key: '/Pages/AfterOrderList',
                childKeys: ['/Pages/AfterOrderDetail'],
            },
            {
                subMenuTitle: '订单中心数据统计',
                onlyTwo: true,
                key: '/Pages/OrderCenterStatistics',
                // childKeys: ['/Pages/CreateRules'],
            }
        ],
    }
};
export default PaymentMenuData;
