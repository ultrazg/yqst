/**
 * Created by ljy on 2017/12/25
 */
import AppUpdateManageType from './AppUpdateManageType';

export function initAppData(data) {
    return {type: AppUpdateManageType.INIT_DATA}
}

export function setAppData(data) {
    return {type: AppUpdateManageType.SET_APP_DATA, data: data}
}