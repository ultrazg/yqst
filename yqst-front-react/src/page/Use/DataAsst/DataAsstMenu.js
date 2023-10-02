/*
* 注意事项：
* 0、第一级菜单的 isFirstOrder=true （必须字段）
* 1、key值必须唯一 （必须字段）
* 2、url固定模式：'/pages/appCenter/sellAssistant/saProductHome/{key}/文件名'（必须字段）
* */

import {
    gk_01,
    gk_10,
} from "../../../resource";

const DataAsstMenu = () => {
    return [
        {
            isFirstOrder: true,
            title: "概况",
            key: "situationPage",
            url: "/pages/appCenter/dataAsst/home/situationPage",
            logo: gk_01,
            hoverLogo: gk_10,
            sideMenu: [],
        },
        {
            isFirstOrder: true,
            title: "仪表盘",
            key: "dataAsstDashBoardIndex",
            url: "/pages/appCenter/dataAsst/home/dataAsstDashBoardIndex",
        },
        {
            isFirstOrder: true,
            title: "报表",
            key: "dataAsstReport",
            logo: gk_01,
            hoverLogo: gk_10,
            sideMenu: [
                {
                    title: '生成报表',
                    key: 'dataAsstReportTableCreate',
                    url: "/pages/appCenter/dataAsst/home/dataAsstReportTableCreate"
                },
                {
                    title: '报表生成记录',
                    key: 'dataAsstReportTableIndex',
                    url: "/pages/appCenter/dataAsst/home/dataAsstReportTableIndex"
                },
            ],
        },
        {
            isFirstOrder: true,
            title: "经营数据",
            key: "dataAsstBusinessDataIndex",
            url: "/pages/appCenter/dataAsst/home/dataAsstBusinessDataIndex"
        },
        // {
        //     isFirstOrder: true,
        //     title: "集团数据",
        //     key: "dataAsstGroupDataIndex",
        //     url: "/pages/appCenter/dataAsst/home/dataAsstGroupDataIndex"
        // }
    ];
};

export default DataAsstMenu;
