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

const carrierAsstMenu = () => {
    return [
        {
            isFirstOrder: true,
            title: "概况",
            key: "contractAsstSituationPage",
            url: "/pages/appCenter/contractAsst/contractAsstHome/contractAsstSituationPage",
            logo: gk_01,
            hoverLogo: gk_10,
            sideMenu: [],
        },
        {
            isFirstOrder: true,
            title: "租赁合同信息维护",
            logo: gk_01,
            hoverLogo: gk_10,
            key: "contractInfoMaintain",
            url: "/pages/appCenter/contractAsst/contractAsstHome/contractInfoMaintain/list"
        },
        {
            isFirstOrder: true,
            title: "维保合同信息维护",
            logo: gk_01,
            hoverLogo: gk_10,
            key: "maintainContractInfo",
            url: "/pages/appCenter/contractAsst/contractAsstHome/maintainContractInfo/list"
        },
        {
            isFirstOrder: true,
            title: '线下合同',
            logo: gk_01,
            hoverLogo: gk_10,
            key: 'contractAsstHome',
            sideMenu: [
                {
                    title: '创建合同',
                    key: 'contractCreateIndex',
                    url: "/pages/appCenter/contractAsst/contractAsstHome/contractCreateIndex"
                },
                {
                    title: '合同存档',
                    key: "contractArchiveIndex",
                    url: "/pages/appCenter/contractAsst/contractAsstHome/contractArchiveIndex",
                }
            ]
        },
        // {
        //     isFirstOrder: true,
        //     title: "创建合同",
        //     key: "contractCreateIndex",
        //     url: "/pages/appCenter/contractAsst/contractAsstHome/contractCreateIndex"
        // },
        // {
        //     isFirstOrder: true,
        //     title: "合同管理",
        //     key: "contractManageIndex",
        //     url: "/pages/appCenter/contractAsst/contractAsstHome/contractManageIndex",
        // },
        // {
        //     isFirstOrder: true,
        //     title: "合同存档",
        //     key: "contractArchiveIndex",
        //     url: "/pages/appCenter/contractAsst/contractAsstHome/contractArchiveIndex",
        // }
    ];
};

export default carrierAsstMenu;
