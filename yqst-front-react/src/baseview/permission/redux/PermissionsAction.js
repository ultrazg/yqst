/**
 * Created by ljy on 2018/5/23
 */
import * as types from './PermissionsType';

export function setPermissionsData(data) {
    return {type: types.SET_PERMISSIONS, data: data}
}

export function clearPermissionsData(data) {
    return {type: types.CLEAR_PERMISSIONS, data: data}
}