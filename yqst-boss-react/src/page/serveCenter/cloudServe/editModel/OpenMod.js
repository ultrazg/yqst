/**
 * Created by yb on 2019/11/21
 */

import React, {Component} from 'react';
import {Form, Button, Modal, Card, Table, Tabs, Timeline, Row, Col, Select, message, Input, Popconfirm, Checkbox, Radio, Switch} from 'antd';
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


class OpenMod extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                {
                    key: '免费_1',
                    typeName: '免费',
                    buttonName: '',
                    isShow: '0',
                    memo: '',
                    isShowPop: '0',
                },
                {
                    key: '收费_1',
                    typeName: '收费',
                    buttonName: '',
                    isShow: '0',
                    memo: '',
                    isShowPop: '0',
                },
            ]
        };
    }

    componentDidMount() {
        this.setState({
            list: [
                {
                    key: '免费_1',
                    typeName: '免费',
                    buttonName: '',
                    isShow: '0',
                    memo: '',
                    isShowPop: '0',
                    ...this.props.pState.opePar.freeButtonPar,
                },
                {

                    key: '收费_1',
                    typeName: '收费',
                    buttonName: '',
                    isShow: '0',
                    memo: '',
                    isShowPop: '0',
                    ...this.props.pState.opePar.chargeButtonPar,
                },
            ],
        })
    }

    // 视图层
    render() {
        return (
            <div>
                {this.makeCZView()}
            </div>
        );
    }

    makeCZView(){
        const columns = [
            {
                title: '开通类型',
                key: 'typeName',
                dataIndex: 'typeName',
            },
            {
                title: '操作按钮名称',
                key: 'buttonName',
                dataIndex: 'buttonName',
                render: (res, data, idx) => {
                    return <Input value={res} placeholder="请输入" maxLength={30}
                          onChange={(e) => {
                              this.state.list[idx].buttonName = e.target.value;
                              this.setState({list: this.state.list}, this.outCallBack);
                          }}
                    />;
                }
            },
            {
                title: '备注',
                key: 'memo',
                dataIndex: 'memo',
                render: (res, data, idx) => {
                    return <Input value={res} placeholder="请输入" maxLength={30}
                          onChange={(e) => {
                              this.state.list[idx].memo = e.target.value;
                              this.setState({list: this.state.list}, this.outCallBack);
                          }}
                    />;
                }
            },
            {
                title: '是否显示按钮',
                key: 'isShow',
                dataIndex: 'isShow',
                render: (res, data, idx) => {
                    return <Switch checkedChildren="是" unCheckedChildren="否" checked={'1' === '' + res} onChange={() => {
                        this.state.list[idx].isShow = '1' === '' + res ? '0' : '1';
                        this.setState({list: this.state.list}, this.outCallBack);
                    }}/>;
                }
            },
            {
                title: '是否显示操作提示',
                key: 'isShowPop',
                dataIndex: 'isShowPop',
                render: (res, data, idx) => {
                    return <Switch checkedChildren="是" unCheckedChildren="否" checked={'1' === '' + res} onChange={() => {
                        this.state.list[idx].isShowPop = '1' === '' + res ? '0' : '1';
                        this.setState({list: this.state.list}, this.outCallBack);
                    }}/>;
                }
            },
        ];
        return <div>
            <Table
                columns={columns}
                dataSource={this.state.list || []}
                pagination={false}
            />
        </div>
    }

    outCallBack(){
        this.props.callBack && this.props.callBack({
            freeButtonPar: this.state.list[0],
            chargeButtonPar: this.state.list[1]
        });
    }

}

export default OpenMod
