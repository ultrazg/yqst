/**
 * Created by yb on 2019/11/6
 */

import React from 'react';
import {Button, Form, Input, message, Modal, Popconfirm} from 'antd';
import {DownloadOutlined, CopyOutlined, PlusOutlined} from '@ant-design/icons';
import Model from "../Model";
import SWTable from 'SWViews/table';
import moment from 'moment';
import {Link} from "react-router-dom";
import TabsViewContent from "../../../baseview/tabsViewContent/TabsViewContent";
import HeadSearch from "../../../baseview/headSearch/HeadSearch";
import AssemblySet from "../../../baseview/assemblySet/AssemblySet";
import NumberFormat from "../../../utils/numberformat/NumberFormat";
import ApiConst from "../../../base/urls/ApiConst";
import ApiInterface from "../../../base/urls/ApiInterface";
import oDownLoad from "../../../utils/download";
import BatchImportModal from "./SubjectBatchImportModal";


class SensitiveWordList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            total: 0,
            requestPar: {
                current: 1,
                pageSize: 10,
                keyWord: '',
                startTime: '',
                endTime: '',
            },
            visible: '', // 1（新增）；2（编辑）
            rowData: {},
            downloadLoading: false,
            batchImportVisible: false,
        };
        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.getList();
    }

    render() {
        return (
            <>
                <Form ref={this.formRef}/>
                <TabsViewContent
                    crumb={[{name: '系统管理'}, {name: "敏感词过滤"}]}
                    // tabs={this.tabsConfig()}
                    topBtn={
                        <div>
                            <Button
                                type='primary'
                                icon={<DownloadOutlined />}
                                loading={this.state.downloadLoading}
                                onClick={this.downloadTemplateFile}
                            >下载模板</Button>
                            <Button style={{marginLeft: 15}} type='primary' icon={<CopyOutlined />}
                                    onClick={() => this.setState({batchImportVisible: true})}
                            >批量添加</Button>
                            <Button style={{marginLeft: 15}} type='primary' icon={<PlusOutlined />} onClick={() =>{
                                this.setState({visible: 1}, () => {
                                    setTimeout(() => {
                                        const {resetFields} = this.formRef.current;
                                        resetFields();
                                    }, 100);
                                });
                            }}>添加</Button>
                        </div>
                    }
                >
                    {this.makeHeadSearch()}
                    {this.makeTable()}
                    {this.makeModel()}
                    {this.makeBatchImportModal()}
                </TabsViewContent>
            </>
        );
    }

    getList() {
        Model.SystemSetupASWPage(this.state.requestPar, (res) => {
            this.setState({
                list: res.data.records || [],
                total: res.data.total || 0,
                visible: '',
                batchImportVisible: false,
            })
        }, (err) => {
        })
    }

    tabsConfig(){
        return [{
            tabName: '全部', callback: () => {
                this.setState({status: 0}, () => {
                    this.getList()
                })
            }
        }, {
            tabName: '申请中', callback: () => {
                this.setState({status: 1}, () => {
                    this.getList()
                })
            }
        }, {
            tabName: '申请成功', callback: () => {
                this.setState({status: 2}, () => {
                    this.getList()
                })
            }
        }, {
            tabName: '申请失败', callback: () => {
                this.setState({status: 3}, () => {
                    this.getList()
                })
            }
        }]
    }

    makeHeadSearch() {
        const searchDatas = [
            {key: 'keyWord', type: 'Input', value: '', placeholder: '可查询ID、敏感词', label: '关键字', maxLength: 30},
            {key: 'tiems', type:'RangePicker', value:'', placeholder: ['开始时间', '结束时间'], label: '创建时间',},
            // {
            //     key: 'level', type: 'Select', value: 0, placeholder: '请选择级别', label: '级别',
            //     list: [
            //         {value: 0, name: '全部'},
            //         {value: 3, name: '超级管理员'},
            //         {value: 2, name: '管理员'},
            //         {value: 1, name: '用户'},
            //     ],
            // },
        ];
        return <HeadSearch data={searchDatas} form={this.props.form} callBack={(obj) => {
            obj.startTime = obj.tiems [0] || '';
            obj.endTime = obj.tiems [1] || '';
            obj.current = 1;

            delete obj.tiems;
            this.setState({
                requestPar: {
                    ...this.state.requestPar,
                    ...obj
                }
            }, () => {
                this.getList();
            });
        }}/>
    }

    makeTable() {
        let {list, requestPar} = this.state;
        const columns = [
            {
                title: 'ID',
                key: 'id',
                dataIndex: 'id',
                width: 90
            },
            {
                title: '敏感词',
                key: 'sensitiveWord',
                dataIndex: 'sensitiveWord',
            },
            {
                title: '创建者',
                key: 'createName',
                dataIndex: 'createName',
            },
            {
                title: '创建时间',
                key: 'createTime',
                dataIndex: 'createTime',
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
                width: 150,
                render: (res) => {
                    return <div>
                        <a onClick={() => {

                            this.setState({rowData: res, visible: '2'}, () => {
                                setTimeout(() => {
                                    const {setFieldsValue} = this.formRef.current;
                                    setFieldsValue({wordName: res.sensitiveWord});
                                }, 100);
                            });
                        }}>编辑</a>
                        <span style={{
                            margin: '0 10px',
                            borderRight: '1px solid #d7d6d6',
                        }}/>
                        <Popconfirm
                            title="确定要删除该数据吗?"
                            placement="topRight"
                            onConfirm={() => {
                                Model.SystemSetupASWDelete({
                                    id: res.id
                                }, (res) => {
                                    message.success('删除成功！', 1);
                                    this.setState({requestPar: {
                                        ...this.state.requestPar,
                                        current: list.length > 1 ? requestPar.current : requestPar.current - 1 <= 0 ? 1 : --requestPar.current
                                    }}, () => {this.getList();});
                                }, (err) => {})
                            }}
                            onCancel={() => {}}
                            okText="确定"
                            cancelText="取消"
                        >
                            <a style={{color: '#f00'}}>删除</a>
                        </Popconfirm>
                    </div>
                }
            },
        ];
        return <div>
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

    makeModel(){
        const {visible, rowData} = this.state;
        let noSetData = [
            {
                key: 'wordName',
                type: 'Input',
                value: '2' === '' + visible ? rowData.sensitiveWord : '',
                label: '敏感词名称',
                placeholder: '请输入',
                span: 24,
                options: {
                    rules: [{
                        required: true, message: '敏感词名称不能为空',
                    }],
                },
                attribute: {
                    maxLength: 30
                }
            },
        ];
        return <Modal
            title="编辑信息"
            visible={'1' === '' + visible || '2' === '' + visible}
            maskClosable={false}
            footer={null}
            // onOk={() => {}}
            onCancel={() => {
                const {resetFields} = this.formRef.current;
                resetFields();
                this.setState({visible: '', rowData: {}});
            }}
        >
            <Form ref={this.formRef} autoComplete="off" onFinish={(values) => {
                this.onSubmits(values)
            }}>
                <AssemblySet key={'modKey'} data={noSetData} form={this.formRef.current}/>
                <div style={{textAlign: 'right', borderTop: '1px solid #e8e8e8', paddingTop: '10px', marginTop: '10px'}}>
                    <Button
                        style={{marginRight: 10}}
                        onClick={()=>{
                            const {resetFields} = this.formRef.current;
                            resetFields();
                            this.setState({visible: false, rowData: {}});
                        }}
                    >取消</Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        确定
                    </Button>
                </div>
            </Form>
        </Modal>
    }

    onSubmits(values){
        if('2' === '' + this.state.visible){
            values.id = this.state.rowData.id;
        }
        Model.SystemSetupASWSave({
            ...values,
        }, (res) => {
            message.success('保存成功！');
            const {resetFields} = this.formRef.current;
            resetFields();
            this.setState(
                {
                    requestPar: {
                        ...this.state.requestPar,
                        current: 1,
                    },
                    visible: '',
                }, () => {this.getList();});
        }, (err) => {})
    }

    // 模板下载逻辑
    downloadTemplateFile = () => {
        // 给下载按钮设置 loading,防止网络慢疯狂点击导致下载很多个文件
        this.setState({downloadLoading: true});
        setTimeout(() => {
            this.setState({downloadLoading: false});
        }, 1500);

        const sessionKey = localStorage.getItem('sessionKey');
        const url = `${ApiConst.Versions().sunaw + ApiInterface.SystemSetupASWExport}?sessionKey=${sessionKey}`;
        oDownLoad(url);
    };

    makeBatchImportModal(){
        return <BatchImportModal
            visible={this.state.batchImportVisible}
            handleOk={() => {
                // 批量添加点击确定逻辑
            }}
            handleCancel={() => this.setState({batchImportVisible: false})}
            refresh={() => {
                this.getList();
            }}
        />
    }

}

export default SensitiveWordList
