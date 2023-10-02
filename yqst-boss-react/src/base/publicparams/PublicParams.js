function PublicParams() {
    var params = {
        appKey: 'S00101',
        sessionKey: localStorage && localStorage.sessionKey ? localStorage.sessionKey : "",
        openId: localStorage && localStorage.openId ? localStorage.openId : "",
        signMethod: "01",
        timestamp: parseInt(new Date().getTime() / 100, 10),
        version: "1.0",
        sign: "",
        format: 'json',
        sysTag: 'S00102',
    };
    return params;
}

export default PublicParams;
