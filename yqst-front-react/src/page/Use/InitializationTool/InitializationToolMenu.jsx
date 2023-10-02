import {
    gk_01,
    gk_10,
} from '../../../resource';

const InitializationToolMenu = () => {
    return [
        {
            isFirstOrder: true,
            title: '结算期初物资对账',
            logo: gk_01,
            hoverLogo: gk_10,
            key: 'InitializationTool',
            sideMenu: [
                {
                    title: '对账列表',
                    key: 'MaterialRecListModule',
                    url: '/pages/appCenter/InitializationTool/MaterialRecListModule/List',
                }
            ]
        },
    ];
};

export default InitializationToolMenu;
