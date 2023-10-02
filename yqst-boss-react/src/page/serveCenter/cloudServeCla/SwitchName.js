/**
 * Created by yb on 2019/11/14
 */

const SwitchName = {
    isHide: (status) => {
        switch (status + '') {
            case '0':
                return '全部显示';

            case '1':
                return '全部隐藏';

            case '2':
                return '白名单可见';

            case '3':
                return '黑名单隐藏';

            default:
                return null;
        }
    }
};

export default SwitchName