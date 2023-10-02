/**
 * Created by liqiang on 2017/7/10.
 * 检查输入内容是否正确
 */
import {message} from 'antd';
import emojiRegex from 'emoji-regex';

let CheckInput = {
    /**
     * 检查手机号
     * @param str 手机号
     * @returns {boolean}
     */
    checkPhone(str, showText = true) {
        var reg = /^[0-9]*$/;
        if (CheckInput.isNull(str)) {
            if (showText)
                message.info('手机号不能为空');
            return true;
        } else if (!reg.test(str) || str.length !== 11) {
            if (showText)
                message.info("请输入正确的手机号码");
            return true;
        }
        return false;
    },

    /**
     * 检查手机号
     * @param str 手机号
     * @returns {boolean}
     */
    isPhoneNumber(str) {
        let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        return reg.test(str);
    },

    /**
     * 检查输入字符
     * @param str
     * @param text
     */
    checkInputValue(str, text) {
        if (!str) {
            message.info(text + '不能为空');
            return true;
        }
        if (CheckInput.isNull(str)) {
            message.info(text + '不能为空');
            return true;
        } else if (CheckInput.isEmojiCharacter(str)) {
            message.info(text + '请不要输入表情包');
            return true;
        }
        var reg = new RegExp("[`~@#$^&*()=|%{}''\\[\\].<>/~！@#￥……&*（）+——|{}【】‘；：”“'。，、？]");
        if (reg.test(str)) {
            message.info(text + "含有非法字符");
            return true;
        }
        return false;
    },

    /**
     * 非负整数（正整数 + 0）
     * @param str
     * @param text
     */
    checkSignlessInteger(str, text) {
        if (CheckInput.isNull(str)) {
            message.info(text + '不能为空');
            return true;
        }
        var reg = /^[0-9]*$/;
        if (!reg.test(str)) {
            message.info(text + '请输入正整数');
            return true;
        }
        return false;
    },

    /**
     * 检查输入的数字，最多保留两位小数
     * @param str
     * @param text
     */
    checkNumber(str, text) {
        if (CheckInput.isNull(str) || !str) {
            message.error(text + '不能为空');
            return true;
        }
        var reg = /^[0-9]+(.[0-9]{0,2})?$/;
        if (!reg.test(str)) {
            message.error(text + '格式不正确');
            return true;
        }
        return false;
    },

    /**
     * 检查输入的金额，最多保留两位小数,金额可以为0
     * @param str
     * @param text
     */
    checkMoney(str, text) {
        if (CheckInput.isNull(str) || !str) {
            message.error(text + '不能为空');
            return true;
        }
        var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
        if (!reg.test(str)) {
            message.error(text + '格式不正确');
            return true;
        }
        if (str + '' === '0') {
            message.error(text + '且单价不能为 0');
            return true;
        }
        return false;
    },
    /**
     * 检查输入的数字，最多保留四位小数
     * @param str
     * @param text
     */
    checkNumberDecimal4(str) {
        if (CheckInput.isNull(str) || !str) {
            return false;
        }
        var reg = /^[0-9]+(.[0-9]{0,4})?$/;
        if (!reg.test(str)) {
            return false;
        }
        return true;
    },

    /**
     * 区号+电话号码,通用号码,座机号码,可用'-'分隔，最小3位，最大15位
     * @param str
     * @param text
     */
    checkUsuallyPhone(str, text) {
        if (CheckInput.isNull(str) || !str) {
            message.info(text + '不能为空');
            return true;
        }
        if (str.length < 3) {
            message.info(text + '不能少于3位');
            return true;
        }
        if (str.length > 15) {
            message.info(text + '不能超过15位');
            return true;
        }
        var reg = /[^0123456789-]/;
        if (reg.test(str)) {
            message.info(text + '格式不正确');
            return true;
        }
        return false;
    },

    /**
     * 检查空串
     * @param str
     * @returns {boolean}
     */
    isNull(str) {
        if (str === "") return true;
        if (str == undefined) return true;
        if (str == null) return true;
        var regu = "^[ ]+$";
        var re = new RegExp(regu);
        return re.test(str);
    },

    /**
     * 是否为表情包
     */
    isEmojiCharacter(substring) {
        // var reg = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
        let reg = emojiRegex()
        return reg.test(substring);
        // for (var i = 0; i < substring.length; i++) {
        //     var hs = substring.charCodeAt(i);
        //     if (0xd800 <= hs && hs <= 0xdbff) {
        //         if (substring.length > 1) {
        //             let ls = substring.charCodeAt(i + 1);
        //             var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
        //             if (0x1d000 <= uc && uc <= 0x1f77f) {
        //                 return true;
        //             }
        //         }
        //     } else if (substring.length > 1) {
        //         let ls = substring.charCodeAt(i + 1);
        //         if (ls === 0x20e3) {
        //             return true;
        //         }
        //     } else {
        //         if (0x2100 <= hs && hs <= 0x27ff) {
        //             return true;
        //         } else if (0x2B05 <= hs && hs <= 0x2b07) {
        //             return true;
        //         } else if (0x2934 <= hs && hs <= 0x2935) {
        //             return true;
        //         } else if (0x3297 <= hs && hs <= 0x3299) {
        //             return true;
        //         } else if (hs === 0xa9 || hs === 0xae || hs === 0x303d || hs === 0x3030
        //             || hs === 0x2b55 || hs === 0x2b1c || hs === 0x2b1b
        //             || hs === 0x2b50) {
        //             return true;
        //         }
        //     }
        // }
    },

    /**
     * 检测密码
     * 密码可输入大小字母、数字和特殊字符~!@#$%^&*()[]{}<>?_=:.,'"+-;|/\
     * @param str
     * @returns {*}
     */
    checkOldPsw(str) {
        let regex = new RegExp("^([a-zA-Z0-9\\~\\!\\@\\#\\$\\%\\^\\&\\*\\(\\)\\[\\]\\{\\}\\<\\>\\_\\=\\:\\.\\,\\'\\\"\\+\\-\\;\\|\\/\\\\]){6,18}$");
        return regex.test(str)
    },
    checkPsw(str) {
        let regex = new RegExp("^([a-zA-Z0-9\\~\\!\\@\\#\\$\\%\\^\\&\\*\\(\\)\\[\\]\\{\\}\\<\\>\\_\\=\\:\\.\\,\\'\\\"\\+\\-\\;\\|\\/\\\\]){8,18}$");
        return regex.test(str)
    },
    /**
     * 检测密码种类
     * 大小字母、数字和特殊字符,检测是否只有同一类
     * @param str
     * @returns {*}
     */
    checkPswSameKind(str) {
        let reg1 = new RegExp("^[a-zA-Z]+$");
        let reg2 = new RegExp("^[0-9]+$");
        let reg3 = new RegExp("^([\\~\\!\\@\\#\\$\\%\\^\\&\\*\\(\\)\\[\\]\\{\\}\\<\\>\\_\\=\\:\\.\\,\\'\\\"\\+\\-\\;\\|\\/\\\\])+$");
        if (reg1.test(str) || reg2.test(str) || reg3.test(str)) {
            return true;
        }
        return false
    },

    /**
     * 检测邮箱
     */
    checkEmail(str) {
        // let regex = new RegExp('^\\\\w+([-.]\\\\w+)*@\\\\w+([-]\\\\w+)*\\\\.(\\\\w+([-]\\\\w+)*\\\\.)*[a-z]{2,3}$');
        let regex = new RegExp('^([a-zA-Z]|[0-9])(\\w|\\-)+@[a-zA-Z0-9]+\\.([a-zA-Z]{2,4})$');
        return regex.test(str)
    },

    /*
    * 号码的隐藏
    * */
    concealNum(number, beginNum = 3, middleNum = 4, laterNum = 4, hideSym = '*') {
        if (!number)
            return '';

        let hideSymbol = '';
        for (let i = 0; i < 4; i++) {
            hideSymbol += hideSym;
        }
        return ('' + number).substr(0, beginNum) + hideSymbol + ('' + number).substr(0, laterNum);
    },

};

export default CheckInput;
