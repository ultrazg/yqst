import {gk_10, gk_01, dd_10, dd_01, hw_01, hw_10, fp_01, fp_10, ys_10, ys_01,
	sh_01, sh_10, jy_01, jy_10, ht_01, ht_10, sp_01, sp_10, yg_01, yg_10, pz_01, pz_10, kh_01, kh_10} from '../../../resource';


const PaMenuData = () => {
	return [
		{
			title: '概况',
			key: 'PaGeneralPage',
			url: '/pages/appCenter/purchasingAssistant/paIndex/PaGeneralPage',
			logo: gk_01,
			hoverLogo: gk_10,
			sideMenu: [],
		},
		{
			title: '订单管理',
			logo: dd_01,
			hoverLogo: dd_10,
			key: 'paOrder',
			sideMenu: [
				{
					title: '订单管理列表',
					key: 'paOrderList',
					// url: '/pages/appCenter/sellAssistant/terminalPage/saOrder/saOrderList',
				},
			]
		},
		{
			title: '货物管理',
			logo: hw_01,
			hoverLogo: hw_10,
			key: 'paGoods',
			sideMenu: [
				{
					title: '货物管理列表',
					key: 'paGoodsList',
					// url: '/pages/appCenter/sellAssistant/terminalPage/saGoods/saGoodsList',
				},
			]
		},
		{
			title: '运输管理',
			logo: ys_01,
			hoverLogo: ys_10,
			key: 'paTransport',
			sideMenu: [
				{
					title: '运输管理列表',
					key: 'paTransportList',
					// url: '/pages/appCenter/sellAssistant/terminalPage/saTransport/saTransportList',
				},
			]
		},
		{
			title: '发票管理',
			logo: fp_01,
			hoverLogo: fp_10,
			key: 'paInvoice',
			sideMenu: [
				{
					title: '发票管理列表',
					key: 'paInvoiceList',
					// url: '/pages/appCenter/sellAssistant/terminalPage/saInvoice/saInvoiceList',
				},
			]
		},
		{
			title: '售后管理',
			logo: sh_01,
			hoverLogo: sh_10,
			key: 'paAfterSale',
			sideMenu: [
				{
					title: '售后管理列表',
					key: 'paAfterSaleList',
					// url: '/pages/appCenter/sellAssistant/terminalPage/saAfterSale/saAfterSaleList',
				},
			]
		},
		{
			title: '交易单管理',
			logo: jy_01,
			hoverLogo: jy_10,
			key: 'paTransaction',
			sideMenu: [
				{
					title: '交易单列表',
					key: 'paTransactionList',
					// url: '/pages/appCenter/sellAssistant/terminalPage/saTransaction/saTransactionList',
				},
			]
		},
		{
			title: '合同管理',
			logo: dd_01,
			hoverLogo: dd_10,
			key: 'PaContractTemplate',
			sideMenu: [
				{
					title: '合同模板',
					key: 'PaContractTemplateList',
					url: '/pages/appCenter/purchasingAssistant/paIndex/PaContractTemplate/PaContractTemplateList',
					childKeys: ['/pages/appCenter/purchasingAssistant/paIndex/PaContractTemplate/PaContractTemplateDetail']
				},
				{
					title: '合同模板类型',
					key: 'PaContractTemplateTypeList',
					url: '/pages/appCenter/purchasingAssistant/paIndex/PaContractTemplate/PaContractTemplateTypeList',
					childKeys: ['/pages/appCenter/purchasingAssistant/paIndex/PaContractTemplate/PaContractTemplateTypeDetail']
				},
			]
		},
		{
			title: '商品管理',
			logo: sp_01,
			hoverLogo: sp_10,
			key: 'paCommodityManage',
			sideMenu: [
				{
					title: '商品列表',
					key: 'paCommodity',
					// url: '/pages/appCenter/sellAssistant/terminalPage/saCommodity/saComList',
				},
				{
					title: '商品分类列表',
					key: 'paComClassify',
					// url: '/pages/appCenter/sellAssistant/terminalPage/saComClassify/saComClaList',
				},
				{
					title: '商品标签',
					key: 'paComLabel',
					// url: '/pages/appCenter/sellAssistant/terminalPage/saComLabel/saComLabList',
				},
			]
		},
		{
			title: '客户管理',
			logo: kh_01,
			hoverLogo: kh_10,
			key: 'paCustom',
			sideMenu: [
				{
					title: '客户列表',
					key: 'paCustomList',
					// url: '/pages/appCenter/sellAssistant/terminalPage/saCustom/saCustomList',
				},
			]
		},
		{
			title: '员工管理',
			logo: yg_01,
			hoverLogo: yg_10,
			key: 'paStaff',
			sideMenu: [
				{
					title: '员工列表',
					key: 'paStaffList',
					// url: '/pages/appCenter/sellAssistant/terminalPage/saStaff/saStaffList',
				},
			]
		},
		{
			title: '交易配置',
			logo: pz_01,
			hoverLogo: pz_10,
			key: 'paDeal',
			sideMenu: [
				{
					title: '交易配置',
					key: 'paDealList',
					// url: '/pages/appCenter/sellAssistant/terminalPage/saDeal/saDealList',
				},
			]
		},
	];
};

export default PaMenuData;
