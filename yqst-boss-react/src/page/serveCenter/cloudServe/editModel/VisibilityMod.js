/**
 * Created by yb on 2019/11/21
 */

import React, {Component} from 'react';
import {Form, Button, Modal, Card, Table, Tabs, Timeline, Row, Col, Select, message, Input, Popconfirm} from 'antd';
import {Link} from "react-router-dom";
import Model from "../../Model";
import moment from 'moment'
import SWTable from 'SWViews/table';
import SwitchName from "../SwitchName";
import difference from 'lodash/difference';
import union from 'lodash/union';
import unionWith from 'lodash/unionWith';
import uniqBy from 'lodash/uniqBy';
import NumberFormat from "../../../../utils/numberformat/NumberFormat";
import AssemblySet from "../../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../../baseview/viewContent/ViewContent";
import UploadFile from '../../../../baseview/uploadFile/UploadFile';
import HeadSearch from "../../../../baseview/headSearch/HeadSearch";

const { TabPane } = Tabs;
const { Option } = Select;


class VisibilityMod extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHide: '',
            visible: false,
            list: [],
            total: 0,
            requestPar: {
                current: 1,
                pageSize: 10,
                keyWord: '',
                status: 1,
            },
            selectedRowKeys: [],
            saveSelectedRowKeys: [],
            changeList: [],
            saveChangeList: [],
        };
    }

    componentDidMount() {
        let newSaveSelectedRowKeys = [];
        const newSaveChangeList = this.props.pState.visPar.listAccountList && this.props.pState.visPar.listAccountList.map(item => {
            newSaveSelectedRowKeys.push(item.userId);
            return {
                key: item.userId,
                uid: item.userId,
                accountSn: item.accountSn,
                companyName: item.userName,
            }
        });
        this.setState({
            isHide: this.props.pState.visPar.isHide,
            saveChangeList: newSaveChangeList,
            saveSelectedRowKeys: newSaveSelectedRowKeys,

        });
    }

    // 视图层
    render() {
        return (
            <div>
                {this.makeZMView()}
                {this.makeModalView()}
            </div>
        );
    }

    getSoftPage(){
        Model.CServeSLPage({
            current: 1,
            pageSize: 10000,
            softId: this.props.pState.data.id,
            type: '2' === '' + this.props.pState.data.isHide ? '1' : '2',
        }, (res) => {
            let newSaveSelectedRowKeys = [];
            const newSaveChangeList = res.data.records && res.data.records.map(item => {
                newSaveSelectedRowKeys.push(item.userId);
                return {
                    key: item.userId,
                    uid: item.userId,
                    accountSn: item.accountSn,
                    companyName: item.userName,
                }
            });
            this.setState({
                saveChangeList: newSaveChangeList,
                saveSelectedRowKeys: newSaveSelectedRowKeys
            }, this.outCallBack);

        }, (err) => {});
    }

    getList(current) {
        this.state.requestPar.current = current ? current : this.state.requestPar.current;

        Model.UserAPage(this.state.requestPar, (res) => {
            const newList = res.data.records && res.data.records.map((item, idx) => {
                return {
                    ...item,
                    key: item.uid
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

    makeZMView(){
        const columns = [
            {
                title: '企业ID',
                key: 'uid',
                dataIndex: 'uid',
            },
            {
                title: '企业号',
                key: 'accountSn',
                dataIndex: 'accountSn'
            },
            {
                title: '企业名称',
                key: 'companyName',
                dataIndex: 'companyName',
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
                            },this.outCallBack)
                        }}
                        onCancel={() => {}}
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
            <Card
                type="inner"
                title="应用桌面可见性"
            >
                <Row>
                    <Col span={12}>
                        <Row>
                            <Col span={6}
                                 style={{
                                     lineHeight: '30px',
                                     textAlign: 'right',
                                     paddingRight: '10px',
                                 }}
                            >
                                <span style={{color: '#f00'}}>*</span>可见性设置:
                            </Col>
                            <Col span={18}>
                                <Select style={{width: '260px'}} value={this.state.isHide + ''} onChange={(val) => {
                                    this.setState({
                                        isHide: val,
                                        selectedRowKeys: [],
                                        saveSelectedRowKeys: [],
                                        changeList: [],
                                        saveChangeList: [],
                                    }, this.outCallBack)
                                }}>
                                    <Option value="">请选择</Option>
                                    <Option value="0">全部显示</Option>
                                    <Option value="1">全部隐藏</Option>
                                    <Option value="2">白名单可见</Option>
                                    <Option value="3">黑名单隐藏</Option>
                                </Select>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <a style={{marginTop: 15, display: 'inline-block'}}>{SwitchName.isHideTxt(this.state.isHide)}</a>
            </Card>

            {
                ('2' === '' + this.state.isHide || '3' === '' + this.state.isHide) ? <Card
                    type="inner"
                    title={
                        <Row>
                            <Col span={12} style={{lineHeight: '30px'}}>已选择企业</Col>
                            <Col span={12} style={{textAlign: 'right'}}>
                                <Button type="primary" onClick={() =>{
                                    this.setState({
                                        selectedRowKeys: this.state.saveSelectedRowKeys,
                                        changeList: this.state.saveChangeList,
                                        requestPar: {
                                            ...this.state.requestPar,
                                            current: 1
                                        }
                                    }, () => {this.getList(1);});
                                }}>选择</Button>
                            </Col>
                        </Row>
                    }
                    style={{marginTop: 15}}
                >
                    {
                        this.state.saveChangeList.length > 0 && <SWTable
                            columns={columns}
                            dataSource={this.state.saveChangeList}
                            // pagination={false}
                        />
                    }
                    {
                        this.state.saveChangeList.length <= 0 && <div style={{
                            textAlign: 'center',
                            color: '#ccc',
                            fontSize: 20
                        }}>
                            请添加企业......
                        </div>
                    }
                </Card> : null
            }
        </div>
    }

    makeModalView(){
        let { visible, selectedRowKeys, list, requestPar, changeList } = this.state;
        const columns = [
            {
                title: '企业ID',
                key: 'uid',
                dataIndex: 'uid',
            },
            {
                title: '企业号',
                key: 'accountSn',
                dataIndex: 'accountSn'
            },
            {
                title: '企业名称',
                key: 'companyName',
                dataIndex: 'companyName',
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
                        if('' + item.key === '' + cKey){
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
                        if('' + item.key === '' + cKey){
                            isChange = false;
                        }
                    });
                    if(isChange){
                        newChangeList.push(item);
                    }
                });

                this.setState({selectedRowKeys, changeList: newChangeList});
            },
        };

        return <Modal
            title="选择企业"
            width={888}
            maskClosable={false}
            visible={visible}
            onOk={() => {
                if(this.state.changeList.length <= 0){
                    return message.error('请至少选择一个企业添加！');
                }
                this.setState({
                    saveSelectedRowKeys: this.state.selectedRowKeys,
                    saveChangeList: this.state.changeList,
                    visible: false,
                }, this.outCallBack)
            }}
            onCancel={() => {
                this.setState({visible: false})
            }}
        >
            <Row style={{marginBottom: 15}}>
                <Col span={20}>
                    <Col span={24}>
                        关键字：
                        <Input maxLength={30} value={requestPar.keyWord} style={{ width: '80%' }} placeholder={'可查询企业ID、名称'} onChange={(e) => {
                            this.setState({
                                requestPar: {
                                    ...requestPar,
                                    keyWord: e.target.value
                                }
                            });
                        }}/>
                    </Col>
                </Col>
                <Col span={4}>
                    <Button onClick={() => {
                        this.setState({
                            requestPar: {
                                current: 1,
                                pageSize: 10,
                                keyWord: '',
                                status: 1,
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

    outCallBack(){
        this.props.callBack && this.props.callBack({
            isHide: this.state.isHide,
            listAccountList: this.state.saveChangeList.map(item => {
                return {
                    userId: item.uid,
                    accountSn: item.accountSn,
                    userName: item.companyName,
                }
            }),
        });
    }

}

export default VisibilityMod
