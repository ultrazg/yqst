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

class UnitSelectModal extends Component {
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
                status: 1,  // 状态 0.全部 1.启用 2.停用
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
            <Modal style={{top: 20}} visible={true} footer={null} onCancel={() => {
                this.props.onClose && this.props.onClose()
            }}>
                {this.makeTable()}
            </Modal>
        );
    }

    onChangeHandle = value => {
        this.setState({
            requestPar: {
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

    makeTable() {
        let {list, requestPar} = this.state;
        const columns = [
            {
                title: '操作',
                key: 'isChose',
                dataIndex: 'isChose',
                width: '15%',
                render: (res, record) => {
                    return <a onClick={() => {
                        this.props.onSelect && this.props.onSelect(record)
                    }}>选择</a>
                }
            },
            {
                title: '单位编码',
                key: 'sn',
                dataIndex: 'sn',
                width: '40%',
                render: (text) => {
                    return <span className={'text-elli2'}>{text}</span>
                }
            },
            {
                title: '单位',
                key: 'unit',
                dataIndex: 'unit',
                width: '45%',
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
                        showTotal: (total, range) => `共有${total}条`
                    }
                }
            />
        </div>
    }
}

export default UnitSelectModal;
