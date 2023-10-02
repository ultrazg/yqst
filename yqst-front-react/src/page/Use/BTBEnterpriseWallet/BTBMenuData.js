import {cli, dat} from '../../../resource';

const BTBMenuData = () => {
    return [
        {
            isFirstOrder: true,
            title: '账户管理',
            logo: dat,
            hoverLogo: dat,
            key: 'btbAccountManage',
            sideMenu: [
                {
                    title: '账户概览',
                    key: 'btbAccountView',
                    url: '/pages/appCenter/btbEnterpriseWallet/btbAccountView/btbAccountViewPage',
                },
            ]
        },
        {
            isFirstOrder: true,
            title: '交易管理',
            logo: cli,
            hoverLogo: cli,
            key: 'btbTransactionManage',
            sideMenu: [
                {
                    title: '交易订单',
                    key: 'btbTransactionOrder',
                    url: '/pages/appCenter/btbEnterpriseWallet/btbTransactionOrder/btbTransactionOrderList',
                },
            ]
        },
        {
            isFirstOrder: true,
            title: '通道费用',
            logo: cli,
            hoverLogo: cli,
            key: 'btbChannelCost',
            sideMenu: [
                {
                    title: '费用明细',
                    key: 'btbCostBreakdown',
                    url: '/pages/appCenter/btbEnterpriseWallet/btbCostBreakdown/btbCostBreakdownList',
                },
            ]
        },
    ];
};

export default BTBMenuData;
