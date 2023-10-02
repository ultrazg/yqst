import React, {Component} from 'react';
import {Button, message, Input, Switch, Divider, Modal} from 'antd';
import ViewCoat from '../../../PublicModule/ViewCoat/ViewCoat';
import SWTable from 'SWViews/table';
import Model from './Model';
import moment from 'moment'
import difference from 'lodash/difference';
import union from 'lodash/union';
import {PlusOutlined} from '@ant-design/icons'

class SaContractList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listPar: {
                total: 0,
                current: 1,
                pageSize: 10,
                keyWord: '',
                sortType: 2,
                initiatorType: 2,
            },
            list: [],
            delVisible: false,
            delSn: null,
            selectedRowKeys: [],
        };
    }

    componentDidMount() {
        this.getContractTPage();
    }

    componentWillUnmount() {

    }

    render() {
        let {list, listPar, selectedRowKeys} = this.state;
        const columns = [
            {
                title: '合同模版名称',
                key: 'contractTemplateName',
                dataIndex: 'contractTemplateName',
            },
            {
                title: '模版类型',
                key: 'contractType',
                dataIndex: 'contractType',
            },
            {
                title: '启用',
                key: 'isEffective',
                dataIndex: 'isEffective',
                render: (res, data, idx) => {
                    return <Switch
                        defaultChecked={'' + res === '1'}
                        onChange={(checked) => {
                            Model.ContractTUpdate({
                                sn: data.sn,
                                state: checked ? 1 : 0
                            }, (res) => {
                                message.success('操作成功！', 1);
                            });
                        }}
                    />
                }
            },
            {
                title: '创建人',
                key: 'createPersonUserName',
                dataIndex: 'createPersonUserName',
            },
            {
                title: '创建日期',
                key: 'createTime',
                dataIndex: 'createTime',
                render: (res) => {
                    return res ? moment(res).format("YYYY-MM-DD HH:mm") : ''
                }
            },
            {
                title: '操作',
                key: '',
                dataIndex: '',
                width: 100,
                render: (res) => {
                    return <div>
                        <a
                            onClick={() => {
                                this.props.history.push(`/pages/appCenter/sellAssistant/terminalPage/saConTemplate/saContractEdit?sn=${res.sn}`);
                            }}
                        >
                            编辑
                        </a>
                        <Divider type="vertical"/>
                        <a style={{color: '#F12C20'}}
                           onClick={() => {
                               this.setState({delVisible: true, delSn: res.sn});
                           }}
                        >删除</a>
                    </div>
                }
            },
        ];
        const rowSelection = {
            selectedRowKeys,
            onChange: (rowKeys) => {
                let preChangeRowData = [];
                // 收集当前分页下的所有key
                const preKey = list.map(item => {
                    // 保存当前页面的选中的数据
                    rowKeys.forEach(cKey => {
                        if ('' + item.key === '' + cKey) {
                            preChangeRowData.push(item);
                            return false;
                        }
                    });
                    return item.key
                });

                // 去除当前页面选中的key，剩下当前页面未选中的key
                const noChangeRowKey = difference(preKey, rowKeys);

                // 合并所有选中的key，并去重
                selectedRowKeys = union(selectedRowKeys, rowKeys);

                // 去除之前选中过的值
                selectedRowKeys = difference(selectedRowKeys, noChangeRowKey);

                this.setState({selectedRowKeys});
            },
        };

        return (
            <ViewCoat
                breadCrumb={[
                    {title: '合同模板'},
                ]}
                // topView={<div>
                //     <Button>提交</Button>
                // </div>}
            >
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '14px',
                    }}
                >搜索</h3>
                <div>
                    关键词：
                    <Input placeholder="请输入关键词"
                           value={listPar.keyWord}
                           style={{
                               width: '272px',
                               height: '40px',
                               lineHeight: '40px',
                               fontSize: '14px',
                               marginLeft: '4px',
                               borderRadius: '6px',
                           }}
                           onChange={(e) => {
                               this.setState({listPar: {...listPar, keyWord: e.target.value}});
                           }}
                    />
                    <Button type="primary"
                            style={{
                                width: '80px',
                                height: '40px',
                                // lineHeight: '40px',
                                fontSize: '16px',
                                margin: '0px 16px',
                                borderRadius: '6px',
                            }}
                            onClick={() => {
                                this.getContractTPage(1);
                            }}
                    >搜索</Button>
                    <Button
                        style={{
                            width: '80px',
                            height: '40px',
                            // lineHeight: '40px',
                            fontSize: '16px',
                            borderRadius: '6px',
                        }}
                        onClick={() => {
                            this.setState({
                                listPar: {
                                    total: 0,
                                    current: 1,
                                    pageSize: 10,
                                    keyWord: '',
                                    sortType: 2,
                                },
                            }, () => {
                                this.getContractTPage();
                            });
                        }}
                    >重置</Button>
                </div>
                <div style={{margin: '24px 0px 26px'}}>
                    <Button type="primary" icon={<PlusOutlined/>}
                            style={{
                                width: '168px',
                                height: '40px',
                                // lineHeight: '40px',
                                fontSize: '16px',
                                marginRight: '16px',
                                borderRadius: '6px',
                            }}
                            onClick={() => {
                                this.props.history.push('/pages/appCenter/sellAssistant/terminalPage/saConTemplate/saContractEdit');
                            }}
                    >新增合同模版</Button>
                    <Button
                        style={{
                            width: '80px',
                            height: '40px',
                            // lineHeight: '40px',
                            fontSize: '16px',
                            borderRadius: '6px',
                        }}
                        disabled={selectedRowKeys.length <= 0}
                        onClick={() => {
                            this.setState({delSn: selectedRowKeys.join(','), delVisible: true});
                        }}
                    >删除</Button>
                </div>
                <SWTable
                    columns={columns}
                    dataSource={list}
                    rowSelection={rowSelection}
                    pagination={
                        {
                            total: listPar.total,
                            current: listPar.current,
                            pageSize: listPar.pageSize,
                            onChange: (a, b) => {
                                this.setState({
                                        listPar: {
                                            ...listPar,
                                            current: a,
                                        }
                                    },
                                    () => {
                                        this.getContractTPage();
                                    }
                                )
                            },
                            showTotal: (total, range) => `共有${total}条`
                        }
                    }
                />
                {this.makeDel()}
            </ViewCoat>
        );
    }

    getContractTPage(current) {
        let {listPar} = this.state;
        if (current)
            listPar.current = current;
        Model.ContractTPage({...listPar}, (res) => {
            const list = res.data.records && res.data.records.map(item => {
                return {
                    ...item,
                    key: item.sn
                }
            });
            this.setState({list, listPar: {...listPar, total: res.data.total}});
        });
    }

    makeDel() {
        let {delVisible, delSn} = this.state;
        return <Modal
            className={'Modal'}
            title="提示"
            width={246}
            visible={delVisible}
            closable={false}
            onOk={() => {
            }}
            onCancel={() => {
                this.setState({delSn: null, delVisible: false});
            }}
            footer={<div style={{textAlign: 'center'}}>
                <Button type="danger"
                        style={{
                            width: '64px',
                            height: '32px',
                            fontSize: '16px',
                            marginRight: '16px',
                            padding: '0px'
                        }}
                        onClick={() => {
                            Model.ContractTDel({sn: delSn}, (res) => {
                                message.success('删除成功！', 1);
                                this.setState({sn: null, delVisible: false, selectedRowKeys: []}, () => {
                                    this.getContractTPage()
                                });
                            });
                        }}
                >删除</Button>
                <Button
                    style={{width: '64px', height: '32px', fontSize: '16px', padding: '0px'}}
                    onClick={() => {
                        this.setState({delSn: null, delVisible: false});
                    }}
                >取消</Button>
            </div>}
        >
            <div style={{color: '#2B3441', fontSize: '14px', textAlign: 'center'}}>
                确认删除该合同模版？
            </div>
        </Modal>
    }
}

export default SaContractList;
