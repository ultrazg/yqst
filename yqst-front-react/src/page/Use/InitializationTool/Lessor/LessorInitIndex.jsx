import React, {Component} from 'react';
import {Button, Tabs} from 'antd';
import LessorInitList from "./List/LessorInitList";
import LessorRecList from "./List/LessorRecList";
import {PlusOutlined} from "@ant-design/icons";
import Model from "../Model";

const {TabPane} = Tabs;

class LessorInitIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: '1',
            initiatorRole: ''
        };
    }

    componentDidMount() {
        this.getConfig();
    }

    getConfig = () => {
        Model.InitConfGet({}, res => {
            this.setState({
                initiatorRole: res.data.initiatorRole || ''
            })
        });
    }

    render() {
        return (
            <div>
                <Tabs
                    defaultActiveKey="1"
                    type="card"
                    onTabClick={key => {
                        this.setState({
                            active: key
                        });
                    }}
                    tabBarExtraContent={
                        this.state.initiatorRole == 1
                            ? <Button type="primary" onClick={() => {
                                this.props.history.push('/pages/appCenter/InitializationTool/MaterialRecListModule/LessorInitCreate')
                            }}><PlusOutlined/>出租方发起期初对账</Button>
                            : null
                    }
                >
                    <TabPane tab="我发起的" key="1">
                        {
                            this.state.active === '1' ? <LessorInitList history={this.props.history}/> : null
                        }
                    </TabPane>
                    <TabPane tab="我收到的" key="2">
                        {
                            this.state.active === '2' ? <LessorRecList history={this.props.history}/> : null
                        }
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default LessorInitIndex;