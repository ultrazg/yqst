/**
 * Created by leung on 2016/9/29.
 */

const DEVELOP = '1'; // 开发版
const TEST = '2'; // 测试版
const PRODUCT = '3'; // 生产版
const ZJ_PRE_PRODUCT = '4'; // 中建预生产版
const ZJ_PRODUCT = '5'; // 中建生产版

/**
 *    这里是服务器版本切换，下面是开发版，
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
        // sunaw: 'http://yqst-api-dev.sunaw.com',
        // sunaw: 'http://yqst-api-test.sunaw.com',
        // sunaw: 'http://163.177.128.179:58201',
        // sunaw: 'http://10.10.1.55:63201',
        // sunaw: 'http://10.10.1.63:58204',
        // sunaw: 'http://10.10.1.41:58206',

        // sunaw: 'http://10.10.1.116:58201',
        // sunaw: 'http://yqst.sunaw.com:2001',
        //sunaw: "http://10.10.1.112:2002",

        // sunaw: 'http://163.177.128.179:55201',
        sunaw: 'http://163.177.128.179:41201',

        czd: 'http://czd-api-dev.sunaw.com',
        //czd: 'http://10.10.1.64:8091',
        opportunity: 'http://clue-api-dev.sunaw.com',
        // opportunity: 'http://10.10.1.64:8091',
        swpay: 'http://163.177.128.179:50007/api/',
        unionpay: 'http://10.10.1.43:8071',
    },
    TEST: {
        /**
         * 网址都写在这里,如下
         */
        // sunaw: 'http://channeltest.sunaw.com:35',
        // sunaw: 'http://yqst-api-test.sunaw.com',
        // sunaw: 'http://163.177.128.179:55201',
        // sunaw: 'http://163.177.128.179:55201',
        sunaw: 'http://163.177.128.179:40201',

        czd: 'http://czd-api-test.sunaw.com',
        opportunity: 'http://clue-api-test.sunaw.com',
        swpay: 'http://163.177.128.179:50007/api/',
        unionpay: 'http://163.177.128.179:63071',
    },
    PRODUCT: {
        /**
         * 网址都写在这里,如下
         */
        wechat: 'http://wx.sunaw.com/sw_channelshop_api/api/v1/h5/user/get/code?',
        frontuUrl:
            'http://channelprod.sunaw.com:8082/sw-channel-front',
        sunaw:
            "http://channelprod.sunaw.com:8080",
        swpay:
            'http://payprod.sunaw.com:8081/api',
    },
    ZJ_PRE_PRODUCT: {
        sunaw: 'https://preapizl.cscec4bsy.com',
    },
    ZJ_PRODUCT: {
        sunaw: 'https://apizl.cscec4bsy.com',
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
