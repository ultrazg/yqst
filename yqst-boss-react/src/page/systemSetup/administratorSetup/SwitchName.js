/**
 * Created by yb on 2019/11/08
 */

const SwitchName = {
    level: (status) => {
        switch (status + '') {
            case '1':
                return '用户';

            case '2':
                return '管理员';

            case '3':
                return '超级管理员';

            default:
                return ''
        }
    }
};
export default SwitchName