/**
 * Created by yb
 */

import React, {Component} from 'react';
import {Form, Button, Modal, Card, Table, Tabs, Timeline, Row, Col} from 'antd';
import {Link} from "react-router-dom";
import Model from "../Model";
import moment from 'moment'
import SWTable from 'SWViews/table';
import AssemblySet from "../../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../../baseview/viewContent/ViewContent";
import UploadFiles from "../../../../baseview/uploadFile/UploadFile";

const { TabPane } = Tabs;


class ESServeDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            logList: [],
            adminLogList: []
        };
        this.id = '';
    }

    componentDidMount() {
        this.id = this.props.location.search.substr(1).split("=")[1];
        if (this.id) {
            // this.getInfo();
        }
    }

    // 视图层
    render() {
        return (
            <ViewContent
                crumb={[
                    {name: '电子签章服务中心'},
                    {name: '服务管理'},
                    {name: "服务列表", link: '/Pages/ESServeList'},
                    {name: "服务详情"}
                ]}
                // topBtn = {
                //     <div>
                //         <Button type="primary" icon={'check'}>同意申请</Button>
                //         <Button style={{marginLeft: 15}}>暂不受理</Button>
                //         <Link to={'/Pages/ESApplyForList'} style={{marginLeft: 15}}>
                //             <Button icon={'rollback'}>返回</Button>
                //         </Link>
                //     </div>
                // }
            >
                {this.makeBaseView()}
            </ViewContent>
        );
    }

    getInfo() {
        Model.walletPAAGet({applyId: this.id}, (res) => {
            this.setState({data: res.data});
        }, (err) => {
        });
    }

    makeBaseView() {
        let {data} = this.state;
        let allData = [
            {
                title: '申请信息',
                key: 'SQKey',
                data: [
                    {key: 'qw1', type: 'Texts', label: '申请ID', span: 12, value: ''},
                    {key: 'qw2', type: 'Texts', label: '公司注册名称', span: 12, value: ''},
                    {key: 'qw3', type: 'Texts', label: '法人名称', span: 12, value: ''},
                    {key: 'qw4', type: 'Texts', label: '营业执照号码', span: 12, value: ''},
                    {key: 'qw5', type: 'Texts', label: '联系人', span: 12, value: ''},
                    {key: 'qw6', type: 'Texts', label: '联系电话', span: 12, value: ''},
                    {key: 'qw7', type: 'Texts', label: '营业执照', span: 12, value: ''},
                    {key: 'qw8', type: 'Texts', label: '申请理由', span: 12, value: ''},
                ],
                style: {},
            },
        ];

        return <div>
            {
                allData.map((item, idx) => {
                    return <Card
                        key={'car_' + idx}
                        type="inner"
                        title={item.title || '信息'}
                        style={item.style ? item.style : {}}
                        bodyStyle={item.bodyStyle ? item.bodyStyle : {}}
                    >
                        <AssemblySet key={item.key} data={item.data} form={this.props.form}/>
                    </Card>
                })
            }
        </div>
    }
}

export default ESServeDetail
