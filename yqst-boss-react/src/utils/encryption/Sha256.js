/**
 * Created by leung on 2016/11/11.
 */
import CryptoJS from 'crypto-js';

export default {
    encode: (msg = '') => {
        return CryptoJS.enc.Hex.stringify(CryptoJS.SHA256(msg))
    }
};

