import React from 'react';
import Api from './Api';
import request from "../../utils/request/request";
import {Breadcrumb, Col, Radio, Row, message} from "antd";

/**
 * 租赁业务配置
 */
function LeaseConf() {
    // 1.出租方 2.承租方
    const [id, setId] = React.useState(null);
    // 0为出租方 1为承租方
    const [leaseInitSetup, setLeaseInitSetup] = React.useState(-1);
    const [leaseContractSetup, setLeaseContractSetup] = React.useState(-1);

    React.useEffect(() => {
        request(Api.DigitalModeConfGet, {}, res => {
            setLeaseInitSetup(res.data.leaseInitSetup);
            setLeaseContractSetup(res.data.leaseContractSetup);
            setId(res.data.id || 0);
        });
    }, []);

    return (
        <>
            <div style={{padding: "10px"}}>
                <Breadcrumb>
                    <Breadcrumb.Item>业务配置中心</Breadcrumb.Item>
                    <Breadcrumb.Item>租赁业务配置</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div style={{background: 'white', padding: 20, marginLeft: 10, marginRight: 10, borderRadius: 6}}>
                <Row>
                    <Col span={14}>
                        <b style={{fontSize: 16}}>初始化工具配置管理</b>
                        <p style={{color: '#a4b0be'}}>选择出租方，只有出租方可以发起初始化；选择承租方，只有承租方可以发起初始化</p>
                    </Col>
                    <Col span={10}>
                        <label>发起角色：</label>
                        <Radio.Group
                            onChange={e => {
                                update({id, leaseInitSetup: e.target.value}, () => {
                                    setLeaseInitSetup(e.target.value);
                                });
                            }}
                            value={leaseInitSetup}
                            style={{marginLeft: 20}}
                        >
                            <Radio value={0}>出租方</Radio>
                            <Radio value={1}>承租方</Radio>
                        </Radio.Group>
                    </Col>
                </Row>
            </div>
            <div style={{
                marginTop: 10,
                background: 'white',
                padding: 20,
                marginLeft: 10,
                marginRight: 10,
                borderRadius: 6
            }}>
                <Row>
                    <Col span={14}>
                        <b style={{fontSize: 16}}>租赁合同维护权限配置</b>
                        <p style={{color: '#a4b0be'}}>选择出租方，只有企业作为出租方时才能创建和维护租赁合同；选择承租方，只有企业作为承租方的时候才能创建和维护租赁合同</p>
                    </Col>
                    <Col span={10}>
                        <label>角色：</label>
                        <Radio.Group
                            onChange={e => {
                                update({id, leaseContractSetup: e.target.value}, () => {
                                    setLeaseContractSetup(e.target.value);
                                });
                            }}
                            value={leaseContractSetup}
                            style={{marginLeft: 20}}
                        >
                            <Radio value={0}>出租方</Radio>
                            <Radio value={1}>承租方</Radio>
                        </Radio.Group>
                    </Col>
                </Row>
            </div>
        </>
    );
}

function update(params, callback) {
    request(
        Api.DigitalModeConfUpdate,
        {
            ...params
        },
        () => {
            message.success('处理成功');
            callback && callback();
        },
        () => {
        }
    );
}

export default LeaseConf;
