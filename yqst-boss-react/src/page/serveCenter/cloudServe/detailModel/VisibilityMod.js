/**
 * Created by yb on 2019/11/20
 */

import React, {Component} from 'react';
import {Form, Button, Modal, Card, Table, Tabs, Timeline, Row, Col} from 'antd';
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

class VisibilityMod extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            total: 0,
            requestPar: {
                current: 1,
                pageSize: 10,
                softId: '',
                type: '',
            },
        };
    }

    componentDidMount() {
        if('2' === '' + this.props.data.isHide || '3' === '' + this.props.data.isHide) this.getList();
    }

    // 视图层
    render() {
        return (
            <div>
                {this.makeZMView()}
            </div>
        );
    }

    getList() {
        const {data} = this.props;
        Model.CServeSLPage({
            ...this.state.requestPar,
            softId: this.props.data.id,
            type: '2' === '' + data.isHide ? '1' :
                        '3' === '' + data.isHide ? '2' : '',

        }, (res) => {
            this.setState({
                list: res.data.records || [],
                total: res.data.total || 0,
            });

        }, (err) => {
        })
    }

    makeZMView(){
        const {data} = this.props;
        const {requestPar, list} = this.state;
        const zmData = [
            {key: 'isHide', type: 'Texts', label: '可见性设置', span: 12,
                value: SwitchName.isHide(data.isHide)},
            '' + data.isHide === '2' ? {key: 'listCount', type: 'Texts', label: '已选择企业数', span: 12,
                value: <div>
                    {NumberFormat.thousandBit(data.listCount || 0, 0)}
                </div>} : {},
        ];
        const searchDatas = [
            {key: 'keyWord', type: 'Input', value: '', placeholder: '可查询企业ID、名称', label: '关键字', maxLength: 30},
            // {
            //     key: 'isHide', type: 'Select', value: '', placeholder: '请选择可见性', label: '可见性',
            //     list: [
            //         {value: '', name: '全部'},
            //         {value: 1, name: '全部可见'},
            //         {value: 2, name: '白名单可见'},
            //         {value: 3, name: '黑名单隐藏'},
            //         {value: 4, name: '全部隐藏'},
            //     ],
            // },
            // {key: 'times', type:'RangePicker', value:'', placeholder: ['开始时间', '结束时间'], label: '创建时间',}
        ];
        const columns = [
            {
                title: '企业ID',
                key: 'userId',
                dataIndex: 'userId',
            },
            {
                title: '企业号',
                key: 'accountSn',
                dataIndex: 'accountSn',
            },
            {
                title: '企业名称',
                key: 'userName',
                dataIndex: 'userName',
            },
        ];
        return (
            <>
                <Card type="inner" title="应用桌面可见性">
                    <AssemblySet key={'makeZMView'} data={zmData} form={this.props.formCurrent}/>
                    <a style={{marginTop: 15}}>{SwitchName.isHideTxt(data.isHide)}</a>
                </Card>
                {
                    ('2' === '' + data.isHide || '3' === '' + data.isHide) && <Card
                        type="inner"
                        title="已选择企业信息"
                        style={{marginTop: 15}}
                    >
                        <HeadSearch data={searchDatas} callBack={(obj) => {
                            // obj.startTime = obj.times [0] || '';
                            // obj.endTime = obj.times [1] || '';
                            obj.current = 1;

                            // delete obj.times;
                            this.setState({
                                requestPar: {
                                    ...this.state.requestPar,
                                    ...obj
                                }
                            }, () => {
                                this.getList();
                            });
                        }}/>
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
            </>
        )
    }
}

export default VisibilityMod
