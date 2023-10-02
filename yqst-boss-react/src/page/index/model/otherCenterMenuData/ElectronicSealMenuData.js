/*
*   Created by yb on 2020/07/13.
*   电子签章服务中心
*  */

const ElectronicSealMenuData = () => {
    return {
        title: '电子签章服务中心',
        isShow: true,
        sideMenu: [
            {
                subMenuTitle: '客户管理',
                subMenuList: [
                    {
                        title: '客户列表',
                        key: '/Pages/ESClientList',
                        childKeys: ['/Pages/ESContractManageDetail'],
                    },
                ]
            },
            {
                subMenuTitle: '数据管理',
                subMenuList: [
                    {
                        title: '数据模板',
                        key: '/Pages/ESDataTemplate',
                        // childKeys: ['/Pages/ContractTemplateDetail'],
                    },
                    {
                        title: '平台数据',
                        key: '/Pages/ESPlatformData',
                        childKeys: [
                            '/Pages/ESPlatformServiceData',
                            '/Pages/ESPlatformSealDetail',
                            '/Pages/ESPlatformCertificationDetail',
                        ],
                    },
                    {
                        title: '付费数据',
                        key: '/Pages/ESPaymentData',
                        childKeys: ['/Pages/ESPayDetail'],
                    }
                ]
            },
            {
                subMenuTitle: '服务管理',
                subMenuList: [
                    // {
                    //     title: '服务列表',
                    //     key: '/Pages/ESServeList',
                    //     childKeys: ['/Pages/ESServeDetail'],
                    // },
                    {
                        title: '服务规则管理',
                        key: '/Pages/esServiceRulesList',
                        childKeys: [
                            '/Pages/ESAddServiceRule',
                            '/Pages/ESEditServiceRule',
                            '/Pages/ESServiceRuleDetail'
                        ],
                    },
                    {
                        title: '服务实例管理',
                        key: '/Pages/ESServiceInstanceList',
                        childKeys: ['/Pages/ESServiceInstanceDetail'],
                    }
                ]
            },
            {
                subMenuTitle: '电子签章申请',
                subMenuList: [
                    {
                        title: '申请列表',
                        key: '/Pages/ESApplyForList',
                        childKeys: ['/Pages/ESApplyForDetail'],
                    }
                ]
            }
        ],
    }
};
export default ElectronicSealMenuData;
