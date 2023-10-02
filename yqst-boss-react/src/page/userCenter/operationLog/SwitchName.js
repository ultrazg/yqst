/**
 * Created by yb on 2019/10/25
 */

const SwitchName = {
    // 平台
    platform: (status) => {
        let name = '';
        switch (status + '') {
            case '1':
                name = 'APP';
                break;

            case '2':
                name = 'Web';
                break;

            case '3':
                name = 'PC';
                break;

            case '4':
                name = '终端';
                break;

            default:
                break;
        }
        return name
    },

    // 结果
    result: (status, types = 'name') => {
        let name = '', color = '';
        switch (status + '') {
            case '1':
                name = '成功';
                color = '#4285F4';
                break;

            case '2':
                name = '失败';
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
};
export default SwitchName