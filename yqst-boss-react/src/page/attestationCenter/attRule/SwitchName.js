/**
 * Created by yb on 2019/10/31
 */

const SwitchName = {
	// 状态
	status: (status) => {
		let name = '';
		switch (status + '') {
			case '1':
				name = '关闭中';
				break;

			case '2':
				name = '启用中';
				break;

			default:
				break;
		}

		return name;
	},

	// 前置条件
	isPre: (status) => {
		let name = '';
		switch (status + '') {
			case '0':
				name = '否';
				break;

			case '1':
				name = '是';
				break;

			default:
				break;
		}

		return name;
	},

	// 是否多次认证
	isApprove: (status) => {
		let name = '';
		switch (status + '') {
			case '0':
				name = '否';
				break;

			case '1':
				name = '是';
				break;

			default:
				break;
		}

		return name;
	},

	// 是否接口验证
	isVerify: (status) => {
		let name = '';
		switch (status + '') {
			case '0':
				name = '否';
				break;

			case '1':
				name = '是';
				break;

			default:
				break;
		}

		return name;
	},

	// 是否显示
	isDisplay: (status) => {
		let name = '';
		switch (status + '') {
			case '0':
				name = '否';
				break;

			case '1':
				name = '是';
				break;

			default:
				break;
		}

		return name;
	},

	// 是否必填
	isRequired: (status) => {
		let name = '';
		switch (status + '') {
			case '0':
				name = '否';
				break;

			case '1':
				name = '是';
				break;

			default:
				break;
		}

		return name;
	},

	// 是否自动填写
	isAutoWrite: (status) => {
		let name = '';
		switch (status + '') {
			case '0':
				name = '否';
				break;

			case '1':
				name = '是';
				break;

			default:
				break;
		}

		return name;
	},

	// 资质类型
	docType: (status) => {
		let name = '';
		switch (status + '') {
			case '1':
				name = '文本';
				break;

			case '2':
				name = '图片';
				break;

			case '3':
				name = '时间点';
				break;

			case '4':
				name = '时间区间';
				break;

			case '5':
				name = '地址';
				break;

			case '6':
				name = '附件';
				break;
			case '7':
				name = '选项';
				break;
			default:
				break;
		}

		return name;
	},


	// 认证组类型
	type: (status) => {
		let name = '';
		switch (status + '') {
			case '1':
				name = '企业实名认证';
				break;

			case '3':
				name = '个人实名认证';
				break;

			case '2':
				name = '云服务主认证';
				break;

			case '4':
				name = '云服务子模块认证';
				break;

			default:
				break;
		}

		return name;
	},
};

export default SwitchName
