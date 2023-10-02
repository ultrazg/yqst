import React, {Component} from 'react';
import {DownOutlined, SearchOutlined} from '@ant-design/icons';
import {
    Form,
    Input,
    Button,
    message,
    Modal,
    Radio,
    Tree,
    Popconfirm,
} from 'antd';
import Model from '../Model'
import SWTable from 'SWViews/table';
import uniqBy from 'lodash/uniqBy';
import xor from 'lodash/xor';
import pull from 'lodash/pull';
import {del} from '../../../resource/index';
import PowerMenuModal from './ChildPages/PowerMenuModal';
import PowerContentModal from './ChildPages/PowerContentModal';
import IsPower from '../../Power/IsPower';
import {FolderOutlined} from '@ant-design/icons'
import SelectPeopleModal from "./ChildPages/SelectPeopleModal";
import cloneDeep from "lodash/cloneDeep";
import addressBookModel from "../../AddressBook/Model";

const {TreeNode, DirectoryTree} = Tree;
const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 4},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 20},
    },
};

class RoleAndPower extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: '角色',

            openTree: '默认角色',
            chooseRole: {},
            roleList: [],
            staList: [],
            staSelList: [],
            staSelKeys: [],
            staExpandedKeys: [],
            addRoleVis: false,
            staKeyWord: '',
            isEditor: false,
            addStaVis: false,
            allStaList: [],
            delStaId: [],

            chePowMenu: {},
            chePowInfo: {},
            updatedMenu: false,
            updatedInfo: false,
            isEdit: false,
        };

    }

    componentDidMount() {
        window.globalPermissions.checkPermission('ERP_ROLE_ENTER', (res) => {
            if (!res)
                this.getRList();
        });
    }


    render() {
        return (
            <div
                className={'rolPowCss'}
                style={{
                    width: '1116px',
                    margin: '24px auto',
                    minHeight: '648px',
                    borderRadius: '6px',
                    background: '#fff',
                    position: 'relative',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        width: '304px',
                        height: '100%',
                        background: '#F9FAFC',
                        borderRadius: '6px 0px 0px 6px',
                        padding: '12px 0',
                        overflowX: 'hidden',
                        overflowY: 'auto',
                    }}
                >
                    <div style={{textAlign: 'center', marginTop: '12px', marginBottom: '17px'}}>
                        <Radio.Group defaultValue={this.state.type} buttonStyle="solid" className={'Radio'}
                                     onChange={(e) => {
                                         this.setState({type: e.target.value});
                                     }}
                        >
                            <Radio.Button value="角色"
                                          style={{
                                              width: '114px',
                                              textAlign: 'center',
                                              height: '40px',
                                              lineHeight: '40px'
                                          }}
                            >角色</Radio.Button>
                            <Radio.Button value="权限组"
                                          style={{
                                              width: '114px',
                                              textAlign: 'center',
                                              height: '40px',
                                              lineHeight: '40px'
                                          }}
                            >权限组</Radio.Button>
                        </Radio.Group>
                    </div>
                    {/*{
                        '' + this.state.type === '角色' ? this.makeRoleLeftMenu() : this.makePowerLeftMenu()
                    }*/}
                    {
                        '' + this.state.type === '角色' ? <IsPower
                            isShowRes={false}
                            isShowWait={false}
                            key={'ERP_ROLE_ENTER'}
                            permissionsName={'ERP_ROLE_ENTER'}
                        >
                            {this.makeRoleLeftMenu()}
                        </IsPower> : <IsPower
                            isShowRes={false}
                            isShowWait={false}
                            key={'SYSTEM_AUTHORITY_ENTER'}
                            permissionsName={'SYSTEM_AUTHORITY_ENTER'}
                        >
                            <PowerMenuModal
                                data={{
                                    chePowMenu: this.state.chePowMenu,
                                    chePowInfo: this.state.chePowInfo,
                                    updatedMenu: this.state.updatedMenu,
                                    updatedInfo: this.state.updatedInfo,
                                    isEdit: this.state.isEdit,
                                }}
                                callBack={({chePowMenu, chePowInfo, updatedMenu, updatedInfo, isEdit}) => {
                                    this.setState({chePowMenu, chePowInfo, updatedMenu, updatedInfo, isEdit});
                                }}
                            />
                        </IsPower>
                    }
                </div>
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        paddingLeft: '304px'
                    }}
                >
                    {/*{
                        '' + this.state.type === '角色' ? this.makeRoleRightView() : this.makePowerRightView()
                    }*/}
                    {
                        '' + this.state.type === '角色' ? <IsPower
                            key={'ERP_ROLE_ENTER'}
                            permissionsName={'ERP_ROLE_ENTER'}
                            style={{paddingTop: '240px'}}
                            styleWait={{paddingTop: '240px'}}
                        >
                            {this.makeRoleRightView()}
                        </IsPower> : <IsPower
                            key={'SYSTEM_AUTHORITY_ENTER'}
                            permissionsName={'SYSTEM_AUTHORITY_ENTER'}
                            style={{paddingTop: '240px'}}
                            styleWait={{paddingTop: '240px'}}
                        >
                            <PowerContentModal
                                data={{
                                    chePowMenu: this.state.chePowMenu,
                                    chePowInfo: this.state.chePowInfo,
                                    updatedMenu: this.state.updatedMenu,
                                    updatedInfo: this.state.updatedInfo,
                                    isEdit: this.state.isEdit,
                                }}
                                callBack={({chePowMenu, chePowInfo, updatedMenu, updatedInfo, isEdit}) => {
                                    this.setState({chePowMenu, chePowInfo, updatedMenu, updatedInfo, isEdit});
                                }}
                            />
                        </IsPower>
                    }
                </div>
                {this.addRoleMod()}
                {this.addStaVis()}
            </div>
        );
    }

    getRList() {
        let {chooseRole, roleList} = this.state;

        Model.MyCompanyRList({}, (res) => {
            roleList = res.data || [];
            roleList.forEach(item => {
                if (item.roleType + '' === '2') {
                    chooseRole = item;
                    return false;
                }
            });

            this.setState({roleList, chooseRole}, () => {
                this.getRSList();
            });
        }, (err) => {
        });
    }

    getRSList(id) {
        let {chooseRole, staList, staKeyWord, staSelList} = this.state;
        Model.MyCompanyRSList({
            roleId: id ? id : chooseRole.id,
            keyWord: id ? '' : staKeyWord,
        }, (res) => {
            let newStaSelKeys = [];
            staList = uniqBy(res.data || [], 'staffId');
            ;
            staSelList = staList.map(item => {
                newStaSelKeys.push('' + item.staffId);
                item.key = item.staffId;

                return {
                    key: item.staffId,
                    name: item.staffName,
                    isAdmin: item.isAdmin,
                    logo: item.staffPhoto,
                }
            });
            this.setState({
                staList,
                staKeyWord: id ? '' : staKeyWord,
                staSelList,
                staSelKeys: newStaSelKeys,
                delStaId: [],
            });
        }, (err) => {
        });
    }

    getStaffListAll(deptId) {
        let {staExpandedKeys} = this.state;
        Model.StaffListAll({
            deptId: deptId ? deptId : 0,
            current: 1,
            pageSize: 10000,
            keyWord: '',
        }, (res) => {
            if (res.data.deptId) {
                staExpandedKeys = xor(staExpandedKeys, [res.data.deptId + ''])
            }
            this.setState({allStaList: this.clearUpData(res.data), staExpandedKeys});
        }, (err) => {
        });
    }

    getAllStaffList() {
        addressBookModel.erpStaffUserList({}, res => {
            const deptName = (list = []) => {
                let res = [];
                list.forEach(item => {
                    res.push(item.departmentName);
                });
                return res;
            };
            const allStaffUserList = res.data && res.data.map(item => {
                return {
                    ...item,
                    isHidden: false,
                    key: item.userId,
                    deptName: deptName(item.deptList || []).join(','),
                }
            });
            this.setState({
                allStaffUserList: allStaffUserList,
                addStaVis: true
            })
        })
    }

    clearUpData(data = null) {
        let {allStaList} = this.state;
        let list = [], chiObj = {};
        if (data) {
            chiObj.title = data.deptName;
            chiObj.key = data.deptId + '';
            chiObj.parentId = data.parentId;
            chiObj.parentName = data.parentName;
            chiObj.children = [];
            chiObj.isSection = true;

            if (data.members && data.members.records && data.members.records.length > 0) {
                data.members.records.forEach((item, idx) => {
                    chiObj.children.push({
                        ...item,
                        title: item.name,
                        key: item.id + '',
                        isSection: false,
                    });
                });
            }
            if (data.subDepts && data.subDepts.length > 0) {
                data.subDepts.forEach(item => {
                    chiObj.children.push({
                        title: item.deptName,
                        key: item.deptId + '',
                        parentId: item.parentId,
                        parentName: item.parentName,
                        hasChildren: item.hasChildren,
                        isSection: true,
                        children: item.members && item.members.records && item.members.records.length > 0 ? item.members.records.map((cItem) => {
                            return {
                                ...cItem,
                                title: cItem.name,
                                key: cItem.id + '',
                                isSection: false,
                            }
                        }) : [],
                    });
                });
            }
            list.push(chiObj);
        }
        if (allStaList && allStaList.length > 0) {
            const recFun = oldList => {
                oldList.forEach((item, idx) => {
                    if ('' + chiObj.key === '' + item.key) {
                        oldList[idx] = chiObj;
                    }
                    if (item.children && item.children.length > 0) {
                        return recFun(item.children);
                    }
                });
            };
            recFun(allStaList);
            list = allStaList;
        }
        return list;
    }

    makeRoleLeftMenu() {
        let {roleList, openTree, chooseRole} = this.state;
        let defRole = [], cusRole = [];
        roleList && roleList.forEach((item, idx) => {
            switch (item.roleType + '') {
                case '2':
                    defRole.push(
                        <TreeNode key={item.id} title={item.roleName} isLeaf/>
                    );
                    break;

                default:
                    cusRole.push(
                        <TreeNode title={item.roleName} key={item.id} isLeaf/>
                    );
                    break;
            }
        });

        return (
            <div>
                <div style={{textAlign: 'center', marginBottom: '15px'}}>
                    <Button
                        style={{width: '88px', height: '36px', fontSize: '14px'}}
                        onClick={() => {
                            window.globalPermissions.checkPermission('ERP_ROLE_INSERT', (res) => {
                                if (res)
                                    return message.error('抱歉，您没有该操作权限，请联系管理员！');
                                this.setState({addRoleVis: true});
                            });
                        }}
                    >新增角色</Button>
                </div>
                <DirectoryTree
                    // multiple
                    expandedKeys={[openTree]}
                    selectedKeys={[chooseRole.id + '']}
                    className={'Tree RoleTree'}
                    switcherIcon={<DownOutlined/>}
                    onSelect={(selectedKeys) => {
                        if (selectedKeys[0] && selectedKeys[0] + '' !== '默认角色' && selectedKeys[0] + '' !== '自定义角色') {
                            roleList.forEach(item => {
                                if (item.id + '' === selectedKeys[0] + '') {
                                    chooseRole = item;
                                    this.getRSList(item.id);
                                    return false;
                                }
                            });

                        } else if (selectedKeys[0] && selectedKeys[0] === openTree) {
                            openTree = '';

                        } else {
                            openTree = selectedKeys[0];

                        }
                        this.setState({openTree, chooseRole}, () => {
                        });
                    }}
                    onExpand={(expandedKeys) => {
                    }}
                >
                    <TreeNode title="默认角色" key="默认角色">
                        {defRole}
                    </TreeNode>
                    <TreeNode title="自定义角色" key="自定义角色">
                        {cusRole}
                    </TreeNode>
                </DirectoryTree>
            </div>
        );
    }

    // makePowerLeftMenu() {
    //     const menuList = [
    //         {
    //             name: '访客权限组',
    //             id: '1',
    //             isChecked: true,
    //         },
    //         {
    //             name: '产品经理权限组',
    //             id: '2',
    //             isChecked: false,
    //         },
    //         {
    //             name: '导购员权限组',
    //             id: '3',
    //             isChecked: false,
    //         },
    //     ];
    //     return <div>
    //         <div style={{textAlign: 'center', marginBottom: '15px'}}>
    //             <Button
    //                 style={{width: '102px', height: '36px', fontSize: '14px'}}
    //             >新增权限组</Button>
    //         </div>
    //         <ul className={'menu_Ul'}>
    //             {
    //                 menuList && menuList.map((item, idx) => {
    //                     return <li
    //                         key={'menu_' + idx}
    //                         className={item.isChecked ? 'onLi' : ''}
    //                         style={{
    //                             height: '40px',
    //                             lineHeight: '40px',
    //                             padding: '0 16px',
    //                             fontSize: '14px',
    //                             color: '#2B3441',
    //                             cursor: 'pointer',
    //                         }}
    //                     >
    //                         {item.name}
    //                     </li>
    //                 })
    //             }
    //         </ul>
    //     </div>
    // }

    makeRoleRightView() {
        let {staList, chooseRole, staKeyWord, staSelList, delStaId} = this.state;
        const columns = [
            {
                title: '姓名',
                key: 'staffName',
                dataIndex: 'staffName',
                width: '25%'
            },
            {
                title: '职务',
                key: 'jobName',
                dataIndex: 'jobName',
                width: '25%'
            },
            {
                title: '员工ID',
                key: 'staffId',
                dataIndex: 'staffId',
                width: '25%'
            },
            {
                title: '部门',
                key: '',
                dataIndex: '',
                width: '25%',
                render: (data) => {
                    let names = [];
                    data.deptVOS && data.deptVOS.forEach(item => {
                        names.push(item.departmentName);
                    });
                    return names.join(', ');
                }
            },
        ];
        const rowSelection = {
            selectedRowKeys: delStaId,
            onChange: (selectedRowKeys, selectedRows) => {
                // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                this.setState({delStaId: selectedRowKeys});
            },
            getCheckboxProps: record => ({
                disabled: '0' === '' + chooseRole.enableDelete && '1' === '' + record.isAdmin, // Column configuration not to be checked
            }),
        };

        return <div>
            {
                '2' === '' + chooseRole.roleType ? <IsPower
                    key={'ERP_ROLE_ADMIN_VIEW'}
                    permissionsName={'ERP_ROLE_ADMIN_VIEW'}
                    style={{paddingTop: '240px'}}
                >
                    <div
                        style={{
                            padding: '30px 32px'
                        }}
                    >
                        <h1
                            style={{fontSize: '20px', color: '#2B3441', lineHeight: '28px', marginBottom: '4px'}}
                        >{chooseRole.roleName ? `${chooseRole.roleName}（${staList.length}人）` : ''}
                            {
                                '0' !== '' + chooseRole.enableDelete ? <div
                                    style={{float: 'right', fontWeight: '100'}}
                                >
                                    <a
                                        onClick={() => {
                                            window.globalPermissions.checkPermission('ERP_ROLE_ADMIN_EDIT', (res) => {
                                                if (res)
                                                    return message.error('抱歉，您没有该操作权限，请联系管理员！');
                                                this.setState({isEditor: true, addRoleVis: true}, () => {
                                                    this.form && this.form.setFieldsValue({
                                                        roleName: chooseRole.roleName,
                                                        roleDesc: chooseRole.roleDesc,
                                                    });
                                                });
                                            });
                                        }}
                                    >编辑角色</a>
                                    <span
                                        style={{
                                            display: 'inline-block',
                                            width: '1px',
                                            margin: '0 9px',
                                            height: '14px',
                                            background: '#2B3441',
                                            position: 'relative',
                                            top: '2px',
                                        }}
                                    />
                                    <Popconfirm placement="bottom" title={'确定要删除该角色吗？'} okText="确定" cancelText="取消"
                                                onConfirm={() => {
                                                    window.globalPermissions.checkPermission('ERP_ROLE_ADMIN_EDIT', (res) => {
                                                        if (res)
                                                            return message.error('抱歉，您没有该操作权限，请联系管理员！');
                                                        Model.MyCompanyRDelete({
                                                            id: chooseRole.id
                                                        }, (res) => {
                                                            message.success('删除成功！');
                                                            this.setState({openTree: '默认角色',});
                                                            this.getRList();
                                                        }, (err) => {
                                                        });
                                                    });
                                                }}
                                    >
                                        <a style={{color: '#F12C20'}}>删除</a>
                                    </Popconfirm>
                                </div> : null
                            }
                        </h1>
                        <div
                            style={{
                                fontSize: '12px',
                                color: 'rgba(43,52,65,0.65)',
                                width: '532px',
                                marginBottom: '24px'
                            }}
                        >{chooseRole.roleDesc || ''}</div>
                        <div
                            style={{
                                position: 'relative'
                            }}
                        >
                            <SWTable
                                columns={columns}
                                dataSource={staList}
                                pagination={false}
                                funBtn={
                                    <div>
                                        <Button
                                            style={{width: '88px', height: '34px', fontSize: '14px'}}
                                            onClick={() => {
                                                window.globalPermissions.checkPermission('ERP_ROLE_ADMIN_EDIT', (res) => {
                                                    if (res)
                                                        return message.error('抱歉，您没有该操作权限，请联系管理员！');

                                                    // let newStaSelKeys = [];
                                                    // staSelList = staList.map(item => {
                                                    //     newStaSelKeys.push('' + item.staffId);
                                                    //     return {
                                                    //         key: item.staffId,
                                                    //         name: item.staffName,
                                                    //         isAdmin: item.isAdmin,
                                                    //         logo: item.staffPhoto,
                                                    //     }
                                                    // });
                                                    // this.setState({
                                                    //     staSelList,
                                                    //     staSelKeys: newStaSelKeys,
                                                    //     addStaVis: true,
                                                    // }, () => {
                                                    //     this.getStaffListAll();
                                                    // });
                                                    this.getAllStaffList()
                                                });
                                            }}
                                        >添加成员</Button>
                                        {
                                            !delStaId || delStaId.length <= 0 ? <Button
                                                    disabled={!delStaId || delStaId.length <= 0 ? true : false}
                                                    style={{
                                                        width: '88px',
                                                        height: '34px',
                                                        fontSize: '14px',
                                                        marginLeft: '16px'
                                                    }}
                                                >删除</Button> :
                                                <Popconfirm placement="bottom" title={'确定要删除这些员工吗？'} okText="确定"
                                                            cancelText="取消"
                                                            onConfirm={() => {
                                                                window.globalPermissions.checkPermission('ERP_ROLE_ADMIN_EDIT', (res) => {
                                                                    if (res)
                                                                        return message.error('抱歉，您没有该操作权限，请联系管理员！');

                                                                    Model.MyCompanyRSBDelete({
                                                                        roleId: chooseRole.id,
                                                                        staffIdList: delStaId.join(',')
                                                                    }, (res) => {
                                                                        message.success('删除成功！');
                                                                        this.getRSList(chooseRole.id);
                                                                    }, (err) => {
                                                                    })
                                                                });
                                                            }}
                                                >
                                                    <Button
                                                        disabled={!delStaId || delStaId.length <= 0 ? true : false}
                                                        style={{
                                                            width: '88px',
                                                            height: '32px',
                                                            fontSize: '14px',
                                                            marginLeft: '16px'
                                                        }}
                                                    >删除</Button>
                                                </Popconfirm>
                                        }
                                    </div>
                                }
                                rowSelection={rowSelection}
                            />
                            <div
                                style={{
                                    position: 'absolute',
                                    right: '24px',
                                    top: '8px',
                                }}
                            >
                                <Input placeholder="请输入员工名字"
                                       value={staKeyWord}
                                       style={{
                                           width: '210px',
                                           height: '34px',
                                           lineHeight: '34px',
                                           fontSize: '12px',
                                           verticalAlign: 'top'
                                       }}
                                       onChange={(e) => {
                                           this.setState({staKeyWord: e.target.value});
                                       }}
                                />
                                <Button type="primary"
                                        style={{
                                            width: '64px',
                                            height: '34px',
                                            fontSize: '14px',
                                            marginLeft: '16px'
                                        }}
                                        onClick={() => {
                                            this.getRSList();
                                        }}
                                >搜索</Button>
                            </div>
                        </div>
                    </div>
                </IsPower> : <IsPower
                    key={'ERP_ROLE_VIEW'}
                    permissionsName={'ERP_ROLE_VIEW'}
                    style={{paddingTop: '240px'}}
                >
                    <div
                        style={{
                            padding: '30px 32px'
                        }}
                    >
                        <h1
                            style={{fontSize: '20px', color: '#2B3441', lineHeight: '28px', marginBottom: '4px'}}
                        >{chooseRole.roleName ? `${chooseRole.roleName}（${staList.length}人）` : ''}
                            {
                                '0' !== '' + chooseRole.enableDelete ? <div
                                    style={{float: 'right', fontWeight: '100'}}
                                >
                                    <a
                                        onClick={() => {
                                            window.globalPermissions.checkPermission('ERP_ROLE_EDIT', (res) => {
                                                if (res)
                                                    return message.error('抱歉，您没有该操作权限，请联系管理员！');
                                                this.setState({isEditor: true, addRoleVis: true}, () => {
                                                    this.form && this.form.setFieldsValue({
                                                        roleName: chooseRole.roleName,
                                                        roleDesc: chooseRole.roleDesc,
                                                    });
                                                });
                                            });
                                        }}
                                    >编辑角色</a>
                                    <span
                                        style={{
                                            display: 'inline-block',
                                            width: '1px',
                                            margin: '0 9px',
                                            height: '14px',
                                            background: '#2B3441',
                                            position: 'relative',
                                            top: '2px',
                                        }}
                                    />
                                    <Popconfirm placement="bottom" title={'确定要删除该角色吗？'} okText="确定" cancelText="取消"
                                                onConfirm={() => {
                                                    window.globalPermissions.checkPermission('ERP_ROLE_DELETE', (res) => {
                                                        if (res)
                                                            return message.error('抱歉，您没有该操作权限，请联系管理员！');
                                                        Model.MyCompanyRDelete({
                                                            id: chooseRole.id
                                                        }, (res) => {
                                                            message.success('删除成功！');
                                                            this.setState({openTree: '默认角色',});
                                                            this.getRList();
                                                        }, (err) => {
                                                        });
                                                    });
                                                }}
                                    >
                                        <a style={{color: '#F12C20'}}>删除</a>
                                    </Popconfirm>
                                </div> : null
                            }
                        </h1>
                        <div
                            style={{
                                fontSize: '12px',
                                color: 'rgba(43,52,65,0.65)',
                                width: '532px',
                                marginBottom: '24px'
                            }}
                        >{chooseRole.roleDesc || ''}</div>
                        <div
                            style={{
                                position: 'relative'
                            }}
                        >
                            <SWTable
                                columns={columns}
                                dataSource={staList}
                                pagination={false}
                                funBtn={
                                    <div>
                                        <Button
                                            style={{width: '88px', height: '32px', fontSize: '14px'}}
                                            onClick={() => {
                                                window.globalPermissions.checkPermission('ERP_ROLE_EDIT', (res) => {
                                                    if (res)
                                                        return message.error('抱歉，您没有该操作权限，请联系管理员！');

                                                    // let newStaSelKeys = [];
                                                    // staSelList = staList.map(item => {
                                                    //     newStaSelKeys.push('' + item.staffId);
                                                    //     return {
                                                    //         key: item.staffId,
                                                    //         name: item.staffName,
                                                    //         isAdmin: item.isAdmin,
                                                    //         logo: item.staffPhoto,
                                                    //     }
                                                    // });
                                                    // this.setState({
                                                    //     staSelList,
                                                    //     staSelKeys: newStaSelKeys,
                                                    //     addStaVis: true,
                                                    // }, () => {
                                                    //     this.getStaffListAll();
                                                    // });
                                                    this.getAllStaffList()
                                                });
                                            }}
                                        >添加成员</Button>
                                        {
                                            !delStaId || delStaId.length <= 0 ? <Button
                                                    disabled={!delStaId || delStaId.length <= 0 ? true : false}
                                                    style={{
                                                        width: '88px',
                                                        height: '34px',
                                                        fontSize: '14px',
                                                        marginLeft: '16px'
                                                    }}
                                                >删除</Button> :
                                                <Popconfirm placement="bottom" title={'确定要删除这些员工吗？'} okText="确定"
                                                            cancelText="取消"
                                                            onConfirm={() => {
                                                                window.globalPermissions.checkPermission('ERP_ROLE_EDIT', (res) => {
                                                                    if (res)
                                                                        return message.error('抱歉，您没有该操作权限，请联系管理员！');
                                                                    Model.MyCompanyRSBDelete({
                                                                        roleId: chooseRole.id,
                                                                        staffIdList: delStaId.join(',')
                                                                    }, (res) => {
                                                                        message.success('删除成功！');
                                                                        this.getRSList(chooseRole.id);
                                                                    }, (err) => {
                                                                    })
                                                                });
                                                            }}
                                                >
                                                    <Button
                                                        disabled={!delStaId || delStaId.length <= 0 ? true : false}
                                                        style={{
                                                            width: '88px',
                                                            height: '34px',
                                                            fontSize: '14px',
                                                            marginLeft: '16px'
                                                        }}
                                                    >删除</Button>
                                                </Popconfirm>
                                        }
                                    </div>
                                }
                                rowSelection={rowSelection}
                            />
                            <div
                                style={{
                                    position: 'absolute',
                                    right: '24px',
                                    top: '8px',
                                }}
                            >
                                <Input placeholder="请输入员工名字"
                                       value={staKeyWord}
                                       style={{
                                           width: '210px',
                                           height: '34px',
                                           lineHeight: '34px',
                                           fontSize: '12px',
                                           verticalAlign: 'top'
                                       }}
                                       onChange={(e) => {
                                           this.setState({staKeyWord: e.target.value});
                                       }}
                                />
                                <Button type="primary"
                                        style={{
                                            width: '64px',
                                            height: '34px',
                                            fontSize: '14px',
                                            marginLeft: '16px'
                                        }}
                                        onClick={() => {
                                            this.getRSList();
                                        }}
                                >搜索</Button>
                            </div>
                        </div>
                    </div>
                </IsPower>
            }
        </div>
    }

    // makePowerRightView() {
    //     const list = [
    //         {
    //             title: '企业管理',
    //             number: '8',
    //         },
    //         {
    //             title: '同事管理',
    //             number: '8',
    //         },
    //         {
    //             title: '合作伙伴管理',
    //             number: '8',
    //         },
    //         {
    //             title: '应用管理器',
    //             number: '8',
    //         },
    //     ];
    //
    //     return <div
    //         style={{
    //             padding: '30px 32px'
    //         }}
    //     >
    //         <h1
    //             style={{fontSize: '20px', color: '#2B3441', lineHeight: '28px', marginBottom: '4px'}}
    //         >访客权限组
    //             <div
    //                 style={{float: 'right', fontWeight: '100'}}
    //             >
    //                 <a>编辑</a>
    //                 <span
    //                     style={{
    //                         display: 'inline-block',
    //                         width: '1px',
    //                         margin: '0 9px',
    //                         height: '14px',
    //                         background: '#2B3441',
    //                         position: 'relative',
    //                         top: '2px',
    //                     }}
    //                 />
    //                 <a>复制并新建</a>
    //                 <span
    //                     style={{
    //                         display: 'inline-block',
    //                         width: '1px',
    //                         margin: '0 9px',
    //                         height: '14px',
    //                         background: '#2B3441',
    //                         position: 'relative',
    //                         top: '2px',
    //                     }}
    //                 />
    //                 <a style={{color: '#F12C20'}}>删除</a>
    //             </div>
    //         </h1>
    //         <div
    //             style={{
    //                 fontSize: '12px',
    //                 color: 'rgba(43,52,65,0.65)',
    //                 width: '532px',
    //                 marginBottom: '16px'
    //             }}
    //         >
    //             我穿上纯色衬衫，笔直西裤，深色袜子，打开窗户，呆坐在书桌前，观察梧桐绿了枝桠没有，想今天早餐吃什么东西。
    //         </div>
    //         <Row
    //             style={{marginBottom: '26px'}}
    //         >
    //             <Col span={8}>
    //                 指定类型：企业架构
    //             </Col>
    //             <Col span={8}>
    //                 部门：行政部；采购部
    //             </Col>
    //             <Col span={8}>
    //                 职务：行政专员；采购专员
    //             </Col>
    //         </Row>
    //         <Collapse
    //             className={'Collapse'}
    //             expandIconPosition={'right'}
    //             defaultActiveKey={['1', '2']}
    //             onChange={() => {
    //             }}
    //         >
    //             <Panel header="基础功能权限" key="1">
    //                 <ul
    //                     className={'comtents_ul'}
    //                     style={{
    //                         marginBottom: '24px'
    //                     }}
    //                 >
    //                     {
    //                         list && list.map((item, idx) => {
    //                             return <li
    //                                 key={'com_' + idx}
    //                                 style={{
    //                                     padding: '0 16px',
    //                                     height: '48px',
    //                                     lineHeight: '48px',
    //                                     borderBottom: '1px solid rgba(43,52,65,0.09)',
    //                                     cursor: 'pointer',
    //                                 }}
    //                             >
    //                                 <Row>
    //                                     <Col span={18}>
    //                                         {item.title}
    //                                     </Col>
    //                                     <Col span={6}
    //                                          style={{textAlign: 'right'}}
    //                                     >
    //                                         已选{item.number}项
    //                                         <img src={leftArr} alt=""
    //                                              style={{
    //                                                  width: '9px',
    //                                                  height: '10px',
    //                                                  marginLeft: '10px',
    //                                              }}
    //                                         />
    //                                     </Col>
    //                                 </Row>
    //                             </li>
    //                         })
    //                     }
    //                 </ul>
    //             </Panel>
    //             <Panel header="基础功能权限" key="2">
    //                 <ul
    //                     className={'comtents_ul'}
    //                     style={{
    //                         marginBottom: '24px'
    //                     }}
    //                 >
    //                     {
    //                         list && list.map((item, idx) => {
    //                             return <li
    //                                 key={'com_' + idx}
    //                                 style={{
    //                                     padding: '0 16px',
    //                                     height: '48px',
    //                                     lineHeight: '48px',
    //                                     borderBottom: '1px solid rgba(43,52,65,0.09)',
    //                                     cursor: 'pointer',
    //                                 }}
    //                             >
    //                                 <Row>
    //                                     <Col span={18}>
    //                                         {item.title}
    //                                     </Col>
    //                                     <Col span={6}
    //                                          style={{textAlign: 'right'}}
    //                                     >
    //                                         已选{item.number}项
    //                                         <img src={leftArr} alt=""
    //                                              style={{
    //                                                  width: '9px',
    //                                                  height: '10px',
    //                                                  marginLeft: '10px',
    //                                              }}
    //                                         />
    //                                     </Col>
    //                                 </Row>
    //                             </li>
    //                         })
    //                     }
    //                 </ul>
    //             </Panel>
    //         </Collapse>
    //     </div>
    // }

    addRoleMod() {
        let {addRoleVis, isEditor, chooseRole} = this.state;
        return <Modal
            className={'Modal'}
            transitionName={''}
            width={546}
            title={isEditor ? '编辑角色' : '添加角色'}
            closable={false}
            visible={addRoleVis}
            onOk={() => {
            }}
            onCancel={() => {
                this.setState({addRoleVis: false, isEditor: false}, () => {
                    this.form && this.form.resetFields();
                });
            }}
            bodyStyle={{
                padding: '40px 42px 24px'
            }}
            footer={
                <div>
                    <Button type="primary" htmlType="submit"
                            style={{
                                width: '64px',
                                height: '34px',
                                marginRight: '16px',
                                fontSize: '14px'
                            }}
                            onClick={this.onSubmit.bind(this)}
                    >确定</Button>
                    <Button
                        style={{
                            width: '64px',
                            height: '34px',
                            fontSize: '14px'
                        }}
                        onClick={() => {
                            this.setState({addRoleVis: false, isEditor: false}, () => {
                                this.form && this.form.resetFields();
                            });
                        }}
                    >取消</Button>
                </div>
            }
        >
            <Form ref={(c) => this.form = c} {...formItemLayout} autoComplete="off" className={'Modal_Form'}
                  scrollToFirstError={true}>
                <Form.Item label={'角色名称'} name={'roleName'} rules={[
                    {required: true, message: '角色名称不能为空!'},
                    // {
                    //     validator: (rule, value, callback) => this.checkValidator(rule, value, callback)
                    // }
                ]}>
                    <Input
                        maxLength={30}
                        placeholder="请输入角色名称"
                    />
                </Form.Item>
                <Form.Item label={'角色描述'} name={'roleDesc'} rules={[
                    {required: false, message: '角色描述不能为空!'},
                    // {
                    //     validator: (rule, value, callback) => this.checkValidator(rule, value, callback)
                    // }
                ]}>
                    <Input
                        maxLength={50}
                        placeholder="请输入角色描述"
                    />
                </Form.Item>
            </Form>
        </Modal>
    }

    onSubmit = (e) => {
        e.preventDefault();
        let {isEditor, chooseRole} = this.state;
        let validateFields = this.form && this.form.validateFields;
        if (validateFields) {
            validateFields().then((values) => {
                values.roleDesc = values.roleDesc ? values.roleDesc : '';

                // 编辑
                if (isEditor) {
                    values.id = chooseRole.id;
                    values.staffList = '';
                    Model.MyCompanyRUpdate({
                        ...values,
                    }, (res) => {
                        message.success('编辑成功！');
                        Model.MyCompanyRList({}, (res) => {
                            chooseRole.roleName = values.roleName;
                            chooseRole.roleDesc = values.roleDesc;
                            this.setState({
                                roleList: res.data || [],
                                addRoleVis: false,
                                chooseRole,
                                isEditor: false
                            }, () => {
                                this.form && this.form.resetFields();
                            });
                        }, (err) => {
                        });
                    }, (err) => {
                    });

                    // 添加
                } else {
                    values.addStaffDTOS = '';
                    Model.MyCompanyRAdd({
                        ...values,
                    }, (res) => {
                        message.success('添加成功！');
                        Model.MyCompanyRList({}, (res) => {
                            if (isEditor) {
                                chooseRole.roleName = values.roleName;
                                chooseRole.roleDesc = values.roleDesc;
                            }
                            this.setState({
                                roleList: res.data || [],
                                addRoleVis: false,
                                chooseRole,
                                isEditor: false
                            }, () => {
                                this.form && this.form.resetFields();
                            });
                        }, (err) => {
                        });
                    }, (err) => {
                    });
                }
            })
        }
    }

    addStaVis() {
        let {addStaVis, allStaffUserList, staList, allStaList, staSelKeys, staSelList, staExpandedKeys, chooseRole} = this.state;
        // addStaVis
        return addStaVis ? <SelectPeopleModal
            setCancel={() => {
                this.setState({addStaVis: false})
            }}
            list={allStaffUserList || []}
            selectedList={staList.map((item) => item.staffId)}
            callback={(data) => {
                this.setState({
                    addStaVis: false,
                }, () => {
                    Model.MyCompanyRUpdate({
                        id: chooseRole.id,
                        roleName: chooseRole.roleName,
                        roleDesc: chooseRole.roleDesc,
                        staffList: JSON.stringify(data.map(item => {
                            return {
                                staffId: item.id,
                                staffName: item.name,
                                isAdmin: item.isAdmin ? item.isAdmin : 0,
                            }
                        })),
                    }, (res) => {
                        message.success('添加成功！');
                        this.setState({
                            staSelList: [],
                            staSelKeys: [],
                            staExpandedKeys: [],
                            addRoleVis: false,
                            staKeyWord: '',
                            isEditor: false,
                            addStaVis: false,
                            allStaList: [],
                        }, () => {
                            this.getRSList();
                        });
                    }, (err) => {
                    });
                });
            }}/> : null
        // return (
        //     <Modal
        //         className={'Modal'}
        //         width={546}
        //         title={'添加成员'}
        //         closable={false}
        //         visible={addStaVis}
        //         onOk={() => {
        //         }}
        //         onCancel={() => {
        //             this.setState({
        //                 staSelList: [],
        //                 staSelKeys: [],
        //                 staExpandedKeys: [],
        //                 addRoleVis: false,
        //                 staKeyWord: '',
        //                 isEditor: false,
        //                 addStaVis: false,
        //                 allStaList: [],
        //             });
        //         }}
        //         bodyStyle={{
        //             padding: '23px 24px'
        //         }}
        //         footer={<div>
        //             <Button type="primary"
        //                     style={{
        //                         width: '64px',
        //                         height: '34px',
        //                         marginRight: '16px',
        //                         fontSize: '14px',
        //                     }}
        //                     onClick={() => {
        //                         if (staSelList.length <= 0)
        //                             return message.error('请选择成员！');
        //                         Model.MyCompanyRUpdate({
        //                             id: chooseRole.id,
        //                             roleName: chooseRole.roleName,
        //                             roleDesc: chooseRole.roleDesc,
        //                             staffList: JSON.stringify(staSelList.map(item => {
        //                                 return {
        //                                     staffId: item.key,
        //                                     staffName: item.name,
        //                                     isAdmin: item.isAdmin ? item.isAdmin : 0,
        //                                 }
        //                             })),
        //                         }, (res) => {
        //                             message.success('添加成功！');
        //                             this.setState({
        //                                 staSelList: [],
        //                                 staSelKeys: [],
        //                                 staExpandedKeys: [],
        //                                 addRoleVis: false,
        //                                 staKeyWord: '',
        //                                 isEditor: false,
        //                                 addStaVis: false,
        //                                 allStaList: [],
        //                             }, () => {
        //                                 this.getRSList();
        //                             });
        //                         }, (err) => {
        //                         });
        //                     }}
        //             >
        //                 确定
        //             </Button>
        //             <Button
        //                 style={{
        //                     width: '64px',
        //                     height: '34px',
        //                     fontSize: '14px',
        //                 }}
        //                 onClick={() => {
        //                     this.setState({
        //                         staSelList: [],
        //                         staSelKeys: [],
        //                         staExpandedKeys: [],
        //                         addRoleVis: false,
        //                         staKeyWord: '',
        //                         isEditor: false,
        //                         addStaVis: false,
        //                         allStaList: [],
        //                     });
        //                 }}
        //             >
        //                 取消
        //             </Button>
        //         </div>}
        //     >
        //         <div
        //             style={{
        //                 display: 'flex',
        //                 justifyContent: 'space-around',
        //                 height: '332px'
        //             }}
        //         >
        //             <div
        //                 style={{
        //                     width: '49%'
        //                 }}
        //             >
        //                 <div
        //                     style={{
        //                         fontSize: '14px',
        //                         marginBottom: '16px',
        //                         color: '#2B3441'
        //                     }}
        //                 >选择：
        //                 </div>
        //                 <div
        //                     style={{
        //                         width: '100%',
        //                         height: '296px',
        //                         background: 'rgba(43,52,65,0.02)',
        //                         borderRadius: '4px',
        //                         padding: '9px 8px'
        //                     }}
        //                 >
        //                     <Input
        //                         placeholder="搜索"
        //                         size="small"
        //                         style={{
        //                             fontSize: '12px',
        //                             marginBottom: '8px'
        //                         }}
        //                         prefix={<SearchOutlined/>}
        //                         onPressEnter={(e) => {
        //                             if (e.target.value || '' + e.target.value === '0') {
        //                                 Model.CommunicationPage({
        //                                     current: 1,
        //                                     pageSize: 10000,
        //                                     type: 2,
        //                                     keyWord: e.target.value
        //                                 }, (res) => {
        //                                     let newAllStaList = [];
        //                                     if (res.data.deptVO && res.data.deptVO.length > 0) {
        //                                         res.data.deptVO.forEach(item => {
        //                                             newAllStaList.push({
        //                                                 ...item,
        //                                                 title: item.depName,
        //                                                 key: item.deptId + '',
        //                                                 isSection: true,
        //                                             });
        //                                         });
        //                                     }
        //                                     if (res.data.staffVO && res.data.staffVO.records && res.data.staffVO.records.length > 0) {
        //                                         res.data.staffVO.records.forEach(item => {
        //                                             newAllStaList.push({
        //                                                 ...item,
        //                                                 logo: item.logo,
        //                                                 title: item.name,
        //                                                 key: item.id + '',
        //                                                 isSection: false,
        //                                             });
        //                                         });
        //                                     }
        //                                     this.setState({allStaList: newAllStaList});
        //                                 }, (err) => {
        //                                 });
        //
        //                             } else {
        //                                 this.setState({allStaList: []}, () => {
        //                                     this.getStaffListAll();
        //                                 });
        //
        //                             }
        //
        //                         }}
        //                     />
        //                     <div
        //                         style={{
        //                             height: '100%',
        //                             overflow: 'auto',
        //                         }}
        //                     >
        //                         <DirectoryTree
        //                             className={'staTree sw-textOverflow'}
        //                             multiple={true}
        //                             switcherIcon={<DownOutlined/>}
        //                             onExpand={(expandedKeys, e) => {
        //                                 this.setState({staExpandedKeys: expandedKeys});
        //                             }}
        //                             expandedKeys={staExpandedKeys}
        //                             onSelect={(selectedKeys, e) => {
        //                                 let res = false, onItem = {};
        //                                 const judgeFun = (list = []) => {
        //                                     list.map(item => {
        //                                         if (item.children && item.children.length > 0) {
        //                                             judgeFun(item.children);
        //                                         }
        //                                         if ('' + item.key === '' + selectedKeys[0]) {
        //                                             res = item.isSection;
        //                                             if (!item.isSection) {
        //                                                 onItem = {
        //                                                     ...item,
        //                                                     key: item.key,
        //                                                     name: item.name,
        //                                                     isAdmin: item.isAdmin,
        //                                                     logo: item.logo,
        //                                                 }
        //                                             }
        //                                         }
        //                                     });
        //                                 };
        //                                 judgeFun(allStaList);
        //                                 if (res) {
        //                                     this.getStaffListAll(selectedKeys[0]);
        //
        //                                 } else {
        //                                     if ('1' !== '' + onItem.activeType) {
        //                                         return message.error('员工还未激活，暂不可添加为角色成员！');
        //                                     }
        //                                     staSelKeys = xor(staSelKeys, selectedKeys);
        //                                     // staSelList.push(onItem);
        //                                     let hasIdx = null;
        //                                     staSelList.forEach((item, idx) => {
        //                                         if ('' + selectedKeys[0] === '' + item.key) {
        //                                             hasIdx = idx;
        //                                         }
        //                                     });
        //                                     if ('' + hasIdx === 'null') {
        //                                         staSelList.push(onItem);
        //
        //                                     } else {
        //                                         if ('0' !== '' + chooseRole.enableDelete && '1' !== '' + staSelList[hasIdx].isAdmin) {
        //                                             staSelList.splice(hasIdx, 1);
        //                                         }
        //                                     }
        //                                     this.setState({staSelKeys, staSelList});
        //
        //                                 }
        //                             }}
        //                             selectedKeys={staSelKeys}
        //                         >
        //                             {this.renderTreeNodes(allStaList)}
        //                         </DirectoryTree>
        //                     </div>
        //                 </div>
        //             </div>
        //             <div
        //                 style={{
        //                     width: '49%'
        //                 }}
        //             >
        //                 <div
        //                     style={{
        //                         fontSize: '14px',
        //                         marginBottom: '16px',
        //                         color: '#2B3441'
        //                     }}
        //                 >已选：
        //                 </div>
        //                 <div
        //                     style={{
        //                         width: '100%',
        //                         height: '296px',
        //                         background: 'rgba(43,52,65,0.02)',
        //                         borderRadius: '4px',
        //                         overflowX: 'hidden',
        //                         overflowY: 'auto',
        //                         padding: '12px 10px'
        //                     }}
        //                 >
        //                     {
        //                         staSelList.map((item, idx) => {
        //                             return <div
        //                                 key={'lists_' + idx}
        //                                 style={{marginBottom: '8px'}}
        //                             >
        //                                 <img src={item.logo} alt=""
        //                                      style={{
        //                                          width: '18px',
        //                                          height: '18px',
        //                                          marginRight: '6px',
        //                                          borderRadius: '4px',
        //                                      }}
        //                                 />
        //                                 <span
        //                                     title={item.name}
        //                                     style={{
        //                                         display: 'inline-block',
        //                                         width: '80%',
        //                                         overflow: 'hidden',
        //                                         whiteSpace: 'nowrap',
        //                                         textOverflow: 'ellipsis',
        //                                         verticalAlign: 'bottom',
        //                                     }}
        //                                 >{item.name}</span>
        //                                 {
        //                                     ('0' === '' + chooseRole.enableDelete && '1' === '' + staSelList[idx].isAdmin) ? null :
        //                                         <img src={del} alt=""
        //                                              style={{
        //                                                  width: '18px',
        //                                                  height: '18px',
        //                                                  cursor: 'pointer'
        //                                              }}
        //                                              onClick={() => {
        //                                                  staSelKeys = pull(staSelKeys, item.key + '');
        //                                                  staExpandedKeys = pull(staExpandedKeys, item.key + '');
        //                                                  staSelList.splice(idx, 1);
        //                                                  this.setState({staSelKeys, staSelList, staExpandedKeys});
        //                                              }}
        //                                         />
        //                                 }
        //                             </div>
        //                         })
        //                     }
        //                 </div>
        //             </div>
        //         </div>
        //     </Modal>
        // );
    }

    highLightNode(key) {
        let res = false;
        this.state.staSelKeys.forEach(keys => {
            if ('' + key === '' + keys)
                return res = true;
        });
        return res;
    }

    renderTreeNodes = data => {
        return data.map(item => {
            if (item.children) {
                return (
                    <TreeNode
                        dataRef={item}
                        title={item.title}
                        key={item.key + ''}
                    >
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return (
                <TreeNode
                    className={this.highLightNode(item.key) ? 'treeNode' : 'noTreeNode'}
                    {...item}
                    key={item.key + ''}
                    icon={({selected}) => {
                        return !item.isSection ? <img src={item.logo} alt=""
                                                      style={{
                                                          width: '12px',
                                                          height: '12px',
                                                      }}
                        /> : <FolderOutlined/>;
                    }}
                />
            );
        });
    }
}

export default RoleAndPower;
