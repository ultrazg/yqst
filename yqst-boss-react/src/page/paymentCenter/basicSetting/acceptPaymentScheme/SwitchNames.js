/**
 * Created by yb on 2019/09/23
 */
const SwitchNames = {
    // 状态
    statusName: (status, type = 'name') => {
        let name = '', color = '';
        switch (status + '') {
            case '2':
                name = '启用中';
                color = '#46BD4C';
                break;

            case '1':
                name = '关闭中';
                color = '#F12C20';
                break;

            default:
                break;
        }
        if(type == 'color') return color;
        return name;
    },

    // 渠道收支付类型
    payTypeName: (status, type = 'name') => {
        let name = '', color = '';
        switch (status + '') {
            case '2':
                name = '线下';
                color = '';
                break;

            case '1':
                name = '线上';
                color = '';
                break;

            default:
                break;
        }
        if(type == 'color') return color;
        return name;
    },

    // 渠道状态
    chaStatusName: (status, type = 'name') => {
        let name = '', color = '';
        switch (status + '') {
            case '2':
                name = '启用中';
                color = '#46BD4C';
                break;

            case '1':
                name = '关闭中';
                color = '#F12C20';
                break;

            default:
                break;
        }
        if(type == 'color') return color;
        return name;
    },
};

export default SwitchNames;