/*
* 注意事项：
* 0、第一级菜单的 isFirstOrder=true （必须字段）
* 1、key值必须唯一 （必须字段）
* 2、url固定模式：'/pages/appCenter/sellAssistant/terminalPage/{key}/文件名'（必须字段）
* */

import {
    gk_10, gk_01, dd_10, dd_01, hw_01, hw_10, fp_01, fp_10, ys_10, ys_01,
    sh_01, sh_10, jy_01, jy_10, ht_01, ht_10, sp_01, sp_10, yg_01, yg_10, pz_01, pz_10, kh_01, kh_10
} from '../../../../resource';

const TerminalMenu = () => {
    return [
        {
            isFirstOrder: true,
            title: '概况',
            key: 'saGeneral',
            url: '/pages/appCenter/sellAssistant/terminalPage/saGeneral/saGeneralPage',
            logo: gk_01,
            hoverLogo: gk_10,
            sideMenu: [],
        },
        {
            isFirstOrder: true,
            title: '订单管理',
            logo: dd_01,
            hoverLogo: dd_10,
            key: 'saOrder',
            sideMenu: [
                {
                    title: '订单管理列表',
                    key: 'saOrderList',
                    // url: '/pages/appCenter/sellAssistant/terminalPage/saOrder/saOrderList',
                },
            ]
        },
        {
            isFirstOrder: true,
            title: '货物管理',
            logo: hw_01,
            hoverLogo: hw_10,
            key: 'saGoods',
            sideMenu: [
                {
                    title: '货物管理列表',
                    key: 'saGoodsList',
                    // url: '/pages/appCenter/sellAssistant/terminalPage/saGoods/saGoodsList',
                },
            ]
        },
        {
            isFirstOrder: true,
            title: '运输管理',
            logo: ys_01,
            hoverLogo: ys_10,
            key: 'saTransport',
            sideMenu: [
                {
                    title: '运输管理列表',
                    key: 'saTransportList',
                    // url: '/pages/appCenter/sellAssistant/terminalPage/saTransport/saTransportList',
                },
            ]
        },
        {
            isFirstOrder: true,
            title: '发票管理',
            logo: fp_01,
            hoverLogo: fp_10,
            key: 'saInvoice',
            sideMenu: [
                {
                    title: '发票管理列表',
                    key: 'saInvoiceList',
                    // url: '/pages/appCenter/sellAssistant/terminalPage/saInvoice/saInvoiceList',
                },
            ]
        },
        {
            isFirstOrder: true,
            title: '售后管理',
            logo: sh_01,
            hoverLogo: sh_10,
            key: 'saAfterSale',
            sideMenu: [
                {
                    title: '售后管理列表',
                    key: 'saAfterSaleList',
                    // url: '/pages/appCenter/sellAssistant/terminalPage/saAfterSale/saAfterSaleList',
                },
            ]
        },
        {
            isFirstOrder: true,
            title: '交易单管理',
            logo: jy_01,
            hoverLogo: jy_10,
            key: 'saTransaction',
            sideMenu: [
                {
                    title: '交易单列表',
                    key: 'saTransactionList',
                    // url: '/pages/appCenter/sellAssistant/terminalPage/saTransaction/saTransactionList',
                },
            ]
        },
        {
            isFirstOrder: true,
            title: '合同管理',
            logo: ht_01,
            hoverLogo: ht_10,
            key: 'saContractManage',
            sideMenu: [
                {
                    title: '合同模板',
                    key: 'saConTemplate',
                    url: '/pages/appCenter/sellAssistant/terminalPage/saConTemplate/saContractList',
                    // childUrl: [
                    //     '/pages/appCenter/sellAssistant/terminalPage/saConTemplate/saContractDetail',
                    // ],
                },
                {
                    title: '合同模板类型',
                    key: 'saConTemType',
                    url: '/pages/appCenter/sellAssistant/terminalPage/saConTemType/saTemplateType',
                },
            ]
        },
        {
            isFirstOrder: true,
            title: '商品管理',
            logo: sp_01,
            hoverLogo: sp_10,
            key: 'saCommodityManage',
            sideMenu: [
                {
                    title: '商品列表',
                    key: 'saCommodity',
                    url: '/pages/appCenter/sellAssistant/terminalPage/saCommodity/saComList',
                },
                {
                    title: '商品分类列表',
                    key: 'saComClassify',
                    // url: '/pages/appCenter/sellAssistant/terminalPage/saComClassify/saComClaList',
                },
                {
                    title: '商品标签',
                    key: 'saComLabel',
                    // url: '/pages/appCenter/sellAssistant/terminalPage/saComLabel/saComLabList',
                },
            ]
        },
        {
            isFirstOrder: true,
            title: '客户管理',
            logo: kh_01,
            hoverLogo: kh_10,
            key: 'saCustom',
            sideMenu: [
                {
                    title: '客户列表',
                    key: 'saCustomList',
                    // url: '/pages/appCenter/sellAssistant/terminalPage/saCustom/saCustomList',
                },
            ]
        },
        {
            isFirstOrder: true,
            title: '员工管理',
            logo: yg_01,
            hoverLogo: yg_10,
            key: 'saStaff',
            sideMenu: [
                {
                    title: '员工列表',
                    key: 'saStaffList',
                    // url: '/pages/appCenter/sellAssistant/terminalPage/saStaff/saStaffList',
                },
            ]
        },
        {
            isFirstOrder: true,
            title: '交易配置',
            logo: pz_01,
            hoverLogo: pz_10,
            key: 'saDeal',
            sideMenu: [
                {
                    title: '交易配置',
                    key: 'saDealList',
                    // url: '/pages/appCenter/sellAssistant/terminalPage/saDeal/saDealList',
                },
            ]
        },
    ];
};

export default TerminalMenu;
