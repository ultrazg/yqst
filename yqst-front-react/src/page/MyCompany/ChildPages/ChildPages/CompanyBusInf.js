import React, {Component} from 'react';

import {Tabs, Button, message, Popconfirm, Form} from 'antd';
import {none} from '../../../../resource'
import Model from '../../Model'
import SWTable from 'SWViews/table';
import IsPower from "../../../Power/IsPower";
import GetUrlParameter from "../../../../utils/getUrlParameter/GetUrlParameter";

const {TabPane} = Tabs;

class CompanyBusInf extends Component {
    constructor(props) {
        super(props);
        let obj = GetUrlParameter.getUrlParams(this.props.location.search);
        this.state = {
            data: {},
            list: [],
            total: 0,
            current: 1,
            pageSize: 50,
            key: obj.key || 2,
        };

    }

    componentDidMount() {
        switch (this.state.key + '') {
            case '4':
                this.setState({
                    current: 1,
                    pageSize: 50,
                    list: [],
                    total: 0,
                    key: this.state.key,
                }, () => {
                    window.globalPermissions.checkPermission('ERP_RISE_ENTER', (res) => {
                        if (!res)
                            this.getMyCompanyIRPage();
                    });
                });
                break;

            case '3':
                this.setState({
                    current: 1,
                    pageSize: 50,
                    list: [],
                    total: 0,
                    key: this.state.key
                }, () => {
                    window.globalPermissions.checkPermission('ERP_ADDRESS_ENTER', (res) => {
                        if (!res)
                            this.getMyCompanyCAPage();
                    });
                });
                break;

            case '2':
                this.setState({key: this.state.key}, () => {
                    window.globalPermissions.checkPermission('ERP_DEPOSIT_VIEW', (res) => {
                        if (!res)
                            this.getMyCompanyCBGet();
                    });
                });
                break;

            // case '1':
            default:
                this.setState({key: 2}, () => {
                    // this.getMyCompanyIIGet();
                    window.globalPermissions.checkPermission('ERP_INVOICE_VIEW', (res) => {
                        if (!res)
                            this.getMyCompanyCBGet();
                    });
                });
                break;
        }
    }

    componentWillUnmount() {
    }

    render() {
        let {data, list, key} = this.state;
        const columnsDZ = [
            {
                title: '收件人',
                key: 'contact',
                dataIndex: 'contact',
                width: 100,
                fixed: 'left',
            },
            {
                title: '联系电话',
                key: 'tel',
                dataIndex: 'tel',
            },
            {
                title: '分类',
                key: 'addressCategoryAllName',
                dataIndex: 'addressCategoryAllName',
                render: (text) => {
                    return <div className={'text-elli2'} title={text}>{text}</div>
                }
            },
            {
                title: '备注',
                key: 'remark',
                dataIndex: 'remark',
                render: (text) => {
                    return <div className={'text-elli2'} title={text}>{text}</div>
                }
            },
            // {
            //     title: '邮编',
            //     key: 'zipCode',
            //     dataIndex: 'zipCode',
            // },
            {
                title: '所在地区',
                key: 'area',
                dataIndex: 'area',
            },
            // {
            //     title: '详细地址',
            //     key: 'address',
            //     dataIndex: 'address',
            // },
            {
                title: '操作',
                key: '',
                dataIndex: '',
                width: 115,
                fixed: 'right',
                render: (data) => {
                    return <div>
                        <a onClick={() => {
                            window.globalPermissions.checkPermission('ERP_RISE_EDIT', (res) => {
                                if (res)
                                    return message.error('抱歉，您没有该操作权限，请联系管理员！');

                                this.props.history.push(`/pages/myCompany/subjectSetUp/companyBusInf/addressBaseEdit?id=${data.id}`);
                            });
                        }}>
                            编辑
                        </a>
                        <span style={{
                            margin: '0 10px',
                            borderRight: '1px solid #d7d6d6',
                        }}/>
                        <Popconfirm
                            // placement="topRight"
                            title="确认要删除该地址吗?"
                            onConfirm={() => {
                                window.globalPermissions.checkPermission('ERP_ADDRESS_DELETE', (res) => {
                                    if (res)
                                        return message.error('抱歉，您没有该操作权限，请联系管理员！');

                                    Model.MyCompanyCADelete({
                                        id: data.id
                                    }, (res) => {
                                        message.success('操作成功！');
                                        this.getMyCompanyCAPage(1);
                                    }, (err) => {
                                    })
                                });
                            }}
                            onCancel={() => {
                            }}
                            okText="确认"
                            cancelText="取消"
                        >
                            <a style={{color: '#f00'}}>删除</a>
                        </Popconfirm>
                        {/*<span style={{*/}
                        {/*    margin: '0 10px',*/}
                        {/*    borderRight: '1px solid #d7d6d6',*/}
                        {/*}}/>*/}
                        {/*<a*/}
                        {/*    onClick={() => {*/}
                        {/*        window.globalPermissions.checkPermission('ERP_ADDRESS_VIEW', (res) => {*/}
                        {/*            if (res)*/}
                        {/*                return message.error('抱歉，您没有该操作权限，请联系管理员！');*/}
                        {/*        });*/}
                        {/*    }}*/}
                        {/*>*/}
                        {/*    使用情况*/}
                        {/*</a>*/}
                    </div>
                }
            },
        ];
        const columnsTT = [
            {
                title: '单位名称',
                key: 'invoiceName',
                dataIndex: 'invoiceName',
                width: 150,
                fixed: 'left',
            },
            {
                title: '纳税人识别号',
                key: 'taxpayerNo',
                dataIndex: 'taxpayerNo',
            },
            {
                title: '地址',
                key: 'address',
                dataIndex: 'address',
            },
            {
                title: '电话',
                key: 'phone',
                dataIndex: 'phone',
            },
            {
                title: '开户行',
                key: 'bank',
                dataIndex: 'bank',
            },
            {
                title: '账户',
                key: 'account',
                dataIndex: 'account',
            },
            {
                title: '操作',
                key: '',
                dataIndex: '',
                width: 200,
                fixed: 'right',
                render: (data) => {
                    return <div>
                        <a onClick={() => {
                            window.globalPermissions.checkPermission('ERP_RISE_EDIT', (res) => {
                                if (res)
                                    return message.error('抱歉，您没有该操作权限，请联系管理员！');

                                this.props.history.push(`/pages/myCompany/subjectSetUp/companyBusInf/riseEdit?id=${data.id}&sn=${data.sn}`);
                            });
                        }}>
                            编辑
                        </a>
                        <span style={{
                            margin: '0 10px',
                            borderRight: '1px solid #d7d6d6',
                        }}/>
                        <Popconfirm
                            // placement="topRight"
                            title="确认要删除该数据吗?"
                            onConfirm={() => {
                                window.globalPermissions.checkPermission('ERP_RISE_DEL', (res) => {
                                    if (res)
                                        return message.error('抱歉，您没有该操作权限，请联系管理员！');

                                    Model.MyCompanyIRDelete({
                                        sn: data.sn
                                    }, (res) => {
                                        message.success('操作成功！');
                                        this.getMyCompanyIRPage(1);
                                    }, (err) => {
                                    })
                                });
                            }}
                            onCancel={() => {
                            }}
                            okText="确认"
                            cancelText="取消"
                        >
                            <a style={{color: '#f00'}}>删除</a>
                        </Popconfirm>
                        <span style={{
                            margin: '0 10px',
                            borderRight: '1px solid #d7d6d6',
                        }}/>
                        <a onClick={() => {
                            window.globalPermissions.checkPermission('ERP_RISE_VIEW', (res) => {
                                if (res)
                                    return message.error('抱歉，您没有该操作权限，请联系管理员！');
                            });
                        }}>
                            使用情况
                        </a>
                    </div>
                }
            },
        ];

        return (
            <div className={'cBusCss'}>
                <h1>企业业务信息</h1>
                <Tabs activeKey={key + ''} className={'tabs'}
                      onChange={(key) => {
                          switch ('' + key) {
                              case '4':
                                  this.setState({
                                      current: 1,
                                      pageSize: 50,
                                      list: [],
                                      total: 0,
                                      key,
                                  }, () => {
                                      window.globalPermissions.checkPermission('ERP_RISE_ENTER', (res) => {
                                          if (!res)
                                              this.getMyCompanyIRPage();
                                      });
                                  });
                                  break;

                              case '3':
                                  this.setState({
                                      current: 1,
                                      pageSize: 50,
                                      list: [],
                                      total: 0,
                                      key
                                  }, () => {
                                      window.globalPermissions.checkPermission('ERP_ADDRESS_ENTER', (res) => {
                                          if (!res)
                                              this.getMyCompanyCAPage();
                                      });
                                  });
                                  break;

                              case '2':
                                  this.setState({key}, () => {
                                      window.globalPermissions.checkPermission('ERP_DEPOSIT_VIEW', (res) => {
                                          if (!res)
                                              this.getMyCompanyCBGet();
                                      });
                                  });
                                  break;

                              case '1':
                              default:
                                  this.setState({key}, () => {
                                      window.globalPermissions.checkPermission('ERP_INVOICE_VIEW', (res) => {
                                          if (!res)
                                              this.getMyCompanyIIGet();
                                      });
                                  });
                                  break;
                          }
                      }}
                >
                    {/*<TabPane tab="开票信息" key="1">
                        <IsPower
                            key={'ERP_INVOICE_VIEW'}
                            permissionsName={'ERP_INVOICE_VIEW'}
                            style={{paddingTop: '150px'}}
                        >
                            {
                                data && data.invoiceId ? <div>
                                    <ul className={'kpMes'}>
                                        <li>
                                            <span>单位名称</span>
                                            {data.infoName || ''}
                                        </li>
                                        <li>
                                            <span>纳税人识别号</span>
                                            {data.taxpayerNumber || ''}
                                        </li>
                                        <li>
                                            <span>地址</span>
                                            {data.address || ''}
                                        </li>
                                        <li>
                                            <span>电话</span>
                                            {data.phone || ''}
                                        </li>
                                        <li>
                                            <span>开户行</span>
                                            {data.accountBank || ''}
                                        </li>
                                        <li>
                                            <span>账户</span>
                                            {data.depositNumber || ''}
                                        </li>
                                    </ul>
                                    <Button type="primary" className={'editBtn'}
                                        onClick={() => {
                                            window.globalPermissions.checkPermission('ERP_INVOICE_EDIT', (res) => {
                                                if(res)
                                                    return message.error('抱歉，您没有该操作权限，请联系管理员！');

                                                this.props.history.push(`/pages/myCompany/subjectSetUp/companyBusInf/companyBusInfEdit?id=${data.invoiceId}`);
                                            });
                                        }}
                                    >编辑信息</Button>
                                </div> : null
                            }
                            {
                                this.makeNoneView(data.invoiceId, '开票信息')
                            }
                        </IsPower>
                    </TabPane>*/}
                    <TabPane tab="基本存款账户" key="2">
                        <IsPower
                            key={'ERP_DEPOSIT_VIEW'}
                            permissionsName={'ERP_DEPOSIT_VIEW'}
                            style={{paddingTop: '150px'}}
                        >
                            {
                                data && data.id ? <div>
                                    <ul className={'kpMes'}>
                                        <li>
                                            <span>企业开户名称</span>
                                            {data.depositBankName || ''}
                                        </li>
                                        <li>
                                            <span>开户银行</span>
                                            {data.depositBank || ''}
                                        </li>
                                        <li>
                                            <span>开户所在地</span>
                                            {`${data.provinceName || ''}${data.cityName || ''}${data.districtName || ''}`}
                                        </li>
                                        <li>
                                            <span>开户支行名称</span>
                                            {data.bankBranchName || ''}
                                        </li>
                                        <li>
                                            <span>企业银行账号</span>
                                            {data.bankAccount || ''}
                                        </li>
                                    </ul>
                                    <Button type="primary"
                                            onClick={() => {
                                                window.globalPermissions.checkPermission('ERP_DEPOSIT_EDIT', (res) => {
                                                    if (res)
                                                        return message.error('抱歉，您没有该操作权限，请联系管理员！');

                                                    this.props.history.push(`/pages/myCompany/subjectSetUp/companyBusInf/bankDepositEdit?id=${data.id}`);
                                                });
                                            }}
                                    >编辑信息</Button>
                                </div> : null
                            }
                            {
                                this.makeNoneView(data.id, '基本存款账户')
                            }
                        </IsPower>
                    </TabPane>
                    <TabPane tab="地址库" key="3">
                        <IsPower
                            key={'ERP_ADDRESS_ENTER'}
                            permissionsName={'ERP_ADDRESS_ENTER'}
                            style={{paddingTop: '150px'}}
                        >
                            <SWTable
                                scroll={{x: 1200}}
                                columns={columnsDZ}
                                dataSource={list}
                                pagination={false}
                                funBtn={
                                    <div>
                                        <Button
                                            style={{width: '88px', height: '32px', fontSize: '14px'}}
                                            onClick={() => {
                                                window.globalPermissions.checkPermission('ERP_ADDRESS_ADD', (res) => {
                                                    if (res)
                                                        return message.error('抱歉，您没有该操作权限，请联系管理员！');

                                                    if (list.length >= 20)
                                                        return message.error('新增地址库已到上限！');
                                                    this.props.history.push('/pages/myCompany/subjectSetUp/companyBusInf/addressBaseEdit');
                                                });
                                            }}
                                        >新增</Button>
                                        <Button
                                            type={'primary'}
                                            style={{
                                                width: '88px',
                                                height: '32px',
                                                fontSize: '14px',
                                                marginLeft: '12px'
                                            }}
                                            onClick={() => {
                                                this.props.history.push('/pages/myCompany/subjectSetUp/companyBusInf/AddressTypeList');
                                            }}
                                        >分类管理</Button>
                                    </div>
                                }
                            />
                        </IsPower>
                    </TabPane>
                    <TabPane tab="抬头库" key="4">
                        <IsPower
                            key={'ERP_RISE_ENTER'}
                            permissionsName={'ERP_RISE_ENTER'}
                            style={{paddingTop: '150px'}}
                        >
                            <SWTable
                                scroll={{x: 1200}}
                                columns={columnsTT}
                                dataSource={list}
                                pagination={false}
                                funBtn={
                                    <div>
                                        <Button
                                            style={{width: '88px', height: '32px', fontSize: '14px'}}
                                            onClick={() => {
                                                window.globalPermissions.checkPermission('ERP_RISE_ADD', (res) => {
                                                    if (res)
                                                        return message.error('抱歉，您没有该操作权限，请联系管理员！');

                                                    if (list.length >= 20)
                                                        return message.error('新增抬头库已到上限！');
                                                    this.props.history.push('/pages/myCompany/subjectSetUp/companyBusInf/riseEdit');
                                                });
                                            }}
                                        >新增</Button>
                                    </div>
                                }
                            />
                        </IsPower>
                    </TabPane>
                </Tabs>
            </div>
        );
    }

    getMyCompanyIIGet() {
        Model.MyCompanyIIGet({}, (res) => {
            this.setState({data: res.data});
        }, (err) => {
        });
    }

    getMyCompanyCBGet() {
        Model.MyCompanyCBGet({}, (res) => {
            this.setState({data: res.data});
        }, (err) => {
        });
    }

    getMyCompanyCAPage(current) {
        this.state.current = current ? current : this.state.current;
        Model.MyCompanyCAPage({
            current: this.state.current,
            pageSize: this.state.pageSize,

        }, (res) => {
            this.setState({
                list: res.data.records || [],
                total: res.data.total || 0,
                current: this.state.current,
            });

        }, (err) => {
        });
    }

    getMyCompanyIRPage(current) {
        this.state.current = current ? current : this.state.current;
        Model.MyCompanyIRPage({
            current: this.state.current,
            pageSize: this.state.pageSize,

        }, (res) => {
            this.setState({
                list: res.data.records || [],
                total: res.data.total || 0,
                current: this.state.current,
            });

        }, (err) => {
        });
    }

    makeNoneView(id, type) {
        if (!id)
            return <div style={{
                textAlign: 'center'
            }}>
                <img src={none} alt=""
                     style={{
                         width: '293px',
                         marginTop: '100px',
                     }}
                />
                <div
                    style={{
                        color: 'rgba(43,52,65,0.65)',
                        margin: '25px 0'
                    }}
                >当前企业没有{type}</div>
                <Button type="primary" className={'editBtn'}
                        onClick={() => {
                            switch (type) {
                                case '基本存款账户':
                                    this.props.history.push(`/pages/myCompany/subjectSetUp/companyBusInf/bankDepositEdit`);
                                    break;

                                case '开票信息':
                                default:
                                    this.props.history.push(`/pages/myCompany/subjectSetUp/companyBusInf/companyBusInfEdit`);
                                    break;
                            }

                        }}
                        style={{
                            marginTop: '0px',
                            lineHeight: '100%'
                        }}
                >新增信息</Button>
            </div>;

        return null;
    }
}

export default CompanyBusInf;
