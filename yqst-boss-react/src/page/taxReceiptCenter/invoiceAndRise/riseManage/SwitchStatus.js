/**
 * Created by yb on 2019/10/14
 */

const SwitchStatus = {
    // 抬头类型
    riseType: (status) => {
        let resName = '';
        switch (status + '') {
            case '1':
                resName = '个人抬头';
                break;

            case '2':
                resName = '企业抬头';
                break;

            default:
                break;
        }
        return resName;
    },

    // 抬头状态
    riseStatus: (status) => {
        let resName = '';
        switch (status + '') {
            case '0':
                resName = '非默认';
                break;

            case '1':
                resName = '默认';
                break;

            default:
                break;
        }
        return resName;
    },
};
export default SwitchStatus;