
const SwitchStatus = (status) => {
    switch (status + '') {
        case '0':
            return '未注册';

        case '1':
            return '使用中';

        case '2':
            return '已注销';

        default:
            return null;
    }
};

export default SwitchStatus;