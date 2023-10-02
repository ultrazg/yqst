import PublicParams from '../../../../base/publicparams/PublicParams';

function ElectronicSealParams(callback) {
    var params = PublicParams();

    window.Storage.load({
        key: 'ESPParams', // 获取本地参数
    }).then(data => {
        // found data goes to then()
        if (data) {
            callback({
                ...params,
                companySn: data.companySn || 'dvf3c0ytnvp2d3v5',
                userSn: data.userSn || '12580392',
            });

        } else {
            callback(params);

        }
    }).catch(err => {
        // any exception including data not found
        // goes to catch()
        params.companySn = 'dvf3c0ytnvp2d3v5';
        params.userSn = '12580392';
        callback(params);

    });
}

export default ElectronicSealParams;
