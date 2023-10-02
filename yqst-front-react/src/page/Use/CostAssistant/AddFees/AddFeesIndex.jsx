import React from 'react';
import ViewCoat from "../../PublicModule/ViewCoat/ViewCoat";
import {Button, Tabs, Menu, Dropdown} from 'antd';
import AddFeesList from "./List/AddFeesList";
import {PlusOutlined} from "@ant-design/icons";

const {TabPane} = Tabs;

/**
 * 附加费用列表
 */
class AddFeesIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: '0',
        };
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        return (
            <>
                <ViewCoat
                    breadCrumb={[
                        {title: "结算中心"},
                        {title: "附加费用"},
                        {title: "附加费用列表"},
                    ]}
                >
                    <Tabs
                        onTabClick={key => this.setState({active: key})}
                        tabBarExtraContent={<Dropdown overlay={this.menu} placement="bottomLeft" trigger={['click']}>
                            <Button type='primary'><PlusOutlined/>发起附加费用</Button>
                        </Dropdown>}
                    >
                        <TabPane tab='全部' key='0'>
                            {
                                this.state.active === '0'
                                    ? <AddFeesList
                                        feeType={0}
                                        history={this.props.history}
                                    />
                                    : null
                            }
                        </TabPane>
                        <TabPane tab='附加物流' key='1'>
                            {
                                this.state.active === '1'
                                    ? <AddFeesList
                                        feeType={5}
                                        history={this.props.history}
                                    />
                                    : null
                            }
                        </TabPane>
                        <TabPane tab='附加维保' key='2'>
                            {
                                this.state.active === '2'
                                    ? <AddFeesList
                                        feeType={7}
                                        history={this.props.history}
                                    />
                                    : null
                            }
                        </TabPane>
                        {/*<TabPane tab='附加赔偿' key='3'>*/}
                        {/*    {*/}
                        {/*        this.state.active === '3'*/}
                        {/*            ? <AddFeesList*/}
                        {/*                feeType={8}*/}
                        {/*                history={this.props.history}*/}
                        {/*            />*/}
                        {/*            : null*/}
                        {/*    }*/}
                        {/*</TabPane>*/}
                    </Tabs>
                </ViewCoat>
            </>
        );
    }

    menu = () => (
        <Menu>
            <Menu.Item onClick={() => {
                this.props.history.push('/pages/appCenter/costAssistant/costAssistantHome/AddFees/AddFeesExpressCreate');
            }}>
                <span>附加物流</span>
            </Menu.Item>
            <Menu.Item onClick={() => {
                this.props.history.push('/pages/appCenter/costAssistant/costAssistantHome/AddFees/AddFeesMaintenanceCreate');
            }}>
                <span>附加维保</span>
            </Menu.Item>
            {/*<Menu.Item onClick={() => {*/}
            {/*    this.props.history.push('/pages/appCenter/costAssistant/costAssistantHome/AddFees/AddFeesCompensationCreate');*/}
            {/*}}>*/}
            {/*    <span>附加赔偿</span>*/}
            {/*</Menu.Item>*/}
        </Menu>
    );

    getData = () => {

    }
}

export default AddFeesIndex;