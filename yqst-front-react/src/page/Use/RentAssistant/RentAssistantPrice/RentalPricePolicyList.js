import React, {Component} from 'react';
import {Button, Checkbox, DatePicker, Input, message, Modal, Pagination, Select, Tooltip} from "antd";
import RentStyle from './Rent.module.css';
import RentModel from "../RentModel";

const {RangePicker } = DatePicker;
const {Option} = Select;

export default class RentalPricePolicyList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page: 1,
			pageSize: 10,
			total: 0,
			keyWord: '',
			rangeDate: [],
			startTime: '',
			endTime: '',
			policyStatus: 0,
			policyType: 0,
			policyList: [],
			selectedSnArr: [],
		};
	}

	componentDidMount() {
		this.getList();
	}

	getList = ()=>{
		const {keyWord, startTime, endTime, page, pageSize, policyType, policyStatus} = this.state;
		RentModel.RentAsstPolicyList({
			current: page,
			pageSize,
			startTime,
			endTime,
			keyWord,
			pricePolicyType: policyType,
			listType: policyStatus
		}, res=>{
			const {records, total} = res.data;
			this.setState({
				policyList: records,
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
					{this.makeSearchView()}
					{this.makeTableView()}
					{this.makePaginationView()}
				</div>


			</>
		)
	}

	makeHeaderView = ()=> {
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
					<span style={{color: '#2B3441'}}> 租赁价格政策列表</span>
				</p>
				<p style={{marginTop: 18, fontSize: 24}}>租赁价格政策列表</p>
			</div>
		)
	}

	makeSearchView = ()=>{
		const {keyWord, rangeDate, policyStatus, policyType} = this.state;
		return(
			<>
				<p style={{color: 'rgba(43, 52, 65, 1)', fontSize: 14, fontWeight: "bold"}}>搜索</p>
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
							this.setState({keyWord: e.target.value})
						}}
						onKeyDown={e => {
							if (e.keyCode === 13) this.getList()
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
						style={{marginLeft: 16, width: 80, height: 40, fontSize: 16, borderRadius: 3}}
						onClick={()=>{
							this.setState({
								page: 1
							}, ()=>{
								this.getList();
							})
						}}
					>
						搜索
					</Button>
					<Button
						style={{marginLeft: 16, width: 80, height: 40, fontSize: 16, borderRadius: 3}}
						onClick={() => this.setState({
							keyWord: '',
							startTime: '',
							endTime: 0,
							rangeDate: [],
							policyStatus: 0,
							policyType: 0
						})}
					>
						重置
					</Button>
				</div>
				<div style={{display: "flex", marginTop: 10, alignItems: 'center'}}>
					<Button
						type="primary"
						style={{width: 180, height: 40, fontSize: 16, borderRadius: 3}}
						onClick={()=>{
							this.props.history.replace('/pages/appCenter/rentAssistant/rentAssistantHome/rentalPricePolicyAdd/0')
						}}
					>
						创建租赁价格政策
					</Button>

					<Button
						style={{marginLeft: 25, width: 80, height: 40, fontSize: 16, borderRadius: 3}}
						onClick={() => {
							this.policyDeleteForMultiSelect();
						}}
					>
						删除
					</Button>

					<Select value={policyStatus} style={{ width: 126, marginLeft: 25 }} onChange={(value)=>{
						this.setState({
							policyStatus: value
						})
					}}>
						<Option value={0}>全部状态</Option>
						<Option value={1}>待提交</Option>
						<Option value={2}>待启用</Option>
						<Option value={3}>待执行</Option>
						<Option value={4}>执行中</Option>
						<Option value={5}>已停用</Option>
						<Option value={6}>已失效</Option>
					</Select>

					<Select value={policyType} style={{ width: 126, marginLeft: 25  }} onChange={(value)=>{
						this.setState({
							policyType: value
						})
					}}>
						<Option value={0}>全部类型</Option>
						<Option value={1}>通用价格</Option>
						<Option value={2}>特殊价格</Option>
						<Option value={3}>促销价格</Option>
					</Select>

				</div>
			</>
		)
	}

	makeTableView = ()=>{
		const {policyList, selectedSnArr} = this.state;
		return(
			<>
				{/* 表头 */}
				<div style={{display: 'flex', minHeight: 56, backgroundColor: '#F1F1FA', borderRadius: 6, fontSize: 14, color: '#2B3441', alignItems: 'center', marginTop: 25}}>
					<div style={{flex: 0.3, display: "flex", justifyContent: 'center', alignItems: 'center'}}>
						<Checkbox checked={this.checkIsAllSeletedInCurrentPage()} onChange={e=>{
							this.selectedAllForCurrentPage(e.target.checked)
						}}/>
					</div>
					<div style={{flex: 1}} className={RentStyle.policyTabelItem}>价格政策编码</div>
					<div style={{flex: 1.25}} className={RentStyle.policyTabelItem}>价格政策名称</div>
					<div style={{flex: 1}} className={RentStyle.policyTabelItem}>价格政策类型</div>
					<div style={{flex: 1}} className={RentStyle.policyTabelItem}>面向客户</div>
					<div style={{flex: 1}} className={RentStyle.policyTabelItem}>面向项目</div>
					<div style={{flex: 0.6}} className={RentStyle.policyTabelItem}>状态</div>
					<div style={{flex: 1}} className={RentStyle.policyTabelItem}>有效时间</div>
					<div style={{flex: 1}} className={RentStyle.policyTabelItem}>创建时间</div>
					<div style={{flex: 1.5}} className={RentStyle.policyTabelItem}>操作</div>
				</div>
				{/* 表单内容 */}
				{
					policyList && policyList.map((item, index)=>{
						return(
							<div key={item.pricePolicySn} style={{minHeight: 66, backgroundColor: index % 2 === 0 ? '#fff' : 'rgba(249, 249, 251, 1)', display: 'flex', alignItems: 'center', padding: '10px 0'}}>
								<div style={{flex: 0.3, border: 'none'}} className={RentStyle.policyTabelItem}>
									<Checkbox checked={selectedSnArr.indexOf(item.pricePolicySn) !== -1} onChange={()=>{
										this.selectedPolicy(item.pricePolicySn)
									}}/>
								</div>
								<div style={{flex: 1, border: 'none', width: `${parseFloat(1/9.65 * 100)}%`, overflowWrap: 'break-word',}} className={RentStyle.policyTabelItem}>
									<p style={{width: '90%', overflowWrap: 'break-word', textAlign: 'center', margin: 0}}>
										{item.pricePolicySn}
									</p>
								</div>
								<div style={{flex: 1.25, border: 'none'}} className={RentStyle.policyTabelItem}>
									{item.pricePolicyName}
								</div>
								<div style={{flex: 1, border: 'none'}} className={RentStyle.policyTabelItem}>
									{(type=>{
										switch (type){
											case 1:
												return '通用价格'
											case 2:
												return '特殊价格'
											case 3:
												return '促销价格'
											default:
												return ''
										}
									})(item.pricePolicyType)}
								</div>
								<div style={{flex: 1, border: 'none'}} className={RentStyle.policyTabelItem}>
									{
										item.isAllCustomer ? (
											<span>全部客户</span>
										) : (
											<Tooltip color={'#fff'} title={(
												<div style={{color: '#2B3441'}}>
													{
														item.customerList && item.customerList.map(c=>(
															<p key={c.lesseeSn}>{c.lesseeName}</p>
														))
													}
												</div>
											)}>
												<span style={{cursor: "pointer"}}>
													{item.customerList.length}个客户
												</span>
											</Tooltip >
										)
									}
								</div>
								<div style={{flex: 1, border: 'none'}} className={RentStyle.policyTabelItem}>
									{
										item.isAllProject ? (
											<span>全部项目</span>
										) : (
											<Tooltip color={'#fff'} title={(
												<div style={{color: '#2B3441'}}>
													{
														item.projectList && item.projectList.map(p=>(
															<p key={p.projectSn}>{p.projectName}</p>
														))
													}
												</div>
											)}>
												<span style={{cursor: "pointer"}}>{item.projectList.length}个项目</span>
											</Tooltip >
										)
									}

								</div>
								<div style={{flex: 0.6, border: 'none'}} className={RentStyle.policyTabelItem}>
									{
										(status=>{
											switch (status) {
												case 1:
													return '待提交'
												case 2:
													return '待启用'
												case 3:
													return '待执行'
												case 4:
													return '执行中'
												case 5:
													return '已停用'
												case 6:
													return '已失效'
												default:
													return ''
											}
										})(item.pricePolicyStatus)
									}
								</div>
								<div style={{flex: 1, flexDirection: 'column', border: 'none'}}  className={RentStyle.policyTabelItem}>
									<span>{item.effectiveStartTime}</span>
									<span>至</span>
									<span>{item.effectiveEndTime}</span>
								</div>
								<div style={{flex: 1, border: 'none', textAlign: 'center'}} className={RentStyle.policyTabelItem}>
									{item.createTime}
								</div>
								<div style={{flex: 1.5, justifyContent: "space-evenly", border: 'none'}} className={RentStyle.policyTabelItem}>
									<span style={{cursor: "pointer", color: '#4481EB'}} onClick={()=>{
										this.props.history.push(`/pages/appCenter/rentAssistant/rentAssistantHome/rentalPricePolicyList/rentPricePolicyDetail/${item.pricePolicySn}`)
									}}>查看</span>
									<span style={{cursor: "pointer", color: '#4481EB'}} onClick={()=>{
										if(item.pricePolicyStatus === 4){
											return message.error('当前状态不允许编辑，请先停用该政策');
										}
										this.props.history.push(`/pages/appCenter/rentAssistant/rentAssistantHome/rentalPricePolicyAdd/${item.pricePolicySn}`)
									}}>编辑</span>

									{
										(status=>{
											switch (status) {
												case 1:
													return(
														<span style={{cursor: "pointer", color: '#4481EB'}} onClick={()=>{
															this.policySubmit(item.pricePolicySn)
														}}>提交</span>
													)
												case 2:
												case 5:
												case 6:
													return (
														<span style={{cursor: "pointer", color: '#4481EB'}} onClick={()=>{
															Modal.confirm({
																title: '是否启用?',
																onOk: ()=>{
																	this.policyEnable(item.pricePolicySn)
																}
															})
														}}>启用</span>
													)
												case 3:
												case 4:
													return (
														<span style={{cursor: "pointer", color: 'red'}} onClick={()=>{
															Modal.confirm({
																title: '是否停用?',
																onOk: ()=>{
																	this.policyDisable(item.pricePolicySn)
																}
															})
														}}>停用</span>
													)
												default:
													return null
											}
										})(item.pricePolicyStatus)
									}
									<span style={{cursor: "pointer", color: 'red'}} onClick={()=>{
										this.policyDelete(item.pricePolicySn)
									}}>删除</span>
								</div>
							</div>
						)
					})
				}
				{/*无数据提示*/}
				{
					(policyList && policyList.length === 0) && (
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
			</>
		)
	}

	// 分页
	makePaginationView = ()=>{
		const {page, pageSize, total} = this.state;
		return(
			<div style={{display: 'flex', justifyContent: "space-between", marginTop: 15, height: 60, alignItems: 'center'}}>
				<span/>
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

	// 提交
	policySubmit = (pricePolicySn)=>{
		RentModel.RentAsstPolicySubmit({
			pricePolicySn
		}, res=>{
			this.getList();
			message.success('提交成功!');
		})
	}

	// 启用
	policyEnable = (pricePolicySn)=>{
		RentModel.RentAsstPolicyEnable({
			pricePolicySn
		}, res=>{
			this.getList();
			message.success('启用成功!');
		})
	}

	// 停用
	policyDisable = (pricePolicySn)=>{
		RentModel.RentAsstPolicyDisable({
			pricePolicySn
		}, res=>{
			this.getList();
			message.success('停用成功!');
		})
	}

	// 删除单个
	policyDelete = (pricePolicySn)=>{
		Modal.confirm({
			title: '是否删除!',
			onOk: ()=>{
				RentModel.RentAsstPolicyDelete({
					pricePolicySn
				}, res=>{
					this.getList();
					message.success('删除成功!');
				})
			}
		})
	}

	// 批量删除
	policyDeleteForMultiSelect = ()=>{
		const pricePolicySnList = [...this.state.selectedSnArr];
		if(pricePolicySnList.length === 0){
			return message.error('请至少勾选一项再删除！')
		}

		Modal.confirm({
			title: '是否删除!',
			onOk: ()=>{
				RentModel.RentAsstPolicyDeleteForMultiSelect({
					pricePolicySnList
				}, res=>{
					message.success('删除成功!');
					this.setState({
						selectedSnArr: []
					}, ()=>{
						this.getList();
					})
				})
			}
		})
	}

	// 检查当前页面是否全选
	checkIsAllSeletedInCurrentPage = ()=>{
		let flag = true;
		const {policyList, selectedSnArr} = this.state;
		if(policyList.length === 0){
			return false;
		}
		for(let i=0; i<policyList.length; i++){
			if(selectedSnArr.indexOf(policyList[i].pricePolicySn) === -1){
				flag = false;
				break;
			}
		}
		return flag;
	}

	// 选择处理
	selectedPolicy = (pricePolicySn)=>{
		const {selectedSnArr} = this.state;
		const index = selectedSnArr.indexOf(pricePolicySn);
		if(index === -1){
			selectedSnArr.push(pricePolicySn);
		}else {
			selectedSnArr.splice(index, 1);
		}
		this.setState({
			selectedSnArr
		})
	}

	// 全选 / 全不选 当前页
	selectedAllForCurrentPage = (flag)=>{
		const {policyList, selectedSnArr} = this.state;
		for(let i=0; i<policyList.length; i++){
			const pricePolicySn = policyList[i].pricePolicySn;
			const index = selectedSnArr.indexOf(pricePolicySn);
			if(flag){
				index === -1 && selectedSnArr.push(pricePolicySn);
			}else {
				index !== -1 && selectedSnArr.splice(index, 1)
			}
		}

		this.setState({
			selectedSnArr
		})

	}

}
