import {message} from "antd";

const JudgePath = (tag, props) => {
    switch (tag + "") {
        // 新的销售助手
        case "1035":
            return props.history.push("/pages/appCenter/sellAssistant");

        // 新的采购助手
        case "1036":
            return props.history.push("/pages/appCenter/purchasingAssistant");

        // 电子签章助手
        case "1038":
            return props.history.push("/pages/appCenter/electronicSealHelper");

        // B2B企业钱包
        case "1039":
            return props.history.push("/pages/appCenter/btbEnterpriseWallet");

        // 商机助手
        case "1041":
            return props.history.push("/pages/appCenter/businessAssistant");

        // 产品库管理
        case "1048":
            return props.history.push("/pages/appCenter/productLib/saProductHome");

        // 出租助手
        case "1050":
            return props.history.push("/pages/appCenter/rentAssistant/rentAssistantHome/rentAssistantSituation");

        // 结算中心
        case "1051":
            return props.history.push("/pages/appCenter/costAssistant/costAssistantHome");

        // 企业产品库管理
        case "1054":
            return props.history.push("/pages/appCenter/companyProductLib/companyProductLibHome");

        // 承运助手
        case "1042":
            return props.history.push("/pages/appCenter/carrierAsst/carrierAsstHome");

        // 数据助手
        case "1063":
            return props.history.push("/pages/appCenter/dataAsst/home");

        // 合同助手
        case "1044":
            return props.history.push("/pages/appCenter/contractAsst/contractAsstHome");

        // 补单助手
        // case "1064":
        //     return props.history.push("/pages/appCenter/SupplementAsstHome");

        default:
            return message.info("工程师正在紧张的研发中，请耐心等待！");
    }
};

export default JudgePath;
