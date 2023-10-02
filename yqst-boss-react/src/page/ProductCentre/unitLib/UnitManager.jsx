/**
 * 单位管理
 */
import React, {Component} from 'react';
import TabsViewContent from "../../../baseview/tabsViewContent/TabsViewContent";
import {Select, Button, Modal, Input, Switch, message, Popconfirm, Divider} from "antd";
import SWTable from 'SWViews/table';
import Model from './Model';
import {PlusOutlined} from '@ant-design/icons';

const {Option} = Select;

class UnitManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            total: 0,
            isModalVisible: false,
            requestPar: {
                current: 1,
                pageSize: 10,
                keyWord: '',
                status: 0,  // 状态 0.全部 1.启用 2.停用
                sortType: 1, // 排序方式 1:正序 2:倒序
            },
            newUnit: ''
        };
    }

    componentDidMount() {
        this.getList();
    }

    getList() {
        Model.UnitPage(this.state.requestPar, res => {
            this.state.total = res.data.total || 0;
            this.setState({
                list: res.data.records || [],
                total: this.state.total || 0,
            }, err => {
            })
        })
    }

    render() {
        return (
            <TabsViewContent
                crumb={[{name: '平台单位'}, {name: "单位管理"}]}
            >
                {this.makeCtrlBar()}
                {this.makeTable()}
            </TabsViewContent>
        );
    }

    onChangeHandle = value => {
        this.setState({
            requestPar: {
                ...this.state.requestPar,
                status: value
            }
        }, () => {
            this.getList();
        })
    }

    onTextChangeHandle = e => {
        this.setState({
            newUnit: e.target.value
        });
    }

    onKWChangeHandle = e => {
        this.setState({
            requestPar: {
                ...this.state.requestPar,
                keyWord: e.target.value
            }
        });
    }

    UnitDel = sn => {
        Model.UnitDelete({sn}, () => {
            message.success('删除成功');
            this.getList();
        });
    }

    UnitSave = () => {
        Model.UnitSave({sn: '', unit: this.state.newUnit}, () => {
            message.success('添加成功');
            this.getList();
            this.setState({
                newUnit: ''
            })
        })
    }

    UnitEnable = sn => {
        Model.UnitEnable({sn}, () => {
            this.getList();
        })
    }

    UnitDisable = sn => {
        Model.UnitDisable({sn}, () => {
            this.getList();
        })
    }

    makeCtrlBar() {
        return <div className="ctrlBar" style={{padding: '20px'}}>
            <p>
                关键词：
                <Input placeholder='请输入要搜索的内容' onChange={this.onKWChangeHandle} style={{width: 200, marginRight: 20}}/>
                状态：
                <Select defaultValue={this.state.requestPar.status + ''} style={{width: 120, marginRight: 20}}
                        onChange={this.onChangeHandle}>
                    <Option value="0">全部</Option>
                    <Option value="1">已启用</Option>
                    <Option value="2">已停用</Option>
                </Select>
                <Button onClick={() => {
                    this.getList();
                }} style={{marginRight: 20}} type='primary'>搜索</Button>
            </p>
            <p style={{paddingBottom: 0, marginBottom: 0}}>
                <Button type="primary" onClick={() => {
                    this.setState({
                        isModalVisible: true
                    })
                }}><PlusOutlined/>新增单位</Button>
            </p>
            <Modal
                title="新增单位"
                visible={this.state.isModalVisible}
                okText='新增单位'
                onOk={() => {
                    if (!this.state.newUnit) {
                        message.info('请输入内容');

                        return false;
                    } else {
                        this.UnitSave();
                    }
                    this.setState({
                        isModalVisible: false
                    })
                }}
                onCancel={() => {
                    this.setState({
                        isModalVisible: false
                    })
                }}
            >
                <div><p>单位：</p><Input onChange={this.onTextChangeHandle} maxLength={10} placeholder="请填写"
                                      value={this.state.newUnit}/>
                </div>
            </Modal>
        </div>
    }

    makeTable() {
        let {list, requestPar} = this.state;
        const columns = [
            {
                title: '序号',
                dataIndex: 'index',
                key: 'index',
                width: '2%',
                render: (text, record, index) => index + 1,
            },
            {
                title: '单位编码',
                key: 'sn',
                dataIndex: 'sn',
                width: '15%',
                render: (text) => {
                    return <span className={'text-elli2'}>{text}</span>
                }
            },
            {
                title: '单位',
                key: 'unit',
                dataIndex: 'unit',
                width: '17%',
                render: (text) => {
                    return <span className={'text-elli2'}>{text}</span>
                }
            },
            // {
            //     title: '状态',
            //     key: 'status',
            //     dataIndex: 'status',
            //     width: '15%',
            //     render: (text) => {
            //         // status	int	状态 1.启用 2.停用
            //         return <span style={text === 1 ? {color: '#2ed573'} : {color: '#ff4757'}}
            //                      className={'text-elli2'}>{text === 1 ? '已启用' : '已停用'}</span>
            //     }
            // },
            {
                title: '是否启用',
                key: 'status',
                dataIndex: 'status',
                width: '15%',
                render: (text, record) => {
                    // status	int	状态 1.启用 2.停用
                    return <Switch
                        style={{
                            margin: 0,
                            padding: 0
                        }}
                        checked={parseInt(text) === 1}
                        onChange={checked => {
                            checked
                                ? this.UnitEnable(record.sn)
                                : this.UnitDisable(record.sn)
                        }}/>
                }
            },
            {
                title: '操作',
                key: 'unit',
                dataIndex: 'unit',
                width: '8%',
                render: (res, record) => {
                    return (
                        <>
                            {/*{*/}
                            {/*    record.status === 1*/}
                            {/*        ? <Popconfirm*/}
                            {/*            placement="topRight"*/}
                            {/*            title="确认停用该单位？"*/}
                            {/*            onConfirm={() => this.UnitDisable(record.sn)}*/}
                            {/*            okText="确认"*/}
                            {/*            cancelText="取消"*/}
                            {/*        >*/}
                            {/*            <a style={{color: '#ff4757'}}>停用</a>*/}
                            {/*        </Popconfirm>*/}
                            {/*        : <Popconfirm*/}
                            {/*            placement="topRight"*/}
                            {/*            title="确认启用该单位？"*/}
                            {/*            onConfirm={() => this.UnitEnable(record.sn)}*/}
                            {/*            okText="确认"*/}
                            {/*            cancelText="取消"*/}
                            {/*        >*/}
                            {/*            <a>启用</a>*/}
                            {/*        </Popconfirm>*/}
                            {/*}*/}

                            {/*<Divider type="vertical"/>*/}
                            <Popconfirm
                                placement="topRight"
                                title="确认删除该单位？"
                                onConfirm={() => this.UnitDel(record.sn)}
                                okText="确认"
                                cancelText="取消"
                            >
                                <a style={{color: '#ff4757'}}>删除</a>
                            </Popconfirm>
                        </>
                    )
                }
            }
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

}

export default UnitManager;
