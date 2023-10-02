/*
*   消息中心的菜单
*  */

const MessageMenuData = () => {
    return {
        title: '消息中心',
        isShow: true,
        sideMenu: [
            {
                subMenuTitle: '消息管理',
                onlyTwo: true,
                key: '/Pages/MessageManagementList',
                childKeys: ['/Pages/MessageManagementDetail'],
            },
            {
                subMenuTitle: '消息模板管理',
                onlyTwo: true,
                key: '/Pages/MessageTemplateList',
                childKeys: ['/Pages/MessageTemplateDetail', '/Pages/MessageTemplateEditor'],
            },
            // {
            //     subMenuTitle: '分发规则管理',
            //     onlyTwo: true,
            //     key: '/Pages/DistributionRuleList',
            //     childKeys: ['/Pages/DistributionRuleEditor', '/Pages/DistributionRuleDetail', '/Pages/RuleAmendantRecord'],
            // },
            {
                subMenuTitle: '消息统计',
                onlyTwo: true,
                key: '/Pages/MessageStatistics',
                // childKeys: ['/Pages/CreateRules'],
            }
        ],
    }
};
export default MessageMenuData;
