/**
 * Created by ljy on 2017/12/25
 */
import AppUpdateManageAction from './AppUpdateManageAction';
import AppUpdateManageType from './AppUpdateManageType';

const initialState = {
    listData: []
};

export default function AppUpdateManageReducer(state = initialState, action) {
    switch (action.type) {
        case AppUpdateManageType.INIT_DATA:
            return {
                ...state,
                listData: []
            }
        case AppUpdateManageType.SET_APP_DATA:
            return {
                ...state,
                listData: action.data
            }
        default:
            return state;
    }
}