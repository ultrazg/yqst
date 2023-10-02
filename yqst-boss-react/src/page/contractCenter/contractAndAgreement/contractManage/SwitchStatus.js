/**
 * Created by yb on 2019/10/14
 */

const SwitchStatus = {
    // 合同类型
    contractType: (status) => {
        let resName = '';
        switch (status + '') {
            case '1':
                resName = '代采代销合同';
                break;

            case '2':
                resName = '采销合同';
                break;

            case '3':
                resName = '其他合同';
                break;

            case '4':
                resName = '保理合同';
                break;

            default:
                break;
        }
        return resName;
    },

    // 合同状态
    status: (status) => {
        let resName = '';
        switch (status + '') {
            case '1':
                resName = '待我方签署';
                break;

            case '2':
                resName = '待他方签署';
                break;

            case '3':
                resName = '已完成';
                break;

            case '4':
                resName = '已拒绝';
                break;

            case '5':
                resName = '履行中';
                break;

            case '6':
                resName = '已取消';
                break;

            case '7':
                resName = '已到期';
                break;

            default:
                break;
        }
        return resName;
    },

    // 合同发起方类型
    startType: (status) => {
        let resName = '';
        switch (status + '') {
            case '1':
                resName = '企业';
                break;

            case '2':
                resName = '个人';
                break;

            default:
                break;
        }
        return resName;
    },

    // 合同签署方类型
    signType: (status) => {
        let resName = '';
        switch (status + '') {
            case '1':
                resName = '企业';
                break;

            case '2':
                resName = '个人';
                break;

            default:
                break;
        }
        return resName;
    },

    // 结算方式
    settleType: (status) => {
        let resName = '';
        switch (status + '') {
            case '1':
                resName = '票到30天';
                break;

            case '2':
                resName = '票到60天';
                break;

            case '3':
                resName = '票到180天';
                break;

            case '4':
                resName = '票到365天';
                break;

            default:
                break;
        }
        return resName;
    },

    // 交货方式
    deliveryType: (status) => {
        let resName = '';
        switch (status + '') {
            case '1':
                resName = '乙方自提';
                break;

            case '2':
                resName = '丙方发货';
                break;

            default:
                break;
        }
        return resName;
    },

    // 乙方付款方式
    bPayType: (status) => {
        let resName = '';
        switch (status + '') {
            case '1':
                resName = '现金支付';
                break;

            case '2':
                resName = '承兑汇票';
                break;

            default:
                break;
        }
        return resName;
    },
};
export default SwitchStatus;