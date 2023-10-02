import React, {Component} from 'react';
import classnames from 'classnames'
import SwCityData from '../../../resource/SwCityData'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';

import {Avatar, Button, Cascader, Col, Descriptions, Drawer, Empty,Input, message, Tabs, Form} from 'antd';
import Editable from './EditTable'
import model from '../Model'
import {formDeleteEmpty, formRegExp} from '../../../utils'
import homeModel from '../../Home/Model'
import IsPower from '../../Power/IsPower'


class Partners extends Component {
	constructor(props) {
		super(props);
		this.state = {
			partnersData: [],
			baseInfo: {},
			contactVOList: [],
			formVisible: false,
			firstLineEdit: false,
			pageSize: 10,
			current: 1
		};
		this.formRef = React.createRef();
		this.drawerFormRef = React.createRef();
	}

	componentDidMount() {
		window.globalPermissions.checkPermission('PARTNER_MANAGE_ENTER', (res) => {
			if(!res)
				this.getPage();
		});
	}

	getIndustry = () => {
		homeModel.UserIList({}, (res) => {
			const indList = res.data && res.data.map(item => {
				item.childList = item.childList && item.childList.map(cItem => {
					return {
						...cItem,
						value: cItem.id,
						label: cItem.industryName,
					}
				});
				item.children = item.childList;
				delete item.childList;
				return {
					...item,
					value: item.id,
					label: item.industryName,
				}
			});
			this.setState({industryList: indList})
		}, (err) => {
		});
	}

	getPage = (searchValue, needResetCurrent = true) => {
		model.partnerListPartner({
			pageNum: 1,
			pageSize: 1000,
			keyWord: searchValue ? searchValue : ''
		}, res => {
			if (needResetCurrent) {
				if (res.data && res.data && res.data.length !== 0) {
					this.getDetail(res.data[0].id)
					this.getPartnersList(res.data[0].id)
					this.authenticationInfo(res.data[0].partnerUser)
					this.setState({
						partnersData: res.data,
						currentKey: res.data[0].id
					})
				} else {
					this.setState({partnersData: res.data.records})
				}
			} else {
				res.data.forEach(n => {
					if (n.id === this.state.currentKey) {
						this.getDetail(n.id)
						this.getPartnersList(n.id)
						this.authenticationInfo(n.partnerUser)
						this.setState({
							partnersData: res.data,
							currentKey: n.id
						})
					}
				})
			}
		})
	}

	authenticationInfo = (id) => {
		// 获取合作伙伴认证信息,暂时没啥用
		model.companyAuthGet({userId: id}, res => {
		})
	}

	componentWillUnmount() {

	}

	partnersChange = (item) => {
		this.setState({currentKey: item.id, baseInfo: {}})
		this.getDetail(item.id)
		this.getPartnersList(item.id)
		this.authenticationInfo(item.partnerUser)
	}

	getPartnersList = (id, searchValue) => {
		model.contactList({
			partnerid: id
		}, res => {
			res.data.forEach((item, index) => item.key = index)
			this.setState({contactVOList: res.data})
		})
	}

	getDetail = (id) => {
		model.partnerGetById({
			id: id
		}, res => {
			this.setState({
				baseInfo: res.data,
			})
		})
	}

	arrHeadPush = (arr, item, index) => {
		const newArr = arr
		newArr.splice(index, 0, item[0])
		return newArr
	}

	addPartners = () => {
		window.globalPermissions.checkPermission('PARTNER_MANAGE_EDIT', (res) => {
			if (res)
				return message.error('抱歉，您没有该操作权限，请联系管理员！');

			const newItem = [{
				name: '',
				phone: '',
				depName: '',
				jobName: '',
				key: this.state.contactVOList === undefined ? 0 : this.state.contactVOList.length
			}]
			const contactVOList = this.state.contactVOList === undefined
				? [].concat(newItem)
				: this.arrHeadPush(this.state.contactVOList, newItem, 0)

			this.setState({
				contactVOList,
				firstLineEdit: true,
				pageSize: 11,
				current: 1
			})
		});
	}

	partnersUpdate = (submitData) => {
		if (submitData.id) {
			model.contactUpdate(formDeleteEmpty({
				...submitData,
				contactName: submitData.name,
				partnerId: this.state.baseInfo.id,
				partneruser: this.state.baseInfo.partnerUser
			}), res => {
				this.getPartnersList(this.state.currentKey)
				message.success('修改成功')
			})
		} else {
			model.contactAdd(formDeleteEmpty({
				...submitData,
				contactName: submitData.name,
				partnerId: this.state.baseInfo.id,
				partneruser: this.state.baseInfo.partnerUser
			}), res => {
				this.getPartnersList(this.state.currentKey)
				message.success('添加成功')
			})
		}
	}

	render() {
		const {partnersData} = this.state;
		return (
            <div className='content-wrapper'>
				{this.renderFormDrawer()}
				<IsPower
					key={'PARTNER_MANAGE_ENTER'}
					permissionsName={'PARTNER_MANAGE_ENTER'}
					style={{paddingTop: '240px'}}
				>
					<div className='pd0 content-wrapper-left'>
						<div style={{padding: '24px 12px 0 12px'}} className='header-search'>
							<Input
								onChange={(e) => {
									this.setState({
										searchValue: e.target.value
									})
								}}
								onKeyDown={(e) => {
									if (e.keyCode === 13) {
										this.getPage(this.state.searchValue)
									}
								}}
								placeholder='搜索'
								size='large'
								prefix={<SearchOutlined style={{color: '#2B3441', fontSize: 13}} />}
							/>
						</div>
						<div style={{textAlign: 'center'}}>
							<Button
								onClick={() => {
									window.globalPermissions.checkPermission('PARTNER_MANAGE_ADD', (res) => {
										if (res)
											return message.error('抱歉，您没有该操作权限，请联系管理员！');

										this.getIndustry();
										this.setState({
											formVisible: true,
											operation: 'new'
										});
									});
								}}
								style={{
									marginTop: 16,
									width: 88,
									height: 32,
									fontSize: 14,
									fontWeight: 500,
									lineHeight: '100%'
								}}
							>
								添加
							</Button>
						</div>
						<div className='partners-list-wrapper'>
							{
								partnersData && partnersData.map(item => (
									<div
										onClick={() => this.partnersChange(item)}
										key={item.id}
										className={classnames('partners-list', this.state.currentKey === item.id ? 'partners-list-active' : '')}
									>
										<Avatar className='partners-list-avatar' shape="square" src={item.image}/>
										<span className='partners-list-title'>{item.name}</span>
									</div>
								))
							}
							{
								(!partnersData || partnersData.length === 0) && (
									<Empty style={{marginTop: 100}}/>
								)
							}
						</div>
					</div>
					<div className='content-wrapper-right partners-content-wrapper'>
						{
							!this.state.baseInfo || JSON.stringify(this.state.baseInfo) === '{}' ?
								<Empty style={{marginTop: 200}} description='没有合作伙伴'/>
								: <div>
									<div>
										<h3>{this.state.baseInfo.parName}</h3>
									</div>
									<div className='content-tab'>
										<Tabs>
											<Tabs.TabPane tab="基本信息" key="1">
												<IsPower
													key={'PARTNER_MANAGE_VIEW'}
													permissionsName={'PARTNER_MANAGE_VIEW'}
													style={{paddingTop: '180px'}}
												>
													{this.renderPane1()}
												</IsPower>
											</Tabs.TabPane>
											<Tabs.TabPane tab="认证信息" key="2">
												<IsPower
													key={'PARTNER_MANAGE_AUTH'}
													permissionsName={'PARTNER_MANAGE_AUTH'}
													style={{paddingTop: '240px'}}
												>
													{this.renderPane2()}
												</IsPower>
											</Tabs.TabPane>
											<Tabs.TabPane tab="企业资料" key="3">
												<IsPower
													key={'PARTNER_MANAGE_INFO'}
													permissionsName={'PARTNER_MANAGE_INFO'}
													style={{paddingTop: '240px'}}
												>
													{this.renderPane3()}
												</IsPower>
											</Tabs.TabPane>
										</Tabs>
									</div>
								</div>
						}
					</div>
				</IsPower>
			</div>
        );
	}

	renderPane1 = () => {
		const {baseInfo} = this.state;
		return (
			<div className='baseinfo'>
				<div className='oneLine'>
					<Avatar
						className='baseinfo-avatar'
						src={baseInfo.logo}
					/>
					<div className='baseinfo-title'>
						<h4>{baseInfo.parName}</h4>
						<h5>合作伙伴类型: {baseInfo.isSupplier === '1' ? '供应商' : ''}{baseInfo.isCustomer === '1' ? '、客户' : ''}</h5>
					</div>
				</div>
				<div className='baseinfo-fieldinfo'>
					<Descriptions className='baseinfo-fieldinfo-item'>
						<Descriptions.Item span={3} label="行业">{baseInfo.industry}</Descriptions.Item>
						<Descriptions.Item span={1} label="电话">{baseInfo.phone}</Descriptions.Item>
						<Descriptions.Item span={1} label="传真">{baseInfo.fax}</Descriptions.Item>
						<Descriptions.Item span={1} label="国家">{baseInfo.countryCode}</Descriptions.Item>
						<Descriptions.Item span={1} label="邮编">{baseInfo.postCode}</Descriptions.Item>
						<Descriptions.Item span={2} label="邮箱">{baseInfo.email}</Descriptions.Item>
						<Descriptions.Item span={3} label="地址">{baseInfo.detailAddress}</Descriptions.Item>
						<Descriptions.Item span={3} label="地区">
							{
								baseInfo.state
									? baseInfo.state + '-' + baseInfo.city + '-' + baseInfo.district
									: ''
							}
						</Descriptions.Item>
					</Descriptions>
				</div>
			</div>
		)
	}

	renderPane2 = () => {
		const {baseInfo} = this.state
		return (
			<div className='baseinfo'>
				<div className='oneLine'>
					<Avatar
						className='baseinfo-avatar'
						src={baseInfo.logo}
					/>
					<div className='baseinfo-title'>
						<h4>{baseInfo.parName}</h4>
						<h5>合作伙伴类型: {baseInfo.isSupplier === '1' ? '供应商' : ''}{baseInfo.isCustomer === '1' ? '、客户' : ''}</h5>
					</div>
				</div>
				<div className='baseinfo-fieldinfo'>
					<Descriptions className='baseinfo-fieldinfo-item' title='基本信息'>
						<Descriptions.Item span={3} label="企业名称">{baseInfo.parName}</Descriptions.Item>
						<Descriptions.Item span={3} label="地址">
							{`${baseInfo.state}-${baseInfo.city}-${baseInfo.district}-${baseInfo.detailAddress}`}
						</Descriptions.Item>
					</Descriptions>
					<Descriptions className='baseinfo-fieldinfo-item' title='主题证件信息'>
						<Descriptions.Item span={1} label="企业类型">有限责任公司</Descriptions.Item>
						<Descriptions.Item span={2} label="工商执照注册号/统一社会信用代码">91440300796623595F-D</Descriptions.Item>
						<Descriptions.Item span={3} className={'desc-oneline'}
						                   label="经营范围">一般经营项目是:互联网技术开发、移动互联网技术开发、手机软件开发、计算机软硬件技术开发与销售;经营电子商务;汽车零配件批发零售;汽车维修工具、汽车美容装饰用品、润滑油的销售;经济信息咨询;信息技术开发;数据库管理;数据库服务;电子信息技术咨询;科技信息咨询;受金融企业委托提供非金融业务服务。(法律、行政法规禁止的项目除外;法律、行政法规限制的项目须取得许可后方可经营);自有物业租赁;租赁信息咨询-D</Descriptions.Item>
						<Descriptions.Item span={3} label="企业成立日期">2006-02-02</Descriptions.Item>
						<Descriptions.Item span={3} label="企业营业期限">无固定期限</Descriptions.Item>
					</Descriptions>
				</div>
			</div>
		)
	}


	renderPane3 = () => {
		const {baseInfo} = this.state
		return (
            <div className='baseinfo'>
				<div className='baseinfo-fieldinfo'>
					<Descriptions className='baseinfo-fieldinfo-item'>
						<Descriptions.Item span={3} label="企业名称">{baseInfo.parName}</Descriptions.Item>
						<Descriptions.Item span={3} label="行业">{baseInfo.industry}</Descriptions.Item>
						<Descriptions.Item label="电话">{baseInfo.phone}</Descriptions.Item>
						<Descriptions.Item label="传真">{baseInfo.fax}</Descriptions.Item>
						<Descriptions.Item label="邮箱">{baseInfo.email}</Descriptions.Item>
						<Descriptions.Item label="国家">{baseInfo.countryCode}</Descriptions.Item>
						<Descriptions.Item span={2} label="地区">
							{
								baseInfo.state
									? baseInfo.state + '-' + baseInfo.city + '-' + baseInfo.district
									: ''
							}
						</Descriptions.Item>
						<Descriptions.Item span={1} label="邮编">{baseInfo.postCode}</Descriptions.Item>
						<Descriptions.Item span={2} label="地址">{baseInfo.detailAddress}</Descriptions.Item>
						<Descriptions.Item span={3} label="备注">{baseInfo.content}</Descriptions.Item>
					</Descriptions>
				</div>
				<div style={{textAlign: 'center'}}>
					<Button
						onClick={() => {
							window.globalPermissions.checkPermission('PARTNER_MANAGE_EDIT', (res) => {
								if (res)
									return message.error('抱歉，您没有该操作权限，请联系管理员！');

								this.getIndustry();
								this.setState({formVisible: true});
							});
						}}
						className='edit-button'
						type='primary'
					>
						编辑
					</Button>
				</div>
				<div style={{marginTop: 20}}>
					<h4 style={{marginBottom: 16}} className='mid-title'>联系人</h4>
					<Button
						// disabled={this.state.firstLineEdit === true}
						disabled={this.state.firstLineEdit}
						onClick={this.addPartners}
						style={{width: '100%'}}
						type="dashed"
					>
						<PlusOutlined />
						添加联系人
					</Button>
					<Editable
						resetPageNumber={(current) => {
							this.setState({current: current})
						}}
						resetPageSize={() => {
							this.setState({pageSize: 10})
						}}
						propsSetEdit={(state) => {
							this.setState({
								firstLineEdit: state
							});
							this.getPartnersList(this.state.currentKey)
						}}
						getDelete={(key) => {
							model.contactDelete({
								id: key
							}, res => {
								message.success('删除成功');
								this.getPartnersList(this.state.currentKey);
							})
						}}
						pageSize={this.state.pageSize}
						current={this.state.current}
						dataSource={this.state.contactVOList}
						edit={this.state.firstLineEdit}
						setDataSource={(data, submitData) => {
							this.setState({
								firstLineEdit: false
							}, () => {this.partnersUpdate(submitData)});
						}}
						formRef={this.formRef}
					/>
				</div>
			</div>
        );
	}

	onOk = (e) => {
		e.preventDefault();
		this.drawerFormRef.current.validateFields().then(values => {
			if (values.address) {
				values.state = values.address[0]
				values.city = values.address[1]
				values.district = values.address[2]
			}
			delete values.address
			if (this.state.operation === 'new') {
				this.new(values)
			} else {
				this.update(values)
			}
		});
	}

	new = (values) => {
		if (values.industryId) values.industryId = values.industryId[values.industryId.length - 1]
		model.erpCrmAppend(formDeleteEmpty({
			...values,
			contactDTOList: []
		}), res => {
			message.success('添加成功')
			this.setState({formVisible: false})
			this.getPage()
		})
	}

	update = (values) => {
		const {baseInfo} = this.state;
		if (values.industryId) values.industryId = values.industryId[values.industryId.length - 1]
		model.partnerUpdate(formDeleteEmpty({
			...values,
			partnerUser: baseInfo.partnerUser,
			partnerId: baseInfo.id,
			id: baseInfo.id,
			userId: baseInfo.userId,
		}), res => {
			message.success('更新成功')
			this.setState({formVisible: false})
			this.getPage(undefined, false)
		})
	}

	renderFormDrawer = () => {
		const {baseInfo, operation} = this.state
		const formItemLayout = {
			labelCol: {
				xs: {span: 24},
				sm: {span: 6},
			},
			wrapperCol: {
				xs: {span: 24},
				sm: {span: 18},
			},
		};

		return (
            <Drawer
				afterVisibleChange={(visible) => {
					if (!visible) {
						this.setState({operation: undefined})
					}
				}}
				destroyOnClose={true}
				title={this.state.operation === 'new' ? '新建' : '修改'}
				width={545}
				onClose={() => this.setState({formVisible: false})}
				visible={this.state.formVisible}
				bodyStyle={{paddingBottom: 80}}
				className={'sw-modal'}
				footer={null}
			>
				<div className={'aaa'}>
					<Form ref={this.drawerFormRef} {...formItemLayout} className={'sw-form-item'}>
						<Col span={22}>
							<Form.Item
								label="公司名称"
								name={'parName'}
								initialValue={operation === 'new' ? undefined : baseInfo.parName}
								rules={[
									{
										required: true,
										message: '请输入公司名称!',
									},
								]}
							>
								<Input maxLength={50}/>
							</Form.Item>
						</Col>
						<Col span={22}>
							<Form.Item
								label="行业"
								name={'industryId'}
								initialValue={operation === 'new' ? undefined : (
									baseInfo.parIndustryId ? [baseInfo.parIndustryId, baseInfo.industryId] : ''
								)}
							>
								<Cascader options={this.state.industryList}/>
							</Form.Item>
						</Col>
						<Col span={22}>
							<Form.Item
								label="电话"
								name={'phone'}
								initialValue={operation === 'new' ? undefined : baseInfo.phone}
								rules={[
									{
										pattern: /^[0-9\-\+]*$/,
										message: '请输入正确电话格式!'
									},
								]}
							>
								<Input maxLength={30}/>
							</Form.Item>
						</Col>
						<Col span={22}>
							<Form.Item
								label="传真"
								name={'fax'}
								initialValue={operation === 'new' ? undefined : baseInfo.fax}
								rules={[
									formRegExp.range(7, 15),
									formRegExp.number()
								]}
							>
								<Input maxLength={15} style={{width: '100%'}}/>
							</Form.Item>
						</Col>
						<Col span={22}>
							<Form.Item
								label="邮箱"
								name={'email'}
								initialValue={operation === 'new' ? undefined : baseInfo.email}
								rules={[
									formRegExp.email()
								]}
							>
								<Input maxLength={30}/>
							</Form.Item>
						</Col>
						<Col span={22}>
							<Form.Item
								label="国家"
								name={'country'}
								initialValue={operation === 'new' ? '中国' : (baseInfo.countryCode || '中国')}
							>
								<Input disabled={true} maxLength={20}/>
							</Form.Item>
						</Col>
						<Col span={22}>
							<Form.Item
								label="地区"
								name={'address'}
								initialValue={operation === 'new' ? undefined : (
									baseInfo.state ? [baseInfo.state, baseInfo.city, baseInfo.district] : ''
								)}
							>
								<Cascader
									fieldNames={{
										label: 'label',
										value: 'label',
										children: 'children'
									}}
									options={SwCityData.data}
								/>
							</Form.Item>
						</Col>
						<Col span={22}>
							<Form.Item
								label="地址"
								name={'detailAddress'}
								initialValue={operation === 'new' ? undefined : baseInfo.detailAddress}
							>
								<Input maxLength={50}/>
							</Form.Item>
						</Col>
						<Col span={22}>
							<Form.Item
								label="邮编"
								name={'postCode'}
								initialValue={operation === 'new' ? undefined : baseInfo.postCode}
								rules={[
									formRegExp.range(6, 6),
									formRegExp.number()
								]}
							>
								<Input style={{width: '100%'}} maxLength={6}/>
							</Form.Item>
						</Col>
						<Col span={22}>
							<Form.Item
								label="备注"
								name={'content'}
								initialValue={operation === 'new' ? undefined : baseInfo.content}
							>
								<Input maxLength={50}/>
							</Form.Item>
						</Col>
					</Form>
				</div>
				<div
					style={{
						position: 'absolute',
						right: 0,
						bottom: 0,
						width: '100%',
						borderTop: '1px solid #e9e9e9',
						padding: '10px 16px',
						background: '#fff',
						textAlign: 'center',
					}}
				>
					<Button style={{marginRight: 8, width: 80, height: 32}} onClick={this.onOk} type="primary">
						保存
					</Button>
					<Button style={{width: 80, height: 32}} onClick={() => this.setState({formVisible: false})}>
						取消
					</Button>
				</div>
			</Drawer>
        );
	}
}

export default Partners;
