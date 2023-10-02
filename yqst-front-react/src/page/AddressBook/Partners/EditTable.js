import React from 'react'
import { Table, Input, InputNumber, Popconfirm, Divider, Select, message, Form } from 'antd';
import {formRegExp} from '../../../utils'
import cloneDeep from 'lodash/cloneDeep'


const EditableContext = React.createContext();

class EditableCell extends React.Component {

    getInput = () => {
        if (this.props.type === 'input') {
            return <Input/>;
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
                        initialValue={record[dataIndex]}
                        rules={
                            [
                                {
                                    required: dataIndex === 'phone' || dataIndex === 'name',
                                    message: `请输入 ${title}!`,
                                },
                                dataIndex === 'phone' && formRegExp.phone(),
                                dataIndex === 'name' && formRegExp.max(20)
                            ]
                        }
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
            // dataSource: cloneDeep(this.props.dataSource || []),
            dataSource: [],
        };
        this.columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                type: 'input',
                editable: true,
                width: '20%'
            },
            {
                title: '手机',
                dataIndex: 'phone',
                key: 'phone',
                type: 'input',
                editable: true,
                width: '20%'
            },
            {
                title: '部门',
                dataIndex: 'depName',
                key: 'depName',
                type: 'input',
                editable: true,
                width: '20%'
            },
            {
                title: '职务',
                dataIndex: 'jobName',
                key: 'jobName',
                type: 'input',
                editable: true,
                width: '20%'
            },
            {
                title: '操作',
                width: '20%',
                dataIndex: 'operation',
                key: 'operation',
                render: (text, record) => {
                    const {editingKey} = this.state;
                    const editable = this.isEditing(record);
                    return editable ? (
                            <span>
                            <EditableContext.Consumer>
                            {() => (
                                <a
                                    onClick={() => {
                                        window.globalPermissions.checkPermission('PARTNER_MANAGE_EDIT', (res) => {
                                            if(res)
                                                return message.error('抱歉，您没有该操作权限，请联系管理员！');

                                            this.save(this.formRef.current, record.key);
                                            this.props.resetPageSize();
                                        });
                                    }}
                                >
                                    保存
                                </a>
                            )}
                            </EditableContext.Consumer>
                            <Divider type='vertical'/>
                            <Popconfirm title="确认取消编辑状态?" onConfirm={() => {
                                this.cancel(record.key)
                                this.props.resetPageSize()
                                this.props.resetPageNumber(1)
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
                                <Popconfirm title="确认删除这条数据?" onConfirm={() => this.delete(record)}>
                                    <a>删除</a>
                                </Popconfirm>
                            </div>
                        );
                },
            },
        ];

        this.formRef = this.props.formRef;
    }

    isEditing = record => record.key === this.state.editingKey;

    cancel = (current) => {
        this.props.resetPageNumber(current)
        this.props.propsSetEdit(false)
        this.setState({editingKey: ''}, () => {
            this.formRef.current.resetFields();
        });
    };

    save(form, key) {
        form.validateFields().then(row => {
            const newData = [...this.props.dataSource];
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                this.props.setDataSource(newData, newData[index]);
                // this.props.propsSetEdit(false)
                this.setState({editingKey: ''}, () => {
                    form.resetFields();
                });
            } else {
                newData.push(row);
                // this.props.propsSetEdit(false)
                this.props.setDataSource(newData, row);
                this.setState({editingKey: ''}, () => {
                    form.resetFields();
                });
            }
        });
    }

    edit(key) {
        window.globalPermissions.checkPermission('PARTNER_MANAGE_EDIT', (res) => {
            if(res)
                return message.error('抱歉，您没有该操作权限，请联系管理员！');

            this.setState({editingKey: cloneDeep(key)});
        });
    }

    delete(item) {
        window.globalPermissions.checkPermission('PARTNER_MANAGE_EDIT', (res) => {
            if(res)
                return message.error('抱歉，您没有该操作权限，请联系管理员！');

            this.props.getDelete(item.id)
        });
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.edit || nextProps.dataSource) {
            return {
                editingKey: nextProps.edit ? nextProps.dataSource.length - 1 : prevState.editingKey || prevState.editingKey + '' === '0' ? prevState.editingKey : '',
                dataSource: nextProps.dataSource.map(item => {
                    return item
                }),
            }
        }
        return null;
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

        return (
            <EditableContext.Provider value={this.formRef.current}>
                <Form ref={this.formRef} autoComplete="off">
                    <Table
                        components={components}
                        bordered
                        dataSource={this.state.dataSource}
                        // dataSource={[{}]}
                        columns={columns}
                        rowClassName="editable-row"
                        pagination={{
                            disabled: this.props.pageSize === 11 || this.state.editingKey !== '',
                            onChange: this.cancel,
                            pageSize: this.props.pageSize,
                            current: this.props.current
                        }}
                    />
                </Form>

            </EditableContext.Provider>

        );
    }
}

export default EditableTable
