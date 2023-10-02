import React from 'react'
import {Table, Input, InputNumber, Popconfirm, Form, Divider, Select, Button, Tooltip} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {formRegExp} from '../../utils'
import isArray from 'lodash/isArray'

let inited = false
const EditableContext = React.createContext();

class EditableCell extends React.Component {
	getInput = () => {
		if (this.props.type === 'input') {
			return <Input maxLength={20}/>;
		} else if (this.props.type === 'inputNumber') {
			return <InputNumber/>;
		} else if (this.props.type === 'select') {
			return (
				<Select style={{width: '100%'}}>
					{
						this.props.options && this.props.options.map(item => {
							return (
								<Select.Option key={item.key} value={item.value}>{item.value}</Select.Option>
							)
						})
					}
				</Select>
			)
		}
		return <Input/>;
	};

	renderCell = () => {
		const {
			editing,
			dataIndex,
			title,
			inputType,
			record,
			index,
			children,
			...restProps
		} = this.props;
		return (
			<td {...restProps}>
				{editing ? (
					<Form.Item
						style={{margin: 0}}
						name={dataIndex}
						rules={[
							{
								required: dataIndex === 'optionName',
								message: `请输入 ${title}!`,
							},
							dataIndex === 'optionName' && formRegExp.max(20)
						]}
						initialValue={record[dataIndex]}
					>
						{this.getInput()}
					</Form.Item>
				) : (
					children
				)}
			</td>
		);
	};

	render() {
		return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
	}
}

class EditableTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editingKey: '',
			value: [],
			page: 1
		};
		this.columns = [
			{
				title: '序号',
				dataIndex: 'index',
				editable: false,
				width: '33.3%'
			},
			{
				title: '可选项名称',
				dataIndex: 'optionName',
				type: 'input',
				editable: true,
				width: '33.3%'
			},
			{
				title: '操作',
				dataIndex: 'operation',
				width: '33.3%',
				render: (text, record) => {
					const {editingKey} = this.state;
					const editable = this.isEditing(record);
					return editable ? (
							<span>
                            <EditableContext.Consumer>
                            {() => (
	                            <a
		                            onClick={() => {
			                            this.save(this.props.form, record.key)
		                            }}
	                            >
		                            保存
	                            </a>
                            )}
                            </EditableContext.Consumer>
                            <Divider type='vertical'/>
                            <Popconfirm title="确认取消编辑状态?" onConfirm={() => {
	                            this.cancel(record.key)
                            }}>
                                <a>取消</a>
                            </Popconfirm>
                        </span>)
						: (
							<div>
								<a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
									编辑
								</a>
								<Divider type='vertical'/>
								<Popconfirm disabled={editingKey !== ''} title="是否删除该选项?"
								            onConfirm={() => this.delete(record)}>
									<a style={{color: editingKey !== '' ? 'rgba(0, 0, 0, 0.25)' : '#4481EB'}}>删除</a>
								</Popconfirm>
							</div>
						);
				},
			},
		];
	}

	isEditing = record => record.key === this.state.editingKey;

	cancel = (current) => {
		const {value} = this.state;
		value.forEach((n, index) => {
			if (n.key === current && n.optionName === '') {
				value.splice(index, 1)
			}
		})
		this.setState({editingKey: ''});
	};


	save(form, key) {
		form.validateFields().then(row => {
			const newData = [...this.state.value];
			const {page} = this.state
			const index = newData.findIndex(item => key === item.key);
			if (index > -1) {
				const item = newData[index];
				newData.splice(index, 1, {
					...item,
					...row,
				});
				this.props.onChange(newData)
				this.setState({value: newData, editingKey: ''});
			} else {
				newData.splice(((page - 1) * 10), 0, row);
				this.props.onChange(newData)
				this.setState({value: newData, editingKey: ''});
			}
		});
	}

	edit(key) {
		this.setState({editingKey: key});
	}

	delete(item) {
		let {value} = this.state
		value = value.filter(n => n.key !== item.key)
		value.forEach((n, index) => n.key = index)
		this.props.onChange(value)
		this.setState({value})
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.value && isArray(nextProps.value)) {
			if (nextProps.value[0] && nextProps.value[0].key === undefined) {
				nextProps.value.forEach((n, index) => {
					n.key = index
					n.index = nextProps.value.length - index
				})
				return {
					value: nextProps.value
				}
			}
		}
		if (nextProps.value && nextProps.value !== prevState.value) {
			const {value} = nextProps;
			inited = true
			value.forEach((n, index) => {
				n.key = index
				n.index = value.length - index
			})
			return {
				value: nextProps.value
			}
		}

		if (nextProps.edit === true) {
			return {
				editingKey: nextProps.dataSource.length - 1
			}
		}
		return null;
	}

	arrHeadPush = (arr, item, index) => {
		const newArr = arr
		const {page} = this.state
		newArr.splice(((page - 1) * 10), 0, item[0]);
		return newArr
	}

	addPartners = () => {
		const newItem = [{index: this.state.value.length + 1, optionName: '', key: this.state.value.length}]
		const contactVOList = this.arrHeadPush(this.state.value, newItem, 0)
		contactVOList.forEach((n, index) => {
			n.index = contactVOList.length - index
		})
		this.setState({
			value: contactVOList,
			editingKey: this.state.value.length - 1
		})
	}


	render() {
		const components = {
			body: {
				cell: EditableCell,
			},
		};

		const columns = this.columns.map(col => {
			if (!col.editable) {
				return col;
			}
			return {
				...col,
				onCell: record => ({
					record,
					type: col.type,
					options: col.options,
					dataIndex: col.dataIndex,
					title: col.title,
					editing: this.isEditing(record),
				}),
			};
		});


		let dataSource = [...this.state.value]

		return (
			<div>
				<Tooltip title={this.state.value.length >= 50 ? '可选项详情最多只能添加 50 个' : ''}>
					<Button
						onClick={this.addPartners}
						type='primary'
						disabled={this.state.editingKey !== '' || this.state.value.length >= 50}
					>
						<PlusOutlined />
						添加可选项
					</Button>
				</Tooltip>
				<EditableContext.Provider value={this.props.form}>
					<Table
						components={components}
						bordered
						dataSource={dataSource}
						columns={columns}
						rowClassName="editable-row"
						pagination={{
							disabled: this.state.editingKey !== '',
							onChange: (page) => {
								this.setState({page})
							}
						}}
					/>
				</EditableContext.Provider>
			</div>
		);
	}
}

const EditableFormTable = EditableTable;
export default EditableFormTable
