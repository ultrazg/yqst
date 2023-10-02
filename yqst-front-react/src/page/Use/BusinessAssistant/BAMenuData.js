import {perOtherCon} from '../../../resource';

const BAMenuData = () => {
    return [
        {
            isFirstOrder: true,
            title: '个人商机管理',
            logo: perOtherCon,
            hoverLogo: perOtherCon,
            key: 'baPersonalBusinessManage',
            sideMenu: [
                {
                    title: '个人商机列表',
                    key: 'baPersonalBusiness',
                    url: '/pages/appCenter/businessAssistant/baPersonalBusiness/baPersonalBusinessList',
                },
            ]
        },
    ];
};

export default BAMenuData;
