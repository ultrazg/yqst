import React, {Component} from 'react';
import {PlusOutlined} from '@ant-design/icons';
import {Button, Divider, Input, message, Modal, Switch} from 'antd';
import '../PurchasingAssistant.less'
import ViewCoat from '../../PublicModule/ViewCoat/ViewCoat';
import Model from "./Model";
import SWTable from 'SWViews/table';
import moment from 'moment'
import difference from 'lodash/difference';
import union from 'lodash/union';

const detailPath = '/pages/appCenter/purchasingAssistant/paIndex/PaContractTemplate/PaContractTemplateDetail'

class PaContractTemplateList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listPar: {
                total: 0,
                current: 1,
                pageSize: 10,
                keyWord: '',
                sortType: 2,
                initiatorType: 1,
                shopSn: null,
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
        return (
            <ViewCoat
                breadCrumb={[
                    {title: '合同模板'},
                ]}
                // topView={<div>
                //     <Button>提交</Button>
                // </div>}
            >
                <h4 style={{marginBottom: 12}}>搜索</h4>
                {/*	搜索区域 */}
                {this.renderSearch()}
                {/*	操作按钮区域 */}
                {this.renderOperationButton()}
                {/* 表格区域 */}
                {this.renderTable()}
                {/*删除弹出的确认框*/}
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

    renderSearch = () => {
        let {listPar} = this.state;

        return (
            <div>
                <label
                    style={{fontSize: 14, fontWeight: 500, lineHeight: '20px', marginRight: 8}}
                >
                    关键词 :
                </label>
                <Input
                    style={{width: 272, height: 40, fontSize: '14px'}}
                    value={listPar.keyWord}
                    placeholder={'请输入关键字'}
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
                    style={{width: 96, height: 40, fontSize: 16, verticalAlign: 'bottom'}}
                    onClick={() => {
                        this.setState({
                            listPar: {
                                ...listPar,
                                total: 0,
                                current: 1,
                                keyWord: '',
                            },
                        }, () => {
                            this.getContractTPage();
                        });
                    }}
                >
                    重置
                </Button>
            </div>
        )
    }

    renderOperationButton = () => {
        let {selectedRowKeys} = this.state;

        return (
            <div style={{marginTop: 24}}>
                <Button
                    className={'operation-btn-style'}
                    type='primary'
                    onClick={() => {
                        this.props.history.push(detailPath)
                    }}
                >
                    <PlusOutlined/>
                    新增合同模板
                </Button>
                <Button
                    className={'operation-btn-style'}
                    style={{marginLeft: 16}}
                    disabled={selectedRowKeys.length <= 0}
                    onClick={() => {
                        this.setState({delSn: selectedRowKeys.join(','), delVisible: true});
                    }}
                >
                    删除
                </Button>
            </div>
        );
    }

    renderTable = () => {
        let {list, selectedRowKeys, listPar} = this.state;
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
                                this.props.history.push(detailPath + `?sn=${res.sn}`);
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
            <div className={'sw-table'} style={{marginTop: 26}}>
                <SWTable
                    columns={columns}
                    dataSource={list}
                    // rowKey={'id'}
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
            </div>
        )
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

export default PaContractTemplateList;
