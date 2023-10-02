/**
 * Created by leung on 2016/11/3.
 */

/**
 * 公共网络响应处理
 */
import {message} from 'antd';
import ApiInterface from '../urls/ApiInterface';
import BaseError from './BaseError';

const BaseCallback = {
    callback(response, url) {
        //登录过期
        if (response.ret == "20002") {
            // AsyncStorage.clear();
            // BaseBack.ReturnToInitPage();
            // GOBAL_CURRENT_NAVS().resetTo({id: RuturnPageByLaunchMode()});
            localStorage.clear();
            setTimeout(() => {
                window.location.hash = '/Overdue';
            }, 0.05 * 1000)
        }

        if (response.ret === 207014 || response.ret === 207015 || response.ret === 207016 || response.ret === 207017 || response.ret === 207021) {
            /*
            *  这个 ret 207014 和 207015 和 207016 和 207017 和 207021
            *  是账务中心 - 新建或者修改记账规则管理 - 当模板,节点,科目被删除时通过返回码来处理新建规则逻辑
            * */
            message.error(response.msg);
            return response
        }
        if ((response.ret + "") !== '0') {
            // if (url && (!url.endsWith(ApiInterface.getLoginQrCode)
            //         && !(url.endsWith(ApiInterface.LoginWithQrCode))
            //         && !(url.endsWith(ApiInterface.qrcodeLogin))
            //     )) {
            BaseError.errorByResponse(response);
            // }
            return null;
        }
        return response;
    }
};
export default BaseCallback;
