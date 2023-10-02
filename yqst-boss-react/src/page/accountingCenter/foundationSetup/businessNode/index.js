import React, {Component, Fragment} from 'react';
import {Button, Dropdown, Form, Menu, Table, Modal, message} from 'antd';
import {EllipsisOutlined, PlusOutlined} from '@ant-design/icons';
import moment from 'moment';
import get from 'lodash/get';
import ViewContent from '../../../../baseview/viewContent/ViewContent';
import HeadSearch from '../../../../baseview/headSearch/HeadSearch';
import accountingModel from '../../model/accountingModel';
import Ellipsis from '../../../../baseview/Ellipsis';
import AssemblySet from '../../../../baseview/assemblySet/AssemblySet';

const btnName = '新建节点';
const modalTitle = '业务节点';

const pageApi = accountingModel.businessNodePage;
const saveApi = accountingModel.businessNodeSave;
const deleteApi = accountingModel.businessNodeDelete;

const searchItem = [{
    key: 'id',
    type: 'Input',
    value: '',
    placeholder: '搜索：ID / 编号 / 节点名称',
    label: '关键字搜索',
    maxLength: 30
}];
const crumb = [{name: '基础设置'}, {name: '业务节点管理列表'}];
const styles = {
    container: {
        background: '#FFFFFF',
        padding: 5,
        margin: 5,
        borderRadius: 6
    },
    mb10: {
        marginBottom: 10
    },
    dropdownIcon: {
        fontSize: 30,
        cursor: 'pointer'
    },
    tac: {
        textAlign: 'center'
    }
};

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageSize: 10,
            current: 1,
            modalVisible: false,
            defaultValue: undefined
        };
    }

    componentDidMount() {
        this.getList();
    }

    /*
    * @param{Number} current 请求页码
    * @param{Object} keyWord 搜索参数
    * */
    getList = (current = this.state.current, keyWord) => {
        const {pageSize} = this.state;
        const cons = {current, pageSize, keyWord};
        if (!keyWord) delete cons.keyWord;
        pageApi(cons, (res) => {
            this.setState({
                list: res.data.records,
                total: res.data.total,
                current: res.data.current
            });
        });
    };

    submitForm = (values) => {
        const {defaultValue} = this.state;
        if (get(defaultValue, 'id')) values.id = defaultValue.id;
        saveApi(values, res => {
            if (res && res.ret !== 0) return;
            message.success('保存成功');
            this.setState({modalVisible: false});
            this.getList(this.state.current);
        });
    };

    render() {
        return (
            <Fragment>
                <ViewContent crumb={crumb}>
                    <div style={styles.container}>
                        {this.makeHeadSearch()}
                        {this.makeTable()}
                        {this.makeModal()}
                    </div>
                </ViewContent>
            </Fragment>
        );
    }

    // 生成搜索
    makeHeadSearch = () => {
        // 搜索字段
        const {form} = this.props;
        return (
            <HeadSearch
                data={searchItem}
                form={form}
                callBack={(obj) => {
                    this.getList(1, obj.id);
                }}
            />
        );
    };
    // 生成 Table
    makeTable = () => {
        const confirmDelete = (id) => {
            if (!id) return;
            deleteApi({id}, res => {
                if (res && res.ret !== 0) return;
                let currentPage = this.state.total - 1 % 10 === 0
                    ? this.state.current - 1
                    : this.state.current;
                this.getList(currentPage);
                message.success('删除业务节点成功');
            });
        };
        const showDeleteConfirm = (record) => {
            Modal.confirm({
                title: '是否确认删除该业务节点 ?',
                okText: '确定',
                okType: 'danger',
                cancelText: '取消',
                onOk() {
                    confirmDelete(get(record, 'id'));
                }
            });
        };
        const edit = (record) => {
            this.setState({
                defaultValue: record,
                modalVisible: true
            });
        };
        const columns = [
            {title: '节点 ID', key: 'id', dataIndex: 'id'},
            {
                title: '节点编号', key: 'nodeSn', dataIndex: 'nodeSn', render: text => (
                    <Ellipsis length={20} tooltip>{text}</Ellipsis>
                )
            },
            {
                title: '节点名称', key: 'name', dataIndex: 'name', render: text => (
                    <Ellipsis length={15} tooltip>{text}</Ellipsis>
                )
            },
            {
                title: '节点描述', key: 'memo', dataIndex: 'memo', render: (text) => (
                    <Ellipsis length={15} tooltip>{text}</Ellipsis>
                )
            },
            {
                title: '创建时间', key: 'createTime', dataIndex: 'createTime', render: (text) => (
                    <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>
                )
            },
            {
                title: '操作',
                width: 100,
                render: (text, record) => {
                    const menu = (
                        <Menu style={styles.tac}>
                            <Menu.Item>
                                <Button
                                    onClick={() => edit(record)}
                                    size={'small'} type="primary"
                                >
                                    编辑
                                </Button>
                            </Menu.Item>
                            <Menu.Item>
                                <Button
                                    size={'small'}
                                    type="primary"
                                    onClick={() => showDeleteConfirm(record)}
                                >
                                    删除
                                </Button>
                            </Menu.Item>
                        </Menu>
                    );
                    return (
                        <Dropdown overlay={menu} placement="bottomCenter">
                            <EllipsisOutlined style={styles.dropdownIcon}/>
                        </Dropdown>
                    );
                }
            }
        ];
        return (
            <Fragment>
                <div style={styles.mb10}>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => {
                            this.setState({modalVisible: true});
                        }}
                    >
                        {btnName}
                    </Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={this.state.list}
                    rowKey="id"
                    pagination={{
                        total: this.state.total,
                        current: this.state.current,
                        pageSize: this.state.size,
                        onChange: (current) => {
                            this.getList(current);
                        },
                        showTotal: (total) => `共有${total}条`
                    }}
                />
            </Fragment>
        );
    };
    // 生成表单
    makeFormItem = () => {
        const {defaultValue} = this.state;
        let noSetData = [
            {
                key: 'id',
                type: 'Texts',
                label: '标准科目ID',
                span: 24,
                value: get(defaultValue, 'id')
            },
            {
                key: 'nodeSn',
                type: 'Input',
                span: 24,
                value: get(defaultValue, 'nodeSn'),
                placeholder: '请填写节点编号',
                label: '节点编号',
                options: {
                    rules: [{
                        required: true, message: '节点编号不能为空'
                    }, {
                        pattern: new RegExp('^\\w+$', 'g'),
                        message: '只能为字母或者数字不能包含特殊符号,中文,空格等'
                    }]
                },
                attribute: {
                    maxLength: 30
                }
            },
            {
                key: 'name',
                type: 'Input',
                span: 24,
                value: get(defaultValue, 'name'),
                placeholder: '请填写节点名称',
                label: '节点名称',
                options: {
                    rules: [{
                        required: true, message: '节点名称不能为空'
                    }]
                },
                attribute: {
                    maxLength: 30
                }
            },
            {
                key: 'memo',
                type: 'Input',
                span: 24,
                value: get(defaultValue, 'memo'),
                placeholder: '请填写节点描述',
                label: '节点描述',
                options: {
                    rules: [{
                        required: true, message: '节点描述不能为空'
                    }]
                },
                attribute: {
                    type: 'textarea',
                    rows: 4,
                    maxLength: 200
                }
            }
        ];
        if (!defaultValue) {
            noSetData.splice(0, 1);
        }
        return (
            <div>
                <AssemblySet key={'mackKmMod'} data={noSetData} form={this.props.form}/>
            </div>
        );
    };
    // 生成新建表单模态框
    makeModal = () => {
        const {modalVisible, defaultValue} = this.state;
        const {form} = this.props;
        const handleOk = (e) => {
            e.preventDefault();
            form.validateFields((err, values) => {
                if (err) return;
                this.submitForm(values);
            });
        };
        return (
            <Modal
                title={`${defaultValue ? '修改' : '新建'}${modalTitle}`}
                destroyOnClose={true}
                visible={modalVisible}
                onOk={handleOk}
                afterClose={() => {
                    this.setState({defaultValue: undefined});
                }}
                onCancel={() => this.setState({modalVisible: false})}
            >
                {this.makeFormItem()}
            </Modal>
        );
    };
}

export default Index;
