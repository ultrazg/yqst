/**
 * Created by ljy on 2017/11/13
 */
import LoginActionType from './LoginActionType';

export default function LoginAction(type, data) {
    return (dispatch) => {
        dispatch(performAction(type, data));
    }
}

function performAction(type, data) {
    switch (type) {
        case LoginActionType.CHANGE_LOGINMODE_ACTION:
        case LoginActionType.CHANGE_CODE_TEXT_ACTION:
        case LoginActionType.SETCODESN_ACTION:
        case LoginActionType.RESET_ACTION:
            return {
                type: type,
                data: data
            };
        default:
            return {
                type: ''
            };
    }
}