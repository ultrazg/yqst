export default {
    /**
     *供应链关系图
     */
    // 企业分页列表
    companyPage: '/boss/v1/user/account/page',
    // 企业供应链关系（左侧四个数值）
    companyChains: '/boss/v1/microdata/lease/supply/chain/relation/company/chain/get',
    // 企业租赁量（点）
    companyLease: '/boss/v1/microdata/lease/supply/chain/relation/company/lease/quantity/get',
    // 项目分页列表
    projectPage: '/boss/v1/lease/project/page',
    // 项目供应链关系（左侧四个数值）
    projectChains: '/boss/v1/microdata/lease/supply/chain/relation/project/chain/get',
    // 项目租赁量（点）
    projectLease: '/boss/v1/microdata/lease/supply/chain/relation/project/lease/quantity/get',


    /**
     *销售需求与交易量
     */
    salesAndTradingDataSpuList: '/boss/v1/microdata/lease/goods/statistics/spu/transaction/volume/list',
    salesAndTradingDataSkuList: '/boss/v1/microdata/lease/goods/statistics/sku/transaction/volume/list',
    salesAndTradingDataSelectSpuList: '/boss/v1/microdata/lease/goods/statistics/spu/list',
    salesAndTradingDataSpuTrendList: '/boss/v1/microdata/lease/goods/statistics/spu/growth/trend/list',
    salesAndTradingDataSelectSkuList: '/boss/v1/microdata/lease/goods/statistics/sku/list',
    salesAndTradingDataSkuTrendList: '/boss/v1/microdata/lease/goods/statistics/sku/growth/trend/list',

    /*
    单量数据
     */
    userAccountPage: '/boss/v1/user/account/page', // 企业列表
    LessorProjectPage: '/boss/v1/lease/project/lessor/page', // 企业出租项目列表
    LeaseProjectPage: '/boss/v1/lease/project/page', // 企业承租项目列表
    BusinessNumStatistics: '/boss/v1/microdata/lease/business/num/statistics/index', // 业务单量统计
    BusinessNumStatisticsExcelUrl: '/boss/v1/microdata/lease/business/num/statistics/excel/url/get', // 租赁业务单量统计excelUrl
}
