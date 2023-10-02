
const StatusName = (status, isReturnColor = false) => {
    switch (status + '') {
        case '1':
            if(isReturnColor)
                return '#4481EB';
            return '待审核';

        case '2':
            if(isReturnColor)
                return '#49C628';
            return '已同意';

        case '3':
            if(isReturnColor)
                return '#F74439';
            return '已驳回';

        default:
            return '';
    }
};
export default StatusName