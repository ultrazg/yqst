/**
 * Created by ljy on 2018/10/11
 */

let NumberFormat = {
    formatNumUS: (value) => {
        return value == undefined ? "" : (value + "").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    },
    /**
     * number：传入的数字参数
     * precision：保留几位小数
     * needPrefix：是否使用货币符号
     * prefix：货币符号
     * */
    thousandBit: (number, precision = 2, needPrefix = false, prefix = '￥') => {
        //判断并去除-、+符号
        let isZF = '';
        if (String(number).indexOf('-') > -1 || String(number).indexOf('+') > -1) {
            isZF = String(number)[0] || '';
            number = Number(String(number).replace(/-|\+/g, ''));
        }

        let displayPrefix = needPrefix ? prefix : '';
        number = String(number).replace(/(^\s*)|(\s*$)/g, "");
        if (isNaN(number) || !number) {
            return displayPrefix + parseFloat(0).toFixed(precision);
        } else {
            number = parseFloat(number).toFixed(precision)
        }
        number = number + '';
        if (number) {
            let nums = number.split('.')
            let num = nums[0].slice(nums[0].length % 3)
            let numBegin = nums[0].slice(0, nums[0].length % 3)
            number = numBegin + ((numBegin && num) ? ',' : '') + (num ? num.match(/\d{3}/g).join(',') : '') + (nums[1] ? '.' + nums[1] : '')
        }

        return isZF + displayPrefix + number;
    },

    // 去除小数点最后的后零 如：1.200100 =>1.2001；1200 => 1200; 0.004 => 0.004
    removeZero: (num)=>{
        if(!isNaN(num + '')){
            const regexp = /(?:\.0*|(\.\d+?)0+)$/;
            num = (num + '').replace(regexp, '$1');
        }
        return num;
    }
}
export default NumberFormat;