/*
*   Created by yb on 2019/09/27
*   税票中心的菜单
*  */

const TaxReceiptMenuData = () => {
    return {
        title: '税票中心',
        isShow: true,
        sideMenu: [
            {
                subMenuTitle: '开票与抬头',
                subMenuList: [
                    {
                        title: '开票信息管理',
                        key: '/Pages/MakeOutAnInvoiceList',
                        childKeys: ['/Pages/MakeOutAnInvoiceDetail'],
                    },
                    {
                        title: '抬头管理',
                        key: '/Pages/RiseManageList',
                        childKeys: ['/Pages/RiseManageDetail'],
                    }
                ]
            },
            {
                subMenuTitle: '发票管理',
                subMenuList: [
                    {
                        title: '蓝字发票申请管理',
                        key: '/Pages/BlueInvoiceApplyList',
                        childKeys: ['/Pages/BlueInvoiceApplyDetail'],
                    },
                    {
                        title: '红冲发票申请管理',
                        key: '/Pages/RedInvoiceApplyList',
                        childKeys: ['/Pages/RedInvoiceApplyDetail'],
                    },
                    {
                        title: '蓝字发票管理',
                        key: '/Pages/BlueInvoiceList',
                        childKeys: ['/Pages/BlueInvoiceDetail'],
                    },
                    {
                        title: '红冲发票管理',
                        key: '/Pages/RedInvoiceList',
                        childKeys: ['/Pages/RedInvoiceDetail'],
                    }
                ]
            },
            {
                subMenuTitle: '发票寄送管理',
                onlyTwo: true,
                key: '/Pages/InvoiceSendList',
                childKeys: ['/Pages/InvoiceSendDetail'],
            },
            {
                subMenuTitle: '基本设置',
                subMenuList: [
                    {
                        title: '发票分类管理',
                        key: '/Pages/InvoiceClassifyList',
                        childKeys: ['/Pages/InvoiceClassifyDetail', '/Pages/InvoiceClassifyEditor'],
                    },
                    {
                        title: '发票要素管理',
                        key: '/Pages/InvoiceElementList',
                        childKeys: ['/Pages/InvoiceElementDetail', '/Pages/InvoiceElementEditor'],
                    },
                    {
                        title: '发票要素组管理',
                        key: '/Pages/InvoiceElementGroupList',
                        childKeys: ['/Pages/InvoiceElementGroupDetail', '/Pages/InvoiceElementGroupEditor'],
                    },
                    {
                        title: '发票模板管理',
                        key: '/Pages/InvoiceTemplateList',
                        childKeys: ['/Pages/InvoiceTemplateDetail', '/Pages/InvoiceTemplateEditor'],
                    }
                ]
            },
            {
                subMenuTitle: '税票中心数据统计',
                onlyTwo: true,
                key: '/Pages/TaxReceiptStatistics',
                // childKeys: ['/Pages/MessageManagementDetail'],
            }
        ],
    }
};
export default TaxReceiptMenuData;
