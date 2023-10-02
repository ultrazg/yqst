/*
*   Created by yb on 2019/10/24
*   用户中心的菜单
*  */

const UserMenuData = () => {
    return {
        title: '用户中心',
        isShow: true,
        sideMenu: [
            {
                subMenuTitle: '个人用户管理',
                onlyTwo: true,
                key: '/Pages/OneselfUserManageList',
                childKeys: ['/Pages/OneselfUserManageDetail'],
            },
            {
                subMenuTitle: '企业用户管理',
                onlyTwo: true,
                key: '/Pages/CompanyUserList',
                childKeys: ['/Pages/CompanyUserDetail'],
            },
            {
                subMenuTitle: '项目用户管理',
                onlyTwo: true,
                key: '/Pages/ProjectUserList',
                childKeys: ['/Pages/ProjectUserDetail'],
            },
            {
                subMenuTitle: '用户日志管理',
                subMenuList: [
                    {
                        title: '登录登出日志',
                        key: '/Pages/LoginLogOutList',
                        // childKeys: ['/Pages/LoginLogOutDetail'],
                    },
                    {
                        title: '操作日志',
                        key: '/Pages/OperationLogList',
                        // childKeys: ['/Pages/OperationLogDetail'],
                    }
                ]
            },
            {
                subMenuTitle: '用户数据统计',
                onlyTwo: true,
                key: '/Pages/UserDataStatistics',
                // childKeys: ['/Pages/MessageManagementDetail'],
            }
        ],
    }
};
export default UserMenuData;
