import React, {Component} from 'react';
import {Button, Modal, Input} from 'antd';
import SWTable from 'SWViews/table';
import CostAssistantModel from "../../CostAssistantModel";

/**
 * 选择项目modal
 */
class SelectProjectModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            total: 0,
            requestPar: {
                current: 1,
                pageSize: 10,
                keyWord: '',
                lesseeSn: this.props.lesseeSn || ''
            }
        };
        this.columns = [
            {
                title: '操作',
                key: 'isChose',
                dataIndex: 'isChose',
                render: (res, record) => {
                    return <Button type={'link'} onClick={() => {
                        this.props.onSelect && this.props.onSelect(record)
                    }}>选择</Button>
                }
            },
            {
                title: '名称',
                render: record => {
                    return <span>{record.projectName}</span>
                }
            }
        ]
    }

    componentDidMount() {
        this.getList();
    }

    render() {
        return (
            <Modal
                title="选择项目"
                visible={true}
                footer={null}
                style={{top: 20}}
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
        );
    }

    getList = () => {
        CostAssistantModel.LessorProjectPage(this.state.requestPar, res => {
            this.setState({
                total: res.data.total || 0,
                data: res.data.records || []
            });
        });
    }
}

export default SelectProjectModal;