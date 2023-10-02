/**
 * Created by yb on 2019/09/129
 */

import React, {Component} from 'react';
import {Form, Button, Modal, Card, Table, Input, message, Popconfirm} from 'antd';
import {Link} from "react-router-dom";
import Model from "../../Model";
import moment from 'moment'
import SWTable from 'SWViews/table';
import difference from 'lodash/difference';
import union from 'lodash/union';
import unionWith from 'lodash/unionWith';
import uniqBy from 'lodash/uniqBy';
import AssemblySet from "../../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../../baseview/viewContent/ViewContent";
import {RollbackOutlined, CheckOutlined, PlusOutlined} from '@ant-design/icons'

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


class InvoiceElementGroupEditor extends Component {
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
            {name: "发票要素组列表", link: '/Pages/InvoiceElementGroupList'},
            {name: "新增发票要素组"}
        ];
    }

    componentDidMount() {
        this.id = this.props.location.search.substr(1).split("=")[1];
        if (this.id) {
            this.getInfo();
            this.crumb = [
                {name: '税票中心'},
                {name: "基本设置"},
                {name: "发票要素组列表", link: '/Pages/InvoiceElementGroupList'},
                {name: "发票要素组详情", link: `/Pages/InvoiceElementGroupDetail?id=${this.id}`},
                {name: "编辑发票要素组"}
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
                                  to={this.id ? `/Pages/InvoiceElementGroupDetail?id=${this.id}` : '/Pages/InvoiceElementGroupList'}
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
        Model.InvoiceEGGet({groupId: this.id}, (res) => {
            const newKey = res.data.elementListVO && res.data.elementListVO.map(item => {
                item.key = item.elementId;
                return item.key
            });
            this.setState({
                data: res.data,
                saveChangeList: res.data.elementListVO || [],
                saveSelectedRowKeys: newKey
            });
        }, (err) => {
        });
    }

    getList(current) {
        const requestPar = {
            ...this.state.requestPar,
            current: current ? current : this.state.requestPar.current,
        };
        // this.state.requestPar.current = current ? current : this.state.requestPar.current;

        Model.InvoiceEPage(requestPar, (res) => {
            const newList = res.data.records && res.data.records.map((item, idx) => {
                return {
                    ...item,
                    key: item.elementId
                }
            });
            this.setState({
                list: newList || [],
                total: res.data.total || 0,
                visible: true,
                requestPar
            })
        }, (err) => {
        });
    }

    makeBaseView() {
        let {data} = this.state;
        let allData = [
            {
                title: '基本信息',
                key: 'JBKey',
                data: [
                    this.id ? {
                        key: 'groupId',
                        type: 'Texts',
                        label: '要素组ID',
                        span: 12,
                        formItemLayout,
                        value: data.groupId
                    } : {},
                    this.id ? {
                        key: 'createTime', type: 'Texts', label: '产生时间', span: 12, formItemLayout,
                        value: data.createTime ? moment(data.createTime).format('YYYY-MM-DD HH:mm:ss') : ''
                    } : {},
                    {
                        key: 'groupSn',
                        type: 'Input',
                        span: 12,
                        value: data.groupSn || '',
                        formItemLayout,
                        placeholder: '请填写(仅限英文及数字字符)',
                        label: '要素组编码',
                        options: {
                            rules: [{
                                required: true, message: '要素组编码不能为空',
                            }, {
                                validator: (rule, value, callback) => this.checkValidator(rule, value, callback)
                            }],
                        },
                        attribute: {
                            maxLength: 50
                        }
                    },
                    {
                        key: 'groupName',
                        type: 'Input',
                        span: 12,
                        value: data.groupName || '',
                        formItemLayout,
                        placeholder: '请填写',
                        label: '要素组名称',
                        options: {
                            rules: [{
                                required: true, message: '要素组名称不能为空',
                            }],
                        },
                        attribute: {
                            maxLength: 50
                        }
                    },
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
                        <AssemblySet key={item.key} data={item.data} form={this.props.form}/>
                    </Card>
                })
            }

            <Card
                type="inner"
                title="要素详情"
                style={{marginTop: 15}}
            >
                <div style={{
                    position: 'absolute',
                    right: 10,
                    top: 10,
                }}>
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => {
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
                        请添加发票要素......
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

    makeModalView() {
        let {visible, selectedRowKeys, list, requestPar, changeList} = this.state;
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
            }
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
            title="选择发票要素"
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

    handleSubmit(e) {
        e.preventDefault();
        this.setState({loading: true});
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                if (this.id) {
                    values.id = this.id;
                }
                if (this.state.saveSelectedRowKeys.length <= 0) {
                    message.error('请添加要素详情！');
                    this.setState({loading: false});
                    return false;
                }
                const listGroupVO = this.state.saveSelectedRowKeys.map(item => {
                    return {
                        eid: item
                    }
                });
                values.listGroupVO = listGroupVO;
                Model.InvoiceEGSave({saveElementGroupDTO: JSON.stringify(values)}, (res) => {
                    message.success('保存成功！');
                    setTimeout(() => {
                        this.props.history.push('/Pages/InvoiceElementGroupList');
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

export default InvoiceElementGroupEditor
