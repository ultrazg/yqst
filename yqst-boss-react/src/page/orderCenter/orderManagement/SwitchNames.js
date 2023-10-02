/**
 * Created by yb on 2019/09/17
 */
const SwitchNames = {
    // 订单类型
    orderTypeName : (status) => {
        let names = '';
        switch (status + '') {
            case '4':
                names = '一般选购单';
                break;

            case '1':
                names = '一般合同单';
                break;

            case '2':
                names = '代理合同单';
                break;

            case '3':
                names = '零售订单';
                break;

            default:
                break;
        }
        return names;
    },

    // 订单状态
    orderStatusName : (status) => {
        let names = '';
        switch (status + '') {
            case '10':
                names = '已关闭';
                break;

            default:
                names = '正常';
                break;
        }
        return names;
    },

    // 付款状态
    payStatusName : (status) => {
        let names = '';
        switch (status + '') {
            case '0':
            case '5':
                names = '未付款';
                break;

            case '2':
                names = '已付部分';
                break;

            default:
                names = '已付全额';
                break;
        }
        return names;
    },

    // 发货状态
    itemsStatusName : (status) => {
        let names = '';
        switch (status + '') {
            case '0':
                names = '未发货';
                break;

            case '1':
                names = '已发部分';
                break;

            case '2':
                names = '已发全部';
                break;

            default:
                break;
        }
        return names;
    },

    // 开票状态
    ticketStatusName : (status) => {
        let names = '';
        switch (status + '') {
            case '0':
                names = '未开票';
                break;

            case '1':
                names = '已开全部';
                break;

            case '2':
                names = '已开部分';
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