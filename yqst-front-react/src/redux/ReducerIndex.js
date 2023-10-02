/**
 * Created by ljy on 2017/3/27.
 *
 * redux -- reducer索引
 */
import {combineReducers} from 'redux';
import GlobalReducers from '../page/redux/GlobalReducers';
import mainLayoutReducers from '../page/layout/redux/mainLayoutReducers';
import PermissionsReducer from '../baseview/permission/redux/PermissionsReducer';
import BTBEnterpriseWalletReducers from '../page/Use/BTBEnterpriseWallet/Redux/BTBEnterpriseWalletReducers';


const ReducerIndex = combineReducers({
    GlobalReducers: GlobalReducers,
    mainLayoutReducers: mainLayoutReducers,
    PermissionsReducer: PermissionsReducer,
    BTBEnterpriseWalletReducers: BTBEnterpriseWalletReducers,
});

export default ReducerIndex;
