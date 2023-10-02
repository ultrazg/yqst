import React, {Component} from 'react';
import {
    Form,
    Row,
    Col,
    Input,
    Button,
    Table,
    Tree,
    Divider,
    Modal,
    Popconfirm,
    Dropdown,
    Menu,
    message
} from 'antd';
import {ArrowUpOutlined, ArrowDownOutlined, EllipsisOutlined, MinusSquareOutlined, PlusSquareOutlined} from '@ant-design/icons';
import get from 'lodash/get';
import uniq from 'lodash/uniq';
import difference from 'lodash/difference';
import EditModal from './TemplateEditModal';
import TemplateEditSubSubjectModal from './TemplateEditSubSubjectModal';
import accountingModel from '../../model/accountingModel';
import moment from 'moment';
import {Link} from 'react-router-dom';
import ViewContent from '../../../../baseview/viewContent/ViewContent';
import Ellipsis from '../../../../baseview/Ellipsis';

const {TreeNode} = Tree;


class TemplateEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            templateID: '',
            modalVisible: false,
            subSubjectModalVisible: false,
            treeData: [],
            CurrentOperation: '',
            currentItem: undefined,
            selectedKeys: [],
            tableModalValue: undefined,
            subjectModalValue: undefined,
            tableModalIndex: undefined,
            subSubjectModalMaxLength: 0,
            subjectSelectedRowKeys: [],
            expandedRowKeys: [],
            expandedKeys: []
        };
        this.id = this.props.location.search.substr(1).split('=')[1];
    }

    componentDidMount() {
        if (this.id) {
            this.getDefaultValue(this.id);
        }
    };

    getDefaultValue = (id) => {
        accountingModel.templateDetail({id}, (res) => {
            if (res && res.ret === 0) {
                res.data = this.setMark(res.data);
                let subjectSelectedRowKeys = this.getSubjectSelectedRowKeys(get(res, 'data.listCourseGroupVO'));
                this.setState({
                    defaultValue: res.data,
                    treeData: res.data.listCourseGroupVO,
                    subjectSelectedRowKeys
                });
            }
        });
    };

    getSubjectSelectedRowKeys = (data) => {
        if (data) {
            let temporaryArr = [];
            data.forEach(item => {
                if (item.listCourseVO) {
                    item.listCourseVO.forEach(children => {
                        temporaryArr.push(children.courseId);
                    });
                }
            });
            return temporaryArr;
        }
        return [];
    };

    setMark = (data) => {
        if (data && data.listCourseGroupVO) {
            data.listCourseGroupVO.forEach((item, index) => {
                item.catNum = `${item.groupName}-${index}`;
                item.queue = index;
                if (item.listCourseVO) {
                    item.listCourseVO.forEach((child, index2) => {
                        child.mark = item.groupName;
                        child.catNum = `${item.groupName}-${index2}`;
                        child.queue = index2;
                    });
                }
            });
        }
        return data;
    };

    openModal = () => {
        this.setState({modalVisible: true});
    };

    cancelModal = () => {
        this.setState({modalVisible: false});
    };

    recursiveSetCatNum = (data, mark) => data.forEach(item => {
        if (item.listCourseCatVO) {
            this.recursiveSetCatNum(item.listCourseCatVO, mark);
        }
        const catNum = item.catNum.split('-');
        catNum[0] = mark;
        item.catNum = catNum.join('-');
    });

    handleOk = (data, selectedRowKeys) => {
        let {treeData, tableModalIndex, subjectSelectedRowKeys} = this.state;
        let isDname = false;
        if (treeData && treeData.length !== 0) {
            for (let i = 0; i <= treeData.length; i++) {
                if (treeData[i] && treeData[i].groupName === data.groupName) {
                    if (treeData[i] && treeData[i].id && treeData[i].id === data.id) {
                        treeData.splice(tableModalIndex, 1, data);
                        break;
                    }
                    if (data.id === undefined && tableModalIndex !== undefined) {
                        treeData.splice(tableModalIndex, 1, data);
                        break;
                    }
                    isDname = true;
                    break;
                }
            }
        }
        if (isDname === true) {
            message.error('大类名称不能重复');
            isDname = false;
            return;
        } else if (!isDname && tableModalIndex !== undefined) {
            treeData.splice(tableModalIndex, 1, data);
        } else {
            treeData = treeData.concat([data]);
        }
        if (treeData) {
            treeData.forEach((item) => {
                if (item.groupName === data.groupName && tableModalIndex !== undefined) {
                    item.listCourseVO.forEach((item2, index2) => {
                        item2.catNum = `${item2.mark}-${index2}`;
                        item2.queue = index2;
                        if (item2.listCourseCatVO) {
                            this.recursiveSetCatNum(item2.listCourseCatVO, item2.mark);
                        }
                    });
                }
            });
        }
        this.setState({
            treeData,
            subjectSelectedRowKeys: uniq(subjectSelectedRowKeys.concat(selectedRowKeys))
        });
        this.cancelModal();
        if (tableModalIndex !== undefined) {
            message.success('保存成功');
        }
    };

    subjectOk = (data) => {
        let {treeData, currentItem, expandedRowKeys, expandedKeys} = this.state;
        if (currentItem && currentItem.listCourseCatVO === undefined) {
            treeData.forEach((item, index) => {
                // 定位第一层 大类层
                if (item.groupName === currentItem.mark) {
                    treeData[index].listCourseVO.forEach((child, index2) => {
                        child.catNum = `${item.groupName}-${index2}`;
                        child.queue = index2;
                        // 定位第二层 标准科目ID
                        if (child.courseId === currentItem.courseId) {
                            // 生成定位的 key 和 tree 数据
                            data.forEach((n, index3) => {
                                n.catNum = `${item.groupName}-${index2}-${index3}`;
                                n.queue = index3;
                            });
                            child.listCourseCatVO = data;
                        }
                    });
                }
            });
        } else {
            let positionKey = this.state.treeNodeClickKey.split('-');
            treeData.forEach(item => {
                if (item.groupName === positionKey[0]) {
                    let selectRows = item.listCourseVO[positionKey[1]];
                    for (let i = 0; i < positionKey.length; i++) {
                        if (i === 1 && i === positionKey.length - 1) {
                            const concatData = selectRows.listCourseCatVO.concat(data);
                            concatData.forEach((n, nIndex) => {
                                n.catNum = positionKey.concat(nIndex);
                                n.queue = n.catNum[n.catNum.length - 1];
                                n.catNum = n.catNum.join('-');
                            });
                            selectRows.listCourseCatVO = concatData;
                        }
                        if (i > 1 && i === positionKey.length - 1) {
                            if (i === 2) {
                                selectRows = selectRows.listCourseCatVO;
                            }
                            if (selectRows[positionKey[i]] && selectRows[positionKey[i]].listCourseCatVO) {
                                // eslint-disable-next-line no-loop-func
                                data.forEach((n, nIndex) => {
                                    n.catNum = positionKey.concat([selectRows[positionKey[i]].listCourseCatVO.length + nIndex]);
                                    n.queue = n.catNum[n.catNum.length - 1];
                                    n.catNum = n.catNum.join('-');
                                });
                                const concatData = selectRows[positionKey[i]].listCourseCatVO.concat(data);
                                selectRows[positionKey[i]].listCourseCatVO = concatData;
                            } else {
                                data.forEach((n, index) => {
                                    n.catNum = positionKey.concat([index]);
                                    n.queue = n.catNum[n.catNum.length - 1];
                                    n.catNum = n.catNum.join('-');
                                });
                                selectRows[positionKey[i]].listCourseCatVO = data;
                            }
                        } else if (i > 1) {
                            if (i === 2) selectRows = selectRows.listCourseCatVO;
                            selectRows = selectRows[positionKey[i]].listCourseCatVO;
                        }
                    }
                }
            });
        }
        ;
        if (currentItem) {
            expandedRowKeys = expandedRowKeys.concat([(this.id ? currentItem.id : currentItem.courseId)]);
            uniq(expandedRowKeys);
        }
        if (this.state.treeNodeClickItem) {
            expandedKeys = expandedKeys.concat([this.state.treeNodeClickItem]);
            uniq(expandedKeys);
        }
        this.setState({
            expandedRowKeys: expandedRowKeys,
            expandedKeys: expandedKeys
        });
    };

    treeMoveUp = (item) => {
        this.treeLocate(item.catNum, 'up');
    };

    treeMoveDown = (item) => {
        this.treeLocate(item.catNum, 'down');
    };

    treeTopping = (item) => {
        this.treeLocate(item.catNum, 'topping');
    };

    treeSetEnd = (item) => {
        this.treeLocate(item.catNum, 'setEnd');
    };

    treeEdit = (item) => {
        this.setState({
            subSubjectModalVisible: true,
            subjectModalValue: item
        });
    };

    treeDelete = (item) => {
        this.treeLocate(item.catNum, 'delete');
    };

    treeLocate = (key, operate, data) => {
        const {treeData} = this.state;
        let keyArr = key.split('-');
        let moveIndex = 0;
        let treeDataPosition = treeData;
        treeData.forEach((item, index) => {
            if (item.groupName === keyArr[0]) {
                treeDataPosition = treeData[index].listCourseVO[keyArr[1]];
                moveIndex = parseInt(keyArr[keyArr.length - 1], 10);
                keyArr.forEach((key, keyIndex) => {
                    if (keyIndex > 1 && keyIndex !== keyArr.length - 1) {
                        treeDataPosition = treeDataPosition.listCourseCatVO[key];
                    }
                });
            }
        });


        if (operate === 'up') {
            this.upRecord(treeDataPosition.listCourseCatVO, moveIndex);
            treeDataPosition.listCourseCatVO.forEach((item, index) => {
                keyArr.splice(keyArr.length - 1, 1, index);
                if (item.listCourseCatVO) {
                    item.listCourseCatVO.forEach((child, index2) => {
                        let childKeys = child.catNum.split('-');
                        child.catNum = childKeys.join('-');
                    });
                }
                item.catNum = keyArr.join('-');
                item.queue = index;
            });
        } else if (operate === 'down') {
            this.downRecord(treeDataPosition.listCourseCatVO, moveIndex);
            treeDataPosition.listCourseCatVO.forEach((item, index) => {
                keyArr.splice(keyArr.length - 1, 1, index);
                if (item.listCourseCatVO) {
                    item.listCourseCatVO.forEach((child, index2) => {
                        let childKeys = child.catNum.split('-');
                        childKeys.splice(keyArr.length - 1, 1, index);
                        child.catNum = childKeys.join('-');
                    });
                }
                item.catNum = keyArr.join('-');
                item.queue = index;
            });
        } else if (operate === 'topping') {
            const arr = treeDataPosition.listCourseCatVO.splice(moveIndex, 1);
            treeDataPosition.listCourseCatVO.splice(0, 0, arr[0]);
            treeDataPosition.listCourseCatVO.forEach((item, index) => {
                keyArr.splice(keyArr.length - 1, 1, index);
                if (item.listCourseCatVO) {
                    item.listCourseCatVO.forEach((child, index2) => {
                        let childKeys = child.catNum.split('-');
                        childKeys.splice(keyArr.length - 1, 1, index);
                        child.catNum = childKeys.join('-');
                    });
                }
                item.catNum = keyArr.join('-');
                item.queue = index;
            });
        } else if (operate === 'setEnd') {
            const arr = treeDataPosition.listCourseCatVO.splice(moveIndex, 1);
            treeDataPosition.listCourseCatVO.push(arr[0]);
            treeDataPosition.listCourseCatVO.forEach((item, index) => {
                keyArr.splice(keyArr.length - 1, 1, index);
                if (item.listCourseCatVO) {
                    item.listCourseCatVO.forEach((child, index2) => {
                        let childKeys = child.catNum.split('-');
                        childKeys.splice(keyArr.length - 1, 1, index);
                        child.catNum = childKeys.join('-');
                    });
                }
                item.catNum = keyArr.join('-');
                item.queue = index;
            });
        } else if (operate === 'delete') {
            treeDataPosition.listCourseCatVO.splice(moveIndex, 1);
            treeDataPosition.listCourseCatVO.forEach((item, index) => {
                keyArr.splice(keyArr.length - 1, 1, index);
                item.catNum = keyArr.join('-');
                item.queue = index;
                if (item.listCourseCatVO) {
                    this.deleteRecursiveSetCatNum(item.listCourseCatVO, item.catNum);
                }
            });
        } else if (operate === 'edit') {
            treeDataPosition.listCourseCatVO.splice(moveIndex, 1, data);
            treeDataPosition.listCourseCatVO.forEach((item, index) => {
                keyArr.splice(keyArr.length - 1, 1, index);
                item.catNum = keyArr.join('-');
                item.queue = index;
            });
        }
    };

    deleteRecursiveSetCatNum = (data, catNum) => data.forEach((item, index) => {
        if (item.listCourseCatVO) {
            catNum = catNum.split('-');
            item.catNum = catNum.concat(index);
            item.catNum = item.catNum.join('-');
            catNum = catNum.join('-');
            item.queue = index;
            this.deleteRecursiveSetCatNum(item.listCourseCatVO, item.catNum);
        } else {
            catNum = catNum.split('-');
            item.catNum = catNum.concat(index);
            item.catNum = item.catNum.join('-');
            item.queue = index;
            catNum = catNum.join('-');
        }
    });

    swapItems = (arr, index1, index2) => {
        arr[index1] = arr.splice(index2, 1, arr[index1])[0];
        return arr;
    };

    upRecord = (arr, index) => {
        if (index === 0) {
            return;
        }
        this.swapItems(arr, index, index - 1);
    };

    downRecord = (arr, index) => {
        if (index === arr.length - 1) {
            return;
        }
        this.swapItems(arr, index, index + 1);
    };

    treeShowAddBtn = (item) => {
        if (item.listCourseCatVO && item.listCourseCatVO.length >= 30) {
            return 'max';
        }
        let arr = [];
        if (item && item.catNum) {
            arr = arr.concat(item.catNum.split('-'));
        }
        return arr.length < 7;
    };

    renderTreeNodes = data =>
        data.map((item, index) => {
            if (item.listCourseCatVO) {
                return (
                    <TreeNode
                        selectable
                        title={
                            <span>
                                {`${index < 10 ? '0' + (index + 1) : index + 1} ${item.catName}`}
                                <span style={{padding: 5}}/>
                                <a onClick={() => this.treeMoveUp(item)}><ArrowUpOutlined /></a>
                                <Divider type='vertical'/>
                                <a onClick={() => this.treeMoveDown(item)}><ArrowDownOutlined /></a>
                                <Divider type='vertical'/>
                                <Dropdown overlay={(
                                    <Menu>
                                        <Menu.Item>
                                            <Button onClick={() => this.treeTopping(item)} style={{display: 'block'}}
                                                    type='primary' size="small">
                                                置顶
                                            </Button>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <Button onClick={() => this.treeSetEnd(item)} style={{display: 'block'}}
                                                    type='primary' size="small">
                                                置底
                                            </Button>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <Button onClick={() => this.treeEdit(item)} style={{display: 'block'}}
                                                    type='primary' size="small">
                                                编辑
                                            </Button>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <Button onClick={() => this.treeDelete(item)} style={{display: 'block'}}
                                                    type='primary' size="small">
                                                删除
                                            </Button>
                                        </Menu.Item>
                                    </Menu>
                                )}>
                            <a><EllipsisOutlined /></a>
                        </Dropdown>
                                {
                                    this.treeShowAddBtn(item) ? <Divider type='vertical'/> : null
                                }
                                {
                                    this.treeShowAddBtn(item) === true ?
                                        <a onClick={() => {
                                            this.setState({
                                                subSubjectModalVisible: true,
                                                treeNodeClickItem: item.catNum,
                                                subSubjectModalMaxLength: item.listCourseCatVO.length
                                            });
                                        }}>
                                            添加子科目
                                        </a> : this.treeShowAddBtn(item) === false ? null : <span>子集已达到 30 个</span>
                                }
                            </span>
                        }
                        key={item.catNum}
                    >
                        {this.renderTreeNodes(item.listCourseCatVO)}
                    </TreeNode>
                );
            }
            return <TreeNode
                selectable
                switcherIcon={<MinusSquareOutlined />}
                title={
                    <span>
                        {`${index < 9 ? '0' + (index + 1) : index + 1} ${item.catName}`}
                        <span style={{padding: 5}}/>
                        <a onClick={() => this.treeMoveUp(item)}><ArrowUpOutlined /></a>
                        <Divider type='vertical'/>
                        <a onClick={() => this.treeMoveDown(item)}><ArrowDownOutlined /></a>
                        <Divider type='vertical'/>
                        <Dropdown overlay={(
                            <Menu>
                                <Menu.Item>
                                    <Button onClick={() => this.treeTopping(item)} style={{display: 'block'}}
                                            type='primary' size="small">
                                        置顶
                                    </Button>
                                </Menu.Item>
                                <Menu.Item>
                                    <Button onClick={() => this.treeSetEnd(item)} style={{display: 'block'}}
                                            type='primary' size="small">
                                        置底
                                    </Button>
                                </Menu.Item>
                                <Menu.Item>
                                    <Button onClick={() => this.treeEdit(item)} style={{display: 'block'}}
                                            type='primary' size="small">
                                        编辑
                                    </Button>
                                </Menu.Item>
                                <Menu.Item>
                                    <Button onClick={() => this.treeDelete(item)} style={{display: 'block'}}
                                            type='primary' size="small">
                                        删除
                                    </Button>
                                </Menu.Item>
                            </Menu>
                        )}>
                            <a><EllipsisOutlined /></a>
                        </Dropdown>
                        {
                            this.treeShowAddBtn(item) ? <Divider type='vertical'/> : null
                        }
                        {
                            this.treeShowAddBtn(item) ?
                                <a onClick={() => {
                                    this.setState({
                                        subSubjectModalVisible: true,
                                        subSubjectModalMaxLength: 0,
                                        treeNodeClickItem: item.catNum
                                    });
                                }}>
                                    添加子科目
                                </a> : null
                        }
                    </span>
                }
                key={item.catNum}
            />;
        });

// 保存接口逻辑
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) return;
            const {treeData} = this.state;
            if (treeData.length === 0) {
                this.saveError();
                return;
            }
            const submitData = {
                saveTemplateDTO: JSON.stringify({
                    ...values,
                    listCourseGroupVO: treeData
                })
            };
            this.save(submitData);
        });
    };
    // 207017
    save = (data) => {
        if (this.id) data.id = this.id;
        accountingModel.templateSave(data, res => {
            if (res && res.ret === 0) {
                this.props.history.push('/Pages/TemplateList');
                message.success('操作成功');
            } else if (res && res.ret === 207014) {
                const startIndex = res.msg.indexOf('目');
                const endIndex = res.msg.indexOf('不');
                const id = res.msg.substr(startIndex + 1, (endIndex - startIndex) - 1);
                this.state.treeData.forEach(item => {
                    item.listCourseVO && item.listCourseVO.forEach((n, index) => {
                        if (n.courseId + '' === id) {
                            item.listCourseVO.splice(index, 1);
                        }
                    });
                });
                this.editModalThis.getList();
                this.setState({
                    treeData: this.state.treeData
                });
            }
        });
    };

    subjectClose = () => {
        this.setState({
            treeNodeClickKey: undefined,
            subjectModalValue: undefined,
            subSubjectModalMaxLength: 0
        });
    };

    tableEditButton = (data, index) => {
        this.openModal();
        this.setState({
            tableModalValue: data,
            tableModalIndex: index
        });
    };

    subjectEdit = (data) => {
        const key = data[0].catNum;
        this.treeLocate(key, 'edit', data[0]);
    };

    tableDeleteButton = (data) => {
        const {id, groupName} = data;
        const {treeData, subjectSelectedRowKeys} = this.state;
        if (id) {
            treeData.forEach((item, index) => {
                if (item.id === id) {
                    let selectedKeys = [];
                    item.listCourseVO.forEach(n => selectedKeys.push(n.courseId));
                    const newSelectedKeys = difference(subjectSelectedRowKeys, selectedKeys);
                    this.setState({subjectSelectedRowKeys: newSelectedKeys});
                    treeData.splice(index, 1);
                }
            });
        } else if (groupName) {
            treeData.forEach((item, index) => {
                if (item.groupName === groupName) {
                    let selectedKeys = [];
                    item.listCourseVO.forEach(n => selectedKeys.push(n.courseId));
                    const newSelectedKeys = difference(subjectSelectedRowKeys, selectedKeys);
                    this.setState({subjectSelectedRowKeys: newSelectedKeys});
                    treeData.splice(index, 1);
                }
            });
        }
        this.setState({
            treeData
        });
    };

    saveError = () => {
        Modal.error({
            title: '保存失败 !',
            content: '请至少含有一个大类 !'
        });
    };

    render() {
        const {form} = this.props;
        const {defaultValue, expandedRowKeys} = this.state;
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14}
        };
        const columns = [
            {title: '标准科目ID', dataIndex: 'courseId', key: 'courseId'},
            {title: '编号', dataIndex: 'courseSn', key: 'courseSn'},
            {
                title: '标准科目名称', dataIndex: 'courseName', key: 'courseName', render: text => (
                    <Ellipsis length={20} tooltip={true}>{text}</Ellipsis>
                )
            },
            {
                title: '会计科目适用范围', dataIndex: 'courseRange', key: 'courseRange', render: text => (
                    <Ellipsis length={20} tooltip={true}>{text}</Ellipsis>
                )
            },
            {
                title: '创建时间', width: 120, dataIndex: 'createTime', key: 'createTime', render: (text) => (
                    <span>{moment(text).format('YYYY-MM-DD')}</span>
                )
            },
            {
                title: '操作', dataIndex: 'id', key: '6', render: (text, record) => (
                    record.listCourseCatVO && record.listCourseCatVO.length >= 30 ?
                        <span>
                            子科目已达到 30 个
                        </span>
                        :
                        <a
                            onClick={() => {
                                this.setState({
                                    subSubjectModalVisible: true,
                                    currentItem: record,
                                    treeNodeClickKey: record.catNum,
                                    subSubjectModalMaxLength: record.listCourseCatVO ? record.listCourseCatVO.length : 0
                                });
                            }}
                        >
                            添加子科目
                        </a>
                )
            }
        ];
        return (
            <ViewContent crumb={[
                {name: '科目模板管理'},
                {name: '科目模板列表', link: '/Pages/TemplateList'},
                {name: this.id ? '编辑科目模板' : '新增科目模板'}
            ]}>
                <TemplateEditSubSubjectModal
                    visible={this.state.subSubjectModalVisible}
                    handleCancel={() => {
                        this.setState({subSubjectModalVisible: false});
                    }}
                    defaultValue={this.state.subjectModalValue}
                    handleOk={this.subjectOk}
                    handleEdit={this.subjectEdit}
                    close={this.subjectClose}
                    subSubjectModalMaxLength={this.state.subSubjectModalMaxLength}
                />
                <div style={{background: '#fff', padding: '20px', margin: '5px 10px 20px 10px', borderRadius: '6px'}}>
                    <h2 style={{padding: '10px 30px', borderBottom: '1px solid #e8e8e8'}}>模板信息</h2>
                    {/*模板信息表单*/}
                    <Form>
                        <Row style={{paddingLeft: 30}}>
                            <Col span={10}>
                                {
                                    this.id ?
                                        <Col span={24}>
                                            <Form.Item
                                                label={<span style={{fontSize: 16, fontWeight: 'bold'}}>模板ID</span>}
                                                {...formItemLayout}
                                            >
                                                <span style={{fontSize: 16}}>{this.id}</span>
                                            </Form.Item>
                                        </Col> : null
                                }
                                {
                                    this.id ?
                                        <Col span={24} style={{display: 'none'}}>
                                            <Form.Item
                                                label={<span style={{fontSize: 16, fontWeight: 'bold'}}>模板ID</span>}
                                                {...formItemLayout}
                                            >
                                                {form.getFieldDecorator(`id`, {
                                                    initialValue: defaultValue && defaultValue.id
                                                })(
                                                    <Input style={{fontWeight: 'bold', fontSize: 14}}
                                                           autoComplete='off'/>
                                                )}
                                            </Form.Item>
                                        </Col> : null
                                }
                                <Col span={24}>
                                    <Form.Item
                                        label={<span style={{fontSize: 16, fontWeight: 'bold'}}>模板名称</span>}
                                        {...formItemLayout}

                                    >
                                        {form.getFieldDecorator(`templateName`, {
                                            initialValue: defaultValue && defaultValue.templateName,
                                            rules: [{required: true, message: '模板名称为必填项!'}]
                                        })(
                                            <Input maxLength={30} style={{fontWeight: 'bold', fontSize: 14}}
                                                   autoComplete='off'/>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item
                                        label={<span style={{fontSize: 16, fontWeight: 'bold'}}>备注</span>}
                                        {...formItemLayout}
                                    >
                                        {form.getFieldDecorator(`memo`, {
                                            initialValue: defaultValue && defaultValue.memo
                                        })(
                                            <Input maxLength={200} style={{fontWeight: 'bold', fontSize: 14}}
                                                   autoComplete='off'/>
                                        )}
                                    </Form.Item>
                                </Col>
                            </Col>
                        </Row>
                    </Form>
                    <h2 style={{padding: '10px 30px', borderBottom: '1px solid #e8e8e8'}}>设置模板</h2>
                    {/*  modal 组件  */}
                    <div style={{
                        paddingLeft: 30,
                        paddingBottom: 10,
                        minHeight: 300,
                        borderBottom: '1px solid #e8e8e8'
                    }}>
                        <Row>
                            <Col span={10} style={{marginBottom: 10}}>
                                <Col span={10} offset={3}>
                                    {
                                        this.state.treeData.length < 10 ?
                                            <Button onClick={this.openModal} size='large' type='primary'>新增大类</Button>
                                            :
                                            <Button disabled={true} size='large'
                                                    type='primary'>新增大类(大类个数已达到最大值)</Button>
                                    }

                                </Col>
                            </Col>
                            {/* 渲染大类数据 */}
                            {
                                this.state.treeData.map((item, index) => (
                                    <Col span={24} key={item.groupName + index} style={{marginBottom: 20}}>
                                        <Col span={24}>
                                            <Col span={9} offset={1}>
                                                <h3>大类名称: {item.groupName}</h3>
                                            </Col>
                                            <Col span={12} style={{textAlign: 'right'}}>
                                                <Button onClick={() => this.tableEditButton(item, index)} size='small'
                                                        type='primary'>编辑</Button>
                                                <span style={{padding: 5}}/>
                                                <Popconfirm
                                                    title={`确认删除 : ${item.groupName}`}
                                                    onConfirm={() => this.tableDeleteButton(item)}
                                                    okText="确认"
                                                    cancelText="取消"
                                                >
                                                    <Button size='small' type='primary'>删除</Button>
                                                </Popconfirm>
                                            </Col>
                                        </Col>
                                        <Col span={24}>
                                            <Table
                                                dataSource={item.listCourseVO}
                                                columns={columns}
                                                expandedRowKeys={expandedRowKeys}
                                                rowKey={this.id ? 'id' : 'courseId'}
                                                onExpand={(expanded, record) => {
                                                    let {expandedRowKeys} = this.state;
                                                    if (expanded === true) {
                                                        expandedRowKeys = expandedRowKeys.concat([(this.id ? record.id : record.courseId)]);
                                                    } else {
                                                        expandedRowKeys = expandedRowKeys.filter(n => n !== (this.id ? record.id : record.courseId));
                                                    }
                                                    this.setState({
                                                        expandedRowKeys
                                                    });
                                                }}
                                                expandedRowRender={record => (
                                                    record.listCourseCatVO ?
                                                        <Tree
                                                            showLine={true}
                                                            expandedKeys={this.state.expandedKeys}
                                                            onExpand={(expandedKey, {expanded, node}) => {
                                                                let {expandedKeys} = this.state;
                                                                const eventKey = node.props.eventKey;
                                                                if (expanded === true) {
                                                                    expandedKeys = expandedKeys.concat([eventKey]);
                                                                } else {
                                                                    expandedKeys = expandedKeys.filter(n => n !== eventKey);
                                                                }
                                                                this.setState({
                                                                    expandedKeys: expandedKeys
                                                                });
                                                            }}
                                                            selectedKeys={this.state.selectedKeys}
                                                            onSelect={(clickKey) => {
                                                                this.setState({treeNodeClickKey: clickKey[0]});
                                                            }}
                                                        >
                                                            {this.renderTreeNodes(record.listCourseCatVO)}
                                                        </Tree>
                                                        : false
                                                )}
                                                expandIcon={(props) => {
                                                    if (props.record.listCourseCatVO && props.record.listCourseCatVO.length !== 0 && props.expanded === false) {
                                                        return <PlusSquareOutlined onClick={e => props.onExpand(props.record, e)}/>;
                                                    } else if (!props.record.listCourseCatVO || props.record.listCourseCatVO && props.record.listCourseCatVO.length === 0) {
                                                        return <MinusSquareOutlined />;
                                                    } else {
                                                        return <MinusSquareOutlined onClick={e => props.onExpand(props.record, e)}/>;
                                                    }
                                                }}
                                                pagination={false}
                                            />
                                        </Col>
                                    </Col>
                                ))
                            }
                        </Row>
                    </div>
                    <EditModal
                        subjectSelectedRowKeys={this.state.subjectSelectedRowKeys}
                        editModalThis={(_this) => {
                            this.editModalThis = _this;
                        }}
                        defaultValue={this.state.tableModalValue}
                        visible={this.state.modalVisible}
                        resetDefaultValue={() => {
                            this.setState({
                                tableModalValue: undefined,
                                tableModalIndex: undefined
                            });
                        }}
                        handleOk={this.handleOk}
                        handleCancel={this.cancelModal}
                    />
                    {/*  底部按钮组  */}
                    <Row style={{marginTop: 15}}>
                        <Col span={24} style={{textAlign: 'center'}}>
                            <Button type='primary' size='large' onClick={this.handleSubmit}>保存</Button>
                            <span style={{padding: 5}}/>
                            <Link to='/Pages/TemplateList'>
                                <Button size='large'>返回列表</Button>
                            </Link>
                        </Col>
                    </Row>
                </div>
            </ViewContent>
        );
    }
}

TemplateEdit.propTypes = {};

export default TemplateEdit;
