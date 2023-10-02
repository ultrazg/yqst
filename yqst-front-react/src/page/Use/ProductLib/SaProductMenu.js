/*
* 注意事项：
* 0、第一级菜单的 isFirstOrder=true （必须字段）
* 1、key值必须唯一 （必须字段）
* 2、url固定模式：'/pages/appCenter/sellAssistant/saProductHome/{key}/文件名'（必须字段）
* */

import {
    gk_10, gk_01, dd_10, dd_01, hw_01, hw_10, fp_01, fp_10, ys_10, ys_01,
    sh_01, sh_10, jy_01, jy_10, ht_01, ht_10, sp_01, sp_10, yg_01, yg_10, pz_01, pz_10, kh_01, kh_10
} from '../../../resource';

const SaProductMenu = () => {
    return [
        {
            isFirstOrder: true,
            title: '产品管理',
            logo: sp_01,
            hoverLogo: sp_10,
            key: 'saProduct',
            sideMenu: [
                {
                    title: '产品列表',
                    key: 'SaProModule',
                    url: '/pages/appCenter/productLib/SaProductHome/SaProModule/SaProductList',
                },
                {
                    title: '产品类别列表',
                    key: 'SaOrdType',
                    url: '/pages/appCenter/productLib/SaProductHome/SaOrdType/SaOrdTypeList',
                },
            ]
        },
    ];
};

export default SaProductMenu;
