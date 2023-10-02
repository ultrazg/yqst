/*
* Created by yb on 2019/09/06.
* 类型的转换
* */

const TypeChange = {
    // 状态的判断
    statusName: (status, type = 'name') => {
        let name = '', color = '';
        switch ('' + status) {
            case '0':
                name = '下架';
                color = '#999';
                break;

            case '1':
                name = '上架';
                color = '#46BD4C';
                break;

            case '2':
                name = '不显示';
                color = '#999';
                break;

            default:
                name = '状态有误';
                color = '#F12C20';
                break;
        }
        if(type == 'colors') return color;
        return name;
    },

    // 终端类型的判断
    typeName: (types) => {
        let name = '';
        switch ('' + types) {
            case '1':
                name = 'B2B';
                break;

            case '2':
                name = 'B2C';
                break;

            default:
                name = '类型有误';
                break;
        }
        return name;
    },
};
export default TypeChange