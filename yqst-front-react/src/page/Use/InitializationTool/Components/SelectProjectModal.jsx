import React, {Component} from 'react';
import {Modal, Button, Input} from "antd";
import SWTable from 'SWViews/table';
import Model from "../Model";

class SelectProjectModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            total: 0,
            requestPar: {
                current: 1,
                pageSize: 10,
                lesseeSn: this.props.lesseeSn || '',
                keyWord: ''
            },
        }
    }

    componentDidMount() {
        // const lesseeSn = this.props.lesseeSn;
        // this.setState({
        //     requestPar: {
        //         ...this.state.requestPar,
        //         lesseeSn
        //     }
        // }, () => {
        //     this.getList();
        // });
        this.getList();
    }

    // 获取项目
    getList = () => {
        // projectType 1.特供
        Model.LessorUsePage({
            ...this.state.requestPar,
            // projectType: 1
        }, res => {
            this.state.total = res.data.total || 0;
            this.setState({
                list: res.data.records || [],
                total: this.state.total || 0,
            }, err => {
            });
        });
    }

    render() {
        return (
            <>
                <Modal
                    title="选择项目"
                    width={'60%'}
                    visible={true}
                    footer={null}
                    onCancel={() => {
                        this.props.onClose && this.props.onClose()
                    }}>
                    <p>
                        关键词：
                        <Input
                            placeholder='请输入关键词'
                            style={{width: 300}}
                            value={this.state.requestPar.keyWord}
                            onChange={e => this.setState({
                                requestPar: {
                                    ...this.state.requestPar,
                                    keyWord: e.target.value
                                }
                            })}
                        />
                        <Button
                            type='primary'
                            style={{marginLeft: 20, marginRight: 20}}
                            onClick={() => {
                                this.setState({
                                    requestPar: {
                                        ...this.state.requestPar,
                                        current: 1
                                    }
                                }, () => {
                                    this.getList();
                                });
                            }}
                        >
                            搜索
                        </Button>
                        <Button onClick={() => {
                            this.setState({
                                requestPar: {
                                    ...this.state.requestPar,
                                    keyWord: '',
                                    current: 1
                                }
                            }, () => {
                                this.getList();
                            });
                        }}>重置</Button>
                    </p>
                    {this.makeTable()}
                </Modal>
            </>
        );
    }

    makeTable() {
        let {list, requestPar} = this.state;
        const columns = [
            {
                title: '操作',
                key: 'isChose',
                dataIndex: 'isChose',
                width: '5%',
                render: (res, record) => {
                    return <Button type={'link'} disabled={record.isExistInit === 1} onClick={() => {
                        this.props.onSelect && this.props.onSelect(record)
                    }}>选择</Button>
                }
            },
            {
                title: '项目名称',
                key: 'projectName',
                dataIndex: 'projectName',
                width: '45%',
                render: (text) => {
                    return <span className={'text-elli2'}>{text}</span>
                }
            },
            {
                title: '备注',
                width: '20%',
                key: 'isExistInit',
                dataIndex: 'isExistInit',
                render: (text) => {
                    return <span>{text === 1 ? '该项目已存在初始化' : ''}</span>
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
                        showTotal: (total, range) => `共有${total}条数据`
                    }
                }
            />
        </div>
    }

}

export default SelectProjectModal;
