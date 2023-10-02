import 'isomorphic-fetch';
import BaseError from './BaseError';
import BaseCallback from './BaseCallback';
import md5 from '../../utils/encryption/Md5';
import ApiConst from '../urls/ApiConst';
import ApiInterface from '../urls/ApiInterface';
// import Loading from '../../base/loading/Loading';
import {message} from 'antd';
import PublicParams from '../publicparams/PublicParams';
import AxiosApi from './AxiosApi';


/**
 * 设置超时时间
 * 秒
 */
const TIME_OUT = 30;
const secret = 'kLnANE';
let FetchUtil = {
    /**
     * 转换参数
     */
    toQueryString(obj, tag = true) {
        // return obj ? Object.keys(obj).sort().map((key) => {
        // 	var val = obj[key];
        // 	if (Array.isArray(val)) {
        // 		return val.sort().map(function (val2) {
        // 			return key + '=' + val2;
        // 		}).join('&');
        // 	}
        // 	return key + '=' + val;
        // }).join('&') : '';
        return obj || {};
    },
    /**
     * 加密参数
     *
     */
    signParam(param) {
        // var array = new Array(param.length);
        // for (var p in param) {
        // 	if (p !== 'sign') {
        // 		array.push(p);
        // 	}
        // }
        // var keys = array.sort();
        // //console.log("*********sort",array.sort());
        // var signString = secret;
        // for (var i = 0; i < keys.length; i++) {
        // 	signString += (keys[i] + param[keys[i]]);
        // }
        // signString += secret;
        // param['sign'] = md5.hex_md5(signString);
        // for (var i in param) {
        // 	if (i === 'sign') {
        // 		continue;
        // 	}
        // 	param[i] = encodeURIComponent(param[i]);
        // }
        return param;
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
    /*
    * 图片下载
    * */
    downloadImage(url, params, callback, err, axiosParams = {}) {
        let isDealing = false;
        if (FetchUtil.loadingTitle != 'undefined' && window.Loading) {
            window.Loading.show(FetchUtil.loadingTitle);
        }
        AxiosApi.createPost().request(
            url,
            {data: params, responseType: 'blob', ...axiosParams}
        ).then((response) => {
            FetchUtil.loadingTitle != 'undefined' && window.Loading && window.Loading.hide();
            if (!isDealing) {
                isDealing = true;
                //处理响应
                const url = window.URL.createObjectURL(response.data);
                const a = document.createElement('a');
                a.href = url;
                const fileName = params.name
                a.download = decodeURIComponent(fileName);
                a.click();
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
     * 旧-上传文件
     */
    uploadImage(params, callback, err) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://163.177.128.179:39241/upload', true);
        const data = new FormData();
        for (let key in params) {
            data.append(key, params[key]);
        }
        xhr.addEventListener('load', () => {
            // console.log(xhr.responseText, 'xhr');
            var header = '<h1>MD5: ';
            let start = xhr.responseText.indexOf(header);
            callback('http://163.177.128.179:39241/' + xhr.responseText.substring(start + header.length, start + 32 + header.length));
        });
        xhr.addEventListener('error', () => {
            err && err();
        });
        xhr.send(data);

    },

    /**
     * 上传文件
     */
    uploadFile(data, callback, err, progress) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', ApiConst.Versions().sunaw + ApiInterface.uploadFile, true);
        xhr.addEventListener('load', () => {
            window.Loading.hide();
            if (xhr.response) {
                var res = BaseCallback.callback(JSON.parse(xhr.response), '');
                if (res != null) {
                    callback && callback(JSON.parse(!xhr.response ? '{}' : xhr.response));
                }
            } else {
                callback && callback(JSON.parse(!xhr.response ? '{}' : xhr.response));
            }
        });
        xhr.addEventListener('error', () => {
            message.info('上传错误', 2);
            window.Loading.hide();
            err && err();
        });
        xhr.upload.addEventListener('progress', function (e) {
            if (e.lengthComputable) {
                progress && progress(e);
            }

            //loaded代表上传了多少
            //total代表总数为多少
            // let progressRate = (e.loaded / e.total) * 100 + '%';

            //通过设置进度条的宽度达到效果
            // $('.progress > div').css('width', progressRate);
        }, false);
        const datas = new FormData();
        for (let key in data) {
            datas.append(key, data[key]);
        }
        datas.append('sessionKey', PublicParams().sessionKey);
        xhr.send(datas);
        window.Loading.show('上传中');
    }
};

export default FetchUtil;
