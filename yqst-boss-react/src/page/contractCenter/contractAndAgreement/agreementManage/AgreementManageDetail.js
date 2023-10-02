/**
 * Created by yb on 2019/09/25
 */

import React, {Component} from 'react';
import {Form, Button, Card, Tabs, Timeline} from 'antd';
import {RollbackOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import Model from "../../Model";
import moment from 'moment'
import SwitchStatus from "./SwitchStatus";
import AssemblySet from "../../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../../baseview/viewContent/ViewContent";

const { TabPane } = Tabs;


class AgreementManageDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            logList: [],
        };
        this.id = '';
        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.id = this.props.location.search.substr(1).split("=")[1];
        if (this.id) {
            this.getInfo();
        }
    }

    // 视图层
    render() {
        return (
            <Form ref={this.formRef}>
                <ViewContent
                    crumb={[
                        {name: '合同中心'},
                        {name: "合同、协议管理"},
                        {name: "协议列表", link: '/Pages/AgreementManageList'},
                        {name: "协议详情"}
                    ]}
                    topBtn = {
                        <div>
                            {/*<Button type="primary" icon={'edit'}>编辑</Button>*/}
                            <Link to={'/Pages/AgreementManageList'} style={{marginLeft: 15}}>
                                <Button icon={<RollbackOutlined />}>返回</Button>
                            </Link>
                        </div>
                    }
                >
                    {this.makeBaseView()}
                </ViewContent>
            </Form>
        );
    }

    getInfo() {
        Model.ContractPGet({id: this.id}, (res) => {
            this.setState({data: res.data});
        }, (err) => {
        });
    }

    getLogList() {
        Model.ContractPLList({id: this.id}, (res) => {
            this.setState({logList: res.data || []});
        }, (err) => {
        });
    }

    makeBaseView() {
        let {data} = this.state;
        let baseData = [
            {key: 'protocolSn', type: 'Texts', label: '协议编号', span: 12, value: data.protocolSn},
            {key: 'id', type: 'Texts', label: '协议ID', span: 12, value: data.id},
            {key: 'protocolName', type: 'Texts', label: '协议名称', span: 12, value: data.protocolName},
            {key: 'protocolType', type: 'Texts', label: '协议类型', span: 12,
                value: SwitchStatus.protocolType(data.protocolType)},
            {key: 'startName', type: 'Texts', label: '协议发起方', span: 12, value: data.startName},
            {key: 'startType', type: 'Texts', label: '协议发起方类型', span: 12,
                value: SwitchStatus.startType(data.startType)},
            {key: 'signName', type: 'Texts', label: '协议签署方', span: 12, value: data.signName},
            {key: 'signType', type: 'Texts', label: '协议确认方类型', span: 12,
                value: SwitchStatus.signType(data.signType)},
            {key: 'status', type: 'Texts', label: '协议状态', span: 12,
                value: SwitchStatus.status(data.status)},
            {key: 'checkTime', type: 'Texts', label: '协议确认时间', span: 12,
                value: data.checkTime ? moment(data.checkTime).format('YYYY-MM-DD HH:mm:ss') : ''},
        ];

        return <div>
            <div style={{
                boxShadow: '6px 6px 5px #ccc',
                borderRadius: '6px',
                border: '1px solid #ccc',
                marginBottom: 15
            }}>
                <AssemblySet key={'baseAss'} data={baseData} form={this.formRef.current}/>
            </div>

            <Tabs defaultActiveKey="1" onChange={(key) => {
                if('3' === '' + key && this.state.logList.length <= 0){
                    this.getLogList();
                }
            }}>
                <TabPane tab="协议内容" key="1">
                    {
                        !data.content && <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>
                            暂无内容...
                        </div>
                    }
                    {
                        data.content && <iframe
                            src = {`https://view.officeapps.live.com/op/view.aspx?src=${data.content}`}
                            width='100%' height='600px' frameBorder='1'>
                        </iframe>
                    }
                </TabPane>
                <TabPane tab="协议模版" key="2">
                    {this.makeMBView()}
                </TabPane>
                <TabPane tab="审批记录" key="3">
                    {this.makeJLView()}
                </TabPane>
            </Tabs>
        </div>
    }

    makeMBView(){
        let {data} = this.state;
        let allData = [
            {
                title: '使用协议模版',
                key: 'QYKey',
                data: [
                    {key: 'templateName', type: 'Texts', label: '协议模版名称', span: 8, value: data.templateName },
                    {key: 'templateId', type: 'Texts', label: '协议模版ID', span: 8, value: data.templateId},
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
                        <AssemblySet key={item.key} data={item.data} form={this.formRef.current}/>
                    </Card>
                })
            }
        </div>
    }

    makeJLView(){
        return <Timeline style={{
            padding: 15
        }}>
            {
                this.state.logList.map((item, idx) => {
                    return <Timeline.Item key={'log_' + idx}>
                        <h3>{item.title}</h3>
                        <div>
                            <span>操作人：{item.createByName}</span>
                            <span style={{marginLeft: 25}}>操作时间：{item.createTime ? moment(item.createTime).format('YYYY-MM-DD') : ''}</span>
                        </div>
                    </Timeline.Item>
                })
            }
            {
                this.state.logList && this.state.logList.length <= 0 && <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>
                    暂无记录...
                </div>
            }
        </Timeline>
    }
}

export default AgreementManageDetail
