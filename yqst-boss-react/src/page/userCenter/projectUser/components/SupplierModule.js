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
            logList: [],
            par: {
                current: 1,
                pageSize: 10,
                keyWord: '',
                id: ''
            },
            total: 0,
            dataSource: [],
        };
        this.id = '';
    }

    componentDidMount() {
        const id = this.props.data.bossProjectDetailedInfoVO.uid;
        this.setState({
            par: {
                ...this.state.par,
                id
            }
        }, () => {
            this.getInfo();
        })
        // this.state.par.id = this.props.data.bossProjectDetailedInfoVO.uid;

    }

    // 视图层
    render() {
        return (
            this.makeYWView()
        );
    }

    getInfo() {
        Model.UserProjectSupplier({
            ...this.state.par,
            // id: this.id
        }, (res) => {
            this.setState({
                // data: {...this.state.data, ...res.data}
                dataSource: this.tranData(res.data.records)
            });
        }, (err) => {
        });
    }

    tranData = data => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].createTime) {
                data[i].createTime = moment(data[i].createTime).format('YYYY-MM-DD HH:mm:ss')
            }
        }
        return data;
    }

    makeYWView() {
        let {data} = this.state;
        let {invoiceInfoVO, erpBankVO, addressListVOS, riseListVOS} = data;
        let {dataSource} = this.state;
        const columns = [
            {
                title: '企业ID',
                key: 'partnerUser',
                dataIndex: 'partnerUser',
            },
            {
                title: '企业号',
                key: 'partnerAccountSn',
                dataIndex: 'partnerAccountSn',
            },
            {
                title: '企业名称',
                key: 'parName',
                dataIndex: 'parName',
            },
            {
                title: '添加时间',
                key: 'createTime',
                dataIndex: 'createTime',
            },
        ];
        return <div>
            <Card
                type="inner"
                title='供应商列表'
                style={{marginTop: 15}}
            >
                <SWTable
                    columns={columns}
                    dataSource={dataSource || []}
                    pagination={
                        {
                            total: this.state.total,
                            current: this.state.par.current,
                            pageSize: this.state.par.pageSize,
                            onChange: (a, b) => {
                                let obj = this.state.par;
                                obj.current = a;
                                this.setState({par: obj}, () => {
                                    this.getList();
                                })
                            },
                            showTotal: (total, range) => `共有${total}条`
                        }
                    }
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
