import PublicParams from '../../../../base/publicparams/PublicParams';

function ShopParams(callback) {
    var params = PublicParams();

    window.Storage.load({
        key: 'SParams', // 获取本地选择店铺的数据
    }).then(data => {
        // found data goes to then()
        if (data) {
            callback({
                ...params,
                shopSn: data.shopSn, // 店铺编码
                shopName: data.shopName, // 店铺名称
            });

        } else {
            callback(params);

        }
    }).catch(err => {
        // any exception including data not found
        // goes to catch()
        callback(params);

    });
}

export default ShopParams;
