/**
 * Created by ljy on 2018/5/28
 */

function BaseParamsUnionCW(callback) {
    var params = {
        sessionKey: "",
        sysTag: 'S00102',
    };
    window.Storage.load({
        key: 'UnionCWInfo',
    }).then(data => {
        // found data goes to then()
        if (data) {
            callback({...params, ...data})
        } else {
            callback(params)
        }
    }).catch(err => {
        // any exception including data not found
        // goes to catch()
        callback(params)
    });
}

export default BaseParamsUnionCW;
