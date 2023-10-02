import React, {PureComponent} from 'react';
import {Modal, Input, Button} from "antd";
import SWTable from 'SWViews/table';
import request from "../../../../../../utils/request/request";
import moment from 'moment';

class MaintainModifyListModal extends PureComponent {
    requestParams = {};

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            total: 0,
            requestPar: {
                current: 1,
                pageSize: 10,
                keyWord: '',
                sn: this.props.sn
            },
        }
    }

    componentDidMount() {
        this.getList();
    }

    getList = () => {
        request('/api/v1/contract/maintenance/contract/supplement/page', this.state.requestPar, res => {
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
                    title={'维保合同修改记录'}
                    visible={true}
                    width={'70%'}
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
                title: '合同编号',
                key: 'businessSn',
                dataIndex: 'businessSn',
                width: '30%'
            },
            {
                title: '提交人名称',
                key: 'submitterName',
                dataIndex: 'submitterName',
                width: '30%',
                render: (text) => {
                    return <span className={'text-elli2'}>{text}</span>
                }
            },
            {
                title: '提交时间',
                key: 'submitTime',
                dataIndex: 'submitTime',
                width: '30%',
                render: (text) => {
                    let arr = text ?
                        moment(text).format("YYYY-MM-DD HH:mm:ss").split(" ")
                        : null;
                    return arr ? <span>{arr[0]}<br/>{arr[1]}</span> : "";
                }
            },
            {
                title: '操作',
                key: 'opera',
                dataIndex: 'opera',
                width: 70,
                render: (text, rec) => {
                    return <a onClick={() => {
                        this.props.preview({sn: rec.sn})
                    }}>查看</a>
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

export default MaintainModifyListModal;
