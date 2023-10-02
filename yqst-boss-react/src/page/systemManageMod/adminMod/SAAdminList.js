/**
 * Created by yb on 2019/05/22
 */
import React from 'react';
import {Button, Dropdown, Form, message, Menu, Modal, Input} from 'antd';
import {EllipsisOutlined, PlusOutlined} from '@ant-design/icons';
import SAAdminModel from "./model/SAAdminModel";
import SWTable from 'SWViews/table';
import moment from 'moment';
import TabsViewContent from "../../../baseview/tabsViewContent/TabsViewContent";
import HeadSearch from "../../../baseview/headSearch/HeadSearch";
import AssemblySet from "../../../baseview/assemblySet/AssemblySet";
import Md5 from "../../../utils/encryption/Md5";

const confirm = Modal.confirm;
const addCheckName = ['addLevel', 'addAlias', 'addAdminPassword', 'addAdminPasswords', 'addAdminName'];
const czpCheckName = ['czAdminPassword', 'czAdminPasswords'];
let bjCheckName = [];

class SAAdminLists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            requestPar: {
                total: 0,
                current: 1,
                pageSize: 10,
                level: 0,
                keyWord: '',
            },
            rowData: {},
            addVisible: false,
            confirmDirty: false,
            czVisible: false,
            czConfirmDirty: false,
            bjVisible: false,
        }
    }

    componentDidMount() {
        this.getList();
    }

    render() {
        return (
            <TabsViewContent
                crumb={[{name: '管理员'}, {name: "管理员列表"}]}
                // tabs={this.tabsConfig()}
            >
                <div style={{padding: '5px'}}>
                    {this.makeHeadSearch()}
                    {this.makeTable()}
                </div>

                <Modal
                    title="添加账号"
                    visible={this.state.addVisible}
                    maskClosable={false}
                    footer={null}
                    // onOk={() => {}}
                    onCancel={() => {
                        this.setState({addVisible: false});
                    }}
                >
                    {this.makeAddModView()}
                </Modal>

                <Modal
                    title="重置密码"
                    visible={this.state.czVisible}
                    maskClosable={false}
                    footer={null}
                    // onOk={() => {}}
                    onCancel={() => {
                        this.setState({czVisible: false, rowData: {}}, () => {this.props.form.resetFields(czpCheckName);});
                    }}
                >
                    {this.makeCZPView()}
                </Modal>

                <Modal
                    title="编辑信息"
                    visible={this.state.bjVisible}
                    maskClosable={false}
                    footer={null}
                    // onOk={() => {}}
                    onCancel={() => {
                        this.setState({bjVisible: false, rowData: {}}, () => {this.props.form.resetFields(bjCheckName);});
                    }}
                >
                    {this.makeBJView()}
                </Modal>
            </TabsViewContent>
        );
    }

    getList() {
        let {requestPar} = this.state;
        SAAdminModel.xtAdminList({
            current: requestPar.current || 1,
            pageSize: requestPar.pageSize || 10,
            level: requestPar.level,
            keyWord: requestPar.keyWord,
        }, (res) => {
            requestPar.total = res.data.total || 0;

            this.setState({
                list: res.data.records || [],
                requestPar,
                rowData: {},
                addVisible: false,
                confirmDirty: false,
                czVisible: false,
                czConfirmDirty: false,
                bjVisible: false,
            }, () => {this.props.form.resetFields([...addCheckName, ...czpCheckName, ...bjCheckName]);})
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
            {key: 'keyWord', type: 'Input', value: '', placeholder: '请输入账号 / 名称', label: '关键字', maxLength: 30},
            {key: 'level', type: 'Select', value: 0, placeholder: '请选择级别', label: '级别',
                list: [{value: 0, name: '全部'}, {value: 1, name: '用户'}, {value: 2, name: '管理员'}, {value: 3, name: '超级管理员'}],
            },
        ];
        return <HeadSearch data={searchDatas} form={this.props.form} callBack={(obj) => {
            obj.current = 1;
            this.setState({
                requestPar: {
                    ...this.state.requestPar,
                    ...obj
                }
            }, () => {this.getList();});
        }}/>
    }

    makeTable() {
        let {list, requestPar} = this.state;
        const columns = [
            {
                title: 'ID',
                key: 'id',
                dataIndex: 'id',
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
                    const levelName = ['', '用户', '管理员', '超级管理员'];
                    return <div>{levelName[res || 0]}</div>
                }
            },
            {
                title: '创建时间',
                key: 'createTime',
                dataIndex: 'createTime',
                render: (res) => {
                    return <span>
                        {res ? moment(res).format('YYYY-MM-DD') : ''}
                    </span>;
                }
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
                                <Button size={'small'} type="primary" onClick={() => {
                                    confirm({
                                        title: '温馨提示：',
                                        content: '编辑信息会导致正在使用的账户重新登录，是否继续？',
                                        cancelText: '取消',
                                        okText: '继续',
                                        onOk: () => {
                                            bjCheckName = [];
                                            this.setState({bjVisible: true, rowData: res});
                                        },
                                        onCancel: () => {
                                            // console.log('Cancel');
                                        },
                                    });
                                }}>
                                    编辑
                                </Button>
                            </Menu.Item>
                            
                            {'0' === '' + res.reset && <Menu.Item>
                                <Button size={'small'} type="primary" onClick={() => {
                                    confirm({
                                        title: '温馨提示：',
                                        content: '重置密码会导致正在使用的账户重新登录，是否继续？',
                                        cancelText: '取消',
                                        okText: '继续',
                                        onOk: () => {
                                            this.setState({czVisible: true, rowData: res});
                                        },
                                        onCancel: () => {
                                            // console.log('Cancel');
                                        },
                                    });
                                }}>
                                    重置密码
                                </Button>
                            </Menu.Item>}

                            {'3' !== '' + res.level && <Menu.Item>
                                <Button size={'small'} type="danger" onClick={() => {
                                    confirm({
                                        title: '是否要删除该账号?',
                                        content: '',
                                        okText: '是',
                                        okType: 'danger',
                                        cancelText: '否',
                                        width: 250,
                                        onOk:() => {
                                            SAAdminModel.xtAdminDelete({id: res.id}, (res) => {
                                                message.success('删除成功！', 1);
                                                setTimeout(() => {
                                                    this.state.requestPar.current = 1;
                                                    this.setState({requestPar: this.state.requestPar}, () => {this.getList();});
                                                }, 1200);
                                            }, (err) => {});
                                        },
                                        onCancel: () =>{
                                            // console.log('Cancel');
                                        },
                                    });
                                }}>
                                    删除
                                </Button>
                            </Menu.Item>}
                        </Menu>
                    );

                    return <div>
                        <Dropdown overlay={menu} placement="bottomCenter">
                            <EllipsisOutlined style={{fontSize: '30px', cursor: 'pointer'}}/>
                        </Dropdown>
                    </div>
                }
            },
        ];
        return <div>
            {/*用户级别没有添加账户的权限*/}
            {
                '1' !== '' + localStorage.userLevel && <div style={{marginBottom: '10px'}}>
                    <Button icon={<PlusOutlined />} type="primary" onClick={()=>{
                        this.props.form.resetFields(addCheckName);
                        this.setState({addVisible: true, confirmDirty: false});
                    }}>添加账号</Button>
                </div>
            }

            <SWTable
                columns={columns}
                dataSource={list}
                pagination={
                    {
                        total: requestPar.total,
                        current: requestPar.current,
                        pageSize: requestPar.size,
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

    validateToNextPassword = (rule, value, callback, vTextArr=[], confirmDirty) => {
        const form = this.props.form;
        if(value && value.length < 6){
            return callback('密码不能少于6个字符串！');
        }
        if (value && confirmDirty) {
            form.validateFields(vTextArr, { force: true });
        }
        callback();
    };

    compareToFirstPassword = (rule, value, callback, vText) => {
        const form = this.props.form;
        if(value && value.length < 6){
            return callback('密码不能少于6个字符串！');
        }
        if (value && value !== form.getFieldValue(vText)) {
            callback('两次密码不一致，请重新输入！');
        } else {
            callback();
        }
    };

    /*新增账户*/
    makeAddModView(){
        let levelList = [{value: '', name: '请选择'}];
        if('2' === '' + localStorage.userLevel){
            levelList = [
                {value: '', name: '请选择'},
                {value: '1', name: '用户'},
            ];
        }else if('3' === '' + localStorage.userLevel){
            levelList = [
                {value: '', name: '请选择'},
                {value: '1', name: '用户'},
                {value: '2', name: '管理员'},
            ];
        }
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
                    list: levelList,
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
                    }, {
                        validator: (rule, value, callback) => this.validateToNextPassword(rule, value, callback, ['addAdminPasswords'], this.state.confirmDirty),
                    }],
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
                    rules: [{
                        required: true, message: '确认密码不能为空',
                    }, {
                        validator: (rule, value, callback) => this.compareToFirstPassword(rule, value, callback, 'addAdminPassword'),
                    }],
                },
                attribute: {
                    maxLength: 20,
                    onBlur: (e) => {
                        this.setState({ confirmDirty: this.state.confirmDirty || !!e.target.value });
                    }
                }
            }
        ];
        return <Form autoComplete="off" onSubmit={(e) => {
            this.onSubmits(e)
        }}>
            {/*防止浏览器密码自动赋值*/}
            <div style={{ width: 0, height: 0, margin: 0, padding: 0, border: 0, overflow: 'hidden' }}>
                <Input key="autoCancelRealName" type="text" id="text" />
                <Input key="autoCancelPassword" type="password" id="password" autoComplete="new-password" />
                <Input key="autoCancelRealName2" type="text" id="text2" />
            </div>

            <AssemblySet key={'makeModView'} data={noSetData} form={this.props.form}/>
            <div style={{textAlign: 'right', borderTop: '1px solid #e8e8e8', paddingTop: '10px', marginTop: '10px'}}>
                <Button
                    style={{marginRight: 10}}
                    onClick={()=>{
                        this.setState({addVisible: false});
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
    }

    onSubmits(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(addCheckName, (err, values) => {
            if (!err) {
                SAAdminModel.xtAdminSave({
                    adminName: values.addAdminName,
                    adminPassword: Md5.hex_md5(values.addAdminPassword),
                    alias: values.addAlias,
                    level: values.addLevel,
                }, (res) => {
                    message.success('添加成功！', 1);
                    setTimeout(() => {
                        this.state.requestPar.current = 1;
                        this.setState({requestPar: this.state.requestPar}, () => {this.getList();});
                    }, 1200);
                }, (err) => {})
            }
        })
    }

    /*重置密码*/
    makeCZPView(){
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
                    }, {
                        validator: (rule, value, callback) => this.validateToNextPassword(rule, value, callback, ['czAdminPasswords'], this.state.czConfirmDirty),
                    }],
                },
                attribute: {
                    maxLength: 20,
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
                    rules: [{
                        required: true, message: '确认密码不能为空',
                    }, {
                        validator: (rule, value, callback) => this.compareToFirstPassword(rule, value, callback, 'czAdminPassword'),
                    }],
                },
                attribute: {
                    maxLength: 20,
                    onBlur: (e) => {
                        this.setState({ czConfirmDirty: this.state.czConfirmDirty || !!e.target.value });
                    }
                }
            }
        ];
        return <Form autoComplete="off" onSubmit={(e) => {
            this.onCZPSubmits(e)
        }}>
            {/*防止浏览器密码自动赋值*/}
            <div style={{ width: 0, height: 0, margin: 0, padding: 0, border: 0, overflow: 'hidden' }}>
                <Input key="autoCancelRealName" type="text" id="text" />
                <Input key="autoCancelPassword" type="password" id="password" autoComplete="new-password" />
                <Input key="autoCancelRealName2" type="text" id="text2" />
            </div>

            <AssemblySet key={'makeCZPView'} data={noSetData} form={this.props.form}/>
            <div style={{textAlign: 'right', borderTop: '1px solid #e8e8e8', paddingTop: '10px', marginTop: '10px'}}>
                <Button
                    style={{marginRight: 10}}
                    onClick={()=>{
                        this.setState({czVisible: false, rowData: {}}, () => {this.props.form.resetFields(czpCheckName);});
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
    }

    onCZPSubmits(e){
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(czpCheckName, (err, values) => {
            if (!err) {
                SAAdminModel.xtAdminUpdate({
                    id: this.state.rowData.id,
                    adminPassword: Md5.hex_md5(values.czAdminPassword),
                }, (res) => {
                    message.success('重置成功！', 1);
                    setTimeout(() => {
                        this.state.requestPar.current = 1;
                        this.setState({requestPar: this.state.requestPar}, () => {this.getList();});
                    }, 1200);
                }, (err) => {})
            }
        })
    }

    /*编辑账户信息*/
    makeBJView(){
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
        return <Form autoComplete="off" onSubmit={(e) => {
            this.onBJSubmits(e)
        }}>
            <AssemblySet key={'makeBJView'} data={noSetData} form={this.props.form}/>
            <div style={{textAlign: 'right', borderTop: '1px solid #e8e8e8', paddingTop: '10px', marginTop: '10px'}}>
                <Button
                    style={{marginRight: 10}}
                    onClick={()=>{
                        this.setState({bjVisible: false, rowData: {}}, () => {this.props.form.resetFields(bjCheckName);});
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
    }

    onBJSubmits(e){
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(bjCheckName, (err, values) => {
            if (!err) {
                let {rowData} = this.state, objs = {};
                objs.id = rowData.id;
                objs.alias = values.bjAlias;
                if('3' !== '' + rowData.level){
                    objs.level = values.bjLevel;

                }else{// 超级管理员不能修改等级
                    objs.level = rowData.level;
                }

                SAAdminModel.xtAdminSave({
                    ...objs,
                }, (res) => {
                    message.success('修改成功！', 1);
                    setTimeout(() => {
                        this.state.requestPar.current = 1;
                        this.setState({requestPar: this.state.requestPar}, () => {this.getList();});
                    }, 1200);
                }, (err) => {})
            }
        })
    }

}

const SAAdminList = SAAdminLists;
export default SAAdminList
