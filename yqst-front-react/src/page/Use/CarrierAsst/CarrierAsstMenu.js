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
    price_logistics_default,
    gk_01,
    gk_10,
} from '../../../resource';

const carrierAsstMenu = () => {
    return [
        {
            isFirstOrder: true,
            title: '概况',
            key: 'carrierAsstSituationPage',
            url: '/pages/appCenter/carrierAsst/carrierAsstHome/carrierAsstSituationPage',
            logo: gk_01,
            hoverLogo: gk_10,
            sideMenu: [],
        },
        {
            isFirstOrder: true,
            title: '物流价格',
            key: 'expressValue',
            logo: price_logistics_default,
            hoverLogo: price_logistics_default,
            sideMenu: [
                {
                    title: '创建物流价格政策',
                    key: 'carrierAsstExpressValuePolicyAdd',
                    url: {
                        pathname: '/pages/appCenter/carrierAsst/carrierAsstHome/carrierAsstExpressValuePolicyAdd',
                        search: null
                    }
                },
                {
                    title: '物流价格政策列表',
                    key: 'carrierAsstExpressValuePolicyList',
                    url: '/pages/appCenter/carrierAsst/carrierAsstHome/carrierAsstExpressValuePolicyList',
                },
            ],
        },
    ];
};

export default carrierAsstMenu;
