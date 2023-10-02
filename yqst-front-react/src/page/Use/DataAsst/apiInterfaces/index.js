/*
 * @Description  : 网络请求
 * @version      : 0.1
 * @Author       : Chenglin Huang
 * @Date         : 2021-05-19 16:32:32
 * @LastEditTime : 2021-05-26 17:35:23
 */
export default {
    leaseGoodsStatistics: "/api/v1/microdata/lease/goods/statistics/index",
    kindlist: "/api/v1/microdata/lease/goods/statistics/kind/panel/list",
    categoryList: "/api/v1/microdata/lease/goods/statistics/category/page",
    SPUList: "/api/v1/microdata/lease/goods/statistics/goods/parent/page",
    SKUList: "/api/v1/microdata/lease/goods/statistics/goods/page",
    monthChangeList: "/api/v1/microdata/lease/goods/statistics/month/change/list",
    lesseeMonthOnMonthGrowthList: "/api/v1/microdata/lease/goods/statistics/lessee/month/on/month/growth/list",
    lessorMonthOnMonthGrowthList: "/api/v1/microdata/lease/goods/statistics/lessor/month/on/month/growth/list",
    lesseeEntryExitMonthComparisonList: "/api/v1/microdata/lease/goods/statistics/lessee/entry/exit/month/comparison/list",
    lessorEntryExitMonthComparisonList: "/api/v1/microdata/lease/goods/statistics/lessor/entry/exit/month/comparison/list",
    lessorlist: "/api/v1/microdata/lease/goods/statistics/lessor/page", // 供应商列表
    lesseelist: "/api/v1/microdata/lease/goods/statistics/lessee/page", // 客户列表
    projectlist: "/api/v1/microdata/lease/goods/statistics/project/page", // 项目列表
    lesseeExportList: "/api/v1/microdata/lease/goods/statistics/kind/lessee/export/list", // 承租报表种类
    lessorExportList: "/api/v1/microdata/lease/goods/statistics/kind/lessor/export/list", // 出租报表种类
    lesseeExport: "/api/v1/microdata/lease/goods/statistics/lessee/batch/export", // 承租生成报表
    lesseeStandingBookExport: '/api/v1/microdata/lease/goods/statistics/lessee/standing/book/export', // 项目台账
    lesseeGoodsDetailExport: '/api/v1/microdata/lease/goods/statistics/lessee/detail/export', // 承租物资明细
    lessorExport: "/api/v1/microdata/lease/goods/statistics/lessor/batch/export", // 出租生成报表
    lessorStandingBookExport: "/api/v1/microdata/lease/goods/statistics/lessor/standing/book/export", // 供应商台账
    lessorGoodsDetailExport: '/api/v1/microdata/lease/goods/statistics/lessor/detail/export',// 出租物资明细
    reportTableList: "/api/v1/microdata/statistics/enclosure/page",//"/api/v1/microdata/lease/goods/statistics/enclosure/page", // 生成记录列表

    //
    grossprofitChartsIndex: "/api/v1/microdata/lease/income/expenditure/gross/profit/index", // 毛利情况
    grossprofitChartsSpuList: "/api/v1/microdata/lease/income/expenditure/gross/profit/spu/list", // 毛利情况
    grossprofitChartsSkuList: "/api/v1/microdata/lease/income/expenditure/gross/profit/sku/list", // 毛利情况
    //
    erpIncomeSpuList: '/api/v1/microdata/lease/income/expenditure/income/spu/list',
    erpIncomeSkuList: '/api/v1/microdata/lease/income/expenditure/income/sku/list',
    //
    erpTrendList: '/api/v1/microdata/lease/income/expenditure/gross/profit/trend/list',
    erpTrendSpuList: '/api/v1/microdata/lease/income/expenditure/spu/list',
    erpTrendSpuChartsList: '/api/v1/microdata/lease/income/expenditure/gross/profit/trend/spu/list',
    erpTrendSkuList: '/api/v1/microdata/lease/income/expenditure/sku/list',
    erpTrendSkuChartsList: '/api/v1/microdata/lease/income/expenditure/gross/profit/trend/sku/list',
};
