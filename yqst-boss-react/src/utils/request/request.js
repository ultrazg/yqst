/*
 * @Description  : 网络请求方法
 * @version      : 0.1
 * @Author       : Chenglin Huang
 * @Date         : 2021-03-31 09:54:31
 * @LastEditTime : 2021-05-19 16:32:00
 */
import PublicParams from "../../base/publicparams/PublicParams";
import FetchUtil from "../../base/network/FetchUtil";
import ApiConst from "../../base/urls/ApiConst";
import axios from "axios";

export default function request(url, pa, response, error, isLoadingOpen = true) {

    let cancel = null; // 取消请求方法

    let params = {
        ...PublicParams(),
        ...pa
    };
    if (!isLoadingOpen) {
        FetchUtil.loadingTitle = "undefined";
    }
    FetchUtil.fetchPostJson(
        ApiConst.Versions().sunaw + url.trim(),
        params,
        (res) => {
            response && response(res);
            cancel = null; // 请求完成后赋空值，避免内存泄漏
        },
        (err) => {
            error && error(err);
            cancel = null; // 请求失败后赋空值，避免内存泄漏
        },
        {
            headers: {"Content-Type": "application/json;charset=UTF-8"},
            cancelToken: new axios.CancelToken(function (c) {
                cancel = c;
            })
        }
    );

    return cancel; // 返回网络请求取消方法
}
