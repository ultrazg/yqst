import {
    gk_01,
    gk_10,
} from '../../../resource';

const SupplementAsstMenu = () => {
    return [
        {
            isFirstOrder: true,
            title: '概况',
            logo: gk_01,
            hoverLogo: gk_10,
            key: 'SupplementAsstHome',
            url: '/pages/appCenter/SupplementAsstHome'
            // sideMenu: [
            //     {
            //         title: '对账列表',
            //         key: 'MaterialRecListModule',
            //         url: '/pages/appCenter/InitializationTool/MaterialRecListModule/List',
            //     }
            // ]
        },
    ];
}

export default SupplementAsstMenu;