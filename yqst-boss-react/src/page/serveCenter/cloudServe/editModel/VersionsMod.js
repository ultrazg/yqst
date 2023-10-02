/**
 * Created by yb on 2019/11/20
 */

import React, {Component} from 'react';
import {Form, Button, Modal, Card, Row, Col, Popconfirm} from 'antd';
import {CheckOutlined} from '@ant-design/icons';
import Model from "../../Model";
import moment from 'moment'
import SWTable from 'SWViews/table';
import AssemblySet from "../../../../baseview/assemblySet/AssemblySet";



class VersionsMod extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            loading: false,
            list: [],
            changeIdx: false,
        };
        this.formRef = this.props.formRef;
    }

    componentDidMount() {
        const newList = this.props.pState.verPar.list && this.props.pState.verPar.list.map(item => {
            return {
                ...item,
                logUpdateTime: item.logUpdateTime ? moment(item.logUpdateTime).format('YYYY-MM-DD') : '',
            }
        });
        this.setState({
            list: newList
        })
    }

    // 视图层
    render() {
        return (
            <div>
                {this.makeBBView()}
                {this.makeMod()}
            </div>
        );
    }

    getVersionPage(){
        Model.CServeSVPage({
            current: 1,
            pageSize: 10000,
            softId: this.props.pState.data.id,

        }, (res) => {
            this.setState({
                list: res.data.records || [],
            }, this.outCallBack)
        }, (err) => {});
    }

    makeBBView(){
        const columns = [
            {
                title: '版本',
                key: 'softVersion',
                dataIndex: 'softVersion',
                width: 120,
            },
            {
                title: '更新时间',
                key: 'logUpdateTime',
                dataIndex: 'logUpdateTime',
                width: 120,
                render: (res) => {
                    let times = res ? moment(res).format('YYYY-MM-DD') : '';
                    return times
                }
            },
            {
                title: '更新说明',
                key: 'memo',
                dataIndex: 'memo',
            },
            {
                title: '操作',
                key: '',
                dataIndex: '',
                width: 120,
                render: (res, data, idx) => {
                    return <div>
                        <a onClick={() => {
                            this.setState({
                                visible: true,
                                changeIdx: idx,
                            }, () => {
                                let date = res.logUpdateTime ? moment(res.logUpdateTime).format('YYYY-MM-DD') : null;
                                if(date)
                                    date = moment(date);

                                setTimeout(() => {
                                    this.formRef.current.setFieldsValue({
                                        softVersion: res.softVersion,
                                        memo: res.memo,
                                        logUpdateTime: date,
                                    });
                                }, 100)

                            })
                        }}>编辑</a>
                        <span style={{
                            margin: '0 10px',
                            borderRight: '1px solid #d7d6d6',
                        }}/>
                        <Popconfirm
                            title="确认要删除该数据吗？"
                            onConfirm={() => {
                                this.state.list.splice(idx, 1);
                                this.setState({
                                    list: this.state.list,
                                }, () => {
                                    this.outCallBack();
                                })
                            }}
                            onCancel={() => {}}
                            okText="确认"
                            cancelText="取消"
                        >
                            <a style={{color: '#f00'}}>删除</a>
                        </Popconfirm>
                    </div>
                }
            },
        ];
        return <Card
            type="inner"
            title={
                <Row>
                    <Col span={12} style={{lineHeight: '30px'}}>版本情况</Col>
                    <Col span={12} style={{textAlign: 'right'}}>
                        <Button type='primary' onClick={() => {
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
            <SWTable
                columns={columns}
                dataSource={this.state.list || []}
                pagination={false}
            />
        </Card>
    }

    makeMod(){
        const assData = [
            {
                key: 'softVersion', type: 'Input', span: 24, placeholder: '请填写版本', label: '版本',
                value: '',
                options: {
                    rules: [{
                        required: true, message: '版本不能为空',
                    }],
                },
                attribute: {
                    maxLength: 20
                }
            },
            {
                key: 'logUpdateTime', type: 'DatePicker', span: 24, label: '更新时间', placeholder: '请选择更新时间',
                value: null,
                options: {
                    rules: [{
                        required: true, message: '更新时间不能为空',
                    }],
                },
            },
            {
                key: 'memo', type: 'Input', value: '', label: '更新说明', placeholder: '请填写更新说明', span: 24,
                options: {
                    rules: [{
                        required: true, message: '更新说明不能为空',
                    }],
                },
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
            title={this.state.changeIdx || '0' === '' + this.state.changeIdx ? '编辑版本详情' : '新增版本详情'}
            width={500}
            visible={this.state.visible}
            footer={null}
            onOk={() => {}}
            onCancel={() => {
                this.onCancel();
            }}
        >
            <AssemblySet key={'mod_'} data={assData} form={this.formRef.current}/>
            <div style={{textAlign: 'right', marginTop: '24px'}}>
                <Button style={{marginRight: 15}} onClick={() => {
                    this.onCancel();
                }}>取消</Button>
                <Button
                    type="primary"
                    icon={<CheckOutlined />}
                    loading={this.state.loading}
                    onClick={this.onModSubmit.bind(this)}
                >
                    保存
                </Button>
            </div>
        </Modal>
    }

    onCancel(){
        this.setState({
            visible: false,
            changeIdx: false,
            loading: false,

        }, () => {
            this.formRef.current.setFieldsValue({
                softVersion: '',
                memo: '',
                logUpdateTime: null,
            });

        });
    }

    onModSubmit(e){
        this.setState({loading: true});
        const {validateFields} = this.formRef.current;
        validateFields(['softVersion', 'logUpdateTime', 'memo']).then((values) => {
            if(this.state.changeIdx || '0' === '' + this.state.changeIdx){
                if(this.state.list[this.state.changeIdx].id)
                    values.id = this.state.list[this.state.changeIdx].id;

                this.state.list.splice(this.state.changeIdx, 1, values);

            }else{
                this.state.list.push(values);

            }
            values.logUpdateTime = values.logUpdateTime ? moment(values.logUpdateTime).format('YYYY-MM-DD') : '';

            this.setState({
                list: this.state.list,
                loading: false,
                visible: false,

            }, () => {
                this.formRef.current.setFieldsValue({
                    softVersion: '',
                    memo: '',
                    logUpdateTime: null,
                });
                this.outCallBack();

            });
        }).catch(()=>{
            this.setState({loading: false});
        })
    }

    outCallBack(){
        this.props.callBack && this.props.callBack(this.state.list);
    }
}

export default VersionsMod
