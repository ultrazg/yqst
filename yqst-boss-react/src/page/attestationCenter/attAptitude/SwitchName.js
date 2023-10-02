/**
 * Created by yb on 2019/10/31
 */

const SwitchName = {
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

    // 附件格式
    fileFormat: (status) => {
        let name = '';
        switch (status + '') {
            case '1':
                name = 'doc/excel/word/text/rar';
                break;

            case '2':
                name = 'doc';
                break;

            case '3':
                name = 'excel';
                break;

            case '4':
                name = 'word';
                break;

            case '5':
                name = 'text';
                break;

            case '6':
                name = 'rar';
                break;

            default:
                break;
        }

        return name;
    }
};

export default SwitchName
