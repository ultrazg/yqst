/*
*   Created by yb on 2019/10/23
*   认证中心的菜单
*  */

const AttestationMenuData = () => {
    return {
        title: '认证中心',
        isShow: true,
        sideMenu: [
            {
                subMenuTitle: '用户认证组管理',
                onlyTwo: true,
                key: '/Pages/AttUserGroupList',
                childKeys: ['/Pages/AttUserGroupDetail'],
            },
            {
                subMenuTitle: '认证内容管理',
                subMenuList: [
                    {
                        title: '资质管理',
                        key: '/Pages/AttAptitudeList',
                        childKeys: ['/Pages/AttAptitudeDetail', '/Pages/AttAptitudeEditor'],
                    },
                    {
                        title: '资质组管理',
                        key: '/Pages/AttAptitudeGroupList',
                        childKeys: ['/Pages/AttAptitudeGroupDetail', '/Pages/AttAptitudeGroupEditor'],
                    },
                    {
                        title: '认证组管理',
                        key: '/Pages/AttGroupList',
                        childKeys: ['/Pages/AttGroupDetail', '/Pages/AttGroupEditor'],
                    }
                ]
            },
            {
                subMenuTitle: '认证规则管理',
                onlyTwo: true,
                key: '/Pages/AttRuleList',
                childKeys: ['/Pages/AttRuleDetail', '/Pages/AttRuleEditor'],
            },
            {
                subMenuTitle: '认证数据总计',
                onlyTwo: true,
                key: '/Pages/AttDataStatistics',
                // childKeys: ['/Pages/AttDataStatistics'],
            }
        ],
    }
};
export default AttestationMenuData;
