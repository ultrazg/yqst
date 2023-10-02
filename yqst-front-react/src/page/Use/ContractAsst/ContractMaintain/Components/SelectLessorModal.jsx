import React, {Component} from 'react';
import {Modal, Input, Button} from "antd";
import SWTable from 'SWViews/table';
import request from "../../../../../utils/request/request";
import Api from "../Api/Api";

class SelectLessorModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            total: 0,
            requestPar: {
                current: 1,
                pageSize: 10,
                keyWord: ''
            },
        }
    }

    componentDidMount() {
        this.getList();
    }

    getList = () => {
        request(Api.SelectLessorList, this.state.requestPar, res => {
            this.state.total = res.data.total || 0;
            this.setState({
                list: res.data.records || [],
                total: this.state.total || 0,
            });
        });
    }

    render() {
        return (
            <>
                <Modal
                    title="选择出租方"
                    visible={true}
                    width={'60%'}
                    style={{top: 10}}
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
                                    current: 1,
                                    pageSize: 10,
                                    keyWord: ''
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
                    return <a onClick={() => {
                        this.props.onSelect && this.props.onSelect(record)
                    }}>选择</a>
                }
            },
            {
                title: '出租单位',
                key: 'lessorName',
                dataIndex: 'lessorName',
                width: '45%',
                render: (text) => {
                    return <span className={'text-elli2'}>{text}</span>
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
                        showTotal: (total, range) => `共有${total}条数据`
                    }
                }
            />
        </div>
    }

}

export default SelectLessorModal;