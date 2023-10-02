import React, {Component} from 'react';
import {Button, message, Input, Divider, Modal} from 'antd';
import ViewCoat from '../../../PublicModule/ViewCoat/ViewCoat';
import SWTable from 'SWViews/table';
import Model from './Model';
import moment from 'moment'
import difference from 'lodash/difference';
import union from 'lodash/union';
import {PlusOutlined} from '@ant-design/icons'

class SaComLabList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listPar: {
                total: 0,
                current: 1,
                pageSize: 10,
                keyWord: '',
                sortType: 2,
            },
            list: [],
            editVisible: null,
            delVisible: false,
            editPar: {
                sn: '',
                contractTemplateTypeSn: '',
                contractTemplateTypeName: ''
            },
            delSn: null,
            selectedRowKeys: [],
        };
    }

    componentDidMount() {
        // this.getContractTTPage();
    }

    componentWillUnmount() {

    }

    render() {
        let {listPar, list = [], selectedRowKeys} = this.state;
        const columns = [
            {
                title: '合同模版类型编号',
                key: 'contractTemplateTypeSn',
                dataIndex: 'contractTemplateTypeSn',
            },
            {
                title: '合同模版类型名称',
                key: 'contractTemplateTypeName',
                dataIndex: 'contractTemplateTypeName',
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
                                this.setState({
                                    editVisible: '编辑',
                                    editPar: res
                                });
                            }}
                        >
                            编辑
                        </a>
                        <Divider type="vertical"/>
                        <a style={{color: '#F12C20'}}
                           onClick={() => {
                               this.setState({delVisible: true, delSn: res.sn});
                           }}
                        >
                            删除
                        </a>
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
                    {title: '商品标签'},
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
                           style={{
                               width: '272px',
                               height: '40px',
                               lineHeight: '40px',
                               fontSize: '14px',
                               marginLeft: '4px',
                               borderRadius: '6px',
                           }}
                           value={listPar.keyWord}
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
                                this.getContractTTPage(1);
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
                                this.getContractTTPage();
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
                                this.setState({editVisible: '新增'});
                            }}
                    >新增商品标签</Button>
                    <Button
                        disabled={selectedRowKeys.length <= 0}
                        style={{
                            width: '80px',
                            height: '40px',
                            // lineHeight: '40px',
                            fontSize: '16px',
                            borderRadius: '6px',
                        }}
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
                                        this.getContractTTPage();
                                    }
                                )
                            },
                            showTotal: (total, range) => `共有${total}条`
                        }
                    }
                />
                {this.makeEdit()}
                {this.makeDel()}
            </ViewCoat>
        );
    }

    getContractTTPage(current) {
        let {listPar} = this.state;
        if (current)
            listPar.current = current;
        Model.ContractTTPage({...listPar}, (res) => {
            const list = res.data.records && res.data.records.map(item => {
                return {
                    ...item,
                    key: item.sn,
                }
            });
            if (list.length <= 0 && listPar.current !== 1)
                this.getContractTTPage(--listPar.current);
            else
                this.setState({list, listPar: {...listPar, total: res.data.total}});
        });
    }

    makeEdit() {
        let {editVisible, editPar} = this.state;
        return (
            <Modal
                className={'Modal'}
                title={editVisible === '新增' ? "新增合同模板类型" : '编辑合同模板类型'}
                width={546}
                visible={editVisible ? true : false}
                closable={false}
                onOk={() => {
                }}
                onCancel={() => {
                    this.setState({
                        editVisible: null,
                        editPar: {
                            sn: '',
                            contractTemplateTypeSn: '',
                            contractTemplateTypeName: ''
                        },
                    });
                }}
                footer={<div>
                    <Button type="primary"
                            style={{
                                width: '64px',
                                height: '32px',
                                lineHeight: '32px',
                                fontSize: '16px',
                                marginRight: '16px'
                            }}
                            onClick={() => {
                                if (!editPar.contractTemplateTypeSn)
                                    return message.error('合同模板编码不能为空！');

                                if (!editPar.contractTemplateTypeName)
                                    return message.error('合同模板编码不能名称！');

                                Model.ContractTTSave({
                                    sn: editVisible === '编辑' ? editPar.sn : '',
                                    contractTemplateTypeSn: editPar.contractTemplateTypeSn,
                                    contractTemplateTypeName: editPar.contractTemplateTypeName,
                                }, (res) => {
                                    message.success('保存成功！');
                                    this.setState({
                                        editVisible: null,
                                        editPar: {
                                            sn: '',
                                            contractTemplateTypeSn: '',
                                            contractTemplateTypeName: ''
                                        },
                                        listPar: {
                                            total: 0,
                                            current: 1,
                                            pageSize: 10,
                                            keyWord: '',
                                            sortType: 2,
                                        },
                                    }, () => {
                                        this.getContractTTPage();
                                    });
                                });
                            }}
                    >确认</Button>
                    <Button
                        style={{width: '64px', height: '32px', lineHeight: '32px', fontSize: '16px'}}
                        onClick={() => {
                            this.setState({
                                editVisible: null,
                                editPar: {
                                    sn: '',
                                    contractTemplateTypeSn: '',
                                    contractTemplateTypeName: ''
                                },
                            });
                        }}
                    >取消</Button>
                </div>}
            >
                <div style={{marginBottom: '16px'}}>
                    <span style={{color: 'rgba(43,52,65,0.65', marginRight: '9px'}}>合同模版编号</span>
                    <Input placeholder="请输入"
                           style={{
                               width: '405px',
                               height: '40px',
                               lineHeight: '40px',
                               fontSize: '16px',
                               color: '#2B3441'
                           }}
                           value={editPar.contractTemplateTypeSn}
                           maxLength={10}
                           onChange={(e) => {
                               let reg = /^[0-9]+$/;
                               if (!reg.test(e.target.value) && e.target.value)
                                   return message.error('合同模版编号只能填写数字！', 1);
                               editPar.contractTemplateTypeSn = e.target.value;
                               this.setState({editPar});
                           }}
                    />
                </div>
                <div style={{marginBottom: '16px'}}>
                    <span style={{color: 'rgba(43,52,65,0.65', marginRight: '9px'}}>合同模版名称</span>
                    <Input placeholder="请输入"
                           style={{
                               width: '405px',
                               height: '40px',
                               lineHeight: '40px',
                               fontSize: '16px',
                               color: '#2B3441'
                           }}
                           value={editPar.contractTemplateTypeName}
                           maxLength={10}
                           onChange={(e) => {
                               editPar.contractTemplateTypeName = e.target.value;
                               this.setState({editPar});
                           }}
                    />
                </div>
            </Modal>
        );
    }

    makeDel() {
        let {delVisible, delSn} = this.state;
        return <Modal
            className={'Modal'}
            title="提示"
            width={546}
            visible={delVisible}
            closable={false}
            onOk={() => {
            }}
            onCancel={() => {
                this.setState({delSn: null, delVisible: false});
            }}
            footer={<div>
                <Button type="danger"
                        style={{
                            width: '64px',
                            height: '32px',
                            lineHeight: '32px',
                            fontSize: '16px',
                            marginRight: '16px'
                        }}
                        onClick={() => {
                            Model.ContractTTDel({sn: delSn}, (res) => {
                                message.success('删除成功！', 1);
                                this.setState({sn: null, delVisible: false, selectedRowKeys: []}, () => {
                                    this.getContractTTPage()
                                });
                            });
                        }}
                >删除</Button>
                <Button
                    style={{width: '64px', height: '32px', lineHeight: '32px', fontSize: '16px'}}
                    onClick={() => {
                        this.setState({delSn: null, delVisible: false});
                    }}
                >取消</Button>
            </div>}
        >
            <div style={{color: '#2B3441', fontSize: '14px', textAlign: 'center', lineHeight: '100px'}}>
                确认删除该合同模版？
            </div>
        </Modal>
    }

}

export default SaComLabList;
