/**
 * Created by yb on 2019/10/15
 */

const SwitchStatus = {
    // 寄送类型
    sendType: (status) => {
        let resName = '';
        switch (status + '') {
            case '1':
                resName = '物流';
                break;

            case '2':
                resName = '自提';
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
                resName = '已取消';
                break;

            default:
                break;
        }
        return resName;
    },

    // 发票单种类
    invoiceType: (status) => {
        let resName = '';
        switch (status + '') {
            case '1':
                resName = '蓝字发票';
                break;

            case '2':
                resName = '红冲发票';
                break;

            default:
                break;
        }
        return resName;
    },
};
export default SwitchStatus