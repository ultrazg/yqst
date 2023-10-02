/**
 * Created by yb on 2019/11/21
 */

import React, {Component} from 'react';
import {Form, Button, Modal, Card, Table, Row, Col, message, Input, Popconfirm} from 'antd';
import {DownloadOutlined, CopyOutlined, PlusOutlined} from '@ant-design/icons';
import Model from "../../Model";
import UploadMod from './UploadMod';
import AssemblySet from "../../../../baseview/assemblySet/AssemblySet";
import oDownLoad from "../../../../utils/download";
import ApiConst from "../../../../base/urls/ApiConst";
import ApiInterface from "../../../../base/urls/ApiInterface";
import {CheckOutlined} from '@ant-design/icons'

class RightMod extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            loading: false,
            downloadLoading: false,
            batchImportVisible: false,
            list: [],
        };
        this.formRef = this.props.formRef;
    }

    componentDidMount() {
        this.setState({list: this.props.pState.rigPar.authList});
    }

    // 视图层
    render() {
        return (
            <div>
                {this.makeQXView()}
                {this.makeMod()}
                {this.makeUploadMod()}
            </div>
        );
    }

    getAuthPage() {
        Model.CServeSAPage({
            current: 1,
            pageSize: 10000,
            softId: this.props.pState.data.id,
        }, (res) => {
            this.setState({
                list: res.data.records || []
            }, this.outCallBack)
        }, (err) => {
        });
    }

    makeQXView() {
        const columns = [
            {
                title: '权限ID',
                key: 'id',
                dataIndex: 'id',
            },
            {
                title: '功能模块',
                key: 'parentName',
                dataIndex: 'parentName',
                render: (res, data, idx) => {
                    return data.id ? res : <Input value={res} placeholder="请输入" maxLength={30}
                                                  onChange={(e) => {
                                                      this.state.list[idx].parentName = e.target.value;
                                                      this.setState({list: this.state.list}, this.outCallBack);
                                                  }}
                    />;
                }
            },
            {
                title: '功能名称',
                key: 'resName',
                dataIndex: 'resName',
                render: (res, data, idx) => {
                    return data.id ? res : <Input value={res} placeholder="请输入" maxLength={30}
                                                  onChange={(e) => {
                                                      this.state.list[idx].resName = e.target.value;
                                                      this.setState({list: this.state.list}, this.outCallBack);
                                                  }}
                    />;
                }
            },
            {
                title: '功能描述',
                key: 'resDesc',
                dataIndex: 'resDesc',
                render: (res, data, idx) => {
                    return data.id ? res : <Input value={res} placeholder="请输入" maxLength={200}
                                                  onChange={(e) => {
                                                      this.state.list[idx].resDesc = e.target.value;
                                                      this.setState({list: this.state.list}, this.outCallBack);
                                                  }}
                    />;
                }
            },
            {
                title: '权限编码',
                key: 'resCode',
                dataIndex: 'resCode',
                render: (res, data, idx) => {
                    return data.id ? res : <Input value={res} placeholder="请输入" maxLength={20}
                                                  onChange={(e) => {
                                                      const numAndLet = /^[0-9a-zA-Z]+$/;
                                                      if (e.target.value && !numAndLet.test(e.target.value))
                                                          return message.error('编码只能是数字或者字母！');

                                                      this.state.list[idx].resCode = e.target.value;
                                                      this.setState({list: this.state.list}, this.outCallBack);
                                                  }}
                    />;
                }
            },
            {
                title: '操作',
                key: '',
                dataIndex: '',
                width: 90,
                render: (res, data, idx) => {
                    return <div>
                        <Popconfirm
                            placement="topRight"
                            title="确认要删除该数据吗？"
                            onConfirm={() => {
                                this.state.list.splice(idx, 1);
                                this.setState({
                                    list: this.state.list,
                                }, this.outCallBack);
                            }}
                            onCancel={() => {
                            }}
                            okText="确认"
                            cancelText="取消"
                        >
                            <a style={{color: '#f00'}}>删除</a>
                        </Popconfirm>
                    </div>
                }
            },
        ];
        const dataSource = this.state.list.map((item, idx) => {
            return {
                ...item,
                key: idx,
            }
        });
        return <Card
            type="inner"
            title={
                <Row>
                    <Col span={12} style={{lineHeight: '30px'}}>权限配置</Col>
                    <Col span={12} style={{textAlign: 'right'}}>
                        <Button
                            type='primary'
                            icon={<DownloadOutlined/>}
                            style={{marginRight: 15}}
                            loading={this.state.downloadLoading}
                            onClick={this.downloadTemplateFile}
                        >下载模板</Button>
                        <Button icon={<CopyOutlined/>} type='primary' style={{marginRight: 15}}
                                onClick={() => this.setState({batchImportVisible: true})}
                        >批量导入</Button>
                        <Button icon={<PlusOutlined/>} type='primary' onClick={() => {
                            this.setState({
                                visible: true,
                                changeIdx: false,
                                loading: false,
                            });
                        }}>新增</Button>
                    </Col>
                </Row>
            }
        >
            <Table
                columns={columns}
                dataSource={dataSource || []}
                pagination={false}
            />
        </Card>
    }

    makeMod() {
        const assData = [
            {
                key: 'resCode', type: 'Input', span: 24, placeholder: '请填写(仅限英文及数字字符)', label: '权限编码',
                value: '',
                options: {
                    rules: [
                        {
                            required: true, message: '权限编码不能为空',
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                const numAndLet = /^[0-9a-zA-Z]+$/;
                                if (value && !numAndLet.test(value)) {
                                    return Promise.reject('编码只能是数字或者字母！');
                                }
                                return Promise.resolve();
                            },
                        }),
                    ],
                },
                attribute: {
                    maxLength: 20
                }
            },
            {
                key: 'parentName', type: 'Input', span: 24, placeholder: '请填写', label: '功能模块',
                value: '',
                options: {
                    rules: [{
                        required: true, message: '功能模块不能为空',
                    }],
                },
                attribute: {
                    maxLength: 30
                }
            },
            {
                key: 'resName', type: 'Input', span: 24, placeholder: '请填写', label: '功能名称',
                value: '',
                options: {
                    rules: [{
                        required: true, message: '功能名称不能为空',
                    }],
                },
                attribute: {
                    maxLength: 30
                }
            },
            {
                key: 'resDesc', type: 'Input', value: '', label: '功能描述', placeholder: '请填写功能描述', span: 24,
                attribute: {
                    maxLength: 200,
                    style: {
                        width: '100%',
                        height: '100px',
                    },
                    type: "textarea",
                },
            },
        ];

        return <Modal
            title="新增权限"
            width={500}
            visible={this.state.visible}
            footer={null}
            onOk={() => {
            }}
            onCancel={() => {
                this.onCancel();
            }}
        >
            <Form ref={this.formRef} autoComplete="off" onFinish={this.onModSubmit.bind(this)}>
                <AssemblySet key={'mod_'} data={assData} form={this.formRef.current}/>
                <div style={{textAlign: 'right', marginTop: '24px'}}>
                    <Button style={{marginRight: 15}} onClick={() => {
                        this.onCancel();
                    }}>取消</Button>
                    <Button type="primary" htmlType="submit" icon={<CheckOutlined/>} loading={this.state.loading}>
                        保存
                    </Button>
                </div>
            </Form>
        </Modal>
    }

    onCancel() {
        this.setState({
            visible: false,
            loading: false,

        }, () => {
            this.formRef.current.setFieldsValue({
                resCode: '',
                parentName: '',
                resName: '',
                resDesc: '',
            });

        });
    }

    // 模板下载逻辑
    downloadTemplateFile = () => {
        // 给下载按钮设置 loading,防止网络慢疯狂点击导致下载很多个文件
        this.setState({downloadLoading: true});
        setTimeout(() => {
            this.setState({downloadLoading: false});
        }, 1500);

        const sessionKey = localStorage.getItem('sessionKey');
        const url = `${ApiConst.Versions().sunaw + ApiInterface.CServeSARDownload}?sessionKey=${sessionKey}`;
        oDownLoad(url);
    };

    makeUploadMod() {
        return <UploadMod
            visible={this.state.batchImportVisible}
            handleOk={() => {
                // 批量添加点击确定逻辑
            }}
            handleCancel={() => this.setState({batchImportVisible: false})}
            refresh={(res) => {
                const resList = res.data ? res.data : [];
                this.setState({
                    list: [
                        ...this.state.list,
                        ...resList,
                    ],
                }, this.outCallBack)
            }}
        />
    }

    onModSubmit(values) {
        this.setState({loading: true});
        const {validateFields, setFieldsValue} = this.formRef.current;
        validateFields(['resCode', 'parentName', 'resName', 'resDesc']).then(values => {
            this.state.list.push(values);

            this.setState({
                list: this.state.list,
                loading: false,
                visible: false,

            }, () => {
                setFieldsValue({
                    resCode: '',
                    parentName: '',
                    resName: '',
                    resDesc: '',
                });
                this.outCallBack();

            });
        }).catch(err => {
            this.setState({loading: false});
        })
    }

    outCallBack() {
        const newAuthList = this.state.list.map(item => {
            item.id = item.id ? item.id : '';
            return item
        });
        this.props.callBack && this.props.callBack({
            authList: newAuthList
        });
    }

}

export default RightMod
