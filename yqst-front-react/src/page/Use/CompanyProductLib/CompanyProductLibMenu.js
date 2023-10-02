/*
* 注意事项：
* 0、第一级菜单的 isFirstOrder=true （必须字段）
* 1、key值必须唯一 （必须字段）
* 2、url固定模式：'/pages/appCenter/sellAssistant/saProductHome/{key}/文件名'（必须字段）
* */

import {
    sp_01, sp_10,
    firm_relevance_selectde,
    firm_relevance_default,
    firm_list_selected,
    firm_list_default,
    firm_classify_selectde,
    firm_classify_default,
    firm_apply_selectde,
    firm_apply_default,
} from '../../../resource';

const CompanyProductLibMenu = () => {
    return [
        {
            isFirstOrder: true,
            title: '企业产品管理',
            logo: sp_01,
            hoverLogo: sp_10,
            key: 'companyProductManage',
            sideMenu: [
                {
                    title: '企业产品列表',
                    // logo: firm_list_default,
                    // hoverLogo: firm_list_selected,
                    key: 'companyProduct',
                    url: '/pages/appCenter/companyProductLib/companyProductLibHome/companyProduct/companyProductList',
                },
                {
                    title: '企业产品类目列表',
                    // logo: firm_classify_default,
                    // hoverLogo: firm_classify_selectde,
                    key: 'companyClass',
                    url: '/pages/appCenter/companyProductLib/companyProductLibHome/companyClass/companyClassList',
                },
                {
                    title: '申请列表',
                    // logo: firm_apply_default,
                    // hoverLogo: firm_apply_selectde,
                    key: 'applyFor',
                    url: '/pages/appCenter/companyProductLib/companyProductLibHome/applyFor/applyForList',
                },
                {
                    title: '关联平台产品',
                    // logo: firm_relevance_default,
                    // hoverLogo: firm_relevance_selectde,
                    key: 'correlation',
                    url: '/pages/appCenter/companyProductLib/companyProductLibHome/correlation/correlationList',
                },
            ]
        },
    ];
};

export default CompanyProductLibMenu;
