/**
 * Created by yb on 2019/09/20
 */
const SwitchName = {
    // 退款类型
    refundTypeName: (status) => {
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

    // 状态
    statusName: (status, type = 'name') => {
        let name = '', color = '';
        switch (status + '') {
            case '1':
                name = '待确认';
                color = '#4285F4';
                break;

            case '2':
                name = '退款成功';
                color = '#46BD4C';
                break;

            case '3':
                name = '退款失败';
                color = '#F12C20';
                break;

            default :
                break;
        }

        if(type == 'color') return color;
        return name;
    },
};

export default SwitchName;