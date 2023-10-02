import React, {Component, Fragment} from 'react';
import {Form, Button, Table, Menu, Dropdown, Modal, message} from 'antd';
import {EllipsisOutlined, PlusOutlined, CopyOutlined, DownloadOutlined} from '@ant-design/icons';
import moment from 'moment';
import get from 'lodash/get';
import HeadSearch from '../../../../baseview/headSearch/HeadSearch';
import accountingModel from '../../model/accountingModel';
import AssemblySet from '../../../../baseview/assemblySet/AssemblySet';
import ViewContent from '../../../../baseview/viewContent/ViewContent';
import BatchImportModal from './SubjectBatchImportModal';
import oDownLoad from '../../../../utils/download';
import ApiConst from '../../../../base/urls/ApiConst';
import ApiInterface from '../../../../base/urls/ApiInterface';
import Ellipsis from '../../../../baseview/Ellipsis';

const confirm = Modal.confirm;

class SubjectLists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 1, // 当前页数
            pageSize: 10, // 每页数目
            total: 0, // 总条数
            list: [],
            kmVisible: false,
            batchImportVisible: false,
            defaultValue: undefined,
            downloadLoading: false
        };
    }

    componentDidMount() {
        this.getList();
    }

    // 获取页面 table 数据逻辑
    getList = (keyWord, current = this.state.current) => {
        const {pageSize} = this.state;
        const cons = {current, pageSize, keyWord};
        if (!keyWord) delete cons.keyWord;
        accountingModel.getAccountingList(cons, (res) => {
            this.setState({
                list: res.data.records,
                total: res.data.total,
                current: res.data.current
            });
        });
    };

    // 新建或者修改逻辑
    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (err) return;
            delete values.name;
            const {defaultValue} = this.state;
            if (get(defaultValue, 'id')) {
                values.id = this.state.defaultValue.id;
            } else {
                delete values.id;
            }
            if (values.courseRange === '' || values.courseRange === undefined) values.courseRange = '';
            accountingModel.saveOrUpdateAccounting({...values}, (res) => {
                if (res && res.ret === 0) {
                    message.success('保存成功');
                    this.getList();
                    this.setState({kmVisible: false});
                }
            });
        });
    };

    // 新建模态框关闭清除默认状态逻辑
    modalClose = () => {
        this.setState({
            defaultValue: undefined
        });
    };

    // 修改逻辑
    edit = (record) => {
        this.setState({defaultValue: record, kmVisible: true});
    };

    // 删除逻辑
    showDeleteConfirm = (record) => {
        const vthis = this;
        confirm({
            title: `确认删除标准科目ID : ${record.id} 的内容?`,
            // content: 'Some descriptions',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                accountingModel.deleteAccounting({id: record.id}, res => {
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

    // 批量导入点击确定逻辑
    batchImportOk = () => {

    };

    // 模板下载逻辑
    downloadTemplateFile = () => {
        // 给下载按钮设置 loading,防止网络慢疯狂点击导致下载很多个文件
        this.setState({downloadLoading: true});
        setTimeout(() => {
            this.setState({downloadLoading: false});
        }, 1500);

        const sessionKey = localStorage.getItem('sessionKey');
        const url = `${ApiConst.Versions().sunaw + ApiInterface.subjectDownload}?sessionKey=${sessionKey}`;
        oDownLoad(url);
    };

    // 视图层
    render() {
        return (
            <Fragment>
                <ViewContent crumb={[{name: '基础设置'}, {name: '标准科目列表'}]}>
                    <div style={{background: '#fff', padding: '5px', margin: '5px', borderRadius: '6px'}}>
                        {this.makeHeadSearch()}
                        {this.makeTable()}
                    </div>
                    <BatchImportModal
                        visible={this.state.batchImportVisible}
                        handleOk={this.batchImportOk}
                        handleCancel={() => this.setState({batchImportVisible: false})}
                        refresh={this.getList}
                    />

                    <Modal
                        title={'新建标准科目'}
                        visible={this.state.kmVisible}
                        destroyOnClose
                        afterClose={this.modalClose}
                        onOk={() => {
                            this.handleSubmit();
                        }}
                        onCancel={() => {
                            this.setState({kmVisible: false});
                        }}
                        width={600}
                        maskClosable={false}
                    >
                        {this.mackKmMod()}
                    </Modal>
                </ViewContent>
            </Fragment>
        );
    }

    // 生成搜索内容
    makeHeadSearch() {
        // 搜索字段
        const searchDatas = [
            {key: 'id', type: 'Input', value: '', placeholder: '搜索：ID / 编号 / 科目名称', label: '关键字搜索', maxLength: 30}
        ];
        return (
            <HeadSearch data={searchDatas} form={this.props.form} callBack={(obj) => {
                this.setState({
                    current: 1
                }, () => {
                    this.getList(obj.id);
                });
            }}/>
        );
    }

    // 生成列表
    makeTable() {
        const columns = [
            {title: '标准科目ID', key: 'id', dataIndex: 'id'},
            {
                title: '编号', key: 'courseSn', dataIndex: 'courseSn', render: text => (
                    <Ellipsis length={15} tooltip>{text}</Ellipsis>
                )
            },
            {
                title: '标准科目名称', key: 'courseName', dataIndex: 'courseName', render: text => (
                    <Ellipsis length={15} tooltip>{text}</Ellipsis>
                )
            },
            {
                title: '会计科目适用范围', key: 'courseRange', dataIndex: 'courseRange', render: text => (
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
                key: '',
                dataIndex: '',
                width: 100,
                render: (text, record) => {
                    const menu = (
                        <Menu style={{textAlign: 'center'}}>
                            <Menu.Item>
                                <Button onClick={() => this.edit(record)} size={'small'} type="primary">编辑</Button>
                            </Menu.Item>
                            <Menu.Item>
                                <Button
                                    size={'small'}
                                    type="primary"
                                    onClick={() => this.showDeleteConfirm(record)}
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
                <Button type='primary' icon={<PlusOutlined />} onClick={() => {
                    this.setState({kmVisible: true});
                }}>新建标准科目</Button>
                <span style={{width: '10px', display: 'inline-block'}}/>
                <Button onClick={() => this.setState({batchImportVisible: true})} type='primary'
                        icon={<CopyOutlined />}>批量导入</Button>
                <span style={{width: '10px', display: 'inline-block'}}/>
                <Button
                    loading={this.state.downloadLoading}
                    onClick={this.downloadTemplateFile}
                    type='primary'
                    icon={<DownloadOutlined />}
                >
                    下载模板
                </Button>
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
                        onChange: (a, b) => {
                            this.setState({current: a}, () => {
                                this.getList();
                            });
                        },
                        showTotal: (total, range) => `共有${total}条`
                    }
                }
            />
        </div>;
    }

    // 生成表单
    mackKmMod() {
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
                key: 'courseSn',
                type: 'Input',
                span: 24,
                value: get(defaultValue, 'courseSn'),
                placeholder: '请填写编号',
                label: '编号',
                options: {
                    rules: [{
                        required: true, message: '编号不能为空'
                    }, {
                        pattern: new RegExp('^\\w+$', 'g'),
                        message: '只能为字母或者数字不能包含特殊符号,中文,空格等'
                    }]
                },
                attribute: {
                    maxLength: 10
                }
            },
            {
                key: 'courseName',
                type: 'Input',
                span: 24,
                value: get(defaultValue, 'courseName'),
                placeholder: '请填写标准科目名称',
                label: '标准科目名称',
                options: {
                    rules: [{
                        required: true, message: '标准科目名称不能为空'
                    }]
                },
                attribute: {
                    maxLength: 30
                }
            },
            {
                key: 'courseRange',
                type: 'Input',
                span: 24,
                value: get(defaultValue, 'courseRange'),
                placeholder: '请填写会计科目适用范围',
                label: '会计科目适用范围',
                attribute: {
                    maxLength: 30
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
    }
}

const SubjectList = SubjectLists;

export default SubjectList;
