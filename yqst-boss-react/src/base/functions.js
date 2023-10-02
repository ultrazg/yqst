import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

/**
 * 时间格式化
 * @time unix时间戳
 */
export function timeFormat(time) {
    return moment(time).format("YYYY-MM-DD H:mm:ss");
}
