/*
 * @Description  : 网络请求接口
 * @version      : 0.1
 * @Author       : Chenglin Huang
 * @Date         : 2021-05-06 09:57:21
 * @LastEditTime : 2021-05-17 16:41:03
 */

export default {
    contractStatistics: "/api/v2/contract/statistics", // 统计数据
    contractAsstPage: "/api/v2/contract/page", // 合同分页列表
    contractCreate: "/api/v2/contract/save", // 创建合同
    contractAsstTypeList: "/api/v2/contract/type/list", // 全部合同类型
    uploadFile: "/api/v1/file/uploadFile", // 文件服务器
    contractAsstSelectPartner: "/api/v1/erp/partner/listPartner", // 选择合作伙伴
    contractInfo: "/api/v2/contract/info", // 合同详情
    contractSubmit: "/api/v1/contract/submit", // 合同提交
    contractDelete: "/api/v1/contract/initiator/delete", // 合同删除
    contractReject: "/api/v2/contract/visa", // 合同拒签
    contractSendCode: "/api/v1/contract/send/code", // 签署合同发送验证码
    contractSign: "/api/v2/contract/sign", // 合同签署
    contractUpdate: "/api/v2/contract/update", // 合同更新
};