/*
* 注意事项：
* 0、第一级菜单的 isFirstOrder=true （必须字段）
* 1、key值必须唯一 （必须字段）
* 2、url固定模式：'/pages/appCenter/sellAssistant/saProductHome/{key}/文件名'（必须字段）
* */

import {
    rent_price_default,
    gk_01,
    gk_10,
} from '../../../resource';

const RentAssistantMenu = () => {
    return [
        {
            isFirstOrder: true,
            title: '概况',
            key: 'rentAssistantSituation',
            url: '/pages/appCenter/rentAssistant/rentAssistantHome/rentAssistantSituation',
            logo: gk_01,
            hoverLogo: gk_10,
            sideMenu: [],
        },
        {
            isFirstOrder: true,
            title: '租赁价格',
            logo: rent_price_default,
            hoverLogo: rent_price_default,
            key: 'rentAsstPrice',
            sideMenu: [
                {
                    title: '租赁物资统一价格',
                    // logo: firm_list_default,
                    // hoverLogo: firm_list_selected,
                    key: 'rentalWarehouse',
                    url: '/pages/appCenter/rentAssistant/rentAssistantHome/rentalWarehouse',
                },
                {
                    title: '创建租赁价格政策',
                    // logo: firm_list_default,
                    // hoverLogo: firm_list_selected,
                    key: 'rentalPricePolicyAdd',
                    url: '/pages/appCenter/rentAssistant/rentAssistantHome/rentalPricePolicyAdd/0',
                },
                {
                    title: '租赁价格政策列表',
                    // logo: firm_list_default,
                    // hoverLogo: firm_list_selected,
                    key: 'rentalPricePolicyList',
                    url: '/pages/appCenter/rentAssistant/rentAssistantHome/rentalPricePolicyList',
                }
            ]
        }
    ];
};

export default RentAssistantMenu;
