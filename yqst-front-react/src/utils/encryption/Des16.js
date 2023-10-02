import CryptoJS from 'crypto-js'

let Des16 = {
    // DES 加密
    encryptByDES: (message = '', key = 'DESWALLET') => {
        let keyHex = CryptoJS.enc.Utf8.parse(key);
        let encrypted = CryptoJS.DES.encrypt(message, keyHex, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.ciphertext.toString();
    },

    // DES 解密
    decryptByDES: (ciphertext = '', key = 'DESWALLET') => {
        let keyHex = CryptoJS.enc.Utf8.parse(key);
        let decrypted = CryptoJS.DES.decrypt({
            ciphertext: CryptoJS.enc.Hex.parse(ciphertext)
        }, keyHex, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        let result_value = decrypted.toString(CryptoJS.enc.Utf8);
        return result_value;
    }
};

export default Des16;
