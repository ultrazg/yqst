/**
 * Created by yb on 2019/09/129
 */

import React, {Component} from 'react';
import {Form, Button, Modal, Card, Table, Row, Col, Input, Radio, Popconfirm, Switch, message} from 'antd';
import {Link} from "react-router-dom";
import Model from "../../Model";
import moment from 'moment'
import SWTable from 'SWViews/table';
import difference from 'lodash/difference';
import union from 'lodash/union';
import unionWith from 'lodash/unionWith';
import uniqBy from 'lodash/uniqBy';
import Ellipsis from "../../../../baseview/Ellipsis";
import AssemblySet from "../../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../../baseview/viewContent/ViewContent";
import {CheckOutlined, RollbackOutlined, PlusOutlined} from '@ant-design/icons'

const {Search} = Input;
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


class InvoiceTemplateEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            loading: false,

            // 分类有关参数
            flVisible: false,
            flList: [],
            flTotal: 0,
            flRequestPar: {
                current: 1,
                pageSize: 10,
                keyWord: '',
            },
            onFLData: {},

            // 要素组有关参数
            visible: false,
            list: [],
            total: 0,
            requestPar: {
                current: 1,
                pageSize: 10,
                keyWord: '',
                isElement: 1,
            },
            selectedRowKeys: [],
            saveSelectedRowKeys: [],
            changeList: [],
            saveChangeList: [],
        };
        this.id = '';
        this.crumb = [
            {name: '税票中心'},
            {name: "基本设置"},
            {name: "发票模板列表", link: '/Pages/InvoiceTemplateList'},
            {name: "新增发票模板"}
        ];
    }

    componentDidMount() {
        this.id = this.props.location.search.substr(1).split("=")[1];
        if (this.id) {
            this.getInfo();
            this.crumb = [
                {name: '税票中心'},
                {name: "基本设置"},
                {name: "发票模板列表", link: '/Pages/InvoiceTemplateList'},
                {name: "发票模板详情", link: `/Pages/InvoiceTemplateDetail?id=${this.id}`},
                {name: "编辑发票模板"}
            ];
        }
    }

    // 视图层
    render() {
        return (
            <Form autoComplete="off" onSubmit={this.handleSubmit.bind(this)}>
                <ViewContent
                    crumb={this.crumb}
                    topBtn={
                        <div>
                            <Button htmlType="submit" type="primary" icon={<CheckOutlined/>}
                                    loading={this.state.loading}>保存</Button>
                            <Link style={{marginLeft: 15}}
                                  to={this.id ? `/Pages/InvoiceTemplateDetail?id=${this.id}` : '/Pages/InvoiceTemplateList'}
                            >
                                <Button icon={<RollbackOutlined/>}>返回</Button>
                            </Link>
                        </div>
                    }
                >
                    {this.makeBaseView()}
                    {this.makeFLModalView()}
                    {this.makeModalView()}
                </ViewContent>
            </Form>
        );
    }

    getInfo() {
        Model.InvoiceTGet({templateId: this.id}, (res) => {
            const newKey = res.data.elementGroupVO && res.data.elementGroupVO.map(item => {
                item.key = item.groupId;
                return item.key
            });

            this.setState({
                data: res.data,
                onFLData: {
                    classifyId: res.data.classifyId,
                    classifySn: res.data.classifySn,
                    classifyName: res.data.classifyName,
                },
                saveChangeList: res.data.elementGroupVO || [],
                saveSelectedRowKeys: newKey
            });
        }, (err) => {
        });
    }

    getFLList(current) {
        this.state.flRequestPar.current = current ? current : this.state.flRequestPar.current;

        Model.InvoiceCPage(this.state.flRequestPar, (res) => {
            let newList = res.data.records && res.data.records.map(item => {
                item.key = item.classifyId;
                item.onChecked = false;
                if ('' + this.state.onFLData.classifyId === '' + item.classifyId) {
                    item.onChecked = true;
                }
                return item;
            });
            this.setState({
                flList: newList || [],
                flTotal: res.data.total || 0,
                flVisible: true,
                flRequestPar: this.state.flRequestPar
            })
        }, (err) => {
        })
    }

    getList(current) {
        this.state.requestPar.current = current ? current : this.state.requestPar.current;

        Model.InvoiceEGPage(this.state.requestPar, (res) => {
            const newList = res.data.records && res.data.records.map((item, idx) => {
                return {
                    ...item,
                    key: item.groupId
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
                        key: 'templateId',
                        type: 'Texts',
                        label: '发票模板ID',
                        span: 12,
                        formItemLayout,
                        value: data.templateId
                    } : {},
                    this.id ? {
                        key: 'createTime', type: 'Texts', label: '产生时间', span: 12, formItemLayout,
                        value: data.createTime ? moment(data.createTime).format('YYYY-MM-DD HH:mm:ss') : ''
                    } : {},
                    {
                        key: 'templateSn',
                        type: 'Input',
                        span: 12,
                        value: data.templateSn || '',
                        formItemLayout,
                        placeholder: '请填写(仅限英文及数字字符)',
                        label: '模板编码',
                        options: {
                            rules: [{
                                required: true, message: '模板编码不能为空',
                            }, {
                                validator: (rule, value, callback) => this.checkValidator(rule, value, callback)
                            }],
                        },
                        attribute: {
                            maxLength: 50
                        }
                    },
                    {
                        key: 'templateName',
                        type: 'Input',
                        span: 12,
                        value: data.templateName || '',
                        formItemLayout,
                        placeholder: '请填写',
                        label: '模板名称',
                        options: {
                            rules: [{
                                required: true, message: '模板名称不能为空',
                            }],
                        },
                        attribute: {
                            maxLength: 50
                        }
                    },
                    this.id ? {
                        key: 'status', type: 'Select', span: 12, formItemLayout, label: '状态',
                        value: data.status || '1',
                        options: {
                            rules: [{
                                required: true, message: '状态不能为空',
                            }],
                        },
                        data: {
                            list: [
                                {
                                    value: '1',
                                    name: '关闭中'
                                },
                                {
                                    value: '2',
                                    name: '开启中'
                                }
                            ]
                        }
                    } : {},
                    {
                        key: 'memo',
                        type: 'Input',
                        value: data.memo || '',
                        formItemLayout,
                        label: '备注',
                        placeholder: '可根据需要填写',
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
            }
        ];
        const columns = [
            {
                title: '发票要素ID',
                key: 'elementId',
                dataIndex: 'elementId',
            },
            {
                title: '发票要素编码',
                key: 'elementSn',
                dataIndex: 'elementSn',
            },
            {
                title: '要素名称',
                key: 'elementName',
                dataIndex: 'elementName',
            },
            {
                title: '是否显示',
                key: 'isDisplay',
                dataIndex: 'isDisplay',
                render: (res, data, idx) => {
                    return <Switch checkedChildren="是" unCheckedChildren="否" checked={'1' === '' + res}
                                   onClick={(val) => {
                                       this.state.saveChangeList[data.pIdx].elementListVO[idx].isDisplay = val ? 1 : 0;
                                       this.setState({saveChangeList: this.state.saveChangeList});
                                   }}
                    />
                }
            },
            {
                title: '是否必填',
                key: 'isRequired',
                dataIndex: 'isRequired',
                render: (res, data, idx) => {
                    return <Switch checkedChildren="是" unCheckedChildren="否" checked={'1' === '' + res}
                                   onClick={(val) => {
                                       this.state.saveChangeList[data.pIdx].elementListVO[idx].isRequired = val ? 1 : 0;
                                       this.setState({saveChangeList: this.state.saveChangeList});
                                   }}
                    />
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
                        <AssemblySet key={item.key} data={item.data} form={this.props.form}/>
                    </Card>
                })
            }

            <Card
                type="inner"
                title="应用的发票分类"
                style={{marginTop: 15}}
            >
                <div style={{
                    position: 'absolute',
                    right: 10,
                    top: 10,
                }}>
                    <Button type="primary" icon={<PlusOutlined/>} onClick={() => {
                        this.setState({
                            flRequestPar: {
                                ...this.state.flRequestPar,
                                current: 1
                            }
                        }, () => {
                            this.getFLList()
                        });
                    }}>添加</Button>
                </div>
                {
                    this.state.onFLData.classifyId && <AssemblySet key={'onFLDataKey'} data={[
                        {
                            key: 'classifyId',
                            type: 'Texts',
                            label: '发票分类ID',
                            span: 12,
                            formItemLayout,
                            value: this.state.onFLData.classifyId
                        },
                        {
                            key: 'classifySn',
                            type: 'Texts',
                            label: '发票分类编码',
                            span: 12,
                            formItemLayout,
                            value: this.state.onFLData.classifySn
                        },
                        {
                            key: 'templateId',
                            type: 'Texts',
                            label: '发票分类名称',
                            span: 12,
                            formItemLayout,
                            value: this.state.onFLData.classifySn
                        },
                    ]} form={this.props.form}/>
                }
                {
                    !this.state.onFLData.classifyId && <div style={{
                        textAlign: 'center',
                        color: '#ccc',
                        fontSize: 20
                    }}>
                        请添加分类......
                    </div>
                }
            </Card>

            <Card
                type="inner"
                title="发票要素组"
                style={{marginTop: 15}}
            >
                <div style={{
                    position: 'absolute',
                    right: 10,
                    top: 10,
                }}>
                    <Button type="primary" icon={<PlusOutlined/>} onClick={() => {
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
                </div>
                {
                    this.state.saveChangeList.length > 0 && this.state.saveChangeList.map((item, idx) => {
                        let newElementListVO = item.elementListVO && item.elementListVO.map(cItem => {
                            return {
                                ...cItem,
                                pIdx: idx,
                                key: cItem.elementId,
                            }
                        });
                        return <Card
                            type="inner"
                            title={<Row>
                                <Col span={22}>
                                    <Col span={8}>发票要素组ID：{item.groupId}</Col>
                                    <Col span={8}>
                                        发票要素组编码：
                                        <Ellipsis length={20} tooltip={true}>{item.groupSn}</Ellipsis>
                                    </Col>
                                    <Col span={8}>
                                        发票要素组名称：
                                        <Ellipsis length={20} tooltip={true}>{item.groupName}</Ellipsis>
                                    </Col>
                                </Col>
                                <Col span={2} style={{textAlign: 'right'}}>
                                    <Popconfirm
                                        title="确认要删除该要素组吗？"
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
                                        <Button type="danger">删除</Button>
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
                        请添加要素组......
                    </div>
                }
            </Card>
        </div>;
    }

    makeFLModalView() {
        let {flVisible, flList, flRequestPar, onFLData} = this.state;
        const columns = [
            {
                title: '选项',
                key: '',
                dataIndex: '',
                render: (res) => {
                    return <Radio checked={res.onChecked} onChange={(e) => {
                        let newList = flList.map(item => {
                            item.onChecked = false;
                            if ('' + res.classifyId === '' + item.classifyId) {
                                item.onChecked = true;
                            }
                            return item;
                        });
                        this.setState({flList: newList})
                    }}/>
                }
            },
            {
                title: '发票分类ID',
                key: 'classifyId',
                dataIndex: 'classifyId',
            },
            {
                title: '发票分类编码',
                key: 'classifySn',
                dataIndex: 'classifySn',
            },
            {
                title: '分类名称',
                key: 'classifyName',
                dataIndex: 'classifyName',
            },
            {
                title: '产生时间',
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
            title="选择发票要素"
            width={888}
            maskClosable={false}
            visible={flVisible}
            onOk={() => {
                flList.forEach(item => {
                    if (item.onChecked) {
                        onFLData = item;
                        return false;
                    }
                });
                this.setState({onFLData, flVisible: false});
            }}
            onCancel={() => {
                this.setState({flVisible: false})
            }}
        >
            <Search enterButton value={this.state.flRequestPar.keyWord} placeholder="可查询ID、编码、名称"
                    onChange={(e) => {
                        this.setState({
                            flRequestPar: {
                                ...this.state.flRequestPar,
                                keyWord: e.target.value,
                            }
                        })
                    }}
                    onSearch={value => {
                        this.getFLList(1);
                    }}
                    style={{marginBottom: 15}}
            />
            <Table
                columns={columns}
                dataSource={flList}
                pagination={
                    {
                        total: this.state.flTotal,
                        current: flRequestPar.current,
                        pageSize: flRequestPar.pageSize,
                        onChange: (a, b) => {
                            flRequestPar.current = a;
                            this.setState({flRequestPar}, () => {
                                this.getFLList();
                            })
                        },
                        showTotal: (total, range) => `共有${total}条`
                    }
                }
            />
        </Modal>
    }

    makeModalView() {
        let {visible, selectedRowKeys, list, requestPar, changeList} = this.state;
        const columns = [
            {
                title: '要素组ID',
                key: 'groupId',
                dataIndex: 'groupId',
            },
            {
                title: '要素组编码',
                key: 'groupSn',
                dataIndex: 'groupSn',
            },
            {
                title: '要素组名称',
                key: 'groupName',
                dataIndex: 'groupName',
            },
            {
                title: '产生时间',
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
            title="选择发票要素组"
            width={888}
            maskClosable={false}
            visible={visible}
            onOk={() => {
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
            <Search enterButton value={this.state.requestPar.keyWord} placeholder="可查询ID、编码、名称"
                    onChange={(e) => {
                        this.setState({
                            requestPar: {
                                ...this.state.requestPar,
                                keyWord: e.target.value,
                            }
                        })
                    }}
                    onSearch={value => {
                        this.getList(1);
                    }}
                    style={{marginBottom: 15}}
            />
            <Table
                columns={columns}
                dataSource={list}
                rowSelection={rowSelection}
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

    handleSubmit(e) {
        e.preventDefault();
        this.setState({loading: true});
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                if (this.id) {
                    values.id = this.id;
                }
                if (!this.state.onFLData.classifyId) {
                    message.error('请添加发票分类！');
                    this.setState({loading: false});
                    return false;
                }
                if (this.state.saveChangeList.length <= 0) {
                    message.error('请添加发票要素组！');
                    this.setState({loading: false});
                    return false;
                }
                values.classifyId = this.state.onFLData.classifyId;
                values.groupListVO = this.state.saveChangeList.map(item => {
                    return {
                        gid: item.groupId,
                        elementListVO: item.elementListVO.map(cItem => {
                            return {
                                id: cItem.elementId,
                                isDisplay: cItem.isDisplay,
                                isRequired: cItem.isRequired,
                            }
                        })
                    }
                });

                Model.InvoiceTSave({saveTemplateDTO: JSON.stringify(values)}, (res) => {
                    message.success('保存成功！');
                    setTimeout(() => {
                        this.props.history.push('/Pages/InvoiceTemplateList');
                    }, 100);
                }, (err) => {
                    this.setState({loading: false});
                });
            } else {
                this.setState({loading: false});
            }
        });
    }
}

export default InvoiceTemplateEditor
