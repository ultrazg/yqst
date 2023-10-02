/**
 * Created by leung on 2016/11/3.
 */

/**
 * 公共网络响应处理
 */
import ApiInterface from '../urls/ApiInterface';
import BaseError from './BaseError';
import {message, Modal} from 'antd';

const BaseCallback = {
    callback(response, url) {
        //登陆过期
        if (response.ret == '20002') {
            // AsyncStorage.clear();
            // BaseBack.ReturnToInitPage();
            // GOBAL_CURRENT_NAVS().resetTo({id: RuturnPageByLaunchMode()});
            localStorage.clear();
            setTimeout(() => {
                window.location.hash = '/users/login/index';
            }, 0.1 * 1000);
        } else if (response.ret == '20003') {
            Modal.info({
                title: response.msg,
                onOk: () => {
                    window.location.href = '/#/Pages/ApplicationList';
                },
                okText: '确定'
            });
            return null;
        }
        if ((response.ret + '') != '0') {
            if (url && (!url.endsWith(ApiInterface.getLoginQrCode)
                && !(url.endsWith(ApiInterface.LoginWithQrCode))
                && !(url.endsWith(ApiInterface.qrcodeLogin))
            )) {
                BaseError.errorByResponse(response);
            }
            return null;
        }
        return response;
    }
};
export default BaseCallback;
