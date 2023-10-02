import React, {Component} from 'react'
import Icon, {CloseCircleOutlined} from '@ant-design/icons';
import {Col, Modal, Row} from 'antd';
import cloneDeep from 'lodash/cloneDeep';
import DeptTree from './DeptTree'
import deptIcon from '../../../resource/dept.png'
import model from '../Model'


const deptIconDom = <img alt='' src={deptIcon} style={{width: 18, height: 18, marginTop: '-2px'}}/>;
let initValue = {
    treeSearchValue: '',
    data: [],
    loadedKeys: [],
    treeSelected: [],
    expandedKeys: [],
    getTreeDataCondition: {
        deptId: 0,
        current: 1,
        pageSize: 10
    },
    currentSelectDept: []
};
export default class ChooseDept extends Component {
    state = {
        selectDeptModal: cloneDeep(initValue)
    };

    componentDidMount() {
        this.selectDeptModalFn().getDeptStaffFn();
        this.props.clear(this.clear)
    }

    clear = () => {
        this.setState({
            selectDeptModal: cloneDeep(initValue)
        })
    };

    selectDeptModalFn = () => {
        const {selectDeptModal} = this.state;
        const enterpriseSearch = (current) => {
            model.communicationPage({
                keyWord: this.state.selectDeptModal.treeSearchValue,
                current: current,
                type: 2
            }, res => {
                this.setState({
                    selectDeptModal: Object.assign(selectDeptModal, {data: res.data.deptVO}),
                })
            })
        };
        const getDeptStaffFn = (deptId) => {
            const searchCondition = this.state.selectDeptModal.getTreeDataCondition;
            if (deptId !== undefined) searchCondition.deptId = deptId;
            if (this.props.deptId) searchCondition.deptId = this.props.deptId;
            // model.staffListall(searchCondition, res => {
            model.deptTreeList(searchCondition, res => {
                let expandedKeys = [];
                if (res.data) {
                    expandedKeys.push(res.data.deptId + '');
                    // res.data.children = res.data.subDepts;
                    // delete res.data.subDepts

                    // res.data.children = res.data.subDepartmentList;
                    //递归所有的subDepartmentList
                    const forSubData = (data) => {
                        return data.subDepartmentList ? data.subDepartmentList.map((item) => {
                            expandedKeys.push(item.deptId + '');
                            return {
                                key: item.deptId,
                                ...item,
                                children: forSubData(item),
                                subDepartmentList: [],
                            }
                        }) : []
                    }
                    res.data.children = res.data.subDepartmentList ? res.data.subDepartmentList.map((item) => {
                        expandedKeys.push(item.deptId + '');
                        return {
                            key: item.deptId,
                            ...item,
                            children: forSubData(item),
                            subDepartmentList: [],
                        }
                    }) : [];
                    // console.log(res.data.children, "-children-");
                    res.data.subDepartmentList = []
                }
                initValue = Object.assign(initValue, {
                    expandedKeys,
                    data: [res.data],
                    getTreeDataCondition: Object.assign(selectDeptModal.getTreeDataCondition, {deptId: res.data.deptId}),
                });
                this.setState({
                    selectDeptModal: Object.assign(selectDeptModal, {
                        expandedKeys,
                        data: [res.data],
                        getTreeDataCondition: Object.assign(selectDeptModal.getTreeDataCondition, {deptId: res.data.deptId}),
                    }),
                })
            })
        };
        const onLoadData = treeNode => {
            return new Promise(resolve => {
                model.staffListall({
                    deptId: treeNode.props.deptId,
                    current: 1,
                    pageSize: 10
                }, res => {
                    if (res.data) {
                        // res.data.children = res.data.subDepts;
                        res.data.children = res.data.subDepartmentList;
                        // delete res.data.subDepts
                        delete res.data.subDepartmentList
                    }
                    treeNode.props.dataRef.children = res.data.children;
                    this.setState({
                        selectDeptModal: Object.assign(selectDeptModal, {
                            data: [...this.state.selectDeptModal.data],
                            loadedKeys: selectDeptModal.loadedKeys.concat([res.data.deptId + ''])
                        })
                    });
                    resolve();
                })
            });
        };
        const onSelect = (selectedKeys, selectedNodes) => {
            if (this.props.multiple) {
                if (this.state.selectDeptModal.treeSelected.includes(selectedKeys[0])) {
                    this.setState({
                        selectDeptModal: Object.assign(selectDeptModal, {
                            treeSelected: selectDeptModal.treeSelected.filter(n => n !== selectedKeys[0]),
                            currentSelectDept: selectDeptModal.currentSelectDept.filter(n => n.key !== selectedKeys[0])
                        })
                    })
                } else {
                    this.setState({
                        selectDeptModal: Object.assign(selectDeptModal, {
                            treeSelected: selectDeptModal.treeSelected.concat(selectedKeys),
                            currentSelectDept: selectDeptModal.currentSelectDept.concat({
                                key: selectedNodes.node.props.deptId + '',
                                value: selectedNodes.node.props.deptName || selectedNodes.node.props.depName
                            })
                        })
                    })
                }
            } else {
                this.setState({
                    selectDeptModal: Object.assign(selectDeptModal, {
                        treeSelected: selectedKeys,
                        currentSelectDept: [{
                            key: selectedNodes.node.props.deptId + '',
                            value: selectedNodes.node.props.deptName || selectedNodes.node.props.depName
                        }]
                    })
                })
            }
        };
        const onExpand = (expandedKeys, {expanded, node}) => {
            if (expanded === false) {
                expandedKeys = expandedKeys.filter(n => n + '' !== node.props.deptId + '')
            }
            this.setState({
                selectDeptModal: Object.assign(selectDeptModal, {
                    expandedKeys
                })
            });
            if (expanded === true) {
                onLoadData(node)
            }
        };
        const treeSelectItemClose = (key) => {
            this.setState({
                selectDeptModal: Object.assign(selectDeptModal, {
                    treeSelected: selectDeptModal.treeSelected.filter(n => n !== key),
                    currentSelectDept: selectDeptModal.currentSelectDept.filter(n => n.key !== key)
                })
            })
        };
        return {
            enterpriseSearch, getDeptStaffFn, onLoadData, onSelect, onExpand, treeSelectItemClose
        }
    };

    static getDerivedStateFromProps(props, state) {
        if (props.selectDeptModal !== undefined && state.selectDeptModal.treeSelected.length === 0) {
            return {
                selectDeptModal: {
                    ...state.selectDeptModal,
                    ...props.selectDeptModal
                }
            }
        }
        return state
    }

    render() {
        const {visible, onCancel, callbackFn, multiple = false, isParentSelect = true} = this.props;
        const {selectDeptModal} = this.state;
        return (
            <Modal
                width={800}
                className='sw-modal'
                title={'选择部门'}
                centered={true}
                visible={visible}
                onCancel={onCancel}
                zIndex={9999}
                onOk={() => {
                    const arr = [];
                    selectDeptModal.currentSelectDept.forEach(item => {
                        arr.push(parseInt(item.key))
                    });
                    this.props.onCancel();
                    callbackFn(arr)
                }}
            >
                <Row gutter={12}>
                    <Col span={12}>
                        <h3>选择: </h3>
                        <div style={{background: '#FAFAFA', padding: '9px 8px', height: '330px', overflow: "scroll"}}>
                            <DeptTree
                                isParentSelect={isParentSelect}
                                active={0}
                                multiple={multiple}
                                searchChange={(e) => {
                                    this.setState({
                                        selectDeptModal: Object.assign(selectDeptModal, {treeSearchValue: e.target.value})
                                    })
                                }}
                                searchKeyDown={(e) => {
                                    if (e.keyCode === 13) {
                                        if (selectDeptModal.treeSearchValue.length > 0) {
                                            this.selectDeptModalFn().enterpriseSearch(1)
                                        } else {
                                            this.selectDeptModalFn().getDeptStaffFn(0, 1)
                                        }
                                    }
                                }}
                                style={{
                                    treeMT: {marginTop: 0},
                                    searchInputPadding: {padding: '24px 0px 5px 0px'}
                                }}
                                treeLoadData={this.selectDeptModalFn().onLoadData}
                                treeOnSelect={this.selectDeptModalFn().onSelect}
                                treeOnExpand={this.selectDeptModalFn().onExpand}
                                searchValue={selectDeptModal.treeSearchValue}
                                treeData={selectDeptModal.data}
                                treeLoadedKeys={selectDeptModal.loadedKeys}
                                treeSelectKey={selectDeptModal.treeSelected}
                                treeExpandedKeys={selectDeptModal.expandedKeys}
                                field={
                                    {key: 'deptId', label: 'deptName', searchLabel: 'depName'}
                                }
                            />
                        </div>
                    </Col>
                    <Col span={12}>
                        <h3>已选: </h3>
                        <div style={{background: '#FAFAFA', padding: '9px 8px', height: '330px', overflow: "scroll"}}>
                            {
                                selectDeptModal.currentSelectDept && selectDeptModal.currentSelectDept.map(item => (
                                    <div key={item.key} className={'folder-item text-elli1'}>
                                        <Icon className={'folder-item-icon'} component={() => deptIconDom}/>
                                        <span title={item.value}>{item.value}</span>
                                        <span className='close-icon'>
                                            <CloseCircleOutlined
                                                onClick={() => {
                                                    this.selectDeptModalFn().treeSelectItemClose(item.key)
                                                }}
                                                style={{fontSize: 16, color: '#959AA0'}}/>
                                        </span>
                                    </div>
                                ))
                            }
                        </div>
                    </Col>
                </Row>
            </Modal>
        );
    }
}
