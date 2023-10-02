import React, {Component} from 'react';
import classnames from 'classnames';
import difference from 'lodash/difference';
import {UserOutlined} from '@ant-design/icons';

import {
    Divider, Button, Table, Input, Tree, Modal, message, Popconfirm,
    Select, Tag, InputNumber, Drawer, Form
} from 'antd';
import model from '../Model'
import {formDeleteEmpty, formRegExp} from '../../../utils'
// 左边部门那颗部门树
import DeptTree from './DeptTree'
import deptIcon from '../../../resource/dept.png'
// 人员选择部门弹出的那个模态框组件
import ChooseDept from './ChooseDept'
import IsPower from '../../Power/IsPower'


const deptIconDom = <img src={deptIcon} style={{width: 18, height: 18, marginTop: '-2px'}}/>
const {TreeNode, DirectoryTree} = Tree;

class EnterpriseArchitecture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 0, // 左边部门和职务切换的表示 0 代表部门, 1 代表职务
            data: [], // 左边树的数据, 不论是部门还是职务都是用树去展示, 只是职务返回的数据只有一级
            tableData: [], // 右边人员列表的数据

            selectedRowKeys: [], // 右边人员勾选的人员 id 集合
            treeSearchValue: '', // 部门和职务上面搜索 input 的内容
            treeSelected: [], // 选择了部门或者职务的 key
            expandedKeys: [], // 部门树展开的 key
            getTreeDataCondition: {
                deptId: 0,
                current: 1,
                pageSize: 10
            }, // 部门的搜索条件
            getJobDataCondition: {
                current: 1,
                pageSize: 10
            }, // 职务的搜索条件 - 职务搜索后面去掉了
            treeSelectItem: {}, // 当前部门或者职务选择的完整数据
            loadedKeys: [], // 当前树已经展开的 key
            deptList: [], // 部门的数据,没有树接口,用来做编辑部门 - 上级部门的数据回显
            jobList: [], // 职务的数据 - 用来做添加/编辑人员的职务选择
            selectDeptModal: undefined, // 人员编辑 - 选择模态框 - 部门的回显数据
            searchData: {} // 搜索 - 搜索面板展示的数据 searchData: {deptData: 部门数据,不带树结构, staff: 人员数据}
        };

        this.formRef = React.createRef();
    }

    // ------ 生命周期 start-----
    componentDidMount() {
        window.globalPermissions.checkPermission('COLLEAGUE_DEPT_ENTER', (res) => {
            if (!res)
                this.getDeptStaffFn();
        });
    }

    componentWillUnmount() {

    }

    // ------ 生命周期 end-------

    // ------ 工具方法 start-----
    getDeptNames = (record) => {
        // 职务人员列表需要展示属于哪些部门(一个人可以属于多个部门), 自己把部门集合处理成字符串展示
        const deptNames = [];
        record.deptVOS && record.deptVOS.forEach(n => deptNames.push(n.departmentName))
        return deptNames.join(',')
    }
    // ------ 工具方法 end-------


    // ------ 组件操作方法 start-----
    showStaffDetail = (record) => {
        // 人员列表 - 列表详情点击的方法
        window.globalPermissions.checkPermission('COLLEAGUE_STAFF_VIEW', (res) => {
            if (res)
                return message.error('抱歉，您没有该操作权限，请联系管理员！');
            this.getDeptData()
            this.getJobData()
            this.formRef && this.formRef.current && this.formRef.current.resetFields()
            this.chooseDeptClear && this.chooseDeptClear()
            this.getPeopleInfo(record.id, record.activeType, () => {
                this.setState({
                    newPeopleVisible: true,
                })
            });
        });
    }

    // ------ 组件方法 end-------


    render() {
        const {active, treeSelectItem} = this.state;
        let columns = []
        // 列表动态切换表头 - 根据部门和职务切换不同表头
        if (this.state.active === 0) {
            columns = [
                {
                    title: '员工ID', width: 70, dataIndex: 'id', render: (text, record) => (
                        record.activeType === 1
                            ? <span>{record.id}</span>
                            : <Tag color="red">未激活</Tag>
                    )
                },
                {title: '员工名称', dataIndex: 'name', ellipsis: true,},
                {title: '职位名称', dataIndex: 'jobName', ellipsis: true,},
                {title: '手机号', width: 130, dataIndex: 'phone'},
                {title: '工作电话', width: 130, dataIndex: 'workPhone'},
                {title: '工作邮箱', dataIndex: 'workEmail', ellipsis: true,},
                {
                    title: '操作', width: 100, dataIndex: 'operation', render: (text, record) => (
                        <div>
                            <a
                                onClick={() => {
                                    this.showStaffDetail(record)
                                }}
                            >
                                查看
                            </a>
                            {/*{*/}
                            {/*	(record && record.activeType === 2) && (*/}
                            {/*		<span>*/}
                            {/*            <Divider type='vertical'/>*/}
                            {/*            <a>邀请</a>*/}
                            {/*        </span>*/}
                            {/*	)*/}
                            {/*}*/}
                        </div>
                    )
                }
            ]
        } else {
            columns = [
                {
                    title: '员工 ID', width: 80, dataIndex: 'id', render: (text, record) => (
                        record.activeType === 1
                            ? <span>{record.id}</span>
                            : <Tag color="red">未激活</Tag>
                    )
                },
                {title: '员工名称', dataIndex: 'name'},
                {title: '手机号', dataIndex: 'phone'},
                {
                    title: '所属部门', dataIndex: 'depts', width: 200, ellipsis: true, render: (text, record) => {
                        return this.getDeptNames(record)
                    }
                },
                {
                    title: '操作', dataIndex: 'operation', render: (text, record) => (
                        <div>
                            <a
                                onClick={() => {
                                    this.showStaffDetail(record)
                                }}
                            >
                                查看
                            </a>
                        </div>
                    )
                }
            ]
        }

        // 列表批量选择的方法
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                const newSelectedRows = this.state.selectedRows || [];
                const add = difference(selectedRowKeys, this.state.selectedRowKeys);
                const remove = difference(this.state.selectedRowKeys, selectedRowKeys);
                if (add.length > 0) {
                    selectedRows.forEach(item => {
                        add.forEach(i => {
                            if (item.id === i) {
                                newSelectedRows.push(item)
                            }
                        })
                    })
                } else {
                    newSelectedRows.forEach((item, index) => {
                        remove.forEach(n => {
                            if (item.id === n) {
                                newSelectedRows.splice(index, 1)
                            }
                        })
                    })
                }
                this.setState({selectedRowKeys, selectedRows: newSelectedRows})
            },
        };
        // 右边列表的 html
        const rightHtml = [
            <div className='cbiCss' key={'leftHtml_01'}>
                <div className='border-bottom oneLine'>
                    <h1 className='oneLine-item'>
                        {
                            (() => {
                                if (this.state.active === 0) {
                                    return `${treeSelectItem.deptName || ''}(${(treeSelectItem.members && treeSelectItem.members.total) || 0}人)`
                                } else {
                                    return `${treeSelectItem.jobName || ''}(${treeSelectItem.num || treeSelectItem.staffNum || 0}人)`
                                }
                            })()
                        }
                    </h1>
                    {
                        this.state.active === 0 && (
                            <div>
                                <a
                                    onClick={() => {
                                        window.globalPermissions.checkPermission('COLLEAGUE_DEPARTMENT_EDIT', (res) => {
                                            if (res)
                                                return message.error('抱歉，您没有该操作权限，请联系管理员！');

                                            this.setState({editorialDeptVisible: true});
                                            this.getDeptData();
                                        });
                                    }}
                                    style={{color: '#4481EB'}}
                                >
                                    编辑部门
                                </a>
                                <Divider type='vertical'/>
                                <a
                                    onClick={() => {
                                        window.globalPermissions.checkPermission('COLLEAGUE_DEPARTMENT_ADD', (res) => {
                                            if (res)
                                                return message.error('抱歉，您没有该操作权限，请联系管理员！');

                                            this.setState({addSubDeptVisible: true});
                                        });
                                    }}
                                    style={{color: '#4481EB'}}
                                >
                                    添加子部门
                                </a>
                                <Divider type='vertical'/>
                                <Popconfirm
                                    title="确认删除该部门?"
                                    onConfirm={() => {
                                        window.globalPermissions.checkPermission('COLLEAGUE_DEPARTMENT_DELETE', (res) => {
                                            if (res)
                                                return message.error('抱歉，您没有该操作权限，请联系管理员！');
                                            this.deleteDept();
                                        });
                                    }}
                                    okText="确认"
                                    cancelText="取消"
                                >
                                    <a style={{color: '#F41E28'}}>删除部门</a>
                                </Popconfirm>
                            </div>
                        )
                    }
                    {
                        this.state.active === 1 && (
                            <div>
                                <a
                                    onClick={() => {
                                        window.globalPermissions.checkPermission('COLLEAGUE_POST_EDIT', (res) => {
                                            if (res)
                                                return message.error('抱歉，您没有该操作权限，请联系管理员！');

                                            this.setState({
                                                editDeptVisible: true,
                                                formJobName: this.state.treeSelectItem.jobName
                                            })
                                        });
                                    }}
                                    style={{color: '#4481EB'}}
                                >
                                    修改名称
                                </a>
                                <Divider type='vertical'/>
                                <Popconfirm
                                    title="确认删除该职务?"
                                    onConfirm={() => {
                                        window.globalPermissions.checkPermission('COLLEAGUE_JOB_DEL', (res) => {
                                            if (res)
                                                return message.error('抱歉，您没有该操作权限，请联系管理员！');

                                            this.deleteDept();
                                        });
                                    }}
                                    okText="确认"
                                    cancelText="取消"
                                >
                                    <a style={{color: '#F41E28'}}>删除职务</a>
                                </Popconfirm>
                            </div>
                        )
                    }
                </div>
                <div className='oneLine flex-centerY' style={{marginTop: 20}}>
                    <UserOutlined className='icon-style'/>
                    <h3 className='subtitle'>{this.state.active === 0 ? '部门人员' : '职务人员'}</h3>
                </div>
                <div style={{marginTop: 16, padding: '8px 12px', background: '#F1F1FA', borderRadius: 6}}>
                    <Button onClick={() => {
                        window.globalPermissions.checkPermission('COLLEAGUE_STAFF_MANUALADD', (res) => {
                            if (res)
                                return message.error('抱歉，您没有该操作权限，请联系管理员！');
                            this.formRef && this.formRef.current && this.formRef.current.resetFields();
                            this.setState({defaultValue: {}, newPeopleVisible: true});
                            this.getDeptData();
                            this.getJobData();
                        });
                    }} className='btn-primary'>添加成员</Button>
                    <Popconfirm
                        title="确认删除成员?"
                        onConfirm={() => {
                            window.globalPermissions.checkPermission('COLLEAGUE_STAFF_DELETE', (res) => {
                                if (res)
                                    return message.error('抱歉，您没有该操作权限，请联系管理员！');
                                this.deletePeople();
                            });
                        }}
                        okText="确认"
                        cancelText="取消"
                    >
                        <Button className='btn-primary' style={{marginLeft: 16}}>删除</Button>
                    </Popconfirm>
                    {
                        this.state.active === 1 && (
                            <Button
                                onClick={() => {
                                    window.globalPermissions.checkPermission('COLLEAGUE_STAFF_EDIT', (res) => {
                                        if (res)
                                            return message.error('抱歉，您没有该操作权限，请联系管理员！');
                                        this.getJobData()
                                        this.setState({changePositionVisible: true});
                                    });
                                }}
                                disabled={this.state.selectedRowKeys.length === 0}
                                className='btn-primary'
                                style={{marginLeft: 16}}
                            >
                                批量变更职务
                            </Button>
                        )
                    }
                </div>

                <div className='table-wrapper'>
                    <Table
                        rowKey={'id'}
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={this.state.tableData && this.state.tableData.records}
                        pagination={{
                            current: this.state.tableData && this.state.tableData.current,
                            total: this.state.tableData && this.state.tableData.total,
                            onChange: (current, pageSize) => {
                                if (this.state.active === 0) {
                                    if (this.state.treeSearchValue !== '') {
                                        this.setState({
                                            getTreeDataCondition: {
                                                ...this.state.getTreeDataCondition,
                                                current: current
                                            }
                                        }, () => {
                                            this.getDeptStaffFn(this.state.deptId)
                                        })
                                    } else {
                                        this.setState({
                                            getTreeDataCondition: Object.assign(this.state.getTreeDataCondition, {
                                                current,
                                                pageSize
                                            })
                                        }, () => {
                                            this.getDeptStaffFn()
                                            this.setState({loadedKeys: []})
                                        })
                                    }
                                } else {
                                    if (this.state.treeSearchValue !== '') {
                                        this.staffJobPage(false);
                                    } else {
                                        this.setState({
                                            getJobDataCondition: Object.assign(this.state.getJobDataCondition, {
                                                current,
                                                pageSize
                                            })
                                        }, () => {
                                            this.staffJobPage(false);
                                            this.setState({loadedKeys: []})
                                        })
                                    }
                                }
                            }
                        }}
                    />
                </div>
            </div>
        ];
        return (
            <div className='content-wrapper'>
                {/*选择部门的模态框*/}
                {this.selectDeptModal()}
                {/*修改部门名称或者职务名称的模态框*/}
                {this.renderEditDeptNameModal()}
                {/*修改部门信息的模态框*/}
                {this.renderEditorialDepartment()}
                {/*添加子部门模态框*/}
                {this.renderAddSubDept()}
                {/*人员信息 form 表单的抽屉*/}
                {this.newPeople()}
                {/*批量变更职务模态框*/}
                {this.changePositionModal()}

                <div className='content-wrapper-left'>
                    <DeptTree
                        ref={e => this.deptTreeRef = e}
                        showStaffDetail={this.showStaffDetail}
                        searchData={this.state.searchData}
                        searchChange={(e) => this.setState({treeSearchValue: e.target.value})}
                        searchValue={this.state.treeSearchValue}
                        enterpriseSearch={this.enterpriseSearch}
                        searchKeyDown={(e) => {
                            if (e.keyCode === 13) {
                                if (this.state.treeSearchValue.length > 0) {
                                    this.enterpriseSearch()
                                } else {
                                    this.setState({searchData: {}})
                                    this.deptTreeRef.resetState()
                                    if (this.state.active === 0) {
                                        this.getDeptStaffFn(0, 1, 1)
                                    } else {
                                        this.staffJobPage()
                                    }
                                }
                            }
                        }}
                        treeData={this.state.data}
                        active={this.state.active}
                        treeLoadData={this.onLoadData}
                        getDeptStaffFn={this.getDeptStaffFn}
                        treeOnSelect={this.onSelect}
                        treeLoadedKeys={this.state.loadedKeys}
                        treeSelectKey={this.state.treeSelected}
                        treeExpandedKeys={this.state.expandedKeys}
                        treeOnExpand={this.onExpand}
                        field={
                            this.state.active === 0 ?
                                {key: 'deptId', label: 'deptName', searchLabel: 'depName'} :
                                {key: 'jobId', label: 'jobName'}
                        }
                        style={{
                            searchInputPadding: {
                                padding: '24px 0px 0px 0px'
                            }
                        }}
                    >
                        <div className={'heh-tab oneLine flex-centerY'}
                             style={{margin: '0px 12px', marginTop: '24px'}}>
                            <div
                                onClick={() => this.tabChange(0)}
                                className={classnames('tab-item', active === 0 ? 'tab-active' : 'tab-unActive')}
                            >
                                部门
                            </div>
                            <div
                                onClick={() => this.tabChange(1)}
                                className={classnames('tab-item', active === 1 ? 'tab-active' : 'tab-unActive')}
                            >
                                职务
                            </div>
                        </div>
                        {
                            this.state.active === 1 && (
                                <IsPower
                                    key={'COLLEAGUE_POST_ENTER_10'}
                                    permissionsName={'COLLEAGUE_POST_ENTER'}
                                    isShowRes={false}
                                    isShowWait={false}
                                >
                                    <div style={{textAlign: 'center'}}>
                                        <Button
                                            onClick={() => {
                                                window.globalPermissions.checkPermission('COLLEAGUE_POST_ADD', (res) => {
                                                    if (res)
                                                        return message.error('抱歉，您没有该操作权限，请联系管理员！');

                                                    this.setState({addSubDeptVisible: true});
                                                });
                                            }}
                                            style={{
                                                marginTop: 20,
                                                width: 88,
                                                height: 32,
                                                fontSize: 14,
                                                fontWeight: 500
                                            }}
                                        >
                                            添加职务
                                        </Button>
                                    </div>
                                </IsPower>
                            )
                        }
                    </DeptTree>
                </div>
                <div className='content-wrapper-right'>
                    {
                        this.state.active === 0 ? <IsPower
                            key={'COLLEAGUE_DEPT_ENTER_11'}
                            permissionsName={'COLLEAGUE_DEPT_ENTER'}
                            style={{paddingTop: '240px'}}
                        >
                            {rightHtml}
                        </IsPower> : null
                    }
                    {
                        this.state.active === 1 ? <IsPower
                            key={'COLLEAGUE_POST_ENTER_12'}
                            permissionsName={'COLLEAGUE_POST_ENTER'}
                            style={{paddingTop: '240px'}}
                        >
                            {rightHtml}
                        </IsPower> : null
                    }
                </div>
            </div>
        );
    }

    // ------ 带请求函数 start-----
    getDeptData = () => {
        // 获取部门数据不带树结构
        model.erpDepartmentList({start: 1, pageSize: 1000}, res => {
            this.setState({deptList: res.data})
        })
    }
    getJobData = () => {
        // 获取职务信息
        model.erpJobList({start: 1, pageSize: 1000}, res => {
            this.setState({jobList: res.data.records})
        })
    }

    // 获取部门带部门人员信息的接口 (type 参数好像没用)
    getDeptStaffFn = (deptId, type, current) => {
        let searchCondition = this.state.getTreeDataCondition;
        if (current !== undefined) {
            searchCondition = {
                ...searchCondition,
                current
            }
            this.setState({getTreeDataCondition: searchCondition})
        }
        if (deptId !== undefined) searchCondition.deptId = deptId
        model.staffListall(searchCondition, res => {
            if (type === 1) {
                if (res.data) {
                    res.data.children = res.data.subDepts
                    delete res.data.subDepts
                }
                this.setState({
                    expandedKeys: [res.data.deptId + ''],
                    active: 0,
                    deptName: res.data.deptName,
                    data: [res.data],
                    treeSelected: [res.data.deptId + ''],
                    tableData: res.data.members,
                    getTreeDataCondition: Object.assign(this.state.getTreeDataCondition, {deptId: res.data.deptId}),
                    treeSelectedParentId: res.data.deptId,
                    editDeptParentId: res.data.parentId === 0 ? res.data.deptId : res.data.parentId,
                    treeSelectItem: res.data,
                    treeSelectTrueParentId: res.data.parentId
                })
                return false
            }
            if (this.state.data.length === 0 && this.state.active === 0) {
                if (res.data) {
                    res.data.children = res.data.subDepts
                    delete res.data.subDepts
                }
                this.setState({
                    expandedKeys: [res.data.deptId + ''],
                    active: 0,
                    deptName: res.data.deptName,
                    data: [res.data],
                    treeSelected: [res.data.deptId + ''],
                    tableData: res.data.members,
                    getTreeDataCondition: Object.assign(this.state.getTreeDataCondition, {deptId: res.data.deptId}),
                    treeSelectedParentId: res.data.deptId,
                    editDeptParentId: res.data.parentId === 0 ? res.data.deptId : res.data.parentId,
                    treeSelectItem: res.data,
                    treeSelectTrueParentId: res.data.parentId
                })
            } else {
                this.replaceTheData(this.state.data, res.data)
                this.setState({
                    data: this.state.data,
                    tableData: res.data.members,
                    deptName: res.data.deptName,
                    getTreeDataCondition: Object.assign(this.state.getTreeDataCondition, {deptId: res.data.deptId}),
                    treeSelectedParentId: res.data.deptId,
                    editDeptParentId: res.data.parentId === 0 ? res.data.deptId : res.data.parentId,
                    treeSelected: [res.data.deptId + ''],
                    treeSelectItem: res.data,
                    treeSelectTrueParentId: res.data.parentId
                })
            }
        })
    }

    // 获取职务列表接口
    staffJobPage = (isChangeTreeSelected = true) => {
        model.staffJobPage(this.state.getJobDataCondition, res => {
            if (res && res.data && res.data[0]) {
                const treeSelected = isChangeTreeSelected ? [res.data[0].jobId + ''] : this.state.treeSelected;
                let tableDataIdx = 0;
                res.data.forEach((item, idx) => {
                    if (item.jobId + '' === treeSelected[0] + '')
                        return tableDataIdx = idx;
                });
                this.setState({
                    data: res.data,
                    active: 1,
                    treeSelected,
                    tableData: res.data[tableDataIdx].jobStaffPageVO,
                    treeSelectItem: res.data[tableDataIdx],
                })
            }
        })
    }

    // 部门树动态加载下一级树接口
    onLoadData = treeNode => {
        return new Promise(resolve => {
            model.staffListall({
                deptId: treeNode.props.deptId,
                current: 1,
                pageSize: 10
            }, res => {
                if (res.data) {
                    res.data.children = res.data.subDepts
                    delete res.data.subDepts
                }
                treeNode.props.dataRef.children = res.data.children
                this.state.loadedKeys.push(res.data.deptId + '')
                this.setState({
                    data: [...this.state.data],
                });
                resolve();
            })
        });
    }

    // 部门搜索接口
    enterpriseSearch = (current = 1, keyWord) => {
        if (this.state.active === 0) {
            model.communicationPage({
                keyWord: keyWord !== undefined ? keyWord : this.state.treeSearchValue,
                current: current,
                type: 2
            }, res => {
                if (keyWord !== undefined) {
                    this.setState({
                        tableData: res.data.staffVO,
                        data: res.data.deptVO
                    })
                } else {
                    if (res.data.deptVO[0]) {
                        this.getDeptStaffFn(res.data.deptVO[0].deptId, undefined, 1)
                        this.deptTreeRef.state.deptSearchActive = res.data.deptVO[0].deptId
                    }

                    this.setState({
                        searchData: {
                            deptData: res.data.deptVO,
                            staff: res.data.staffVO
                        }
                    })
                }
            })
        } else {
            model.communicationPage({
                keyWord: this.state.treeSearchValue,
                current: current,
                type: 3
            }, res => {
                this.setState({
                    tableData: res.data.staffVO,
                    data: res.data.jobVO
                })
            })
        }
    }

    // 获取人员详情信息接口
    getPeopleInfo = (id, activeType, callback) => {
        model.erpStaffInfomation({
            staffId: id,
            activeType
        }, res => {
            let deptId = []
            let selectDeptArr = []
            let selectDeptArrKey = []
            res.data.deptVO.forEach(item => {
                deptId.push(item.departmentId)
                selectDeptArrKey.push(item.departmentId + '')
                selectDeptArr.push({key: item.departmentId + '', value: item.departmentName})
            })
            res.data.deptIds = deptId
            this.setState({
                selectDeptModal: {
                    currentSelectDept: selectDeptArr,
                    treeSelected: selectDeptArrKey
                },
                defaultValue: res.data
            }, () => {
                callback && callback();
            })
        })
    }

    // 人员信息更新接口
    peopleUpdate = (values) => {
        if (values.deptIds) values.departmentIds = values.deptIds.join(',')
        model.erpStaffChange(formDeleteEmpty(values), res => {
            message.success('修改成功')
            if (this.state.active === 0) {
                this.getDeptStaffFn()
            } else {
                this.staffJobPage()
            }
            this.setState({newPeopleVisible: false})
        })
    }

    // 新建人员接口
    peopleCreate = (values) => {
        if (values.deptIds) values.deptIds = values.deptIds.join(',')
        model.erpStaffManualAdd(formDeleteEmpty(values), res => {
            message.success('添加人员成功')
            if (this.state.active === 0) {
                this.getDeptStaffFn()
            } else {
                this.staffJobPage()
            }
            this.setState({newPeopleVisible: false})
        })
    }

    // 修改部门信息接口
    EditorialDepartmentOk = () => {
        model.erpDepartmentUpdate({
            depId: this.state.treeSelected[0],
            departmentName: this.state.deptName,
            parentId: this.state.deptParentId || this.state.editDeptParentId || 0
        }, res => {
            message.success('修改成功');
            this.getDeptStaffFn(0, 1)
            this.setState({editorialDeptVisible: false, loadedKeys: []})
        })
    }

    // 修改职务信息接口(当初修改部门名称和职务名称用的是同一个模态框,后来改了)
    editDeptOnOk = () => {
        if (this.state.active === 0) {
            if (this.state.formJobName === '' || this.state.formJobName === undefined) {
                message.error('请输入部门名称')
                return
            }
            model.erpDepartmentUpdate({
                depId: this.state.treeSelected[0],
                departmentName: this.state.formJobName,
                parentId: this.state.deptParentId || this.state.editDeptParentId || 0
            }, res => {
                message.success('修改成功');
                this.getDeptStaffFn()
                this.setState({editDeptVisible: false, loadedKeys: []})
            })
        } else {
            if (this.state.formJobName === '' || this.state.formJobName === undefined) {
                message.error('请输入职务名称')
                return
            }
            model.erpJobUpdate({
                jobId: this.state.treeSelected[0],
                jobName: this.state.formJobName,
            }, res => {
                message.success('修改成功');
                this.staffJobPage()
                this.setState({editDeptVisible: false, loadedKeys: []})
            })
        }
    }

    // 添加子部门接口
    addSubDeptOnOk = () => {
        if (this.state.active === 0) {
            if (this.state.subDeptName === '' || this.state.subDeptName === undefined) {
                message.error('请输入子部门名称')
                return
            }
            model.erpDepartmentAdd({
                departmentName: this.state.subDeptName,
                parentId: this.state.treeSelected[0]
            }, res => {
                message.success('添加成功')
                this.getDeptStaffFn()
                this.setState({addSubDeptVisible: false, loadedKeys: []})
            })
        } else {
            if (this.state.subDeptName === '' || this.state.subDeptName === undefined) {
                message.error('请输入职务名称')
                return
            }
            model.erpJobAdd({
                jobName: this.state.subDeptName,
            }, res => {
                message.success('添加成功')
                this.staffJobPage()
                this.setState({addSubDeptVisible: false, loadedKeys: []})
            })
        }
    }

    // 删除部门获取职务接口
    deleteDept = () => {
        if (this.state.active === 0) {
            model.erpDepartmentDelete({depId: this.state.treeSelected[0]}, res => {
                message.success('删除成功')
                this.getDeptStaffFn(this.state.treeSelectItem.parentId)
                this.setState({loadedKeys: []})
            })
        } else {
            model.erpJobDelete({jobIds: this.state.treeSelected.join(',')}, res => {
                message.success('删除成功')
                this.staffJobPage()
                this.setState({loadedKeys: []})
            })
        }
    }

    // 批量删除人员接口
    deletePeople = () => {
        if (this.state.selectedRows === undefined || this.state.selectedRows.length === 0) {
            message.error('请先勾选要删除的部门人员!')
            return
        }
        const removeData = []
        this.state.selectedRows.forEach(item => {
            removeData.push({
                staffId: item.id,
                activeType: item.activeType
            })
        })
        model.erpStaffDel({
            staffDelDTOList: removeData
        }, res => {
            if (this.state.active === 0) {
                this.getDeptStaffFn()
                if (this.state.treeSearchValue !== undefined && this.state.treeSearchValue !== '') {
                    this.enterpriseSearch()
                }
            } else {
                this.staffJobPage()
            }
        })
    }

    // 抽屉里面那个删除人员接口
    deletePeopleId = (id) => {
        const removeData = []
        id.forEach(item => {
            removeData.push({
                staffId: item.id,
                activeType: item.activeType
            })
        })
        model.erpStaffDel({
            staffDelDTOList: removeData
        }, res => {
            this.setState({newPeopleVisible: false})
            if (this.state.active === 0) {
                this.getDeptStaffFn()
                if (this.state.treeSearchValue !== undefined && this.state.treeSearchValue !== '') {
                    this.enterpriseSearch()
                }
            } else {
                this.staffJobPage()
            }
        })
    }
    // ------ 带请求函数 end-------

    // ------ 组件方法 start-----
    // 部门和职务点击选择的方法
    onSelect = (selectedKeys, selectedNodes) => {
        if (JSON.stringify(this.state.treeSelected) !== JSON.stringify(selectedKeys)) {
            this.setState({
                selectedRowKeys: [],
                selectedRows: [],
            });

            if (this.state.active === 0) {
                if (selectedNodes.node.props.parentId === 0) {
                    this.setState({
                        expandedKeys: selectedKeys,
                        treeSelected: selectedKeys,
                        treeSelectedParentId: selectedNodes.node.props.deptId,
                        treeSelectTrueParentId: selectedNodes.node.props.parentId,
                        editDeptParentId: selectedNodes.node.props.parentId === 0 ? selectedNodes.node.props.deptId : selectedNodes.node.props.parentId,
                        deptName: selectedNodes.node.props.deptName,
                        treeSelectItem: selectedNodes.node.props,
                        getTreeDataCondition: Object.assign(this.state.getTreeDataCondition, {
                            deptId: selectedKeys[0],
                            current: 1
                        }),
                    }, () => {
                        this.getDeptStaffFn();
                    })
                } else {
                    this.setState({
                        expandedKeys: this.state.expandedKeys.concat(selectedKeys),
                        treeSelected: selectedKeys,
                        treeSelectedParentId: selectedNodes.node.props.deptId,
                        treeSelectTrueParentId: selectedNodes.node.props.parentId,
                        editDeptParentId: selectedNodes.node.props.parentId === 0 ? selectedNodes.node.props.deptId : selectedNodes.node.props.parentId,
                        deptName: selectedNodes.node.props.deptName,
                        treeSelectItem: selectedNodes.node.props,
                        getTreeDataCondition: Object.assign(this.state.getTreeDataCondition, {
                            deptId: selectedKeys[0],
                            current: 1
                        }),
                    }, () => {
                        this.getDeptStaffFn();
                    })
                }
            } else {
                this.setState({
                    treeSelected: selectedKeys,
                    tableData: selectedNodes.node.props.jobStaffPageVO,
                    treeSelectItem: selectedNodes.node.props,
                    getJobDataCondition: {
                        current: 1,
                        pageSize: 10
                    }
                }, () => {
                    this.staffJobPage(false);
                });
            }
        }
    }
    // 渲染树节点
    renderTreeNodes = data => {
        if (this.state.active === 0) {
            return data.map(item => {
                if (item.children) {
                    return (
                        <TreeNode
                            {...item}
                            icon={deptIconDom}
                            isLeaf={item.hasChildren !== true}
                            key={item.deptId + ''}
                            title={item.deptName || item.depName}
                            dataRef={item}
                        >
                            {this.renderTreeNodes(item.children)}
                        </TreeNode>
                    );
                }
                return (
                    <TreeNode
                        {...item}
                        icon={deptIconDom}
                        isLeaf={item.hasChildren !== true}
                        key={item.deptId + ''}
                        title={item.deptName || item.depName}
                        dataRef={item}
                    />
                );
            });
        } else {
            return data.map(item => {
                if (item.children) {
                    return (
                        <TreeNode
                            {...item}
                            icon={deptIconDom}
                            isLeaf={item.hasChildren !== true}
                            key={item.id + ''}
                            title={item.jobName}
                            dataRef={item}
                        >
                            {this.renderTreeNodes(item.children)}
                        </TreeNode>
                    );
                }
                return (
                    <TreeNode
                        {...item}
                        icon={deptIconDom}
                        isLeaf={item.hasChildren !== true}
                        key={item.id + ''}
                        title={item.jobName}
                        dataRef={item}
                    />
                );
            });
        }
    }
    // 部门和职务选项卡切换
    tabChange = (active) => {
        if (active === 1) {
            this.setState({
                active: 1,
                data: [],
                treeSearchValue: '',
                selectedRowKeys: [],
                selectedRows: [],
                searchData: {}
            }, () => {
                window.globalPermissions.checkPermission('COLLEAGUE_POST_ENTER', (res) => {
                    if (!res)
                        this.staffJobPage();
                });
            });
        } else if (active === 0) {
            this.setState({
                active: 0,
                data: [],
                treeSearchValue: '',
                selectedRowKeys: [],
                selectedRows: []
            }, () => {
                window.globalPermissions.checkPermission('COLLEAGUE_DEPT_ENTER', (res) => {
                    if (!res)
                        this.getDeptStaffFn(0);
                });
            })
        }
    }
    // 获取抽屉表单数据
    newPeopleOk = (e) => {
        e.preventDefault();
        this.formRef && this.formRef.current && this.formRef.current.validateFields().then(values => {
            for (let i in values) {
                if (values[i] === undefined || values[i] === '') delete values[i]
            }
            if (this.state.defaultValue && (this.state.defaultValue.id !== undefined)) {
                values.departmentIds = values.deptIds.join(',')
                delete values.deptIds
                this.peopleUpdate({
                    ...values,
                    employeeId: this.state.defaultValue.id,
                    activeType: this.state.defaultValue.activeType,
                })
            } else {
                this.peopleCreate(values)
            }
        });
    }
    replaceTheData = (data, item) => {
        data.map((n, index) => {
            if (n.deptId === item.deptId) {
                data[index] = item
                data[index].children = data[index].subDepts
                delete data[index].subDepts
            }
            if (n.children) {
                this.replaceTheData(n.children, item)
            }
        })
    }
    onExpand = (expandedKeys, {expanded, node}) => {
        if (expanded === false) {
            expandedKeys = expandedKeys.filter(n => n + '' !== node.props.deptId + '')
        }
        this.setState({
            expandedKeys,
        })
        if (expanded === true) {
            this.onLoadData(node)
        }
    }
    // ------ 组件方法 end-------

    // ------ 渲染组件 start-----
    renderAddSubDept = () => {
        return (
            this.state.addSubDeptVisible ? <Modal
                afterClose={() => {
                    this.setState({subDeptName: ''})
                }}
                destroyOnClose={true}
                centered={true}
                className={'sw-modal'}
                title={this.state.active === 0 ? '添加子部门' : '添加职务'}
                visible={this.state.addSubDeptVisible}
                onCancel={() => this.setState({addSubDeptVisible: false})}
                onOk={this.addSubDeptOnOk}
            >
                <div className='oneLine flex-centerY sw-form-item'>
                    <label
                        className={'label'}
                        htmlFor="subDeptName"
                    >
                        {this.state.active === 0 ? '子部门名称' : '职务名称'} <span style={{color: '#f12c20'}}> * </span>
                    </label>
                    <Input
                        maxLength={30}
                        onChange={(e) => this.setState({subDeptName: e.target.value})}
                        style={{marginLeft: 8}}
                        className='oneLine-item'
                        id='subDeptName'
                    />
                </div>
            </Modal> : null
        )
    }
    renderEditorialDepartment = () => {
        return (
            this.state.editorialDeptVisible ? <Modal
                afterClose={() => {
                    this.chooseDeptClear && this.chooseDeptClear()
                    this.setState({
                        deptParentId: undefined
                    })
                }}
                centered={true}
                className={'sw-modal'}
                title={'编辑部门'}
                visible={this.state.editorialDeptVisible}
                onCancel={() => this.setState({editorialDeptVisible: false})}
                onOk={this.EditorialDepartmentOk}
            >
                <div className='oneLine flex-centerY sw-form-item'>
                    <label className={'label'} htmlFor="deptName">{'部门名称'}</label>
                    <Input
                        maxLength={30}
                        value={this.state.deptName}
                        onChange={(e) => this.setState({deptName: e.target.value})}
                        style={{marginLeft: 8, width: '80%'}}
                        className='oneLine-item'
                        id='deptName'
                    />
                </div>
                <div style={{marginTop: 20}} className='oneLine flex-centerY'>
                    <label className={'label'} htmlFor="deptTop">上级部门</label>
                    <Select
                        onDropdownVisibleChange={(open) => {
                            if (open === true) {
                                this.setState({
                                    chooseDeptType: 1,
                                    selectDeptVisible: true
                                })
                            }
                        }}
                        disabled={this.state.treeSelectTrueParentId === 0}
                        dropdownStyle={{display: 'none'}}
                        value={this.state.deptParentId || this.state.editDeptParentId + ''}
                        onChange={(value => this.setState({deptParentId: value}))}
                        id='deptTop'
                        className='oneLine-item' style={{width: '80%', marginLeft: 8}}
                    >
                        {this.state.deptList && this.state.deptList.map(item => (
                            <Select.Option key={item.id + ''} value={item.id + ''}>{item.displayName}</Select.Option>
                        ))}
                    </Select>
                </div>
            </Modal> : null
        )
    }
    renderEditDeptNameModal = () => {
        return (
            this.state.editDeptVisible ? <Modal
                afterClose={() => {
                    this.setState({formJobName: ''})
                }}
                centered={true}
                className={'sw-modal'}
                title={this.state.active === 0 ? '修改部门名称' : '修改职务名称'}
                visible={this.state.editDeptVisible}
                onCancel={() => this.setState({editDeptVisible: false})}
                onOk={this.editDeptOnOk}
            >
                <div className='oneLine flex-centerY sw-form-item'>
                    <label className={'label'} htmlFor="formJobName">
                        {this.state.active === 0 ? '部门名称' : '职务名称'}
                        <span style={{color: '#f12c20'}}> * </span>
                    </label>
                    <Input
                        onChange={(e) => this.setState({
                            formJobName: e.target.value
                        })}
                        value={this.state.active === 0 ? '' : this.state.formJobName}
                        style={{marginLeft: 8}}
                        className='oneLine-item'
                        id='formJobName'
                    />
                </div>
            </Modal> : null
        )
    }
    changePositionModal = () => {
        const onSelect = (selectedKeys) => {
            this.setState({changePositionSelectKey: selectedKeys})
        }
        const onOk = () => {
            const submitData = [];
            if (this.state.changePositionSelectKey !== undefined && JSON.stringify(this.state.changePositionSelectKey) !== '[]') {
                this.state.selectedRows.forEach(item => {
                    submitData.push({
                        jobId: this.state.changePositionSelectKey[0],
                        staffId: item.id,
                        activeType: item.activeType
                    })
                })
                model.erpStaffJobBatchUpdate({
                    jobStaffBatchMessage: JSON.stringify(submitData)
                }, res => {
                    message.success('变更职务成功')
                    this.staffJobPage()
                    this.setState({
                        changePositionVisible: false,
                        changePositionSelectKey: undefined
                    })
                })
            } else {
                message.error('请选择职务')
            }
        }
        return (
            this.state.changePositionVisible ? <Modal
                afterClose={() => {
                    this.setState({
                        changePositionSelectKey: [],
                    })
                }}
                title='变更职务'
                className={'sw-modal'}
                visible={this.state.changePositionVisible}
                onCancel={() => this.setState({changePositionVisible: false})}
                onOk={onOk}
                style={{top: 30}}
            >
                <div className='heh-tree'>
                    <DirectoryTree
                        onSelect={onSelect}
                        selectedKeys={this.state.changePositionSelectKey}
                    >
                        {this.renderTreeNodes(this.state.jobList || [])}
                    </DirectoryTree>
                </div>
            </Modal> : null
        )
    }
    newPeople = () => {
        const {defaultValue} = this.state;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };
        return (
            this.state.newPeopleVisible ? <Drawer
                afterVisibleChange={(visible) => {
                    if (!visible) {
                        if (defaultValue && defaultValue.id) {
                            this.chooseDeptClear && this.chooseDeptClear()
                        }
                        this.formRef && this.formRef.current && this.formRef.current.resetFields()
                        this.setState({defaultValue: {}, selectDeptModal: undefined})
                    }
                }}
                width={545}
                bodyStyle={{padding: '12px 24px 80px 24px'}}
                title={(JSON.stringify(this.state.defaultValue) === '{}' || this.state.defaultValue === undefined) ? '添加成员' : '成员详情'}
                visible={true}
                onClose={() => this.setState({newPeopleVisible: false})}
            >
                <Form ref={this.formRef} {...formItemLayout} className={'form-wrapper'}>
                    {

                        (JSON.stringify(defaultValue) !== '{}' && defaultValue !== undefined) && (
                            <div className={'sw-form-item'}
                                 style={{display: 'flex', justifyContent: 'center', padding: 10}}>
                                <div>
                                    <label htmlFor="">员工ID: </label>
                                    <span>{defaultValue && defaultValue.id}</span>
                                </div>
                                <div style={{marginLeft: 20}}>
                                    <label htmlFor="">真实姓名: </label>
                                    <span>{defaultValue && defaultValue.authStatus === 1 && defaultValue.authName}</span>
                                </div>
                            </div>
                        )
                    }
                    <Form.Item
                        label="员工姓名"
                        name={'name'}
                        initialValue={defaultValue && defaultValue.name}
                        rules={[
                            {
                                required: true,
                                message: '请输入员工姓名!',
                            },
                        ]}
                    >
                        <Input maxLength={20}/>
                    </Form.Item>
                    <Form.Item
                        label="选择部门"
                        name={'deptIds'}
                        initialValue={defaultValue && defaultValue.deptIds}
                        rules={[
                            {
                                required: true,
                                message: '请选择部门!',
                            },
                        ]}
                    >
                        <Select
                            className={'select-no-show-close-tag'}
                            dropdownStyle={{display: 'none'}}
                            mode="multiple"
                            onDropdownVisibleChange={(open) => {
                                if (open === true) {
                                    this.setState({
                                        selectDeptVisible: true,
                                        chooseDeptType: 2
                                    })
                                }
                            }}
                        >
                            {this.state.deptList && this.state.deptList.map(item => (
                                <Select.Option key={item.id} value={item.id}>
                                    <div title={item.displayName}>{item.displayName}</div>
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="选择职务"
                        name={'jobId'}
                        initialValue={defaultValue && defaultValue.jobId}
                    >
                        <Select>
                            {this.state.jobList && this.state.jobList.map(item => (
                                <Select.Option key={item.id} value={item.id}>{item.jobName}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="手机号"
                        name={'phone'}
                        initialValue={defaultValue && defaultValue.phone}
                        rules={[
                            formRegExp.required(),
                            formRegExp.phone(),
                        ]}
                    >
                        <InputNumber
                            style={{width: '100%'}}
                            disabled={defaultValue && defaultValue.activeType === 1}/>
                    </Form.Item>


                    <Form.Item
                        label="性别"
                        name={'sex'}
                        initialValue={defaultValue && defaultValue.sex !== 0 ? defaultValue.sex : ''}
                    >
                        <Select>
                            <Select.Option value={1}>男</Select.Option>
                            <Select.Option value={2}>女</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="工作电话"
                        name={'workPhone'}
                        initialValue={defaultValue && defaultValue.workPhone}
                    >
                        <Input maxLength={30}/>
                    </Form.Item>
                    <Form.Item
                        label="工作邮箱"
                        name={'workEmail'}
                        initialValue={defaultValue && defaultValue.workEmail}
                        rules={[
                            formRegExp.email(),
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                </Form>
                <div
                    style={{
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        width: '100%',
                        borderTop: '1px solid #e9e9e9',
                        padding: '10px 16px',
                        background: '#fff',
                        textAlign: 'center',
                    }}
                >
                    <Button
                        onClick={(e) => {
                            if (JSON.stringify(this.state.defaultValue) === '{}' || this.state.defaultValue === undefined) {
                                this.newPeopleOk(e);
                            } else {
                                window.globalPermissions.checkPermission('COLLEAGUE_STAFF_EDIT', (res) => {
                                    if (res)
                                        return message.error('抱歉，您没有该操作权限，请联系管理员！');

                                    this.newPeopleOk(e);
                                });
                            }
                        }}
                        type="primary"
                        style={{width: 80, height: 32, marginRight: 8}}
                    >
                        保存
                    </Button>
                    {
                        (defaultValue && JSON.stringify(defaultValue) !== '{}') && (
                            <Popconfirm
                                title="确认删除该成员?"
                                onConfirm={() => {
                                    window.globalPermissions.checkPermission('COLLEAGUE_STAFF_DELETE', (res) => {
                                        if (res)
                                            return message.error('抱歉，您没有该操作权限，请联系管理员！');

                                        this.deletePeopleId([defaultValue]);
                                    });
                                }}
                                okText="确定"
                                cancelText="取消"
                            >
                                <Button
                                    type="danger"
                                    ghost
                                    style={{width: 80, height: 32, marginRight: 8}}
                                >
                                    删除
                                </Button>
                            </Popconfirm>
                        )
                    }
                    <Button
                        onClick={() => this.setState({newPeopleVisible: false})}
                        style={{width: 80, height: 32}}
                    >
                        取消
                    </Button>

                </div>
            </Drawer> : null
        )
    }
    selectDeptModal = () => {
        // 人员操作
        const peopleOperation = (value) => {
            this.formRef && this.formRef.current && this.formRef.current.setFieldsValue({
                deptIds: value,
            })
        }
        // 编辑部门
        const editDept = (value) => {
            this.setState({deptParentId: value[0] + ''})
        }
        return (
            this.state.selectDeptVisible && <ChooseDept
                clear={(fn) => this.chooseDeptClear = fn}
                deptId={'0'}
                visible={this.state.selectDeptVisible}
                onCancel={() => this.setState({selectDeptVisible: false})}
                selectDeptModal={this.state.selectDeptModal}
                multiple={this.state.chooseDeptType !== 1}
                callbackFn={(value) => {
                    switch (this.state.chooseDeptType) {
                        case 1:
                            editDept(value)
                            break
                        case 2:
                            peopleOperation(value)
                            break
                        default:
                            return
                    }
                }}
            />
        )
    }
    // ------ 渲染组件 end-------
}


export default EnterpriseArchitecture;
