/*
*   商品中心的菜单
*  */

const CommodityMenuData = () => {
    return {
        title: '商品中心',
        isShow: true,
        sideMenu: [
            {
                subMenuTitle: '产品管理',
                subMenuList: [
                    {
                        title: '产品列表',
                        key: '/Pages/ComProductList',
                        childKeys: ['/Pages/ComProductDetail'],
                    },
                    {
                        title: '产品类目管理',
                        key: '/Pages/ComProductCategoryList',
                        childKeys: ['/Pages/ComProductCategoryDetail'],
                    }
                ]
            },
            {
                subMenuTitle: '商品管理',
                subMenuList: [
                    {
                        title: '商品列表',
                        key: '/Pages/ComCommodityList',
                        childKeys: ['/Pages/ComCommodityDetail'],
                    },
                    {
                        title: '商品分类管理',
                        key: '/Pages/ComCommodityClassList',
                        childKeys: ['/Pages/ComCommodityClassDetail'],
                    },
                    {
                        title: '商品标签管理',
                        key: '/Pages/ComCommodityLabelList',
                        // childKeys: ['/Pages/CreateRules'],
                    }
                ]
            },
            {
                subMenuTitle: '销售终端管理',
                onlyTwo: true,
                key: '/Pages/ComPOSTerminalList',
                childKeys: ['/Pages/ComPOSTerminalDetail'],
            },
            {
                subMenuTitle: '商品数据统计',
                onlyTwo: true,
                key: '/Pages/ComCommodityStatistics',
                // childKeys: ['/Pages/CreateRules'],
            }
        ],
    }
};
export default CommodityMenuData;
