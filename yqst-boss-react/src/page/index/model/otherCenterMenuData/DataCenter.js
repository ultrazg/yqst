/**
 * 数据中心
 */
const DataCenter = () => {
    return {
        title: '数据中心',
        isShow: true,
        sideMenu: [
            {
                subMenuTitle: '供应链关系图谱',
                onlyTwo: true,
                key: '/Pages/DataCenter/CompanyChain',
                childKeys: ['/Pages/DataCenter/ProjectChain'],
            },
            {
                subMenuTitle: '销售需求与交易量',
                onlyTwo: true,
                key: '/Pages/DataCenter/SalesAndTradingData',
                childKeys: [],
            },
            {
                subMenuTitle: '单量数据',
                onlyTwo: true,
                key: '/Pages/DataCenter/OrderData',
                childKeys: [],
            }
        ]
    }
}

export default DataCenter;
