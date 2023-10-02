/**
 * Created by liqiang on 2017/11/20.
 */
import IndexActionType from './IndexActionType';
import IndexMenuData from '../model/IndexMenuData';
import PublicData from '../../../base/publicData/PublicData';

const initialState = {
    contentWidth: document.documentElement.clientWidth < 1200 ? 1200 - PublicData.leftMenuWidth
        : document.documentElement.clientWidth - PublicData.leftMenuWidth,
    position: 0,
    openKeys: ['0'],
    // nowChoseMenu: "/Pages/SoftList",
    nowChoseMenu: "/Pages/CloudServeList",
    selectMenu: IndexMenuData.selectMenu([]),
    // selectTitle: '服务',
    indexMenu: [],
}

export default function IndexReducers(state = initialState, action) {
    switch (action.type) {
        case IndexActionType.SET_SCREEN_SIZE:
            return {
                ...state,
                contentWidth: action.data
            };
        case IndexActionType.SELECT_MENU:
            state.selectMenu[action.data.position] = action.data.key;
            return {
                ...state,
                selectMenu: state.selectMenu,
                nowChoseMenu: action.data.key,
            };
        case IndexActionType.SELECT_BIGMENU:
            return {
                ...state,
                position: action.data.position,
                nowChoseMenu: action.data.key,
            };
        case IndexActionType.REPLACE_PAGE:
            return {
                ...state,
                nowChoseMenu: action.id,
            };
        case IndexActionType.UPDATE_SELECT_MENU:
            return {
                ...state,
                selectMenu: IndexMenuData.selectMenu(action.data),
                indexMenu: (action.data),
            };
        case IndexActionType.SET_OPEN_KEY:
            return {
                ...state,
                openKeys: (action.data),
            };
        default:
            return state;
    }
}
