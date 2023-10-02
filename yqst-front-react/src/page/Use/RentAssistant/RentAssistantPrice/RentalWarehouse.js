import React, {Component} from 'react';
import {Button, Input, DatePicker, Checkbox, Pagination, message, Tooltip} from 'antd';
import RentStyle from './Rent.module.css';
import RentModel from "../RentModel";
import {deepClone} from '../unit';

const {RangePicker } = DatePicker;

export default class RentalWarehouse extends Component {
	constructor(props) {
		super(props);
		this.state = {
			keyWord: '',
			rangeDate: [],
			startTime: '',
			endTime: '',
			page: 1,
			pageSize: 3,
			total: 0,
			selectedArr: [],
			list: [],
		};
	}

	componentDidMount() {
		this.getList();
		const {selectedArr} = this.props.location.state || {};
		if (selectedArr){
			this.setState({
				selectedArr
			})
		}
	}

	getList = ()=>{
		const {page, pageSize, keyWord, startTime, endTime} = this.state;
		RentModel.RentAsstGoodList({
			current: page,
			pageSize,
			keyWord,
			startTime,
			endTime,
			listType: 1
		}, res=>{
			const {records, total} = res.data;
			this.setState({
				list: records,
				total
			})
		})
	}

	render() {
		return (
			<>
				{this.makeHeaderView()}

				<div style={{
					width: '100%',
					backgroundColor: '#fff',
					marginTop: 25,
					borderRadius: 6,
					padding: 24
				}}>
					<p style={{color: '#2B3441', fontSize: 15}}>搜索</p>
					{this.makeSearchView()}
					{this.makeTableView()}
					{this.makePaginationView()}
				</div>

			</>
		)
	}

	makeHeaderView = ()=>{
		return(
			<div style={{
				width: '100%',
				height: '119px',
				borderRadius: 6,
				backgroundColor: '#fff',
				boxSizing: 'border-box',
				padding: '22px 32px',
				color: '#2B3441'
			}}>
				<p style={{fontSize: 15, color: 'rgba(44, 52, 64, 0.25)'}}>
					出租助手 / 租赁价格 /
					<span style={{color: '#2B3441'}}> 租赁物资库</span>
				</p>
				<p style={{marginTop: 18, fontSize: 24}}>租赁物资库</p>
			</div>
		)
	}

	makeSearchView = () => {
		const {keyWord, rangeDate} = this.state;
		return (
			<div style={{display: 'flex', alignItems: 'center', padding: '10px 0'}}>
				<label style={{fontSize: 14, fontWeight: 500, lineHeight: '20px', marginRight: 8}}>
					关键词 :
				</label>
				<Input
					className='sw-searchInput'
					style={{width: 272, height: 40}}
					value={keyWord}
					placeholder={'请输入关键字'}
					maxLength={50}
					onChange={e => {
						this.setState({
							keyWord: e.target.value
						})
					}}
					onKeyDown={e => {
						if (e.keyCode === 13) {
							this.getList()
						}
					}}
				/>

				<label style={{fontSize: 14, fontWeight: 500, lineHeight: '20px', margin: '0 8px 0 15px'}}>
					时间 :
				</label>
				<RangePicker
					className='sw-searchInput'
					style={{width: 272, height: 40}}
					value={rangeDate}
					onChange={(date, dateString)=>{
						this.setState({
							rangeDate: date,
							startTime: dateString[0],
							endTime: dateString[1]
						})
					}}
				/>

				<Button
					type="primary"
					style={{marginLeft: 16, width: 80, height: 40, fontSize: 16, verticalAlign: 'bottom', borderRadius: 6}}
					onClick={()=>{
						this.setState({
							page: 1
						}, ()=>{
							this.getList()
						})
					}}
				>
					搜索
				</Button>
				<Button
					style={{
						marginLeft: 16,
						width: 80,
						height: 40,
						fontSize: 16,
						verticalAlign: 'bottom',
						borderRadius: 6
					}}
					onClick={() => this.setState({
						keyWord: '',
						startTime: '',
						endTime: '',
						rangeDate: []
					})}
				>
					重置
				</Button>
			</div>
		)
	}

	makeTableView = ()=> {
		const {list} = this.state;
		return(
			<div style={{width: '100%', marginTop: 15}}>
				{/* 表头 */}
				<div style={{display: 'flex', minHeight: 56, backgroundColor: '#F1F1FA', borderRadius: 6, fontSize: 14, color: '#2B3441', alignItems: 'center', justifyContent: 'center'}}>
					<div style={{flex: 0.5}} className={RentStyle.policyTabelItem}>
						<Checkbox checked={this.checkCurrentPageIsSelected()} onChange={(e)=>{
							this.selectAllSpuForCurrentPage(e.target.checked);
						}}/>
					</div>
					<div style={{flex: 1.8}} className={RentStyle.policyTabelItem}>物资名称</div>
					<div style={{flex: 1}} className={RentStyle.policyTabelItem}>SKU</div>
					<div style={{flex: 1.3}} className={RentStyle.policyTabelItem}>规格</div>
					<div style={{flex: 1}} className={RentStyle.policyTabelItem}>计费单位</div>
					<div style={{flex: 0.75}} className={RentStyle.policyTabelItem}>计费周期</div>
					<div style={{flex: 1}} className={RentStyle.policyTabelItem}>统一价/元（含税）</div>
					<div style={{flex: 1}} className={RentStyle.policyTabelItem}>创建时间</div>
					<div style={{flex: 0.5}} className={RentStyle.policyTabelItem}>选择</div>
				</div>

				{/* 表数据展示 */}
				{
					list && list.map((item)=> (
						<div style={{display: 'flex', fontSize: 14, color: '#2B3441'}} key={item.leaseGoodsParentSn}>
							<div style={{flex: 0.5, borderLeft: '1px solid #EBEDF0', borderRight: 'none', alignItems: 'flex-start'}} className={RentStyle.policyTabelItem}>
								<Checkbox style={{marginTop: 30}} checked={this.checkSpuIsSelect(item.leaseGoodsParentSn)} onChange={(e)=>{
									this.selectAllSku(item.leaseGoodsParentSn, e.target.checked)
								}}/>
							</div>

							<div style={{flex: 1.8, borderBottom: '1px solid #EBEDF0', borderRight: '1px solid #EBEDF0'}}>
								<div style={{display: 'flex', boxSizing: "border-box", paddingTop: 10}}>
									<img style={{width: 62, height: 62, borderRadius: 6}} src={item.goodsImageUrl} alt=''/>
									<div style={{display: 'flex', flexDirection: "column", justifyContent: 'space-between', maxWidth: 'calc(100% - 62px)' }}>
										<Tooltip title={item.goodsName} color={'rgba(0, 0, 0, 0.6)'}>
											<p className={RentStyle.desc} style={{color: '#4481EB', marginLeft: 10}}>
												{item.goodsName}
											</p>
										</Tooltip>
										<span style={{fontSize: 12, color: '#2B3441', marginLeft: 10}}>{item.goodsCode}</span>
									</div>
								</div>
							</div>
							<div style={{flex: 6.5}}>
								{
									item.skuList && item.skuList.map((skuItem, skuIndex)=>(
										<div style={{display: 'flex'}} key={skuItem.leaseGoodsSn}>
											<div style={{flex: 1, height: 108, borderBottom: '1px solid #EBEDF0', flexDirection: 'column'}} className={RentStyle.policyTabelItem}>
												<img style={{width: 62, height: 62, borderRadius: 6}} src={skuItem.goodsImageUrl} alt=''/>
												<span style={{fontSize: 12, color: '#2B3441', display: "block", width: 62, textAlign: 'center'}}>
													{skuItem.goodsCode}
												</span>
											</div>
											<div style={{flex: 1.3, height: 108, borderBottom: '1px solid #EBEDF0', flexDirection: 'column'}} className={RentStyle.policyTabelItem}>
												<Tooltip title={(
													<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
														{
															skuItem.specList && skuItem.specList.map((spec)=>(
																<span style={{display: "inline-block", width: '100%'}} key={spec.specName}>
																	{spec.specName}: {spec.specValue}
																</span>
															))
														}
													</div>
												)} color={'rgba(0, 0, 0, 0.6)'}>
													<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', cursor: "pointer"}}>
														{skuItem.specList.length}个规格
													</div>
												</Tooltip>
											</div>
											<div style={{flex: 1, height: 108, borderBottom: '1px solid #EBEDF0'}} className={RentStyle.policyTabelItem}>
												{skuItem.chargeUnit}
											</div>
											<div style={{flex: 0.75, height: 108, borderBottom: '1px solid #EBEDF0'}} className={RentStyle.policyTabelItem}>
												{skuItem.timeUnit}
											</div>
											<div style={{flex: 1, height: 108, borderBottom: '1px solid #EBEDF0', width: `${parseFloat(1 / 8.85 * 100)}%`}} className={RentStyle.policyTabelItem}>
												<p style={{width: '90%', overflowWrap: 'break-word', textAlign: 'center', margin: 0}}>
													{skuItem.unitPrice}
												</p>
											</div>
											<div style={{flex: 1, height: 108, borderBottom: '1px solid #EBEDF0', textAlign: 'center'}} className={RentStyle.policyTabelItem}>
												{item.createTime}
											</div>
											<div style={{flex: 0.5, height: 108, borderBottom: '1px solid #EBEDF0'}} className={RentStyle.policyTabelItem}>
												<Checkbox checked={this.checkIsSelected(item, skuItem).haveSkuInfo} onChange={(e)=>{
													this.pushOrDeleteSku(item, skuItem);
												}}/>
											</div>
										</div>
									))
								}

							</div>
						</div>
					))
				}
				{/*无数据提示*/}
				{
					(list && list.length === 0) && (
						<div style={{
							height: 300,
							border: '2px solid rgba(43, 52, 65, 0.06)',
							borderTop: null,
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							fontSize: 18,
							color: 'rgba(43, 52, 65, 0.5)'
						}}>
							暂无数据
						</div>
					)
				}
			</div>
		)
	}

	// 分页
	makePaginationView = ()=>{
		const {page, pageSize, total} = this.state;
		return(
			<div style={{display: 'flex', justifyContent: "space-between", marginTop: 15, height: 60, alignItems: 'center'}}>
				<Button type="primary" style={{width: 72, height: 36, borderRadius: 3}} onClick={()=>{
					const state = this.props.location.state || {};
					const {selectedArr} = this.state;
					const list = selectedArr.filter(item=>{
						return item.skuList.length
					})
					if(list.length === 0){
						return message.error('请选择物资')
					}
					this.props.history.replace({
						pathname: `/pages/appCenter/rentAssistant/rentAssistantHome/rentalPricePolicyAdd/${state.pricePolicySn || 0}`,
						state: {...state, selectedArr: list}
					})
				}}>确认</Button>
				<Pagination
					current={page}
					pageSize={pageSize}
					total={total}
					onChange={(page)=>{
						this.setState({
							page
						}, ()=>{
							this.getList();
						})
					}}
					showSizeChanger={false}
				/>
			</div>
		)
	}

	// 检查是否为选中状态
	checkIsSelected = (leaseGoodsParentInfo, skuInfo)=>{
		const {selectedArr} = this.state;
		const {leaseGoodsParentSn} = leaseGoodsParentInfo;
		const {leaseGoodsSn} = skuInfo;
		let haveGoodInfo = false;
		let haveSkuInfo = false;
		outer: for(let i=0; i<selectedArr.length; i++){
			// 存在父类
			if(selectedArr[i].leaseGoodsParentSn === leaseGoodsParentSn){
				haveGoodInfo = true;
				let {skuList} = selectedArr[i];
				for(let k=0; k<skuList.length; k++){
					// 对应sku已选中
					if(skuList[k].leaseGoodsSn === leaseGoodsSn){
						haveSkuInfo = true;
						break outer;
					}
				}
			}
		}
		return { haveGoodInfo, haveSkuInfo };
	}

	// 添加或删除 sku
	pushOrDeleteSku(leaseGoodsParentInfo, skuInfo){
		let {haveGoodInfo, haveSkuInfo} = this.checkIsSelected(leaseGoodsParentInfo, skuInfo);
		const {selectedArr} = this.state;
		const {leaseGoodsParentSn} = leaseGoodsParentInfo;
		const {leaseGoodsSn} = skuInfo;
		// 父信息存在
		if(haveGoodInfo){
			outer: for(let i=0; i<selectedArr.length; i++){
				if(selectedArr[i].leaseGoodsParentSn === leaseGoodsParentSn){
					let {skuList} = selectedArr[i];
					// 存在sku信息
					if(haveSkuInfo){
						for(let k=0; k<skuList.length; k++){
							// 对应sku已选中
							if(skuList[k].leaseGoodsSn === leaseGoodsSn){
								selectedArr[i].skuList.splice(k, 1);
								break outer;
							}
						}
					}else {
						skuList.push(skuInfo);
						break;
					}


				}
			}

		}else {
			let data = {...leaseGoodsParentInfo};
			data.skuList = [skuInfo];
			selectedArr.push(data)
		}

		this.setState({
			selectedArr
		})
	}

	// spu下 sku 全选/ 全不选
	selectAllSku = (leaseGoodsParentSn, flag)=>{
		const {selectedArr, list} = this.state;
		let spu = [];
		const snArr = [];
		selectedArr.forEach(item=>{
			snArr.push(item.leaseGoodsParentSn);
		})
		const index = snArr.indexOf(leaseGoodsParentSn);
		if(flag){
			for(let i=0; i<list.length; i++){
				if(list[i].leaseGoodsParentSn === leaseGoodsParentSn){
					spu = list[i];
					break;
				}
			}
			if(index !== -1){
				selectedArr[index] = spu;
			}else {
				selectedArr.push(spu)
			}
		}else {
			selectedArr.splice(index, 1)
		}

		this.setState({
			selectedArr: deepClone(selectedArr)
		})

	}

	// 检查 spu 下的 sku是否全选
	checkSpuIsSelect = (leaseGoodsParentSn)=>{
		const {selectedArr, list} = this.state;
		let selectedSkuLength = 0;
		let listSkuLength = 0;
		for(let i=0; i<list.length; i++){
			if(list[i].leaseGoodsParentSn === leaseGoodsParentSn){
				listSkuLength = list[i].skuList.length;
				break;
			}
		}

		for(let i=0; i<selectedArr.length; i++){
			if(selectedArr[i].leaseGoodsParentSn === leaseGoodsParentSn){
				selectedSkuLength = selectedArr[i].skuList.length;
				break;
			}
		}

		return selectedSkuLength === listSkuLength;

	}

	// 全选/全不选 当前页
	selectAllSpuForCurrentPage = (flag)=>{
		const {selectedArr, list} = this.state;
		// selectedArr 中存在就删除再重新赋值
		list.forEach(item =>{
			const {leaseGoodsParentSn} = item;
			for(let i=0; i<selectedArr.length; i++){
				if(selectedArr[i].leaseGoodsParentSn === leaseGoodsParentSn){
					selectedArr.splice(i, 1);
					break;
				}
			}
			flag && selectedArr.push(item);
		})

		this.setState({
			selectedArr: deepClone(selectedArr)
		})
	}

	// 检查当前页是否全选
	checkCurrentPageIsSelected = ()=> {
		const {selectedArr, list} = this.state;
		let flag = true;
		outer: for(let i=0; i<list.length; i++){
			let haveFlag = false;
			for(let k=0; k<selectedArr.length; k++){
				if(list[i].leaseGoodsParentSn === selectedArr[k].leaseGoodsParentSn){
					haveFlag = true;
					if(list[i].skuList.length !== selectedArr[k].skuList.length){
						flag = false;
						break outer;
					}
				}
			}

			if(!haveFlag){
				flag = false;
				break outer;
			}
		}

		return flag;
	}

}
