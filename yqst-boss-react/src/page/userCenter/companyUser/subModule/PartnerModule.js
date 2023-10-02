/**
 * Created by yb on 2019/10/28
 * 合作伙伴模块
 */

import React, {Component} from 'react';
import {Form, Button, Card, Row, Col, Timeline, Tabs} from 'antd';
import {Link} from "react-router-dom";
import Model from "../../Model";
import moment from 'moment'
import SWTable from 'SWViews/table';
import SwitchName from "../SwitchName";
import AssemblySet from "../../../../baseview/assemblySet/AssemblySet";

const { TabPane } = Tabs;

class PartnerModule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                getAccountDTO: {},
                listPartnerDTO: [],
            },
            logList: [],
        };
    }

    componentDidMount() {
        this.getInfo();
    }

    // 视图层
    render() {
        return (
            this.makeHHRView()
        );
    }

    getInfo() {
        Model.UserEPGet({userId: this.props.data.listAccountDTO.uid}, (res) => {
            this.setState({data: res.data});
        }, (err) => {
        });
    }

    makeHHRView(){
        const columns = [
            {
                title: '企业ID',
                key: 'partnerUser',
                dataIndex: 'partnerUser',
            },
            {
                title: '企业号',
                key: 'partnerId',
                dataIndex: 'partnerId',
            },
            {
                title: '企业名称',
                key: 'parName',
                dataIndex: 'parName',
            },
            {
                title: '合作伙伴类型',
                key: 'parType',
                dataIndex: 'parType',
            },
            {
                title: '添加时间',
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
            // {
            //     title: '操作',
            //     key: '',
            //     dataIndex: '',
            // }
        ];

        return <div>
            <Card
                type="inner"
                title='合作伙伴'
            >
                <SWTable
                    columns={columns}
                    dataSource={this.state.data.listPartnerDTO || []}
                    pagination={false}
                />
            </Card>
            {/*<Card*/}
            {/*    type="inner"*/}
            {/*    title='操作记录'*/}
            {/*    style={{marginTop: 15}}*/}
            {/*>*/}
            {/*    <Tabs type="card">*/}
            {/*        <TabPane tab="用户记录" key="1">*/}
            {/*            <Timeline style={{*/}
            {/*                padding: 15*/}
            {/*            }}>*/}
            {/*                {*/}
            {/*                    this.state.logList.map((item, idx) => {*/}
            {/*                        return <Timeline.Item key={'log_' + idx}>*/}
            {/*                            <h3>{item.title}</h3>*/}
            {/*                            <span>操作时间：{item.createTime ? moment(item.createTime).format('YYYY-MM-DD') : ''}</span>*/}
            {/*                            <div>*/}
            {/*                                <span>员工ID：123456</span>*/}
            {/*                                <span style={{marginLeft: 25}}>员工名称：陈天华</span>*/}
            {/*                            </div>*/}
            {/*                            <div>*/}
            {/*                                <span>个人用户ID：123456</span>*/}
            {/*                                <span style={{marginLeft: 25}}>个人用户名称：陈天华</span>*/}
            {/*                            </div>*/}
            {/*                        </Timeline.Item>*/}
            {/*                    })*/}
            {/*                }*/}
            {/*                {*/}
            {/*                    this.state.logList && this.state.logList.length <= 0 && <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>*/}
            {/*                        暂无记录...*/}
            {/*                    </div>*/}
            {/*                }*/}
            {/*            </Timeline>*/}
            {/*        </TabPane>*/}
            {/*        <TabPane tab="管理员记录" key="2">*/}
            {/*            <Timeline style={{*/}
            {/*                padding: 15*/}
            {/*            }}>*/}
            {/*                {*/}
            {/*                    this.state.logList.map((item, idx) => {*/}
            {/*                        return <Timeline.Item key={'log_' + idx}>*/}
            {/*                            <h3>{item.title}</h3>*/}
            {/*                            <span>操作时间：{item.createTime ? moment(item.createTime).format('YYYY-MM-DD') : ''}</span>*/}
            {/*                            <div>*/}
            {/*                                <span>管理员ID：{item.createByName}</span>*/}
            {/*                                <span style={{marginLeft: 25}}>管理员名称：123</span>*/}
            {/*                            </div>*/}
            {/*                        </Timeline.Item>*/}
            {/*                    })*/}
            {/*                }*/}
            {/*                {*/}
            {/*                    this.state.logList && this.state.logList.length <= 0 && <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>*/}
            {/*                        暂无记录...*/}
            {/*                    </div>*/}
            {/*                }*/}
            {/*            </Timeline>*/}
            {/*        </TabPane>*/}
            {/*    </Tabs>*/}
            {/*</Card>*/}
        </div>
    }
}

export default PartnerModule
