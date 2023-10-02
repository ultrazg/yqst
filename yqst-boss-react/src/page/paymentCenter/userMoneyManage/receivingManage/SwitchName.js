/**
 * Created by yb on 2019/09/20
 */
const SwitchName = {
    // 来源单据
    billTypeName: (status) => {
        let name = '';
        switch (status + '') {
            case '1':
                name = '订单';
                break;

            case '2':
                name = '对账单';
                break;

            case '3':
                name = '金融订单';
                break;

            case '4':
                name = '服务费单';
                break;

            default :
                break;
        }

        return name;
    },

    // 状态
    statusName: (status, types = 'name') => {
        let name = '', color = '';
        switch (status + '') {
            case '1':
                name = '待确认';
                color = '#4285F4';
                break;

            case '2':
                name = '支付成功';
                color = ' #46BD4C';
                break;

            case '3':
                name = '支付失败';
                color = '#F12C20';
                break;

            default :
                break;
        }

        if(types == 'color') return color;
        return name;
    },

    // 支付类型
    payTypeName: (status) => {
        let name = '';
        switch (status + '') {
            case '1':
                name = '线上';
                break;

            case '2':
                name = '线下';
                break;

            default :
                break;
        }

        return name;
    },
};

export default SwitchName;