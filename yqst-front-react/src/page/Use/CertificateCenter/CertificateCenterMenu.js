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

const CertificateCenterMenu = () => {
    return [
        {
            isFirstOrder: true,
            title: '存证列表',
            key: 'certificateCenterList',
            url: '/pages/appCenter/certificateCenter/certificateCenterHome/certificateCenterList',
            logo: gk_01,
            hoverLogo: gk_10,
            sideMenu: [],
        },
    ];
};

export default CertificateCenterMenu;
