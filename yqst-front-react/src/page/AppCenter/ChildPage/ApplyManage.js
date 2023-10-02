import React, {Component} from 'react';
import cloneDeep from 'lodash/cloneDeep';
import findIndex from 'lodash/findIndex';
import { Row, Col, Dropdown, Button, message, Modal, Input } from 'antd';
import {remove, down, sort, del} from '../../../resource';
import model from '../model'
import IsPower from '../../Power/IsPower';
import {LeftOutlined} from "@ant-design/icons";


class ApplyIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAdmin: localStorage.getItem('admin') || false,
            isSet: false,
            softList: [],
            copySoftList: [],
            editNameVisible: false,
            currentEditItem: {},
            allAppList: [],
            chooseAppList: [],
            dragElement: null,
        };
    }

    componentDidMount() {
        this.getList()
        document.addEventListener('dragover', this.preventDefault);
        document.addEventListener('drop', this.preventDefault);
    }

    componentWillUnmount() {
        document.removeEventListener('dragover', this.preventDefault);
        document.removeEventListener('drop', this.preventDefault);
    }

    preventDefault(e) {
        e.preventDefault();
    }

    getList = () => {
        model.softGroupUserSoftList({}, res => {
            const arr = []
            const noShowArr = []

            this.setState({
                softList: res.data,
                copySoftList: cloneDeep(res.data),
                allAppList: noShowArr
            })
        })

    };

    changeSoft = (item) => {
        const {softList} = this.state;
        softList.forEach((n, nIndex) => {
            if (n.softVOList.length !== 0) {
                n.softVOList.forEach((cn, cnIndex) => {
                    if (cn.softId === item.softId) {
                        softList[softList.length - 1].softVOList.push(cn)
                        n.softVOList.splice(cnIndex, 1)
                    }
                })
            }
        })
        this.setState({softList})
    }


    saveSoft = () => {
        const {setItem} = this.state;
        setItem.softList = setItem.softVOList;
        model.softGroupUserSoftSave({
            groupSaveMessage: JSON.stringify(this.state.setItem)
        }, res => {
            message.success('保存成功');
            this.getList()
        })
    }

    editName = (n) => {
        this.setState({
            editNameVisible: true,
            currentEditItem: cloneDeep(n)
        })
    }

    deleteGroup = (n) => {
        Modal.confirm({
            title: '确认删除该分组?',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
                model.softGroupUserDelete({groupId: n.groupId}, res => {
                    message.success('分组删除成功')
                    this.setState({isSet: false})
                    this.getList()
                })
            },
        });

    }

    editNameModal = () => {
        return (
            <Modal
                className='sw-modal'
                title='修改分组名称'
                visible={this.state.editNameVisible}
                onCancel={() => this.setState({editNameVisible: false})}
                onOk={() => {
                    if (this.state.currentEditItem === undefined || this.state.currentEditItem === '') {
                        message.error('分组名称为必填项')
                        return;
                    }
                    if (this.state.currentEditItem.groupName === undefined || this.state.currentEditItem.groupName === '') {
                        message.error('分组名称为必填项')
                        return;
                    }
                    model.softGroupUserSoftSave({groupSaveMessage: JSON.stringify(this.state.currentEditItem)}, res => {
                        message.success('修改成功')
                        this.setState({currentEditItem: {}, editNameVisible: false, isSet: false})
                        this.getList()
                    })
                }}
            >
                <label>分组名称:</label> <Input maxLength={50} onChange={(e) => {
                this.setState({currentEditItem: Object.assign(this.state.currentEditItem, {groupName: e.target.value})})
            }} value={this.state.currentEditItem.groupName} style={{marginTop: 8}}/>
            </Modal>
        )
    }

    makeMod = () => {
        let {visible, allAppList, chooseAppList, dragElement, addItem} = this.state;

        return <Modal
            afterClose={() => {
                this.setState({
                    groupName: '',
                    activeItem: undefined,
                    addItem: false,
                    chooseAppList: []
                })
            }}
            className={'sw-modal'}
            title={addItem ? '添加应用' : '新建分组'}
            visible={visible}
            onOk={() => {
                let {groupName, activeItem, addItem, chooseAppList} = this.state;
                if (addItem) {
                    chooseAppList = chooseAppList.concat(activeItem.softVOList)
                }
                const groupSaveMessage = {
                    groupId: activeItem ? activeItem.groupId : 0,
                    groupName,
                    softList: chooseAppList,
                    softVOList: chooseAppList
                }
                if (groupName === undefined || groupName === '') {
                    message.error('请输入分组名称')
                    return
                }
                model.softGroupUserSoftSave({groupSaveMessage: JSON.stringify(groupSaveMessage)}, res => {
                    message.success(addItem ? '添加应用成功' : '新建分组成功');
                    this.setState({
                        chooseAppList: [],
                        groupName: undefined,
                        visible: false,
                        isSet: false
                    })
                    this.getList()
                })
            }}
            onCancel={() => {
                this.setState({visible: false});
            }}
            width={546}
        >
            <Row>
                <Col span={12}>
                    <div
                        style={{
                            color: 'rgba(43,52,65,0.65)',
                            marginBottom: '16px',
                            fontSize: '12px'
                        }}
                    >
                        未分组应用
                    </div>
                    <ul
                        style={{
                            height: '300px',
                            overflowY: 'auto',
                            margin: '0px'
                        }}
                    >
                        {
                            allAppList && allAppList.map((item, idx) => {
                                return <li
                                    onClick={() => {
                                        const {chooseAppList} = this.state;
                                        let add = true;
                                        let removeIndex = 0
                                        chooseAppList.forEach((n, cindex) => {
                                            if (n.softId === item.softId) {
                                                add = false
                                                removeIndex = cindex
                                            }
                                        })
                                        if (add) {
                                            chooseAppList.push(item)
                                        } else {
                                            chooseAppList.splice(removeIndex, 1)
                                        }
                                        chooseAppList.forEach((n, nIndex) => {
                                            n.index = nIndex + 1
                                        })
                                        this.setState({chooseAppList})
                                    }}
                                    key={'list_' + idx}
                                    style={{
                                        padding: '8px 12px',
                                        cursor: 'pointer',
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                        background: (() => {
                                            let color = '#fff'
                                            chooseAppList.forEach(n => {
                                                if (n.softId === item.softId) {
                                                    color = 'rgba(68, 129, 235, 0.1)'
                                                }
                                            })
                                            return color
                                        })()
                                    }}
                                >
                                    <img src={item.logo} alt=""
                                         style={{
                                             width: '20px',
                                             height: '20px',
                                             borderRadius: '2px',
                                             marginRight: '8px'
                                         }}
                                    />
                                    {item.name}
                                </li>
                            })
                        }
                    </ul>
                </Col>
                <Col span={12}
                     style={{
                         paddingLeft: '12px',
                     }}
                >
                    <div
                        style={{
                            color: 'rgba(43,52,65,0.65)',
                            marginBottom: '8px',
                            fontSize: '12px'
                        }}
                    >
                        分组名称
                    </div>
                    <Input
                        value={this.state.groupName}
                        style={{fontSize: '14px'}}
                        disabled={!!addItem}
                        maxLength={50}
                        placeholder="请输入分组名称"
                        onChange={(e) => {
                            this.setState({groupName: e.target.value})
                        }}
                    />
                    <div
                        style={{
                            color: 'rgba(43,52,65,0.65)',
                            margin: '16px 0',
                            fontSize: '12px'
                        }}
                    >
                        已选应用
                    </div>
                    <ul
                        style={{
                            margin: '0px',
                            height: '225px',
                            overflowY: 'auto'
                        }}
                    >
                        {
                            chooseAppList && chooseAppList.map((item, idx) => {
                                return <li
                                    key={'cList_' + idx}
                                    style={{
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                        // backgroundColor: item.isOnDown ? '#EDF6FF' : '',
                                        border: item.isOnDown ? '2px dotted #4481eb' : '2px dotted transparent',
                                        position: 'relative',
                                        paddingRight: '30px',
                                        paddingTop: 8,
                                        paddingBottom: 8,
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                >
                                    <img src={sort} alt="" title={'拖拽排序'}
                                         style={{
                                             width: '16px',
                                             height: '16px',
                                             borderRadius: '2px',
                                             marginRight: '8px',
                                             marginLeft: 8,
                                             cursor: 'all-scroll',
                                         }}
                                         onDragStart={() => {
                                             this.setState({
                                                 dragElement: item,
                                             });
                                         }}
                                         onDragEnd={(e) => {
                                             e.preventDefault();
                                             chooseAppList = chooseAppList.map((cItem, cIdx) => {
                                                 return {
                                                     ...cItem,
                                                     isOnDown: false
                                                 }
                                             });
                                             this.setState({chooseAppList});
                                         }}
                                         onDragEnter={() => {
                                             if ('' + item.index !== '' + dragElement.index) {
                                                 const oldDragIndex = findIndex(chooseAppList, cItem => '' + cItem.index === '' + dragElement.index);
                                                 const oldEnterIndex = findIndex(chooseAppList, cItem => '' + cItem.index === '' + item.index);
                                                 if (oldDragIndex > oldEnterIndex) {
                                                     const newDataArray = chooseAppList.filter(cItem => '' + cItem.index !== '' + dragElement.index);
                                                     const insertIndex = findIndex(newDataArray, cItem => '' + cItem.index === '' + item.index);
                                                     newDataArray.splice(insertIndex, 0, dragElement);
                                                     this.setState({chooseAppList: newDataArray});

                                                 } else {
                                                     const newDataArray = chooseAppList.filter(cItem => '' + cItem.index !== '' + dragElement.index);
                                                     const insertIndex = findIndex(newDataArray, cItem => '' + cItem.index === '' + item.index) + 1;
                                                     newDataArray.splice(insertIndex, 0, this.state.dragElement);
                                                     this.setState({chooseAppList: newDataArray});

                                                 }
                                                 this.setState({
                                                     isConfigDirty: true,
                                                 });
                                             }
                                         }}
                                         onDragLeave={() => {
                                             if ('' + item.index !== '' + dragElement.index) {
                                                 if (this.state.lock && item.index === chooseAppList[chooseAppList.length - 1]) {
                                                     const newDataArray = chooseAppList.filter(cItem => '' + cItem.index !== '' + dragElement.index);
                                                     newDataArray.push(dragElement);
                                                     this.setState({
                                                         lock: false,
                                                     }, () => {
                                                         this.setState({
                                                             chooseAppList: newDataArray,
                                                         });
                                                     });
                                                 } else {
                                                     this.setState({
                                                         lock: true,
                                                     });
                                                 }
                                             }
                                         }}
                                         onMouseDown={() => {
                                             chooseAppList = chooseAppList.map((cItem, cIdx) => {
                                                 return {
                                                     ...cItem,
                                                     isOnDown: idx === cIdx
                                                 }
                                             });
                                             this.setState({chooseAppList});
                                         }}
                                         onMouseUp={() => {
                                             chooseAppList = chooseAppList.map((cItem, cIdx) => {
                                                 return {
                                                     ...cItem,
                                                     isOnDown: false
                                                 }
                                             });
                                             this.setState({chooseAppList});
                                         }}
                                    />
                                    <img src={item.logo} alt=""
                                         style={{
                                             width: '20px',
                                             height: '20px',
                                             borderRadius: '2px',
                                             marginRight: '8px'
                                         }}
                                    />
                                    <span
                                        title={item.name}
                                    >{item.name}</span>
                                    <img
                                        onClick={() => {
                                            const {chooseAppList} = this.state;
                                            chooseAppList.forEach((n, nIndex) => {
                                                if (n.softId === item.softId) {
                                                    chooseAppList.splice(nIndex, 1)
                                                    this.setState({chooseAppList: chooseAppList})
                                                }
                                            })
                                        }}
                                        src={del}
                                        alt=""
                                        style={{
                                            width: '20px',
                                            height: '20px',
                                            cursor: 'pointer',
                                            marginRight: '10px',
                                            position: 'absolute',
                                            right: '0',
                                        }}
                                    />
                                </li>
                            })
                        }
                    </ul>
                </Col>
            </Row>
        </Modal>
    }

    addItem = (n) => {
        model.softGroupUserSoftNotList({
            current: 1, pageSize: 10000
        }, res => {
            this.setState({
                allAppList: res.data.records,
                visible: true,
                addItem: true,
                activeItem: n,
                groupName: n.groupName
            })
        })
    }

    render() {
        let {list, isSet, isAdmin, setIndex} = this.state;
        return (
            <div
                className={'applyIndex'}
                style={{
                    width: '1116px',
                    minHeight: '648px',
                    background: '#fff',
                    borderRadius: '6px',
                    margin: '24px auto',
                    padding: '0 138px',
                    fontSize: '14px',
                    position: 'relative'
                }}
            >
                {this.editNameModal()}
                {this.makeMod()}
                <Button
                    className={'Button_leftIcon'}
                    icon={<LeftOutlined/>}
                    style={{
                        position: 'absolute',
                        left: '24px',
                        top: '25px',
                    }}
                    onClick={() => {
                        this.props.history.push('/pages/appCenter/applyIndex');
                    }}
                >返回</Button>
                <IsPower
                    key={'SOFT_MANAGE_ENTER'}
                    permissionsName={'SOFT_MANAGE_ENTER'}
                    style={{paddingTop: '240px'}}
                >
                    <h1
                        style={{
                            fontSize: '20px',
                            lineHeight: '28px',
                            padding: '24px 0',
                            borderBottom: '1px solid rgba(43,52,65,0.25)',
                            margin: '0px',
                        }}
                    >
                        应用管理
                        <a
                            style={{
                                fontWeight: '400',
                                float: 'right',
                                fontSize: '14px',
                            }}
                            onClick={() => {
                                window.globalPermissions.checkPermission('SOFT_GROUP_ADD', (res) => {
                                    if(res)
                                        return message.error('抱歉，您没有该操作权限，请联系管理员！');

                                    model.softGroupUserSoftNotList({
                                        current: 1, pageSize: 10000
                                    }, res => {
                                        this.setState({
                                            allAppList: res.data.records,
                                            visible: true
                                        })
                                    })
                                });
                            }}
                        >
                            新建分组
                        </a>
                        <a
                            style={{
                                fontWeight: '400',
                                float: 'right',
                                fontSize: '14px',
                                marginRight: 12
                            }}
                            onClick={() => {
                                this.props.history.push(`/pages/appCenter/ApplyVisible`);
                            }}
                        >
                            应用可见性设置
                        </a>
                    </h1>
                    <div style={{
                        paddingBottom: 20
                    }}>
                        {
                            this.state.softList && this.state.softList.map((n, index) => (
                                <div key={n.groupName + index}>
                                    <div
                                        style={{
                                            color: 'rgba(43,52,65,0.65)',
                                            margin: '16px 0'
                                        }}
                                    >{n.groupName}
                                        {
                                            isSet && n.groupId !== 0 && setIndex === index ?
                                                <a
                                                    style={{marginLeft: 12}}
                                                    onClick={() => {
                                                        window.globalPermissions.checkPermission('SOFT_GROUP_EDIT', (res) => {
                                                            if(res)
                                                                return message.error('抱歉，您没有该操作权限，请联系管理员！');
                                                            this.editName(n)
                                                        });
                                                    }}
                                                >
                                                    修改名称
                                                </a> : null
                                        }
                                        {
                                            isSet && n.groupId !== 0 && setIndex === index ?
                                                <a
                                                    style={{marginLeft: 12}}
                                                    onClick={() => {
                                                        window.globalPermissions.checkPermission('SOFT_GROUP_DEL', (res) => {
                                                            if(res)
                                                                return message.error('抱歉，您没有该操作权限，请联系管理员！');
                                                            this.deleteGroup(n);
                                                        });
                                                    }}
                                                >
                                                    删除分组
                                                </a> : null
                                        }
                                        {
                                            isSet && n.groupId !== 0 && setIndex === index ?
                                                <a
                                                    style={{marginLeft: 12}}
                                                    onClick={() => {
                                                        window.globalPermissions.checkPermission('SOFT_GROUP_EDIT', (res) => {
                                                            if(res)
                                                                return message.error('抱歉，您没有该操作权限，请联系管理员！');
                                                            this.addItem(n);
                                                        });
                                                    }}
                                                >
                                                    添加应用
                                                </a> : null
                                        }

                                        {
                                            isSet && setIndex === index ?
                                                <a
                                                    style={{
                                                        fontWeight: '400',
                                                        float: 'right',
                                                        fontSize: '14px',
                                                        marginLeft: 12
                                                    }}
                                                    onClick={() => this.setState({
                                                        isSet: false,
                                                        softList: this.state.copySoftList,
                                                        copySoftList: undefined
                                                    })}
                                                >
                                                    取消
                                                </a> : null
                                        }
                                        {
                                            n.groupId !== 0 && <a
                                                style={{
                                                    fontWeight: '400',
                                                    float: 'right',
                                                    fontSize: '14px',
                                                    color: (() => {
                                                        if (isSet === false) return '#4481EB'
                                                        if (isSet === true && setIndex !== index) {
                                                            return '#ccc'
                                                        } else {
                                                            return '#4481EB'
                                                        }
                                                    })()
                                                }}
                                                onClick={() => {
                                                    const onBtn = () => {
                                                        if (isSet === true && setIndex !== index) return
                                                        if (isSet === true && setIndex === index) {
                                                            this.saveSoft()
                                                        }
                                                        this.setState({
                                                            isSet: !isSet,
                                                            setIndex: index,
                                                            setItem: n,
                                                            copySoftList: cloneDeep(this.state.softList)
                                                        });
                                                    };
                                                    if(isSet && setIndex === index){
                                                        window.globalPermissions.checkPermission('SOFT_GROUP_EDIT', (res) => {
                                                            if(res)
                                                                return message.error('抱歉，您没有该操作权限，请联系管理员！');
                                                            onBtn();
                                                        });

                                                    }else{
                                                        window.globalPermissions.checkPermission('SOFT_GROUP_ENTER', (res) => {
                                                            if(res)
                                                                return message.error('抱歉，您没有该操作权限，请联系管理员！');

                                                            onBtn();
                                                        });

                                                    }

                                                }}
                                            >
                                                {isSet && setIndex === index ? '保存' : '设置'}
                                            </a>
                                        }
                                    </div>
                                    <div>
                                        {
                                            n.softVOList && n.softVOList.map((item, idx) => {
                                                return <div
                                                    className={'applyS'}
                                                    key={'use_' + idx}
                                                    style={{
                                                        display: 'inline-block',
                                                        width: '192px',
                                                        height: '64px',
                                                        padding: '12px',
                                                        borderRadius: '6px',
                                                        border: '1px solid rgba(43,52,65,0.25)',
                                                        marginBottom: '24px',
                                                        marginRight: (idx === 0 || ++idx % 4 !== 0) ? '24px' : '0px',
                                                        position: 'relative',
                                                    }}
                                                >
                                                    <img src={item.logo} alt=""
                                                         style={{
                                                             width: '40px',
                                                             marginRight: '12px',
                                                         }}
                                                    />
                                                    <span
                                                        style={{
                                                            overflow: 'hidden',
                                                            whiteSpace: 'nowrap',
                                                            textOverflow: 'ellipsis',
                                                            display: 'inline-block',
                                                            width: '110px',
                                                            verticalAlign: 'middle',
                                                        }}
                                                    >
                                    {item.name}
                                </span>
                                                    {
                                                        isSet && this.state.setIndex === index ? <img src={remove}
                                                                                                      onClick={() => {
                                                                                                          this.changeSoft(item)
                                                                                                      }}
                                                                                                      alt=""
                                                                                                      style={{
                                                                                                          position: 'absolute',
                                                                                                          width: '18px',
                                                                                                          top: '-9px',
                                                                                                          right: '-9px',
                                                                                                          cursor: 'pointer',
                                                                                                      }}
                                                        /> : null
                                                    }

                                                    {
                                                        isAdmin && !isSet ? <Dropdown
                                                            placement="bottomRight"
                                                            overlay={<div>
                                                                <Button
                                                                    style={{
                                                                        width: '48px',
                                                                        height: '22px',
                                                                        boxShadow: '0px 0px 4px 0px rgba(43,52,65,0.15)',
                                                                    }}
                                                                    onClick={() => {
                                                                        window.globalPermissions.checkPermission('SOFT_MANAGE_INFO', (res) => {
                                                                            if(res)
                                                                                return message.error('抱歉，您没有该操作权限，请联系管理员！');

                                                                            this.props.history.push(`/pages/appCenter/applySetUp?serviceTag=${item.serviceTag}&entrance=applyManage`);
                                                                        });
                                                                    }}
                                                                >设置</Button>
                                                            </div>}
                                                        >
                                                            <img src={down} alt=""
                                                                 style={{
                                                                     position: 'absolute',
                                                                     width: '14px',
                                                                     height: '14px',
                                                                     right: '8px',
                                                                     top: '8px',
                                                                     cursor: 'pointer',
                                                                 }}
                                                            />
                                                        </Dropdown> : null
                                                    }
                                                </div>
                                            })
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </IsPower>
            </div>
        );
    }
}

export default ApplyIndex;
