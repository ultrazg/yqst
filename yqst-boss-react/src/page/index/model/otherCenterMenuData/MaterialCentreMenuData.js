/*
*   Created by yb on 2020/11/24.
*   产品中心的菜单
*  */

const ProductCentreMenuData = () => {
    return {
        title: '平台物资库',
        isShow: true,
        sideMenu: [
            {
                subMenuTitle: '物资管理',
                subMenuList: [
                    {
                        title: '物资列表',
                        key: '/Pages/MaterialManageList',
                        childKeys: ['/Pages/MaterialManageDetail'],
                    },
                    {
                        title: '物资类目列表',
                        key: '/Pages/MaterialClassList',
                        childKeys: ['/Pages/MaterialClassDetail'],
                    }
                ]
            }
        ],
    }
};
export default ProductCentreMenuData;
