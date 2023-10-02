/**
 * 结算期初物资对账列表
 */
import React, {Component} from 'react';
import {Card, Tabs} from "antd";
import LessorInitIndex from "../Lessor/LessorInitIndex";
import LesseeInitIndex from "../Lessee/LesseeInitIndex";

const {TabPane} = Tabs;

class MaterialRecList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: '1'
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <>
                <Card bodyStyle={{padding: 0}} style={{padding: "36px 24px", borderRadius: "6px"}}>
                    <h1
                        style={{
                            margin: 0,
                            fontSize: "24px",
                            fontWeight: 500,
                            lineHeight: "33px",
                            color: "#2B3441"
                        }}
                    >
                        结算期初物资对账列表
                    </h1>
                </Card>
                <div style={{padding: "24px", borderRadius: "6px", marginTop: "24px", background: "#fff"}}>
                    <Tabs
                        defaultActiveKey="1"
                        type="card"
                        onTabClick={key => {
                            this.setState({
                                active: key
                            });
                        }}
                    >
                        <TabPane tab='我是出租方' key='1'>
                            {
                                this.state.active === '1' ? <LessorInitIndex history={this.props.history}/> : null
                            }
                        </TabPane>
                        <TabPane tab='我是承租方' key='2'>
                            {
                                this.state.active === '2' ? <LesseeInitIndex history={this.props.history}/> : null
                            }
                        </TabPane>
                    </Tabs>
                </div>
            </>
        );
    }
}

export default MaterialRecList;
