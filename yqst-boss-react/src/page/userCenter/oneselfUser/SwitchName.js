/**
 * Created by yb on 2019/10/25
 */

const SwitchName = {
    // 账号状态
    status: (status, types = 'name') => {
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
        if(types === 'color'){
            return color;
        }
        return name
    },

    // 性别
    sex: (status) => {
        let name = '';
        switch (status + '') {
            case '0':
                name = '未设置';
                break;

            case '1':
                name = '男';
                break;

            case '2':
                name = '女';
                break;

            default:
                break;
        }
        return name
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

            default:
                break;
        }
        return name
    },

    // 认证状态
    authState: (status) => {
        let name = '';
        switch (status + '') {
            case '-1':
                name = '未提交';
                break;

            case '0':
                name = '待审核';
                break;

            case '1':
                name = '已审核';
                break;

            case '2':
                name = '审核不通过';
                break;

            case '3':
                name = '已失效';
                break;

            default:
                break;
        }
        return name
    },
};
export default SwitchName