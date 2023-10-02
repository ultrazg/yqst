import cloneDeep from 'lodash/cloneDeep';
import {parse} from 'qs';

/**
 * @desc 生成 sku 数组函数
 * @param {Array} specificationLabel
 * @param {Array} specificationValue
 * @return {Array}
 * 示例 generateSku(['身高','体重'], ['170cm','180cm'], ['160kg'])
 * 返回 [{'身高': '170cm', '体重': '160kg'}, {'身高': '180cm', '体重': '160kg'}]
 * */
export function generateSku(specificationLabel, specificationValue) {
    const results = []
    let len = specificationValue.length;
    let indexs = {};

    function specialSort(start) {
        start++;
        if (start > len - 1) return;

        if (!indexs[start]) indexs[start] = 0;

        if (!(specificationValue[start] instanceof Array)) {
            specificationValue[start] = [specificationValue[start]];
        }
        for (indexs[start] = 0; indexs[start] < specificationValue[start].length; indexs[start]++) {
            specialSort(start);
            if (start === len - 1) {
                let temp = {};
                for (let i = len - 1, j = 0; i >= 0; i--, j++) {
                    if (!(specificationValue[start - i] instanceof Array)) {
                        specificationValue[start - i] = [specificationValue[start - i]];
                    }
                    temp[specificationLabel[j]] = specificationValue[start - i][indexs[start - i]];
                }
                results.push(temp);
            }
        }
    }

    specialSort(-1);
    return results
}
/*
* 去掉对象里面的空字符串或者 undefined
* */
export function filterObject(value) {
    const newValue = cloneDeep(value);
    for (let i in newValue) {
        if (newValue[i] === '' || newValue[i] === undefined) {
            delete newValue[i];
        }
    }
    return newValue;
}

/*
* 获取路由参数
* 例子 url = 'localhost:3002/index?id=111&userId=222'
* 结果 {id:111,userId:222}
* */
export function getPageQuery() {
    return parse(window.location.href.split('?')[1]);
}


export const formRegExp = {
    required: function (message) {
        return {
            required: true,
            message: message || '该字段为必填项'
        }
    },
    string: function (message) {
        return {
            type: 'string',
            message: message || '必须为字符串'
        }
    },
    number: function (message) {
        return {
            pattern: /^[0-9]*$/,
            message: message || '必须为数值类型',
        }
    },
    url: function (message) {
        return {
            type: 'url',
            message: message || '请输入http:// 或者 https:// 开头的网址'
        }
    },
    phone: function (message) {
        return {
            pattern: /^1[3456789]\d{9}$/,
            message: message || '请输入正确手机号!'
        }
    },
    email: function (message) {
        return {
            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: message || '请输入正确邮箱格式!'
        }
    },
    range: function (min, max, message) {
        return {
            min, max,
            message: message || `字段最小长度为${min}位,最大长度为${max}位`
        }
    },
    min: function (length, message) {
        return {
            min: length,
            message: message || `最小长度为${length}位`
        }
    },
    max: function (length, message) {
        return {
            max: length,
            message: message || `最大长度为${length}位`
        }
    },
    len: function (length, message) {
        return {
            len: length,
            message: message || `长度必须为${length}位`
        }
    },
    length18CarNumber: function (message) {
        return {
            pattern: /^[1-9]\d{5}(?:18|19|20)\d{2}(?:(?:0[1-9])|(?:1[0-2]))(?:(?:[0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
            message: message || '请输入正确身份证号码!'
        }
    }
}
/*
* 合并 loading
* */
export function mergeLoading(array) {
    return !array.every(n => n === false)
}
