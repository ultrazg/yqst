/**
 * Created by liqiang on 2017/11/20.
 */

import IndexActionType from './IndexActionType';

export function setScrernSize(data) {
    return {type: IndexActionType.SET_SCREEN_SIZE, data: data}
}

export function selectMenu(data) {
    return {type: IndexActionType.SELECT_MENU, data: data}
}

export function selectBigMenu(data) {
    return {type: IndexActionType.SELECT_BIGMENU, data: data}
}

export function replacePage(id) {
    return {type: IndexActionType.REPLACE_PAGE, id: id}
}

export function updateSelectMenuData(data) {
    return {type: IndexActionType.UPDATE_SELECT_MENU, data: data}
}

export function setOpenKey(data) {
    return {type: IndexActionType.SET_OPEN_KEY, data: data}
}
