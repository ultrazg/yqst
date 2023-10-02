import React, {Component} from 'react';
import {Button, Tabs} from 'antd';
import ViewCoat from "../../PublicModule/ViewCoat/ViewCoat";
import LessorContractList from "./lessor/LessorContractList";
import LesseeContractList from "./lessee/LesseeContractList";
import request from "../../../../utils/request/request";

const {TabPane} = Tabs;

/**
 * 维保合同
 */
class MaintainContractIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeKey: '1',
            leaseContractSetup: null
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <ViewCoat
                breadCrumb={[{title: "合同助手"}, {title: "维保合同信息"},]}
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
                            ? <Button
                                type='primary'
                                onClick={() => this.props.history.push('/pages/appCenter/contractAsst/contractAsstHome/maintainContractInfo/createlessor')}
                            >
                                创建合同
                            </Button> : null
                    }
                >
                    <TabPane tab="我是服务方" key="1">
                        {this.state.activeKey === '1' ? <LessorContractList history={this.props.history}/> : null}
                    </TabPane>
                    <TabPane tab="我是需求方" key="2">
                        {this.state.activeKey === '2' ? <LesseeContractList history={this.props.history}/> : null}
                    </TabPane>
                </Tabs>
            </ViewCoat>
        );
    }
}

export default MaintainContractIndex;
