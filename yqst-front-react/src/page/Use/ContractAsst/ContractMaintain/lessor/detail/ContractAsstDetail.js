import React, {Component} from "react";
import ViewCoat from "../../../../PublicModule/ViewCoat/ViewCoat";
import {Button, Tabs} from "antd";
import {LeftOutlined} from "@ant-design/icons";
import BaseInfo from './BaseInfo'
import GoodsPriceInfo from './GoodsPriceInfo'
import SettleInfo from './SettleInfo'
import CuttingInfo from './CuttingInfo'
import LossInfo from './LossInfo'
import MaintainInfo from './MaintainInfo'
import ModifyListModal from "../../Components/ModifyListModal";

const {TabPane} = Tabs;

export default class ContractAsstDetail extends Component {
    constructor(props) {
        super(props);
        this.sn = (this.props.location.search && new URLSearchParams(this.props.location.search).get("sn")) || "";
        this.state = {
            activeKey: "1",
            data: {
                isOperate: 0,
                leaseGoodsList: [],
                lossGoodsList: [],
                maintenanceItemList: [],
                replacementGoodsList: [],
            }
        }
    }

    render() {
        return <ViewCoat
            breadCrumb={[{title: "合同助手"}, {title: "租赁合同详情"},]}
        >
            <Button style={{marginBottom: 20}} onClick={() => {
                window.history.go(-1);
            }}><LeftOutlined/>返回</Button>
            <Tabs onChange={key => {
                this.setState({
                    activeKey: key
                });
            }} type="card">
                <TabPane tab="基本信息" key="1">
                    <BaseInfo
                        history={this.props.history} sn={this.sn}
                        data={this.state.data}
                        setData={(data) => {
                            this.setState({
                                data: {
                                    ...this.state.data,
                                    ...data
                                }
                            })
                        }}/>
                </TabPane>
                <TabPane tab="合同价格" key="2">
                    <GoodsPriceInfo
                        history={this.props.history} sn={this.sn}
                        data={this.state.data}
                        setData={(data) => {
                            this.setState({
                                data: {
                                    ...this.state.data,
                                    ...data
                                }
                            })
                        }}
                        showRecList={(previewFun) => {
                            this.listType = 1;
                            this.previewFun = previewFun;
                            this.setState({showRecList: true})
                        }}/>
                </TabPane>
                <TabPane tab="结算信息" key="3">
                    <SettleInfo
                        history={this.props.history} sn={this.sn}
                        data={this.state.data}
                        setData={(data) => {
                            this.setState({
                                data: {
                                    ...this.state.data,
                                    ...data
                                }
                            })
                        }}
                        showRecList={(previewFun) => {
                            this.listType = 2;
                            this.previewFun = previewFun;
                            this.setState({showRecList: true})
                        }}/>
                </TabPane>
                <TabPane tab="切割赔偿" key="4">
                    <CuttingInfo
                        history={this.props.history} sn={this.sn}
                        data={this.state.data}
                        setData={(data) => {
                            this.setState({
                                data: {
                                    ...this.state.data,
                                    ...data
                                }
                            })
                        }}
                        showRecList={(previewFun) => {
                            this.listType = 3;
                            this.previewFun = previewFun;
                            this.setState({showRecList: true})
                        }}/>
                </TabPane>
                <TabPane tab="丢损赔偿" key="5">
                    <LossInfo
                        history={this.props.history} sn={this.sn}
                        data={this.state.data}
                        setData={(data) => {
                            this.setState({
                                data: {
                                    ...this.state.data,
                                    ...data
                                }
                            })
                        }}
                        showRecList={(previewFun) => {
                            this.listType = 4;
                            this.previewFun = previewFun;
                            this.setState({showRecList: true})
                        }}/>
                </TabPane>
                <TabPane tab="维保价格" key="6">
                    <MaintainInfo
                        history={this.props.history} sn={this.sn}
                        data={this.state.data}
                        setData={(data) => {
                            this.setState({
                                data: {
                                    ...this.state.data,
                                    ...data
                                }
                            })
                        }}
                        showRecList={(previewFun) => {
                            this.listType = 5;
                            this.previewFun = previewFun;
                            this.setState({showRecList: true})
                        }}/>
                </TabPane>
            </Tabs>
            {this.state.showRecList ? <ModifyListModal
                listType={this.listType}
                sn={this.sn}
                previewFun={this.previewFun}
                onClose={() => {
                    this.setState({showRecList: false})
                }}
            /> : null}
        </ViewCoat>
    }
}

