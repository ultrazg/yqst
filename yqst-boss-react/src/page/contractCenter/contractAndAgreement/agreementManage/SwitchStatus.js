/**
 * Created by yb on 2019/10/21
 */

const SwitchStatus = {
    // 协议类型
    protocolType: (status) => {
        let resName = '';
        switch (status + '') {
            case '1':
                resName = '平台协议';
                break;

            case '2':
                resName = '业务协议';
                break;

            case '3':
                resName = '其他';
                break;

            default:
                break;
        }
        return resName;
    },

    // 状态
    status: (status) => {
        let resName = '';
        switch (status + '') {
            case '1':
                resName = '待确认';
                break;

            case '2':
                resName = '已确认';
                break;

            case '3':
                resName = '不同意';
                break;

            default:
                break;
        }
        return resName;
    },

    // 协议发起方类型
    startType: (status) => {
        let resName = '';
        switch (status + '') {
            case '1':
                resName = '企业';
                break;

            case '2':
                resName = '个人';
                break;

            default:
                break;
        }
        return resName;
    },

    // 协议确认方类型
    signType: (status) => {
        let resName = '';
        switch (status + '') {
            case '1':
                resName = '企业';
                break;

            case '2':
                resName = '个人';
                break;

            default:
                break;
        }
        return resName;
    },
};
export default SwitchStatus;