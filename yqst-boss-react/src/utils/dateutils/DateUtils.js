/**
 * Created by liqiang on 2017/6/19.
 * 时间工具类
 */
import React, {Component} from 'react';

let DateUtils = {
    /**
     * 格式化当前时间
     * @param now
     * @returns {string}
     */
    formatDate(time) {
        let now = new Date(time);
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        return year + "-" + month + "-" + date;
    },

    /**
     *当前时间减8小时
     * @returns {string}
     */
    formatDateWithDeleteEightHour() {
        var numberTime = Number(new Date());
        var beforeTime = numberTime - (1000 * 60 * 60 * 8);
        var date = new Date(beforeTime);
        var year = date.getFullYear();
        var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
        var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        var hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        var minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        var second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        var nowTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
        return nowTime;
    },

    /**
     * 时间戳转年月日时分
     * @param now
     * @returns {string}
     */
    formatDateToHourMinute(time) {
        let now = new Date(time);
        console.log(now, '---');
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        month = month >= 10 ? month : "0" + month;
        var date = now.getDate();
        date = date >= 10 ? date : "0" + date;
        var hour = now.getHours();
        hour = hour >= 10 ? hour : "0" + hour;
        var minute = now.getMinutes();
        minute = minute >= 10 ? minute : "0" + minute;
        return year + "-" + month + "-" + date + " " + hour + ":" + minute;
    },

    /**
     * 时间戳转年月日时分秒
     * @param now
     * @returns {string}
     */
    formatDateToHourMinuteSecond(time) {
        let now = new Date(time);
        // console.log(now, '---');
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        month = month >= 10 ? month : "0" + month;
        var date = now.getDate();
        date = date >= 10 ? date : "0" + date;
        var hour = now.getHours();
        hour = hour >= 10 ? hour : "0" + hour;
        var minute = now.getMinutes();
        minute = minute >= 10 ? minute : "0" + minute;
        var second = now.getSeconds();
        second = second >= 10 ? second : "0" + second;
        return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
    },


    /**
     * 时间戳转年月日
     * @param now
     * @returns {string}
     */
    formatDateToYYMMDD(time) {
        let now = new Date(time);
        console.log(now, '---');
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        return year + "-" + month + "-" + date;
    },

    /**
     *获取当天0点时间
     */
    getTimesmorning() {
        var now_new = Date.parse(new Date());
        return new Date(new Date(new Date().toLocaleDateString()).getTime());
    },

    /**
     *获取当前时间，精确到时分秒
     */
    getNowFormatDate() {
        var date = new Date();
        var year = date.getFullYear();
        var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
        var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        var hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        var minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        var second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        var nowTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
        return nowTime;
    },

    /**
     * 获取今天星期几
     * @param date
     */
    getWeekOfDate(date) {
        var weekday = new Array(7);
        weekday[0] = "星期天";
        weekday[1] = "星期一";
        weekday[2] = "星期二";
        weekday[3] = "星期三";
        weekday[4] = "星期四";
        weekday[5] = "星期五";
        weekday[6] = "星期六";
        return weekday[date.getDay()];
    },
    getWeekOfDateShort(longTime) {
        var date = new Date(longTime);
        var weekday = new Array(7);
        weekday[0] = "周日";
        weekday[1] = "周一";
        weekday[2] = "周二";
        weekday[3] = "周三";
        weekday[4] = "周四";
        weekday[5] = "周五";
        weekday[6] = "周六";
        var now = new Date();
        if (now.toDateString() === date.toDateString()) {
            return '今天';
        }
        return weekday[date.getDay()];
    },
    getDateTimeHourAndMinute(longTime) {
        var date = new Date(longTime);
        var now = new Date();
        if (now.toDateString() === date.toDateString()) {
            var pointText = ((date.getHours() + "").length == 1 ? "0" + date.getHours() : date.getHours()) + ':' + ((date.getMinutes() + "").length == 1 ? "0" + date.getMinutes() : date.getMinutes());

            return pointText;
        } else {
            if (date.getFullYear() === now.getFullYear()) {
                return (date.getMonth() + 1) + '-' + date.getDate();
            } else {
                return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
            }
        }
    },
    getTimePoint(longTime) {
        var dateTime = new Date(parseInt(longTime));
        var years = dateTime.getFullYear();
        var months = dateTime.getMonth() + 1;
        var days = dateTime.getDate();
        var hours = dateTime.getHours();
        var minutes = dateTime.getMinutes();

        var hour = 60 * 60 * 1000;
        var day = (60 * 60 * 24) * 1000;

        //现在时间
        var now = Date.parse(new Date());

        //时间点比当天零点早
        if (longTime <= now && longTime != null) {
            let date = new Date(longTime);
            if (longTime < DateUtils.getTimesmorning()) {
                if (longTime >= DateUtils.getTimesmorning() - day) {//比昨天零点晚
                    let pointText = "昨天";
                    return pointText;
                } else {//比昨天零点早
                    if (longTime >= DateUtils.getTimesmorning() - 6 * day) {//比七天前的零点晚，显示星期几
                        return DateUtils.getWeekOfDate(date);
                    } else {//显示具体日期
                        let pointText = years + '/' + months + '/' + days;
                        return pointText;
                    }
                }
            } else {//无日期时间,当天内具体时间
                let pointText = ((hours + "").length == 1 ? "0" + hours : hours) + ':' + ((minutes + "").length == 1 ? "0" + minutes : minutes);
                return pointText;

            }

        }

    }

}

export default DateUtils;