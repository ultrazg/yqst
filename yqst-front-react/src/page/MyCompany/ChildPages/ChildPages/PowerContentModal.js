import React, {Component} from 'react';

import {
    Input,
    Button,
    Row,
    Col,
    message,
    Modal,
    Collapse,
    Popconfirm,
    Switch,
} from 'antd';
import {leftArr, none} from '../../../../resource'
import Model from '../../Model'
import cloneDeep from 'lodash/cloneDeep';

const {Panel} = Collapse;

class PowerContentModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            openAllChecked: false,
            setChoosePower: {},
            onClickType: '基础',
        };
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        let {data, callBack} = this.props;
        let {chePowMenu, chePowInfo, updatedMenu, updatedInfo} = data;
        const opentPower = (list = []) => {
            let num = 0;
            list.forEach(item => {
                item.resourceVOS && item.resourceVOS.forEach(cItem => {
                    if ('1' === '' + cItem.isSelect || '1' === '' + cItem.isDefault)
                        num += 1;
                });
            });
            return num
        };

        return (
            <div
                style={{
                    padding: '30px 32px'
                }}
            >
                {
                    chePowMenu.id ? <div>
                        <h1
                            style={{fontSize: '20px', color: '#2B3441', lineHeight: '28px', marginBottom: '4px'}}
                        >{chePowMenu.groupName || ''}
                            <div
                                style={{float: 'right', fontWeight: '100'}}
                            >
                                <a
                                    onClick={() => {
                                        window.globalPermissions.checkPermission('ERP_AUTHORITY_EDIT', (res) => {
                                            if (res)
                                                return message.error('抱歉，您没有权限编辑，请联系管理员！');

                                            callBack && callBack({
                                                chePowMenu,
                                                chePowInfo,
                                                updatedMenu,
                                                updatedInfo,
                                                isEdit: true
                                            });
                                        });
                                    }}
                                >编辑</a>
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
                                {/*<a>复制并新建</a>
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
                        />*/}
                                <Popconfirm placement="bottomRight" title={'确定要删除该权限组吗？'} okText="确定" cancelText="取消"
                                            onConfirm={() => {
                                                window.globalPermissions.checkPermission('ERP_AUTH_DELETE', (res) => {
                                                    if (res)
                                                        return message.error('抱歉，您没有权限删除，请联系管理员！');

                                                    Model.MyCompanyGDelete({
                                                        id: chePowInfo.groupId
                                                    }, (res) => {
                                                        message.success('删除成功！');
                                                        callBack && callBack({
                                                            chePowMenu,
                                                            chePowInfo,
                                                            updatedInfo,
                                                            updatedMenu: true
                                                        });
                                                    }, (err) => {
                                                    });
                                                });
                                            }}
                                >
                                    <a style={{color: '#F12C20'}}>删除</a>
                                </Popconfirm>
                            </div>
                        </h1>
                        <div
                            style={{
                                fontSize: '12px',
                                color: 'rgba(43,52,65,0.65)',
                                width: '532px',
                                marginBottom: '16px'
                            }}
                        >
                            {chePowMenu.groupDesc || ''}
                        </div>
                        <Row
                            style={{marginBottom: '26px'}}
                        >
                            <Col span={8}>
                                指定类型：{this.assignType(chePowInfo.assignType)}
                            </Col>
                            {this.assignView(chePowInfo)}
                        </Row>
                        <Collapse
                            className={'Collapse'}
                            expandIconPosition={'right'}
                            defaultActiveKey={['1', '2']}
                            onChange={() => {
                            }}
                        >
                            <Panel header="基础功能权限" key="1">
                                <ul
                                    className={'comtents_ul'}
                                    style={{
                                        marginBottom: '24px'
                                    }}
                                >
                                    {
                                        chePowInfo.basicVOS && chePowInfo.basicVOS.map((item, idx) => {
                                            return <li
                                                key={'com_' + idx}
                                                style={{
                                                    padding: '0 16px',
                                                    height: '48px',
                                                    lineHeight: '48px',
                                                    borderBottom: '1px solid rgba(43,52,65,0.09)',
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => {
                                                    window.globalPermissions.checkPermission('ERP_AUTHORITY_VIEW', (res) => {
                                                        if (res)
                                                            return message.error('抱歉，您没有权限查看，请联系管理员！');

                                                        item.moduleVOS && item.moduleVOS.forEach(cItem => {
                                                            cItem.resourceVOS && cItem.resourceVOS.forEach(cCItem => {
                                                                cCItem.isShow = true;
                                                            });
                                                        });
                                                        this.setState({
                                                            setChoosePower: cloneDeep(item),
                                                            visible: true,
                                                            onClickType: '基础',
                                                            openAllChecked: this.allChecked(item.moduleVOS)
                                                        });
                                                    });
                                                }}
                                            >
                                                <Row>
                                                    <Col span={18}>
                                                        {item.topName}
                                                    </Col>
                                                    <Col span={6}
                                                         style={{textAlign: 'right'}}
                                                    >
                                                        已选 {opentPower(item.moduleVOS)} 项
                                                        <img src={leftArr} alt=""
                                                             style={{
                                                                 width: '9px',
                                                                 height: '10px',
                                                                 marginLeft: '10px',
                                                             }}
                                                        />
                                                    </Col>
                                                </Row>
                                            </li>
                                        })
                                    }
                                    {
                                        !chePowInfo.basicVOS || chePowInfo.basicVOS.length <= 0 ? <div
                                            style={{
                                                textAlign: 'center',
                                                lineHeight: '52px',
                                                fontSize: '16px',
                                                color: '#999',
                                            }}
                                        >
                                            暂无基础功能
                                        </div> : null
                                    }
                                </ul>
                            </Panel>

                            <Panel header="应用功能权限" key="2">
                                <ul
                                    className={'comtents_ul'}
                                    style={{
                                        marginBottom: '24px'
                                    }}
                                >
                                    {
                                        chePowInfo.softVOS && chePowInfo.softVOS.map((item, idx) => {
                                            return <li
                                                key={'com_' + idx}
                                                style={{
                                                    padding: '0 16px',
                                                    height: '48px',
                                                    lineHeight: '48px',
                                                    borderBottom: '1px solid rgba(43,52,65,0.09)',
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => {
                                                    window.globalPermissions.checkPermission('ERP_AUTHORITY_VIEW', (res) => {
                                                        if (res)
                                                            return message.error('抱歉，您没有权限查看，请联系管理员！');

                                                        item.moduleVOS && item.moduleVOS.forEach(cItem => {
                                                            cItem.resourceVOS && cItem.resourceVOS.forEach(cCItem => {
                                                                cCItem.isShow = true;
                                                            });
                                                        });
                                                        this.setState({
                                                            setChoosePower: cloneDeep(item),
                                                            visible: true,
                                                            onClickType: '应用',
                                                            openAllChecked: this.allChecked(item.moduleVOS)
                                                        });
                                                    });
                                                }}
                                            >
                                                <Row>
                                                    <Col span={18}>
                                                        {item.softName}
                                                    </Col>
                                                    <Col span={6}
                                                         style={{textAlign: 'right'}}
                                                    >
                                                        已选 {opentPower(item.moduleVOS)} 项
                                                        <img src={leftArr} alt=""
                                                             style={{
                                                                 width: '9px',
                                                                 height: '10px',
                                                                 marginLeft: '10px',
                                                             }}
                                                        />
                                                    </Col>
                                                </Row>
                                            </li>
                                        })
                                    }
                                    {
                                        !chePowInfo.softVOS || chePowInfo.softVOS.length <= 0 ? <div
                                            style={{
                                                textAlign: 'center',
                                                lineHeight: '52px',
                                                fontSize: '16px',
                                                color: '#999',
                                            }}
                                        >
                                            暂无应用功能
                                        </div> : null
                                    }
                                </ul>
                            </Panel>
                        </Collapse>
                    </div> : <div
                        style={{textAlign: 'center'}}
                    >
                        <img src={none} alt=""
                             style={{width: '500px', marginTop: '50px'}}
                        />
                        <div style={{marginTop: '25px', color: '#999'}}>请先添加权限组...</div>
                    </div>
                }

                {this.makeModal()}
            </div>
        );
    }

    assignType(type) {
        let res = '';
        switch (type + '') {
            case '1':
                return res = '指定企业架构';

            case '2':
                return res = '指定角色';

            case '3':
                return res = '指定员工';

            default:
                return res;

        }
    }

    assignView(data) {
        let html = [];
        switch (data.assignType + '') {
            case '1':
                html.push(
                    <Col span={8} key={'a'}>
                        部门：{this.setName(data.deptVOS, 'departmentName')}
                    </Col>
                );
                html.push(
                    <Col span={8} key={'b'}>
                        职务：{this.setName(data.jobVOS, 'jobName')}
                    </Col>
                );
                return html;

            case '2':
                html.push(
                    <Col span={8} key={'c'}>
                        角色：{this.setName(data.roleVOS, 'roleName')}
                    </Col>
                );
                return html;

            case '3':
                html.push(
                    <Col span={8} key={'d'}>
                        员工：{this.setName(data.staffVOS, 'staffName')}
                    </Col>
                );
                return html;

            default:
                return html;

        }
    }

    setName(list = [], fieType = 'name', joinStr = '; ') {
        return (list.map(item => {
            return item[fieType];
        })).join(joinStr);
    }

    allChecked(list = []) {
        let res = true;
        list.forEach(item => {
            item.resourceVOS && item.resourceVOS.forEach(cItem => {
                if ('0' === '' + cItem.isSelect && '0' === '' + cItem.isDefault)
                    res = false;
            });
        });
        return res;
    }

    makeModal() {
        let {setChoosePower, visible, onClickType, openAllChecked} = this.state;
        let {data, callBack} = this.props;
        let {chePowMenu, chePowInfo, updatedMenu, updatedInfo} = data;
        const isShow = () => {
            let res = true;
            setChoosePower.moduleVOS && setChoosePower.moduleVOS.forEach(item => {
                item.resourceVOS && item.resourceVOS.forEach(cItem => {
                    if (!cItem.isShow) {
                        res = false;
                    }
                });
            });

            return res;
        };
        const isShowNoneImg = () => {
            let res = false;
            setChoosePower.moduleVOS && setChoosePower.moduleVOS.forEach(item => {
                item.resourceVOS && item.resourceVOS.forEach(cItem => {
                    if (cItem.isShow) {
                        res = true;
                    }
                });
            });

            return res;
        };

        return <Modal
            closable={false}
            className={'Modal'}
            width={546}
            title={onClickType === '基础' ? (setChoosePower.topName || '权限设置') : (setChoosePower.softName || '权限设置')}
            visible={visible}
            onOk={() => {
            }}
            onCancel={() => {
                this.setState({visible: false});
            }}
            bodyStyle={{
                padding: '16px 0'
            }}
            footer={
                <div>
                    <Button type="primary"
                            style={{
                                width: '64px',
                                height: '36px',
                                fontSize: '16px',
                                marginRight: '16px'
                            }}
                            onClick={() => {
                                window.globalPermissions.checkPermission('ERP_AUTHORITY_EDIT', (res) => {
                                    if (res)
                                        return message.error('抱歉，您没有该操作权限，请联系管理员！');

                                    let newResIds = [];
                                    setChoosePower.moduleVOS && setChoosePower.moduleVOS.forEach(item => {
                                        item.resourceVOS && item.resourceVOS.forEach(cItem => {
                                            if ('1' === '' + cItem.isSelect || '1' === '' + cItem.isDefault)
                                                newResIds.push({
                                                    resId: cItem.resId
                                                });
                                        });
                                    });
                                    chePowInfo.basicVOS && chePowInfo.basicVOS.forEach(item => {
                                        if ('' + item.topId !== '' + setChoosePower.topId) {
                                            item.moduleVOS && item.moduleVOS.forEach(cItem => {
                                                cItem.resourceVOS && cItem.resourceVOS.forEach(cCItem => {
                                                    if ('1' === '' + cCItem.isSelect || '1' === '' + cCItem.isDefault)
                                                        newResIds.push({
                                                            resId: cCItem.resId
                                                        });
                                                });
                                            });
                                        }
                                    });
                                    chePowInfo.softVOS && chePowInfo.softVOS.forEach(item => {
                                        if ('' + item.topId !== '' + setChoosePower.topId) {
                                            item.moduleVOS && item.moduleVOS.forEach(cItem => {
                                                cItem.resourceVOS && cItem.resourceVOS.forEach(cCItem => {
                                                    if ('1' === '' + cCItem.isSelect || '1' === '' + cCItem.isDefault)
                                                        newResIds.push({
                                                            resId: cCItem.resId
                                                        });
                                                });
                                            });
                                        }
                                    });

                                    Model.MyCompanyGUpdate({
                                        groupId: chePowInfo.groupId,
                                        groupName: chePowInfo.groupName,
                                        resIds: newResIds.length > 0 ? JSON.stringify(newResIds) : '',
                                    }, (res) => {
                                        message.success('修改成功！');
                                        this.setState({visible: false}, () => {
                                            callBack && callBack({
                                                chePowMenu,
                                                chePowInfo,
                                                updatedMenu: false,
                                                updatedInfo: true,
                                            });
                                        });
                                    }, (err) => {
                                    });
                                });
                            }}
                    >确定</Button>
                    <Button
                        style={{
                            width: '64px',
                            height: '36px',
                            fontSize: '16px'
                        }}
                        onClick={() => {
                            this.setState({visible: false});
                        }}
                    >取消</Button>
                </div>
            }
        >
            <div style={{paddingLeft: '16px', paddingRight: '32px', paddingBottom: '16px'}}>
                搜索：
                <Input placeholder="请输入关键字"
                       style={{width: '91%'}}
                       onPressEnter={(e) => {
                           setChoosePower.moduleVOS && setChoosePower.moduleVOS.forEach(item => {
                               item.resourceVOS && item.resourceVOS.forEach(cItem => {
                                   cItem.isShow = false;
                                   if (cItem.resName.indexOf(e.target.value) >= 0) {
                                       cItem.isShow = true;
                                   }
                               });
                           });
                           this.setState({setChoosePower});
                       }}
                />
            </div>
            <div style={{paddingLeft: '16px', maxHeight: '330px', overflowY: 'auto'}}>
                {
                    isShow() ? <Row style={{margin: '8px 0 16px', paddingRight: '28px'}}>
                        <Col span={12} style={{fontSize: '14px', color: '#2B3441'}}>全部开启</Col>
                        <Col span={12} style={{textAlign: 'right'}}>
                            <Switch className={'Switch'}
                                    checked={openAllChecked}
                                    onChange={(checked) => {
                                        setChoosePower.moduleVOS && setChoosePower.moduleVOS.forEach(item => {
                                            item.resourceVOS && item.resourceVOS.forEach(cItem => {
                                                if ('0' === '' + cItem.isDefault)
                                                    cItem.isSelect = checked ? 1 : 0;
                                            });
                                        });
                                        this.setState({
                                            setChoosePower,
                                            openAllChecked: this.allChecked(setChoosePower.moduleVOS)
                                        });
                                    }}
                            />
                        </Col>
                    </Row> : null
                }

                {
                    !isShowNoneImg() ? <div
                        style={{
                            textAlign: 'center'
                        }}
                    >
                        <img src={none} alt=""
                             style={{width: '300px'}}
                        />
                        <div style={{color: '#999', marginTop: '10px'}}>没有搜索出权限数据</div>
                    </div> : null
                }

                {
                    setChoosePower.moduleVOS && setChoosePower.moduleVOS.map((item, idx) => {
                        let hasSHow = false;
                        item.resourceVOS && item.resourceVOS.forEach(cItem => {
                            if (cItem.isShow)
                                hasSHow = true;
                        });
                        if (!hasSHow || !item.resourceVOS || (item.resourceVOS && item.resourceVOS.length <= 0))
                            return null;
                        return <div
                            key={'moduleVOS_' + item.moduleId}
                            style={{
                                borderBottom: setChoosePower.moduleVOS.length - 1 == idx ? '' : '1px solid #D8D8D8',
                                marginBottom: setChoosePower.moduleVOS.length - 1 == idx ? '' : '15px',
                                paddingRight: '28px',
                            }}
                        >
                            <div
                                style={{
                                    color: 'rgba(43,52,65,0.45)',
                                    fontSize: '12px',
                                    lineHeight: '17px',
                                    marginBottom: '8px'
                                }}
                            >{item.moduleName}</div>
                            {
                                item.resourceVOS && item.resourceVOS.map((cItem, cIdx) => {
                                    if (!cItem.isShow)
                                        return null;

                                    return <Row
                                        key={'resourceVOS_' + cItem.resId}
                                        style={{marginBottom: '15px'}}
                                    >
                                        <Col span={12}>
                                            <div style={{fontSize: '14px', color: '#2B3441'}}>{cItem.resName}</div>
                                            <div style={{
                                                color: 'rgba(43,52,65,0.65)',
                                                fontSize: '12px'
                                            }}>{cItem.resDesc}</div>
                                        </Col>
                                        <Col span={12} style={{textAlign: 'right'}}>
                                            <Switch className={'Switch'}
                                                    disabled={'1' === '' + cItem.isDefault}
                                                    checked={'1' === '' + cItem.isSelect || '1' === '' + cItem.isDefault}
                                                    onChange={(checked) => {
                                                        setChoosePower.moduleVOS[idx].resourceVOS[cIdx].isSelect = checked ? 1 : 0;
                                                        this.setState({
                                                            setChoosePower,
                                                            openAllChecked: this.allChecked(setChoosePower.moduleVOS)
                                                        });
                                                    }}
                                            />
                                        </Col>
                                    </Row>
                                })
                            }
                        </div>
                    })
                }
            </div>
        </Modal>
    }

}

export default PowerContentModal;
