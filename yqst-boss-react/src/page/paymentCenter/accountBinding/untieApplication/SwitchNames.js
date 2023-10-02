/**
 * Created by yb on 2019/09/23
 */
const SwitchNames = {
    // 申请状态
    cancelStatusName: (status, type = 'name') => {
        let name = '', color = '';
        switch (status + '') {
            case '1':
                name = '待处理';
                color = '#4285F4';
                break;

            case '2':
                name = '已通过';
                color = '#46BD4C';
                break;

            case '3':
                name = '已拒绝';
                color = '#F12C20';
                break;

            default:
                break;
        }
        if(type == 'color') return color;
        return name;
    }
};

export default SwitchNames;