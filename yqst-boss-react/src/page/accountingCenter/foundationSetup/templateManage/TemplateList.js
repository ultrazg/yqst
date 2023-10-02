import React, {Component, Fragment} from 'react';
import {Form, Button, Table, Menu, Dropdown, Modal, Tag, message} from 'antd';
import {EllipsisOutlined, PlusOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';
import moment from 'moment';
import accountingModel from '../../model/accountingModel';
import HeadSearch from '../../../../baseview/headSearch/HeadSearch';
import ViewContent from '../../../../baseview/viewContent/ViewContent';
import Ellipsis from '../../../../baseview/Ellipsis';

const confirm = Modal.confirm;

class TemplateLists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 1, // 当前页数
            pageSize: 10, // 每页数目
            total: 0, // 总条数
            list: [],
            kmVisible: false,
            isRotate: false
        };
    }

    componentDidMount() {
        this.getList();
    }

    getList = (keyWord, current = this.state.current) => {
        const {pageSize} = this.state;
        const cons = {current, pageSize, keyWord};
        if (!keyWord) delete cons.keyWord;
        accountingModel.getTemplateList(cons, (res) => {
            this.setState({
                list: res.data.records,
                total: res.data.total,
                current: res.data.current
            });
        });
    };

    // 视图层
    render() {
        return (
            <Fragment>
                <ViewContent crumb={[{name: '基础设置'}, {name: '科目模板列表'}]}>
                    <div style={{background: '#fff', padding: '5px', margin: '5px', borderRadius: '6px'}}>
                        {this.makeHeadSearch()}
                        {this.makeTable()}
                    </div>
                </ViewContent>
            </Fragment>

        );
    }


    // 设为默认
    setDefault = (record) => {
        const vthis = this;
        let title = `确认把模板名称 : ${record.templateName} 设为默认模板?`;
        if (record['isDefault'] === 1) {
            title = `确认把模板名称 : ${record.templateName} 取消默认模板?`;
        }
        confirm({
            title,
            okText: '确认',
            okType: 'default',
            cancelText: '取消',
            onOk() {
                accountingModel.templateUpdate({id: record.id}, res => {
                    if (res.ret === 0) {
                        vthis.getList();
                    }
                });
            },
            onCancel() {
                Modal.destroyAll();
            }
        });
    };

    // 删除逻辑
    showDeleteConfirm = (record) => {
        const vthis = this;
        Modal.confirm({
            title: `确认删除模板名称 : ${record.templateName} ?`,
            // content: 'Some descriptions',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                accountingModel.templateDelete({id: record.id}, res => {
                    if (res.ret === 0) {
                        if ((vthis.state.total - 1) % 10 === 0) {
                            vthis.getList(undefined, vthis.state.current - 1);
                        } else {
                            vthis.getList();
                        }
                        message.success('删除成功');
                    }
                });
            },
            onCancel() {
                Modal.destroyAll();
            }
        });
    };

    // 生成搜索内容
    makeHeadSearch() {
        // 搜索字段
        const searchDatas = [
            {key: 'name', type: 'Input', value: '', placeholder: '搜索：ID / 名称', label: '关键字搜索', maxLength: 30}
        ];
        return <HeadSearch data={searchDatas} form={this.props.form} callBack={(obj) => {
            this.setState({
                current: 1
            }, () => {
                this.getList(obj.name);
            });
        }}/>;
    }

    // 生成列表
    makeTable() {
        const columns = [
            {
                title: '默认状态',
                key: 'isDefault',
                dataIndex: 'isDefault',
                render: (text) => (
                    text + '' === '1' ? <Tag color="#108ee9">默认</Tag> : null
                )
            },
            {
                title: '模板ID',
                key: 'templateSn',
                dataIndex: 'templateSn',
                render: text => (
                    <Ellipsis length={20} tooltip={true}>{text}</Ellipsis>
                )
            },
            {
                title: '模板名称',
                key: 'templateName',
                dataIndex: 'templateName',
                render: text => (
                    <Ellipsis length={20} tooltip={true}>{text}</Ellipsis>
                )
            },
            {
                title: '备注',
                key: 'memo',
                dataIndex: 'memo',
                render: text => (
                    <Ellipsis length={20} tooltip={true}>{text}</Ellipsis>
                )
            },
            {
                title: '创建时间',
                key: 'createTime',
                dataIndex: 'createTime',
                render: (res) => (
                    <div>{res ? moment(res).format('YYYY-MM-DD HH:mm:ss') : ''}</div>
                )
            },
            {
                title: '操作',
                key: '',
                dataIndex: '',
                width: 100,
                render: (res) => {
                    const menu = (
                        <Menu style={{textAlign: 'center'}}>
                            <Menu.Item>
                                <Button onClick={() => this.setDefault(res)} size={'small'} type="primary">
                                    {res['isDefault'] === 0 ? '设为默认' : '取消默认'}
                                </Button>
                            </Menu.Item>
                            <Menu.Item>
                                <Link to={`/Pages/TemplateEdit?id=${res.id}`}>
                                    <Button
                                        size={'small'} type="primary">
                                        查看
                                    </Button>
                                </Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Button
                                    size={'small'}
                                    type="primary"
                                    onClick={() => {
                                        this.showDeleteConfirm(res);
                                    }}
                                >
                                    删除
                                </Button>
                            </Menu.Item>
                        </Menu>
                    );

                    return <div>
                        <Dropdown overlay={menu} placement="bottomCenter">
                            <EllipsisOutlined style={{fontSize: '30px', cursor: 'pointer'}}/>
                        </Dropdown>
                    </div>;
                }
            }
        ];
        return <div>
            <div style={{marginBottom: '10px'}}>
                <Link to={'/Pages/TemplateEdit'}>
                    <Button type='primary' icon={<PlusOutlined />}>新建科目模板</Button>
                </Link>
            </div>
            <Table
                columns={columns}
                dataSource={this.state.list}
                rowKey='id'
                pagination={
                    {
                        total: this.state.total,
                        current: this.state.current,
                        pageSize: this.state.size,
                        onChange: (a) => {
                            this.setState({current: a}, () => {
                                this.getList();
                            });
                        },
                        showTotal: (total) => `共有${total}条`
                    }
                }
            />
        </div>;
    }
}

const TemplateList = TemplateLists;

export default TemplateList;
