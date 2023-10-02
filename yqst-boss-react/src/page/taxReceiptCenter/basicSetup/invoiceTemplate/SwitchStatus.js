/**
 * Created by yb on 2019/10/16
 */

const SwitchStatus = {
    // 状态
    status: (status) => {
        let resName = '';
        switch (status + '') {
            case '1':
                resName = '关闭中';
                break;

            case '2':
                resName = '启用中';
                break;

            default:
                break;
        }
        return resName;
    },
};
export default SwitchStatus