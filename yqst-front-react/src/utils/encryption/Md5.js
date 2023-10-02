/**
 *MD5加密
 */
import CryptoJS from 'crypto-js';

export default {
    hex_md5: (msg = '') => {
        return CryptoJS.enc.Hex.stringify(CryptoJS.MD5(msg));
    }
}
