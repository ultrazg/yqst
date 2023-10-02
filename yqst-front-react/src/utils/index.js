import {parse} from 'qs';
import moment from 'moment';
import find from 'lodash/find';
import isArray from 'lodash/isArray';
import includes from 'lodash/includes';
import React from 'react';


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

export function getQueryVariable(name, url) {
    let href = url || window.location.href
    let query = href.substring(href.indexOf('?') + 1);
    let vars = query.split("&");
    let obj = {}
    if (query.indexOf('=') > -1) {
        for (let i = 0; i < vars.length; i++) {
            let pair = vars[i].split("=");
            obj[pair[0]] = pair[1]
        }
    }
    if (name) return obj[name] || null
    return obj;
}

export const handleTreeToList = data => {
    const dataList = [];
    const recursive = (data) => {
        for (let i = 0; i < data.length; i++) {
            const node = data[i];
            if (node.children) {
                recursive(node.children);
            }

            dataList.push(node);
            delete node.children;
        }
    }
    recursive(data)
    return dataList
};

/*
* 替换11 位手机中间 4 位为星号
* 示例 phoneNumberStar(13160807750)
* 返回 131****7750
* */
export function phoneNumberStar(str) {
    if (str === undefined) return '';
    return str.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
}

/*
* 获取路由参数
* 示例 url = 'localhost:3002/index?id=111&userId=222'
* 返回 {id:111,userId:222}
* */
export function getPageQuery() {
    return parse(window.location.href.split('?')[1]);
}

/*
* formatDate 格式化时间
* 示例 formatDate(时间戳)(1566441233000)
* 返回 不传第二个参数 '1995-07-22 00:00:00'
* 示例 formatDate(时间戳,'YYYY-MM-DD')
* 返回 '1995-07-22'
* */
export function formatDate(date, format = 'YYYY-MM-DD HH:mm:ss') {
    if (date === undefined) return '';
    return moment(date).format(format);
}


/*
* 格式化金钱
* 示例 thousandBit(100)
* 返回 100.00
* 示例 thousandBit(100,true)
* 返回 ¥100.00
* */
export function thousandBit(number, needPrefix = false, precision = 2, prefix = '￥') {
    //判断并去除-、+符号
    let isZF = '';
    if (String(number).indexOf('-') > -1 || String(number).indexOf('+') > -1) {
        isZF = String(number)[0] || '';
        number = Number(String(number).replace(/-|\+/g, ''));
    }
    let displayPrefix = needPrefix ? prefix : '';
    number = String(number).replace(/(^\s*)|(\s*$)/g, '');
    if (isNaN(number) || !number) {
        return displayPrefix + parseFloat(0).toFixed(precision);
    } else {
        number = parseFloat(number).toFixed(precision);
    }
    number = number + '';
    if (number) {
        let nums = number.split('.');
        let num = nums[0].slice(nums[0].length % 3);
        let numBegin = nums[0].slice(0, nums[0].length % 3);
        number = numBegin + ((numBegin && num) ? ',' : '') + (num ? num.match(/\d{3}/g).join(',') : '') + (nums[1] ? '.' + nums[1] : '');
    }
    return isZF + displayPrefix + number;
}


/*
* why: 因为有些模块的列表和详情都是使用同一个 stateMap,这样可以方便后面 stateMap 发生变动,可以快速更改
* 不建议使用下标去获取 state 了,因为遇见 state 下个版本突然从 1 改成 2001 这种情况,改起来很痛苦
* getColumnsState 获取对应的状态
* columnsMap 常用模块的 stateMap
* 使用实例 getColumnsState(columnsMap.test, 1)
* 返回 {name: "启用", state: 1, color: "green"}
* */
export function getColumnsState(arr, state, field = 'state') {
    return find(arr, (n) => {
        if (isArray(n[field]) === true) {
            if (includes(n[field], state) === true) {
                return n;
            }
        } else {
            return n[field] + '' === state + '';
        }
    }) || {};
}

/**
 * @desc 判断所有数组是否都为空数组
 * @param {Object} object
 * @return {Boolean} (true 未全空,false 为里面至少有一个不为空)
 * 使用 obj = {arr1:[],arr2:[]}
 * isAllArrayEmpty(obj)
 */
export function isAllArrayEmpty(object) {
    let isEmpty = true;
    for (let i in object) {
        if (object[i].length && object[i] !== 0) {
            isEmpty = false;
        }
    }
    return isEmpty;
}

/**
 * 比较新旧值,如果值一样显示旧值,不一样旧值显示在后面
 */
export function getComparisons(oldValue, newValue, company) {
    if (company === undefined) company = '';
    if (oldValue === undefined) oldValue = '';
    if (newValue === undefined) newValue = '';
    if (newValue == oldValue) return oldValue + company;
    if (newValue && newValue !== '') {
        return (
            <div>
                {newValue + company}<span
                style={{color: 'rgba(0,0,0,0.45)', textDecoration: 'line-through'}}>({oldValue + company})</span>
            </div>
        );
    } else {
        return oldValue;
    }
};

/**
 * 通过 visible 判断是否需要渲染组件
 */
export function visibleRenderComponent(visible, component) {
    if (visible === true) {
        return component;
    } else {
        return null;
    }
}

/**
 * 通过 boolean 值判断渲染哪个组件
 */
export function selectRenderingComponent(boolean, trueComponent, falseComponent) {
    if (boolean) {
        return trueComponent;
    } else {
        return falseComponent;
    }
}

/**
 * 通过 boolean 值判断渲染哪个组件
 */
export function deleteObjectUndefined(object) {
    for (let i in object) {
        if (object[i] === undefined) delete object[i]
    }
    return object
}

/*
* 表单校验正则
* */

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
* url 文件地址
* filename 文件名,不传默认截取 url 最后的地址(一般地址最后一截都是文件名,如果后端改了名,那需要自己传入 filename)
* */
export function downloadFile(url, filename) {
    if (!url) {
        throw Error('文件下载函数未传入 url')
    }
    let newFilename = []
    if (!filename) {
        newFilename = url.split('/')
        newFilename = newFilename[newFilename.length - 1]
    }
    download(1, url, newFilename)
}

/**
 * 下载文件
 *
 * @export
 * @param {*} type 设置接收数据类型 参数 1 或 2
 * @param {*} data type为 1 时 data 为文件地址； type为 2 时 data 为canvas对象
 * @param {*} name 当文件为图片类型时需设置文件名
 */
export function download(type, data, name) {
    if (type == 1) {
        var url = data;
        // 通过地址判断是否为图片类型文件
        var ext = url.slice(url.lastIndexOf('.') + 1).toLowerCase();
        if (isImage(ext)) {
            convertUrlToBase64(url).then(function (base64) {
                var blob = convertBase64UrlToBlob(base64);
                // 下载
                if (myBrowser() == 'IE') {
                    window.navigator.msSaveBlob(blob, name + '.jpg');
                } else {
                    var a = document.createElement('a');
                    a.download = name;
                    a.href = URL.createObjectURL(blob);
                    a.style.display = 'none'
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                }
            });
        } else {
            var a = document.createElement('a');
            a.download = name;
            a.href = url;
            a.style.display = 'none'
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    } else {
        var dataURL = data.toDataURL('image/jpeg', 1.0);
        var base64 = {
            dataURL: dataURL,
            type: 'image/jpg',
            ext: 'jpg'
        };
        var blob = convertBase64UrlToBlob(base64);
        // 下载
        if (myBrowser() == 'IE') {
            window.navigator.msSaveBlob(blob, name + '.jpg');
        } else {
            var _a = document.createElement('a');
            _a.download = name;
            _a.href = URL.createObjectURL(blob);
            _a.style.display = 'none'
            document.body.appendChild(_a);
            _a.click();
            document.body.removeChild(_a);
        }
    }
}

// 将 base64 转换位 blob 对象, blob 存储 2进制对象的容器
function convertBase64UrlToBlob(base64) {
    var parts = base64.dataURL.split(';base64,');
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;
    var uInt8Array = new Uint8Array(rawLength);
    for (var i = 0; i < rawLength; i++) {
        uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], {type: contentType});
}

// 将图片地址转换为 base64 格式
function convertUrlToBase64(url) {
    return new Promise(function (resolve, reject) {
        var img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = url;
        img.onload = function () {
            var canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, img.width, img.height);
            var ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase();
            var dataURL = canvas.toDataURL('image/' + ext);
            var base64 = {
                dataURL: dataURL,
                type: 'image/' + ext,
                ext: ext
            };
            resolve(base64);
        };
    });
}

// 判断浏览器类型
function myBrowser() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    if (userAgent.indexOf("OPR") > -1) {
        return "Opera";
    }
    ; //判断是否Opera浏览器 OPR/43.0.2442.991
    if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    } //判断是否Firefox浏览器  Firefox/51.0
    if (userAgent.indexOf("Trident") > -1) {
        return "IE";
    } //判断是否IE浏览器  Trident/7.0; rv:11.0
    if (userAgent.indexOf("Edge") > -1) {
        return "Edge";
    } //判断是否Edge浏览器  Edge/14.14393
    if (userAgent.indexOf("Chrome") > -1) {
        return "Chrome";
    } // Chrome/56.0.2924.87
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } //判断是否Safari浏览器 AppleWebKit/534.57.2 Version/5.1.7 Safari/534.57.2
}

// 判断文件是否为图片类型
function isImage(ext) {
    if (ext == 'png' || ext == 'jpg' || ext == 'jpeg' || ext == 'gif' || ext == 'bmp') {
        return true;
    }
}

// 表单去除 undefined 值
export function formDeleteEmpty(formValues) {
    for (let i in formValues) {
        console.log(formValues[i], i)
        if (formValues[i] === undefined) formValues[i] = ''
    }
    return formValues
}

/*
* 合并 loading
* */
export function mergeLoading(array) {
    return !array.every(n => n === false)
}
