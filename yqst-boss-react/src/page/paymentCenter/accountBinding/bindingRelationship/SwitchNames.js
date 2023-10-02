/**
 * Created by yb on 2019/09/20
 */

const SwitchNames = {
    // 绑定状态
    bindStatusName: (status, type = 'name') => {
        let name = '', color = '';
        switch (status + '') {
            case '1':
                name = '已绑定';
                color = '';
                break;

            case '2':
                name = '已解绑';
                color = '';
                break;

            default:
                break;
        }
        if(type == 'color') return color;
        return name;
    }
};
export default SwitchNames;