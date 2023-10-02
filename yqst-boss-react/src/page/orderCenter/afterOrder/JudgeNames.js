/**
 * Created by yb on 2019/09/16
 */
const JudgeNames = {
    typeFun: (types) => {
        let names = '';
        switch (types + '') {
            case '1':
                names = '仅退款';
                break;

            case '2':
                names = '退货退款';
                break;

            case '3':
                names = '仅退货';
                break;

            default:
                names = '';
                break;
        }
        return names;
    },

    statusFun: (status, returnType = 'names') => {
        let names = '', colors = '';
        switch (status + '') {
            case '1':
                names = '待同意';
                colors = '#4285F4';
                break;

            case '2':
                names = '已同意待处理';
                colors = '#4285F4';
                break;

            case '3':
                names = '已驳回';
                colors = '#F12C20';
                break;

            case '4':
                names = '已完成';
                colors = '#46BD4C';
                break;

            default:
                names = '';
                colors = '';
                break;
        }
        if(returnType == 'colors') return colors;
        return names;
    }
};

export default JudgeNames