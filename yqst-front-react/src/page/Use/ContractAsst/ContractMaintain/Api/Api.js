import React from 'react'

export default {
    LessorContractPage: '/api/v1/contract/lease/contract/lessor/page', // 出租方租赁合同分页列表
    LesseeContractPage: '/api/v1/contract/lease/contract/lessee/page', // 承租方租赁合同分页列表
    LessorContractGet: '/api/v1/contract/lease/contract/get', //
    LessorContractGetLastGoodsPrice: '/api/v1/contract/lease/contract/last/good/list',
    LessorContractGetInitGoodsPrice: '/api/v1/contract/lease/contract/primary/good/list',
    LessorContractGetSettleInfo: '/api/v1/contract/lease/contract/settlement/info/get',
    LessorContractGetLossInfo: '/api/v1/contract/lease/contract/loss/good/list',
    LessorContractGetMainInfo: '/api/v1/contract/lease/contract/maintenance/item/list',
    LessorContractGetCuttingInfo: '/api/v1/contract/lease/contract/replacement/goods/list',

    ContractLessorAdd: '/api/v1/contract/lease/contract/lessor/add',
    ContractLesseeAdd: '/api/v1/contract/lease/contract/lessee/add',
    SelectLesseeList: "/api/v1/lease/partner/lessee/page",
    SelectLessorProjectList: "/api/v1/lease/project/lessor/contract/use/page",
    SelectLessorList: "/api/v1/lease/partner/lessor/page",
    SelectLesseeProjectList: "/api/v1/lease/project/lessee/contract/use/page",
    ContractPriceAddSettleTime: '/api/v1/lease/settlement/start/time/get',
    SelectLeaseGoodsList: '/api/v1/lease/goods/usable/page',
    ContractPriceAddRate: '/api/v1/lease/service/item/user/get',
    SelectCuttingLesseeBeforeGoodsList: '/api/v1/lease/goods/lessee/page',
    SelectCuttingLesseeAfterGoodsList: '/api/v1/lease/goods/same/spu/surplus/sku/list',
}
