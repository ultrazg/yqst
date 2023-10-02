/**
 * Created by ljy on 2017/3/27.
 *
 * redux -- reducer索引
 */
import {combineReducers} from 'redux';
import LoginReducers from '../page/login/redux/LoginReducers';
import IndexReducers from '../page/index/redux/IndexReducers';
import AppUpdateManageReducer from '../page/appUpdateManage/redux/AppUpdateManageReducer';

const ReducerIndex = combineReducers({
    LoginReducers: LoginReducers,
    IndexReducers: IndexReducers,
    AppUpdateManageReducer: AppUpdateManageReducer,
});

export default ReducerIndex;