/**
 * Created by yb on 2019/10/28
 * 业务模块
 */

import React, {Component} from 'react';
import {Form, Button, Card, Row, Col, Timeline, Tabs} from 'antd';
import {Link} from "react-router-dom";
import Model from "../../Model";
import moment from 'moment'
import SWTable from 'SWViews/table';
// import SwitchName from "../SwitchName";
// import AssemblySet from "../../../../baseview/assemblySet/AssemblySet";

const {TabPane} = Tabs;

class BusinessModule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                invoiceInfoVO: {},
                erpBankVO: {},
                addressListVOS: [],
                riseListVOS: [],
            },
            par:{
                current:1,
                pageSize:10,
                keyWord:'',
                id:''
            },
            logList: [],
            dataSource:[]
        };
    }

    componentDidMount() {
        this.getInfo();
    }

    // 视图层
    render() {
        return (
            this.makeYWView()
        );
    }

    getInfo() {
        Model.UserProjectAddressPage({
            // userId: this.props.data.bossProjectDetailedInfoVO.uid
            ...this.state.par,
            id: this.props.data.bossProjectDetailedInfoVO.uid
        }, (res) => {
            this.setState({
                // data: {...this.state.data, ...res.data}
                dataSource: res.data.records
            });
        }, (err) => {
        });
    }

    makeYWView() {
        let {data} = this.state;
        let {invoiceInfoVO, erpBankVO, addressListVOS, riseListVOS} = data;
        let {dataSource} = this.state;

        const columns = [
            {
                title: '收件人',
                key: 'contact',
                dataIndex: 'contact',
            },
            {
                title: '联系电话',
                key: 'tel',
                dataIndex: 'tel',
            },
            {
                title: '邮编',
                key: 'zipCode',
                dataIndex: 'zipCode',
            },
            {
                title: '所在地区',
                key: 'area',
                dataIndex: 'area',
            },
            {
                title: '详细地址',
                key: 'address',
                dataIndex: 'address',
            },
        ];
        return <div>
            <Card
                type="inner"
                title='地址库'
                style={{marginTop: 15}}
            >
                <SWTable
                    columns={columns}
                    dataSource={dataSource || []}
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
            {/*                        </Timeline.Item>*/}
            {/*                    })*/}
            {/*                }*/}
            {/*                {*/}
            {/*                    this.state.logList && this.state.logList.length <= 0 &&*/}
            {/*                    <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>*/}
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

export default BusinessModule
