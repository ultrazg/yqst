/**
 * Created by leung on 2016/11/3.
 */

import {message} from 'antd';

const err_network = "网络开小差了~";

/**
 * 网络义务数据处理
 */
const BaseError = {
    /**
     * 网络错误处理
     */
    errorByNetwork() {
        message.info(err_network);
    },
    /**
     * 义务信息错误处理
     */
    errorByResponse(json) {
        json && message.info(json.msg);
    },
}
export default BaseError;
