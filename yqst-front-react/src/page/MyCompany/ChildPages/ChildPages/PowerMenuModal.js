import React, {Component} from 'react';
import {DownOutlined, FolderOutlined, SearchOutlined} from '@ant-design/icons';
import {
    Form,
    Input,
    Button,
    message,
    Modal,
    Select,
    Drawer,
    Tree,
} from 'antd';
import {del, logo, none} from '../../../../resource'
import Model from '../../Model'
import cloneDeep from 'lodash/cloneDeep';
import xor from 'lodash/xor';
import pull from 'lodash/pull';
import SelectPeopleModal from "./SelectPeopleModal";
import addressBookModel from "../../../AddressBook/Model";

const {TreeNode, DirectoryTree} = Tree;
const {Option} = Select;
const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 6},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 18},
    },
};
const initialState = {
    draVisible: false,
    bmVisible: false,
    choBMList: [],
    addDeptDTOS: [],
    bmList: [],
    bmSelList: [],
    bmSelectedKeys: [],
    bmExpandedKeys: [],

    zwVisible: false,
    zwList: [],
    selZWList: [],
    choZWList: [],
    addJobDTOS: [],

    jsVisible: false,
    jsList: [],
    selJSList: [],
    choJSList: [],
    addGroupRoleDTOS: [],

    ygVisible: false,
    choYGList: [],
    addStaffDTOS: [],
    staSelList: [],
    staSelKeys: [],
    staExpandedKeys: [],
    allStaList: [],

    groupName: '',
    groupDesc: '',
    assignType: '',
    isEdit: false,
};

class PowerMenuModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...cloneDeep(initialState),
            menuList: [],
            chePowMenu: {},
            chePowInfo: {},
            cloneDeepChePowMenu: {},
            cloneDeepChePowInfo: {},

            assignType: ''
        };
    }

    componentDidMount() {
        this.getMyCompanyGList();
    }

    componentWillUnmount() {
    }

    componentWillReceiveProps(nextProps, prevState) {
        if (nextProps.data.updatedMenu) {
            this.getMyCompanyGList();
        }
        if (nextProps.data.updatedInfo) {
            this.getMyCompanyGList(nextProps.data.chePowMenu.id);
        }
        if (nextProps.data.isEdit) {
            const {chePowInfo} = nextProps.data;
            let obj = {};
            obj.groupName = chePowInfo.groupName;
            obj.groupDesc = chePowInfo.groupDesc;
            obj.assignType = chePowInfo.assignType + '';
            if ('1' === '' + chePowInfo.assignType) {
                obj.choBMList = chePowInfo.deptVOS && chePowInfo.deptVOS.map(item => {
                    return {
                        ...item,
                        key: item.departmentId + '',
                        title: item.departmentName,
                    };
                });
                obj.addDeptDTOS = chePowInfo.deptVOS && chePowInfo.deptVOS.map(item => {
                    return item.departmentId + '';
                });
                obj.choZWList = chePowInfo.jobVOS && chePowInfo.jobVOS.map(item => {
                    return {
                        ...item,
                        id: item.jobId + '',
                    };
                });
                obj.addJobDTOS = chePowInfo.jobVOS && chePowInfo.jobVOS.map(item => {
                    return item.jobId + '';
                });
            } else if ('2' === '' + chePowInfo.assignType) {
                obj.choJSList = chePowInfo.roleVOS && chePowInfo.roleVOS.map(item => {
                    return {
                        ...item,
                        id: item.roleId + '',
                    };
                });
                obj.addGroupRoleDTOS = chePowInfo.roleVOS && chePowInfo.roleVOS.map(item => {
                    return item.roleId + '';
                });

            } else if ('3' === '' + chePowInfo.assignType) {
                obj.choYGList = chePowInfo.staffVOS && chePowInfo.staffVOS.map(item => {
                    return {
                        ...item,
                        id: item.staffId + '',
                        name: item.staffName,
                        key: item.staffId,
                        title: item.staffName,
                    };
                });
                obj.addStaffDTOS = chePowInfo.staffVOS && chePowInfo.staffVOS.map(item => {
                    return item.staffId + '';
                });
                // obj.staExpandedKeys = _.cloneDeep(obj.addStaffDTOS);
                // obj.staSelKeys = _.cloneDeep(obj.addStaffDTOS);
                // obj.staSelList = _.cloneDeep(obj.choYGList);
            }
            this.setState({
                cloneDeepChePowMenu: cloneDeep(nextProps.data.chePowMenu),
                cloneDeepChePowInfo: cloneDeep(nextProps.data.chePowInfo),
                draVisible: true,
                isEdit: true,
                ...obj,
            }, () => {
                nextProps.callBack && nextProps.callBack({
                    chePowMenu: nextProps.data.chePowMenu,
                    chePowInfo: nextProps.data.chePowInfo,
                    updatedMenu: false,
                    updatedInfo: false,
                    isEdit: false,
                });
            });

        }
    }

    render() {
        let {menuList, chePowMenu} = this.state;
        // let {callBack, data, form} = this.props;

        return (
            <div>
                <Form ref={(c) => {
                    this.form = c
                }}/>
                <div style={{textAlign: 'center', marginBottom: '15px'}}>
                    <Button
                        style={{width: '102px', height: '36px', fontSize: '14px'}}
                        onClick={() => {
                            window.globalPermissions.checkPermission('ERP_AUTH_INSERT', (res) => {
                                if (res)
                                    return message.error('抱歉，您没有权限新增，请联系管理员！');

                                this.setState({
                                    cloneDeepChePowMenu: cloneDeep(this.state.chePowMenu),
                                    cloneDeepChePowInfo: cloneDeep(this.state.chePowInfo),
                                    draVisible: true,
                                });
                            });
                        }}
                    >新增权限组</Button>
                </div>
                <ul className={'menu_Ul'}>
                    {
                        menuList && menuList.map((item, idx) => {
                            return <li
                                title={item.groupName}
                                key={'menu_' + idx}
                                className={item.isChecked ? 'onLi' : ''}
                                style={{
                                    height: '40px',
                                    lineHeight: '40px',
                                    padding: '0 16px',
                                    fontSize: '14px',
                                    color: '#2B3441',
                                    cursor: 'pointer',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                }}
                                onClick={() => {
                                    menuList = menuList.map((cItem, cIdx) => {
                                        return {
                                            ...cItem,
                                            isChecked: idx === cIdx,
                                        }
                                    });
                                    this.setState({chePowMenu: item, menuList}, () => {
                                        this.getMyCompanyGGet(this.state.chePowMenu.id);
                                    });
                                }}
                            >
                                {item.groupName}
                            </li>
                        })
                    }
                </ul>
                {this.makeDrawer()}
                {this.makeBMModal()}
                {this.makeZWModal()}
                {this.makeJSModal()}
                {this.makeYGModal()}
            </div>
        );
    }

    getMyCompanyGList(id = null) {
        Model.MyCompanyGList({}, (res) => {
            let defItem = null;
            let newList = res.data && res.data.map((item, idx) => {
                if (id && '' + id == '' + item.id)
                    defItem = item;
                else if (0 === idx)
                    defItem = item;

                return {
                    ...item,
                    isChecked: id ? '' + id == '' + item.id : 0 === idx,
                }
            });
            this.setState({menuList: newList, chePowMenu: defItem ? defItem : {}}, () => {
                this.props.callBack && this.props.callBack({
                    chePowMenu: this.state.chePowMenu,
                    chePowInfo: this.state.chePowInfo,
                    updatedMenu: false,
                    updatedInfo: false,
                    isEdit: false,
                });
                if (defItem)
                    this.getMyCompanyGGet(defItem.id);
            });
        }, (err) => {
        });
    }

    getMyCompanyGGet(groupId) {
        Model.MyCompanyGGet({
            groupId
        }, (res) => {
            this.setState({chePowInfo: res.data}, () => {
                this.props.callBack && this.props.callBack({
                    chePowMenu: this.state.chePowMenu,
                    chePowInfo: this.state.chePowInfo,
                    updatedMenu: false,
                    updatedInfo: false,
                });
            });
        }, (err) => {
        });
    }

    getStaffListAll(deptId) {
        let {bmExpandedKeys} = this.state;
        Model.StaffListAll({
            deptId: deptId ? deptId : 0,
            current: 1,
            pageSize: 10000,
            keyWord: '',
        }, (res) => {
            if (res.data.deptId) {
                bmExpandedKeys = xor(bmExpandedKeys, [res.data.deptId + ''])
            }
            this.setState({bmList: this.clearUpData(res.data), bmVisible: true, bmExpandedKeys});
        }, (err) => {
        });
    }

    clearUpData(data = null) {
        let {bmList} = this.state;
        let list = [], chiObj = {};
        if (data) {
            chiObj.deptName = data.deptName;
            chiObj.deptId = data.deptId;
            chiObj.title = data.deptName;
            chiObj.key = data.deptId + '';
            chiObj.parentId = data.parentId;
            chiObj.parentName = data.parentName;
            chiObj.hasChildren = data.hasChildren;
            chiObj.children = [];

            if (data.subDepts && data.subDepts.length > 0) {
                data.subDepts.forEach(item => {
                    chiObj.children.push({
                        ...item,
                        title: item.deptName,
                        key: item.deptId + '',
                    });
                });
            }
            list.push(chiObj);
        }
        if (bmList && bmList.length > 0) {
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
            recFun(bmList);
            list = bmList;
        }
        return list;
    }

    getStaAll(deptId = 0) {
        let {staExpandedKeys} = this.state;
        Model.StaffListAll({
            deptId,
            current: 1,
            pageSize: 10000,
            keyWord: '',
        }, (res) => {
            if (res.data.deptId) {
                staExpandedKeys = xor(staExpandedKeys, [res.data.deptId + ''])
            }
            this.setState({allStaList: this.clearStaUpData(res.data), staExpandedKeys});
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
                ygVisible: true
            })
        })
    }

    clearStaUpData(data = null) {
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

    getErpJobList(keyWord = '') {
        Model.ErpJobList({
            start: 1,
            pageSize: 10000,
            keyWord
        }, (res) => {
            let newList = res.data.records && res.data.records.map(item => {
                let hasCho = false;
                this.state.choZWList.forEach(cItem => {
                    if ('' + item.id === '' + cItem.id)
                        hasCho = true;
                });
                return {
                    ...item,
                    id: item.id + '',
                    onChange: hasCho,
                }
            });
            this.setState({zwList: newList});
        }, (err) => {
        });
    }

    getMyCompanyRList(roleName = '') {
        Model.MyCompanyRList({
            roleName
        }, (res) => {
            let newList = res.data && res.data.map(item => {
                let hasCho = false;
                this.state.selJSList.forEach(cItem => {
                    if ('' + item.id === '' + cItem.id)
                        hasCho = true;
                });
                return {
                    ...item,
                    id: item.id + '',
                    onChange: hasCho
                }
            });
            this.setState({jsList: newList});
        }, (err) => {
        });
    }

    makeDrawer() {
        let {isEdit, draVisible, groupName, groupDesc, assignType} = this.state;

        return draVisible ? <Drawer
            className={'powerDrawer'}
            title={<div style={{fontSize: '20px'}}>
                {isEdit ? '编辑' : '新增'}权限组
            </div>}
            placement="right"
            width={545}
            closable={false}
            visible={true}
            // mask={false}
            maskStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0)',
            }}
            bodyStyle={{
                padding: '36px 142px 60px 50px'
            }}
            afterVisibleChange={(visible) => {
                if (visible) {
                    document.body.style.overflow = 'hidden !important';

                } else {
                    document.body.style.overflow = 'auto';
                }
            }}
            onClose={() => {
                this.setState({
                    ...cloneDeep(initialState),
                    chePowMenu: cloneDeep(this.state.cloneDeepChePowMenu),
                    chePowInfo: cloneDeep(this.state.cloneDeepChePowInfo),
                }, () => {
                    this.form && this.form.resetFields();
                    // this.getMyCompanyGList(this.props.data.chePowMenu.id);
                    this.props.callBack && this.props.callBack({
                        chePowMenu: cloneDeep(this.state.cloneDeepChePowMenu),
                        chePowInfo: cloneDeep(this.state.cloneDeepChePowInfo),
                        updatedMenu: false,
                        updatedInfo: false,
                        isEdit: false,
                    });
                });
            }}
        >
            <Form ref={(c) => this.form = c}
                  {...formItemLayout} autoComplete="off" className={'formCss'}
                  onFinish={this.onSubmit.bind(this)} scrollToFirstError={true}
                  onValuesChange={(values) => {
                      if (values.hasOwnProperty('assignType')) {
                          this.setState({
                              assignType: values.assignType
                          });
                      }
                  }}>
                <Form.Item label={'权限组名称'} name={'groupName'} rules={[
                    {required: true, message: '权限组名称不能为空!'},
                    // {
                    //     validator: (rule, value, callback) => this.checkValidator(rule, value, callback)
                    // }
                ]} initialValue={groupName}>
                    <Input
                        style={{width: '260px'}}
                        maxLength={25}
                        placeholder="请输入权限组名称"
                    />
                </Form.Item>
                <Form.Item label={'权限组备注'} name={'groupDesc'} rules={[
                    {required: false, message: '权限组备注不能为空!'},
                    // {
                    //     validator: (rule, value, callback) => this.checkValidator(rule, value, callback)
                    // }
                ]} initialValue={groupDesc}>
                    <Input.TextArea
                        style={{width: '260px', height: '67px', resize: 'none', fontSize: '14px'}}
                        maxLength={25}
                        placeholder="请输入权限组备注"
                    />
                </Form.Item>
                <Form.Item label={'指定类型'} name={'assignType'} rules={[
                    {required: true, message: '指定类型不能为空!'},
                    // {
                    //     validator: (rule, value, callback) => this.checkValidator(rule, value, callback)
                    // }
                ]} initialValue={assignType}>
                    <Select style={{width: '260px', textAlign: 'left'}} placeholder="请选择指定类型">
                        <Option value="1">指定企业架构</Option>
                        <Option value="2">指定角色</Option>
                        <Option value="3">指定员工</Option>
                    </Select>
                </Form.Item>
                {this.state.assignType == 1 && this.form ?
                    <div
                        style={{
                            color: '#999',
                            textAlign: 'left',
                            lineHeight: '22px'
                        }}
                    >
                        注：所选部门及职务之交集，为权限组生效范围。
                    </div> : null
                }
                {this.makeFormItems(this.form ? this.form.getFieldValue('assignType') : "")}
                <div
                    style={{
                        textAlign: 'center',
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        width: '100%',
                        borderTop: '1px solid #e9e9e9',
                        padding: '10px 16px',
                        background: '#fff',
                    }}
                >
                    <Button type="primary" htmlType="submit"
                            style={{
                                width: '80px',
                                height: '36px',
                                marginRight: '16px',
                                fontSize: '16px'
                            }}
                    >确定</Button>
                    <Button
                        style={{
                            width: '80px',
                            height: '36px',
                            fontSize: '16px',
                        }}
                        onClick={() => {
                            this.setState({
                                ...cloneDeep(initialState),
                                chePowMenu: cloneDeep(this.state.cloneDeepChePowMenu),
                                chePowInfo: cloneDeep(this.state.cloneDeepChePowInfo),
                            }, () => {
                                this.form && this.form.resetFields();
                                // this.getMyCompanyGList(this.props.data.chePowMenu.id);
                                this.props.callBack && this.props.callBack({
                                    chePowMenu: cloneDeep(this.state.cloneDeepChePowMenu),
                                    chePowInfo: cloneDeep(this.state.cloneDeepChePowInfo),
                                    updatedMenu: false,
                                    updatedInfo: false,
                                    isEdit: false,
                                });
                            });
                        }}
                    >取消</Button>
                </div>
            </Form>
        </Drawer> : null
    }

    makeFormItems(val) {
        let {
            bmSelList, choBMList, bmSelectedKeys,
            bmExpandedKeys, choZWList, choJSList,
            choYGList, addStaffDTOS, addGroupRoleDTOS,
            addJobDTOS, addDeptDTOS
        } = this.state;

        switch (val + '') {
            case '1':
                return <div>
                    <Form.Item label={'部门'} name={'addDeptDTOS'} rules={[
                        {required: true, message: '部门不能为空!'},
                        // {
                        //     validator: (rule, value, callback) => this.checkValidator(rule, value, callback)
                        // }
                    ]} initialValue={addDeptDTOS}>
                        <Select
                            style={{textAlign: 'left'}}
                            placeholder={'请选择部门'}
                            filterOption={false}
                            dropdownStyle={{display: 'none'}}
                            mode="multiple"
                            onDropdownVisibleChange={(open) => {
                                if (open === true) {
                                    const keys = choBMList && choBMList.map(item => {
                                        return item.key
                                    });
                                    this.setState({
                                        bmSelList: choBMList,
                                        bmSelectedKeys: keys,
                                        bmExpandedKeys: keys,
                                    }, () => {
                                        this.getStaffListAll();
                                    });
                                }
                            }}
                            onChange={(value) => {
                                let newChoBMList = [];
                                choBMList.forEach(item => {
                                    value.forEach(keys => {
                                        if ('' + keys === '' + item.key)
                                            newChoBMList.push(item);
                                    });
                                });
                                this.setState({
                                    choBMList: newChoBMList,
                                });
                            }}
                        >
                            {choBMList && choBMList.map(item => (
                                <Select.Option key={'choBMList_' + item.key} value={item.key + ''}>
                                    {item.title}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label={'职务'} name={'addJobDTOS'} rules={[
                        {required: true, message: '职务不能为空!'},
                        // {
                        //     validator: (rule, value, callback) => this.checkValidator(rule, value, callback)
                        // }
                    ]} initialValue={addJobDTOS}>
                        <Select
                            style={{textAlign: 'left'}}
                            placeholder={'请选择职务'}
                            filterOption={false}
                            dropdownStyle={{display: 'none'}}
                            mode="multiple"
                            onDropdownVisibleChange={(open) => {
                                if (open === true) {
                                    this.setState({
                                        selZWList: cloneDeep(this.state.choZWList),
                                        zwVisible: true
                                    }, () => {
                                        this.getErpJobList()
                                    });
                                }
                            }}
                            onChange={(value) => {
                                let newChoZWList = [];
                                choZWList.forEach(item => {
                                    value.forEach(ids => {
                                        if ('' + ids === '' + item.id)
                                            newChoZWList.push(item);
                                    });
                                });
                                this.setState({
                                    choZWList: newChoZWList,
                                });
                            }}
                        >
                            {choZWList && choZWList.map(item => (
                                <Select.Option key={'choZWList_' + item.id} value={item.id + ''}>
                                    {item.jobName}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </div>;

            case '2':
                return <div>
                    <Form.Item label={'角色'} name={'addGroupRoleDTOS'} rules={[
                        {required: true, message: '角色不能为空!'},
                        // {
                        //     validator: (rule, value, callback) => this.checkValidator(rule, value, callback)
                        // }
                    ]} initialValue={addGroupRoleDTOS}>
                        <Select
                            style={{textAlign: 'left'}}
                            placeholder={'请选择角色'}
                            filterOption={false}
                            dropdownStyle={{display: 'none'}}
                            mode="multiple"
                            onDropdownVisibleChange={(open) => {
                                if (open === true) {
                                    this.setState({
                                        selJSList: cloneDeep(this.state.choJSList),
                                        jsVisible: true
                                    }, () => {
                                        this.getMyCompanyRList();
                                    });
                                }
                            }}
                            onChange={(value) => {
                                let newChoJSList = [];
                                choJSList.forEach(item => {
                                    value.forEach(ids => {
                                        if ('' + ids === '' + item.id)
                                            newChoJSList.push(item);
                                    });
                                });
                                this.setState({
                                    choJSList: newChoJSList,
                                });
                            }}
                        >
                            {choJSList && choJSList.map(item => (
                                <Select.Option key={'choJSList' + item.id} value={item.id + ''}>
                                    {item.roleName}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </div>;

            case '3':
                return <div>
                    <Form.Item label={'员工'} name={'addStaffDTOS'} rules={[
                        {required: true, message: '员工不能为空!'},
                        // {
                        //     validator: (rule, value, callback) => this.checkValidator(rule, value, callback)
                        // }
                    ]} initialValue={addStaffDTOS}>
                        <Select
                            style={{textAlign: 'left'}}
                            placeholder={'请选择员工'}
                            filterOption={false}
                            dropdownStyle={{display: 'none'}}
                            mode="multiple"
                            onDropdownVisibleChange={(open) => {
                                if (open === true) {
                                    // const keys = choYGList.map(item => {
                                    //     return item.staffId + '';
                                    // });
                                    // this.setState({
                                    //     ygVisible: true,
                                    //     staSelList: cloneDeep(choYGList),
                                    //     staSelKeys: keys,
                                    //     staExpandedKeys: keys,
                                    // }, () => {
                                    //     this.getStaAll();
                                    // });
                                    this.getAllStaffList();
                                }
                            }}
                            onChange={(value) => {
                                let newChoYGList = [];
                                choYGList.forEach(item => {
                                    value.forEach(ids => {
                                        if ('' + ids === '' + item.id)
                                            newChoYGList.push(item);
                                    });
                                });
                                this.setState({
                                    choYGList: newChoYGList,
                                });
                            }}
                        >
                            {choYGList && choYGList.map(item => (
                                <Select.Option key={'choYGList_' + item.id} value={item.id + ''}>
                                    {item.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </div>;
        }
    }

    makeBMModal() {
        let {bmVisible, bmExpandedKeys, bmSelectedKeys, bmList, bmSelList} = this.state;

        return (
            bmVisible ? <Modal
                className={'Modal'}
                title="选择部门"
                closable={false}
                visible={bmVisible}
                onOk={() => {
                }}
                onCancel={() => {
                    this.setState({
                        bmVisible: false,
                        bmExpandedKeys: [],
                        bmSelectedKeys: [],
                        bmList: [],
                        bmSelList: [],
                    });
                }}
                footer={
                    <div>
                        <Button type="primary"
                                style={{
                                    width: '68px',
                                    height: '36px',
                                    marginRight: '16px',
                                    fontSize: '16px'
                                }}
                                onClick={() => {
                                    this.setState({
                                        choBMList: cloneDeep(bmSelList),
                                        bmVisible: false,
                                        bmExpandedKeys: [],
                                        bmSelectedKeys: [],
                                        bmList: [],
                                        bmSelList: [],
                                    }, () => {
                                        this.form && this.form.setFieldsValue({
                                            addDeptDTOS: this.state.choBMList && this.state.choBMList.map(item => {
                                                return item.key + '';
                                            })
                                        });
                                    });
                                }}
                        >确定</Button>
                        <Button
                            style={{
                                width: '68px',
                                height: '36px',
                                fontSize: '16px'
                            }}
                            onClick={() => {
                                this.setState({
                                    bmVisible: false,
                                    bmExpandedKeys: [],
                                    bmSelectedKeys: [],
                                    bmList: [],
                                    bmSelList: [],
                                });
                            }}
                        >取消</Button>
                    </div>
                }
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        height: '332px'
                    }}
                >
                    <div
                        style={{
                            width: '49%'
                        }}
                    >
                        <div
                            style={{
                                fontSize: '14px',
                                marginBottom: '16px',
                                color: '#2B3441'
                            }}
                        >选择：
                        </div>
                        <div
                            style={{
                                width: '100%',
                                height: '296px',
                                background: 'rgba(43,52,65,0.02)',
                                borderRadius: '4px',
                                padding: '9px 8px'
                            }}
                        >
                            <Input
                                placeholder="搜索"
                                size="small"
                                style={{
                                    fontSize: '12px',
                                    marginBottom: '8px'
                                }}
                                prefix={<SearchOutlined/>}
                                onPressEnter={(e) => {
                                    if (e.target.value || '' + e.target.value === '0') {
                                        Model.CommunicationPage({
                                            current: 1,
                                            pageSize: 10000,
                                            type: 2,
                                            keyWord: e.target.value
                                        }, (res) => {
                                            let newBmList = [];
                                            if (res.data.deptVO && res.data.deptVO.length > 0) {
                                                res.data.deptVO.forEach(item => {
                                                    newBmList.push({
                                                        ...item,
                                                        title: item.depName,
                                                        key: item.deptId + '',
                                                    });
                                                });
                                            }
                                            this.setState({bmList: newBmList});
                                        }, (err) => {
                                        });

                                    } else {
                                        this.setState({bmList: []}, () => {
                                            this.getStaffListAll();
                                        });

                                    }

                                }}
                            />
                            <div
                                style={{
                                    height: '100%',
                                    overflow: 'auto',
                                }}
                            >
                                <DirectoryTree
                                    className={'staTree sw-textOverflow'}
                                    multiple={true}
                                    expandAction={false}
                                    showLine={false}
                                    switcherIcon={<DownOutlined/>}
                                    onExpand={(expandedKeys, e) => {
                                        this.setState({bmExpandedKeys: expandedKeys});
                                    }}
                                    expandedKeys={bmExpandedKeys}
                                    onSelect={(selectedKeys, e) => {
                                        let onItem = {};
                                        const judgeFun = (list = []) => {
                                            list.map(item => {
                                                if (item.children && item.children.length > 0) {
                                                    judgeFun(item.children);
                                                }
                                                if ('' + item.key === '' + selectedKeys[0]) {
                                                    onItem = {
                                                        ...item,
                                                        key: item.key,
                                                        title: item.title,
                                                    }
                                                }
                                            });
                                        };
                                        judgeFun(bmList);
                                        bmSelectedKeys = xor(bmSelectedKeys, selectedKeys);
                                        // staSelList.push(onItem);
                                        let hasIdx = null;
                                        bmSelList.forEach((item, idx) => {
                                            if ('' + selectedKeys[0] === '' + item.key) {
                                                hasIdx = idx;
                                            }
                                        });
                                        if ('' + hasIdx === 'null') {
                                            bmSelList.push(onItem);

                                        } else {
                                            bmSelList.splice(hasIdx, 1);
                                        }

                                        this.setState({bmSelectedKeys, bmSelList}, () => {
                                            if (!onItem.children || onItem.children.length <= 0)
                                                this.getStaffListAll(selectedKeys[0]);
                                        });

                                    }}
                                    selectedKeys={bmSelectedKeys}
                                >
                                    {this.renderTreeNodes(bmList)}
                                </DirectoryTree>
                            </div>
                        </div>
                    </div>
                    <div
                        style={{
                            width: '49%'
                        }}
                    >
                        <div
                            style={{
                                fontSize: '14px',
                                marginBottom: '16px',
                                color: '#2B3441'
                            }}
                        >已选：
                        </div>
                        <div
                            style={{
                                width: '100%',
                                height: '296px',
                                background: 'rgba(43,52,65,0.02)',
                                borderRadius: '4px',
                                overflowX: 'hidden',
                                overflowY: 'auto',
                                padding: '12px 10px'
                            }}
                        >
                            {
                                bmSelList.map((item, idx) => {
                                    return (
                                        <div
                                            key={'lists_' + idx}
                                            style={{marginBottom: '8px'}}
                                        >
                                            <FolderOutlined
                                                style={{
                                                    width: '18px',
                                                    height: '18px',
                                                    marginRight: '6px',
                                                    borderRadius: '4px',
                                                }}/>
                                            <span
                                                title={item.title}
                                                style={{
                                                    display: 'inline-block',
                                                    width: '80%',
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis',
                                                    verticalAlign: 'bottom',
                                                }}
                                            >{item.title}</span>
                                            <img src={del} alt=""
                                                 style={{
                                                     width: '18px',
                                                     height: '18px',
                                                     cursor: 'pointer'
                                                 }}
                                                 onClick={() => {
                                                     // bmSelectedKeys = pull(bmSelectedKeys, item.key + '');
                                                     // bmExpandedKeys = _.pull(bmExpandedKeys, item.key + '');
                                                     bmSelList.splice(idx, 1);
                                                     this.setState({
                                                         bmSelList: bmSelList,
                                                         bmSelectedKeys: bmSelList
                                                     });
                                                 }}
                                            />
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </Modal> : null
        );
    }

    renderTreeNodes = data => {
        return data.map(item => {
            if (item.children && item.children.length > 0) {
                return (
                    <TreeNode
                        className={this.highLightNode(item.key) ? 'treeNode' : 'noTreeNode'}
                        dataRef={item}
                        title={item.title}
                        key={item.key + ''}
                    >
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }

            return <TreeNode
                className={this.highLightNode(item.key) ? 'treeNode' : 'noTreeNode'}
                dataRef={item}
                title={item.title}
                key={item.key + ''}
                // icon={({ selected }) => {
                //     return !item.isSection ? <img src={item.logo} alt=""
                //       style={{
                //           width: '12px',
                //           height: '12px',
                //       }}
                //     /> : <Icon type={'folder'} />;
                // }}
            />;
        });
    }

    highLightNode(key) {
        let res = false;
        this.state.bmSelectedKeys.forEach(keys => {
            if ('' + key === '' + keys)
                return res = true;
        });
        return res;
    }

    makeZWModal() {
        let {zwVisible, choZWList, zwList, selZWList} = this.state;

        return (
            zwVisible ? <Modal
                className={'Modal'}
                title="选择职务"
                closable={false}
                visible={zwVisible}
                onOk={() => {
                }}
                onCancel={() => {
                    this.setState({zwVisible: false, selZWList: cloneDeep(choZWList)}, () => {
                        this.form && this.form.setFieldsValue({
                            addJobDTOS: this.state.choZWList.map(item => {
                                return item.id + '';
                            })
                        });
                    });
                }}
                footer={
                    <div>
                        <Button type="primary"
                                style={{
                                    width: '68px',
                                    height: '36px',
                                    marginRight: '16px',
                                    fontSize: '16px'
                                }}
                                onClick={() => {
                                    choZWList = selZWList.map(item => {
                                        return item;
                                    });
                                    if (choZWList.length <= 0)
                                        return message.error('请选择职务！');
                                    this.setState({choZWList, zwVisible: false}, () => {
                                        this.form && this.form.setFieldsValue({
                                            addJobDTOS: this.state.choZWList.map(item => {
                                                return item.id + '';
                                            })
                                        });
                                    });
                                }}
                        >确定</Button>
                        <Button
                            style={{
                                width: '68px',
                                height: '36px',
                                fontSize: '16px'
                            }}
                            onClick={() => {
                                this.setState({zwVisible: false, selZWList: cloneDeep(choZWList)}, () => {
                                    this.form && this.form.setFieldsValue({
                                        addJobDTOS: this.state.choZWList.map(item => {
                                            return item.id + '';
                                        })
                                    });
                                });
                            }}
                        >取消</Button>
                    </div>
                }
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        height: '332px'
                    }}
                >
                    <div
                        style={{
                            width: '49%'
                        }}
                    >
                        <div
                            style={{
                                fontSize: '14px',
                                marginBottom: '16px',
                                color: '#2B3441'
                            }}
                        >选择：
                        </div>
                        <div
                            style={{
                                width: '100%',
                                height: '296px',
                                background: 'rgba(43,52,65,0.02)',
                                borderRadius: '4px',
                                padding: '9px 8px'
                            }}
                        >
                            <Input
                                placeholder="搜索"
                                size="small"
                                style={{
                                    fontSize: '12px',
                                    marginBottom: '8px'
                                }}
                                prefix={<SearchOutlined/>}
                                onPressEnter={(e) => {
                                    this.getErpJobList(e.target.value);
                                }}
                            />
                            <div
                                style={{
                                    height: '100%',
                                    overflow: 'auto',
                                }}
                            >
                                {
                                    zwList && zwList.map((item, idx) => {
                                        return (
                                            <div
                                                className={item.onChange ? 'onZWListCss zwListCss' : 'zwListCss hoverZWList'}
                                                key={'zwList_' + idx}
                                                onClick={() => {
                                                    let hasIdx = null;
                                                    selZWList && selZWList.forEach((cItem, cIdx) => {
                                                        if ('' + cItem.id === '' + item.id) {
                                                            hasIdx = cIdx;
                                                        }
                                                    });
                                                    if ('null' === '' + hasIdx) {
                                                        selZWList.push(item);

                                                    } else {
                                                        selZWList.splice(hasIdx, 1)
                                                    }

                                                    zwList = zwList.map(cItem => {
                                                        return {
                                                            ...cItem,
                                                            onChange: '' + item.id === '' + cItem.id ? !cItem.onChange : cItem.onChange
                                                        }
                                                    });
                                                    this.setState({zwList, selZWList});
                                                }}
                                            >
                                                <FolderOutlined
                                                    style={{
                                                        width: '18px',
                                                        height: '18px',
                                                        marginRight: '6px',
                                                        borderRadius: '4px',
                                                    }}/>
                                                <span
                                                    title={item.jobName}
                                                    style={{
                                                        display: 'inline-block',
                                                        width: '80%',
                                                        overflow: 'hidden',
                                                        whiteSpace: 'nowrap',
                                                        textOverflow: 'ellipsis',
                                                        verticalAlign: 'bottom',
                                                    }}
                                                >{item.jobName}</span>
                                            </div>
                                        );
                                    })
                                }
                                {
                                    !zwList || zwList.length <= 0 ? <div
                                        style={{textAlign: 'center', marginTop: '20px'}}
                                    >
                                        <img src={none} alt="" style={{width: '200px'}}/>
                                        <div
                                            style={{
                                                color: '#969799',
                                                marginTop: '16px',
                                                fontSize: '12px',
                                            }}
                                        >暂无数据...
                                        </div>
                                    </div> : null
                                }
                            </div>
                        </div>
                    </div>
                    <div
                        style={{
                            width: '49%'
                        }}
                    >
                        <div
                            style={{
                                fontSize: '14px',
                                marginBottom: '16px',
                                color: '#2B3441'
                            }}
                        >已选：
                        </div>
                        <div
                            style={{
                                width: '100%',
                                height: '296px',
                                background: 'rgba(43,52,65,0.02)',
                                borderRadius: '4px',
                                overflowX: 'hidden',
                                overflowY: 'auto',
                                padding: '12px 10px'
                            }}
                        >
                            {
                                selZWList && selZWList.map((item, idx) => {
                                    return (
                                        <div
                                            key={'zwList_' + idx}
                                            style={{marginBottom: '8px'}}
                                        >
                                            <FolderOutlined
                                                style={{
                                                    width: '18px',
                                                    height: '18px',
                                                    marginRight: '6px',
                                                    borderRadius: '4px',
                                                }}/>
                                            <span
                                                title={item.jobName}
                                                style={{
                                                    display: 'inline-block',
                                                    width: '80%',
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis',
                                                    verticalAlign: 'bottom',
                                                }}
                                            >{item.jobName}</span>
                                            <img src={del} alt=""
                                                 style={{
                                                     width: '18px',
                                                     height: '18px',
                                                     cursor: 'pointer'
                                                 }}
                                                 onClick={() => {
                                                     selZWList.splice(idx, 1);
                                                     zwList = zwList.map(cItem => {
                                                         return {
                                                             ...cItem,
                                                             onChange: '' + item.id === '' + cItem.id ? false : cItem.onChange
                                                         }
                                                     });
                                                     this.setState({zwList, selZWList});
                                                 }}
                                            />
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </Modal> : null
        );
    }

    makeJSModal() {
        let {jsVisible, jsList, selJSList, choJSList} = this.state;
        return (
            jsVisible ? <Modal
                className={'Modal'}
                title="选择角色"
                closable={false}
                visible={true}
                onOk={() => {
                }}
                onCancel={() => {
                    this.setState({jsVisible: false, selJSList: cloneDeep(choJSList)}, () => {
                        this.form && this.form.setFieldsValue({
                            addGroupRoleDTOS: this.state.choJSList.map(item => {
                                return item.id + '';
                            })
                        });
                    });
                }}
                footer={
                    <div>
                        <Button type="primary"
                                style={{
                                    width: '68px',
                                    height: '36px',
                                    marginRight: '16px',
                                    fontSize: '16px'
                                }}
                                onClick={() => {
                                    choJSList = selJSList.map(item => {
                                        return item;
                                    });
                                    if (choJSList.length <= 0)
                                        return message.error('请选择角色！');
                                    this.setState({choJSList, jsVisible: false}, () => {
                                        this.form && this.form.setFieldsValue({
                                            addGroupRoleDTOS: this.state.choJSList.map(item => {
                                                return item.id + '';
                                            })
                                        });
                                    });
                                }}
                        >确定</Button>
                        <Button
                            style={{
                                width: '68px',
                                height: '36px',
                                fontSize: '16px'
                            }}
                            onClick={() => {
                                this.setState({jsVisible: false, selJSList: cloneDeep(choJSList)}, () => {
                                    this.form && this.form.setFieldsValue({
                                        addGroupRoleDTOS: this.state.choJSList.map(item => {
                                            return item.id + '';
                                        })
                                    });
                                });
                            }}
                        >取消</Button>
                    </div>
                }
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        height: '332px'
                    }}
                >
                    <div
                        style={{
                            width: '49%'
                        }}
                    >
                        <div
                            style={{
                                fontSize: '14px',
                                marginBottom: '16px',
                                color: '#2B3441'
                            }}
                        >选择：
                        </div>
                        <div
                            style={{
                                width: '100%',
                                height: '296px',
                                background: 'rgba(43,52,65,0.02)',
                                borderRadius: '4px',
                                padding: '9px 8px'
                            }}
                        >
                            <Input
                                placeholder="搜索"
                                size="small"
                                style={{
                                    fontSize: '12px',
                                    marginBottom: '8px'
                                }}
                                prefix={<SearchOutlined/>}
                                onPressEnter={(e) => {
                                    this.getMyCompanyRList(e.target.value);
                                }}
                            />
                            <div
                                style={{
                                    height: '100%',
                                    overflow: 'auto',
                                }}
                            >
                                {
                                    jsList && jsList.map((item, idx) => {
                                        return (
                                            <div
                                                className={item.onChange ? 'onZWListCss zwListCss' : 'zwListCss hoverZWList'}
                                                key={'zwList_' + idx}
                                                onClick={() => {
                                                    let hasIdx = null;
                                                    selJSList && selJSList.forEach((cItem, cIdx) => {
                                                        if ('' + cItem.id === '' + item.id) {
                                                            hasIdx = cIdx;
                                                        }
                                                    });
                                                    if ('null' === '' + hasIdx) {
                                                        selJSList.push(item);

                                                    } else {
                                                        selJSList.splice(hasIdx, 1)
                                                    }

                                                    jsList = jsList.map(cItem => {
                                                        return {
                                                            ...cItem,
                                                            onChange: '' + item.id === '' + cItem.id ? !cItem.onChange : cItem.onChange
                                                        }
                                                    });
                                                    this.setState({jsList, selJSList});
                                                }}
                                            >
                                                <FolderOutlined
                                                    style={{
                                                        width: '18px',
                                                        height: '18px',
                                                        marginRight: '6px',
                                                        borderRadius: '4px',
                                                    }}/>
                                                <span
                                                    title={item.roleName}
                                                    style={{
                                                        display: 'inline-block',
                                                        width: '80%',
                                                        overflow: 'hidden',
                                                        whiteSpace: 'nowrap',
                                                        textOverflow: 'ellipsis',
                                                        verticalAlign: 'bottom',
                                                    }}
                                                >{item.roleName}</span>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div
                        style={{
                            width: '49%'
                        }}
                    >
                        <div
                            style={{
                                fontSize: '14px',
                                marginBottom: '16px',
                                color: '#2B3441'
                            }}
                        >已选：
                        </div>
                        <div
                            style={{
                                width: '100%',
                                height: '296px',
                                background: 'rgba(43,52,65,0.02)',
                                borderRadius: '4px',
                                overflowX: 'hidden',
                                overflowY: 'auto',
                                padding: '12px 10px'
                            }}
                        >
                            {
                                selJSList && selJSList.map((item, idx) => {
                                    return (
                                        <div
                                            key={'selJSList_' + idx}
                                            style={{marginBottom: '8px'}}
                                        >
                                            <FolderOutlined
                                                style={{
                                                    width: '18px',
                                                    height: '18px',
                                                    marginRight: '6px',
                                                    borderRadius: '4px',
                                                }}/>
                                            <span
                                                title={item.jobName}
                                                style={{
                                                    display: 'inline-block',
                                                    width: '80%',
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis',
                                                    verticalAlign: 'bottom',
                                                }}
                                            >{item.roleName}</span>
                                            <img src={del} alt=""
                                                 style={{
                                                     width: '18px',
                                                     height: '18px',
                                                     cursor: 'pointer'
                                                 }}
                                                 onClick={() => {
                                                     selJSList.splice(idx, 1);
                                                     jsList = jsList.map(cItem => {
                                                         return {
                                                             ...cItem,
                                                             onChange: '' + item.id === '' + cItem.id ? false : cItem.onChange
                                                         }
                                                     });
                                                     this.setState({jsList, selJSList});
                                                 }}
                                            />
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </Modal> : null
        );
    }

    makeYGModal() {
        let {ygVisible, allStaffUserList, allStaList, staSelKeys, staSelList, staExpandedKeys, choYGList} = this.state;
        return ygVisible ? <SelectPeopleModal
            setCancel={() => {
                this.setState({ygVisible: false})
            }}
            list={allStaffUserList || []}
            selectedList={this.state.choYGList.map((item) => parseInt(item.id))}
            callback={(data) => {
                this.setState({
                    choYGList: cloneDeep(data),
                    ygVisible: false,
                }, () => {
                    this.form && this.form.setFieldsValue({
                        addStaffDTOS: this.state.choYGList.map(item => {
                            return item.id + '';
                        })
                    });
                });
            }}/> : null
        // return (
        //     ygVisible ? <Modal
        //         className={'Modal'}
        //         width={546}
        //         title={'选择员工'}
        //         closable={false}
        //         visible={ygVisible}
        //         onOk={() => {
        //         }}
        //         onCancel={() => {
        //             this.setState({
        //                 ygVisible: false,
        //                 staSelList: [],
        //                 staSelKeys: [],
        //                 staExpandedKeys: [],
        //                 allStaList: [],
        //             });
        //         }}
        //         bodyStyle={{
        //             padding: '23px 24px'
        //         }}
        //         footer={<div>
        //             <Button type="primary"
        //                     style={{
        //                         width: '68px',
        //                         height: '36px',
        //                         marginRight: '16px',
        //                         fontSize: '16px',
        //                     }}
        //                     onClick={() => {
        //                         if (staSelList.length <= 0)
        //                             return message.error('请选择员工！');
        //                         this.setState({
        //                             choYGList: cloneDeep(staSelList),
        //                             ygVisible: false,
        //                         }, () => {
        //                             this.form && this.form.setFieldsValue({
        //                                 addStaffDTOS: this.state.choYGList.map(item => {
        //                                     return item.id + '';
        //                                 })
        //                             });
        //                         });
        //                     }}
        //             >
        //                 确定
        //             </Button>
        //             <Button
        //                 style={{
        //                     width: '68px',
        //                     height: '36px',
        //                     fontSize: '16px',
        //                 }}
        //                 onClick={() => {
        //                     this.setState({
        //                         ygVisible: false,
        //                         staSelList: [],
        //                         staSelKeys: [],
        //                         staExpandedKeys: [],
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
        //                                     this.getStaAll();
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
        //                                     this.getStaAll(selectedKeys[0]);
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
        //                                         staSelList.splice(hasIdx, 1);
        //                                     }
        //                                     this.setState({staSelKeys, staSelList});
        //
        //                                 }
        //                             }}
        //                             selectedKeys={staSelKeys}
        //                         >
        //                             {this.staTreeNodes(allStaList)}
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
        //                                 <img src={item.logo || logo} alt=""
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
        //                                 <img src={del} alt=""
        //                                      style={{
        //                                          width: '18px',
        //                                          height: '18px',
        //                                          cursor: 'pointer'
        //                                      }}
        //                                      onClick={() => {
        //                                          // staSelKeys = pull(staSelKeys, item.key + '');
        //                                          staExpandedKeys = pull(staExpandedKeys, item.key + '');
        //                                          staSelList.splice(idx, 1);
        //                                          this.setState({
        //                                              staSelKeys: staSelList,
        //                                              staSelList: staSelList,
        //                                              staExpandedKeys: staExpandedKeys
        //                                          });
        //                                      }}
        //                                 />
        //                             </div>
        //                         })
        //                     }
        //                 </div>
        //             </div>
        //         </div>
        //     </Modal> : null
        // );
    }

    staTreeNodes(data) {
        return data.map(item => {
            if (item.children) {
                return (
                    <TreeNode
                        dataRef={item}
                        title={item.title}
                        key={item.key + ''}
                    >
                        {this.staTreeNodes(item.children)}
                    </TreeNode>
                );
            } else {
                console.log(item.key, "-==-", item.title);
                return (
                    <TreeNode
                        className={this.staLightNode(item.key) ? 'treeNode' : 'noTreeNode'}
                        {...item}
                        key={item.key + ''}
                        title={item.title}
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
            }
        });
    }

    staLightNode(key) {
        let res = false;
        this.state.staSelKeys.forEach(keys => {
            if ('' + key === '' + keys)
                return res = true;
        });
        return res;
    }

    onSubmit = (values) => {
        if (!this.form)
            return;
        const {choBMList, choZWList, choJSList, choYGList} = this.state;
        let delStr = ['groupName', 'groupDesc', 'assignType'];
        switch (values.assignType + '') {
            case '1':
                delStr.push('addDeptDTOS');
                delStr.push('addJobDTOS');
                break;

            case '2':
                delStr.push('addGroupRoleDTOS');
                break;

            case '3':
                delStr.push('addStaffDTOS');
                break;

            default:
                break;
        }
        values.groupDesc = values.groupDesc ? values.groupDesc : '';
        if ('1' === '' + values.assignType) {
            values.addDeptDTOS = JSON.stringify(choBMList.map(item => {
                return {
                    deptId: item.key,
                    deptName: item.title,
                }
            }));
            values.addJobDTOS = JSON.stringify(choZWList.map(item => {
                return {
                    jobId: item.id,
                    jobName: item.jobName,
                }
            }));

        } else if ('2' === '' + values.assignType) {
            values.addGroupRoleDTOS = JSON.stringify(choJSList.map(item => {
                return {
                    roleId: item.id,
                    roleName: item.roleName,
                }
            }));

        } else if ('3' === '' + values.assignType) {
            values.addStaffDTOS = JSON.stringify(choYGList.map(item => {
                return {
                    staffId: item.id,
                    staffName: item.name,
                }
            }));
        }
        //
        if (this.state.isEdit) {
            values.groupId = this.props.data.chePowInfo.groupId;
            values.updateDeptDTOS = values.addDeptDTOS;
            values.updateJobDTOS = values.addJobDTOS;
            values.updateStaffDTOS = values.addStaffDTOS;
            values.updateGroupRoleDTOS = values.addGroupRoleDTOS;
            delete values.addDeptDTOS;
            delete values.addJobDTOS;
            delete values.addStaffDTOS;
            delete values.addGroupRoleDTOS;
            Model.MyCompanyGUpdate({
                ...values
            }, (res) => {
                message.success('保存成功！');
                this.setState({
                    ...cloneDeep(initialState)
                }, () => {
                    this.form && this.form.resetFields();
                    this.getMyCompanyGList(this.props.data.chePowInfo.groupId);
                });
            }, (err) => {
            });

        } else {
            Model.MyCompanyGAdd({
                ...values
            }, (res) => {
                message.success('保存成功！');
                this.setState({
                    ...cloneDeep(initialState)
                }, () => {
                    this.form && this.form.resetFields();
                    this.getMyCompanyGList();
                });
            }, (err) => {
            });
        }
    }

}

export default PowerMenuModal;
