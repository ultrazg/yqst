/**
 * Created by yb on 2019/11/20
 */

import React, {Component} from 'react';
import {Form, Button, Modal, Card, Table, Tabs, Timeline, Row, Col} from 'antd';
import {Link} from "react-router-dom";
import Model from "../../Model";
import moment from 'moment'
import SWTable from 'SWViews/table';
import AssemblySet from "../../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../../baseview/viewContent/ViewContent";
import UploadFile from '../../../../baseview/uploadFile/UploadFile'

const { TabPane } = Tabs;


class RightMod extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            total: 0,
            requestPar: {
                current: 1,
                pageSize: 10,
                softId: '',
            },
        };
    }

    componentDidMount() {
        this.getList();
    }

    // 视图层
    render() {
        return (
            <div>
                {this.makeQXView()}
            </div>
        );
    }

    getList() {
        Model.CServeSAPage({
            ...this.state.requestPar,
            softId: this.props.id,

        }, (res) => {
            this.setState({
                list: res.data.records || [],
                total: res.data.total || 0,
            })
        }, (err) => {
        })
    }

    makeQXView(){
        const {requestPar, list} = this.state;
        const columns = [
            {
                title: '权限ID',
                key: 'id',
                dataIndex: 'id',
            },
            {
                title: '权限编码',
                key: 'resCode',
                dataIndex: 'resCode',
            },
            {
                title: '功能模块',
                key: 'parentName',
                dataIndex: 'parentName',
            },
            {
                title: '功能名称',
                key: 'resName',
                dataIndex: 'resName',
            },
            {
                title: '功能描述',
                key: 'resDesc',
                dataIndex: 'resDesc',
                width: 250
            },
        ];
        return <Card
            type="inner"
            title="权限配置"
        >
            <SWTable
                columns={columns}
                dataSource={list}
                pagination={
                    {
                        total: this.state.total,
                        current: requestPar.current,
                        pageSize: requestPar.pageSize,
                        onChange: (a, b) => {
                            requestPar.current = a;
                            this.setState({requestPar}, () => {
                                this.getList();
                            })
                        },
                        showTotal: (total, range) => `共有${total}条`
                    }
                }
            />
        </Card>
    }
}

export default RightMod
