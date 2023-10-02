/**
 * Created by yb on 2019/10/28
 */

const SwitchName = {
    // 状态
    status: (status, type = 'name') => {
        let name = '', color = '';
        switch (status + '') {
            case '1':
                name = '启用中';
                color = '#4285F4';
                break;

            case '2':
                name = '停用中';
                color = '#F12C20';
                break;

            default:
                break;
        }
        if(type === 'color'){
            return color;
        }
        return name;
    },

    // 身份
    isAdmin: (status) => {
        let name = '';
        switch (status + '') {
            case '0':
                name = '员工';
                break;

            case '1':
                name = '管理员';
                break;

            case '2':
                name = '企业创建者';
                break;

            default:
                break;
        }
        return name;
    },
};

export default SwitchName