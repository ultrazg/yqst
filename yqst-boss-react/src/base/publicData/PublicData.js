/**
 * Created by yb on 2019/08/27.
 * 设置全局公共的参数
 */

const PublicData = {
    // 页面头部高度，确定了下边的菜单、内容部分离头部的距离；
    pageTopHeight: 65,

    // 左边菜单栏的宽度值，确定了页面右边的宽度值；窗口的宽度 - 菜单栏的宽度 = 内容栏的宽度
    leftMenuWidth: 230,

    // 面包屑的高度，和菜单搜索的高度是一样的
    breadHeight: 48,

    // 系统设置菜单的判断字符，用于左边菜单栏切换的时候做判断使用 （IndexContent、IndexMenuData、NewIndex文件使用到）
    menuSiteName: '系统设置',
};

export default PublicData