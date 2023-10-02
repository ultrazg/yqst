/**
 * Created by liqiang on 2017/9/15.
 * 获取URL GET参数
 */

let GetUrlParameter = {
    /**
     * 获取url地址
     * @param name
     */

    getQueryString(name) {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        let r = window.location.search.substr(1).match(reg);
        // if (r !== null) return unescape(r[2]);
        if (r !== null) return r[2];
        return null;
    },

    /**
     * 获取url地址--NEW ,如果该方法获取不到会重新用上面的方法获取
     * @param _that
     * @param name
     * @returns {*}
     */

    localQuery(_that, name) {
        let value = '';
        if (!this.isEmpty(_that) && !this.isEmpty(_that.props) && !this.isEmpty(_that.props.location) && !this.isEmpty(_that.props.location.query)) {
            value = _that.props.location.query[name];
        }
        if (this.isEmpty(value)) {
            value = this.getQueryString(name);
        }
        return value;
    },

    /**
     * 判断是不是空的或者undefined
     * @param obj
     * @returns {boolean}
     */

    isNull(obj) {
        return obj === null || typeof obj === 'undefined' || obj === undefined;
    },

    /**
     * 判断是不是空的字符串
     * @param obj
     * @returns {boolean}
     */

    isEmpty(obj) {
        return this.isNull(obj) || obj === '';
    },
    getUrlParams(url) {
        if (url) {
            let arr = url.split("?");
            if (arr.length == 2) {
                let params = arr[1].split("&");
                let res = {};
                for (let i = 0; i < params.length; i++) {
                    let resArr = params[i].split("=");
                    if (resArr.length == 2) {
                        res[resArr[0]] = resArr[1]
                    }
                }
                return res
            }
        }
        return {}
    }
}

export default GetUrlParameter;