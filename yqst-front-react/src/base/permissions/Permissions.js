/**
 * Created by ljy on 2017/11/22
 */
import PublicParams from '../publicparams/PublicParams';

let Permissions = {
    //查询权限是否开放
    checkPermission(permissionsName, callback) {
        let pa = PublicParams();
        // callback && callback(true);
        // return;
        if (pa.admin + '' === '1') {
            callback && callback(false);
            return;
        }
        //callback 是否禁止 true-是 false-否
        Permissions.getPermissionsByLocal((data) => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].resCode + '' === permissionsName + '') {
                    callback && callback(false);
                    return;
                }
            }
            callback && callback(true);
        });
    },
    //从本地获取权限配置
    getPermissionsByLocal(callback) {
        window.Storage.load({
            key: 'PermissionsConfig',
        }).then(data => {
            callback && callback(data && Array.isArray(data) ? data : []);
        }).catch(err => {
            callback && callback([]);
        });
    },
    //保存权限配置
    savePermissionsToLocal(data, callback) {
        window.Storage.save({
            key: 'PermissionsConfig',
            data: data,
        });
    }
}
export default Permissions;
