/**
 * Created by yb on 2019/10/14
 */

const SwitchStatus = {
    // 发票类型
    invoiceType: (status) => {
        let resName = '';
        switch (status + '') {
            case '1':
                resName = '电子发票';
                break;

            case '2':
                resName = '纸质发票';
                break;

            default:
                break;
        }
        return resName;
    },

    // 发票状态
    status: (status) => {
        let resName = '';
        switch (status + '') {
            case '1':
                resName = '待同意';
                break;

            case '2':
                resName = '已同意';
                break;

            case '3':
                resName = '已驳回';
                break;

            case '4':
                resName = '已取消';
                break;

            default:
                break;
        }
        return resName;
    },
};
export default SwitchStatus