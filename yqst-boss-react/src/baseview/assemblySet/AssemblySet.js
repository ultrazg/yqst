/**
 * Created by yb on 2018/10/26  （集成常用的组件，用于新增和编辑）
 */
import React, {Component} from 'react';
import {Form, Row, Col, Select, Input, InputNumber, Radio, Cascader, DatePicker, Switch} from 'antd';
import {EyeOutlined, EyeInvisibleOutlined} from '@ant-design/icons';
import {connect} from 'react-redux';
import moment from 'moment';
import './AssemblySetCss.less';
import CityData from '../../resource/SwCityData';
import UploadFile from '../uploadFile/UploadFile'
import UploadOnlyFile from '../uploadFile/UploadOnlyFile'
import cloneDeep from 'lodash/cloneDeep'
import MultitermForm from './MultitermForm'


const Option = Select.Option;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const {RangePicker} = DatePicker;
const {TextArea} = Input;
const dateFormat = 'YYYY-MM-DD';
let formItemLayout = {
	labelCol: {
		xs: {span: 24},
		sm: {span: 6},
	},
	wrapperCol: {
		xs: {span: 24},
		sm: {span: 18},
	},
};

class AssemblySets extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
	}

	// 组件生成器
	makeHtml() {
		const {data = []} = this.props;
		if(!this.props.form){
			return []
		}
		let htmls = data.map((item, idx) => {
			item.span = item.span || 8;
			const NewFormItemLayout = Object.assign(cloneDeep(formItemLayout), item.formItemLayout || {});
			switch (item.type) {
				// 单行文本、多行文本输入框组件
				case 'Input':
					let isTextArea = false;
					if (item.attribute && 'textarea' === item.attribute.type) {
						isTextArea = true;
						item.attribute.maxLength = item.attribute.maxLength ? item.attribute.maxLength : 200;
						item.attribute.style = item.attribute.style ? item.attribute.style : {
							width: '100%',
							height: '100px',
						};
					}
					return <Col span={item.span} key={item.key + idx}>
						<FormItem {...NewFormItemLayout} label={item.label} className={'inputCss'} hasFeedback={false}>
							<FormItem name={item.key} initialValue={item.value} {...item.options}>
								{
									!isTextArea ? <Input placeholder={item.placeholder} {...item.attribute}/> :
										<TextArea placeholder={item.placeholder} {...item.attribute} showCount maxLength={item.attribute.maxLength || 200}/>
								}
							</FormItem>

						</FormItem>
					</Col>;

				// 密码框
				case 'Password':
					let pwTypes = !this.state[item.key] ? 'password' : 'text';
					// let pwIcon = !this.state[item.key] ? 'eye' : 'eye-invisible';
					let pwTitle = !this.state[item.key] ? '查看密码' : '隐藏密码';
					let pwIconColor = !this.state[item.key] ? '#000' : '#ccc';
					return <Col span={item.span} key={item.key + idx}>
						<FormItem{...NewFormItemLayout} label={item.label} hasFeedback={false}>
							<FormItem name={item.key} initialValue={item.value}{...item.options}>
								<Input placeholder={item.placeholder} type={pwTypes} {...item.attribute}/>
							</FormItem>

							{
								!this.state[item.key] ? (
									<EyeOutlined
										title={pwTitle} type={'eye'}
										style={{
											position: 'absolute',
											right: '10px',
											top: '7px',
											fontSize: '20px',
											cursor: 'pointer',
											color: pwIconColor,
										}}
										onClick={() => {
											const pasObj = {};
											pasObj[item.key] = !!!this.state[item.key];
											this.setState({...pasObj});
										}}
									/>
								) : (
									<EyeInvisibleOutlined
										title={pwTitle} type={'eye'}
										style={{
											position: 'absolute',
											right: '10px',
											top: '7px',
											fontSize: '20px',
											cursor: 'pointer',
											color: pwIconColor,
										}}
										onClick={() => {
											const pasObj = {};
											pasObj[item.key] = !!!this.state[item.key];
											this.setState({...pasObj});
										}}
									/>
								)
							}


						</FormItem>
					</Col>;

				// 数字输入框
				case 'InputNumber':
					return <Col className={'inputNumber'} span={item.span} key={item.key + idx}>
						<FormItem
							{...NewFormItemLayout}
							label={item.label}
							className={'inputCss'}
							hasFeedback={false}
							name={item.key}
							initialValue={item.value}
							{...item.options}
						>
							<InputNumber placeholder={item.placeholder} {...item.attribute}/>
						</FormItem>
					</Col>;

				// 下拉框组件
				case 'Select':
					let initialValue = {initialValue: item.value + ''};
					if ('null' === '' + item.value ||
						'undefined' === '' + item.value ||
						(item.value.constructor === Array && item.value.length <= 0)
					) {
						initialValue = {};

					} else if (item.value.constructor === Array && item.value.length > 0) {
						initialValue = {initialValue: item.value};

					} else if (item.value || '0' === '' + item.value) {
						initialValue = {initialValue: item.value + ''};
					}

					return <Col span={item.span} key={item.key + idx}>
						<FormItem
							{...NewFormItemLayout}
							label={item.label}
							hasFeedback={false}
							name={item.key}
							{...initialValue}
							{...item.options}
						>
							<Select placeholder={item.placeholder} {...item.attribute} onChange={(value)=>{
								item.callBack && item.callBack(value)
							}}>
								{
									item.data && item.data.list && item.data.list.map((listItem, listIdx) => {
										return <Option
											key={'listItem_' + listIdx}
											disabled={listItem.disabled || false}
											value={(listItem[item.data.valueName] || listItem.value) + ''}
										>{listItem[item.data.labelName] || listItem.name}</Option>
									})
								}
							</Select>
						</FormItem>
					</Col>;

				// 输出 {key:id, label: name} 的 select
				case 'LabelSelect':
					return <Col span={item.span} key={item.key + idx}>
						<FormItem
							{...NewFormItemLayout}
							label={item.label}
							hasFeedback={false}
							name={item.key}
							initialValue={item.value}
							{...item.options}
						>
							<Select placeholder={item.placeholder} {...item.attribute}>
								{
									item.data && item.data.list && item.data.list.map((listItem, listIdx) => {
										return <Option
											key={'listItem_' + listIdx}
											disabled={listItem.disabled || false}
											value={(listItem[item.data.valueName] || listItem.value) + ''}
										>{listItem[item.data.labelName] || listItem.name}</Option>
									})
								}
							</Select>
						</FormItem>
					</Col>;

				// 多级联动下拉框
				case 'Cascader':
					// 不传基础数据时，默认为云企商通的地区组件
					/*  --- 格式 ---
					* const options = [{
						value: 'zhejiang',
						label: 'Zhejiang',
						children: [{
							value: 'hangzhou',
							label: 'Hangzhou',
							children: [{
							  value: 'xihu',
							  label: 'West Lake',
							}],
						  }],
					}]*
					*/
					let options = item.data && item.data.list ? item.data.list : CityData.data;
					return <Col span={item.span} key={item.key + idx}>
						<FormItem
							{...NewFormItemLayout}
							label={item.label}
							hasFeedback={false}
							name={item.key}
							initialValue={item.value}
							{...item.options}
						>
							<Cascader options={options} placeholder={item.placeholder} {...item.attribute}/>
						</FormItem>
					</Col>;

				// 单选组件
				case 'Radio':
					return <Col span={item.span} key={item.key + idx}>
						<FormItem
							{...NewFormItemLayout}
							label={item.label}
							hasFeedback={false}
							name={item.key}
							initialValue={item.value}
							{...item.options}
						>
							<RadioGroup placeholder={item.placeholder} {...item.attribute}>
								{
									item.data && item.data.list && item.data.list.map((listItem, listIdx) => {
										return <Radio key={'listItem_' + listIdx}
													  value={(listItem[item.data.valueName] || listItem.value) + ''}>{listItem[item.data.labelName] || listItem.name}</Radio>
									})
								}
							</RadioGroup>
						</FormItem>
					</Col>;

				// 开关组件
				case 'Switch':
					return <Col span={item.span} key={item.key + idx}>
						{item.parentNode}
						<FormItem
							{...NewFormItemLayout}
							label={item.label}
							hasFeedback={false}
							name={item.key}
							initialValue={item.value}
							valuePropName={'checked'}
							{...item.options}
						>
							<Switch
								checkedChildren={item.checkedChildren || '是'}
								unCheckedChildren={item.unCheckedChildren || '否'}
								onChange={(isCheck)=>{
									item.callBack && item.callBack(isCheck)
								}}
								{...item.attribute}
							/>
						</FormItem>

					</Col>;

				// 时间组件
				case 'DatePicker':
					let times = item.value ? moment(item.value, dateFormat) : null;
					return <Col span={item.span} key={item.key + idx}>
						<FormItem
							{...NewFormItemLayout}
							label={item.label}
							hasFeedback={false}
							name={item.key}
							initialValue={times}
							{...item.options}
						>
							<DatePicker
								placeholder={item.placeholder}
								{...item.attribute}
							/>
						</FormItem>
					</Col>;

				// 时间段组件
				case 'RangePicker':
					let ranTimes = item.value ? [moment(item.value[0], dateFormat), moment(item.value[1], dateFormat)] : null;
					let rpPlaceholder = item.placeholder ? item.placeholder : ['开始时间', '结束时间'];
					return <Col span={item.span} key={item.key + idx}>
						<FormItem
							{...NewFormItemLayout}
							label={item.label}
							hasFeedback={false}
							name={item.key}
							initialValue={ranTimes}
							{...item.options}
						>
							<RangePicker
								placeholder={rpPlaceholder}
								{...item.attribute}
							/>
						</FormItem>
					</Col>;

				// 上传、查看图片组件
				case 'UploadFile':
					return <Col span={item.span} className={'upFilCss'} key={item.key + idx}>
						<FormItem
							{...NewFormItemLayout}
							label={item.label}
							hasFeedback={false}
							name={item.key}
							initialValue={item.value}
							{...item.options}
						>
							<UploadFile key={item.key} data={item.data} callBackFiles={item.callBackFiles}/>
						</FormItem>
					</Col>;

				// 上传文件组件
				case 'UploadOnlyFile':
					return <Col span={item.span} className={'upFilCss'} key={item.key + idx}>
						<FormItem
							{...NewFormItemLayout}
							label={item.label}
							hasFeedback={false}
							name={item.key}
							initialValue={item.value}
							{...item.options}
						>
							<UploadOnlyFile key={item.key} data={item.data} callBackFiles={item.callBackFiles}/>
						</FormItem>
					</Col>;

				// 纯文本展示
				case 'Text':
					const allClassName = 'textCss' + (NewFormItemLayout.labelCol.sm.span);
					return <Col className={`textCss ${allClassName}`} span={item.span} key={item.key + idx}>
						<FormItem
							{...NewFormItemLayout}
							label={item.label}
							hasFeedback={false}
						    required={item.required ? item.required : false}
							name={item.key}
						>
							<div>{item.value}</div>
						</FormItem>
					</Col>;

				// 纯文本展示
				case 'Texts':
					return <Col className={`textsCss`} span={item.span} key={item.key + idx}>
						<FormItem
							{...NewFormItemLayout}
							label={item.label}
							hasFeedback={false}
						    required={item.required ? item.required : false}
							name={item.key}
						>
							<div>{item.value}</div>
						</FormItem>
					</Col>;
				case 'MultitermForm':
					return (
						<Col className={`textsCss`} span={item.span} key={item.key + idx}>
							<FormItem
								{...NewFormItemLayout}
								label={item.label}
								hasFeedback={false}
								name={item.key}
								initialValue={item.value}
								{...item.options}
							>
								<MultitermForm {...item.attribute} form={this.props.form}/>
							</FormItem>
						</Col>
					);

				// 自定义组件
				case 'Custom':
					return <Col span={item.span} key={item.key + idx}>
						<FormItem
							{...NewFormItemLayout}
							label={item.label}
							hasFeedback={false}
							name={item.key}
							initialValue={item.value}
							{...item.options}
						>
							{item.view || ''}
						</FormItem>
					</Col>;

				default:
					return <div key={'null_' + idx}/>;
			}
		});

		// 整理行和列 使用栅格布局，判断每一行值不大于24
		let spanSum = 0, rowHtml = [], colHtml = [];
		htmls.map((arrHtml, idx) => {
			const nextSpanSum = parseInt(spanSum) + parseInt(arrHtml.props.span);
			if (nextSpanSum >= 24) {
				if (nextSpanSum === 24) {
					colHtml.push(arrHtml);
				}
				rowHtml.push(colHtml);
				colHtml = [];
				spanSum = 0;

			}
			if (nextSpanSum !== 24) {
				colHtml.push(arrHtml);
				spanSum += arrHtml.props.span;
			}

		});
		if (colHtml.length > 0) rowHtml.push(colHtml);
		return rowHtml;
	}

	render() {
		return (
			<div className={'assLess'} style={this.props.styles ? {...this.props.styles} : {}}>
				{
					this.makeHtml().map((obj, idx) => {
						return <Row key={'makeHtml_' + idx} gutter={16}>
							{obj}
						</Row>
					})
				}
			</div>
		);
	}
}

const AssemblySet = AssemblySets;

function mapStateToProps(state) {
	const {IndexReducers} = state;
	return {IndexReducers}
}

export default connect(mapStateToProps)(AssemblySet)
