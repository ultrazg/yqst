import React, {Component} from 'react';
import {Modal, Table, message} from 'antd';
import moment from 'moment';
import get from 'lodash/get';
import merge from 'lodash/merge';
import cloneDeep from 'lodash/cloneDeep';
import accountingModel from '../../model/accountingModel';
import Ellipsis from '../../../../baseview/Ellipsis';
import Comparison from '../../../../utils/Comparison';

const pageApi = accountingModel.businessNodePage;

class BusinessNodeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageSize: 10,
            current: 1,
            selectedRowKeys: undefined,
            selectedRows: undefined,
            pageOneData: [],
            id: undefined
        };
    }

    componentDidMount() {
        this.props.getNodeModalThis(this);
    }

    componentWillUnmount() {

    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps && nextProps.visible === true) {
            this.getList();
        }
        if (nextProps.defaultValue) {
            this.setState({
                selectedRowKeys: [get(nextProps, 'defaultValue.nid')] || [],
                selectedRows: get(nextProps, 'defaultValue'),
                id: get(nextProps, 'defaultValue.id')
            });
        } else {
            this.setState({
                current: 1,
                selectedRowKeys: undefined,
                selectedRows: undefined,
                id: undefined
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !Comparison(nextProps, this.props) || !Comparison(nextState, this.state);
    }

    clear = () => {
        this.setState({
            current: 1,
            list: cloneDeep(this.state.pageOneData),
            selectedRowKeys: undefined,
            selectedRows: undefined,
            id: undefined
        });
    };

    getList = (current = this.state.current, keyWord) => {
        const {pageSize} = this.state;
        const cons = {current, pageSize, keyWord};
        if (!keyWord) delete cons.keyWord;
        pageApi(cons, (res) => {
            if (get(res, 'data.records')) {
                let newRes = cloneDeep(res.data.records);
                newRes.forEach(item => {
                    item.nid = item.id;
                    delete item.id;
                });
                if (current === 1) {
                    this.setState({
                        list: newRes,
                        pageOneData: cloneDeep(newRes),
                        total: res.data.total,
                        current: res.data.current
                    });
                } else {
                    this.setState({
                        list: newRes,
                        total: res.data.total,
                        current: res.data.current
                    });
                }
            }
        });
    };

    handleOk = () => {
        if (this.state.selectedRows === undefined) {
            message.error('请选择一个业务节点');
            return;
        }
        if (this.state.id) {
            merge(this.state.selectedRows, {id: this.state.id});
            this.props.onOk(this.state.selectedRows);
        } else {
            this.props.onOk(this.state.selectedRows);
        }
        this.props.handleCancel();
    };

    render() {
        const {visible, handleCancel} = this.props;
        return (
            <Modal
                title="选择业务节点"
                width={1024}
                destroyOnClose
                visible={visible}
                onOk={this.handleOk}
                onCancel={handleCancel}
                afterClose={this.clear}
            >
                {this.makeTable()}
            </Modal>
        );
    }

    // 生成 Table
    makeTable = () => {
        const columns = [
            {title: '节点 ID', key: 'nid', dataIndex: 'nid'},
            {
                title: '节点编号', key: 'nodeSn', dataIndex: 'nodeSn', render: (text) => (
                    <Ellipsis length={15} tooltip>{text}</Ellipsis>
                )
            },
            {
                title: '节点名称', key: 'name', dataIndex: 'name', render: (text) => (
                    <Ellipsis length={10} tooltip>{text}</Ellipsis>
                )
            },
            {
                title: '节点描述', key: 'memo', dataIndex: 'memo', render: (text) => (
                    <Ellipsis length={10} tooltip>{text}</Ellipsis>
                )
            },
            {
                title: '创建时间', key: 'createTime', dataIndex: 'createTime', render: (text) => (
                    <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>
                )
            }
        ];
        const toggleRadio = (record) => {
            this.setState({
                selectedRowKeys: [record.nid],
                selectedRows: record
            });
        };
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            type: 'radio',
            onChange: (selectedRowKeys, selectedRows) => {
                toggleRadio(selectedRows[0]);
            }
        };
        return (
            <Table
                columns={columns}
                dataSource={this.state.list}
                rowKey="nid"
                rowSelection={rowSelection}
                onRow={record => {
                    return {
                        onClick: event => toggleRadio(record)
                    };
                }}
                pagination={{
                    total: this.state.total,
                    current: this.state.current,
                    pageSize: this.state.size,
                    onChange: (current) => {
                        this.getList(current);
                    },
                    showTotal: (total) => `共有${total}条`
                }}
            />
        );
    };
}

export default BusinessNodeModal;
