import ApiConst from "../../../base/urls/ApiConst";
import PublicData from "../../../base/publicData/PublicData";

/**
 * Created by ljy on 2018/9/11
 */
//配置菜单
global.globalMenuData = (() => {
    let developeType = ApiConst.getVersions();
    switch (developeType) {
        case ApiConst.Ver.DEVELOP:
        case ApiConst.Ver.TEST:
            return {
                SystemSetupMenu: require('./YqstSystemSetupMenuData').default,
                MainMenu: require('./YqstIndexMenuData').default
            }
        case ApiConst.Ver.PRODUCT:
            return {
                SystemSetupMenu: require('./YqstSystemSetupMenuData').default,
                MainMenu: require('./YqstIndexMenuData').default
            }
        case ApiConst.Ver.ZJ_PRE_PRODUCT:
            return {
                SystemSetupMenu: require('./YqstSystemSetupMenuData').default,
                MainMenu: require('./YqstIndexMenuData').default
            }
        case ApiConst.Ver.ZJ_PRODUCT:
            return {
                SystemSetupMenu: require('./YqstSystemSetupMenuData').default,
                MainMenu: require('./YqstIndexMenuData').default
            }
        default:
            return {};
    }
})();
let IndexMenuData = {
    //默认选择菜单
    selectMenu: (indexMenu) => {
        let defaultArr = [];
        // let indexMenu = IndexMenuData.indexMenu;
        for (let i = 0; i < indexMenu.length; i++) {
            if (indexMenu[i].sideMenu && indexMenu[i].sideMenu[0]) {
                if (indexMenu[i].sideMenu[0].subMenuList) {
                    //默认
                    defaultArr.push(indexMenu[i].sideMenu[0].subMenuList[0]
                    && indexMenu[i].sideMenu[0].subMenuList[0].key ?
                        indexMenu[i].sideMenu[0].subMenuList[0].key : "");
                } else {
                    defaultArr.push("");
                }
            } else {
                defaultArr.push("");
            }
        }
        return defaultArr;
    }
}
export default IndexMenuData;
