/*
*   Created by yb on 2019/09/25.
*   合同中心的菜单
*  */

const ContractMenuData = () => {
    return {
        title: '合同中心',
        isShow: true,
        sideMenu: [
            {
                subMenuTitle: '合同、协议管理',
                subMenuList: [
                    {
                        title: '合同管理',
                        key: '/Pages/ContractManageList',
                        childKeys: ['/Pages/ContractManageDetail'],
                    },
                    {
                        title: '协议管理',
                        key: '/Pages/AgreementManageList',
                        childKeys: ['/Pages/AgreementManageDetail'],
                    }
                ]
            },
            {
                subMenuTitle: '模板管理',
                subMenuList: [
                    {
                        title: '合同模板管理',
                        key: '/Pages/ContractTemplateList',
                        childKeys: ['/Pages/ContractTemplateDetail'],
                    },
                    {
                        title: '协议模板管理',
                        key: '/Pages/AgreementTemplateList',
                        childKeys: ['/Pages/AgreementTemplateDetail'],
                    }
                ]
            },
            {
                subMenuTitle: '第三方服务',
                subMenuList: [
                    {
                        title: 'E签宝',
                        key: '/Pages/ESignatureList',
                        // childKeys: ['/Pages/ESignatureDetail'],
                    }
                ]
            },
            {
                subMenuTitle: '数据统计',
                onlyTwo: true,
                key: '/Pages/ContractStatistics',
                // childKeys: ['/Pages/MessageManagementDetail'],
            }
        ],
    }
};
export default ContractMenuData;
