import {cli, dat} from '../../../resource';

const ESHMenuData = () => {
    return [
        // {
        //     isFirstOrder: true,
        //     title: '概况',
        //     key: 'saGeneral',
        //     url: '/pages/appCenter/sellAssistant/terminalPage/saGeneral/saGeneralPage',
        //     logo: gk_01,
        //     hoverLogo: gk_10,
        //     sideMenu: [],
        // },
        {
            isFirstOrder: true,
            title: '数据管理',
            logo: dat,
            hoverLogo: dat,
            key: 'eshDataManage',
            sideMenu: [
                {
                    title: '数据面板',
                    key: 'eshDataPanel',
                    url: '/pages/appCenter/electronicSealHelper/eshDataPanel/eshDataPanelPage',
                },
                {
                    title: '平台数据',
                    key: 'eshPlatformData',
                    url: '/pages/appCenter/electronicSealHelper/eshPlatformData/eshPlatformDataList',
                },
            ]
        },
        {
            isFirstOrder: true,
            title: '客户管理',
            logo: cli,
            hoverLogo: cli,
            key: 'eshClientManage',
            sideMenu: [
                {
                    title: '客户列表',
                    key: 'eshClientManage',
                    url: '/pages/appCenter/electronicSealHelper/eshClientManage/eshClientList',
                },
            ]
        },
    ];
};

export default ESHMenuData;
