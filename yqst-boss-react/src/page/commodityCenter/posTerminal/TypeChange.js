/*
* Created by yb on 2019/09/06.
* 类型的转换
* */

const TypeChange = {
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