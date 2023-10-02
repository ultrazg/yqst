import React, {Component} from 'react';
import cloneDeep from 'lodash/cloneDeep'
import {del, down, remove, sort} from '../../../../resource'
import {Button, Col, Dropdown, Input, message, Modal, Row} from 'antd'
import model from '../../model'
import {
	sortableContainer,
	sortableElement,
	sortableHandle,
} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import './index.less'
import IsPower from '../../../Power/IsPower'


class ApplyGroupSetting extends Component {
	state = {
		softList: [],
		allAppList: [],
		chooseAppList: [],
		noChooseAppList: [],
		dragElement: null,
		groupName: '',
		idNewOperation: false
	};

	componentDidMount() {
		this.getList()
	}

	componentWillUnmount() {

	}

	getList = () => {
		model.softGroupUserSoftList({}, res => {
			const arr = []
			const noShowArr = []
			this.setState({
				softList: res.data,
				copySoftList: cloneDeep(res.data),
				allAppList: noShowArr
			})
		})

	};

	render() {
		let {isSet, setIndex} = this.state;
		return (
			<IsPower
				key={'SOFT_GROUP_ENTER'}
				permissionsName={'SOFT_GROUP_ENTER'}
				style={{paddingTop: '50px'}}
			>
				<h1
					style={{
						fontSize: '20px',
						lineHeight: '28px',
						padding: '24px 0',
						borderBottom: '1px solid rgba(43,52,65,0.25)',
						margin: '0 0 15px 0',
						position: 'relative'
					}}
				>
					分组设置
					<Button
						type='primary'
						style={{
							position: 'absolute',
							top: 22,
							right: 0,
							width: 96,
							height: 32,
							borderRadius: 4
						}}
						onClick={() => {
							window.globalPermissions.checkPermission('SOFT_GROUP_ADD', (res) => {
								if(res)
									return message.error('抱歉，您没有该操作权限，请联系管理员！');

								model.softGroupUserSoftNotList({
									current: 1, pageSize: 10000
								}, res => {
									this.setState({
										allAppList: res.data.records,
										visible: true,
										idNewOperation: true
									})
								})
							});
						}}
					>
						新建分组
					</Button>
					<Button
						type='danger'
						style={{
							position: 'absolute',
							top: 22,
							right: 106,
							width: 96,
							height: 32,
							borderRadius: 4
						}}
						onClick={() => {
							window.globalPermissions.checkPermission('SOFT_GROUP_EDIT', (res) => {
								if(res)
									return message.error('抱歉，您没有该操作权限，请联系管理员！');

								Modal.confirm({
									title: '确认进行应用桌面分组还原?',
									okText: '确定',
									cancelText: '取消',
									okType: 'danger',
									onOk: () => {
										model.softGroupUserRecovery({}, res => {
											this.getList()
										})
									},
								});
							});
						}}
					>
						分组还原
					</Button>
				</h1>
				<div>
					{this.renderSoft()}
					{this.makeMod()}
				</div>
			</IsPower>
		);
	}

	renderSoft = () => {
		return (
			<div style={{
				paddingBottom: 20
			}}>
				{
					this.state.softList && this.state.softList.map((n, index) => (
						<div key={n.groupName + index}>
							<div
								style={{
									color: 'rgba(43,52,65,0.65)',
									margin: '16px 0'
								}}
							>
								{n.groupName}
								{
									n.groupId !== 0 && <a onClick={() => {
										window.globalPermissions.checkPermission('SOFT_GROUP_EDIT', (res) => {
											if(res)
												return message.error('抱歉，您没有该操作权限，请联系管理员！');

											model.softGroupUserSoftNotList({
												current: 1, pageSize: 10000
											}, res => {
												this.setState({
													allAppList: res.data.records,
													visible: true,
													chooseAppList: cloneDeep(n.softVOList),
													groupName: n.groupName,
													groupId: n.groupId,
													currentEditItem: n
												})
											})
										});
									}} style={{marginLeft: 16}}>
										编辑
									</a>
								}
							</div>
							<div>
								{
									n.softVOList && n.softVOList.map((item, idx) => {
										return <div
											className={'applyS'}
											key={'use_' + idx}
											style={{
												display: 'inline-block',
												width: '192px',
												height: '64px',
												padding: '12px',
												borderRadius: '6px',
												border: '1px solid rgba(43,52,65,0.25)',
												marginBottom: '24px',
												marginRight: (idx === 0 || ++idx % 3 !== 0) ? '24px' : '0px',
												position: 'relative',
											}}
										>
											<img
												src={item.logo}
												alt=""
												style={{
													width: '40px',
													marginRight: '12px',
												}}
											/>
											<span
												style={{
													overflow: 'hidden',
													whiteSpace: 'nowrap',
													textOverflow: 'ellipsis',
													display: 'inline-block',
													width: '110px',
													verticalAlign: 'middle',
												}}
											>
                                                {item.name}
                                            </span>
										</div>
									})
								}
							</div>
						</div>
					))
				}
			</div>
		)
	}

	deleteGroup = () => {
		window.globalPermissions.checkPermission('SOFT_GROUP_DEL', (res) => {
			if(res)
				return message.error('抱歉，您没有该操作权限，请联系管理员！');

			Modal.confirm({
				title: '确认删除该分组?',
				okText: '确定',
				okType: 'danger',
				cancelText: '取消',
				onOk: () => {
					const {currentEditItem} = this.state
					model.softGroupUserDelete({groupId: currentEditItem.groupId}, res => {
						message.success('分组删除成功')
						this.setState({visible: false})
						this.getList()
					})
				},
			});
		});
	}
	onSortEnd = ({oldIndex, newIndex}) => {
		this.setState(({chooseAppList}) => ({
			chooseAppList: arrayMove(chooseAppList, oldIndex, newIndex),
		}));
	};
	makeMod = () => {
		let {visible, allAppList, chooseAppList, dragElement, noChooseAppList, currentEditItem} = this.state;
		if (chooseAppList.length !== 0) {
			chooseAppList.forEach((n, index) => n.index = index)
		}
		const DragHandle = sortableHandle(() => (
			<img style={{
				width: '16px',
				height: '16px',
				borderRadius: '2px',
				marginRight: '8px',
				marginLeft: 8,
				cursor: 'all-scroll',
			}} src={sort} alt="" title={'拖拽排序'}/>
		));


		const SortableItem = sortableElement(({value}) => (
			<li
				className="SortableItem"
			>
				<DragHandle/>
				<img src={value.logo} alt=""
				     style={{
					     width: '20px',
					     height: '20px',
					     borderRadius: '2px',
					     marginRight: '8px'
				     }}
				/>
				<span
					title={value.name}
				>
                                        {value.name}
                                    </span>
				<img
					onClick={() => {
						const {chooseAppList, noChooseAppList} = this.state;
						let tag = true;
						chooseAppList.forEach((n, nIndex) => {
							if (n.softId === value.softId) {
								chooseAppList.splice(nIndex, 1)
								this.setState({chooseAppList: chooseAppList})
							}
						})
						allAppList.forEach((n, index) => {
							if (n.softId === value.softId) {
								tag = false
							}
						})
						if (tag === true) {
							noChooseAppList.push(value)
						}
						this.setState({noChooseAppList})
					}}
					src={del}
					alt=""
					style={{
						width: '20px',
						height: '20px',
						cursor: 'pointer',
						marginRight: '10px',
						position: 'absolute',
						right: '0',
					}}
				/>
			</li>
		));

		const SortableContainer = sortableContainer(({items}) => {
			return <ul className="SortableList">  {items.map((item, index) => (
				<SortableItem key={`item-${item.softId}`} index={index} value={item}/>
			))}
			</ul>;
		});
		return <Modal
			afterClose={() => {
				this.setState({
					groupName: '',
					activeItem: undefined,
					allAppList: [],
					chooseAppList: [],
					noChooseAppList: [],
					dragElement: null,
					currentEditItem: undefined,
					idNewOperation: false,
					groupId: undefined
				})
			}}
			className={'sw-modal'}
			title={this.state.currentEditItem === undefined ? '新建分组' : '编辑分组'}
			visible={visible}
			onOk={() => {
				let {groupName, activeItem, chooseAppList, groupId, currentEditItem} = this.state;

				const groupSaveMessage = {
					groupId,
					groupName,
					softList: chooseAppList,
					softVOList: chooseAppList
				}
				if (groupName === undefined || groupName === '') {
					message.error('请输入分组名称')
					return
				}
				model.softGroupUserSoftSave({groupSaveMessage: JSON.stringify(groupSaveMessage)}, res => {
					message.success(currentEditItem ? '编辑分组成功' : '新建分组成功');
					this.setState({
						chooseAppList: [],
						groupName: undefined,
						visible: false
					})
					this.getList()
				})
			}}
			onCancel={() => {
				this.setState({visible: false});
			}}
			width={546}
		>
			{!this.state.idNewOperation && (
				<a
					style={{
						color: '#F12C20',
						position: 'absolute',
						top: '17px',
						right: '24px',
						fontSize: 14,
						fontWeight: '500',
						lineHeight: '20px'
					}}
					onClick={this.deleteGroup}
				>
					删除分组
				</a>
			)}

			<Row>
				<Col span={12}>
					<div
						style={{
							color: 'rgba(43,52,65,0.65)',
							marginBottom: '16px',
							fontSize: '12px'
						}}
					>
						未分组应用
					</div>
					<ul
						style={{
							minHeight: '200px',
							overflowY: 'auto',
							margin: '0px'
						}}
					>
						{
							allAppList && allAppList.map((item, idx) => {
								return <li
									onClick={() => {
										const {chooseAppList} = this.state;
										let add = true;
										let removeIndex = 0
										chooseAppList.forEach((n, cindex) => {
											if (n.softId === item.softId) {
												add = false
												removeIndex = cindex
											}
										})
										if (add) {
											chooseAppList.push(item)
										} else {
											chooseAppList.splice(removeIndex, 1)
										}
										chooseAppList.forEach((n, nIndex) => {
											n.index = nIndex + 1
										})
										this.setState({chooseAppList})
									}}
									key={'list_' + idx}
									style={{
										padding: '8px 12px',
										cursor: 'pointer',
										overflow: 'hidden',
										whiteSpace: 'nowrap',
										textOverflow: 'ellipsis',
										background: (() => {
											let color = '#fff'
											chooseAppList.forEach(n => {
												if (n.softId === item.softId) {
													color = 'rgba(68, 129, 235, 0.1)'
												}
											})
											return color
										})()
									}}
								>
									<img src={item.logo} alt=""
									     style={{
										     width: '20px',
										     height: '20px',
										     borderRadius: '2px',
										     marginRight: '8px'
									     }}
									/>
									{item.name}
								</li>
							})
						}
					</ul>
					{
						!this.state.idNewOperation && (
							<div>
								<div
									style={{
										color: 'rgba(43,52,65,0.65)',
										marginBottom: '16px',
										fontSize: '12px'
									}}
								>
									已移除应用
								</div>
								<ul
									style={{
										minHeight: '200px',
										overflowY: 'auto',
										margin: '0px'
									}}
								>
									{
										noChooseAppList && noChooseAppList.map((item, idx) => {
											return <li
												onClick={() => {
													const {chooseAppList} = this.state;
													let add = true;
													let removeIndex = 0
													chooseAppList.forEach((n, cindex) => {
														if (n.softId === item.softId) {
															add = false
															removeIndex = cindex
														}
													})
													noChooseAppList.forEach((n, cindex) => {
														if (n.softId === item.softId) {
															noChooseAppList.splice(cindex, 1)
														}
													})

													if (add) {
														chooseAppList.push(item)
													} else {
														chooseAppList.splice(removeIndex, 1)
													}
													chooseAppList.forEach((n, nIndex) => {
														n.index = nIndex + 1
													})
													this.setState({chooseAppList, noChooseAppList})
												}}
												key={'list_' + idx}
												style={{
													padding: '8px 12px',
													cursor: 'pointer',
													overflow: 'hidden',
													whiteSpace: 'nowrap',
													textOverflow: 'ellipsis',
													background: (() => {
														let color = '#fff'
														chooseAppList.forEach(n => {
															if (n.softId === item.softId) {
																color = 'rgba(68, 129, 235, 0.1)'
															}
														})
														return color
													})()
												}}
											>
												<img src={item.logo} alt=""
												     style={{
													     width: '20px',
													     height: '20px',
													     borderRadius: '2px',
													     marginRight: '8px'
												     }}
												/>
												{item.name}
											</li>
										})
									}
								</ul>
							</div>
						)
					}
				</Col>
				<Col span={12}
				     style={{
					     paddingLeft: '12px',
				     }}
				>
					<div
						style={{
							color: 'rgba(43,52,65,0.65)',
							marginBottom: '8px',
							fontSize: '12px'
						}}
					>
						分组名称
					</div>
					<Input
						maxLength={50}
						value={this.state.groupName}
						style={{fontSize: '14px'}}
						placeholder="请输入分组名称"
						onChange={(e) => {
							this.setState({groupName: e.target.value})
						}}
					/>
					<div
						style={{
							color: 'rgba(43,52,65,0.65)',
							margin: '16px 0',
							fontSize: '12px'
						}}
					>
						已选应用
					</div>


					<SortableContainer useDragHandle items={chooseAppList} helperClass="SortableHelper"
					                   onSortEnd={this.onSortEnd}
					>

					</SortableContainer>
				</Col>
			</Row>
		</Modal>
	}
}

export default ApplyGroupSetting;
