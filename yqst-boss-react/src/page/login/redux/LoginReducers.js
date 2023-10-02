/**
 * Created by ljy on 2017/3/27.
 */
import LoginActionType from './LoginActionType';

const initialState = {
    loginMode: 'loginwithpwd',
    getCode: '获取验证码',
    codeSn: ''
};

export default function LoginReducers(state = initialState, action) {
    switch (action.type) {
        case LoginActionType.CHANGE_LOGINMODE_ACTION:
            return {
                ...state,
                loginMode: action.data,
            };
        case LoginActionType.CHANGE_CODE_TEXT_ACTION:
            return {
                ...state,
                getCode: action.data,
            };
        case LoginActionType.SETCODESN_ACTION:
            return {
                ...state,
                codeSn: action.data,
            };
        case LoginActionType.RESET_ACTION:
            console.log(initialState, "initialState");
            return initialState;
        default:
            return state;
    }
}