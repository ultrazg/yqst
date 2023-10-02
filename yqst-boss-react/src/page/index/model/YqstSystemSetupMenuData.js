/**
 * Created by yb on 2019/11/15
 */

const YqstSystemSetupMenuData = [
    {
        title: '系统设置',
        isShow: true,
        sideMenu: [
            {
                subMenuTitle: '管理员设置',
                onlyTwo: true,
                key: '/Pages/AdministratorSetupList',
                // childKeys: ['/Pages/AdministratorSetupDetail'],
            },
            {
                subMenuTitle: '敏感词过滤',
                onlyTwo: true,
                key: '/Pages/SensitiveWordList',
                // childKeys: ['/Pages/SensitiveWordDetail'],
            },
        ],
    },
];
export default YqstSystemSetupMenuData;
