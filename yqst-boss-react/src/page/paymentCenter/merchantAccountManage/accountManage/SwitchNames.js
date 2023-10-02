/**
 * Created by yb on 2019/09/20
 */

const SwitchNames = {
    // 账户状态
    accountStatusName: (status, type = 'name') => {
        let name = '', color = '';
        switch (status + '') {
            case '1':
                name = '启用中';
                color = '#46BD4C';
                break;

            case '2':
                name = '禁用中';
                color = '#F12C20';
                break;

            case '3':
                name = '已注销';
                color = '#888';
                break;
            default:
                break;
        }
        if(type == 'color') return color;
        return name;
    },

    // 绑定状态
    bindStatusName: (status) => {
        let name = '';
        switch (status + '') {
            case '1':
                name = '已绑定';
                break;

            case '2':
                name = '未绑定';
                break;

            default:
                break;
        }
        return name;
    },
};

export default SwitchNames;