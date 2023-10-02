/**
 * Created by yb on 2019/11/20
 */

const SwitchName = {
    isHide: (status) => {
        switch (status + '') {
            case '0':
                return '全部可见';

            case '1':
                return '全部隐藏';

            case '2':
                return '白名单可见';

            case '3':
                return '黑名单隐藏';

            default:
                return null;
        }
    },
    isHideTxt: (status) => {
        switch (status + '') {
            case '0':
                return '注：所有注册企业均可见该云服务。';

            case '1':
                return '注：所有注册企业均不可见该云服务。';

            case '2':
                return '注：以上名单中企业将可见该云服务，其余企业不可见。';

            case '3':
                return '注：以上名单中企业将被隐藏该云服务，其余企业则可见。';

            default:
                return null;
        }
    },
    markDisplay: (status) => {
        switch (status + '') {
            case '1':
                return '显示';

            case '2':
                return '搜索显示';

            case '3':
                return '隐藏';

            default:
                return null;
        }
    },
    markDisplayTxt: (status) => {
        switch (status + '') {
            case '1':
                return '注：该类型下，用户无需搜索则可在应用市场查看该云服务。';

            case '2':
                return '注：该类型下，用户需在应用市场精确搜索关键词才能显示该云服务。';

            case '3':
                return '注：该类型下，用户无法查看云服务。';

            default:
                return null;
        }
    },
    isShow: (status) => {
        switch (status + '') {
            case '0':
                return '否';

            case '1':
                return '是';

            default:
                return null;
        }
    },
    isShowPop: (status) => {
        switch (status + '') {
            case '0':
                return '否';

            case '1':
                return '是';

            default:
                return null;
        }
    },
};
export default SwitchName;