import React, {Component} from 'react';
import {Button, Input, Modal, Tree, Checkbox } from 'antd';
import './model.css';
import RentModel from "../../RentModel";
import RentStyle from '../Rent.module.css';
import {deepClone} from '../../unit'

export default class SelectProjectModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			keyWord: '',
			projectInfo: [],
			companyAllChecked: false,
			projectAllChecked: false,
		};
	}

	componentDidMount() {
		this.getList()
	}

	getList = ()=>{
		const {keyWord} = this.state;
		RentModel.RentAsstGetCompanyAndProjectList({
			keyWord
		}, res=>{
			let arr = res.data || [];
			let projectInfo = [];
			arr.forEach((item, index)=>{
				let obj = {
					company: item.lesseeName,
					companyId: item.lesseeSn,
					projectArr: [],
					isChecked: false,
					isProjectCheckedAll: false
				};

				item.projectList.forEach(p=>{
					obj.projectArr.push({
						projectId: p.projectSn,
						projectName: p.projectName,
						isChecked: false
					})
				})

				projectInfo.push(obj)
			})

			this.setState({
				projectInfo,
				companyAllChecked: false,
				projectAllChecked: false
			})

		})
	}

	render() {
		const {showModal, closeModal} = this.props;
		return (
			<Modal
				className={'Modal'}
				width={918}
				visible={showModal}
				title={'选择适用对象'}
				footer={null}
				onCancel={()=>{
					closeModal(null);
				}}
			>
				{this.makeSearchView()}
				{this.makeContentView()}
				{this.makeFooterView()}
			</Modal>

		)
	}

	makeSearchView = () => {
		const {keyWord} = this.state;
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
						this.setState({keyWord: e.target.value})
					}}
				/>

				<Button
					type="primary"
					style={{width: 80, marginLeft: 15, borderRadius: 2}}
					onClick={()=>{
						this.getList()
					}}
				>
					搜索
				</Button>
				<Button
					style={{width: 80, marginLeft: 15, borderRadius: 2}}
					onClick={() => this.setState({keyWord: ''})}
				>
					重置
				</Button>
			</div>
		)
	}

	makeContentView = ()=> {
		const {projectInfo} = this.state;
		return(
			<div style={{
				height: 500,
				overflowY: 'scroll'
			}}>
				{
					projectInfo && projectInfo.map((item, index)=>{
						const {projectArr} = item;
						let treeData = [
							{
								title: '展开所属项目',
								key: item.companyId,
								children: []
							}
						];
						projectArr.forEach((p, idx)=>{
							treeData[0].children.push({
								title: p.projectName,
								key: p.projectId,
								isLeaf: true,
								idx
							})
						})

						return(
							<div style={{display: "flex", marginTop: 10, borderBottom: '1px solid #EBEDF0'}} key={item.companyId}>
								<div style={{width: '50%', display: "flex", justifyContent: 'space-between'}}>
									<span>{item.company}</span>
									<Checkbox checked={projectInfo[index].isChecked} onChange={(e)=>{
										projectInfo[index].isChecked = e.target.checked;
										this.setState({
											projectInfo
										}, ()=>{
											this.checkCompanyIsAllChecked();
										})
									}}/>
								</div>
								<div style={{width: '50%', display: "flex", justifyContent: 'space-between', paddingLeft: 25}}>
									<Tree
										multiple
										defaultExpandAll
										selectable={false}
										titleRender={nodeData=>{
											const {title, idx, key} = nodeData;
											return(
												<label key={key} style={{display: 'flex'}}>
													<div style={{paddingRight: 6, maxWidth: 360}} className={RentStyle.desc}>{title}</div>
													{
														idx == null ? (
															<Checkbox disabled={!item.isChecked} checked={projectInfo[index].isProjectCheckedAll} onChange={e=>{
																const flag = e.target.checked;
																this.changeItemProjectCheck(index, flag);
																this.checkProjectIsAllChecked();
															}}/>
														) : (
															<Checkbox disabled={!item.isChecked} checked={projectInfo[index].projectArr[idx] ? projectInfo[index].projectArr[idx].isChecked : false} onChange={e=>{
																const flag = e.target.checked;
																projectInfo[index].projectArr[idx].isChecked = flag;
																this.setState({
																	projectInfo
																}, ()=>{
																	this.checkItemIsAllCheck(index);
																	this.checkProjectIsAllChecked();
																})
															}}/>
														)
													}

												</label>
											)
										}}
										disabled={!item.isChecked}
										treeData={treeData}
									/>
								</div>
							</div>

						)
					})
				}
			</div>
		)
	}

	makeFooterView = ()=>{
		const {companyAllChecked, projectAllChecked, projectInfo} = this.state;
		const {closeModal, follow, changeFollow} = this.props;
		return(
			<div style={{display: "flex", justifyContent: 'space-between', alignItems: 'center', marginTop: 25}}>
				<div>
					<label htmlFor="company">
						<Checkbox id={'company'} checked={companyAllChecked} onChange={(e)=>{
							const flag = e.target.checked;
							this.checkedAllCompany(flag);
						}}/>
						<span style={{marginLeft: 5, cursor: 'pointer'}}> 全选客户</span>
					</label>

					<label htmlFor="project" style={{marginLeft: 25}}>
						<Checkbox id={'project'} checked={projectAllChecked} onChange={(e)=>{
							const flag = e.target.checked;
							this.checkedAllProject(flag);
						}}/>
						<span style={{marginLeft: 5, cursor: 'pointer'}}> 全选项目</span>
					</label>

					<label htmlFor="follow" style={{marginLeft: 25}}>
						<Checkbox id={'follow'} checked={follow} disabled={!companyAllChecked} onChange={(e)=>{
							changeFollow(e.target.checked)
						}}/>
						<span style={{marginLeft: 5, cursor: 'pointer'}}>
							延用政策
							<span style={{color: 'red'}}>（勾选上后面新加的客户和项目都可延用此价格政策）</span>
						</span>
					</label>
				</div>
				<div>
					<Button
						type="primary"
						style={{width: 80, marginLeft: 15, borderRadius: 2}}
						onClick={()=>{
							let arr = deepClone(projectInfo).filter((item)=>{
								return item.isChecked
							});
							for(let i=0; i<arr.length; i++){
								let newProjectArr = [];
								arr[i].projectArr.forEach(p=>{
									p.isChecked && newProjectArr.push(p)
								})
								arr[i].projectArr = newProjectArr;
							}

							closeModal(arr, companyAllChecked, projectAllChecked)
						}}
					>
						确定
					</Button>
					<Button
						style={{width: 80, marginLeft: 15, borderRadius: 2}}
						onClick={() => {
							closeModal(null)
						}}
					>
						取消
					</Button>
				</div>
			</div>
		)
	}

	// 改变子项的所有checked状态
	changeItemProjectCheck = (index, flag)=>{
		const {projectInfo} = this.state;
		projectInfo[index].isProjectCheckedAll = flag;
		projectInfo[index].projectArr.forEach(item=>{
			item.isChecked = flag
		})
		this.setState({
			projectInfo
		})
	}

	// 检查子项是否全选
	checkItemIsAllCheck = (index)=>{
		const {projectInfo} = this.state;
		let arr = projectInfo[index].projectArr;
		let flag = true;
		for(let i=0; i<arr.length; i++){
			if(!arr[i].isChecked){
				flag = false;
				break;
			}
		}
		projectInfo[index].isProjectCheckedAll = flag;
		this.setState({
			projectInfo
		})
	}

	// 是否全选客户
	checkCompanyIsAllChecked = () =>{
		const {projectInfo} = this.state;
		let flag = true;
		for(let i=0; i<projectInfo.length; i++){
			if(!projectInfo[i].isChecked){
				flag = false;
				break;
			}
		}
		this.setState({
			companyAllChecked: flag
		})
	}

	// 全选客户
	checkedAllCompany = (flag)=>{
		const {projectInfo, companyAllChecked} = this.state;
		for(let i=0; i<projectInfo.length; i++){
			projectInfo[i].isChecked = flag;
		}
		this.setState({
			projectInfo,
			companyAllChecked: flag
		}, ()=>{
			this.checkProjectIsAllChecked()
		})
	}

	// 是否全选项目
	checkProjectIsAllChecked = () =>{
		const {projectInfo} = this.state;
		let flag = true;
		for(let i=0; i<projectInfo.length; i++){
			if(!(projectInfo[i].isChecked && projectInfo[i].isProjectCheckedAll)){
				flag = false;
				break;
			}
		}
		this.setState({
			projectAllChecked: flag
		})
	}

	// 全选项目
	checkedAllProject = (flag)=>{
		let {projectInfo, companyAllChecked, projectAllChecked} = this.state;
		for(let i=0; i<projectInfo.length; i++){
			projectInfo[i].isProjectCheckedAll = flag;
			flag && (projectInfo[i].isChecked = flag);
			let arr = projectInfo[i].projectArr;
			arr.forEach(p=>{
				p.isChecked = flag;
			})
		}
		projectAllChecked = flag;
		flag && (companyAllChecked = flag)
		this.setState({
			projectInfo,
			projectAllChecked,
			companyAllChecked
		})
	}

	// 同步状态
	syncCheckedStatus = (companyIdArr, projectIdArr)=>{
		const {projectInfo} = this.state;
		projectInfo.forEach((item, index)=>{
			const {projectArr} = item;
			item.isChecked = (companyIdArr.indexOf(item.companyId) !== -1);
			let isProjectCheckedAll = true;
			projectArr.forEach(p=>{
				const flag = (projectIdArr.indexOf(p.projectId) !== -1);
				(isProjectCheckedAll && !flag) && (isProjectCheckedAll = false);
				p.isChecked = flag;
			})
			item.isProjectCheckedAll = isProjectCheckedAll;
		})
		this.setState({
			projectInfo
		}, ()=>{
			this.checkCompanyIsAllChecked();
			this.checkProjectIsAllChecked();
		})
	}

}
