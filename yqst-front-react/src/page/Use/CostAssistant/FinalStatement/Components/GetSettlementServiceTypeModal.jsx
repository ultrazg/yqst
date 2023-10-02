import React, {Component} from 'react';
import {Button, Modal} from 'antd';
import SWTable from 'SWViews/table';
import CostAssistantModel from "../../CostAssistantModel";

/**
 * 选择业务类型modal
 */
class GetSettlementServiceTypeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            total: 0,
            requestPar: {
                current: 1,
                pageSize: 10,
                keyWord: ''
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
                title: '类型',
                render: record => {
                    return <span>{record.serviceName}</span>
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
                title="选择业务类型"
                visible={true}
                footer={null}
                onCancel={() => {
                    this.props.onClose && this.props.onClose()
                }}
            >
                <SWTable
                    columns={this.columns}
                    dataSource={this.state.data}
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
        CostAssistantModel.CostAsstGetSettlementServiceTypeList(this.state.requestPar, res => {
            this.setState({
                total: res.data.total || 0,
                data: res.data.records || []
            });
        })
    }
}

export default GetSettlementServiceTypeModal;