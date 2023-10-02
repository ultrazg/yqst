/**
 * Created by yb on 2019/11/21
 */

import React, {Component} from 'react';
import {Form, Button, Modal, Card, Table, Tabs, Timeline, Row, Col, Select, message, Input, Popconfirm, Checkbox} from 'antd';
import {Link} from "react-router-dom";
import Model from "../../Model";
import moment from 'moment'
import SWTable from 'SWViews/table';
import SwitchName from "../SwitchName";
import NumberFormat from "../../../../utils/numberformat/NumberFormat";
import AssemblySet from "../../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../../baseview/viewContent/ViewContent";
import UploadFile from '../../../../baseview/uploadFile/UploadFile';
import HeadSearch from "../../../../baseview/headSearch/HeadSearch";

const { TabPane } = Tabs;
const { Option } = Select;
const { confirm } = Modal;


class SpecificationMod extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            confirmList: [],
            visible: false,
            name: '',
            type: '',
            changeTypeList: [],
            editIdx: null,
        };
    }

    componentDidMount() {
        this.setState({confirmList: this.props.pState.spePar.parList});
        this.getList();
    }

    // 视图层
    render() {
        return (
            <div>
                {this.makeGGView()}
                {this.makeModalView()}
            </div>
        );
    }

    getList() {
        Model.ParamsList({}, (res) => {
            this.setState({list: this.conList(res.data || []) || []});
        }, (err) => {})
    }

    conList(list = []){
        return list.map(item => {
            item.listParTypeValueVOS = item.listParTypeValueVOS && item.listParTypeValueVOS.map((cItem, cIdx) => {
                return {
                    ...cItem,
                    isChecked: false,
                    val: '',
                    pId: item.id,
                    key: item.id + '_' + cIdx
                }
            });

            return item;
        });
    }

    makeGGView(){
        const columns = [
            {
                title: '参数规格ID',
                key: 'parId',
                dataIndex: 'parId',
            },
            {
                title: '规格名称',
                key: 'parName',
                dataIndex: 'parName'
            },
            {
                title: '规格类型',
                key: 'parTypeName',
                dataIndex: 'parTypeName',
            },
            {
                title: '单位',
                key: '',
                dataIndex: '',
                render: (res, data, idx) => {
                    const resStr = res.listParValueDTOS.map(item => {
                        return item.typeValueName
                    });
                    return resStr.join('；')
                }
            },
            {
                title: '值',
                key: '',
                dataIndex: '',
                render: (res, data, idx) => {
                    const resStr = res.listParValueDTOS.map(item => {
                        return item.parValue
                    });
                    return resStr.join('；');
                }
            },
            {
                title: '操作',
                key: '',
                dataIndex: '',
                width: 120,
                render: (res, data, idx) => {
                    return <div>
                        <a onClick={() => {
                            let NewChangeTypeList = [];
                            this.conList(this.state.list).forEach(item => {
                                if('' + res.parTypeId === '' + item.id){
                                    NewChangeTypeList = item.listParTypeValueVOS || [];
                                    NewChangeTypeList = NewChangeTypeList.map(item => {
                                        let resObj = {...item};
                                        res.listParValueDTOS.forEach(cItem => {
                                            if('' + cItem.typeValueId === '' + item.id){
                                                resObj = {
                                                    ...resObj,
                                                    isChecked: true,
                                                    val: cItem.parValue,
                                                    value: cItem.typeValueName,
                                                }
                                                return false;
                                            }
                                        });
                                        return resObj;
                                    });
                                    return false;
                                }
                            });

                            this.setState({
                                editIdx: idx,
                                visible: true,
                                name: res.parName,
                                type: res.parTypeId,
                                changeTypeList: NewChangeTypeList
                            })
                        }}>编辑</a>
                        <span style={{
                            margin: '0 10px',
                            borderRight: '1px solid #d7d6d6',
                        }}/>
                        <Popconfirm
                            title="确认要删除该条数据吗？"
                            placement="topRight"
                            onConfirm={() => {
                                this.state.confirmList.splice(idx, 1);
                                this.setState({confirmList: this.state.confirmList}, this.outCallBack);
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
        const newConfirmList = this.state.confirmList.map((item, idx) => {
            return {
                ...item,
                key: 'con_' + idx
            }
        });
        return <Card
            type="inner"
            title={
                <Row>
                    <Col span={12} style={{lineHeight: '30px'}}>参数规格设置</Col>
                    <Col span={12} style={{textAlign: 'right'}}>
                        <Button type="primary" onClick={() => {
                            this.setState({
                                visible: true,
                                name: '',
                                type: '',
                                editIdx: null
                            });
                        }}>新增</Button>
                    </Col>
                </Row>
            }
        >
            {
                newConfirmList.length > 0 && <SWTable
                    columns={columns}
                    dataSource={newConfirmList}
                    pagination={false}
                />
            }
            {
                newConfirmList.length <= 0 && <div style={{
                    textAlign: 'center',
                    color: '#ccc',
                    fontSize: 20
                }}>
                    请添加参数规格......
                </div>
            }
        </Card>
    }

    makeModalView(){
        const columns = [
            {
                title: '选项',
                key: '',
                dataIndex: '',
                render: (res, data, idx) => {
                    return <Checkbox checked={res.isChecked} onChange={(e) => {
                        this.state.changeTypeList[idx].isChecked = !res.isChecked;
                        this.setState({changeTypeList: this.state.changeTypeList});
                    }}/>
                }
            },
            {
                title: '单位',
                key: '',
                dataIndex: '',
                render: (res, data, idx) => {
                    if('4' === '' + data.pId){
                        return <Input value={res.value} placeholder="请输入" maxLength={20}
                            onChange={(e) => {
                                this.state.changeTypeList[idx].value = e.target.value;
                                this.setState({changeTypeList: this.state.changeTypeList});
                            }}
                        />;

                    }else{
                        return res.value;

                    }
                }
            },
            {
                title: '值',
                key: '',
                dataIndex: '',
                render: (res, data, idx) => {
                    return <Input value={res.val} placeholder="请输入" maxLength={20}
                          onChange={(e) => {
                              this.state.changeTypeList[idx].val = e.target.value;
                              this.setState({changeTypeList: this.state.changeTypeList});
                          }}
                    />
                }
            },
        ];
        const newChangeTypeList = this.state.changeTypeList.map((item, idx) => {
            return {
                ...item,
                key: 'cha_' + idx
            }
        });

        return <Modal
            title={this.state.editIdx || '0' === '' + this.state.editIdx ? '编辑参数规格' : "新增参数规格"}
            width={500}
            visible={this.state.visible}
            onOk={() => {
                if(!this.state.name)
                    return message.error('规格名称不能为空');
                if(!this.state.type)
                    return message.error('规格类型不能为空');
                let hasVal = false, noneVal = false, newListParValueDTOS = [];
                this.state.changeTypeList.forEach(item => {
                    if(item.isChecked && item.val){
                        newListParValueDTOS.push({
                            parValue: item.val,
                            typeValueId: item.id,
                            typeValueName: item.value,
                        });
                        noneVal = true;
                    }
                    if(item.isChecked && !item.val){
                        hasVal = true;
                    }
                });
                if(!noneVal)
                    return message.error('请勾选并填写规格类型的值！');

                if(hasVal)
                    return message.error('选中的数据必须填写值！');

                let parTypeName = '';
                this.state.list.forEach(item => {
                    if('' + item.id === '' + this.state.type){
                        parTypeName = item.typeName;
                    }
                });
                const resObj = {
                    parId: '',
                    parName: this.state.name,
                    parTypeId: this.state.type,
                    parTypeName,
                    listParValueDTOS: newListParValueDTOS,
                };

                let hasSame = false, hasIdx = null;
                this.state.confirmList.forEach((item, idx) => {
                    if('' + this.state.type === '' + item.parTypeId){
                        hasIdx = idx;
                        hasSame = true;
                        return false;
                    }

                });

                if((!this.state.editIdx && '0' !== '' + this.state.editIdx) && hasSame){
                    return confirm({
                        title: '已存在相同的规格类型，确认将会覆盖原有的数据！',
                        content: '',
                        cancelText: '取消',
                        okText: '确认',
                        width: 430,
                        onOk:() => {
                            if(this.state.editIdx || '0' === '' + this.state.editIdx || hasSame){
                                this.state.confirmList.splice( hasSame ? hasIdx : this.state.editIdx, 1, resObj);

                            }else{
                                this.state.confirmList.push(resObj);

                            }
                            this.state.confirmList = this.state.confirmList.map(item => {
                                return {
                                    ...item,
                                    listParValueDTOS: item.listParValueDTOS.map(cItem => {
                                        cItem.parValue = cItem.parValue.replace(/,|，/g, ',');
                                        cItem.parValue = cItem.parValue.replace(/\s+/g, ',');
                                        cItem.parValue = cItem.parValue.replace(/,+/g, ',');
                                        cItem.parValue = cItem.parValue.replace(/^,|,$/g, '');
                                        return cItem;
                                    })
                                }
                            });

                            this.setState({confirmList: this.state.confirmList, visible: false}, this.outCallBack);
                        },
                        onCancel:() => {
                            console.log('Cancel');
                        },
                    });
                }

                if(this.state.editIdx || '0' === '' + this.state.editIdx || hasSame){
                    this.state.confirmList.splice( hasSame ? hasIdx : this.state.editIdx, 1, resObj);

                }else{
                    this.state.confirmList.push(resObj);

                }
                this.state.confirmList = this.state.confirmList.map(item => {
                    return {
                        ...item,
                        listParValueDTOS: item.listParValueDTOS.map(cItem => {
                            cItem.parValue = cItem.parValue.replace(/,|，/g, ',');
                            cItem.parValue = cItem.parValue.replace(/\s+/g, ',');
                            cItem.parValue = cItem.parValue.replace(/,+/g, ',');
                            cItem.parValue = cItem.parValue.replace(/^,|,$/g, '');
                            return cItem;
                        })
                    }
                });

                this.setState({confirmList: this.state.confirmList, visible: false}, this.outCallBack);
            }}
            onCancel={() => {
                this.setState({visible: false});
            }}
        >
            <Row span={24}>
                <Col span={6}
                     style={{
                         lineHeight: '30px',
                         textAlign: 'right',
                         paddingRight: '10px',
                     }}
                >
                    <span style={{color: '#f00'}}>*</span>规格名称:
                </Col>
                <Col span={18}>
                    <Input maxLength={30} value={this.state.name} placeholder="请输入规格名称" onChange={(e) => {
                        this.setState({name: e.target.value})
                    }}/>
                </Col>
            </Row>
            <Row span={24} style={{marginTop: 15}}>
                <Col span={6}
                     style={{
                         lineHeight: '30px',
                         textAlign: 'right',
                         paddingRight: '10px',
                     }}
                >
                    <span style={{color: '#f00'}}>*</span>规格类型:
                </Col>
                <Col span={18}>
                    <Select style={{width: '100%'}} value={this.state.type + ''} onChange={(val) => {
                        let NewChangeTypeList = [];
                        this.conList(this.state.list).forEach(item => {
                            if('' + val === '' + item.id){
                                NewChangeTypeList = item.listParTypeValueVOS || [];
                                return false;
                            }
                        });
                        this.setState({
                            type: val,
                            changeTypeList: NewChangeTypeList
                        })
                    }}>
                        <Option value="">请选择</Option>
                        {
                            this.state.list.map((item, idx) => {
                                return <Option key={'opt_' + idx} value={item.id + ''}>{item.typeName}</Option>
                            })
                        }
                    </Select>
                </Col>
            </Row>
            {
                this.state.type && <Table
                    columns={columns}
                    dataSource={newChangeTypeList}
                    pagination={false}
                    style={{marginTop: 15}}
                />
            }
        </Modal>
    }

    outCallBack(){
        this.props.callBack && this.props.callBack({
            parList: this.state.confirmList,
        });
    }

}

export default SpecificationMod
