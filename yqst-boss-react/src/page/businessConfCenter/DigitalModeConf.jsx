import React from 'react';
import Api from './Api';
import request from "../../utils/request/request";
import {Breadcrumb, Col, Radio, Row, message, Switch, Popconfirm, Button} from "antd";
import SWTable from 'SWViews/table';
import PublicData from "../../base/publicData/PublicData";
import SelectCompanyModal from "./SelectCompanyModal";

/**
 * 租赁业务配置
 */
function DigitalModeConf() {
    const [id, setId] = React.useState(null);
    const [data, setData] = React.useState({});
    const [isShowSelectCompanyModal, setIsShowSelectCompanyModal] = React.useState(false);
    const SelectCompanyFun = React.useRef(null);
    const getDetail = (callback) => {
        request(Api.DigitalModeConfGet, {}, res => {
            callback && callback(res);
        }, () => {
        });
    }
    React.useEffect(() => {
        getDetail((res) => {
            setId(res.data.id || 0);
            setData(res.data);
        })
    }, []);

    return (
        <>
            <div style={{padding: "10px"}}>
                <Breadcrumb>
                    <Breadcrumb.Item>业务配置中心</Breadcrumb.Item>
                    <Breadcrumb.Item>非数字化协同配置</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div style={{
                height: document.documentElement.clientHeight - PublicData.pageTopHeight - PublicData.breadHeight,
                overflowY: 'auto',
            }}>
                <>
                    <h1 style={{paddingLeft: 20, paddingRight: 20}}>用户中心</h1>
                    <div style={{
                        background: 'white',
                        padding: 20,
                        marginLeft: 10,
                        marginRight: 10,
                        borderRadius: 6
                    }}>
                        <Row>
                            <Col span={14}>
                                <b style={{fontSize: 16}}>手动添加供应商/客户代注册功能</b>
                                <p style={{color: '#a4b0be'}}>选择后用户在手动添加供应商/客户时可以帮助未上线的供应商/客户创建账号</p>
                            </Col>
                            <Col span={10}>
                                <label>模式：</label>
                                <Radio.Group
                                    onChange={e => {
                                        update({id, insteadRegister: e.target.value}, () => {
                                            setData({...data, insteadRegister: e.target.value});
                                        });
                                    }}
                                    value={data.insteadRegister}
                                    style={{marginLeft: 20}}
                                >
                                    <Radio value={0}>关闭</Radio>
                                    <Radio value={1}>开启</Radio>
                                </Radio.Group>
                            </Col>
                        </Row>
                    </div>
                    <div style={{
                        marginTop: 10,
                        background: 'white',
                        padding: 20,
                        marginLeft: 10,
                        marginRight: 10,
                        borderRadius: 6
                    }}>
                        <Row>
                            <Col span={14}>
                                <b style={{fontSize: 16}}>添加邀请企业成为供应商/客户时系统自动确认</b>
                                <p style={{color: '#a4b0be'}}>邀请企业成为供应商/客户时，邀请对象自动成为本企业的供应商/客户</p>
                            </Col>
                            <Col span={10}>
                                <label>模式：</label>
                                <Radio.Group
                                    onChange={e => {
                                        update({id, inviteApplyExamine: e.target.value}, () => {
                                            setData({...data, inviteApplyExamine: e.target.value});
                                        });
                                    }}
                                    value={data.inviteApplyExamine}
                                    style={{marginLeft: 20}}
                                >
                                    <Radio value={0}>关闭</Radio>
                                    <Radio value={1}>开启</Radio>
                                </Radio.Group>
                            </Col>
                        </Row>
                    </div>
                </>
                <>
                    <h1 style={{marginTop: 10, paddingLeft: 20, paddingRight: 20}}>租赁业务</h1>
                    <div style={{background: 'white', padding: 20, marginLeft: 10, marginRight: 10, borderRadius: 6}}>
                        <Row>
                            <Col span={14}>
                                <b style={{fontSize: 16}}>数字化协同配置</b>
                                <p style={{color: '#a4b0be'}}>选择非协同模式，允许指定企业补单（补进场单、退场单、结算单、期初物资初始化、停租单、切割赔偿单、丢损赔偿单），其他企业只能查看数据；选择协同模式，在线上开展租赁业务</p>
                            </Col>
                            <Col span={10}>
                                <label>模式：</label>
                                <Radio.Group
                                    onChange={e => {
                                        //租赁协同控制(0为关闭,1为开启)
                                        update({id, leaseCoordination: e.target.value}, () => {
                                            setData({...data, leaseCoordination: e.target.value});
                                        });
                                    }}
                                    value={data.leaseCoordination}
                                    style={{marginLeft: 20}}
                                >
                                    <Radio value={1}>协同</Radio>
                                    <Radio value={0}>非协同</Radio>
                                </Radio.Group>
                            </Col>
                        </Row>
                        {data.leaseCoordination == 0 ? <>
                            <Button style={{marginBottom: 10}} type={'primary'} onClick={() => {
                                SelectCompanyFun.current = (result) => {
                                    setIsShowSelectCompanyModal(false);
                                    request(Api.DigitalModeConfLeaseAdd, {userSnStr: result.map((item) => item.companySn).join(',')}, () => {
                                        message.info('添加成功')
                                        getDetail((res) => {
                                            setData({...data, leaseCoordinationList: res.data.leaseCoordinationList});
                                        })
                                    }, () => {
                                    })
                                }
                                setIsShowSelectCompanyModal(true)
                            }}>添加企业</Button>
                            <SWTable
                                columns={[
                                    {
                                        title: '序号',
                                        dataIndex: 'index',
                                        key: 'index',
                                        width: '15%',
                                        render: (text, record, index) => index + 1,
                                    },
                                    {
                                        title: '企业名称',
                                        key: 'userName',
                                        dataIndex: 'userName',
                                        width: '20%',
                                        render: (text) => {
                                            return <span className={'text-elli2'} title={text}>{text}</span>
                                        }
                                    },
                                    {
                                        title: '企业号',
                                        key: 'accountSn',
                                        dataIndex: 'accountSn',
                                        width: '20%',
                                        render: (text) => {
                                            return <span className={'text-elli2'}>{text}</span>
                                        }
                                    },
                                    {
                                        title: '添加时间',
                                        key: 'createTime',
                                        dataIndex: 'createTime',
                                        width: '20%',
                                    },
                                    {
                                        title: '操作人',
                                        key: 'createAdminName',
                                        dataIndex: 'createAdminName',
                                        width: '15%',
                                    },
                                    {
                                        title: '操作',
                                        key: 'opera',
                                        dataIndex: 'opera',
                                        width: 70,
                                        render: (res, record, index) => {
                                            return (
                                                <>
                                                    <Popconfirm
                                                        placement="topRight"
                                                        title="确认删除该企业？"
                                                        onConfirm={() => {
                                                            request(Api.DigitalModeConfLeaseDel, {userSn: record.userSn}, () => {
                                                                message.info('删除成功')
                                                                let list = data.leaseCoordinationList;
                                                                list.splice(index, 1)
                                                                setData({...data, leaseCoordinationList: list});
                                                            }, () => {
                                                            })
                                                        }}
                                                        okText="确认"
                                                        cancelText="取消"
                                                    >
                                                        <a style={{color: '#ff4757'}}>删除</a>
                                                    </Popconfirm>
                                                </>
                                            )
                                        }
                                    }
                                ]}
                                dataSource={data.leaseCoordinationList || []}
                                bordered
                            />
                        </> : null}
                    </div>
                    <div style={{
                        marginTop: 10,
                        background: 'white',
                        padding: 20,
                        marginLeft: 10,
                        marginRight: 10,
                        borderRadius: 6
                    }}>
                        <Row>
                            <Col span={14}>
                                <b style={{fontSize: 16}}>企业物资自动更新</b>
                                <p style={{color: '#a4b0be'}}>平台物资库更新物资后，所有企业的物资库自动更新</p>
                            </Col>
                            <Col span={10}>
                                <label>模式：</label>
                                <Radio.Group
                                    onChange={e => {
                                        update({id, leaseGoodsAutoUpdate: e.target.value}, () => {
                                            setData({...data, leaseGoodsAutoUpdate: e.target.value});
                                        });
                                    }}
                                    value={data.leaseGoodsAutoUpdate}
                                    style={{marginLeft: 20}}
                                >
                                    <Radio value={0}>关闭</Radio>
                                    <Radio value={1}>开启</Radio>
                                </Radio.Group>
                            </Col>
                        </Row>
                    </div>
                </>
                <>
                    <h1 style={{marginTop: 10, paddingLeft: 20, paddingRight: 20}}>结算中心</h1>
                    <div style={{
                        marginTop: 10,
                        background: 'white',
                        padding: 20,
                        marginLeft: 10,
                        marginRight: 10,
                        borderRadius: 6
                    }}>
                        <Row>
                            <Col span={14}>
                                <b style={{fontSize: 16}}>数字化协同配置</b>
                                <p style={{color: '#a4b0be'}}>选择非协同模式，收款方或者付款方发起结算后直接生成结算单；协同模式，收款方发起结算后需要付款方确认</p>
                            </Col>
                            <Col span={10}>
                                <label>模式：</label>
                                <Radio.Group
                                    onChange={e => {
                                        update({id, settlementCoordination: e.target.value}, () => {
                                            setData({...data, settlementCoordination: e.target.value});
                                        });
                                    }}
                                    value={data.settlementCoordination}
                                    style={{marginLeft: 20}}
                                >
                                    <Radio value={1}>协同</Radio>
                                    <Radio value={0}>非协同</Radio>
                                </Radio.Group>
                            </Col>
                        </Row>
                        {data.settlementCoordination == 0 ?
                            <>
                                <Button style={{marginBottom: 10}} type={'primary'} onClick={() => {
                                    SelectCompanyFun.current = (result) => {
                                        setIsShowSelectCompanyModal(false);
                                        request(Api.DigitalModeConfSettleAdd, {userSnStr: result.map((item) => item.companySn).join(',')}, () => {
                                            message.info('添加成功')
                                            getDetail((res) => {
                                                setData({
                                                    ...data,
                                                    settlementCoordinationList: res.data.settlementCoordinationList
                                                });
                                            })
                                        }, () => {
                                        })
                                    }
                                    setIsShowSelectCompanyModal(true)
                                }}>添加企业</Button>
                                <SWTable
                                    columns={[
                                        {
                                            title: '序号',
                                            dataIndex: 'index',
                                            key: 'index',
                                            width: '15%',
                                            render: (text, record, index) => index + 1,
                                        },
                                        {
                                            title: '企业名称',
                                            key: 'userName',
                                            dataIndex: 'userName',
                                            width: '20%',
                                            render: (text) => {
                                                return <span className={'text-elli2'} title={text}>{text}</span>
                                            }
                                        },
                                        {
                                            title: '企业号',
                                            key: 'accountSn',
                                            dataIndex: 'accountSn',
                                            width: '20%',
                                            render: (text) => {
                                                return <span className={'text-elli2'}>{text}</span>
                                            }
                                        },
                                        {
                                            title: '添加时间',
                                            key: 'createTime',
                                            dataIndex: 'createTime',
                                            width: '20%',
                                        },
                                        {
                                            title: '操作人',
                                            key: 'createAdminName',
                                            dataIndex: 'createAdminName',
                                            width: '15%',
                                        },
                                        {
                                            title: '操作',
                                            key: 'opera',
                                            dataIndex: 'opera',
                                            width: 70,
                                            render: (res, record, index) => {
                                                return (
                                                    <>
                                                        <Popconfirm
                                                            placement="topRight"
                                                            title="确认删除该企业？"
                                                            onConfirm={() => {
                                                                request(Api.DigitalModeConfSettleDel, {userSn: record.userSn}, () => {
                                                                    message.info('删除成功')
                                                                    let list = data.settlementCoordinationList;
                                                                    list.splice(index, 1)
                                                                    setData({
                                                                        ...data,
                                                                        settlementCoordinationList: list
                                                                    });
                                                                }, () => {
                                                                })
                                                            }}
                                                            okText="确认"
                                                            cancelText="取消"
                                                        >
                                                            <a style={{color: '#ff4757'}}>删除</a>
                                                        </Popconfirm>
                                                    </>
                                                )
                                            }
                                        }
                                    ]}
                                    dataSource={data.settlementCoordinationList || []}
                                    bordered
                                />
                            </> : null}
                    </div>
                </>
                <>
                    <h1 style={{marginTop: 10, paddingLeft: 20, paddingRight: 20}}>维保业务</h1>
                    <div style={{
                        marginTop: 10,
                        background: 'white',
                        padding: 20,
                        marginLeft: 10,
                        marginRight: 10,
                        borderRadius: 6
                    }}>
                        <Row>
                            <Col span={14}>
                                <b style={{fontSize: 16}}>数字化协同配置</b>
                                <p style={{color: '#a4b0be'}}>选择非协同模式，允许指定企业补维保订单，其他企业只能查看数据；选择协同模式，在线上开展维保业务</p>
                            </Col>
                            <Col span={10}>
                                <label>模式：</label>
                                <Radio.Group
                                    onChange={e => {
                                        update({id, maintenanceCoordination: e.target.value}, () => {
                                            setData({...data, maintenanceCoordination: e.target.value});
                                        });
                                    }}
                                    value={data.maintenanceCoordination}
                                    style={{marginLeft: 20}}
                                >
                                    <Radio value={1}>协同</Radio>
                                    <Radio value={0}>非协同</Radio>
                                </Radio.Group>
                            </Col>
                        </Row>
                        {data.maintenanceCoordination == 0 ?
                            <>
                                <Button style={{marginBottom: 10}} type={'primary'} onClick={() => {
                                    SelectCompanyFun.current = (result) => {
                                        setIsShowSelectCompanyModal(false);
                                        request(Api.DigitalModeConfMainAdd, {userSnStr: result.map((item) => item.companySn).join(',')}, () => {
                                            message.info('添加成功')
                                            getDetail((res) => {
                                                setData({
                                                    ...data,
                                                    maintenanceCoordinationList: res.data.maintenanceCoordinationList
                                                });
                                            })
                                        }, () => {
                                        })
                                    }
                                    setIsShowSelectCompanyModal(true)
                                }}>添加企业</Button>
                                <SWTable
                                    columns={[
                                        {
                                            title: '序号',
                                            dataIndex: 'index',
                                            key: 'index',
                                            width: '15%',
                                            render: (text, record, index) => index + 1,
                                        },
                                        {
                                            title: '企业名称',
                                            key: 'userName',
                                            dataIndex: 'userName',
                                            width: '20%',
                                            render: (text) => {
                                                return <span className={'text-elli2'} title={text}>{text}</span>
                                            }
                                        },
                                        {
                                            title: '企业号',
                                            key: 'accountSn',
                                            dataIndex: 'accountSn',
                                            width: '20%',
                                            render: (text) => {
                                                return <span className={'text-elli2'}>{text}</span>
                                            }
                                        },
                                        {
                                            title: '添加时间',
                                            key: 'createTime',
                                            dataIndex: 'createTime',
                                            width: '20%',
                                        },
                                        {
                                            title: '操作人',
                                            key: 'createAdminName',
                                            dataIndex: 'createAdminName',
                                            width: '15%',
                                        },
                                        {
                                            title: '操作',
                                            key: 'opera',
                                            dataIndex: 'opera',
                                            width: 70,
                                            render: (res, record, index) => {
                                                return (
                                                    <>
                                                        <Popconfirm
                                                            placement="topRight"
                                                            title="确认删除该企业？"
                                                            onConfirm={() => {
                                                                request(Api.DigitalModeConfMainDel, {userSn: record.userSn}, () => {
                                                                    message.info('删除成功')
                                                                    let list = data.maintenanceCoordinationList;
                                                                    list.splice(index, 1)
                                                                    setData({
                                                                        ...data,
                                                                        maintenanceCoordinationList: list
                                                                    });
                                                                }, () => {
                                                                })
                                                            }}
                                                            okText="确认"
                                                            cancelText="取消"
                                                        >
                                                            <a style={{color: '#ff4757'}}>删除</a>
                                                        </Popconfirm>
                                                    </>
                                                )
                                            }
                                        }
                                    ]}
                                    dataSource={data.maintenanceCoordinationList || []}
                                    bordered
                                />
                            </> : null}
                    </div>
                </>
                <>
                    <h1 style={{marginTop: 10, paddingLeft: 20, paddingRight: 20}}>托运业务</h1>
                    <div style={{
                        marginTop: 10,
                        background: 'white',
                        padding: 20,
                        marginLeft: 10,
                        marginRight: 10,
                        borderRadius: 6
                    }}>
                        <Row>
                            <Col span={14}>
                                <b style={{fontSize: 16}}>数字化协同配置</b>
                                <p style={{color: '#a4b0be'}}>选择非协同模式，允许指定企业补运输单，其他企业只能查看数据；选择协同模式，在线上开展托运业务</p>
                            </Col>
                            <Col span={10}>
                                <label>模式：</label>
                                <Radio.Group
                                    onChange={e => {
                                        update({id, expressCoordination: e.target.value}, () => {
                                            setData({...data, expressCoordination: e.target.value});
                                        });
                                    }}
                                    value={data.expressCoordination}
                                    style={{marginLeft: 20}}
                                >
                                    <Radio value={1}>协同</Radio>
                                    <Radio value={0}>非协同</Radio>
                                </Radio.Group>
                            </Col>
                        </Row>
                        {data.expressCoordination == 0 ?
                            <>
                                <Button style={{marginBottom: 10}} type={'primary'} onClick={() => {
                                    SelectCompanyFun.current = (result) => {
                                        setIsShowSelectCompanyModal(false);
                                        request(Api.DigitalModeConfExpressAdd, {userSnStr: result.map((item) => item.companySn).join(',')}, () => {
                                            message.info('添加成功')
                                            getDetail((res) => {
                                                setData({
                                                    ...data,
                                                    expressCoordinationList: res.data.expressCoordinationList
                                                });
                                            })
                                        }, () => {
                                        })
                                    }
                                    setIsShowSelectCompanyModal(true)
                                }}>添加企业</Button>
                                <SWTable
                                    columns={[
                                        {
                                            title: '序号',
                                            dataIndex: 'index',
                                            key: 'index',
                                            width: '15%',
                                            render: (text, record, index) => index + 1,
                                        },
                                        {
                                            title: '企业名称',
                                            key: 'userName',
                                            dataIndex: 'userName',
                                            width: '20%',
                                            render: (text) => {
                                                return <span className={'text-elli2'} title={text}>{text}</span>
                                            }
                                        },
                                        {
                                            title: '企业号',
                                            key: 'accountSn',
                                            dataIndex: 'accountSn',
                                            width: '20%',
                                            render: (text) => {
                                                return <span className={'text-elli2'}>{text}</span>
                                            }
                                        },
                                        {
                                            title: '添加时间',
                                            key: 'createTime',
                                            dataIndex: 'createTime',
                                            width: '20%',
                                        },
                                        {
                                            title: '操作人',
                                            key: 'createAdminName',
                                            dataIndex: 'createAdminName',
                                            width: '15%',
                                        },
                                        {
                                            title: '操作',
                                            key: 'opera',
                                            dataIndex: 'opera',
                                            width: 70,
                                            render: (res, record, index) => {
                                                return (
                                                    <>
                                                        <Popconfirm
                                                            placement="topRight"
                                                            title="确认删除该企业？"
                                                            onConfirm={() => {
                                                                request(Api.DigitalModeConfExpressDel, {userSn: record.userSn}, () => {
                                                                    message.info('删除成功')
                                                                    let list = data.expressCoordinationList;
                                                                    list.splice(index, 1)
                                                                    setData({...data, expressCoordinationList: list});
                                                                }, () => {
                                                                })
                                                            }}
                                                            okText="确认"
                                                            cancelText="取消"
                                                        >
                                                            <a style={{color: '#ff4757'}}>删除</a>
                                                        </Popconfirm>
                                                    </>
                                                )
                                            }
                                        }
                                    ]}
                                    dataSource={data.expressCoordinationList || []}
                                    bordered
                                />
                            </> : null}
                    </div>
                </>
            </div>
            {isShowSelectCompanyModal ? <SelectCompanyModal
                closeModal={() => {
                    setIsShowSelectCompanyModal(false)
                }}
                onSubmit={(data) => {
                    SelectCompanyFun.current && SelectCompanyFun.current(data)
                    SelectCompanyFun.current = null;
                }}/> : null}
        </>
    );
}

function update(params, callback) {
    request(
        Api.DigitalModeConfUpdate,
        {
            ...params
        },
        () => {
            message.success('处理成功');
            callback && callback();
        },
        () => {
        }
    );
}

export default DigitalModeConf;
