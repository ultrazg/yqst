function PublicParams() {
    var params = {
        appKey: 'S00101',
        sysTag: 'S00102',
        sessionKey: localStorage && localStorage.sessKey ? localStorage.sessKey : "",
        openId: localStorage && localStorage.openId ? localStorage.openId : "",
        signMethod: "01",
        timestamp: parseInt(new Date().getTime() / 100, 10),
        version: "1.0",
        sign: "",
        format: 'json',
        admin: localStorage && localStorage.admin ? localStorage.admin : "",
        phone:localStorage && localStorage.phone ? localStorage.phone : "",
        accountSn:localStorage && localStorage.accountSn ? localStorage.accountSn : "",
    };
    return params;
}

export default PublicParams;
