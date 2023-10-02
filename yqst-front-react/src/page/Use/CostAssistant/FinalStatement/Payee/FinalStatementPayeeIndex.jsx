import React, {Component} from 'react';
import {Button, Tabs} from "antd";
import FinalStatementPayeeList from "./List/FinalStatementPayeeList";
import {PlusOutlined} from "@ant-design/icons";
import ViewCoat from "../../../PublicModule/ViewCoat/ViewCoat";

const {TabPane} = Tabs;

/**
 * 收款方index
 */
class FinalStatementPayeeIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: '1'
        };
    }

    render() {
        return (
            <>
                <ViewCoat
                    breadCrumb={[
                        {title: "结算中心"},
                        {title: "结算单"},
                        {title: "收款方"},
                    ]}
                >
                    <Tabs
                        onTabClick={key => this.setState({active: key})}
                        tabBarExtraContent={<Button type='primary' style={{marginLeft: 20}} onClick={() => {
                            this.props.history.push('/pages/appCenter/costAssistant/costAssistantHome/FinalStatementCreate');
                        }}><PlusOutlined/>发起结算</Button>}
                    >
                        <TabPane tab='租赁服务' key='1'>
                            {
                                this.state.active === '1'
                                    ? <FinalStatementPayeeList
                                        service={1}
                                        history={this.props.history}
                                    />
                                    : null
                            }
                        </TabPane>
                        <TabPane tab='赔偿服务' key='2'>
                            {
                                this.state.active === '2'
                                    ? <FinalStatementPayeeList
                                        service={2}
                                        history={this.props.history}
                                    />
                                    : null
                            }
                        </TabPane>
                        <TabPane tab='运输服务' key='3'>
                            {
                                this.state.active === '3'
                                    ? <FinalStatementPayeeList
                                        service={3}
                                        history={this.props.history}
                                    />
                                    : null
                            }
                        </TabPane>
                        <TabPane tab='维保服务' key='4'>
                            {
                                this.state.active === '4'
                                    ? <FinalStatementPayeeList
                                        service={4}
                                        history={this.props.history}
                                    />
                                    : null
                            }
                        </TabPane>
                    </Tabs>
                </ViewCoat>
            </>
        );
    }
}

export default FinalStatementPayeeIndex;