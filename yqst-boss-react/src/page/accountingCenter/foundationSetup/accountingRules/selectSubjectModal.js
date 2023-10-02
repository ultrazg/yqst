import React, {Component} from 'react';
import {Button, Col, Input, Modal, Row, Table, Tree, message, Spin} from 'antd';
import {MinusSquareOutlined, PlusSquareOutlined} from '@ant-design/icons';
import get from 'lodash/get';
import isNumber from 'lodash/isNumber';
import compact from 'lodash/compact';
import cloneDeep from 'lodash/cloneDeep';
import uniq from 'lodash/uniq';
import accountingModel from '../../model/accountingModel';
import Comparison from '../../../../utils/Comparison';
import Ellipsis from '../../../../baseview/Ellipsis';

const {TreeNode} = Tree;

class SelectSubjectModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            templateDetailLoading: false,
            selectedRowKeys: [],
            treeSelectKey: [],
            submitData: {},
            expandedKeys: [],
            autoExpandParent: true,
            expandedRowKeys: []
        };
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps && nextProps.templateData) {
            this.setState({
                templateData: nextProps.templateData
            });
        }
        if (nextProps.defaultValue && get(nextProps, 'defaultValue.id')) {
            if (get(nextProps, 'type') === 0) {
                const sns = nextProps.defaultValue.debitCatSn.split('-');
                let rowsExpand;
                if (isNumber(parseInt(sns[0], 10))) {
                    rowsExpand = parseInt(sns[0], 10);
                } else {
                    rowsExpand = sns[0];
                }
                if (get(nextProps, 'defaultValue.debitCatId') !== 0) {
                    this.setState({
                        treeSelectKey: [get(nextProps, 'defaultValue.debitCatId') + ''],
                        expandedKeys: compact(sns),
                        expandedRowKeys: [rowsExpand]
                    });
                } else {
                    this.setState({
                        selectedRowKeys: [get(nextProps, 'defaultValue.debitCourseId')]
                    });
                }
            } else {
                if (get(nextProps, 'defaultValue.creditCatId') !== 0) {
                    const sns = nextProps.defaultValue.creditCatSn.split('-');
                    let rowsExpand;
                    if (isNumber(parseInt(sns[0], 10))) {
                        rowsExpand = parseInt(sns[0], 10);
                    } else {
                        rowsExpand = sns[0];
                    }
                    this.setState({
                        treeSelectKey: [get(nextProps, 'defaultValue.creditCatId') + ''],
                        expandedKeys: sns,
                        expandedRowKeys: [rowsExpand]
                    });
                } else {
                    this.setState({
                        selectedRowKeys: [get(nextProps, 'defaultValue.creditCourseId')]
                    });
                }
            }
        }
        if (nextProps.defaultValue && get(nextProps, 'defaultValue.id') === undefined) {
            if (nextProps.type === 0) {
                if (nextProps.defaultValue.debitCatId === 0) {
                    this.setState({
                        selectedRowKeys: [nextProps.defaultValue.debitCourseId]
                    });
                } else if (nextProps.defaultValue.debitCourseId === 0 && nextProps.defaultValue.debitCatSn) {
                    let keysArr = nextProps.defaultValue.debitCatSn.split('-');
                    this.setState({
                        treeSelectKey: [get(nextProps, 'defaultValue.debitCatId') + ''],
                        expandedKeys: keysArr,
                        expandedRowKeys: [parseInt(keysArr[0], 10)]
                    });
                }
            } else {
                if (nextProps.defaultValue.creditCatId === 0) {
                    this.setState({
                        selectedRowKeys: [nextProps.defaultValue.creditCourseId]
                    });
                } else if (nextProps.defaultValue.creditCourseId === 0 && nextProps.defaultValue.creditCatSn) {
                    let keysArr = nextProps.defaultValue.creditCatSn.split('-');
                    this.setState({
                        treeSelectKey: [get(nextProps, 'defaultValue.creditCatId') + ''],
                        expandedKeys: keysArr,
                        expandedRowKeys: [parseInt(keysArr[0], 10)]
                    });
                }
            }
        }

        if (nextProps.visible === false) {
            this.clear();
        }
        if (nextProps.visible === true) {
            this.setState({
                templateDetailLoading: nextProps.templateDetailLoading
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !Comparison(nextProps, this.props) || !Comparison(nextState, this.state);
    }

    search = () => {
        this.setState({
            templateDetailLoading: true
        });
        const {searchValue} = this.state;
        const {templateId} = this.props;
        accountingModel.accountingDebitEntrySearch({
            id: templateId,
            keyword: searchValue || ''
        }, (res) => {
            if (res && res.ret === 0) {
                this.setState({
                    templateDetailLoading: false,
                    templateData: get(res, 'data.listCourseGroupVO')
                });
            }
        });
    };

    renderTreeNodes = data => {
        return (
            data.map((item, index) => {
                if (item.listCourseCatVO) {
                    return (
                        <TreeNode title={`${index + 1 < 10 ? '0' + (index + 1) : index + 1} ${item.catName}`}
                                  key={item.id}
                                  dataRef={item}>
                            {this.renderTreeNodes(item.listCourseCatVO)}
                        </TreeNode>
                    );
                }
                return (
                    <TreeNode
                        switcherIcon={<MinusSquareOutlined />}
                        title={`${index + 1 < 10 ? '0' + (index + 1) : index + 1} ${item.catName}`}
                        key={item.id}
                        dataRef={item}
                    />
                );
            })
        );
    };

    getTreeName = (key) => {
        const {templateData} = this.props;
        const newKey = cloneDeep(key).split('-');
        let newData = cloneDeep(templateData);
        const nameArr = [];
        templateData && templateData.forEach(item => {
            if (item.groupName === newKey[0]) {
                newData = item;
                // 拼大类名称
                // nameArr.push(item.groupName);
                for (let i = 1; i < newKey.length; i++) {
                    if (newData.listCourseVO) {
                        newData = newData.listCourseVO[newKey[i]];
                        const backupKeys = cloneDeep(key).split('-');
                        const SplicingKeys = backupKeys.splice(2, backupKeys.length - 1);
                        let SplicingName = newData.courseId;
                        SplicingKeys.forEach(item => {
                            SplicingName = `${SplicingName}${parseInt(item) < 10 ? '0' + (parseInt(item) + 1) : parseInt(item)}`;
                        });
                        SplicingName = SplicingName + '-' + newData.courseName;
                        nameArr.push(SplicingName);
                    } else {
                        newData = newData.listCourseCatVO[newKey[i]];
                        nameArr.push(`${newData.catName}`);
                    }
                }
            }
        });
        return nameArr;
    };

    getTreeKey = (key) => {
        const {templateData} = this.props;
        const newKey = key.split('-');
        let newData = cloneDeep(templateData);
        const keyArr = [];
        templateData && templateData.forEach(item => {
            if (item.groupName === newKey[0]) {
                newData = item;
                keyArr.push(item.id);
                for (let i = 1; i < newKey.length; i++) {
                    if (newData.listCourseVO) {
                        newData = newData.listCourseVO[newKey[i]];
                        keyArr.push(newData.courseId);
                    } else {
                        newData = newData.listCourseCatVO[newKey[i]];
                        keyArr.push(newData.id);
                    }
                }
            }
        });
        return keyArr;
    };

    stringSplicing = (treeKeys) => {
        treeKeys.splice(0, 1);
        treeKeys.splice(treeKeys.length - 1, 1);
        return treeKeys.join('-');
    };

    onTreeSelect = (selectedKeys, info) => {
        const {type} = this.props;
        const key = get(info, 'selectedNodes[0].props.dataRef.catNum');

        if (key) {
            const treeName = this.getTreeName(key);
            const treeKey = this.getTreeKey(key);
            let data = {};
            if (type === 0) {
                data.debitCatSn = this.stringSplicing(treeKey);
                data.debitTreeKey = treeKey;
                data.debitCatId = selectedKeys[0];
                data.debitCourseId = 0;
                data.debitContext = treeName.join(' > ');
            } else if (type === 1) {
                data.creditCatSn = this.stringSplicing(treeKey);
                data.creditTreeKey = treeKey;
                data.creditCourseId = 0;
                data.creditCatId = selectedKeys[0];
                data.creditContext = treeName.join(' > ');
            }
            this.setState({
                treeSelectKey: selectedKeys,
                selectedRowKeys: [],
                submitData: data
            });
        }
    };

    onExpand = expandedKeys => {
        this.setState({
            expandedKeys,
            autoExpandParent: false
        });
    };

    renderTree = (record) => {
        return (
            <Tree
                showLine
                onSelect={this.onTreeSelect}
                selectedKeys={this.state.treeSelectKey}
                onExpand={this.onExpand}
                expandedKeys={this.state.expandedKeys}
                autoExpandParent={this.state.autoExpandParent}
            >
                {this.renderTreeNodes(record.listCourseCatVO || [])}
            </Tree>
        );
    };

    getSelectName = ({id}) => {
        const {templateData} = this.props;
        let newName = '';
        templateData.forEach(item => {
            item.listCourseVO.forEach(children => {
                if (children.id === id) {
                    newName = item.groupName;
                }
            });
        });
        return newName;
    };

    handleOk = () => {
        const {lineValue} = this.props;
        const {submitData, selectedRowKeys, treeSelectKey} = this.state;
        // 判断借方科目和贷方科目不能相同
        if (JSON.stringify(lineValue) !== '{}') {
            // 第一种情况 先选借方科目 再选贷方科目树
            if (submitData.creditCatId && submitData.creditCatId !== 0 && lineValue.debitCatId && lineValue.debitCatId !== 0 && submitData.creditCatId + '' === lineValue.debitCatId + '') {
                message.error('借方科目和贷方科目不能相同');
                return;
            } else if (submitData.debitCatId && submitData.debitCatId !== 0 && lineValue.creditCatId && lineValue.creditCatId !== 0 && submitData.debitCatId + '' === lineValue.creditCatId + '') {
                // 第二种情况 先选贷方科目 再选借方科目树
                message.error('借方科目和贷方科目不能相同');
                return;
            } else if (submitData.creditCourseId && lineValue.debitCourseId && submitData.creditCourseId + '' === lineValue.debitCourseId + '') {
                // 第三种情况 先选贷方科目 再选借方科目
                message.error('借方科目和贷方科目不能相同');
                return;
            } else if (submitData.debitCourseId && lineValue.creditCourseId && submitData.debitCourseId + '' === lineValue.creditCourseId + '') {
                // 第四种情况 先选贷方科目 再选借方科目
                message.error('借方科目和贷方科目不能相同');
                return;
            }
        }
        // 判断不能为空保存
        if (JSON.stringify(this.state.submitData) === '{}' && selectedRowKeys.length === 0 && treeSelectKey.length === 0) {
            if (this.props.type === 0) {
                message.error('请选择借方科目');
            } else {
                message.error('请选择贷方科目');
            }
            return;
        }
        this.props.onOk(this.state.submitData);
        this.props.handleCancel();
    };

    clear = () => {
        this.setState({
            selectedRowKeys: [],
            treeSelectKey: [],
            submitData: {},
            expandedKeys: [],
            autoExpandParent: true,
            expandedRowKeys: [],
            searchValue: undefined
        });
    };

    render() {
        const {visible, handleCancel, type} = this.props;
        const {templateData} = this.state;
        const columns = [
            {
                title: '标准科目 id',
                dataIndex: 'courseId',
                key: 'courseId',
                render: (text) => (
                    <Ellipsis tooltip={true} length={10}>{text + ''}</Ellipsis>
                )
            },
            {
                title: '编号',
                dataIndex: 'courseSn',
                key: 'courseSn',
                render: (text) => (
                    <Ellipsis tooltip={true} length={10}>{text}</Ellipsis>
                )
            },
            {
                title: '科目名称',
                dataIndex: 'courseName',
                key: 'courseName',
                render: (text) => (
                    <Ellipsis tooltip={true} length={10}>{text}</Ellipsis>
                )
            },
            {
                title: '会计科目适用范围',
                dataIndex: 'courseRange',
                key: 'courseRange',
                render: (text) => (
                    <Ellipsis tooltip={true} length={10}>{text}</Ellipsis>
                )
            }
        ];
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                const name = this.getSelectName(selectedRows[0]);
                let data = {};
                if (type === 0) {
                    data.debitPositionId = selectedRows[0].courseId;
                    data.debitCourseId = selectedRows[0].courseId;
                    data.debitCatId = 0;
                    data.debitTreeKey = undefined;
                    // data.debitContext = `${name} > ${selectedRows[0].courseSn + '-' + selectedRows[0].courseName}`;
                    data.debitContext = `${selectedRows[0].courseId + '-' + selectedRows[0].courseName}`;
                } else if (type === 1) {
                    data.creditPositionId = selectedRows[0].courseId;
                    data.creditCourseId = selectedRows[0].courseId;
                    data.creditCatId = 0;
                    data.creditTreeKey = undefined;
                    // data.creditContext = `${name} > ${selectedRows[0].courseSn + '-' + selectedRows[0].courseName}`;
                    data.creditContext = `${selectedRows[0].courseId + '-' + selectedRows[0].courseName}`;
                }
                this.setState({
                    selectedRowKeys,
                    treeSelectKey: [],
                    submitData: data
                });
            },
            type: 'radio'
        };
        return (
            <Modal
                maskClosable={false}
                destroyOnClose
                afterClose={this.clear}
                title={`选择${type === 0 ? '借方' : '贷方'}科目`}
                visible={visible}
                onOk={this.handleOk}
                onCancel={handleCancel}
                width={760}
            >
                {this.makeHeadSearch()}
                <Spin spinning={this.state.templateDetailLoading}>
                    <div style={{marginTop: 20}}>
                        {
                            templateData && templateData.map((item, index) => (
                                <Row key={item.groupName + index} style={{marginBottom: 30}}>
                                    <Col span={24}>
                                        <h3>大类名称 : {item && item.groupName}</h3>
                                    </Col>
                                    <Col span={24}>
                                        <Table
                                            columns={columns}
                                            dataSource={item && item.listCourseVO}
                                            pagination={false}
                                            rowSelection={rowSelection}
                                            rowKey='courseId'
                                            expandedRowKeys={this.state.expandedRowKeys}
                                            onExpand={(expanded, record) => {
                                                let expandedRowKeys = this.state.expandedRowKeys;
                                                if (expanded) {
                                                    expandedRowKeys = expandedRowKeys.concat([record.courseId]);
                                                    this.setState({
                                                        expandedRowKeys: uniq(expandedRowKeys)
                                                    });
                                                } else {
                                                    expandedRowKeys = expandedRowKeys.filter(n => n !== record.courseId);
                                                    this.setState({
                                                        expandedRowKeys: uniq(expandedRowKeys)
                                                    });
                                                }
                                            }}
                                            expandedRowRender={(record) => {
                                                return (
                                                    this.renderTree(record)
                                                );
                                            }}
                                            expandIcon={(props) => {
                                                if (props.record.listCourseCatVO && props.record.listCourseCatVO.length !== 0 && props.expanded === false) {
                                                    return <PlusSquareOutlined onClick={e => props.onExpand(props.record, e)}/>;
                                                } else if (!props.record.listCourseCatVO) {
                                                    return <MinusSquareOutlined />;
                                                } else {
                                                    return <MinusSquareOutlined onClick={e => props.onExpand(props.record, e)}/>;
                                                }
                                            }}
                                            onRow={record => {
                                                return {
                                                    onClick: event => {
                                                        const name = this.getSelectName(record);
                                                        let data = {};
                                                        if (type === 0) {
                                                            data.debitPositionId = record.courseId;
                                                            data.debitCourseId = record.courseId;
                                                            data.debitCatId = 0;
                                                            data.debitTreeKey = undefined;
                                                            data.debitContext = `${record.courseId + '-' + record.courseName}`;
                                                            // data.debitContext = `${name} > ${record.courseSn + '-' + record.courseName}`;
                                                        } else if (type === 1) {
                                                            data.creditPositionId = record.courseId;
                                                            data.creditCourseId = record.courseId;
                                                            data.creditCatId = 0;
                                                            data.creditTreeKey = undefined;
                                                            data.creditContext = `${record.courseId + '-' + record.courseName}`;
                                                            // data.creditContext = `${name} > ${record.courseSn + '-' + record.courseName}`;
                                                        }
                                                        this.setState({
                                                            selectedRowKeys: [record.courseId],
                                                            treeSelectKey: [],
                                                            submitData: data
                                                        });
                                                    }
                                                };
                                            }}
                                        />
                                    </Col>
                                </Row>
                            ))
                        }
                    </div>
                </Spin>
            </Modal>
        );
    }

    makeHeadSearch = () => {
        return (
            <Row>
                <Col span={4}
                     style={{
                         fontSize: 14,
                         fontWeight: 'bold',
                         height: 32,
                         lineHeight: '32px',
                         letterSpacing: 1,
                         textAlign: 'right'
                     }}
                >
                    关键字搜索 :
                </Col>
                <Col span={8} style={{paddingLeft: 10}}>
                    <Input onChange={(e) => this.setState({searchValue: e.target.value})}/>
                </Col>
                <Col span={4} offset={2}>
                    <Button type='primary' onClick={this.search}>搜索</Button>
                </Col>
            </Row>
        );
    };
}

export default SelectSubjectModal;



