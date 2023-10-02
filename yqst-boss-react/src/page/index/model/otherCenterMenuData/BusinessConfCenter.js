/**
 * 业务配置中心
 */
const BusinessConfCenter = () =>{
    return {
        title:'业务配置中心',
        isShow:true,
        sideMenu:[
            {
                subMenuTitle: '租赁业务配置',
                onlyTwo: true,
                key: '/Pages/BusinessConfCenter/LeaseConf',
                childKeys: [],
            },
            {
                subMenuTitle: '非数字化协同配置',
                onlyTwo: true,
                key: '/Pages/BusinessConfCenter/DigitalModeConf',
                childKeys: [],
            },
        ]
    }
}

export default BusinessConfCenter;
