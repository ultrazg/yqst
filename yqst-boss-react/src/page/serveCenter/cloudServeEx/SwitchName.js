/**
 * Created by yb on 2019/11/14
 */

const SwitchName = {
    status: (status) => {
        switch (status + '') {
            case '1':
                return '未激活';

            case '2':
                return '激活中';

            case '3':
                return '已过期';

            case '4':
                return '禁用中';

            default:
                return null;
        }
    }
};

export default SwitchName;