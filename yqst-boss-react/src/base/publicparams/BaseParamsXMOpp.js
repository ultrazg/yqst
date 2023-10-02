/**
 * Created by ljy on 2018/5/28
 */

function BaseParamsXMOpp(callback) {
    var params = {
        // userSid: "",
        // faCode: "",
        // dealerCode: "",
        // username: "",
        // userIcon: "",
        // name: "",
        // authUserType: "",
        // accessToken: "",
        // userRelSid: "",
        // currentAdminOrgSid: "",
        // currentAdminOrgName: "",
        // isSimplifyOrder: "",
        sessionKey: "",
        sysTag: 'S00102',
    };
    window.Storage.load({
        key: 'XmBossOpportunityInfo',
    }).then(data => {
        // found data goes to then()
        if (data) {
            callback({...params,...data})
        } else {
            callback(params)
        }
    }).catch(err => {
        // any exception including data not found
        // goes to catch()
        callback(params)
    });
}

export default BaseParamsXMOpp;
