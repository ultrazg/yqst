import BaseError from './BaseError';
import BaseCallback from './BaseCallback';
import md5 from '../../utils/encryption/Md5';
// import Loading from '../../base/loading/Loading';
import {message} from 'antd';
import AxiosApi from './AxiosApi';
import ApiConst from "../urls/ApiConst";
import ApiInterface from "../urls/ApiInterface";
import PublicParams from "../publicparams/PublicParams";

/**
 * 设置超时时间
 * 秒
 */
const TIME_OUT = 30;
const secret = 'kLnANE';
// const odoo_secret = 'dev';
let FetchUtil = {
    /**
     * 转换参数
     */
    toQueryString(obj, isJson = true) {
        if(isJson)
            return obj || {};

        return obj ? Object.keys(obj).sort().map((key) => {
            var val = obj[key];
            if (Array.isArray(val)) {
                return val.sort().map(function (val2) {
                    return key + '=' + val2;
                }).join('&');
            }
            return key + '=' + val;
        }).join('&') : '';
    },
    /**
     * 加密参数
     *
     */
    signParam(param, isJson = true) {
        if(isJson)
            return param;

        var array = new Array(param.length);
        for (var p in param) {
            if (p !== "sign") {
                array.push(p);
            }
        }
        var keys = array.sort();
        //console.log("*********sort",array.sort());
        var signString = secret;
        for (var i = 0; i < keys.length; i++) {
            signString += (keys[i] + param[keys[i]]);
        }
        signString += secret;
        param["sign"] = md5.hex_md5(signString);
        for (var i in param) {
            if (i === "sign") {
                continue;
            }
            param[i] = encodeURIComponent(param[i]);
        }

    },
    /**
     * 主要使用
     * POST
     * 参数 - FormData
     * 返回 - Json
     */
    loadingTitle: "加载中",
    fetchPostJson(url, params, callback, err, axiosParams = {}) {
        let isDealing = false;
        if (FetchUtil.loadingTitle != 'undefined' && window.Loading) {
            window.Loading.show(FetchUtil.loadingTitle);
        }
        AxiosApi.createPost().request(
            url,
            {data: params, ...axiosParams}
        ).then((response) => {
            // console.log(response.status, response.data, "----------------response--" + url);
            FetchUtil.loadingTitle != 'undefined' && window.Loading && window.Loading.hide();
            if (!isDealing) {
                isDealing = true;
                //处理响应
                if (response.data.hasOwnProperty('ret')) {
                    let result = BaseCallback.callback(response.data, url);
                    if (result != null)
                        callback && callback(result);
                    else {
                        err && err(response);
                        // console.log(response.status, response.data, "----------------error response--" + url);
                    }
                } else {
                    err && err(response);
                    // console.log(response.status, response.data, "----------------error response--" + url);
                }
            }
        }).catch((error) => {
            if (!isDealing) {
                isDealing = true;
                FetchUtil.loadingTitle != 'undefined' && window.Loading && window.Loading.hide();
                BaseError.errorByNetwork();
            }
            err && err(error.response);
            // console.log(error.response.status, error.response.data, "----------------error response--" + url);
        });
        FetchUtil.loadingTitle = "加载中";
    },

    /**
     * 上传文件
     */
    uploadFile(data, callback, err) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', ApiConst.Versions().sunaw + ApiInterface.uploadFile, true);
        xhr.addEventListener('load', () => {
            window.Loading.hide();
            if (xhr.response) {
                var res = BaseCallback.callback(JSON.parse(xhr.response), "");
                if (res != null) {
                    callback && callback(JSON.parse(!xhr.response ? '{}' : xhr.response));
                }
            } else {
                callback && callback(JSON.parse(!xhr.response ? '{}' : xhr.response));
            }
        });
        xhr.addEventListener('error', () => {
            message.info("上传错误", 2);
            window.Loading.hide();
            err && err();
        });
        const datas = new FormData();
        for (let key in data) {
            datas.append(key, data[key]);
        }
        datas.append("sessionKey", PublicParams().sessionKey);
        xhr.send(datas);
        window.Loading.show("上传中");
    },
    uploadFileCustomUrl(data, url, callback, err) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.addEventListener('load', () => {
            window.Loading.hide();
            if (xhr.response) {
                var res = BaseCallback.callback(JSON.parse(xhr.response), "");
                if (res != null) {
                    callback && callback(JSON.parse(!xhr.response ? '{}' : xhr.response));
                }
            } else {
                callback && callback(JSON.parse(!xhr.response ? '{}' : xhr.response));
            }
        });
        xhr.addEventListener('error', () => {
            message.info("上传错误", 2);
            window.Loading.hide();
            err && err();
        });
        const datas = new FormData();
        for (let key in data) {
            datas.append(key, data[key]);
        }
        datas.append("sessionKey", PublicParams().sessionKey);
        xhr.send(datas);
        window.Loading.show("上传中");
    }
};
export default FetchUtil;
