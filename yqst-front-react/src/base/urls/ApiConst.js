/**
 * Created by leung on 2016/9/29.
 */
const DEVELOP = '1'; // 开发版
const TEST = '2'; // 测试版
const PRODUCT = '3'; // 生产版
const ZJ_PRE_PRODUCT = '4'; // 中建预生产版
const ZJ_PRODUCT = '5'; // 中建生产版
/**
 *    这里是服务器版本切换，下面是开发版;
 *    切换到测试版 var developeType = DEVELOP;
 */

var developeType = TEST;
let ApiConst = {
    CaptchaAppId: '2022471318', // 腾讯云的图形验证应用id
    DEVELOP: {
        /**
         * 网址都写在这里,如下
         */
        // sunaw: 'http://channeldev.sunaw.com:35',
        // sunaw: "http://yqst-api-dev.sunaw.com",
        // sunaw: 'http://yqst-api-test.sunaw.com',
        sunaw: 'http://163.177.128.179:41201',
        //opportunity: 'http://clue-api-dev.sunaw.com',
        opportunity: 'http://10.10.1.69:8090',
        //picc: "http://picc-weixin.sunaw.com",
        //picc: "http://10.10.1.58:8093",
        //czd: "http://czd-api-dev.sunaw.com",
        czd: 'http://czd-api-test.sunaw.com',
        //czd: "http://10.10.1.67:8091",
        //czd: "http://10.10.1.63:8091",
        swpay: 'http://163.177.128.179:50007/api/',
        jiuerliu: 'http://163.177.128.179:58095',
        // jiuerliu: 'http://10.10.1.53:8095',
        // jiuerliu: 'http://10.10.1.201:8095',
    },
    TEST: {
        /**
         * 网址都写在这里,如下
         */
        // sunaw: 'http://channeltest.sunaw.com:35',
        // sunaw: 'http://yqst-api-test.sunaw.com',
        //云企-微服务测试
        frontuUrl: 'http://yqst-test-wx.sunaw.com',
        sunaw: 'http://163.177.128.179:40201',
        // sunaw: 'http://10.10.1.155:2001',
        opportunity: 'http://clue-api-test.sunaw.com',
        picc: 'http://picc-test.sunaw.com',
        czd: 'http://czd-api-test.sunaw.com',
        swpay: 'http://163.177.128.179:50007/api/',
        jiuerliu: 'http://163.177.128.179:63095',
        // jiuerliu: 'http://10.10.1.207:8095',
        GlobalFriendCodeUrl : "http://yqst-test-wx.sunaw.com/?v=2/#/app-share/FriendIndex",
    },
    PRODUCT: {
        /**
         * 网址都写在这里,如下
         */
        wechat: 'http://wx.sunaw.com/sw_channelshop_api/api/v1/h5/user/get/code?',
        frontuUrl: 'http://channelprod.sunaw.com:8082/sw-channel-front',
        // sunaw: 'http://channelprod.sunaw.com:8080',
        sunaw: 'http://yqst.sunaw.com',
        swpay: 'http://payprod.sunaw.com:8081/api'
    },
    ZJ_PRE_PRODUCT: {
        frontuUrl: 'https://prezlm.cscec4bsy.com',
        sunaw: 'https://preapizl.cscec4bsy.com',
        GlobalFriendCodeUrl : "https://prezlm.cscec4bsy.com/?v=4/#/app-share/FriendIndex",
    },
    ZJ_PRODUCT: {
        frontuUrl: 'https://zlm.cscec4bsy.com',
        sunaw: 'https://apizl.cscec4bsy.com',
        GlobalFriendCodeUrl : "https://zlm.cscec4bsy.com/?v=5/#/app-share/FriendIndex",
    },
    Versions() {
        switch (developeType) {
            case DEVELOP:
                return ApiConst.DEVELOP;
            case TEST:
                return ApiConst.TEST;
            case PRODUCT:
                return ApiConst.PRODUCT;
            case ZJ_PRE_PRODUCT:
                return ApiConst.ZJ_PRE_PRODUCT;
            case ZJ_PRODUCT:
                return ApiConst.ZJ_PRODUCT;
            default:
                return {};
        }
    },
    getVersions() {
        return developeType;
    },
    Ver: {
        DEVELOP: DEVELOP,
        TEST: TEST,
        PRODUCT: PRODUCT,
        ZJ_PRE_PRODUCT: ZJ_PRE_PRODUCT,
        ZJ_PRODUCT: ZJ_PRODUCT,
    }
};

export default ApiConst;
