/**
 * Created by yb on 2019/11/21
 */

import React, {Component} from 'react';
import {Form, Button, Modal, Card, Table, Tabs, Timeline, Row, Col, Select, message, Input, Popconfirm, Checkbox, Radio} from 'antd';
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


class ActivateMod extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maxNum: '',
            freeNum: '',
            freeParList: [],
        };
    }

    componentDidMount() {
        this.props.pState.actPar.freeParList = this.props.pState.actPar.freeParList && this.props.pState.actPar.freeParList.map((item, idx) => {
            return {
                key: idx,
                ...item
            }
        });
        this.setState({
            ...this.state,
            ...this.props.pState.actPar
        });
    }

    // 视图层
    render() {
        return (
            <div>
                {this.makeJHView()}
            </div>
        );
    }

    makeJHView(){
        const columns = [
            {
                title: '选择',
                key: '',
                dataIndex: '',
                render: (res, data, idx) => {
                    return <Radio checked={'1' === '' + res.isSelect} onChange={() => {
                        this.state.freeParList.forEach((item, jIdx) => {
                            item.isSelect = '0';
                            if(idx == jIdx)
                                item.isSelect = '1';
                        });
                        this.setState({freeParList: this.state.freeParList}, this.outCallBack);
                    }}/>
                }
            },
            {
                title: '参数ID',
                key: 'freeParId',
                dataIndex: 'freeParId',
            },
            {
                title: '参数',
                key: '',
                dataIndex: '',
                render: (res) => {
                    let resArr = [];
                    res.listParValueDTOS && res.listParValueDTOS.forEach(item => {
                        item.parValue.replace(/,|，/g, ',');
                        item.parValue.split(',') && item.parValue.split(',').map(cItem => {
                            if(cItem || '0' === '' + cItem)
                                resArr.push(`${cItem}${item.typeValueName}`);
                        });

                    });
                    return resArr.join('、');
                }
            },

            {
                title: '参数编码',
                key: '',
                dataIndex: '',
                width: 200,
                render: (res, data, idx) => {
                    return <Input maxLength={20} value={res.parSn} placeholder="请输入" onChange={(e) => {
                        const numAndLet = /^[0-9a-zA-Z]+$/;
                        if(e.target.value && !numAndLet.test(e.target.value)){
                            message.error('编码只能是数字或者字母！');
                            return false;
                        }
                        this.state.freeParList[idx].parSn = e.target.value;
                        this.setState({freeParList: this.state.freeParList}, this.outCallBack)
                    }}/>
                }
            },
        ];
        return <div>
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
                            <span style={{color: '#f00'}}>*</span>最大可激活数:
                        </Col>
                        <Col span={18}>
                            <Input maxLength={8} value={this.state.maxNum} placeholder="请输入最大可激活数" onChange={(e) => {
                                const numAndLet = /^[1-9]\d*$/;
                                if(e.target.value && !numAndLet.test(e.target.value)){
                                    message.error('最大可激活数只能是正整数！');
                                    return false;
                                }
                                this.setState({maxNum: e.target.value}, this.outCallBack)
                            }}/>
                        </Col>
                    </Row>
                </Col>
                <Col span={12}>
                    <Row>
                        <Col span={6}
                             style={{
                                 lineHeight: '30px',
                                 textAlign: 'right',
                                 paddingRight: '10px',
                             }}
                        >
                            <span style={{color: '#f00'}}>*</span>免费可激活数:
                        </Col>
                        <Col span={18}>
                            <Input maxLength={8} value={this.state.freeNum} placeholder="请输入" onChange={(e) => {
                                const numAndLet = /^[1-9]\d*$/;
                                if(e.target.value && !numAndLet.test(e.target.value)){
                                    message.error('免费可激活数只能是正整数！');
                                    return false;
                                }
                                this.setState({freeNum: e.target.value}, this.outCallBack)
                            }}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row style={{marginTop: 15}}>
                <Col span={3}
                     style={{
                         lineHeight: '30px',
                         textAlign: 'right',
                         paddingRight: '10px',
                     }}
                >
                    <span style={{color: '#f00'}}>*</span>免费激活参数:
                </Col>
                <Col span={21}>
                    <Table
                        columns={columns}
                        dataSource={this.state.freeParList || []}
                        pagination={false}
                    />
                </Col>
            </Row>
        </div>
    }

    outCallBack(){
        this.props.callBack && this.props.callBack(this.state);
    }

}

export default ActivateMod
