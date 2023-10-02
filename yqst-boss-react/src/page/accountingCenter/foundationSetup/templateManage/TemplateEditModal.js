import React, {Component} from 'react';
import {Modal, Form, Col, Input, Row, Button, Table, message} from 'antd';
import union from 'lodash/union';
import cloneDeep from 'lodash/cloneDeep';
import unionBy from 'lodash/unionBy';
import accountingModel from '../../model/accountingModel';
import moment from 'moment';
import Ellipsis from '../../../../baseview/Ellipsis';

let once = true;

class TemplateEditModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listCourseVO: [],
            dataSource: [],
            selectedRowKeys: [],
            searchCons: '',
            initDataSource: [],
            current: 1,
            pageSize: 10,
            total: 0,
            addBtnDisabled: false,
            subjectSelectedRowKeys: []
        };
    }

    componentDidMount() {
        this.getList();
        this.props.editModalThis(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps && nextProps.defaultValue && once === true) {
            once = false;
            let selectRowKeys = [];
            const {dataSource} = this.state;
            dataSource.forEach((item, index) => {
                nextProps.defaultValue.listCourseVO.forEach(item2 => {
                    if (item.courseId === item2.courseId) {
                        dataSource.splice(index, 1, item2);
                    }
                    selectRowKeys.push(item2.courseId);
                });
            });
            selectRowKeys = union(selectRowKeys);
            this.setState({
                subjectSelectedRowKeys: nextProps.subjectSelectedRowKeys,
                listCourseVO: cloneDeep(nextProps.defaultValue.listCourseVO),
                selectedRowKeys: selectRowKeys,
                dataSource,
                addBtnDisabled: nextProps.defaultValue.listCourseVO.length > 100
            });
        }
        if (nextProps && nextProps.defaultValue === undefined && once === true) {
            this.setState({
                subjectSelectedRowKeys: nextProps.subjectSelectedRowKeys
            });
        }
    }

    onOk = () => {
        this.props.form.validateFields((err, values) => {
            if (err) return;
            const {listCourseVO} = this.state;
            if (listCourseVO && listCourseVO.length === 0) {
                message.error('请至少选择一个标准科目');
                return;
            }
            listCourseVO.forEach(item => {
                item.mark = values.groupName;
                delete item.createTime;
                delete item.updateTime;
            });
            const newValue = {...values, listCourseVO};
            once = true;
            this.props.handleOk(newValue, this.state.selectedRowKeys);
        });
    };

    handleSearch = () => {
        this.getList(this.state.keyWord);
    };

    reset = () => {
        once = true;
        this.setState({
            listCourseVO: [],
            selectedRowKeys: [],
            searchCons: '',
            dataSource: this.state.initDataSource,
            total: this.state.initDataTotal,
            current: 1,
            keyWord: undefined,
            addBtnDisabled: false,
            subjectSelectedRowKeys: []
        });
        this.props.form.resetFields();
        this.props.resetDefaultValue();
    };

    // 获取页面 table 数据逻辑
    getList = (keyWord = this.state.keyWord, current = this.state.current) => {
        const {pageSize = this.state.pageSize} = this.state;
        const cons = {current, pageSize, keyWord};
        if (!keyWord) delete cons.keyWord;
        accountingModel.getAccountingList(cons, (res) => {
            if (res && res.data.records) {
                res.data.records.forEach(item => {
                    item.courseId = item.id;
                    delete item.id;
                });
            }
            if (!keyWord && current === 1) {
                this.setState({
                    dataSource: res.data.records,
                    current: res.data.current,
                    total: res.data.total,
                    initDataSource: JSON.parse(JSON.stringify(res.data.records)),
                    initDataTotal: JSON.parse(JSON.stringify(res.data.total))
                });
            } else {
                this.setState({
                    dataSource: res.data.records,
                    current: res.data.current,
                    total: res.data.total
                });
            }
        });
    };

    render() {
        let {visible, handleCancel, form, defaultValue} = this.props;
        let {dataSource, subjectSelectedRowKeys} = this.state;
        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 14}
        };
        const columns = [
            {title: '标准科目ID', dataIndex: 'courseId', key: 'courseId'},
            {
                title: '编号', dataIndex: 'courseSn', key: 'courseSn', render: text => (
                    <Ellipsis length={10} tooltip={true}>{text}</Ellipsis>
                )
            },
            {
                title: '标准科目名称', dataIndex: 'courseName', key: 'courseName', render: text => (
                    <Ellipsis length={10} tooltip={true}>{text}</Ellipsis>
                )
            },
            {
                title: '会计科目适用范围', dataIndex: 'courseRange', key: 'courseRange', render: text => (
                    <Ellipsis length={10} tooltip={true}>{text}</Ellipsis>
                )
            },
            {
                title: '创建时间', dataIndex: 'createTime', key: 'createTime', render: (text) => (
                    <span>{moment(text).format('YYYY-MM-DD')}</span>
                )
            }
        ];
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                const {listCourseVO} = this.state;
                let newData = [];
                let difference = difference(this.state.selectedRowKeys, selectedRowKeys);
                if (difference.length === 0) {
                    newData = listCourseVO.concat(selectedRows);
                    newData = unionBy(newData, 'courseId');
                } else {
                    difference.forEach(n => {
                        subjectSelectedRowKeys.forEach((item, index) => {
                            if (item === n) {
                                subjectSelectedRowKeys.splice(index, 1);
                            }
                        });
                        listCourseVO.forEach((item, index) => {
                            if (item.courseId === n) {
                                listCourseVO.splice(index, 1);
                            }
                        });
                    });
                    newData = listCourseVO;
                }
                this.setState({
                    listCourseVO: newData,
                    selectedRowKeys,
                    addBtnDisabled: newData.length > 100,
                    subjectSelectedRowKeys
                });
            },
            getCheckboxProps: record => {
                const other = record.courseId;
                let tag = false;
                if (subjectSelectedRowKeys) {
                    if (subjectSelectedRowKeys.indexOf(other) !== -1) {
                        tag = true;
                    }
                    if (this.state.selectedRowKeys.indexOf(other) !== -1) {
                        tag = false;
                    }
                }
                return {
                    disabled: tag
                };
            }
        };

        return (
            <Modal
                title="添加大类"
                visible={visible}
                onOk={this.onOk}
                onCancel={handleCancel}
                afterClose={this.reset}
                width={780}
                destroyOnClose
                footer={[
                    <span key={3}
                          style={{color: 'red', padding: '0 10px'}}>
                        {this.state.addBtnDisabled ? `当前选择个数${this.state.listCourseVO.length},不能超过 100 个` : ''}
                    </span>,
                    <Button key={2} type='default' onClick={handleCancel}>取消</Button>,
                    <Button disabled={this.state.addBtnDisabled} key={1} type='primary' onClick={this.onOk}>确定</Button>
                ]}
            >
                <Form onSubmit={this.onOk}>
                    <Row style={{paddingLeft: 30}}>
                        <Col span={18}>
                            {
                                defaultValue ?
                                    <Col span={24} style={{display: 'none'}}>
                                        <Form.Item
                                            label={<span style={{fontSize: 16, fontWeight: 'bold'}}>大类ID</span>}
                                            {...formItemLayout}
                                        >
                                            {form.getFieldDecorator(`id`, {
                                                initialValue: defaultValue && defaultValue.id
                                            })(
                                                <Input autoComplete='off'/>
                                            )}
                                        </Form.Item>
                                    </Col> : null
                            }
                            <Col span={24}>
                                <Form.Item
                                    label={<span style={{fontSize: 16, fontWeight: 'bold'}}>大类名称</span>}
                                    {...formItemLayout}
                                >
                                    {form.getFieldDecorator(`groupName`, {
                                        initialValue: defaultValue && defaultValue.groupName,
                                        rules: [{required: true, message: '大类名称为必填项'}]
                                    })(
                                        <Input maxLength={30} autoComplete='off'/>
                                    )}
                                </Form.Item>
                            </Col>
                        </Col>
                    </Row>
                </Form>
                <Row style={{paddingLeft: 30, borderBottom: '1px solid #e8e8e8', marginBottom: 10}}>
                    <h3>添加标准科目</h3>
                </Row>
                <Row>
                    <Col span={24}>
                        <Col span={18}>
                            <Form.Item
                                label={<span style={{fontSize: 14}}>ID/编号/科目名称</span>}
                                {...formItemLayout}
                                labelCol={{span: 6}}
                            >
                                <Input onChange={(e) => {
                                    this.setState({keyWord: e.target.value});
                                }}/>
                            </Form.Item>
                        </Col>
                        <Col span={2} style={{marginTop: 5}}>
                            <Button type='primary' onClick={this.handleSearch}>搜索</Button>
                        </Col>
                    </Col>
                    <Col span={24}>
                        <Table
                            dataSource={dataSource}
                            columns={columns}
                            rowKey='courseId'
                            rowSelection={rowSelection}
                            pagination={{
                                defaultCurrent: this.state.current,
                                total: this.state.total,
                                onChange: (current) => {
                                    this.getList(this.state.keyWord, current);
                                }
                            }}
                        />
                    </Col>
                </Row>
            </Modal>
        );
    }
}

export default TemplateEditModal;
