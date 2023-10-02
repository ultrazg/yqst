import React, {Component} from 'react';
import {Button, Tabs} from 'antd';
import ViewCoat from "../../PublicModule/ViewCoat/ViewCoat";
import LessorContractList from "./lessor/List/LessorContractList";
import LesseeContractList from "./lessee/List/LesseeContractList";
import request from "../../../../utils/request/request";

const {TabPane} = Tabs;

/**
 * 合同信息主页面
 */
class ContractMaintainIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeKey: '1',
            leaseContractSetup: null
        };
    }

    componentDidMount() {
        request('/api/v1/user/setup/coordination/get', {}, (res) => {
            this.setState({
                leaseContractSetup: res.data.leaseContractSetup,//0为出租方,1为承租方
            })
        }, () => {
        });
    }

    render() {
        return (
            <ViewCoat
                breadCrumb={[{title: "合同助手"}, {title: "租赁合同信息"},]}
            >
                <Tabs
                    onChange={key => {
                        this.setState({
                            activeKey: key
                        });
                    }}
                    type="card"
                    tabBarExtraContent={
                        this.state.activeKey === '1'
                            ? (this.state.leaseContractSetup == 0 ? <Button
                                type='primary'
                                onClick={() => this.props.history.push('/pages/appCenter/contractAsst/contractAsstHome/contractInfoMaintain/createlessor')}
                            >
                                出租方创建合同
                            </Button> : null)
                            : (this.state.leaseContractSetup == 1 ? <Button
                                type='primary'
                                onClick={() => this.props.history.push('/pages/appCenter/contractAsst/contractAsstHome/contractInfoMaintain/createlessee')}
                            >
                                承租方创建合同
                            </Button> : null)
                    }
                >
                    <TabPane tab="我是出租方" key="1">
                        {this.state.activeKey === '1' ? <LessorContractList history={this.props.history}/> : null}
                    </TabPane>
                    <TabPane tab="我是承租方" key="2">
                        {this.state.activeKey === '2' ? <LesseeContractList history={this.props.history}/> : null}
                    </TabPane>
                </Tabs>
            </ViewCoat>
        );
    }
}

export default ContractMaintainIndex;
