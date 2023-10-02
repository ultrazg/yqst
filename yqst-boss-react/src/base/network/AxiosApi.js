/**
 * Created by ljy on 2018/8/1
 */
import axios from 'axios';

let AxiosApi = {
    createGet: () => {
        // 使用由库提供的配置的默认值来创建实例
        // 此时超时配置的默认值是 `0`
        let instance = axios.create();
        // 覆写库的超时默认值
        // 现在，在超时前，所有请求都会等待 30 秒
        instance.defaults.timeout = 30 * 1000;
        instance.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
        instance.defaults.headers.get['Accept'] = '*/*';
        instance.defaults.method = 'get';
        return instance;
    },
    createPost: () => {
        // 使用由库提供的配置的默认值来创建实例
        // 此时超时配置的默认值是 `0`
        let instance = axios.create();
        // 覆写库的超时默认值
        // 现在，在超时前，所有请求都会等待 30 秒
        instance.defaults.timeout = 30 * 1000;
        // instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
        instance.defaults.headers.post['Accept'] = '*/*';
        instance.defaults.method = 'post';
        return instance;
    },
    createPut: () => {
        // 使用由库提供的配置的默认值来创建实例
        // 此时超时配置的默认值是 `0`
        let instance = axios.create();
        // 覆写库的超时默认值
        // 现在，在超时前，所有请求都会等待 30 秒
        instance.defaults.timeout = 30 * 1000;
        instance.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
        instance.defaults.headers.put['Accept'] = '*/*';
        instance.defaults.method = 'put';
        return instance;
    },
    createDel: () => {
        // 使用由库提供的配置的默认值来创建实例
        // 此时超时配置的默认值是 `0`
        let instance = axios.create();
        // 覆写库的超时默认值
        // 现在，在超时前，所有请求都会等待 30 秒
        instance.defaults.timeout = 30 * 1000;
        instance.defaults.headers.delete['Content-Type'] = 'application/x-www-form-urlencoded';
        instance.defaults.headers.delete['Accept'] = '*/*';
        instance.defaults.method = 'delete';
        return instance;
    },
}
export default AxiosApi;
