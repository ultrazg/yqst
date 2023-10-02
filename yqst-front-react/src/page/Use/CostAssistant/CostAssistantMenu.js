/*
* 注意事项：
* 0、第一级菜单的 isFirstOrder=true （必须字段）
* 1、key值必须唯一 （必须字段）
* 2、url固定模式：'/pages/appCenter/sellAssistant/saProductHome/{key}/文件名'（必须字段）
* */

import {
    firm_count_default,
    firm_cost_default,
    firm_settlement_default,
    gk_01,
    gk_10,
} from '../../../resource';

const CostAssistantMenu = () => {
    return [
        {
            isFirstOrder: true,
            title: '概况',
            key: 'cosAssGeneralSituation',
            url: '/pages/appCenter/costAssistant/costAssistantHome/cosAssGeneralSituation/cosAssGeneralSituationPage',
            logo: gk_01,
            hoverLogo: gk_10,
            sideMenu: [],
        },
        {
            isFirstOrder: true,
            title: '结算单',
            logo: firm_settlement_default,
            hoverLogo: firm_settlement_default,
            key: 'FinalStatement',
            // url: '/pages/appCenter/costAssistant/costAssistantHome/FinalStatement/List',
            sideMenu: [
                {
                    title: '收款方',
                    key: 'FinalStatementPayee',
                    url: '/pages/appCenter/costAssistant/costAssistantHome/FinalStatementPayee/List'
                },
                {
                    title: '付款方',
                    key: 'FinalStatementPayer',
                    url: '/pages/appCenter/costAssistant/costAssistantHome/FinalStatementPayer/List'
                },
                {
                    title: '出租-发起结算',
                    key: 'FinalStatementCreate',
                    url: '/pages/appCenter/costAssistant/costAssistantHome/FinalStatementCreate'
                },
                {
                    title: '承租-发起结算',
                    key: 'FinalStatementLesseeCreate',
                    url: '/pages/appCenter/costAssistant/costAssistantHome/FinalStatementLesseeCreate'
                }
            ]
        },
        {
            isFirstOrder: true,
            title: '结算调整',
            logo: firm_cost_default,
            hoverLogo: firm_cost_default,
            key: 'BusinessAdjust',
            url: '/pages/appCenter/costAssistant/costAssistantHome/BusinessAdjust/BusinessAdjustIndex'
        },
        // {
        //     isFirstOrder: true,
        //     title: '制费用单',
        //     logo: firm_cost_default,
        //     hoverLogo: firm_cost_default,
        //     key: 'ExpressFeeList',
        //     // url: '/pages/appCenter/costAssistant/costAssistantHome/BusinessAdjust/BusinessAdjustIndex',
        //     sideMenu: [
        //         {
        //             title: '租赁物流单',
        //             key: 'ExpressFeeList',
        //             url: '/pages/appCenter/costAssistant/costAssistantHome/ExpressFeeList'
        //         },
        //         {
        //             title: '租赁保底单',
        //             key: 'GuaranteeFeeList',
        //             url: '/pages/appCenter/costAssistant/costAssistantHome/GuaranteeFeeList'
        //         },
        //         {
        //             title: '租赁维保单',
        //             key: 'ServiceFeeList',
        //             url: '/pages/appCenter/costAssistant/costAssistantHome/ServiceFeeList'
        //         },
        //         {
        //             title: '制租赁物流单',
        //             key: 'ExpressFeeCreate',
        //             url: '/pages/appCenter/costAssistant/costAssistantHome/ExpressFeeCreate'
        //         },
        //         {
        //             title: '制租赁保底单',
        //             key: 'GuaranteeFeeCreate',
        //             url: '/pages/appCenter/costAssistant/costAssistantHome/GuaranteeFeeCreate'
        //         },
        //         {
        //             title: '制租赁维保单',
        //             key: 'ServiceFeeCreate',
        //             url: '/pages/appCenter/costAssistant/costAssistantHome/ServiceFeeCreate'
        //         },
        //     ]
        // },
        {
            isFirstOrder: true,
            title: '附加费用',
            logo: firm_cost_default,
            hoverLogo: firm_cost_default,
            key: 'AddFees',
            url: '/pages/appCenter/costAssistant/costAssistantHome/AddFees/AddFeesIndex',
            sideMenu: [
                // {
                //     title: '租赁物流单',
                //     key: 'ExpressFeeList',
                //     url: '/pages/appCenter/costAssistant/costAssistantHome/ExpressFeeList'
                // },
                // {
                //     title: '租赁物流单',
                //     key: 'ExpressFeeList',
                //     url: '/pages/appCenter/costAssistant/costAssistantHome/ExpressFeeList'
                // },
                // {
                //     title: '租赁物流单',
                //     key: 'ExpressFeeList',
                //     url: '/pages/appCenter/costAssistant/costAssistantHome/ExpressFeeList'
                // },
            ]
        }
    ];
};

export default CostAssistantMenu;
