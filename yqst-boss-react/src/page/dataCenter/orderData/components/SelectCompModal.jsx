import React, {Component} from 'react';
import {Modal, Button, Input} from "antd";
import SWTable from 'SWViews/table';
import request from "../../../../utils/request/request";
import Api from '../../Api';

/**
 * 选择企业弹窗
 */
class SelectProjectModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            total: 0,
            requestPar: {
                current: 1, // 当前页
                pageSize: 10, // 每页大小
                keyWord: '' // 关键词（企业名称）
            },
        }
    }

    componentDidMount() {
        this.getList();
    }

    getList = () => {
        request(
            Api.userAccountPage,
            {...this.state.requestPar},
            res => {
                this.setState({
                    list: res.data.records || [],
                    total: res.data.total || 0
                });
            }
        );
    }

    render() {
        return (
            <>
                <Modal
                    title="选择企业"
                    visible={true}
                    width={'50%'}
                    footer={null}
                    onCancel={() => {
                        this.props.onClose && this.props.onClose()
                    }}>
                    {this.makeSearchBar()}
                    {this.makeTable()}
                </Modal>
            </>
        );
    }

    makeSearchBar = () => {
        return (
            <span>
                关键字：
                <Input
                    placeholder='输入关键词'
                    style={{width: 300, marginRight: 20}}
                    value={this.state.requestPar.keyWord}
                    onChange={e => {
                        this.setState({
                            requestPar: {
                                ...this.state.requestPar,
                                keyWord: e.target.value
                            }
                        });
                    }}
                    maxLength={15}
                />
                <Button
                    type='primary'
                    style={{
                        marginRight: 20
                    }}
                    onClick={() => {
                        this.getList();
                    }}
                >
                    搜索
                </Button>
                <Button onClick={() => {
                    this.setState({
                        requestPar: {
                            ...this.state.requestPar,
                            keyWord: ''
                        }
                    }, () => {
                        this.getList();
                    });
                }}>
                    重置
                </Button>
            </span>
        )
    }

    makeTable() {
        let {list, requestPar} = this.state;
        const columns = [
            {
                title: '操作',
                width: '10%',
                render: (res, record) => {
                    return <Button type={'link'} onClick={() => {
                        this.props.onSelect && this.props.onSelect(record)
                    }}>选择</Button>
                }
            },
            {
                title: '企业名称',
                key: 'companyName',
                dataIndex: 'companyName',
                width: '45%',
                render: (text) => {
                    return <span className={'text-elli2'}>{text}</span>
                }
            },
        ];
        return <div style={{marginTop: 20}}>
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
