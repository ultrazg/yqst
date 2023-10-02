/**
 * Created by ljy on 2018/5/23
 */
import * as Actions from './PermissionsType';

const initialState = {
    isNetworkSync: false,
    isAdmin: 0,
    permissionsList: [],
}

export default function PermissionsReducer(state = initialState, action) {
    switch (action.type) {
        case Actions.SET_PERMISSIONS:
            return {
                ...state,
                ...action.data
            };
        case Actions.CLEAR_PERMISSIONS:
            return {...initialState};
        default:
            return state;
    }
}