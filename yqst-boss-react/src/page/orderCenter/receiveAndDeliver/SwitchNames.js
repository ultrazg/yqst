/**
 * Created by yb on 2019/09/18
 */
const SwitchNames = {
    // 收发货状态
    deliveryStatusName : (status) => {
        let names = '';
        switch (status + '') {
            case '1':
                names = '已发货';
                break;

            default:
                names = '待发货';
                break;
        }
        return names;
    },

    // 售后状态
    afterStatusName : (status) => {
        let names = '';
        switch (status + '') {
            case '0':
                names = '未发起';
                break;

            case '1':
                names = '已发起';
                break;

            default:
                break;
        }
        return names;
    },

    // 物流方式
    logisticsWayName : (status) => {
        let names = '';
        switch (status + '') {
            case '0':
                names = '物流运输 (卖家承担)';
                break;

            case '1':
                names = '物流运输 (买家承担)';
                break;

            case '2':
                names = '自提';
                break;

            default:
                break;
        }
        return names;
    },
};

export default SwitchNames