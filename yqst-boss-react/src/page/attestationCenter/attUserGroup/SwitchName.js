/**
 * Created by yb on 2019/10/29
 */
const SwitchName = {
    // 认证状态
    isAuth: (status) => {
        let name = '';
        switch (status + '') {
            case '0':
                name = '待认证';
                break;

            case '1':
                name = '已通过';
                break;

            case '2':
                name = '不通过';
                break;

            case '3':
                name = '已失效';
                break;

            default:
                break;
        }

        return name;
    },

    // 资质类型
    docType: (status) => {
        let name = '';
        switch (status + '') {
            case '1':
                name = '文本';
                break;

            case '2':
                name = '图片';
                break;

            case '3':
                name = '时间点';
                break;

            case '4':
                name = '时间区间';
                break;

            case '5':
                name = '地址';
                break;

            case '6':
                name = '附件';
                break;
            case '7':
                name = '选项';
                break;

            default:
                break;
        }

        return name;
    },

    // 是否必填
    isRequired: (status) => {
        let name = '';
        switch (status + '') {
            case '0':
                name = '不必填';
                break;

            case '1':
                name = '必填';
                break;

            default:
                break;
        }

        return name;
    },

    // 是否显示
    isDisplay: (status) => {
        let name = '';
        switch (status + '') {
            case '0':
                name = '不显示';
                break;

            case '1':
                name = '显示';
                break;

            default:
                break;
        }

        return name;
    },

    // 接口验证
    verifyStatus: (status) => {
        let name = '';
        switch (status + '') {
            case '0':
                name = '无';
                break;

            case '1':
                name = '已通过';
                break;

            case '2':
                name = '不通过';
                break;

            default:
                break;
        }

        return name;
    },
};
export default SwitchName
