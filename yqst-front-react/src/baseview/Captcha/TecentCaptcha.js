import React from 'react';

/**
 * TecentCaptcha((res) => {
      //验证成功返回
      //进行下一步操作（验证、登录、注册等）
   });
 * @param callback
 * @param onerror
 * @constructor
 * TecentCaptcha(暂只有前端认证，未做后台认证)
 *
 */
export default function TecentCaptcha(callback, onerror) {
    let action = () => {
        const appid = '2094165561';
        //直接生成一个验证码对象
        let captcha = new window.TencentCaptcha(appid, (res) => {
            /**
             res:{
                ret    Int    验证结果，0-验证成功，2-用户主动关闭验证码
                ticket    String    验证成功的票据，当且仅当ret=0时ticket有值
                appid    String    场景Id
                bizState    Any    自定义透传参数
             }
             */
            if (res.ret == 0) {
                callback && callback(res)
            }
        }, {
            needFeedBack: false,
        });
        captcha.show(); // 显示验证码
    }
    //已加载script
    if (window.TencentCaptcha) {
        action();
    } else {
        let script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.setAttribute("src", "https://ssl.captcha.qq.com/TCaptcha.js");
        script.onload = () => {
            action();
        };
        script.onerror = () => {
            onerror && onerror();
        };
        document.body.appendChild(script);
    }
}
