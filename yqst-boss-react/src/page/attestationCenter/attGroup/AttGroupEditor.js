/**
 * Created by yb on 2019/09/129
 */

import React, {Component} from 'react';
import {
    Form,
    Button,
    Modal,
    Card,
    Table,
    Row,
    Col,
    Input,
    message,
    Radio,
    DatePicker,
    Popconfirm,
} from 'antd';
import {CheckOutlined, RollbackOutlined, DeleteOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import Model from "../Model";
import moment from 'moment'
import SWTable from 'SWViews/table';
import difference from 'lodash/difference';
import union from 'lodash/union';
import unionWith from 'lodash/unionWith';
import uniqBy from 'lodash/uniqBy';
import SwitchName from './SwitchName';
import AssemblySet from "../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../baseview/viewContent/ViewContent";

const {RangePicker} = DatePicker;
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


class AttGroupEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            loading: false,
            softPra: {
                current: 1,
                pages: 10,
                list: [],
                total: 0,
            },
            rowSoft: {},
            visible: false,

            // 资质组有关参数
            zzVisible: false,
            list: [],
            total: 0,
            requestPar: {
                current: 1,
                pageSize: 10,
                keyWord: '',
                startTime: '',
                endTime: '',
            },
            selectedRowKeys: [],
            saveSelectedRowKeys: [],
            changeList: [],
            saveChangeList: [],
            saveModal: false,
        };
        this.id = '';
        this.crumb = [
            {name: '认证中心'},
            {name: "认证内容管理"},
            {name: "认证组管理列表", link: '/Pages/AttGroupList'},
            {name: "新增认证组"}
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
                {name: "认证组管理列表", link: '/Pages/AttGroupList'},
                {name: "认证组管理详情", link: `/Pages/AttGroupDetail?id=${this.id}`},
                {name: "编辑认证组"},
            ];
        }
    }

    // 视图层
    render() {
        return (
            <>
                <Form ref={this.formRef} autoComplete="off">
                    <ViewContent
                        crumb={this.crumb}
                        topBtn={
                            <div>
                                <Button type="primary" icon={<CheckOutlined/>} loading={this.state.loading}
                                        onClick={() => {
                                            this.setState({
                                                saveModal: true
                                            });
                                        }}>保存</Button>
                                <Link style={{marginLeft: 15}}
                                      to={this.id ? `/Pages/AttGroupDetail?id=${this.id}` : '/Pages/AttGroupList'}
                                >
                                    <Button icon={<RollbackOutlined/>}>返回</Button>
                                </Link>
                            </div>
                        }
                    >
                        {this.makeBaseView()}
                        {this.makeSoftView()}
                        {this.makeZZView()}
                    </ViewContent>
                </Form>
                <Modal
                    title="提示"
                    visible={this.state.saveModal}
                    onOk={() => {
                        this.handleSubmit();
                    }}
                    onCancel={() => {
                        this.setState({
                            saveModal: false
                        });
                    }}
                >
                    <p>与之关联的【认证规则管理】会全部恢复默认状态要重新编辑是否显示和必填，是否保存？</p>
                </Modal>
            </>
        );
    }

    getInfo() {
        Model.UserAttDocPGet({docParentId: this.id}, (res) => {
            let saveChangeList = [];
            const newKey = res.data.getDocGroupVOList && res.data.getDocGroupVOList.map(item => {
                item.key = item.docGroupId;
                saveChangeList.push({
                    ...item,
                    docVOList: item.getDocVOList && item.getDocVOList.map(cItem => {
                        return {
                            ...cItem,
                            id: cItem.docId
                        }
                    })
                });
                return item.key
            });
            this.formRef.current.setFieldsValue({type: res.data.type + ''});
            this.setState({
                data: res.data,
                rowSoft: {
                    id: res.data.softId || '',
                    serviceTag: res.data.serviceTag || '',
                    name: res.data.softName || '',
                },
                saveChangeList,
                saveSelectedRowKeys: newKey
            }, () => {
                this.formRef.current.resetFields();
            });
        }, (err) => {
        });
    }

    getSoftList(current) {
        let {softPra} = this.state;
        softPra.current = current ? current : softPra.current;
        Model.UserAttSList({current: softPra.current, pages: softPra.pages}, (res) => {

            const newList = res.data.records && res.data.records.map((item, idx) => {
                item.isChecked = false;
                if ('' + this.state.rowSoft.id === '' + item.id) {
                    item.isChecked = true;
                }
                return item
            });

            softPra.total = res.data.total || 0;
            softPra.list = newList || [];

            this.setState({
                softPra,
                visible: true
            })
        }, (err) => {
        })
    }

    getList(current) {
        this.state.requestPar.current = current ? current : this.state.requestPar.current;

        Model.UserAttDGSPage(this.state.requestPar, (res) => {
            const newList = res.data.records && res.data.records.map((item, idx) => {
                return {
                    ...item,
                    key: item.docGroupId
                }
            });
            this.setState({
                list: newList || [],
                total: res.data.total || 0,
                zzVisible: true,
                requestPar: this.state.requestPar
            })
        }, (err) => {
        })
    }

    makeBaseView() {
        let {data, rowSoft} = this.state;
        if (!this.formRef.current) {
            return null
        }
        const {getFieldValue} = this.formRef.current;

        let allData = [
            {
                title: '基本信息',
                key: 'JBKey',
                data: [
                    this.id ? {
                        key: 'docParentId',
                        type: 'Texts',
                        label: '认证组ID',
                        span: 12,
                        formItemLayout,
                        value: data.docParentId
                    } : {},
                    this.id ? {
                        key: 'createTime', type: 'Texts', label: '创建时间', span: 12, formItemLayout,
                        value: data.createTime ? moment(data.createTime).format('YYYY-MM-DD HH:mm:ss') : ''
                    } : {},
                    {
                        key: 'parentCode',
                        type: 'Input',
                        span: 12,
                        value: data.parentCode || '',
                        formItemLayout,
                        placeholder: '请填写(仅限英文及数字字符)',
                        label: '认证组编码',
                        options: {
                            rules: [{
                                required: true, message: '认证组编码不能为空',
                            }, {
                                validator: (rule, value, callback) => this.checkValidator(rule, value, callback)
                            }],
                        },
                        attribute: {
                            maxLength: 20
                        }
                    },
                    {
                        key: 'name',
                        type: 'Input',
                        span: 12,
                        value: data.name || '',
                        formItemLayout,
                        placeholder: '请填写',
                        label: '认证组名称',
                        options: {
                            rules: [{
                                required: true, message: '认证组名称不能为空',
                            }],
                        },
                        attribute: {
                            maxLength: 30
                        }
                    },
                    {
                        key: 'memo',
                        type: 'Input',
                        value: data.memo || '',
                        formItemLayout,
                        label: '认证组描述',
                        placeholder: '请填写认证组描述',
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
            {
                title: '认证组类型设置',
                key: 'LXKey',
                data: [
                    {
                        key: 'type', type: 'Select', span: 12, formItemLayout, label: '认证组类型',
                        value: data.type || '',
                        options: {
                            rules: [{
                                required: true, message: '认证组类型不能为空',
                            }],
                        },
                        callBack: (type) => {
                            data.type = type;
                            this.setState({
                                data
                            })
                        },
                        data: {
                            list: [
                                {
                                    value: '',
                                    name: '请选择'
                                },
                                {
                                    value: '1',
                                    name: '企业实名认证'
                                },
                                {
                                    value: '3',
                                    name: '个人实名认证'
                                },
                                {
                                    value: '2',
                                    name: '云服务主认证'
                                },
                                {
                                    value: '4',
                                    name: '云服务子模块认证'
                                }
                            ]
                        }
                    },
                    ('2' === '' + getFieldValue('type') ||
                        '4' === '' + getFieldValue('type')) ?
                        {
                            key: 'softName', type: 'Custom', span: 12, formItemLayout, label: '关联云服务名称',
                            value: rowSoft.name,
                            options: {
                                rules: [{
                                    required: true, message: '关联云服务名称不能为空',
                                }],
                            },
                            view: <Input placeholder="点击选择" readOnly={true}
                                // value={this.state.rowSoft.name}
                                         onClick={() => {
                                             this.getSoftList(1);
                                         }}
                            />
                        } : {},
                    ('2' === '' + getFieldValue('type') ||
                        '4' === '' + getFieldValue('type')) ?
                        {
                            key: 'softId', type: 'Custom', span: 12, formItemLayout, label: '关联云服务ID',
                            value: rowSoft.id,
                            options: {
                                rules: [{
                                    required: false, message: '关联云服务ID不能为空',
                                }],
                            },
                            view: <Input placeholder="自动填充"
                                // value={this.state.rowSoft.id}
                                         disabled={true}
                            />
                        } : {},
                ],
                style: {marginTop: 15},
            },
        ];
        const columns = [
            {
                title: '资质ID',
                key: 'id',
                dataIndex: 'id',
            },
            {
                title: '资质编码',
                key: 'docSn',
                dataIndex: 'docSn',
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
            }
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
                        <Col span={12} style={{lineHeight: '30px'}}>资质组列表</Col>
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
                                    this.getList();
                                });
                            }}>添加</Button>
                        </Col>
                    </Row>
                }
                style={{marginTop: 15}}
            >
                {
                    this.state.saveChangeList.length > 0 && this.state.saveChangeList.map((item, idx) => {
                        let newElementListVO = item.docVOList && item.docVOList.map(cItem => {
                            return {
                                ...cItem,
                                pIdx: idx,
                                key: cItem.id,
                            }
                        });
                        return <Card
                            key={'sav_' + idx}
                            type="inner"
                            title={<Row>
                                <Col span={20}>
                                    <Col span={12}>资质组ID：{item.docGroupId}</Col>
                                    <Col span={12}>资质组名称：{item.docGroupName}</Col>
                                </Col>
                                <Col span={4} style={{textAlign: 'right'}}>
                                    <Popconfirm
                                        title="确认要删除该资质组吗？"
                                        onConfirm={() => {
                                            this.state.saveChangeList.splice(idx, 1);
                                            this.state.saveSelectedRowKeys = this.state.saveChangeList.map(pItem => {
                                                return pItem.key
                                            });
                                            this.setState({
                                                saveChangeList: this.state.saveChangeList,
                                                saveSelectedRowKeys: this.state.saveSelectedRowKeys
                                            })
                                        }}
                                        onCancel={() => {
                                        }}
                                        okText="确定"
                                        cancelText="取消"
                                    >
                                        <Button type="danger" icon={<DeleteOutlined/>}
                                                style={{marginLeft: 15}}>删除</Button>
                                    </Popconfirm>
                                </Col>
                            </Row>}
                            style={{marginTop: 0 != idx ? 15 : 0}}
                        >
                            <SWTable
                                columns={columns}
                                dataSource={newElementListVO}
                                pagination={false}
                            />
                        </Card>
                    })
                }

                {
                    this.state.saveChangeList.length <= 0 && <div style={{
                        textAlign: 'center',
                        color: '#ccc',
                        fontSize: 20
                    }}>
                        请添加资质组......
                    </div>
                }
            </Card>
        </div>;
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

    makeSoftView() {
        let {softPra} = this.state;
        const columns = [
            {
                title: '',
                key: '',
                dataIndex: '',
                width: 60,
                render: (res) => {
                    return <Radio checked={res.isChecked}/>
                }
            },
            {
                title: '云服务ID',
                key: 'id',
                dataIndex: 'id',
            },
            {
                title: '云服务编码',
                key: 'serviceTag',
                dataIndex: 'serviceTag',
            },
            {
                title: '云服务名称',
                key: 'name',
                dataIndex: 'name',
                width: 200
            },
            // {
            //     title: '云服务分类',
            //     key: '',
            //     dataIndex: '',
            // },
            // {
            //     title: '开发者ID',
            //     key: '',
            //     dataIndex: '',
            // },
            {
                title: '版本',
                key: 'softVersion',
                dataIndex: 'softVersion',
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
        return <Modal
            title="选择收支付渠道"
            width={900}
            visible={this.state.visible}
            onOk={() => {
                softPra.list.forEach(item => {
                    if (item.isChecked) {
                        this.formRef.current.setFieldsValue({softName: item.name, softId: item.id});
                        this.setState({rowSoft: item, visible: false});
                        return false;
                    }
                });
            }}
            onCancel={() => {
                this.setState({visible: false});
            }}
        >
            <SWTable
                columns={columns}
                dataSource={softPra.list || []}
                onRow={(record, idx) => {
                    return {
                        onClick: (event) => {
                            softPra.list.forEach(item => {
                                item.isChecked = false;
                                if ('' + record.id === '' + item.id) {
                                    item.isChecked = !item.isChecked;
                                }
                            });
                            this.setState({softPra});
                        }
                    }
                }}
                pagination={
                    {
                        total: softPra.total,
                        current: softPra.current,
                        pageSize: softPra.pages,
                        onChange: (a, b) => {
                            softPra.current = a;
                            this.setState({softPra}, () => {
                                this.getSoftList();
                            })
                        },
                        showTotal: (total, range) => `共有${total}条`
                    }
                }
            />
        </Modal>
    }

    makeZZView() {
        let {zzVisible, selectedRowKeys, list, requestPar, changeList} = this.state;
        const columns = [
            {
                title: '资质组ID',
                key: 'docGroupId',
                dataIndex: 'docGroupId',
            },
            {
                title: '资质组编码',
                key: 'docGroupSn',
                dataIndex: 'docGroupSn'
            },
            {
                title: '资质组名称',
                key: 'docGroupName',
                dataIndex: 'docGroupName',
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
            title="添加资质组"
            width={888}
            maskClosable={false}
            visible={zzVisible}
            onOk={() => {
                if (this.state.changeList.length <= 0) {
                    return message.error('请至少选择一个资质组添加！');
                }
                this.setState({
                    saveSelectedRowKeys: this.state.selectedRowKeys,
                    saveChangeList: this.state.changeList,
                    zzVisible: false,
                })
            }}
            onCancel={() => {
                this.setState({zzVisible: false})
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
                            创建时间：
                            <RangePicker
                                style={{width: '80%'}}
                                value={
                                    requestPar.startTime ?
                                        [moment(requestPar.startTime, 'YYYY-MM-DD'), moment(requestPar.endTime, 'YYYY-MM-DD')] : null
                                }
                                onChange={(date, dateString) => {
                                    this.setState({
                                        requestPar: {
                                            ...requestPar,
                                            startTime: dateString[0] || '',
                                            endTime: dateString[1] || '',
                                        }
                                    });
                                }}
                            />
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
        </Modal>
    }

    handleSubmit = () => {
        this.setState({loading: true});
        const {validateFields} = this.formRef.current;
        validateFields().then(values => {

            if (this.id) {
                values.docParentId = this.id;
                delete values.createTime;
            }
            if ('2' === '' + values.type || '4' === '' + values.type) {
                values.softId = this.state.rowSoft.id;
                values.serviceTag = this.state.rowSoft.serviceTag;
                values.softName = this.state.rowSoft.name;
            } else {
                values.softId = '';
                values.serviceTag = '';
                values.softName = '';
            }
            if (this.state.saveChangeList.length <= 0) {
                message.error('请添加资质组！');
                this.setState({loading: false});
                return false;
            }
            values.docGroup = this.state.saveChangeList.map(item => {
                return {
                    docGroupId: item.docGroupId,
                    docVOList: item.docVOList && item.docVOList.map(cItem => {
                        return {
                            docId: cItem.id
                        }
                    })
                }
            });

            Model.UserAttDocPSave({docParentMessage: JSON.stringify(values)}, (res) => {
                message.success('保存成功！');
                this.props.history.push('/Pages/AttGroupList');
            }, (err) => {
                this.setState({loading: false});
            });

        }).catch(() => {
            this.setState({loading: false});
        });
    }
}

export default AttGroupEditor
