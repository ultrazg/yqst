import ApiConst from '../../base/urls/ApiConst';
import FetchUtil from '../../base/network/FetchUtil';
import ShopParams from './PublicModule/ShopParams/ShopParams';
import AllUsePort from './PublicModule/AllUsePort/AllUsePort';
import PublicParams from '../../base/publicparams/PublicParams'
import ApiInterface from './PublicModule/AllUsePort/AllUsePort'


let Model = {
	/*
	* 图片下载
	* */


	DownloadFile(pa, callback, error) {
		ShopParams((params) => {
			params = {
				...params,
				...pa,
			};
			FetchUtil.downloadImage(
				ApiConst.Versions().sunaw + AllUsePort.DownloadFile,
				params,
				callback,
				error,
				{headers: {"Content-Type": 'application/json;charset=UTF-8'}}
			);
		});
	},

	AutoLogin(pa, callback, error) {
		ShopParams((params) => {
			params = {
				...params,
				...pa,
			};
			FetchUtil.fetchPostJson(
				ApiConst.Versions().sunaw + AllUsePort.ShopPage,
				params,
				callback,
				error,
				{headers: {"Content-Type": 'application/json;charset=UTF-8'}}
			);
		});
	},

	/*
	* 产品接口
	* */
	sellerGoodsPage(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		}
		FetchUtil.fetchPostJson(
			ApiConst.Versions().sunaw + ApiInterface.sellerGoodsPage,
			params,
			callback,
			error,
			{headers: {"Content-Type": 'application/json;charset=UTF-8'}}
		);
	},

	sellerGoodsAdd(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		}
		FetchUtil.fetchPostJson(
			ApiConst.Versions().sunaw + ApiInterface.sellerGoodsAdd,
			params,
			callback,
			error,
			{headers: {"Content-Type": 'application/json;charset=UTF-8'}}
		);
	},
	sellerGoodsUpdate(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		}
		FetchUtil.fetchPostJson(
			ApiConst.Versions().sunaw + ApiInterface.sellerGoodsUpdate,
			params,
			callback,
			error,
			{headers: {"Content-Type": 'application/json;charset=UTF-8'}}
		);
	},
	sellerGoodsDel(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		}
		FetchUtil.fetchPostJson(
			ApiConst.Versions().sunaw + ApiInterface.sellerGoodsDel,
			params,
			callback,
			error,
			{headers: {"Content-Type": 'application/json;charset=UTF-8'}}
		);
	},
	sellerGoodsBatchDel(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		}
		FetchUtil.fetchPostJson(
			ApiConst.Versions().sunaw + ApiInterface.sellerGoodsBatchDel,
			params,
			callback,
			error,
			{headers: {"Content-Type": 'application/json;charset=UTF-8'}}
		);
	},
	sellerGoodsEnable(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		}
		FetchUtil.fetchPostJson(
			ApiConst.Versions().sunaw + ApiInterface.sellerGoodsEnable,
			params,
			callback,
			error,
			{headers: {"Content-Type": 'application/json;charset=UTF-8'}}
		);
	},
	sellerGoodsGet(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		}
		FetchUtil.fetchPostJson(
			ApiConst.Versions().sunaw + ApiInterface.sellerGoodsGet,
			params,
			callback,
			error,
			{headers: {"Content-Type": 'application/json;charset=UTF-8'}}
		);
	},

	/*
	* 产品类别
	* */

	sellerCategoryList(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		}
		FetchUtil.fetchPostJson(
			ApiConst.Versions().sunaw + ApiInterface.sellerCategoryList,
			params,
			callback,
			error,
			{headers: {"Content-Type": 'application/json;charset=UTF-8'}}
		);
	},

	sellerCategorySave(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		}
		FetchUtil.fetchPostJson(
			ApiConst.Versions().sunaw + ApiInterface.sellerCategorySave,
			params,
			callback,
			error,
			{headers: {"Content-Type": 'application/json;charset=UTF-8'}}
		);
	},
	sellerCategoryDelete(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		}
		FetchUtil.fetchPostJson(
			ApiConst.Versions().sunaw + ApiInterface.sellerCategoryDelete,
			params,
			callback,
			error,
			{headers: {"Content-Type": 'application/json;charset=UTF-8'}}
		);
	},
	/*
	* 商品接口
	* */

	shopGoodsPage(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		}
		FetchUtil.fetchPostJson(
			ApiConst.Versions().sunaw + ApiInterface.shopGoodsPage,
			params,
			callback,
			error,
			{headers: {"Content-Type": 'application/json;charset=UTF-8'}}
		);
	},
	shopGoodsDelete(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		}
		FetchUtil.fetchPostJson(
			ApiConst.Versions().sunaw + ApiInterface.shopGoodsDelete,
			params,
			callback,
			error,
			{headers: {"Content-Type": 'application/json;charset=UTF-8'}}
		);
	},
	shopGoodsBatchDelete(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		}
		FetchUtil.fetchPostJson(
			ApiConst.Versions().sunaw + ApiInterface.shopGoodsBatchDelete,
			params,
			callback,
			error,
			{headers: {"Content-Type": 'application/json;charset=UTF-8'}}
		);
	},
	shopGoodsGet(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		}
		FetchUtil.fetchPostJson(
			ApiConst.Versions().sunaw + ApiInterface.shopGoodsGet,
			params,
			callback,
			error,
			{headers: {"Content-Type": 'application/json;charset=UTF-8'}}
		);
	},
	shopGoodsUpdate(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		}
		FetchUtil.fetchPostJson(
			ApiConst.Versions().sunaw + ApiInterface.shopGoodsUpdate,
			params,
			callback,
			error,
			{headers: {"Content-Type": 'application/json;charset=UTF-8'}}
		);
	},
	shopGoodsAdd(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		}
		FetchUtil.fetchPostJson(
			ApiConst.Versions().sunaw + ApiInterface.shopGoodsAdd,
			params,
			callback,
			error,
			{headers: {"Content-Type": 'application/json;charset=UTF-8'}}
		);
	},
	shopGoodsPublish(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		}
		FetchUtil.fetchPostJson(
			ApiConst.Versions().sunaw + ApiInterface.shopGoodsPublish,
			params,
			callback,
			error,
			{headers: {"Content-Type": 'application/json;charset=UTF-8'}}
		);
	},
	shopGoodsStatusBatchUpdate(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		}
		FetchUtil.loadingTitle = 'undefined'
		FetchUtil.fetchPostJson(
			ApiConst.Versions().sunaw + ApiInterface.shopGoodsStatusBatchUpdate,
			params,
			callback,
			error,
			{headers: {"Content-Type": 'application/json;charset=UTF-8'}}
		);
	},
	shopGoodsStatusUpdate(params, callback, error) {
		console.log(params)
		params = {
			...PublicParams(),
			...params
		}
		FetchUtil.loadingTitle = 'undefined'
		FetchUtil.fetchPostJson(
			ApiConst.Versions().sunaw + ApiInterface.shopGoodsStatusUpdate,
			params,
			callback,
			error,
			{headers: {"Content-Type": 'application/json;charset=UTF-8'}}
		);
	},
	shopGoodsSkuIsChange(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		}
		FetchUtil.loadingTitle = 'undefined'
		FetchUtil.fetchPostJson(
			ApiConst.Versions().sunaw + ApiInterface.shopGoodsSkuIsChange,
			params,
			callback,
			error,
			{headers: {"Content-Type": 'application/json;charset=UTF-8'}}
		);
	},
	/*
	* 商品分类
	* */
	goodsCatList(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		}
		FetchUtil.fetchPostJson(
			ApiConst.Versions().sunaw + ApiInterface.goodsCatList,
			params,
			callback,
			error,
			{headers: {"Content-Type": 'application/json;charset=UTF-8'}}
		);
	},

	/*
	* 商品标签
	* */
	shopTagList(params, callback, error) {
		params = {
			...PublicParams(),
			...params
		}
		FetchUtil.fetchPostJson(
			ApiConst.Versions().sunaw + ApiInterface.shopTagList,
			params,
			callback,
			error,
			{headers: {"Content-Type": 'application/json;charset=UTF-8'}}
		);
	},
};
export default Model;
