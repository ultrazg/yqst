import React, {Component} from 'react';
import CostAssistantModel from "../../CostAssistantModel";
import EntryDetailModal from "./EntryDetailModal";
import {Button, Input, Modal} from 'antd';
import SWTable from 'SWViews/table';

class SelectEntryModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            total: 0,
            entryDetailModalVisi: false,
            leaseEntrySn: '',
            requestPar: {
                current: 1,
                pageSize: 10,
                keyWord: '',
                projectSn: this.props.projectSn || '',
                feeType: this.props.feeType || ''
            }
        };
        this.columns = [
            {
                title: '操作',
                key: 'isChose',
                dataIndex: 'isChose',
                render: (res, record) => {
                    return <>
                        {/*<Button type={'link'} onClick={() => {*/}
                        {/*    this.props.onSelect && this.props.onSelect(record)*/}
                        {/*}}>选择</Button>*/}
                        <Button type={'link'} onClick={() => {
                            this.setState({
                                leaseEntrySn: record.leaseEntrySn || '',
                                entryDetailModalVisi: true
                            });
                        }}>详情</Button>
                    </>
                }
            },
            {
                title: '进场单号',
                render: record => {
                    return <span>{record.leaseEntrySn}</span>
                }
            },
            {
                title: '进场时间',
                render: record => <span>{record.entryTime ? record.entryTime : ''}</span>
            },
            {
                title: '车牌号',
                render: record => <span>{record.licensePlateNumber ? record.licensePlateNumber : '无'}</span>
            },
            {
                title: '项目名称',
                render: record => <span>{record.projectName ? record.projectName : ''}</span>
            },
        ]
    }

    componentDidMount() {
        this.getList();
    }

    render() {
        return (
            <>
                <Modal
                    title="选择进场单"
                    visible={true}
                    width={'70%'}
                    style={{top: 20}}
                    footer={null}
                    onCancel={() => {
                        this.props.onClose && this.props.onClose()
                    }}
                >
                    <label>关键词：</label>
                    <Input
                        style={{width: 120}}
                        value={this.state.requestPar.keyWord}
                        placeholder='请输入关键词'
                        maxLength={10}
                        onChange={e => this.setState({requestPar: {...this.state.requestPar, keyWord: e.target.value}})}
                    />
                    <Button style={{marginLeft: 20, marginRight: 20}} type='primary' onClick={() => {
                        this.setState({
                            requestPar: {
                                ...this.state.requestPar,
                                current: 1
                            }
                        }, () => {
                            this.getList();
                        });
                    }}>搜索</Button>
                    <Button onClick={() => {
                        this.setState({
                            requestPar: {
                                ...this.state.requestPar,
                                current: 1,
                                pageSize: 10,
                                keyWord: ''
                            }
                        }, () => {
                            this.getList();
                        });
                    }}>重置</Button>
                    <SWTable
                        columns={this.columns}
                        dataSource={this.state.data}
                        style={{marginTop: 20}}
                        pagination={
                            {
                                total: this.state.total,
                                current: this.state.requestPar.current,
                                pageSize: this.state.requestPar.pageSize,
                                onChange: (a, b) => {
                                    let obj = this.state.requestPar;
                                    obj.current = a;
                                    this.setState({requestPar: obj}, () => {
                                        this.getList();
                                    })
                                },
                                showTotal: (total, range) => `共有${total}条数据`
                            }
                        }
                    />
                </Modal>
                {
                    this.state.entryDetailModalVisi
                        ? <EntryDetailModal
                            isShowBtn={true}
                            onSelect={this.props.onSelect}
                            leaseEntrySn={this.state.leaseEntrySn}
                            onClose={() => {
                                this.setState({
                                    entryDetailModalVisi: false
                                });
                            }}
                        />
                        : null
                }
            </>
        );
    }

    getList = () => {
        CostAssistantModel.LessorEntryPage(this.state.requestPar, res => {
            this.setState({
                total: res.data.total || 0,
                data: res.data.records || []
            });
        });
    }
}

export default SelectEntryModal;