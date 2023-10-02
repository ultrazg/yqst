/*
*   Created by yb
*   商机助手中心
*  */

const BusinessAssistantMenuData = () => {
    return {
        title: '商机助手中心',
        isShow: true,
        tag: "BusinessAssistant",
        sideMenu: [
            {
                subMenuTitle: '商机助手',
                subMenuList: [
                    {
                        title: '用户列表',
                        key: '/Pages/OpportunityAssistantUserList',
                        childKeys: ['/Pages/BusinessOpportunityList']
                    },
                ]
            },
        ],
    }
};
export default BusinessAssistantMenuData;
