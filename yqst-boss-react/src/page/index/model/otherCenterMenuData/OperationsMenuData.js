/**
 * 运营工具route
 */
const OperationsMenuData = () => {
    return {
        title: '运营工具',
        isShow: true,
        sideMenu: [
            {
                subMenuTitle: '代办注册',
                onlyTwo: true,
                key: '/Pages/AgentRegisterList',
                childKeys: ['/Pages/AgentRegisterCreate', '/Pages/AgentRegisterDetail'],
            },
            {
                subMenuTitle: '代办企业(仅临时查看数据)',
                onlyTwo: true,
                key: '/Pages/AgentRegisterErpList',
                childKeys: [],
            },
        ],
    }
};
export default OperationsMenuData;
