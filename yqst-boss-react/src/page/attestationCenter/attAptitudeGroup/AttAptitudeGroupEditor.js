/**
 * Created by yb on 2019/09/29
 */

import React, {Component} from 'react';
import {Form, Button, Modal, Card, Table, Row, Col, Input, message, Select, Popconfirm} from 'antd';
import {CheckOutlined, RollbackOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import Model from "../Model";
import moment from 'moment'
import difference from 'lodash/difference';
import union from 'lodash/union';
import unionWith from 'lodash/unionWith';
import uniqBy from 'lodash/uniqBy';
import SWTable from 'SWViews/table';
import SwitchName from "./SwitchName";
import AssemblySet from "../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../baseview/viewContent/ViewContent";

const {Option} = Select;
const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 8},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
    },
};


class AttAptitudeGroupEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            loading: false,
            visible: false,
            list: [],
            total: 0,
            requestPar: {
                current: 1,
                pageSize: 10,
                keyWord: '',
                startTime: '',
                endTime: '',
                type: '',
            },
            selectedRowKeys: [],
            saveSelectedRowKeys: [],
            changeList: [],
            saveChangeList: [],
        };
        this.id = '';
        this.crumb = [
            {name: '认证中心'},
            {name: "认证内容管理"},
            {name: "资质组管理列表", link: '/Pages/AttAptitudeGroupList'},
            {name: "新增资质组"}
        ];

        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.id = this.props.location.search.substr(1).split("=")[1];
        if (this.id) {
            this.getInfo();
            this.crumb = [
                {name: '认证中心'},
                {name: "认证内容管理"},
                {name: "资质组管理列表", link: '/Pages/AttAptitudeGroupList'},
                {name: "资质组管理详情", link: `/Pages/AttAptitudeGroupDetail?id=${this.id}`},
                {name: "编辑资质"},
            ];
        }
    }

    // 视图层
    render() {
        return (
            <Form ref={this.formRef} autoComplete="off" onFinish={this.handleSubmit}>
                <ViewContent
                    crumb={this.crumb}
                    topBtn={
                        <div>
                            <Button htmlType="submit" type="primary" icon={<CheckOutlined/>}
                                    loading={this.state.loading}>保存</Button>
                            <Link style={{marginLeft: 15}}
                                  to={this.id ? `/Pages/AttAptitudeGroupDetail?id=${this.id}` : '/Pages/AttAptitudeGroupList'}
                            >
                                <Button icon={<RollbackOutlined/>}>返回</Button>
                            </Link>
                        </div>
                    }
                >
                    {this.makeBaseView()}
                    {this.makeModalView()}
                </ViewContent>
            </Form>
        );
    }

    getInfo() {
        Model.UserAttDGGet({docGroupId: this.id}, (res) => {
            const newKey = res.data.docVOList && res.data.docVOList.map(item => {
                // item.key = item.id;
                item.key = item.docId;
                return item.key
            });

            this.setState({
                data: res.data,
                saveChangeList: res.data.docVOList || [],
                saveSelectedRowKeys: newKey
            }, () => {
                this.formRef.current.resetFields();
            });
        }, (err) => {
        });
    }

    getList(current) {
        this.state.requestPar.current = current ? current : this.state.requestPar.current;

        Model.UserAttDocPage(this.state.requestPar, (res) => {
            const newList = res.data.records && res.data.records.map((item, idx) => {
                return {
                    ...item,
                    key: item.id,
                    docId: item.id
                }
            });
            this.setState({
                list: newList || [],
                total: res.data.total || 0,
                visible: true,
                requestPar: this.state.requestPar
            })
        }, (err) => {
        })
    }

    makeBaseView() {
        let {data} = this.state;
        let allData = [
            {
                title: '基本信息',
                key: 'JBKey',
                data: [
                    this.id ? {
                        key: 'docGroupId',
                        type: 'Texts',
                        label: '资质组ID',
                        span: 12,
                        formItemLayout,
                        value: data.docGroupId
                    } : {},
                    this.id ? {
                        key: 'createTime', type: 'Texts', label: '创建时间', span: 12, formItemLayout,
                        value: data.createTime ? moment(data.createTime).format('YYYY-MM-DD HH:mm:ss') : ''
                    } : {},
                    {
                        key: 'groupSn',
                        type: 'Input',
                        span: 12,
                        value: data.groupSn || '',
                        formItemLayout,
                        placeholder: '请填写(仅限英文及数字字符)',
                        label: '资质组编码',
                        options: {
                            rules: [{
                                required: true, message: '资质组编码不能为空',
                            }, {
                                validator: (rule, value, callback) => this.checkValidator(rule, value, callback)
                            }],
                        },
                        attribute: {
                            maxLength: 20
                        }
                    },
                    {
                        key: 'groupName',
                        type: 'Input',
                        span: 12,
                        value: data.groupName || '',
                        formItemLayout,
                        placeholder: '请填写',
                        label: '资质组名称',
                        options: {
                            rules: [{
                                required: true, message: '资质组名称不能为空',
                            }],
                        },
                        attribute: {
                            maxLength: 30
                        }
                    },
                    {
                        key: 'groupMemo',
                        type: 'Input',
                        value: data.groupMemo || '',
                        formItemLayout,
                        label: '资质组描述',
                        placeholder: '请填写资质组描述',
                        span: 12,
                        attribute: {
                            maxLength: 200,
                            style: {
                                width: '100%',
                                height: '100px',
                            },
                            type: "textarea",
                        },
                    },
                ],
                style: {},
            },
        ];
        const columns = [
            {
                title: '资质ID',
                key: 'docId',
                dataIndex: 'docId',
            },
            {
                title: '资质编码',
                key: 'docSn',
                dataIndex: 'docSn'
            },
            {
                title: '资质名称',
                key: 'docName',
                dataIndex: 'docName',
            },
            {
                title: '资质类型',
                key: 'docType',
                dataIndex: 'docType',
                render: (res) => {
                    return SwitchName.docType(res);
                }
            },
            {
                title: '创建时间',
                key: 'createTime',
                dataIndex: 'createTime',
                width: 100,
                render: (res) => {
                    let times = res ? moment(res).format('YYYY-MM-DD HH:mm:ss') : '';
                    return times ? <div>
                        <div>{times.split(' ')[0]}</div>
                        <div>{times.split(' ')[1]}</div>
                    </div> : times;
                }
            },
            {
                title: '操作',
                key: '',
                dataIndex: '',
                width: 90,
                render: (res, data, idx) => {
                    return <Popconfirm
                        title="确定要删除该要素吗?"
                        onConfirm={() => {
                            this.state.saveChangeList.splice(idx, 1);
                            let newKey = this.state.saveChangeList.map(item => {
                                return item.key;
                            });
                            this.setState({
                                saveChangeList: this.state.saveChangeList,
                                saveSelectedRowKeys: newKey
                            })
                        }}
                        onCancel={() => {
                        }}
                        okText="确认"
                        cancelText="取消"
                    >
                        <a style={{color: '#f00'}}>
                            删除
                        </a>
                    </Popconfirm>
                }
            },
        ];

        return <div>
            {
                allData.map((item, idx) => {
                    return <Card
                        key={'car_' + idx}
                        type="inner"
                        title={item.title || '信息'}
                        style={item.style ? item.style : {}}
                        bodyStyle={item.bodyStyle ? item.bodyStyle : {}}
                    >
                        <AssemblySet key={item.key} data={item.data} form={this.formRef.current}/>
                    </Card>
                })
            }
            <Card
                type="inner"
                title={
                    <Row>
                        <Col span={12} style={{lineHeight: '30px'}}>资质列表</Col>
                        <Col span={12} style={{textAlign: 'right'}}>
                            <Button type="primary" onClick={() => {
                                this.setState({
                                    selectedRowKeys: this.state.saveSelectedRowKeys,
                                    changeList: this.state.saveChangeList,
                                    requestPar: {
                                        ...this.state.requestPar,
                                        current: 1
                                    }
                                }, () => {
                                    this.getList(1);
                                });
                            }}>添加</Button>
                        </Col>
                    </Row>
                }
                style={{marginTop: 15}}
            >
                {
                    this.state.saveChangeList.length > 0 && <SWTable
                        columns={columns}
                        dataSource={this.state.saveChangeList}
                        pagination={false}
                    />
                }
                {
                    this.state.saveChangeList.length <= 0 && <div style={{
                        textAlign: 'center',
                        color: '#ccc',
                        fontSize: 20
                    }}>
                        请添加......
                    </div>
                }
            </Card>
        </div>;
    }

    makeModalView() {
        let {visible, selectedRowKeys, list, requestPar, changeList} = this.state;
        const columns = [
            {
                title: '资质ID',
                key: 'id',
                dataIndex: 'id',
            },
            {
                title: '资质编码',
                key: 'docSn',
                dataIndex: 'docSn'
            },
            {
                title: '资质名称',
                key: 'docName',
                dataIndex: 'docName',
            },
            {
                title: '资质类型',
                key: 'docType',
                dataIndex: 'docType',
                render: (res) => {
                    return SwitchName.docType(res);
                }
            },
            {
                title: '创建时间',
                key: 'createTime',
                dataIndex: 'createTime',
                width: 100,
                render: (res) => {
                    let times = res ? moment(res).format('YYYY-MM-DD HH:mm:ss') : '';
                    return times ? <div>
                        <div>{times.split(' ')[0]}</div>
                        <div>{times.split(' ')[1]}</div>
                    </div> : times;
                }
            },
        ];
        const rowSelection = {
            selectedRowKeys,
            onChange: (rowKeys) => {
                let preChangeRowData = [];
                // 收集当前分页下的所有key
                const preKey = list.map(item => {
                    // 保存当前页面的选中的数据
                    rowKeys.forEach(cKey => {
                        if ('' + item.key === '' + cKey) {
                            preChangeRowData.push(item);
                            return false;
                        }
                    });
                    return item.key
                });

                // 去除当前页面选中的key，剩下当前页面未选中的key
                const noChangeRowKey = difference(preKey, rowKeys);

                // 合并所有选中的key，并去重
                selectedRowKeys = union(selectedRowKeys, rowKeys);

                // 去除之前选中过的值
                selectedRowKeys = difference(selectedRowKeys, noChangeRowKey);

                // 合并所有的选中的数据
                changeList = unionWith(changeList, preChangeRowData);

                // 去掉重复的数据
                changeList = uniqBy(changeList, 'key');

                // 去除当前页面下没有的数据
                let newChangeList = [];
                changeList.forEach(item => {
                    let isChange = true;
                    noChangeRowKey.forEach(cKey => {
                        if ('' + item.key === '' + cKey) {
                            isChange = false;
                        }
                    });
                    if (isChange) {
                        newChangeList.push(item);
                    }
                });

                this.setState({selectedRowKeys, changeList: newChangeList});
            },
        };

        return <Modal
            title="请添加资质"
            width={888}
            maskClosable={false}
            visible={visible}
            onOk={() => {
                if (this.state.changeList.length <= 0) {
                    return message.error('请至少选择一个资质添加！');
                }
                this.setState({
                    saveSelectedRowKeys: this.state.selectedRowKeys,
                    saveChangeList: this.state.changeList,
                    visible: false,
                })
            }}
            onCancel={() => {
                this.setState({visible: false})
            }}
        >
            <Row style={{marginBottom: 15}}>
                <Col span={20}>
                    <Row>
                        <Col span={12}>
                            关键字：
                            <Input value={requestPar.keyWord} style={{width: '80%'}} placeholder={'可查询ID、编码、名称'}
                                   onChange={(e) => {
                                       this.setState({
                                           requestPar: {
                                               ...requestPar,
                                               keyWord: e.target.value
                                           }
                                       });
                                   }}/>
                        </Col>
                        <Col span={12}>
                            资质类型：
                            <Select value={requestPar.type} style={{width: '75%'}} onChange={(val) => {
                                this.setState({
                                    requestPar: {
                                        ...requestPar,
                                        type: val
                                    }
                                });
                            }}>
                                <Option value=''>全部</Option>
                                <Option value='1'>文本</Option>
                                <Option value='2'>图片</Option>
                                <Option value='5'>地址</Option>
                                <Option value='3'>时间点</Option>
                                <Option value='4'>时间区间</Option>
                                <Option value='6'>附件</Option>
                                <Option value='7'>选项</Option>
                            </Select>
                        </Col>
                    </Row>
                </Col>
                <Col span={4}>
                    <Button onClick={() => {
                        this.setState({
                            requestPar: {
                                current: 1,
                                pageSize: 10,
                                keyWord: '',
                                startTime: '',
                                endTime: '',
                                type: '',
                            }
                        });
                    }}>重置</Button>
                    <Button style={{marginLeft: 10}} type="primary" onClick={() => {
                        this.getList(1);
                    }}>搜索</Button>
                </Col>
            </Row>
            <Table
                columns={columns}
                dataSource={list}
                rowSelection={rowSelection}
                pagination={
                    {
                        showSizeChanger: false,
                        total: this.state.total,
                        current: requestPar.current,
                        pageSize: requestPar.pageSize,
                        onChange: (a, b) => {
                            this.getList(a);
                        },
                        showTotal: (total, range) => `共有${total}条`
                    }
                }
            />
        </Modal>
    }

    checkValidator(rule, value, callback) {
        const numAndLet = /^[0-9a-zA-Z]+$/;
        if (value && !numAndLet.test(value)) {
            callback('编码只能是数字或者字母！');
            return false;
        }
        callback();
    }

    checkNum(rule, value, callback) {
        const numAndLet = /^[0-9]+$/;
        if (value && (!numAndLet.test(value) || value <= 0)) {
            callback('数量只能是大于零的整数！');
            return false;
        }
        callback();
    }

    handleSubmit = () => {
        this.setState({loading: true});
        const {validateFields} = this.formRef.current;
        validateFields().then(values => {

            if (this.id) {
                values.groupId = this.id;
                delete values.docGroupId;
                delete values.createTime;
            }
            if (this.state.saveChangeList.length <= 0) {
                message.error('请添加资质！');
                this.setState({loading: false});
                return false;
            }
            const newDocDesc = this.state.saveChangeList.map(item => {
                return {
                    id: item.id,
                    docId: item.docId,
                    docSn: item.docSn,
                    docName: item.docName,
                    docType: item.docType,
                }
            });
            values.docDesc = JSON.stringify(newDocDesc);

            Model.UserAttDGSave({...values}, (res) => {
                message.success('保存成功！');
                this.props.history.push('/Pages/AttAptitudeGroupList');

            }, (err) => {
                this.setState({loading: false});

            });

        }).catch(() => {
            this.setState({loading: false});
        });
    }
}

export default AttAptitudeGroupEditor
