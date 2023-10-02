/**
 * Created by yb on 2019/11/12
 */

import React from 'react';
import {Button, Col, Form, Input, message, Modal, Popconfirm, Radio, Row} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import Model from "../Model";
import SWTable from 'SWViews/table';
import moment from 'moment';
import TabsViewContent from "../../../baseview/tabsViewContent/TabsViewContent";
import HeadSearch from "../../../baseview/headSearch/HeadSearch";


class CloudServeDevelopersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            total: 0,
            requestPar: {
                current: 1,
                pageSize: 10,
                keyWord: '',
            },

            userPar: {
                list: [],
                total: 0,
                current: 1,
                pageSize: 10,
                keyWord: '',
                status: 1,
            },
            userVisible: false,
            changeUser: null,
        }
    }

    componentDidMount() {
        this.getList();
    }

    render() {
        return (
            <TabsViewContent
                crumb={[{name: '云服务中心'}, {name: "基本配置"}, {name: "开发者白名单列表"}]}
                // tabs={this.tabsConfig()}
                topBtn={
                    <Button type='primary' icon={<PlusOutlined />} onClick={() => {
                        this.getUserList(1);
                    }}>新增</Button>
                }
            >
                {this.makeHeadSearch()}
                {this.makeTable()}
                {this.makeUserView()}
            </TabsViewContent>
        );
    }

    getList() {
        Model.CServeSDPage(this.state.requestPar, (res) => {
            this.setState({
                list: res.data.records || [],
                total: res.data.total || 0,
            })
        }, (err) => {
        })
    }

    getUserList(current) {
        let {userPar} = this.state;
        userPar.current = current ? current : userPar.current;

        Model.UserAPage({
            current: userPar.current,
            pageSize: userPar.pageSize,
            status: userPar.status,
            keyWord: userPar.keyWord,

        }, (res) => {
            userPar.list = res.data.records && res.data.records.map(item => {
                return {
                    ...item,
                    isChecked: false,
                }
            });
            userPar.total = res.data.total || 0;

            this.setState({
                userPar,
                userVisible: true,
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
            {key: 'keyWord', type: 'Input', value: '', placeholder: '可查询ID、编码、名称', label: '关键字', maxLength: 30},
            // {
            //     key: 'a', type: 'Select', value: '', placeholder: '请选择实例状态', label: '实例状态',
            //     list: [
            //         {value: '', name: '全部'},
            //         {value: 1, name: '激活中'},
            //         {value: 2, name: '未激活'},
            //         {value: 3, name: '已过期'},
            //         {value: 4, name: '禁用中'},
            //     ],
            // },
            // {key: 'times', type:'RangePicker', value:'', placeholder: ['开始时间', '结束时间'], label: '创建时间',}
        ];
        return <HeadSearch data={searchDatas} callBack={(obj) => {
            // obj.startTime = obj.times [0] || '';
            // obj.endTime = obj.times [1] || '';
            obj.current = 1;

            // delete obj.times;
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
                title: '开发者ID',
                key: 'id',
                dataIndex: 'id',
            },
            {
                title: '开发者编码',
                key: 'devSn',
                dataIndex: 'devSn',
            },
            {
                title: '企业ID',
                key: 'userId',
                dataIndex: 'userId',
            },
            {
                title: '企业名称',
                key: 'userName',
                dataIndex: 'userName',
            },
            {
                title: '添加时间',
                key: 'createTime',
                dataIndex: 'createTime',
                width: 100,
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
                width: 90,
                render: (res) => {
                    return <div>
                        <Popconfirm
                            title="确认要删除该条数据吗？"
                            placement="topRight"
                            onConfirm={() => {
                                Model.CServeSDDelete({id: res.id}, (res) => {
                                    message.success('删除成功！');
                                    this.setState({
                                        requestPar: {
                                            ...this.state.requestPar,
                                            current: 1
                                        }
                                    }, () => {this.getList();})
                                }, (err) => {
                                })
                            }}
                            onCancel={() => {}}
                            okText="确定"
                            cancelText="取消"
                        >
                            <a style={{color: '#f00'}}>删除</a>
                        </Popconfirm>

                        {/*<Link to={`/Pages/CloudServeExDetail?id=`}>
                            查看
                        </Link>*/}
                        {/*<span style={{
                            margin: '0 10px',
                            borderRight: '1px solid #d7d6d6',
                        }}/>
                        <Link to={`/Pages/MessageTemplateEditor?id=${res.id}`}>
                            编辑
                        </Link>*/}
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

    makeUserView(){
        let {userPar, userVisible, changeUser} = this.state;
        const columns = [
            {
                title: '',
                key: '',
                dataIndex: '',
                width: 60,
                render: (res) => {
                    return <Radio checked={res.isChecked}/>
                }
            },
            {
                title: '企业ID',
                key: 'uid',
                dataIndex: 'uid',
            },
            {
                title: '企业号',
                key: 'accountSn',
                dataIndex: 'accountSn'
            },
            {
                title: '企业名称',
                key: 'companyName',
                dataIndex: 'companyName',
            },
            {
                title: '创建时间',
                key: 'createTime',
                dataIndex: 'createTime',
                width: 100,
                render: (res) => {
                    let times = res ? moment(res).format('YYYY-MM-DD HH:mm:ss') : '';
                    return times ? <div>
                        <div>{times.split(' ')[0]}</div>
                        <div>{times.split(' ')[1]}</div>
                    </div> : times;
                }
            },
        ];
        return <Modal
            title="选择企业用户"
            width={900}
            visible={userVisible}
            onOk={() => {
                if(!changeUser){
                    return message.error('请选择一条企业用户！');
                }
                Model.CServeSDSave({
                    userId: changeUser.id,
                    userName: changeUser.companyName,

                }, (res) => {
                    message.success('保存成功！');
                    this.setState({
                        userVisible: false,
                        changeUser: null,
                    }, () => {this.getList();});
                }, (err) => {
                })
            }}
            onCancel={() => {
                this.setState({userVisible: false, changeUser: null});
            }}
        >
            <Row style={{marginBottom: 15}}>
                <Col span={20}>
                    <Col span={24}>
                        关键字：
                        <Input maxLength={30} value={userPar.keyWord} style={{ width: '80%' }} placeholder={'可查询ID、企业号、名称'} onChange={(e) => {
                            this.setState({
                                userPar: {
                                    ...userPar,
                                    keyWord: e.target.value
                                }
                            });
                        }}/>
                    </Col>
                </Col>
                <Col span={4}>
                    <Button onClick={() => {
                        this.setState({
                            userPar: {
                                ...userPar,
                                current: 1,
                                pageSize: 10,
                                keyWord: '',
                            }
                        });
                    }}>重置</Button>
                    <Button style={{marginLeft: 10}} type="primary" onClick={() => {
                        this.getUserList(1);
                    }}>搜索</Button>
                </Col>
            </Row>

            <div style={{
                maxHeight: 350,
                overflowY: 'auto',
                overflowX: 'hidden'
            }}>
                <SWTable
                    columns={columns}
                    dataSource={userPar.list || []}
                    onRow={(record, idx) => {
                        return {
                            onClick: (event) => {
                                userPar.list.forEach(item => {
                                    item.isChecked = false;
                                    if('' + record.id === '' + item.id){
                                        item.isChecked = !item.isChecked;
                                        this.state.changeUser = item;
                                    }
                                });
                                this.setState({userPar, changeUser: this.state.changeUser});
                            }
                        }
                    }}
                    pagination={
                        {
                            total: userPar.total,
                            current: userPar.current,
                            pageSize: userPar.pages,
                            onChange: (a, b) => {
                                this.getUserList(a);
                            },
                            showTotal: (total, range) => `共有${total}条`
                        }
                    }
                />
            </div>
        </Modal>
    }

}

export default CloudServeDevelopersList
