import React, {Component, Fragment} from 'react';
import {Button, Dropdown, Form, Menu, Table, Modal, Badge, message} from 'antd';
import {EllipsisOutlined, PlusOutlined} from '@ant-design/icons';
import moment from 'moment';
import get from 'lodash/get';
import ViewContent from '../../../../baseview/viewContent/ViewContent';
import HeadSearch from '../../../../baseview/headSearch/HeadSearch';
import accountingModel from '../../model/accountingModel';
import Ellipsis from '../../../../baseview/Ellipsis';

const btnName = '新建规则';

const pageApi = accountingModel.accountingRulePage;
const deleteApi = accountingModel.accountingRuleDelete;
const enableApi = accountingModel.accountingRuleEnable;

const searchItem = [{
    key: 'id',
    type: 'Input',
    value: '',
    placeholder: '搜索：ID / 编号 / 规则名称',
    label: '关键字搜索',
    maxLength: 30
}];
const crumb = [{name: '基础设置'}, {name: '记账规则管理列表'}];
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

    render() {
        return (
            <Fragment>
                <ViewContent crumb={crumb}>
                    <div style={styles.container}>
                        {this.makeHeadSearch()}
                        {this.makeTable()}
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
                message.success('删除记账规则成功');
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
            this.props.history.push('/Pages/AccountingRulesDetail?id=' + record.id);
        };
        const enable = (record) => {
            const that = this;
            Modal.confirm({
                title: `确定${record.status === 0 ? '启用' : '关闭'} ?`,
                okText: '确定',
                okType: 'default',
                cancelText: '取消',
                onOk() {
                    enableApi({id: record.id}, res => {
                        if (res && res.ret === 0) {
                            that.getList();
                        }
                    });
                }
            });
        };
        const columns = [
            {title: '规则 ID', key: 'id', dataIndex: 'id'},
            {
                title: '规则编号', key: 'ruleSn', dataIndex: 'ruleSn', render: (text) => (
                    <Ellipsis length={15} tooltip>{text}</Ellipsis>
                )
            },
            {
                title: '规则名称', key: 'name', dataIndex: 'name', render: (text) => (
                    <Ellipsis length={10} tooltip>{text}</Ellipsis>
                )
            },
            {
                title: '应用模板', key: 'templateName', dataIndex: 'templateName', render: (text) => (
                    <Ellipsis length={10} tooltip>{text}</Ellipsis>
                )
            },
            {
                title: '备注', key: 'memo', dataIndex: 'memo', render: (text) => (
                    <Ellipsis length={10} tooltip>{text}</Ellipsis>
                )
            },
            {
                title: '创建时间', key: 'createTime', dataIndex: 'createTime', render: (text) => (
                    <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>
                )
            },
            {
                title: '状态', key: 'status', dataIndex: 'status', render: (text) => (
                    text === 0
                        ? <Badge status="error" text='关闭'/>
                        : <Badge status="success" text='开启'/>
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
                                    onClick={() => enable(record)}
                                    size={'small'} type="primary"
                                >
                                    {record.status === 0 ? '启用' : '关闭'}
                                </Button>
                            </Menu.Item>
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
                            this.props.history.push('/Pages/AccountingRulesDetail');
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
}

export default Index;
