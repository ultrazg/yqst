/**
 * Created by yb on 2019/11/6
 */

import React from 'react';
import {Button, Form, Input, message, Modal, Popconfirm} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import Model from "../Model";
import SWTable from 'SWViews/table';
import moment from 'moment';
// import {Link} from "react-router-dom";
import SwitchName from "./SwitchName";
import TabsViewContent from "../../../baseview/tabsViewContent/TabsViewContent";
import HeadSearch from "../../../baseview/headSearch/HeadSearch";
import AssemblySet from "../../../baseview/assemblySet/AssemblySet";
import NumberFormat from "../../../utils/numberformat/NumberFormat";
import Md5 from "../../../utils/encryption/Md5";
import CheckInput from "../../../utils/checkInput/CheckInput";

const confirm = Modal.confirm;
const addCheckName = ['addLevel', 'addAlias', 'addAdminPassword', 'addAdminPasswords', 'addAdminName'];
const czpCheckName = ['czAdminPassword', 'czAdminPasswords'];
let bjCheckName = [];


class AdministratorSetupList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            total: 0,
            requestPar: {
                current: 1,
                pageSize: 10,
                keyWord: '',
                level: '0',
            },
            addVisible: false,
            editorVisible: false,
            resetVisible: false,
            rowData: {},
        };
        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.getList();
    }

    render() {
        return (
            <>
                <Form ref={this.formRef}/>
                <TabsViewContent
                    crumb={[{name: '系统管理'}, {name: "管理员设置"}]}
                    // tabs={this.tabsConfig()}
                    topBtn={
                        <Button type='primary' icon={<PlusOutlined />} onClick={() => {
                            this.setState({addVisible: true});
                        }}>添加账号</Button>
                    }
                >
                    {this.makeHeadSearch()}
                    {this.makeTable()}
                    {this.makeAddModal()}
                    {this.makeEditorModal()}
                    {this.makeResetModal()}
                </TabsViewContent>
            </>
        );
    }

    getList() {
        Model.SystemSetupAList(this.state.requestPar, (res) => {
            this.setState({
                list: res.data.records || [],
                total: res.data.total || 0,
                addVisible: false,
                editorVisible: false,
                resetVisible: false,
            })
        }, (err) => {
        })
    }

    tabsConfig(){
        return [{
            tabName: '全部', callback: () => {
                this.setState({status: 0}, () => {
                    this.getList()
                })
            }
        }, {
            tabName: '申请中', callback: () => {
                this.setState({status: 1}, () => {
                    this.getList()
                })
            }
        }, {
            tabName: '申请成功', callback: () => {
                this.setState({status: 2}, () => {
                    this.getList()
                })
            }
        }, {
            tabName: '申请失败', callback: () => {
                this.setState({status: 3}, () => {
                    this.getList()
                })
            }
        }]
    }

    makeHeadSearch() {
        const searchDatas = [
            {key: 'keyWord', type: 'Input', value: '', placeholder: '可查询ID、账号、名称', label: '关键字', maxLength: 30},
            // {key: 'tiems', type:'RangePicker', value:'', placeholder: ['开始时间', '结束时间'], label: '发送时间',},
            {
                key: 'level', type: 'Select', value: '0', placeholder: '请选择级别', label: '级别',
                list: [
                    {value: '0', name: '全部'},
                    {value: '3', name: '超级管理员'},
                    {value: '2', name: '管理员'},
                    {value: '1', name: '用户'},
                ],
            },
        ];
        return <HeadSearch data={searchDatas} callBack={(obj) => {
            // obj.startTime = obj.tiems [0] || '';
            // obj.endTime = obj.tiems [1] || '';
            obj.current = 1;

            // delete obj.tiems;
            this.setState({
                requestPar: {
                    ...this.state.requestPar,
                    ...obj
                }
            }, () => {
                this.getList();
            });
        }}/>
    }

    makeTable() {
        let {list, requestPar} = this.state;
        const columns = [
            {
                title: 'ID',
                key: 'id',
                dataIndex: 'id',
                width: 90
            },
            {
                title: '账号',
                key: 'adminName',
                dataIndex: 'adminName',
            },
            {
                title: '名称',
                key: 'alias',
                dataIndex: 'alias',
            },
            {
                title: '级别',
                key: 'level',
                dataIndex: 'level',
                render: (res) => {
                    return SwitchName.level(res)
                }
            },
            {
                title: '创建时间',
                key: 'createTime',
                dataIndex: 'createTime',
                render: (res) => {
                    let times = res ? moment(res).format('YYYY-MM-DD HH:mm:ss') : '';

                    return times ? <div>
                        <div>{times.split(' ')[0]}</div>
                        <div>{times.split(' ')[1]}</div>
                    </div> : times;
                }
            },
            {
                title: '操作',
                key: '',
                dataIndex: '',
                width: 200,
                render: (res) => {
                    return <div>
                        <a onClick={() => {
                            confirm({
                                title: '温馨提示：',
                                content: '编辑信息会导致正在使用的账户重新登录，是否继续？',
                                cancelText: '取消',
                                okText: '继续',
                                onOk: () => {
                                    bjCheckName = [];
                                    this.setState({editorVisible: true, rowData: res}, () => {
                                        const {resetFields} = this.formRef.current;
                                        resetFields();
                                    });
                                },
                                onCancel: () => {
                                    // console.log('Cancel');
                                },
                            });}
                        }>
                            编辑
                        </a>
                        <span style={{
                            margin: '0 10px',
                            borderRight: '1px solid #d7d6d6',
                        }}/>
                        <a onClick={() => {
                            confirm({
                                title: '温馨提示：',
                                content: '重置密码会导致正在使用的账户重新登录，是否继续？',
                                cancelText: '取消',
                                okText: '继续',
                                onOk: () => {
                                    this.setState({resetVisible: true, rowData: res});
                                },
                                onCancel: () => {
                                    // console.log('Cancel');
                                },
                            });
                        }}>
                            重置密码
                        </a>
                        <span style={{
                            margin: '0 10px',
                            borderRight: '1px solid #d7d6d6',
                        }}/>
                        <Popconfirm
                            title="确定要删除该账号吗?"
                            placement="topRight"
                            onConfirm={() => {
                                Model.SystemSetupADelete({
                                    id: res.id
                                }, (res) => {
                                    message.success('删除成功！', 1);
                                    this.setState({requestPar: {
                                        ...this.state.requestPar,
                                        current: 1
                                    }}, () => {this.getList();});
                                }, (err) => {})
                            }}
                            onCancel={() => {}}
                            okText="确定"
                            cancelText="取消"
                        >
                            <a style={{color: '#f00'}}>删除</a>
                        </Popconfirm>
                    </div>
                }
            },
        ];
        return <div>
            <SWTable
                columns={columns}
                dataSource={list}
                pagination={
                    {
                        total: this.state.total,
                        current: requestPar.current,
                        pageSize: requestPar.pageSize,
                        onChange: (a, b) => {
                            let obj = this.state.requestPar;
                            obj.current = a;
                            this.setState({requestPar: obj}, () => {
                                this.getList();
                            })
                        },
                        showTotal: (total, range) => `共有${total}条`
                    }
                }
            />
        </div>
    }

    makeAddModal(){
        let noSetData = [
            {
                key: 'addLevel',
                type: 'Select',
                value: '',
                label: '账号级别',
                placeholder: '请选择账号级别',
                span: 24,
                options: {
                    rules: [{
                        required: true, message: '账号级别不能为空',
                    }],
                },
                data: {
                    list: [
                        {value: '', name: '请选择'},
                        {value: '1', name: '用户'},
                        {value: '2', name: '管理员'},
                    ],
                },
            },
            {
                key: 'addAdminName',
                type: 'Input',
                value: '',
                label: '账号',
                placeholder: '请输入账号',
                span: 24,
                options: {
                    rules: [{
                        required: true, message: '账号不能为空',
                    }],
                },
                attribute: {
                    maxLength: 30
                }
            },
            {
                key: 'addAlias',
                type: 'Input',
                value: '',
                label: '名称',
                placeholder: '请输入名称',
                span: 24,
                options: {
                    rules: [{
                        required: true, message: '名称不能为空',
                    }],
                },
                attribute: {
                    maxLength: 30
                }
            },
            {
                key: 'addAdminPassword',
                type: 'Password',
                value: '',
                label: '密码',
                placeholder: '请输入密码',
                span: 24,
                options: {
                    rules: [{
                        required: true, message: '密码不能为空',
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (value && value.length < 8) {
                                return Promise.reject('密码不能少于8个字符！');
                            } else if (!CheckInput.checkPsw(value)) {
                                return Promise.reject('请输入合适的8位到18位密码');
                            } else if (CheckInput.checkPswSameKind(value)) {
                                return Promise.reject('密码需包含以下两种类型，大小写字母、数字、特殊字符');
                            }
                            return Promise.resolve();
                        },
                    }),
                    /*{
                        validator: (rule, value, callback) => this.validateToNextPassword(rule, value, callback, ['addAdminPasswords'], this.state.confirmDirty),
                    }*/],
                },
                attribute: {
                    maxLength: 20,
                }
            },
            {
                key: 'addAdminPasswords',
                type: 'Password',
                value: '',
                label: '确认密码',
                placeholder: '请再次输入密码',
                span: 24,
                options: {
                    dependencies: ['addAdminPassword'],
                    rules: [{
                        required: true, message: '确认密码不能为空',
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (value && getFieldValue('addAdminPassword') !== value) {
                                return Promise.reject('两次密码不一致，请重新输入！');
                            }
                            return Promise.resolve();
                        },
                    }),
                    /*{
                        validator: (rule, value, callback) => this.compareToFirstPassword(rule, value, callback, 'addAdminPassword'),
                    }*/],
                },
                attribute: {
                    maxLength: 20,
                    onBlur: (e) => {
                        this.setState({ confirmDirty: this.state.confirmDirty || !!e.target.value });
                    }
                }
            }
        ];
        return <Modal
            title="添加账号"
            visible={this.state.addVisible}
            maskClosable={false}
            footer={null}
            // onOk={() => {}}
            onCancel={() => {
                this.setState({addVisible: false}, () => {
                    const {resetFields} = this.formRef.current;
                    resetFields(addCheckName);
                });
            }}
        >
            <Form ref={this.formRef} autoComplete="off" onFinish={(values) => {
                this.onAddSubmits(values)
            }}>
                {/*防止浏览器密码自动赋值*/}
                <div style={{ width: 0, height: 0, margin: 0, padding: 0, border: 0, overflow: 'hidden' }}>
                    <Input key="autoCancelRealName" type="text" id="text" />
                    <Input key="autoCancelPassword" type="password" id="password" autoComplete="new-password" />
                    <Input key="autoCancelRealName2" type="text" id="text2" />
                </div>
                <AssemblySet key={'addModKey'} data={noSetData} form={this.formRef.current}/>
                <div style={{color: '#999', fontSize: 10, paddingLeft: 30}}>
                    {"8位到18位密码，密码需包含以下类型的两种，大小字母、数字、特殊字符只能是\~\!\@\#\$\%\^\&\*\(\)\[\]\{\}\<\>\_\=\:\.\,\'\"\+\-\;\|\/\\"}
                </div>
                <div style={{textAlign: 'right', borderTop: '1px solid #e8e8e8', paddingTop: '10px', marginTop: '10px'}}>
                    <Button
                        style={{marginRight: 10}}
                        onClick={()=>{
                            this.setState({addVisible: false}, () => {
                                const {resetFields} = this.formRef.current;
                                resetFields(addCheckName);
                            });
                        }}
                    >取消</Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        确定
                    </Button>
                </div>
            </Form>
        </Modal>
    }

    validateToNextPassword = (rule, value, callback, vTextArr=[], confirmDirty) => {
        const {validateFields} = this.formRef.current;
        if(value && value.length < 6){
            return callback('密码不能少于6个字符串！');
        }
        if (value && confirmDirty) {
            validateFields(vTextArr, { force: true });
        }
        callback();
    };

    compareToFirstPassword = (rule, value, callback, vText) => {
        const {getFieldValue} = this.formRef.current;
        if(value && value.length < 6){
            return callback('密码不能少于6个字符串！');
        }
        if (value && value !== getFieldValue(vText)) {
            callback('两次密码不一致，请重新输入！');
        } else {
            callback();
        }
    };

    onAddSubmits(values) {
        Model.SystemSetupASave({
            adminName: values.addAdminName,
            adminPassword: Md5.hex_md5(values.addAdminPassword),
            alias: values.addAlias,
            level: values.addLevel,
        }, (res) => {
            message.success('添加成功！', 1);
            const {resetFields} = this.formRef.current;
            resetFields(addCheckName);
            this.setState({requestPar: {
                    ...this.state.requestPar,
                    current: 1
                }}, () => {this.getList();});
        }, (err) => {})
    }

    makeEditorModal(){
        const {rowData} = this.state;
        let noSetData = [
            {
                key: 'adminNameText',
                type: 'Texts',
                value: rowData.adminName,
                label: '账号',
                span: 24,
            },
            {
                key: 'bjAlias',
                type: 'Input',
                value: rowData.alias,
                label: '名称',
                placeholder: '请输入名称',
                span: 24,
                options: {
                    rules: [{
                        required: true, message: '名称不能为空',
                    }],
                },
                attribute: {
                    maxLength: 30
                }
            },
        ];
        // 超级管理员只能修改名称
        if('3' === '' + rowData.level){
            bjCheckName = ['bjAlias'];
        }else{
            bjCheckName = ['bjAlias', 'bjLevel'];
            noSetData.splice(1, 0, {
                key: 'bjLevel',
                type: 'Select',
                value: rowData.level,
                label: '账号级别',
                placeholder: '请选择账号级别',
                span: 24,
                options: {
                    rules: [{
                        required: true, message: '账号级别不能为空',
                    }],
                },
                data: {
                    list: [
                        {value: '', name: '请选择'},
                        {value: '1', name: '用户'},
                        {value: '2', name: '管理员', disabled: '3' !== '' + localStorage.userLevel},
                    ],
                },
            });
        }
        return <Modal
            title="编辑信息"
            visible={this.state.editorVisible}
            maskClosable={false}
            footer={null}
            // onOk={() => {}}
            onCancel={() => {
                this.setState({editorVisible: false, rowData: {}}, () => {
                    const {resetFields} = this.formRef.current;
                    resetFields(bjCheckName);
                });
            }}
        >
            <Form ref={this.formRef} autoComplete="off" onFinish={(values) => {
                this.onEditorSubmits(values)
            }}>
                <AssemblySet key={'editorModKey'} data={noSetData} form={this.formRef.current}/>
                <div style={{textAlign: 'right', borderTop: '1px solid #e8e8e8', paddingTop: '10px', marginTop: '10px'}}>
                    <Button
                        style={{marginRight: 10}}
                        onClick={()=>{
                            this.setState({editorVisible: false, rowData: {}}, () => {
                                const {resetFields} = this.formRef.current;
                                resetFields(bjCheckName);
                            });
                        }}
                    >取消</Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        确定
                    </Button>
                </div>
            </Form>
        </Modal>
    }

    onEditorSubmits(values){
        let {rowData} = this.state, objs = {};
        objs.id = rowData.id;
        objs.alias = values.bjAlias;
        if('3' !== '' + rowData.level){
            objs.level = values.bjLevel;

        }else{// 超级管理员不能修改等级
            objs.level = rowData.level;
        }

        Model.SystemSetupASave({
            ...objs,
        }, (res) => {
            message.success('修改成功！');
            const {resetFields} = this.formRef.current;
            resetFields(bjCheckName);
            this.setState({
                requestPar: {
                    ...this.state.requestPar,
                    current: 1,
                },
                editorVisible: false,
            }, () => {this.getList();});
        }, (err) => {})
    }

    makeResetModal(){
        const {rowData} = this.state;
        let noSetData = [
            {
                key: 'adminNameText',
                type: 'Texts',
                value: rowData.adminName,
                label: '账号',
                span: 24,
            },
            {
                key: 'czAdminPassword',
                type: 'Password',
                value: '',
                label: '重置密码',
                placeholder: '请输入重置密码',
                span: 24,
                options: {
                    rules: [{
                        required: true, message: '重置密码不能为空',
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (value && value.length < 8) {
                                return Promise.reject('密码不能少于8个字符！');
                            } else if (!CheckInput.checkPsw(value)) {
                                return Promise.reject('请输入合适的8位到18位密码');
                            } else if (CheckInput.checkPswSameKind(value)) {
                                return Promise.reject('密码需包含以下两种类型，大小写字母、数字、特殊字符');
                            }
                            return Promise.resolve();
                        },
                    }),
                    /*{
                        validator: (rule, value, callback) => this.validateToNextPassword(rule, value, callback, ['czAdminPasswords'], this.state.czConfirmDirty),
                    }*/],
                },
                attribute: {
                    maxLength: 18,
                }
            },
            {
                key: 'czAdminPasswords',
                type: 'Password',
                value: '',
                label: '确认密码',
                placeholder: '请再次输入密码',
                span: 24,
                options: {
                    dependencies: ['czAdminPassword'],
                    rules: [{
                        required: true, message: '确认密码不能为空',
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (value && getFieldValue('czAdminPassword') !== value) {
                                return Promise.reject('两次密码不一致，请重新输入！');
                            }
                            return Promise.resolve();
                        },
                    }),
                    /*{
                        validator: (rule, value, callback) => this.compareToFirstPassword(rule, value, callback, 'czAdminPassword'),
                    }*/],
                },
                attribute: {
                    maxLength: 18,
                    onBlur: (e) => {
                        this.setState({ czConfirmDirty: this.state.czConfirmDirty || !!e.target.value });
                    }
                }
            }
        ];
        return <Modal
            title="重置密码"
            visible={this.state.resetVisible}
            maskClosable={false}
            footer={null}
            // onOk={() => {}}
            onCancel={() => {
                const {resetFields} = this.formRef.current;
                resetFields(czpCheckName);
                this.setState({resetVisible: false, rowData: {}});
            }}
        >
            <Form ref={this.formRef} autoComplete="off" onFinish={(values) => {
                this.onResetSubmits(values)
            }}>
                {/*防止浏览器密码自动赋值*/}
                <div style={{ width: 0, height: 0, margin: 0, padding: 0, border: 0, overflow: 'hidden' }}>
                    <Input key="autoCancelRealName" type="text" id="text" />
                    <Input key="autoCancelPassword" type="password" id="password" autoComplete="new-password" />
                    <Input key="autoCancelRealName2" type="text" id="text2" />
                </div>

                <AssemblySet key={'makeCZPView'} data={noSetData} form={this.formRef.current}/>
                <div style={{color: '#999', fontSize: 10, paddingLeft: 30}}>
                    {"8位到18位密码，密码需包含以下类型的两种，大小字母、数字、特殊字符只能是\~\!\@\#\$\%\^\&\*\(\)\[\]\{\}\<\>\_\=\:\.\,\'\"\+\-\;\|\/\\"}
                </div>
                <div style={{textAlign: 'right', borderTop: '1px solid #e8e8e8', paddingTop: '10px', marginTop: '10px'}}>
                    <Button
                        style={{marginRight: 10}}
                        onClick={()=>{
                            const {resetFields} = this.formRef.current;
                            resetFields(czpCheckName);
                            this.setState({resetVisible: false, rowData: {}});
                        }}
                    >取消</Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        确定
                    </Button>
                </div>
            </Form>
        </Modal>
    }

    onResetSubmits(values){
        Model.SystemSetupAUpdate({
            id: this.state.rowData.id,
            adminPassword: Md5.hex_md5(values.czAdminPassword),
        }, (res) => {
            message.success('重置成功！', 1);
            const {resetFields} = this.formRef.current;
            resetFields(czpCheckName);
            this.setState({
                requestPar: {
                    ...this.state.requestPar,
                    current: 1,
                },
                resetVisible: false
            }, () => {this.getList();});
        }, (err) => {})
    }

}

export default AdministratorSetupList
