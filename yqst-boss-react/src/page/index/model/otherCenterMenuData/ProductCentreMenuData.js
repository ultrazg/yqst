/*
*   Created by yb on 2020/11/24.
*   产品中心的菜单
*  */

const ProductCentreMenuData = () => {
    return {
        title: '平台产品库',
        isShow: true,
        sideMenu: [
            {
                subMenuTitle: '产品管理',
                subMenuList: [
                    {
                        title: '产品列表',
                        key: '/Pages/ProductManageList',
                        childKeys: ['/Pages/ProductManageDetail'],
                    },
                    {
                        title: '产品类目列表',
                        key: '/Pages/ProductClassList',
                        childKeys: ['/Pages/ProductClassDetail'],
                    }
                ]
            },
            // {
            //     subMenuTitle: '申请列表',
            //     onlyTwo: true,
            //     key: '/Pages/ProductApplyForList',
            //     childKeys: ['/Pages/ProductApplyForDetail'],
            // },
            // {
            //     subMenuTitle: '关联列表',
            //     onlyTwo: true,
            //     key: '/Pages/ProductRelevanceList',
            //     // childKeys: ['/Pages/MessageManagementDetail'],
            // }
            {
                subMenuTitle: '单位管理',
                onlyTwo: true,
                key: '/Pages/UnitManager',
            },
        ],
    }
};
export default ProductCentreMenuData;
