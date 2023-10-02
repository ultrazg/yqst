/*
*   Created by yb on 2019/11/11.
*   云服务中心的菜单
*  */

const ServeMenuData = () => {
    return {
        title: '云服务中心',
        isShow: true,
        sideMenu: [
            {
                subMenuTitle: '云服务及规则管理',
                subMenuList: [
                    {
                        title: '云服务管理',
                        key: '/Pages/CloudServeList',
                        childKeys: ['/Pages/CloudServeDetail', '/Pages/CloudServeEdit'],
                    },
                    {
                        title: '云服务规则管理',
                        key: '/Pages/CloudServeRuleList',
                        childKeys: ['/Pages/CloudServeRuleDetail', 'Pages/CloudServeRuleEdit'],
                    }
                ]
            },
            {
                subMenuTitle: '云服务实例管理',
                onlyTwo: true,
                key: '/Pages/CloudServeExList',
                childKeys: ['/Pages/CloudServeExDetail'],
            },
            {
                subMenuTitle: '基本配置',
                subMenuList: [
                    {
                        title: '云服务分类管理',
                        key: '/Pages/CloudServeClaList',
                        childKeys: ['/Pages/CloudServeClaDetail', '/Pages/CloudServeClaEdit'],
                    },
                    {
                        title: '开发者白名单管理',
                        key: '/Pages/CloudServeDevelopersList',
                        // childKeys: ['/Pages/CloudServeDevelopersDetail'],
                    }
                ]
            },
            {
                subMenuTitle: '云服务数据统计',
                onlyTwo: true,
                key: '/Pages/CloudServeStatistics',
                // childKeys: ['/Pages/MessageManagementDetail'],
            }
        ],
    }
};
export default ServeMenuData;
