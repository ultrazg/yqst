/**
 * Created by yb on 2019/11/14
 */

import React, {Component} from 'react';
import {Form, Button, Modal, Row, Col, Input, Select} from 'antd';
import Model from "../../Model";
import moment from 'moment'
import SWTable from 'SWViews/table';
import SwitchName from '../SwitchName';

const { Option } = Select;


class SoftModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            total: 0,
            requestPar: {
                current: 1,
                pageSize: 10,
                keyWord: '',
                isHide: '',
                catId: '',
                startTime: '',
                endTime: '',
                ...this.props.requestPar,
            },
        };
    }

    componentDidMount() {
        this.getList();
    }

    // 视图层
    render() {
        const {requestPar} = this.state, {visible, callBack} = this.props;
        const columns = [
            {
                title: '云服务ID',
                key: 'id',
                dataIndex: 'id',
            },
            {
                title: '云服务编码',
                key: 'softSn',
                dataIndex: 'softSn',
            },
            {
                title: '云服务名称',
                key: 'name',
                dataIndex: 'name',
            },
            {
                title: '开发者ID',
                key: 'devId',
                dataIndex: 'devId',
            },
            {
                title: '可见性',
                key: 'isHide',
                dataIndex: 'isHide',
                render: (res) => {
                    return SwitchName.isHide(res);
                }
            },
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

        return (
            <Modal
                title="查看云服务"
                width={900}
                visible={visible || false}
                onOk={() => {
                    callBack && callBack();
                }}
                onCancel={() => {
                    callBack && callBack();
                }}
            >
                <Row style={{marginBottom: 15}}>
                    <Col span={20}>
                        <Row>
                            <Col span={12}>
                                关键字：
                                <Input maxLength={30} value={requestPar.keyWord} style={{ width: '75%' }} placeholder={'可查询ID、编码、名称'} onChange={(e) => {
                                    this.setState({
                                        requestPar: {
                                            ...requestPar,
                                            keyWord: e.target.value
                                        }
                                    });
                                }}/>
                            </Col>
                            <Col span={12}>
                                可见性：
                                <Select value={requestPar.isHide} style={{ width: '75%' }} onChange={(val) => {
                                    this.setState({
                                        requestPar: {
                                            ...requestPar,
                                            isHide: val
                                        }
                                    });
                                }}>
                                    <Option value=''>全部</Option>
                                    <Option value='0'>全部可见</Option>
                                    <Option value='1'>全部隐藏</Option>
                                    <Option value='2'>白名单可见</Option>
                                    <Option value='3'>黑名单隐藏</Option>
                                </Select>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={4}>
                        <Button onClick={() => {
                            this.setState({
                                requestPar: {
                                    ...requestPar,
                                    current: 1,
                                    keyWord: '',
                                    isHide: '',
                                }
                            });
                        }}>重置</Button>
                        <Button style={{marginLeft: 10}} type="primary" onClick={() => {
                            this.getList(1);
                        }}>搜索</Button>
                    </Col>
                </Row>

                <div style={{maxHeight: 350, overflowY: 'auto', overflowX: 'hidden'}}>
                    <SWTable
                        columns={columns}
                        dataSource={this.state.list || []}
                        pagination={
                            {
                                total: this.state.total,
                                current: requestPar.current,
                                pageSize: requestPar.pages,
                                onChange: (a, b) => {
                                    this.getList(a);
                                },
                                showTotal: (total, range) => `共有${total}条`
                            }
                        }
                    />
                </div>
            </Modal>
        );
    }

    getList(current){
        let {requestPar} = this.state;
        requestPar.current = current ? current : requestPar.current;
        requestPar = this.props.listPar ? {
            ...requestPar,
            ...this.props.listPar,
        } : requestPar;

        Model.UserAttSList(requestPar, (res) => {
            this.setState({
                list: res.data.records || [],
                total: res.data.total || 0,
                requestPar,
            })
        }, (err) => {});
    }
}

export default SoftModal
